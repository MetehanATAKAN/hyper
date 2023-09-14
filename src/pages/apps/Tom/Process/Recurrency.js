import React, { useState, useEffect } from 'react';
import { Modal as CustomModal } from '../../../../components/FormElements/Modal';
import { Divider } from '../../../../components/FormElements/Divider';
import { useTranslation } from 'react-i18next';
import { InputDefault, TextArea } from '../../../../components/FormElements/Input';
import { FetchApiPost, FetchApiGet } from '../../../../utils/http.helper';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import { ErrorModal } from '../../../../components/FormElements/InformationModal';

// import { Radio, Alert } from 'antd';
import { Alert } from 'antd';
import { Button } from '../../../../components/FormElements/Button';
import RadioButton from '../../../../components/FormElements/Radio';
import CustomAlert from '../../../../components/FormElements/Alert';

const Recurrency = ({ setRecurrencyButtonDisable, onClick, createdProcessResponse, getData, setShow }) => {
    const { t } = useTranslation();

    const [pageRadioButtonsOptions, setPageRadioButtonsOptions] = useState([
        t('daily'),
        t('weekly'),
        t('monthly'),
        t('quarterly'),
        t('yearly'),
    ]);
    const [selectPageRadioButton, setSelectPageRadioButton] = useState('daily');

    // DAILY RADIO BUTTON
    const [dailyRadioButtonOptions, setDailyRadioButtonOptions] = useState([t('every'), t('every weekday')]);
    const [selectedDailyRadioButton, setSelectedDailyRadioButton] = useState('every');

    const [dayNumber, setDayNumber] = useState();
    const [accurances, setAccurances] = useState();

    const [dailyDeadlineOptions, setDailyDeadlineOptions] = useState([t('ago'), t('no end date')]);
    const [selectedDailyDeadline, setSelectedDailyDeadline] = useState('no end date');

    // Weekly
    const [weeklyButtons, setWeeklyButtons] = useState([
        {
            label: 'Mo',
            isClick: false,
            id: 0,
        },
        {
            label: 'Tu',
            isClick: false,
            id: 1,
        },
        {
            label: 'We',
            isClick: false,
            id: 2,
        },
        {
            label: 'Th',
            isClick: false,
            id: 3,
        },
        {
            label: 'Fr',
            isClick: false,
            id: 4,
        },
        {
            label: 'Sa',
            isClick: false,
            id: 5,
        },
        {
            label: 'Su',
            isClick: false,
            id: 6,
        },
    ]);
    const [weeklyOnNumber, setWeeklyOnNumber] = useState(null);
    const [weeklyOccurances, setWeeklyOccurances] = useState(null);

    const [weeklyDeadlineOptions, setWeeklyDeadlineOptions] = useState([t('ago'), t('no end date')]);
    const [selectedWeeklyDeadline, setSelectedWeeklyDeadline] = useState('no end date');

    // Monthly
    const [monthlyRadioButtonOptions, setMonthlyRadioButtonOptions] = useState([t('day'), t('the')]);
    const [selectedMonthlyRadioButton, setSelectedMonthlyRadioButton] = useState('day');

    const [monthlyDeadlineOptions, setMonthlyDeadlineOptions] = useState([t('ago'), t('no end date')]);
    const [selectMonthlyDeadline, setSelectMonthlyDeadline] = useState('no end date');

    const [ofEveryNumber, setOfEveryNumber] = useState(null);
    const [monthsNumber, setMonthsNumber] = useState(null);

    const [monthsTheOfEveryNumber, setMonthsTheOfEveryNumber] = useState(null);

    const [monthCountSelectOptions, setMonthCountSelectOptions] = useState([
        { value: 0, label: 'First' },
        { value: 1, label: 'Second' },
        { value: 2, label: 'Third' },
        { value: 3, label: 'Fourth' },
        { value: 4, label: 'Last' },
    ]);
    const [selectMonthCount, setSelectMonthCount] = useState();

    const [monthDayOptions, setMonthDayOptions] = useState([
        { value: 0, label: 'Sunday' },
        { value: 1, label: 'Monday' },
        { value: 2, label: 'Tuesday' },
        { value: 3, label: 'Wednesday' },
        { value: 4, label: 'Thursday' },
        { value: 5, label: 'Friday' },
        { value: 6, label: 'Saturday' },
        { value: 7, label: 'Day' },
        { value: 8, label: 'Weekday' },
        { value: 9, label: 'Weekend' },
    ]);

    const [selectMonthDay, setSelectMonthDay] = useState();

    const [monthlyAccurances, setMonthlyAccurances] = useState(null);

    // Quarterly

    const [quarterlyButtons, setQuaerterlyButtons] = useState([
        {
            label: 'Q1',
            isClick: false,
            id: 0,
        },
        {
            label: 'Q2',
            isClick: false,
            id: 1,
        },
        {
            label: 'Q3',
            isClick: false,
            id: 2,
        },
        {
            label: 'Q4',
            isClick: false,
            id: 3,
        },
    ]);

    const [quarterlyMonthOptions, setQuarterlyMonthOptions] = useState([
        { value: 0, label: 'First' },
        { value: 1, label: 'Second' },
        { value: 2, label: 'Thirthy' },
    ]);
    const [selectedQuarterlyMonth, setSelectQuarterlyMonth] = useState();

    const [quarterlyWeekOptions, setQuarterlyWeekOptions] = useState([
        { value: 0, label: 'First' },
        { value: 1, label: 'Second' },
        { value: 2, label: 'Third' },
        { value: 3, label: 'Fourth' },
        { value: 4, label: 'Last' },
    ]);
    const [selectQuarterlyWeek, setSelectQuarterlyWeek] = useState();

    const [quarterlyDayOptions, setQuarterlyDayOptions] = useState([
        { value: 0, label: 'Sunday' },
        { value: 1, label: 'Monday' },
        { value: 2, label: 'Tuesday' },
        { value: 3, label: 'Wednesday' },
        { value: 4, label: 'Thursday' },
        { value: 5, label: 'Friday' },
        { value: 6, label: 'Saturday' },
        { value: 7, label: 'Day' },
        { value: 8, label: 'Weekday' },
        { value: 9, label: 'Weekend' },
    ]);

    const [selectQuarterlyDay, setSelectQuarterlyDay] = useState();

    const [quarterlyDeadlineOptions, setQuarterlyDeadlineOptions] = useState([t('ago'), t('no end date')]);
    const [selectQuarterlyDeadline, setSelectQuarterlyDeadline] = useState('no end date');

    const [quarterlyOccurances, setQuarterlyOccurances] = useState(null);

    // Yearly

    const [yearEvery, setYearEvery] = useState(null);
    const [yearlyPatterntButtonOptions, setYearlyPatternButtonOptions] = useState([t('on'), t('on the')]);
    const [selectedYearlyPattern, setSelectedYearlyPattern] = useState('on');

    const [yearleyOnNumber, setYearlyOnNumber] = useState(null);

    const [yearlyMonthOptions, setYearlyMonthOptions] = useState([
        {
            value: 0,
            label: 'January',
        },
        {
            value: 1,
            label: 'February',
        },
        {
            value: 2,
            label: 'March',
        },
        {
            value: 3,
            label: 'April',
        },
        {
            value: 4,
            label: 'May',
        },
        {
            value: 5,
            label: 'June',
        },
        {
            value: 6,
            label: 'July',
        },
        {
            value: 7,
            label: 'August',
        },
        {
            value: 8,
            label: 'September',
        },
        {
            value: 9,
            label: 'October',
        },
        {
            value: 10,
            label: 'November',
        },
        {
            value: 11,
            label: 'December',
        },
    ]);
    const [selectedYearlyMonth, setSelectedYearlyMonth] = useState();

    const [yearlyCountOptions, setYearlyCountOptions] = useState([
        {
            value: 0,
            label: 'First'
        },
        {
            value: 1,
            label: 'Second'
        },
        {
            value: 2,
            label: 'Third'
        },
        {
            value: 3,
            label: 'Fourth'
        },
        {
            value: 4,
            label: 'Last'
        }
    ])
    const [selectedYearlyCount, setSelectedYearlyCount] = useState();

    const [yearlyDayOptions, setYearlyDayOptions] = useState([
        { value: 0, label: 'Sunday' },
        { value: 1, label: 'Monday' },
        { value: 2, label: 'Tuesday' },
        { value: 3, label: 'Wednesday' },
        { value: 4, label: 'Thursday' },
        { value: 5, label: 'Friday' },
        { value: 6, label: 'Saturday' },
        { value: 7, label: 'Day' },
        { value: 8, label: 'Weekday' },
        { value: 9, label: 'Weekend' },
    ]);

    const [selectedYearlyDay, setSelectedYearlyDay] = useState();

    const [selectYearlyDeadline, setSelectYearlyDeadline] = useState('no end date');
    const [yearlyOccurances, setYearlyOccurances] = useState(null)

    useEffect(() => {
        if (selectPageRadioButton === 'daily') {
            if (selectedDailyDeadline === 'ago') {
                if (accurances && Number(accurances) > 0) {
                    if (selectedDailyRadioButton === 'every weekday') {
                        setRecurrencyButtonDisable(false);
                    } else if (selectedDailyRadioButton === 'every' && dayNumber && Number(dayNumber) > 0) {
                        setRecurrencyButtonDisable(false);
                    } else {
                        setRecurrencyButtonDisable(true);
                    }
                } else {
                    setRecurrencyButtonDisable(true);
                }
            } else {
                if (selectedDailyRadioButton === 'every weekday') {
                    setRecurrencyButtonDisable(false);
                } else if (selectedDailyRadioButton === 'every' && dayNumber && Number(dayNumber) > 0) {
                    setRecurrencyButtonDisable(false);
                } else {
                    setRecurrencyButtonDisable(true);
                }
            }
        }
    }, [selectedDailyRadioButton, dayNumber, selectedDailyDeadline, accurances, selectPageRadioButton]);

    useEffect(() => {
        if (onClick) {
            let body = {};
            if (selectPageRadioButton === 'daily') {
                body = {
                    parentProcessId: createdProcessResponse.id,
                    frequencyStatus: selectedDailyRadioButton === 'every' ? 0 : 1,
                    dayFrequency: selectedDailyRadioButton === 'every' ? Number(dayNumber) : 0,
                    deadlineStatus: selectedDailyDeadline === 'ago' ? 0 : 1,
                    occurrence: selectedDailyDeadline === 'ago' ? Number(accurances) : 0,
                    createdBy: localStorage.getItem('userName'),
                };
                FetchApiPost(
                    'services/TaskManagement/ParentProcess/CreateRecurrenceParentProcessForDay',
                    'POST',
                    body
                ).then((res) => {
                    getData();
                    setShow(false);
                });
            }
        }
    }, [onClick]);

    useEffect(() => {
        if (selectPageRadioButton === 'weekly') {
            if (weeklyOnNumber && weeklyOnNumber > 0) {
                let count = 0;
                weeklyButtons.map((i) => {
                    if (i.isClick === true) {
                        count = count + 1;
                    }
                });
                if (count > 0) {
                    if (selectedWeeklyDeadline === 'no end date') {
                        setRecurrencyButtonDisable(false);
                    } else {
                        if (Number(weeklyOccurances) > 0) {
                            setRecurrencyButtonDisable(false);
                        } else {
                            setRecurrencyButtonDisable(true);
                        }
                    }
                } else {
                    setRecurrencyButtonDisable(true);
                }
            } else {
                setRecurrencyButtonDisable(true);
            }
        }
    }, [selectPageRadioButton, weeklyOnNumber, weeklyButtons, selectedWeeklyDeadline, weeklyOccurances]);

    const onClickWeeklyButton = (label, boolenaStatus) => {
        let count = 0;
        weeklyButtons.map((i) => {
            if (i.isClick === true) {
                count = count + 1;
            }
        });
        if (boolenaStatus === true && count === Number(weeklyOnNumber)) return;
        let a = weeklyButtons.map((i) => {
            if (i.label === label) {
                return {
                    ...i,
                    isClick: !i.isClick,
                };
            } else {
                return i;
            }
        });
        setWeeklyButtons(a);
    };

    const onClickQuarterlyButton = (label, boolenaStatus) => {
        let a = quarterlyButtons.map((i) => {
            if (i.label === label) {
                return {
                    ...i,
                    isClick: !i.isClick,
                };
            } else {
                return i;
            }
        });
        setQuaerterlyButtons(a);
    };

    useEffect(() => {
        if (onClick) {
            let body = {};
            if (selectPageRadioButton === 'weekly') {
                let selectedButtons = weeklyButtons.filter((i) => i.isClick === true);
                body = {
                    parentProcessId: createdProcessResponse.id,
                    weekFrequency: Number(weeklyOnNumber),
                    recurrenceDayIds: selectedButtons.map((i) => {
                        return i.id;
                    }),
                    deadlineStatus: selectedWeeklyDeadline === 'ago' ? 0 : 1,
                    occurrence: selectedWeeklyDeadline === 'ago' ? Number(weeklyOccurances) : 0,
                    createdBy: localStorage.getItem('userName'),
                };
            }
            FetchApiPost(
                'services/TaskManagement/ParentProcess/CreateRecurrenceParentProcessForWeek',
                'POST',
                body
            ).then((res) => {
                getData();
                setShow(false);
            });
        }
    }, [onClick]);

    useEffect(() => {
        if (selectPageRadioButton === 'monthly') {
            if (selectedMonthlyRadioButton === 'day') {
                if (ofEveryNumber && ofEveryNumber > 0 && monthsNumber && monthsNumber > 0) {
                    if (selectMonthlyDeadline === 'no end date') {
                        setRecurrencyButtonDisable(false);
                    } else {
                        if (monthlyAccurances && Number(monthlyAccurances) > 0) {
                            setRecurrencyButtonDisable(false);
                        } else {
                            setRecurrencyButtonDisable(true);
                        }
                    }
                } else {
                    setRecurrencyButtonDisable(true);
                }
            } else {
                if (selectMonthCount && selectMonthDay && monthsTheOfEveryNumber && Number(monthsTheOfEveryNumber)) {
                    if (selectMonthlyDeadline === 'no end date') {
                        setRecurrencyButtonDisable(false);
                    } else {
                        if (monthlyAccurances && Number(monthlyAccurances) > 0) {
                            setRecurrencyButtonDisable(false);
                        } else {
                            setRecurrencyButtonDisable(true);
                        }
                    }
                } else {
                    setRecurrencyButtonDisable(true);
                }
            }
        }
    }, [
        selectPageRadioButton,
        ofEveryNumber,
        monthsNumber,
        monthsTheOfEveryNumber,
        selectMonthCount,
        monthlyAccurances,
        selectMonthDay,
        selectMonthlyDeadline,
        selectedMonthlyRadioButton,
    ]);

    useEffect(() => {
        if (onClick) {
            if (selectPageRadioButton === 'monthly') {
                let body = {
                    parentProcessId: createdProcessResponse.id,
                    frequencyStatus: selectedMonthlyRadioButton === 'day' ? 0 : 1,
                    dayFrequency: selectedMonthlyRadioButton === 'day' ? Number(ofEveryNumber) : selectMonthDay.value,
                    monthFrequency:
                        selectedMonthlyRadioButton === 'day' ? Number(monthsNumber) : Number(monthsTheOfEveryNumber),
                    weekFrequenc: selectedMonthlyRadioButton === 'the' ? selectMonthCount.value : 0,
                    deadlineStatus: selectedDailyDeadline === 'ago' ? 0 : 1,
                    occurrence: selectedDailyDeadline === 'ago' ? Number(accurances) : 0,
                    createdBy: localStorage.getItem('userName'),
                };
                FetchApiPost(
                    'services/TaskManagement/ParentProcess/CreateRecurrenceParentProcessForMonth',
                    'POST',
                    body
                ).then((res) => {
                    getData();
                    setShow(false);
                });
            }
        }
    }, [onClick]);

    useEffect(() => {
        if (selectPageRadioButton === 'quarterly') {
            let count = quarterlyButtons.filter((i) => i.isClick === true);
            if (count.length > 0 && selectedQuarterlyMonth && selectQuarterlyWeek && selectQuarterlyDay) {
                if (selectQuarterlyDeadline === 'no end date') {
                    setRecurrencyButtonDisable(false);
                } else {
                    if (quarterlyOccurances && Number(quarterlyOccurances)) {
                        setRecurrencyButtonDisable(false);
                    } else {
                        setRecurrencyButtonDisable(true);
                    }
                }
            } else {
                setRecurrencyButtonDisable(true);
            }
        }
    }, [
        selectPageRadioButton,
        quarterlyButtons,
        selectedQuarterlyMonth,
        selectQuarterlyWeek,
        selectQuarterlyDay,
        selectQuarterlyDeadline,
        quarterlyOccurances,
    ]);

    useEffect(() => {
        if (onClick) {
            if (selectPageRadioButton === 'quarterly') {
                let body = {
                    parentProcessId: createdProcessResponse.id,
                    recurrenceQuarterIds: quarterlyButtons.filter((i) => i.isClick === true),
                    monthFrequency: selectedQuarterlyMonth.value,
                    weekFrequency: selectQuarterlyWeek.value,
                    dayFrequency: selectQuarterlyDay.value,
                    deadlineStatus: selectedWeeklyDeadline === 'ago' ? 0 : 1,
                    occurrence: selectedWeeklyDeadline === 'ago' ? Number(weeklyOccurances) : 0,
                    createdBy: localStorage.getItem('userName'),
                };

                FetchApiPost('TaskManagement/ParentProcess/CreateRecurrenceParentProcessForQuarter', 'POST', body).then(
                    (res) => {
                        getData();
                        setShow(false);
                    }
                );
            }
        }
    }, [onClick]);

    useEffect(() => {
        if(selectPageRadioButton === 'yearly'){
            if(yearEvery && Number(yearEvery) > 0){
                if(selectedYearlyPattern==='on'){
                    if(yearleyOnNumber && Number(yearleyOnNumber) > 0 && selectedYearlyMonth){
                        if(selectYearlyDeadline === 'ago'){
                            if(yearlyOccurances && Number(yearlyOccurances) > 0){
                                setRecurrencyButtonDisable(false)
                            }else{
                                setRecurrencyButtonDisable(true)
                            }
                        }else{
                            setRecurrencyButtonDisable(false)
                        }
                    }else{
                        setRecurrencyButtonDisable(true)
                    }
                }else{
                    if(selectedYearlyMonth && selectedYearlyCount && selectedYearlyDay){
                        if(selectYearlyDeadline === 'ago'){
                            if(yearlyOccurances && Number(yearlyOccurances) > 0){
                                setRecurrencyButtonDisable(false)
                            }else{
                                setRecurrencyButtonDisable(true)
                            }
                        }else{
                            setRecurrencyButtonDisable(false)
                        }
                    }else{
                        setRecurrencyButtonDisable(true)
                    }
                }
            }else{
                setRecurrencyButtonDisable(true)
            }
        }
    }, [yearEvery, selectedYearlyPattern, yearleyOnNumber, selectedYearlyMonth, selectedYearlyCount, selectedYearlyDay, selectYearlyDeadline, yearlyOccurances, selectPageRadioButton])

    useEffect(() => {
        if(onClick === true){
            if(selectPageRadioButton === 'yearly'){
                let body = {
                    parentProcessId: createdProcessResponse.id,
                    yearFrequency: Number(yearEvery),
                    frequencyStatus: selectedYearlyPattern === 'on' ? 1 : 0,
                    day: selectedYearlyPattern === 'on the' ? selectedYearlyDay.value : 0,
                    monthFrequency: selectedYearlyPattern === 'on the' ? selectedYearlyMonth.value : 0,
                    weekFrequency: selectedYearlyPattern === 'on the' ? selectedYearlyCount.value : 0,
                    dayFrequency: selectedYearlyPattern === 'on' ?  Number(yearleyOnNumber) : 0,
                    deadlineStatus: selectedWeeklyDeadline === 'ago' ? Number(weeklyOccurances) : 0,
                    occurrence: Number(yearlyOccurances),
                    createdBy: localStorage.getItem('userName')
                }

                FetchApiPost('services/TaskManagement/ParentProcess/CreateRecurrenceParentProcessForYear', 'POST', body)
                    .then(res => {
                        getData();
                        setShow(false);
                    })
            }
        }
    }, [onClick])

    const [dailyAlertMessage, setDailyAlertMessage] = useState(null);
    const [weeklyAlertMessage, setWeeklyAlertMessage] = useState(null);
    const [monthlyAlertMessage, setMonthlyAlertMessage] = useState(null);
    const [quarterlyAlertMessage, setQuarterlyAlertMessage] = useState(null);
    const [yearlyAlertMessage, setYearlyAlertMessage] = useState(null);

    useEffect(() => {
        if(selectPageRadioButton === 'daily'){
            let message = ''
            if(selectedDailyRadioButton && dayNumber && Number(dayNumber) > 0 && selectedDailyDeadline){
                if(selectedDailyRadioButton === 'every' && Number(dayNumber)){
                    message = message + `Recurrence: Every ${dayNumber} day.`
                }else if(selectedDailyRadioButton === 'every weekday'){
                    message = message + `Recurrence: Every Weekday.`
                }else{
                    message = null;
                }
            }else{
                message = null;
            }
            if(message !== null){
                if(selectedDailyDeadline === 'no end date'){
                    message = message + 'Deadline: There is no deadline.'
                }else if(accurances && Number(accurances)){
                    message = message + `Deadline: ${accurances} day before the process day.`
                }else{
                    message = null
                }
            }
            setDailyAlertMessage(message)
        }
        
    }, [selectedDailyRadioButton, dayNumber, selectedDailyDeadline, selectPageRadioButton])

    // useEffect(() => {
    //     if(selectPageRadioButton === 'weekly'){

    //     }
    // }, [])

    return (
        <>
            <Divider title={t('recurrence pattern')} plain={true} />

            <div style={{ display: 'grid', placeItems: 'center' }}>
                <RadioButton
                    options={pageRadioButtonsOptions}
                    setValue={setSelectPageRadioButton}
                    value={selectPageRadioButton}
                />
            </div>

            {selectPageRadioButton === 'daily' && (
                <>
                    <div style={{ display: 'flex', position: 'relative' }} className="recurrency-radio-input">
                        <RadioButton
                            options={dailyRadioButtonOptions}
                            setValue={setSelectedDailyRadioButton}
                            value={selectedDailyRadioButton}
                            direction={'vertical'}
                        />
                        <InputDefault
                            isRequired={false}
                            label={'day(s)'}
                            value={dayNumber}
                            setValue={setDayNumber}
                            width={'50px'}
                            type={'number'}
                            placeholder={null}
                            disabled={selectedDailyRadioButton === 'every weekday'}
                        />
                    </div>

                    <Divider title={t('deadline')} plain={true} />

                    <div style={{ display: 'flex', position: 'relative' }} className="recurrency-radio-input">
                        <RadioButton
                            options={dailyDeadlineOptions}
                            setValue={setSelectedDailyDeadline}
                            value={selectedDailyDeadline}
                            direction={'vertical'}
                        />
                        <InputDefault
                            isRequired={false}
                            label={'accurances'}
                            value={accurances}
                            setValue={setAccurances}
                            width={'50px'}
                            type={'number'}
                            placeholder={null}
                            disabled={selectedDailyDeadline === 'no end date'}
                        />
                    </div>

                    <Divider />
                    {
                        dailyAlertMessage && <CustomAlert message={dailyAlertMessage} type="default" />
                    }
                </>
            )}

            {selectPageRadioButton === 'weekly' && (
                <>
                    <div
                        style={{ display: 'flex', position: 'relative', alignItems: 'center' }}
                        className="recurrency-radio-input-weekly">
                        <div className="recurernce-label">recur every</div>
                        <InputDefault
                            isRequired={false}
                            label={'week(s) on:'}
                            value={weeklyOnNumber}
                            setValue={setWeeklyOnNumber}
                            width={'50px'}
                            placeholder={null}
                        />
                    </div>

                    <div className="recurrency-weekly-buttons">
                        {weeklyButtons.map((i) => (
                            <>
                                <Button
                                    className={`recurrency-weekly-buttons-${i.isClick}`}
                                    onClick={() => onClickWeeklyButton(i.label, !i.isClick)}>
                                    {i.label}
                                </Button>
                            </>
                        ))}
                    </div>
                    <Divider title={t('deadline')} plain={true} />
                    <div style={{ display: 'flex', position: 'relative' }} className="recurrency-radio-input">
                        <RadioButton
                            options={weeklyDeadlineOptions}
                            setValue={setSelectedWeeklyDeadline}
                            value={selectedWeeklyDeadline}
                            direction={'vertical'}
                        />
                        <InputDefault
                            isRequired={false}
                            label={'accurances'}
                            value={weeklyOccurances}
                            setValue={setWeeklyOccurances}
                            width={'50px'}
                            placeholder={null}
                            disabled={selectedWeeklyDeadline === 'no end date'}
                        />
                    </div>
                    <Divider />
                    <CustomAlert message="Warning Text" type="default" />
                </>
            )}

            {selectPageRadioButton === 'monthly' && (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr' }}>
                        <div>
                            <RadioButton
                                options={monthlyRadioButtonOptions}
                                setValue={setSelectedMonthlyRadioButton}
                                value={selectedMonthlyRadioButton}
                                direction={'vertical'}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <div
                                style={{ display: 'flex', position: 'relative', columnGap: '16px' }}
                                className="recurrency-radio-input-monthly">
                                <InputDefault
                                    isRequired={false}
                                    label={'of every'}
                                    value={ofEveryNumber}
                                    setValue={setOfEveryNumber}
                                    width={'50px'}
                                    placeholder={null}
                                    disabled={selectedMonthlyRadioButton === 'the'}
                                />
                                <InputDefault
                                    isRequired={false}
                                    label={'month(s)'}
                                    value={monthsNumber}
                                    setValue={setMonthsNumber}
                                    width={'50px'}
                                    placeholder={null}
                                    disabled={selectedMonthlyRadioButton === 'the'}
                                />
                            </div>
                            <div style={{ marginTop: '8px', display: 'grid', rowGap: '4px' }}>
                                <SingleSelects
                                    isLabel={false}
                                    width={'100%'}
                                    options={monthCountSelectOptions}
                                    selectedItems={selectMonthCount}
                                    setSelectedItems={setSelectMonthCount}
                                    isStar={true}
                                    disabled={selectedMonthlyRadioButton === 'day'}
                                />
                                <SingleSelects
                                    isLabel={false}
                                    width={'100%'}
                                    options={monthDayOptions}
                                    selectedItems={selectMonthDay}
                                    setSelectedItems={setSelectMonthDay}
                                    isStar={true}
                                    disabled={selectedMonthlyRadioButton === 'day'}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    position: 'relative',
                                    alignItems: 'center',
                                    columnGap: '16px',
                                    marginTop: '4px',
                                }}
                                className="recurrency-radio-input-monthly">
                                <div className="recurernce-label">of every</div>
                                <InputDefault
                                    isRequired={false}
                                    label={'month(s)'}
                                    value={monthsTheOfEveryNumber}
                                    setValue={setMonthsTheOfEveryNumber}
                                    width={'50px'}
                                    placeholder={null}
                                    disabled={selectedMonthlyRadioButton === 'day'}
                                />
                            </div>
                        </div>
                    </div>
                    <Divider title={t('deadline')} plain={true} />
                    <div style={{ display: 'flex', position: 'relative' }} className="recurrency-radio-input">
                        <RadioButton
                            options={dailyDeadlineOptions}
                            setValue={setSelectMonthlyDeadline}
                            value={selectMonthlyDeadline}
                            direction={'vertical'}
                        />
                        <InputDefault
                            isRequired={false}
                            label={'accurances'}
                            value={monthlyAccurances}
                            setValue={setMonthlyAccurances}
                            width={'50px'}
                            placeholder={null}
                            disabled={selectMonthlyDeadline === 'no end date'}
                        />
                    </div>
                    <Divider />
                    <CustomAlert message="Warning Text" type="default" />
                </>
            )}

            {selectPageRadioButton === 'quarterly' && (
                <>
                    <div>
                        <div className="recurrency-weekly-buttons">
                            {quarterlyButtons.map((i) => (
                                <>
                                    <Button
                                        className={`recurrency-quarterly-buttons-${i.isClick}`}
                                        onClick={() => onClickQuarterlyButton(i.label, !i.isClick)}>
                                        {i.label}
                                    </Button>
                                </>
                            ))}
                        </div>
                        <div className="recurrence-custom-select" style={{ marginTop: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', columnGap: '8px', marginTop: '4px' }}>
                                <SingleSelects
                                    isLabel={false}
                                    width={'50%'}
                                    options={quarterlyMonthOptions}
                                    selectedItems={selectedQuarterlyMonth}
                                    setSelectedItems={setSelectQuarterlyMonth}
                                />
                                <label>{t('month')}</label>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    columnGap: '8px',
                                    marginTop: '4px',
                                    marginBottom: '4px',
                                }}>
                                <SingleSelects
                                   
                                    isLabel={false}
                                    width={'50%'}
                                    options={quarterlyWeekOptions}
                                    selectedItems={selectQuarterlyWeek}
                                    setSelectedItems={setSelectQuarterlyWeek}
                                />
                                <label>{t('week')}</label>
                            </div>
                        </div>
                        <SingleSelects
                            isLabel={false}
                            width={'100%'}
                            options={quarterlyDayOptions}
                            selectedItems={selectQuarterlyDay}
                            setSelectedItems={setSelectQuarterlyDay}
                        />
                    </div>
                    <Divider title={t('deadline')} plain={true} />
                    <div style={{ display: 'flex', position: 'relative' }} className="recurrency-radio-input">
                        <RadioButton
                            options={dailyDeadlineOptions}
                            setValue={setSelectQuarterlyDeadline}
                            value={selectQuarterlyDeadline}
                            direction={'vertical'}
                        />
                        <InputDefault
                            isRequired={false}
                            label={'accurances'}
                            value={quarterlyOccurances}
                            setValue={setQuarterlyOccurances}
                            width={'50px'}
                            placeholder={null}
                            disabled={selectQuarterlyDeadline === 'no end date'}
                        />
                    </div>
                    <Divider />
                    <CustomAlert message="Warning Text" type="default" />
                </>
            )}

            {selectPageRadioButton === 'yearly' && (
                <>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 3fr'}}>
                        <div>
                            <div className="recurernce-label">recur every</div>
                            <RadioButton
                                options={yearlyPatterntButtonOptions}
                                setValue={setSelectedYearlyPattern}
                                value={selectedYearlyPattern}
                                direction={'vertical'}
                            />
                            </div>
                            <div>
                                <div className="recurrency-radio-input-yearly">
                                    <InputDefault
                                        isRequired={false}
                                        label={'year(s)'}
                                        value={yearEvery}
                                        setValue={setYearEvery}
                                        width={'50px'}
                                        placeholder={null}
                                    />
                                </div>
                                <div style={{display: 'flex', marginTop: '8px', columnGap: '16px'}}>
                                    <InputDefault
                                        isRequired={false}
                                        isLabel={false}
                                        value={yearleyOnNumber}
                                        setValue={setYearlyOnNumber}
                                        width={'50px'}
                                        placeholder={null}
                                        disabled={selectedYearlyPattern === 'on the'}
                                    />
                                    <SingleSelects
                                        isLabel={false}
                                        width={'100%'}
                                        options={yearlyMonthOptions}
                                        selectedItems={selectedYearlyMonth}
                                        setSelectedItems={setSelectedYearlyMonth}
                                        disabled={selectedYearlyPattern === 'on the'}
                                    />
                                </div>
                                <div style={{display: 'grid', rowGap: '4px', marginTop: '8px'}}>
                                    <SingleSelects
                                        isLabel={false}
                                        width={'100%'}
                                        options={yearlyMonthOptions}
                                        selectedItems={selectedYearlyMonth}
                                        setSelectedItems={setSelectedYearlyMonth}
                                        disabled={selectedYearlyPattern === 'on'}
                                    />
                                    <SingleSelects
                                        isLabel={false}
                                        width={'100%'}
                                        options={yearlyCountOptions}
                                        selectedItems={selectedYearlyCount}
                                        setSelectedItems={setSelectedYearlyCount}
                                        disabled={selectedYearlyPattern === 'on'}
                                    />
                                    <SingleSelects
                                        isLabel={false}
                                        width={'100%'}
                                        options={yearlyDayOptions}
                                        selectedItems={selectedYearlyDay}
                                        setSelectedItems={setSelectedYearlyDay}
                                        disabled={selectedYearlyPattern === 'on'}
                                    />
                                </div>
                            </div>
                    </div>
                    <Divider title={t('deadline')} plain={true} />
                    <div style={{ display: 'flex', position: 'relative' }} className="recurrency-radio-input">
                        <RadioButton
                            options={dailyDeadlineOptions}
                            setValue={setSelectYearlyDeadline}
                            value={selectYearlyDeadline}
                            direction={'vertical'}
                        />
                        <InputDefault
                            isRequired={false}
                            label={'accurances'}
                            value={yearlyOccurances}
                            setValue={setYearlyOccurances}
                            width={'50px'}
                            placeholder={null}
                            disabled={selectYearlyDeadline === 'no end date'}
                        />
                    </div>
                    <Divider />
                    <CustomAlert message="Warning Text" type="default" />
                </>
            )}
        </>
    );
};

export default Recurrency;
