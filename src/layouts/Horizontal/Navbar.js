// @flow
import React, { useEffect, useState } from 'react';
import AppMenu from './Menu';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';

import { getMenuItems } from '../../helpers/menu';
import { useSelector } from 'react-redux';
import { FetchApiGet } from '../../utils/http.helper';

type NavbarProps = {
    isMenuOpened?: boolean,
};

const Navbar = (props: NavbarProps): React$Element<React$FragmentType> => {
    // change the inputTheme value to light for creative theme
    const inputTheme = 'dark';
    const [menuItems, setMenuItems] = useState([]);
    const menu = useSelector((state) => state.Settings.menuItems);
    useEffect(() => {
        FetchApiGet('services/AuthorizationSystem/ManageLeftBar/GetUsingLeftBar', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    const arr = [...data.modules, ...data.pages].sort((a, b) => {
                        return a.order - b.order;
                    });
                    const newArr = arr.map((el, i) => {
                        return { ...el, isTitle: false };
                    });
                    setMenuItems(newArr);
                });
            }
        });
    }, []);
    return (
        <React.Fragment>
            <div className="topnav">
                <div className="container-fluid">
                    <nav className={classNames('navbar', 'navbar-expand-lg', 'topnav-menu', 'navbar-' + inputTheme)}>
                        <Collapse in={props.isMenuOpened} className="navbar-collapse" id="topnav-menu-content">
                            <div>
                                <AppMenu menuItems={menuItems} />
                            </div>
                        </Collapse>
                    </nav>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Navbar;
