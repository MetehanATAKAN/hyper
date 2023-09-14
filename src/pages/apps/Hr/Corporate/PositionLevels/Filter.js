import React from 'react';
import { MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import 'antd/dist/antd.css';
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react'

const Filter = ({ filterComponentsData, getAllFilterData, deleteFilter, setCloseFilter }) => {

    return (
        <div className="connect-material-filter-container">
            <div className="connect-material-filter-container-filters">
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
            <div className="connect-material-filter-container-buttons">
                    <Icon
                        className="page-list-icons"
                        onClick={getAllFilterData}
                        path={mdiCheck}
                        size={1}
                        color={'#0ACF97'}
                    />
                    <Icon
                        path={mdiDeleteSweepOutline}
                        onClick={deleteFilter}
                        className="page-list-icons"
                        size={1}
                        color={'#FA5C7C'}
                    />
                    <Icon path={mdiClose} size={1} color={'#6C757D'} className="page-list-icons" 
                    onClick={() => setCloseFilter(true)} 
                    />
            </div>
        </div>
    );
};

export default Filter;
