import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


import Layout from '../../layouts/Standar';
import Slider from '../../molecules/Slider';
import Icon from '../../atoms/Icon';




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

    if(!props.loading && !page) return <h1>¡Configura una página de inicio!</h1>


    var images = page.slider.map((item) => {

      return {

          title: item.title ? item.title.es : '',
          sizes: {full: { url: '/uploads/'+item._id+'/:/'}},
          content: item.content ? item.content.es : '',//"ven a disfrutarlas con la familia o amigos",
          meta: {
            link: [item.link ? item.link.es : '']
          }
        }
    })

//debugger;
    

    return (

      <Layout className="Home">
        
        
        <Slider className="SliderCover" items={images} fixedHeight indicators={false} prevIcon={<Icon name="angle-double-left"/>} nextIcon={<Icon name="angle-double-right"/>}/>


      </Layout>
    )
  }

});
/*
//# routing action (server an client side)
Home.fetchData = (location, params, req) => {

  return (dispatch, getState) => {

    return Promise.all([
      dispatch(featuredHotels_get()),
      dispatch(featuredProductCategories_get())
    ])
  }
}*/



export default connect((state, ownProps) => {

  
  
  return {
    loading: state.positions.loading,
    page : state.positions.data.home,
    //resources: state.home
  }

})(Home)