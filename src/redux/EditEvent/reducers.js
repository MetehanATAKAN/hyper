import { EditEventTypes } from "./constant";

const initialState = {
    pharmacySplitData:[]
}


const EditEvent = (state = initialState,action) => {

    switch (action.type) {
        case EditEventTypes.PHARMACY_SPLIT_DATA:
            return {
                ...state,
                pharmacySplitData :action.payload
            }

        default:
            return {
                ...state
            }
    }
}

export default EditEvent