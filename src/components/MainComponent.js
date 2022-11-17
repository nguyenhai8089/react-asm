import React, {Component} from 'react';
/* import logo from './logo.svg'; */
import StaffList from './StaffListComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffDetail from './StaffDetailComponent';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchStaffs,fetchDepartments,fetchSalary,postAddStaff } from '../redux/ActionCreators';


const mapStateToProps = (state)=>{
  return {
    staffs:state.staffs,
    departments:state.departments,
    salary:state.salary,
  }
}

const mapDispatchToProps=(dispatch)=>({  
  fetchStaffs:()=>dispatch(fetchStaffs()),  
  fetchDepartments:()=>dispatch( fetchDepartments()),
  fetchSalary:()=>dispatch( fetchSalary()),
  postAddStaff:(id,name,doB,salaryScale,startDate,departmentId,annualLeave,overTime,image,salary)=>dispatch(postAddStaff(id,name,doB,salaryScale,startDate,departmentId,annualLeave,overTime,image,salary)),
  
});


/* hàm render ra toàn bộ ứng dụng này */
class Main extends Component {

  componentDidMount(){
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchSalary();   
  }  
  render(){
    const StaffId = ({ match }) => {
      
      return (
        <StaffDetail
          staff={this.props.staffs.staffs.filter(
            (staff) => staff.id === parseInt(match.params.staffId,10)
          )[0]}
          department={this.props.departments.departments}
          staffsLoading={this.props.staffs.isLoading}
          staffsErrMess={this.props.staffs.errMess}
          postAddStaff={this.props.postAddStaff}
        />
      );
    };
    const DepartmentId = ({ match }) => {
      return (
        <StaffList
          staff={this.props.staffs.staffs.filter(
            (staff) => staff.departmentId === match.params.departmentId
          )}          
        />
      );
    };
    
    
    return (
      <div >
        <Header/>
        <Switch>
             <Route exact path='/staff' component={()=><StaffList postAddStaff={this.props.postAddStaff} department={this.props.departments.departments} staff={this.props.staffs.staffs} staffsLoading={this.props.staffs.isLoading} staffsErrMess={this.props.staffs.errMess}/>}/>
             <Route exact path='/staff/:staffId' component={StaffId}/>  
             <Route exact path='/department' component={()=><Department department={this.props.departments.departments}/>}/>
             <Route exact path='/department/:departmentId' component={DepartmentId}/>
             <Route exact path='/salary' component={()=><Salary staff={this.props.salary.salary}/>}/>
             <Redirect to='/staff'/>          
        </Switch>  
        <Footer/> 
      </div>
    );

  }
  
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
