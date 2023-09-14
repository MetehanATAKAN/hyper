import React, { useState, useEffect, useMemo } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { allBusinessUnite, allCompany, allPosition, alsModal, ownersBusinessUnite, ownersCompany, ownersPosition, ownersProductZoneorArea } from '../../../../redux/actions';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { MultiSelectLabels, MultiSelectLabelsReact, SelectLabels, Switches2 } from '../../../forms/Basic';
import OwnersTable from './OwnersTable';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';


const OwnersSelect = ({ tableData, setTableData, changeSwitch,exportTableData ,setExportTableData }) => {

  const dispatch = useDispatch();
  const ownersData = useSelector(state => state.ActivityLimit);
  const { alsUpdateData, alsUpdateDisabled } = useSelector(state => state.ActivityLimit);
  const dataMain = useSelector(state => state.ActivityLimit.ownersTableDatas);

 
  const { t }=useTranslation();

  const [dublicateTableData, setDublicateTableData] = useState([]);

 
  // Company
  const [company, setCompany] = useState([])
  const [selectCompany, setSelectCompany] = useState('');

  useEffect(() => {
    FetchApiGet('services/Settings/ActivityOwner/GetCompanies', 'GET')
      .then(response => response.json())
      .then(response => setCompany(response.data.map(company => (
        { 
          value    :   company.companyId, 
          label    :   company.companyName 
        }
      ))))
      .catch(error => console.log(error))
  }, [])
  

  // Business Unite
  const [businessUnite, setBusinessUnite] = useState([]);
  const [selectBusinessUnite, setSelectBusinessUnite] = useState([]);

  const businessUniteBody = useMemo(() => ({
    CompanyId: selectCompany.value,
    Year: Number(ownersData.activityLimitSelectYear)
  }), [ownersData, selectCompany])

  useEffect(() => {
    if (selectCompany !== '') {

      FetchApiPost('services/Settings/ActivityOwner/GetBusinessUnitByCompanyId', 'POST', businessUniteBody)
        .then(response => response.json())
        .then((response) => {
          setBusinessUnite(response.data.map(business => (
            { 
              value   :  business.businessUnitId, 
              label   :  business.businessUnitName 
            }
          )))
          let firstData = response.data.shift();
          setSelectBusinessUnite(
            [
              { 
                value  :  firstData.businessUnitId, 
                label  :  firstData.businessUnitName 
              }
            ]
          )
        })
        .catch(error => console.log(error))
    }
  }, [selectCompany])


  // Position
  const [position, setPosition] = useState([]);
  const [selectPosition, setSelectPosition] = useState([]);

  const positionBody = useMemo(() => ({
    CompanyId: selectCompany.value,
    BusId: selectBusinessUnite !== [] && selectBusinessUnite !== '' ? selectBusinessUnite?.map(data => data.value) : null,
    Year: ownersData.activityLimitSelectYear
  }), [selectBusinessUnite, selectCompany])

  useEffect(() => {

    FetchApiPost('services/Settings/ActivityOwner/GetPositions', 'POST', positionBody)
      .then(response => response.json())
      .then(response => {
        setPosition(response.data.map(position => (
          { value: position.vacancyId, label: position.vacancyName, vacancyId: position.vacancyId, positionId: position.positonId, positionName: position.positionName, businessId: position.businessId, businessName: position.businessName }
        )))
        let firstData = response.data.shift();

        setSelectPosition(
          [{ value: firstData.vacancyId, label: firstData.vacancyName, vacancyId: firstData.vacancyId, positionId: firstData.positonId, positionName: firstData.positionName, businessId: firstData.businessId, businessName: firstData.businessName }]
        )
      })
      .catch(error => console.log(error))

  }, [positionBody])


  // Product Zone Or Area
  const [productZoneOrArea, setProductZoneOrArea] = useState([]);
  const [selectProductZoneOrArea, setSelectProductZoneOrArea] = useState([]);


  const productZoneOrAreaBody = useMemo(() => ({
    CompanyId: selectCompany.value,
    BusId: selectBusinessUnite !== [] && selectBusinessUnite !== '' ? selectBusinessUnite?.map(data => data.value) : null,
    Year: ownersData.activityLimitSelectYear,
    VacancyId: selectPosition !== [] && selectPosition !== '' ? selectPosition?.map(data => data.vacancyId) : null,
    PositionId: selectPosition !== [] && selectPosition !== '' ? selectPosition?.map(data => data.positionId) : null
  }), [selectBusinessUnite, selectCompany, selectPosition])

  useEffect(() => {
    if (selectCompany !== '' && selectBusinessUnite !== '' && selectPosition !== '') {
      FetchApiPost('services/Settings/ActivityOwner/GetProductOrZoneOrArea', 'POST', productZoneOrAreaBody)
        .then(response => response.json())
        .then(response => {
          setProductZoneOrArea(response.data.map(data => (
            { value: data.id, label: data.name, businessId: data.businessId, positionId: data.positionId, vacancyId: data.vacancyId }
          )))

          setSelectProductZoneOrArea([
            ...response.data.map(data => (
              { value: data.id, label: data.name, businessId: data.businessId, positionId: data.positionId, vacancyId: data.vacancyId }
            ))
          ])
        })
        .catch(error => console.log(error))
    }
  }, [productZoneOrAreaBody])

  useEffect(() => {
    dispatch(ownersCompany(selectCompany.label));
  }, [dispatch,selectCompany,tableData])
  


  useEffect(() => {
   
    dispatch(ownersBusinessUnite(selectBusinessUnite.label));
    dispatch(ownersPosition(selectPosition.label));
    dispatch(ownersProductZoneorArea(selectProductZoneOrArea));
    dispatch(allCompany(company));
    dispatch(allBusinessUnite(businessUnite));
    dispatch(allPosition(position));
  }, [company, dispatch, selectBusinessUnite, selectPosition, selectProductZoneOrArea, businessUnite, position])


  const changeSelect = (selectName, e) => {
    switch (selectName) {
      case 'company':
        return (
          setSelectCompany(e),
          setSelectBusinessUnite(''),
          setSelectPosition(''),
          setSelectProductZoneOrArea([]),
          setBusinessUnite([]),
          setPosition([]),
          setProductZoneOrArea([])
        )
      case 'business unite':
        return (
          setSelectBusinessUnite(e),
          setSelectPosition(''),
          setSelectProductZoneOrArea([]),
          setPosition([]),
          setProductZoneOrArea([])
        )
      case 'position':
        return (
          setSelectPosition(e),
          setSelectProductZoneOrArea([]),
          setProductZoneOrArea([])
        )

      default:
        break;
    }
  }

  const [options, setoptions] = useState([
    { value: 23, label: 'A' },
    { value: 24, label: 'B' },
    { value: 25, label: 'C' },
  ])

  const handleChange =  (e,id,data) => {

   
  data.clintCategory=e;

  
  if(dublicateTableData.length === 0) {
    setDublicateTableData([data])
  }
  else {
     dublicateTableData.map(item=>(
      item.id !== data.id
      ?setDublicateTableData(prev=>[...prev,data])
      :null
    ))
  }
  
  }



  

  const MultiSelect =  ({id,data}) => {
    

     setDublicateTableData(prev=>[...prev,data]);

   

   
    return <Select
    isMulti={true}
    options={options}
    onChange={(e)=>handleChange(e,id,data)}
    className="react-select"
    classNamePrefix="react-select"
    placeholder={`${t('Select')}...`}
    menuPortalTarget={document.body} 
    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} 
    />
  }

