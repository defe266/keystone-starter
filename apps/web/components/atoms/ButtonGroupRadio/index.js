var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	
	/*
	change: function(e){

		var self = this;

		// Getting an array of DOM elements
        // Then finding which element was clicked
        var nodes = Array.prototype.slice.call( e.currentTarget.children );
        var index = nodes.indexOf( e.target );
        //this.setState({ active: index });
        //console.info(nodes, index, this.props.children);

        React.Children.forEach(this.props.children, function (item, i){

        	if(i == index){

        		//console.info('Change to ', item.props.value);

        		if(self.props.onChange) self.props.onChange(item.props.value)
        	}
		})
	},*/

	change: function(value){

		var self = this;

		return function(e){

			//console.log('select', value);

			if(self.props.onChange) self.props.onChange(value);
		}
	},
	
	render: function () {

		var self = this;
		
		var className = this.props.className ? this.props.className : '';

		return (

			// onClick={ this.change }
			<div {...this.props} className={className + " btn-group radio-button-group"}>

				{React.Children.map(this.props.children, function (item, index){

					var active = (item.props.value == self.props.value);

					return React.cloneElement(item,{

						onClick : self.change(item.props.value),
						active : active,
						className : (active) ? item.props.className+' active' : item.props.className
					})
				})}

			</div>

		)
	}
});

