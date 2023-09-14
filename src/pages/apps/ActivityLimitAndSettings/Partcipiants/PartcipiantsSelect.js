import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { alsModal, data, participantTableDatas } from '../../../../redux/actions';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { MultiSelectLabels, SelectLabels } from '../../../forms/Basic';
import ParticipiantsTable from './ParticipiantsTable';

const PartcipiantsSelect = ({ tableData, setTableData, exportTableData, setExportTableData }) => {

    const { t }=useTranslation();
    const dispatch = useDispatch()

    const ownersData = useSelector(state => state.ActivityLimit);
    const { alsUpdateData, alsUpdateDisabled } = useSelector(state => state.ActivityLimit);
    const year = useSelector(state => state.ActivityLimit.activityLimitSelectYear);

    console.log(tableData);

    // Company
    const companyDatas = useSelector(state => state.ActivityLimit.allCompany);
    const [company, setCompany] = useState([])
    const [selectCompany, setSelectCompany] = useState('');

    // Owner
    const ownerDatas = useSelector(state => state.ActivityLimit.ownersTableDatas);
    const [owner, setOwner] = useState([])
    const [selectOwner, setSelectOwner] = useState('');


    useEffect(() => {
        FetchApiGet(`services/Settings/ActivityParticipant/GetOwnerListByActivityId?id=${ownersData.activityId}`, 'GET')
            .then(response => response.json())
            .then(response => setOwner(response.data.map(data => (
                { value: data.ownerId, label: data.ownerName }
            ))))
            .catch(error => console.log(error))
    }, [ownersData.activityId, ownerDatas])

    // Participant Type
    useEffect(() => {
        FetchApiGet('services/Settings/ActivityParticipant/GetParticipantTypes', 'GET')
            .then(response => response.json())
            .then(response => setParticipantType(response.data.map(data => (
                { value: data.id, label: data.participantName }
            ))))
            .catch(error => console.log(error))
    }, [])

    const [participantType, setParticipantType] = useState([]);
    const [selectParticipantType, setSelectParticipantType] = useState('');


    // Business Unite
    // Business Unite
    const [businessUnite, setBusinessUnite] = useState([]);
    const [selectBusinessUnite, setSelectBusinessUnite] = useState([]);


    const businessUniteBody = useMemo(() => ({
        CompanyId: selectCompany.value,
        Year: Number(ownersData.activityLimitSelectYear),
        VacencyId: selectOwner.value
    }), [ownersData, selectCompany, selectOwner])

    useEffect(() => {
        if (selectCompany !== '') {

            FetchApiPost('services/Settings/ActivityParticipant/GetBusinessUnitByCompanyIdAndVacancyId', 'POST', businessUniteBody)
                .then(response => response.json())
                .then(response => setBusinessUnite(response.data.map(business => (
                    { value: business.businessUnitId, label: business.businessUnitName }
                ))))
                .catch(error => console.log(error))
        }
    }, [businessUniteBody, selectParticipantType, selectCompany])


    // Position

    const positionBody = useMemo(() => ({
        CompanyId: selectCompany.value,
        BusId: selectBusinessUnite !== [] && selectBusinessUnite !== '' ? selectBusinessUnite?.map(data => data.value) : null,
        VacencyId: selectOwner.value,
        Year: Number(year),
        ParticipantName: selectParticipantType.label
    }), [selectBusinessUnite, selectCompany, selectOwner, selectParticipantType, year])

    useEffect(() => {
        if (selectCompany !== '' && selectBusinessUnite !== '' && selectParticipantType !== '' && year !== undefined)
            FetchApiPost('services/Settings/ActivityOwner/GetPositionList', 'POST', positionBody)
                .then(response => response.json())
                .then(response => setPosition(response.data.map(data => (
                    { value: data.id, label: data.name, vacancyId: data.vacancyId, vacancyName: data.vacancyName, businessId: data.businessId, businessName: data.businessName }
                ))))
                .catch(error => console.log(error))
    }, [positionBody])

    const [position, setPosition] = useState([])
    const [selectPosition, setSelectPosition] = useState([]);

    console.log(position);

    // Area 
    const [productZoneOrArea, setProductZoneOrArea] = useState([]);
    const [selectProductZoneOrArea, setSelectProductZoneOrArea] = useState([]);


    const productZoneOrAreaBody = useMemo(() => ({
        CompanyId: selectCompany.value,
        BusId: selectBusinessUnite !== [] && selectBusinessUnite !== '' ? selectBusinessUnite?.map(data => data.value) : null,
        Year: Number(year),
        PositionId: selectPosition !== [] && selectPosition !== '' ? selectPosition?.map(data => data.value) : null,
        VacancyId: selectPosition !== [] && selectPosition !== '' ? selectPosition?.map(data => data.vacancyId) : null
    }), [selectBusinessUnite, selectCompany, selectPosition, year])

    useEffect(() => {
        if (selectCompany !== '' && selectBusinessUnite !== '' && selectPosition !== '') {
            FetchApiPost('services/Settings/ActivityOwner/GetProductOrZoneOrArea', 'POST', productZoneOrAreaBody)
                .then(response => response.json())
                .then(response => setProductZoneOrArea(response.data.map(data => (
                    { value: data.id, label: data.name, businessId: data.businessId, positionId: data.positionId, vacancyId: data.vacancyId }
                ))))
                .catch(error => console.log(error))
        }
    }, [productZoneOrAreaBody])

    useEffect(() => {
        // setOwner(ownerDatas);
        setCompany(companyDatas);
    }, [ownerDatas, companyDatas])


    const addParticipiantTableData = () => {
        if (selectOwner !== '' && selectCompany !== '' && selectParticipantType !== '' && selectBusinessUnite.length !== 0 && selectPosition.length !== 0) {
            setTableData(prev => [...prev, { id: 1, parentId: null, company: selectCompany.label, position: selectPosition.label, areaorBusinessUnıte: selectProductZoneOrArea.map(data => (`${data.label},`)), performer: <div className='text-center'><i className="fa-solid fa-user-plus"></i></div>, checklist: 'Presentation', delete: <div className='text-center'><i style={{ color: '#FA5C7D' }} className="fa-solid fa-trash-can"></i></div> }])
        }

    }

    const saveParticipant = () => {

        const bodyParticipant = {
            ActivityId: ownersData.activityId,
            CompanyId: selectCompany.value,
            CompanyName: selectCompany.label,
            ParticipantTypeId: selectParticipantType.value,
            ParticipantTypeName: selectParticipantType.label,
            OwnerId: selectOwner.value,
            OwnerName: selectOwner.label,
            BusinessUnit: selectBusinessUnite.map(data => (
                { BusinessUnitId: data.value, BusinessUnitName: data.label }
            )),
            Position: selectPosition !== [] ? selectPosition.map(data => (
                { VacancyId: data.vacancyId, VacancyName: data.vacancyName, PositonId: data.value, PositionName: data.label, BusinessId: data.businessId, BusinessName: data.businessName }
            )) : [],
            ProductOrZoneOrArea: selectProductZoneOrArea !== [] ? selectProductZoneOrArea.map(data => (
                { Id: data.value, Name: data.label, BusinessId: data.businessId, VacancyId: data.vacancyId, PositionId: data.positionId }
            )) : [],
            Year: Number(year)
        }

        FetchApiPost('services/Settings/ActivityParticipant/CreateActivityParticipant  ', 'POST', bodyParticipant)
            .then(response => response.json())
            .then(response =>{
                setTableData(response.data.map(data=>(
                    { 
                        id                              :   data.id, 
                        company                         :   data.companyName,
                        companyId                       :   data.companyId,
                        position                        :   data.positionName, 
                        BusinessUnıte                   :   data.businessUnitName, 
                        businessUnitId                  :   data.businessUnitId, 
                        ownerId                         :   data.ownerId, 
                        vacancyName                     :   data.vacancyName,
                        productZoneArea                 :   data.productOrZoneOrAreaName?.map(data=>(data)), 
                        productOrZoneOrAreaId           :   data.productOrZoneOrAreaId.map(data=>(data)), 
                        productOrZoneOrAreaName         :   data.productOrZoneOrAreaName.map(data=>(data)), 
                        performer                       :   <div className='text-center'><i style={{color:'#DCDEE0'}} className="fa-solid fa-user-plus"></i></div>, 
                        checklist                       :   data.checklist, 
                        delete                          :   <div className='text-center' onClick={()=>deleteItem(data.id)} ><i style={{ color: '#FA5C7D' }} className="fa-solid fa-trash-can"></i></div> 
                    }
                )))
                setExportTableData(response.data.map(data=>(
                    { 
                        id                              :   data.id, 
                        company                         :   data.companyName,
                        companyId                       :   data.companyId,
                        position                        :   data.vacancyName, 
                        BusinessUnıte                   :   data.businessUnitName, 
                        businessUnitId                  :   data.businessUnitId, 
                        ownerId                         :   data.ownerId, 
                        productZoneArea                 :   data.productOrZoneOrAreaName?.map(data=>(data)), 
                        productOrZoneOrAreaId           :   data.productOrZoneOrAreaId.map(data=>(data)), 
                        productOrZoneOrAreaName         :   data.productOrZoneOrAreaName.map(data=>(data)), 
                        performer                       :   <div className='text-center'><i style={{color:'#DCDEE0'}} className="fa-solid fa-user-plus"></i></div>, 
                        checklist                       :   data.checklist, 
                        delete                          :   <div className='text-center' onClick={()=>deleteItem(data.id)} ><i style={{ color: '#FA5C7D' }} className="fa-solid fa-trash-can"></i></div> 
                    }
                )))
            })
            .catch(error => console.log(error))
    }

    
    const updateParticipant = () => {

        const updateParticipantBody = {
            ActivityParticipantResponses: tableData?.map(data => (
                {
                    ActivityId: ownersData.activityId,
                    CompanyId: data.companyId,
                    BusinessUnitId: data.businessUnitId,
                    OwnerId: data.ownerId,
                    ProductOrZoneOrAreaId: data.productOrZoneOrAreaId?.map(data=>(data)),
                    ProductOrZoneOrAreaName: data.productOrZoneOrAreaName?.map(data=>(data)),
                    Performer: true,
                    CheckList: false
                }
            ))
        }

        FetchApiPost('services/Settings/ActivityParticipant/UpdateActivityParticipant','POST',updateParticipantBody)
        .then(response=>response.json())
        .then(response=>console.log(response))
        .catch(error=>console.log(error))
    }

    console.log(tableData);

    const deleteItem = (id) => {
        console.log(id);
        console.log(tableData);
        let arr =tableData.filter(data=>(data.id !== id));
        console.log(arr);
        setTableData(arr);
    }

    useEffect(() => {
      dispatch(participantTableDatas(tableData))
    }, [dispatch, tableData])

    useEffect(() => {
     if(alsUpdateDisabled === true) {
        setTableData(alsUpdateData.activityPartcipiants.map(data=>(
            { 
                id                              :   data.id, 
                company                         :   data.companyName,
                companyId                       :   data.companyId,
                position                        :   data.positionName, 
                BusinessUnıte                   :   data.businessUnitName, 
                businessUnitId                  :   data.businessUnitId, 
                ownerId                         :   data.ownerId, 
                vacancyName                     :   data.vacancyName,
                productZoneArea                 :   data.productOrZoneOrAreaName?.map(data=>(data)), 
                productOrZoneOrAreaId           :   data.productOrZoneOrAreaId.map(data=>(data)), 
                productOrZoneOrAreaName         :   data.productOrZoneOrAreaName.map(data=>(data)), 
                performer                       :   <div className='text-center'><i style={{color:'#DCDEE0'}} className="fa-solid fa-user-plus"></i></div>, 
                checklist                       :   data.checklist, 
                delete                          :   <div className='text-center' onClick={()=>deleteItem(data.id)} ><i style={{ color: '#FA5C7D' }} className="fa-solid fa-trash-can"></i></div> 
            }
        )))
     }
    }, [])
    
    

    return (
        <div className='partcipiants-selects'>
            <Row>
                <Col sm={12} md={4} > <SelectLabels multi={false} options={owner} change={(e) => setSelectOwner(e)} headerName={'owner'} value={selectOwner} />  </Col>
                <Col sm={12} md={4} > <SelectLabels multi={false} options={company} change={(e) => setSelectCompany(e)} headerName={'company'} value={selectCompany} />  </Col>
                <Col sm={12} md={4} > <SelectLabels multi={false} options={participantType} change={(e) => setSelectParticipantType(e)} headerName={'participant type'} value={selectParticipantType} />  </Col>
            </Row>

            <Row>
                <Col sm={12} md={4} xl={2} > <MultiSelectLabels options={businessUnite} change={(e) => setSelectBusinessUnite(e)} headerName={'business unit'} value={selectBusinessUnite} />  </Col>
                <Col sm={12} md={4} xl={2} > <MultiSelectLabels options={position} change={(e) => setSelectPosition(e)} headerName={'position'} value={selectPosition} />  </Col>
                <Col sm={12} md={4} xl={4} > <MultiSelectLabels options={productZoneOrArea} change={(e) => setSelectProductZoneOrArea(e)} headerName={'product/zone or area'} value={selectProductZoneOrArea} /> </Col>
                <Col sm={12} md={4} xl={2}> <h5 style={{ visibility: 'hidden' }}>.</h5> <Button onClick={saveParticipant} > {t('add')} </Button> </Col>
            </Row>
            <ParticipiantsTable 
            tableData={tableData} 
            setTableData={setTableData}
            exportTableData={exportTableData}
            setExportTableData={setExportTableData}
            />
            <div className='text-end'>
                <Button variant="light" onClick={()=>dispatch(alsModal(false))}>
                    {t('Cancel')}
                </Button>{' '}
                <Button variant="primary" onClick={updateParticipant} >
                    {t('Save')}
                </Button>
            </div>
        </div>
    )
}

export default PartcipiantsSelect