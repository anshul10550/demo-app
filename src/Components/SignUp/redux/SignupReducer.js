import {
  SIGNUP_RESET,
  FETCH_SIGNUP_BEGIN,
  FETCH_SIGNUP_SUCCESS, 
} from './SignupActions';


const defaults = {
  processing: false,
  signup: {},
}

function signup(state = defaults, action) {
  switch (action.type) {
    case SIGNUP_RESET:
      return {
        processing: false,
        signup: {},
      }
    case FETCH_SIGNUP_BEGIN:
      return {
        processing: true,
        signup: {},
      }
    case FETCH_SIGNUP_SUCCESS:
      return {
        processing: false,
        signup: action.signup,
      }
            
    default:
      return state
  }
}

export default signup;