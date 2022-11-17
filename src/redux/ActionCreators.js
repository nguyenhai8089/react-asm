import *as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';


export const fetchStaffs=()=>(dispatch)=>{
    dispatch(staffsLoading(true));
    return fetch(baseUrl + 'staffss')
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
    return fetch(baseUrl + 'departmentss')
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
    return fetch(baseUrl + 'staffsSalarys')
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

