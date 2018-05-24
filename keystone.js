// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var sharify = require('sharify');
var config = require('./config.js');


//# ES6 & JSX support
require('babel-core/register')({
    presets: ['es2015','stage-0','react']
})

require('rootpath')(); //# let absolute access for require in node

//# Ignore CSS requires, its only for the client in the share code
require.extensions['.css'] = function() {return null}
require.extensions['.scss'] = function() {return null}
require.extensions['.styl'] = function() {return null}

//# Inject some configuration & constant data into sharify
var sd = sharify.data = {

	SERVER_URL: process.env.NODE_ENV == 'development' ? process.env.SERVER_ADDR_DEV : process.env.SERVER_ADDR,
	NODE_ENV: process.env.NODE_ENV,
	I18N: config.i18n
};


keystone.init({

	'name': 'KeystoneJS',
	'brand': 'KeystoneJS',

	'less': 'public',
	
	'static': 'public',
	'favicon': 'public/favicon.ico',
	//'views': 'templates/views',
	//'view engine': 'jade',
	
	//'emails': 'templates/emails',
	
	'auto update': true,
	'session': true,
	'session store': 'mongo',
	'auth': true,
	'user model': 'User',


	'wysiwyg images': true,

	'wysiwyg additional options': {
		relative_urls: false,

		skin : 'lightgray',
        //menubar : 'file edit format view insert',
        //content_css: '/vendor/tinyvision/build/tinyvision.css',
        visualblocks_default_state: true,
        
        external_plugins: {
            'tinyvision':'/vendor/tinyvision/build/plugin.min.js'
        },
        tinyvision: {
            source: '/api/tinyvision/images'
        }
	},
	//'wysiwyg cloudinary images': true,
	//'wysiwyg override toolbar': false,
	//'wysiwyg menubar': true,
	//'wysiwyg skin': 'lightgray',
	//'wysiwyg additional buttons': 'searchreplace visualchars'
	/* + ' charmap ltr rtl pagebreak paste, forecolor backcolor,'
	 +' emoticons media, preview print ',
	'wysiwyg additional plugins': 'example, table, advlist, anchor,'
	 + ' autolink, autosave, bbcode, charmap, contextmenu, '
	 + ' directionality, emoticons, fullpage, hr, media, pagebreak,'
	 + ' paste, preview, print, searchreplace, textcolor,'
	 + ' visualblocks, visualchars, wordcount',*/

	//'wysiwyg additional buttons': 'searchreplace, visualchars, charmap, ltr, rtl, pagebreak, paste, forecolor, backcolor, emoticons, media, preview, print',
	//'wysiwyg additional plugins': 'example, table, advlist, anchor autolink, autosave, bbcode, charmap, contextmenu, directionality, emoticons, fullpage, hr, media, pagebreak, paste, preview, print, searchreplace, textcolor, visualblocks, visualchars, wordcount',

	//'wysiwyg additional plugins': 'tinyvision',
	
});



// Load your project's Models

keystone.import('models');

// Your cookie secret is used to secure session cookies. This environment
// variable was added to your Heroku config for you if you used the "Deploy to
// Heroku" button. The secret below will be used for development.
// You may want to set it to something private and secure.
/*
if (!keystone.get('cookie secret')) {
	keystone.set('cookie secret', '----change-me-to-something-secret----');
}*/

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
/*
keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});*/

// Load your project's Routes

keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {

	'Contenido': ['pages', 'uploads'],
	'Menús': ['MenuMainLink', 'MenuFooterLink', 'MenuLegalLink'],
	'Usuarios': 'users',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();