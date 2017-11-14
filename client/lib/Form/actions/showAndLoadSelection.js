import api_request from './api_request';


export default function (id, path, params){

	return (dispatch, getState) => {


		dispatch({type: 'FORM_'+id+'_SELECT_REQUEST'})


		return dispatch(api_request({

			path: path,
			method: 'get',
			params: params

		})).then(function(res){

		  dispatch({type: 'FORM_'+id+'_SELECT_SUCCESS', data: res.data})

		},function(err){

		  dispatch({type: 'FORM_'+id+'_SELECT_ERROR'})

		  return Promise.reject('request error')
		})

		
	}
}