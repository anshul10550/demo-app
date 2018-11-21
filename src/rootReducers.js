import { combineReducers } from 'redux'
import login from './Components/Login/redux/LoginReducers';
import signup from './Components/SignUp/redux/SignupReducer';
import updater from './Components/Update/redux/UpdateReducer';
import usertable from './Components/List/redux/UserlistReducer';
import infos from './Components/Details/redux/DetailReducer';
import auth from './Redux/AuthReducer';
import alert from './Redux/AlertReducer';


const rootReducer = combineReducers({
   login,
   signup,
   auth,
   alert,
   updater,
   usertable,
   infos,
})

export default rootReducer