import { MMDataCheckTypes } from "./constant";

const initialState = {
    wantsFilters:null
}


const MMDataCheck = (state = initialState,action) => {

    switch (action.type) {
        case MMDataCheckTypes.WANT_FILTER:
            return {
                ...state,
                tabOrDetails :action.payload
            }
        
        default:
            return {
                ...state
            }
    }
}

export default MMDataCheck