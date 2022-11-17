import *as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const addStaff =(staff)=>({
    type:ActionTypes.ADD_STAFF,
    payload:staff
});

export const postAddStaff = (id,name,doB,salaryScale,startDate,departmentId,annualLeave,overTime,image,salary)=>(dispatch)=>{
    const newStaff={
        id:id,
        name:name,
        doB:doB,
        salaryScale:salaryScale,
        startDate:startDate,
        departmentId:departmentId,
        annualLeave:annualLeave,
        overTime:overTime,
        image:"/assets/images/alberto.png",
        salary:salary,
    }
    return fetch(baseUrl+'staffs',{
        method: 'POST',
        body:JSON.stringify(newStaff),
        headers:{'Content-Type':'application/json'},
        credentials:'same-origin'
    })
    .then(
        response => {
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error'+response.status+':'+response.statusText);
                error.response= response;
                throw error;
            }

        },
        error => {
            throw error;
        }
    )
    .then((response)=> response.json())
    .then((response)=> dispatch(addStaff(response)))
    .catch((error)=> {console.log('post addStaff',error.message); alert('Your addStaff could not be posted /n Error:'+error.message)})
}

export const fetchStaffs=()=>(dispatch)=>{
    dispatch(staffsLoading(true));
    return fetch(baseUrl + 'staffs')
    .then(
        response =>{
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error'+response.status+':'+response.statusText);
                error.response = response;
                throw error;
            }

        },
        error=>{
            throw error;
        }
    )
    .then((response)=>response.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error)=>dispatch(staffsFailed(error.message)))
}
export const addStaffs =(staffs)=>({
    type:ActionTypes.ADD_STAFFS,
    payload:staffs
});
export const staffsLoading = ()=>({
    type:ActionTypes.STAFFS_LOADING
})
export const staffsFailed=(errmess)=>({
    type:ActionTypes.STAFFS_FAILED,
    payload:errmess
})

export const fetchDepartments=()=>(dispatch)=>{
    dispatch(departmentsLoading(true));
    return fetch(baseUrl + 'departments')
    .then(
        response =>{
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error'+response.status+':'+response.statusText);
                error.response = response;
                throw error;
            }

        },
        error=>{
            throw error;
        }
    )
    .then(response=>response.json())
    .then(departments => dispatch(addDepartments(departments)))
    .catch((error)=>dispatch(departmentsFailed(error.message)))
}
export const addDepartments =(departments)=>({
    type:ActionTypes.ADD_DEPARTMENTS,
    payload:departments
});
export const departmentsLoading = ()=>({
    type:ActionTypes.DEPARTMENTS_LOADING
})
export const departmentsFailed=(errmess)=>({
    type:ActionTypes.DEPARTMENTS_FAILED,
    payload:errmess
})



export const fetchSalary=()=>(dispatch)=>{
    dispatch(salaryLoading(true));
    return fetch(baseUrl + 'staffsSalary')
    .then(
        response =>{
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error'+response.status+':'+response.statusText);
                error.response = response;
                throw error;
            }

        },
        error=>{
            throw error;
        }
    )
    .then(response=>response.json())
    .then(salary => dispatch(addSalary(salary)))
    .catch((error)=>dispatch(salaryFailed(error.message)))
}
export const addSalary =(salary)=>({
    type:ActionTypes.ADD_SALARY,
    payload:salary
});
export const salaryLoading = ()=>({
    type:ActionTypes.SALARY_LOADING
})
export const salaryFailed=(errmess)=>({
    type:ActionTypes.SALARY_FAILED,
    payload:errmess
})

