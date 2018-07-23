import metaUpdateBySingle from '../App/metaUpdateBySingle'
import single_get from './single_get';


export default function (location, params, routeLang, req){

  return (dispatch, getState) => {

  	return dispatch( single_get(location,routeLang, params) ).then(() => {

      return dispatch( metaUpdateBySingle(getState().page) )

    });

  }
};