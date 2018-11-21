import fetch from 'cross-fetch';
import {setErrorMessage, setSuccessMessage,AlertDismiss } from '../../../Redux/AlertActions';
export const FETCH_USERSLIST_BEGIN = 'FETCH_USERSLIST_BEGIN'
export const FETCH_USERSLIST_SUCCESS = 'FETCH_USERSLIST_SUCCESS'
export const FETCH_USERSLIST_ERROR = 'FETCH_USERSLIST_ERROR'


function fetchUserlistBegin() {
  return {
    type: FETCH_USERSLIST_BEGIN,
  }
}

function fetchUserlistSuccess(users) {
  return {
    type: FETCH_USERSLIST_SUCCESS,
    users
  }
}


export function showAllUser(current_user,page,row) {
  return dispatch => {
    dispatch(fetchUserlistBegin());
    
    return fetch(`https://rga2018.herokuapp.com/api/users?page=${page}&per_page=${row}`,{
        method: 'GET',
        headers: {

        'Accept-Type': 'application/json',
        'Authorization': current_user.token
        }

      })
      .then(response => response.json())
      .then(json => {

        if(json.meta.code===200 && json.meta.message==="success") {
          json.data.meta = json.meta
          dispatch(fetchUserlistSuccess(json.data));
          if(page<=1){
            dispatch(setSuccessMessage("ALL USERS DISPLAYED"))
            setTimeout(function(){ dispatch(AlertDismiss()); }, 2000);
          }

        } else{
          dispatch(setErrorMessage(json.meta.message));
          setTimeout(function(){ dispatch(AlertDismiss()); }, 2000);
        }
      })
  }
}





