import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { postUser, resetSignupData } from './redux/SignupActions';
import { Redirect} from "react-router-dom";

import './styler.css';

class Signup extends Component{
	constructor(props) {
  super(props);
    this.state = {
      user: {},
    }

    this.props.dispatch(resetSignupData());
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(e) {
    let user = this.state.user;
    let target_name = e.target.name;
    let target_value = e.target.value;
    user[target_name] = target_value
    this.setState({user: user})
  }

  handleSubmit(e){

   e.preventDefault();
  this.props.dispatch(postUser(this.state.user));
  }

  componentDidMount() {
    this.props.dispatch(resetSignupData());  
  }
  
  render(){
    const { processing, current_user } = this.props

      if (current_user) {
        return <Redirect to={'/'} />;
      }
      

      return(
        <div>

  		  <section className ="signup-section" >
			    <div className="sign_up">
			      <h2 className="margins">Welcome New Member</h2>
            <form className ="signup-form" onSubmit={this.handleSubmit} autoComplete="off">
              <label>NAME :</label>
              <input type="text" name="name" onChange={this.handleChange} className ="input_detail" required/><br/><br/>

              <label>E-mail :</label>
              <input type="email" name="email" onChange={this.handleChange}  className ="input_detail" required/><br/><br/>

              <label>Password :</label>
              <input type="password" name="password"  onChange={this.handleChange} className ="input_detail" id="Popover1" onClick={this.toggle} required/><br/><br/>

              <label>Confirm-Password :</label>
              <input type="password" name="password_confirmation" onChange={this.handleChange} className ="input_detail" required/><br/><br/>

              <Button type="submit" bsStyle="success" onClick = {this.Getuser}>{processing ? "Registering..." : "REGISTER"}</Button>
            </form>
			    </div>  
			  </section>

      </div>
  	)
  }
}


function select(state) {
   return {
      processing: state.signup.processing,
      signup: state.signup.signup,
      current_user: state.auth.current_user,
    }
}

export default connect(select)(Signup);