//const jwt = require('jsonwebtoken');


const h_mysql = require('@helpers/mysql.helper');
const h_datetime = require('@helpers/datetime.helper');
const h_string = require('@helpers/string.helper');

const config = require('config');

const {asyncMiddleware} = require('middleware-async')

module.exports =  function auth(req_type = 'web', per_slug= '') {
    
    return  asyncMiddleware( async function  auth(req, res, next){


    //Declare Return Obj
    var auth = {};
    auth.req_type = req_type; //req_type  'web' | 'api'
    auth.per_slug = per_slug; //per_slug  'entity:method' | ''

    auth.is_authenticated = false;
    auth.is_authorized = false;
    auth.status = 'checking';
    auth.user = {};

    //Read variables
    auth.token_id   = req.cookies.tokenid || ''; //API Read pending
    auth.device_id  = req.cookies.deviceid || '';  //API Read pending
    auth.device_ua  = req.get('User-Agent');
    auth.device_ip  = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
   
    // auth.req_path       = req.originalUrl.replace(/\?.*$/, ''); //path
    // auth.req_url        = req.originalUrl;  //path + query
    // auth.req_method     = req.method; //get Post Put Delete
    // auth.req_domain     = req.hostname; //localhost | www.domain.com

    //Create deviceid cookie if not available
    if (req.cookies.deviceid === undefined) 
    {
        res.cookie('deviceid',h_string.random(), { maxAge: 100 * 365 * 24 * 60 * 60 * 1000, httpOnly: true });    
    } 

    //Get user from DB
     //auth.users = await h_mysql.execute('select * from user_sessions where token_id = ?  and device_id = ?' ,[auth.token_id,auth.device_id ]);
    let users = await h_mysql.execute('select u.name,u.email,u.mobile,u.img,u.is_active,ut.is_admin,us.id as session_id,ut.per_csl, us.* from user_sessions us left join users u on u.id = us.user_id left join user_types ut on ut.id = u.usertype_id where us.token_id = :tokenid  and us.device_id = :deviceid' ,{tokenid:auth.token_id ,deviceid:auth.device_id });

    if(users.length === 0)
    {// Token and Device Missmatch
        auth.status = 'token_missmatch'; 
        after_auth(req, res, next,auth);
    }

  

    auth.user = users[0];
    auth.status = 'token_match';


    //Checking Token Validity
    if(! auth.user.token_validity)
    {
        auth.status = 'token_validity_undefined'; 
       
        after_auth(req, res, next,auth);
    }

    if( h_datetime.get(auth.user.token_validity) < new Date() )
    {
        auth.status = 'token_expired'; 
       
        after_auth(req, res, next, auth);
    }

    auth.status = 'token_valid ' ; 


    //Checking User Active
    if( ! auth.user.is_active )
    {
        auth.status = 'user_inactive'; 
       

        after_auth(req, res, next,auth);
    }
    
    auth.status = 'user_active ' ; 
    
    //Slide Token
    auth.status = await h_mysql.execute('update user_sessions set token_validity = ? where id =?',[h_datetime.getUTC('minutes +30') , auth.user.session_id]);
   

        
    //Log User Session With IP
    auth.is_authenticated = true;
    auth.status = 'autheticated';


    // Check Authorization
    
    auth.user.per_csl +=',';

    if(!per_slug)
    {ri
        auth.status = 'authozed_default';
        auth.is_authorized = true;
    }
    else if( auth.user.per_csl.search("all:all,")  !== -1)
    {
        auth.status = 'authorized_all';
        auth.is_authorized = true;
    }
    else if( auth.user.per_csl.search(per_slug.split(':')[0]+':all,')  !== -1)
    {
        auth.status = 'authorized_allentity';
        auth.is_authorized = true;
    }
    else if( auth.user.per_csl.search(per_slug +',')  !== -1)
    {
        auth.status = 'authorized_method';
        auth.is_authorized = true;
    }
    
    

    //End
    // Injecting Return obj into Request 
   
    after_auth(req, res, next,auth);



    })
}



function after_auth(req, res, next,auth)
{
    req.auth = auth;
    if(req.auth.is_authenticated && req.auth.is_authorized)
    {
        // Authenticated and Authorized
        next();
    }
    else
    {
        // Not Authenticated or Not Authorized
        if(req.auth.req_type =='web')
        {
            //Redirect to Login Page
            //res.redirect(config.get('loginpage')+'?reason='+ auth.status+'&from=' + req.originalUrl.replace(/\?.*$/, ''));
            res.redirect(`${config.get('loginpage')}?from=${req.originalUrl.replace(/\?.*$/, '')}&response=${ req.auth.status}`);
        }
        else if(req.auth.req_type =='api')
        {
            //Return Error Response in API
            //401 is HTTP code 200,401,404,500
        
            res.status(401).send({  message : 'Unauthorized', data : {} });
        }
        else
        {
            next();
        }

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