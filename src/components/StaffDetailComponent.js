import React, {Component} from 'react';
import {Card, CardBody,CardImg,CardText,CardTitle} from 'reactstrap'
import dateFormat from 'dateformat';

class StaffDetail extends Component{    
    render(){
        const staff1=this.props.staff         
            return(
                <div className='ID'>
                   <Card key={staff1.id}>
                       <CardImg  src={staff1.image}/>
                       <CardBody>
                            <CardTitle>Họ và tên: {staff1.name}</CardTitle>
                            <CardText>Ngày sinh: {dateFormat(staff1.doB,'dd/mm/yyyy')}</CardText>
                            <CardText>Ngày vào công ty: {dateFormat(staff1.startDate,'dd/mm/yyyy')}</CardText>
                            <CardText>Phòng ban: {staff1.department.name}</CardText>
                            <CardText>Số ngày nghỉ còn lại: {staff1.annualLeave}</CardText>
                            <CardText>số ngày đã làm thêm: {staff1.overTime}</CardText>
                       </CardBody>    
                   </Card>
                </div>
            );    

        
        
    }
    
}
export default StaffDetail;