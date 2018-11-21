import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { loginUser } from './redux/LoginActions';
import { connect } from 'react-redux';
import { Link , Redirect } from 'react-router-dom';
import './styles.css'


class Login extends Component {
	constructor(props) {
  super(props);
    this.state = {
    	login: {}
    }
    //this.signIn = this.signIn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(e) {
    let login = this.state.login;
    let target_name = e.target.name;
    let target_value = e.target.value;
    login[target_name] = target_value
    this.setState({login: login});
  }         

  handleSubmit(e){
   e.preventDefault(); 
  this.props.dispatch(loginUser(this.state.login));
  }

      
  render(){
    const { current_user } = this.props

    if(current_user) {

      return <Redirect to={'/'} />;
     }      

    return(       
      <div>
        <section className="margin_heading">
    		  <h1 className = "add_margin">WELCOME</h1>
            <div className="sign_in">
              <h2> Authenticate Yourself !! </h2>

              <form autoComplete="off" onSubmit={this.handleSubmit} >
                <input type ="email" name ="email" placeholder ="E-Mail"  className = "input1" onChange={this.handleChange} required/><br/><br/>

                <input type = "Password" name ="password" placeholder="Password" className = "input2" onChange={this.handleChange} required /><br/><br/>

                <Button bsStyle="success"  type ="submit" onSubmit={this.handleSubmit} className="btn1">SIGN IN</Button>

                <Link to={`/signup`} className="btn btn-link ">SIGN UP</Link>
              </form>
                 
            </div>          
    	  </section>
      </div>
    )
  }
}


function select(state) {
   return {
      login: state.login.login,
      current_user: state.auth.current_user,
    }
}

export default connect(select)(Login);
