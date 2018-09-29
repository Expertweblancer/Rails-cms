//get cookies function
function getCook(cookiename)
{
    var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
    return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}

var user_id = getCook('user_id');

var first_name = getCook('first_name');

var last_name = getCook('last_name');

var project_id = getCook('project_id');

//main api url
//var mainUrl = 'http://10.10.10.194:3000/api/v1/';
var mainUrl = 'http://10.10.10.194:3000/api/v1/';
//var requset ='http://localhost:8080/elmuhrst/rest/projectResearcher/2/1'

//requset api url 
//var requsetURL = 'http://10.10.10.194:3000/elmuhrst/rest/request';
var requsetURL = 'http://10.10.10.194:3000/elmuhrst/rest/request';

//projectResearcher api url 
//var projectResearcherUrl = 'http://10.10.10.194:3000/elmuhrst/rest/projectResearcher/';
var projectResearcherUrl = 'http://10.10.10.194:3000/elmuhrst/rest/projectResearcher/';