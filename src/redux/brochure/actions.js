import { BrochureActionTypes } from './constants';
export const setContentId = (data) => {
    return {
        type: BrochureActionTypes.SET_CONTENT_ID,
        payload: data,
    };
};
export const clearContentId = () => {
    return {
        type: BrochureActionTypes.CLEAR_CONTENT_ID,
    };
};

export const setDisadvantageContentId = (data) => {
    return {
        type: BrochureActionTypes.SET_DISADVANTAGE_CONTENT_ID,
        payload: data,
    };
}

export const clearDisadvantageContentId = () => {
    return {
        type: BrochureActionTypes.CLEAR_DISADVANTAGE_CONTENT_ID,
    };
}
