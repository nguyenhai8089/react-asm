
import React/* ,{Component} */ from 'react';
/* import StaffDetail from './StaffDetailComponent'; */
import {Card,CardImg,CardBody,CardTitle}from 'reactstrap';

/* hàm StaffList render ra phần body trang */
function StaffList(props){
    /* constructor(props){
        super(props);
        this.state={onSelectStaff:null, columDefault:"col-12 col-md-2 mt-3"};
    } */
    /* hàm gán giá trị state mới khi click vào đối tượng */
    /* onStaff(staff){
        this.setState({onSelectStaff:staff});
    } */
      
    /* hàm render truyền thông tin cho hàm StaffDetail render ra chi tiết dữ liệu thông tin nhân viên */
  /*   renderStaff(){
       
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
     */
/* hàm render hiển thị ra danh sách các nhân viên */
   
     console.log(props.staff);
        const stafflist=props.staff.map((staff)=>{
            return(
                <div /* className="col-12 col-md-2 mt-3" */>
                    <Card key={staff.id} /* onClick={()=>this.onStaff(staff)} */>
                        <CardImg src={staff.image} alt={staff.name}/>
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
                {/* <div className='row DETAIL' >
                    {this.renderStaff()}
                </div> */}              
                    

            </div>
        );
    }

export default StaffList;
