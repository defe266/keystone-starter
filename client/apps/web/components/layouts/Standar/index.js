//var React = require('react');///addons

import React from 'react'
import { connect } from 'react-redux'
//var PureRenderMixin = require('react-addons-pure-render-mixin');
/*
var Layout = require('../../molecules/Layout');
var Header = require('../../molecules/Header');


require('./index.css')*/

import BannerCookies from '../../atoms/BannerCookies'
import Layout from '../../molecules/Layout'
import Menu from '../../molecules/Menu'
import Header from '../../organisms/Header'
import Footer from '../../organisms/Footer'
import Offcanvas from './Offcanvas'



import './index.css'


var LayoutStandar = React.createClass({

	displayName: "LayoutStandar",

	//mixins: [PureRenderMixin],

	/*
    componentDidUpdate: function(prevProps, prevState){

    	var prevCollapse = prevState.collapse && typeof prevProps.sidebarLeft != 'undefined';
    	var collapse = this.state.collapse && typeof this.props.sidebarLeft != 'undefined';

  		//#! Fix: detecto cambio en estado del collapse y disparo un evento resize después de Xms para refrescar los masonrys y demás cosas que necesiten ir en sincronía con el delay de la animación
		if(prevCollapse != collapse){

			setTimeout(() => {
				
				window.dispatchEvent(new Event('resize'));

			},400)

			
		}
  	},*/

    
	showLeftOffcanvas: function(){

		this.props.dispatch({

			type: 'OFFCANVAS_CHANGE',
			left: true,
			right: false
		});
	},
	
	showRightOffcanvas: function(){
		
		this.props.dispatch({

			type: 'OFFCANVAS_CHANGE',
			left: false,
			right: true
		});
	},

	hideOffcanvas: function(){
		
		this.props.dispatch({

			type: 'OFFCANVAS_CHANGE',
			left: false,
			right: false
		});
		/*
		this.context.executeAction(dispatch,{
			action : 'CHANGE_OFFCANVAS',
			payload: {
				left: false,
				right: false
			}
		})*/
	},

	render: function () {
		
		var self = this;
		var props = this.props;
		var layout = props.layout;
		var positions = props.positions;

		/*
		var state = this.state;

		
		//# si estoy en estado collapsed y hay un sidebar activo -> add collapsed class
		

		//console.log('class_collapse',state, props)
*/
		var className = props.className ? props.className : '';
		var class_collapse = props.collapse && props.sidebarLeft ? 'LayoutStandar--collapsed ' : '';

		return (


			<Layout showLeft={layout.left}
					showRight={layout.right}
					left={false}
					right={<Offcanvas><Menu/></Offcanvas>}
					onHide={this.hideOffcanvas}
					className={class_collapse + className}>


					<div className="flex-wrapper">


						<div className="flex-header">

							<Header onShowLeft={this.showLeftOffcanvas} onShowRight={this.showRightOffcanvas}/>
							
						</div>

						{props.subHeader ? 

							<div className="flex-subHeader">{props.subHeader}</div>

						: null}
						
						

						<div className="flex-content">


							{props.sidebarLeft ? 

								<div className="flex-content-sidebar left">{props.sidebarLeft}</div>

							:null}
					    
						    <div className='flex-content-content'>

						    	{this.props.children}

						    	<Footer/>
						    	
						    </div>

						    {props.sidebarRight ? 

								<div className="flex-content-sidebar right">{props.sidebarRight}</div>

							:null}

							{props.modalBtn ? 

								<div className="LayoutStandar__modalBtn">{props.modalBtn}</div>

							:null}

					    </div>


				    </div>

				    {positions.data.cookies ? 

						<BannerCookies url={"/"+positions.data.cookies.key}/>

					:null}
					

					{/*<div className="flex-footer">Footer</div>*/}

			</Layout>
		)
	}
});


const mapStateToProps = (state, ownProps) => {

  return {
  	positions: state.positions,
  	//loading: state.loading,
    layout : state.layout,
  }
}

export default connect(mapStateToProps)(LayoutStandar)

//export default LayoutStandar