
//Middlewares
const viewErrorsMiddleware = require('@middlewares/viewErrors.middleware');


//Controllers
const homeController = require('@controllers/web/home.controller');
const aboutusController = require('@controllers/web/aboutus.controller');


module.exports = function(app){

  
  //Routes Starts Here ---------------------------------------------
  app.use('/', homeController)  
  app.use('/aboutus', aboutusController)  


  //Routes Ends Here ---------------------------------------------

  //Log all thrown errors
  app.use(viewErrorsMiddleware);

}