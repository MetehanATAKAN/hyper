// @flow
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import x from '../assets/images/users/man.png'
import { logoutUser } from '../redux/actions';
type ProfileMenuItem = {
    label: string,
    icon: string,
    redirectTo: string,
};

type ProfileDropdownProps = {
    menuItems: Array<ProfileMenuItem>,
    profilePic?: any,
    username: string,
    userTitle?: string,
};

type ProfileDropdownState = {
    dropdownOpen?: boolean,
};

const ProfileDropdown = (props: ProfileDropdownProps, state: ProfileDropdownState): React$Element<any> => {
    // const profilePic = props.profilePic || null;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { t } = useTranslation();
    // session storage username,usertitle,userImage 
    // const userName=sessionStorage.getItem('userName');
    // const userTitle=sessionStorage.getItem('userTitle');
    // const userTitleAbb=sessionStorage.getItem('userTitleAbb');
    // const userImage=sessionStorage.getItem('userImage')
    
    // TEST FOR OPEN NEW TAB
    const userName=localStorage.getItem('userName');
    const userTitle=localStorage.getItem('userTitle');
    const userTitleAbb=localStorage.getItem('userTitleAbb');
    const userImage=localStorage.getItem('userImage')

    
    /*
     * toggle profile-dropdown
     */
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // const logoutUser = () => {
    //     localStorage.removeItem('hyper_user')
    //     localStorage.removeItem('userName')
    //     localStorage.removeItem('userToken')
    // } 

    return (
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-profile"
                as={Link}
                to="#"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle nav-user arrow-none me-0">
                <span className="account-user-avatar">
                    <img src={require(`../assets/images/users/${userImage}`).default} className="rounded-circle" alt="user" />
                </span>
                <span>
                    <span className="account-user-name">{userName}</span>
                    <span className="account-position">{userTitleAbb}</span>
                </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                <div onClick={toggleDropdown}>
                    <div className="dropdown-header noti-title">
                        <h6 className="text-overflow m-0">{t('Welcome')} !</h6>
                    </div>
                    {props.menuItems.map((item, i) => {
                        return (
                            <Link to={item.redirectTo} className="dropdown-item notify-item" key={i + '-profile-menu'}>
                                <i className={`${item.icon} me-1`}></i>
                                <span>{t(item.label)}</span>
                            </Link>
                        );
                    })}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;
