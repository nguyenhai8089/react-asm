
import React from 'react';
import {Card} from 'reactstrap';

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
                <div className='row'>                    
                    {department}
                </div>    
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