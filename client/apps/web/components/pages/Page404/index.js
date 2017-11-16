import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//import { Link } from 'react-router'

import Layout from '../../layouts/Standar';
import Head from '../../organisms/Head';


var Page404 = React.createClass({

  contextTypes: {
    t: React.PropTypes.func.isRequired
  },

  componentWillMount: function(){

    this.props.dispatch({type:'HEAD_UPDATE', data: {

      title: this.context.t("Error 404"),
      description: this.context.t("Parece que no podemos encontrar lo que estás buscando."),
      noIndex: true
    }})
  },

  render: function () {

    const props = this.props;

    return (

      <Layout className="Page404">

        <Head/>

        <div className="container">

          <div className="containerStandar">

            <div className="headerStandar">
              <h1 className="titleStandar">{this.context.t("Error 404")}</h1>
            </div>

           {this.context.t("Parece que no podemos encontrar lo que estás buscando.")}

          </div>

        </div>

      </Layout>
    )
  }

});


export default connect()(Page404)