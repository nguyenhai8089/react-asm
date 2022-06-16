import React, {Component} from 'react';
/* import logo from './logo.svg'; */

import {Route,Switch,Redirect} from 'react-router-dom';
import StaffList from './StaffListComponent';
import Department from './DepartmentComponent';
import Payroll from './PayrollComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {STAFFS} from '../shared/staffs';
import StaffDetail from './StaffDetailComponent';


/* hàm render ra toàn bộ ứng dụng này */
class Main extends Component {
  constructor(props){
    super(props);
    this.state={staffs:STAFFS};
  }  
  
  render(){
    const StaffId = ({ match }) => {
      return (
        <StaffDetail
          staff={this.state.staffs.filter(
            (staff) => staff.id === parseInt(match.params.id,10)
          )[0]}
        />
      );
    };
    return (
      <div >
        <Header/>
        <Switch>
             <Route exact path='/staff' component={()=><StaffList staff={this.state.staffs}/>}/>
             <Route exact path='/staff/:id' component={StaffId}/>  
             <Route exact path='/department' component={()=><Department staff={this.state.staffs}/>}/>
             <Route exact path='/payroll' component={()=><Payroll staff={this.state.staffs}/>}/>
             <Redirect to='/staff'/>          
        </Switch>  
        <Footer/> 
      </div>
    );

  }
  
}

export default Main;
