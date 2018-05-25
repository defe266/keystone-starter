//# Require Libs
var React = require('react');///addons
var ReactDOM = require('react-dom');
var $ = require('jquery');
//import { connect } from 'react-redux'
//import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';

//# ACTIONS
//var WPActions = require('actions/WPActions.js');



//# render raw html and intercepts internal links to use pushstate

var BlockHTML = React.createClass({

	displayName: "BlockHTML",

   
  	componentDidMount: function(){

        var self = this;

        this.$el = $(ReactDOM.findDOMNode(this));

        //# mount server side defined components
        this.components = [];

        this.$el.find('._ReactComponentSpan').each(function(){

        	var name = $(this).data('name');
        	var props = $(this).data('props');

            //console.log(name,props)

        	switch(name){

        		//case 'Gallery' : var Component = require('components/Gallery'); break; //!!!apuntar directamente?¿?¿¿?
                case 'Icon' : var Component = require('client/components/atoms/Icon'); break; //!!!apuntar directamente?¿?¿¿?
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
    },

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

    parseHtmlString: function(html){


        //\[$shortcode(.*?)?\](?:(.+?)?\[\/$shortcode\])?

        //var rePattern = new RegExp(/\[icon(.*?)?\](?:(.+?)?\[\/icon\])?/, "gi");

        //var rePattern = new RegExp(/(\w+)\s*=\s*"([^"]*)"(?:\s|$)|(\w+)\s*=\s*\'([^\']*)\'(?:\s|$)|(\w+)\s*=\s*([^\s\'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|(\S+)(?:\s|$)/, "i");


        //var rePattern = new RegExp('/(.?)\[([\w\-]+)\b((?:[^\[\]]|(?R)|.)*?)(?:(\/))?\](?:(.+?)\[\/\2\])?(.?)/', 'gm');

        ///\](.*?)\[/g


        //var rePattern = new RegExp(/\[([\w-_]+)([^\]]*)?\](?:(.+?)?\[\/\1\])?/gi);

        var rePattern = new RegExp(/\[\[([\w-_]+)([^\]\]]*)?\]\](?:(.+?)?\[\[\/\1\]\])?/gi);

        return html.replace(rePattern, function(match, nameText, argsText){

            var props = {};

            //console.log('match?', match, nameText, argsText);

            var children = match.match(/\]\](.*?)\[\[/)

            props.children = children ? children[1] : null 

            //console.log('children ', props.children,children)


            if(argsText){


                var args = argsText.match(/(\w+)\s*=\s*"([^"]*)"(?:\s|$)|(\w+)\s*=\s*\'([^\']*)\'(?:\s|$)|(\w+)\s*=\s*([^\s\'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|(\S+)(?:\s|$)/gi)

                args = args.map((i) => i.replace(new RegExp('&nbsp;', 'g'),'').replace(/\"/g,''))

                args.forEach((item) => {

                    var parts = item.split('=')

                    props[parts[0]] = parts[1]
                })

                //console.log('args ', args, props)    
            }
            

            var reactComponent = '<span class="_ReactComponentSpan" data-name="'+nameText+'" data-props=\''+JSON.stringify(props)+'\'></span>';//BINGO</reactComponent>

            //console.log(reactComponent)

            return reactComponent
        });

    },

	render: function () {
		
		var self = this;

        var html = this.parseHtmlString(this.props.children)

		return (

			<div className={this.props.className} onClick={this.click} dangerouslySetInnerHTML={{__html: html}} />
		)
	}
});



//module.exports = connect()(BlockHTML)

module.exports = BlockHTML