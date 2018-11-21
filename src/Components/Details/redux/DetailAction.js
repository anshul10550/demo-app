import fetch from 'cross-fetch';
import {setErrorMessage, setSuccessMessage,AlertDismiss} from '../../../Redux/AlertActions';

export const FETCH_DETAIL_BEGIN = 'FETCH_DETAIL_BEGIN'
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS'


function fetchDetailBegin() {
	return {
	type:FETCH_DETAIL_BEGIN,

  }
}

function fetchDetailSuccess(user) {
	return {
		type:FETCH_DETAIL_SUCCESS,
		user
	}
}


export function fetchDetail(detail,current_user){
	return dispatch => {
		dispatch(fetchDetailBegin());
    return fetch('https://rga2018.herokuapp.com/api/users/'+detail.uid,{
        method: 'GET',
        headers: {

        'Accept-Type': 'application/json',
        'Authorization': current_user.token
        }
      })
      .then(response => response.json())
      .then(json => {
        if(json.meta.code===200 && json.meta.message==="success") {
          console.log(json);
          console.log(json.data);        	
          dispatch(fetchDetailSuccess(json.data));
          dispatch(setSuccessMessage("USER INFORMATION DISPALYED"))
          setTimeout(function(){ dispatch(AlertDismiss()); }, 2000);          
        }
        else{
          dispatch(setErrorMessage(json.meta.message));
          setTimeout(function(){ dispatch(AlertDismiss()); }, 2000);
        }
      })      		

	}
}