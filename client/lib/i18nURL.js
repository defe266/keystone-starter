var sd = require('sharify').data;
var I18N = sd.I18N;


export default function i18nURL(defaultPathname, langSelected) {

  if(!defaultPathname) return '/'

	if(langSelected == I18N.default){

		return defaultPathname;

   }else{

		var langPath = '/'+langSelected;

		return langPath + defaultPathname
   }

}