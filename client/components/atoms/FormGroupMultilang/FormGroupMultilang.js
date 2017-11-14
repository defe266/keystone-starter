var React = require('react');
//import { connect } from 'react-redux'


var Tabs = require('react-bootstrap/lib/Tabs');
var Tab = require('react-bootstrap/lib/Tab');

var FormGroup = require('../FormGroup/index.jsx');


require('./index.css');




//var FormSingle = require('./formSingle.jsx');



var FormGroupMultilang = React.createClass({
	
	displayName: 'FormGroupMultilang',
	

	getInitialState: function(){

		return {

			lang : this.props.children[0].props.code
		}
	},

	changeLang: function(newLang){

		this.setState({lang : newLang});
	},

	render: function () {
	

		var activeKey = this.state.lang;
		var haveErrors = false;
		var errors = false;

		//# localize first lang-children error -> active & show error message
		React.Children.forEach(this.props.children, function (lang){


			//console.log("lang", lang.props);//.get(0);

			if(!haveErrors && lang.props.errors){

				haveErrors = true;
				errors = lang.props.errors;
				activeKey = lang.props.code;
			}
		});



		return (
		
			
				<div className="FormGroupMultilang">

					<FormGroup label={this.props.label} errors={errors} helpBlock={this.props.helpBlock}>

						<Tabs activeKey={activeKey} onSelect={this.changeLang} animation={false}>

							{React.Children.map(this.props.children, function (item, index){

								var code = item.props.code
								var label = item.props.label


								return (

									<Tab eventKey={code} title={label ? label : code}>

										{item}

									</Tab>
								)
							})}

						</Tabs>

					</FormGroup>

				</div>
		)
	}
});


FormGroupMultilang.lang = function(props){ //# child components


	return <div>{props.children}</div>
}

/*


FormGroupMultilang = connect((state, ownProps) => {

      return {
      	langs : state.user.item.customer.langs
      }//Object.assign(ownProps, )

})(FormGroupMultilang)
*/

module.exports = FormGroupMultilang;