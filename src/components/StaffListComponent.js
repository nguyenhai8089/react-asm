import React, {Component} from 'react';
import { Card, CardBody, CardImg, CardTitle} from 'reactstrap';
import StaffDetail from './StaffDetailComponent';

class StaffList extends Component{
    constructor(props){
        super(props);
        this.state={onSelectStaff:null, columDefault:"col-12 col-md-6 col-lg-4 mt-3"};
    }
    onStaff(staff){
        this.setState({onSelectStaff:staff});
    }
    columSelect(colum){
        this.setState({columDefault:colum});
    }
    renderStaff(){
        if(this.state.onSelectStaff!=null){
            return(
                <div className='col-6'>
                    <StaffDetail staff={this.state.onSelectStaff}/>                   
                    {console.log(this.state.onSelectStaff)}
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
    

    render(){
        const stafflist=this.props.staffs.map((staff)=>{
            return(
                <div className={this.state.columDefault}>
                    <Card key={staff.id} onClick={()=>this.onStaff(staff)}>
                        <CardImg src="/assets/images/AvatarLargeNam.png" width="2%"/>
                        <CardBody>
                             <CardTitle>{staff.name}</CardTitle>
                        </CardBody>
                    </Card>
                </div>                
            );
        });
        return(
            <div class="container">
                <div className='row BTN'>
                    <button className='btn btn-success m-3' onClick={()=>this.columSelect("col-12 col-md-2 mt-3")}>6 cột</button>
                    <button className='btn btn-success m-3' onClick={()=>this.columSelect("col-12 col-md-3 mt-3")}>4 cột</button>
                    <button className='btn btn-success m-3' onClick={()=>this.columSelect("col-12 col-md-4 mt-3")}>3 cột</button>
                    <button className='btn btn-success m-3' onClick={()=>this.columSelect("col-12 col-md-6 mt-3")}>2 cột</button>
                    <button className='btn btn-success m-3' onClick={()=>this.columSelect("col-12 col-md-12 mt-3")}>1 cột</button>
                </div>
                <div class="row">
                    {stafflist}
                </div>
                <div className='row DETAIL' >
                    {this.renderStaff()}
                </div>              
                    

            </div>
        );
    }
}
export default StaffList;