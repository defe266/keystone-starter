var React = require('react');

if (process.env.BROWSER) {

	var cookie = require('cookie-dough')();
}



//window.co = cookie;

//var Link = require('components/Link');
import { Link } from 'react-router'

require('./index.css');



var BannerCookies = React.createClass({

	contextTypes: {
	    t: React.PropTypes.func.isRequired
	  },

	acceptCookies: function(){

		cookie.set('cookieConsent', 'true', { expires: new Date(new Date().getFullYear()+10, 1, 1), path: '/' });//expira en 10 años 

		this.forceUpdate();
	},

	render: function (props) {

		var props = this.props

		
		//HTMLprintf( __( 'This site uses cookies to improve the services offered. If you continue with this browsing session, we consider that you accept the use. <a href="%s">Learn more</a>', 'wpboots' ),  props.url)

		if( cookie && cookie.get('cookieConsent') ) return null;

		/*
		<div className="BannerCookies__text_container">

				{__( 'This site uses cookies to improve the services offered. If you continue with this browsing session, we consider that you accept the use.' )}


				&nbsp; <Link href={props.url}>{__('Learn more')}</Link>

			</div>
			<div className="BannerCookies__button_container">

				<span className="BannerCookies__button btn btn-primary" onClick={this.acceptCookies}>{__('Accept')}</span>


			</div>
			
			<div className="clearfix"/>


			__('Accept')
		*/

		return (


			<div className="BannerCookies">
				<div className="BannerCookies__content">

					{/*__( 'This site uses cookies to improve the services offered. If you continue with this browsing session, we consider that you accept the use.' )*/}

					{this.context.t('Este sitio usa cookies para mejorar su rendimiento. Si continúa navegando consideramos que acepta la política de cookies.')}

					&nbsp; <Link to={props.url}>{this.context.t('Learn more')}</Link>

					&nbsp; &nbsp; <span className="BannerCookies__button" onClick={this.acceptCookies}><i className="fa fa-times"/></span>

				</div>
			</div>
		)
	}
});


module.exports = BannerCookies;