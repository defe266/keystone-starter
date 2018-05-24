/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var importRoutes = keystone.importer(__dirname);
var sharify = require('sharify');

// Common Middleware
//keystone.pre('routes', middleware.initLocals);


// Import Route Controllers
var routes = {
	api: importRoutes('./api'),
	helpers: importRoutes('./helpers'),
	apps: require('./apps.js')
};



// Setup Route Bindings
exports = module.exports = function(app) {


	

	app.use(sharify);

	//# 301 redirect: www.* --> *
	app.all('*',routes.helpers.removeWWW);


	//# Supports imgs transformations
	app.get('/uploads/*', routes.helpers.imageTransforms);

	//# API

	app.get('/api/positions', routes.api.position.list);
	app.get('/api/menus', routes.api.menu.list);


	app.get('/api/pages', routes.api.page.list);
	app.get('/api/pages/:id', routes.api.page.get);


	app.post('/api/form/contact', routes.api.forms.contact);


	app.get('/api/tinyvision/images', routes.api.upload.tinyvisionList);

	//# APPS 
	app.get('/*', routes.apps.web);

	
};