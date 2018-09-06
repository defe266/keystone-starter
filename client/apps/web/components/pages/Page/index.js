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
import TemplateStandar from './templates/Standar';
import TemplateContact from './templates/Contact';
import TemplateSlider from './templates/Slider';


function getComponentByTemplate(template){

  switch(template){

    case 'contact': return TemplateContact
    case 'slider': return TemplateSlider

    default:  return TemplateStandar
  }
}


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
    if(props.error) var notReady = (

      <div className="container">
        <br/><br/><br/><br/>
        <Alert bsStyle="danger">Se ha producido un error.</Alert>
        <br/><br/><br/>
      </div>
    )
    
    if(!notReady){

      //# page in position home only acccesible in home route
      if(props.homeID == item._id) return <Page404/>

      
      //# si la pagina está cargada, devolvemos
      var Component = getComponentByTemplate(item.template);

      return <Component {...props}/>
    }

    return (

      <Layout className="Page">{notReady}</Layout>
    )
  }

});


//# routing action (server an client side)
Page.fetchData = (location, params, routeLang, req) => { 

  return (dispatch, getState) => {

    return dispatch( initialLoad(location, params, routeLang, req) ).then(() => {

      var template = getState().page.item.template

      //# si la plantilla tiene opciones de carga desde server, las encadenamos
      var Component = getComponentByTemplate(template);

      if(Component.fetchData){

        return dispatch( fetchData(location, params, req) )
      }

    })
  }
}



//export default Page;


export default connect((state, ownProps) => {

  return Object.assign({}, state.page, {

    homeID : state.positions.data.home ? state.positions.data.home._id : null,
    lang: state.i18nState.lang
  });

})(Page)