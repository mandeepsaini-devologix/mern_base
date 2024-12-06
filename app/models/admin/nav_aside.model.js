
const h_nav = require('@helpers/navigation.helper');

function obj()
{
   let obj =  [
        { "type":"section", "icon":"", "text":"Catalog", "badge":"", "data":"" },
        
        { "type":"item", "icon":"nav-icon fas fa-th", "text":"Products", "badge":"", "data":"/admin/products" },
        { "type":"item", "icon":"nav-icon fas fa-th", "text":"Widgets3", "badge":"<label clss='danger'>New</label>", "data":"/admin/?working" },
        
        { "type":"dropdown", "icon":"nav-icon fas fa-th", "text":"Widgets4", "badge":"<label clss='danger'>New</label>", "data": [
                { "type":"section", "icon":"nav-icon fas fa-thnav-icon fas fa-th", "text":"Examples1", "badge":"", "data":"" },
                { "type":"item", "icon":"nav-icon fas fa-th", "text":"Widgets1", "badge":"<label clss='danger'>New</label>", "data":"/admin/dsgfzs" }
        ]}
    
      ];


      return obj;
}

function temp()
{
    let  obj ={};

    obj.section =   '<li class="nav-header">{-text-}</li>';
    obj.item =      `<li class="nav-item"> 
                        <a href="{-data-}" class="nav-link"> 
                            <i class="{-icon-}"></i> 
                            <p> {-text-}{-badge-} </p>
                         </a> 
                    </li>`;

    obj.dropdown =  `<li class="nav-item">
                        <a href="#" class="nav-link">
                            <i class="{-icon-}"></i>
                            <p>{-text-} <i class="fas fa-angle-left right"></i> {-badge-}</p>
                        </a>
                        <ul class="nav nav-treeview"> {-data-} </ul>
                    </li>`;

    return obj;
}

function html()
{
    return h_nav.fill_html(obj(),temp());
}



exports.html = html;
exports.obj  = obj;
exports.temp  = temp;