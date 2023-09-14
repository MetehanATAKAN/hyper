import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { SingleSelects } from '../../../../../components/GlobalNew/Selects'
import { InputDefault, InputNumberDefault, TextArea } from '../../../../../components/FormElements/Input'
import Table from './Table'
import { useTranslation } from 'react-i18next'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Divider } from '../../../../../components/FormElements/Divider'
import { useDispatch, useSelector } from 'react-redux'
import { isSaveSubProcess, savedButtonChange, subProcessNameHeader } from '../../../../../redux/subProcess/actions'
import { ConfirmModal, SuccessModal, WarningModal } from '../../../../../components/FormElements/InformationModal'

const NewSubProcessContent = () => {


    const history = useHistory();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const createdBy = localStorage.getItem('userName');

    const isSaveButtonValue = useSelector(state => state.SubProcess.isSave);

    /**error text */
    const [error, setError] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');

    /**success */
    const [success, setSuccess] = useState(false);

    /**delete modal show */ 
    const [deleteModalShow, setDeleteModalShow] = useState(false);

  
    /**sub process name */
    const [subProcessName, setSubProcessName] = useState('');

    /**aım */
    const [aım, setAım] = useState('');

    
    /**activity type */
    const [activityType, setActivityType] = useState([]);
    const [selectActivityType, setSelectActivityType] = useState();

    /**sub process mix type */
    const [subProcessMixType, setSubProcessMixType] = useState([
        {
            value:1,
            label:'Product'
        },
        {
            value:2,
            label:'Position'
        },
        {
            value:3,
            label:'Employee'
        },
        {
            value:4,
            label:'Process'
        },
    ]);
    const [selectSubProcessMixType, setSelectSubProcessMixType] = useState(
        {
            value:1,
            label:'Product'
        }
    );

    /**assessment */
    const [assessment, setAssessment] = useState([
        {
            value:1,
            label:'No'
        },
        {
            value:2,
            label:'Yes'
        }
    ]);
    const [selectAssessment, setSelectAssessment] = useState(
        {
            value:2,
            label:'Yes'
        }
    );

    /**operational table data */
    const [operationalData, setOperationalData] = useState([]);

    /**Functional Responsibility Position data */
    const [functionalResponsibilityPositionData, setFunctionalResponsibilityPositionData] = useState([]);

    /**Approved Responsible Position data  */
    const [approvedResponsiblePositionData , setApprovedResponsiblePositionData] = useState([])

    /**delete obj */
    const [deleteObj, setDeleteObj] = useState({});

    const deleteInfo = async (row) => {
        await setDeleteObj(row);
        await setDeleteModalShow(true);
    }

    const deleteTableData = async (row) => {
        const dataId = deleteObj.original.id;
        const tableName = deleteObj.original.name;

        const table = tableName === 'Operational Responsibility Position' ? operationalData : tableName === 'Functional Responsibility Position' ? functionalResponsibilityPositionData : approvedResponsiblePositionData
        const setTable = tableName === 'Operational Responsibility Position' ? setOperationalData : tableName === 'Functional Responsibility Position' ? setFunctionalResponsibilityPositionData : setApprovedResponsiblePositionData
        const newArr = table?.filter(data =>data.id !== dataId);
        await setTable(newArr);
    }

    const topFilter = [
        {
            key: 'activityType',
            label: 'activity type',
            options: activityType,
            state: selectActivityType,
            setState: setSelectActivityType,
            type: 'single',
            isStar: true
        },
        {
            key: 'subProcessMixType',
            label: 'sub process mix type',
            options: subProcessMixType,
            state: selectSubProcessMixType,
            setState: setSelectSubProcessMixType,
            type: 'single',
            isStar: true
        },
        {
            key: 'assessment',
            label: 'assessment',
            options: assessment,
            state: selectAssessment,
            setState: setSelectAssessment,
            type: 'single',
            isStar: true
        },
    ]

    const columns = [
        {
          header: t('Company Type'),
          accessorKey: 'companyType',
          size: '120'
        },
        {
          header: t('Department'),
          accessorKey: 'department',
          size: '120'
        },
        {
          header: t('Position'),
          accessorKey: 'position',
          size: '120'
        },
        {
            header: t(''),
            accessorKey: 'delete',
            size: '20',
            muiTableBodyCellProps: {
                align: 'center',
              },
            Cell:({cell,row}) => {
                return(
                    <DeleteOutlineIcon onClick={()=>deleteInfo(row)} className='table-delete-icon'/>
                )
            }
          },
      ]

    const tables = [
        {
            header:'Operational Responsibility Position',
            data:operationalData,
            setData:setOperationalData,
            columns:columns
        },
        {
            header:'Functional Responsibility Position',
            data:functionalResponsibilityPositionData,
            setData:setFunctionalResponsibilityPositionData,
            columns:columns
        },
        {
            header:'Approved Responsible Position',
            data:approvedResponsiblePositionData,
            setData:setApprovedResponsiblePositionData,
            columns:columns
        }
    ]

    /**expected day */
    const [expectedDay, setExpectedDay] = useState(0);

    /**easy */
    const [easy, setEasy] = useState(0);

    /**medium */
    const [medium, setMedium] = useState(0);

    /**hard */
    const [hard, setHard] = useState(0);

    /**extreme */
    const [extreme, setExtreme] = useState(0);

    

    const inputsNumber = [
        {
            label:'expected day',
            value:expectedDay,
            setValue:setExpectedDay
        },
        {
            label:'easy',
            value:easy,
            setValue:setEasy
        },
        {
            label:'medium',
            value:medium,
            setValue:setMedium
        },
        {
            label:'hard',
            value:hard,
            setValue:setHard
        },
        {
            label:'extreme',
            value:extreme,
            setValue:setExtreme
        },
    ]

    const saveSubProcess = () => {
        if(selectAssessment.value === 1) {
            if (subProcessName &&
                activityType &&
                subProcessMixType &&
                assessment &&
                aım &&
                operationalData.length > 0 &&
                functionalResponsibilityPositionData.length > 0 
            ) {
    
    
                const body = {
                    name: subProcessName,
                    activityTypeId: selectActivityType?.value,
                    subProcessMixType: selectSubProcessMixType.label,
                    assessment: selectAssessment.value === 1 ? false : true,
                    description: aım,
                    approveStatus: 1,
                    approverExpectedDay: expectedDay,
                    approverEasy: easy,
                    approverMedium: medium,
                    approverHard: hard,
                    approverExtreme: extreme,
                    createdBy: createdBy,
                    operationalPosition: operationalData?.map(data => (
                        {
                            companyType: data.companyType,
                            departmentId: data.departmentId,
                            positionId: data.positionId
                        }
                    )),
    
                    functionalPosition: functionalResponsibilityPositionData?.map(data => (
                        {
                            companyType: data.companyType,
                            departmentId: data.departmentId,
                            positionId: data.positionId
                        }
                    )),
                    approvedPosition: approvedResponsiblePositionData?.map(data => (
                        {
                            companyType: data.companyType,
                            departmentId: data.departmentId,
                            positionId: data.positionId
                        }
                    ))
                }
    
                FetchApiPost('services/TaskManagement/SubProcess/CreateNewSubProcess', 'POST', body)
                    .then((res) =>
                        (async () => {
                            try {
                                if (res.status === 201) {
                                    dispatch(savedButtonChange(true));
                                    dispatch(subProcessNameHeader(subProcessName));
                                    setSuccess(true);
                                    res.json().then(el => {
    
                                    })
    
                                }
                                else if (res.status === 409) {
                                    res.json().then(el => {
                                        setErrorMessages(el.errors[0])
                                        setError(true);
                                    })
                                }
                                else if (res.status === 500 || res.status === 499) {
    
                                    history.push('/error-500');
                                }
    
                            } catch (error) {
                                console.log('error', error);
                            }
                        })()
                    )
            }
        }
        else {
            if (subProcessName &&
                activityType &&
                subProcessMixType &&
                assessment &&
                aım &&
                operationalData.length > 0 &&
                functionalResponsibilityPositionData.length > 0 &&
                approvedResponsiblePositionData.length > 0
            ) {
    
    
                const body = {
                    name: subProcessName,
                    activityTypeId: selectActivityType?.value,
                    subProcessMixType: selectSubProcessMixType.label,
                    assessment: selectAssessment.value === 1 ? false : true,
                    description: aım,
                    approveStatus: 1,
                    approverExpectedDay: expectedDay,
                    approverEasy: easy,
                    approverMedium: medium,
                    approverHard: hard,
                    approverExtreme: extreme,
                    createdBy: createdBy,
                    operationalPosition: operationalData?.map(data => (
                        {
                            companyType: data.companyType,
                            departmentId: data.departmentId,
                            positionId: data.positionId
                        }
                    )),
    
                    functionalPosition: functionalResponsibilityPositionData?.map(data => (
                        {
                            companyType: data.companyType,
                            departmentId: data.departmentId,
                            positionId: data.positionId
                        }
                    )),
                    approvedPosition: approvedResponsiblePositionData?.map(data => (
                        {
                            companyType: data.companyType,
                            departmentId: data.departmentId,
                            positionId: data.positionId
                        }
                    ))
                }
    
                FetchApiPost('services/TaskManagement/SubProcess/CreateNewSubProcess', 'POST', body)
                    .then((res) =>
                        (async () => {
                            try {
                                if (res.status === 201) {
                                    dispatch(savedButtonChange(true));
                                    dispatch(subProcessNameHeader(subProcessName));
                                    setSuccess(true);
                                    res.json().then(el => {
    
                                    })
    
                                }
                                else if (res.status === 409) {
                                    res.json().then(el => {
                                        setErrorMessages(el.errors[0])
                                        setError(true);
                                    })
                                }
                                else if (res.status === 500 || res.status === 499) {
    
                                    history.push('/error-500');
                                }
    
                            } catch (error) {
                                console.log('error', error);
                            }
                        })()
                    )
            }
        }
        dispatch(isSaveSubProcess(false));
    }

    /**activity type */
    useEffect(() => {
        
        FetchApiGet('services/TaskManagement/ActivityType/GetAllActivityTypes', 'GET')
        .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
    ;
                        res.json().then(el => {
                            setActivityType(el.data?.map(data => (
                                {
                                    value:data.id,
                                    label:data.title
                                }
                            )))
                            setSelectActivityType(
                                {
                                    value:el?.data[0]?.id,
                                    label:el?.data[0]?.title
                                }
                            )
                        })

                    }
                    else if (res.status === 500 || res.status === 499) {

                        history.push('/error-500');
                    }

                } catch (error) {
                    console.log('error', error);
                }
            })()
        )
    
}, [history])

    /**save sub process */
    useEffect(() => {
        isSaveButtonValue && saveSubProcess()
    }, [isSaveButtonValue])

    useEffect(() => {
      dispatch(savedButtonChange(false))
    }, [subProcessName, selectActivityType, selectSubProcessMixType, selectAssessment, aım, operationalData, functionalResponsibilityPositionData, approvedResponsiblePositionData, expectedDay, easy, medium, hard, extreme, dispatch])
    


    return (
        <div>
           <div className='new-sub-process-section'>
           <Row className='item' gutter={16}>
                <Col span={24}>
                    <InputDefault
                        value={subProcessName}
                        setValue={setSubProcessName}
                        label='sub process name'
                        width='50%'
                    />
                </Col>
            </Row>

            <Row className='item' gutter={16}>
                {
                    topFilter?.map(data => (
                        <Col span={8}>
                            <SingleSelects
                                label={data.label}
                                isStar={data.isStar}
                                selectedItems={data.state}
                                setSelectedItems={data.setState}
                                options={data.options}
                                width='100%'
                                clearIcon={false}
                            />
                        </Col>
                    ))
                }
            </Row>

            <TextArea
                value={aım}
                setValue={setAım}
                label='AIM and Desription'
                className='item'
            />
           </div>

            {
                tables.map(data => (
                    <div className='new-sub-process-section'>
                    <Table
                        columns={data.columns}
                        data={data.data}
                        header={data.header}
                        setData={data.setData}
                    />
                    </div>
                ))
            }
            <Divider orientation='left' title='expected day and time'/>
           <Row className='expected-day' justify='space-between'>
              {
                  inputsNumber?.map(data => (
                      <Col xs={24}  xl={4} >
                          <InputNumberDefault
                              label={data.label}
                              value={data.value}
                              setValue={data.setValue}
                              isRequired={false}
                              width='100%'
                          />
                      </Col>
                  ))
              }
          </Row>
        {
            error && (
                <WarningModal
                setShowModal={setError} 
                message={errorMessages} 
                title="Cannot be added" 
               />
            )
        }
         {
            success && (
                <SuccessModal
                setShowModal={setSuccess} 
                message={'Save successful'} 
                title="Save" 
               />
            )
        }

{
            deleteModalShow && (
                <ConfirmModal 
                setShowModal={setDeleteModalShow} 
                func={deleteTableData} 
                message="Are you sure you want to delete?" 
                title="Delete" 
                />
            )
            }
        </div>
    )
}

export default NewSubProcessContent