import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const TableTabs = ({ setCheckedTab, setOnModal }) => {   
    const [tableTabs, setTableTabs] = useState([
        { label: 'Action List', activeLink: 'action-checklist-tab-active' },
        { label: 'Check List', activeLink: '' },
    ]);
    const { t } = useTranslation();
    const handleClick = (label) => {
        let newState = tableTabs.map((tab) =>
            tab.label === label ? { ...tab, activeLink: 'action-checklist-tab-active' } : { ...tab, activeLink: '' }
        );
        setTableTabs(newState);
        setCheckedTab(label);
    };

  return (
    <div className='action-checklist-table-tab'>
        <div className='action-checklist-table-tab__container'>
            {
                tableTabs.map((tab, key) => (
                    <button key={key}
                        className={`action-checklist-table-tab__items ${tab.activeLink}`} 
                        onClick={() => handleClick(tab.label)}>
                        <i className="fa-solid fa-list-ul"></i>
                        <div>{t(tab.label)}</div>
                    </button>
                ))
            }
        </div>
        
        <button className="action-checklist-table-tab__button" onClick={() => setOnModal(true)} >
            <i className="fa-solid fa-plus"></i>
        </button>
    </div>
  )
}

export default TableTabs;