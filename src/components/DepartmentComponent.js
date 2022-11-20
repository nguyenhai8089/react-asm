
import React from 'react';
import {BreadcrumbItem,Breadcrumb, Card} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';


/* hàm render ra thông tin từng phòng ban */
const RenderDepartment=(props)=>{    
    return(
        <div>
            <Card key={props.department.id} >
                <Link to ={`/department/${props.department.id}`}>
                    <Card className='p-3 m-2 bg-secondary text-white'>
                        <h4>{props.department.name}</h4>
                        <p>số lượng nhân viên: {props.staffNumber.length}</p>
                    </Card>                    
                </Link>
            </Card>            
        </div>
    );
}
/* hàm render ra toàn bộ trang phòng ban */
function Department(props){
    const department=props.department.map((department)=>{
        return(
            <div className='col-lg-4 col-md-6 col-12' key={department.id}>
                <RenderDepartment 
                    department={department} 
                    staffNumber={props.staff.filter(
                        (staff)=>staff.departmentId===department.id
                    )}
                />
            </div>
        );
    })
    
    if (props.staffsLoading) {
        return (
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
        );
    } else if (props.staffsErrMess) {
        return (
        <div className="container">
            <div className="row">
            <div className="col-12">
                <h4>{props.staffsErrMess}</h4>
            </div>
            </div>
        </div>
        );
    }else if(props.department !=null){
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