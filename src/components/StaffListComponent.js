
import React,{Component} from 'react';
import {Card,CardImg,CardBody,CardTitle,Button,Input,Modal, ModalHeader, ModalBody,Form
         , FormGroup,Col,Label, FormFeedback }from 'reactstrap';
import {Link} from 'react-router-dom';
import { DEPARTMENTS } from "../shared/staffs";


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
class StaffList extends Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            doB:'',
            salaryScale:'',
            startDate:'',
            department:'',
            annualLeave:'',
            overTime:'',            
            image:'/assets/images/alberto.png',
            touched:{
                name:false,
                doB:false,
                salaryScale:false,
                startDate:false,
                department:false,
                annualLeave:false,
                overTime:false,               
            },
            newStaffFilter:this.props.staff,
            isModalOpen:false
        };
        this.searchStaff=this.searchStaff.bind(this); 
        this.handleBlur=this.handleBlur.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);   
        this.toggleModal=this.toggleModal.bind(this);  
               
    }
    /* hàm tìm kiếm nhân viên  */
    searchStaff(event){
        event.preventDefault();
        alert("NameSearch: "+this.NameSearch.value
        );
        const NameS1= this.NameSearch.value;        
        console.log("giá trị của NameSearch ="+NameS1);
        const staffList=this.props.staff        
        .filter((val) =>{
            if(NameS1==="") 
                return val;
            else if( val.name.toLowerCase().includes(NameS1.toLowerCase()))
                return val;
        })
        this.setState({newStaffFilter:staffList});
    }
    /* hàm sự kiện khi người dùng bấm vào ô input mà không nhập dữ liệu */
    handleBlur=(field)=>(event)=>{
        this.setState({touched:{...this.state.touched,[field]:true}});
    }
    /* hàm sự kiện handleInputChange nhận dữ liệu nhập vào */
    handleInputChange(event){
        const value=event.target.value;
        const name=event.target.name;
        this.setState({[name]:value});
    }
    /* hàm sự kiện handleSubmit khi người dùng thêm nhân viên */
    handleSubmit=(event)=>{
        const errors =this.valiDate(this.state.name,this.state.doB,this.state.startDate,this.state.department,this.state.salaryScale,this.state.annualLeave,this.state.overTime        
            );
        event.preventDefault();
        const department = DEPARTMENTS.find(
            (department) =>department.id === this.state.department
        );
        console.log(department);
        const newStaff ={
            id:this.props.staff.length,
            name:this.state.name,
            doB:this.state.doB,
            startDate:this.state.startDate,
            department:department,
            salaryScale:this.state.salaryScale,
            annualLeave:this.state.annualLeave,
            overTime:this.state.overTime,
            image:'/assets/images/alberto.png'            
        };
        //điều kiện hoàn thành form thêm nhân viên
        if ((newStaff.name==="")||(newStaff.doB==="")||(newStaff.startDate==="")||(newStaff.department==="")||(newStaff.salaryScale==="")||(newStaff.annualLeave==="")||(newStaff.overTime==="")||
            (errors.name!=="") ||(errors.doB!=="")||(errors.salaryScale!=="")||(errors.department!=="")||(errors.annualLeave!=="")||(errors.overTime!=="") 
            )
        alert("Vui lòng nhập đầy đủ thông tin các trường theo hướng dẫn")
        else
        this.props.onNewStaff(newStaff);

        
    }
    /* hàm đóng mở form thêm nhân viên */
    toggleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen});
    }
   /*  hàm xác thực form thêm nhân viên  */
    valiDate(name,doB,startDate,department,salaryScale,annualLeave,overTime){
        const errors={
            name:'',
            doB:'',
            startDate:'',
            department:'',
            salaryScale:'',
            annualLeave:'',
            overTime:''        
        }
        /* xác thực tên nhân viên */
        if(this.state.touched.name&&name.length<3)
            {errors.name="Họ và tên phải có từ 3 kí tự";}
        else if(this.state.touched.name&&name.length>30)
            {errors.name="Họ và tên phải ít hơn hoặc bằng 20 ký tự"; }
        /* xác thực ngày tháng năm sinh */
        if(this.state.touched.doB&&doB.length<1)
            {errors.doB="Ngày tháng năm sinh không được bỏ trống";}
        /* xác thực ngày vào công ty */
        if(this.state.touched.startDate&&startDate.length<1)
            {errors.startDate="Ngày vào công ty không được bỏ trống";}
        /* xác thực phòng ban */
        if(department==='')
            {errors.department="Phòng ban không được bỏ trống";} 
        /* xác thực hệ số lương */
        if((this.state.touched.salaryScale&&salaryScale>2)||(this.state.touched.salaryScale&&salaryScale<1))
            {errors.salaryScale="Hệ số lương phải có giá trị từ 1.0 ->2.0";}
        else if(this.state.touched.salaryScale&&salaryScale.split('').filter((x)=>x==='.').length!==1)
            {errors.salaryScale="Hệ số lương phải có dấu chấm ở giữa (ví dụ 1.5)";}
        /* xác thực số ngày nghỉ còn lại */
        if((this.state.touched.annualLeave&&annualLeave>20)||(this.state.touched.annualLeave&&annualLeave<0))
            {errors.annualLeave="Số ngày nghỉ còn lại phải có giá trị từ 0 ->20";}
        else if(this.state.touched.annualLeave&&annualLeave.split('').filter((x)=>x==='.').length!==0)
            {errors.annualLeave="Số ngày nghỉ phải là số không chứa dấu chấm ";}
        /* xác thực số ngày đã tăng ca */
        if((this.state.touched.overTime&&overTime>30)||(this.state.touched.overTime&&overTime<0))
            {errors.overTime="Số ngày làm thêm phải có giá trị từ 0 ->30";}
        else if(this.state.touched.overTime&&overTime.split('').filter((x)=>x==='.').length!==0)
            {errors.overTime="Số ngày làm thêm phải là số không chứa dấu chấm";}
        
        return errors; 
    }

    render(event){
        const errors =this.valiDate(this.state.name,this.state.doB,this.state.startDate,this.state.department,this.state.salaryScale,this.state.annualLeave,this.state.overTime        
            );
        console.log("giá trị của newStaffFilter="+this.state.newStaffFilter);
        console.log("giá trị của staff="+this.props.staff);
        const staffList1=this.state.newStaffFilter
        .map((val)=>{
            return(
                <div className="col-6 col-md-4 col-lg-2 mt-3">
                    <RenderStaffList staff={val}/>
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
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader >
                        Thêm nhân viên
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label md={3}>
                                    Họ và tên:
                                </Label>
                                <Col md={8}>                                    
                                    <Input 
                                        type='text'
                                        name='name'
                                        value={this.state.name}
                                        placeholder='từ 0 đến 20 ký tự'
                                        onBlur={this.handleBlur('name')}
                                        onChange={this.handleInputChange}
                                        valid={errors.name===""}
                                        invalid={errors.name!==""}
                                    />
                                    <FormFeedback>
                                        {errors.name}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={3}>
                                    Ngày tháng năm sinh:
                                </Label>
                                <Col md={8}>                                    
                                    <Input 
                                        type='date'
                                        name='doB'
                                        value={this.state.doB}
                                        onBlur={this.handleBlur('doB')}
                                        onChange={this.handleInputChange}
                                        valid={errors.doB===""}
                                        invalid={errors.doB!==""}
                                    />
                                    <FormFeedback>
                                        {errors.doB}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={3}>
                                    Ngày bắt đầu:
                                </Label>
                                <Col md={8}>                                    
                                    <Input 
                                        type='date'
                                        name='startDate'
                                        value={this.state.startDate}
                                        onBlur={this.handleBlur('startDate')}
                                        onChange={this.handleInputChange}
                                        valid={errors.startDate===""}
                                        invalid={errors.startDate!==""}
                                    />
                                    <FormFeedback>
                                        {errors.startDate}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            
                            <FormGroup row>
                                <Label md={3}>
                                    Phòng ban:
                                </Label>
                                <Col md={8}>                                    
                                    <Input 
                                        id= 'department'
                                        type='select'
                                        name='department'
                                        value={this.state.department}                                        
                                        onChange={this.handleInputChange}                                       
                                        valid={errors.department===""}
                                        invalid={errors.department!==""}
                                    >
                                                                  
                                    <option value="">Chọn Phòng Ban</option>
                                    <option value="Dept01">Sale</option>
                                    <option value="Dept02">HR</option>
                                    <option value="Dept03">Marketing</option>
                                    <option value="Dept04">IT</option>
                                    <option value="Dept05">Finance</option>
                                    </Input>
                                    <FormFeedback>
                                        {errors.department}
                                    </FormFeedback> 
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={3}>
                                    Hệ số lương:
                                </Label>
                                <Col md={8}>                                    
                                    <Input 
                                        type='number'
                                        name='salaryScale'
                                        value={this.state.salaryScale}
                                        onBlur={this.handleBlur('salaryScale')}
                                        placeholder='giá trị nhập 1.0 -> 2.0'
                                        onChange={this.handleInputChange}
                                        valid={errors.salaryScale===""}
                                        invalid={errors.salaryScale!==""}
                                    />
                                    <FormFeedback>
                                        {errors.salaryScale}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={3}>
                                    Số ngày nghỉ còn lại:
                                </Label>
                                <Col md={8}>                                    
                                    <Input 
                                        type='number'
                                        name='annualLeave'
                                        value={this.state.annualLeave}
                                        onBlur={this.handleBlur('annualLeave')}
                                        placeholder='giá trị nhập 0 -> 20'
                                        onChange={this.handleInputChange}
                                        valid={errors.annualLeave===""}
                                        invalid={errors.annualLeave!==""}
                                    />
                                    <FormFeedback>
                                        {errors.annualLeave}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={3}>
                                    Số ngày tăng ca:
                                </Label>
                                <Col md={8}>                                    
                                    <Input 
                                        type='number'
                                        name='overTime'
                                        value={this.state.overTime}
                                        onBlur={this.handleBlur('overTime')}
                                        placeholder='giá trị nhập 0 -> 30'
                                        onChange={this.handleInputChange}
                                        valid={errors.overTime===""}
                                        invalid={errors.overTime!==""}
                                    />
                                    <FormFeedback>
                                        {errors.overTime}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            
                            <FormGroup row>
                                <Col md={{size:5,offset:5}} >
                                    <Button type='submit' name='submit' color='primary'onClick={this.toggleModal}>
                                        Submit
                                    </Button>

                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>                   
            </div>
        );
    }

    }
     

export default StaffList;
