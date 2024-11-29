
//Models
const mo_nav_aside = require('@models/admin/nav_aside.model');
const mo_nav_header = require('@models/admin/nav_header.model');

const config = require('config');

function main(req)
{

    layout =  {};

    layout.project =  config.get('project');
    layout.version =  config.get('version');
    layout.pro_logo =  config.get('pro_logo');
    layout.pro_icon =  config.get('pro_icon');
    layout.pro_title =  config.get('pro_title');
    
    layout.nav_aside =  mo_nav_aside.html();
    layout.nav_header =  mo_nav_header.html();
    
    layout.user={};
    layout.user.name = req.auth.user.name;
    layout.user.mobile = req.auth.user.mobile;
    layout.user.email = req.auth.user.email;
    layout.user.is_admin = req.auth.user.is_admin;
    layout.user.img = req.auth.user.img;

    return  layout;
   
}

exports.main = main;


