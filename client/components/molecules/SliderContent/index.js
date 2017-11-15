var React = require('react');
var ReactDom = require('react-dom');

var Carousel = require('react-bootstrap/lib/Carousel.js');
var CarouselItem = require('react-bootstrap/lib/CarouselItem.js')
var Row = require('../../atoms/Row');
var Col = require('../../atoms/Col');
var _ = require('lodash');
//var Link = require('components/Link');
//import { Link, IndexLink } from 'react-router'

require('./index.css');


module.exports = React.createClass({

	displayName: "SliderContent",

	propTypes: {

		xs: React.PropTypes.number.isRequired,
		sm: React.PropTypes.number.isRequired,
		md: React.PropTypes.number.isRequired,
	    lg: React.PropTypes.number.isRequired
	},

	getInitialState: function(){

        return {
            width: null
        }
    },

    componentWillMount: function(){

    	this.resize_debounced = _.debounce(this.resize, 800);
    },

    componentDidMount: function() {

        window.addEventListener('resize',  this.resize_debounced);

        this.resize();
    },

    componentWillUnmount: function() {

        window.removeEventListener('resize', this.resize_debounced);
    },

    resize: function() {

		var elem = ReactDom.findDOMNode(this);
        var width = elem.offsetWidth;

        this.setState({

            width: width

        },() => {

        	setTimeout(() => {

        		if(this.props.onResize) this.props.onResize() 

        	}, 500)

        });
    },

    calculateActiveCols: function(){
		
		var ww = 1200;

		if(process.env.BROWSER){

			var ww = window.innerWidth;
		}

		
		if(ww > 1200){
		
			return this.props.lg;
		}
		
		if(ww > 992){
		
			return this.props.md;
		}
		
		if(ww > 767){
		
			return this.props.sm;
		}
		
		if(ww <= 767){//480?
		
			return this.props.xs;
		}
	},
		

	render: function () {
		
		var self = this;
		var props = this.props;
		var children = React.Children.toArray(props.children);

		var className = this.props.className ? this.props.className : '';
		
		var total = children.length;
		var cols = this.calculateActiveCols();

		
		var itemsPerPage = Math.ceil(12/cols);
		var pages = Math.ceil(total/itemsPerPage);

		var itemIndex = 0;
		var SLIDES = [];

		for(var i = 0; i < pages ; i++){

			var ITEMS = [];

			while(itemIndex < total && itemIndex < ((i+1) * itemsPerPage)){

				ITEMS.push(
				
					<Col key={itemIndex} xs={props.xs} sm={props.sm} md={props.md} lg={props.lg}>
						{children[itemIndex]}
					</Col>
				);

				itemIndex++;
			}
						
			
			SLIDES.push(

				<CarouselItem key={i}>

					<Row>{ITEMS}</Row>

					<div className="clearfix"/>

				</CarouselItem>
			);
			

		}
		


		return (

				<Carousel {...this.props} className={"SliderContent "+ className}>

					{SLIDES}
				    
				</Carousel>
		)
	}
});