import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//import I18n from "redux-i18n"
import I18n from "client/wrappers/I18n"
import {translations} from "translations"


import initialLoad from '../actions/App/initialLoad'


import 'bootstrap/dist/css/bootstrap.css';
import './index.css';///{ browserHistory } from



var App = React.createClass({ //class App extends Component {

  

  render: function() {

    const { children } = this.props


    return (

      <I18n translations={translations}>
        <div className="App">
          
          {children}

        </div>
      </I18n>
    )
  }
});



App.fetchData = initialLoad


export default App;