import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
//import { browserHistory } from 'react-router'
import { match, Router, RouterContext, createMemoryHistory } from 'react-router'
import sharify from 'sharify';
import _ from 'lodash';
import {Helmet} from "react-helmet";
import { syncHistoryWithStore } from 'react-router-redux'
import {data} from 'sharify'

//import Root from './containers/Root'
import configureStore from './store/configureStore'

import routes from './routes'

var sd = data;


module.exports = function(req, res, next) {


    // Create a new Redux store instance
    const store = configureStore();


    const memoryHistory = createMemoryHistory(req.url)
    const history = syncHistoryWithStore(memoryHistory, store)

    

    match({ history:history, routes: routes }, (error, redirectLocation, renderProps) => { //, location: req.url



        if (error) return next(error)

        if (redirectLocation) {

          res.redirect(302, redirectLocation.pathname + redirectLocation.search)

        } else if (renderProps) {
            
            var routeLang = renderProps.routes[1].lang ? renderProps.routes[1].lang : sd.I18N.default;

            //# recuperamos todos los fetchData asociados a cada componente de la ruta cargada (funciones estáticas) (esperemos por ellos antes de cargar nada)
            var fetchDataActions = renderProps.components.map((comp) => {

                if(!comp.fetchData) return null;

                return comp.fetchData(renderProps.location, renderProps.params, routeLang, req)
            })

            fetchDataActions = _.filter(fetchDataActions, (i) => i != null)


            //# run in serial
            var p = Promise.resolve();

            fetchDataActions.forEach(function(action){

                 p = p.then(() => store.dispatch(action))
            });

            
            p.then(() => {


                // Grab the initial state from our Redux store
                const preloadedState = store.getState()

                res.locals.sd.PRELOADED_STATE = preloadedState;


                const html = renderToString(<Provider store={store}>
                                                <Router {...renderProps} />
                                              </Provider>);

                const helmet = Helmet.renderStatic();


                res.send(`<!doctype html>
                            <html ${helmet.htmlAttributes.toString()}>

                              <head>

                                ${ process.env.NODE_ENV == 'development' ? '' :  '<link href="/assets/web.css?v=3" rel="stylesheet">'}

                                ${helmet.title.toString()}
                                ${helmet.meta.toString()}
                                ${helmet.link.toString()}

                                
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, target-densitydpi=160dpi, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, user-scalable=no">

                              </head>

                              <body ${helmet.bodyAttributes.toString()}>

                                <div id="root">${html}</div>

                                
                                
                                ${ res.locals.sharify.script() }

                                
                                <script type="text/javascript" src="${ process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:'+process.env.PORT_DEV+'/assets/web.js' :  '/assets/web.js?v=3'}"></script>

                              </body>
                            </html>`);



            }).catch(next)

            

        } else {

          next();
        }
    })
}

