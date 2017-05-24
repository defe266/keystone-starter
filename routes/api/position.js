var keystone = require('keystone');
//var moment = require('moment');
var _ = require('lodash');

//var apiListGet = require('keystone/admin/server/api/list/get.js');
//var apiItemGet = require('keystone/admin/server/api/item/get.js');


module.exports.list = function(req, res, next){//, keystone.middleware.api


	keystone.list('Page').model.find({

		position: { $exists: true, $ne: '', $ne: 'none' }

	}).populate('slider').lean().then((items) => {


		res.json( _.keyBy(items, 'position') );

		//if(!item) return res.send(404)

		//res.json(keystone.list('Page').getData(item));

	}).catch(next)	
}