import api_request from './api_request';
//var Growl = require('client/lib/growl');


export default function (options){ //id, path, method, values

	return (dispatch, getState) => {

		//dispatch({type: 'FORM_'+options.id+'_UPDATE', data: values});
		dispatch({type: 'FORM_'+options.id+'_SEND_START'})


		return dispatch(api_request({

			path: options.path,
			method: options.method ? options.method : 'post',
			data: options.values,
			params: options.params,

		})).then(function(res){

			//Growl('Guardado', 'success');

			dispatch({type: 'FORM_'+options.id+'_SEND_SUCCESS'})

			return res.data;

		},function(err){


			var res = Object.getOwnPropertyDescriptor(err, 'response');
			res = res ? res.value : res;

			if(res.data && res.data.type == "Validation"){

				dispatch({ type:'FORM_'+options.id+'_SEND_ERRORS', data : res.data.errors})

			}else{

				dispatch({type: 'FORM_'+options.id+'_SEND_END'})

				//Growl('Error. Inténtalo de nuevo', 'danger');
			}

			return Promise.reject(res)

		})

		
	}
}