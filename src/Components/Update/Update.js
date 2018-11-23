import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { updateUserInfo } from './redux/UpdateActions';
import { fetchUser } from './redux/UpdateActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import './updatestyle.css';


class Update extends Component {
	constructor(props) {
  super(props);
    this.state = {
      update: {},
      open:false
    }

   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.onCloseModal = this.onCloseModal.bind(this); 
  };


  componentDidMount() {
    const user_id = this.props.match.params.id;
    const { current_user} = this.props
    this.onOpenModal();
    if(current_user){
      this.props.dispatch(fetchUser(current_user, user_id));
    }
  }

  onOpenModal() {
    this.setState({open: true});
  }

 
  onCloseModal() {
    this.setState({open: false});
  }


  handleChange(e) {
    let update = this.state.update;
    let target_name = e.target.name;
    let target_value = e.target.value;
    update[target_name] = target_value
    this.setState({update: update})
  }


  handleSubmit(e){
    e.preventDefault();
    const user_id = this.props.match.params.id; 
    const { current_user } = this.props
    this.props.dispatch(updateUserInfo(this.state.update , current_user , user_id ));
  }

      
  render(){
   
    const { current_user} = this.props
    const { open } = this.state;


    if(current_user===null || current_user===undefined) {
      return <Redirect to={'/'} />;
    }

    return(  
      <section>
        { this.props.user &&
          (<Modal open={open}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header text-center">
                  <h4 className="modal-title w-100 font-weight-bold">UPDATE INFORMATION</h4>
              </div>
                <div className="modal-body mx-3">

                  <div className="md-form mb-5">
                    <i className="fa fa-envelope prefix grey-text"></i>
                    <label data-error="wrong" data-success="right" >Name</label>
                    <input type="name" name="name" className="form-control validate" defaultValue={this.props.user.name} onChange={this.handleChange}/>
                  </div>

                  <div className="md-form mb-4">
                    <i className="fa fa-lock prefix grey-text"></i>
                    <label data-error="wrong" data-success="right">Email</label>
                    <input type="email" name = "email" className="form-control validate" defaultValue={this.props.user.email} onChange={this.handleChange}/>    
                  </div>

                </div>

                <div className="modal-footer d-flex justify-content-center">
                  <Button bsStyle="success"  type ="submit" onClick={this.handleSubmit}>UPDATE</Button>
                  <Button type="button" className="btn btn-danger" onClick={this.onCloseModal}>Cancel</Button>
                </div>

              </div>
            </div>
          </Modal>)
        }              
      </section>
    )             
  }
}


function select(state) {
   return {
      current_user: state.auth.current_user,
      user: state.updater.user,      
    }
}

export default connect(select)(Update);