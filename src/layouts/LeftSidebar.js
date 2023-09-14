// @flow
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';

import { getMenuItems } from '../helpers/menu';

// components
import AppMenu from './Menu';

// import logoSm from '../assets/images/logo_sm.png';
// import logoDark from '../assets/images/logo-dark.png';
// import logoDarkSm from '../assets/images/logo_sm_dark.png';
// import logo from '../assets/images/logo.png';
import logoSm from '../assets/images/logo_sm_dark_gmg.png';
import logoDark from '../assets/images/logo-light_gmg.png';
import logoDarkSm from '../assets/images/logo_sm_dark_gmg.png';
import logo from '../assets/images/new-logo.png';
import { FetchApiGet } from '../utils/http.helper';
import { useSelector } from 'react-redux';

type SideBarContentProps = {
    hideUserProfile: boolean,
};

/* sidebar content */
const SideBarContent = ({ hideUserProfile }: SideBarContentProps) => {
    const userImage = localStorage.getItem('userImage');
    const userName = localStorage.getItem('userName');
    const userEmpId = localStorage.getItem('userEmpId');
    const userTitleAbb = localStorage.getItem('userTitleAbb');
    const [menuItems, setMenuItems] = useState([]);
    const menu = useSelector((state) => state.Settings.menuItems);

    //roleId
    const roleId = localStorage.getItem('roleId');

    useEffect(() => {
        FetchApiGet(`services/AuthorizationSystem/ManageLeftBar/GetUsingLeftBar?id=${userEmpId}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    if (data.modules !== null) {
                        const arr = [...data?.modules].sort((a, b) => {
                            return a.order - b.order;
                        });
                        const newArr = arr.map((el, i) => {
                            return { ...el, isTitle: false };
                        });
                        setMenuItems(newArr);
                    }
                    if (data.pages !== null) {
                        const arr = [...data?.pages].sort((a, b) => {
                            return a.order - b.order;
                        });
                        const newArr = arr.map((el, i) => {
                            return { ...el, isTitle: false };
                        });
                        setMenuItems(newArr);
                    }
                    if (data.modules !== null && data.pages !== null) {
                        const arr = [...data?.modules, ...data?.pages].sort((a, b) => {
                            return a.order - b.order;
                        });
                        const newArr = arr.map((el, i) => {
                            return { ...el, isTitle: false };
                        });
                        setMenuItems(newArr);
                    }
                });
            }
        });
    }, []);
    return (
        <>
            {!hideUserProfile && (
                <div className="leftbar-user">
                    <div to="/">
                        <img
                            src={require(`../assets/images/users/${userImage}`).default}
                            alt=""
                            height="42"
                            className="rounded-circle shadow-sm"
                        />
                        <span className="leftbar-user-name">{userName}</span>
                        <span className="account-position">{userTitleAbb}</span>
                    </div>
                </div>
            )}

            <AppMenu menuItems={menu === null ? menuItems : menu} />

            {/* <div className={classNames('help-box', 'text-center', { 'text-white': hideUserProfile })}>
                <Link to="/" className="float-end close-btn text-white">
                    <i className="mdi mdi-close" />
                </Link>

                <img src={helpBoxImage} height="90" alt="Helper Icon" />
                <h5 className="mt-3">Unlimited Access</h5>
                <p className="mb-3">Upgrade to plan to get access to unlimited reports</p>
                <button
                    className={classNames(
                        'btn',
                        'btn-sm',
                        hideUserProfile ? 'btn-outline-light' : 'btn-outline-primary'
                    )}>
                    Upgrade
                </button>
            </div>
            <div className="clearfix" /> */}
        </>
    );
};

type LeftSidebarProps = {
    hideLogo: boolean,
    hideUserProfile: boolean,
    isLight: boolean,
    isCondensed: boolean,
};

const LeftSidebar = ({ isCondensed, isLight, hideLogo, hideUserProfile }: LeftSidebarProps): React$Element<any> => {
    const menuNodeRef: any = useRef(null);

    /**
     * Handle the click anywhere in doc
     */
    const handleOtherClick = (e: any) => {
        if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target)) return;
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false);

        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false);
        };
    }, []);
    return (
        <React.Fragment>
            <div className="leftside-menu" ref={menuNodeRef}>
                {!hideLogo && (
                    <React.Fragment>
                        <Link to="/apps/calendar" className="logo text-center logo-light">
                            <span
                                className="logo-lg"
                                // className="side-bar-logo"
                            >
                                <img src={isLight ? logoDark : logo} alt="logo" height="32.5" />
                            </span>
                            <span className="logo-sm">
                                <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="32.5" />
                            </span>
                        </Link>

                        <Link to="/" className="logo text-center logo-dark">
                            <span className="logo-lg">
                                <img src={isLight ? logoDark : logo} alt="logo" height="36" />
                            </span>
                            <span className="logo-sm">
                                <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="36" />
                            </span>
                        </Link>
                    </React.Fragment>
                )}
                {isCondensed === true ? (
                    <SideBarContent isLight={isLight} hideUserProfile={hideUserProfile} />
                ) : (
                    <SimpleBar style={{ maxHeight: '100%' }} timeout={500} scrollbarMaxSize={320}>
                        <SideBarContent
                            menuClickHandler={() => {}}
                            isLight={isLight}
                            hideUserProfile={hideUserProfile}
                        />
                    </SimpleBar>
                )}
                {/* {!isCondensed && (
                    <SimpleBar style={{ maxHeight: '100%' }} timeout={500} scrollbarMaxSize={320}>
                        <SideBarContent
                            menuClickHandler={() => {}}
                            isLight={isLight}
                            hideUserProfile={hideUserProfile}
                        />
                    </SimpleBar>
                )}
                {isCondensed && <><SideBarContent isLight={isLight} hideUserProfile={hideUserProfile} /> <div>metehan atakan</div></>} */}
            </div>
        </React.Fragment>
    );
};

LeftSidebar.defaultProps = {
    hideLogo: false,
    hideUserProfile: false,
    isLight: false,
    isCondensed: false,
};

export default LeftSidebar;
