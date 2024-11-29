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
const mo_layouts = require('@models/admin/layouts.model');

//mw_auth('web','test:test1'),
router.get('/',mw_auth('web','test:test1'), (req, res) =>
{
  let ret_obj = {};
  ret_obj.layout =  mo_layouts.main(req); //Layout Data
  
  ret_obj.title = 'Dashboard';
  ret_obj.desc = 'Dashboard';
  ret_obj.keyword = 'Dashboard';
  
  ret_obj.header = 'Dashboard';
  ret_obj.breadcrumbs = [{"text":"Home","link":"/admin/"},{"text":"Home1","link":"/admin/"},{"text":"Dashboard","link":"#"},];
  
  
  
  
  
  ret_obj.sample = "Hello i am sample";
  //res.send(JSON.stringify(req.auth));
  // res.send('Dashboard ' + JSON.stringify(req.auth.status)  );
  res.render('admin/dashboard',{ layout: 'admin/layouts/main_layout',data:ret_obj });

})

module.exports = router;