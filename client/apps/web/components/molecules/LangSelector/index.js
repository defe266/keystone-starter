import React from 'react';
import { connect } from 'react-redux'

var sd = require('sharify').data;
var I18N = sd.I18N;

import { Link } from 'react-router'
var DropdownButton = require('react-bootstrap/lib/DropdownButton.js');


import './index.css'

var LangSelector = React.createClass({

  render: function () {

    const props = this.props;
    const langSelected = props.lang;
    var pathname = props.pathname;

    if(!pathname) return <span/>

    if(langSelected == I18N.default){

		var defaultPathname = pathname;

	}else{

		var pathname_parts = pathname.split('/');

		pathname_parts.shift();
		pathname_parts.shift();

		var defaultPathname = '/' + pathname_parts.join('/');

	}


	var icon = '';
	var text = '';

	if(!props.noIcon){

		icon = <img className="LangSelector__flag" src={"/images/flags/"+langSelected+'.png'}/>
	}


	if(!props.noText){

		text = props.shortName ? langSelected : I18N.langsNames[ I18N.langs.indexOf(langSelected) ]
	}

	var title = <span>{icon}{text}</span>;

    
    var classes = props.className ? props.className : ''
	
	return (
		

		<span className={"LangSelector " + classes}>
			<DropdownButton key={langSelected} bsStyle="link" title={title} id={'Selector de idiomas'} pullRight={props.pullRight} noCaret={props.noCaret}>

				{I18N.langs.map((lang, index) => {

					if(lang == langSelected) return null

					var langPath = lang == I18N.default ? '' : '/'+lang

					var url = langPath + defaultPathname;

					var icon = '';
					var text = '';

					if(!props.noIcon){

						icon = <img className="LangSelector__flag" src={"/images/flags/"+lang+'.png'}/>
					}


					if(!props.noText){

						text = props.shortName ? lang : I18N.langsNames[index]
					}
					

					//return <MenuItem key={lang}><Link  to={url}>{I18N.langsNames[index]}</Link></MenuItem>
					return <Link key={lang} className="LangSelector__item" to={url}>{icon}{text}</Link>
				})}

			</DropdownButton>
	 	</span>
    )
  }

});


//export default FormPax;


export default connect((state, ownProps) => {

  return {

   lang : state.i18nState.lang,
   pathname: state.routing.locationBeforeTransitions ? state.routing.locationBeforeTransitions.pathname : null

  }

})(LangSelector)