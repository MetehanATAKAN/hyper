// @flow
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';

import { findAllParent, findMenuItem, getMenuItems } from '../helpers/menu';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import MENU_ITEMS from '../constants/menu';
import { FetchApiPost } from '../utils/http.helper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { setPageTabs } from '../redux/permission/actions';
const MenuItemWithChildren = ({ item, linkClassName, subMenuClassNames, activeMenuItems, toggleMenu }) => {
    const [open, setOpen] = useState(activeMenuItems.includes(item.key));

    useEffect(() => {
        setOpen(activeMenuItems.includes(item.key));
    }, [activeMenuItems, item]);

    const toggleMenuItem = (e) => {
        e.preventDefault();
        const status = !open;
        setOpen(status);
        if (toggleMenu) toggleMenu(item, status);
        return false;
    };
    const { t, i18n } = useTranslation();
    return (
        <li className={classNames('side-nav-item', { 'menuitem-active': open })}>
            <Link
                to="/#"
                onClick={toggleMenuItem}
                data-menu-key={item.key}
                aria-expanded={open}
                className={classNames('has-arrow', 'side-sub-nav-link', linkClassName, {
                    'menuitem-active': activeMenuItems.includes(item.key) ? 'active' : '',
                })}>
                {item.icon && <i className={item.icon}></i>}
                {!item.badge ? (
                    <span className="menu-arrow"></span>
                ) : (
                    <span className={`badge bg-${item.badge.variant} float-end`}>{item.badge.text}</span>
                )}
                <span> {t(`${item.label}`)} </span>
            </Link>
            <Collapse in={open}>
                <ul className={classNames(subMenuClassNames)}>
                    {item.pages?.map((child, i) => {
                        return (
                            <React.Fragment key={i}>
                                {child.pages ? (
                                    <>
                                        {/* parent */}
                                        <MenuItemWithChildren
                                            item={{
                                                key: child.key,
                                                label: t(`${child.label}`),
                                                url: child.url,
                                                parentKey: child.parentKey,
                                            }}
                                            linkClassName={activeMenuItems.includes(child.key) ? 'active' : ''}
                                            activeMenuItems={activeMenuItems}
                                            subMenuClassNames="side-nav-third-level"
                                            toggleMenu={toggleMenu}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {/* child */}
                                        <MenuItem
                                            item={{
                                                key: child.key,
                                                label: t(`${child.label}`),
                                                url: child.url,
                                                parentKey: child.parentKey,
                                            }}
                                            className={activeMenuItems.includes(child.key) ? 'menuitem-active' : ''}
                                            linkClassName={activeMenuItems.includes(child.key) ? 'active' : ''}
                                        />
                                    </>
                                )}
                            </React.Fragment>
                        );
                    })}
                </ul>
            </Collapse>
        </li>
    );
};

const MenuItem = ({ item, className, linkClassName }) => {
    const { t, i18n } = useTranslation();
    return (
        <li className={classNames('side-nav-item', className)}>
            <MenuItemLink
                item={{
                    key: item.key,
                    label: t(`${item.label}`),
                    isTitle: item.isTitle,
                    icon: item.icon,
                    url: item.url,
                    parentKey: item.parentKey,
                }}
                className={linkClassName}
            />
        </li>
    );
};

const MenuItemLink = ({ item, className }) => {
    const { t, i18n } = useTranslation();
    return (
        <Link
            to={item.url}
            target={item.target}
            className={classNames('side-nav-link-ref', 'side-sub-nav-link', className)}
            data-menu-key={item.key}>
            {item.icon && <i className={item.icon}></i>}
            {item.badge && (
                <span className={`badge badge-${item.badge.variant} rounded-pill font-10 float-end`}>
                    {item.badge.text}
                </span>
            )}
            <span> {t(`${item.label}`)} </span>
        </Link>
    );
};

/**
 * Renders the application menu
 */

type AppMenuProps = {
    menuItems: Array<any>,
    location: {
        hash: string,
        key: string,
        pathname: string,
        search: string,
        state: any,
    },
};

