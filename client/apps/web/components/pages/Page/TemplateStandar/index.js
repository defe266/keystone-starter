import React from 'react'

//import BlockHTML from '../../../atoms/BlockHTML'
import TextI18n from '../../../atoms/TextI18n'


var Page = React.createClass({
	
  propTypes: {
    
    item: React.PropTypes.object.isRequired,
  },

  render: function () {

    const props = this.props;
    const item = props.item;


    return (

      <div className="TemplateStandar">

          <div className="container">

            <div className="containerStandar">

              <div className="headerStandar">
                <h1 className="titleStandar"><TextI18n value={item.fields.title}/></h1>
              </div>

              
              <TextI18n value={item.fields.content} html/>

            </div>

          </div>

      </div>
    )
  }

});


export default Page;