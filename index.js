
require('dotenv').config();
require('module-alias/register');//Needed for @ in path

//Init Startup Debuger
const debugStartUp = require('debug')('app:startup');

//Init Express App
const express = require('express');
const app = express();



//Init Startup Error Logger
require('@startup/errorLog.start')(process);

//Init all Databases Here


//Starting View Engine
require('@startup/viewEngine.start')(app);

//All Routes //./app/routes/
require('@routes/web.routes')(app);
require('@routes/admin.routes')(app);
require('@routes/api.routes')(app);




//Define Important Const / Var / Let
const port = process.env.PORT || 3000;
//App Listen Code
app.listen(port, () => {
  debugStartUp(`Node app Started`);
  console.log(`Node app listening on port ${port}`);
})