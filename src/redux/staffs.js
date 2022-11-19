import * as ActionTypes from './ActionTypes';
export const Staffs=(state={
    staffs:[],
    isLoading:true,
    errMess:null
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_STAFFS:
            return {
                ...state,
                staffs:action.payload,
                isLoading:false,
                errMess:null
            }
        case ActionTypes.STAFFS_LOADING:
            return {
                ...state,
                staffs:[],
                isLoading:true,
                errMess:null
            }
        case ActionTypes.STAFFS_FAILED:
            return {
                ...state,
                staffs:[],
                isLoading:false,
                errMess:action.payload
            }
        case ActionTypes.ADD_STAFF:
            var staff=action.payload;
            return{
                ...state,
                /* staffs:state.staffs.concat(staff) */
                staffs:[...state.staffs,staff]
            }
        case ActionTypes.DELETE_STAFF:
            return {
                ...state,
                staffs:action.payload,
                isLoading:false,
                errMess:null
            }
        case ActionTypes.DELETE_STAFF_LOADING:
            return {
                ...state,
                staffs:[],
                isLoading:true,
                errMess:null
            }


        case ActionTypes.UPDATE_STAFF:
            return {
                ...state,
                staffs:action.payload,
                isLoading:false,
                errMess:null
            }
        default:
            return state;
    }
}