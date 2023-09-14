import { AnnualProductMixTypes } from "./constant";

const initialState = {
    tabOrDetails : null,
    detailsData :  null,
    saveBody: null
}


const AnnualProductMix = (state = initialState,action) => {

    switch (action.type) {
        case AnnualProductMixTypes.TAB_OR_DETAILS:
            return {
                ...state,
                tabOrDetails :action.payload
            }
        case AnnualProductMixTypes.DETAILS_DATA:
            return {
                ...state,
                detailsData :action.payload
            }
        case AnnualProductMixTypes.SAVE_BODY:
            return {
                ...state,
                saveBody :action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default AnnualProductMix