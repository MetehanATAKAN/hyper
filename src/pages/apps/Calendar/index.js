// @flow
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import '@fullcalendar/react';
import { Draggable } from '@fullcalendar/interaction';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

// components
import ReportModal from './ReportModal';
import Calendar from './Calendar';
import AddEditEvent from './AddEditEvent';
import {
    calendarDate as calendarDateRedux,
    changePageNext,
    closeModal,
    eventDataGet,
    notSaveDatas,
    resetPageCount,
    sendAppStatus,
    showModal,
    dateInfo,
    holidays as getHolidays,
} from '../../../redux/actions';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import HomePage from './EditEvent/HomePage/HomePage';
import SplitIndex from './spllit/SplitIndex';
import CompetitorIndex from './Competitor/CompetitorIndex';
import { useTranslation } from 'react-i18next';
import ObjectionIndex from './Objection/ObjectionIndex';
import CloseWithoutSaving from '../../../components/Modals/CloseWithoutSaving';
import ReportNotSaved from '../../../components/Modals/ReportNotSaved';
import { CalendarMainPageSteps } from '../../../pageTour/Steps';

import { Steps, Hints } from 'intro.js-react';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import CreateActivity from './CreateActivity/CreateActivity';
import PastDateEventModal from '../../../components/Modals/PastDateEventModal';

const SidePanel = () => {
    const { t } = useTranslation();

    // external events
    const externalEvents = [
        {
            id: 1,
            textClass: 'text-success',
            className: 'bg-success',
            title: 'New Theme Release',
        },
        {
            id: 2,
            textClass: 'text-info',
            className: 'bg-info',
            title: 'My Event',
        },
        {
            id: 3,
            textClass: 'text-warning',
            className: 'bg-warning',
            title: 'Meet Manager',
        },
        {
            id: 4,
            textClass: 'text-danger',
            className: 'bg-danger',
            title: 'Create New Theme',
        },
    ];

    return (
        <>
            <div id="external-events" className="m-t-20">
                <br />
                <p className="text-muted">{t('Drag and drop your event or click in the calendar')}</p>
                {/* external events */}
                {externalEvents.map((event, index) => {
                    return (
                        <div
                            key={index}
                            className={classNames('external-event', event.className + '-lighten', event.textClass)}
                            title={event.title}
                            data={event.className}>
                            <i className="mdi mdi-checkbox-blank-circle me-2 vertical-middle"></i>
                            {t(event.title)}
                        </div>
                    );
                })}
            </div>

            {/* <div className="mt-5 d-none d-xl-block">
                <h5 className="text-center">How It Works ?</h5>

                <ul className="ps-3">
                    <li className="text-muted mb-3">
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged.
                    </li>
                    <li className="text-muted mb-3">
                        Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
                        the more obscure Latin words, consectetur, from a Lorem Ipsum passage.
                    </li>
                    <li className="text-muted mb-3">
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged.
                    </li>
                </ul>
            </div> */}
        </>
    );
};

type CalendarAppState = {
    show?: boolean,
    isEditable?: boolean,
    events?: Array<any>,
    eventData?: any,
    dateInfo?: any,
};

