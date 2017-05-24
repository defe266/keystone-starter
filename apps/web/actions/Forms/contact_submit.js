var Growl = require('../../lib/growl');
var validators = require('../../lib/validators');
var axios = require('axios');
var sd = require('sharify').data;


export default function (context){

	return (dispatch, getState) => {

		var form = getState().forms.CONTACT;

		var id = form.id;
		var data = form.data;

		//# validación

		var errors = {};

		if(!validators.isEmail(data.email)) errors.email = [context.t('Email inválido')];
		if(data.name == '') errors.name = [context.t('Requerido')];
		if(data.email == '') errors.email = [context.t('Requerido')];



		if (Object.keys(errors).length !== 0){

			Growl(context.t('El formulario contiene errores'), 'danger');

			return dispatch({type: 'FORM_'+id+'_ERRORS', data: errors})
		}


		//# si pasamos validación, enviamos datos

		dispatch({type: 'FORM_'+id+'_LOADING_START'})

		return axios({

			url : sd.SERVER_URL+'/api/form/contact',
			method: 'post',
			data: data

		}).then((res) => {

			//dispatch({type: 'FORM_'+id+'_LOADING_END'});
			dispatch({type: 'FORM_'+id+'_RESET'});

			Growl(context.t('Mensaje enviado'), 'success');


		}, (err) => {

			dispatch({type: 'FORM_'+id+'_LOADING_END'});

			var res = Object.getOwnPropertyDescriptor(err, 'response');
	        res = res ? res.value : res;

	        if(res.status == 400){

	        	dispatch({ type:'FORM_'+id+'_ERRORS', data : res.data})	

	        }else{

	        	Growl(context.t('Error. Inténtalo de nuevo'), 'danger');
	        }
			

		});
	}
}