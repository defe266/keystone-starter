var React = require('react');///addons
import { connect } from 'react-redux'

var PhotoSwipe = require('react-photoswipe').PhotoSwipe;
				 require('react-photoswipe/lib/photoswipe.css');

var Slider = require('../Slider');

require('./index.css');


var SliderPopup = React.createClass({

	displayName: "SliderPopup",

	getInitialState: function(){

		return	{

			showGallery : false,
			galleryIndex : 0
		}
	},
/*

	clickSlide: function(index){

		var self = this;

		return function(e){

			if(self.props.onClickSlide) self.props.onClickSlide(index,e);
		}
	},*/

	showGallery: function(e){//index, e

		e.preventDefault();
		e.stopPropagation();
		/*
		e.preventDefault();
		e.stopPropagation();

		console.log("showGallery",index);

		this.setState({ 
			showGallery : true,
			galleryIndex: index
		});*/

		this.setState({ showGallery : true });
	},

	hideGallery: function(){

		this.setState({ showGallery : false });
	},

	render: function () {
		
		var self = this;
/*
		var hideCaption = this.props.hideCaption;
		var fixedHeight = this.props.fixedHeight;
		var className = this.props.className ? this.props.className : '';
		var imgSize = this.props.imgSize ? this.props.imgSize : 'full';
*/


/*
<SliderPopup items={WPContext.post.meta.galeria} className="SinglePack__carousel" fixedHeight={true} hideCaption={true} />
						
						<PhotoSwipe isOpen={this.state.showGallery} items={galleryItems} options={{index : this.state.galleryIndex}} onClose={this.hideGallery} />
*/

		var galleryItems = this.props.items.map(function(item){

			if(typeof item == 'string'){

				var src = '/uploads/'+item+'/:/';
				var title = null;

			}else{

				var src = '/uploads/'+item._id+'/:/';
				var title = item.title ? item.title[lang] : '';
			}

			return {
			    src: src,
			    w: 0,//item.sizes.full.width,
			    h: 0,//item.sizes.full.height,
			    title: title,
			    //thumbnail: item.sizes[thumbnailSize]
			}
			
		});

		var options = {

			index : this.state.galleryIndex,
			history: false,
			//showAnimationDuration: 0,
			//hideAnimationDuration: 0,
			focus: false,
			zoomEl: true
		}

		return (

			<div className={this.className + " SliderPopup"}>

				<div onClick={this.showGallery}>
					<Slider {...this.props} activeIndex={0} noLinks/>
				</div>

				<PhotoSwipe isOpen={this.state.showGallery} items={galleryItems} options={options} onClose={this.hideGallery} imageLoadComplete={function(instance, index, item){


					//# fix unknown width & height 

					if(item.html === undefined && item.onloading === undefined && (item.w < 1 || item.h < 1)) {
					//if (item.w < 1 || item.h < 1) { // unknown size

				        var img = new Image(); 

				        img.onload = function() { // will get size after load

					        item.w = this.width; // set image width
					        item.h = this.height; // set image height
				           instance.invalidateCurrItems(); // reinit Items
				           instance.updateSize(true); // reinit Items
				        }
				    	img.src = item.src; // let's download image
				    }

				}}/>

			</div>
		)
	}
});


module.exports = connect((state) => {

    return {

        lang: state.i18nState.lang
    }

})(SliderPopup)