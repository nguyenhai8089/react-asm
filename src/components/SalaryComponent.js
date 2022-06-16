
 import React/* ,{Component} */ from 'react';
 /* import StaffDetail from './StaffDetailComponent'; */
 import {Card,Breadcrumb,CardBody,CardTitle, BreadcrumbItem}from 'reactstrap';
 import {Link} from 'react-router-dom';
 
 /* hàm StaffList render ra phần body trang */
 function Salary(props){
     
 /* hàm render hiển thị ra danh sách các nhân viên */
    
      console.log(props.staff);
         const salary=props.staff.map((staff)=>{
             return(
                 <div className="col-12 col-md-6 col-lg-4 mt-3">
                     <Card key={staff.id} >
                         
                             
                             <CardBody>
                                  <CardTitle><Link to ={`/staff/${staff.id}`}><b>{staff.name}</b> </Link>
                         </CardTitle>
                                  <CardTitle>Mã nhân viên: {staff.id}</CardTitle>
                                  <CardTitle>Hệ số lương: {staff.salaryScale}</CardTitle>
                                  <CardTitle>Số ngày làm thêm: {staff.overTime}</CardTitle>
                                  <CardTitle>Lương: {staff.salaryScale*30000000 + staff.overTime*200000}</CardTitle>
                              </CardBody>
                        
                     </Card>
                 </div>                
             );
         });
         return(
             <div class="container">                  
                 <div className='row col-12'>
                     <Breadcrumb>
                         <BreadcrumbItem><Link to="/staff">Nhân viên</Link></BreadcrumbItem>
                         <BreadcrumbItem><Link to="/department">phòng ban</Link></BreadcrumbItem>
                         <BreadcrumbItem active> Bảng Lương</BreadcrumbItem>
                     </Breadcrumb>                     
                     <hr/>                    
                 </div>             
                 <div class="row">
                     {salary}
                 </div>                      
             </div>
         );
     }
 
 
 

export default Salary;