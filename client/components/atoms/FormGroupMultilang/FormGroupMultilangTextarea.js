var React = require('react');
import { connect } from 'react-redux'
var sd = require('sharify').data;

var FormGroupMultilang = require('./FormGroupMultilang');



var FormGroupMultilangTextarea = React.createClass({
	
	displayName: 'FormGroupMultilangTextarea',
	
	change: function(lang, value){

		var update = {}

		update[lang] = value

		var newValue = Object.assign({}, this.props.value, update)

		if(this.props.onChange) this.props.onChange(newValue)
	},

	render: function () {
	
		const props = this.props;

		var i18n = sd.I18N;
		var langs = props.langs;

		return (
		
				<div className="FormGroupMultilangTextarea">

					<FormGroupMultilang label={props.label}>

					  {langs.map((lang, index) => {

					  	var errors = props.errors[props.name+'.'+lang]

					  	return (

					  		<FormGroupMultilang.lang code={lang} label={i18n.langsNames[index]} errors={errors}>

		                        <textarea type="text" className="form-control" value={props.value[lang]} onChange={ (e) => this.change(lang, e.target.value) } rows={props.rows}/>

		                    </FormGroupMultilang.lang>
					  	)

					  })}

                    </FormGroupMultilang>

				</div>
		)
	}
});



FormGroupMultilangTextarea = connect((state, ownProps) => {

      return {
      	langs : state.user.item.customer.langs
      }

})(FormGroupMultilangTextarea)

module.exports = FormGroupMultilangTextarea;