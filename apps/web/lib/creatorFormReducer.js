import moment from 'moment'

export default (id, initialState) => {


  var defaultState = {

    id: id,
    data : {},
    show : false,
    loading: false,
    removeLoading: false,
    errors: {},
    editingItem: null
  }

  if(initialState){

    defaultState = Object.assign({}, defaultState, initialState);
  }
  
  

  return (state = defaultState, action) => {

    switch (action.type) {

      case 'FORM_'+id+'_UPDATE':

        return Object.assign({}, state, {

          data: Object.assign({}, state.data, action.data),

        });

      case 'FORM_'+id+'_SELECT':

        return Object.assign({}, state, {

          errors: defaultState.errors,
          show: true,
          editingItem: action.data,
          data: Object.assign({}, state.data, editingItem)

        });

      case 'FORM_'+id+'_RESET':

        if(state.editingItem){

          return Object.assign({}, defaultState, {

            errors: defaultState.errors,
            data: state.editingItem

          });

        }else{

          return Object.assign({}, defaultState, {

            errors: defaultState.errors,
            data: defaultState.data

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

      case 'FORM_'+id+'_LOADING_START':

        return Object.assign({}, state, {
          loading: true
        });

      case 'FORM_'+id+'_LOADING_END':

        return Object.assign({}, state, {
          loading: false
        });

      case 'FORM_'+id+'_REMOVE_LOADING_START':

        return Object.assign({}, state, {
          removeLoading: true
        });

      case 'FORM_'+id+'_REMOVE_LOADING_END':

        return Object.assign({}, state, {
          removeLoading: false
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