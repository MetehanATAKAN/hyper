import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SingleSelects, MultipleSelects } from '../../../../components/GlobalNew/Selects';
import { DatePicker, Checkbox } from 'antd';
import moment from 'moment';
import HyperDatepicker from '../../../../components/Datepicker';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Presentation from './Presentation';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';

import 'antd/dist/antd.css';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Body = ({ eventsEndDate, dateInfo, setButtonDisableStatus, isClickAdd, setIsClickAdd, loader, setLoader }) => {
    const { t } = useTranslation();
    const history = useHistory();

    

    const [isCreateErr, setIsCreateErr] = useState(false);
    const [createErrMessage, setCreateErrMessage] = useState(false);

    const holidays = useSelector((state) => state.Calendar.holidays);
    const calendarDate = useSelector((state) => state.Calendar);

    const [disabledDays, setDisabledDays] = useState([]);

    const [activity, setActivity] = useState();
    const [activityOptions, setActivityOptions] = useState([]);

    const [type, setType] = useState();
    const [typeOptions, setTypeOptions] = useState([]);

    const [date, setDate] = useState(calendarDate.calendarDate ? calendarDate.calendarDate.date : new Date());

    const [businessUnit, setBusinessUnit] = useState();
    const [businessUnitOptions, setBusinessUnitOptions] = useState();

    const [zone, setZone] = useState();
    const [zoneOptions, setZoneOptions] = useState([]);

    const [employee, setEmployee] = useState();
    const [emloyeeOptions, setEmployeeOptions] = useState([]);

    useEffect(() => {
        setDisabledDays(
            holidays?.data
                .filter((holiday) => holiday.endTime.slice(11, 16) > '18:30')
                .map((deneme) => replaceAt(deneme.startTime, '00:00:00'))
        );
    }, [holidays]);

    const replaceAt = (holiday, replacement) => {
        return new Date(holiday?.substring(0, 11) + replacement + holiday?.substring(11 + replacement.length));
    };

    const disabledDate = (current) => {
        return (
            (current && current < moment().startOf('day')) ||
            disabledDays.find((d) => d.getTime() === current._d.setHours(0, 0, 0, 0))
        );
    };

    const [startTime, setStartTime] = useState();
    const [startTimeOptions, setStartTimeOptions] = useState([]);

    const [durationOfActivity, setDurationOfActivity] = useState();
    const [durationOfActivityOptions, setDurationOfActivityOptions] = useState([
        15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480,
    ]);

    useEffect(() => {
        
        if(!type || type?.label !== 'Coaching' || !employee || !date) return;
        setLoader(true)
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1)
        if(month.length === 1){
            month = 0 + month
        }
        let day = String(date.getDate());
        if(day.length === 1){
            day = 0 + day
        }

        const body = {
            employeeId: Number(employee.value),
            date: `${year}-${month}-${day}`,
        };
        FetchApiPost('services/Daywork/EventDetail/GetEmployeesVisitHoursByDateTime', 'POST', body).then((res) => {
            if (res.status === 200) {
                res.json().then(({data}) => {
                    setLoader(false)
                    
                
                        let hours = data.map(i => {
                                let t = new Date(i.date)
                                let eventHour = String(t.getHours())
                                let eventMunite = String(t.getMinutes())
                                if(eventHour.length === 1){
                                    eventHour = '0' + eventHour
                                }
                                if(eventMunite.length === 1){
                                    eventMunite = '0' + eventMunite
                                }
                                return {
                                    value: i.eventId,
                                    label: `${eventHour}:${eventMunite}`
                                }
                            })
                            console.log(Number(month) , new Date().getMonth())
                    if((Number(year) === new Date().getFullYear()) && (Number(month) === (new Date().getMonth() + 1)) && (Number(day) === new Date().getDate())){
                        let ddd = new Date()
                        let controlHours = hours.filter(t => 
                            ((ddd.getHours() === Number(t.label.slice(0, 2))) || ddd.getHours() < Number(t.label.slice(0, 2))) 

                        )
                        let controlMunites = controlHours.filter(t => {
                            if((ddd.getHours() === Number(t.label.slice(0, 2)))){
                                if(((new Date().getMinutes() === Number(t.label.slice(3,5))) || (new Date().getMinutes() < Number(t.label.slice(3,5))))){
                                    return t
                                }else{
                                    return null
                                }
                            }else{
                                return t
                            }
                            
                        })
                        setStartTimeOptions(controlMunites)
                        if(controlMunites.length === 1){
                            setStartTime({ value: controlMunites[0].value, label: controlMunites[0].label})
                            getCoachingItems(controlMunites[0].value)
                            return;
                        }
                    }else{
                        setStartTimeOptions(hours)
                        if(hours.length === 1){
                            setStartTime({ value: hours[0].value, label: hours[0].label})
                            getCoachingItems(hours[0].value)
                            return;
                        }
                    }

                    // if(data.length === 1){
                    //     let t = new Date(data[0].date)
                    //         let eventHour = String(t.getHours())
                    //         let eventMunite = String(t.getMinutes())
                    //         if(eventHour.length === 1){
                    //             eventHour = '0' + eventHour
                    //         }
                    //         if(eventMunite.length === 1){
                    //             eventMunite = '0' + eventMunite
                    //         }
                    //         // console.log( data[0].eventId, `${eventHour}:${eventMunite}`)
                    //         setStartTime({ value: data[0].eventId, label: `${eventHour}:${eventMunite}`})
                    //         getCoachingItems(data[0].eventId)
                    // }
                });
            }
        });
    }, [type, employee]);
    
    const [selectedEventId, setSelectedEventId] = useState()
    const getCoachingItems = (eventId) => {
        FetchApiGet(`services/Daywork/Event/GetEventById?id=${eventId}`, 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then((data) => {
                        setSelectedEventId(eventId)
                        let t = new Date(data.startDate)
                        // let eventHour = String(t.getHours())
                        // let eventMunite = String(t.getMinutes())
                        // if(eventHour.length === 1){
                        //     eventHour = '0' + eventHour
                        // }
                        // if(eventMunite.length === 1){
                        //     eventMunite = '0' + eventMunite
                        // }
                        // setStartTime({ value: 0, label: `${eventHour}:${eventMunite}`})
                        let endT = new Date(data.endDate)
                        setDurationOfActivity({ value: 0, label: `${(endT - t) / (1000 * 60)}`})
                        setPlace({ value: data.place.id, label: data.place.name })
                        setPlaceType([{ value: data.placeType.id, label: data.placeType.name }])
                        setTypeOfPriority([{ value: data.typeOfPriority.id, label: data.typeOfPriority.name }])
                        setClientType({ value: data.clientType.id, label: data.clientType.name })
                        setClient({ value: data.client.id, label: `${data.client.name} / ${data.client.specialization.specName} / ${data.client.category}` })
                        setWorkPlace({ value: data.workPlace.id, label: data.workPlace.name })
                    })
                }
            })
    }

    useEffect(() => {
        if (!date || !type || type?.label === 'Coaching') {
            // setStartTimeOptions([]);
            setStartTime();
            return;
        }
        FetchApiPost('api/OldSystem/GetEmployeeShiftPlanByEmpId', 'POST', {
            empId: Number(localStorage.getItem('userEmpId')),
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    let year = new Date().getFullYear();
                    let month = new Date().getMonth() + 1;
                    let day = new Date().getDate();
                    if((Number(year) === date.getFullYear()) && (Number(month) === (date.getMonth() + 1)) && (Number(day) === date.getDate())){
                        let ddd = new Date()
                        let controlHours = data.filter(t => 
                            ((ddd.getHours() === Number(t.slice(0, 2))) || ddd.getHours() < Number(t.slice(0, 2))) 
                        )
                        let controlMunites = controlHours.filter(t => {
                            if((ddd.getHours() === Number(t.slice(0, 2)))){
                                if(((new Date().getMinutes() === Number(t.slice(3,5))) || (new Date().getMinutes() < Number(t.slice(3,5))))){
                                    return t
                                }else{
                                    return null
                                }
                            }else{
                                return t
                            }
                            
                        })

                        setStartTimeOptions(controlMunites);
                    }else{
                        setStartTimeOptions(data);
                    }
                    
                });
            }
        });
    }, [date, type]);

    function getNextValue(arr, index) {
        if (index + 1 < arr.length) {
            return arr[index + 1];
        } else {
            return arr[0];
        }
    }

    const getEndDateHours = useCallback(() => {
        let hours = [];
        for (let i = 0; i < eventsEndDate.length; i++) {
            const endDate = new Date(eventsEndDate[i].endDate);
            const startDate = new Date(eventsEndDate[i].startDate);
            const endDate2 = endDate.toLocaleDateString().split('.').reverse().join('-');
            let year = date.getFullYear();
            let month = String(date.getMonth());
            let day = date.getDate();
            if(month.length === 0){
                month = '0' + month
            }
            if (`${year}-${month}-${day}` === endDate2) {
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
        return;
        if (startTimeOptions.length === 0) return;
        const userDate = moment(new Date()).format('YYYY-MM-DD');
        let year = date.getFullYear();
        let month = String(date.getMonth());
        let day = date.getDate();
        if(month.length === 0){
            month = '0' + month
        }
        const calendarDates = `${year}-${month}-${day}`;
        const compare = compareDates(userDate, calendarDates);
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        const currentTimeString = `${currentHour}:${currentMinutes}`;
        const currentEventHours = getEndDateHours();
        // console.log("currentEventHourscurrentEventHours",currentEventHours)
        if (currentEventHours.length > 0) {
            const lastEvent = currentEventHours[currentEventHours.length - 1];
            const findIndexHour = startTimeOptions.findIndex((el) => el.label === lastEvent.end);
            const nextEventHour = getNextValue(startTimeOptions, findIndexHour);
            if (compare === 'future') {
                setStartTime({ value: nextEventHour, label: nextEventHour });
            }
            if (compare === 'present') {
                const hourCompare = compareTimes(currentTimeString, nextEventHour);
                if (hourCompare === 'Equal' || hourCompare === 'future') {
                    setStartTime({ value: nextEventHour, label: nextEventHour });
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
                    setStartTime({ value: `${nextStart}:${nextEnd}`, label: `${nextStart}:${nextEnd}` });
                }
            }
        }
        if (currentEventHours.length === 0) {
           
                setStartTime({ value: startTimeOptions[0], label: startTimeOptions[0] });
         

            
        }
    }, [calendarDate, getEndDateHours, startTimeOptions]);

    useEffect(() => {
        if(startTimeOptions.length === 0) return;
        let hours = [];
        if (holidays.data.find((holiday) => holiday.startTime.slice(0, 10) === dateInfo)) {
            holidays.data.map(
                (holiday) =>
                    holiday.startTime.slice(0, 10) === dateInfo &&
                    startTimeOptions.map((time) => time > holiday.endTime.slice(11, 16) && hours.push(time))
            );
            // startTime = hours;
            setStartTimeOptions(hours);
        }
    }, [holidays, startTimeOptions]);

    // activity
    useEffect(() => {
        setLoader(true);
        FetchApiGet('services/Daywork/Activity/GetActivity', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setLoader(false);
                    setActivityOptions(data.map((item) => ({ value: item.id, label: item.activityName })));
                    if (data.length === 1) {
                        setActivity({ value: data[0].id, label: data[0].activityName });
                    }
                });
            }
        });
    }, []);

    // type
    useEffect(() => {
        if (!activity) return;
        setLoader(true);
        FetchApiPost(`services/Daywork/ActivityType/GetActivityTypesByActivityId`, 'POST', {
            activityId: activity.value,
            positionId: Number(localStorage.getItem('userPosition')),
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setLoader(false);
                    setTypeOptions(data.map((item) => ({ value: item.id, label: item.activityTypeName })));
                    if (data.length === 1) {
                        setType({ value: data[0].id, label: data[0].activityTypeName });
                    }
                });
            }
        });
    }, [activity]);

    const addDayZero = () => {
        if (date.getDate() < 10) {
            return '0' + date.getDate();
        } else {
            return date.getDate();
        }
    };

    const addMonthZero = () => {
        if (date.getMonth() < 9) {
            return '0' + (parseInt(date.getMonth()) + 1);
        } else {
            return date.getMonth() + 1;
        }
    };

    // business unit
    useEffect(() => {
        if (!date) return;
        let emp = localStorage.getItem('userEmpId');
        let dateForBus = date.getFullYear() + '-' + addMonthZero(date) + '-' + addDayZero(date);
        const postEmpDate = { empId: emp, date: dateForBus };

        setLoader(true);

        FetchApiPost('api/OldSystem/GetBusinessUnitByEmpIdandDate', 'POST', postEmpDate).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setLoader(false);
                    setBusinessUnitOptions(
                        data.map((item) => ({ value: item.BusinessUnitId, label: item.BusinessUnitName }))
                    );
                    if (data.length === 1) {
                        setBusinessUnit({ value: data[0].BusinessUnitId, label: data[0].BusinessUnitName });
                    }
                });
            }
        });
    }, [date]);

    useEffect(() => {
        if (!businessUnit) return;
        FetchApiPost('api/OldSystem/GetZoneByBusinessUnitAndCompanyId', 'POST', {
            BusId: businessUnit.value,
            CountryId: Number(localStorage.getItem('countryId')),
            EmpId: Number(localStorage.getItem('userEmpId')),
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setZoneOptions(data.map((i) => ({ value: i.Id, label: i.Name })));
                    if (data.length === 1) {
                        setZone({ value: data[0].Id, label: data[0].Name });
                    }
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setZone();
                setZoneOptions([]);
            }
        });
    }, [businessUnit]);

    useEffect(() => {
        if (!zone) return;
        FetchApiPost('api/OldSystem/GetRepByBusIds', 'POST', {
            zoneIds: [zone.value],
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setEmployeeOptions(data.map((i) => ({ value: i.UserId, label: i.UserName })));
                    if (data.length === 1) {
                        setEmployee({ value: data[0].UserId, label: data[0].UserName });
                    }
                });
            }
        });
    }, [zone]);

    const [place, setPlace] = useState();
    const [placeOptions, setPlaceOptions] = useState([]);

    const [placeType, setPlaceType] = useState([]);
    const [placeTypeOptions, setPlaceTypeOptions] = useState([]);

    const [header, setHeader] = useState();
    const [clientHeader, setClientHeader] = useState();

    const [companyId, setCompanyId] = useState();
    useEffect(() => {
        let empId = localStorage.getItem('userEmpId');
        FetchApiGet(`api/OldSystem/GetCompanies/{empId}?empId=${empId}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    if (data.length === 1) {
                        setCompanyId(data[0].CompanyId);
                    } else if (data.length > 1 && data.find((item) => item.CompanyId === 238)) {
                        setCompanyId(238);
                    } else {
                        setCompanyId(data[0].CompanyId);
                    }
                });
            }
        });
    }, []);

    // work place lerin header ını çekmek için
    useEffect(() => {
        if (!companyId) return;
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForWorkPlace`, 'POST', {
            headerIds: [0],
            countryId: Number(localStorage.getItem('countryId')),
            companyId: companyId,
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    let arr = { pl: {}, pt: {}, tp: {} };
                    data.map((item, index) => {
                        if (item.abbrevation === 'PL') {
                            arr.pl = item;
                        }
                    });
                    data.map((item, index) => {
                        if (item.abbrevation === 'PT') {
                            arr.pt = item;
                        }
                    });
                    data.map((item, index) => {
                        if (item.abbrevation === 'PRT') {
                            arr.tp = item;
                        }
                    });
                    setHeader(arr);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setHeader();
            }
        });
    }, [history, companyId]);

    useEffect(() => {
        if (!companyId) return;
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForClient`, 'POST', {
            headerIds: [0],
            countryId: Number(localStorage.getItem('countryId')),
            companyId: companyId,
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setClientHeader(data);
                });
            } else {
                setClientHeader();
            }
        });
    }, [companyId]);

    useEffect(() => {
        if (!date || !businessUnit || !header || !clientHeader || (type && type.label === 'Coaching')) return;
        FetchApiPost('services/Organization/Organization/VisitPlanning/GetDefinationForVisitPlanning', 'POST', {
            date: date,
            businessUnitId: businessUnit.value,
            headerId: header.pl.headerId,
            employeeId: Number(localStorage.getItem('userEmpId')),
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setPlaceOptions(data.map((p) => ({ value: p.definationId, label: p.definationName })));
                    if (data.length === 1) {
                        setPlace({ value: data[0].definationId, label: data[0].definationName });
                    }
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setPlace();
                setPlaceOptions([]);
            }
        });

        FetchApiPost('services/Organization/Organization/VisitPlanning/GetDefinationForVisitPlanning', 'POST', {
            date: date,
            businessUnitId: businessUnit.value,
            headerId: header.pt.headerId,
            employeeId: Number(localStorage.getItem('userEmpId')),
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setPlaceTypeOptions(data.map((p) => ({ value: p.definationId, label: p.definationName })));
                    if (data.length === 1) {
                        setPlaceType([{ value: data[0].definationId, label: data[0].definationName }]);
                    }
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setPlaceType([]);
                setPlaceTypeOptions([]);
            }
        });

        FetchApiPost('services/Organization/Organization/VisitPlanning/GetDefinationForVisitPlanning', 'POST', {
            date: date,
            businessUnitId: businessUnit.value,
            headerId: header.tp.headerId,
            employeeId: Number(localStorage.getItem('userEmpId')),
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setTypeOfPriorityOptions(data.map((p) => ({ value: p.definationId, label: p.definationName })));
                    if (data.length === 1) {
                        setTypeOfPriority([{ value: data[0].definationId, label: data[0].definationName }]);
                    }
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setTypeOfPriority([]);
                setTypeOfPriorityOptions([]);
            }
        });

        FetchApiPost('services/Organization/Organization/VisitPlanning/GetDefinationForVisitPlanning', 'POST', {
            date: date,
            businessUnitId: businessUnit.value,
            headerId: clientHeader[0].headerId,
            employeeId: Number(localStorage.getItem('userEmpId')),
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setClientTypeOptions(data.map((p) => ({ value: p.definationId, label: p.definationName })));
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setClientType();
                setClientTypeOptions([]);
            }
        });
    }, [date, businessUnit, header, history, clientHeader]);

    const [typeOfPriority, setTypeOfPriority] = useState([]);
    const [typeOfPriorityOptions, setTypeOfPriorityOptions] = useState([]);

    const [clientType, setClientType] = useState();
    const [clientTypeOptions, setClientTypeOptions] = useState([]);

    const [workPlace, setWorkPlace] = useState();
    const [workPlaceOptions, setWorkPlaceOptions] = useState([]);

    const [client, setClient] = useState();
    const [clientOptions, setClientOptions] = useState([]);

    useEffect(() => {
        if (typeOfPriority.length === 0 || !place || placeType.length === 0 || (type && type.label === 'Coaching')) return;

        setLoader(true);

        FetchApiPost('services/CRM/WorkPlace/GetWorkPlaceForVisitPlanning', 'POST', {
            employeeId: Number(localStorage.getItem('userEmpId')),
            placeIds: [place.value],
            placeTypeIds: [...placeType.map((i) => i.value)],
            typeOfPriorityIds: [...typeOfPriority.map((i) => i.value)],
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setLoader(false);
                    setWorkPlaceOptions(data.map((i) => ({ value: i.id, label: i.name })));
                    if (data.length === 1) {
                        setWorkPlace({ value: data[0].id, label: data[0].name });
                    }
                });
            }
        });
    }, [typeOfPriority, place, placeType]);

    useEffect(() => {
        if (!workPlace || !clientType || (type && type.label === 'Coaching')) return;
        FetchApiPost('services/CRM/Client/GetClientForVisitPlanning', 'POST', {
            WorkPlaceId: workPlace.value,
            ClientTypeId: clientType.value,
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setClientOptions(
                        data.map((item) => ({
                            value: item.id,
                            label: `${item.name} / ${item.specName} / ${item.category}`,
                        }))
                    );
                });
            }
        });
    }, [workPlace, clientType]);

    useEffect(() => {
        if (
            !place ||
            placeType.length === 0 ||
            typeOfPriority.length === 0 ||
            !workPlace ||
            !type ||
            !date ||
            !businessUnit ||
            !startTime ||
            !durationOfActivity
        ) {
            setButtonDisableStatus(true);
        } else {
            if(place.value === 1){
                if(client && clientType){
                    setButtonDisableStatus(false);
                }else{
                    setButtonDisableStatus(true);
                }
            }else{
                setButtonDisableStatus(false);
            }
        }
    }, [place, placeType, typeOfPriority, workPlace, type, date, businessUnit, startTime, durationOfActivity, client, clientType]);

    useEffect(() => {
        if (!isClickAdd) return;

        let body = {
            activityTypeId: type.value,
            employeeId: Number(localStorage.getItem('userEmpId')),
            employeeName: localStorage.getItem('userName'),
            businessUnitId: businessUnit.value,
            businessUnitName: businessUnit.label,
            creatorId: Number(localStorage.getItem('userEmpId')),
            creatorName: localStorage.getItem('userName'),
            start:
                date.getFullYear() +
                '-' +
                addMonthZero(date) +
                '-' +
                addDayZero(date) +
                'T' +
                startTime.label +
                ':00.296Z',
            end: '2023-05-12T12:08:33.183Z',
            workPlaceId: workPlace.value,
            workPlaceName: workPlace.label,
            clientId: client ? client.value : 0,
            clientName: client ? client.label : '',
            durationOfEachActivity: Number(durationOfActivity.label),
        };

        if(type.value === 4){
            body = {
                activityTypeId: type.value,
                employeeId: Number(localStorage.getItem('userEmpId')),
                employeeName: localStorage.getItem('userName'),
                businessUnitId: businessUnit.value,
                businessUnitName: businessUnit.label,
                creatorId: Number(localStorage.getItem('userEmpId')),
                creatorName: localStorage.getItem('userName'),
                start:
                    date.getFullYear() +
                    '-' +
                    addMonthZero(date) +
                    '-' +
                    addDayZero(date) +
                    'T' +
                    startTime.label +
                    ':00.296Z',
                end: '2023-05-12T12:08:33.183Z',
                workPlaceId: workPlace.value,
                workPlaceName: workPlace.label,
                clientId: client ? client.value : 0,
                clientName: client ? client.label : '',
                durationOfEachActivity: Number(durationOfActivity.label),
                eventId: selectedEventId
            }
        }

        FetchApiPost('services/daywork/Event/CreateEvent', 'POST', body).then((res) => {
            if (res.status === 201) {
                window.location.reload();
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                res.json().then(({ errors }) => {
                    setIsClickAdd(false);
                    setIsCreateErr(true);
                    setCreateErrMessage(errors[0]);
                    setTimeout(() => {
                        setIsCreateErr(false);
                    }, 2500);
                });
            }
        });
    }, [history, isClickAdd]);

    const handleChange = (name, e) => {
        switch (name) {
            case 'activity':
                setType();
                setTypeOptions([]);
                break;
            case 'type':
                setStartTime();
                setStartTimeOptions([])
                break;
            case 'startTime':
                if(type?.label === 'Coaching'){
                    if(e){
                        getCoachingItems(e)
                    }else{
                        setPlace();
                        setPlaceType([]);
                        setTypeOfPriority([]);
                        setClientType();
                        setWorkPlace();
                        setClient();
                        setDurationOfActivity();
                    }
                    
                }
                break;
            case 'date':
                if(e){
                    setDate(e._d);
                }else{
                    setDate(null);
                }
                
                setStartTimeOptions([]);
                setStartTime();
                setDurationOfActivity();
                setBusinessUnit();

                setBusinessUnitOptions([]);

                setPlace();
                setPlaceOptions([]);

                setPlaceType([]);
                setPlaceTypeOptions([]);

                setTypeOfPriority([]);
                setTypeOfPriorityOptions([]);

                setClientType();
                setClientTypeOptions([]);

                setZone();
                setZoneOptions([]);

                setEmployee();
                setEmployeeOptions([]);

                setWorkPlace();
                setWorkPlaceOptions([]);

                setClient();
                setClientOptions([]);
                break;
            case 'business':
                setDurationOfActivity();

                setPlace();
                setPlaceOptions([]);

                setPlaceType([]);
                setPlaceTypeOptions([]);

                setTypeOfPriority([]);
                setTypeOfPriorityOptions([]);

                setClientType();
                setClientTypeOptions([]);

                setZone();
                setZoneOptions([]);
                setEmployee();
                setEmployeeOptions([]);
                setWorkPlace();

                setWorkPlaceOptions([]);
                setClient();
                setClientOptions([]);
                break;

            case 'zone':
                setEmployee();
                setEmployeeOptions([]);
                setStartTime();
                setStartTimeOptions([]);
                setDurationOfActivity();
                // setDurationOfActivityOptions([]);
                setPlace();
                setPlaceOptions([]);

                setPlaceType([]);
                setPlaceTypeOptions([]);

                setTypeOfPriority([]);
                setTypeOfPriorityOptions([]);

                setClientType();
                setClientTypeOptions([]);
                setWorkPlace();

                setWorkPlaceOptions([]);
                setClient();
                setClientOptions([]);
                break;
            
            case 'employee':
                setStartTime();
                setStartTimeOptions([]);
                setDurationOfActivity();
                // setDurationOfActivityOptions([]);
                setPlace();
                setPlaceOptions([]);

                setPlaceType([]);
                setPlaceTypeOptions([]);

                setTypeOfPriority([]);
                setTypeOfPriorityOptions([]);

                setClientType();
                setClientTypeOptions([]);
                setWorkPlace();

                setWorkPlaceOptions([]);
                setClient();
                setClientOptions([]);
                break;
            // case 'startTime':
            //     console.log(e)
            //     break;
            case 'place':
                setWorkPlaceOptions([]);
                setWorkPlace();
                break;

            case 'placeType':
                setWorkPlaceOptions([]);
                setWorkPlace();
                break;

            case 'typeOfPriority':
                setWorkPlaceOptions([]);
                setWorkPlace();
                break;
            case 'workPlace':
                setClient();
                setClientOptions([]);
                break;
            case 'clientType':
                setClient();
                setClientOptions([]);
                break;
            default:
                break;
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            {isCreateErr ? (
                <Alert variant="danger" className="mb-3">
                    <div className="visit-acti-error">
                        <span>{t(createErrMessage)}</span>
                    </div>
                </Alert>
            ) : null}
            
            <div style={{ display: 'grid', columnGap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                <SingleSelects
                    label="activity"
                    width={'217px'}
                    options={activityOptions}
                    selectedItems={activity}
                    setSelectedItems={setActivity}
                    isStar={true}
                    handleChange={() => handleChange('activity')}
                />
                <SingleSelects
                    label="type"
                    width={'217px'}
                    options={typeOptions}
                    selectedItems={type}
                    setSelectedItems={setType}
                    isStar={true}
                    handleChange={() => handleChange('type')}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem' }}>
                <div style={{ display: 'grid' }}>
                    <label style={{ marginBottom: '2px' }}>
                        {t('date')} <span style={{ color: 'rgb(250, 92, 124)', marginLeft: '2px' }}>*</span>
                    </label>
                    <DatePicker
                        style={{
                            width: '217px',
                        }}
                        onChange={(e) => handleChange('date', e)}
                        placeholder={t('Select Date')}
                        disabledDate={disabledDate}
                        format="DD/MM/YYYY"
                        separator={
                            <i style={{ color: '#c7c7c7', paddingTop: '3px' }} className="fas fa-arrow-right"></i>
                        }
                        className="wqwhb"
                        defaultValue={moment(date)}
                    />
                </div>
                <div>
                    <SingleSelects
                        label="business unit"
                        width={'217px'}
                        options={businessUnitOptions}
                        selectedItems={businessUnit}
                        setSelectedItems={setBusinessUnit}
                        isStar={true}
                        handleChange={() => handleChange('business')}
                    />
                </div>
            </div>

            <hr />

            {(type && type.label === 'Blind') ||
                (type && type.label === 'Coaching' && (
                    <>
                        <div style={{ display: 'grid', rowGap: '1rem', gridTemplateColumns: '1fr', marginTop: '1rem' }}>
                            <SingleSelects
                                label="zone"
                                width={'100%'}
                                options={zoneOptions}
                                selectedItems={zone}
                                setSelectedItems={setZone}
                                isStar={true}
                                handleChange={() => handleChange('zone')}
                            />
                            <SingleSelects
                                label="employee"
                                width={'100%'}
                                options={emloyeeOptions}
                                selectedItems={employee}
                                setSelectedItems={setEmployee}
                                isStar={true}
                                handleChange={() => handleChange('employee')}
                            />
                        </div>
                    </>
                ))}

            {type && (
                <>
                    <div
                        style={{
                            display: 'grid',
                            columnGap: '1rem',
                            gridTemplateColumns: '1fr 1fr',
                            marginTop: '1rem',
                        }}>
                        <SingleSelects
                            label="start time"
                            width={'217px'}
                            options={type?.value === 4 ? startTimeOptions : startTimeOptions.map((i, index) => ({ value: index, label: i }))}
                            // options={[]}
                            selectedItems={startTime}
                            setSelectedItems={setStartTime}
                            isSortable={false}
                            isStar={true}
                            // disabled={type?.label === 'Coaching'}
                            handleChange={(e) => handleChange('startTime', e)}
                        />
                        <SingleSelects
                            label="duration of each activity"
                            width={'217px'}
                            options={durationOfActivityOptions.map((i, index) => ({ value: index, label: `${i}` }))}
                            selectedItems={durationOfActivity}
                            setSelectedItems={setDurationOfActivity}
                            isSortable={false}
                            isStar={true}
                            disabled={type?.label === 'Coaching'}
                        />
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            columnGap: '1rem',
                            gridTemplateColumns: '1fr 1fr',
                            marginTop: '1rem',
                        }}>
                        <SingleSelects
                            label={header ? header.pl.headerName : 'place'}
                            width={'217px'}
                            options={placeOptions}
                            selectedItems={place}
                            setSelectedItems={setPlace}
                            isStar={true}
                            handleChange={() => handleChange('place')}
                            disabled={type && type?.label === 'Coaching'}
                        />
                        <MultipleSelects
                            label={header ? header.pt.headerName : 'place type'}
                            width={'217px'}
                            options={placeTypeOptions}
                            selectedItems={placeType}
                            setSelectedItems={setPlaceType}
                            isStar={true}
                            handleChange={() => handleChange('placeType')}
                            disabled={type && type?.label === 'Coaching'}
                        />
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            columnGap: '1rem',
                            gridTemplateColumns: '1fr 1fr',
                            marginTop: '1rem',
                        }}>
                        <MultipleSelects
                            label={header ? header.tp.headerName : 'type of priority'}
                            width={'217px'}
                            options={typeOfPriorityOptions}
                            selectedItems={typeOfPriority}
                            setSelectedItems={setTypeOfPriority}
                            isStar={true}
                            handleChange={() => handleChange('typeOfPriority')}
                            disabled={type && type?.label === 'Coaching'}
                        />
                        <SingleSelects
                            label={clientHeader ? clientHeader[0].headerName : 'client type'}
                            width={'217px'}
                            options={clientTypeOptions}
                            selectedItems={clientType}
                            setSelectedItems={setClientType}
                            handleChange={() => handleChange('clientType')}
                            disabled={type && type?.label === 'Coaching'}
                            isStar={place?.value === 1}
                        />
                    </div>

                    <div style={{ display: 'grid', marginTop: '1rem', rowGap: '1rem' }}>
                        <SingleSelects
                            label="work place"
                            width={'100%'}
                            options={workPlaceOptions}
                            selectedItems={workPlace}
                            setSelectedItems={setWorkPlace}
                            isStar={true}
                            handleChange={() => handleChange('workPlace')}
                            disabled={type && type?.label === 'Coaching'}
                        />
                        <SingleSelects
                            label="client"
                            width={'100%'}
                            options={clientOptions}
                            selectedItems={client}
                            setSelectedItems={setClient}
                            disabled={type && type?.label === 'Coaching'}
                            isStar={place?.value === 1}
                        />
                    </div>
                </>
            )}

            {/* {type && type.value === 3 && (
                <Presentation startTime={startTime} startTimeOptions={startTimeOptions} setStartTime={setStartTime}
                    durationOfActivity={durationOfActivity}
                    setDurationOfActivity={setDurationOfActivity}
                    durationOfActivityOptions={durationOfActivityOptions}
                    place={place}
                    setPlace={setPlace}
                    placeOptions={placeOptions}
                    placeType={placeType}
                    setPlaceType={setPlaceType}
                    placeTypeOptions={placeTypeOptions}
                    typeOfPriority={typeOfPriority}
                    setTypeOfPriority={setTypeOfPriority}
                    typeOfPriorityOptions={typeOfPriorityOptions}
                    clientType={clientType}
                    setClientType={setClientType}
                    clientTypeOptions={clientTypeOptions}

                    setButtonDisableStatus={setButtonDisableStatus}
                    isClickAdd={isClickAdd}
                    setIsClickAdd={setIsClickAdd}      
                    activity={activity}
                    type={type}
                    date={date}
                    businessUnit={businessUnit}
                    addDayZero={addDayZero}
                    addMonthZero={addMonthZero}

                    setLoader={setLoader}

                    setCreateErrMessage={setCreateErrMessage}
                    setIsCreateErr={setIsCreateErr}

                    header={header}

                />
            )} */}
        </div>
    );
};

export default Body;
