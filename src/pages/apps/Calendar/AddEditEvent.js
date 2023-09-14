// @flow
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Row, Col, Button, Alert, CloseButton, ModalDialog } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import HyperDatepicker from '../../../components/Datepicker';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import PastDateEventModal from '../../../components/Modals/PastDateEventModal';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import { BusinessRounded, Category, Translate } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Steps, Hints } from 'intro.js-react';
import Draggable from 'react-draggable';
import moment from 'moment';

import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router';

type AddEditEventProps = {
    isOpen?: boolean,
    onClose?: () => void,
    isEditable?: boolean,
    buttonClick?: boolean,
    eventData?: any,
    onRemoveEvent?: () => void,
    onUpdateEvent: (value: any) => void,
    onAddEvent: (value: any) => void,
};

const AddEditEvent = ({
    isOpen,
    onClose,
    isEditable,
    buttonClick,
    eventData,
    onRemoveEvent,
    onUpdateEvent,
    onAddEvent,
    holidays,
    dateInfo,
    eventsEndDate,
}: AddEditEventProps): React$Element<any> => {
    
    const [loader, setLoader] = useState(false);
    const [hintsEnabled, setHintsEnabled] = useState(true);

    const history = useHistory();
    
    /** User Country Id */
    const countryId = localStorage.getItem('countryId');

    /**Visit Planning Header */
    const [visitPlanningHeader, setvisitPlanningHeader] = useState([]);

    console.log(visitPlanningHeader);
    const [hints, setHints] = useState([
        {
            element: '.hint1',
            hint: 'The user can choose the place to visit from the activity type field.',
            hintPosition: 'middle-right',
        },
        {
            element: '.hint2',
            hint: 'Users can select the date from the activity date field.',
            hintPosition: 'middle-right',
        },
        {
            element: '.hint3',
            hint: 'Users can select the activity start time from the activity start area.',
            hintPosition: 'middle-right',
        },
        {
            element: '.hint4',
            hint: 'The duration of the activity can be determined.',
            hintPosition: 'middle-right',
        },
        {
            element: '.hint5',
            hint: 'After selecting all fields, you can click here to create the activity.',
            hintPosition: 'middle-right',
        },
    ]);
    // redux calendarDate
    const calendarDate = useSelector((state) => state.Calendar);
    const { t } = useTranslation();
    // event tarihi geçmiş ise
    const pastDateEventDay =
        calendarDate.calendarDate !== null ? Number(calendarDate.calendarDate.dateStr.slice(8, 10)) : null; // sadece tıklanılan tarihin gününü almak için
    const pastDateEventMonth =
        calendarDate.calendarDate !== null ? Number(calendarDate.calendarDate.dateStr.slice(5, 7)) : null;
    const pastDateEventYear =
        calendarDate.calendarDate !== null ? Number(calendarDate.calendarDate.dateStr.slice(0, 4)) : null;
    const newDateMonth = new Date().getMonth() + 1;
    const newDateDay = new Date().getDate();
    const newDateYear = new Date().getFullYear();

    // event state
    const [event] = useState(eventData);

    const onCloseReportModal = () => {
        setShow1(false);
    };
    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            title: yup.string().required('Please enter event name'),
            className: yup.string().required('Please select category'),
        })
    );

    /*
     * form methods
     */
    const methods = useForm({ defaultValues: event, resolver: schemaResolver });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    /*
     * handle form submission
     */
    const onSubmitEvent = (data) => {
        isEditable ? onUpdateEvent(data) : onAddEvent(data);
    };

    // Report Button (NEW)
    const [show, setShow] = useState(true);
    const [show1, setShow1] = useState(false);

    const onOpenModal1 = (e) => {
        setShow1(true);
    };

    // NEW
    const [createButton, setCreateButton] = useState(buttonClick);

    // Create New Event Pop-up -----------------NEW INPUTS -------

    const [customer, setCustomer] = useState('Select Customer');
    const [customerId, setCustomerId] = useState();

    //const [eachActivity, setEachActivity] = useState("Select Minute");

    const [clinic, setClinic] = useState({ value: 'Select Clinic', label: t('Select Clinic') });

    const [clinicInfo, setClinicInfo] = useState([]);

    //Activity Type
    const [visitInfo, setVisitInfo] = useState([]);
    const [selectActivityType, setSelectActivityType] = useState({
        id: 1,
        value: 'Clinic Visit',
        label: t('Clinic Visit'),
    });
    //Business unite
    const [selectBusinessUnite, setSelectBusinessUnite] = useState({
        id: 0,
        value: 'Select Business Unite',
        label: t('Select Business Unite'),
    });

    //Customer
    const [customerInfo, setCustomerInfo] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({
        value: 'Select Customer',
        label: t('Select Customer'),
    });

    const changeCustomer = (event) => {
        setSelectedCustomer(event);
    };

    // Activity Time
    const [selectedDate, setSelectedDate] = useState(
        calendarDate.calendarDate !== null ? calendarDate.calendarDate.date : new Date()
    );

    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    // NEW CHANGES
    const changeActivityType = (event) => {
        setSelectActivityType(event);
    };
    const changeBusinessUnite = (event) => {
        setSelectBusinessUnite(event);
        setClinicInfo([]);
        setClinic({ value: 'Select Clinic', label: t('Select Clinic') });
        setPharmacyDatas([]);
        setselectPharmacy({ value: 'Select Pharmacy', label: t('Select Pharmacy') });

        setCustomerInfo([]);
        setSelectedCustomer({
            value: 'Select Customer',
            label: t('Select Customer'),
        })
    };

    const changeClinic = (event) => {
        setClinic(event);
        setSelectedCustomer({
            value: 'Select Customer',
            label: t('Select Customer'),
        });
    };

    //Activity Start Select
    const [selectedTime, setSelectedTime] = useState({ value: 'Select Time', label: t('Select Time') });
    const [mainTimes, setMainTimes] = useState([]);
    const [isShiftHoursErr, setIsShiftHoursErr] = useState(false);
    useEffect(() => {
        const eventDate = calendarDate.calendarDate.dateStr;
        const empId = localStorage.getItem('userEmpId');
        const data = {
            empId: empId,
            date: eventDate,
        };
        FetchApiPost('api/OldSystem/GetEmployeeShiftPlanByEmpId', 'POST', data).then((res) => {
            if (res.status === 200) {
                res.json().then((json) => {
                    setMainTimes(json);
                    if (json.length === 0) {
                        setIsShiftHoursErr(true);
                    } else {
                        setIsShiftHoursErr(false);
                    }
                });
            }
        });
    }, []);
    const getEndDateHours = useCallback(() => {
        let hours = [];
        for (let i = 0; i < eventsEndDate.length; i++) {
            const endDate = new Date(eventsEndDate[i].endDate);
            const startDate = new Date(eventsEndDate[i].startDate);
            const endDate2 = endDate.toLocaleDateString().split('.').reverse().join('-');
            if (calendarDate.calendarDate.dateStr === endDate2) {
                const endHour = endDate.getHours();
                const endMinute = endDate.getMinutes();
                const startHour = startDate.getHours();
                const startMinute = startDate.getMinutes();
                const start = `${String(startHour).length === 1 ? `0${startHour}` : startHour}:${
                    startMinute === 0 ? '00' : startMinute
                }`;
                const end = `${String(endHour).length === 1 ? `0${endHour}` : endHour}:${
                    endMinute === 0 ? '00' : endMinute
                }`;

                hours.push({ start: start, end: end });
            }
        }
        return hours;
    }, [calendarDate, eventsEndDate]);

    function getNextValue(arr, index) {
        if (index + 1 < arr.length) {
            return arr[index + 1];
        } else {
            return arr[0];
        }
    }
    function compareDates(date1, date2) {
        let date1Timestamp = new Date(date1).getTime();
        let date2Timestamp = new Date(date2).getTime();
        let todayTimestamp = new Date().getTime();

        if (date1Timestamp === date2Timestamp) {
            return 'present';
        } else if (date2Timestamp > todayTimestamp) {
            return 'future';
        } else if (date1Timestamp < todayTimestamp) {
            return 'past';
        }
    }
    function compareTimes(time1, time2) {
        let time1Timestamp = new Date('1970-01-01 ' + time1).getTime();
        let time2Timestamp = new Date('1970-01-01 ' + time2).getTime();
        if (time1Timestamp === time2Timestamp) {
            return 'Equal';
        } else if (time1Timestamp > time2Timestamp) {
            return 'past';
        } else {
            return 'future';
        }
    }
    useEffect(() => {
        if (mainTimes.length === 0) return;
        const userDate = moment(new Date()).format('YYYY-MM-DD');
        const calendarDates = calendarDate.calendarDate.dateStr;
        const compare = compareDates(userDate, calendarDates);
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        const currentTimeString = `${currentHour}:${currentMinutes}`;
        const currentEventHours = getEndDateHours();
        if (currentEventHours.length > 0) {
            const lastEvent = currentEventHours[currentEventHours.length - 1];
            const findIndexHour = mainTimes.findIndex((el) => el === lastEvent.end);
            const nextEventHour = getNextValue(mainTimes, findIndexHour);
            if (compare === 'future') {
                setSelectedTime({ value: nextEventHour, label: nextEventHour });
            }
            if (compare === 'present') {
                const hourCompare = compareTimes(currentTimeString, nextEventHour);
                if (hourCompare === 'Equal' || hourCompare === 'future') {
                    setSelectedTime({ value: nextEventHour, label: nextEventHour });
                }
                // event time is in the past
                if (hourCompare === 'past') {
                    const [start, end] = currentTimeString.split(':');
                    let nextStart = start;
                    let nextEnd = end;
                    while (nextEnd % 15 !== 0) {
                        nextEnd++;
                    }
                    if (nextEnd > 59) {
                        nextEnd = nextEnd - 60;
                        nextStart = nextStart + 1;
                    }
                    setSelectedTime({ value: `${nextStart}:${nextEnd}`, label: `${nextStart}:${nextEnd}` });
                }
            }
        }
        if (currentEventHours.length === 0) {
            setSelectedTime({ value: mainTimes[0], label: mainTimes[0] });
        }
    }, [calendarDate, getEndDateHours, mainTimes]);

    const changeSelectedTime = (event) => {
        setSelectedTime(event);
    };

    useEffect(() => {
        let hours = [];
        if (holidays.find((holiday) => holiday.startTime.slice(0, 10) === dateInfo)) {
            holidays.map(
                (holiday) =>
                    holiday.startTime.slice(0, 10) === dateInfo &&
                    mainTimes.map((time) => time > holiday.endTime.slice(11, 16) && hours.push(time))
            );
            mainTimes = hours;
        }
    }, []);

    //Duraiton Of Each Activity
    const [selectedDurationActivity, setSelectedDurationActivity] = useState({
        value: 15,
        label: 15,
    });
    const duration = [15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480];
    const changeDurationActivity = (event) => {
        setSelectedDurationActivity(event);
    };
    //Pharmacy Visit
    const [pharmacyDatas, setPharmacyDatas] = useState([]);
    const [selectPharmacy, setselectPharmacy] = useState({ value: 'Select Pharmacy', label: t('Select Pharmacy') });
    const changePharmacy = (e) => {
        setselectPharmacy(e);
    };
    //Pharmaciest
    const [pharmaciestDatas, setPharmaciestDatas] = useState([]);
    const [selectPharmaciest, setSelectPharmaciest] = useState({
        value: 'Select Pharmaciest',
        label: t('Select Pharmaciest'),
    });
    const changePharmaciest = (e) => {
        setSelectPharmaciest(e);
    };

    // ----------------------
    // Convert Time

    const addDayZero = () => {
        if (selectedDate.getDate() < 10) {
            return '0' + selectedDate.getDate();
        } else {
            return selectedDate.getDate();
        }
    };

    const addMonthZero = () => {
        if (selectedDate.getMonth() < 9) {
            return '0' + (parseInt(selectedDate.getMonth()) + 1);
        } else {
            return selectedDate.getMonth() + 1;
        }
    };

    // DATA -----
    //Post empId & date, get Business unite
    const [busUnite, setBusUnite] = useState([]);
    let emp = localStorage.getItem('userEmpId');
    let date = selectedDate.getFullYear() + '-' + addMonthZero(selectedDate) + '-' + addDayZero(selectedDate);
    const postEmpDate = useMemo(() => ({ empId: emp, date: date }), [emp, date]);

    const createData = {
        activityTypeId: selectActivityType.id,
        employeeId: localStorage.getItem('userEmpId'),
        employeeName: localStorage.getItem('userName'),
        creatorId: localStorage.getItem('userEmpId'),
        creatorName: localStorage.getItem('userName'),
        start:
            selectedDate.getFullYear() +
            '-' +
            addMonthZero(selectedDate) +
            '-' +
            addDayZero(selectedDate) +
            'T' +
            selectedTime.value +
            ':00.296Z',
        end: '2021-10-08T13:41:36.873Z',
        LocationId: clinic.id,
        LocationName: clinic.value,
        customerId: selectedCustomer.id,
        customerName: selectedCustomer.value,
        specId: selectedCustomer.specId, // customer specıd gelecek
        specName: selectedCustomer.specName,
        durationOfEachActivity: parseInt(selectedDurationActivity.value),
        OrgTypeId: clinic.orgType,
        Category: selectedCustomer.category,
        BusinessUnitId: selectBusinessUnite.id,
        BusinessUnitName: selectBusinessUnite.label,
    };
    const createPharmacyData = {
        activityTypeId: selectActivityType.id,
        employeeId: 1391251,
        employeeName: 'Ali ÖNER',
        creatorId: 1391251,
        creatorName: 'Ali ÖNER',
        start:
            selectedDate.getFullYear() +
            '-' +
            addMonthZero(selectedDate) +
            '-' +
            addDayZero(selectedDate) +
            'T' +
            selectedTime.value +
            ':00.296Z',
        end: '2021-10-08T13:41:36.873Z',
        LocationId: selectPharmacy.id,
        LocationName: selectPharmacy.value,
        customerId: selectPharmacy.id,
        customerName: selectPharmacy.value,
        specId: 0, //selectPharmaciest.id,
        specName: 'string',
        durationOfEachActivity: parseInt(selectedDurationActivity.value),
    };
    // -------------------
    const customerParams = useMemo(() => {
        return {
            empId: localStorage.getItem('userEmpId'),
            date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
            clinicId: clinic.id,
            start:
                selectedDate.getFullYear() +
                '-' +
                addMonthZero(selectedDate) +
                '-' +
                addDayZero(selectedDate) +
                'T' +
                selectedTime.value +
                ':00.296Z',
            orgTypeId: clinic.orgType,
            busId: busUnite[0]?.BusinessUnitId,
        };
    }, [busUnite, clinic, selectedDate]);

    const getPharmacyBody = useMemo(
        () => ({
            EmpId: localStorage.getItem('userEmpId'),
        }),
        []
    );

    const getPharmaciestBody = {
        EmpId: localStorage.getItem('userEmpId'),

        PharmacyId: selectPharmacy.id,
    };
    useEffect(() => {
        // ---------------- VISIT
        FetchApiGet('services/Daywork/ActivityType/ActivityTypes', 'GET')
            .then((response) => response.json())
            .then((response) => setVisitInfo(response.data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);
    const [clinicError, setClinicError] = useState(false);
    const [setClinicErrorMessage, setSetClinicErrorMessage] = useState('');
    useEffect(() => {
        // GET BUSINESS UNITE
        setLoader(true);
        FetchApiPost('api/OldSystem/GetBusinessUnitByEmpIdandDate', 'POST', postEmpDate)
            .then((response) => response.json())
            .then(
                (json) => (
                    setBusUnite(json),
                    setSelectBusinessUnite({
                        id: json[0].BusinessUnitId,
                        value: json[0].BusinessUnitName,
                        label: json[0].BusinessUnitName,
                    }),
                    setLoader(false)
                )
            )
            .catch((error) => {
                setLoader(false);
            });
    }, []);
    useEffect(() => {
        //Clinic VİSİT APİ
        if (selectActivityType.value === 'Clinic Visit') {
            if (selectBusinessUnite.id === 0) return;
            const data = {
                empId: localStorage.getItem('userEmpId'),
                date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
                busId: selectBusinessUnite.id,
            };
            setLoader(true);
            FetchApiPost('services/daywork/event/GetClinics', 'POST', data)
                .then((response) => response.json())
                .then((response) => {
                    if (response.errors !== null) {
                        setClinicError(true);
                        setSetClinicErrorMessage(response.errors);
                        setLoader(false);
                    } else {
                        setClinicInfo(response.data);
                        setLoader(false);
                    }

                    setTimeout(() => {
                        setClinicError(false);
                    }, 2500);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setLoader(false);
                });
        }
    }, [selectActivityType, selectBusinessUnite]);

    useEffect(() => {
        //PHARMACY VİSİT APİ
        if (selectActivityType.value === 'Pharmacy Visit') {
            setLoader(true);
            FetchApiPost('api/OldSystem/GetPharmacy', 'POST', getPharmacyBody)
                .then((response) => response.json())
                .then((response) => {
                    setPharmacyDatas(response.map((data) => data))
                    setLoader(false);
                })
                .catch((error) => setLoader(false));
        }
    }, [getPharmacyBody, selectActivityType]);

    // ---------------- CUSTOMER
    useEffect(() => {
        const { busId, date, empId, start, orgTypeId, clinicId } = customerParams;
        if(busId && date && empId && start && orgTypeId && clinicId){
            setLoader(true);
            const getCustomers = () => {
                FetchApiPost('services/daywork/event/GetCustomers', 'POST', {
                    busId,
                    date,
                    empId,
                    start,
                    orgTypeId,
                    clinicId
                })
                    .then((response) => response.json())
                    .then((response) => {
                        setCustomerInfo(response.data)
                        setLoader(false);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        setLoader(false);
                    });
            };
            getCustomers();
        }
        
    }, [customerParams]);

    useEffect(() => {
        const getPharmaciest = () => {
            FetchApiPost('api/OldSystem/GetPharmacist', 'POST', getPharmaciestBody)
                .then((response) => response.json())
                .then((response) => setPharmaciestDatas(response))
                .catch((error) => {
                    console.error('Error:', error);
                });
        };
        if (selectActivityType.value === 'Pharmacy Visit') {
            getPharmaciest();
        }
    }, [selectPharmacy]);

    // Error Message --- Create Event

    const [message, setMessage] = useState(false);

    const [createErrMessage, setCreateErrMessage] = useState();
    const [isCreateErr, setIsCreateErr] = useState(false);
    // refresh CALENDAR
    const [refresh, setRefresh] = useState(true);

    // ---------------- Create Data

    const getCreateData = () => {
        if (selectActivityType.value === 'Clinic Visit') {
            FetchApiPost('services/daywork/Event/CreateEvent', 'POST', createData)
                .then((response) => response.json())
                .then((response) => {
                    if (response.errors !== null) {
                        setIsCreateErr(true);
                        if (refresh === true) {
                            setRefresh(false);
                        } else {
                            setRefresh(true);
                        }
                        setCreateErrMessage(response.errors);
                        setTimeout(() => {
                            setIsCreateErr(false);
                        }, 2500);
                    } else {
                        onClose();
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            FetchApiPost('services/daywork/Event/CreateEvent', 'POST', createPharmacyData)
                .then((response) => response.json())
                .then((response) => {
                    if (response.errors !== null) {
                        setIsCreateErr(true);
                        if (refresh === true) {
                            setRefresh(false);
                        } else {
                            setRefresh(true);
                        }
                        setCreateErrMessage(response.errors);
                        setTimeout(() => {
                            setIsCreateErr(false);
                        }, 2500);
                    } else {
                        window.location.reload();
                        onClose();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    const onClick = () => {
        if (selectActivityType.value === 'Clinic Visit') {
            if (
                selectActivityType.value === 'Select Activity Type' ||
                selectedDurationActivity.value === 'Select Duration' ||
                clinic.value === 'Select Clinic' ||
                selectedTime.value === 'Select Time' ||
                selectedCustomer.value === 'Select Customer'
            ) {
                setMessage(true);
            } else {
                setMessage(false);
                setCreateButton(false);
                getCreateData();
            }
            setTimeout(() => {
                setMessage(false);
            }, 2500);
        } else if (selectActivityType.value === 'Pharmacy Visit') {
            if (
                selectActivityType.value === 'Select Activity Type' ||
                selectedDurationActivity.value === 'Select Duration' ||
                selectPharmacy.value === 'Select Pharmacy' ||
                selectedTime.value === 'Select Time'
            ) {
                setMessage(true);
            } else {
                setMessage(false);
                setCreateButton(false);
                getCreateData();
            }
            setTimeout(() => {
                setMessage(false);
            }, 2500);
        }
    };

    const [position, setPosition] = useState({ x: '-50%', y: '-50%' });

    const DraggableModalDialog = (props) => {
        const trackPos = (data) => {
            const { x, y } = props;
            setPosition({ x: x, y: y });
        };
        // onDrag={(data) => trackPos(data)}

        return (
            <Draggable positionOffset={{ x: position.x, y: position.y }} handle=".visit-activity-modal__header">
                <ModalDialog {...props} />
            </Draggable>
        );
    };

    /**Visit Planning Header */
    useEffect(() => {
      FetchApiGet(`services/AdminPanel/Header/GetHeadersForVisitPlanning?id=${countryId}`,'GET')
      .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                      res.json().then(data => {
                        return(
                            setvisitPlanningHeader(data?.data)
                        )
                      })
                    }
                    else if (res.status === 500 || res.status === 499) {
                        
                        history.push('/error-500');
                    }
    
                } catch (error) {
                    console.log('error', error);
                }
            })()
        )
    }, [countryId, history])
    

    const createEventModal = () => {
        return (
            <>
                <Modal
                    dialogClassName="visit-activity-modal"
                    show={isOpen}
                    onHide={onClose}
                    backdrop="static"
                    keyboard={false}
                    dialogAs={DraggableModalDialog}>
                    <Modal.Header
                        style={{ cursor: !isEditable && 'move' }}
                        className="pb-2 px-4 border-bottom-0 visit-activity-modal__header"
                        closeButton>
                        <Modal.Title id="modal-title" className="visit-acti-title-cont">
                            <h4> {isEditable ? t('Edit Event') : t('Visit Activity')} </h4>
                        </Modal.Title>
                    </Modal.Header>
                    <hr style={{ margin: 0, padding: 0 }} />
                    {message ? (
                        <Alert variant="danger" className="mb-3">
                            <div className="visit-acti-error">
                                <span>{t('Please check again...')}</span>
                            </div>
                        </Alert>
                    ) : null}
                    {isCreateErr ? (
                        <Alert variant="danger" className="mb-3">
                            <div className="visit-acti-error">
                                <span>{createErrMessage}</span>
                            </div>
                        </Alert>
                    ) : null}
                    {clinicError ? (
                        <Alert variant="danger" className="mb-3">
                            <div className="visit-acti-error">
                                <span>{setClinicErrorMessage}</span>
                            </div>
                        </Alert>
                    ) : null}
                    <Modal.Body className="px-4 pb-4 pt-0 visit-activity-modal__body">
                        <Spin size="large" spinning={loader} >
                        <form noValidate name="chat-form" id="chat-form" onSubmit={handleSubmit(onSubmitEvent)}>
                            <Row>
                                {!isEditable ? (
                                    <Row className="visit-acti-input-cont">
                                        <Col lg={6}>
                                            <h5>{t('Activity Type')}</h5>
                                            <Select
                                                isMulti={false}
                                                options={visitInfo.map((data) => ({
                                                    id: data.id,
                                                    value: data.activityTypeName,
                                                    label: t(`${data.activityTypeName}`),
                                                }))}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={t('Select...')}
                                                onChange={changeActivityType}
                                                value={selectActivityType}
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <h5>{t('Activity Date')}</h5>
                                                <HyperDatepicker
                                                    hideAddon={true}
                                                    register={register}
                                                    errors={errors}
                                                    control={control}
                                                    value={selectedDate}
                                                    onChange={(date) => {
                                                        onDateChange(date);
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                ) : null}

                                {!isEditable ? (
                                    <Row className="visit-acti-input-cont">
                                        <Col lg={6}>
                                            <h5>{t('Activity Start')}</h5>
                                            <Select
                                                isMulti={false}
                                                options={mainTimes.map((times) => ({ value: times, label: times }))}
                                                className="react-select activity-start-date"
                                                classNamePrefix="react-select"
                                                placeholder={t('Select...')}
                                                onChange={changeSelectedTime}
                                                value={selectedTime}
                                            />
                                            {isShiftHoursErr && (
                                                <div className="empty-shift-error">no shift hours!!</div>
                                            )}
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3 hint4">
                                                <h5 className="hint1">{t('Duration of Each Activity')}</h5>
                                                <Select
                                                    isMulti={false}
                                                    options={duration.map((duration) => ({
                                                        value: duration,
                                                        label: duration,
                                                    }))}
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    placeholder={t('Select...')}
                                                    onChange={changeDurationActivity}
                                                    value={selectedDurationActivity}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                ) : null}
                                {!isEditable ? (
                                    <Row className="visit-acti-input-cont hint4">
                                        <Col lg={12}>
                                            <h5>{t('Business Unite')}</h5>
                                            <Select
                                                isMulti={false}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                options={busUnite.map((data) => ({
                                                    id: data.BusinessUnitId,
                                                    value: data.BusinessUnitName,
                                                    label: data.BusinessUnitName,
                                                }))}
                                                onChange={changeBusinessUnite}
                                                value={selectBusinessUnite}
                                            />
                                        </Col>
                                    </Row>
                                ) : null}
                                {!isEditable ? (
                                    <Row className="visit-acti-input-cont hint4">
                                        <Col>
                                            <h5>
                                                {selectActivityType.value === 'Clinic Visit'
                                                    ? t('Clinic')
                                                    : selectActivityType.value === 'Pharmacy Visit'
                                                    ? t('Pharmacy')
                                                    : null}
                                            </h5>
                                            {selectActivityType.value !== 'Select Activity Type' ? (
                                                <Select
                                                    isMulti={false}
                                                    isDisabled={selectedTime.value === 'Select Time' ? true : false}
                                                    options={
                                                        selectActivityType.value === 'Clinic Visit'
                                                            ? clinicInfo.map((clinicInfo) => ({
                                                                  id: clinicInfo.clinicId,
                                                                  value: clinicInfo.clinicName,
                                                                  label: `${clinicInfo.clinicName} / ${clinicInfo.clinicAddress} / ${clinicInfo.orgTypeId === 1 ? t('POLYCLINIC') : t('HOSPITAL')}`,
                                                                  orgType: clinicInfo.orgTypeId,
                                                              }))
                                                            : selectActivityType.value === 'Pharmacy Visit'
                                                            ? pharmacyDatas.map((pharmacyDatas) => ({
                                                                  id: pharmacyDatas.Id,
                                                                  value: pharmacyDatas.Val1,
                                                                  label: pharmacyDatas.Val1,
                                                              }))
                                                            : null
                                                    }
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    placeholder={
                                                        selectActivityType.value === 'Clinic Visit'
                                                            ? t('Select Clinic')
                                                            : selectActivityType.value === 'Pharmacy Visit'
                                                            ? t('Select Pharmacy')
                                                            : null
                                                    }
                                                    onChange={
                                                        selectActivityType.value === 'Clinic Visit'
                                                            ? changeClinic
                                                            : selectActivityType.value === 'Pharmacy Visit'
                                                            ? changePharmacy
                                                            : null
                                                    }
                                                    value={
                                                        selectActivityType.value === 'Clinic Visit'
                                                            ? clinic
                                                            : selectActivityType.value === 'Pharmacy Visit'
                                                            ? selectPharmacy
                                                            : null
                                                    }
                                                />
                                            ) : null}
                                        </Col>
                                    </Row>
                                ) : null}
                                {!isEditable ? (
                                    <Row className="visit-acti-input-cont">
                                        <Col>
                                            <h5>
                                                {selectActivityType.value === 'Clinic Visit'
                                                    ? t('Customer')
                                                    : selectActivityType.value === 'Pharmacy Visit'
                                                    ? t('Pharmaciest')
                                                    : null}
                                            </h5>
                                            {selectActivityType.value !== 'Select Activity Type' ? (
                                                <Select
                                                    isMulti={false}
                                                    options={
                                                        selectActivityType.value === 'Clinic Visit'
                                                            ? customerInfo?.map((customerInfo) => ({
                                                                  id: customerInfo.customerId,
                                                                  value: `${customerInfo.customerName} / ${customerInfo.category} / ${customerInfo.spec}`,
                                                                  label: `${customerInfo.customerName} / ${customerInfo.category} / ${customerInfo.spec}`,
                                                                  category: customerInfo.category,
                                                                  specId: customerInfo.specId,
                                                                  specName: customerInfo.specName,
                                                                  specAbb: customerInfo.spec,
                                                              }))
                                                            : null
                                                    }
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    placeholder={t('Select...')}
                                                    onChange={
                                                        selectActivityType.value === 'Clinic Visit'
                                                            ? changeCustomer
                                                            : null
                                                    }
                                                    value={
                                                        selectActivityType.value === 'Clinic Visit'
                                                            ? selectedCustomer
                                                            : null
                                                    }
                                                />
                                            ) : null}
                                        </Col>
                                    </Row>
                                ) : null}
                            </Row>
                        </form>
                        </Spin>
                    </Modal.Body>
                    <hr style={{ margin: 0, padding: 0 }} />
                    <Modal.Footer bsPrefix="visit-activity-modal__footer">
                        {isEditable ? (
                            <Col className="text-end visit-acti-cont px-3">
                                <Button variant="success" className="btn btn-warning me-1" onClick={onOpenModal1}>
                                    {t('Report')}
                                </Button>
                                <Button variant="danger" className="btn btn-warning me-1" onClick={onRemoveEvent}>
                                    {t('Delete')}
                                </Button>
                                <Button variant="success" type="submit" className="btn btn-success">
                                    {t('Save')}
                                </Button>
                            </Col>
                        ) : null}
                        {!isEditable ? (
                            <Col className="text-end visit-acti-cont px-3">
                                <Button className="btn btn-light me-1" onClick={onClose}>
                                    {t('Close')}
                                </Button>
                                <Button variant="success" type="submit" onClick={onClick} className="btn btn-success">
                                    {t('Create Activity')}
                                </Button>
                            </Col>
                        ) : null}
                    </Modal.Footer>
                </Modal>
            </>
        );
    };

    return (
        <>
            <Hints enabled={hintsEnabled} hints={hints} />

            {calendarDate.calendarDate !== null
                ? pastDateEventYear < newDateYear
                    ? calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && (
                          <PastDateEventModal message={t('It is not possible to enter an event in the past date !')} />
                      )
                    : pastDateEventYear === newDateYear && pastDateEventMonth < newDateMonth
                    ? calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && (
                          <PastDateEventModal message={t('It is not possible to enter an event in the past date !')} />
                      )
                    : pastDateEventYear === newDateYear &&
                      pastDateEventMonth === newDateMonth &&
                      pastDateEventDay < newDateDay
                    ? calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && (
                          <PastDateEventModal message={t('It is not possible to enter an event in the past date !')} />
                      )
                    : pastDateEventYear === newDateYear &&
                      pastDateEventMonth === newDateMonth &&
                      pastDateEventDay === newDateDay
                    ? calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && createEventModal()
                    : pastDateEventYear === newDateYear &&
                      pastDateEventMonth === newDateMonth &&
                      pastDateEventDay > newDateDay
                    ? calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && createEventModal()
                    : pastDateEventYear === newDateYear &&
                      pastDateEventMonth > newDateMonth &&
                      pastDateEventDay < newDateDay
                    ? calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && createEventModal()
                    : pastDateEventYear === newDateYear &&
                      pastDateEventMonth > newDateMonth &&
                      pastDateEventDay === newDateDay
                    ? calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && createEventModal()
                    : pastDateEventYear === newDateYear &&
                      pastDateEventMonth > newDateMonth &&
                      pastDateEventDay > newDateDay
                    ? calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && createEventModal()
                    : pastDateEventYear > newDateYear
                    ? calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && createEventModal()
                    : null
                : createEventModal()}
            {/* {show1 ? (
                <ReportModal
                    isOpen={show1}
                    onClose={onCloseReportModal}
                    isEditable={isEditable}
                    eventData={eventData}
                    onUpdateEvent={onUpdateEvent}
                    onRemoveEvent={onRemoveEvent}
                    onAddEvent={onAddEvent}
                />
        ) : null} */}
        </>
    );
};

export default AddEditEvent;

/*
 {
                calendarDate.calendarDate !== null
                    ? pastDateEventYear < newDateYear
                        ?<PastDateEventModal message={t('It is not possible to enter an event in the past date !')}/>
                        : (pastDateEventYear === newDateYear) && (pastDateEventMonth < newDateMonth)
                            ? <PastDateEventModal message={t('It is not possible to enter an event in the past date !')}/>
                            : (pastDateEventYear === newDateYear) && (pastDateEventMonth === newDateMonth) && (pastDateEventDay < newDateDay)
                                ? <PastDateEventModal message={t('It is not possible to enter an event in the past date !')}/>
                                : (pastDateEventYear === newDateYear) && (pastDateEventMonth === newDateMonth) && (pastDateEventDay === newDateDay)
                                    ? createEventModal()
                                    : (pastDateEventYear === newDateYear) && (pastDateEventMonth === newDateMonth) && (pastDateEventDay > newDateDay)
                                        ? createEventModal()
                                        : (pastDateEventYear === newDateYear) && (pastDateEventMonth > newDateMonth) && (pastDateEventDay < newDateDay)
                                            ? createEventModal()
                                            : (pastDateEventYear === newDateYear) && (pastDateEventMonth > newDateMonth) && (pastDateEventDay === newDateDay)
                                                ? createEventModal()
                                                : (pastDateEventYear === newDateYear) && (pastDateEventMonth > newDateMonth) && (pastDateEventDay > newDateDay)
                                                    ? createEventModal()
                                                    : pastDateEventYear > newDateYear
                                                        ? createEventModal()
                                                        : null
                    : createEventModal()
            }
*/
