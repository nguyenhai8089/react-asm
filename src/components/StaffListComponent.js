
import React from 'react';
import {Card,CardImg,CardBody,CardTitle}from 'reactstrap';
import {Link} from 'react-router-dom';



/* hàm Render ra ảnh và tên nhân viên */
function RenderStaffList({staff}){
    return(
        <div>
           <Card key={staff.id} >
                <Link to ={`/staff/${staff.id}`}>
                    <CardImg src={staff.image} alt={staff.name}/>
                    <CardBody>
                        <CardTitle>{staff.name}</CardTitle>
                    </CardBody>
                </Link>
                        
            </Card>
        </div>
    );

}
/* hàm StaffList render ra danh sách nhân viên */
function StaffList(props){

     console.log(props.staff);
        const stafflist=props.staff.map((staff)=>{
            return(
                <div className="col-6 col-md-4 col-lg-2 mt-3">
                    <RenderStaffList staff={staff}/>
                </div>                
            );
        });
        return(
            <div class="container">  
                <div className='col-12'>
                    <h2>Nhân viên</h2>
                    <hr/>                    
                </div>             
                <div class="row">
                    {stafflist}
                </div>                      
            </div>
        );
    }

export default StaffList;
