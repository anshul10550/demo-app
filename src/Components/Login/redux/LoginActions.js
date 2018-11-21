import fetch from 'cross-fetch';
import UserLoginStatus from '../../../Redux/AuthActions';
import {setErrorMessage, setSuccessMessage, AlertDismiss } from '../../../Redux/AlertActions';
export const FETCH_LOGIN_BEGIN = 'FETCH_LOGIN_BEGIN'
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS'
export const FETCH_LOGIN_ERROR = 'FETCH_LOGIN_ERROR'


function fetchLoginBegin() {
  return {
    type: FETCH_LOGIN_BEGIN,
  }
}

function fetchLoginSuccess(login) {
  return {
    type: FETCH_LOGIN_SUCCESS,
    login
  }
}

export function loginUser(login) {
  return dispatch => {
	  dispatch(fetchLoginBegin());
    return fetch('https://rga2018.herokuapp.com/api/sessions',{
      method: 'POST',
      body: JSON.stringify(login),
      headers: {

        'Content-Type' : 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {

        if(json.meta.code===200 && json.meta.message==="success") {

          let user = JSON.stringify(json.data)
          localStorage.setItem("current_user", user);
      
          dispatch(fetchLoginSuccess(json.data));
          dispatch(setSuccessMessage("SUCCESSFULLY SIGNED IN !"));
          dispatch(UserLoginStatus());
          setTimeout(function(){ dispatch(AlertDismiss()); }, 3000);
 
        } else{
          dispatch(setErrorMessage(json.meta.message));
          setTimeout(function(){ dispatch(AlertDismiss()); }, 3000);
        }
      })
		  .catch((error) => {
		    dispatch(setErrorMessage("Failed"));
		  });
  }
}
