import * as ActionTypes from './ActionTypes';
export const Departments=(state={
    departments:[],
    isLoading:true,
    errMess:null
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_DEPARTMENTS:
            return {
                ...state,
                departments:action.payload,
                isLoading:true,
                errMess:null
            } 
        case ActionTypes.DEPARTMENTS_LOADING:
            return {
                ...state,
                staffs:[],
                isLoading:true,
                errMess:null
            }
        case ActionTypes.DEPARTMENTS_FAILED:
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