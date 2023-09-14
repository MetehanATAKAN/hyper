import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button, Form } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Recurrence from '../../../components/Recurrence';
import { useDispatch, useSelector } from 'react-redux';
import { cleanUpRecurrenceData, setParentProcessId } from '../../../redux/taskManagement/actions';
import PharmacySplitPercentProblem from '../../../components/Modals/PharmacySplitPercentProblem';

const ParentProcess = ({
    setOnModal,
    setFirstActivityAdd,
    setSeciliTab,
    setTableTabs,
    tableTabs,
    businessProcess2,
    setBusinessProcess2,
    setParentProcess,
    parentProcess,
    setTest,
    setProcessFilteredDatas,
    setBusinessProcessFilteredDatas,
    businessProcessFilteredDatas,
    onModal
}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [finishButton, setFinishButton] = useState(false);
    const [processType, setProcessType] = useState([]);
    const [activityTypes, setActivityTypes] = useState([]);
    const [jobDescription, setJobDescription] = useState([]);
    const [businessProcess, setBusinessProcess] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([
        {
            id: 1,
            value: 'A',
            label: (
                <div className="activity-types-select-with-color">
                    <div
                        style={{ backgroundColor: '#fa5c7c', opacity: 0.8 }}
                        className="activity-types-select-with-color__box"></div>
                    <div className="activity-types-select-with-color__text">A</div>
                </div>
            ),
        },
        {
            id: 2,
            value: 'B',
            label: (
                <div className="activity-types-select-with-color">
                    <div
                        style={{ backgroundColor: '#FFE200', opacity: 0.8 }}
                        className="activity-types-select-with-color__box"></div>
                    <div className="activity-types-select-with-color__text">B</div>
                </div>
            ),
        },
        {
            id: 3,
            value: 'C',
            label: (
                <div className="activity-types-select-with-color">
                    <div
                        style={{ backgroundColor: '#0acf97', opacity: 0.8 }}
                        className="activity-types-select-with-color__box"></div>
                    <div className="activity-types-select-with-color__text">C</div>
                </div>
            ),
        },
    ]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProcessType, setSelectedProcessType] = useState(null);
    const [selectedActivityType, setSelectedActivityType] = useState(null);
    const [selectedJobDescription, setSelectedJobDescription] = useState(null);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [parentProcessText, setParentProcessText] = useState('');
    const [parentId, setParentId] = useState(null);
    const [tabValue, setTabValue] = useState('1');

    const [errorShow, setErrorShow] = useState(false);

    const [filteredList, setFilteredList] = useState([]);
    const [filterParentProcess, setFilterParentProcess] = useState([]);

    useEffect(() => {
        // Parent Process
        FetchApiGet('services/TaskManagement/ParentProcess/GetAllParentProcess', 'GET')
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setFilterParentProcess(res))
            .catch((e) => console.log('TaskManagementIndex Parent Process', e));
    }, []);

    const tabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    useEffect(() => {
        FetchApiGet('services/TaskManagement/ProcessType/GetAllProcessTypes', 'GET')
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setProcessType(res));
    }, []);

    const handleGetActivityTypes = async (process) => {
        await setSelectedProcessType(process);
        await FetchApiGet(
            `services/TaskManagement/ActivityType/GetActivityTypeListByProcessTypeId?processTypeId=${process.id}`,
            'GET'
        )
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) =>
                res.length === 1
                    ? (setActivityTypes(res),
                      setSelectedActivityType({
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
                      handleGetJobDescription({
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
                      }))
                    : (setSelectedActivityType(null),
                      setSelectedJobDescription(null),
                      setActivityTypes(res),
                      setSelectedBusiness(null),
                      setParentProcessText(''),
                      setSelectedCategory(null),
                      setBusinessProcess([]),
                      setSelectedJobDescription(null))
            );
    };

    const handleGetJobDescription = async (activity) => {
        await setSelectedActivityType(activity);
        await FetchApiGet(
            `services/TaskManagement/JobDescription/GetJobDescriptionListByActivityTypeId?activityTypeId=${activity.id}`,
            'GET'
        )
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) =>
                res.length === 1
                    ? (setJobDescription(res),
                      setSelectedJobDescription({
                          id: res[0].id,
                          value: res[0].mainProcess,
                          label: res[0].mainProcess,
                      }),
                      handleGetBusinessProcess({ id: res[0].id, value: res[0].mainProcess, label: res[0].mainProcess }))
                    : (setJobDescription(res),
                      setSelectedJobDescription(null),
                      setSelectedBusiness(null),
                      setBusinessProcess([]))
            );
        await setParentProcessText('');
        await setSelectedCategory(null);
    };

    const handleGetBusinessProcess = async (business) => {
        await setSelectedJobDescription(business);
        await FetchApiGet(
            `services/TaskManagement/BusinessProcess/GetBusinessProcessListByJobDescriptionId?jobDescriptionId=${business.id}`,
            'GET'
        )
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) =>
                res.length === 1
                    ? (setBusinessProcess(res),
                      setSelectedBusiness({
                          id: res[0].id,
                          value: res[0].businessProcessTitle,
                          label: res[0].businessProcessTitle,
                      }))
                    : (setSelectedBusiness(null), setBusinessProcess(res))
            );
        await setParentProcessText('');
        await setSelectedCategory(null);
    };

    const handleCreateParentProcess = async (event) => {
        let checkName = await filterParentProcess.filter((item) => item.businessProcessId === selectedBusiness.id);
        let checkName2 = await checkName.find((item) => item.title === parentProcessText.trim());

        if (checkName2 === undefined) {
            const response = await FetchApiPost('services/TaskManagement/ParentProcess/CreateParentProcess', 'POST', {
                parentProcessTitle: parentProcessText.trim(),
                createdBy: localStorage.getItem('userName') || 'string',
                businesProcessId: selectedBusiness.id,
                category: selectedCategory.value,
            });
            const json = await response.json();
            await setProcessFilteredDatas((prev) => [
                ...prev,
                {
                    title: json.data.title,
                    businessProcessId: json.data.businessProcessId,
                    id: json.data.id,
                    status: json.data.status,
                    category: json.data.category,
                    createdDate: json.data.createdDate,
                    modifiedDate: json.data.modifiedDate,
                    createdBy: json.data.createdBy,
                    modifiedBy: json.data.createdBy,
                    isDeleteable: true,
                    businessProcessName: selectedBusiness.value,
                    ownerDepartmantId: json.data.ownerDepartmantId,
                    ownerDepartmant: json.data.ownerDepartmant,
                    mainProcessId: selectedJobDescription.id,
                    mainProcessName: selectedJobDescription.value,
                    activityTypeId: selectedActivityType.id,
                    activityTypeName: selectedActivityType.value,
                    activityTypeColor: selectedActivityType.color,
                    processTypeId: selectedProcessType.id,
                    processTypeName: selectedProcessType.value,
                    processTypeColor: selectedProcessType.color,
                },
            ]);
            await setParentProcess((prev) => [
                ...prev,
                {
                    title: json.data.title,
                    businessProcessId: json.data.businessProcessId,
                    id: json.data.id,
                    status: json.data.status,
                    category: json.data.category,
                    createdDate: json.data.createdDate,
                    modifiedDate: json.data.modifiedDate,
                    createdBy: json.data.createdBy,
                    modifiedBy: json.data.createdBy,
                    isDeleteable: true,
                    businessProcessName: selectedBusiness.value,
                    ownerDepartmantId: json.data.ownerDepartmantId,
                    ownerDepartmant: json.data.ownerDepartmant,
                    mainProcessId: selectedJobDescription.id,
                    mainProcessName: selectedJobDescription.value,
                    activityTypeId: selectedActivityType.id,
                    activityTypeName: selectedActivityType.value,
                    activityTypeColor: selectedActivityType.color,
                    processTypeId: selectedProcessType.id,
                    processTypeName: selectedProcessType.value,
                    processTypeColor: selectedProcessType.color,
                },
            ]);

            await dispatch(setParentProcessId(json.data.id));
            await setParentId(json.data.id);
            await FetchApiGet('services/TaskManagement/ParentProcess/GetAllParentProcess', 'GET')
                .then((res) => res.json())
                .then((res) => res.data)
                .then((res) => setParentProcess(res));

            tabChange(event, '2');
            setFirstActivityAdd(false);

            let disableButton = await businessProcess2[0]?.map((item) =>
                item.id === selectedBusiness.id ? { ...item, isDeleteable: false } : item
            );
            setBusinessProcess2([disableButton]);

            let disableButton2 = await businessProcessFilteredDatas?.map((item) =>
                item.id === selectedBusiness.id ? { ...item, isDeleteable: false } : item
            );
            setBusinessProcessFilteredDatas(disableButton2);
            setTest(true);
        } else {
            setErrorShow(true);
        }
    };

    const tabStyle = {
        color: '#5d636a',
        textTransform: 'none',
        fontWeight: '600',
    };
    const recurrenceDatas = useSelector((state) => state.TaskManagement.recurrenceData);
    const recurrenceType = useSelector((state) => state.TaskManagement.recurrenceType);
    const recurrenceAddBtn = () => {
        if (finishButton === false) {
            setFinishButton(true);
        }
        if (finishButton === 'completed') {
            (async () => {
                try {
                    await FetchApiPost(
                        `services/TaskManagement/ParentProcess/CreateRecurrenceParentProcessFor${recurrenceType}`,
                        'POST',
                        recurrenceDatas
                    );
                    await setOnModal(false);
                    await setFirstActivityAdd(false);
                    await dispatch(cleanUpRecurrenceData());
                    await setFinishButton(false);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    };

    const handleClose = () => {
        setErrorShow(false);
    };

    const filterBySearch = (event) => {
        setParentProcessText(event.target.value);
        const query = event.target.value;
        let updateList = [...filterParentProcess];

        updateList = updateList.filter(function (item) {
            return item.title.toLowerCase().search(query.toLowerCase()) !== -1;
        });
        if (event.target.value.length === 0) {
            setFilteredList([]);
        } else {
            setFilteredList(updateList);
        }
    };

    const [buttonDisableStatus, setButtonDisableStatus] = useState(true)
    useEffect(() => {
        if(selectedProcessType === null || selectedActivityType === null || selectedJobDescription === null || selectedBusiness === null || parentProcessText.trim().length > 0 || selectedCategory === null){
            setButtonDisableStatus(true)
        }else{
            setButtonDisableStatus(false)
        }
    }, [selectedProcessType, selectedActivityType, selectedJobDescription, selectedBusiness, parentProcessText, selectedCategory])

    return (
        <Box sx={{ width: '100%', typography: 'body1', padding: '0' }}>
            {errorShow && (
                <PharmacySplitPercentProblem
                    show={errorShow}
                    handleClose={handleClose}
                    messages={t('Parent process name already exists')}
                />
            )}
            {
                onModal &&
                <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList variant="fullWidth" id="process-tabs" textColor="primary" onChange={tabChange}>
                        <Tab style={tabStyle} label={t('Add')} value="1"></Tab>
                        <Tab
                            style={tabStyle}
                            label={t('Recurrence & Deadline')}
                            disabled={parentId === null ? true : false}
                            value="2"></Tab>
                    </TabList>
                </Box>
                <TabPanel value="1" id="process-tabs__content" sx={{ padding: 0 }}>
                    <div className="parent-process-modal add-parent-process">
                        <div className="parent-process-process-type">
                            <div>{t('process type')}</div>
                            <Select
                                isMulti={false}
                                className="react-select"
                                placeholder={t('select')}
                                classNamePrefix="react-select"
                                onChange={(e) => handleGetActivityTypes(e)}
                                value={selectedProcessType}
                                options={processType.map((option) => ({
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
                            <div>{t('activity type')}</div>
                            <Select
                                isMulti={false}
                                className="react-select"
                                placeholder={t('select')}
                                classNamePrefix="react-select"
                                isDisabled={selectedProcessType === null}
                                onChange={(e) => handleGetJobDescription(e)}
                                value={selectedActivityType}
                                options={activityTypes.map((option) => ({
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
                            <div>{t('main process')}</div>
                            <Select
                                isMulti={false}
                                className="react-select"
                                placeholder={t('select')}
                                classNamePrefix="react-select"
                                onChange={(e) => handleGetBusinessProcess(e)}
                                isDisabled={selectedActivityType === null}
                                value={selectedJobDescription}
                                options={jobDescription.map((option) => ({
                                    id: option.id,
                                    value: option.mainProcess,
                                    label: option.mainProcess,
                                }))}></Select>
                        </div>
                        <div className="parent-process-business-process">
                            <div>{t('business process')}</div>
                            <Select
                                isMulti={false}
                                isDisabled={selectedJobDescription === null}
                                className="react-select"
                                placeholder={t('select')}
                                classNamePrefix="react-select"
                                onChange={(e) => setSelectedBusiness(e)}
                                value={selectedBusiness}
                                options={businessProcess.map((option) => ({
                                    id: option.id,
                                    value: option.businessProcessTitle,
                                    label: option.businessProcessTitle,
                                }))}></Select>
                        </div>
                        <div className="parent-process-add-parent">
                            <div>
                                <div>{t('process')}</div>
                                <Form.Control
                                    type="text"
                                    placeholder={t('search for an option...')}
                                    value={parentProcessText}
                                    onChange={(e) => filterBySearch(e)}
                                    list="datalistOptions"
                                    id="exampleDataList"
                                    disabled={selectedBusiness === null}></Form.Control>
                            </div>
                            {filteredList.length > 0 && (
                                <datalist
                                    id="datalistOptions"
                                    style={{ width: '100%', position: 'absolute', overflow: 'auto' }}>
                                    {filteredList.map((item, index) => (
                                        <option style={{ minWidth: '300px' }} key={index} value={item.title} />
                                    ))}
                                </datalist>
                            )}
                            <div>
                                <div>{t('category')}</div>
                                <Select
                                    isMulti={false}
                                    isDisabled={selectedBusiness === null}
                                    className="react-select"
                                    placeholder={t('select')}
                                    classNamePrefix="react-select"
                                    onChange={(e) => setSelectedCategory(e)}
                                    value={selectedCategory}
                                    options={categoryOptions.map((option) => ({
                                        id: option.id,
                                        value: option.value,
                                        label: option.label,
                                    }))}></Select>
                            </div>
                        </div>
                        <div className="task-management-footer-btn">
                            <Button
                                variant="light"
                                onClick={() => {
                                    setOnModal(false);
                                    setFirstActivityAdd(false);
                                }}>
                                {t('cancel')}
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => handleCreateParentProcess()}
                                disabled={buttonDisableStatus}>
                                {t('add')}
                            </Button>
                        </div>
                    </div>
                </TabPanel>
                {/* Recurrence & Deadline */}
                <TabPanel value="2" id="process-tabs__content">
                    <>
                        <Recurrence recurrenceFinish={finishButton} setRecurrenceFinish={setFinishButton} />
                        <div className="task-management-footer-btn">
                            <Button
                                variant="danger"
                                onClick={() => {
                                    setOnModal(false);
                                    setFirstActivityAdd(false);
                                }}>
                                {t('cancel')}
                            </Button>
                            <Button variant="primary" onClick={recurrenceAddBtn}>
                                {t('add')}
                            </Button>
                        </div>
                    </>
                </TabPanel>
            </TabContext>
            }
        </Box>
    );
};

export default ParentProcess;
