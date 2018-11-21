import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
//import ReactDOM from 'react-dom';
//import Modal from 'react-modal';
import Modal from 'react-responsive-modal';

import { Redirect } from 'react-router-dom';
import { fetchDetail } from './redux/DetailAction';
//import './styles.css';
//var Modal = require('react-bootstrap-modal');

class Details extends Component {
	constructor(props) {
  super(props);
  this.state = {
    open: false,
    detail: {}
  };

   this.handleChange = this.handleChange.bind(this);
   this.show = this.show.bind(this);
   //this.close = this.close.bind(this);
   // this.handleShow = this.handleShow.bind(this);
   // // this.handleClose = this.handleClose.bind(this); 
   // this.handleHide = this.handleHide.bind(this);
  //this.onOpenModal = this.onOpenModal.bind(this);
  this.onCloseModal = this.onCloseModal.bind(this);

  };

  onOpenModal() {
    //e.preventDefault();
    //const { current_user } = this.props
    //this.props.dispatch(fetchDetail(this.state.detail , current_user));
    this.setState({open: true});
  }
 
  onCloseModal() {
    this.setState({open: false});
  }

  handleChange(e) {
    let detail = this.state.detail;
    let target_uid = e.target.name;// remember this e.target.name is written here because this will effect the source value u r fetching
    let target_value = e.target.value;
    detail[target_uid] = target_value
    //this.setState({detail: detail})
  }

  show(e){
    e.preventDefault();
    var frm = document.getElementsByName('detailform')[0];
    const { current_user} = this.props
    this.props.dispatch(fetchDetail(this.state.detail , current_user))
    .then(this.onOpenModal());
    frm.reset();
  }
      
  render(){
    debugger
    const { current_user } = this.props
    const { open } = this.state;

    
    if(current_user===null || current_user===undefined) {
      return <Redirect to={'/'} />;
    }

    return (
      <div>
        <form className="details" name = "detailform" >
          <p>USER DETAILS</p><br/>
          <label>UNIQUE ID</label><br/>
          <input name = "uid" className="input" onChange={this.handleChange}/><br/><br/>
        </form>
        <Button onClick={this.show}>DETAILS</Button>
        {this.props.user &&
        <Modal open={open} center>
          <div className="modal-header">
            <h4 className="modal-title">USER INFORMATION</h4>
          </div>
          
          <div className="modal-body">  
              <div>
                <b>USER ID:</b><p>{this.props.user.uid}</p>
                <b>NAME:</b><p>{this.props.user.name}</p>
                <b>E-MAIL ID:</b><p>{this.props.user.email}</p>
              </div>
          </div>
          
          <div className="modal-footer">
            <Button type="button" className="btn btn-danger" onClick={this.onCloseModal}>Close</Button>
          </div>  

        </Modal>
        }
      </div>
    );
  }
}            


function select(state) {
   return {
      current_user: state.auth.current_user,
      user: state.infos.user,
 
    }
}

export default connect(select)(Details);