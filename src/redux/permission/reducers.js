import { PermissionType } from './constant';

const initialState = {
    userPermission: ['delete'],
    pageTabs: null,
};
const UserPermission = (state = initialState, action) => {
    switch (action.type) {
        case PermissionType.USER_PERMISSION:
            return {
                ...state,
                userPermission: action.payload,
            };
        case PermissionType.SET_PAGE_TABS:
            return {
                ...state,
                pageTabs: action.payload,
            };
        default:
            return { ...state };
    }
};
export default UserPermission;
