var React = require('react');///addons

var Carousel = require('react-bootstrap/lib/Carousel.js');
var CarouselItem = require('react-bootstrap/lib/CarouselItem.js')
//var Link = require('components/Link');
import { Link, IndexLink } from 'react-router'

require('./index.css');


module.exports = React.createClass({

	displayName: "Slider",


	clickSlide: function(index){

		var self = this;

		return function(e){

			if(self.props.onClickSlide) self.props.onClickSlide(index,e);
		}
	},

	render: function () {
		
		var self = this;
		var props = this.props;

		var hideCaption = this.props.hideCaption;
		var fixedHeight = this.props.fixedHeight;
		var className = this.props.className ? this.props.className : '';
		var imgSize = this.props.imgSize ? this.props.imgSize : 'full';

		return (

				<Carousel {...this.props} className={"Slider "+ className}>

					{this.props.items.map(function(item,index){

						if(!fixedHeight){

							var img = <img className="Slider__img" alt={item.title} src={item.sizes[imgSize].url}/>

						}else{

							var style ={

								backgroundImage : "url("+item.sizes[imgSize].url+")",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover"
							}

							var img = <div className="Slider__img Slider__divimg" style={style}/>
						}

						if(!hideCaption){

							var caption = (

								<div className="carousel-caption">
							        <h3>{item.title}</h3>
							        <div className="Slider__caption-content" dangerouslySetInnerHTML={{__html: item.content}} />
							    </div>
							);
						}

						return (

							<CarouselItem key={item.id} onClick={self.clickSlide(index)}>

								{props.noLinks ? 

									<div>
										{img}
							      		{caption}
									</div>

								:


									<Link to={(item.meta.link) ? item.meta.link[0] : ''}>
										{img}
							      		{caption}
									</Link>
								}

								

						    </CarouselItem>
						)

					})}
				    
				</Carousel>
		)
	}
});