const mete = () => {
  console.log(tableData);
}
  
console.log(ownersData.activityId,);

  const saveOwners = () => {

    setDublicateTableData([]);

    const ownersBody = {
      Year            :   Number(ownersData.activityLimitSelectYear),
      ActivityId      :   ownersData.activityId,
      CompanyId       :   selectCompany.value,
      CompanyName     :   selectCompany.label,
      BusinessUnit    :   selectBusinessUnite.map(busUnit => (
        { 
          BusinessUnitId      :   busUnit.value, 
          BusinessUnitName    :   busUnit.label 
        }
      )),
      Position: selectPosition.map(position => (
        { 
          VacancyId         :     position.vacancyId, 
          VacancyName       :     position.label, 
          PositonId         :     position.positionId, 
          PositionName      :     position.positionName, 
          BusinessId        :     position.businessId, 
          BusinessName      :     position.businessName 
        }
      )),
      ProductOrZoneOrArea: selectProductZoneOrArea.map(area => (
        { 
          Id              :   area.value, 
          Name            :   area.label, 
          BusinessId      :   area.businessId, 
          VacancyId       :   area.vacancyId, 
          PositionId      :   area.positionId 
        }
      ))
    }

    if (selectCompany !== '' && selectBusinessUnite !== '' && selectPosition !== '') {
      FetchApiPost('services/Settings/ActivityOwner/CreateActivityOwner', 'POST', ownersBody)
        .then(response => response.json())
        .then(response => {
          setTableData(response.data.map(data => (
            { 
              id                        :   data.id, 
              activityId                :   data.activityId, 
              parentId                  :   data.parentId, 
              company                   :   data.companyName, 
              companyId                 :   data.companyId, 
              position                  :   data.positionName, 
              positionId                :   data.positionId, 
              businessUnıte             :   data.businessUnitName, 
              businessUnitId            :   data.businessUnitId, 
              productZoneorArea         :   data.productOrZoneOrAreaName.map(data => (data)), 
              productZoneorAreaId       :   data.productOrZoneOrAreaId.map(data => (data)), 
              client                    :   <MultiSelect id={data.id} data={data}  />, 
              tableClientDatas          :   null , 
              budget                    :   <Switches2 changeSwitch={changeSwitch} switchName={'budget'} disabled={false} id={data.id} checked={data.budget} />, 
              budgetStatus              :   data.budget, 
              kol                       :   <Switches2 changeSwitch={changeSwitch} switchName={'kol'} disabled={false} id={data.id} checked={data.kol} />, 
              kolStatus                 :   data.kol, 
              companyParticipants       :   <Switches2 changeSwitch={changeSwitch} switchName={'company2'} disabled={false} id={data.id} checked={data.companyParticipant} />, 
              companyParticipantsStatus :   data.companyParticipant, 
              guest                     :   <Switches2 changeSwitch={changeSwitch} switchName={'guest'} disabled={false} id={data.id} checked={data.guest} />, 
              guestStatus               :   data.guest 
            }
          )
          ))
          setExportTableData(response.data.map(data => (
            { 
              id                        :   data.id, 
              activityId                :   data.activityId, 
              parentId                  :   data.parentId, 
              company                   :   data.companyName, 
              companyId                 :   data.companyId, 
              position                  :   data.positionName, 
              positionId                :   data.positionId, 
              businessUnıte             :   data.businessUnitName, 
              businessUnitId            :   data.businessUnitId, 
              productZoneorArea         :   data.productOrZoneOrAreaName.map(data => (data)), 
              productZoneorAreaId       :   data.productOrZoneOrAreaId.map(data => (data)), 
              client                    :   <MultiSelect id={data.id} data={data}  />, 
              tableClientDatas          :   null , 
              budget                    :   <Switches2 changeSwitch={changeSwitch} switchName={'budget'} disabled={false} id={data.id} checked={data.budget} />, 
              budgetStatus              :   data.budget, 
              kol                       :   <Switches2 changeSwitch={changeSwitch} switchName={'kol'} disabled={false} id={data.id} checked={data.kol} />, 
              kolStatus                 :   data.kol, 
              companyParticipants       :   <Switches2 changeSwitch={changeSwitch} switchName={'company2'} disabled={false} id={data.id} checked={data.companyParticipant} />, 
              companyParticipantsStatus :   data.companyParticipant, 
              guest                     :   <Switches2 changeSwitch={changeSwitch} switchName={'guest'} disabled={false} id={data.id} checked={data.guest} />, 
              guestStatus               :   data.guest 
            }
          )
          ))
        })
        .then(mete)
        .catch(error => console.log(error))
        
    }
  }

  

  
  const updateOwners = () => {

   

    const updateOwnersBody = {
      ActivityOwnerResponses: tableData.map(item => (
        { 
          ActivityId                :   item.activityId,
          CompanyId                 :   item.companyId,
          BusinessUnitId            :   item.businessUnitId,
          ProductOrZoneOrAreaId     :   item.productZoneorAreaId?.map(data => (data)),
          ProductOrZoneOrAreaName   :   item.productZoneorArea?.map(data => (data)),
          ClintCategory             :   'A',
          Budget                    :   true,
          KOL                       :   false,
          CompanyParticipant        :   true,
          Guest                     :   false
        }
      ))
    }

    FetchApiPost('services/Settings/ActivityOwner/UpdateActivityOwner', 'POST', updateOwnersBody)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  useEffect(() => {

    if(alsUpdateDisabled === true) {
      setTableData(alsUpdateData.activityOwners.map(data=>(
        { 
          id                        :   data.id, 
          activityId                :   data.activityId, 
          parentId                  :   data.parentId, 
          company                   :   data.companyName, 
          companyId                 :   data.companyId, 
          position                  :   data.positionName, 
          positionId                :   data.positionId, 
          businessUnıte             :   data.businessUnitName, 
          businessUnitId            :   data.businessUnitId, 
          productZoneorArea         :   data.productOrZoneOrAreaName.map(data => (data)), 
          productZoneorAreaId       :   data.productOrZoneOrAreaId.map(data => (data)), 
          client                    :   <MultiSelect id={data.id} data={data}  />, 
          tableClientDatas          :   null , 
          budget                    :   <Switches2 changeSwitch={changeSwitch} switchName={'budget'} disabled={false} id={data.id} checked={data.budget} />, 
          budgetStatus              :   data.budget, 
          kol                       :   <Switches2 changeSwitch={changeSwitch} switchName={'kol'} disabled={false} id={data.id} checked={data.kol} />, 
          kolStatus                 :   data.kol, 
          companyParticipants       :   <Switches2 changeSwitch={changeSwitch} switchName={'company2'} disabled={false} id={data.id} checked={data.companyParticipant} />, 
          companyParticipantsStatus :   data.companyParticipant, 
          guest                     :   <Switches2 changeSwitch={changeSwitch} switchName={'guest'} disabled={false} id={data.id} checked={data.guest} />, 
          guestStatus               :   data.guest 
        }
      )))
    }
   
  }, [])
  
  return (
    <div className='owners-selects'>
      <Row>
        <Col sm={12} md={4} > <SelectLabels disabled={false} multi={false} options={company} change={(e) => changeSelect('company', e)} headerName={'company'} value={selectCompany} />  </Col>
        <Col sm={12} md={4} > <MultiSelectLabels options={businessUnite} change={(e) => setSelectBusinessUnite(e)} headerName={'business unit'} value={selectBusinessUnite} />  </Col>
        <Col sm={12} md={4} > <MultiSelectLabels options={position} change={(e) => setSelectPosition(e)} headerName={'position'} value={selectPosition} />  </Col>
      </Row>
      <Row>
        <Col xs={8} > <MultiSelectLabels options={productZoneOrArea} change={(e) => setSelectProductZoneOrArea(e)} headerName={'product/zone or area'} value={selectProductZoneOrArea} />  </Col>
        <Col xs={2}> <h5 style={{ visibility: 'hidden' }}>.</h5> <Button onClick={saveOwners} > {t('add')} </Button> </Col>
      </Row>
      <OwnersTable 
      tableData={tableData} 
      setTableData={setTableData} 
      changeSwitch={changeSwitch}
      exportTableData={exportTableData}
      setExportTableData={setExportTableData}
       />
      <br />
      <hr />

      <div className='text-end'>
        <Button variant="light" onClick={()=>dispatch(alsModal(false))} >
          {t('Cancel')}
        </Button>{' '}
        <Button variant="primary" onClick={updateOwners} >
          {t('Save')}
        </Button>
      </div>
    </div>
  )
}

export default OwnersSelect
