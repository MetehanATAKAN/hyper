import React from 'react';
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react'
import { useTranslation } from 'react-i18next';

const Filter = ({ filterComponentsData, getAllFilterData, deleteFilter, setCloseFilter }) => {
    const { t } = useTranslation();
    const { RangePicker } = DatePicker;
    return (
        <div className="connect-material-filter-container">
            <div className="connect-material-filter-container-filters">
                {filterComponentsData.map((item, index) =>
                    item.label === 'Create Date' ? (
                        <div style={{display: "grid"}}>
                            <label className='label-text-field'>{t('Date')}</label>
                            <DatePicker
                            className="connect-material-filter-container-filters-date"
                            style={{
                                width: '12rem',
                            }}
                            // onChange={onChangeDate}
                            placeholder={t('Select Date')}
                            format="DD/MM/YYYY"
                            separator={
                                <i style={{ color: '#c7c7c7', paddingTop: '3px' }} className="fas fa-arrow-right"></i>
                            }
                        />
                        </div>
                    ) : (
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
