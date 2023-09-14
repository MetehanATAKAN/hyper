import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button, Form } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Recurrence from '../../../../../components/Recurrence';
import { useDispatch, useSelector } from 'react-redux';
import { cleanUpRecurrenceData, setParentProcessId } from '../../../../../redux/taskManagement/actions';
import PharmacySplitPercentProblem from '../../../../../components/Modals/PharmacySplitPercentProblem';
import { SingleSelects, MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { NewTextArea, AutoCompleteInput, NewInput } from '../../../../../components/GlobalNew/Inputs';

const Body = ({
    showAddModal,
    setShowAddModal,
    getFilterData,
    setFirstActivityAdd,
    businessProcess2,
    setBusinessProcess2,
    setParentProcess,
    setTest,
    setProcessFilteredDatas,
    setBusinessProcessFilteredDatas,
    businessProcessFilteredDatas,
    tabValue,
    setTabValue,
    onChangeTab,
    setOnChangeTab,
    setAddButtonDisableStatus,
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

    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedProcessType, setSelectedProcessType] = useState();
    const [selectedActivityType, setSelectedActivityType] = useState();
    const [selectedJobDescription, setSelectedJobDescription] = useState();
    const [selectedBusiness, setSelectedBusiness] = useState();
    const [parentProcessText, setParentProcessText] = useState('');
    const [parentId, setParentId] = useState(null);

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
        // await setSelectedProcessType(process);
        if (!process) {
            setSelectedActivityType();
            setActivityTypes([]);
            setSelectedJobDescription();
            setJobDescription([]);
            setBusinessProcess([]);
            setSelectedBusiness();
            setParentProcessText('');
            return;
        }
        await FetchApiGet(
            `services/TaskManagement/ActivityType/GetActivityTypeListByProcessTypeId?processTypeId=${process}`,
            'GET'
        )
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) =>
                res.length === 1
                    ? (setActivityTypes(res),
                      setSelectedActivityType({
                          value: res[0].id,
                          label: (
                              <div className="activity-types-select-with-color">
                                  <div
                                      style={{ backgroundColor: res[0].color, opacity: 0.8 }}
                                      className="activity-types-select-with-color__box"></div>
                                  <div className="activity-types-select-with-color__text">{res[0].title}</div>
                              </div>
                          ),
                      }),
                      handleGetJobDescription(res[0].id))
                    : (setSelectedActivityType(),
                      setSelectedJobDescription(),
                      setActivityTypes(res),
                      setSelectedBusiness(),
                      setParentProcessText(''),
                      setSelectedCategory(),
                      setBusinessProcess([]),
                      setSelectedJobDescription())
            );
    };

    const handleGetJobDescription = async (activity) => {
        if (!activity) {
            setSelectedJobDescription();
            setJobDescription([]);
            setBusinessProcess([]);
            setSelectedBusiness();
            setJobDescription([]);
            setSelectedJobDescription();
            setParentProcessText('');
            return;
        }
        await FetchApiGet(
            `services/TaskManagement/JobDescription/GetJobDescriptionListByActivityTypeId?activityTypeId=${activity}`,
            'GET'
        )
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) =>
                res.length === 1
                    ? (setJobDescription(res),
                      setSelectedJobDescription({
                          value: res[0].id,
                          label: res[0].mainProcess,
                      }),
                      handleGetBusinessProcess(res[0].id))
                    : (setJobDescription(res),
                      setSelectedJobDescription(),
                      setSelectedBusiness(),
                      setBusinessProcess([]))
            );
        await setParentProcessText('');
        await setSelectedCategory();
    };

    const handleGetBusinessProcess = async (business) => {
        if (!business) {
            setBusinessProcess([]);
            setSelectedBusiness();
            setJobDescription([]);
            setSelectedJobDescription();
            setParentProcessText('');
            return;
        }
        await FetchApiGet(
            `services/TaskManagement/BusinessProcess/GetBusinessProcessListByJobDescriptionId?jobDescriptionId=${business}`,
            'GET'
        )
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) =>
                res.length === 1
                    ? (setBusinessProcess(res),
                      setSelectedBusiness({
                          value: res[0].id,
                          label: res[0].businessProcessTitle,
                      }))
                    : (setSelectedBusiness(), setBusinessProcess(res))
            );
        await setParentProcessText('');
        await setSelectedCategory();
    };

    useEffect(() => {
        if (onChangeTab) {
            if (tabValue === '1') {
                handleCreateParentProcess();
            } else if (tabValue === '2') {
                recurrenceAddBtn();
            }
        }
    }, [onChangeTab]);

    const handleCreateParentProcess = async (event) => {
        let checkName = await filterParentProcess.filter((item) => item.businessProcessId === selectedBusiness.value);
        let text = parentProcessText.trim();
        let newText = text.charAt(0).toUpperCase() + text.slice(1)
        let checkName2 = await checkName.find((item) => item.title === newText);
  
        if (checkName2 === undefined) {
            let text = parentProcessText.trim();
            const response = await FetchApiPost('services/TaskManagement/ParentProcess/CreateParentProcess', 'POST', {
                parentProcessTitle:  text.charAt(0).toUpperCase() + text.slice(1),
                createdBy: localStorage.getItem('userName'),
                businesProcessId: selectedBusiness.value,
                category: selectedCategory.value === 1 ? 'A' : selectedCategory.value === 2 ? 'B' : 'C',
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
                    mainProcessId: selectedJobDescription.value,
                    mainProcessName: selectedJobDescription.label,
                    activityTypeId: selectedActivityType.value,
                    activityTypeName: selectedActivityType.label,
                    activityTypeColor: activityTypes.filter(i => selectedActivityType.value === i.id)[0].color,
                    processTypeId: selectedProcessType.value,
                    processTypeName: selectedProcessType.label,
                    processTypeColor: processType.filter(i => selectedProcessType.value === i.id)[0].color
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
                    mainProcessId: selectedJobDescription.value,
                    mainProcessName: selectedJobDescription.label,
                    activityTypeId: selectedActivityType.value,
                    activityTypeName: selectedActivityType.label,
                    activityTypeColor: activityTypes.filter(i => selectedActivityType.value === i.id)[0].color,
                    processTypeId: selectedProcessType.value,
                    processTypeName: selectedProcessType.label,
                    processTypeColor: processType.filter(i => selectedProcessType.value === i.id)[0].color,
                },
            ]);

            await dispatch(setParentProcessId(json.data.id));
            await setParentId(json.data.id);
            await FetchApiGet('services/TaskManagement/ParentProcess/GetAllParentProcess', 'GET')
                .then((res) => res.json())
                .then((res) => res.data)
                .then((res) => setParentProcess(res));

            setOnChangeTab(false);
            tabChange(undefined, '2');
            setFirstActivityAdd(false);

            let disableButton = await businessProcess2[0]?.map((item) =>
                item.id === selectedBusiness.value ? { ...item, isDeleteable: false } : item
            );
            setBusinessProcess2([disableButton]);

            let disableButton2 = await businessProcessFilteredDatas?.map((item) =>
                item.id === selectedBusiness.value ? { ...item, isDeleteable: false } : item
            );
            setBusinessProcessFilteredDatas(disableButton2);
            setTest(true);
        } else {
            setErrorShow(true);
            setOnChangeTab(false);
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
                    await setShowAddModal(false);
                    await setFirstActivityAdd(false);
                    await dispatch(cleanUpRecurrenceData());
                    await setFinishButton(false);
                    setOnChangeTab(false);
                } catch (error) {
                    console.log(error);
                    setOnChangeTab(false);
                }
            })();
        }
    };

    useEffect(() => {
        if (onChangeTab === true && tabValue === '2' && finishButton === 'completed') {
            (async () => {
                try {
                    await FetchApiPost(
                        `services/TaskManagement/ParentProcess/CreateRecurrenceParentProcessFor${recurrenceType}`,
                        'POST',
                        recurrenceDatas
                    );
                    await setShowAddModal(false);
                    await setFirstActivityAdd(false);
                    await dispatch(cleanUpRecurrenceData());
                    await setFinishButton(false);
                    setOnChangeTab(false);
                } catch (error) {
                    console.log(error);
                    setOnChangeTab(false);
                }
            })();
        }
    }, [onChangeTab, tabValue, finishButton, recurrenceType]);

    const handleClose = () => {
        setErrorShow(false);
    };

    const filterBySearch = (event) => {
        const query = event;
        let updateList = [...filterParentProcess];

        updateList = updateList.filter(function (item) {
            return item.title.toLowerCase().search(query.toLowerCase()) !== -1;
        });
        if (event.trim().length === 0) {
            setFilteredList([]);
        } else {
            setFilteredList(updateList);
        }
    };

    useEffect(() => {
        if (tabValue !== '1') return;
        if (parentProcessText.trim().length === 0 || !selectedCategory || !selectedProcessType || !selectedActivityType || !selectedJobDescription || !selectedBusiness) {
            setAddButtonDisableStatus(true);
        } else {
            setAddButtonDisableStatus(false);
        }
    }, [tabValue, parentProcessText, selectedCategory, selectedCategory, selectedProcessType, selectedActivityType, selectedJobDescription, selectedBusiness]);

    useEffect(() => {
        filterBySearch(parentProcessText)
    }, [parentProcessText])

    return (
        <div>
            <Box sx={{ width: '100%', typography: 'body1', padding: '0' }}>
                {errorShow && (
                    <PharmacySplitPercentProblem
                        show={errorShow}
                        handleClose={handleClose}
                        messages={t('Parent process name already exists')}
                    />
                )}
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
                            <div style={{marginTop: '1rem'}}>
                                <SingleSelects
                                    label={t('process type')}
                                    width={'100%'}
                                    options={processType.map((option) => ({
                                        value: option.id,
                                        label: (
                                            <div className="activity-types-select-with-color">
                                                <div
                                                    style={{ backgroundColor: option.color, opacity: 0.8 }}
                                                    className="activity-types-select-with-color__box"></div>
                                                <div className="activity-types-select-with-color__text">
                                                    {option.title}
                                                </div>
                                            </div>
                                        ),
                                    }))}
                                    selectedItems={selectedProcessType}
                                    setSelectedItems={setSelectedProcessType}
                                    isStar={true}
                                    handleChange={(e) => handleGetActivityTypes(e)}
                                    isSortable={false}
                                />
                            </div>

                            <div>
                                <SingleSelects
                                    label={t('activity type')}
                                    width={'100%'}
                                    disabled={!selectedProcessType}
                                    options={activityTypes.map((option) => ({
                                        value: option.id,
                                        label: (
                                            <div className="activity-types-select-with-color">
                                                <div
                                                    style={{ backgroundColor: option.color, opacity: 0.8 }}
                                                    className="activity-types-select-with-color__box"></div>
                                                <div className="activity-types-select-with-color__text">
                                                    {option.title}
                                                </div>
                                            </div>
                                        ),
                                    }))}
                                    selectedItems={selectedActivityType}
                                    setSelectedItems={setSelectedActivityType}
                                    isStar={true}
                                    handleChange={(e) => handleGetJobDescription(e)}
                                    isSortable={false}
                                />
                            </div>

                            <div>
                                <SingleSelects
                                    label={t('main process')}
                                    width={'100%'}
                                    disabled={!selectedActivityType}
                                    options={jobDescription.map((option) => ({
                                        value: option.id,
                                        label: option.mainProcess,
                                    }))}
                                    selectedItems={selectedJobDescription}
                                    setSelectedItems={setSelectedJobDescription}
                                    isStar={true}
                                    handleChange={(e) => handleGetBusinessProcess(e)}
                                />
                            </div>

                            <div>
                                <SingleSelects
                                    label={t('business process')}
                                    width={'100%'}
                                    disabled={!selectedJobDescription}
                                    options={businessProcess.map((option) => ({
                                        value: option.id,
                                        label: option.businessProcessTitle,
                                    }))}
                                    selectedItems={selectedBusiness}
                                    setSelectedItems={setSelectedBusiness}
                                    isStar={true}
                                />
                            </div>

           
                                <div>
                                    <NewInput
                                        label={t('process')}
                                        width='100%'
                                        value={parentProcessText}
                                        dropdownStyle={{ zIndex: 10000001 }}
                                        setValue={setParentProcessText}
                                        placeholder={t('search for an option...')}
                                        disabled={!selectedBusiness}
                                        listName='datalistOptions'
                                        isStar={true}
                                        // options={filteredList}
                                        // filterOption={(inputValue, option) =>
                                        // //     option.title.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        //     console.log(option)
                                        // }
                                    />
                                    {filteredList.length > 0 && (
                                    <datalist
                                        id="datalistOptions"
                                        style={{ width: '100%', position: 'absolute', overflow: 'auto', zIndex: '10000000' }}>
                                        {filteredList.map((item, index) => (
                                            <option style={{ minWidth: '300px' }} key={index} value={item.title} />
                                        ))}
                                    </datalist>
                                )}

                                </div>
                                
                                <div>
                                <SingleSelects
                                    label={t('category')}
                                    width={'100%'}
                                    disabled={!selectedBusiness}
                                    options={categoryOptions.map((option) => ({
                                        value: option.id,
                                        label: option.label,
                                    }))}
                                    selectedItems={selectedCategory}
                                    setSelectedItems={setSelectedCategory}
                                    isStar={true}
                                    isSortable={false}
                                />
                            </div>
                          
                        </div>
                    </TabPanel>
                    {/* Recurrence & Deadline */}
                    <TabPanel value="2" id="process-tabs__content">
                        <>
                            <Recurrence recurrenceFinish={finishButton} setRecurrenceFinish={setFinishButton} />
                        </>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};

export default Body;
