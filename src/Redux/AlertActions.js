export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
export const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE'


export function setErrorMessage(error){
	return{
		type: SET_ERROR_MESSAGE,
		error
	} 
}

export function setSuccessMessage(success_message){
	return{
		type: SET_SUCCESS_MESSAGE,
		success_message
	}
}


export function AlertDismiss(){

	return dispatch => {
		dispatch(setErrorMessage(null));
		dispatch(setSuccessMessage(null));
  }     
}