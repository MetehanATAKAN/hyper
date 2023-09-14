import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FormInput } from '../../../../../components';
import { CompulsorySelectLabels, SelectLabels } from '../../../../forms/Basic';
import { useHistory } from 'react-router';
import Loading from '../../../../../components/Loading';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useTranslation } from 'react-i18next';


const Update = ({ show, setShow, data }) => {

    const history = useHistory();
    const { t } = useTranslation(); 

    // Department
    const [department, setDepartment] = useState([]);
    const [selectDepartment, setSelectDepartment] = useState(data && {value:data.department.id,label:data.department.departmentName});

    //Company
    const [company, setCompany] = useState([]);
    const [selectCompany, setSelectCompany] = useState(data && {value:data.companyId,label:data.companyName});
    const [companyLoading, setCompanyLoading] = useState(true);

    //Department Overview
    const [departmentOverview, setDepartmentOverview] = useState(data && data.department.departmentOverview);
  
    //Manager
    const [manager, setManager] = useState([]);
    const [selectManager, setSelectManager] = useState(data && {value:data.manager[0].id,label:data.manager[0].positionName});

    //Upper Department
    const [upperDepartment, setUpperDepartment] = useState([]);
    const [selectUpperDepartment, setSelectUpperDepartment] = useState('');

    //Sub Department
    const [subDepartment, setSubDepartment] = useState([]);
    const [selectSubDepartment, setSelectSubDepartment] = useState('');

    const addDepartment = () => {

        const body = {
            id:data.id,
            companyId: selectCompany?.value,
            companyName: selectCompany?.label,
            departmentId: selectDepartment?.value,
            managerId: selectManager?.value,
            upperDepartmentId: selectUpperDepartment !== '' ? selectUpperDepartment?.value : 0,
            subDepartmentId: selectSubDepartment !== '' ? selectSubDepartment?.value : 0,
            modifiedBy: localStorage.getItem('userName'),
            status:data.status
        }

        FetchApiPost('services/Hr/CompanyDepartment/UpdateCompanyDepartment','POST',body)
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setShow(false);
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

        FetchApiGet('api/OldSystem/GetAllCompanies', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setCompanyLoading(false);
                            res.json().then(item => {
                                return (
                                    setCompany(item.map(data => (
                                        {
                                            value: data.CompanyId,
                                            label: data.CompanyName
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

        FetchApiGet('services/Hr/Department/GetAllDepartments', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(item => {
                                return (
                                    setDepartment(item.data.map(data => (
                                        {
                                            value: data.id,
                                            label: data.departmentName
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
     
        if(selectDepartment !== '') {
            FetchApiGet(`services/Hr/CompanyDepartment/GetDepartmentOverviewById?id=${selectDepartment.value}`,'GET')
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(item => {
                                return (
                                    setDepartmentOverview(item?.data.departmentOverview)
                                    // setDepartment(item.data.map(data => (
                                    //     {
                                    //         value: data.id,
                                    //         label: data.departmentName
                                    //     }
                                    // )))
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

            FetchApiGet(`services/Hr/CompanyDepartment/GetPositionByDepartmentId?id=${selectDepartment.value}`,'GET')
            .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(item => {
                                    return (
                                        setManager(item.data.map ( data =>(
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
    }, [history, selectDepartment])


      // Upper Department 
      useEffect(() => {
      
        if(selectCompany !== '' && selectDepartment !== '') {
            
            const body = {
                companyId       :   selectCompany?.value,
                departmentId    :   selectDepartment?.value
            }

            FetchApiPost('services/Hr/CompanyDepartment/GetUpperDepartments','POST',body)
            .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(item => {
                                    setUpperDepartment(item?.data.map(data =>(
                                        {
                                            value:data.id,
                                            label:data.departmentName
                                        }
                                    )))
                                })
                            }
                            else if (res.status === 500 || res.status === 499) {
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
    }, [history, selectCompany, selectDepartment])

    //Sub Department
    useEffect(() => {
        if(selectCompany !== '' && selectDepartment !== '' && selectUpperDepartment !== '') {
            
            const body = {
                companyId           :   selectCompany?.value,
                departmentId        :   selectDepartment?.value,
                upperDepartmentId   :   selectUpperDepartment?.value
            }

            FetchApiPost('services/Hr/CompanyDepartment/GetSubDepartments','POST',body)
            .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(item => {
                                    setSubDepartment(item?.data.map(data =>(
                                        {
                                            value:data.id,
                                            label:data.departmentName
                                        }
                                    )))
                                })
                            }
                            else if (res.status === 500 || res.status === 499) {
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
    }, [history, selectCompany, selectDepartment, selectUpperDepartment])
    
    


    const changeSelect = (name, e) => {

        switch (name) {
            case 'company':
                return (
                    setSelectCompany(e),

                    setUpperDepartment([]),
                    setSelectUpperDepartment(''),

                    setSubDepartment([]),
                    setSelectSubDepartment('')
                )
            case 'department':
                return (
                    setSelectDepartment(e),

                    setDepartmentOverview(''),

                    setManager([]),
                    setSelectManager('')
                )
            case 'manager':
                return (
                    setSelectManager(e)
                )
            case 'upperDepartment':
                return (
                    setSelectUpperDepartment(e)
                )
            case 'subDepartment':
                return (
                    setSelectSubDepartment(e)
                )
            default:
                break;
        }
    }

    return (
        <div className="process-type-form">
            <Modal show={show} size={'md'} className='add-department'  >
                <Modal.Header closeButton onClick={() => setShow(false)} style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>

                    <h4
                        className="modal-title"
                        style={{
                            color: '#7A7A7A',
                            font: '18px',
                        }}
                    >
                        {t('Update Department')}
                    </h4>

                </Modal.Header>
                <Modal.Body>
                    <CompulsorySelectLabels
                        options={company}
                        headerName={'company'}
                        value={selectCompany}
                        multi={false}
                        disabled={false}
                        change={(e) => changeSelect('company', e)}
                    />

                    <CompulsorySelectLabels
                        options={department}
                        headerName={'department'}
                        value={selectDepartment}
                        multi={false}
                        disabled={false}
                        change={(e) => changeSelect('department', e)}
                    />

                    <label>{t('department overview')}</label>
                    <FormInput
                        type="textarea"
                        name="textarea"
                        containerClass={'mb-2'}
                        key="textarea"
                        value={departmentOverview}
                        onChange={(e) => setDepartmentOverview(e.target.value)}
                        disabled
                    />

                    <SelectLabels
                        options={manager}
                        headerName={'manager'}
                        value={selectManager}
                        multi={false}
                        disabled={false}
                        change={(e) => changeSelect('manager', e)}
                    />

                    <SelectLabels
                        options={upperDepartment}
                        headerName={'upper department'}
                        value={selectUpperDepartment}
                        multi={false}
                        disabled={false}
                        change={(e) => changeSelect('upperDepartment', e)}
                    />

                    <SelectLabels
                        options={subDepartment}
                        headerName={'sub department'}
                        value={selectSubDepartment}
                        multi={false}
                        disabled={false}
                        change={(e) => changeSelect('subDepartment', e)}
                    />

                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#FAFBFE ' }}>
                    <Button
                        className='btn-light'
                        style={{ backgroundColor: '#EBEBEB' }}
                        onClick={() => setShow(false)}
                    >
                        {t('cancel')}
                    </Button>
                    <Button variant="warning" onClick={addDepartment} >
                        {t('update')}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Loading loading={companyLoading} />
        </div>
    )
}

export default Update