import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { MultiSelectReact } from '../../../../forms/Basic';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router';

const Filter = ({isFilters,setIsFilters}) => {

    const history = useHistory();

    // Companies
    const [companies, setCompanies] = useState([]);
    const [selectCompanies, setSelectCompanies] = useState([]);
    
    // Bus Unit
    const [busInit, setBusInit] = useState([]);
    const [selectBusUnit, setSelectBusUnit] = useState([]);

    // Team
    const [team, setTeam] = useState([]);
    const [selectTeam, setSelectTeam] = useState([]);

    // Department
    const [department, setDepartment] = useState([]);
    const [selectDepartment, setSelectDepartment] = useState([]);

    // Position
    const [position, setPosition] = useState([]);
    const [selectPosition, setSelectPosition] = useState([]);

    // Region
    const [region, setRegion] = useState([]);
    const [selectRegion, setSelectRegion] = useState([]);

    // Area
    const [area, setArea] = useState([]);
    const [selectArea, setSelectArea] = useState([]);

    // Zone
    const [zone, setZone] = useState([]);
    const [selectZone, setSelectZone] = useState([]);

    const changeSelect = (name,e) => {
        switch (name) {
            case 'companies':
                return(
                    setSelectCompanies(e)
                )
            case 'business unite':
                return(
                    setSelectBusUnit(e)
                )
        
            default:
                break;
        }
    }

    const filters = [
        {
            options:companies,
            change:changeSelect,
            value:selectCompanies,
            placeHolder:'companies'
        },
        {
            options:busInit,
            change:changeSelect,
            value:selectBusUnit,
            placeHolder:'business unite'
        },
        {
            options:team,
            change:changeSelect,
            value:selectTeam,
            placeHolder:'team'
        },
        {
            options:department,
            change:changeSelect,
            value:selectDepartment,
            placeHolder:'department'
        },
        {
            options:position,
            change:changeSelect,
            value:selectPosition,
            placeHolder:'position'
        },
        {
            options:region,
            change:changeSelect,
            value:selectRegion,
            placeHolder:'region'
        },
        {
            options:area,
            change:changeSelect,
            value:selectArea,
            placeHolder:'area'
        },
        {
            options:zone,
            change:changeSelect,
            value:selectZone,
            placeHolder:'zone'
        },
    ]

    const applyFilter = () => {

        const body = {
            companyIds:selectCompanies.map(data =>data.value),
            businessUnitIds:selectBusUnit.map(data =>data.value),
            departmentIds:selectDepartment.map(data =>data.value),
            positionIds:selectPosition.map(data =>data.value),
            regionIds:selectRegion.map(data =>data.value),
            areaIds:selectArea.map(data =>data.value),
            zoneIds:selectZone.map(data =>data.value),
        }

        FetchApiPost('services/Hr/OrganizationPlan/ApplyForOrgPlanFilter','POST',body)
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setIsFilters(false);
                        }
                        else if (res.status === 500) {
                            history.push('/error-500');
                        }
                        else if (res.status === 499) {
                            history.push('/error-500');
                        }
                        else {
                            console.log('hata');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }

    useEffect(() => {
      FetchApiGet('api/OldSystem/GetAllCompanies ','GET')
      .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(item => {
                                return (
                                    setCompanies(item.map(data =>(
                                        {
                                            value:data.CompanyId,
                                            label:data.CompanyName
                                        }
                                    ))),
                                    setSelectCompanies(item.map(data =>(
                                        {
                                            value:data.CompanyId,
                                            label:data.CompanyName
                                        }
                                    )))
                                )
                            })
                        }
                        else if (res.status === 500) {
                            history.push('/error-500');
                        }
                        else if (res.status === 499) {
                            history.push('/error-500');
                        }
                        else {
                            console.log('hata');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }, [history])

    
    useEffect(() => {
        if(selectCompanies.length !== 0) {
            const body = {
                companyIds:selectCompanies.map(data =>data.value),
            }
            FetchApiPost('services/Hr/OrganizationPlan/GetBusinessUnitForOrgPlanFilter','POST',body)
            .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(item => {
                                      return (
                                          setBusInit(item?.data?.map(data =>(
                                              {
                                                  value:data?.businessUnitId,
                                                  label:data?.businessUnitName
                                              }
                                          ))),
                                          setSelectBusUnit(item?.data?.map(data =>(
                                              {
                                                  value:data?.businessUnitId,
                                                  label:data?.businessUnitName
                                              }
                                          )))
                                      )
                                  })
                              }
                              else if (res.status === 500) {
                                  history.push('/error-500');
                              }
                              else if (res.status === 499) {
                                  history.push('/error-500');
                              }
                              else {
                                  console.log('hata');
                              }
      
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )
        }
        
      }, [history, selectCompanies])

    useEffect(() => {
        if(selectCompanies.length !== 0 && selectBusUnit.length !== 0) {
            const body = {
                companyIds:selectCompanies.map(data =>data.value),
                businessUnitIds:selectBusUnit.map(data => data.value)
            }
            FetchApiPost('services/Hr/OrganizationPlan/GetTeamsForOrgPlanFilter','POST',body)
            .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(item => {
                                      return (
                                          setTeam(item.data.map(data =>(
                                            {
                                                value:data.teamId,
                                                label:data.teamName
                                            }
                                          ))),
                                          setSelectTeam(item.data.map(data =>(
                                            {
                                                value:data.teamId,
                                                label:data.teamName
                                            }
                                          )))
                                      )
                                  })
                              }
                              else if (res.status === 500) {
                                  history.push('/error-500');
                              }
                              else if (res.status === 499) {
                                  history.push('/error-500');
                              }
                              else {
                                  console.log('hata');
                              }
      
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )

                  FetchApiPost('services/Hr/OrganizationPlan/GetDepartmentForOrgPlanFilter ','POST',body)
            .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(item => {
                                      return (
                                          setDepartment(item.data.map(data =>(
                                            {
                                                value:data.id,
                                                label:data.departmentName
                                            }
                                          ))),
                                          setSelectDepartment(item.data.map(data =>(
                                            {
                                                value:data.id,
                                                label:data.departmentName
                                            }
                                          )))
                                      )
                                  })
                              }
                              else if (res.status === 500) {
                                  history.push('/error-500');
                              }
                              else if (res.status === 499) {
                                  history.push('/error-500');
                              }
                              else {
                                  console.log('hata');
                              }
      
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )
        }
        
      }, [history, selectBusUnit, selectCompanies])


      useEffect(() => {
        if(selectCompanies.length !== 0 && selectBusUnit.length !== 0 && selectDepartment.length !== 0) {
            const body = {
                companyIds:selectCompanies.map(data =>data.value),
                businessUnitIds:selectBusUnit.map(data => data.value),
                departmentIds:selectDepartment.map(data => data.value)
            }
            FetchApiGet('services/Hr/OrganizationPlan/GetPositionForOrgPlanFilter ','POST',body)
            .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(item => {
                                      return (
                                          setPosition(item.data.map(data =>(
                                            {
                                                value:data.id,
                                                label:data.positionName
                                            }
                                          ))),
                                          setSelectPosition(item.data.map(data =>(
                                            {
                                                value:data.id,
                                                label:data.positionName
                                            }
                                          )))
                                      )
                                  })
                              }
                              else if (res.status === 500) {
                                  history.push('/error-500');
                              }
                              else if (res.status === 499) {
                                  history.push('/error-500');
                              }
                              else {
                                  console.log('hata');
                              }
      
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )
        }
        
      }, [history, selectBusUnit, selectCompanies, selectDepartment])

      useEffect(() => {
        if(selectCompanies.length !== 0 && selectBusUnit.length !== 0 && selectDepartment.length !== 0 && selectPosition.length !==0) {
            const body = {
                companyIds:selectCompanies.map(data =>data.value),
                businessUnitIds:selectBusUnit.map(data => data.value),
                departmentIds:selectDepartment.map(data => data.value),
                positionIds:selectPosition.map(data => data.value)
            }
            FetchApiGet('services/Hr/OrganizationPlan/GetRegionForOrgPlanFilter','POST',body)
            .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(item => {
                                      return (
                                          setRegion(item.data.map(data =>(
                                            {
                                                value:data.id,
                                                label:data.name
                                            }
                                          ))),
                                          setSelectRegion(item.data.map(data =>(
                                            {
                                                value:data.id,
                                                label:data.name
                                            }
                                          )))
                                      )
                                  })
                              }
                              else if (res.status === 500) {
                                  history.push('/error-500');
                              }
                              else if (res.status === 499) {
                                  history.push('/error-500');
                              }
                              else {
                                  console.log('hata');
                              }
      
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )

                  FetchApiGet('services/Hr/OrganizationPlan/GetZoneForOrgPlanFilter ','POST',body)
                  .then((res) =>
                            (async () => {
                                try {
                                    if (res.status === 200) {
                                        res.json().then(item => {
                                            return (
                                                setZone(item.data.map(data =>(
                                                  {
                                                      value:data.id,
                                                      label:data.name
                                                  }
                                                ))),
                                                setSelectZone(item.data.map(data =>(
                                                  {
                                                      value:data.id,
                                                      label:data.name
                                                  }
                                                )))
                                            )
                                        })
                                    }
                                    else if (res.status === 500) {
                                        history.push('/error-500');
                                    }
                                    else if (res.status === 499) {
                                        history.push('/error-500');
                                    }
                                    else {
                                        console.log('hata');
                                    }
            
                                } catch (error) {
                                    console.log('error', error);
                                }
                            })()
                        )
        }
        
      }, [history, selectBusUnit, selectCompanies, selectDepartment, selectPosition])

      

  return (
    <div>
        <Row className='page-filters  mt-2 mb-2'>

<Col xs={8} sm={9} md={10} className='d-flex flex-wrap multi-select-auto'>
    {
        filters.map(data =>(
            <MultiSelectReact
            options={data.options}
            change={(e)=>data.change(data.placeHolder,e)}
            value={data.value}
            placeholder={data.placeHolder}
            />
        ))
    }
</Col>

<Col xs={4} sm={3} md={2} className='buttons'>
    <button onClick={applyFilter}>
        <Icon path={mdiCheck}
            size={1}
            color={'#0ACF97'}
        />
    </button>
    <button>
        <Icon path={mdiDeleteSweepOutline}
            size={1}
            color={'#FA5C7C'}
        />
    </button>
    <button>
        <Icon path={mdiClose}
            size={1}
            color={'#6C757D'}
        />
    </button>
</Col>
</Row>
    </div>
  )
}

export default Filter