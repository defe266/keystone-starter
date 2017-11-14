var React = require('react');
var classNames = require('classnames');



require('./index.css');


module.exports = React.createClass({

	displayName: "Layout",

	componentDidMount: function(){

		this.fixBody();
	},

	componentDidUpdate: function(){
	
	  this.fixBody();

	},

	fixBody: function(){

		if(this.props.showLeft || this.props.showRight){

			document.body.className = document.body.className + ' Layout-open';

		}else{

			document.body.className = document.body.className.replace(' Layout-open','');
		}
	},

	render: function () {
		
		var self = this;

		var className = this.props.className ? this.props.className+' ' : '';

		var classes_layout = classNames({
			'Layout': true,
		    /*'toright': this.props.showLeft,
		    'toleft': this.props.showRight*/
		});

		var classes_overlay = classNames({
			'Layout__overlay': true,
		    'open': this.props.showLeft || this.props.showRight,
		    'toright': this.props.showLeft,
		    'toleft': this.props.showRight
		});

		var classes_left = classNames({
			'Layout__outer left': true,
		    'open': this.props.showLeft
		});

		var classes_right = classNames({
			'Layout__outer right': true,
		    'open': this.props.showRight
		});

		var classes_wrap = classNames({
			'Layout__wrap': true,
			'toright': this.props.showLeft,
		    'toleft': this.props.showRight
		});
		


		
/*
		var classes_container = classNames({
			'cbp-container': true,
			'loading': this.props.isLoading,
			//'open-in-desktop': this.props.config.openInDesktop,
			'cbp-sp-open': this.props.config.left || this.props.config.right
		});*/

		return (

				<div className={className + classes_layout}>

					<div className={classes_overlay} onClick={this.props.onHide}/>

					<div className={classes_left} onClick={this.props.onHide}>{this.props.left}</div>
					<div className={classes_right} onClick={this.props.onHide}>{this.props.right}</div>

					<div className={classes_wrap}>

						{this.props.children}

						

					</div>

				</div>
		)
	}
});



				

				