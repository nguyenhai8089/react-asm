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
                tech: action.tech
          };
        
        default:
        return state;

    }
   
}