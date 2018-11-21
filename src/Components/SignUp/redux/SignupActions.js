import fetch from 'cross-fetch';
import {setErrorMessage, setSuccessMessage, AlertDismiss } from '../../../Redux/AlertActions';

export const SIGNUP_RESET = 'SIGNUP_RESET'
export const FETCH_SIGNUP_BEGIN = 'FETCH_SIGNUP_BEGIN'
export const FETCH_SIGNUP_SUCCESS = 'FETCH_SIGNUP_SUCCESS'
export const FETCH_SIGNUP_ERROR = 'FETCH_SIGNUP_ERROR'



function signupReset() {
  return {
    type: SIGNUP_RESET,
  }
}

function fetchSignupBegin() {
  return {
    type: FETCH_SIGNUP_BEGIN,
  }
}

function fetchSignupSuccess(user) {
  return {
    type: FETCH_SIGNUP_SUCCESS,
    user
  }
}


export function resetSignupData() {
  return dispatch => {
    dispatch(signupReset());
  }
}

export function postUser(user) {
  return dispatch => {
    dispatch(fetchSignupBegin());
    return fetch('https://rga2018.herokuapp.com/api/users',{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => {

        if(json.meta.code===200 && json.meta.message==="success") {          
          dispatch(fetchSignupSuccess(json));
          dispatch(setSuccessMessage("SUCCESSFULLY CREATED ACCOUNT."));
          setTimeout(function(){ dispatch(AlertDismiss()); }, 2000);
          window.location.href= "/login";

        } else{
          dispatch(setErrorMessage(json.meta.message));
          setTimeout(function(){ dispatch(AlertDismiss()); }, 2000);
        }
      })
      .catch((error) => {
        dispatch(setErrorMessage("Failed"));
      });
  }
}