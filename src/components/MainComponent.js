import React, {Component} from 'react';
/* import logo from './logo.svg'; */

import {Route,Switch,Redirect} from 'react-router-dom';
import StaffList from './StaffListComponent';
import Department from './DepartmentComponent';
import Payroll from './PayrollComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {STAFFS} from '../shared/staffs';


/* hàm render ra toàn bộ ứng dụng này */
class Main extends Component {
  constructor(props){
    super(props);
    this.state={staffs:STAFFS};
  }  
  
  render(){
    const HomPage=(props) =><StaffList staff={this.state.staffs.map()}/>
    return (
      <div >
        <Header/>
        <Switch>
             <Route path='./staff' component={HomPage}/> 
             <Route path='./Department' component={()=><Department staff={this.state.staffs}/>}/>
             <Route path='./Payroll' component={()=><Payroll staff={this.state.staffs}/>}/>
             <Redirect to='./staff'/>          
        </Switch>  
        <Footer/> 
      </div>
    );

  }
  
}

export default Main;
