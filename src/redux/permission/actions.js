import { PermissionType } from './constant';

export const setUserPermission = (data) => {
    return {
        type: PermissionType.USER_PERMISSION,
        payload: data,
    };
};
export const setPageTabs = (data) => {
    return {
        type: PermissionType.SET_PAGE_TABS,
        payload: data,
    };
};
