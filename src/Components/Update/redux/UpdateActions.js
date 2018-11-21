import fetch from 'cross-fetch';
import {setErrorMessage, setSuccessMessage, AlertDismiss } from '../../../Redux/AlertActions';
import { UserLoginStatus } from '../../../Redux/AuthActions';

export const UPDATE_BEGIN = 'UPDATE_BEGIN'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
export const FETCH_BEGIN ='FETCH_BEGIN'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'

function updateBegin(){
  return{
    type: UPDATE_BEGIN
  } 
}

 //function updateSuccess(update){
  //return{
    //type: UPDATE_SUCCESS,
   // update
   //}
 //}

export function updateUserInfo(update, current_user , user_id) {
  debugger
  
  return dispatch => {
    debugger

    dispatch(updateBegin());

    return fetch(`https://rga2018.herokuapp.com/api/users/${user_id}`,{
      method: 'PUT',
      body: JSON.stringify(update),
      headers: {
        
        'Content-Type' : 'application/json',
        'Accept-Type': 'application/json',
        'Authorization': current_user.token

      }
    })
      .then(response => response.json())
      .then(json => {

        if(json.meta.code===200 && json.meta.message==="success") {
          debugger
          if(current_user.uid == user_id){
            let info = json.data
            info.token = current_user.token
            info = JSON.stringify(info)
            localStorage.setItem("current_user" , info);
            console.log(info);
            dispatch(UserLoginStatus(json.data));
            console.log(json.data);
            dispatch(setSuccessMessage("INFORMATION UPDATED"));
            setTimeout(function(){ dispatch(AlertDismiss()); }, 5000);
          }
          else if(current_user.uid!==user_id){
            debugger
            dispatch(UserLoginStatus(json.data));
            console.log(json.data);
            dispatch(setSuccessMessage("INFORMATION UPDATED"));
            setTimeout(function(){ dispatch(AlertDismiss()); }, 4000);
          }

        } else{
          dispatch(setErrorMessage(json.meta.message));
          setTimeout(function(){ dispatch(AlertDismiss()); }, 2000);

        }
      })
  }
} 

function fetchBegin(){
  return{
    type:FETCH_BEGIN
  }
}

function fetchSuccess(user){
  return{
    type:FETCH_SUCCESS,
    user
  }
}

export function fetchUser( current_user, user_id ) {
  return dispatch => {
    dispatch(fetchBegin());
    return fetch(`https://rga2018.herokuapp.com/api/users/${user_id}`,{
        method: 'GET',
        headers: {

        'Accept-Type': 'application/json',
        'Authorization': current_user.token
        }

      })
      .then(response => response.json())
      .then(json => { 
        if(json.meta.code===200 && json.meta.message==="success") {
          dispatch(fetchSuccess(json.data));
          dispatch(setSuccessMessage("KINDLY UPDATE"))
          //setTimeout(function(){ dispatch(AlertDismiss()); }, 2000);
        } else{
          dispatch(setErrorMessage(json.meta.message));
          setTimeout(function(){ dispatch(AlertDismiss()); }, 2000);
        }
      })
  }
}

/*function usersUpdateBegin(){
  debugger
  return{
    type: USERS_UPDATE_BEGIN
  } 
}

function usersUpdateSuccess(users){
  debugger
  return{
    type: USERS_UPDATE_SUCCESS,
    users
  }
}

export function usersInfoUpdater(users,current_user) {
  
  return dispatch => {

    dispatch(usersUpdateBegin());

debugger
    return fetch('https://rga2018.herokuapp.com/api/users/'+users["uid"],{
      method: 'PUT',
      body: JSON.stringify(users),
      headers: {
        
        'Content-Type' : 'application/json',
        'Accept-Type': 'application/json',
        'Authorization': users.token

      }
    })
      .then(response => response.json())

      .then(json => {

        if(json.meta.code===200 && json.meta.message==="success") {
          debugger          
          console.log(json);
          console.log(json.data);
          dispatch(UserLoginStatus(json.data));
          console.log(json.data.users.uid);
          dispatch(setSuccessMessage("INFORMATION UPDATED"));
        } else{
          dispatch(setErrorMessage(json.meta.message));
          console.log(json.meta.message);

        }
      })
  }
}*/


