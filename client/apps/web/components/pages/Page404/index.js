import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//import { Link } from 'react-router'

import Layout from '../../layouts/Standar';


var Hotels = React.createClass({

  render: function () {

    const props = this.props;

    return (

      <Layout className="Page404">

        <div className="container">

          <div className="containerStandar">

            <div className="headerStandar">
              <h1 className="titleStandar">Error 404</h1>
            </div>

           Parece que no podemos encontrar lo que estás buscando.

          </div>

        </div>

      </Layout>
    )
  }

});


export default Hotels;