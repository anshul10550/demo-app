import {
   FETCH_DETAIL_BEGIN,
   FETCH_DETAIL_SUCCESS,
} from './DetailAction'; 

const defaults = {
  user: {},
  loading: false,
  error: null
}


function infos(state = defaults, action) {
	switch(action.type){

		case  FETCH_DETAIL_BEGIN:
			return {
				loading : true,
				error : null
			}
		case  FETCH_DETAIL_SUCCESS:
			return {
			  user: action.user,
			  loading: false,
			  error: null
			}   
		default:
		  return state
	}
}

export default infos;