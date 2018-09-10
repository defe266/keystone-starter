import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, match, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import configureStore from './store/configureStore'
import updateLangByRoute from './actions/App/updateLangByRoute'

var sd = require('sharify').data;
//import DevTools from './DevTools'



//# Grab the state from a global variable injected into the server-generated HTML
const preloadedState = sd.PRELOADED_STATE

//# Create Redux store with initial state
const store = configureStore(preloadedState);

const history = syncHistoryWithStore(browserHistory, store);

function NavitationHandler(error, redirectLocation, renderProps){

	if(renderProps){

		//# get correct route lang
		var routeLang = renderProps.routes[1].lang ? renderProps.routes[1].lang : sd.I18N.default;

		//# recuperamos todos los fetchData asociados a cada componente de la ruta cargada (funciones estáticas)
		Promise.all(

			renderProps.components.map((comp) => {

				if(!comp.fetchData) return null;

				//return comp.fetchData(store.dispatch, store.getState);
				return store.dispatch( comp.fetchData(renderProps.location, renderProps.params, routeLang) ); ////, lang) );
			})
		)
	}
}




//# listen navigation changes -> trigger components fetchData
var clientNavitations = 0;

history.listen((location) => {

	//# pedimos los recursos que declaren los componentes igual que en el servidor
	if(clientNavitations > 0){//if(location.action == 'POP' || location.action == 'PUSH'){

		match({ location, routes }, NavitationHandler);
	}

	clientNavitations++;
})
/*
//# listen navigation changes -> trigger components fetchData
history.listen((location) => {


	//# mantenemos los idiomas sincronizados en POP hitorial
	if(location.action == 'POP'){

		//console.log('POP!!!')

		match({ location, routes }, (error, redirectLocation, renderProps) => {		

			if(renderProps){

				var routeLang = renderProps.routes[1].lang ? renderProps.routes[1].lang : sd.I18N.default;

				store.dispatch( updateLangByRoute(routeLang) );
			}
		});

	}


	//# pedimos los recursos que declaren los componentes igual que en el servidor
	if(location.action == 'PUSH'){

		match({ location, routes }, (error, redirectLocation, renderProps) => {		

			if(renderProps){

				var routeLang = renderProps.routes[1].lang ? renderProps.routes[1].lang : sd.I18N.default;


				Promise.all(

					 //# recuperamos todos los fetchData asociados a cada componente de la ruta cargada (funciones estáticas) (esperemos por ellos antes de cargar nada)
					renderProps.components.map((comp) => {

						if(!comp.fetchData) return null;

						//return comp.fetchData(store.dispatch, store.getState);
						return store.dispatch( comp.fetchData(renderProps.location, renderProps.params, routeLang) ); ////, lang) );
					})
				)
			}
		});
	}
	
})*/


//# Mount react app
match({ history, routes }, (error, redirectLocation, renderProps) => {


		render(<Provider store={store}>
			      <Router {...renderProps} />
			  </Provider>, document.getElementById('root'))

});