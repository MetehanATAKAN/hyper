import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { SelectLabels } from '../../../forms/Basic';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useDispatch, useSelector } from 'react-redux';
import { activityId, activityLimitYear, alsModal, data, ownersIsDisabled } from '../../../../redux/actions';
import { useTranslation } from 'react-i18next';

const ActivitySelect = () => {

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { alsUpdateData, alsUpdateDisabled } = useSelector(state => state.ActivityLimit);

    console.log(alsUpdateDisabled);

    console.log('updateData =>', alsUpdateData);

    // ALS Activity Update 
    useEffect(() => {
        if(alsUpdateDisabled === true) {
            setSelectYear( {value:alsUpdateData.activities.year , label: alsUpdateData.activities.year} )
            setSelectActivityType( { value:alsUpdateData.activities.activityTypeId , label:alsUpdateData.activities.activityTypeName } )
            setSelectMainProcess( { value:alsUpdateData.activities.mainProcessId , label:alsUpdateData.activities.mainProcessName } )
            setSelectBusinessProcess( { value:alsUpdateData.activities.businessProcessId , label:alsUpdateData.activities.businessProcessName } )
            setSelectParentProcess( { value:alsUpdateData.activities.parentProcessId , label:alsUpdateData.activities.parentProcesssName } )
            setSelectEventLimitationBy( { value:alsUpdateData.activities.eventLimitationBy , label:alsUpdateData.activities.eventLimitationBy } )
        }
    }, [])


    // Year
    const [year, setYear] = useState([
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
    ])
    const [selectYear, setSelectYear] = useState(
        { value: new Date().getFullYear(), label: new Date().getFullYear() }
    );

    console.log('year', selectYear);

    // Activity Type
    const [activityType, setActivityType] = useState([]);
    const [selectActivityType, setSelectActivityType] = useState('');



    useEffect(() => {
        FetchApiGet('services/Settings/ActivitySettings/GetAllActivityTypes', 'GET')
            .then(response => response.json())
            .then(response => setActivityType(response.data.map(activityData => (
                { value: activityData.id, label: activityData.title }
            ))))
            .then(response => response.data?.map(data => (
                setSelectActivityType(
                    { value: data[0].id, label: data[0].title }
                )
            )))
            .catch(error => console.log(error))
    }, [])

    // Main Process
    const [mainProcess, setMainProcess] = useState([]);
    const [selectMainProcess, setSelectMainProcess] = useState('');

    useEffect(() => {
        if (selectActivityType !== '') {
            FetchApiGet(`services/Settings/ActivitySettings/GetMainProcessByActivityTypeId?activityTypeId=${selectActivityType.value}`, 'GET')
                .then(response => response.json())
                .then(async (response) => {
                    await setMainProcess(response.data.map(data => (
                        { value: data.id, label: data.mainProcess }
                    )))
                    let firstData = response.data?.shift();
                    await setSelectMainProcess(
                        { value: firstData.id, label: firstData.mainProcess }
                    )
                })
                .catch(error => console.log(error))
        }
    }, [selectActivityType])

    // Business Process
    const [businessProcess, setbusinessProcess] = useState([]);
    const [selectBusinessProcess, setSelectBusinessProcess] = useState('');

    useEffect(() => {
        if (selectMainProcess !== '') {
            FetchApiGet(`services/Settings/ActivitySettings/GetBusinessProcessByMainProcessId?mainProcessId=${selectMainProcess.value} `, 'GET')
                .then(response => response.json())
                .then((response) => {
                    setbusinessProcess(response.data.map(business => (
                        { value: business.id, label: business.businessProcessTitle }
                    )))
                    let firstData = response.data?.shift();
                    setSelectBusinessProcess(
                        { value: firstData.id, label: firstData.businessProcessTitle }
                    )
                })
                .catch(error => console.log(error))
        }
    }, [selectMainProcess])

    // Parent Process
    const [parentProcess, setParentProcess] = useState([]);
    const [selectParentProcess, setSelectParentProcess] = useState('');

    useEffect(() => {
        if (selectBusinessProcess !== '') {
            FetchApiGet(`services/Settings/ActivitySettings/GetParentProcessByBusinessProcessId?businessProcessId=${selectBusinessProcess.value} `, 'GET')
                .then(response => response.json())
                .then((response) => {
                    setParentProcess(response.data.map(parentProcess => (
                        { value: parentProcess.id, label: parentProcess.title }
                    )))
                    let firstData = response.data?.shift();
                    setSelectParentProcess(
                        { value: firstData.id, label: firstData.title }
                    )
                })
                .catch(error => console.log(error))
        }
    }, [selectBusinessProcess])

    //Event Limitation By

    const [eventLimitationBy, setEventLimitationBy] = useState([
        { value: 'Country', label: 'Country' },
        { value: 'International', label: 'International' },
        { value: 'Zone', label: 'Zone' },
        { value: 'Area', label: 'Area' },
    ])
    const [selectEventLimitationBy, setSelectEventLimitationBy] = useState(
        { value: eventLimitationBy[0].value, label: eventLimitationBy[0].label }
    )


    const [saveClickCount, setSaveClickCount] = useState(0);
    console.log(saveClickCount);
    useEffect(() => {
        dispatch(activityLimitYear(selectYear.label))
    }, [dispatch, selectYear])

    useEffect(() => {
        if (selectYear !== '' && selectActivityType !== '' && selectMainProcess !== '' && selectBusinessProcess !== '' && selectParentProcess !== '') {
            dispatch(ownersIsDisabled(false))
        }
        else {
            dispatch(ownersIsDisabled(true))
        }
    }, [dispatch, selectActivityType, selectBusinessProcess, selectMainProcess, selectParentProcess, selectYear])


    // Change Select 

    const changeSelect = (selectName, e) => {
        switch (selectName) {
            case 'activity type':
                return (
                    setSelectActivityType(e),
                    setSelectMainProcess(''),
                    setSelectBusinessProcess(''),
                    setSelectParentProcess(''),
                    setMainProcess([]),
                    setbusinessProcess([]),
                    setParentProcess([])
                )
            case 'main process':
                return (
                    setSelectMainProcess(e),
                    setSelectBusinessProcess(''),
                    setSelectParentProcess(''),
                    setbusinessProcess([]),
                    setParentProcess([])
                )
            case 'business process':
                return (
                    setSelectBusinessProcess(e),
                    setSelectParentProcess(''),
                    setParentProcess([])
                )
            case 'parent process':
                return (
                    setSelectParentProcess(e)
                )
            default:
                break;
        }
    }

    const activitySave = () => {

        const activityBody = {
            Year: selectYear.label,
            ActivityTypeId: selectActivityType.value,
            ActivityTypeName: selectActivityType.label,
            MainProcessId: selectMainProcess.value,
            MainProcessName: selectMainProcess.label,
            BusinessProcessId: selectBusinessProcess.value,
            BusinessProcessName: selectBusinessProcess.label,
            ParentProcessId: selectParentProcess.value,
            ParentProcesssName: selectParentProcess.label,
            // SubProcessId: selectSubProcess1.value,
            // SubProcessName: selectSubProcess1.label,
            // SecondSubProcessId: selectSubProcess2 !== '' ? selectSubProcess2.value : 0,
            // ThirdSubProcessId: selectSubProcess3 !== '' ? selectSubProcess3.value : 0,
            EventLimitationBy: selectEventLimitationBy.label,
            AutoCalculation: true,
            CheckList: false
        }

        const request = () => {
            return (
                FetchApiPost('services/Settings/ActivitySettings/CreateActivity', 'POST', activityBody)
                    .then(response => response.json())
                    .then(response => dispatch(activityId(response.data.id)))
                    .catch(error => console.log(error))
            )
        }
        if (selectActivityType !== '' && selectMainProcess !== '' && selectBusinessProcess !== '' && selectParentProcess !== '') {
            request();
            setSaveClickCount(saveClickCount + 1);
        }
    }

    const updateActivity = (activityID) => {
         console.log(activityID);
        const activityBody = {
            Id:activityID,
            Year: selectYear.label,
            ActivityTypeId: selectActivityType.value,
            ActivityTypeName: selectActivityType.label,
            MainProcessId: selectMainProcess.value,
            MainProcessName: selectMainProcess.label,
            BusinessProcessId: selectBusinessProcess.value,
            BusinessProcessName: selectBusinessProcess.label,
            ParentProcessId: selectParentProcess.value,
            ParentProcesssName: selectParentProcess.label,
            EventLimitationBy: selectEventLimitationBy.label,
            AutoCalculation: true,
            CheckList: false
        }
        dispatch(activityId(activityID))
        const request = () => {
            return (
                FetchApiPost('services/Settings/ActivitySettings/UpdateActivity', 'POST', activityBody)
                    .then(response => response.json())
                    .then(response => dispatch(activityId(response.data.id)))
                    .catch(error => console.log(error))
            )
        }
        if (selectActivityType !== '' && selectMainProcess !== '' && selectBusinessProcess !== '' && selectParentProcess !== '') {
            request();
            setSaveClickCount(saveClickCount + 1);
        }
    }



    return (
        <div className='activity-select'>
            <Row>
                <Col sm={4}>
                    <SelectLabels
                        disabled={alsUpdateDisabled === true ? true : false}
                        multi={false} options={year}
                        change={(e) => setSelectYear(e)}
                        headerName={'year'}
                        value={selectYear} />
                </Col>
                <Col sm={4}>
                    <SelectLabels
                        disabled={alsUpdateDisabled === true ? true : false}
                        multi={false}
                        options={activityType}
                        change={(e) => changeSelect('activity type', e)}
                        headerName={'activity type'}
                        value={selectActivityType} />
                </Col>
                <Col sm={4}>
                    <SelectLabels
                        disabled={alsUpdateDisabled === true ? true : false}
                        multi={false}
                        options={mainProcess}
                        change={(e) => changeSelect('main process', e)}
                        headerName={'main process'}
                        value={selectMainProcess} />
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <SelectLabels
                        disabled={alsUpdateDisabled === true ? true : false}
                        multi={false}
                        options={businessProcess}
                        headerName={'business process'}
                        value={selectBusinessProcess} />
                </Col>
                <Col sm={4}>
                    <SelectLabels
                        disabled={alsUpdateDisabled === true ? true : false}
                        multi={false}
                        options={parentProcess}
                        change={(e) => changeSelect('parent process', e)}
                        headerName={'process'}
                        value={selectParentProcess} />
                </Col>
                <Col sm={4}>
                    <SelectLabels
                        disabled={false}
                        multi={false}
                        options={eventLimitationBy}
                        change={(e) => setSelectEventLimitationBy(e)}
                        headerName={'event limitation by'}
                        value={selectEventLimitationBy} />
                </Col>
            </Row>
            <hr />
            <div className='text-end'>
                <Button variant="light" onClick={() => dispatch(alsModal(false))} >
                    {t('Cancel')}
                </Button>{' '}

                {
                    alsUpdateDisabled === false
                        ? saveClickCount === 0
                            ?   <Button variant="primary" onClick={activitySave}>
                                {t('Save')}
                                </Button>
                            :   <Button variant="warning" onClick={()=>updateActivity(alsUpdateData.activities.id)}>
                                {t('Update')}
                                </Button>
                        :   <Button variant="warning" onClick={()=>updateActivity(alsUpdateData.activities.id)}>
                            {t('Update')}
                            </Button>
                }
                
            </div>
        </div>
    )
}

export default React.memo(ActivitySelect)