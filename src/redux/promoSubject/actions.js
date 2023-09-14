import { PromoSubjectActionTypes } from "./constants";

export const promoSubjectPagesDatas = (data) => {
    return {
        type: PromoSubjectActionTypes.PAGES_DATA,
        payload: data,
    };
};

export const tabName = (name) => {
    return {
        type: PromoSubjectActionTypes.TAB_NAME,
        payload: name,
    };
};