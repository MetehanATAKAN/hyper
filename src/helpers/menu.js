import MENU_ITEMS from '../constants/menu';
import { FetchApiGet } from '../utils/http.helper';

const getMenuItems = () => {
    // NOTE - You can fetch from server and return here as well
    // FetchApiGet('services/AdminPanel/ManageLeftBar/GetManageLeftBar', 'GET').then((res) => {
    //     if (res.status === 200) {
    //         res.json().then(({ data }) => {
    //             return data.modules;
    //         });
    //     }
    // });
};

const findAllParent = (menuItems, menuItem) => {
    let parents = [];
    const parent = findMenuItem(menuItems, menuItem['parentKey']);

    if (parent) {
        parents.push(parent['key']);
        if (parent['parentKey']) parents = [...parents, ...findAllParent(menuItems, parent)];
    }
    return parents;
};

const findMenuItem = (menuItems, menuItemKey) => {
    if (menuItems && menuItemKey) {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].key === menuItemKey) {
                return menuItems[i];
            }
            var found = findMenuItem(menuItems[i].children, menuItemKey);
            if (found) return found;
        }
    }
    return null;
};

export { getMenuItems, findAllParent, findMenuItem };
