var React = require('react');///addons
import { connect } from 'react-redux'
const processString = require('react-process-string');

var Carousel = require('react-bootstrap/lib/Carousel.js');
var CarouselItem = require('react-bootstrap/lib/CarouselItem.js')
//var Link = require('components/Link');
//import { Link, IndexLink } from 'react-router'
import BlockHTML from 'client/components/atoms/BlockHTML'
import Link from 'client/components/atoms/Link';
import Icon from 'client/components/atoms/Icon';
import YoutubeModal from 'client/components/molecules/YoutubeModal';


require('./index.css');


var Slider = React.createClass({

	displayName: "Slider",


	clickSlide: function(index){

		var self = this;

		return function(e){

			if(self.props.onClickSlide) self.props.onClickSlide(index,e);
		}
	},

	render: function () {
		
		const self = this;
		const props = this.props;
		const lang = props.lang;

		const hideCaption = this.props.hideCaption;
		const fixedHeight = this.props.fixedHeight;
		const className = this.props.className ? this.props.className : '';
		//var imgSize = this.props.imgSize ? this.props.imgSize : 'full';

		const many_items = props.items && props.items.length > 1

		const items = props.items.map((item) => {

			//# si es una galería simple (sólo ids de imágenes), la transformamos a modo compatible 
			if(typeof item == 'string'){

				return {

					_id: item,
					title : null,
					content: null,
					multiLink: false,
					link: null,
				}
			}

			return item
		})

		/*
		<div className="Slider__caption-content" dangerouslySetInnerHTML={{__html: item.content}} />
		*/

		return (

				<Carousel controls={many_items} indicators={many_items} {...this.props} className={"Slider "+ className}>

					{items.map(function(item,index){

						var src = '/uploads/'+item._id+'/:/';

						if(!fixedHeight){

							var img = <img className="Slider__img" alt={item.title ? item.title[lang] : null} src={src}/>

						}else{

							var style ={

								backgroundImage : "url("+src+")",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover"
							}

							var img = <div className="Slider__img Slider__divimg" style={style}/>
						}

						if(!hideCaption && (item.title || item.content)){

							var caption = (

								<div className="carousel-caption">

							        {item.title && item.title[lang] ? 

							        	<h3>{item.title[lang]}</h3>

							        : null}

							        {item.content && item.content[lang] ? 

							        	<div className="Slider__caption-content">
								        	<BlockHTML>{item.content[lang]}</BlockHTML>

								        	{item.multiLink ?

								        		<div className="Slider__caption__buttons">

								        			{item.links.map((link) => {

								        				var url = link.link && link.link[lang] ? link.link[lang] : null;
								        				var text = '';

								        				

								        				if(link.classNameBtn == 'btn btn-video-play'){

								        					text = <Icon name="play"/>;

								        				}else{

								        					if(link.text && link.text[lang]){

									        					text = processString([{
																    regex: /\[(.*?)\]/,
																    fn: (key, result) => {														    	

																        return <Icon key={key} name={result[1]}/>;
																    }

																}])(link.text[lang]);
									        				}

								        				}

								        				var classes = link.classNameBtn + ' ' + link.classNameBtnStyle

								        				//# YoutubeModal mode
								        				if(url && url.indexOf('youtube:') != -1){


								        					return (


									        					<YoutubeModal className={classes} video={url.replace('youtube:','')}>{text}</YoutubeModal>
									        				)
								        				}

								        				return (

								        					<Link className={classes} to={url}>{text}</Link>
								        				)
								        			})}

								        		</div>

								        	:null}

								        </div>

							        : null}

							    </div>
							);
						}

						if(!props.noLinks && !item.multiLink && item.link && item.link[lang] ){

							var CONTENT = (

								<Link className="Slider__item__container" to={item.link[lang]}>
									{img}
						      		{caption}
								</Link>
							)

						}else{

							var CONTENT = (

								<div className="Slider__item__container">
									{img}
						      		{caption}
								</div>
							)
						}

						

						return (

							<CarouselItem key={item._id} onClick={self.clickSlide(index)}>

								{CONTENT}

						    </CarouselItem>
						)

					})}
				    
				</Carousel>
		)
	}
});


module.exports = connect((state) => {

    return {

        lang: state.i18nState.lang
    }

})(Slider)