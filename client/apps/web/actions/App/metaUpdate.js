export default function (title, description, noIndex, slugs){

	return (dispatch, getState) => {

		var lang = getState().i18nState.lang;

		var update = {
			title: '',
			description: '',
			noIndex: false,
			slugs: null,
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


		if(typeof slugs !== 'undefined'){

			update.slugs = slugs;
		}

		return dispatch({type: 'HEAD_UPDATE', data: update});
	}
}