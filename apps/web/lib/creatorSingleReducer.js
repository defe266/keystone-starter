
export default function(model){

  var defaultState = {

  	item : {},
  	error : false,
    notFound: false,
  	loading : false
  }

  return (state = defaultState, action) => {

    switch (action.type) {

    	case model.toUpperCase()+'_SINGLE_FETCH_REQUEST':

        return Object.assign({}, state, {
          loading: true,
          error: false,
          notFound:false
        });

      case model.toUpperCase()+'_SINGLE_FETCH_SUCCESS':

        return Object.assign({}, state, {
        	item: action.data,
          loading: false,
          error: false,
          notFound:false
        });

      case model.toUpperCase()+'_SINGLE_FETCH_ERROR':

        return Object.assign({}, state, {
          loading: false,
          error: action.res.status != 404,
          notFound: action.res.status == 404,
        });

      default:

        return state

    }
  }
}