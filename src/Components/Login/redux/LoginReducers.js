import {
  FETCH_LOGIN_BEGIN,
  FETCH_LOGIN_SUCCESS,
 
} from './LoginActions';


const defaults = {
  processing: false,
  login: {}
}

function login(state = defaults, action) {
  switch (action.type) {
    case FETCH_LOGIN_BEGIN:
      return {
        processing: true,
        login: {}
      }
    case FETCH_LOGIN_SUCCESS:
      return {
        processing: false,
        login: action.login
      }   
    default:
      return state
  }
}

export default login;