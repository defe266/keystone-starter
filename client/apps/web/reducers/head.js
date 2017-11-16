
var defaultState = {

	title: '',
  description: '',
  noIndex: false,

}

export default (state = defaultState, action) => {

  switch (action.type) {

   case 'HEAD_UPDATE':

      return Object.assign({}, state, action.data);

  	case 'HEAD_TITLE_SET':

      return Object.assign({}, state, {
        title: action.data,
      });

    case 'HEAD_DESCRIPTION_SET':

      return Object.assign({}, state, {
        description: action.data,
      });

    case 'HEAD_NOINDEX_SET':

      return Object.assign({}, state, {
        noIndex: action.data,
      });

    default:

      return state

  }
}