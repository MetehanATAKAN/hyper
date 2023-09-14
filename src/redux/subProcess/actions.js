import { SubProcessTypes } from './constant';


export const isSaveSubProcess = (value) => {

    return{
        type:SubProcessTypes.SAVE,
        payload:value
    }
}

export const savedButtonChange = (value) => {
    return{
        type:SubProcessTypes.SAVED_BUTTON_CHANGE,
        payload:value
    }
}

export const subProcessNameHeader = (value) => {
    return{
        type:SubProcessTypes.SUB_PROCESS_NAME,
        payload:value
    }
}

export const leftBarKey = (value) => {
    return{
        type:SubProcessTypes.LEFT_BAR_KEY,
        payload:value
    }
}
