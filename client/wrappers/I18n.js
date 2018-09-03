import React from 'react'
import I18n from "redux-i18n"

//# propagete translate functión with other name: __
var I18nContent = React.createClass({

  contextTypes: {

    t : React.PropTypes.func.isRequired
  },

  childContextTypes: {

    __ : React.PropTypes.func.isRequired
  },

  getChildContext: function() {

    return {
      __ : this.context.t
    }
  },

  render: function() {

    const { children } = this.props

    return (

       <div>{children}</div>
    )
  }
});


export default (props) => {


	return (

		<I18n {...props}>
			<I18nContent>
				{props.children}
			</I18nContent>
		</I18n>
	)
}