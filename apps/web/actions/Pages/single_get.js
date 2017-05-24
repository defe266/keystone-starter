//var sd = require('sharify').data;
var axios = require('axios');
var sd = require('sharify').data;

export default function (location, params){


	return (dispatch, getState) => {


		dispatch({ type:'PAGE_FETCH_REQUEST' })

		return axios({

			url : sd.SERVER_URL+'/api/pages/'+params.slug,//'http://127.0.0.1:5001/api/hotels'
			params: {

				byslug : true
			}

		}).then((res) => {

			dispatch({ type:'PAGE_FETCH_SUCCESS', data:res.data });

		}, (err) => {

			var res = Object.getOwnPropertyDescriptor(err, 'response');
	        res = res ? res.value : res;

	        dispatch({ type:'PAGE_FETCH_ERROR', res : res});

		});
	}
}