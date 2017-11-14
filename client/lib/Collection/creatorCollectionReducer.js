

export default function(model){

	var defaultState = {

		collection : [],
		error : false,
		loading : false,
		page: 1,
		maxPages: null,
	}

	return (state = defaultState, action) => {

	  switch (action.type) {

	  	case model.toUpperCase()+'_RESET':

	      return Object.assign({}, defaultState);

	  	case model.toUpperCase()+'_CHANGEPAG':

	      return Object.assign({}, state, {
	        page: action.data,
	      });

	  	case model.toUpperCase()+'_FETCH_REQUEST':

	      return Object.assign({}, state, {
	        loading: true,
	      });

	    case model.toUpperCase()+'_FETCH_SUCCESS':

	      return Object.assign({}, state, {
	      	collection: action.data.collection,
	        loading: false,
	        error: false,
	        maxPages: action.data.maxPages,
	      });

	    case model.toUpperCase()+'_FETCH_ERROR':

	      return Object.assign({}, state, {
	        loading: false,
	        error: true
	      });

	    case model.toUpperCase()+'_PUT':

	      return Object.assign({}, state, {

	        collection: state.collection.map(function (item) {

		        if(item._id == action.data._id){

		          return Object.assign({}, item ,action.data );
		        }

		        return item;
		    })

	      });

	    case model.toUpperCase()+'_POST':

	      return Object.assign({}, state, {

	        collection: [...state.collection, action.data]

	      });

	    case model.toUpperCase()+'_DELETE':

	      return Object.assign({}, state, {

	        collection: state.collection.filter(function (item) {

		        return item._id != action.data._id;
		    })

	      });

	    case model.toUpperCase()+'_BULK_PUT':

	      return Object.assign({}, state, {

	        collection: state.collection.map(function (item) {

	        	var update = action.data.find((i) => i._id == item._id)

		        if( update ){

		          return Object.assign({}, item, update);
		        }

		        return item;
		    })

	      });


	     case model.toUpperCase()+'_BULK_POST':

	      return Object.assign({}, state, {

	        collection: [...state.collection, ...action.data]

	      });

	    default:

	      return state

	  }
	}

}