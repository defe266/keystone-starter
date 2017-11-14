export default function (token, req){

	if(req){

	    var CookieDough = require('cookie-dough');
	    var cookie = new CookieDough(req);
	    
	}else{

	    var cookie = require('cookie-dough')();
	}



  	return cookie.set('auth', token, { path: "/"});
};