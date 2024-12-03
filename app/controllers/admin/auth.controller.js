const express = require('express');
const router = express.Router();

const {asyncMiddleware} = require('middleware-async'); 
const Joi = require('joi');

//Declaration
const config = require('config');
const { error } = require('winston');

//Middleware
const mw_auth = require('../../middlewares/auth.middleware');
//Helpers

//Models


//Views -------------------------------------------------------------------------------------------
router.get('/login',mw_auth('web','test:test1'), (req, res) =>
  {
    let ret_obj = {};
    ret_obj.title = 'Login | ' + config.get('project');
    
    
    res.render('admin/auth/login',{ layout:'admin/layouts/blank_layout',data:ret_obj });
    
  })
  
  router.get('/logout',mw_auth('web','test:test1'), (req, res) =>
    {
      let ret_obj = {};
      
      
      res.render('admin/auth/login',{ layout:'blank_layout',data:ret_obj });
      
    })


  //APIs  -------------------------------------------------------------------------------------------
  router.post('/api/login',(req, res) =>
    {
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


          //Logic
          
          ret_obj.success = true;
          res.status(200).send( ret_obj );
      
    })
    



module.exports = router;