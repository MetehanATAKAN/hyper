import { VisitMixActionTypes } from "./constant"

//business unit
export const setVisitMixBusUnit=(data)=>{
    console.log(data);
    return{
        type:VisitMixActionTypes.VM_SET_BUS_UNIT,
        payload:data
    }
}
export const getVisitMixBusUnit=(data)=>{
    return{
        type:VisitMixActionTypes.VM_GET_BUS_UNIT,
        payload:data
    }
}
//visitMix Calendar
export const setVisitMixCalendarButton=(data)=>{
    console.log(data);
    return{
        type:VisitMixActionTypes.VM_SET_CALENDAR_DATA_BUTTON,
        payload:data
    }
}
export const getVisitMixCalendarButton=(data)=>{
    return{
        type:VisitMixActionTypes.VM_GET_CALENDAR_DATA_BUTTON,
        payload:data
    }
}
//button click and calendar data
export const getVisitMixCalendarData=(data)=>{
    console.log("reduxx",data.data);
    return{
        type:VisitMixActionTypes.VM_GET_CALENDAR_DATA,
        payload:data
    }
}
export const getVisitMixCalendarDataBody=(data)=>{
    console.log("reduxx22",data);
    return{
        type:VisitMixActionTypes.VM_GET_CALENDAR_DATA_BODY,
        payload:data
    }
}
export const userInfo= (user)=>{
    console.log(user);
    return{
        type:VisitMixActionTypes.USER_INFO,
        payload:user
    }
}
// VİSİT MİX CALENDAR PRODUCT
export const calendarProduct= (data)=>{
    console.log(data);
    return{
        type:VisitMixActionTypes.VM_CALENDAR_PRODUCT,
        payload:data
    }
}

