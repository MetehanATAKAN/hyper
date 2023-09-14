import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const MainTabs = ({ tableTabs, setTableTabs, setSeciliTab, seciliTab, setOnModal }) => {
    const [buttonDisable, setButtonDisable] = useState([]);
    const { t } = useTranslation();
    const handleClick = (label) => {
        let newState = tableTabs.map((tab) =>
            tab.label === label ? { ...tab, activeLink: 'management-tab-active' } : { ...tab, activeLink: '' }
        );
        setTableTabs(newState);
        setSeciliTab(label);
    };

    useEffect(() => {
        // if ( seciliTab === 'Process Type' ) {
        //     setButtonDisable([false, false, true, true, true, true]);
        // } else if (seciliTab === 'Activity Type') {
        //     setButtonDisable([false, false, false, true, true, true]);
        // } else if (seciliTab === 'Main Process') {
        //     setButtonDisable([false, false, false, false, true, true]);
        // } else if (seciliTab === 'Business Process') {
        //     setButtonDisable([false, false, false, false, false, true]);
        // } else if (seciliTab === 'Parent Process') {
        //     setButtonDisable([false, false, false, false, false, false]);
        // } else if (seciliTab === 'Sub Process') {
        //     setButtonDisable([false, false, false, false, false, false]);
        // }
        if ( seciliTab === 'Process Type' ) {
            setButtonDisable([false, false, false, false, false, false]);
        } else if (seciliTab === 'Activity Type') {
            setButtonDisable([false, false, false, false, false, false]);
        } else if (seciliTab === 'Main Process') {
            setButtonDisable([false, false, false, false, false, false]);
        } else if (seciliTab === 'Business Process') {
            setButtonDisable([false, false, false, false, false, false]);
        } else if (seciliTab === 'Process') {
            setButtonDisable([false, false, false, false, false, false]);
        } else if (seciliTab === 'Sub Process') {
            setButtonDisable([false, false, false, false, false, false]);
        }
    }, [seciliTab]);

    return (
        <div className="task-management-tabs">
            <div className="task-management-tabs-container">
                {tableTabs.map((tab, key) => (
                    <button
                        key={key}
                        className={`task-management-tabs-item ${tab.activeLink}`}
                        onClick={() => handleClick(tab.label)}
                        disabled={buttonDisable[key]}>
                        <img src={'https://img.icons8.com/ios-glyphs/30/undefined/list--v1.png'} alt={tab.label} />
                        <div>{t(tab.label)}</div>
                    </button>
                ))}
            </div>
            <button className="task-management-tabs-button" onClick={() => setOnModal(true)}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    );
};

export default MainTabs;
