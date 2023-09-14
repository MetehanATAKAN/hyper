import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { FetchApiPost, FetchApiGet } from '../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import PharmacySplitPercentProblem from '../../../components/Modals/PharmacySplitPercentProblem';
import { AutoComplete } from 'antd';
import { SingleSelects } from '../../../components/GlobalNew/Selects';
import GlobalModal from '../../../components/GlobalNew/Modal';

const UpdateJobDescriptionModal = ({ updateJobDescription, setOnModal, onModal,businessProcess, setBusinessProcess, parentProcess, setParentProcess, subProcess, setSubProcess, jobDescription, setJobDescription,
    jobDescriptionFilteredDatas,businessProcessFilteredDatas,processFilteredDatas,
setJobDescriptionFilteredDatas,setBusinessProcessFilteredDatas,setProcessFilteredDatas }) => {
    const { t } = useTranslation();
    const [mainProcessText, setMainProcessText] = useState(updateJobDescription.mainProcess);

    console.log(jobDescription);
   
    const [errorShow, setErrorShow] = useState(false);

    const [options, setOptions] = useState([]);
    
    const [filteredList, setFilteredList] = useState([])
    const [filterJobDescription, setFilterJobDescription] = useState([])

    useEffect(() => {
        // Job Description
        FetchApiGet('services/TaskManagement/JobDescription/GetAllJobDescriptions', 'GET')
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setFilterJobDescription(res))
            .catch((e) => console.log('TaskManagementIndex Job Description', e));
    }, []);

    const updateData = async () => {
        let checkName = await filterJobDescription.filter(item => item.activityTypeId === updateJobDescription.activityTypeId);
        let checkName2 = await checkName.filter(item => item.mainProcess === mainProcessText.trim());

        if(checkName2.length === 0){
            FetchApiPost('services/TaskManagement/JobDescription/UpdateJobDescription', 'POST', {
                id: updateJobDescription.id,
                modifiedBy: localStorage.getItem('userName') || updateJobDescription.modifiedBy,
                mainProcess: mainProcessText.trim(),
                activityTypeId: updateJobDescription.activityTypeId
            }).then(setOnModal(false))
            let newJobDescription = await jobDescriptionFilteredDatas.map((item) => item.id === updateJobDescription.id ? { ...item, mainProcess: mainProcessText} : item);
            setJobDescriptionFilteredDatas(newJobDescription);
            let newBusinessProcess = await businessProcessFilteredDatas.map((item) => item.mainProcessId === updateJobDescription.id ? { ...item, mainProcessName: mainProcessText} : item);
            setBusinessProcessFilteredDatas(newBusinessProcess);
            let newParentProcess = await processFilteredDatas.map((item) => item.mainProcessId === updateJobDescription.id ? { ...item, mainProcessName: mainProcessText} : item);
            setProcessFilteredDatas(newParentProcess);

            let newJobDescription2 = await jobDescription.map((item) => item.id === updateJobDescription.id ? { ...item, mainProcess: mainProcessText} : item);
            setJobDescription(newJobDescription2);
            let newBusinessProcess2 = await businessProcess.map((item) => item.mainProcessId === updateJobDescription.id ? { ...item, mainProcessName: mainProcessText} : item);
            setBusinessProcess(newBusinessProcess2);
            let newParentProcess2 = await parentProcess.map((item) => item.mainProcessId === updateJobDescription.id ? { ...item, mainProcessName: mainProcessText} : item);
            setParentProcess(newParentProcess2);

        } else if (checkName2.length === 1 && checkName2[0].id === updateJobDescription.id){
            FetchApiPost('services/TaskManagement/JobDescription/UpdateJobDescription', 'POST', {
                id: updateJobDescription.id,
                modifiedBy: localStorage.getItem('userName') || updateJobDescription.modifiedBy,
                mainProcess: mainProcessText,
                activityTypeId: updateJobDescription.activityTypeId
            }).then(setOnModal(false))
            let newJobDescription = await jobDescriptionFilteredDatas.map((item) => item.id === updateJobDescription.id ? { ...item, mainProcess: mainProcessText} : item);
            setJobDescriptionFilteredDatas(newJobDescription);
            let newBusinessProcess = await businessProcessFilteredDatas.map((item) => item.mainProcessId === updateJobDescription.id ? { ...item, mainProcessName: mainProcessText} : item);
            setBusinessProcessFilteredDatas(newBusinessProcess);
            let newParentProcess = await processFilteredDatas.map((item) => item.mainProcessId === updateJobDescription.id ? { ...item, mainProcessName: mainProcessText} : item);
            setProcessFilteredDatas(newParentProcess);

            let newJobDescription2 = await jobDescription.map((item) => item.id === updateJobDescription.id ? { ...item, mainProcess: mainProcessText} : item);
            setJobDescription(newJobDescription2);
            let newBusinessProcess2 = await businessProcess.map((item) => item.mainProcessId === updateJobDescription.id ? { ...item, mainProcessName: mainProcessText} : item);
            setBusinessProcess(newBusinessProcess2);
            let newParentProcess2 = await parentProcess.map((item) => item.mainProcessId === updateJobDescription.id ? { ...item, mainProcessName: mainProcessText} : item);
            setParentProcess(newParentProcess2);
        }
        else {
            setErrorShow(true)
        }
    }

    const handleClose = () => {
        setErrorShow(false);
    }

    const filterBySearch = (event) => {
        setMainProcessText(event);
        const query = event;
            let updateList = [...filterJobDescription];

            updateList = updateList.filter(function (item) {
                return item.mainProcess.toLowerCase().search(query.toLowerCase()) !== -1;
            });
        if(event=== 0) {
            setFilteredList([])
        }else{
            setFilteredList(updateList);
        }
    }

    useEffect(() => {
        setOptions(
            filterJobDescription?.map(data => {
                return {value:data.mainProcess}
            })
        )
    }, [filterJobDescription])
    
  return (
    <div className="job-description-add">
        {
            errorShow && <PharmacySplitPercentProblem show={errorShow} handleClose={handleClose} messages={t('Main process name already exists')} />
        }
         {
                onModal && (
                    <>
                        <GlobalModal
                            showModal={onModal}
                            setShowModal={setOnModal}
                            toggle={()=>setOnModal(false)}
                            header={t('Update Main Process')}
                            body={
                                <div>
                                <SingleSelects
                                isStar={true}
                                label={t('process type')}
                                isSortable={false}
                                width={'100%'}
                                disabled={true}
                                clearIcon={false}
                                selectedItems={{
                                    id: updateJobDescription.processTypeId,
                                    value: updateJobDescription.processTypeName,
                                    label: <div className='activity-types-select-with-color'>
                                    <div style={{backgroundColor: updateJobDescription.processTypeColor}} className='activity-types-select-with-color__box'></div>
                                    <div className='activity-types-select-with-color__text'>{updateJobDescription.processTypeName}</div>
                                </div>,
                                }}
                                />
                            <SingleSelects
                                isStar={true}
                                label={t('activity types')}
                                disabled={true}
                                isSortable={false}
                                width={'100%'}
                                clearIcon={false}
                                selectedItems={{id: updateJobDescription.activityTypeId,
                                    value: updateJobDescription.activityTypeName,
                                    label: <div className='activity-types-select-with-color'>
                                    <div style={{backgroundColor: updateJobDescription.activityTypeColor}} className='activity-types-select-with-color__box'></div>
                                    <div className='activity-types-select-with-color__text'>{updateJobDescription.activityTypeName}</div>
                                </div>}}
                                />
                                <div style={{ display: 'flex', alignItems: 'center',margin:0 }}>
                                        <label className="label-text-field" style={{width:'auto'}}>
                                            {t('add main process')}
                                        </label>
                                        <span style={{  color: '#fa5c7c', marginLeft: '4px' }}>*</span>
                                    </div>
                                <AutoComplete
                                            style={{ width: '100%' }}
                                            dropdownStyle={{ zIndex: 10000001 }}
                                            placeholder={t('main process')}
                                            options={options}
                                            filterOption={(inputValue, option) =>
                                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                            onChange={filterBySearch}
                                            value={mainProcessText}
                                        />
                                </div>
                            }
                          footer={
                              <>
                                  <Button variant="light" onClick={() => setOnModal(false)}>
                                      {t('cancel')}
                                  </Button>
                                  <Button variant="warning" className='task-management-footer-btn__update' onClick={updateData} disabled={mainProcessText === ""}>
                                      {t('update')}
                                  </Button>
                              </>
                          }
                        />
                    </>
                )
            }
        {/* <div className='job-description-add__container'>
        <div className='job-description-process-select'>
                    <div>{t('process type')}</div>
                    <Select 
                        isMulti={false}
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder={t('select')}
                        isDisabled
                        value={{
                            id: updateJobDescription.processTypeId,
                            value: updateJobDescription.processTypeName,
                            label: <div className='activity-types-select-with-color'>
                            <div style={{backgroundColor: updateJobDescription.processTypeColor, opacity: .8}} className='activity-types-select-with-color__box'></div>
                            <div className='activity-types-select-with-color__text'>{updateJobDescription.processTypeName}</div>
                        </div>,
                        }}
                    ></Select>
                </div>
            <div className="job-description-activity-select">
                <div>{t('activity type')}</div>
                <Select
                    isMulti={false}
                    className="react-select"
                    classNamePrefix="react-select"
                    value={{id: updateJobDescription.activityTypeId,
                        value: updateJobDescription.activityTypeName,
                        label: <div className='activity-types-select-with-color'>
                        <div style={{backgroundColor: updateJobDescription.activityTypeColor, opacity: .8}} className='activity-types-select-with-color__box'></div>
                        <div className='activity-types-select-with-color__text'>{updateJobDescription.activityTypeName}</div>
                    </div>}}
                    isDisabled
                    ></Select>
            </div>

            <div className="job-description-process-select">
                <div>{t('main process')}</div>
                <Form.Control list="datalistOptions" id="exampleDataList" type="text" placeholder={t('search for an option...')} value={mainProcessText} onChange={(e) => filterBySearch(e)}></Form.Control>
            </div>

                {
                    filteredList.length > 0 && (
                        <datalist id="datalistOptions" style={{width: "100%"}} >
                            {
                                filteredList.map((item, index) => (
                                    <option style={{minWidth: "300px"}} key={index} value={item.mainProcess} />
                                ))
                            }
                        </datalist>
                    )
                }

            </div> */}
            {/* <div className="task-management-footer-btn">
                <Button variant="light" onClick={() => setOnModal(false)}>
                    {t('cancel')}
                </Button>
                <Button variant="warning" className='task-management-footer-btn__update' onClick={updateData} disabled={mainProcessText === ""}>
                    {t('update')}
                </Button>
            </div> */}
        </div>
  )
}

export default UpdateJobDescriptionModal