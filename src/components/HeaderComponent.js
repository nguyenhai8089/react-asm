import React, {Component} from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem} from 'reactstrap';

import { NavLink } from 'react-router-dom';

class Header extends Component{
    constructor(props){
        super(props);
        this.state={isNavOpen:false};
        this.toggleNav=this.toggleNav.bind(this);
    }
    toggleNav(){
        this.setState({isNavOpen:!this.state.isNavOpen});
    }
    render(){
        return(            
              <Navbar dark expand='md'>
                  <div className='container'>
                      <NavbarToggler onClick={this.toggleNav}/>
                      <NavbarBrand className='mr auto' href="/"><img src="assets/images/logo.png" height="30" width="41" alt="Ritonrante con Fusion"/></NavbarBrand>
                      <Collapse isOpen={this.state.isNavOpen} navbar>
                          <Nav navbar>
                              <NavItem>
                                  <NavLink className="nav-link" to="/staff"><span className='fa fa-user-o fa-lg'></span> Nhân viên</NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink className="nav-link" to="/department"><span className='fa fa-address-card-o fa-lg'></span> Phòng ban</NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink className="nav-link" to="/payroll"><span className='fa fa-money fa-lg'></span> Bảng lương</NavLink>
                              </NavItem>                              
                          </Nav>
                      </Collapse>
                  </div>

              </Navbar>              
            
        );
    }
}
export default Header;


