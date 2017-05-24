
var defaultState = {

	data : {},
	error : false,
	loading : false
}

export default (state = defaultState, action) => {

  switch (action.type) {

  	case 'MENUS_FETCH_REQUEST':

      return Object.assign({}, state, {
        loading: true,
      });

    case 'MENUS_FETCH_SUCCESS':

      return Object.assign({}, state, {
      	data: action.data,
        loading: false,
        error: false
      });

    case 'MENUS_FETCH_ERROR':

      return Object.assign({}, state, {
        loading: false,
        error: true
      });

    default:

      return state

  }
}