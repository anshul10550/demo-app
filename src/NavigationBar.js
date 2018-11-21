import React from 'react';
import { connect } from 'react-redux';
import {Navbar, Nav } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { logoutUser } from './Redux/AuthActions.js';
import './navigation.css';



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.logOut = this.logOut.bind(this);
    //this.showAllUser = this.showAllUser.bind(this);
  }

    logOut(e){
    e.preventDefault(); 
    this.props.dispatch(logoutUser(this.props.current_user));
    }


  render(){
    const { current_user } = this.props



    return(

      <Navbar fixedTop> 
        <Navbar.Header> 
          <Navbar.Brand className="btn_users">
            <Link to={`/`} className='btn btn-link'>Home</Link>
          </Navbar.Brand>
        </Navbar.Header>

        {(current_user===null || current_user===undefined) && ( 
        <Nav> 
          <Link to={`/login`} className='btn btn-link'>LOG IN</Link>
        </Nav>
        )} 

        {(current_user!==null && current_user!==undefined) && (  
        <Nav className="btn_users">
          <Link to={`/`} onClick={this.logOut} className='btn btn-link'>LOG OUT</Link>
        </Nav>
        )}

        {(current_user!==null && current_user!==undefined) && (  
        <Nav className="btn_users">
          <Link to={`/userlist`} className='btn btn-link'>USERS LIST</Link>
        </Nav>
        )}

        {(current_user!==null && current_user!==undefined) && (  
        <Nav className="btn_users">
          <Link to={`/details`} className='btn btn-link'>SEE USER</Link>
        </Nav>
        )}


        {(current_user!==null && current_user!==undefined) && (  
        <Nav className="btn_users">
          <Link to={`/update/${current_user.uid}`} className="btn btn-link ">UPDATE</Link>
          <p> Hi,{this.props.current_user.name}</p>
        </Nav>
        )}
      </Navbar>        
    )
  }
}  

function select(state) {
   return {
      current_user: state.auth.current_user,
      user: state.updater.user,
    }
}


export default connect(select)(Header);