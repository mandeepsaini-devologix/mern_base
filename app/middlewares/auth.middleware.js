//const jwt = require('jsonwebtoken');


const h_mysql = require('@helpers/mysql.helper');
const h_datetime = require('@helpers/datetime.helper');

const {asyncMiddleware} = require('middleware-async')

module.exports =  function auth(req_type,per_slug) {
    
    return  asyncMiddleware( async function  auth(req, res, next){

    // Input Params
    //req_type  'web' | 'api'
    //per_slug  'entity:method' | ''

    //Declare Return Obj
    var auth = {};
    auth.is_authenticated = false;
    auth.is_authorized = false;
    auth.status = 'checking';
    auth.user = {};


    //Read variables
    auth.token_id   = req.cookies.tokenid; //API Read pending
    auth.device_id  = req.cookies.deviceid;  //API Read pending
    auth.device_ua  = req.get('User-Agent');
    auth.device_ip  = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

    //Get user from DB
     //auth.users = await h_mysql.execute('select * from user_sessions where token_id = ?  and device_id = ?' ,[auth.token_id,auth.device_id ]);
    let users = await h_mysql.execute('select u.name,u.email,u.mobile,u.is_active,us.id as session_id, us.* from user_sessions us left join users u on u.id = us.user_id  where us.token_id = :tokenid  and us.device_id = :deviceid' ,{tokenid:auth.token_id ,deviceid:auth.device_id });

    if(users.lenght == 0)
    {// Token and Device Missmatch
        auth.status = 'token_missmatch'; // Setting Output
        
        req.auth = auth;//Output
        next();//End
    }

    auth.user = users[0];
    auth.status = 'token_match';

    //Checking Token Validity
    if(! auth.user.token_validity)
    {
        auth.status = 'token_validity_undefined'; // Setting Output
        req.auth = auth;//Output
        next();//End
    }

    if( h_datetime.get(auth.user.token_validity) < new Date() )
    {
        auth.status = 'token_expired'; // Setting Output
        req.auth = auth;//Output
        next();//End
    }

    auth.status = 'token_valid ' ; // Setting Output


    //Checking User Active
    if( ! auth.user.is_active )
        {
            auth.status = 'user_inactive'; // Setting Output
            req.auth = auth;//Output
            next();//End
        }
    
        auth.status = 'user_active ' ; // Setting Output
    
    //Slide Token
    auth.status = h_datetime.getUTC('minutes +30');
    auth.status = await h_mysql.execute('update user_sessions set token_validity = ? where id =?',[h_datetime.getUTC('minutes +30') , auth.user.session_id]);
    
    







    // Injecting Return obj into Request
    req.auth = auth;
    next();



    })
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