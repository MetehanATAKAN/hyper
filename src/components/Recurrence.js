import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import '../assets/scss/custom/components/recurrence.scss';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FetchApiGet } from '../utils/http.helper';
import { useDispatch, useSelector } from 'react-redux';
import { setRecurrenceData, setRecurrenceType } from '../redux/taskManagement/actions';
import ReactDatePicker from 'react-datepicker';

const Recurrence = ({ recurrenceFinish, setRecurrenceFinish }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const parentId = useSelector((state) => state.TaskManagement.parentProcessId);
    const [error, setError] = useState({ i: 0, message: '' });
    const [formats, setFormats] = useState([]);
    const [startDateValue, setStartDateValue] = useState(new Date());
    const [endDateValue, setEndDateValue] = useState(new Date(startDateValue.getTime() + 86400000));
    const [radioCheck, setRadioCheck] = useState({ radio1: false, radio2: false });
    const [selectEndDate, setSelectEndDate] = useState({ id: 1, value: 'No End Date', label: t('No End Date') });
    const [endDateOptions, setEndDateOptions] = useState([]);
    const [selectFirstlyDate, setSelectFirstlyDate] = useState({ id: 1, value: 'First', label: t('First') });
    const [firstDateOption, setFirstDateOption] = useState([]);
    const [selectSecondlyDate, setSelectSecondlyDate] = useState({ id: 1, value: 'Weekday', label: t('Weekday') });
    const [secondDateOption, setSecondDateOption] = useState([]);
    const [selectDeadline, setSelectDeadline] = useState({ id: 1, value: 'No Deadline', label: t('No Deadline') });
    const [deadlineOptions, setDeadlineOptions] = useState([]);
    const [deadlineFormation, setDeadlineFormation] = useState('');
    const [selectDate, setSelectDate] = useState({ id: 1, value: 1, label: 1 });
    const recurrenceOptions = [
        { id: 1, value: 'Day', label: t('Day') },
        { id: 2, value: 'Week', label: t('Week') },
        { id: 3, value: 'Month', label: t('Month') },
        { id: 4, value: 'Quarter', label: t('Quarter') },
        { id: 5, value: 'Yearly', label: t('Year') },
    ];
    const [selectRecurrence, setSelectRecurrence] = useState({
        id: 1,
        value: 'Day',
        label: t('Day'),
    });
    const [selectEvery, setSelectEvery] = useState({
        id: 1,
        value: `1. ${selectRecurrence.value}`,
        label: `1. ${t(selectRecurrence.label)}`,
    });
    const handleDateChange = (newValue) => {
        setIsOpen(!isOpen);
        setStartDateValue(newValue);
    };
    const handleEndDateChange = (newValue) => {
        setIsOpen2(!isOpen2);
        setEndDateValue(newValue);
    };
    const handleDeadlineChange = (e) => {
        setDeadlineFormation(e.target.value);
    };
    const radioClick = (e) => {
        if (e.target.name === 'radio1') {
            setRadioCheck({ radio1: true, radio2: false });
        }
        if (e.target.name === 'radio2') {
            setRadioCheck({ radio1: false, radio2: true });
        }
        setRecurrenceFinish(true);
    };

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
        setRecurrenceFinish(true);
    };
    useEffect(() => {
        setEndDateValue(new Date(startDateValue.getTime() + 86400000));
    }, [startDateValue]);

    // every options
    const [everyOptions, setEveryOptions] = useState([]);
    useEffect(() => {
        if (selectRecurrence.value === 'Day') {
            const arr = Array.from({ length: 99 }, (_, i) => ({
                id: i + 1,
                value: `${i + 1}. Day`,
                label: `${i + 1}. ${t('Day')}`,
            }));
            setEveryOptions(arr);
            setSelectEvery({ id: 1, value: `${1}. Day`, label: `${1}. ${t('Day')}` });
        }
        if (selectRecurrence.value === 'Week') {
            const arr = Array.from({ length: 4 }, (_, i) => ({
                id: i + 1,
                value: `${i + 1}. ${selectRecurrence.value}`,
                label: `${i + 1}. ${t(selectRecurrence.label)}`,
            }));
            setEveryOptions(arr);
            setSelectEvery({
                id: 1,
                value: `1. ${selectRecurrence.value}`,
                label: `1. ${t(selectRecurrence.label)}`,
            });
        }
        if (selectRecurrence.value === 'Month') {
            const arr = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ].map((item, i) => ({
                id: i + 1,
                value: item,
                label: t(`${item}`),
            }));
            setEveryOptions(arr);
            setSelectEvery({
                id: 1,
                value: 'January',
                label: t('January'),
            });
        }
        if (selectRecurrence.value === 'Yearly') {
            const arr = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ].map((item, i) => ({
                id: i + 1,
                value: item,
                label: t(`${item}`),
            }));
            setEveryOptions(arr);
            setSelectEvery({
                id: 1,
                value: 'January',
                label: t('January'),
            });
        }
        if (selectRecurrence.value === 'Quarter') {
            const arr = Array.from({ length: 12 }, (_, i) => ({
                id: i + 1,
                value: `${i + 1}. month`,
                label: `${i + 1}. ${t('month')}`,
            }));
            setEveryOptions(arr);
            setSelectEvery({
                id: 1,
                value: `1. month`,
                label: `1. ${t('month')}`,
            });
        }
    }, [selectRecurrence]);
    useEffect(() => {
        // END DATE OPTIONS
        FetchApiGet('services/TaskManagement/ParentProcess/GetEndDate', 'GET')
            .then((res) => res.json())
            .then((res) =>
                res.data.map((item) =>
                    setEndDateOptions((prev) => [...prev, { id: item.status, value: item.name, label: t(item.name) }])
                )
            )
            .catch((err) => console.log(err));
        // DEADLINE OPTIONS
        FetchApiGet('services/TaskManagement/ParentProcess/GetDeadLine', 'GET')
            .then((res) => res.json())
            .then((res) =>
                res.data.map((item) =>
                    setDeadlineOptions((prev) => [...prev, { id: item.status, value: item.name, label: t(item.name) }])
                )
            )
            .catch((err) => console.log(err));
        // FIRSTLY DATE OPTIONS
        FetchApiGet('services/TaskManagement/ParentProcess/ProcessFrequencyDate', 'GET')
            .then((res) => res.json())
            .then((res) =>
                res.data.map((item) =>
                    setFirstDateOption((prev) => [...prev, { id: item.status, value: item.name, label: t(item.name) }])
                )
            )
            .catch((err) => console.log(err));
        // SECONDLY DATE OPTIONS
        FetchApiGet('services/TaskManagement/ParentProcess/ProcessWeekDays', 'GET')
            .then((res) => res.json())
            .then((res) =>
                res.data.map((item) =>
                    setSecondDateOption((prev) => [...prev, { id: item.status, value: item.name, label: t(item.name) }])
                )
            )
            .catch((err) => console.log(err));
    }, []);
    const createdBy = localStorage.getItem('userName');
    // create day data
    const createDayData = useMemo(() => {
        const data = {
            RecurrenceStartDate: startDateValue.toISOString(),
            Every: Number(selectEvery.id),
            EndDateStatus: Number(selectEndDate.id),
            EndDate: selectEndDate.value === 'No End Date' ? '1900-01-01T01:00:00.000Z' : endDateValue.toISOString(),
            ParentProcessId: parentId !== null && Number(parentId),
            CreatedBy: createdBy,
            DeadLineStatus: Number(selectDeadline.id),
            DeadLineFormation: Number(deadlineFormation),
        };
        return data;
    }, [
        endDateValue,
        parentId,
        selectEndDate,
        selectEvery,
        startDateValue,
        deadlineFormation,
        selectDeadline,
        createdBy,
    ]);
    // create week data
    const createWeekData = useMemo(() => {
        const data = {
            ...createDayData,
            Recurrence: formats.join(','),
        };
        return data;
    }, [formats, createDayData]);
    // create month and year data
    const createMonthAndYearData = useMemo(() => {
        const data = {
            ...createDayData,
            ProcessDate: radioCheck.radio1 === true ? Number(selectDate.id) : 0,
            ProcessFrequencyDate: radioCheck.radio2 === true ? Number(selectFirstlyDate.id) : 0,
            ProcessWeekDays: radioCheck.radio2 === true ? Number(selectSecondlyDate.id) : 0,
        };
        return data;
    }, [radioCheck, selectDate, selectFirstlyDate, selectSecondlyDate, createDayData]);
    // create quarter data
    const createQuarterData = useMemo(() => {
        const data = {
            ...createMonthAndYearData,
            Recurrence: formats.join(','),
        };
        return data;
    }, [formats, createMonthAndYearData]);
    useEffect(() => {
        dispatch(setRecurrenceType(selectRecurrence.value));
    }, [selectRecurrence]);

    useEffect(() => {
        console.log('reccurence usefecte');
        const quarterCondition = [formats.length > 0, radioCheck.radio1 === true || radioCheck.radio2 === true];
        const generalCondition = [radioCheck.radio1 === true || radioCheck.radio2 === true];
        if (recurrenceFinish) {
            console.log('reccurence finish de');
            if (selectRecurrence.value === 'Quarter') {
                if (quarterCondition.every((item) => item === true)) {
                    setError('');
                    dispatch(setRecurrenceData(createQuarterData));
                    setRecurrenceFinish('completed');
                }
                if (quarterCondition.includes(false)) {
                    const i = quarterCondition.indexOf(false);
                    setError({ i: i, message: 'Please select at least one option' });
                    setRecurrenceFinish(false);
                }
            }
            if (selectRecurrence.value === 'Day') {
                setError('');
                dispatch(setRecurrenceData(createDayData));
                setRecurrenceFinish('completed');
            }
            if (selectRecurrence.value === 'Week') {
                if (formats.length > 0) {
                    setError('');
                    dispatch(setRecurrenceData(createWeekData));
                    setRecurrenceFinish('completed');
                } else {
                    setError({ i: 0, message: 'Please select at least one option' });
                    setRecurrenceFinish(false);
                }
            }
            if (selectRecurrence.value === 'Month') {
                if (generalCondition.every((item) => item === true)) {
                    setError('');
                    dispatch(setRecurrenceData(createMonthAndYearData));
                    setRecurrenceFinish('completed');
                }
                if (radioCheck.radio1 === false && radioCheck.radio2 === false) {
                    setError({ i: 1, message: 'Please select at least one option' });
                    setRecurrenceFinish(false);
                }
            }
            if (selectRecurrence.value === 'Yearly') {
                if (generalCondition.every((item) => item === true)) {
                    setError('');
                    dispatch(setRecurrenceData(createMonthAndYearData));
                    setRecurrenceFinish('completed');
                }
                if (radioCheck.radio1 === false && radioCheck.radio2 === false) {
                    setError({ i: 1, message: 'Please select at least one option' });
                    setRecurrenceFinish(false);
                }
            }
        }
    }, [
        createDayData,
        createQuarterData,
        createWeekData,
        createMonthAndYearData,
        deadlineFormation,
        dispatch,
        formats,
        radioCheck,
        recurrenceFinish,
        selectDeadline,
        selectRecurrence,
        setRecurrenceFinish,
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    const [isOpen2, setIsOpen2] = useState(false);
    const handleClick2 = (e) => {
        e.preventDefault();
        setIsOpen2(!isOpen2);
    };
    return (
        <div className="recurrence-container" key={0}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>{t('start date')}</label>
                <InputGroup>
                    <Form.Control value={startDateValue.toLocaleDateString()} />
                    <Button variant="light" className="asd" onClick={handleClick}>
                        <i className="fas fa-calendar-day"></i>
                    </Button>
                    {isOpen && (
                        <ReactDatePicker
                            selected={startDateValue}
                            onChange={handleDateChange}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            inline
                            shouldCloseOnSelect={true}
                            calendarClassName="recurrence-calendar"
                            minDate={new Date()}
                            dropdownMode="select"
                        />
                    )}
                </InputGroup>
            </div>

            {/* RECURRENCE */}
            <div className="recurrence-container__recurrence" key={2}>
                <label>{t('recurrence')}</label>
                <Select
                    isMulti={false}
                    className="react-select"
                    isSearchable={false}
                    placeholder={t('select')}
                    classNamePrefix="react-select"
                    value={selectRecurrence}
                    onChange={(e) => setSelectRecurrence(e)}
                    options={recurrenceOptions}
                />
            </div>
            {/* ON THE DATE */}
            {selectRecurrence.value === 'Quarter' && (
                <div className="recurrence-container__datepick" key={3}>
                    <div className="recurrence-container__datepick__quarter" key={4}>
                        <label>{t('on the quarter')}</label>
                        <div className="recurrence-container__datepick__quarter__btns" key={5}>
                            <ToggleButtonGroup
                                className="recurrence-toggle-btns"
                                color="primary"
                                value={formats}
                                onChange={handleFormat}
                                aria-label="text formatting">
                                {['Q1', 'Q2', 'Q3', 'Q4'].map((item, i) => (
                                    <ToggleButton
                                        style={{
                                            borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                                            borderRadius: '5px',
                                        }}
                                        value={item}
                                        aria-label={item}
                                        className="date-btns"
                                        key={i}>
                                        {item}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </div>
                        {error.i === 0 && (
                            <div className="recurrence-container__error" key="error1">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {selectRecurrence.value === 'Week' && (
                <div className="recurrence-container__datepick" key={6}>
                    <div className="recurrence-container__datepick__quarter" key={7}>
                        <label>{t('on the day')}</label>
                        <div className="recurrence-container__datepick__quarter__btns" key={8}>
                            <ToggleButtonGroup
                                className="recurrence-toggle-btns"
                                color="primary"
                                value={formats}
                                onChange={handleFormat}
                                aria-label="text formatting">
                                {['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'].map((item, i) => (
                                    <ToggleButton
                                        style={{
                                            borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                                            borderRadius: '5px',
                                        }}
                                        value={item}
                                        aria-label={item}
                                        className="date-btns"
                                        key={i}>
                                        {item}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </div>
                        {error.i === 0 && (
                            <div className="recurrence-container__error" key="error2">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="recurrence-container__every" key={9}>
                <label>{t('every')}</label>
                <Select
                    isMulti={false}
                    className="react-select"
                    placeholder={t('select')}
                    isSearchable={false}
                    classNamePrefix="react-select"
                    value={selectEvery}
                    onChange={(e) => setSelectEvery(e)}
                    options={everyOptions}
                />
            </div>
            {/* DATE */}
            {selectRecurrence.value === 'Month' ||
            selectRecurrence.value === 'Yearly' ||
            selectRecurrence.value === 'Quarter' ? (
                <>
                    <label>{t('date')}</label>
                    <div className="recurrence-container__radios" key={10}>
                        <Form.Check
                            checked={radioCheck.radio1}
                            type="radio"
                            name="radio1"
                            onChange={(e) => radioClick(e)}
                            className="radio-btn"
                        />
                        <InputGroup className="recurrence-container__radios__input">
                            <Select
                                isMulti={false}
                                className="react-select date-select"
                                placeholder={t('select')}
                                isSearchable={false}
                                value={selectDate}
                                onChange={(e) => setSelectDate(e)}
                                classNamePrefix="react-select"
                                options={Array.from({ length: 99 }, (_, i) => ({
                                    id: i + 1,
                                    value: i + 1,
                                    label: i + 1,
                                }))}
                            />
                            <InputGroup.Text className="recurrence-container__radios__input__text" id="basic-addon2">
                                {t('day')}
                            </InputGroup.Text>
                        </InputGroup>
                    </div>
                    <div className="recurrence-container__radios" key={11}>
                        <Form.Check
                            checked={radioCheck.radio2}
                            type="radio"
                            name="radio2"
                            className="radio-btn"
                            id={2}
                            onChange={(e) => radioClick(e)}
                        />
                        <Select
                            isMulti={false}
                            isDisabled={radioCheck.radio1}
                            className="react-select recurrence-container__radios__radio radio-select"
                            placeholder={t('select')}
                            isSearchable={false}
                            classNamePrefix="react-select"
                            value={selectFirstlyDate}
                            onChange={(e) => setSelectFirstlyDate(e)}
                            options={firstDateOption}
                        />
                        <Select
                            isMulti={false}
                            isDisabled={radioCheck.radio1}
                            className="react-select recurrence-container__radios__radio radio-select"
                            placeholder={t('select')}
                            isSearchable={false}
                            classNamePrefix="react-select"
                            value={selectSecondlyDate}
                            onChange={(e) => setSelectSecondlyDate(e)}
                            options={secondDateOption}
                        />
                    </div>
                    {error.i === 1 && (
                        <div className="recurrence-container__error" key="error3">
                            {error.message}
                        </div>
                    )}
                </>
            ) : null}
            {/* TIME */}
            <div className="recurrence-deadline" key={12}>
                <Row>
                    <Col xs={selectEndDate.value !== 'No End Date' ? 6 : 12}>
                        <label>{t('end date')}</label>
                        <Select
                            isMulti={false}
                            className="react-select"
                            placeholder={t('select')}
                            isSearchable={false}
                            classNamePrefix="react-select"
                            value={selectEndDate}
                            onChange={(e) => setSelectEndDate(e)}
                            options={endDateOptions}
                        />
                    </Col>
                    <Col xs={6}>
                        {selectEndDate.value !== 'No End Date' && (
                            <>
                                <label>{t('finish date')}</label>
                                <InputGroup>
                                    <Form.Control value={endDateValue.toLocaleDateString()} />
                                    <Button variant="light" className="asd" onClick={handleClick2}>
                                        <i className="fas fa-calendar-day"></i>
                                    </Button>
                                    {isOpen2 && (
                                        <ReactDatePicker
                                            selected={endDateValue}
                                            onChange={handleEndDateChange}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            inline
                                            shouldCloseOnSelect={true}
                                            calendarClassName="recurrence-calendar2"
                                            minDate={new Date(startDateValue.getTime() + 86400000)}
                                            dropdownMode="select"
                                        />
                                    )}
                                </InputGroup>
                            </>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col xs={selectDeadline.value === 'Ago' ? 6 : 12}>
                        <label>{t('deadline')}</label>
                        <Select
                            isMulti={false}
                            className="react-select"
                            placeholder={t('select')}
                            classNamePrefix="react-select"
                            isSearchable={false}
                            value={selectDeadline}
                            onChange={(e) => setSelectDeadline(e)}
                            options={deadlineOptions}
                        />
                    </Col>
                    <Col xs={6}>
                        {selectDeadline.value === 'Ago' && (
                            <div key={13}>
                                <label>{t('formation')}</label>
                                <InputGroup>
                                    <Form.Control
                                        value={deadlineFormation}
                                        onChange={handleDeadlineChange}
                                        type="number"
                                    />
                                    <InputGroup.Text id="basic-addon2">{t('day')}</InputGroup.Text>
                                </InputGroup>
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default React.memo(Recurrence);
