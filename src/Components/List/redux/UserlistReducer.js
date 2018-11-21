import {
   FETCH_USERSLIST_BEGIN,
   FETCH_USERSLIST_SUCCESS,
} from './UserlistAction';

const defaults = {
  users:[],
  loading: false,
  error: null
}


function usertable(state = defaults, action) {

	switch(action.type){

		case  FETCH_USERSLIST_BEGIN:
			return {
				loading : true,
				error : null
			}
		case  FETCH_USERSLIST_SUCCESS:
			return {
			  users: action.users || [],
			  loading: false,
			  error: null
			} 			
		default:
		  return state
	}
}

export default usertable;