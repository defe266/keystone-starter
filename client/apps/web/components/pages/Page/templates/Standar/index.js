import React from 'react'

import Layout from '../../../../layouts/Standar';
import TextI18n from '../../../../atoms/TextI18n'


var Page = React.createClass({
	
  propTypes: {
    
    item: React.PropTypes.object.isRequired,
  },

  render: function () {

    const props = this.props;
    const item = props.item;


    return (

      <Layout className="Page">

        <div className="TemplateStandar">

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