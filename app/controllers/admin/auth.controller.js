const express = require('express');
const router = express.Router();

const {asyncMiddleware} = require('middleware-async'); 
const Joi = require('joi');
var sha1 = require('sha1');

//Declaration
const config = require('config');
const { error } = require('winston');

//Middleware
const mw_auth = require('../../middlewares/auth.middleware');

//Helpers
const h_mysql = require('@helpers/mysql.helper');
const h_datetime = require('@helpers/datetime.helper');
const h_string = require('@helpers/string.helper');

//Models


//Views -------------------------------------------------------------------------------------------
router.get('/login',mw_auth('auth',''), (req, res) =>
  {
    let ret_obj = {};
    ret_obj.title = 'Login | ' + config.get('project');
    
    
    res.render('admin/auth/login',{ layout:'admin/layouts/blank_layout',data:ret_obj });
    
  })
  
  router.get('/logout',mw_auth('web',''), async (req, res) =>
    {
    token_validity = h_datetime.add(new Date(),'days -365'); //For DB
    let tokenlogout = await  h_mysql.execute("update user_sessions set  token_validity = ? where id = ? ",[ token_validity, req.auth.user.session_id  ]);
    
    //res.send(tokenlogout);
    
   res.redirect( config.get('loginpage'));
    })


  //APIs  -------------------------------------------------------------------------------------------
  router.post('/api/login',async (req, res) =>
    {
      //Declare Return Obj
       let ret_obj = {};
       ret_obj.success = false;
       ret_obj.status = '';
       
       
       //Validate & Santize
       const input_schema = Joi.object({
         user: Joi.string().alphanum().min(3).max(30).required(),
         pass: Joi.string().alphanum().min(3).max(30).required(),
         remme: Joi.required(),
        }).options({abortEarly : false});
        
        const input_validation = input_schema.validate(req.body);
        if(input_validation.error)
          {
            //Return Validation Error
            ret_obj.status = 'validation_error';
            ret_obj.error = input_validation.error;
            res.status(200).send( ret_obj);
            
          }
         

          //Verify User Exist 
          let users = await h_mysql.execute('select * from users where email = ? or mobile = ?',[req.body.user,req.body.user]);
          if(users.length == 0)
            {
              ret_obj.status = 'error';
              ret_obj.message = 'User not Found!';
              res.status(200).send( ret_obj);
            }

            //Check for disabled user
            let user = users[0];
            if(!user.is_active)
              {
                ret_obj.status = 'error';
                ret_obj.message = 'User is Disabled by Admin!';
                res.status(200).send( ret_obj);
              }

              //Check for Locked user
              user.locked_untill = user.locked_untill ? user.locked_untill : h_datetime.add(new Date(),'minutes -1'); 
              if( h_datetime.get(user.locked_untill) > h_datetime.get(new Date()) )
                {
                  ret_obj.status = 'error';
                  ret_obj.message = 'User is Locked untill <br>'+user.locked_untill;
                  res.status(200).send( ret_obj);
                }

              //Check for user password
              temp_saltedhash = sha1(user.salt + req.body.pass);
              if(temp_saltedhash != user.pass_hash)
              {
                  ret_obj.status = 'error';
                  ret_obj.message = await log_failed_attempts(user);
                  res.status(200).send( ret_obj );
              }


            //Genrate Token
            token = h_string.random();
            token_validity = h_datetime.add(new Date(),config.get('locking_period')); //For DB

            //Update Session
            let ret_tokenupdate = await h_mysql.execute("update user_sessions set token_id = ?, token_validity = ? where user_id =? and device_id = ? ",[ token, token_validity, user.id, req.header('deviceid')  ]);
            if(ret_tokenupdate.affectedRows == 0)
            {
           
              //Insert Session
              insert_obj= {};
              insert_obj.user_id = user.id;
              insert_obj.created_at = h_datetime.getUTC();
              insert_obj.token_id = token;
              insert_obj.token_validity = token_validity;
              insert_obj.device_id = req.header('deviceid') ;
              insert_obj.device_ua = req.get('User-Agent');
              insert_obj.device_ip =req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;


              let ret_tokeninsert = await h_mysql.insert('user_sessions', insert_obj);
            }
              
            ret_obj.status = 'loggedin';
            ret_obj.token =  token ;
          
          ret_obj.success = true;
          res.status(200).send( ret_obj );
      
    })


    async function  log_failed_attempts(user)
    {
      // user.pass_attempts
      
      allowed_attempts = config.get('allowedloginattempts');

      if(allowed_attempts <= user.pass_attempts +1 )
      {
        //Locking
        let users = await h_mysql.execute('update users set pass_attempts = 0 , locked_untill =? where id =?',[h_datetime.add(new Date(),config.get('locking_period')) ,user.id]);
        
        ret =  'Incorrect Password, Failed Attempts '+ config.get('allowedloginattempts')+'/'+config.get('allowedloginattempts');
        ret +=  '<br>User Locked unitll '+ h_datetime.add(new Date(),config.get('locking_period'));
        return ret;
      }
      
      let users = await h_mysql.execute('update users set pass_attempts = ?  where id =?',[user.pass_attempts +1 ,user.id]);
      //increment
      return  'Incorrect Password, Failed Attempts '+ (user.pass_attempts + 1) +' out of '+config.get('allowedloginattempts');

    }
    



module.exports = router;