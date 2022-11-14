import * as ActionTypes from './ActionTypes';
export const Salary=(state={
    salary:[]
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_SALARY:
            return {
                ...state,
                salary:action.payload
            }        
        default:
            return state;
    }
}