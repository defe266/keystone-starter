var keystone = require('keystone');
var moment = require('moment');
var _ = require('lodash');

var apiListGet = require('keystone/admin/server/api/list/get.js');
var apiItemGet = require('keystone/admin/server/api/item/get.js');


module.exports.get = function(req, res, next){//, keystone.middleware.api


	if(req.query.byslug){

		keystone.list('Page').model.findOne({key : req.params.id}).then((item) => {

			if(!item) return res.send(404)


			res.json(keystone.list('Page').getData(item));

		}).catch(next)

	}else{

		req.list = keystone.list('Page');

		apiItemGet(req,res)	
	}
}

module.exports.list = function(req, res, next){//, keystone.middleware.api

	req.list = keystone.list('Page');

	apiListGet(req,res);
	
}