import React, {Component} from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import StaffDetail from './StaffDetailComponent';


class StaffList extends Component{
    constructor(props){
        super(props);
        this.state={onSelectStaff:null, columDefault:"col-12 col-md-6 col-lg-4 mt-1"};
    }
    onStaff(staff){
        this.setState={onSelectStaff:staff};
    }
    columSelect(colum){
        this.setState={columDefault:colum}
    }
    

    render(){
        const stafflist=this.props.staffs.map((staff)=>{
            return(
                <div className={this.state.columDefault}>
                    <Card>
                        <CardBody>
                             <CardTitle>{staff.name}</CardTitle>
                        </CardBody>
                    </Card>
                </div>                
            );
        });
        return(
            <div class="container">
                <div class="row">
                    {stafflist}
                </div>
                <div className='row'>
                    <StaffDetail detail={this.state.onSelectStaff}/>
                </div>

            </div>
        );
    }
}
export default StaffList;