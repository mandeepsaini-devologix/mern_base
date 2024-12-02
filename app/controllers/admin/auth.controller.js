const express = require('express');
const router = express.Router();

const {asyncMiddleware} = require('middleware-async'); 


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
  router.get('/api/login',(req, res) =>
    {
      let ret_obj = {};
    
      
      
      
      res.status(401).send({ret_obj});
      
    })
    



module.exports = router;