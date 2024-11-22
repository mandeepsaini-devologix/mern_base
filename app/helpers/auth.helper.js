const h_mysql = require('@helpers/mysql.helper');


exports.check = async function  (req,req_type,per_slug)
{
    var auth = {};
    auth.authentication = false;
    auth.authorization = false;


    auth.token_id = req.cookies.tokenid;
    auth.device_id = req.cookies.deviceid;
    auth.device_ua =  req.get('User-Agent');;
    auth.device_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;


     auth.users = await h_mysql.execute('select * from user_sessions where token_id = ' + auth.token_id +'  and device_id = ' + auth.device_id ,[],'con_mysql2');


    req.auth = auth;


    return req;
}
