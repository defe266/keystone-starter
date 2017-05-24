
var defaultState = {

	collection : [],
	error : false,
	loading : false
}

export default (state = defaultState, action) => {

  switch (action.type) {

  	case 'PRODUCT_CATEGORIES_FETCH_REQUEST':

      return Object.assign({}, state, {
        loading: true,
      });

    case 'PRODUCT_CATEGORIES_FETCH_SUCCESS':

      return Object.assign({}, state, {
      	collection: action.data,
        loading: false,
        error: false
      });

    case 'PRODUCT_CATEGORIES_FETCH_ERROR':

      return Object.assign({}, state, {
        loading: false,
        error: true
      });

    default:

      return state

  }
}