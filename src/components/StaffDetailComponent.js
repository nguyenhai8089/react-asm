import React, {Component} from 'react';
import {Card, CardBody,CardImg,CardText,CardTitle} from 'reactstrap'
import dateFormat from 'dateformat';

class StaffDetail extends Component{    
    render(){
        const staff1=this.props.staff         
            return(
                <div >
                   <Card key={staff1.id}>
                       <CardImg  src={staff1.image}/>
                       <CardBody>
                            <CardTitle>Họ và tên: {staff1.name}</CardTitle>
                            <CardText>Ngày sinh: {dateFormat(staff1.doB,'dd/mm/yyyy')}</CardText>
                       </CardBody>    
                   </Card>
                </div>
            );    

        
        
    }
    
}
export default StaffDetail;