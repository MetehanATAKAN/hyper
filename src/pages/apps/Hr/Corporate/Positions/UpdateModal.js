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
import { useSelector } from 'react-redux';

const UpdateModal = ({ isShow, setIsShow, tableData, setTableData, data, applyFilter }) => {
console.log("datadatadata",data)
    const { t } = useTranslation();
    const history = useHistory();
    
    const tableFilter = useSelector(state => state.Need.filterFunct);

    // department name
    const [departmentName, setDepartmentName] = useState(data.positionName);
    
    // abbreviation
    const [abbreviation, setAbbreviation] = useState(data?.abbreviation);

    // department overview
    const [departmentOverview, setDepartmentOverview] = useState(data?.positionOverview);

    // department
    const [department, setDepartment] = useState([]);
    const [selectDepartment, setSelectDepartment] = useState(data?.department && {value:data.department.id,label:data.department.departmentName});


    // additional department
    const [additionalDepartment, setAdditionalDepartment] = useState([]);
    const [selectAdditionalDepartment, setSelectAdditionalDepartment] = useState(data?.additionalDepartment && {value:data.additionalDepartment.id,label:data.additionalDepartment.departmentName});

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
    const [selectWorkingType, setSelectWorkingType] = useState(data?.workingType && (data.workingType === 1 ?
        {
            value:1,
            label:'Office'
        }
        :data.workingType === 2
        ?{
            value:2,
            label:'Production'
        }
        :data.workingType === 3
        ?{
            value:3,
            label:'Field'
        }
        :null
        ));

    // P&L section
    const [plSection, setPlSection] = useState([]);
    const [selectPlSection, setSelectPlSection] = useState(data?.pandLSectionName && {
        value:data.pandLSectionId,
        label:data.pandLSectionName
    });

    const [show, setShow] = useState(false);

    const [documentationDatas, setdocumentationDatas] = useState(data.document.length !==0 
        ? data.document.map(item => (
            {
            name: item?.documentName,
            active: true,
            type: item?.extension,
            src:item.documentSrc,
            path:item?.documentPath,
            base64:item.documentBase64
            }
        ))
        :[]
        );

    const [newDocumentDatas, setNewDocumentDatas] = useState([]);

 
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

    const changeHandler = async (event) => {

        const file = event.target.files[0];
        const typeName = file?.name?.split('.').pop();
        const base64 = await convertBase64(file);
        console.log(base64);
        console.log(file);
        // let objJsonStr = JSON.stringify(base64);
        // let objJsonB64 = Buffer.from(objJsonStr).toString('base64');
        setNewDocumentDatas(prev => [...prev, {
            base64: base64,
            name: file.name,
            active: true,
            type: typeName,
        }])
        setdocumentationDatas(prev => [...prev, {
            base64: base64,
            name: file.name,
            active: true,
            type: typeName,
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
                documentName:data.name,
                path:data.path
            })
        ))

        const body = {
            id: data.id,
            positionName: departmentName,
            abbreviation: abbreviation,
            positionOverview: departmentOverview,
            modifiedBy: localStorage.getItem('userName'),
            departmentId: selectDepartment?.value,
            additionalDepartmentId: selectAdditionalDepartment.value,
            workingType: selectWorkingType?.value,
            pandLSectionId: selectPlSection?.value,
            pandLSectionName: selectPlSection?.label,
            positionDocuments:doc
    
  
        }

        FetchApiPost('services/Hr/Position/UpdatePosition', 'POST', body)
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setIsShow(false);
                            FetchApiPost('services/Hr/Position/ApplyForPositionFilter ', 'POST', tableFilter)
                            .then((res) =>
                                (async () => {
                                    try {
                                        if (res.status === 200) {
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
        console.log('reload file da');
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
                <Modal show={isShow} size={'md'} className='add-department' >
                    <Modal.Header onHide={toggle} closeButton style={{ backgroundColor: '#FFFFFF', color: '#000000' }} >
                        <h4
                            className="modal-title"
                            style={{
                                color: '#7A7A7A',
                                font: '18px',
                            }}
                        >
                            {t('Update Positions')}
                        </h4>
                    </Modal.Header>
                    <Modal.Body style={{ maxHeight: '500px', overflow: 'auto' }}>

                        <div className='mb-3' >

                            <label>{t('position name')}</label>
                            <input
                                list="datalistOptions"
                                id="departmentName"
                                type="text"
                                className="form-control mb-2.5"
                                value={departmentName}
                                style={style}
                                onChange={(e)=>setDepartmentName(e.target.value.replace(
                                    /[^a-zA-Z\s]/g,
                                    ""
                                  ))}
                            />

                            <div className="process-type-form__container" style={{ padding: '0' }}>

                                <div className="process-type-input__container">
                                    <label>{t('abbreviation')}</label>
                                    <FormInput
                                        type="text"
                                        name="text2"
                                        containerClass={'mb-2'}
                                        key="text2"
                                        onChange={(e) => setAbbreviation(e.target.value)}
                                        value={abbreviation}
                                        className='mb-1'
                                        style={style}
                                    />
                                </div>

                            </div>
                            <label>{t('position overview')}</label>
                            <FormInput
                                type="textarea"
                                name="textarea"
                                containerClass={'mb-2'}
                                key="textarea"
                                style={style}
                                onChange={(e) => setDepartmentOverview(e.target.value)}
                                value={departmentOverview}
                            />

                            <Row>
                                <Col>
                                    <SelectLabels
                                        options={department}
                                        headerName={'department'}
                                        value={selectDepartment}
                                        multi={false}
                                        disabled={false}
                                        change={(e) => setSelectDepartment(e)}
                                        style={style}
                                    />
                                </Col>

                                <Col>
                                    <SelectLabels
                                        options={additionalDepartment}
                                        headerName={'additional department'}
                                        value={selectAdditionalDepartment}
                                        multi={false}
                                        disabled={false}
                                        change={(e) => setSelectAdditionalDepartment(e)}
                                        style={style}
                                    />
                                </Col>
                            </Row>

                            <SelectLabels
                                options={workingType}
                                headerName={'working type'}
                                value={selectWorkingType}
                                multi={false}
                                disabled={false}
                                change={(e) => setSelectWorkingType(e)}
                                style={style}
                            />

                            <SelectLabels
                                options={plSection}
                                headerName={'P&L section'}
                                value={selectPlSection}
                                multi={false}
                                disabled={false}
                                change={(e) => setSelectPlSection(e)}
                                style={style}
                            />

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
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: '#FAFBFE ' }} >
                        <Button
                            className='btn-light'
                            style={{ backgroundColor: '#EBEBEB' }}
                            onClick={() => setIsShow(false)}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            className='btn-warning'
                            // disabled={departmentName !== '' && abbreviation !== '' && departmentOverview !== '' ? false : true}
                            onClick={handleSubmission}
                            type='submit'
                            disabled={
                                departmentName !== '' &&
                                abbreviation !== '' &&
                                selectDepartment !== '' &&
                                selectWorkingType !== '' &&
                                selectPlSection !== '' ? false : true
                            }
                        >
                            {t('update')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default UpdateModal