import {DEPARTMENTS, STAFFS} from '../shared/staffs';

export const initialState ={
    staffs:STAFFS,
    department:DEPARTMENTS
}

export const Reducer = (state = initialState, action)  => {
    switch(action.type){
        case "SET_STATE":
            return {
                ...state,
                staffs: [...state.staffs,action.payload]
               
               
          };
        
        default:
        return state;

    }
   
}