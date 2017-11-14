//# Require Libs
var React = require('react');///addons
var ReactDOM = require('react-dom');
//var $ = require('jquery');
//import { connect } from 'react-redux'
//import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';

//# ACTIONS
//var WPActions = require('actions/WPActions.js');



//# render raw html and intercepts internal links to use pushstate

var BlockHTML = React.createClass({

	displayName: "BlockHTML",

    /*
  	componentDidMount: function(){

        var self = this;

        this.$el = $(ReactDOM.findDOMNode(this));

        //# mount server side defined components
        this.components = [];

        this.$el.find('reactComponent').each(function(){

        	var name = $(this).data('name');
        	var props = $(this).data('props');

        	switch(name){

        		case 'Gallery' : var Component = require('components/Gallery'); break; //!!!apuntar directamente?¿?¿¿?
        	}

        	if(Component){

        		self.components.push(this);
        		ReactDOM.render(<Component {...props}/>, this);
        	}
        });
    },

    componentWillUnmount: function(){

    	//# unmount server side defined components
    	for(var i in this.components){

    		ReactDOM.unmountComponentAtNode(this.components[i]);
    	}
    },*/

	click: function(e){

        
		//e.preventDefault();

		//console.log(e, e.target);

		//# intercepts anchors
        
		if(e.target.tagName == 'A'){

			//# pushstate suport an link is under the same domain
			if(history && e.target.href.indexOf(document.domain) != -1 ){

				e.preventDefault();

				//this.context.executeAction( WPActions.navigate, e.target.href );

                //this.props.dispatch(push(e.target.href));

                browserHistory.push(e.target.href)
			}
		}
	},

	render: function () {
		
		var self = this;

		return (

			<div className={this.props.className} onClick={this.click} dangerouslySetInnerHTML={{__html: this.props.children}} />
		)
	}
});



//module.exports = connect()(BlockHTML)

module.exports = BlockHTML