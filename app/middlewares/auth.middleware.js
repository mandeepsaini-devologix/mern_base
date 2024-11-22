//const jwt = require('jsonwebtoken');


const h_mysql = require('@helpers/mysql.helper');


module.exports = function auth(req_type,per_slug) {
    
    return  function auth(req, res, next){

    //req_type  web | api
    //per_slug  entity:method

    var auth = {};
    auth.authentication = false;
    auth.authorization = false;

    auth.token_id = req.cookies.tokenid;
    auth.device_id = req.cookies.deviceid;
    auth.device_ua =  req.get('User-Agent');;
    auth.device_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;


     auth.users = h_mysql.execute('select * from user_sessions where token_id = ' + auth.token_id +'  and device_id = ' + auth.device_id ,[],'con_mysql2');


    req.auth = auth;
    next();



    }
}





// const token = req.header('x-auth-token');
// if(!token) res.status(401).send('Access Denied. No Token Provided.');
// req.user = {"name":"Mandeep Saini","_id":"12345"};
// req.authKeyword = authKeyword;
    

// try{
// const decoded = jwt.verify(token,'jwtPrivateKey');
// req.user = decoded;
// next();
// }
// catch(ex){
//     res.status(400).send('Access Denied. Invalid Token');
// }