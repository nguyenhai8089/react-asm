
import React,{Component} from 'react';
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    Button,
    Input,
    Modal, 
    ModalHeader, 
    ModalBody,
    Row,
    Col,Label
    }from 'reactstrap';
import {Link} from 'react-router-dom';
/* import { DEPARTMENTS } from "../shared/staffs"; */
import {Control,LocalForm,Errors} from 'react-redux-form'
import {Loading} from './LoadingComponent';


const required = (val)=> val && val.length;
const maxLength = (len)=>(val)=> !val||val.length<=len;
const minLength = (len)=>(val)=> val&&val.length>=len; 
const isNumber = (val)=>!Number.isNaN(Number(val));
const RangeSalaryScale =(val)=> 1<=val&&val<=4; 
const RangeOverTime =(val)=> 0<=val&&val<=30; 
const RangeAnnualLeave =(val)=> 0<=val&&val<=12; 
const dotOfNumber= (val)=>val&&(val.split('').filter((x)=>x==='.').length===1)

/* hàm Render ra ảnh và tên nhân viên */
function RenderStaffList({staff1,isLoading,errMess}){
    if(isLoading){
        return<Loading />
    } else if(errMess){
        return<h4>{errMess}</h4>
    } else 
        return(
            <div>
            <Card key={staff1.id} >
                    <Link to ={`/staff/${staff1.id}`}>
                        <CardImg src={staff1.image} alt={staff1.name}/>
                        <CardBody>
                            <CardTitle>{staff1.name}</CardTitle>
                        </CardBody>
                    </Link>                        
                </Card>
            </div>
        );

}
/* hàm StaffList render ra danh sách nhân viên */
class StaffList extends Component{
    
    constructor(props){
        super(props);
        this.state={            
            newStaffFilter:this.props.staff,
            isModalOpen:false
        };
        this.searchStaff=this.searchStaff.bind(this); 
        this.handleSubmit=this.handleSubmit.bind(this);   
        this.toggleModal=this.toggleModal.bind(this);  
               
    }
    /* hàm tìm kiếm nhân viên  */
    searchStaff(event){
        event.preventDefault();       
        const NameS1= this.NameSearch.value;        
        console.log("giá trị của NameSearch ="+NameS1);

        /* hàm lọc nhân viên */
        const staffList=this.props.staff        
        .filter(
                (val) => val.name.toLowerCase().includes(NameS1.toLowerCase())
            );
        if(staffList.length!==0) 
            return this.setState(
                {newStaffFilter:staffList}
            );
        else
            return this.setState(
                {newStaffFilter:[...this.props.staff]}
            );
        
    }
    
   
    /* hàm sự kiện handleSubmit khi người dùng thêm nhân viên */
    handleSubmit(value){
        const department = this.props.department.find(
            (department) =>department.id === value.department
        );
        console.log(department);
        const newStaff ={
            id:this.props.staff.length,
            name:value.name,
            doB:value.doB,
            startDate:value.startDate,
            department:department,
            salaryScale:value.salaryScale,
            annualLeave:value.annualLeave,
            overTime:value.overTime,
            image:'/assets/images/alberto.png'            
        };
        //điều kiện hoàn thành form thêm nhân viên
        if (
            (newStaff.name==="")||
            (newStaff.doB==="")||
            (newStaff.startDate==="")||
            (newStaff.department==="")||
            (newStaff.salaryScale==="")||
            (newStaff.annualLeave==="")||
            (newStaff.overTime==="")
            )
             /* alert("Vui lòng nhập đầy đủ thông tin các trường theo hướng dẫn") */
             alert("Vui lòng nhập đầy đủ thông tin các trường theo hướng dẫn")
        else {
            this.props.onNewStaff(newStaff);
            this.toggleModal();
        }   
    }

    /* hàm đóng mở form thêm nhân viên */
    toggleModal(){
        this.setState(
            {isModalOpen:!this.state.isModalOpen}
        );
    }
   
    render(){        
        console.log("giá trị của newStaffFilter="+this.state.newStaffFilter);
        console.log("giá trị của staff="+this.props.staff);
        const staffList1=this.state.newStaffFilter
        .map((val)=>{
            return(
                <div className="col-6 col-md-4 col-lg-2 mt-3">
                    <RenderStaffList staff1={val} isLoading={this.props.staffsLoading} errMess={this.props.staffsErrMess}/>
                </div>                
            );
        });
        return(
            <div class="container">  
                <div className='row'>
                    <div className='col-12 col-md-6 mt-3 '>
                        <div className='row'>
                            <div className='col-10 col-md-10'>
                                <h2 className=''>Nhân viên</h2>
                            </div>
                            <div className='col-2 col-auto'>
                                <Button onClick={this.toggleModal}>
                                    <spam className='fa fa-plus fa-lg'></spam>
                                </Button>
                            </div>
                        </div>
                    </div >
                    <div className='col-12 col-md-6 mt-3 '>
                        <form className='row' onSubmit={this.searchStaff}>
                            <div className='col-8 col-md-8'>
                                <Input 
                                    type='text'
                                    name='NameS'
                                    innerRef={(input)=>this.NameSearch=input}
                                    placeholder='Tìm kiếm nhân viên'
                                />
                            </div>
                            <div className='col-4 col-md-4'>
                                <Button color='success'>Tìm Kiếm</Button>
                            </div>
                        </form>
                    </div>          
                    <hr/>                    
                </div> 
                            
                <div class="row" >
                    {staffList1}
                </div> 
                <hr/>  
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader >
                        Thêm nhân viên
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm  onSubmit={ this.handleSubmit}>
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
                                        model='.department'
                                        id= 'department'                                                                                                                       
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
                                        model='.department'
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
    }

    }

export default StaffList;
