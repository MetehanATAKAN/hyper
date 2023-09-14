import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MainTabs from './MainTabs';
import MainTable from './MainTable';
import MainTable2 from '../../../components/MainTable';

import { Modal, Button } from 'react-bootstrap';
import ProcessType from './ProcessType';
import ActivityTypes from './ActivityTypes';
import JobDescription from './JobDescription';
import ParentProcess from './ParentProcess';
import BusinessProcess from './BusinessProcess';
import SubProcess from './SubProcess';

import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import BusinessProcessTable from './Tables/BusinessProcessTable';
import SubProcessTable from './Tables/SubProcessTable';
import ActivityTypeTable from './Tables/ActivityTypeTable';
import JobDescriptionTable from './Tables/JobDescriptionTable';
import ParentProcessTable from './Tables/ParentProcessTable';
import ProcessTypeTable from './Tables/ProcessTypeTable';
import Tab from '../../../components/Tab';
import BreadCrumb from '../../../components/BreadCrumb';
import GlobalModal from '../../../components/GlobalNew/Modal';

const TaskManagementIndex = () => {
    const [firstActivityAdd, setFirstActivityAdd] = useState(false);
    const { t } = useTranslation();
    const history = useHistory();

    const [selectTab, setSelectTab] = useState({
        key: 0,
        label: 'Process Type',
    });

    const [seciliTab, setSeciliTab] = useState('Process Type');

    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Target Operating Model', url: '/apps/targetoperatingmodel' },
        { label: selectTab?.label },
    ];

    const tabProps = [
        {
            key: 0,
            label: t('Process Type'),
        },
        {
            key: 1,
            label: t('Activity Type'),
        },
        {
            key: 2,
            label: t('Main Process'),
        },
        {
            key: 3,
            label: t('Business Process'),
        },
        {
            key: 4,
            label: t('Process'),
        },
        {
            key: 5,
            label: t('Sub Process'),
        },
    ];

    const [tableTabs, setTableTabs] = useState([
        {
            label: 'Process Type',
            activeLink: 'management-tab-active',
        },
        {
            label: 'Activity Type',
            activeLink: '',
        },
        { label: 'Main Process', activeLink: '' },
        { label: 'Business Process', activeLink: '' },
        { label: 'Process', activeLink: '' },
        { label: 'Sub Process', activeLink: '' },
    ]);

    const [activityTypes, setActivityTypes] = useState([]);
    const [jobDescription, setJobDescription] = useState([]);
    const [businessProcess, setBusinessProcess] = useState([]);

    const [parentProcess, setParentProcess] = useState([]);

    const [updateBusinessProcess, setUpdateBusinessProcess] = useState([]);

    const [subProcess, setSubProcess] = useState([]);
    const [updateSubProcess, setUpdateSubProcess] = useState([]);
    const [selectedTab, setSelectedTab] = useState([]);

    const [maxContentLength, setMaxContentLength] = useState([]);
    const [onModal, setOnModal] = useState(false);

    const [processType, setProcessType] = useState([]);

    const [activityTypeFilteredDatas, setActivityTypeFilteredDatas] = useState([]);
    const [jobDescriptionFilteredDatas, setJobDescriptionFilteredDatas] = useState([]);
    const [businessProcessFilteredDatas, setBusinessProcessFilteredDatas] = useState([]);
    const [processFilteredDatas, setProcessFilteredDatas] = useState([]);
    const [subProcessFilteredDatas, setSubProcessFilteredDatas] = useState([]);

    useEffect(() => {
        // Process Type
        FetchApiGet('services/TaskManagement/ProcessType/GetAllProcessTypes', 'GET')
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setProcessType(res))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        // Activity Types
        FetchApiGet('services/TaskManagement/ActivityType/GetAllActivityTypes', 'GET')
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setActivityTypes(res))
            .catch((e) => console.log('TaskManagementIndex Activity Types', e));
    }, []);

    useEffect(() => {
        // Job Description
        FetchApiGet('services/TaskManagement/JobDescription/GetAllJobDescriptions', 'GET')
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setJobDescription(res))
            .catch((e) => console.log('TaskManagementIndex Job Description', e));
    }, []);

    useEffect(() => {
        // Parent Process
        FetchApiGet('services/TaskManagement/ParentProcess/GetAllParentProcess', 'GET')
            .then((res) => res.json())
            .then((res) => res.data)
            .then((res) => setParentProcess(res))
            .catch((e) => console.log('TaskManagementIndex Parent Process', e));
    }, []);

    useEffect(() => {
        // get business process
        (async () => {
            try {
                const response = await FetchApiGet(
                    'services/TaskManagement/BusinessProcess/GetAllBusinessProcess',
                    'GET'
                );
                const json = await response.json();
                await setBusinessProcess(json.data);
            } catch (error) {
                console.log(error);
            }
        })();
        // get sub process
        (async () => {
            try {
                const response = await FetchApiGet('services/TaskManagement/SubProcess/GetAllSubProcess', 'GET');
                const json = await response.json();
                await setSubProcess(json.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        let array = [];
        for (let index = 0; index < tableTabs.length; index++) {
            if (tableTabs[index].activeLink === 'management-tab-active') {
                array.push({
                    label: tableTabs[index].label,
                    activeLink: tableTabs[index].activeLink,
                });
                setSelectedTab(array);
                break;
            } else {
                array.push({
                    label: tableTabs[index].label,
                    activeLink: tableTabs[index].activeLink,
                });
            }
        }
    }, [tableTabs]);

    const handleClose = () => {
        setOnModal(false);
        setUpdateBusinessProcess([]);
        setUpdateSubProcess([]);
    };

    const [test, setTest] = useState(false);
    console.log(subProcess);

    return (
        <>
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tab selectTab={selectTab} setSelectTab={setSelectTab} tabProps={tabProps} />
            {/* <h3 className="task-management__header">{t('Target Operating Model')}</h3> */}
            <>
                {/* <MainTabs
                    tableTabs={tableTabs}
                    setTableTabs={setTableTabs}
                    setSeciliTab={setSeciliTab}
                    seciliTab={seciliTab}
                    setOnModal={setOnModal}
                /> */}
                {/* <MainTable
                    tableTabs={selectedTab}
                    activityTypes={activityTypes}
                    jobDescription={jobDescription}
                    businessProcess={businessProcess}
                    setUpdateBusinessProcess={setUpdateBusinessProcess}
                    parentProcess={parentProcess}
                    subProcess={subProcess}
                    setUpdateSubProcess={setUpdateSubProcess}
                    seciliTab={seciliTab}
                    setActivityTypes={setActivityTypes}
                    setJobDescription={setJobDescription}
                    setBusinessProcess={setBusinessProcess}
                    setParentProcess={setParentProcess}
                    setSubProcess={setSubProcess}
                    setMainModal={setOnModal}
                /> */}

                {selectTab.key === 0 && (
                    <ProcessTypeTable
                        processType={processType}
                        seciliTab={selectTab.label}
                        setProcessType={setProcessType}
                        setMainModal={setOnModal}
                        activityTypes={activityTypes}
                        setActivityTypes={setActivityTypes}
                        jobDescription={jobDescription}
                        setJobDescription={setJobDescription}
                        businessProcess={businessProcess}
                        setBusinessProcess={setBusinessProcess}
                        parentProcess={parentProcess}
                        setParentProcess={setParentProcess}
                        subProcess={subProcess}
                        setSubProcess={setSubProcess}
                        activityTypeFilteredDatas={activityTypeFilteredDatas}
                        jobDescriptionFilteredDatas={jobDescriptionFilteredDatas}
                        businessProcessFilteredDatas={businessProcessFilteredDatas}
                        processFilteredDatas={processFilteredDatas}
                        setActivityTypeFilteredDatas={setActivityTypeFilteredDatas}
                        setJobDescriptionFilteredDatas={setJobDescriptionFilteredDatas}
                        setBusinessProcessFilteredDatas={setBusinessProcessFilteredDatas}
                        setProcessFilteredDatas={setProcessFilteredDatas}
                        setNewModal={setOnModal}
                    />
                )}

                {selectTab.key === 1 && (
                    <ActivityTypeTable
                        processType={processType}
                        setProcessType={setProcessType}
                        activityTypes={activityTypes}
                        seciliTab={selectTab.label}
                        setActivityTypes={setActivityTypes}
                        setMainModal={setOnModal}
                        jobDescription={jobDescription}
                        setJobDescription={setJobDescription}
                        businessProcess={businessProcess}
                        setBusinessProcess={setBusinessProcess}
                        parentProcess={parentProcess}
                        setParentProcess={setParentProcess}
                        subProcess={subProcess}
                        setSubProcess={setSubProcess}
                        activityTypeFilteredDatas={activityTypeFilteredDatas}
                        jobDescriptionFilteredDatas={jobDescriptionFilteredDatas}
                        businessProcessFilteredDatas={businessProcessFilteredDatas}
                        processFilteredDatas={processFilteredDatas}
                        setActivityTypeFilteredDatas={setActivityTypeFilteredDatas}
                        setJobDescriptionFilteredDatas={setJobDescriptionFilteredDatas}
                        setBusinessProcessFilteredDatas={setBusinessProcessFilteredDatas}
                        setProcessFilteredDatas={setProcessFilteredDatas}
                        setNewModal={setOnModal}
                        onNewModal={onModal}
                    />
                )}
                {selectTab.key === 2 && (
                    <JobDescriptionTable
                        processType={processType}
                        jobDescription={jobDescription}
                        seciliTab={selectTab.label}
                        setJobDescription={setJobDescription}
                        setMainModal={setOnModal}
                        activityTypes={activityTypes}
                        setActivityTypes={setActivityTypes}
                        businessProcess={businessProcess}
                        setBusinessProcess={setBusinessProcess}
                        parentProcess={parentProcess}
                        setParentProcess={setParentProcess}
                        subProcess={subProcess}
                        setSubProcess={setSubProcess}
                        activityTypeFilteredDatas={activityTypeFilteredDatas}
                        jobDescriptionFilteredDatas={jobDescriptionFilteredDatas}
                        businessProcessFilteredDatas={businessProcessFilteredDatas}
                        processFilteredDatas={processFilteredDatas}
                        setActivityTypeFilteredDatas={setActivityTypeFilteredDatas}
                        setJobDescriptionFilteredDatas={setJobDescriptionFilteredDatas}
                        setBusinessProcessFilteredDatas={setBusinessProcessFilteredDatas}
                        setProcessFilteredDatas={setProcessFilteredDatas}
                        setNewModal={setOnModal}
                        newModal={onModal}
                    />
                )}
                {selectTab.key === 3 && (
                    <BusinessProcessTable
                        businessProcess={businessProcess}
                        setMainModal={setOnModal}
                        seciliTab={seciliTab}
                        setBusinessProcess={setBusinessProcess}
                        setUpdateBusinessProcess={setUpdateBusinessProcess}
                        jobDescription={jobDescription}
                        setJobDescription={setJobDescription}
                        processType={processType}
                        activityTypes={activityTypes}
                        setActivityTypes={setActivityTypes}
                        jobDescriptionFilteredDatas={jobDescriptionFilteredDatas}
                        businessProcessFilteredDatas={businessProcessFilteredDatas}
                        setJobDescriptionFilteredDatas={setJobDescriptionFilteredDatas}
                        setBusinessProcessFilteredDatas={setBusinessProcessFilteredDatas}
                        test={test}
                        setTest={setTest}
                        setNewModal={setOnModal}
                    />
                )}
                {selectTab.key === 4 && (
                    <ParentProcessTable
                        processType={processType}
                        activityTypes={activityTypes}
                        setActivityTypes={setActivityTypes}
                        jobDescription={jobDescription}
                        setJobDescription={setJobDescription}
                        parentProcess={parentProcess}
                        setMainModal={setOnModal}
                        seciliTab={seciliTab}
                        setParentProcess={setParentProcess}
                        subProcess={subProcess}
                        setSubProcess={setSubProcess}
                        businessProcess={businessProcess}
                        setBusinessProcess={setBusinessProcess}
                        setTest={setTest}
                        test={test}
                        processFilteredDatas={processFilteredDatas}
                        setProcessFilteredDatas={setProcessFilteredDatas}
                        businessProcessFilteredDatas={businessProcessFilteredDatas}
                        setBusinessProcessFilteredDatas={setBusinessProcessFilteredDatas}
                        subProcessFilteredDatas={subProcessFilteredDatas}
                        setSubProcessFilteredDatas={setSubProcessFilteredDatas}
                        setNewModal={setOnModal}
                        setFirstActivityAdd={setFirstActivityAdd}
                        businessProcess2={businessProcess}
                        setBusinessProcess2={setBusinessProcess}
                    />
                )}
                {selectTab.key === 5 && (
                    <SubProcessTable
                        updateSubProcess={updateSubProcess}
                        activityTypes={activityTypes}
                        subProcess={subProcess}
                        seciliTab={selectTab.label}
                        setSubProcess={setSubProcess}
                        setUpdateSubProcess={setUpdateSubProcess}
                        parentProcess={parentProcess}
                        setParentProcess={setParentProcess}
                        setNewModal={setOnModal}
                    />
                )}
            </>
            {onModal && selectTab.key === 0 ? (
                <ProcessType
                    setOnModal={setOnModal}
                    setSeciliTab={setSeciliTab}
                    setProcessType={setProcessType}
                    processType={processType}
                    onModal={onModal}
                />
            ) : selectTab.key === 1 ? (
                <ActivityTypes
                    processType={processType}
                    setProcessType={setProcessType}
                    setOnModal={setOnModal}
                    setFirstActivityAdd={setFirstActivityAdd}
                    firstActivityAdd={firstActivityAdd}
                    setSeciliTab={setSeciliTab}
                    tableTabs={tableTabs}
                    setTableTabs={setTableTabs}
                    setActivityTypes={setActivityTypes}
                    activityTypes={activityTypes}
                    filteredDatas={activityTypeFilteredDatas}
                    setFilteredDatas={setActivityTypeFilteredDatas}
                    onModal={onModal}
                />
            ) : selectTab.key === 2 ? (
                <JobDescription
                    setOnModal={setOnModal}
                    setFirstActivityAdd={setFirstActivityAdd}
                    firstActivityAdd={firstActivityAdd}
                    setSeciliTab={setSeciliTab}
                    tableTabs={tableTabs}
                    setTableTabs={setTableTabs}
                    setJobDescription={setJobDescription}
                    setActivityTypes={setActivityTypes}
                    activityTypes={activityTypes}
                    jobDescription={jobDescription}
                    setActivityTypeFilteredDatas={setActivityTypeFilteredDatas}
                    setJobDescriptionFilteredDatas={setJobDescriptionFilteredDatas}
                    onModal={onModal}
                />
            ) : selectTab.key === 3 ? (
                // <BusinessProcess
                //     businessProcess={businessProcess}
                //     parentProcess={parentProcess}
                //     setParentProcess={setParentProcess}
                //     setBusinessProcess={setBusinessProcess}
                //     updateBusinessProcess={updateBusinessProcess}
                //     setUpdateBusinessProcess={setUpdateBusinessProcess}
                //     setOnModal={setOnModal}
                //     activityTypes={activityTypes}
                //     setActivityTypes={setActivityTypes}
                //     setFirstActivityAdd={setFirstActivityAdd}
                //     firstActivityAdd={firstActivityAdd}
                //     setSeciliTab={setSeciliTab}
                //     tableTabs={tableTabs}
                //     setTableTabs={setTableTabs}
                //     setJobDescription={setJobDescription}
                //     jobDescription={jobDescription}
                //     processType={processType}
                //     jobDescriptionFilteredDatas={jobDescriptionFilteredDatas}
                //     setJobDescriptionFilteredDatas={setJobDescriptionFilteredDatas}
                //     businessProcessFilteredDatas={businessProcessFilteredDatas}
                //     setBusinessProcessFilteredDatas={setBusinessProcessFilteredDatas}
                //     processFilteredDatas={processFilteredDatas}
                //     setProcessFilteredDatas={setProcessFilteredDatas}
                //     setTest={setTest}
                //     onModal={onModal}
                // />
                <></>
            ) : selectTab.key === 4 ? (
                <ParentProcess
                    setOnModal={setOnModal}
                    setFirstActivityAdd={setFirstActivityAdd}
                    firstActivityAdd={firstActivityAdd}
                    setSeciliTab={setSeciliTab}
                    tableTabs={tableTabs}
                    setTableTabs={setTableTabs}
                    businessProcess2={businessProcess}
                    setBusinessProcess2={setBusinessProcess}
                    setParentProcess={setParentProcess}
                    parentProcess={parentProcess}
                    setTest={setTest}
                    test={test}
                    setProcessFilteredDatas={setProcessFilteredDatas}
                    setBusinessProcessFilteredDatas={setBusinessProcessFilteredDatas}
                    businessProcessFilteredDatas={businessProcessFilteredDatas}
                    onModal={onModal}
                />
            ) : selectTab.key === 5 ? (
                // <SubProcess
                //     setSubProcess={setSubProcess}
                //     subProcess={subProcess}
                //     setOnModal={setOnModal}
                //     activityTypes={activityTypes}
                //     parentProcess={parentProcess}
                //     setParentProcess={setParentProcess}
                //     onModal={onModal}
                // />
                <></>
            ) : null}
            {onModal && (selectTab.key === 3 || selectTab.key === 5) && (
                <Modal show={onModal} onHide={handleClose} className="task-management__modal" backdrop={false}>
                    <Modal.Header className="task-management__modal-header">
                        <Modal.Title>
                            {updateBusinessProcess.length > 0
                                ? t('Edit Business Process')
                                : t(`Add ${selectTab.label}`)}
                        </Modal.Title>
                        <button className="task-management__modal-close-btn" onClick={() => handleClose()}>
                            <i className="dripicons-cross"></i>
                        </button>
                    </Modal.Header>
                    <Modal.Body className="task-management__modal-body">
                        {selectTab.key === 3 && (
                            <BusinessProcess
                                businessProcess={businessProcess}
                                parentProcess={parentProcess}
                                setParentProcess={setParentProcess}
                                setBusinessProcess={setBusinessProcess}
                                updateBusinessProcess={updateBusinessProcess}
                                setUpdateBusinessProcess={setUpdateBusinessProcess}
                                setOnModal={setOnModal}
                                activityTypes={activityTypes}
                                setActivityTypes={setActivityTypes}
                                setFirstActivityAdd={setFirstActivityAdd}
                                firstActivityAdd={firstActivityAdd}
                                setSeciliTab={setSeciliTab}
                                tableTabs={tableTabs}
                                setTableTabs={setTableTabs}
                                setJobDescription={setJobDescription}
                                jobDescription={jobDescription}
                                processType={processType}
                                jobDescriptionFilteredDatas={jobDescriptionFilteredDatas}
                                setJobDescriptionFilteredDatas={setJobDescriptionFilteredDatas}
                                businessProcessFilteredDatas={businessProcessFilteredDatas}
                                setBusinessProcessFilteredDatas={setBusinessProcessFilteredDatas}
                                processFilteredDatas={processFilteredDatas}
                                setProcessFilteredDatas={setProcessFilteredDatas}
                                setTest={setTest}
                                onModal={onModal}
                            />
                        )}
                        {selectTab.key === 5 && (
                            <SubProcess
                                setSubProcess={setSubProcess}
                                subProcess={subProcess}
                                setOnModal={setOnModal}
                                activityTypes={activityTypes}
                                parentProcess={parentProcess}
                                setParentProcess={setParentProcess}
                                onModal={onModal}
                            />
                        )}
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

export default TaskManagementIndex;
