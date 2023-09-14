import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import PharmacySplitPercentProblem from '../../../components/Modals/PharmacySplitPercentProblem';
import { SingleSelects } from '../../../components/GlobalNew/Selects';
import GlobalModal from '../../../components/GlobalNew/Modal';
import { AutoComplete } from 'antd';

const JobDescription = ({ setOnModal,onModal, activityTypes, firstActivityAdd, jobDescription, setFirstActivityAdd, setSeciliTab, setTableTabs, tableTabs, setJobDescription, setActivityTypes,
    setActivityTypeFilteredDatas, setJobDescriptionFilteredDatas }) => {

    const [activityTypeOptions, setActivityTypeOptions] = useState([]);
    const [processTypeOptions, setProcessTypeOptions] = useState([]);
    const [selectedProcessType, setSelectedProcessType] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState();


    const { t } = useTranslation();
    const [mainProcessText, setMainProcessText] = useState("");

    const [options, setOptions] = useState([]);

    const [errorShow, setErrorShow] = useState(false);

    const [filteredList, setFilteredList] = useState([])
    const [filterJobDescription, setFilterJobDescription] = useState([])

    useEffect(() => {
        setSelectedActivity();
        // Job Description
        FetchApiGet('services/TaskManagement/JobDescription/GetAllJobDescriptions', 'GET')
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setFilterJobDescription(res))
            .catch((e) => console.log('TaskManagementIndex Job Description', e));
    }, []);

    useEffect(() => {
        FetchApiGet('services/TaskManagement/ProcessType/GetAllProcessTypes', "GET")
            .then(res => res.json())
            .then(res => res.data)
            .then(res => setProcessTypeOptions(res))
    }, [])

    const handleGetActivityTypes = async (value, process, headerName) => {
        console.log(value, process, headerName);
        await setSelectedActivity()
        if(process !== undefined ) {
            await setSelectedActivity()
            await FetchApiGet(`services/TaskManagement/ActivityType/GetActivityTypeListByProcessTypeId?processTypeId=${process?.id}`, "GET")
                .then(res => res.json())
                .then(res => res.data)
                .then(res => res.length === 1 ? (setSelectedActivity({id: res[0].id, value: res[0].title, label: <div className='activity-types-select-with-color'>
                <div style={{backgroundColor: res[0].color}} className='activity-types-select-with-color__box'></div>
                <div className='activity-types-select-with-color__text'>{res[0].title}</div>
            </div>, color: res[0].color }),setActivityTypeOptions(res) ) : setActivityTypeOptions(res))
            setSelectedProcessType(process)
            setMainProcessText("")
        }     
    }

    const handleClick = (label) => {
        let newState = tableTabs.map((tab) => (
          tab.label === label ? {...tab, activeLink: 'management-tab-active'} : {...tab, activeLink: ''}
        ))
        setTableTabs(newState);
        setSeciliTab(label);
      }

    const createJobDescription = async () => {
        let checkName = await filterJobDescription.filter(item => item.activityTypeId === selectedActivity.id);
        let checkName2 = await checkName.find(item => item.mainProcess === mainProcessText.trim());
        
        if (checkName2 === undefined) {
            await FetchApiPost('services/TaskManagement/JobDescription/CreateJobDescription', 'POST', {
                MainProcess: mainProcessText.trim(),
                CreatedBy: localStorage.getItem('userName') || "string",
                ActivityTypeId: selectedActivity.id
            }).then(res => res.json())
            .then(res => res.data)
            .then(res => (setJobDescriptionFilteredDatas(prev => [...prev, {
                activityTypeColor: selectedActivity.color,
                activityTypeId: res.activityTypeId,
                activityTypeName: selectedActivity.value,
                createdBy: res.createdBy,
                createdDate: res.createdDate,
                id: res.id,
                isDeleteable: true,
                mainProcess: res.mainProcess,
                modifiedBy: res.modifiedBy,
                modifiedDate: res.modifiedDate,
                processTypeId: res.processTypeId,
                processTypeName: selectedProcessType.value,
                processTypeColor: selectedProcessType.color,
                status: res.status

            }]), setJobDescription(prev => [...prev, {
                activityTypeColor: selectedActivity.color,
                activityTypeId: res.activityTypeId,
                activityTypeName: selectedActivity.value,
                createdBy: res.createdBy,
                createdDate: res.createdDate,
                id: res.id,
                isDeleteable: true,
                mainProcess: res.mainProcess,
                modifiedBy: res.modifiedBy,
                modifiedDate: res.modifiedDate,
                processTypeId: res.processTypeId,
                processTypeName: selectedProcessType.value,
                processTypeColor: selectedProcessType.color,
                status: res.status

            }])))
            .then(firstActivityAdd ? (
                setFirstActivityAdd(true),
                setSeciliTab('Business Process'),
                handleClick('Business Process')
            ) : (
                setOnModal(false),
                setFirstActivityAdd(false)
            ))
            // await FetchApiGet('services/TaskManagement/JobDescription/GetAllJobDescriptions', 'GET')
            // .then((res) => res.json())
            // .then((res) => res.data)
            // .then((res) => setJobDescriptionFilteredDatas(res));

            let disableButton = await activityTypeOptions.map((item) => item.id === selectedActivity.id ? { ...item, isDeleteable: false } : item);
            setActivityTypeFilteredDatas(disableButton);

            let disableButton2 = await activityTypes.map((item) => item.id === selectedActivity.id ? { ...item, isDeleteable: false } : item);
            setActivityTypeFilteredDatas(disableButton2);
        } else {
            setErrorShow(true);
        }
    }

    const handleCloseModal = () => {
        setOnModal(false)
        setFirstActivityAdd(false)
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
                return {value:data?.mainProcess}
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
                            header={t('Add Main Process')}
                            body={
                                <div>
                                <SingleSelects
                              options={processTypeOptions.map((option) => ({
                                id: option.id,
                                value: option.title,
                                label: <div className='activity-types-select-with-color'>
                                <div style={{backgroundColor: option.color}} className='activity-types-select-with-color__box'></div>
                                <div className='activity-types-select-with-color__text'>{option.title}</div>
                            </div>,
                            color: option.color
                            }))}
                                isStar={true}
                                label={t('process type')}
                                isSortable={false}
                                width={'100%'}
                                handleChange={handleGetActivityTypes}
                                setSelectedItems={setSelectedProcessType}
                                clearIcon={false}
                                />
                            <SingleSelects
                                options={activityTypeOptions.map((option) => ({
                                    id: option.id,
                                    value: option.title,
                                    label: <div className='activity-types-select-with-color'>
                                    <div style={{backgroundColor: option.color, opacity: .8}} className='activity-types-select-with-color__box'></div>
                                    <div className='activity-types-select-with-color__text'>{option.title}</div>
                                </div>,
                                color: option.color
                                }))}
                                selectedItems={selectedActivity}
                                setSelectedItems={setSelectedActivity}
                                isStar={true}
                                label={t('activity types')}
                                isSortable={false}
                                width={'100%'}
                                clearIcon={false}
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
                                        />
                                </div>
                            }
                            footer={
                                <>
                                    <Button variant="light" onClick={() => handleCloseModal()}>
                                        {t('cancel')}
                                    </Button>
                                    <Button variant="primary" onClick={() => createJobDescription()} disabled={mainProcessText === ""  || selectedActivity === undefined || selectedProcessType === null}>
                                        {t('add')}
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
                        options={processTypeOptions.map((option) => ({
                            id: option.id,
                            value: option.title,
                            label: <div className='activity-types-select-with-color'>
                            <div style={{backgroundColor: option.color, opacity: .8}} className='activity-types-select-with-color__box'></div>
                            <div className='activity-types-select-with-color__text'>{option.title}</div>
                        </div>,
                        color: option.color
                        }))}
                        onChange={(e) => handleGetActivityTypes(e)}
                    ></Select>
                </div>
                <div className="job-description-activity-select">
                    <div>{t('activity types')}</div>
                    <Select
                        isMulti={false}
                        className="react-select"
                        placeholder={t("select")}
                        classNamePrefix="react-select"
                        isDisabled={selectedProcessType === null}
                        onChange={(e) => setSelectedActivity(e)}
                        value={selectedActivity}
                        options={activityTypeOptions.map((option) => ({
                            id: option.id,
                            value: option.title,
                            label: <div className='activity-types-select-with-color'>
                            <div style={{backgroundColor: option.color, opacity: .8}} className='activity-types-select-with-color__box'></div>
                            <div className='activity-types-select-with-color__text'>{option.title}</div>
                        </div>,
                        color: option.color
                        }))}></Select>
                </div>
                <div className="job-description-process-select">
                    <div>{t('add main process')}</div>
                    <Form.Control list="datalistOptions" id="exampleDataList" type="text" placeholder={t('search for an option...')} value={mainProcessText} onChange={(e) => filterBySearch(e)} disabled={selectedActivity === null}></Form.Control>
                </div>

                {
                    filteredList.length > 0 && (
                        <datalist id="datalistOptions" style={{width: "100%", maxHeight: "50px", position: "relative"}} >
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
                <Button variant="light" onClick={() => handleCloseModal()}>
                    {t('cancel')}
                </Button>
                <Button variant="primary" onClick={() => createJobDescription()} disabled={mainProcessText === ""}>
                    {t('add')}
                </Button>
            </div> */}
        </div>
    );
};

export default JobDescription;
