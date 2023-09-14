import React, { useState, useEffect } from 'react';
import { SingleSelects, MultipleSelects } from '../../../../components/GlobalNew/Selects';
import { useSelector } from 'react-redux';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
const Presentation = ({
    startTime,
    setStartTime,
    startTimeOptions,
    durationOfActivity,
    durationOfActivityOptions,
    setDurationOfActivity,
    place,
    setPlace,
    placeOptions,
    placeTypeOptions,
    placeType,
    setPlaceType,
    typeOfPriority,
    setTypeOfPriority,
    typeOfPriorityOptions,
    clientTypeOptions,
    setClientType,
    clientType,

    setButtonDisableStatus,
    isClickAdd,
    setIsClickAdd,

    type,
    date,
    businessUnit,
    activity,

    addDayZero,
    addMonthZero,

    setLoader,
    setCreateErrMessage,
    setIsCreateErr,
    header
}) => {
    const history = useHistory(); 

    const [workPlace, setWorkPlace] = useState();
    const [workPlaceOptions, setWorkPlaceOptions] = useState([]);

    const [client, setClient] = useState();
    const [clientOptions, setClientOptions] = useState([])

    useEffect(() => {
        setWorkPlaceOptions([]);
        setWorkPlace();
        if(typeOfPriority.length === 0 || !place || placeType.length === 0) return;

        setLoader(true)
        
        FetchApiPost('services/CRM/WorkPlace/GetWorkPlaceForVisitPlanning', 'POST', {
            employeeId: Number(localStorage.getItem('userEmpId')),
            placeIds: [place.value],
            placeTypeIds: [...placeType.map(i => i.value)],
            typeOfPriorityIds: [...typeOfPriority.map(i => i.value)]
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setLoader(false)
                    setWorkPlaceOptions(data.map(i => ({ value: i.id, label: i.name })))
                    if(data.length === 1){
                        setWorkPlace({ value: data[0].id, label: data[0].name })
                    }
                })
            }
        })
    }, [typeOfPriority, place, placeType])

    useEffect(() => {
        setClient();
        setClientOptions([]);
        if(!workPlace || !clientType) return
        FetchApiPost('services/CRM/Client/GetClientForVisitPlanning', 'POST', {
            WorkPlaceId: workPlace.value,
            ClientTypeId: clientType.value,
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setClientOptions(data.map(item => ({ value: item.id, label: item.name })))
                })
            }
        })
    }, [workPlace, clientType])

    useEffect(() => {
        if(!place || placeType.length === 0 || typeOfPriority.length === 0 || !workPlace || !type || !date || !businessUnit || !startTime || !durationOfActivity){
            setButtonDisableStatus(true)
        }else{
            setButtonDisableStatus(false)
        }
    }, [place, placeType, typeOfPriority, workPlace, type, date, businessUnit, startTime, durationOfActivity])

    useEffect(() => {
        if(!isClickAdd) return;

        const body = {
            activityTypeId: activity.value,
            employeeId: Number(localStorage.getItem('userEmpId')),
            employeeName: (localStorage.getItem('userName')),
            businessUnitId: businessUnit.value,
            businessUnitName: businessUnit.label,
            creatorId: Number(localStorage.getItem('userEmpId')),
            creatorName: (localStorage.getItem('userName')),
            start: date.getFullYear() +
            '-' +
            addMonthZero(date) +
            '-' +
            addDayZero(date) +
            'T' +
            startTime.label +
            ':00.296Z',
            end: "2023-05-12T12:08:33.183Z",
            workPlaceId: workPlace.value,
            workPlaceName: workPlace.label,
            clientId: client ? client.value : 0,
            clientName: client ? client.label : "",
            durationOfEachActivity: Number(durationOfActivity.label)
        }

        FetchApiPost('services/daywork/Event/CreateEvent', 'POST' ,body)
            .then(res => {
                if(res.status === 201){
                    window.location.reload();
                }else if(res.status === 500 || res.status === 502){
                    history.push('/error-500');
                }
                else{
                    res.json().then(({ errors }) => {
                        setIsClickAdd(false);
                        setIsCreateErr(true);
                        setCreateErrMessage(errors[0])
                        setTimeout(() => {
                            setIsCreateErr(false);
                        }, 2500);
                    })
                }
            })
    }, [history, isClickAdd])

    return (
        <div>
            <hr />
            <div style={{ display: 'grid', columnGap: '1rem', gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
                <SingleSelects
                    label="start time"
                    width={'217px'}
                    options={startTimeOptions.map((i, index) => ({ value: index, label: i }))}
                    selectedItems={startTime}
                    setSelectedItems={setStartTime}
                    isSortable={false}
                    isStar={true}
                />
                <SingleSelects
                    label="duration of each activity"
                    width={'217px'}
                    options={durationOfActivityOptions.map((i, index) => ({ value: index, label: `${i}` }))}
                    selectedItems={durationOfActivity}
                    setSelectedItems={setDurationOfActivity}
                    isSortable={false}
                    isStar={true}
                />
            </div>

            <div style={{ display: 'grid', columnGap: '1rem', gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
                <SingleSelects
                    label={header ? header.pl.headerName : 'place'}
                    width={'217px'}
                    options={placeOptions}
                    selectedItems={place}
                    setSelectedItems={setPlace}
                    isStar={true}
                />
                <MultipleSelects
                    label={header ? header.pt.headerName : 'place type'}
                    width={'217px'}
                    options={placeTypeOptions}
                    selectedItems={placeType}
                    setSelectedItems={setPlaceType}
                    isStar={true}
                />
            </div>

            <div style={{ display: 'grid', columnGap: '1rem', gridTemplateColumns: '1fr 1fr', marginTop: '1rem' }}>
                <MultipleSelects
                    label={header ? header.tp.headerName : "type of priority"}
                    width={'217px'}
                    options={typeOfPriorityOptions}
                    selectedItems={typeOfPriority}
                    setSelectedItems={setTypeOfPriority}
                    isStar={true}
                />
                <SingleSelects
                    label={header ? header.ct.headerName : 'client type'}
                    width={'217px'}
                    options={clientTypeOptions}
                    selectedItems={clientType}
                    setSelectedItems={setClientType}
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
                />
                <SingleSelects
                    label="client"
                    width={'100%'}
                    options={clientOptions}
                    selectedItems={client}
                    setSelectedItems={setClient}
                />
            </div>

        </div>
    );
};

export default Presentation;
