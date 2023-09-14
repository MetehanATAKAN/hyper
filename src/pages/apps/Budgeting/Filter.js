import React from 'react';
import { MultipleSelects } from '../../../components/GlobalNew/Selects';
import 'antd/dist/antd.css';
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react'
import { useTranslation } from 'react-i18next';

const Filter = ({ filterComponentsData, getAllFilterData, deleteFilter, setCloseFilter }) => {
    return (
        <div className="global-filter">
            <div className="global-filter-container">
                {filterComponentsData.map((item, index) =>
                    (
                        <MultipleSelects
                            label={item.label}
                            className="filter-radius"
                            selectedItems={item.state}
                            setSelectedItems={item.setState}
                            options={item.options}
                            size="small"
                            // status={statusArr[1].status}
                            width="12rem"
                        />
                    )
                )}
            </div>
            <div className="global-filter-buttons">
                    <button onClick={getAllFilterData} className="global-filter-buttons__apply">
                        <Icon
                            
                            path={mdiCheck}
                            size={1}
                        />
                    </button>
                    <button onClick={deleteFilter} className="global-filter-buttons__delete">
                        <i className="fa-sharp fa-solid fa-broom"></i>
                    </button>
                    <button onClick={() => setCloseFilter(true)} className="global-filter-buttons__close" >
                        <Icon path={mdiClose} size={1} />
                    </button>
                    
                    
            </div>
        </div>
    );
};

export default Filter;
