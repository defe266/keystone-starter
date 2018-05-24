var keystone = require('keystone');
var Page = keystone.list('Page').model;
var API = require('lib/API')


module.exports = API.createEndpoints(Page);