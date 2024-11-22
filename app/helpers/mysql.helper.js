
const mysql = require('mysql2/promise');
const config = require('config');
// // create the connection
// // query database 

exports.execute = async function  (sql_query,query_params =[],con_config = 'con_mysql')
{
    const connection = await mysql.createConnection(config.get(con_config));
    const [rows, fields] = await connection.execute(sql_query, query_params);
    return rows;
}
