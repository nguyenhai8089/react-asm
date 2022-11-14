import * as ActionTypes from './ActionTypes';
export const Staffs=(state={
    staffs:[]
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_STAFFS:
            return {
                ...state,
                staffs:action.payload
            }
        case ActionTypes.ADD_STAFF:
            var staff=action.payload;
            return{
                ...state,
                staffs:state.staffs.concat(staff)
            }
        default:
            return state;
    }
}