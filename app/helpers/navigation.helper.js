// datetime---------------------------------------------------------------------------------------------------
 

function fill_html( navObj, tempObj)
{
    let ret ='';
    navObj.forEach( item =>{
        if(typeof item.data == 'object')
        {
            item.data = fill_html(item.data,tempObj);
        }
        ret += fill_item(tempObj,item.type, item);
    });
    return ret;
}


function fill_item(tempObj,template, data_obj)
{
   
    
    let ret =   tempObj[template];
   

    Object.keys(data_obj).forEach(function(key) 
    {
        ret = ret.replaceAll( '{-'+key+'-}', data_obj[key] );
    });
  
    return ret;

}


exports.fill_html = fill_html;
