var React = require('react');
var _ = require('lodash');


var InputWithEnd = React.createClass({

    componentWillMount: function(){

    	var delay = this.props.delay ? this.props.delay : 500;

    	this.changeEnd = _.debounce((props, value) => {

	    	//console.log("terminado!");

	    	if(props.onChangeEnd) props.onChangeEnd(value);

	    }, delay);
    },

    changeInput: function (e) {

    	this.changeEnd(this.props, e.target.value);

    	if(this.props.onChange) this.props.onChange(e);
    },

	render: function () {

		var props = this.props;
		var props_btn = Object.assign({},props);
	
		delete props_btn.onChangeEnd;

		var className = props.className ? props.className : '';

		


		

		return (
				
			<input {...props} className={'InputWithEnd ' + className} defaultValue={props.defaultValue} onChange={this.changeInput}/>
		)
	}
});


module.exports = InputWithEnd;