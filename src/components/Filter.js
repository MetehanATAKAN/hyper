import React from 'react';
import { MultipleSelects, SingleSelects } from '../components/GlobalNew/Selects';
import 'antd/dist/antd.css';
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { useTranslation } from 'react-i18next';
import { DatePicker, Radio } from 'antd';
import '../assets/scss/custom/GlobalNew/filter.scss';
import moment from 'moment';
import { Form, Col,  Button as ButtonB, Row } from 'react-bootstrap';

const Filter = ({
    filterComponentsData,
    getAllFilterData,
    deleteFilter,
    setCloseFilter,
    isFilterBtn = false,
    width,
    isRangePickerDisabled = true,
    handleChange,
    isHandleChange = false,
    isClearIcon = true
}) => {
    const { RangePicker } = DatePicker;

    const { t } = useTranslation();

    const todayDay = `${new Date().toLocaleDateString('en-us')}` ;

    const disabledDate = (current) => {
        // Can not select days before today
        return current && current < moment().startOf('day');
    };

    return (
        <div className="global-filter">
            <div className={`${isFilterBtn ? 'global-filter-container-no-table' : 'global-filter-container'}`}>
                {filterComponentsData.map((item, index) => {
                    if (item.type === 'multiselect') {
                        return (
                            <div key={index}>
                                <MultipleSelects
                                    label={item.label}
                                    className="filter-radius"
                                    labelClassName="label-filter"
                                    selectedItems={item.state}
                                    setSelectedItems={item.setState}
                                    options={item.options}
                                    handleChange={ isHandleChange === true ? ()=>handleChange(item.key) : null}
                                    allClear={  isHandleChange === true ? ()=>handleChange(item.key) : null}
                                    size="small"
                                    width="100%"
                                    isMaxSelect={item?.maxSelect === false ? undefined :item?.maxSelect === true ? true : false}
                                    maxSelectItem={item?.maxSelect === false ? undefined :item?.maxSelect === true ? item?.maxSelectItem : undefined}
                                    key={index}
                                    clearIcon={isClearIcon === true ? true : item.clearIcon}
                                />
                            </div>
                        );
                    } else if (item.type === 'singleselect') {
                        return (
                            <div key={index}>
                                <SingleSelects
                                    label={item.label}
                                    selectedItems={item.state}
                                    setSelectedItems={item.setState}
                                    options={item.options}
                                    handleChange={ isHandleChange === true ? ()=>handleChange(item.key) : null}
                                    allClear={  isHandleChange === true ? ()=>handleChange(item.key) : null}
                                    className="filter-radius"
                                    labelClassName="label-filter"
                                    size="small"
                                    width="100%"
                                    key={index}
                                    clearIcon={isClearIcon === true ? true : item.clearIcon}
                                />
                            </div>
                        );
                    } else if (item.type === 'date') {
                        return (
                            <div className="global-filter__date-picker">
                                <label className="label-text-field">{t(item.label)}</label>
                                <DatePicker
                                    className="connect-material-filter-container-filters-date"
                                    style={{
                                        width: '100%',
                                        border: '1px solid #d9d9d9',
                                        borderRadius: '20px',
                                    }}
                                    onChange={(date) => item.setState(date)}
                                    disabledDate={disabledDate}
                                    placeholder={t('Select Date')}
                                    format="DD/MM/YYYY"
                                    separator={
                                        <i
                                            style={{ color: '#c7c7c7', paddingTop: '3px' }}
                                            className="fas fa-arrow-right"></i>
                                    }
                                    key={index}
                                />
                            </div>
                        );
                    } else if (item.type === 'rangepicker') {
                        return (
                            <div className="global-filter__range-date-col">
                                <label className="label-text-field">{t(item.label)}</label>
                                <RangePicker
                                    className="global-filter__range-picker"
                                    style={{
                                        borderRadius: '20px',
                                        width: '100%',
                                        height: '24px',
                                        border: '1px solid #d9d9d9',
                                    }}
                                    onChange={(date) => item.setState(date)}
                                    format="DD/MM/YYYY"
                                    separator={
                                        <i
                                            style={{ color: '#c7c7c7', paddingTop: '3px' }}
                                            className="fas fa-arrow-right"></i>
                                    }
                                    disabledDate={isRangePickerDisabled && disabledDate}
                                    placeholder={[t('Start Date'), t('End Date')]}
                                    defaultValue={[moment(todayDay), moment("09/03/2020")]}
                                    key={index}
                                />
                            </div>
                        );
                    } else if (item.type === 'switch') {
                        return (
                            <div className="global-filter__switch">
                                <Form.Check
                                    type="switch"
                                    id={item.label}
                                    label={t(item.label)}
                                    onChange={() => item.setState(!item.state)}
                                    checked={item.state}
                                    key={index}
                                />
                            </div>
                        );
                    } 
                    else if(item.type === 'radio') {
                       return(
                         <Radio.Group key={index} onChange={item.change} value={item.value}>
                           {
                             item.radioGroup?.map((radio,i)=> {
                                return (
                                    <Radio key={i} value={radio.value} className={item.className}>
                                    {
                                        t(radio.label)
                                    }
                                </Radio>
                                )
                             })
                           }
                        </Radio.Group>
                       )
                        
                    }
                    else {
                        return (
                            <div>
                                <MultipleSelects
                                    label={item.label}
                                    className="filter-radius"
                                    labelClassName="label-filter"
                                    selectedItems={item.state}
                                    setSelectedItems={item.setState}
                                    options={item.options}
                                    handleChange={handleChange}
                                    size="small"
                                    width="100%"
                                    key={index}
                                />
                            </div>
                        );
                    }
                })}
            </div>
            {
                isFilterBtn && <hr style={{ margin: 0, padding: 0, color: '#CED4DA', opacity: 1 }} />
            }
            {isFilterBtn && (
                <div>
                    <div className="table-filter-buttons">
                        <ButtonB
                            onClick={getAllFilterData}
                            className="filter-buttons-apply"
                            size="sm">
                            {t('Apply')}
                        </ButtonB>
                        <ButtonB
                            onClick={deleteFilter}
                            className="filter-buttons-clear"
                            size="sm">
                            {t('Clear')}
                        </ButtonB>
                        <ButtonB
                            onClick={() => setCloseFilter(false)}
                            className="filter-buttons-close"
                            size="sm">
                            {t('Close')}
                        </ButtonB>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filter;

/*
import React from 'react';
import { MultipleSelects, SingleSelects } from '../components/GlobalNew/Selects';
import 'antd/dist/antd.css';
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from 'antd';
import '../assets/scss/custom/GlobalNew/filter.scss';
import moment from 'moment';
import { Form } from 'react-bootstrap';

const Filter = ({ filterComponentsData, getAllFilterData, deleteFilter, setCloseFilter }) => {
    const { RangePicker } = DatePicker;

    const { t } = useTranslation();

    const disabledDate = (current) => {
        // Can not select days before today
        return current && current < moment().startOf('day');
    };

    return (
        <div className="global-filter">
            <div className="global-filter-container">
                {filterComponentsData.map((item, index) => {
                    if(item.type === 'multiselect'){
                        return (
                            <MultipleSelects
                                label={item.label}
                                className="filter-radius"
                                labelClassName="label-filter"
                                selectedItems={item.state}
                                setSelectedItems={item.setState}
                                options={item.options}
                                size="small"
                                width="12rem"
                            />
                        )
                            
                    }else if(item.type === 'singleselect'){
                        return (
                            <SingleSelects
                                label={item.label}
                                selectedItems={item.state}
                                setSelectedItems={item.setState}
                                options={item.options}
                                className="filter-radius"
                                labelClassName="label-filter"
                                size="small"
                                width="12rem"
                            />
                        )
                    }else if(item.type === 'date'){
                        return (
                            <div className='global-filter__date-picker'>
                                <label className='label-text-field'>{t(item.label)}</label>
                                <DatePicker
                                    className="connect-material-filter-container-filters-date"
                                    style={{
                                        width: '12rem',
                                        border: '1px solid #d9d9d9',
                                        borderRadius: '20px',
                                    }}
                                    onChange={(date) => item.setState(date)}
                                    disabledDate={disabledDate}
                                    placeholder={t('Select Date')}
                                    format="DD/MM/YYYY"
                                    separator={
                                        <i style={{ color: '#c7c7c7', paddingTop: '3px' }} className="fas fa-arrow-right"></i>
                                    }
                                />
                            </div>
                        )
                    }else if(item.type === 'rangepicker'){
                        return (
                            <div className="global-filter__range-date-col">
                            <label className='label-text-field'>{t(item.label)}</label>
                            <RangePicker
                                className="global-filter__range-picker"
                                style={{
                                    borderRadius: '20px',
                                    width: '13rem',
                                    height: '24px',
                                    border: '1px solid #d9d9d9',
                                }}
                                onChange={(date) => item.setState(date)}
                                format="DD/MM/YYYY"
                                separator={
                                    <i style={{ color: '#c7c7c7', paddingTop: '3px' }} className="fas fa-arrow-right"></i>
                                }
                                disabledDate={disabledDate}
                                placeholder={[t('Start Date'), t('End Date')]}
                            />
                        </div>
                        )
                    }else if(item.type === 'switch'){
                        return (
                            <div className="global-filter__switch">
                                <Form.Check
                                    type="switch"
                                    id={item.label}
                                    label={t(item.label)}
                                    onChange={() => item.setState(!item.state)}
                                    checked={item.state}
                                />
                            </div>
                        )
                    }else{
                        return (
                            <MultipleSelects
                                label={item.label}
                                className="filter-radius"
                                labelClassName="label-filter"
                                selectedItems={item.state}
                                setSelectedItems={item.setState}
                                options={item.options}
                                size="small"
                                width="12rem"
                            />
                        )
                    }
                })}
            </div>
            <div className="global-filter-buttons">
                <button onClick={getAllFilterData} className="global-filter-buttons__apply">
                    <Icon path={mdiCheck} size={1} />
                </button>
                <button onClick={deleteFilter} className="global-filter-buttons__delete">
                    <i className="fa-sharp fa-solid fa-broom"></i>
                </button>
                <button onClick={() => setCloseFilter(true)} className="global-filter-buttons__close">
                    <Icon path={mdiClose} size={1} />
                </button>
            </div>
        </div>
    );
};

export default Filter;


*/
