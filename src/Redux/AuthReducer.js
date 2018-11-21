import {
   SESSION_CHECK_BEGIN,
   SESSION_CHECK_LOADED,
   SESSION_CHECK_ERROR,
   SESSION_END_BEGIN,
   SESSION_END_SUCCESS,
   SESSION_END_ERROR,

} from './AuthActions'; 



const defaults = {
  // current_user:null,
  loading: false,
  error: null
}


function auth(state = defaults, action) {
	switch(action.type){

		case  SESSION_CHECK_BEGIN:
			return{
				current_user:null,
				loading : true,
				error : null
			}
		case  SESSION_CHECK_LOADED:
			return {
			  current_user: action.user,
			  loading: false,
			  error: null
			}
		case SESSION_CHECK_ERROR:
			return{
				current_user: null,
				loading: false,
				error : action.error,

			}
		case  SESSION_END_BEGIN:
			return {
				current_user: action.user,
				loading : true,
				error : null
			}
		case  SESSION_END_SUCCESS:
			return {
			  current_user: action.user,
			  loading: false,
			  error: null
			}
		case SESSION_END_ERROR:
			return {
				current_user: action.user,
				loading: false,
				error : action.error,

			}			

		default:
		  return state
	}
}

export default auth;