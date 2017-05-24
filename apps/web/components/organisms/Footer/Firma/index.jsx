var React = require('react');///addons

require('./index.css');

module.exports = function(props) {

	return (

			<div className="designed-by">
				<span className="by">BY</span>
				<a className="autor juanjo" href="http://juanjov.com/" title="Diseñado por Juan José Vélez" target="_blank"></a>
				<a className="autor gabriel" href="http://gabrielgomez.es" title="Programado por Gabriel Gómez Pérez" target="_blank"></a>
			</div>
	)
}