import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card,CardBody,CardImg,CardText,CardTitle} from 'reactstrap'
import dateFormat from 'dateformat';
import {Link} from 'react-router-dom';

/* hàm render trả chi tiết thồng tin của nhân viên */
function StaffDetail(props){    
    
        const staff1=props.staff    
        console.log(props.staff);  
        if(staff1 !=null)   
            return(
                <div className='container'>
                    <div className='col-12'>
                        <Breadcrumb>
                             <BreadcrumbItem><Link to="/staff">Nhân viên</Link></BreadcrumbItem>
                             <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <hr/>
                    </div>
                    <Card className=''>
                    <div className="container row"key={staff1.id}>
                        <div className='mt-4 left col-lg-3 col-md-4 col-6'> 
                            <CardImg  src={staff1.image}/>     
                        </div>
                        <div className='mt-1 right col-lg-9 col-md-8 col-6'>
                            <CardBody>
                                 <CardTitle>Họ và tên: <b>{staff1.name}</b> </CardTitle>
                                 <CardText>Ngày sinh: {dateFormat(staff1.doB,'dd/mm/yyyy')}</CardText>
                                 <CardText>Ngày vào công ty: {dateFormat(staff1.startDate,'dd/mm/yyyy')}</CardText>
                                 <CardText>Phòng ban: {staff1.department.name}</CardText>
                                 <CardText>Bậc lương: {staff1.salaryScale}</CardText>
                                 <CardText>Số ngày nghỉ còn lại: {staff1.annualLeave}</CardText>
                                 <CardText>số ngày đã làm thêm: {staff1.overTime}</CardText>
                            </CardBody>
                        </div>                        
                    </div>                         
                </Card>

                </div>
                
            ); 
        else {
            return(<div></div>);
            
        }   
    }
    

export default StaffDetail;