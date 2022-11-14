import * as ActionTypes from './ActionTypes';
export const Departments=(state={
    departments:[]
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_DEPARTMENTS:
            return {
                ...state,
                staffs:action.payload
            }        
        default:
            return state;
    }
}