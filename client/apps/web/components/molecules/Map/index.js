var React = require('react');


//#! leafleft only works in client render
if (process.env.BROWSER) {
	var Map = require('react-leaflet').Map;
	var Marker = require('react-leaflet').Marker;
	var TileLayer = require('react-leaflet').TileLayer;
	var FeatureGroup = require('react-leaflet').FeatureGroup;
	var Popup = require('react-leaflet').Popup;

	//#! FIX webpack leaflet marker img 
	//import L from 'leaflet';
	//var L = require('leaflet');

	//L.Icon.Default.imagePath = '.';
	// OR
	delete L.Icon.Default.prototype._getIconUrl;

	L.Icon.Default.mergeOptions({
	  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	  iconUrl: require('leaflet/dist/images/marker-icon.png'),
	  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
	});

	//#! END - FIX webpack leaflet marker img 
}

require('leaflet/dist/leaflet.css');
require('./index.css');





module.exports = React.createClass({

	displayName: "Map",

	reset: function(){

		this.refs.map.leafletElement.invalidateSize();

		if(this.props.fitMarkersBounds && this.refs.markers){

			this.fitMarkersBounds();
		}
	},

	fitMarkersBounds: function(){
		
		var markersBounds = this.refs.markers.leafletElement.getBounds();

		this.refs.map.leafletElement.fitBounds(markersBounds);
	},

	componentDidMount: function(){

		console.log('didmount');

		var self = this;

		//#!! lazy fix: refs.markers takes a long
		setTimeout(function(){

			if(self.props.fitMarkersBounds && self.refs.markers){

				//self.fitMarkersBounds();
				self.reset();
			}

		}, 400)
	},

	render: function () {

		//#! leafleft only works in client render
		if (!process.env.BROWSER) return <span/>
		
		var self = this;



/*
		if(this.props.coords && this.props.coords != ''){

			position = this.props.coords.split(',').map(function(i){ return parseFloat(i) });	
		}*/
		
		
	/*
		var args = {}

		if(props.center) args.center = props.center;
		if(props.zoom) args.zoom = props.zoom;
		if(props.zoom) args.zoom = props.zoom;
		scrollWheelZoom={false}

 <LayerGroup>
				      {this.props.markers.map(function(item, index){

				      	//var position = item.coords.split(',').map(function(i){ return parseFloat(i) });
				      	//item.coords+

				      	


				      	return (

				      		<Marker key={index} {...item}>

					      		{item.popup ? 

					      			<Popup>
							        	<span>{item.popup}</span>
							      	</Popup>

					      		: null}
						      
						    </Marker>
				      	);

				      })}

			      </LayerGroup>

		*/

		var markers = [];

		

		if(this.props.markers){

			markers = this.props.markers.map(function(item, index){

				if(item.icon){

					//item.icon = L.divIcon(item.icon);

					item.icon = L.icon(item.icon);

					/*


					{//+DATA_destinos[i].titulo+'-'
			            className: 'marker-icon',
			            //html: '<a href="#"><span class="title-container"><span class="title">aqui</span></span></a>',
			            html: '<div class="pin-map-container"><img class="img-responsive" src="'+ BootsAPI.wp.stylesheet_directory +'/img/PIN-MAP.svg" onerror="this.onerror=null; this.src=\''+ BootsAPI.wp.stylesheet_directory +'/img/PIN-MAP.png\'"  alt="pin-map"></div>',
			            iconSize: [40, 40]
			        })*/
				}

				icon: 


		      	return (

		      		<Marker key={index} {...item}>

			      		{item.popup ? 

			      			<Popup>
					        	<span>{item.popup}</span>
					      	</Popup>

			      		: null}
				      
				    </Marker>
		      	);

		      });
		}
		

		return (
				
			<Map ref="map" className="Map" {...this.props} >


			    <TileLayer
			      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
			      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />

			      <FeatureGroup ref="markers">
			      	{markers}
			      </FeatureGroup>
			      
			     

			</Map>
		)
	}
});