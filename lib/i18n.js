import { getTranslateFunction } from 'redux-i18n'
import {translations} from "translations"
import {data} from 'sharify'
var sd = data;

//# Traduce reutilizando mecanismos de librería cliente.
module.exports.__ = function(string, params, comment, lang, fallbackLang){

	//console.log('lang', string, params, comment, lang, fallbackLang)
    //if(!lang) return string;

    lang = lang || sd.I18N.default

    var translate = getTranslateFunction(translations, lang, fallbackLang)
    
    return translate(string, params, comment);
}