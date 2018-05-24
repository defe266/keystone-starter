var React = require('react');

//# Uso font-awesome para usar sus clases helpers, como fa-spin -> no usar sus iconos directamente para no cargar recursos extras!!
require('font-awesome/css/font-awesome.css'); 

//# Empaquetado custom de iconos a través de icomoon.io
require('./icons/style.css')

require('./index.css')


var Icon = function(props){

	var className = props.className ? props.className : '';
	var spinClass = props.spin ? 'fa-spin ' : '';

	return <i className={"Icon icon-"+props.name + ' ' + spinClass + className}/>;
}


Icon.propTypes = {

  name: React.PropTypes.string.isRequired

};


module.exports = Icon