// @flow
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import enFlag from './flags/us.jpg';
import germanyFlag from './flags/germany.jpg';
import italyFlag from './flags/italy.jpg';
import spainFlag from './flags/spain.jpg';
import russiaFlag from './flags/russia.jpg';
import turkeyFlag from './flags/turkey-flag.jpg';

import { useTranslation } from 'react-i18next';
// get the languages

// const Languages = [
//     {
//         name: 'English',
//         flag: enFlag,
//     },
//     {
//         name: 'German',
//         flag: germanyFlag,
//     },
//     {
//         name: 'Italian',
//         flag: italyFlag,
//     },
//     {
//         name: 'Spanish',
//         flag: spainFlag,
//     },
//     {
//         name: 'Russian',
//         flag: russiaFlag,
//     },
// ];


const Languages = [
    {
        name: 'English',
        flag: enFlag,
    },
    {
        name: 'Russian',
        flag: russiaFlag,
    },
    {
        name: 'Turkish',
        flag: turkeyFlag
    }
];


const LanguageDropdown = (): React$Element<any> => {
    const { t, i18n } = useTranslation();
    
    const [enLang, setEnLang] = useState()
    // const enLang = Languages[0] || {};
    const [dropdownOpen, setDropdownOpen] = useState(false);

    /*
     * toggle language-dropdown
     */
    const toggleDropdown = ({ dropdownOpen: boolean }) => {
        setDropdownOpen(!dropdownOpen);
    };
    const changeLanguage = (lang) => {
        setEnLang(lang)
        if(lang.name === "English"){
            i18n.changeLanguage("en");
            localStorage.setItem("i18nextLng", "en");
        }else if(lang.name === "Russian"){
            i18n.changeLanguage("rus");
            localStorage.setItem("i18nextLng", "ru");
        }else if(lang.name === "Turkish"){
            localStorage.setItem("i18nextLng", "tr");
        }else{
            i18n.changeLanguage("en");
            localStorage.setItem("i18nextLng", "en");
        }
        window.location.reload();
    }

    useEffect(() => {
        i18n.changeLanguage(localStorage.getItem("i18nextLng") || "en");
        if(localStorage.getItem("i18nextLng") === "en"){
            setEnLang(Languages[0])
        }else if(localStorage.getItem("i18nextLng") === "ru"){
            setEnLang(Languages[1])
        }else if(localStorage.getItem("i18nextLng") === "tr"){
            setEnLang(Languages[2])
        }else{
            setEnLang(Languages[0])
        }
    }, [])

    return (
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-languages"
                as={Link}
                to="#"
                onClick={toggleDropdown}
                className="nav-link dropdown-toggle arrow-none">
                <img src={enLang?.flag} alt={enLang?.name} className="me-0 me-sm-1" height="12" />{' '}
                <span className="align-middle d-none d-sm-inline-block">{t(enLang?.name)}</span>
                <i className="mdi mdi-chevron-down d-none d-sm-inline-block align-middle"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu">
                <div onClick={toggleDropdown}>
                    {Languages.map((lang, i) => {
                        return (
                            <Dropdown.Item className="dropdown-item notify-item" key={i + '-lang'} onClick={() => changeLanguage(lang)}>
                                <img src={lang.flag} alt={lang.name} className="me-1" height="12" />{' '}
                                <span className="align-middle">{t(lang.name)}</span>
                            </Dropdown.Item>
                        );
                    })}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default LanguageDropdown;
