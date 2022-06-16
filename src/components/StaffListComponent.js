
import React/* ,{Component} */ from 'react';
/* import StaffDetail from './StaffDetailComponent'; */
import {Card,CardImg,CardBody,CardTitle}from 'reactstrap';
import {Link} from 'react-router-dom';

/* hàm StaffList render ra phần body trang */
function StaffList(props){
    
/* hàm render hiển thị ra danh sách các nhân viên */
   
     console.log(props.staff);
        const stafflist=props.staff.map((staff)=>{
            return(
                <div className="col-6 col-md-4 col-lg-2 mt-3">
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
        });
        return(
            <div class="container">  
                <div className='row col-12'>
                    <h2>nhân viên</h2>
                    <hr/>                    
                </div>             
                <div class="row">
                    {stafflist}
                </div>                      
            </div>
        );
    }

export default StaffList;
