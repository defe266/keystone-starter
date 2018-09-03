var sd = require('sharify').data;
var I18N = sd.I18N;


export default function i18nURL(defaultPathname, langSelected) {

	if(!defaultPathname || !langSelected) return '/'

	var path = defaultPathname;

	//# si es modo slug multiidioma, elegirmos la opción adecuada dentro del objeto
	if(typeof defaultPathname === 'object'){

	 	path = '/'+defaultPathname[langSelected]
	}


	if(langSelected == I18N.default){

		return path;

	}else{

		var langPath = '/'+langSelected;

		return langPath + path
	}

}