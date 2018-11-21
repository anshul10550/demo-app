import {
   UPDATE_BEGIN,
   UPDATE_SUCCESS,
   //USERS_UPDATE_BEGIN,
   //USERS_UPDATE_SUCCESS,
   FETCH_BEGIN,
   FETCH_SUCCESS,
} from './UpdateActions'; 

const defaults = {
  users: {},
  user:{},
  loading: false,
  error: null
}


function updater(state = defaults, action) {
	switch(action.type){

		case  UPDATE_BEGIN:
			return {
				loading : true,
				error : null
			}
		case  UPDATE_SUCCESS:
			return {
			  current_user: action.users,
			  loading: false,
			  error: null
			}
		case FETCH_BEGIN:
			return {
				loading : true,
				error : null
			}
	    case FETCH_SUCCESS:
			return {
			  user: action.user,
			  error: null
			}			   
		default:
		  return state
	}
}

export default updater;