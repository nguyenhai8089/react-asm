
import React from 'react';
import {BreadcrumbItem,Breadcrumb, Card} from 'reactstrap';
import {Link} from 'react-router-dom';

/* hàm render ra thông tin từng phòng ban */
const RenderDepartment=({department})=>{
    return(
        <div>
            <Card className='p-3 m-2 bg-secondary text-white'>
                <h4>{department.name}</h4>
                <p>số lượng nhân viên: {department.numberOfStaff}</p>
            </Card>
        </div>
    );
}
/* hàm render ra toàn bộ trang phòng ban */
function Department(props){
    const department=props.department.map((department)=>{
        return(
            <div className='col-lg-4 col-md-6 col-12' key={department.id}>
                <RenderDepartment department={department}/>
            </div>
        );
    })
    if(props.department !=null){
        return(
            <div className='container'>
                <div className='col-12'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                              <Link to="/staff">Nhân viên</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Phòng ban</BreadcrumbItem>
                    </Breadcrumb>                 
                    <hr></hr>
                </div>
                <div className='row'>                    
                    {department}
                </div>    
                <hr/>
            </div>
        );
    }
    else{
        return(
            <div>

            </div>
        );
    }
    
}
 export default Department;