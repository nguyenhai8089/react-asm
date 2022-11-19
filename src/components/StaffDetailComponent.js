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
import {deleteOfStaff,fetchStaffs} from '../redux/ActionCreators'

const required = (val)=> val && val.length;
const maxLength = (len)=>(val)=> !val||val.length<=len;
const minLength = (len)=>(val)=> val&&val.length>=len; 
const isNumber = (val)=>!Number.isNaN(Number(val));
const RangeSalaryScale =(val)=> 1<=val&&val<=4; 
const RangeOverTime =(val)=> 0<=val&&val<=30; 
const RangeAnnualLeave =(val)=> 0<=val&&val<=12; 
const dotOfNumber= (val)=>val&&(val.split('').filter((x)=>x==='.').length===1)



/* hàm render chi tiết thồng tin của nhân viên */
function RenderStaffDetail({staff1,department1,isLoading,errMess}){
    if(isLoading){
        return<Loading />
    } else if(errMess){
        return<h4>{errMess}</h4>
    } else 
        return(
            <div className='row'>
                <div className='mt-5 left col-lg-3 col-md-4 col-12'> 
                    <CardImg  src={staff1.image}/>
                        
                </div>
                <div className='mt-1 right col-lg-9 col-md-8 col-12'>
                    <CardBody>
                        <CardTitle>Họ và tên: <b>{staff1.name}</b> </CardTitle>
                        <CardText>Ngày sinh: {dateFormat(staff1.doB,'dd/mm/yyyy')}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff1.startDate,'dd/mm/yyyy')}</CardText>
                        <CardText>Phòng ban: {department1.name}</CardText>
                        <CardText>Bậc lương: {staff1.salaryScale}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff1.annualLeave}</CardText>
                        <CardText>số ngày đã làm thêm: {staff1.overTime}</CardText>
                    </CardBody>
                </div> 

            </div>
        );
}

/* hàm render toàn bộ trang chi tiết thồng tin của nhân viên */
function StaffDetail(props){    
    const dispatch = useDispatch();
    const id = props.staff.id;
    const [isModalOpen,setModal] = useState(false);
    function toggleModal(){
        setModal({
            isModalOpen: !isModalOpen
        });
    }

    function handleDeleteStaff() {
        
        console.log(id)
        dispatch(deleteOfStaff(id));
        dispatch(fetchStaffs());
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
    const department1=props.department.filter(
        (department)=>department.id===props.staff.departmentId
    )[0]
    
    console.log('giá trị của staff sau filter'+staff1);  
    console.log('giá trị của department sau filter'+department1); 
    if(department1!=null)   
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
                                        validators={
                                            {
                                                required,
                                                minLength: minLength(3),
                                                maxLength: maxLength(20)
                                            }
                                        }
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.name'
                                        show='touched'                                        
                                        messages=
                                        {
                                            {
                                                required:'Họ và tên không được bỏ trống, ',
                                                minLength:'Họ và tên phải có độ dài từ 3 ký tự ',
                                                maxLength:'Họ và tên phải có độ dài nhỏ hơn hoặc bằng 20 ký tự'
                                                
                                            }
                                        }
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
                                        validators={
                                            {
                                                required
                                            }
                                        }
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.doB'
                                        show='touched'
                                        messages={
                                            {
                                                required:'Ngày tháng năm sinh không được bỏ trống',                                                
                                            }
                                        }
                                        
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
                                        validators={
                                            {
                                                required
                                            }
                                        }
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.startDate'
                                        show='touched'
                                        messages={
                                            {
                                                required:'Ngày vào công ty không được bỏ trống'
                                            }
                                        }                                        
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
                                        validators={
                                            {
                                                required
                                            }
                                        }
                                    >                          
                                    <option value="">Phòng ban</option>
                                    <option value="Dept01">Sale</option>
                                    <option value="Dept02">HR</option>
                                    <option value="Dept03">Marketing</option>
                                    <option value="Dept04">IT</option>
                                    <option value="Dept05">Finance</option>
                                    </Control.select>
                                    <Errors
                                        className='text-danger'
                                        model='.departmentId'
                                        show='touched'
                                        messages={
                                            {
                                                required:'Bạn chưa chọn phòng ban, phòng ban không được bỏ trống'
                                            }
                                        }                                        
                                    />
                                </Col>
                            </Row>
                            {/* Hệ số lương: */}
                            <Row >
                                <Label md={3}>
                                    Hệ số lương:
                                </Label>
                                <Col md={8}>                                    
                                    <Control
                                        type='text'
                                        model='.salaryScale'
                                        id='salaryScale'                                                                                                        
                                        placeholder="Giá trị từ 1.0 ->4.0"  
                                        defaultValue={props.staff.salaryScale}                         
                                        validators={
                                            {
                                                required,
                                                isNumber,
                                                RangeSalaryScale,
                                                dotOfNumber,
                                                maxLength:maxLength(3)
                                            }
                                        }
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.salaryScale'
                                        show='touched'                                        
                                        messages=
                                        {
                                            {
                                                required:'Hệ số lương không được bỏ trống, ',
                                                isNumber:'hệ số lương phải là kiểu số, ',
                                                RangeSalaryScale:"hệ số lương nhận giá trị từ 1.0-->4.0, ",
                                                dotOfNumber: "hệ số lương phải là số thập phân có 1 chữ số sau dấu chấm (ví dụ 2.5) ",
                                                maxLength:" hệ số lương có tối đa 3 ký tự"
                                            }
                                        }
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
                                        type='text'
                                        
                                        model='.annualLeave'
                                        id='annualLeave'
                                        defaultValue={props.staff.annualLeave} 
                                        placeholder='Giá trị từ 0.0-12.0'
                                        validators={
                                            {
                                                required,
                                                isNumber,
                                                RangeAnnualLeave,
                                                dotOfNumber,
                                                maxLength:maxLength(4)
                                            }
                                        }
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.annualLeave'
                                        show='touched'
                                        messages={
                                            {
                                                required:'Số ngày nghỉ còn lại không được bỏ trống, ',
                                                isNumber:'số ngày nghỉ còn lại phải là kiểu số, ',
                                                RangeAnnualLeave:"Số ngày nghỉ còn lại nhận giá trị từ 0.0-->12.0, ",
                                                dotOfNumber: "số ngày nghỉ còn lại phải là số thập phân có 1 chữ số sau dấu chấm (ví dụ 8.5 ) ",
                                                maxLength:"số ngày nghỉ còn lại có tối đa 4 ký tự"
                                            }
                                        }
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
                                        type='text'
                                        id='overTime'
                                        model='.overTime'
                                        defaultValue={props.staff.overTime} 
                                        placeholder='Giá trị từ 0.0-30.0'
                                        validators={
                                            {
                                                required,
                                                isNumber,
                                                RangeOverTime,
                                                dotOfNumber,
                                                maxLength:maxLength(4)
                                            }
                                        }
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.overTime'
                                        show='touched'
                                        messages={
                                            {
                                                required:'Số ngày tăng ca không được bỏ trống, ',
                                                isNumber:'số ngày tăng ca phải là kiểu số, ',
                                                RangeOverTime:"số ngày tăng ca nhận giá trị từ 0.0-->30.0, ",
                                                dotOfNumber: "số ngày tăng ca phải là số thập phân có 1 chữ số sau dấu chấm (ví dụ 10.0) ",
                                                maxLength:"số ngày tăng ca có tối đa 4 ký tự"
                                            }
                                        }
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