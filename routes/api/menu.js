var keystone = require('keystone');

module.exports.list = function(req, res, next){//, keystone.middleware.api


	Promise.all([

		keystone.list('MenuMainLink').model.find().sort({sortOrder: 1}).lean(),
		keystone.list('MenuFooterLink').model.find().sort({sortOrder: 1}).lean(),
		keystone.list('MenuLegalLink').model.find().sort({sortOrder: 1}).lean(),

	]).then((results) => {

		res.json( {

			MenuMain : results[0],
			MenuFooter : results[1],
			MenuLegal : results[2],
		});

	}).catch(next)	
}