const AppMenu = ({ menuItems, location }: AppMenuProps) => {
    const menuRef = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const [activeMenuItems, setActiveMenuItems] = useState([]);
    const { t } = useTranslation();
    const userEmpId = localStorage.getItem('userEmpId');
    /*
     * toggle the menus
     */
    const toggleMenu = (menuItem, show) => {
        if (show) setActiveMenuItems([menuItem['key'], ...findAllParent(menuItems, menuItem)]);
    };

    /**
     * activate the menuitems
     */

    const getPageTabsByPageId = (pageId) => {
        const postData = {
            userId: userEmpId,
            pageId,
        };
        FetchApiPost('services/AuthorizationSystem/PageTab/GetPageTabByPageId', 'POST', postData).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => dispatch(setPageTabs(data)));
            } else {
                history.push('/404');
            }
        });
    };
    // const checkUserPermissionPage = (pageId) => {
    //     const body = {
    //         pageId: pageId,
    //         userId: Number(userEmpId),
    //     };
    //     FetchApiPost(
    //         'services/AuthorizationSystem/RolePermissions/CheckPermissionsTheRoleInThisPage',
    //         'POST',
    //         body
    //     ).then((res) => {
    //         if (res.status === 200) {
    //             res.json().then(({ data }) => {
    //                 if (data === false) {
    //                     history.push('/error-404');
    //                 }
    //             });
    //         } else if (res.status === 401) {
    //             history.push('/error-404');
    //         } else if (res.status === 500 || res.status === 499) {
    //             history.push('/error-500');
    //         }
    //     });
    // };
    const activeMenu = useCallback(() => {
        const div = document.getElementById('main-side-menu');
        let matchingMenuItem = null;
        let dinamikTitleItem = '';
        let page = null;
        if (div) {
            let items: any = div.getElementsByClassName('side-nav-link-ref');
            for (let i = 0; i < items.length; ++i) {
                if (location.pathname === items[i].pathname) {
                    matchingMenuItem = items[i];
                    break;
                }
            }

            if (matchingMenuItem) {
                const mid = matchingMenuItem.getAttribute('data-menu-key');
                const activeMt = findMenuItem(menuItems, mid);
                if (activeMt) {
                    setActiveMenuItems([activeMt['key'], ...findAllParent(menuItems, activeMt)]);
                }
            }
            menuItems.map((item) => {
                if (item.url === undefined) {
                    item.pages.map((child) => {
                        if (child.url === location.pathname) {
                            page = child;
                            dinamikTitleItem = child.label;
                        }
                    });
                } else {
                    if (item.url === location.pathname) {
                        page = item;
                        dinamikTitleItem = item.label;
                    }
                }
            });
            if (dinamikTitleItem.trim().length !== 0) {
                document.title = `${t(dinamikTitleItem)} : Mypossibility`;
            } else {
                document.title = `Mypossibility`;
            }
        }
        if (page) {
            // checkUserPermissionPage(page.id);
            getPageTabsByPageId(page.id);
        }
    }, [location.pathname, menuItems]);

    useEffect(() => {
        activeMenu();
    }, [activeMenu]);
    return (
        <>
            <ul className="side-nav" ref={menuRef} id="main-side-menu">
                {(menuItems || []).map((item, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            {item.isTitle ? (
                                <li className="side-nav-title side-nav-item">{item.label}</li>
                            ) : (
                                <>
                                    {item.pages ? (
                                        <MenuItemWithChildren
                                            item={item}
                                            toggleMenu={toggleMenu}
                                            subMenuClassNames="side-nav-second-level"
                                            activeMenuItems={activeMenuItems}
                                            linkClassName="side-nav-link"
                                        />
                                    ) : (
                                        <MenuItem
                                            item={item}
                                            linkClassName="side-nav-link"
                                            className={activeMenuItems.includes(item.key) ? 'menuitem-active' : ''}
                                        />
                                    )}
                                </>
                            )}
                        </React.Fragment>
                    );
                })}
            </ul>
        </>
    );
};

export default (withRouter(AppMenu): any);
