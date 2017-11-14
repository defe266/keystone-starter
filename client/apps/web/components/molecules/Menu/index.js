import React from 'react'//, { PropTypes } 
import { connect } from 'react-redux'

import Link from '../../atoms/Link';


var Menu = React.createClass({

	displayName: "Menu",

	render: function () {
	
		var props = this.props;
		var className = this.props.className ? this.props.className : '';

		return (

			<ul className={"Menu "+className}>

				{props.data.MenuMain.map((item) => {

					return <li key={item._id}><Link to={item.url.es} activeClassName="active" target={item.target} IndexLink>{item.title.es}</Link></li>
				})}

		    </ul>
		)
	}
});

export default connect((state, ownProps) => {

  return state.menus

})(Menu)