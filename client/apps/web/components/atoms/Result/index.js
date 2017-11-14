var React = require('react');
var sd = require('sharify').data;
var classNames = require('classnames');

require('./index.css');


var Result = function (props) {

	var sizeClass = props.size ? ' Result--size-'+props.size : '';

	var classes = classNames({
		"Result" : true,
		"Result--left" : props.left,
		"Result--right" : props.right
	});

	return (
	
		<div className={classes + sizeClass}>
			{props.children}
		</div>
			
	)
}

module.exports.Error = function (props) {

	return <Result {...props}>{'Se ha producido un error.'}</Result>
}

module.exports.NotFound = function (props) {

	return <Result {...props}>{'No existe.'}</Result>
}


module.exports.Empty = function (props) {

	return <Result {...props}>{'Sin resultados.'}</Result>
}


module.exports.default = Result;