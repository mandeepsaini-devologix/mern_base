
//Middlewares
const viewErrorsMiddleware = require('@middlewares/viewErrors.middleware');

//Controllers
const dashboardController = require('@controllers/admin/dashboard.controller');
const authController = require('@controllers/admin/auth.controller');
const productsController = require('@controllers/admin/products.controller');



module.exports = function(app){
  


  //Routes Starts Here ---------------------------------------------
  app.use('/admin/', dashboardController);
  app.use('/admin/auth/', authController);
  app.use('/admin/products/', productsController);





  //Routes Ends Here ---------------------------------------------

  //Log all thrown errors
  app.use(viewErrorsMiddleware);

}