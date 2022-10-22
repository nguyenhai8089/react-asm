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
import { SET_STATE } from '../redux/functionTech';
import { ConfigureStore} from '../redux/ConfigureStore'
/* import { STAFFS } from '../shared/staffs'; */

const mapStateToProps = (state)=>{
  return {
    staffs:state.staffs,
    department:state.department
  }
}
const mapDispatchToProps=(dispatch)=>({
  DispatchAction:()=>dispatch(DispatchAction())
  
});
function DispatchAction(staff){
  const newStaff={...staff}
  const tech=[...this.props.staffs,newStaff]
  ConfigureStore.dispatch(SET_STATE(tech))
}

/* hàm render ra toàn bộ ứng dụng này */
class Main extends Component {
  constructor(props){
    super(props);
    /* this.state={staffs:STAFFS, department:DEPARTMENTS}; */
    this.onNewStaff=this.onNewStaff.bind(this);
  }  
  /* hàm thêm nhân viên mới */
  onNewStaff=(staff)=>{
    DispatchAction(staff);
    /* const newStaff ={...staff};
    this.setState({staffs:[...this.props.staffs,newStaff]});
    console.log(newStaff,this.props.staffs); */
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
