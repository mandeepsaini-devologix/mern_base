


// datetime---------------------------------------------------------------------------------------------------


function get( dt_str ='')
{
   
    let date = dt_str ? new Date(dt_str) : new Date();
    date =  add(date,'minutes '+(date.getTimezoneOffset() * -1));// Correcting Offset problem
    return date;
}

function getUTC(interval)
{
    ret_date = new Date()
    if( interval)
    {
        ret_date =  add(ret_date, interval);
    }

   return  ret_date.toISOString().slice(0,19).replace('T',' ');
}



function add(datetime,typeinterval)
{
    //Interval  'minutes | days | hours +12'
    datetime_ret = datetime;
    type = typeinterval.split(' ')[0];
    interval = typeinterval.split(' ')[1];

    if( type == 'days')
    {
        datetime_ret = new Date(datetime.getTime() + (interval * 24 * 60 * 60 * 1000));
    }
    if( type == 'hours')
    {
        datetime_ret = new Date(datetime.getTime() + (interval * 60 * 60 * 1000));
    }
    
    if( type == 'minutes')
    {
        datetime_ret = new Date(datetime.getTime() + (interval * 60 * 1000));
    }

    if( type == 'seconds')
    {
        datetime_ret = new Date(datetime.getTime() + (interval * 1000));
    }

    return datetime_ret;

}


exports.get = get;
exports.getUTC = getUTC;
exports.add = add;