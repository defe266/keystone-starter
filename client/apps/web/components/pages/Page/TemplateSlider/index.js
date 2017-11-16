import React from 'react'

//import BlockHTML from '../../../atoms/BlockHTML'
import TextI18n from '../../../atoms/TextI18n'
import Icon from '../../../atoms/Icon'
import Slider from '../../../molecules/Slider'



var Page = React.createClass({
  
  propTypes: {
    
    item: React.PropTypes.object.isRequired,
  },

  render: function () {

    const props = this.props;
    const item = props.item;
    const lang = props.lang;

    var images = item.slider.map((item) => {

      return {

          //title: item.title ? item.title.es : '',
          sizes: {full: { url: '/uploads/'+item+'/:/'}},//._id
          content: item.content ? item.content[lang] : '',//"ven a disfrutarlas con la familia o amigos",
          meta: {
            link: [item.link ? item.link[lang] : '']
          }
        }
    })

    


    // className="SliderCover"

    return (

      <div className="TemplateStandar">

          <Slider className="SliderCover" items={images} fixedHeight indicators={false} prevIcon={<Icon name="angle-double-left"/>} nextIcon={<Icon name="angle-double-right"/>}/>

          <div className="container">

            <div className="containerStandar">

              <div className="headerStandar">
                <h1 className="titleStandar"><TextI18n value={item.title}/></h1>
              </div>

              
              <TextI18n value={item.content} html/>

            </div>

          </div>

      </div>
    )
  }

});


export default Page;