import React from 'react'
import { Route, IndexRoute } from 'react-router'
var sd = require('sharify').data;
var I18N = sd.I18N;

//import Counter from './components/Counter.js'
import App from './components/index';//./containers/
import Home from './components/pages/Home';
import Page from './components/pages/Page';
import PageTest from './components/pages/PageTest';
import Page404 from './components/pages/Page404';


function createI18nIndexRoutes(component){

	return I18N.langs.map((lang) => {

		if(lang == I18N.default) return <IndexRoute key={lang} component={component} lang={lang}/>

  		return <Route key={lang} path={'/'+lang} component={component} lang={lang}/>

  	})
}

function createI18nRoutes(base, component){

	return I18N.langs.map((lang) => {

  		var langPath = lang == I18N.default ? '' : lang+'/';
  		var url = langPath+base;

  		return <Route key={lang} path={url} component={component} lang={lang}/>

  	})
}

/*
	
  	<IndexRoute component={Home}/>
	<Route path="/:slug" component={Page} />
	<Route path="*" component={Page404} />
*/

export default <Route path="/" component={App}>
  

	{createI18nIndexRoutes(Home)}
	{createI18nRoutes("page/:slug", PageTest)}
	{createI18nRoutes(":slug", Page)}
	{createI18nRoutes("*", Page404)}

</Route>