export default function (req){

	if(req){

	    var CookieDough = require('cookie-dough');
	    var cookie = new CookieDough(req);
	    
	}else{

	    var cookie = require('cookie-dough')();
	}


	var token = cookie.get('auth')


	return token ? token : null
};