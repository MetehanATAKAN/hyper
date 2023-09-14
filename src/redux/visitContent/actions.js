import { VisitContentTypes } from './constants';
export const setItemId = (id) => {
    return {
        type: VisitContentTypes.ITEM_ID,
        payload: id,
    };
};
export const resetItemId = () => {
    return {
        type: VisitContentTypes.RESET_ITEM_ID,
    };
};
export const setTemplateId = (id) => {
    return {
        type: VisitContentTypes.TEMPLATE_ID,
        payload: id,
    };
};
export const resetTempalteId = () => {
    return {
        type: VisitContentTypes.RESET_TEMPLATE_ID,
    };
};
export const setItemName = (data) => {
    return {
        type: VisitContentTypes.ITEM_NAME,
        payload: data,
    };
};
export const resetItemName = () => {
    return {
        type: VisitContentTypes.RESET_ITEM_NAME,
    };
};
export const setIsPage = (data) => {
    return {
        type: VisitContentTypes.IS_PAGE,
        payload: data,
    };
};
