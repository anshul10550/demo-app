

export const SESSION_CHECK_BEGIN = 'SESSION_CHECK_BEGIN'
export const SESSION_CHECK_LOADED = 'SESSION_CHECK_LOADED'
export const SESSION_CHECK_ERROR = 'SESSION_CHECK_ERROR'
export const SESSION_END_BEGIN = 'SESSION_END_BEGIN'
export const SESSION_END_SUCCESS = 'SESSION_END_SUCCESS'
export const SESSION_END_ERROR = 'SESSION_END_ERROR'
export default UserLoginStatus;



function sessionCheckBegin(){
	return{
		type : SESSION_CHECK_BEGIN,
	} 
}

function sessionCheckLoaded(user){
	return{
		type : SESSION_CHECK_LOADED,
		user
	}
}

function sessionCheckError(message) {
	return {
		type : SESSION_CHECK_ERROR,
		error : message
	}
}

export function UserLoginStatus(){

	return dispatch => {
		dispatch(sessionCheckBegin());
		let user = localStorage.getItem("current_user")
      if(user === undefined || user === null){
     	  dispatch(sessionCheckError("User not logged in."));
      } else{ 
      	dispatch(sessionCheckLoaded(JSON.parse(user)));
      }
		}     
  }

function sessionEndBegin(current_user){
	return{
		type: SESSION_END_BEGIN,
		user: current_user
	} 
}

function sessionEndSuccess(user){
	return{
		type: SESSION_END_SUCCESS,
		user
	}
}

function sessionEndError(current_user, message) {
	return {
		type: SESSION_END_ERROR,
		user: current_user,
		error: message
	}
}

export function logoutUser(current_user) {
  
  return dispatch => {

	  dispatch(sessionEndBegin(current_user));

    return fetch('https://rga2018.herokuapp.com/api/sessions',{
      method: 'DELETE',
      body: JSON.stringify(current_user),
      headers: {

        'Accept-Type': 'application/json',
        'Authorization': current_user.token

      }
    })
      .then(response => response.json())
      .then(json => {
        if(json.meta.code===200 && json.meta.message==="success") {
          localStorage.removeItem("current_user");
          dispatch(sessionEndSuccess(json.data));
          dispatch(UserLoginStatus());
        } else{
          dispatch(sessionEndError(current_user, json.meta.message));
          console.log(json.meta.message);

        }
      })
  }
}
