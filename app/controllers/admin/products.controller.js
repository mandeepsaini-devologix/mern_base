const express = require('express');
const router = express.Router();

//Declaration
const config = require('config');
const { error } = require('winston');
const mw_auth = require('../../middlewares/auth.middleware');
  //config.has('db_mysql.name') // Return true/false
  //config.get('db_mysql.name') //Returns value


//Web Routes ----------------------------------------------------------------------------------------------------

//Models
const mo_layouts = require('@models/admin/layouts.model');


//  Browse / List Web Route
router.get('/', mw_auth('web',''), (req, res) =>{
    let ret_obj = {};
    ret_obj.layout =  mo_layouts.main(req); //Layout Data
    
    ret_obj.title = 'Products List';
    ret_obj.desc = '';
    ret_obj.keyword = '';
    
    ret_obj.header = 'Products';
    ret_obj.breadcrumbs = [{"text":"Home","link":"/admin/"},{"text":"Products","link":"#"},];
    
    
    let base_query_p = 'select * from products'
    let where_query_p = '';
    let order_query_p = '';
    let limit_query_p = '';


    let paging_query = 'select count(*) from ('+ base_query_p +') tb '+ where_query_p;
    // Get pagging obj



    let list_query


    
    
    ret_obj.sample = "Hello i am sample";
    //res.send(JSON.stringify(req.auth));
    // res.send('Dashboard ' + JSON.stringify(req.auth.status)  );
    res.render('admin/entities/product/product_list',{ layout: 'admin/layouts/main_layout',data:ret_obj });
})


// Read / View Web Route
router.get('/:id', mw_auth('web',''), (req, res) =>
{
  res.send('/admin/products/:id    Product View:' + req.params.id );
})

// Add / Insert Web Route
router.get('/add', mw_auth('web',''), (req, res) =>
{
  res.send('/admin/products/add/:id    Product Add' );
})

// Edit / Update Web Route
router.get('/edit/:id', mw_auth('web',''), (req, res) =>
{
  res.send('/admin/products/edit/:id   Product Edit:' + req.params.id );
})



//API Routes ----------------------------------------------------------------------------------------------------
 
//Delete
router.get('/api/delete/:id', mw_auth('web',''), (req, res) =>
  {
    res.send('/admin/products/delete/:id    Product Delete:' + req.params.id );
  })
  
// Add
router.post('/api/insert', mw_auth('web',''), (req, res) =>
  {
    res.send('/admin/products/add    Product add POST'  );
  })

  //Edit
  router.get('/api/update/:id', mw_auth('web',''), (req, res) =>
    {
      res.send('/admin/products/edit/:id   Product Edit:' + req.params.id );
    })


module.exports = router;