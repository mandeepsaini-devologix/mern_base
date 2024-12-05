
const mysql = require('mysql2/promise');
const config = require('config');
// // create the connection
// // query database

exports.get = async function  (sql_query,query_params =[],con_config = 'con_mysql')
{
    const connection = await mysql.createConnection(config.get(con_config));
    const [rows, fields] = await connection.execute(sql_query, query_params);
    return rows;
}

exports.execute = async function  (sql_query,query_params =[],con_config = 'con_mysql')
{
    const connection = await mysql.createConnection(config.get(con_config));
    const [rows, fields] = await connection.execute(sql_query, query_params);
    return rows;
}

exports.insert = async function  (table_name,insert_obj ={},con_config = 'con_mysql')
{
    const connection = await mysql.createConnection(config.get(con_config));

    keys_csl ='';
    values_csl ='';
    values_ary =[];
    Object.keys(insert_obj).forEach(function(key)
    {
        keys_csl += key+',';
        values_csl += '?,';
        values_ary.push(insert_obj[key]);
    });

    let sql_query = 'insert into '+ table_name+' (';
    sql_query+= keys_csl.slice(0, -1);
    sql_query+= ') values (';
    sql_query+= values_csl.slice(0, -1);
    sql_query+= ')';

    // return sql_query;
    const [rows, fields] = await connection.execute(sql_query, values_ary);
    return rows;
}
