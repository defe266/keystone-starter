var React = require('react');

var Icon = require('../Icon');



module.exports  = function(props){
	

	var content = props.children;

	

	if(props.loading){

		var loader = (props.loader) ? props.loader : <Icon name="circle-o-notch ButtonLoader__loader" spin/>

		if(props.hideContent){

			content = null;
		}

	}


	var props_btn = Object.assign({},props);
	
	delete props_btn.loading;
	delete props_btn.hideContent;
	delete props_btn.noButton;


	if(props.noButton){

		return <span {...props_btn} disabled={props.loading || props.disabled} >{loader} {content}</span>
	}
		

	return (
	
		<button {...props_btn} disabled={props.loading || props.disabled} >{loader} {content}</button>

	)
}

