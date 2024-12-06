

const config = require('config');
// // create the connection
// // query database

//Helpers
const h_dt = require('@helpers/datetime.helper');
const h_sql = require('@helpers/mysql.helper');

// log(user.id,'loggedin',{})
exports.log = async function  (user,code,content)
{
    $insert_obj={};
    $insert_obj.user_id=user.id;
    $insert_obj.datetime= h_dt.get();
    $insert_obj.type='log';
    $insert_obj.code=code;
    $insert_obj.content=JSON.stringify( content);

    const res_query = h_sql.insert('user_logs', $insert_obj);
    return res_query;
    
}

