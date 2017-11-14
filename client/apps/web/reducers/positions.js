
var defaultState = {

	data : {},
	error : false,
	loading : false
}

export default (state = defaultState, action) => {

  switch (action.type) {

  	case 'POSITIONS_FETCH_REQUEST':

      return Object.assign({}, state, {
        loading: true,
      });

    case 'POSITIONS_FETCH_SUCCESS':

      return Object.assign({}, state, {
      	data: action.data,
        loading: false,
        error: false
      });

    case 'POSITIONS_FETCH_ERROR':

      return Object.assign({}, state, {
        loading: false,
        error: true
      });

    default:

      return state

  }
}