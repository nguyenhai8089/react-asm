import React, {Component} from 'react';
/* import logo from './logo.svg'; */


import StaffList from './StaffListComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
/* import {DEPARTMENTS, STAFFS} from '../shared/staffs'; */
import StaffDetail from './StaffDetailComponent';

import {Route,Switch,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { onNewStaff } from '../redux/functionTech';
/* import { ConfigureStore} from '../redux/ConfigureStore' */
/* import { STAFFS } from '../shared/staffs'; */

const mapStateToProps = (state)=>{
  return {
    staffs:state.staffs,
    department:state.department
  }
}

const mapDispatchToProps=(dispatch)=>({
  onNewStaff: newStaff => dispatch(onNewStaff(newStaff))  
});


/* hàm render ra toàn bộ ứng dụng này */
class Main extends Component {
  constructor(props){
    super(props);    
    this.onNewStaff=this.onNewStaff.bind(this);
  }  

  /* hàm thêm nhân viên mới */
  onNewStaff=(newStaff)=>{    
     this.props.onNewStaff(newStaff);   
  } 
  
  render(){
    const StaffId = ({ match }) => {
      return (
        <StaffDetail
          staff={this.props.staffs.filter(
            (staff) => staff.id === parseInt(match.params.id,10)
          )[0]}
        />
      );
    };
    
    return (
      <div >
        <Header/>
        <Switch>
             <Route exact path='/staff' component={()=><StaffList onNewStaff={this.onNewStaff} department={this.props.department} staff={this.props.staffs}/>}/>
             <Route exact path='/staff/:id' component={StaffId}/>  
             <Route exact path='/department' component={()=><Department department={this.props.department}/>}/>
             <Route exact path='/salary' component={()=><Salary staff={this.props.staffs}/>}/>
             <Redirect to='/staff'/>          
        </Switch>  
        <Footer/> 
      </div>
    );

  }
  
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
