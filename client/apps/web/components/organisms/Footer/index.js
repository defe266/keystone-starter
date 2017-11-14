import React from 'react'//, { PropTypes } 
import { connect } from 'react-redux'

import { Link, IndexLink } from 'react-router'
import Icon from '../../atoms/Icon';
import Row from '../../atoms/Row';
import Col from '../../atoms/Col';
import Firma from './Firma';

import './index.css'



var Footer = React.createClass({

	displayName: "Header",

	render: function () {

		
		
		var self = this;
		var props = this.props;
		var menus = props.menus;
	
		return (

			<div className="Footer">

				<div className="Footer__container">
				
					<div className="container">
						<Row>
							<Col md={3}>
								<img src="/images/logo.svg" className="Footer__logo"/>
							</Col>
							<Col md={3}>

								<div className="Footer__widget">
									<h3 className="Footer__widget__title">Atención al cliente</h3>
									<Icon name="phone"/> +34 XXXX<br/>
									<Icon name="envelope"/> XXXX
								</div>

								<div className="Footer__widget">
									<h3 className="Footer__widget__title">Alojamientos en Val Thorens</h3>
									<ul>
										<li><Link to="/">Hoteles</Link></li>
										<li><Link to="/">Apartamentos</Link></li>
										<li><Link to="/">Chalets</Link></li>
									</ul>
								</div>

							</Col>
							<Col md={3}>

								<div className="Footer__widget">
									<h3 className="Footer__widget__title">Valthorens.es</h3>
									{!menus.loading && !menus.error ? 

										<ul>

											{menus.data.MenuFooter.map((item) => {

												return <li key={item._id}><Link to={item.url.es} target={item.target} >{item.title.es}</Link></li>
											})}

										</ul>

									:null}
								</div>

							</Col>
							<Col md={3}>

								<div className="Footer__widget">
									<h3 className="Footer__widget__title">Síguenos</h3>

									<ul className="Footer__widget__list">
										<li><a className="color-facebook" href="/"><Icon name="facebook-official"/></a></li>
										<li><a className="color-twitter" href="/"><Icon name="twitter"/></a></li>
										<li><a className="color-instagram" href="/"><Icon name="instagram"/></a></li>
									</ul>
								</div>

								<div className="Footer__widget Footer__widget--grey">
									<h3 className="Footer__widget__title">Pago Seguro</h3>

									<ul className="Footer__widget__list">
										<li><Icon name="cc-visa"/></li>
										<li><Icon name="cc-mastercard"/></li>
									</ul>
								</div>

							</Col>
						</Row>
					</div>
				</div>

				<div className="Footer__subfooter">

					<div className="container">

						<Row>
							<Col md={3}></Col>
							<Col md={8}>

								{!menus.loading && !menus.error ? 

									<ul className="Footer__submenu">

										{menus.data.MenuLegal.map((item) => {

											return <li key={item._id}><Link to={item.url.es} target={item.target} >{item.title.es}</Link></li>
										})}

									</ul>

								:null}

							</Col>
						</Row>

					</div>

				</div>


				<div className="Footer__credits">

					<div className="container">
						<div className="pull-left">
						 2017
						</div>


						<div className="pull-right">

							<Firma/>
							
						</div>
					</div>

				</div>


			</div>
		)
	}
});

export default connect((state, ownProps) => {

  return {
  	menus : state.menus
  }

})(Footer)