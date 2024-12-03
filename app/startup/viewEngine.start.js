const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");


var path = require('path');
module.exports = function(app){

  //Set view engine as ejs
  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  app.set('views','./app/views');
  //app.set('layout', 'layouts/layout'); Set default layouts


  app.use(cookieParser());
  //app.use(express.json());
  app.use(bodyParser.json())

  //resolve public
  app.use(express.static(path.resolve('./public')));

}