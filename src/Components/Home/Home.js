import React, { Component } from 'react';
import { connect } from 'react-redux';



class Home extends Component {
	constructor(props) {
  super(props);
    this.state = {
    }
  };

      
  render(){
 
    return(
      <section className="margin_heading">
  		  <h1 className = "add_margin">Welcome To Demo App</h1>
  	  </section>
    )
  }
}


function select(state) {
   return {
    current_user: state.auth.current_user,

    }
}

export default connect(select)(Home);
