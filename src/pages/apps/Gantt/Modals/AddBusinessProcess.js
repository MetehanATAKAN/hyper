import React, { useState } from 'react'
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { MultiSelect } from 'react-multi-select-component';
import HyperDatepicker from '../../../../components/Datepicker';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const AddBusinessProcess = ({ setShow, setAddBusinessTab }) => {
    
    const { t } = useTranslation();
    const calendarDate = useSelector((state) => state.Calendar);

    const [selectedBusinessProcessType, setSelectedBusinessProcessType] = useState();
    const [businussProcessTypeOptions, setBusinussProcessTypeOptions] = useState([
        { value: '1', label: 'Business Process Type 1' },
        { value: '2', label: 'Business Process Type 2' },
        { value: '3', label: 'Business Process Type 3' }
    ]);
    const [selectedActivityType, setSelectedActivityType] = useState();
    const [activityTypeOptions, setActivityTypeOptions] = useState([
        { value: '1', label: 'Activity Type 1' },
        { value: '2', label: 'Activity Type 2' },
        { value: '3', label: 'Activity Type 3' }
    ]);

    const [selectedMainPorcess, setSelectedMainPorcess] = useState();
    const [mainPorcessOptions, setMainPorcessOptions] = useState([
        { value: '1', label: 'Main Process 1' },
        { value: '2', label: 'Main Process 2' },
        { value: '3', label: 'Main Process 3' }
    ]);
    
    const [selectedBusinessProcess, setSelectedBusinessProcess] = useState();
    const [businessProcessOptions, setBusinessProcessOptions] = useState([
        { value: '1', label: 'Business Process 1' },
        { value: '2', label: 'Business Process 2' },
        { value: '3', label: 'Business Process 3' }
    ]);

    const [selectedProcess, setSelectedProcess] = useState();
    const [processOptions, setProcessOptions] = useState([
        { value: '1', label: 'Process 1' },
        { value: '2', label: 'Process 2' },
        { value: '3', label: 'Process 3' }
    ]);

    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [companyOptions, setCompanyOptions] = useState([
        { value: '1', label: 'Company 1' },
        { value: '2', label: 'Company 2' },
        { value: '3', label: 'Company 3' }
    ]);

    const [selectedSubCompanies, setSelectedSubCompanies] = useState([]);
    const [subCompanyOptions, setSubCompanyOptions] = useState([
        { value: '1', label: 'Sub Company 1' },
        { value: '2', label: 'Sub Company 2' },
        { value: '3', label: 'Sub Company 3' }
    ]);

    const [selectedDate, setSelectedDate] = useState(
        calendarDate.calendarDate !== null ? calendarDate.calendarDate.date : new Date()
    );

    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    const [radioBoxOptions, setRadioBoxOptions] = useState([
        {value:'Corporate ALS', defaultCheck:true, isCheck:true, id:1, name:'Corporate ALS'},
        {value:'ALS', defaultCheck:false, isCheck:false, id:2, name:'ALS'},
        {value:'date', defaultCheck:false, isCheck:false, id:3, name:'date'},
    ])

    const handleChangeCheck =  (name) => {
        let arr=radioBoxOptions;
        arr.map(data=>(
              data.value === name 
              ? data.isCheck = true
              : data.isCheck = false
          ))
        setRadioBoxOptions([...arr]);
      }

  return (
    <div className='gantt-table-modal'>
        <div className='gantt-table-modal__container row p-3 d-grid gy-2'>
            <div className='gantt-table-modal__row'>
                <div>{t('select business process type')}</div>
                <Select 
                    isMulti={false}
                    className="react-select"
                    placeholder={t('select')}
                    classNamePrefix="react-select"
                    value={selectedBusinessProcessType}
                    options={businussProcessTypeOptions}
                />
            </div>
            <div className='gantt-table-modal__row'>
                <div>{t('select activity type')}</div>
                <Select 
                    isMulti={false}
                    className="react-select"
                    placeholder={t('select')}
                    classNamePrefix="react-select"
                    value={selectedActivityType}
                    options={activityTypeOptions}
                />
            </div>
            <div className='gantt-table-modal__row'>
                <div>{t('select main process')}</div>
                <Select 
                    isMulti={false}
                    className="react-select"
                    placeholder={t('select')}
                    classNamePrefix="react-select"
                    value={selectedMainPorcess}
                    options={mainPorcessOptions}
                />
            </div>
            <div className='gantt-table-modal__row'>
                <div>{t('select business process')}</div>
                <Select 
                    isMulti={false}
                    className="react-select"
                    placeholder={t('select')}
                    classNamePrefix="react-select"
                    value={selectedBusinessProcess}
                    options={businessProcessOptions}
                />
            </div>
            <div className='gantt-table-modal__row'>
                <div>{t('select process')}</div>
                <Select 
                    isMulti={false}
                    className="react-select"
                    placeholder={t('select')}
                    classNamePrefix="react-select"
                    value={selectedProcess}
                    options={processOptions}
                />
            </div>
            <div className='gantt-table-modal__row'>
                <div>{t('companies')}</div>
                <MultiSelect 
                    isMulti={true}
                    className="react-select"
                    placeholder={t('select')}
                    classNamePrefix="react-select"
                    value={selectedCompanies}
                    options={companyOptions}
                    onChange={(e) => setSelectedCompanies(e.map((x) => x))}
                    overrideStrings={{
                        allItemsAreSelected: t('All items are selected.'),
                        noOptions: t('No options'),
                        search: t('Search'),
                        selectAll: t('Select All'),
                        selectSomeItems: t('Select...')
                    }}
                />
            </div>
            <div className='gantt-table-modal__row'>
                <div>{t('sub companies')}</div>
                <MultiSelect 
                    isMulti={true}
                    className="react-select"
                    placeholder={t('select')}
                    classNamePrefix="react-select"
                    value={selectedSubCompanies}
                    options={subCompanyOptions}
                    onChange={(e) => setSelectedSubCompanies(e.map((x) => x))}
                    overrideStrings={{
                        allItemsAreSelected: t('All items are selected.'),
                        noOptions: t('No options'),
                        search: t('Search'),
                        selectAll: t('Select All'),
                        selectSomeItems: t('Select...')
                    }}
                />
            </div>
            <div className='gantt-table-modal__row'>
                <div>{t('reccurence & deadline')}</div>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Corporate ALS" checked={radioBoxOptions[0].isCheck} onChange={() => handleChangeCheck("Corporate ALS")} />
                        <label className="form-check-label" for="exampleRadios1" title={t('Corporate Activity Limit & Settings')}>
                            {t('Corporate ALS')}
                        </label>
                    </div>
                    <div class="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="ALS" checked={radioBoxOptions[1].isCheck} onChange={() => handleChangeCheck("ALS")} />
                        <label className="form-check-label" for="exampleRadios2" title={t("Activity Limit & Settings")}>
                            {t('ALS')}
                        </label>
                    </div>
                    <div className="form-check d-flex align-items-center">
                        <input className="form-check-input me-2" type="radio" name="exampleRadios" id="exampleRadios3" value="date" checked={radioBoxOptions[2].isCheck} onChange={() => handleChangeCheck("date")} />
                        <label className="form-check-label" for="exampleRadios3">
                            <HyperDatepicker
                                hideAddon={true}
                                value={selectedDate}
                                disabled={!radioBoxOptions[2].isCheck}
                                disabledKeyboardNavigation={true}
                                onChange={(date) => {
                                    onDateChange(date);
                                }}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>

            <div className="task-management-footer-btn">
                <Button variant="light" onClick={() => setShow(false)}>
                    {t('cancel')}
                </Button>
                <Button variant="primary" onClick={() => setAddBusinessTab("Add Business Brochure")}>
                    {t('next')}
                </Button>
            </div>
    </div>
  )
}

export default AddBusinessProcess