const CalendarApp = (state: CalendarAppState): React$Element<React$FragmentType> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    /*
     * modal handeling
     */
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [appStatus, setAppStatus] = useState(null);

    // button split modal show
    const [show2, setShow2] = useState(false);
    const showSplitModals = useSelector((state) => state.Calendar.showSplitModal);
    const showCompetitorModals = useSelector((state) => state.Calendar.showCompetitorModal);
    const showObjectionModals = useSelector((state) => state.Calendar.showObjectionModal);

    const [stepsEnabled, setStepsEnabled] = useState(false);
    const [initialStep] = useState(0);

    const onCloseModal = () => {
        setShow(false);
        setEventData({});
        setDateInfo({});
        // dispatch(dateInfo({}));
        dispatch(calendarDateRedux(null));
    };
    const onOpenModal = () => {
        //dispatch(createNewEventDate(false));
        setShow(true);
        setIsEditable(false);
        setButtonClick(true);
    };

    const onOpenEditModal = () => {
        setShow1(true);
        setIsEditable(false);
        setButtonClick(true);
    };

    const saveDeleteEditModal = () => {
        setShow1(false);
        setEventData({});
        setDateInfo({});
        dispatch(dateInfo({}));
    };

    const [modal, setModal] = useState(false);
    const [className, setClassName] = useState('');
    const [hideRm, setHideRm] = useState(false);

    const [alertModal, setAlertModal] = useState(false);
    const [alertClassName, setAlertClassName] = useState('');
    // SAVE REPORT MODAL
    const saveReportModal = () => {
        setShow1(false);
    };

    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
        setHideRm(!hideRm);
    };

    /**
     * Opens modal with custom class
     */

    const onCloseEditModal = () => {
        if (appStatus === 4) {
            dispatch(resetPageCount());
            setShow1(false);
            setModal(false);
            setHideRm(false);
        } else {
            setClassName('danger');
            toggle();
        }
    };

    // Without Saving\apps\calendar
    const alertWithoutSaving = () => {
        setTimeout(() => {
            setAlertModal(false);
        }, 1500);
    };
    //remove modal yes
    const closeRmAlertYes = () => {
        setIsRemoveModal(true);
        setShow1(false);
        toggle();
        setAlertModal(true);
        alertWithoutSaving();
        onRemoveEvent();
        setTimeout(() => {
            setIsRemove(false);
        }, 2000);
    };
    const closeRmAlertNo = () => {
        toggle();
        setIsRemoveModal(false);
        setIsRemove(false);
    };
    //close modal yes // Burası
    const closeRmAlertYesClose = () => {
        dispatch(resetPageCount());
        setShow1(false);
        toggle();
        setAlertModal(true);
        alertWithoutSaving();
    };

    const closeRmAlertNoIsSaving = () => {
        toggle();
        setIsRemoveModal(false);
    };
    // Report Modal save Report Cancel
    const saveReportCancel = () => {
        setShow1(false);
        setAlertModal(true);
        alertWithoutSaving();
    };
    const [isEditable, setIsEditable] = useState(false);
    const [buttonClick, setButtonClick] = useState(false);

    // split
    const onOpenSplitModal = () => {
        setShow2(true);
    };
    const onCloseSplitModal = () => {
        setShow2(false);
    };

    // NEW LİST
    // const userEmpId = sessionStorage.getItem('userEmpId');
    // TEST FOR OPEN NEW TAB
    const userEmpId = localStorage.getItem('userEmpId');
    const [eventsEndDate, setEventsEndDate] = useState([]);
    useEffect(() => {
        FetchApiGet(`services/daywork/event/GetFullEvents?id=${userEmpId}`, 'GET')
            .then((response) => response.json())
            .then((response) => {
                const newResponse = response.data;
                setEventsEndDate(newResponse);
                const defaultItems = newResponse.map((index) => {
                    return {
                        id: index.id,
                        groupId: index.eventDetailId,
                        title: index.title,
                        start: index.startDate,
                        end: <index className="endDate"></index>,
                        className: index.color,
                        employeeId: index.employeeId,
                    };
                });
                //   setList(defaultItems);
                setEvents(defaultItems);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        // GET CYCLE PERIOD
        FetchApiGet(
            `services/Organization/Organization/BusinessUnitCampaignCalendar/GetCyclePeriodByEmpId?empId=${userEmpId}`,
            'GET'
        )
            .then((response) => response.json())
            .then((response) => {
                // const newResponse = response.data;
                // setEventsEndDate(newResponse);
                // const defaultItems = newResponse.map((index) => {
                //     return {
                //         id: index.id,
                //         title: index.title,
                //         start: index.startDate,
                //         end: <index className="endDate"></index>,
                //         className: index.color,
                //         employeeId: index.employeeId,
                //     };
                // });
                // //   setList(defaultItems);
                // setEvents(defaultItems);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [userEmpId]);
    const [events, setEvents] = useState([]);
    const [eventData, setEventData] = useState({});
    const [dateInfo, setDateInfo] = useState({});

    // useEffect(() => {
    //     if(events.length !== 0 && document.querySelector(".fc-daygrid-event-dot")!== null ) {

    //         console.log(events);
    //         let tag = document.createElement('div');
    //     let node = document.createTextNode('metehan');
    //     tag.appendChild(node);
    //         let element = document.querySelector(".fc-daygrid-event-dot");
    //         console.log(tag,element);
    //         // element.childNodes(tag);
    //     }
    //    }, [events])

    // useEffect(() => {
    //     // create dragable events
    //     let draggableEl = document.getElementById('external-events');
    //     new Draggable(draggableEl, {
    //         itemSelector: '.external-event',
    //     });
    // }, []);

    const [holidays, setHolidays] = useState([]);
    useEffect(() => {
        FetchApiGet(`services/Hr/Holiday/GetHolidaysByCountryId?countryId=${localStorage.getItem('countryId')}`, 'GET')
            .then((response) => response.json())
            .then((response) => (setHolidays(response.data), dispatch(getHolidays(response))));
    }, []);

    /*
    calendar events
    */
    // on date click
    const onDateClick = (arg) => {
        let isHoliday = false;
        for (let i = 0; i < holidays.length; i++) {
            if (arg.dateStr === holidays[i].startTime.slice(0, 10)) {
                if (holidays[i].endTime.slice(11, 16) > '18:30') {
                    isHoliday = true;
                    setShow(false);
                } else {
                    isHoliday = false;
                }
            }
        }
        if (isHoliday === false) {
            setDateInfo(arg);
            // dispatch(dateInfo(arg));
            onOpenModal();
            setIsEditable(false);
        }
    };

    // on event click
    const onEventClick = (arg) => {
        const event = {
            id: parseInt(arg.event.id),
            eventDetailId: arg.event._def.groupId,
            title: arg.event.title,
            start: arg.event.start,
            className: arg.event.classNames[0],
            employeeId: arg.event.extendedProps.employeeId,
        };
        setEventData(event);
        onOpenEditModal();
        setIsEditable(true);
        FetchApiGet(`services/Daywork/Event/GetEventAppStatusById?eventId=${event.id}`, 'GET')
            .then((response) => response.json())
            .then((response) => {
                dispatch(sendAppStatus(response.data.appStatus));
                setAppStatus(response.data.appStatus);
            })
            .catch((err) => console.log(err));
    };
    // ADD REDUX
    useEffect(() => {
        dispatch(eventDataGet(eventData));
    }, [eventData]);

    // on drop
    // const onDrop = (arg) => {

    //     const dropEventData = arg;
    //     const title = dropEventData.draggedEl.title;

    //     if(holidays.find(holiday => (holiday.startTime.slice(0,10) === dropEventData.dateStr) && (holiday.endTime.slice(11,16) > "18:30")) === false){
    //         if (title == null) {
    //         } else {
    //             let newEvent = {
    //                 id: events.length + 1,
    //                 title: title,
    //                 start: dropEventData ? dropEventData.dateStr : new Date(),
    //                 className: dropEventData.draggedEl.attributes.data.value,
    //             };
    //             const modifiedEvents = [...events];
    //             modifiedEvents.push(newEvent);

    //             setEvents(modifiedEvents);
    //         }
    //     }

    // };

    /*
    on add event 
    */
    const onAddEvent = (data) => {
        const modifiedEvents = [...events];
        const event = {
            id: modifiedEvents.length + 1,
            title: data.title,
            start: dateInfo ? dateInfo.date : new Date(),
            className: data.className,
        };
        modifiedEvents.push(event);
        setEvents(modifiedEvents);
        onCloseModal();
    };

    /*
    on update event
    */
    const onUpdateEvent = (data) => {
        const modifiedEvents = [...events];
        const idx = modifiedEvents.findIndex((e) => e['id'] === eventData.id);
        modifiedEvents[idx]['title'] = data.title;
        modifiedEvents[idx]['className'] = data.className;
        setEvents(modifiedEvents);
        // onCloseModal();
        saveDeleteEditModal();
    };

    /*
    on remove event
    */
    const [isRemove, setIsRemove] = useState(false);
    const [isRemoveModal, setIsRemoveModal] = useState(false);

    const onRemoveEvent = () => {
        if (isRemoveModal === false) {
            setIsRemove(true);
            setIsRemoveModal(true);
            toggle();
        } else if (isRemoveModal === true) {
            var modifiedEvents = [...events];
            const idx = modifiedEvents.findIndex((e) => e['id'] === eventData.id);
            const event = modifiedEvents.find((data) => data.id === eventData.id);
            const eventid = event.id;
            modifiedEvents.splice(idx, 1);
            setEvents(modifiedEvents);

            saveDeleteEditModal();

            //delete body
            const eventId = {
                eventId: eventid,
            };
            FetchApiPost('services/Daywork/Event/DeleteEvent', 'PATCH', eventId)
                // fetch('http://178.18.200.171:5000/services/Daywork/Event/DeleteEvent',{
                //     method:"PATCH",
                //     body:JSON.stringify(eventId),
                //     headers: {
                //         "access-control-allow-origin" : "*",
                //         "Content-type": "application/json; charset=UTF-8"
                //     }
                // })
                .then((response) => response.json())
                .catch((error) => console.log('error', error));
            setIsRemoveModal(false);
        }
    };
    const [onSubmitUpdateForm, setOnSubmitUpdateForm] = useState(false);

    const calendarDate = useSelector((state) => state.Calendar);
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

    return (
        <>
            <Steps
                enabled={stepsEnabled}
                steps={CalendarMainPageSteps}
                initialStep={initialStep}
                onExit={() => setStepsEnabled(!stepsEnabled)}
            />
            <div className="new-table-header-cont">
                <div className="mt-2 mb-2">
                    <div className="new-table-title1">
                        <span>{t('Calendar')}</span>
                    </div>
                </div>

                <div
                    onClick={() => setStepsEnabled(!stepsEnabled)}
                    style={{
                        position: 'fixed',
                        right: '2px',
                        bottom: '10px',
                        border: 'none',
                        background: 'rgb(2, 160, 223)',
                        zIndex: '9999',
                    }}
                    class="main-div main-div2">
                    <i style={{ color: '#FFFFFF', padding: '12px' }} className="fa-solid fa-question"></i>
                </div>
                {/* <button style={{position:'fixed',right:'2px',bottom:'10px',border:'none',borderRadius:'100%',background:'rgb(2, 160, 223)'}} onClick={()=>setStepsEnabled(!stepsEnabled)} >
                <i style={{color:'#FFFFFF',padding:'12px'}} className="fa-solid fa-question"></i>
                </button> */}
            </div>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                {/* <Col lg={2}>
                                    <div className="d-grid">
                                        <Button
                                            className="btn btn-lg font-16 btn-primary step1"
                                            id="btn-new-event"
                                            onClick={() => onOpenModal()}>
                                            <i className="mdi mdi-plus-circle-outline"></i> {t('Add Event')}
                                        </Button>
                                    </div>

                                    <SidePanel />
                                </Col> */}
                                <Col lg={12}>
                                    {/* fullcalendar control */}
                                    <Calendar
                                        onDateClick={onDateClick}
                                        onEventClick={onEventClick}
                                        // onDrop={onDrop}
                                        events={events}
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {appStatus !== 4 ? (
                <CloseWithoutSaving
                    modal={modal}
                    toggle={toggle}
                    noButton={closeRmAlertNoIsSaving}
                    yesButton={closeRmAlertYesClose}
                    message="Are you sure you want to close without saving?"
                />
            ) : null}
            {/* <CloseWithoutSaving 
                modal={modal} 
                toggle={toggle} 
                noButton={closeRmAlertNoIsSaving} 
                yesButton={closeRmAlertYesClose} 
                message='Are you sure you want to close without saving?' 
                /> */}
            {alertModal === true && <ReportNotSaved onHide={alertWithoutSaving} isRemove={isRemove} />}
            {/* add new event modal */}
            {/* {show ? (
                <AddEditEvent
                    isOpen={show}
                    onClose={onCloseModal}
                    isEditable={isEditable}
                    buttonClick={buttonClick}
                    eventData={eventData}
                    onUpdateEvent={onUpdateEvent}
                    onRemoveEvent={onRemoveEvent}
                    onAddEvent={onAddEvent}
                    holidays={holidays}
                    dateInfo={dateInfo.dateStr}
                    eventsEndDate={eventsEndDate}
                />
            ) : null} */}
            {/* {
                show && <CreateActivity isOpen={show} onClose={onCloseModal} />
            } */}
            {show && calendarDate.calendarDate !== null ? (
                pastDateEventYear < newDateYear ? (
                    calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && (
                        <PastDateEventModal message={t('It is not possible to enter an event in the past date !')} />
                    )
                ) : pastDateEventYear === newDateYear && pastDateEventMonth < newDateMonth ? (
                    calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && (
                        <PastDateEventModal message={t('It is not possible to enter an event in the past date !')} />
                    )
                ) : pastDateEventYear === newDateYear &&
                  pastDateEventMonth === newDateMonth &&
                  pastDateEventDay < newDateDay ? (
                    calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && (
                        <PastDateEventModal message={t('It is not possible to enter an event in the past date !')} />
                    )
                ) : pastDateEventYear === newDateYear &&
                  pastDateEventMonth === newDateMonth &&
                  pastDateEventDay === newDateDay ? (
                    calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && (
                        <CreateActivity
                            isOpen={show}
                            onClose={onCloseModal}
                            eventsEndDate={eventsEndDate}
                            dateInfo={dateInfo.dateStr}
                        />
                    )
                ) : pastDateEventYear === newDateYear &&
                  pastDateEventMonth === newDateMonth &&
                  pastDateEventDay > newDateDay ? (
                    calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && (
                        <CreateActivity
                            isOpen={show}
                            onClose={onCloseModal}
                            eventsEndDate={eventsEndDate}
                            dateInfo={dateInfo.dateStr}
                        />
                    )
                ) : pastDateEventYear === newDateYear &&
                  pastDateEventMonth > newDateMonth &&
                  pastDateEventDay < newDateDay ? (
                    calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && (
                        <CreateActivity
                            isOpen={show}
                            onClose={onCloseModal}
                            eventsEndDate={eventsEndDate}
                            dateInfo={dateInfo.dateStr}
                        />
                    )
                ) : pastDateEventYear === newDateYear &&
                  pastDateEventMonth > newDateMonth &&
                  pastDateEventDay === newDateDay ? (
                    calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && (
                        <CreateActivity
                            isOpen={show}
                            onClose={onCloseModal}
                            eventsEndDate={eventsEndDate}
                            dateInfo={dateInfo.dateStr}
                        />
                    )
                ) : pastDateEventYear === newDateYear &&
                  pastDateEventMonth > newDateMonth &&
                  pastDateEventDay > newDateDay ? (
                    calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && (
                        <CreateActivity isOpen={show} onClose={onCloseModal} eventsEndDate={eventsEndDate} />
                    )
                ) : pastDateEventYear > newDateYear ? (
                    calendarDate?.calendarDate?.dayEl?.className?.search('fc-day-sun') === -1 && (
                        <CreateActivity isOpen={show} onClose={onCloseModal} eventsEndDate={eventsEndDate} />
                    )
                ) : null
            ) : (
                <CreateActivity
                    isOpen={show}
                    onClose={onCloseModal}
                    eventsEndDate={eventsEndDate}
                    dateInfo={dateInfo.dateStr}
                />
            )}
            {show1 ? (
                // <ReportModal
                //     isOpen={show1}
                //     onClose={onCloseEditModal}
                //     isEditable={isEditable}
                //     eventData={eventData}
                //     onUpdateEvent={onUpdateEvent}
                //     onRemoveEvent={onRemoveEvent}
                //     onAddEvent={onAddEvent}
                //     hideRm={hideRm}
                //     dateInfo={dateInfo}
                //     events={events}
                //     saveReportModal={saveReportModal}
                //     closeRmAlertYesClose = {saveReportCancel}
                // />
                <HomePage
                    hideRm={hideRm}
                    onClose={onCloseEditModal}
                    isOpen={show1}
                    setIsOpen={setShow1}
                    isEditable={isEditable}
                    onUpdateEvent={onUpdateEvent}
                    onAddEvent={onAddEvent}
                    setShow={setShow1}
                    onSubmitUpdateForm={onSubmitUpdateForm}
                    setOnSubmitUpdateForm={setOnSubmitUpdateForm}
                />
            ) : null}
            {showSplitModals === true && <SplitIndex homePageOpen={setShow1} onClose={onCloseEditModal} />}
            {showCompetitorModals === true && <CompetitorIndex />}
            {showObjectionModals === true && <ObjectionIndex homePageOpen={setShow1} />}
            {isRemove === true ? (
                <Modal show={modal} onHide={toggle} size="sm" className="pt-4">
                    <div className={classNames('modal-filled', 'bg-danger')}>
                        <Modal.Body className="p-4">
                            <div className="text-center">
                                <i className="mdi mdi-exclamation"></i>
                                <p className="mt-2 pb-2">{t('Are you sure you want to delete the event?')}</p>
                                <button
                                    type="button"
                                    className="btn btn-light my-2 mx-1"
                                    data-bs-dismiss="modal"
                                    onClick={closeRmAlertNo}>
                                    {t('No')}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 mx-1"
                                    data-bs-dismiss="modal"
                                    onClick={closeRmAlertYes}>
                                    {t('Yes')}
                                </button>
                            </div>
                        </Modal.Body>
                    </div>
                </Modal>
            ) : null}
            {/* <CompetitorFinishAnimation /> */}
        </>
    );
};

export default CalendarApp;
