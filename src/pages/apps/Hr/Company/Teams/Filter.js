import React from 'react'
import { useState } from 'react'
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { Col, Row } from 'react-bootstrap';
import { MultiSelectReact } from '../../../../forms/Basic';
import { useEffect } from 'react';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router';
import Loading from '../../../../../components/Loading';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { filterFunct } from '../../../../../redux/actions';

const Filter = ({tableData,setTableData, isFilters, setIsFilters}) => {

    const history = useHistory();
    const { t } = useTranslation();
    const empId = localStorage.getItem('userEmpId');

    const dispatch = useDispatch();

    //Companies
    const [companies, setCompanies] = useState([]);
    const [selectCompanies, setSelectCompanies] = useState([]);
    const [companiesLoading, setCompaniesLoading] = useState();

    //Business Unite
    const [businessUnite, setbusinessUnite] = useState([]);
    const [selectBusinessUnite, setSelectBusinessUnite] = useState([]);
    const [businessUniteLoading, setBusinessUniteLoading] = useState();

    //Department
    const [department, setDepartment] = useState([]);
    const [selectDepartment, setSelectDepartment] = useState([]);
    const [departmentLoading, setDepartmentLoading] = useState();

    const changeSelect = (name,e) => {
        switch (name) {
            case 'companies':
                return (
                    setSelectCompanies(e),

                    setbusinessUnite([]),
                    setSelectBusinessUnite([]),

                    setDepartment([]),
                    setSelectDepartment([])
                )
            case 'businessUnite':
                return (
                    setSelectBusinessUnite(e),

                    setDepartment([]),
                    setSelectDepartment([])
                )
            case 'department':
                return (
                    setSelectDepartment(e)
                )

            default:
                break;
        }
    }

     
    const applyFilter = () => {

        const body = {
            companyIds:selectCompanies?.map(data =>data.value),
            businessUnitIds:selectBusinessUnite?.map(data =>data.value),
            departmentIds:selectDepartment.map(data => data.value)
        }

        FetchApiPost('services/Hr/Team/ApplyForTeamFilter','POST',body)
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setIsFilters(false);
                            res.json().then(item => {
                                return (
                                    setTableData(item.data.map(data =>(data
                                        // {
                                        //     companies:(
                                        //         <Tippy
                                        //         placement='left'
                                        //         content={
                                        //             <span>
                                        //                 {data.companyName}
                                        //             </span>
                                        //         }
                                        //         >
                                        //             <span>
                                        //             {data.companyName}
                                        //             </span>
                                        //         </Tippy>
                                        //     ),
                                        //     businessUnite:data.businessUnitName,
                                        //     department:(
                                        //         <span
                                        //                 className="task-management-activity-background"
                                        //                 style={{
                                        //                     backgroundColor: data?.department?.color + '50',
                                        //                     color: data?.department?.color,
                                        //                     padding: '3px 6px',
                                        //                     fontSize: '.7rem',
                                        //                     fontWeight: 700,
                                        //                     whiteSpace: 'nowrap',
                                        //                     marginRight: '5px',
                                        //                 }}>
                                        //                 {data?.department?.departmentName}
                                        //             </span>
                                        //     ),          
                                        //     teamName:data.teamName,
                                        //     positions:`+${data.employee?.length}`,
                                        //     hierarchy:(
                                        //         <div className='text-center'>
                                        //         <Icon path={mdiEyeOutline}
                                        //             size={1}
                                        //             color={'#6C757D'}
                                        //         />
                                        //         </div>
                                        //     ),
                                        //     actions: (
                                        //         <Dropdown overlayStyle={{ minWidth: '155px' }} trigger={'click'} overlay={()=>menu(data)} placement="bottom">
                                        //             <i style={{ cursor: 'pointer' }} className="fas fa-ellipsis-v"></i>
                                        //         </Dropdown>
                                        //         // <Dropdown  >
                                        //         //     <Dropdown.Toggle variant="light" id="dropdown-basic">
                                        //         //         <Icon path={mdiDotsVertical}
                                        //         //             size={1}
                                        //         //             color={'#6C757D'}

                                        //         //         />
                                        //         //     </Dropdown.Toggle>
                                        //         //     <Dropdown.Menu className="dropdown-menu-container">
                                        //         //         <Dropdown.Item onClick={() => actions(data, 'edit')}>
                                        //         //             <div className='dropdown-action'>
                                        //         //                 <span>
                                        //         //                     <Icon path={mdiPencil}
                                        //         //                         size={1}
                                        //         //                         color={'#6C757D'}

                                        //         //                     />
                                        //         //                 </span>

                                        //         //                 <span className='action-name'>
                                        //         //                     {t('Edit')}
                                        //         //                 </span>
                                        //         //             </div>

                                        //         //         </Dropdown.Item>
                                        //         //         <Dropdown.Item onClick={() => actions(data, 'delete')}>
                                        //         //             <div className='dropdown-action'>
                                        //         //                 <span>
                                        //         //                     <Icon path={mdiDeleteSweepOutline}
                                        //         //                         size={1}
                                        //         //                         color={'red'}

                                        //         //                     />
                                        //         //                 </span>

                                        //         //                 <span className='action-name'>
                                        //         //                     {t('Delete')}
                                        //         //                 </span>
                                        //         //             </div>
                                        //         //         </Dropdown.Item>
                                        //         //     </Dropdown.Menu>
                                        //         // </Dropdown>
                                        //     )
                                        // }
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

    useEffect(() => {
        setCompaniesLoading(true);
        FetchApiGet(`api/OldSystem/GetCompanies/${empId}`, 'GET')
        .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        setCompaniesLoading(false);
                        res.json().then(item => {
                            setCompanies(item?.map(data => (
                                {
                                    value:data.CompanyId,
                                    label:data.CompanyName
                                }
                            )))
                            setSelectCompanies(item?.map(data => (
                                {
                                    value:data.CompanyId,
                                    label:data.CompanyName
                                }
                            )))
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
    }, [empId, history])

    useEffect(() => {

        if(selectCompanies.length !== 0) {
            setBusinessUniteLoading(true);
            const body = {
                companyIds:selectCompanies?.map(data => data.value)
            }
            FetchApiPost('services/Hr/Team/GetBusinessUnitForTeamFilter','POST',body)
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setBusinessUniteLoading(false);
                            res.json().then(item => {
                                return (
                                    setbusinessUnite(item.data.map(data =>(
                                        {
                                            value:data.businessUnitId,
                                            label:data.businessUnitName
                                        }
                                    ))),
                                    setSelectBusinessUnite(item.data.map(data =>(
                                        {
                                            value:data.businessUnitId,
                                            label:data.businessUnitName
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

        if(selectCompanies.length !== 0 && selectBusinessUnite.length !== 0) {
            setDepartmentLoading(true);
            const body = {
                companyIds:selectCompanies?.map(data => data.value),
                businessUnitIds:selectBusinessUnite?.map(data => data.value)
            }
            FetchApiPost('services/Hr/Team/GetDepartmentsForTeamFilter','POST',body)
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setDepartmentLoading(false);
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
    
      
    }, [history, selectBusinessUnite, selectCompanies])

    useEffect(() => {
      dispatch(filterFunct({
        companyIds:selectCompanies?.map(data =>data.value),
        businessUnitIds:selectBusinessUnite?.map(data =>data.value),
        departmentIds:selectDepartment.map(data => data.value)
      }))
    }, [dispatch, selectBusinessUnite, selectCompanies, selectDepartment])
    

  return (
      <div>
          <Row className='page-filters  mt-2 mb-2'>

              <Col xs={8} sm={9} md={10} className='d-flex flex-wrap multi-select-auto'>
                  <MultiSelectReact
                      options={companies}
                      change={(e) => changeSelect('companies', e)}
                      value={selectCompanies}
                      placeholder={'companies'}
                  />

                  <MultiSelectReact
                      options={businessUnite}
                      change={(e) => changeSelect('businessUnite', e)}
                      value={selectBusinessUnite}
                      placeholder={'business unite'}
                  />

                  <MultiSelectReact
                      options={department}
                      change={(e) => changeSelect('department', e)}
                      value={selectDepartment}
                      placeholder={'department'}
                  />
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

    
          <Loading loading={companiesLoading} />
          <Loading loading={businessUniteLoading} />
          <Loading loading={departmentLoading} />
      </div>
  )
}

export default Filter