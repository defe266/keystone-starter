var keystone = require('keystone');
var Types = keystone.Field.Types;
var i18n = require('../config.js').i18n
var langs = i18n.langs
var defaultLang = i18n.default


var Menu = new keystone.List('MenuMainLink', {

	sortable: true,
	singular: 'Enlace',
	plural: 'Menu',
	map: { name: 'title.es' },

});


Menu.add({

	title: { label: "Título", type: Types.I18nText, langs: langs, defaultLang: defaultLang, initial: true, required: true},
  	url: { label: "Url", type: Types.I18nText, langs: langs, defaultLang: defaultLang, initial: true, required: true},

	target: { label: "Apertura", type: Types.Select, default: '_self', options: [

		{ label: 'Misma página', value: '_self' },
		{ label: 'Pestaña nueva', value: '_blank' },
		
	]},
  
});

Menu.defaultColumns = 'title url';

Menu.register();