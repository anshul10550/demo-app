import {
  SET_ERROR_MESSAGE,
  SET_SUCCESS_MESSAGE
} from './AlertActions'; 

const defaults = {
  success_message: false,
  error: null
}

function alert(state = defaults, action) {
	switch(action.type){
		case  SET_ERROR_MESSAGE:
			return{
				success_message: null,
				error: action.error
			}
		case  SET_SUCCESS_MESSAGE:
			return {
			  error: null,
			  success_message: action.success_message
			}
		default:
		  return state
	}
}

export default alert;