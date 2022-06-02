import React, {Component} from 'react';
/* import logo from './logo.svg'; */
import './App.css';
import {Navbar,NavbarBrand} from 'reactstrap';
import {STAFFS} from './shared/staffs';
import StaffList from './components/StaffListComponent';

/* hàm render ra toàn bộ ứng dụng này */
class App extends Component {
  constructor(props){
    super(props);
    this.state={staffs:STAFFS};
  }
  render(){
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className='container'>
             <NavbarBrand>
                 Ứng dụng quản lý nhân sự v1.0
             </NavbarBrand>
          </div>             
        </Navbar>
        <div className='card'>
          <div className='card-body'>
            <StaffList staffs={this.state.staffs}/>

          </div>

        </div>
        
      </div>
    );

  }
  
}

export default App;
