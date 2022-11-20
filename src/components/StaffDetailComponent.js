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
import {Control,LocalForm,Errors} from 'react-redux-form'
import dateFormat from 'dateformat';
import { Link, useParams } from "react-router-dom";
import {Loading} from './LoadingComponent';
import { useDispatch } from 'react-redux';
import {deleteOfStaff,fetchStaffs,fetchSalary,fetchDepartments} from '../redux/ActionCreators'
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

    function handleDeleteStaff() {
        
        console.log(props.staff.id)
        dispatch(deleteOfStaff(props.staff.id));
        dispatch(fetchStaffs());
        dispatch(fetchDepartments());
        dispatch(fetchSalary());
        props.history.push("/staff");
      }
   
    /* hàm sự kiện handleSubmit khi người dùng thêm nhân viên */
    function handleSubmitUpdate(value){        
        props.patchAddStaff(
        props.staff.id,
        value.name,
        value.doB,
        value.salaryScale,
        value.startDate,
        value.departmentId,
        value.annualLeave,
        value.overTime,
        "/assets/images/alberto.png",
        value.salaryScale*10*300000 + value.overTime*200000,
        );
    }
    const staff1=props.staff
    const department1=props.department
      
    /* const department1=props.department.filter(
        (department)=>department.id===props.staff.departmentId
    )[0] */
    
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
                <Button type="button" color="info" outline onClick={toggleModal}>
                    Cập nhật thông tin
                </Button>
                <Button  type="button"
                    color="danger"
                    value="delete"
                    outline
                    onClick={handleDeleteStaff}>delete
                </Button> 
                <hr/>
                <Modal isOpen={isModalOpen} toggle={toggleModal} >
                    <ModalHeader >
                        Thêm nhân viên
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm  onSubmit={handleSubmitUpdate}>
                             {/* Họ và tên: */}
                            <Row >
                                <Label md={3}>
                                    Họ và tên:
                                </Label>
                                <Col md={8}>                                    
                                    <Control
                                        type='text'
                                        model='.name'
                                        id='name'                                                                                                        
                                        placeholder="Từ 3 đến 20 ký tự"  
                                        defaultValue={props.staff.name}                         
                                        
                                    />
                                    
                                </Col>
                            </Row>
                            {/* Ngày tháng năm sinh: */}
                            <Row>
                                <Label md={3}>
                                    Ngày tháng năm sinh:
                                </Label>
                                <Col md={8}>                                    
                                <Control
                                        type='date'
                                        model='.doB'
                                        id='doB'  
                                        defaultValue={props.staff.doB}                                      
                                        
                                    />
                                    
                                </Col>
                            </Row>
                            {/* Ngày bắt đầu: */}
                            <Row>
                                <Label md={3}>
                                    Ngày bắt đầu:
                                </Label>
                                <Col md={8}>                                    
                                    <Control
                                        type='date'
                                        model='.startDate'
                                        id='startDate'  
                                        defaultValue={props.staff.startDate}                                      
                                        
                                    />
                                    
                                </Col>
                            </Row>
                            {/* Phòng ban: */}
                            <Row>
                                <Label md={3}>
                                    Phòng ban:
                                </Label>
                                <Col md={8}>                                    
                                    <Control.select
                                        type='select'                             
                                        model='.departmentId'
                                        id= 'departmentId'   
                                        defaultValue={props.staff.departmentId}                                                                                                                    
                                        
                                    >                          
                                    <option value="">Phòng ban</option>
                                    <option value="Dept01">Sale</option>
                                    <option value="Dept02">HR</option>
                                    <option value="Dept03">Marketing</option>
                                    <option value="Dept04">IT</option>
                                    <option value="Dept05">Finance</option>
                                    </Control.select>
                                    
                                </Col>
                            </Row>
                            {/* Hệ số lương: */}
                            <Row >
                                <Label md={3}>
                                    Hệ số lương:
                                </Label>
                                <Col md={8}>                                    
                                    <Control
                                        type='number'
                                        model='.salaryScale'
                                        id='salaryScale'                                                                                                        
                                        placeholder="Giá trị từ 1.0 ->4.0"  
                                        defaultValue={props.staff.salaryScale}                         
                                        
                                    />
                                    
                                </Col>
                            </Row>
                            {/* Số ngày nghỉ còn lại: */}
                            <Row>
                                <Label md={3}>
                                    Số ngày nghỉ còn lại:
                                </Label>
                                <Col md={8}>                                    
                                    <Control 
                                        type='number'
                                        
                                        model='.annualLeave'
                                        id='annualLeave'
                                        defaultValue={props.staff.annualLeave} 
                                        placeholder='Giá trị từ 0.0-12.0'
                                        
                                    />
                                    
                                </Col>
                            </Row>
                            {/* Số ngày tăng ca: */}
                            <Row>
                                <Label md={3}>
                                    Số ngày tăng ca:
                                </Label>
                                <Col md={8}>                                    
                                    <Control  
                                        type='number'
                                        id='overTime'
                                        model='.overTime'
                                        defaultValue={props.staff.overTime} 
                                        placeholder='Giá trị từ 0.0-30.0'
                                        
                                    />
                                    
                                </Col>
                            </Row>
                                                        
                            {/* Submit */}
                            <Row>
                                <Col md={{size:5, offset:5}}>
                                    <Button type='submit' color='primary' >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>                           
                                                       
                        </LocalForm>
                        
                    </ModalBody>
                </Modal>       
                
            </div>                
        ); 
    else {
        return(<div></div>);            
    }   
}   

export default StaffDetail;