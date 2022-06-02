import React, {Component} from 'react';
import { Card, CardBody, CardImg, CardTitle} from 'reactstrap';
import StaffDetail from './StaffDetailComponent';

/* hàm StaffList render ra phần body trang */
class StaffList extends Component{
    constructor(props){
        super(props);
        this.state={onSelectStaff:null, columDefault:"col-12 col-md-6 col-lg-4 mt-3"};
    }
    /* hàm gán giá trị state mới khi click vào đối tượng */
    onStaff(staff){
        this.setState({onSelectStaff:staff});
    }
    /* hàm gán giá trị state mới khi nhấn button trên giao diện */
    columSelect(colum){
        this.setState({columDefault:colum});
    }
    /* hàm render truyền thông tin cho hàm StaffDetail render ra chi tiết dữ liệu thông tin nhân viên */
    renderStaff(){
        if(this.state.onSelectStaff!=null){
            return(
                <div className='col-12'>
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
    
/* hàm render hiển thị ra danh sách các nhân viên, và các nút button */
    render(){
        const stafflist=this.props.staffs.map((staff)=>{
            return(
                <div className={this.state.columDefault}>
                    <Card key={staff.id} onClick={()=>this.onStaff(staff)}>
                        <CardImg src="/assets/images/AvatarLargeNam.png"/>
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