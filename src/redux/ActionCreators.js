import *as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const addStaffs =(staffs)=>({
    type:ActionTypes.ADD_STAFFS,
    payload:staffs
});
export const fetchStaffs=()=>(dispatch)=>{
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
    .then(response=>response.json())
    .then(staffs => dispatch(addStaffs(staffs)))
}
export const addDepartments =(departments)=>({
    type:ActionTypes.ADD_DEPARTMENTS,
    payload:departments
});
export const fetchDepartments=()=>(dispatch)=>{
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
}

