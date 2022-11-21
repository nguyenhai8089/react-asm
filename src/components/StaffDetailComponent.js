import React,{useState} from 'react';
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    Button,    
    Modal, 
    ModalHeader, 
    ModalBody,
    Row,
    Col,Label,
    Breadcrumb,
    BreadcrumbItem,    
    CardText,
    }from 'reactstrap';

import dateFormat from 'dateformat';
import { Link, useParams } from "react-router-dom";
import {Loading} from './LoadingComponent';
import { useDispatch } from 'react-redux';

import {FadeTransform} from 'react-animation-components'

/* hàm render chi tiết thồng tin của nhân viên */
function RenderStaffDetail({staff1,department1}){
    if(staff1 !=null)     
        return(
            <div className='row'>
                <div className='mt-5 left col-lg-3 col-md-4 col-12'> 
                    <FadeTransform in transformProps={{exitTransform:'scale(0.5) translateX(-50%)'}}>
                        <CardImg  src={staff1.image}/>
                    </FadeTransform>   
                </div>
                <div className='mt-1 right col-lg-9 col-md-8 col-12'>
                    <CardBody>
                        <CardTitle>Họ và tên: <b>{staff1.name}</b> </CardTitle>
                        <CardText>Ngày sinh: {dateFormat(staff1.doB,'dd/mm/yyyy')}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff1.startDate,'dd/mm/yyyy')}</CardText>
                        <CardText>{
                                department1.map((department)=>
                                    {if(department.id===staff1.departmentId)
                                        return (
                                            <p>Phòng ban: {department.name}</p>
                                        )
                                    })                                
                            }
                        </CardText>
                        <CardText>Bậc lương: {staff1.salaryScale}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff1.annualLeave}</CardText>
                        <CardText>số ngày đã làm thêm: {staff1.overTime}</CardText>
                    </CardBody>
                </div> 

            </div>
        );
    else {
            return(
                <div></div>
            );
        }
}

/* hàm render toàn bộ trang chi tiết thồng tin của nhân viên */
function StaffDetail(props){    
    const dispatch = useDispatch();
  
    const [isModalOpen,setModal] = useState(false);
    function toggleModal(){
        setModal({
            isModalOpen: !isModalOpen
        });
    }
    /* hàm sự kiện handleDeleteStaff() khi người dùng xóa nhân viên */
    
   
    /* hàm sự kiện handleSubmit khi người dùng thêm nhân viên */
    
    const staff1=props.staff
    const department1=props.department   
    
    
    console.log('giá trị của staff sau filter'+staff1);  
    console.log('giá trị của department sau filter'+department1); 
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
    }else if(department1!=null)   
        return(
            <div className='container'>
                <div className='col-12'>
                    <Breadcrumb>
                            <BreadcrumbItem><Link to="/staff">Nhân viên</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <hr/>
                </div>
                <Card key={staff1.id} className='container'>                        
                    <RenderStaffDetail staff1={staff1}  department1={department1} isLoading={props.staffsLoading} errMess={props.staffsErrMess}/>                   
                </Card>
                
                <hr/>
                
                
            </div>                
        ); 
    else {
        return(<div></div>);            
    }   
}   

export default StaffDetail;