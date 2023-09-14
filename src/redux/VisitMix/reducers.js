import { VisitMixActionTypes } from "./constant";

 export const initialState={
    visitMixYearDatas:[],
    visitMixCountryDatas:[],
    visitMixBusUnitDatas:[], 
    businessBody:{}, 
    visitMixCalendarData:[],
    visitMixCalendarDataBody:[],
    user:[],
    calendarProduct:[]
}
localStorage.setItem("calendarData",initialState.visitMixCalendarData);

const VisitMixReducer=(state=initialState,action)=>{
    switch (action.type) {
        case VisitMixActionTypes.VM_GET_YEARS:
            return{
                ...state,visitMixYearDatas:action.payload
            }
        case VisitMixActionTypes.VM_GET_COUNTRY:
            return{
                ...state,visitMixCountryDatas:action.payload
            }
        case VisitMixActionTypes.VM_SET_BUS_UNIT:
            return{
                ...state,businessBody:action.payload
            }
        case VisitMixActionTypes.VM_GET_BUS_UNIT:
            return{
                ...state,visitMixBusUnitDatas:action.payload
            }    
        case VisitMixActionTypes.VM_GET_CALENDAR_DATA:
            return{
                ...state,visitMixCalendarData:action.payload
            }
        case VisitMixActionTypes.VM_GET_CALENDAR_DATA_BODY:
            return{
                ...state,visitMixCalendarDataBody:action.payload
            }
        case VisitMixActionTypes.USER_INFO:
            return{
                ...state,user:state.user.push(action.payload)
            }
            case VisitMixActionTypes.VM_CALENDAR_PRODUCT:
            return{
                ...state,calendarProduct:action.payload
            }
        default:
            return state;
    }
}

export default VisitMixReducer