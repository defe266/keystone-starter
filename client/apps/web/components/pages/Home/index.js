import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import metaUpdateBySingle from '../../../actions/App/metaUpdateBySingle';

import Head from '../../organisms/Head';
import Layout from '../../layouts/Standar';
import Icon from 'client/components/atoms/Icon';
import BlockHTML from 'client/components/atoms/BlockHTML';
import Slider from 'client/components/molecules/Slider';




//import { Link } from 'react-router'

import './index.css';

var Home = React.createClass({
  /*
  propTypes: {
    hotels: PropTypes.object.isRequired,
    //onRefresh: PropTypes.func.isRequired,
    //onDecrement: PropTypes.func.isRequired
  },*/

  render: function () {

    const props = this.props;
    const page = props.page;
    const lang = props.lang;

    if(!props.loading && !page) return <h1>¡Configura una página de inicio!</h1>


    return (

      <Layout className="Home">
        
        <Head/>

        <Slider className="SliderCover" items={page.slider} fixedHeight indicators={false} prevIcon={<Icon name="angle-double-left"/>} nextIcon={<Icon name="angle-double-right"/>}/>


        <BlockHTML>{page.content[lang]}</BlockHTML>


      </Layout>
    )
  }

});



//# cargo mi seo en server
Home.fetchData = (location, params, req) => { 

  return (dispatch, getState) => {

     var homeResource = {

      item : getState().positions.data.home
    }

    return dispatch( metaUpdateBySingle(homeResource) )
  }
}




export default connect((state, ownProps) => {

  
  
  return {
    loading: state.positions.loading,
    page : state.positions.data.home,
    lang : state.i18nState.lang,
    //resources: state.home
  }

})(Home)