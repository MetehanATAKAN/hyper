import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSidebarType } from '../redux/actions';
import * as layoutConstants from '../constants/layout';
import LanguageDropdown from '../components/LanguageDropdown';
import NotificationDropdown from '../components/NotificationDropdown';
import ProfileDropdown from '../components/ProfileDropdown';
import LightMode from '../components/Icons/LightMode';

const CustomNavbar = () => {
    const dispatch = useDispatch();
    const [isClick, setIsClick] = useState(false);
    const clickMenu = () => {
        if (isClick === false) {
            dispatch(changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED));
            setIsClick(!isClick);
        } else if (isClick === true) {
            dispatch(changeSidebarType(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED));
            setIsClick(!isClick);
        }
    };
    const Notifications = [
        {
            id: 1,
            text: 'Caleb Flakelar commented on Admin',
            subText: '1 min ago',
            icon: 'mdi mdi-comment-account-outline',
            bgColor: 'primary',
        },
        {
            id: 2,
            text: 'New user registered.',
            subText: '5 min ago',
            icon: 'mdi mdi-account-plus',
            bgColor: 'info',
        },
        {
            id: 3,
            text: 'Cristina Pride',
            subText: 'Hi, How are you? What about our next meeting',
            icon: 'mdi mdi-comment-account-outline',
            bgColor: 'success',
        },
        {
            id: 4,
            text: 'Caleb Flakelar commented on Admin',
            subText: '4 days ago',
            icon: 'mdi mdi-comment-account-outline',
            bgColor: 'danger',
        },
        {
            id: 5,
            text: 'New user registered.',
            subText: '5 min ago',
            icon: 'mdi mdi-account-plus',
            bgColor: 'info',
        },
        {
            id: 6,
            text: 'Cristina Pride',
            subText: 'Hi, How are you? What about our next meeting',
            icon: 'mdi mdi-comment-account-outline',
            bgColor: 'success',
        },
        {
            id: 7,
            text: 'Carlos Crouch liked Admin',
            subText: '13 days ago',
            icon: 'mdi mdi-heart',
            bgColor: 'info',
        },
    ];

    // get the profilemenu
    const ProfileMenus = [
        {
            label: 'My Account',
            icon: 'mdi mdi-account-circle',
            redirectTo: '/',
        },
        {
            label: 'Settings',
            icon: 'mdi mdi-account-edit',
            redirectTo: '/',
        },
        {
            label: 'Support',
            icon: 'mdi mdi-lifebuoy',
            redirectTo: '/',
        },
        {
            label: 'Lock Screen',
            icon: 'mdi mdi-lock-outline',
            redirectTo: '/account/lock-screen',
        },
        {
            label: 'Logout',
            icon: 'mdi mdi-logout',
            redirectTo: '/account/logout',
        },
    ];
    return (
        <nav className="custom-navbar">
            <div className="custom-navbar__left">
                <i className="dripicons-menu" onClick={clickMenu}></i>
            </div>
            <div className="custom-navbar__right">
                <span className="custom-navbar__right__language">
                    <LanguageDropdown />
                </span>
                <span className="custom-navbar__right__notification">
                    <NotificationDropdown notifications={Notifications} />
                </span>
                <span className="custom-navbar__right__theme-switch">
                    <LightMode />
                </span>
                <span className="custom-navbar__right__profile">
                    <ProfileDropdown menuItems={ProfileMenus} username={'Natig Yusubov'} userTitle={'CEO'} />
                </span>
            </div>
        </nav>
    );
};

export default CustomNavbar;
