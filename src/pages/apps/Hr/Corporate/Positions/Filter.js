import React, { useEffect, useState } from 'react'
import { mdiCheck, mdiDeleteSweepOutline, mdiClose, mdiDotsVertical, mdiEyeOutline, mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';
import { Col, Dropdown, DropdownButton, Row, ButtonGroup } from 'react-bootstrap'
import { MultiSelectReact } from '../../../../forms/Basic'
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper'
import { useHistory } from 'react-router-dom'
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { filterFunct } from '../../../../../redux/actions';

const Filter = ({ tableData, setTableData,isFilters,setIsFilters }) => {

    const history = useHistory();
    const { t } = useTranslation();

    const dispatch = useDispatch();

    // departmat
    const [department, setDepartment] = useState([]);
    const [selectDepartmant, setSelectDepartmant] = useState([]);

    // addDepartmant
    const [addDepartmant, setAddDepartmant] = useState([]);
    const [selectAddDepartmant, setSelectAddDepartmant] = useState([]);

    // working type
    const [workingType, setWorkingType] = useState([
        {
            value: 1,
            label: 'Office'
        },
        {
            value: 2,
            label: 'Production'
        },
        {
            value: 3,
            label: 'Field'
        },
    ]);
    const [selectWorkingType, setSelectWorkingType] = useState([
        {
            value: 1,
            label: 'Office'
        },
        {
            value: 2,
            label: 'Production'
        },
        {
            value: 3,
            label: 'Field'
        },
    ]);

    
    // pl selection
    const [plSelection, setPlSelection] = useState([]);
    const [selectPlSelection, setSelectPlSelection] = useState([]);


    const changeSelect = (name, e) => {

        switch (name) {
            case 'departmant':
                return (
                    setSelectDepartmant(e),

                    setAddDepartmant([]),
                    setSelectAddDepartmant([]),

                    setPlSelection([]),
                    setSelectPlSelection([])
                )
            case 'addDepartmant':
                return (
                    setSelectAddDepartmant(e)
                )
            case 'workingType':
                return (
                    setSelectWorkingType(e),

                    setPlSelection([]),
                    setSelectPlSelection([])
                )
            case 'plSelection':
                return (
                    setSelectPlSelection(e)
                )

            default:
                break;
        }
    }


    const applyFilter = () => {

        const body = {
            DepartmentIds: selectDepartmant?.map(data => data.value),
            WorkingTypeIds: selectWorkingType?.map(data => data.value),
            PandLSectionIds: selectPlSelection?.map(data => data.value)
        }
        FetchApiPost('services/Hr/Position/ApplyForPositionFilter ', 'POST', body)
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setIsFilters(false);
                            res.json().then(item => {
                                return (
                                    setTableData(item?.data.map(data => (data)))
                                )
                            })
                        }
                        else if (res.status === 500) {
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

        FetchApiGet('services/Hr/Position/GetDepartmentsForPositionFilter', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(item => {
                                return (

                                    setDepartment(item.data.map(data => (
                                        {
                                            value: data.id,
                                            label: data.departmentName,
                                        }
                                    ))),
                                    setSelectDepartmant(item.data.map(data => (
                                        {
                                            value: data.id,
                                            label: data.departmentName,
                                        }
                                    )))
                                )
                            })
                        }
                        else if (res.status === 500) {
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
        if (selectDepartmant.length !== 0) {

            const body = {
                DepartmentIds: selectDepartmant.map(data => data.value)
            }
            FetchApiPost('services/Hr/Position/GetAddDepartmentsForPositionFilter ', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(item => {
                                    return (

                                        setAddDepartmant(item.data.map(data => (
                                            {
                                                value: data.id,
                                                label: data.departmentName,
                                            }
                                        ))),
                                        setSelectAddDepartmant(item.data.map(data => (
                                            {
                                                value: data.id,
                                                label: data.departmentName,
                                            }
                                        )))
                                    )
                                })
                            }
                            else if (res.status === 500) {
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

    }, [history, selectDepartmant])

    useEffect(() => {
        if (selectDepartmant.length !== 0 &&  selectWorkingType.length !== 0) {

            const body = {
                DepartmentIds: selectDepartmant.map(data => data.value),
                WorkingType: selectWorkingType.map(data => data.value)
            }
            FetchApiPost('services/Hr/Position/GetPLSectionForPositionFilter', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(item => {
                                    return (

                                        setPlSelection(item.data.map(data => (
                                            {
                                                value: data.pandLSectionId,
                                                label: data.pandLSectionName,
                                            }
                                        ))),
                                        setSelectPlSelection(item.data.map(data => (
                                            {
                                                value: data.pandLSectionId,
                                                label: data.pandLSectionName,
                                            }
                                        )))
                                    )
                                })
                            }
                            else if (res.status === 500) {
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

    }, [history, selectDepartmant, selectWorkingType])

    useEffect(() => {
     dispatch(filterFunct({
        DepartmentIds: selectDepartmant?.map(data => data.value),
        WorkingTypeIds: selectWorkingType?.map(data => data.value),
        PandLSectionIds: selectPlSelection?.map(data => data.value)
     }))
    }, [dispatch, selectDepartmant, selectPlSelection, selectWorkingType])
    

    return (
        <div>
            <Row className='page-filters  mt-2 mb-2'>

                <Col xs={8} sm={9} md={10} className='d-flex flex-wrap multi-select-auto'>
                    <MultiSelectReact
                        options={department}
                        change={(e) => changeSelect('departmant', e)}
                        value={selectDepartmant}
                        placeholder={'departmant'}
                    />

                    <MultiSelectReact
                        options={addDepartmant}
                        change={(e) => changeSelect('addDepartmant', e)}
                        value={selectAddDepartmant}
                        placeholder={'adit departmant'}
                    />

                    <MultiSelectReact
                        options={workingType}
                        change={(e) => changeSelect('workingType', e)}
                        value={selectWorkingType}
                        placeholder={'working type'}
                    />

                    <MultiSelectReact
                        options={plSelection}
                        change={(e) => changeSelect('plSelection', e)}
                        value={selectPlSelection}
                        placeholder={'P&L Section'}
                    />
                </Col>

                <Col xs={4} sm={3} md={2} className='buttons'>
                    <button>
                        <Icon path={mdiCheck}
                            size={1}
                            color={'#0ACF97'}
                            onClick={applyFilter}
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