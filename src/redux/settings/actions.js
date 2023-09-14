import { SettingsTypes } from './constant';

export const menu_items = (data) => {
    return {
        type: SettingsTypes.MENU_ITEMS,
        payload: data,
    };
};
