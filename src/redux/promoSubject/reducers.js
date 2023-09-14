import { PromoSubjectActionTypes } from "./constants";

const initialState = {
    promoSubjectPageData: null,
    tabName: ''
}



const PromoSubject = (state = initialState, action) => {
    switch (action.type) {
        case PromoSubjectActionTypes.PAGES_DATA:
            return {
                ...state,
                promoSubjectPageData: action.payload,
            };
        case PromoSubjectActionTypes.TAB_NAME:
            return {
                ...state,
                tabName: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};


export default PromoSubject