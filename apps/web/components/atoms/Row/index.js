//# Bootstrap row with auto clearfix control
var React = require('react');///addons

module.exports = function (props) {


		var items = [];
		var xs_row = 0;
		var sm_row = 0;
		var md_row = 0;
		var lg_row = 0;

		React.Children.forEach(props.children, function (child, index){

			var xs = 12;
			var sm = 12;
			var md = 12;
			var lg = 12;

			//# calculate columns of the element in each range
			if(child.props.xs){

				xs = child.props.xs;
				sm = child.props.xs;
				md = child.props.xs;
				lg = child.props.xs;
			}

			if(child.props.sm){

				sm = child.props.sm;
				md = child.props.sm;
				lg = child.props.sm;
			}

			if(child.props.md){

				md = child.props.md;
				lg = child.props.md;
			}

			if(child.props.lg){

				lg = child.props.lg;
			}


			//# add child
			items.push(child);

			//# add clearfixes if needed

			if(!props.noClearfix){

				xs_row = xs_row + parseInt(xs);
				sm_row = sm_row + parseInt(sm);
				md_row = md_row + parseInt(md);
				lg_row = lg_row + parseInt(lg);

				if(xs_row >= 12){

					xs_row = 0;
					items.push(<div key={index+'xs'} className="clearfix visible-xs-block"/>);
				}

				if(sm_row >= 12){

					sm_row = 0;
					items.push(<div key={index+'sm'} className="clearfix visible-sm-block"/>);
				}

				if(md_row >= 12){

					md_row = 0;
					items.push(<div key={index+'md'} className="clearfix visible-md-block"/>);
				}

				if(lg_row >= 12){

					lg_row = 0;
					items.push(<div key={index+'lg'} className="clearfix visible-lg-block"/>);
				}
			}
			
		})

		var className = props.className ? props.className : '';

		return (
				
			<div className={className + ' row'}>

				{items}

			</div>
				
		)
}