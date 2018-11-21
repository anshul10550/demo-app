export function SessionCheck() {
  let user = localStorage.getItem("current_user")
  if(user===undefined || user===null) {
    return null;
  } else {
    return JSON.parse(user)
  }
}


export function clearSession() {
  localStorage.removeItem("current_user");
  return null;
}