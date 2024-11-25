const express = require('express');
const router = express.Router();

const {asyncMiddleware} = require('middleware-async'); 


//Declaration
const config = require('config');
const { error } = require('winston');

const authMiddleware = require('../../middlewares/auth.middleware');
const auth = require('@helpers/auth.helper');

//config.has('db_mysql.name') // Return true/false
//config.get('db_mysql.name') //Returns value


router.get('/', authMiddleware('web',''),   (req, res) =>{

    //req = await auth.check(req,'web','');

  
  console.log(req.auth);
  res.send('Dashboard ' + JSON.stringify(req.auth.status)  );
  
  
  
  
  //res.cookie('my_cookie', 'mandeepsaini');
    //req.cookies.my_cookie
    //res.send('Hello /' +  JSON.stringify(req.user)+' '+ req.authKeyword +' '+ req.cookies.my_cookie);
     
    // res.render('admin/home',{ layout: 'admin/layouts/layout' });

})

module.exports = router;