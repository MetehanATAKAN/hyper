import { SettingsTypes } from './constant';
const initialState = {
    menuItems: null,
};
const Settings = (state = initialState, action) => {
    switch (action.type) {
        case SettingsTypes.MENU_ITEMS:
            return {
                ...state,
                menuItems: action.payload,
            };

        default:
            return {
                ...state,
            };
    }
};
export default Settings;
