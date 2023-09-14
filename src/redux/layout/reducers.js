// @flow
import { LayoutActionTypes } from './constants';

import * as layoutConstants from '../../constants/layout';

const INIT_STATE = {
    layoutType: localStorage.getItem('layoutType') || layoutConstants.LAYOUT_VERTICAL,
    layoutWidth: localStorage.getItem('layoutWidth') || layoutConstants.LAYOUT_WIDTH_FLUID,
    leftSideBarTheme: localStorage.getItem('leftSidebarTheme') || layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT,
    leftSideBarType: localStorage.getItem('leftSidebarType') || layoutConstants.LEFT_SIDEBAR_TYPE_FIXED,
    showRightSidebar: true,
};

type LayoutAction = { type: string, payload?: string | null };

type State = { showRightSidebar?: boolean, +value?: boolean };

const Layout = (state: State = INIT_STATE, action: LayoutAction): any => {
    switch (action.type) {
        case LayoutActionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layoutType: action.payload,
            };
        case LayoutActionTypes.CHANGE_LAYOUT_WIDTH:
            return {
                ...state,
                layoutWidth: action.payload,
            };
        case LayoutActionTypes.CHANGE_SIDEBAR_THEME:
            return {
                ...state,
                leftSideBarTheme: action.payload,
            };
        case LayoutActionTypes.CHANGE_SIDEBAR_TYPE:
            return {
                ...state,
                leftSideBarType: action.payload,
            };
        case LayoutActionTypes.TOGGLE_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: !state.showRightSidebar,
            };
        case LayoutActionTypes.SHOW_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: true,
            };
        case LayoutActionTypes.HIDE_RIGHT_SIDEBAR:
            return {
                ...state,
                showRightSidebar: false,
            };
        default:
            return state;
    }
};

export default Layout;
