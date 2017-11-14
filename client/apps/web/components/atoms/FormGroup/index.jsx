//# Bootstrap formGroup with label and basic error display
var React = require('react');



module.exports = React.createClass({

	displayName : 'FormGroup',
	
	render: function () {

		var props = this.props;

		var className =  props.className ? props.className  : '';


		if(props.errors){

			var hasError = true;
			var errorText = props.errors[0];
		}


		return (
				
			<div className={className + ' form-group ' + (hasError ? ' has-error' : '') }>

				{props.label ?

					<label className="form-group__label">{props.label}</label>

				:null}
				
				<label className="control-label">{errorText}</label>

				{props.children}

				{props.helpBlock ? 

					<p className="help-block">{props.helpBlock}</p>

				:null}

			</div>
				
		)
	}
})