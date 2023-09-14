import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker, Radio } from 'antd';
import moment from 'moment';
import { MultipleSelects } from '../../../components/GlobalNew/Selects';
import '../../../assets/scss/custom/GlobalNew/filter.scss';
import 'antd/dist/antd.css';

const Filter = ({
    filterComponentsData,
    getAllFilterData,
    deleteFilter,
    setCloseFilter,
    width,
    isRangePickerDisabled = true,
}) => {
    const { RangePicker } = DatePicker;
    const { t } = useTranslation();
    const [selectCompany, setSelectCompany] = useState([]);
    const [optionsCompany, setOptionsCompany] = useState([]);
    const [selectBusUnit, setSelectBusUnit] = useState([]);
    const [optionsBusUnit, setOptionsBusUnit] = useState([]);
    const [selectZone, setSelectZone] = useState([]);
    const [optionsZone, setOptionsZone] = useState([]);
    const [selectDate, setSelectDate] = useState([]);
    const [selectCyclePeriod, setSelectCyclePeriod] = useState([]);
    const [optionsCyclePeriod, setOptionsCyclePeriod] = useState([]);

    const todayDay = `${new Date().toLocaleDateString('en-us')}`;
    const [value, setValue] = useState(1);
    const onChangeGroup = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (
        <div className="global-filter">
            <div className="global-filter-container">
                <div>
                    <Radio.Group onChange={onChangeGroup} value={value}>
                        <Radio style={{ color: '#6C757D', fontSize: '12px' }} value={1}>
                            tomorrow
                        </Radio>
                        <Radio style={{ color: '#6C757D', fontSize: '12px' }} value={2}>
                            week
                        </Radio>
                        <Radio style={{ color: '#6C757D', fontSize: '12px' }} value={3}>
                            month
                        </Radio>
                        <Radio style={{ color: '#6C757D', fontSize: '12px', paddingLeft: '17px' }} value={4}>
                            cycle
                        </Radio>
                        <Radio style={{ color: '#6C757D', fontSize: '12px' }} value={5}>
                            date
                        </Radio>
                    </Radio.Group>
                </div>
                <div>
                    <MultipleSelects
                        label={'company'}
                        className="filter-radius"
                        labelClassName="label-filter"
                        selectedItems={selectCompany}
                        setSelectedItems={setSelectCompany}
                        options={optionsCompany}
                        size="small"
                        width="100%"
                    />
                </div>
                <div>
                    <MultipleSelects
                        label={'business unit'}
                        className="filter-radius"
                        labelClassName="label-filter"
                        selectedItems={selectBusUnit}
                        setSelectedItems={setSelectBusUnit}
                        options={optionsBusUnit}
                        size="small"
                        width="100%"
                    />
                </div>
                <div>
                    <MultipleSelects
                        label={'zone'}
                        className="filter-radius"
                        labelClassName="label-filter"
                        selectedItems={selectZone}
                        setSelectedItems={setSelectZone}
                        options={optionsZone}
                        size="small"
                        width="100%"
                    />
                </div>
                <div className="global-filter__range-date-col">
                    <label style={{ margin: 0, height: 3 }} className="label-text-field">
                        {t('date')}
                    </label>
                    <RangePicker
                        className="global-filter__range-picker"
                        style={{
                            borderRadius: '20px',
                            width: '100%',
                            height: '24px',
                            border: '1px solid #d9d9d9',
                        }}
                        onChange={(date) => console.log(date)}
                        format="DD/MM/YYYY"
                        separator={
                            <i style={{ color: '#c7c7c7', paddingTop: '3px' }} className="fas fa-arrow-right"></i>
                        }
                        placeholder={[t('Start Date'), t('End Date')]}
                        defaultValue={[moment(todayDay), moment('01/01/2023')]}
                    />
                </div>
                <div>
                    <MultipleSelects
                        label={'cycle period'}
                        className="filter-radius"
                        labelClassName="label-filter"
                        selectedItems={selectCyclePeriod}
                        setSelectedItems={setSelectCyclePeriod}
                        options={optionsCyclePeriod}
                        size="small"
                        width="100%"
                    />
                </div>
                <div>
                    <MultipleSelects
                        label={'workplace'}
                        className="filter-radius"
                        labelClassName="label-filter"
                        selectedItems={[]}
                        setSelectedItems={() => {}}
                        options={[]}
                        size="small"
                        width="100%"
                    />
                </div>
                <div>
                    <MultipleSelects
                        label={'workplace type'}
                        className="filter-radius"
                        labelClassName="label-filter"
                        selectedItems={[]}
                        setSelectedItems={() => {}}
                        options={[]}
                        size="small"
                        width="100%"
                    />
                </div>
                <div>
                    <MultipleSelects
                        label={'client'}
                        className="filter-radius"
                        labelClassName="label-filter"
                        selectedItems={[]}
                        setSelectedItems={() => {}}
                        options={[]}
                        size="small"
                        width="100%"
                    />
                </div>
            </div>
        </div>
    );
};

export default Filter;
