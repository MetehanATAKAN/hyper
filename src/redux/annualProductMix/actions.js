import { AnnualProductMixTypes } from './constant';


export const tabOrDetails = (name) => {

    return{
        type:AnnualProductMixTypes.TAB_OR_DETAILS,
        payload:name
    }
}

export const detailsData = (data) => {
    return {
        type:AnnualProductMixTypes.DETAILS_DATA,
        payload:data
    }
}

export const saveProfileStrategy = (body) => {
    return{
        type:AnnualProductMixTypes.SAVE_BODY,
        payload:body
    }
}