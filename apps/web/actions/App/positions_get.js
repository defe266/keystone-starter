var axios = require('axios');
var sd = require('sharify').data;
var cookie = require('cookie-dough')();


export default function (){

	return (dispatch, getState) => {

		dispatch({ type:'POSITIONS_FETCH_REQUEST' })

		return axios({

			url : sd.SERVER_URL+'/api/positions',//'http://127.0.0.1:5001/api/hotels'

		}).then((res) => {

			dispatch({ type:'POSITIONS_FETCH_SUCCESS', data: res.data })

		}, () => {

			dispatch({ type:'POSITIONS_FETCH_ERROR'})

		});
	}
}