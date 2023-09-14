import React from 'react'
import { Col, Dropdown, Form, Row } from 'react-bootstrap'
import { MultiSelectReact } from '../../../../forms/Basic'
import { 
    mdiCheck, 
    mdiDeleteSweepOutline, 
    mdiClose, 
    mdiEyeOutline,
    mdiPencil,
    mdiDotsVertical
 } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router';
import Update from './Update';
import Delete from './Delete';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useTranslation } from 'react-i18next';

const Filter = ({tableData, setTableData ,isFilters , setIsFilters}) => {

    const { RangePicker } = DatePicker;
    const history = useHistory();
    const { t } = useTranslation();

    const empId = localStorage.getItem('userEmpId');

    //Companies
    const [companies, setCompanies] = useState([]);
    const [selectCompanies, setSelectCompanies] = useState([]);

    //Departments
    const [departments, setDepartments] = useState([]);
    const [selectDepartments, setSelectDepartments] = useState([]);

    //Positions
    const [positions, setPositions] = useState([]);
    const [selectPositions, setSelectPositions] = useState([]);

    // Start and End Date
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);

    const [updateModal, setUpdateModal] = useState(false);
  const [tableItem, setTableItem] = useState(null);
  console.log(tableItem);

  const [deleteModal, setDeleteModal] = useState(false);

    const onChangeDate = (dates) => {
        if (dates) {
            const [start, end] = dates;
            setStartDate(moment(start).format());
            setEndDate(moment(end).format());
        } else {
            setStartDate([]);
            setEndDate([]);
        }
    };

    const changeSelect = (name, e) => {
        switch (name) {
            case 'companies':
                return (
                    setSelectCompanies(e),

                    setDepartments([]),
                    setSelectDepartments([]),

                    setPositions([]),
                    setSelectPositions([])
                )
            case 'departments':
                return (
                    setSelectDepartments(e),

                    setPositions([]),
                    setSelectPositions([])
                )
            case 'positions':
                return (
                    setSelectPositions(e)
                )

            default:
                break;
        }
    }

    const actions = (data, name) => {
        console.log(tableData);
        console.log(data);
        if (name === 'edit') {
          setUpdateModal(true);
          setTableItem(data);
        }
        else if (name === 'delete') {
          setDeleteModal(true);
          setTableItem(data);
        }
    
      }

      const mete = (data,status) => {
        console.log(data);
        console.log(status);
      }

    const applyFilter = () => {
        const body ={
            companyIds: selectCompanies.map(data => data.value),
              departmentIds:selectDepartments.map(data => data.value),
              positionIds:selectPositions.map(data => data.value) ,
              startDate: startDate.length === 0 ? '1999-01-01T00:00:00.000Z' : startDate,
              endDate: endDate.length === 0 ? '1999-01-01T00:00:00.000Z' : endDate
        }

        FetchApiPost('services/Hr/CompanyDepartment/ApplyForCompanyDepartmentFilter ','POST',body)
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setIsFilters(false);
                            res.json().then(item => {
                                return (
                                    setTableData(item.data.map(data =>(
                                        {
                                            id:data.id,
                                            companies:(
                                                <Tippy
                                                placement='left'
                                                content={
                                                    <span>
                                                        {data.companyName}
                                                    </span>
                                                }
                                                >
                                                    <span>
                                                    {data.companyName}
                                                    </span>
                                                </Tippy>
                                            ) ,
                                            departments: data.department.departmentName,
                                            responsible: (
                                                <span
                                                        className="task-management-activity-background"
                                                        style={{
                                                            backgroundColor: data?.department.color + '50',
                                                            color: data?.department.color,
                                                            padding: '3px 6px',
                                                            fontSize: '.7rem',
                                                            fontWeight: 700,
                                                            whiteSpace: 'nowrap',
                                                            marginRight: '5px',
                                                        }}>
                                                        {data?.department?.abbreviation}
                                                    </span>
                                            ),
                                            status: (
                                                <div className='text-center'>
                                                    <Form.Check
                                                        type="switch"
                                                        id="custom-switch"
                                                        defaultChecked={data.status}
                                                        onChange={()=>mete(data,!data.status)}
                                                    />
                                                </div>
                                            ),
                                            statusValue:data.status,
                                            startDate:data.startDate,
                                            endDate:data.endDate,
                                            departmentOverview:(
                                                <Tippy
                                                placement='bottom'
                                                content={
                                                    <span>
                                                        {data.department.departmentOverview}
                                                    </span>
                                                }
                                                >
                                                    <span>
                                                    {data.department.departmentOverview}
                                                    </span>
                                                </Tippy>
                                            ),
                                            upperDepartment:data.upperDepartment === [] ? '-' : data.upperDepartment.map(data =>(
                                                <span
                                                className="task-management-activity-background"
                                                style={{
                                                    backgroundColor: data?.color + '50',
                                                    color: data?.color,
                                                    padding: '3px 6px',
                                                    fontSize: '.7rem',
                                                    fontWeight: 700,
                                                    whiteSpace: 'nowrap',
                                                    marginRight: '5px',
                                                }}>
                                                {data?.abbreviation}
                                            </span>
                                            )),
                                            subDepartment:data.subDepartment === [] ? '-' : data.subDepartment.map(data =>(
                                                <span
                                                className="task-management-activity-background"
                                                style={{
                                                    backgroundColor: data?.color + '50',
                                                    color: data?.color,
                                                    padding: '3px 6px',
                                                    fontSize: '.7rem',
                                                    fontWeight: 700,
                                                    whiteSpace: 'nowrap',
                                                    marginRight: '5px',
                                                }}>
                                                {data?.abbreviation}
                                            </span>
                                            )),
                                            positions:(
                                                <Tippy
                                                placement='left'
                                                content={
                                                    <span>
                                                        {data.manager.map(data =>data.positionName)}
                                                    </span>
                                                }
                                                >
                                                    <span>
                                                    {data.manager.map(data =>data.positionName)}
                                                    </span>
                                                </Tippy>
                                            ),
                                            hierarchy:(
                                                (
                                                    <div className='text-center'>
                                                    <Icon path={mdiEyeOutline}
                                                        size={1}
                                                        color={'#6C757D'}
                                                    />
                                                    </div>
                                                )
                                            ),
                                            actions:(
                                                <Dropdown  >
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                          <Icon path={mdiDotsVertical}
                            size={1}
                            color={'#6C757D'}

                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-container">
                          <Dropdown.Item onClick={() => actions(data, 'edit')}>
                            <div className='dropdown-action'>
                              <span>
                                <Icon path={mdiPencil}
                                  size={1}
                                  color={'#6C757D'}

                                />
                              </span>

                              <span className='action-name'>
                                {t('Edit')}
                              </span>
                            </div>

                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => actions(data, 'delete')}>
                            <div className='dropdown-action'>
                              <span>
                              <Icon path={mdiDeleteSweepOutline}
                              size={1}
                              color={'red'}

                            />
                              </span>

                              <span className='action-name'>
                              {t('Delete')}
                              </span>
                            </div>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                                            )
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

    useEffect(() => {
      
        FetchApiGet(`api/OldSystem/GetCompanies/${empId}`, 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
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
        if(selectCompanies !== '' ) {

            const body = {
                companyIds:selectCompanies.map(data => data.value)
            }
            FetchApiPost('services/Hr/CompanyDepartment/GetDepartmentsByCompanyIds','POST',body)
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(item => {
                                return (
                                    setDepartments(item.data.map( data =>(
                                        {
                                            value:data.id,
                                            label:data.departmentName
                                        }
                                    ))),
                                    setSelectDepartments(item.data.map( data =>(
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
        if(selectCompanies !== '' && selectDepartments !=='' ) {

            
               let departmentIds=selectDepartments.map(data => data.value)
            
            FetchApiPost('services/Hr/CompanyDepartment/GetPositionByDepIds ','POST',[...departmentIds])
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(item => {
                                return (
                                    setPositions(item.data.map(data =>(
                                        {
                                            value:data.id,
                                            label:data.positionName
                                        }
                                    ))),
                                    setSelectPositions(item.data.map(data =>(
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
      
    }, [history, selectCompanies, selectDepartments])
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
                        options={departments}
                        change={(e) => changeSelect('departments', e)}
                        value={selectDepartments}
                        placeholder={'departments'}
                    />
                    <RangePicker
                        style={{
                            borderRadius: '15px',
                            maxWidth: '13.5rem',
                            width: '100%',
                            height: '26px',
                            margin: '0 8px 26px 0',
                            borderColor: '#aaa',
                        }}
                        onChange={onChangeDate}
                        format="DD/MM/YYYY"
                        separator={
                            <i
                                style={{ color: '#c7c7c7', paddingTop: '3px' }}
                                className="fas fa-arrow-right"></i>
                        }
                    />

                    <MultiSelectReact
                        options={positions}
                        change={(e) => changeSelect('positions', e)}
                        value={selectPositions}
                        placeholder={'positions'}
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

            {
                updateModal &&
                <Update show={updateModal} setShow={setUpdateModal} data={tableItem} />
            }

            {
                deleteModal &&
                <Delete modalShow={deleteModal} setModalShow={setDeleteModal} data={tableItem} />
            }
        </div>
    )
}

export default Filter