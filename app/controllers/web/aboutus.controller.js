const express = require('express');
const router = express.Router();

//Declaration
const config = require('config');
const { error } = require('winston');

const authMiddleware = require('../../middlewares/auth.middleware');


router.get('/', (req, res) =>{
  
  // //Data for Common Layout and its Components
  // envObj ={
  //   title:'This is page title',
  //   desc:'This is page description, and yit could be long',
  // }

  // viewObj ={
  //   header1:'header 1 can be this',
  //   header2:'header 2 can be this'
  // }

  // res.render('web/home',{ layout: 'web/layouts/layout', envData:envObj,viewData:viewObj });

  res.send('"/aboutus" - About Us Home  ' );
})

router.get('/company', (req, res) =>{
  
  // //Data for Common Layout and its Components
  // envObj ={
  //   title:'This is page title',
  //   desc:'This is page description, and yit could be long',
  // }

  // viewObj ={
  //   header1:'header 1 can be this',
  //   header2:'header 2 can be this'
  // }

  // res.render('web/home',{ layout: 'web/layouts/layout', envData:envObj,viewData:viewObj });

  res.send('"/aboutus/company" - About Us Copmany  ' );
})


module.exports = router;