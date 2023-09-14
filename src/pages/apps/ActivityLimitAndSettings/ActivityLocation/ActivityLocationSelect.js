import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { alsModal } from '../../../../redux/actions';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { SelectLabels } from '../../../forms/Basic';

const ActivityLocationSelect = () => {

    const {
        activityLocationData ,
        activityId,
        ownersTableDataMain,
        activityLimitSelectYear,
        participantTableDatas
    } = useSelector(state=>state.ActivityLimit) ;


   
    const dispatch = useDispatch();
    const { t } = useTranslation();

    //area
    const [area, setArea] = useState([
        { value: 'area', label: 'area' }
    ])
    const [selectArea, setSelectArea] = useState('');


    //zone
    const [zone, setZone] = useState([
        { value: 'zone', label: 'zone' }
    ])
    const [selectZone, setSelectZone] = useState('');

    //clinic or pharmacy
    const [clinic, setClinic] = useState([
        { value: 'clinic pharmacy', label: 'clinic pharmacy' }
    ])
    const [selectClinic, setSelectClinic] = useState('');

    //pharmacy
    const [pharmacy, setPharmacy] = useState([
        { value: 'pharmacy', label: 'pharmacy' }
    ])
    const [selectPharmacy, setSelectPharmacy] = useState('');

    //application
    const [application, setApplication] = useState([
        { value: 'application', label: 'application' }
    ])
    const [selectApplication, setSelectApplication] = useState('');

    //other location
    const [otherLocation, setOtherLocation] = useState(null);
    

    //office
    const [office, setOffice] = useState([
        { value: 'office', label: 'office' }
    ])
    const [selectOffice, setSelectOffice] = useState('');



    const updateActivityLocation = () => {

        const activityLocationBody = {
             ActivityId                 :       activityId,
             ActivityLocationType       :       activityLocationData,
             OfficeId                   :       activityLocationData === 1 ? selectOffice.value : 0,
             OfficeName                 :       activityLocationData === 1 ? selectOffice.label : null,
             ApplicationId              :       activityLocationData === 2 ? selectApplication.value : 0,
             ApplicationName            :       activityLocationData === 2 ? selectApplication.label : null,   
             AreaId                     :       (activityLocationData === 3 || activityLocationData === 4) ? selectArea.value : 0,
             AreaName                   :       (activityLocationData === 3 || activityLocationData === 4) ? selectArea.label : null,
             ZoneId                     :       (activityLocationData === 3 || activityLocationData === 4) ? selectZone.value : 0,
             ZoneName                   :       (activityLocationData === 3 || activityLocationData === 4) ? selectZone.label : null,
             ClinicOrPharmacy           :       activityLocationData === 3 ? selectClinic.value : activityLocationData === 4 ? selectPharmacy.value : 0 ,
             OtherLocation              :       otherLocation
        }

        FetchApiPost('services/Settings/ActivityLocation/CreateActivityLocation', 'POST', activityLocationBody)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error => console.log(error))
        
    }

    useEffect(() => {

        // Application
        FetchApiGet('services/Settings/ActivityLocation/GetActivityLocationOnlineList', 'GET')
            .then(response => response.json())
            .then(response => setApplication(response.data.map(item => (
                { value: item.id, label: item.name }
            ))))
            .catch(error => console.log(error))
    }, [])


    useEffect(() => {
        // Office

        const officeBody = {
            CompId: ownersTableDataMain.map(item => (
                item.companyId
            ))
        }

        FetchApiPost('services/Settings/ActivityLocation/GetOfficeLocationListByCompanyId', 'POST', officeBody)
            .then(response => response.json())
            .then(response => setOffice(response.data.map(item => (
                { value: item.companyId, label: item.companyName + ' / ' + item.companyAdress }
            ))))
            .catch(error => console.log(error))
    }, [ownersTableDataMain])

    // area
    useEffect(() => {
        if (activityId !== 0 && participantTableDatas.length !== 0) {
            FetchApiGet(`services/Settings/ActivityLocation/GetClinicAreaLocationByActivityId?id=${activityId}`, 'GET')
                .then(response => response.json())
                .then(response => setArea(response.data.map(item => (
                    {
                        value       : item.id,
                        label       : item.name,
                        businessId  : item.businessId,
                        year        : item.year,
                    }
                ))))
                .catch(error => console.log(error))
        }
    }, [activityId, participantTableDatas])

    // zone

    useEffect(() => {
        if (selectArea !== '') {
            FetchApiGet(`services/Settings/ActivityLocation/GetClinicZoneLocationByAreaId?id=${selectArea.value}`, 'GET')
                .then(response => response.json())
                .then(response => setZone(response.data.map(item => (
                    {
                        value       : item.id,
                        label       : item.name,
                        businessId  : item.businessId,
                        year        : item.year,
                    }
                ))))
                .catch(error => console.log(error))
        }
    }, [selectArea])

    // clinic

    useEffect(() => {
        if (selectZone !== '') {
            const clinicBody = {
                ZoneId  : selectZone.value,
                BusId   : selectZone.businessId,
                Year    : activityLimitSelectYear,
            }
            FetchApiPost('services/Settings/ActivityLocation/GetClinicLocation', 'POST', clinicBody)
                .then(response => response.json())
                .then(response => setClinic(response.data.map(item=>(
                    {
                        value           : item.clinicId,
                        label           : item.clinicName,
                        clinicAddress   : item.clinicAddress,
                        clinicCity      : item.clinicCity,
                        orgTypeId       : item.orgTypeId,
                    }
                ))))
                .catch(error => console.log(error))
        }
    }, [selectZone, activityLimitSelectYear])


    // pharmacy

    useEffect(() => {
        if (selectZone !== '') {
            FetchApiGet(`services/Settings/ActivityLocation/GetPharmacyLocation?id=${selectZone.value}`, 'GET')
                .then(response => response.json())
                .then(response => setPharmacy(response.data.map(item=>(
                    {
                        value           : item.pharmacyId,
                        label           : item.pharmacyName + ' / ' + item.pharmacyAddress,
                        pharmacyAddress : item.pharmacyAddress,
                    }
                ))))
                .catch(error => console.log(error))
        }
    }, [selectZone])

    return (
        <div>
            {
                activityLocationData === 3 ||  activityLocationData === 4

                    ? <Row>
                        <Col sm={12} md={4} > <SelectLabels disabled={false} multi={false} options={area} change={(e) => setSelectArea(e)} headerName={'area'} value={selectArea} />  </Col>
                        <Col sm={12} md={4} > <SelectLabels disabled={false} multi={false} options={zone} change={(e) => setSelectZone(e)} headerName={'zone'} value={selectZone} />  </Col>
                        {
                            activityLocationData === 3
                                ? <Col sm={12} md={4} > <SelectLabels disabled={false} multi={false} options={clinic} change={(e) => setSelectClinic(e)} headerName={'clinic'} value={selectClinic} />  </Col>
                                : <Col sm={12} md={4} > <SelectLabels disabled={false} multi={false} options={pharmacy} change={(e) => setSelectPharmacy(e)} headerName={'pharmacy'} value={selectPharmacy} />  </Col>
                        }
                    </Row>
                    : null
            }


            {
                activityLocationData === 2 
                    ? <Row>
                        <Col sm={12} md={4} > <SelectLabels disabled={false} multi={false} options={application} change={(e) => setSelectApplication(e)} headerName={'application'} value={selectApplication} />  </Col>
                    </Row>
                    : null
            }

            {
                activityLocationData === 5 
                    ? <Row>
                        <Col sm={12} md={4} > 
                        <Form.Label>{t('other location')}</Form.Label>
                        <Form.Control
                        type='text'
                        onChange={(e)=>setOtherLocation(e.target.value)}
                        />
                            {/* <SelectLabels disabled={false} multi={false} options={otherLocation} change={(e) => setSelectOtherLocation(e)} headerName={'other location'} value={selectOtherLocation} />   */}
                        </Col>
                    </Row>
                    : null
            }

            {
                activityLocationData === 1 
                    ? <Row>
                        <Col sm={12} md={4} > <SelectLabels disabled={false} multi={false} options={office} change={(e) => setSelectOffice(e)} headerName={'office'} value={selectOffice} />  </Col>
                    </Row>
                    : null
            }

            <hr />
            <div className='text-end'>
                <Button variant="light" onClick={()=>dispatch(alsModal(false))}>
                {t('Cancel')}
                </Button>{' '}
                <Button variant="primary" onClick={updateActivityLocation} >
                    {t('Save')}
                </Button>
            </div>
        </div>
    )
}

export default ActivityLocationSelect