import React, { Component } from 'react';
import { showAllUser } from './redux/UserlistAction';
import { connect } from 'react-redux';
import { Redirect , Link } from 'react-router-dom';
//import CircularProgressbar from 'react-circular-progressbar';
//import LoadingBar from 'react-redux-loading-bar'
import './tablestyle.css';



class Users extends Component {
  constructor(props) {
  super(props);
    this.state = {
      users: {},
      page: 1,
      row: 2,
      count: 0,
    }
    

    this.fetchPageUsers = this.fetchPageUsers.bind(this);
    this.fetchNewPage = this.fetchNewPage.bind(this);
    this.SelectChange = this.SelectChange.bind(this);
    this.chunkArray = this.chunkArray.bind(this);
  };

  chunkArray(myArray, chunk_size) {
    let results = [];
    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size))
    }
    return results;
  }


  componentDidMount() {
    this.fetchPageUsers('default');
  }

  SelectChange(e) {
    let page = 1
    this.setState({
      row: e.target.value,
      count:0
    });
    const { current_user} = this.props
    this.props.dispatch(showAllUser(current_user, page , e.target.value));       
  } 

  fetchPageUsers(e, link_text=null){
    let page = 1
    const { current_user} = this.props

    if(current_user){
      if (e === 'default'){
        this.props.dispatch(showAllUser(current_user, page ,this.state.row));
      }
      else
      {
        if(this.props.users && this.props.users.meta){
          if( link_text === "Last"){
            page = this.props.users.meta.total_pages;
            let count = parseInt(page / 10,0);
              if(count <= 10){
                this.setState({ 
                count : count
                });
              }
          }
          else if (link_text === "Previous"){

              let count = Number.isInteger(this.state.count) ? (this.state.count) : this.state.count
                count = count - 1      
              this.setState({
                page: e.target.value,
                count: count
              });
            
              let total_rows = undefined;
              let user_data  = undefined;
              let data = undefined;
              let user_list = undefined;

              if(this.props.users && this.props.users.meta){
                total_rows = Math.ceil(this.props.users.meta.total_count / this.state.row);
                user_data = Array.from({length: total_rows }, (v, i) => i)
                data = this.chunkArray(user_data, 10);
                user_list = data[count];
                page = user_list[0];
              }
            //page = this.props.users.meta.prev_page;
            console.log(page);
                    
          }

          else if(link_text === "First"){
            page = 1;
            let count = parseInt(page / 10,0);
              if(count <= 10){
                this.setState({ 
                count : count
                });
              }
          }

          else if(link_text === "Next"){
            //page = e.target.value
                      
            let count = Number.isInteger(this.state.count+1) ? (this.state.count+1) : this.state.count
            if(this.state.count < Math.ceil(((this.props.users.meta.total_count / this.state.row)/10)-1)){
              console.log(count);//page= this.props.users.meta.next_page;
              this.setState({
                count: count
              });

              let total_rows = undefined;
              let user_data  = undefined;
              let data = undefined;
              let user_list = undefined;

              if(this.props.users && this.props.users.meta){

                total_rows = Math.ceil(this.props.users.meta.total_count / this.state.row);
                user_data = Array.from({length: total_rows }, (v, i) => i)
                data = this.chunkArray(user_data, 10);
                user_list = data[count];
                page = user_list[1];
              }
            }
            console.log(page);              
          }  
          const { current_user} = this.props
          this.props.dispatch(showAllUser(current_user, page ,this.state.row));

        }   
      }  
    }    
  }

  fetchNewPage(e){
    let page = undefined;
    let index = 0;
    if(this.props.users && this.props.users.meta)
    {
      page = e.target.value;
    }
    if(e.target.value===1){
      let count = e.target.value%10;
      index = count * 10
      if ((parseInt(page,0) % index) === 1){ // modulus function
      count = count - 1
      }
      this.setState({
        page: e.target.value,
        count: count
      });
    }
    else if(Number.isInteger(e.target.value/10)){
      //let count = Number.isInteger(e.target.value/10) ? (e.target.value/10) : this.state.count
      this.setState({
        page: e.target.value,
        //count: count
      });
    }
    console.log(page);

    const { current_user } = this.props
    this.props.dispatch(showAllUser(current_user, page , this.state.row));
  }
     


  render(){
    let total_rows = undefined;
    let user_data  = undefined;
    let data = undefined;
    let user_list = undefined;

    

    const { current_user} = this.props

    if(this.props.users && this.props.users.meta){
      total_rows = Math.ceil(this.props.users.meta.total_count / this.state.row);
      user_data = Array.from({length: total_rows }, (v, i) => i)
      data = this.chunkArray(user_data, 10);
      user_list = data[this.state.count];
    }

    if(!this.props.users){
      return <i className="fa fa-spinner fa-spin"> Loading...</i>;
    }
    


    if(current_user===null || current_user===undefined) {
      return <Redirect to={'/'} />;
    }

    return(
      
      <section>         
        <nav aria-label="Page navigation example">
        {this.props.users && this.props.users.meta &&
          <ul className="pagination">
            <li className="nav-item">
              <button className={`page-link`} disabled={this.props.users.meta.prev_page===-1 && this.props.users.meta.current_page===1} onClick={(e) => {this.fetchPageUsers(e, 'First')}}>1</button>
            </li>
           
            <li className="nav-item">
              <button className={this.props.users.meta.prev_page===-1 ? 'page-link prev_disabled' : 'page-link'} disabled={this.props.users.meta.prev_page===-1} value={this.props.users.meta.current_page} onClick={(e) => {this.fetchPageUsers(e,'Previous')}}>&laquo;</button>
            </li>                                               
            {
              Array.from(user_list).map((number) =>
                <li className="nav-item"  key={number}>
                  <button className={`page-link`} disabled={this.props.users.meta.total_pages<number || this.props.users.meta.current_page===number+1} value={number+1}  onClick={this.fetchNewPage}>{number+1}</button>
                </li>
              )
            } 

            <li className="nav-item">
              <button className={`page-link`} disabled={this.props.users.meta.next_page===-1 || this.state.row > 20 || this.state.count===Math.ceil(((this.props.users.meta.total_count / this.state.row)/10)-1)  } value={this.props.users.meta.current_page} onClick={(e) => {this.fetchPageUsers(e, 'Next')}}>&raquo;</button>
            </li>                                    
            <li className="nav-item">
              <button className={`page-link`} disabled={this.props.users.meta.current_page===this.props.users.meta.total_pages} onClick={(e) => {this.fetchPageUsers(e, 'Last')}}>{this.props.users.meta.total_pages}</button>
            </li>
          </ul>  
        }        
        </nav>
       <p className="drop_down"> Select Number of Rows :</p><select onChange={this.SelectChange} value={this.state.value}> 
          <option value ="2" >2</option>
          <option value ="5" >5</option>
          <option value ="8" >8</option> 
          <option value ="10">10</option>
          <option value="20" >20</option>
          <option value="30" >30</option>
          <option value="40" >40</option>
        </select>
           
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">USER ID</th>
                <th scope="col">NAME</th>
                <th scope="col">E-MAIL</th>
                <th scope="col">UPDATE</th>
              </tr>
            </thead>
            { this.props.users && this.props.users.users &&
              <tbody>
                {this.props.users.users.map(user =>
                  <tr key={user.uid}>  
                    <td>{user.uid}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><Link to={`/update/${user.uid}`}>UPDATE</Link></td> 
                  </tr>
                )}    
              </tbody>
            }             
          </table>
          
        </div>  
      </section>        
    )
  }
}


function select(state) {
   return {
      current_user: state.auth.current_user,
      users: state.usertable.users,
      user: state.updater.user,
    }
}

export default connect(select)(Users);


