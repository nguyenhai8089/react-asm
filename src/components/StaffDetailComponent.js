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
import {DeleteStaff} from '../redux/ActionCreators'

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
    const id = useParams();
    const [isModalOpen,setModal] = useState(false);
    function toggleModal(){
        setModal({
            isModalOpen: !isModalOpen
        });
    }

    function handleDeleteStaff() {
        
        console.log(id)
        dispatch(DeleteStaff(id));
        props.history.push("/staff");
      }
   
    /* hàm sự kiện handleSubmit khi người dùng thêm nhân viên */
    function handleSubmitUpdate(value){        
        props.patchAddStaff(
        props.staff.length,
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
                
            </div>                
        ); 
    else {
        return(<div></div>);            
    }   
}   

export default StaffDetail;