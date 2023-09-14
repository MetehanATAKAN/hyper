import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import PharmacySplitPercentProblem from '../../../components/Modals/PharmacySplitPercentProblem';

const BusinessProcess = (props) => {
    const {
        setOnModal,
        businessProcess,
        setBusinessProcess,
        updateBusinessProcess,
        setUpdateBusinessProcess,
        activityTypes,
        setActivityTypes,
        firstActivityAdd,
        setFirstActivityAdd,
        setSeciliTab,
        setTableTabs,
        tableTabs,
        setJobDescription,
        jobDescription,
        processType,
        setParentProcess,
        parentProcess,
        jobDescriptionFilteredDatas,
        setJobDescriptionFilteredDatas,
        businessProcessFilteredDatas,
        setBusinessProcessFilteredDatas,
        processFilteredDatas,
        setProcessFilteredDatas,
        setTest,
        onModal
    } = props;
    const { t } = useTranslation();
    const [errorShow, setErrorShow] = useState(false);

    const [selectedProcessType, setSelectedProcessType] = useState(null);

    const [selectActivity, setSelectActivity] = useState({
        id: 0,
        value: t('select'),
        label: t('select'),
    });
    const [activityTypeOptions, setActivityTypeOptions] = useState([]);
    const [selectJobDescription, setSelectJobDescription] = useState({
        id: 0,
        value: t('select'),
        label: t('select'),
    });
    const [jobDescriptionOptions, setJobDescriptionOptions] = useState([]);
    const [businessProcessName, setBusinessProcessName] = useState('');
    const [departmant, setDepartmant] = useState([]);
    const [selectedDepartmant, setSelectedDepartmant] = useState(null);

    const handleChange = (e) => {
        setBusinessProcessName(e.target.value);
    };
    const loggedUserName = localStorage.getItem('userName');

    const [filteredList, setFilteredList] = useState([]);
    const [filterBusinessProcess, setFilterBusinessProcess] = useState([]);

    const handleClick = (label) => {
        let newState = tableTabs.map((tab) =>
            tab.label === label ? { ...tab, activeLink: 'management-tab-active' } : { ...tab, activeLink: '' }
        );
        setTableTabs(newState);
        setSeciliTab(label);
    };

    useEffect(() => {
        // Business Process
        FetchApiGet('services/TaskManagement/BusinessProcess/GetAllBusinessProcess', 'GET')
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setFilterBusinessProcess([res]))
            .catch((e) => console.log('TaskManagementIndex Job Description', e));
    }, []);

    useEffect(() => {
        FetchApiGet('api/OldSystem/GetDepartmant', 'GET')
            .then((res) => res.json())
            .then((res) => setDepartmant(res));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTest(true);
        let checkName = await filterBusinessProcess[0].filter((item) => item.mainProcessId === selectJobDescription.id);
        let text = businessProcessName.trim();
        let newText = text.charAt(0).toUpperCase() + text.slice(1)
        let checkName2 = await checkName.filter((item) => item.businessProcessName === newText);
        if (updateBusinessProcess.length === 0) {
            if (newText !== '') {
                if (checkName2.length === 0) {
                    (async () => {
                        try {
                            const businessData = await {
                                businesProcessTitle: newText,
                                createdBy: loggedUserName,
                                jobDescriptionId: Number(selectJobDescription.id),
                                ownerDepartmantId: selectedDepartmant.id,
                                ownerDepartmant: selectedDepartmant.value,
                            };
                            await FetchApiPost(
                                'services/TaskManagement/BusinessProcess/CreateBusinessProcess',
                                'POST',
                                businessData
                            ).then(res => res.json())
                            .then(res => res.data)
                            .then(res => (setBusinessProcessFilteredDatas(prev => [...prev, {
                                processTypeColor: selectedProcessType.color,
                                processTypeName: selectedProcessType.value,
                                processTypeId: selectedProcessType.id,
                                activityTypeName: selectActivity.value,
                                activityTypeId: selectActivity.id,
                                activityTypeColor: selectActivity.color,
                                mainProcessName: selectJobDescription.value,
                                mainProcessId: selectJobDescription.id,
                                businessProcessName: res.businessProcessTitle.trim(),
                                id: res.id,
                                ownerDepartmant: res.ownerDepartmant,
                                ownerDepartmantId: res.ownerDepartmantId,
                                createdBy: res.createdBy,
                                createdDate: res.createdDate,
                                isDeleteable: true,
                                status: res.status,
                                modifiedBy: res.modifiedBy,
                                modifiedDate: res.modifiedDate
                            }]),
                            setBusinessProcess(prev => [...prev, {
                                processTypeColor: selectedProcessType.color,
                                processTypeName: selectedProcessType.value,
                                processTypeId: selectedProcessType.id,
                                activityTypeName: selectActivity.value,
                                activityTypeId: selectActivity.id,
                                activityTypeColor: selectActivity.color,
                                mainProcessName: selectJobDescription.value,
                                mainProcessId: selectJobDescription.id,
                                businessProcessName: res.businessProcessTitle.trim(),
                                id: res.id,
                                ownerDepartmant: res.ownerDepartmant,
                                ownerDepartmantId: res.ownerDepartmantId,
                                createdBy: res.createdBy,
                                createdDate: res.createdDate,
                                isDeleteable: true,
                                status: res.status,
                                modifiedBy: res.modifiedBy,
                                modifiedDate: res.modifiedDate
                            }])));
                            // const response = await FetchApiGet(
                            //     'services/TaskManagement/BusinessProcess/GetAllBusinessProcess',
                            //     'GET'
                            // );
                            // const json = await response.json();
                            // await setBusinessProcess([json.data]);
                            if (firstActivityAdd) {
                                setFirstActivityAdd(true);
                                setSeciliTab('Parent');
                                handleClick('Parent');
                            } else {
                                setOnModal(false);
                                setFirstActivityAdd(false);
                                setBusinessProcessName('');
                            }
                            let disableButton = await jobDescriptionFilteredDatas.map((item) =>
                                item.id === selectJobDescription.id ? { ...item, isDeleteable: false } : item
                            );
                            setJobDescriptionFilteredDatas(disableButton);

                            let disableButton2 = await jobDescription.map((item) =>
                                item.id === selectJobDescription.id ? { ...item, isDeleteable: false } : item
                            );
                            setJobDescription(disableButton2);
                        } catch (error) {
                            console.log(error);
                        }
                    })();
                } else {
                    setErrorShow(true);
                }
            }
            if (newText === '') {
                setOnModal(false);
            }
        }
        if (updateBusinessProcess.length > 0) {
            if (newText !== '') {
                if (checkName2.length === 0) {
                    (async () => {
                        try {
                            const businessData = await {
                                id: updateBusinessProcess[0].id,
                                businesProcessTitle: newText,
                                createdBy: loggedUserName,
                                jobDescriptionId: Number(selectJobDescription.id),
                                ownerDepartmantId: selectedDepartmant.id,
                                ownerDepartmant: selectedDepartmant.value,
                            };
                            await FetchApiPost(
                                'services/TaskManagement/BusinessProcess/UpdateBusinessProcess',
                                'POST',
                                businessData
                            );

                            let newBusinessProcess = await businessProcessFilteredDatas.map((item) => item.id === updateBusinessProcess[0].id ? { ...item, businessProcessName: newText, ownerDepartmant: selectedDepartmant.value} : item);
                            setBusinessProcessFilteredDatas(newBusinessProcess);
                            let newParentProcess = await processFilteredDatas.map((item) => item.businessProcessId === updateBusinessProcess[0].id ? { ...item, businessProcessName: newText, ownerDepartmant: selectedDepartmant.value } : item);
                            setProcessFilteredDatas(newParentProcess);

                            let newBusinessProcess2 = await businessProcess.map((item) => item.id === updateBusinessProcess[0].id ? { ...item, businessProcessName: newText, ownerDepartmant: selectedDepartmant.value} : item);
                            setBusinessProcess(newBusinessProcess2);
                            let newParentProcess2 = await parentProcess.map((item) => item.businessProcessId === updateBusinessProcess[0].id ? { ...item, businessProcessName: newText, ownerDepartmant: selectedDepartmant.value } : item);
                            setParentProcess(newParentProcess2);

                            setBusinessProcessName('');
                            await setUpdateBusinessProcess([]);
                            setOnModal(false);
                        } catch (error) {
                            console.log(error);
                        }
                    })();
                } else if (checkName2.length === 1 && checkName2[0].id === updateBusinessProcess[0].id) {
                    (async () => {
                        try {
                            const businessData = await {
                                id: updateBusinessProcess[0].id,
                                businesProcessTitle: newText,
                                createdBy: loggedUserName,
                                jobDescriptionId: Number(selectJobDescription.id),
                                ownerDepartmantId: selectedDepartmant.id,
                                ownerDepartmant: selectedDepartmant.value,
                            };
                            await FetchApiPost(
                                'services/TaskManagement/BusinessProcess/UpdateBusinessProcess',
                                'POST',
                                businessData
                            );
                            
                            let newBusinessProcess = await businessProcessFilteredDatas.map((item) => item.id === updateBusinessProcess[0].id ? { ...item, businessProcessName: newText, ownerDepartmant: selectedDepartmant.value} : item);
                            setBusinessProcessFilteredDatas(newBusinessProcess);
                            let newParentProcess = await processFilteredDatas.map((item) => item.businessProcessId === updateBusinessProcess[0].id ? { ...item, businessProcessName: newText, ownerDepartmant: selectedDepartmant.value } : item);
                            setProcessFilteredDatas(newParentProcess);

                            let newBusinessProcess2 = await businessProcess.map((item) => item.id === updateBusinessProcess[0].id ? { ...item, businessProcessName: newText, ownerDepartmant: selectedDepartmant.value} : item);
                            setBusinessProcess(newBusinessProcess2);
                            let newParentProcess2 = await parentProcess.map((item) => item.businessProcessId === updateBusinessProcess[0].id ? { ...item, businessProcessName: newText, ownerDepartmant: selectedDepartmant.value } : item);
                            setParentProcess(newParentProcess2);

                            setBusinessProcessName('');
                            await setUpdateBusinessProcess([]);
                            setOnModal(false);
                        } catch (error) {
                            console.log(error);
                        }
                    })();
                } else {
                    setErrorShow(true);
                }
            }

            if (newText === '') {
                setOnModal(false);
                setUpdateBusinessProcess([]);
            }
        }
    };
    const handleClose = () => {
        setErrorShow(false);
    };

    const changeProcessType = (e) => {
        setSelectedProcessType(e);
        FetchApiGet(
            `services/TaskManagement/ActivityType/GetActivityTypeListByProcessTypeId?processTypeId=${e.id}`,
            'GET'
        )
            .then((res) => res.json())
            .then((res) => res.data)
            // .then(res => setActivityTypeOptions(res))
            .then((res) =>
                res.length === 1
                    ? (setSelectActivity({
                          id: res[0].id,
                          value: res[0].title,
                          label: (
                              <div className="activity-types-select-with-color">
                                  <div
                                      style={{ backgroundColor: res[0].color, opacity: 0.8 }}
                                      className="activity-types-select-with-color__box"></div>
                                  <div className="activity-types-select-with-color__text">{res[0].title}</div>
                              </div>
                          ),
                          color: res[0].color,
                      }),
                      setActivityTypeOptions(res),
                      setBusinessProcessName(''),
                      setSelectedDepartmant(null),
                      changeActivity(res[0]))
                    : (setActivityTypeOptions(res),
                      setSelectActivity({
                          id: 0,
                          value: t('select'),
                          label: t('select'),
                          color: '',
                      }),
                      setSelectJobDescription({
                          id: 0,
                          value: t('select'),
                          label: t('select'),
                      }),
                      setBusinessProcessName(''),
                      setSelectedDepartmant(null))
            );
    };
    const changeActivity = (e) => {
        FetchApiGet(
            `services/TaskManagement/JobDescription/GetJobDescriptionListByActivityTypeId?activityTypeId=${e.id}`,
            'GET'
        )
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) =>
                res.length === 1
                    ? (setSelectJobDescription({ id: res[0].id, value: res[0].mainProcess, label: res[0].mainProcess }),
                      setJobDescriptionOptions([res]),
                      setBusinessProcessName(''),
                      setSelectedDepartmant(null))
                    : (setJobDescriptionOptions([res]),
                      setSelectJobDescription({
                          id: 0,
                          value: t('select'),
                          label: t('select'),
                      }),
                      setBusinessProcessName(''),
                      setSelectedDepartmant(null))
            );
    };

    const changeJobDescription = (e) => {
        setSelectJobDescription(e);
    };

    useEffect(() => {
        if (updateBusinessProcess.length > 0) {
            setSelectedProcessType({
                id: updateBusinessProcess[0].processTypeId,
                value: updateBusinessProcess[0].processTypeName,
                label: (
                    <div className="activity-types-select-with-color">
                        <div
                            style={{ backgroundColor: updateBusinessProcess[0].processTypeColor, opacity: 0.8 }}
                            className="activity-types-select-with-color__box"></div>
                        <div className="activity-types-select-with-color__text">
                            {updateBusinessProcess[0].processTypeName}
                        </div>
                    </div>
                ),
                color: updateBusinessProcess[0].processTypeColor
            });
            setSelectActivity({
                id: updateBusinessProcess[0].activityTypeId,
                value: updateBusinessProcess[0].activityTypeName,
                label: (
                    <div className="activity-types-select-with-color">
                        <div
                            style={{ backgroundColor: updateBusinessProcess[0].activityTypeColor, opacity: 0.8 }}
                            className="activity-types-select-with-color__box"></div>
                        <div className="activity-types-select-with-color__text">
                            {updateBusinessProcess[0].activityTypeName}
                        </div>
                    </div>
                ),
                color: updateBusinessProcess[0].activityTypeColor
            });
            setSelectJobDescription({
                id: updateBusinessProcess[0].mainProcessId,
                value: updateBusinessProcess[0].mainProcessName,
                label: updateBusinessProcess[0].mainProcessName,
            });
            setBusinessProcessName(updateBusinessProcess[0].businessProcessName);
            setSelectedDepartmant({
                id: updateBusinessProcess[0].ownerDepartmantId,
                value: updateBusinessProcess[0].ownerDepartmant,
                label: updateBusinessProcess[0].ownerDepartmant,
            });
        }
    }, [updateBusinessProcess]);
    useEffect(() => {
        if (selectActivity.id !== 0) {
            FetchApiGet(
                `services/TaskManagement/JobDescription/GetJobDescriptionListByActivityTypeId?activityTypeId=${selectActivity.id}`,
                'GET'
            )
                .then((res) => res.json())
                .then((json) => setJobDescriptionOptions([json.data]))
                .catch((err) => console.log(err));
        }
    }, [selectActivity]);
    useEffect(() => {
        // FetchApiGet('services/TaskManagement/ActivityType/GetAllActivityTypes', 'GET')
        //     .then((res) => res.json())
        //     .then((res) => res.data)
        //     .then((res) => setActivityTypes(res));
    }, []);
    const filterBySearch = (event) => {
        setBusinessProcessName(event.target.value);
        const query = event.target.value;
        let updateList = [...filterBusinessProcess[0]];

        updateList = updateList.filter(function (item) {
            return item.businessProcessName.toLowerCase().search(query.toLowerCase()) !== -1;
        });
        if (event.target.value.length === 0) {
            setFilteredList([]);
        } else {
            setFilteredList(updateList);
        }
    };

    return (
        <div className="job-description-add">
            {errorShow && (
                <PharmacySplitPercentProblem
                    show={errorShow}
                    handleClose={handleClose}
                    messages={t('Business process name already exists')}
                />
            )}
            {
                onModal &&
                <>
                  <div className="job-description-add__container">
                <div>
                    <div style={{display: 'flex', flexWrap: 'nowrap'}}>
                        <div>{t('process type')}</div>
                        <span style={{color: 'red', marginLeft: '4px'}}>*</span>
                    </div>
                    <Select
                        isMulti={false}
                        isDisabled={updateBusinessProcess.length > 0}
                        className="react-select"
                        placeholder={t('select')}
                        classNamePrefix="react-select"
                        value={selectedProcessType}
                        onChange={changeProcessType}
                        options={processType?.map((option) => ({
                            id: option.id,
                            value: option.title,
                            label: (
                                <div className="activity-types-select-with-color">
                                    <div
                                        style={{ backgroundColor: option.color, opacity: 0.8 }}
                                        className="activity-types-select-with-color__box"></div>
                                    <div className="activity-types-select-with-color__text">{option.title}</div>
                                </div>
                            ),
                            color: option.color,
                        }))}></Select>
                </div>
                <div className="parent-process-activity-type">
                    <div style={{display: 'flex', flexWrap: 'nowrap'}}>
                        <div>{t('activity types')}</div>
                        <span style={{color: 'red', marginLeft: '4px'}}>*</span>
                    </div>
                    <Select
                        isMulti={false}
                        isDisabled={
                            updateBusinessProcess.length > 0 ? true : selectedProcessType === null ? true : false
                        }
                        className="react-select"
                        placeholder={t('select')}
                        classNamePrefix="react-select"
                        value={selectActivity}
                        onChange={(e) => (changeActivity(e), setSelectActivity(e))}
                        options={activityTypeOptions?.map((option) => ({
                            id: option.id,
                            value: option.title,
                            label: (
                                <div className="activity-types-select-with-color">
                                    <div
                                        style={{ backgroundColor: option.color, opacity: 0.8 }}
                                        className="activity-types-select-with-color__box"></div>
                                    <div className="activity-types-select-with-color__text">{option.title}</div>
                                </div>
                            ),
                            color: option.color,
                        }))}></Select>
                </div>
                <div className="parent-process-job-description">
                    <div style={{display: 'flex', flexWrap: 'nowrap'}}>
                        <div>{t('main process')}</div>
                        <span style={{color: 'red', marginLeft: '4px'}}>*</span>
                    </div>
                    <Select
                        isDisabled={selectActivity.id === 0 || updateBusinessProcess.length > 0}
                        isMulti={false}
                        className="react-select"
                        placeholder={t('select')}
                        classNamePrefix="react-select"
                        onChange={(e) => changeJobDescription(e)}
                        value={selectJobDescription}
                        options={jobDescriptionOptions[0]?.map((option) => ({
                            id: option.id,
                            value: option.mainProcess,
                            label: option.mainProcess,
                        }))}></Select>
                </div>

                <div className="business-process-process-select">
                    <div style={{display: 'flex', flexWrap: 'nowrap'}}>
                        <div>{t('add business process')}</div>
                        <span style={{color: 'red', marginLeft: '4px'}}>*</span>
                    </div>
                    <Form.Control
                        list="datalistOptions"
                        id="exampleDataList"
                        onChange={(e) => filterBySearch(e)}
                        disabled={selectJobDescription.id === 0}
                        type="text"
                        data-testid="business-process-name"
                        value={businessProcessName}
                        placeholder={t('business process')}></Form.Control>
                </div>
                <div>
                    <div style={{display: 'flex', flexWrap: 'nowrap'}}>
                        <div>{t('owner business departmant')}</div>
                        <span style={{color: 'red', marginLeft: '4px'}}>*</span>
                    </div>
                    <Select
                        isDisabled={businessProcessName.trim().length === 0 && true}
                        value={selectedDepartmant}
                        isMulti={false}
                        className="react-select"
                        classNamePrefix="react-select"
                        options={departmant?.map((option) => ({
                            id: option.DepartmantId,
                            value: option.DepartmantName,
                            label: option.DepartmantName,
                        }))}
                        onChange={(e) => setSelectedDepartmant(e)}
                        placeholder={t('select')}></Select>
                </div>

                {filteredList.length > 0 && (
                    <datalist id="datalistOptions" style={{ width: '100%' }}>
                        {filteredList.map((item, index) => (
                            <option style={{ minWidth: '300px' }} key={index} value={item.businessProcessName} />
                        ))}
                    </datalist>
                )}
            </div>
            <div className="task-management-footer-btn">
                <Button
                    variant="light"
                    onClick={() => {
                        setOnModal(false);
                        setUpdateBusinessProcess([]);
                        setFirstActivityAdd(false);
                    }}>
                    {t('cancel')}
                </Button>
                <Button
                    disabled={selectedDepartmant === null || businessProcessName.trim().length === 0}
                    data-testid="create-business-process"
                    variant={updateBusinessProcess.length > 0 ? 'warning' : 'primary'}
                    className={updateBusinessProcess.length > 0 && 'task-management-footer-btn__update'}
                    onClick={handleSubmit}>
                    {updateBusinessProcess.length > 0 ? t('update') : t('add')}
                </Button>
            </div>
                </>
            }
        </div>
    );
};

export default BusinessProcess;
