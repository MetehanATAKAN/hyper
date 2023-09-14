import { SubProcessTypes } from "./constant";

const initialState = {
    isSave : false,
    savedButton : false,
    subProcessName:'New Sub Process',
    leftBarKey:0
}


const SubProcess = (state = initialState,action) => {

    switch (action.type) {
        case SubProcessTypes.SAVE:
            return {
                ...state,
                isSave :action.payload
            }
        case SubProcessTypes.SAVED_BUTTON_CHANGE:
            return {
                ...state,
                savedButton :action.payload
            }
        case SubProcessTypes.SUB_PROCESS_NAME:
            return {
                ...state,
                subProcessName :action.payload
            }
        case SubProcessTypes.LEFT_BAR_KEY:
            return {
                ...state,
                leftBarKey :action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default SubProcess