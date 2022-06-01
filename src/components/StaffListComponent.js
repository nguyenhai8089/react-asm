import React, {Component} from 'react';


class StaffList extends Component{
    constructor(props){
        super(props);
        this.state={onSelectStaff:null, columDefault:"col-12 col-md-6 col-lg-4 mt-1"};
    }
    onStaff(staff){
        this.setState={onSelectStaff:staff};
    }
    columSelect(colum){
        this.setState={columDefault:colum}
    }

    render(){
        return(
            <div>
                
            </div>
        );
    }
}
export default StaffList;