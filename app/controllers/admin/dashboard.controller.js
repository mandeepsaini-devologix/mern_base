const express = require('express');
const router = express.Router();

//Declaration
const config = require('config');
const { error } = require('winston');
const authMiddleware = require('../../middlewares/auth.middleware');
  //config.has('db_mysql.name') // Return true/false
  //config.get('db_mysql.name') //Returns value


router.get('/', authMiddleware('admin:get'), (req, res) =>{

    //res.cookie('my_cookie', 'mandeepsaini');
    //req.cookies.my_cookie
    //res.send('Hello /' +  JSON.stringify(req.user)+' '+ req.authKeyword +' '+ req.cookies.my_cookie);
  
  res.render('admin/home',{ layout: 'admin/layouts/layout' });
})


module.exports = router;