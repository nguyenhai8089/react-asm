import * as ActionTypes from './ActionTypes';
export const Salary=(state={
    salary:[],
    isLoading:true,
    errMess:null
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_SALARY:
            return {
                ...state,
                salary:action.payload,
                isLoading:false,
                errMess:null
            } 
        case ActionTypes.SALARY_LOADING:
            return {
                ...state,
                staffs:[],
                isLoading:true,
                errMess:null
            }
        case ActionTypes.SALARY_FAILED:
            return {
                ...state,
                staffs:[],
                isLoading:false,
                errMess:action.payload
            }       
        default:
            return state;
    }
}