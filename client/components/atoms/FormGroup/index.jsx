//# Bootstrap formGroup with label and basic error display
var React = require('react');


require('./index.css')

module.exports = React.createClass({

	displayName : 'FormGroup',
	
	render: function () {

		var props = this.props;

		var className =  props.className ? props.className  : '';


		if(props.errors){

			var hasError = true;
			var errorText = Object.prototype.toString.call(props.errors) === '[object Array]' ? props.errors[0] : props.errors;
		}


		return (
				
			<div className={className + ' form-group ' + (hasError ? ' has-error' : '') }>

				{props.label ?

					<label className="form-group__label">{props.label}</label>

				:null}
				
				{errorText ? <label className="control-label">{errorText}</label> : null}

				{props.children}

				{props.helpBlock ? 

					<p className="help-block">{props.helpBlock}</p>

				:null}

			</div>
				
		)
	}
})