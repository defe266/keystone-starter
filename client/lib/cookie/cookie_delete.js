export default function (req){

	if(req){

        var CookieDough = require('cookie-dough');
        var cookie = new CookieDough(req);
        
    }else{

        var cookie = require('cookie-dough')();
    }

	return cookie.remove('auth', { path: "/" });
};