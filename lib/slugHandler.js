var keystone = require('keystone');
var utils = require('keystone-utils');
var i18n = require('../config.js').i18n
var langs = i18n.langs
var defaultLang = i18n.default


module.exports = function(List, key, keyFrom) {

	List.schema.pre('save', function(next, done) {

		var page = this;
		var model = List.model;
		//var key = 'slug';
		//var keyFrom = 'title';

		//# get auto-incrementing slug
		var getSlug = (base, lang, counter = 0) => {

			console.log('getSlug ',base, lang, counter)

			var slug = base;//page[key][lang];

			slug = counter > 0 ? slug+'-'+counter : slug;

			var query = {}

			query[key+'.'+lang] = slug

			if(!page.isNew){

				query._id = {$ne : page._id}
			}

			return model.count(query).then((findCount) => {

				if(findCount > 0){

					return getSlug(base, lang, counter + 1)
				}

				return slug
			})
		}

		//# first save -> transform from main title
		if(page.isNew && keyFrom){

			var from = page[keyFrom];

		}else{

			var from = Object.assign({}, page[key]);
		}

		//# adapt especial chars & test collisions
		//if(from){
			
		page[key] = {}

		var P_slugs = langs.map((lang) => {

			var value = from[lang];

			if(value){

				//page[key][lang] = utils.slug(value);
				var base = utils.slug(value);

				//# test collisions (unique)
				return getSlug(base, lang).then((slug) => {

					console.log('slug ',slug)

					page[key][lang] = slug;
				})
			}

		})
		

		Promise.all(P_slugs).then(results => {

			next();

		}).catch((err) => {

	        //console.log(err);
	        next(err);
	    })


	});

}