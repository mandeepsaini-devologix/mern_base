const express = require('express');
const router = express.Router();

const {asyncMiddleware} = require('middleware-async'); 


//Declaration
const config = require('config');
const { error } = require('winston');

const authMiddleware = require('../../middlewares/auth.middleware');
const auth = require('@helpers/auth.helper');

//authMiddleware('web','test:test1'),
router.get('/', authMiddleware('web','test:test1'),  (req, res) =>
{

  
  res.send('Dashboard ' + JSON.stringify(req.auth.status)  );
  

  // res.render('admin/main',{ layout: 'admin/layouts/layout' });
  // res.render('admin/main',{ layout: 'admin/layouts/layout' });

})

module.exports = router;