import { MicroTargetTypes } from "./constant";

const initialState = {
    radioValue : 1
}


const MicroTarget = (state = initialState,action) => {

    switch (action.type) {
        case MicroTargetTypes.RADIO_VALUE:
            return {
                ...state,
                radioValue :action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default MicroTarget