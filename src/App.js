import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux'
import './App.css';
import Update from './Components/Update/Update'
import Login from './Components/Login/Login';
import Signup from './Components/SignUp/Signup';
import Home from './Components/Home/Home';
import Details from './Components/Details/Details';
import Users from './Components/List/Users';
import Header from './NavigationBar';
import { UserLoginStatus } from './Redux/AuthActions';
//import { AlertDismiss } from './Redux/AlertActions' ;
import Clock from 'react-live-clock';
import './bad53a019d.png';


class App extends Component {
  constructor(props){
   super(props);
   this.state = {

    }
 
  };  


  componentDidMount() {
    this.props.dispatch(UserLoginStatus());
  }


 

	render() {
    const { error , success_message , dispatch } = this.props
    return (
      <div className="App">
        <div className="images">
          <img src={require('./bad53a019d.png')} alt="Company Logo" className="icon" />
          <h1 className="title">APPLICATION FOR EMPLOYEE</h1>    
        </div>
        <div className= "mesages">
          { error && (
              <div className="alert alert-danger">
                <strong>ERROR ! <button type="button" className="close" data-dismiss="modal" aria-label="Close"></button></strong> {error}
              </div>
            )
          }
        
          { success_message  && ( 
            <div className="alert alert-success">
            
            <strong>WELCOME <button type="button"   className="close" data-dismiss="modal" aria-label="Close"></button></strong>  {success_message}
            </div>
            )
          }
        </div>
                           
        <BrowserRouter>
          <div> 
            <Header className="Header"/>
            <Route exact path="/" component={Home} dispatch={dispatch} />
            <Route exact path="/login" component={Login} dispatch={dispatch} />
            <Route exact path="/signup" component={Signup} dispatch={dispatch} />
            <Route exact path="/update/:id" component={Update} dispatch={dispatch} />
            <Route exact path="/userlist" component={Users} dispatch={dispatch} />
            <Route exact path="/details" component={Details} dispatch={dispatch} />
          </div>
        </BrowserRouter>

        <div className="footer1">
        <hr/>
        <footer className="page-footer font-small blue pt-4">
            <div className="container-fluid text-center text-md-left">
              <div className="row">
                <div className="col-md-6 mt-md-0 mt-3">
                  <h5 className="text-uppercase">Footer Content</h5>
                  <p>Here you can use rows and columns here to organize your footer content.</p>
                </div>
                <hr className="clearfix w-100 d-md-none pb-3"/>
                <div className="col-md-3 mb-md-0 mb-3">
                    <ul className="list-unstyled">
                      <li>
                        <a href="https://www.google.com/maps">Locate Us</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-3 mb-md-0 mb-3">
                    <h5 className="text-uppercase">TIME</h5>
                    <ul className="list-unstyled">
                      <li>
                        <Clock format="HH:mm:ss" ticking={true} interval={1000} />
                      </li>
                    </ul>
                  </div>
              </div>
            </div>

            <div className="footer-copyright text-center py-3">© 2018 Copyright:
            </div>

          </footer>
          </div>         

      </div>
        
  	)
	}

}

function select(state) {
   return {
      login: state.login.login,
      signup : state.signup.signup,
      error: state.alert.error,
      success_message: state.alert.success_message,
   }
}
export default connect(select)(App);
