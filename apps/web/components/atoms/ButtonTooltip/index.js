var React = require('react');

var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger.js');
var Tooltip = require('react-bootstrap/lib/Tooltip.js');



var ButtonTooltip = function(props){

	var props_btn = Object.assign({}, props);

	delete props_btn.placement;
	delete props_btn.tooltip;
	delete props_btn.active;

	var button = <span {...props_btn}>{props.children}</span>; //button

	if(!props.tooltip) return button;

	var tooltip = <Tooltip id={props.tooltip}>{props.tooltip}</Tooltip>

	var placement = props.placement ? props.placement : "top";

	return (

		<OverlayTrigger placement={placement} overlay={tooltip}>
			{button}
		</OverlayTrigger>
	)
}

module.exports = ButtonTooltip;