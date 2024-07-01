
//Middlewares
const viewErrorsMiddleware = require('@middlewares/viewErrors.middleware');

//Controllers
const dashboardController = require('@controllers/admin/dashboard.controller');



module.exports = function(app){
  


  //Routes Starts Here ---------------------------------------------
  app.use('/admin/', dashboardController);
  

  //Routes Ends Here ---------------------------------------------

  //Log all thrown errors
  app.use(viewErrorsMiddleware);

}