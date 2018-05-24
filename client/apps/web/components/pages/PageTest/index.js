import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//import { Link } from 'react-router'


import initialLoad from '../../../actions/Pages/initialLoad';

import Alert from 'react-bootstrap/lib/Alert';
import Loader from '../../atoms/Loader';
import BlockHTML from 'client/components/atoms/BlockHTML';
import Layout from '../../layouts/Standar';
import Head from '../../organisms/Head';
import Page404 from '../Page404';


var Page = React.createClass({
	
  propTypes: {
    
    item: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
    //error: React.PropTypes.bool.isRequired,
  },

  render: function () {

    const props = this.props;
    const item = props.item;
    const lang = props.lang;


    if(props.notFound) return <Page404/>

    if(props.loading) var notReady = <Loader/>
    if(props.error) var notReady = <Alert bsStyle="danger">Se ha producido un error.</Alert>
    

    return (

      <Layout className="Page">

        {notReady ? notReady :

          <BlockHTML>{item.content[lang]}</BlockHTML>

        }
      </Layout>
    )
  }

});


//# routing action (server an client side)
Page.fetchData = (location, params, req) => { 

  return (dispatch, getState) => {

    return dispatch( initialLoad(location, params, req) )
  }
}



//export default Page;


export default connect((state, ownProps) => {

  return {...state.page, ...{
    lang: state.i18nState.lang
  }}

})(Page)