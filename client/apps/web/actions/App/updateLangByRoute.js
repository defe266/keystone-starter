import {setLanguage} from "redux-i18n"



export default function updateLangByRoute(routeLang){//, changelang

  return (dispatch, getState) => {


    var lang = getState().i18nState.lang;
  	var ready = getState().ready;

    if(routeLang != lang) dispatch( setLanguage(routeLang) );    

    return
  }
};