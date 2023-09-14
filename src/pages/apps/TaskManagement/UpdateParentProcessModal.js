import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button, Form } from 'react-bootstrap';
import { FetchApiPost, FetchApiGet } from '../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import PharmacySplitPercentProblem from '../../../components/Modals/PharmacySplitPercentProblem';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import RecurrenceUpdate from '../../../components/RecurrenceUpdate';
const UpdateParentProcessModal = ({
    updateParentProcess,
    setOnModal,
    setParentProcess,
    parentProcess,
    subProcess,
    setSubProcess,
    setTest,
    processFilteredDatas,
    setProcessFilteredDatas,
    setSubProcessFilteredDatas,
    subProcessFilteredDatas,
    parentId,
}) => {
    const { t } = useTranslation();
    const [tabValue, setTabValue] = useState('1');
    const [parentProcessText, setParentProcessText] = useState(updateParentProcess.title);
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

    const [selectedCategory, setSelectedCategory] = useState({
        id: updateParentProcess.category === 'A' ? 1 : updateParentProcess.category === 'B' ? 2 : 3,
        value: updateParentProcess.category,
        label: (
            <div className="activity-types-select-with-color">
                <div
                    style={{
                        backgroundColor:
                            updateParentProcess.category === 'A'
                                ? '#fa5c7c'
                                : updateParentProcess.category === 'B'
                                ? '#FFE200'
                                : '#0acf97',
                        opacity: 0.8,
                    }}
                    className="activity-types-select-with-color__box"></div>
                <div className="activity-types-select-with-color__text">{updateParentProcess.category}</div>
            </div>
        ),
    });

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

    const updateData = async () => {
        let checkName = await filterParentProcess.filter(
            (item) => item.businessProcessId === updateParentProcess.businessProcessId
        );
        let text = parentProcessText.trim();
        let newText = text.charAt(0).toUpperCase() + text.slice(1)

        let checkName2 = await checkName.filter((item) => item.title === newText);

        if (checkName2.length === 0) {
            let text = parentProcessText.trim();
            await FetchApiPost('services/TaskManagement/ParentProcess/UpdateParentProcess', 'POST', {
                id: updateParentProcess.id,
                modifiedBy: localStorage.getItem('userName') || updateParentProcess.modifiedBy,
                parentProcessTitle: text.charAt(0).toUpperCase() + text.slice(1),
                businesProcessId: updateParentProcess.businessProcessId,
                category: selectedCategory.value,
            }).then(setTest(true), setOnModal(false));
            let newParentProcess = await parentProcess.map((item) =>
                item.id === updateParentProcess.id ? { ...item, title: parentProcessText } : item
            );
            setParentProcess(newParentProcess);
            let newSubProcess = await subProcess[0].map((item) =>
                item.parentProcessId === updateParentProcess.id
                    ? { ...item, parentProcessTitle: parentProcessText }
                    : item
            );
            setSubProcess([newSubProcess]);

            let newParentProcess2 = await processFilteredDatas.map((item) =>
                item.id === updateParentProcess.id ? { ...item, title: parentProcessText } : item
            );
            setProcessFilteredDatas(newParentProcess2);
            let newSubProcess2 = await subProcessFilteredDatas[0]?.map((item) =>
                item.parentProcessId === updateParentProcess.id
                    ? { ...item, parentProcessTitle: parentProcessText }
                    : item
            );
            setSubProcessFilteredDatas([newSubProcess2]);
        } else if (checkName2.length === 1 && checkName2[0].id === updateParentProcess.id) {
            await FetchApiPost('services/TaskManagement/ParentProcess/UpdateParentProcess', 'POST', {
                id: updateParentProcess.id,
                modifiedBy: localStorage.getItem('userName') || updateParentProcess.modifiedBy,
                parentProcessTitle: parentProcessText,
                businesProcessId: updateParentProcess.businessProcessId,
                category: selectedCategory.value,
            }).then(setTest(true), setOnModal(false));
            let newParentProcess = await parentProcess.map((item) =>
                item.id === updateParentProcess.id ? { ...item, title: parentProcessText } : item
            );
            setParentProcess(newParentProcess);
            let newSubProcess = await subProcess[0].map((item) =>
                item.parentProcessId === updateParentProcess.id
                    ? { ...item, parentProcessTitle: parentProcessText }
                    : item
            );
            setSubProcess([newSubProcess]);

            let newParentProcess2 = await processFilteredDatas.map((item) =>
                item.id === updateParentProcess.id ? { ...item, title: parentProcessText } : item
            );
            setProcessFilteredDatas(newParentProcess2);
            let newSubProcess2 = await subProcessFilteredDatas[0]?.map((item) =>
                item.parentProcessId === updateParentProcess.id
                    ? { ...item, parentProcessTitle: parentProcessText }
                    : item
            );
            setSubProcessFilteredDatas([newSubProcess2]);
        } else {
            setErrorShow(true);
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
    const tabStyle = {
        color: '#5d636a',
        textTransform: 'none',
        fontWeight: '600',
    };
    const tabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    return (
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
                        <Tab style={tabStyle} label={t('Process')} value="1"></Tab>
                        <Tab style={tabStyle} label={t('Recurrence & Deadline')} value="2"></Tab>
                    </TabList>
                </Box>
                <TabPanel value="1" id="process-tabs__content" sx={{ padding: 0 }}>
                    <div className="parent-process-modal">
                        <div className="parent-process-modal__container">
                            <div className="parent-process-process-type">
                                <div>{t('process type')}</div>
                                <Select
                                    isMulti={false}
                                    className="react-select"
                                    placeholder={t('select')}
                                    isDisabled
                                    classNamePrefix="react-select"
                                    value={{
                                        id: updateParentProcess.processTypeId,
                                        value: updateParentProcess.processTypeName,
                                        label: (
                                            <div className="activity-types-select-with-color">
                                                <div
                                                    style={{
                                                        backgroundColor: updateParentProcess.processTypeColor,
                                                        opacity: 0.8,
                                                    }}
                                                    className="activity-types-select-with-color__box"></div>
                                                <div className="activity-types-select-with-color__text">
                                                    {updateParentProcess.processTypeName}
                                                </div>
                                            </div>
                                        ),
                                    }}></Select>
                            </div>
                            <div className="parent-process-activity-type">
                                <div>{t('activity types')}</div>
                                <Select
                                    isMulti={false}
                                    className="react-select"
                                    isDisabled
                                    classNamePrefix="react-select"
                                    value={{
                                        id: updateParentProcess.activityTypeId,
                                        value: updateParentProcess.activityTypeName,
                                        label: (
                                            <div className="activity-types-select-with-color">
                                                <div
                                                    style={{
                                                        backgroundColor: updateParentProcess.activityTypeColor,
                                                        opacity: 0.8,
                                                    }}
                                                    className="activity-types-select-with-color__box"></div>
                                                <div className="activity-types-select-with-color__text">
                                                    {updateParentProcess.activityTypeName}
                                                </div>
                                            </div>
                                        ),
                                    }}></Select>
                            </div>
                            <div className="parent-process-job-description">
                                <div>{t('main process')}</div>
                                <Select
                                    isMulti={false}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    isDisabled
                                    value={{
                                        id: updateParentProcess.mainProcessId,
                                        value: updateParentProcess.mainProcessName,
                                        label: updateParentProcess.mainProcessName,
                                    }}></Select>
                            </div>
                            <div className="parent-process-business-process">
                                <div>{t('business process')}</div>
                                <Select
                                    isMulti={false}
                                    isDisabled
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    value={{
                                        id: updateParentProcess.businessProcessId,
                                        value: updateParentProcess.businessProcessName,
                                        label: updateParentProcess.businessProcessName,
                                    }}></Select>
                            </div>

                            <div className="parent-process-add-parent">
                                <div>
                                    <div>{t('update process')}</div>
                                    <Form.Control
                                        list="datalistOptions"
                                        id="exampleDataList"
                                        type="text"
                                        placeholder={t('search for an option...')}
                                        value={parentProcessText}
                                        onChange={(e) => filterBySearch(e)}></Form.Control>
                                </div>
                                {filteredList.length > 0 && (
                                    <datalist id="datalistOptions" style={{ width: '100%' }}>
                                        {filteredList.map((item, index) => (
                                            <option style={{ minWidth: '300px' }} key={index} value={item.title} />
                                        ))}
                                    </datalist>
                                )}
                                <div>
                                    <div>{t('category')}</div>
                                    <Select
                                        isMulti={false}
                                        className="react-select"
                                        placeholder={t('select')}
                                        classNamePrefix="react-select"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e)}
                                        options={categoryOptions.map((option) => ({
                                            id: option.id,
                                            value: option.value,
                                            label: option.label,
                                        }))}></Select>
                                </div>
                            </div>
                            <div className="task-management-footer-btn">
                                <Button variant="light" onClick={() => setOnModal(false)}>
                                    {t('cancel')}
                                </Button>
                                <Button
                                    variant="warning"
                                    className="task-management-footer-btn__update"
                                    onClick={updateData}
                                    disabled={parentProcessText.trim() === ''}>
                                    {t('update')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="2" id="process-tabs__content">
                    <>
                        <RecurrenceUpdate setOnModal={setOnModal} parentId={parentId} />
                    </>
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default UpdateParentProcessModal;
