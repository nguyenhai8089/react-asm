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
import { fetchStaffs,fetchDepartments,fetchSalary} from '../redux/ActionCreators';
import { TransitionGroup,CSSTransition } from 'react-transition-group';

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
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} className='page' timeout={300}>        
              <Switch>
                  <Route exact path='/staff' component={()=><StaffList                        
                      department={this.props.departments.departments} 
                      staff={this.props.staffs.staffs} 
                      staffsLoading={this.props.staffs.isLoading} 
                      staffsErrMess={this.props.staffs.errMess}
                      />}
                    />
                  <Route exact path='/staff/:staffId' component={StaffId}/>  
                  <Route exact path='/department' component={()=><Department 
                      department={this.props.departments.departments}
                      staff={this.props.staffs.staffs} 
                      staffsLoading={this.props.departments.isLoading} 
                      staffsErrMess={this.props.departments.errMess}
                      />}
                    />
                  <Route exact path='/department/:departmentId' component={DepartmentId}/>
                  <Route exact path='/salary' component={()=><Salary 
                      staff={this.props.salary.salary}
                      staffsLoading={this.props.salary.isLoading} 
                      staffsErrMess={this.props.salary.errMess}
                      />}
                    />
                  <Redirect to='/staff'/>          
              </Switch> 
            </CSSTransition>
          </TransitionGroup> 
        <Footer/> 
      </div>
    );

  }
  
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
