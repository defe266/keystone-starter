var axios = require('axios');
var sd = require('sharify').data;


export default function (){

	return (dispatch, getState) => {

		dispatch({ type:'MENUS_FETCH_REQUEST' })

		return axios({

			url : sd.SERVER_URL+'/api/menus',//'http://127.0.0.1:5001/api/hotels'

		}).then((res) => {

			dispatch({ type:'MENUS_FETCH_SUCCESS', data: res.data })

		}, () => {

			dispatch({ type:'MENUS_FETCH_ERROR'})

		});
	}
}