var React = require('react');


require('./index.css')

module.exports = React.createClass({

	displayName: "Offcanvas",

	render: function(){

		return (

			<div className="Offcanvas">
				{this.props.children}
	    	</div>
		)
	}
});