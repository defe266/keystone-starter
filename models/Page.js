var keystone = require('keystone');
var Types = keystone.Field.Types;
var i18n = require('../config.js').i18n
var langs = i18n.langs
var defaultLang = i18n.default

//var myStorage = require('../lib/myStorage.js');

var Page = new keystone.List('Page', {
	map: { name: 'title.es' },
	autokey: { path: 'key', from: 'title.es', unique: true },
    defaultSort: '-createdAt'
});

Page.add(
	{
		state: { label: "Estado de publicación", type: Types.Select, default: 'publish', options: [
			{ label: 'Publicado', value: 'publish' },
			{ label: 'Borrador', value: 'draft' }
		]},
		title: { label: "Título", type: Types.I18nText, langs: langs, defaultLang: defaultLang, required: true, initial: true },
		position: { label: "Posición especial", type: Types.Select, options: 'none, home, cookies, LOPD', default: "none"},
		createdAt: { label: "Creado el", type: Date, default: Date.now },
		//state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
		//publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
		//author: { type: Types.Relationship, ref: 'User', index: true },
		//excerpt: { type: Types.I18nHtml, height: 68, langs: langs, defaultLang: defaultLang},
		//test: { label: "test", type: Types.Html, wysiwyg: true},//wysiwyg: true,
		content: { label: "Contenido", type: Types.I18nHtml,wysiwyg: true,  langs: langs, defaultLang: defaultLang},//wysiwyg: true,


		//content_v2: { label: "Contenido", type: Types.Html_v2, wysiwyg: true,  langs: langs, defaultLang: defaultLang},//wysiwyg: true,

		


		template: { label: "Plantilla", type: Types.Select, options: 'standar, slider, contact', default: 'standar', required: true },

		slider: { label: "Slider", type: Types.Media, ref:'Upload', many: true, dependsOn: { template: 'slider' }},

		haveMap: { label: "Tiene mapa", type: Types.Boolean, default: false, dependsOn: { template: 'contact' }},
		location: { label: "Localización", type: Types.Location, dependsOn: { template: 'contact', haveMap: true } },
		coordinates: { label: "Coordenadas", type: Types.GeoPoint, dependsOn: { template: 'contact', haveMap: true } }
	},

	{ heading: "SEO" },

	{

		metaTitle: { label: "Title", type: Types.I18nText, langs: langs, defaultLang: defaultLang},
		metaDescription: { label: "Description", type: Types.I18nHtml, langs: langs, defaultLang: defaultLang},
		metaNoIndex: { label: "No Index", type: Types.Boolean},
	}
);

//# si se guarda una position, nos aseguramos de que es la única cambiando todas las demás 
Page.schema.pre('save', function(next, done) {

	var page = this;

	var position = page.position;

	if(position && position != 'none'){

		keystone.list('Page').model.update({

			_id: { $ne: page._id },
			position : position

		}, { position : 'none' }).then(() => next()).catch(next);

	}else{

		next();	
	}

});

/*
Page.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});*/


Page.defaultColumns = 'title position state createdAt';//state|20%, author|20%, createdAt|20%
Page.register();