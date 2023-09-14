import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SingleSelects, MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { DatePicker, Checkbox } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// { eventsEndDate, dateInfo, setButtonDisableStatus, isClickAdd, setIsClickAdd }
const NewUpdate = ({ eventId, onSubmitUpdateForm }) => {
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

    const [date, setDate] = useState(null);

    const [businessUnit, setBusinessUnit] = useState();
    const [businessUnitOptions, setBusinessUnitOptions] = useState();

    const [zone, setZone] = useState();
    const [zoneOptions, setZoneOptions] = useState([]);

    const [employee, setEmployee] = useState();
    const [emloyeeOptions, setEmployeeOptions] = useState([]);

    const [startTime, setStartTime] = useState();
    const [startTimeOptions, setStartTimeOptions] = useState([]);

    const [durationOfActivity, setDurationOfActivity] = useState();
    const [durationOfActivityOptions, setDurationOfActivityOptions] = useState([
        15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480,
    ]);

    const [selectedEventId, setSelectedEventId] = useState();

    const [place, setPlace] = useState();
    const [placeOptions, setPlaceOptions] = useState([]);

    const [placeType, setPlaceType] = useState([]);
    const [placeTypeOptions, setPlaceTypeOptions] = useState([]);

    const [header, setHeader] = useState();
    const [clientHeader, setClientHeader] = useState();

    const [companyId, setCompanyId] = useState();

    const [typeOfPriority, setTypeOfPriority] = useState([]);
    const [typeOfPriorityOptions, setTypeOfPriorityOptions] = useState([]);

    const [clientType, setClientType] = useState();
    const [clientTypeOptions, setClientTypeOptions] = useState([]);

    const [workPlace, setWorkPlace] = useState();
    const [workPlaceOptions, setWorkPlaceOptions] = useState([]);

    const [client, setClient] = useState();
    const [clientOptions, setClientOptions] = useState([]);

    const [category, setCategory] = useState(null);

    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (!eventId || !header || !clientHeader || header.length === 0 || clientHeader?.length === 0) return;
        FetchApiGet(`services/Daywork/Event/GetEventById?id=${eventId}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    let t = new Date(data.startDate);
                    let eventHour = String(t.getHours());
                    let eventMunite = String(t.getMinutes());
                    if (eventHour.length === 1) {
                        eventHour = '0' + eventHour;
                    }
                    if (eventMunite.length === 1) {
                        eventMunite = '0' + eventMunite;
                    }

                    getStartTime(new Date(data.startDate), 'firstSelectedItem', `${eventHour}:${eventMunite}`)
                    getBusinessUnit(new Date(data.startDate))
                    
                    setActivity({ value: data.activityId, label: data.activityName });
                    setType({ value: data.activityTypeId, label: data.activityTypeName });
                    setDate(new Date(data.startDate));
                    setBusinessUnit({ value: data.busId, label: data.busName });
                    setZone({ value: data?.workPlace?.zone?.id, label: data?.workPlace?.zone?.name });
                    setEmployee({ value: data.employeeId, label: data.employeeName });
                    
                    // setStartTime({ value: data.id, label: `${eventHour}:${eventMunite}` });
                    let endT = new Date(data.endDate)
                    setDurationOfActivity({ value: durationOfActivityOptions.findIndex(i => i === (endT - t) / (1000 * 60)), label: `${(endT - t) / (1000 * 60)}`})
                
                    setPlace({ value: data.place.id, label: data.place.name })
                    setPlaceType([{ value: data.placeType.id, label: data.placeType.name }])
                    setTypeOfPriority([{ value: data.typeOfPriority.id, label: data.typeOfPriority.name }])
                    setClientType({ value: data.clientType.id, label: data.clientType.name })
                    setWorkPlace({ value: data.workPlace.id, label: data.workPlace.name })
                    setClient({ value: data.client.id, label: `${data.client.name} / ${data.client.specialization.specName} / ${data.client.category}` })

            
                    

                    getWorkPlaceItems(new Date(data.startDate), data.busId)

                    getWorkPlace(data.place.id, [data.placeType.id], [data.typeOfPriority.id])

                    getClient(data.workPlace.id, data.clientType.id)
                });
            }
        });
    }, [eventId, header, clientHeader]);

    const getWorkPlaceItems = (selectedDate, selectedBusinessUnit) => {
        FetchApiPost('services/Organization/Organization/VisitPlanning/GetDefinationForVisitPlanning', 'POST', {
            date: selectedDate,
            businessUnitId: selectedBusinessUnit,
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
            }
        });


        FetchApiPost('services/Organization/Organization/VisitPlanning/GetDefinationForVisitPlanning', 'POST', {
            date: selectedDate,
            businessUnitId: selectedBusinessUnit,
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
            }
        });

        FetchApiPost('services/Organization/Organization/VisitPlanning/GetDefinationForVisitPlanning', 'POST', {
            date: selectedDate,
            businessUnitId: selectedBusinessUnit,
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
            }
        });

        FetchApiPost('services/Organization/Organization/VisitPlanning/GetDefinationForVisitPlanning', 'POST', {
            date: selectedDate,
            businessUnitId: selectedBusinessUnit,
            headerId: clientHeader[0].headerId,
            employeeId: Number(localStorage.getItem('userEmpId')),
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setClientTypeOptions(data.map((p) => ({ value: p.definationId, label: p.definationName })));
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }

    const getWorkPlace = (selectedPlace, selectedPlaceType, selectedTypeOfPriority) => {
        FetchApiPost('services/CRM/WorkPlace/GetWorkPlaceForVisitPlanning', 'POST', {
            employeeId: Number(localStorage.getItem('userEmpId')),
            placeIds: [selectedPlace],
            placeTypeIds: [...selectedPlaceType],
            typeOfPriorityIds: [...selectedTypeOfPriority],
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
    }

    const getClient = (selectedWorkPlace, selectedClient) => {
        FetchApiPost('services/CRM/Client/GetClientForVisitPlanning', 'POST', {
            WorkPlaceId: selectedWorkPlace,
            ClientTypeId: selectedClient,
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
    }

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


    const addDayZero = (selectedDate) => {
        if (selectedDate.getDate() < 10) {
            return '0' + selectedDate.getDate();
        } else {
            return selectedDate.getDate();
        }
    };

    const addMonthZero = (selectedDate) => {
        if (selectedDate.getMonth() < 9) {
            return '0' + (parseInt(selectedDate.getMonth()) + 1);
        } else {
            return selectedDate.getMonth() + 1;
        }
    };

    const getBusinessUnit = (selectedDate, type) => {
        let emp = localStorage.getItem('userEmpId');
        let dateForBus = selectedDate.getFullYear() + '-' + addMonthZero(selectedDate) + '-' + addDayZero(selectedDate);
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
                        if(type === 'change'){
                            getWorkPlaceItems(selectedDate, data[0].BusinessUnitId)
                        }
                    }
                });
            }
        });
    }

    const getStartTime = (selectedDate, type, t = null) => {
        // if (!date || !type || type?.label === 'Coaching') {
        //     // setStartTimeOptions([]);
        //     setStartTime();
        //     return;
        // }
        FetchApiPost('api/OldSystem/GetEmployeeShiftPlanByEmpId', 'POST', {
            empId: Number(localStorage.getItem('userEmpId')),
            date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    let year = new Date().getFullYear();
                    let month = new Date().getMonth() + 1;
                    let day = new Date().getDate();
                    if((Number(year) === selectedDate.getFullYear()) && (Number(month) === (selectedDate.getMonth() + 1)) && (Number(day) === selectedDate.getDate())){
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
                        if(type === 'firstSelectedItem'){
                            let startTimeIndex = controlMunites.findIndex(i => i === t);
                            setStartTime({value: startTimeIndex, label: t})
                        }
                    }else{
                        setStartTimeOptions(data);
                        if(type === 'firstSelectedItem'){
                            let startTimeIndex = data.findIndex(i => i === t);
                            setStartTime({value: startTimeIndex, label: t})
                        }
                    }
                    
                });
            }
        });
    }

    const disabledDate = (current) => {
        return (
            (current && current < moment().startOf('day')) ||
            disabledDays.find((d) => d.getTime() === current._d.setHours(0, 0, 0, 0))
        );
    };

    const handleChange = (name, e) => {
        console.log(e)
        switch (name) {
            case 'activity':
                setType();
                setTypeOptions([]);
                break;
            case 'type':
                setStartTime();
                setStartTimeOptions([]);
                break;
            case 'date':
                    setBusinessUnit();
                    setBusinessUnitOptions([]);
                if (e) {
                    setDate(e._d);
                    getBusinessUnit(new Date(e._d), 'change')
                    getStartTime(new Date(e._d))
                } else {
                    setDate(null);
                    
                }

                setStartTimeOptions([]);
                setStartTime();
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
            case 'business':
                if(e){
                    getWorkPlaceItems(date, e) // date ve business ekle
                }else{
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
                }
                setDurationOfActivity();
                break;
            case 'place':
                if(e){
                    if(placeType.length > 0 && typeOfPriority.length > 0){
                        getWorkPlace(e, placeType.map(i => i.value), typeOfPriority.map(i => i.value))
                    }else{
                        setWorkPlaceOptions([]);
                        setWorkPlace();
                    }
                }else{
                    setWorkPlaceOptions([]);
                    setWorkPlace();
                }
                break;

            case 'placeType':
                if(e.length > 0){
                    if(place && typeOfPriority.length > 0){
                        getWorkPlace(place.value, e, typeOfPriority.map(i => i.value))
                    }else{
                        setWorkPlaceOptions([]);
                        setWorkPlace();
                    }
                }else{
                    setWorkPlaceOptions([]);
                    setWorkPlace();
                }
                
                break;

            case 'typeOfPriority':
                if(e.length > 0){
                    if(place && placeType.length > 0){
                        getWorkPlace(place.value, e, placeType.map(i => i.value))
                    }else{
                        setWorkPlaceOptions([]);
                        setWorkPlace();
                    }
                }else{
                    setWorkPlaceOptions([]);
                    setWorkPlace();
                }
                break;
            case 'workPlace':
                if(e && clientType){
                    getClient(e, clientType.value) // work place, client type
                }else{
                    setClient();
                    setClientOptions([]);
                }
                break;
            case 'clientType':
                if(e && workPlace){
                    getClient(workPlace.value, e) // work place, client type
                }else{
                    setClient();
                    setClientOptions([]);
                }
                break;
            default:
                break;
        }
    };

    // console.log()
    // useEffect(() => {
    //     if(onSubmitUpdateForm){
    //         const body = {
    //             eventId: Number(eventId),
    //             start: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T:${startTime.label}:00.000Z`,
    //             employeeId: Number(localStorage.getItem('userEmpId')),
    //             durationOfEachActivity: Number(durationOfActivity.label),
    //             businessUnitId: Number(businessUnit.value),
    //             businessUnitName: businessUnit.label,
    //             category: client ? client?.label?.split('/')[2].trim() : null
    //         }
    //     }
    // }, [onSubmitUpdateForm])

    console.log(startTimeOptions, startTime)

    const getStartTimeWithTrueIndex = () => {
        if(startTimeOptions.length === 0 || startTime){
            return null
        }else{
            let startTimeIndex = startTimeOptions.findIndex(e => e === startTime.label)
            return {
                value: startTimeIndex,
                label: startTime.label
            }
        }
    }

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
                    disabled={true}
                />
                <SingleSelects
                    label="type"
                    width={'217px'}
                    options={typeOptions}
                    selectedItems={type}
                    setSelectedItems={setType}
                    isStar={true}
                    handleChange={() => handleChange('type')}
                    disabled={true}
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
                        value={date ? moment(new Date(date)) : null}
                        disabled={type && type?.label === 'Coaching'}
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
                        handleChange={(e) => handleChange('business', e)}
                        disabled={type && type?.label === 'Coaching'}
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
                                disabled={type && type?.label === 'Coaching'}
                            />
                            <SingleSelects
                                label="employee"
                                width={'100%'}
                                options={emloyeeOptions}
                                selectedItems={employee}
                                setSelectedItems={setEmployee}
                                isStar={true}
                                handleChange={() => handleChange('employee')}
                                disabled={type && type?.label === 'Coaching'}
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
                            options={
                                type?.value === 4
                                    ? []
                                    : startTimeOptions.map((i, index) => ({ value: index, label: i }))
                            }
                            // options={[]} getStartTimeWithTrueIndex()
                            selectedItems={startTime}
                            setSelectedItems={setStartTime}
                            isSortable={false}
                            isStar={true}
                            handleChange={(e) => handleChange('startTime', e)}
                            disabled={type && type?.label === 'Coaching'}
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
                            handleChange={(e) => handleChange('place', e)}
                            disabled={type && type?.label === 'Coaching'}
                        />
                        <MultipleSelects
                            label={header ? header.pt.headerName : 'place type'}
                            width={'217px'}
                            options={placeTypeOptions}
                            selectedItems={placeType}
                            setSelectedItems={setPlaceType}
                            isStar={true}
                            handleChange={(e) => handleChange('placeType', e)}
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
                            handleChange={(e) => handleChange('typeOfPriority', e)}
                            disabled={type && type?.label === 'Coaching'}
                        />
                        <SingleSelects
                            label={clientHeader ? clientHeader[0].headerName : 'client type'}
                            width={'217px'}
                            options={clientTypeOptions}
                            selectedItems={clientType}
                            setSelectedItems={setClientType}
                            handleChange={(e) => handleChange('clientType', e)}
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
                            handleChange={(e) => handleChange('workPlace', e)}
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
        </div>
    );
};

export default NewUpdate;
