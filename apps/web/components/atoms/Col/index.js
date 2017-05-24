//# Bootstrap column with clearfix
var React = require('react');///addons


module.exports = function (props) {
		
		//var self = this;
		//var props = this.props;
		var classes_this = '';


		if(props.className){

			classes_this += props.className;
		}

		if(props.xs){

			classes_this += ' col-xs-'+ props.xs;
		}

		if(props.sm){

			classes_this += ' col-sm-'+ props.sm;
		}

		if(props.md){

			classes_this += ' col-md-'+ props.md;
		}

		if(props.lg){

			classes_this += ' col-lg-'+ props.lg;
		}

//<div></div>

		return (

				
					<div className={classes_this}>

						{props.children}

					</div>
				
		)
}