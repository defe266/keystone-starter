

export default (id, initialState) => {


  var defaultState = {

    id: id,
    values : {},
    show : false,
    error: false,
    loading: false,
    sending: false,
    removing: false,
    errors: {},
    selectedItem: null
  }

  if(initialState){

    defaultState = Object.assign({}, defaultState, initialState);
  }
  
  

  return (state = defaultState, action) => {

    switch (action.type) {

      case 'FORM_'+id+'_UPDATE':

        return Object.assign({}, state, {

          values: Object.assign({}, state.values, action.data),

        });


      case 'FORM_'+id+'_SELECT_REQUEST':

        return Object.assign({}, state, {

          error: false,
          loading: true,
          show: true,

        });

      case 'FORM_'+id+'_SELECT_SUCCESS':

        return Object.assign({}, state, {

          errors: defaultState.errors,
          error: false,
          loading: false,
          selectedItem: action.data,
          values: action.data//Object.assign({}, state.values, action.data)

        });

      case 'FORM_'+id+'_SELECT_ERROR':

        return Object.assign({}, state, {

          error: true,
          loading: false

        });

      case 'FORM_'+id+'_SELECT':

        return Object.assign({}, state, {

          errors: defaultState.errors,
          show: true,
          selectedItem: action.data,
          values: Object.assign({}, state.values, action.data)

        });

      case 'FORM_'+id+'_RESET':

        if(state.selectedItem){

          return Object.assign({}, defaultState, {

            errors: defaultState.errors,
            values: state.selectedItem

          });

        }else{

          return Object.assign({}, defaultState, {

            errors: defaultState.errors,
            values: defaultState.values

          });
        }

      case 'FORM_'+id+'_SHOW':

        return Object.assign({}, state, {
          show: true
        });

      case 'FORM_'+id+'_HIDE':

        return Object.assign({}, state, {
          show: false
        });

      case 'FORM_'+id+'_SEND_START':

        return Object.assign({}, state, {
          sending: true
        });

      case 'FORM_'+id+'_SEND_END':

        return Object.assign({}, state, {
          sending: false
        });

      case 'FORM_'+id+'_SEND_SUCCESS':

        return Object.assign({}, state, {
          sending: false,
          errors: {}
        });

      case 'FORM_'+id+'_SEND_ERRORS':

        return Object.assign({}, state, {
          sending: false,
          errors: action.data
        });

      case 'FORM_'+id+'_REMOVE_START':

        return Object.assign({}, state, {
          removing: true
        });

      case 'FORM_'+id+'_REMOVE_END':

        return Object.assign({}, state, {
          removing: false
        });

      case 'FORM_'+id+'_ERRORS':

        return Object.assign({}, state, {
          errors: action.data
        });

      default:

        return state

    }
  }
}