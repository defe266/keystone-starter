/*import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from './components/Counter'
import counter from './reducers'

const store = createStore(counter)
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <Counter
    value={store.getState()}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  rootEl
)

render()
store.subscribe(render)


*/

/*
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Create Redux store with initial state
const store = configureStore(preloadedState);

const history = syncHistoryWithStore(browserHistory, store);


render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
*/




import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, match, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import configureStore from './store/configureStore'

var sd = require('sharify').data;
//import DevTools from './DevTools'



// Grab the state from a global variable injected into the server-generated HTML
//const preloadedState = window.__PRELOADED_STATE__

const preloadedState = sd.PRELOADED_STATE

// Create Redux store with initial state
const store = configureStore(preloadedState);

const history = syncHistoryWithStore(browserHistory, store);


//# listen navigation changes -> trigger components fetchData
history.listen((location) => {

	//console.log('location',location.action)

	if(location.action == 'PUSH'){

		match({ location, routes }, (error, redirectLocation, renderProps) => {
			

			if(renderProps){

				Promise.all(

					 //# recuperamos todos los fetchData asociados a cada componente de la ruta cargada (funciones estáticas) (esperemos por ellos antes de cargar nada)
					renderProps.components.map((comp) => {

						if(!comp.fetchData) return null;

						//return comp.fetchData(store.dispatch, store.getState);
						return store.dispatch( comp.fetchData(renderProps.location, renderProps.params) );
					})
				)
			}
		});
	}
	
	//console.log(store.getState())
})


//# Mount react app
match({ history, routes }, (error, redirectLocation, renderProps) => {

	/*
	Promise.all(

		 //# recuperamos todos los fetchData asociados a cada componente de la ruta cargada (funciones estáticas) (esperemos por ellos antes de cargar nada)
		renderProps.components.map((comp) => {

			if(!comp.fetchData) return null;

			return comp.fetchData(store.dispatch, store.getState);
		})

	).then(() => {*/

		//console.log('xxx')

		render(<Provider store={store}>
			      <Router {...renderProps} />
			  </Provider>, document.getElementById('root'))
	//})

  

});