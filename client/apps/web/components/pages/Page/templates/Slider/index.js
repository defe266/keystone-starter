import React from 'react'

import Layout from '../../../../layouts/Standar';
import TextI18n from 'client/components/atoms/TextI18n';
import Icon from 'client/components/atoms/Icon';
import Slider from 'client/components/molecules/Slider'



var Page = React.createClass({
  
  propTypes: {
    
    item: React.PropTypes.object.isRequired,
  },

  render: function () {

    const props = this.props;
    const item = props.item;
    const lang = props.lang;


    // className="SliderCover"

    return (

      <Layout className="Page">
        <div className="TemplateStandar">

            <Slider className="SliderCover" items={item.slider} fixedHeight indicators={false} prevIcon={<Icon name="angle-double-left"/>} nextIcon={<Icon name="angle-double-right"/>}/>

            <div className="container">

              <div className="containerStandar">

                <div className="headerStandar">
                  <h1 className="titleStandar"><TextI18n value={item.title}/></h1>
                </div>

                
                <TextI18n value={item.content} html/>

              </div>

            </div>

        </div>

      </Layout>
    )
  }

});


export default Page;