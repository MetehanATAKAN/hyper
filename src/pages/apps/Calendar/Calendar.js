// @flow
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import BootstrapTheme from '@fullcalendar/bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    activityTypeName,
    calendarDate,
    cancelClickEvent,
    clickCalendarDate,
    eventBackgroundColor,
    eventId,
    setEventDetailId
} from '../../../redux/actions';
import { useTranslation } from 'react-i18next';
import trLocale from '@fullcalendar/core/locales/tr';
import ruLocale from '@fullcalendar/core/locales/ru';
import { FetchApiGet } from '../../../utils/http.helper';
import { Steps } from 'intro.js-react';

type CalendarProps = {
    onDateClick: (value: any) => void,
    onEventClick: (value: any) => void,
    onDrop: (value: any) => void,
    events: Array<any>,
};

const Calendar = ({ onDateClick, onEventClick, onDrop, events }: CalendarProps): React$Element<React$FragmentType> => {
    /*
     * handle calendar methods
     */
    const getHoliday = useSelector((state) => state.Calendar.holidays);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [holidays, setHolidays] = useState([]);
    // calendar date click
    const handleDateClick = (arg) => {
        dispatch(calendarDate(arg));
        onDateClick(arg);
        dispatch(clickCalendarDate(true));
        sessionStorage.setItem('calendarView', arg.view.type);
        localStorage.setItem('calendarView', arg.view.type);
    };

    // calendar event click
    const handleEventClick = (arg) => {
        // redux eventId
        dispatch(eventId(arg.event.id));
        const activityName = arg.event._def.title.slice(0, 12);
        const eventBgColor = arg.event._def.ui.classNames[0];
        dispatch(activityTypeName(activityName));
        dispatch(eventBackgroundColor(eventBgColor));
        // DÜZELTİLECEK APP STATUS REDUXA ATILAMSI LAZIM
        // APP STATUS 2 İÇİN SHOW TRUE ATIYOR
        dispatch(cancelClickEvent(true));
        onEventClick(arg);
        try {
            document.getElementsByClassName('fc-popover', 'popover', 'fc-more-popover')[0].style = 'display: none';
        } catch (error) {}
    };
    const handleDrop = (arg) => {
        onDrop(arg);
    };

    const handleChangeView = (view) => {
        sessionStorage.setItem('calendarView', view.view.type);
        localStorage.setItem('calendarView', view.view.type);
    };

    useEffect(() => {
        // FetchApiGet(`services/Hr/Holiday/GetHolidaysByCountryId?countryId=${localStorage.getItem('countryId')}`, 'GET')
        //     .then((res) => res.json())
        //     .then((res) => {
                let h = [];
                getHoliday?.data?.map(
                    (holiday) =>
                        holiday.endTime.slice(11, 16) > '18:30' &&
                        h.push({
                            title: holiday.title,
                            start: holiday.startTime.slice(0, 10),
                            end: holiday.endTime.slice(0, 10),
                            display: 'background',
                            color: '#000',
                            className: 'calendar-holidays-reset',
                        })
                );
                setHolidays(h);
            // });
    }, [getHoliday]);
    return (
        <>
            {/* full calendar control */}
            <div id="calendar">
                <FullCalendar
                    locale={
                        localStorage.getItem('i18nextLng') === 'ru'
                            ? ruLocale
                            : localStorage.getItem('i18nextLng') === 'tr'
                            ? trLocale
                            : 'en'
                    }
                    initialView={sessionStorage.getItem('calendarView') || 'dayGridMonth'}
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, BootstrapTheme]}
                    handleWindowResize={true}
                    themeSystem="bootstrap"
                    buttonText={{
                        today: t('Today'),
                        month: t('Month'),
                        week: t('Week'),
                        day: t('Day'),
                        list: t('List'),
                        prev: t('Prev'),
                        next: t('Next'),
                    }}
                    // hiddenDays={[0, 7]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                    }}
                    // titleFormat={{ year: 'numeric', month: 'long', day: 'numeric' }}
                    viewClassNames={(view) => handleChangeView(view)}
                    editable={false}
                    selectable={true}
                    droppable={true}
                    events={[...events, ...holidays]}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    drop={handleDrop}
                    dayMaxEventRows={2}
                    // slotDuration={'00:15:00'}
                />
            </div>
        </>
    );
};

export default Calendar;
