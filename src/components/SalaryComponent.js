
 import React,{useState} from 'react'; 
 import {Card,Breadcrumb,CardBody,CardText, BreadcrumbItem,Button}from 'reactstrap';
 import {Link} from 'react-router-dom';
 

 /* hàm StaffList render ra phần body trang */
 function RenderSalary({staff,salary}){
 
   return(
    <div>
      <Card key={staff.id} >                    
        <CardBody>
          <CardText>
              <Link to ={`/staff/${staff.id}`}><b>{staff.name}</b> </Link>
          </CardText>
          <CardText>Mã nhân viên: {staff.id}</CardText>
          <CardText>Hệ số lương: {staff.salaryScale}</CardText>
          <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
          <CardText className='row col-12'>Lương: {salary} VND </CardText>
        </CardBody>                    
      </Card>
    </div>
   );
 }


 function Salary(props){
      const [stafflist, setStaffList] = useState(props.staff);

     function SalaryCalculation(salaryScale,overTime){         
      return salaryScale*10*300000 + overTime*200000;
     } 

      function sortSalary(sort){
      let sortSalaryList=[...stafflist]
      let x=0;
      let y=0;
      if (sort==="luong thap"){
         sortSalaryList.sort(function(a,b){
          x=SalaryCalculation(a.salaryScale,a.overTime);
          y=SalaryCalculation(b.salaryScale,b.overTime);
          return x-y;
         })
      }
      if (sort==="luong cao"){
        sortSalaryList.sort(function(a,b){
         x=SalaryCalculation(a.salaryScale,a.overTime);
         y=SalaryCalculation(b.salaryScale,b.overTime);
         return y-x;
        })
     }
     setStaffList(sortSalaryList);
     } 

     function sortOverTime(sort){
      let sortOverTime=[...stafflist]
      let x=0;
      let y=0;
      if (sort==="tang ca thap"){
         sortOverTime.sort(function(a,b){
          x=a.overTime;
          y=b.overTime;
          return x-y;
         })
      }
      if (sort==="tang ca cao"){
        sortOverTime.sort(function(a,b){
          x=a.overTime;
          y=b.overTime;
         return y-x;
        })
     }
     setStaffList(sortOverTime);
     }      


      console.log(stafflist);
         const salary=stafflist.map((staff)=>{
             return(
                 <div className="col-12 col-md-6 col-lg-4 mt-3">
                     <RenderSalary staff={staff} salary={SalaryCalculation(staff.salaryScale,staff.overTime)}/>
                 </div>                
             );
         });
       
         return(
             <div class="container">                  
                 <div className='col-12'>
                     <Breadcrumb>
                         <BreadcrumbItem><Link to="/staff">Nhân viên</Link></BreadcrumbItem>
                         <BreadcrumbItem><Link to="/department">phòng ban</Link></BreadcrumbItem>
                         <BreadcrumbItem active> Bảng Lương</BreadcrumbItem>
                     </Breadcrumb>                     
                     <hr/>                    
                 </div> 
                 
                <div className='row'>
                  <div className='col-6'>
                    <h5>sắp xếp theo mức lương</h5>
                    <Button className='mr-2' onClick={()=>sortSalary("luong thap")}><i class="fa fa-arrow-up"></i> Lương Thấp</Button>
                    <Button onClick={()=>sortSalary("luong cao")}><i class="fa fa-arrow-down"></i> Lương cao</Button>
                  </div>
                  <div className='col-6'>
                    <h5>sắp xếp theo số ngày tăng ca</h5>
                    <Button className='mr-2' onClick={()=>sortOverTime("tang ca thap")}><i class="fa fa-arrow-up"></i> Số ngày tăng ca Thấp</Button>
                    <Button onClick={()=>sortOverTime("tang ca cao")}><i class="fa fa-arrow-down"></i> Số ngày tăng ca cao</Button>
                  </div>                  
                 
                </div>      
                 <div class="row"> 
                     {salary}
                 </div> 
                 <hr/>                     
             </div>
         );
     }
 
 
 

export default Salary;