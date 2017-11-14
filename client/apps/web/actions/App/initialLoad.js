//import getUserByCookie from './getUserByCookie'
import positions_get from './positions_get'
import menus_get from './menus_get'
import updateLangByRoute from './updateLangByRoute'


export default function (location, params, routeLang, req){

  return (dispatch, getState) => {

  	var ready = getState().ready

    dispatch( updateLangByRoute(routeLang) );

  	if(ready) return;

    return Promise.all([

      dispatch( positions_get() ),
      dispatch( menus_get() )

    ]).then(() => {

      return dispatch( {type: 'READY'} );

    });

  }
};