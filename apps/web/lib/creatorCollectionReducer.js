

export default function(model){

	var defaultState = {

		collection : [],
		error : false,
		loading : false
	}

	return (state = defaultState, action) => {

	  switch (action.type) {

	  	case model.toUpperCase()+'_FETCH_REQUEST':

	      return Object.assign({}, state, {
	        loading: true,
	      });

	    case model.toUpperCase()+'_FETCH_SUCCESS':

	      return Object.assign({}, state, {
	      	collection: action.data,
	        loading: false,
	        error: false
	      });

	    case model.toUpperCase()+'_FETCH_ERROR':

	      return Object.assign({}, state, {
	        loading: false,
	        error: true
	      });

	    default:

	      return state

	  }
	}

}