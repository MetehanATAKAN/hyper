import { BrochureActionTypes } from './constants';
const initialState = {
    contentId: 0,
    disadvantageContentId: null,
};
const Brochure = (state = initialState, action) => {
    switch (action.type) {
        case BrochureActionTypes.SET_CONTENT_ID:
            return {
                ...state,
                contentId: action.payload,
            };
        case BrochureActionTypes.CLEAR_CONTENT_ID:
            return {
                ...state,
                contentId: 0,
            };
        case BrochureActionTypes.SET_DISADVANTAGE_CONTENT_ID:
            return {
                ...state,
                disadvantageContentId: action.payload,
            };
        case BrochureActionTypes.CLEAR_DISADVANTAGE_CONTENT_ID:
            return {
                ...state,
                disadvantageContentId: 0,
            };

        default:
            return state;
    }
};
export default Brochure;
