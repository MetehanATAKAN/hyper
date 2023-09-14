import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { FormInput } from '../../../../../components';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { SelectLabels } from '../../../../forms/Basic';
import Icon from '@mdi/react'
import {
    mdiDeleteOutline,
    mdiFilePngBox,
    mdiFileJpgBox,
    mdiFileWordBox,
    mdiFileExcelBox,
    mdiFilePowerpointBox,
    mdiTextBoxOutline,
    mdiReload 
} from '@mdi/js';
import PharmacySplitPercentProblem from '../../../../../components/Modals/PharmacySplitPercentProblem';
import { useSelector } from 'react-redux';
import { NewInput } from '../../../../../components/GlobalNew/Inputs';
import { SingleSelects } from '../../../../../components/GlobalNew/Selects';
import GlobalModal from '../../../../../components/GlobalNew/Modal';

const AddPositionsModal = ({ isShow, setIsShow, tableData, setTableData, setIsFilters }) => {

    const { t } = useTranslation();
    const history = useHistory();

    const tableFilter = useSelector(state => state.Need.filterFunct);

    // department name
    const [departmentName, setDepartmentName] = useState('');
  
    // abbreviation
    const [abbreviation, setAbbreviation] = useState('');

    // department overview
    const [departmentOverview, setDepartmentOverview] = useState('');

    // department
    const [department, setDepartment] = useState([]);
    const [selectDepartment, setSelectDepartment] = useState('');

    // additional department
    const [additionalDepartment, setAdditionalDepartment] = useState([]);
    const [selectAdditionalDepartment, setSelectAdditionalDepartment] = useState('');

    // working type
    const [workingType, setWorkingType] = useState([
        {
            value:1,
            label:'Office'
        },
        {
            value:2,
            label:'Production'
        },
        {
            value:3,
            label:'Field'
        },
    ]);
    const [selectWorkingType, setSelectWorkingType] = useState('');

    // P&L section
    const [plSection, setPlSection] = useState([]);
    const [selectPlSection, setSelectPlSection] = useState('');

    const [show, setShow] = useState(false);

    const [addPositionWarning, setAddPositionWarning] = useState(false);
    const [addPositionWarningMessage, setAddPositionWarningMessage] = useState('');

    const [documentationDatas, setdocumentationDatas] = useState([]);

    const toggle = () => {
        setIsShow(false);
    }

    const style = {
        height: '31px'
    }
   
    
    useEffect(() => {
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
                                    ))),
                                    setAdditionalDepartment(item.data.map(data => (
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
                        else {
                            console.log('hata');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )

        FetchApiGet('api/OldSystem/GetPLSection ', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(item => {
                                return (
                                    setPlSection(item.map(data => (
                                        {
                                            value: data.Id,
                                            label: data.Val1
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


    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const handleClose = () => {
        setAddPositionWarning(false);
    }

    const changeHandler = async (event) => {

        const file = event.target.files[0];
        const typeName = file.name.split('.').pop();
        console.log(typeName);
        const base64 = await convertBase64(file);

        setdocumentationDatas(prev => [...prev, {
            base64: base64,
            name: file.name,
            active: true,
            type: typeName
        }])
        setSelectedFile(base64);
    };

    const convertBase64 = (file) => {

        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    
    const handleSubmission = () => {

        const doc = [];
        documentationDatas.map(data => (
            data.active === true && doc.push({
                document:data.base64,
                extension:data.type,
                documentName: data.name
            })
        ))

        const body = {
            DepartmentId: selectDepartment?.value,
            AdditionalDepartmentId: selectAdditionalDepartment.value,
            PositionName: departmentName,
            Abbreviation: abbreviation,
            PositionOverview: departmentOverview,
            WorkingType: selectWorkingType?.value,
            PandLSectionId: selectPlSection?.value,
            PandLSectionName: selectPlSection?.label,
            PositionDocuments: doc,
            CreatedBy: localStorage.getItem('userName'),
        }

        FetchApiPost('services/Hr/Position/CreatePosition', 'POST', body)
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 201) {
                            setIsShow(false);
                            FetchApiPost('services/Hr/Position/ApplyForPositionFilter ', 'POST', tableFilter)
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setIsFilters(false);
                            res.json().then(item => {
                                return (
                                    setTableData()
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
                        else if (res.status === 500) {
                            history.push('/error-500');
                        }
                        else if (res.status === 499) {
                            history.push('/error-500');
                        }
                        else if (res.status === 409) {
                            setAddPositionWarning(true);
                            res.json().then(item => {
                                setAddPositionWarningMessage(item.errors[0])
                            })
                        }
                        else {
                            console.log('hata');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    };

   
    const deleteFile = (name) => {
        setdocumentationDatas(prevState => {
            const newState = prevState.map(obj => {
              // 👇️ if id equals 2, update country property
              if (obj.name === name) {
                return {...obj, active: false};
              }
      
              // 👇️ otherwise return object as is
              return obj;
            });
      
            return newState;
          });
    }

    const reloadFile = (name) => {
        setdocumentationDatas(prevState => {
            const newState = prevState.map(obj => {
              // 👇️ if id equals 2, update country property
              if (obj.name === name) {
                return {...obj, active: true};
              }
      
              // 👇️ otherwise return object as is
              return obj;
            });
      
            return newState;
          });
    }

    const fileIcon = (name) => {

        if (name === 'png') {
            return <Icon path={mdiFilePngBox} size={1} color="blue" />
        }
        else if (name === 'jpeg') {
            return <Icon path={mdiFileJpgBox} size={1} color="blue" />
        }
        else if (name === 'doc') {
            return <Icon path={mdiFileWordBox} size={1} color="blue" />
        }
        else if (name === 'docx') {
            return <Icon path={mdiFileWordBox} size={1} color="blue" />
        }
        else if (name === 'xls') {
            return <Icon path={mdiFileExcelBox} size={1} color="green" />
        }
        else if (name === 'xlsx') {
            return <Icon path={mdiFileExcelBox} size={1} color="green" />
        }
        else if (name === 'ppt') {
            return <Icon path={mdiFilePowerpointBox} size={1} color="orange" />
        }
        else if (name === 'pptx') {
            return <Icon path={mdiFilePowerpointBox} size={1} color="orange" />
        }
        else if (name === 'txt') {
            return <Icon path={mdiTextBoxOutline} size={1} color="gray" />
        }

    }

    
    return (
        <>

            <div className="process-type-form ">

            <GlobalModal 
                showModal={isShow}
                setShowModal={setIsShow}
                toggle={() => setIsShow(false)}
                header={t('add Positions')}
                size={'md'}
                body={<>
                    <div>
                    <NewInput
                                value={departmentName}
                                setValue={(e)=>setDepartmentName(e.replace(
                                    /[^a-zA-Z\s]/g,
                                    ""
                                  ))}
                                label="position name"
                                isStar={true}
                                width="100%"
                                placeholder='position name'
                            />
                    </div>
                    <div>
                    <NewInput
                                value={abbreviation}
                                setValue={setAbbreviation}
                                label="abbreviation"
                                isStar={true}
                                placeholder="abbreviation"
                                width="100%"
                            />
                    </div>
                    <div>
                    <NewInput
                                value={departmentOverview}
                                setValue={setDepartmentOverview}
                                label="position overview"
                                isStar={true}
                                placeholder="position overview"
                                width="100%"
                            />
                    </div>
                    <div style={{ display: 'grid', columnGap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                        <SingleSelects
                            label={'department'}
                            width={'217px'}
                            options={department}
                            selectedItems={selectDepartment}
                            setSelectedItems={setSelectDepartment}
                            isStar={true}
                        />
                        <SingleSelects
                            label={'additional department'}
                            width={'217px'}
                            options={additionalDepartment}
                            selectedItems={selectAdditionalDepartment}
                            setSelectedItems={setSelectAdditionalDepartment}
                            isStar={true}
                        />
                    </div>
                    <div>
                    <SingleSelects
                            label={'working type'}
                            width={'100%'}
                            options={workingType}
                            selectedItems={selectWorkingType}
                            setSelectedItems={setSelectWorkingType}
                            isStar={true}
                        />
                    </div>
                    <div>
                    <SingleSelects
                            label={'P&L section'}
                            width={'100%'}
                            options={plSection}
                            selectedItems={selectPlSection}
                            setSelectedItems={setSelectPlSection}
                            isStar={true}
                        />
                    </div>

                    <div className='mb-3' >
                            <label>{t('documentation')}</label>
                            <div>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control
                                        type="file"
                                        onChange={changeHandler}
                                        accept=".png, .jpeg , .doc, .docx, .xlsx, .xls, .ppt, .pptx , .txt"
                                    />
                                </Form.Group>
                                {/* <input 
                                type="file" 
                                name="file" 
                                onChange={changeHandler}
                                accept=".png, .jpeg , .doc, .docx, .xlsx, .xls, .ppt, .pptx"
                                 /> */}
                            </div>
                            <Table striped bordered>
                                <tbody>
                                    {
                                        documentationDatas?.map(data => (
                                            <tr>
                                                <td>
                                                    <span>
                                                        {
                                                            fileIcon(data.type)
                                                        }
                                                    </span></td>
                                                <td>
                                                    <div>
                                                        <span>{data.name}</span>
                                                    </div>
                                                </td>
                                                <td> {data.active === true ? 'Active' : 'Deleted'} </td>
                                                <td>
                                                    {
                                                        data.active === true 
                                                        ?<Icon path={mdiDeleteOutline}
                                                        size={1}
                                                        color={'red'}
                                                        onClick={() => deleteFile(data.name)}
                                                    />
                                                        :<Icon path={mdiReload}
                                                        size={1}
                                                        color={'gray'}
                                                        onClick={() => reloadFile(data.name)}
                                                    />
                                                    }
                                                    
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                </>
                }
                footer={
                    <>
                    <Button onClick={() => setIsShow(false)} variant="secondary">
                    {t('cancel')}
                    </Button>
                    <Button
                        disabled={
                            departmentName !== '' &&
                            abbreviation !== '' &&
                            selectDepartment !== '' &&
                            selectWorkingType !== '' &&
                            selectPlSection !== '' ? false : true
                        }
                        variant="primary"
                        onClick={() => handleSubmission()}
                        >
                        {t('add')}
                    </Button>
                </>
                }
                />
               
            </div>

{
    addPositionWarning &&
<PharmacySplitPercentProblem
messages={'Position name already exists'}
show={addPositionWarning}
handleClose={handleClose}
/>
}
            
        </>
    )
}

export default AddPositionsModal