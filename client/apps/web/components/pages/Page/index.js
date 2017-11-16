import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//import { Link } from 'react-router'


import initialLoad from '../../../actions/Pages/initialLoad';

import Alert from 'react-bootstrap/lib/Alert';
import Loader from '../../atoms/Loader';
import BlockHTML from '../../atoms/BlockHTML'
import Layout from '../../layouts/Standar';
import Head from '../../organisms/Head';
import Page404 from '../Page404';
import TemplateStandar from './TemplateStandar';
import TemplateContact from './TemplateContact';
import TemplateSlider from './TemplateSlider';



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
    
    if(!notReady){

      //# page in position home only acccesible in home route
      if(props.homeID == item._id) return <Page404/>

      //# select page template component
      switch(item.template){

        case 'contact': var PAGE = <TemplateContact item={item} lang={lang}/>; break;
        case 'slider': var PAGE = <TemplateSlider item={item} lang={lang}/>; break;

        default:  var PAGE = <TemplateStandar item={item} lang={lang}/>
      }  
    }


    return (

      <Layout className="Page">

        <Head/>
        
        {notReady ? notReady : <div>{PAGE}</div>}

      </Layout>
    )
  }

});


//# routing action (server an client side)
Page.fetchData = initialLoad;


//export default Page;


export default connect((state, ownProps) => {

  return Object.assign({}, state.page, {

    homeID : state.positions.data.home ? state.positions.data.home._id : null,
    lang: state.i18nState.lang
  });

})(Page)