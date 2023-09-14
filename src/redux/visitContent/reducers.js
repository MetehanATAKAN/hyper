import { VisitContentTypes } from './constants';

const initialState = {
    itemId: null,
    itemName: null,
    templateId: null,
    isPage: false,
};
const VisitContent = (state = initialState, action) => {
    switch (action.type) {
        case VisitContentTypes.ITEM_ID:
            return {
                ...state,
                itemId: action.payload,
            };
        case VisitContentTypes.RESET_ITEM_ID:
            return {
                ...state,
                itemId: null,
            };
        case VisitContentTypes.TEMPLATE_ID:
            return {
                ...state,
                templateId: action.payload,
            };
        case VisitContentTypes.RESET_TEMPLATE_ID:
            return {
                ...state,
                templateId: null,
            };
        case VisitContentTypes.ITEM_NAME:
            return {
                ...state,
                itemName: action.payload,
            };
        case VisitContentTypes.RESET_ITEM_NAME:
            return { ...state, itemName: null };
        case VisitContentTypes.IS_PAGE:
            return { ...state, isPage: action.payload };
        default:
            return {
                ...state,
            };
    }
};
export default VisitContent;
