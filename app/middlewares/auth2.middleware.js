//const jwt = require('jsonwebtoken');


const h_mysql = require('@helpers/mysql.helper');
const h_datetime = require('@helpers/datetime.helper');

const {asyncMiddleware} = require('middleware-async')

module.exports =  function auth(req_type = 'web', per_slug= '') {
    
    return  asyncMiddleware( async function  auth(req, res, next){

    
    next();



    })
}






