const express = require('express');
const router = express.Router();

//Declaration
const config = require('config');
const { error } = require('winston');
const authMiddleware = require('../../middlewares/auth.middleware');
  //config.has('db_mysql.name') // Return true/false
  //config.get('db_mysql.name') //Returns value


  //View Routes ----------------------------------------------------------------------------------------------------

router.get('/', authMiddleware('admin:dashbord'), (req, res) =>{

    //res.cookie('my_cookie', 'mandeepsaini');
    //req.cookies.my_cookie
    //res.send('Hello /' +  JSON.stringify(req.user)+' '+ req.authKeyword +' '+ req.cookies.my_cookie);
  
  //res.render('admin/home',{ layout: 'admin/layouts/layout' });
  res.send('/admin/products    Product List' );
})

router.get('/:id', authMiddleware('admin:dashbord'), (req, res) =>
{
  res.send('/admin/products/:id    Product View:' + req.params.id );
})

router.get('/add', authMiddleware('admin:dashbord'), (req, res) =>
{
  res.send('/admin/products/add/:id    Product Add' );
})

router.get('/edit/:id', authMiddleware('admin:dashbord'), (req, res) =>
{
  res.send('/admin/products/edit/:id   Product Edit:' + req.params.id );
})



//API Routes ----------------------------------------------------------------------------------------------------
  
router.get('/api/select', authMiddleware('admin:dashbord'), (req, res) =>
  {
    res.send('/admin/products/delete/:id    Product Delete:' + req.params.id );
  })

router.get('/api/select/:id', authMiddleware('admin:dashbord'), (req, res) =>
  {
    res.send('/admin/products/delete/:id    Product Delete:' + req.params.id );
  })

router.get('/api/delete/:id', authMiddleware('admin:dashbord'), (req, res) =>
  {
    res.send('/admin/products/delete/:id    Product Delete:' + req.params.id );
  })
  
router.post('/api/insert', authMiddleware('admin:dashbord'), (req, res) =>
  {
    res.send('/admin/products/add    Product add POST'  );
  })

  router.get('/api/update/:id', authMiddleware('admin:dashbord'), (req, res) =>
    {
      res.send('/admin/products/edit/:id   Product Edit:' + req.params.id );
    })


module.exports = router;