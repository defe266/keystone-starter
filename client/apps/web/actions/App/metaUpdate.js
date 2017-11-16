export default function (title, description, noIndex){

	return (dispatch, getState) => {

		var lang = getState().i18nState.lang;

		var update = {
			title: '',
			description: '',
			noIndex: false
		}

		if(title){

			if(typeof title === 'object'){

				update.title = title[lang];

			}else{

				update.title = title;
			}
		}

		if(description){

			if(typeof description === 'object'){

				update.description = description[lang];

			}else{

				update.description = description;
			}
		}

		if(typeof noIndex !== 'undefined'){

			update.noIndex = noIndex;
		}

		return dispatch({type: 'HEAD_UPDATE', data: update});
	}
}