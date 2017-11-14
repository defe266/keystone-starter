export default (state = {

  left: false,
  right: false

}, action) => {

  switch (action.type) {

  	case 'OFFCANVAS_CHANGE':

      return Object.assign({}, state, {

        left: action.left,
        right: action.right

      });

    default:

      return state

  }
}