var React = require('react');
var PropTypes = require('react').PropTypes;


//#! leafleft only works in client render
if (process.env.BROWSER) {

	var Map = require('react-leaflet').Map
	var Marker = require('react-leaflet').Marker
	var TileLayer = require('react-leaflet').TileLayer	

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

	displayName: "markerMap",

	propTypes: {

		coords: PropTypes.array.isRequired,
	},

	render: function () {

		//#! leafleft only works in client render
		if (!process.env.BROWSER) return <span/>
		
		var self = this;

		var zoom = 13;
		var position = this.props.coords;//[0,0];
		/*
		if(this.props.coords && this.props.coords != ''){

			position = this.props.coords.split(',').map(function(i){ return parseFloat(i) });	
		}*/
		
		
		//var markers = [];
/*


{markers.map(function(item, index){

			      	var position = item.coords.split(',').map(function(i){ return parseFloat(i) });

			      	return (

			      		<Marker key={item.coords+index} position={position}>

				      		{item.text ? 

				      			<Popup>
						        	<span>{item.text}</span>
						      	</Popup>

				      		: null}
					      
					    </Marker>
			      	);

			      })}
*/

		

		return (
				
			<Map className="MarkerMap" center={position} zoom={zoom} scrollWheelZoom={false}>

			    <TileLayer
			      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
			      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />


			      <Marker position={position}/>
			</Map>
		)
	}
});