import React from 'react'//, { PropTypes } 
import { Link, IndexLink } from 'react-router'

import Icon from '../../atoms/Icon';
import Menu from '../../molecules/Menu';

//import './img/logo.svg'

//if(typeof window !== 'undefined') var URL_logo = require("file-loader!./img/logo.svg");//?name=[path][name].[ext]

import './index.css'
//require('./index.css')



var Header = React.createClass({

	displayName: "Header",

	render: function () {

		
		
		var self = this;
		var props = this.props;
	
		return (

			<div className="Header">

				<div className="Header_topBar"></div>
				

        		<div className="Header__navbar">


			        <Link className="Header__logo" to={"/"}>

			        	<img src={'/images/logo.svg'} className="Header__logo__lg"/>
			        	{/*URL_logo
			          	<img src="/img/logo_shokesu_white.svg" className="Header__logo__lg"/>
			          	<img src="/img/logo_shokesu_white_sm.svg" className="Header__logo__sm"/>
			          */}
			        </Link>



			        <div onClick={props.onShowRight} className="Header__toggle Header__toggle_right"><Icon name="bars"/></div>

			        <Menu className="Header__menu"/>
				    

			        
			     
			    </div>

			    <div className="clearfix"/>

			</div>
		)
	}
});

export default Header;