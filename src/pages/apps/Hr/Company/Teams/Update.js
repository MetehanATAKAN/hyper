import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router';
import Loading from '../../../../../components/Loading';
import { useTranslation } from 'react-i18next';
import { CompulsorySelectLabels } from '../../../../forms/Basic';
import { MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { useSelector } from 'react-redux';

const Update = ({ show, setShow, data, setTableData }) => {

    const history = useHistory();
    const { t } = useTranslation();
    const [pageNumber, setPageNumber] = useState(0);

    const tableFilter = useSelector(state => state.Need.filterFunct);
    
    const handleClose = () => setShow(false);

    //Companies
    const [companies, setCompanies] = useState([]);
    const [selectCompanies, setSelectCompanies] = useState(data && {
           value:data.companyId,
           label:data.companyName
       });
    const [companiesLoading, setCompaniesLoading] = useState();

    //Business Unite
    const [businessUnite, setbusinessUnite] = useState([]);
    const [selectBusinessUnite, setSelectBusinessUnite] = useState(data && {
                value:data.businessUnitId,
                label:data.businessUnitName
            });
    const [businessUniteLoading, setBusinessUniteLoading] = useState();

    // Team Name
    const [teamName, setTeamName] = useState(data && data.teamName);

    //Department
    const [department, setDepartment] = useState([]);
    const [selectDepartment, setSelectDepartment] = useState(data && {
                value:data.department.id,
                label:data.department.departmentName
            });
    const [departmentLoading, setDepartmentLoading] = useState();

    //Employee
    const [employee, setEmployee] = useState([]);
    const [selectEmployee, setSelectEmployee] = useState(
        data && 
        data.employee.map( data => (
            {
                value:data.employeeId,
                label:data.employeeName
            }
        ))
        );

    console.log(selectEmployee);
    const [employeeLoading, setEmployeeLoading] = useState();

    //Team
    const [team, setTeam] = useState([]);
    const [selectTeam, setSelectTeam] = useState(data && {
                value:data.teamId,
                label:data.teamName
            });
    const [teamLoading, setTeamLoading] = useState();

    //Team Lead
    const [teamLead, setTeamLead] = useState();
    const [selectTeamLead, setSelectTeamLead] = useState(
        data && 
        data.employee.map( data => (
            {
                value:data.employeeId,
                label:data.employeeName
            }
        ))
    );
    const [teamLeadLoading, setTeamLeadLoading] = useState();

    const changeSelect = (name, e) => {
        switch (name) {
            case 'company':
                return (
                    setSelectCompanies(e)
                )
            case 'businessUnite':
                return (
                    setSelectBusinessUnite(e)
                )
            case 'department':
                return (
                    setSelectDepartment(e)
                )
            case 'employee':
                return (
                    setSelectEmployee(e)
                )
            case 'team':
                return (
                    setSelectTeam(e)
                )
            case 'teamLead':
                return (
                    setSelectTeamLead(e)
                )
            default:
                break;
        }
    }

    const updateTeam = () => {
        
        const body = {
            id:data?.teamId,
            teamName: data?.teamName,
            teamLeadId:data?.teamLead?.employeeId,
            companyId: selectCompanies.value,
            companyName: selectCompanies.label,
            businessUnitId: selectBusinessUnite.value,
            businessUnitName: selectBusinessUnite.label,
            departmentId: selectDepartment.value,
            modifiedBy: localStorage.getItem('userName'),
            employee: selectEmployee.map(data => (
                {
                    employeeId: data.value,
                    employeeName: data.label
                }
            ))
        }

        FetchApiPost('services/Hr/Team/UpdateTeam','POST',body)
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setShow(false);
                            FetchApiPost('services/Hr/Team/ApplyForTeamFilter','POST',tableFilter)
                                .then((res) =>
                                        (async () => {
                                            try {
                                                if (res.status === 200) {
                                                    res.json().then(item => {
                                                        return (
                                                            setTableData(item.data.map(data =>(data)))
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
                                    setCompanies(item.map(data => (
                                        {
                                            value :data.CompanyId,
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
                companyId:selectCompanies.value,
                year:new Date().getFullYear()
            }
            FetchApiPost('api/OldSystem/GetBusinessUnitByCompanyId','POST',body)
            .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(item => {
                                      return (
                                          setbusinessUnite(item.map(data =>(
                                            {
                                                value:data.BusinessUnitId,
                                                label:data.BusinessUnitName
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

                  const body2 = {
                    companyIds:[selectCompanies.value],
                }
                FetchApiPost('services/Hr/CompanyDepartment/GetDepartmentsByCompanyIds','POST',body2)
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
        if(selectCompanies !== '') {
            setEmployeeLoading(true);
        FetchApiGet(`api/OldSystem/GetEmpDataByCompanyId?companyId=${data?.companyId}`,'GET')
        .then((res) =>
                          (async () => {
                              try {
                                  if (res.status === 200) {
                                    setEmployeeLoading(false);
                                      res.json().then(item => {
                                          return (
                                              setEmployee(item.map(data =>(
                                                {
                                                    value:data.Id,
                                                    label:data.FullName
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
      }, [data?.companyId, history, selectCompanies])
      

      useEffect(() => {
        if(pageNumber === 2) {
            FetchApiGet('services/Hr/Team/GetAllTeams','GET')
      .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(item => {
                                return (
                                  setTeam(item.data.map(data => (
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
        }
      }, [history, pageNumber])

      useEffect(() => {
        if(pageNumber === 2 && selectTeam !== '') {
            FetchApiGet(`services/Hr/Team/GetEmployeesByTeamId?id=${selectTeam.value} `,'GET')
      .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(item => {
                                return (
                                  setTeamLead(item.data.map(data =>(
                                    {
                                        value:data.employeeId,
                                        label:data.employeeName
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
      }, [history, pageNumber, selectTeam])
      
     
    
    return (
        <div>
            <Modal show={show} size={'md'} onHide={handleClose} className='add-department'  >
                <Modal.Header closeButton  style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>

                    <h4
                        className="modal-title"
                        style={{
                            color: '#7A7A7A',
                            font: '18px',
                        }}
                    >
                      
                        {
                            pageNumber === 0 && t('Update Team')
                        }
                        {
                            pageNumber === 1 && t('Update Team')
                        }
                        {
                            pageNumber === 2 && t('Update Team')
                        }
                    </h4>

                </Modal.Header>
                <Modal.Body>
                    
                    {
                        pageNumber === 0 &&
                        <>
                            <CompulsorySelectLabels
                                options={companies}
                                headerName={'company'}
                                value={selectCompanies}
                                multi={false}
                                disabled={false}
                                change={(e) => changeSelect('company', e)}
                            />

                            <CompulsorySelectLabels
                                options={businessUnite}
                                headerName={'business unite'}
                                value={selectBusinessUnite}
                                multi={false}
                                disabled={false}
                                change={(e) => changeSelect('businessUnite', e)}
                            />

                            <CompulsorySelectLabels
                                options={department}
                                headerName={'department'}
                                value={selectDepartment}
                                multi={false}
                                disabled={false}
                                change={(e) => changeSelect('department', e)}
                            />
                            <div className='d-flex flex-column'>
                                <label>name</label>
                                <input 
                                type={'text'} 
                                style={{ outline: 'none', border: '1px solid #dee2e6', backgroundColor: '#FAFBFE', borderRadius: '4px', height: '38px' }}
                                onChange={(e)=>setTeamName(e.target.value)}
                                value={teamName}
                                 />
                            </div>
                        </>
                    }

                    {
                        pageNumber === 1 &&
                       <>
                       <MultipleSelects
                        options={employee}
                        label={t('employee')}
                        selectedItems={selectEmployee}
                        setSelectedItems={setSelectEmployee}
                        isStar={true}
                        placeholder={'select...'} 
                        width='100%'
                        className={'mb-2'}
                        />
                        </>
                    }

                    {
                        pageNumber === 2 &&
                        <>
                            <CompulsorySelectLabels
                                options={team}
                                headerName={'team'}
                                value={selectTeam}
                                multi={false}
                                disabled={false}
                                change={(e) => changeSelect('team', e)}
                            />

                            <CompulsorySelectLabels
                                options={teamLead}
                                headerName={'team lead'}
                                value={selectTeamLead}
                                multi={false}
                                disabled={false}
                                change={(e) => changeSelect('teamLead', e)}
                            />
                        </>
                    }
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#FAFBFE ' }}>
                    <Button
                        className='btn-light'
                        style={{ backgroundColor: '#EBEBEB' }}
                        onClick={
                           pageNumber === 0
                           ? ()=>setShow(false)
                           : () => setPageNumber(prev => prev -1)
                        }
                    >
                        {t('cancel')}
                    </Button>

                    
                     {
                        pageNumber === 0 &&
                        <Button 
                        variant="primary" 
                        onClick={() => setPageNumber(prev => prev + 1)}
                        disabled={selectCompanies !== '' &&  selectBusinessUnite !== '' && selectDepartment !== '' && teamName !== '' ? false : true}
                         >
                            {t('next')}
                        </Button>
                    }
                    {
                        pageNumber === 1 &&
                        <Button variant="primary" onClick={() =>  setPageNumber(prev => prev + 1)}  >
                            {t('next')}
                        </Button>
                    }
                    {
                        pageNumber === 2 &&
                        <Button 
                        variant="primary" 
                        onClick={updateTeam}
                        disabled={selectTeam !== '' && selectTeamLead !== '' ? false : true}
                         >
                            {t('add')}
                        </Button>
                    } 
                    
                    
                </Modal.Footer>
            </Modal>

            <Loading loading={employeeLoading} />
        </div>
    )
}

export default Update