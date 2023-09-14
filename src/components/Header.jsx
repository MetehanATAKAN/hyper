import React from 'react';
import { BreadCrumbs } from './FormElements/BreadCrumb/BreadCrumbs';

const Header = ({ routes, icon, pageTitle, buttons, selectedKey }) => {
    return (
        <div className="custom-header">
            <BreadCrumbs routes={routes} selectedKey={selectedKey} />
            <div className="page-info">
                <div className="page-title">
                    {icon}
                    <span className='page-title-header'>{pageTitle}</span>
                </div>
                <div className="header-buttons">{buttons}</div>
                <div className="header-dropdown">
                    <span className="dropdown-button">
                        <i className="fas fa-ellipsis-v fa-sm"></i>
                    </span>
                    <div className="dropdown-content">{buttons}</div>
                </div>
            </div>
        </div>
    );
};
export default Header;
