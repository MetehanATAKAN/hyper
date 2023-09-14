import React, { useEffect, useState } from 'react';
import UpdateActivityModal from './UpdateActivityModal';
import { Modal } from 'react-bootstrap';
import UpdateJobDescriptionModal from './UpdateJobDescriptionModal';
import UpdateParentProcessModal from './UpdateParentProcessModal';
import DeleteItemModal from './DeleteItemModal';
import { FetchApiPost } from '../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
const MainTable = ({
    tableTabs,
    subProcess,
    parentProcess,
    businessProcess,
    jobDescription,
    activityTypes,
    seciliTab,
    setActivityTypes,
    setJobDescription,
    setBusinessProcess,
    setParentProcess,
    setSubProcess,
    setUpdateBusinessProcess,
    setUpdateSubProcess,
    setMainModal,
}) => {
    const { t } = useTranslation();
    const [onModal, setOnModal] = useState(false);
    const [updateActivityType, setUpdateActivityType] = useState({});

    const [deleteModal, setDeleteModal] = useState({ modalStatus: false, item: {} });

    const [sortOrder, setSortOrder] = useState([
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false],
        [false, false],
        [false],
    ]);

    const handleActivityTypeChange = (value) => {
        setUpdateActivityType(value);
        setOnModal(true);
    };

    const handleSort = async (tabName) => {
        let array = [...sortOrder];
        if (tabName === 'Activity Types') {
            if (seciliTab === 'Activity Types') {
                let newState = await activityTypes.sort((a, b) => {
                    let fa = a.title.toLowerCase(),
                        fb = b.title.toLowerCase();
                    if (fa < fb) {
                        return array[0][0] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[0][0] ? -1 : 1;
                    }
                    return 0;
                });
                setActivityTypes([...newState]);
                array[0][0] = !array[0][0];
                setSortOrder([...array]);
            } else if (seciliTab === 'Job Description') {
                let newState = await jobDescription.sort((a, b) => {
                    let fa = a.activityTypeName.toLowerCase(),
                        fb = b.activityTypeName.toLowerCase();
                    if (fa < fb) {
                        return array[0][1] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[0][1] ? -1 : 1;
                    }
                    return 0;
                });
                setJobDescription([...newState]);
                array[0][1] = !array[0][1];
                setSortOrder([...array]);
            } else if (seciliTab === 'Business Process') {
                let newState = await businessProcess[0].sort((a, b) => {
                    let fa = a.activityTypeName.toLowerCase(),
                        fb = b.activityTypeName.toLowerCase();
                    if (fa < fb) {
                        return array[0][2] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[0][2] ? -1 : 1;
                    }
                    return 0;
                });
                setBusinessProcess([[...newState]]);
                array[0][2] = !array[0][2];
                setSortOrder([...array]);
            } else if (seciliTab === 'Process') {
                let newState = await parentProcess.sort((a, b) => {
                    let fa = a.activityTypeName?.toLowerCase(),
                        fb = b.activityTypeName?.toLowerCase();
                    if (fa < fb) {
                        return array[0][3] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[0][3] ? -1 : 1;
                    }
                    return 0;
                });
                setParentProcess([...newState]);
                array[0][3] = !array[0][3];
                setSortOrder([...array]);
            } else if (seciliTab === 'Sub Process') {
                let newState = await subProcess[0].sort((a, b) => {
                    let fa = a.activityTypeName.toLowerCase(),
                        fb = b.activityTypeName.toLowerCase();
                    if (fa < fb) {
                        return array[0][4] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[0][4] ? -1 : 1;
                    }
                    return 0;
                });
                setSubProcess([[...newState]]);
                array[0][4] = !array[0][4];
                setSortOrder([...array]);
            }
        } else if (tabName === 'Job Description') {
            if (seciliTab === 'Job Description') {
                let newState = await jobDescription.sort((a, b) => {
                    let fa = a.mainProcess.toLowerCase(),
                        fb = b.mainProcess.toLowerCase();
                    if (fa < fb) {
                        return array[1][0] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[1][0] ? -1 : 1;
                    }
                    return 0;
                });
                setJobDescription([...newState]);
                array[1][0] = !array[1][0];
                setSortOrder([...array]);
            } else if (seciliTab === 'Business Process') {
                let newState = await businessProcess[0].sort((a, b) => {
                    let fa = a.mainProcessName.toLowerCase(),
                        fb = b.mainProcessName.toLowerCase();
                    if (fa < fb) {
                        return array[1][1] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[1][1] ? -1 : 1;
                    }
                    return 0;
                });
                setBusinessProcess([[...newState]]);
                array[1][1] = !array[1][1];
                setSortOrder([...array]);
            } else if (seciliTab === 'Process') {
                let newState = await parentProcess.sort((a, b) => {
                    let fa = a.mainProcessName?.toLowerCase(),
                        fb = b.mainProcessName?.toLowerCase();
                    if (fa < fb) {
                        return array[1][2] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[1][2] ? -1 : 1;
                    }
                    return 0;
                });
                setParentProcess([...newState]);
                array[1][2] = !array[1][2];
                setSortOrder([...array]);
            } else if (seciliTab === 'Sub Process') {
                let newState = await subProcess[0].sort((a, b) => {
                    let fa = a.mainProcessName.toLowerCase(),
                        fb = b.mainProcessName.toLowerCase();
                    if (fa < fb) {
                        return array[1][3] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[1][3] ? -1 : 1;
                    }
                    return 0;
                });
                setSubProcess([[...newState]]);
                array[1][3] = !array[1][3];
                setSortOrder([...array]);
            }
        } else if (tabName === 'Business Process') {
            if (seciliTab === 'Business Process') {
                let newState = await businessProcess[0].sort((a, b) => {
                    let fa = a.businessProcessName.toLowerCase(),
                        fb = b.businessProcessName.toLowerCase();
                    if (fa < fb) {
                        return array[2][0] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[2][0] ? -1 : 1;
                    }
                    return 0;
                });
                setBusinessProcess([[...newState]]);
                array[2][0] = !array[2][0];
                setSortOrder([...array]);
            } else if (seciliTab === 'Process') {
                let newState = await parentProcess.sort((a, b) => {
                    let fa = a.businessProcessName?.toLowerCase(),
                        fb = b.businessProcessName?.toLowerCase();
                    if (fa < fb) {
                        return array[2][1] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[2][1] ? -1 : 1;
                    }
                    return 0;
                });
                setParentProcess([...newState]);
                array[2][1] = !array[2][1];
                setSortOrder([...array]);
            } else if (seciliTab === 'Sub Process') {
                let newState = await subProcess[0].sort((a, b) => {
                    let fa = a.businessProcessName.toLowerCase(),
                        fb = b.businessProcessName.toLowerCase();
                    if (fa < fb) {
                        return array[2][2] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[2][2] ? -1 : 1;
                    }
                    return 0;
                });
                setSubProcess([[...newState]]);
                array[2][2] = !array[2][2];
                setSortOrder([...array]);
            }
        } else if (tabName === 'Process') {
            if (seciliTab === 'Process') {
                let newState = await parentProcess.sort((a, b) => {
                    let fa = a.title.toLowerCase(),
                        fb = b.title.toLowerCase();
                    if (fa < fb) {
                        return array[3][0] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[3][0] ? -1 : 1;
                    }
                    return 0;
                });
                setParentProcess([...newState]);
                array[3][0] = !array[3][0];
                setSortOrder([...array]);
            } else if (seciliTab === 'Sub Process') {
                let newState = await subProcess[0].sort((a, b) => {
                    let fa = a.parentProcessTitle.toLowerCase(),
                        fb = b.parentProcessTitle.toLowerCase();
                    if (fa < fb) {
                        return array[3][1] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[3][1] ? -1 : 1;
                    }
                    return 0;
                });
                setSubProcess([[...newState]]);
                array[3][1] = !array[3][1];
                setSortOrder([...array]);
            }
        } else if (tabName === 'Sub Process') {
            if (seciliTab === 'Sub Process') {
                let newState = await subProcess[0].sort((a, b) => {
                    let fa = a.title.toLowerCase(),
                        fb = b.title.toLowerCase();
                    if (fa < fb) {
                        return array[4][0] ? 1 : -1;
                    }
                    if (fa > fb) {
                        return array[4][0] ? -1 : 1;
                    }
                    return 0;
                });
                setSubProcess([[...newState]]);
                array[4][0] = !array[4][0];
                setSortOrder([...array]);
            }
        }
    };

    const updateBusinessProcess = (event) => {
        setMainModal(true);
        const updateData = businessProcess[0].find((item) => item.id === Number(event.target.id));
        setUpdateBusinessProcess([updateData]);
    };
    const updateSubProcess = (event) => {
        setMainModal(true);
        const updateData = subProcess[0].find((item) => item.id === Number(event.target.id));
        setUpdateSubProcess([updateData]);
    };
    return (
        <div className="task-management-table">
            {/* <div
                className={`task-management-table__headers task-management-header-${
                    seciliTab === 'Activity Types'
                        ? 'activity'
                        : seciliTab === 'Job Description'
                        ? 'job'
                        : seciliTab === 'Business Process'
                        ? 'business'
                        : seciliTab === 'Parent'
                        ? 'parent'
                        : 'sub'
                }`}>
                {tableTabs.map((tab, key) => (
                    <div key={key}>
                        <span>{t(tab.label)}</span>
                        <button onClick={() => handleSort(tab.label)}>
                            <i className="fa-solid fa-arrow-down-wide-short"></i>
                        </button>
                    </div>
                ))}
            </div> */}
            <div
                className={`task-management-table__container task-management-container-${
                    seciliTab === 'Activity Types'
                        ? 'activity'
                        : seciliTab === 'Main Process'
                        ? 'job'
                        : seciliTab === 'Business Process'
                        ? 'business'
                        : seciliTab === 'Process'
                        ? 'parent'
                        : 'sub'
                }`}>
                {/* {seciliTab === 'Activity Types' && (
                    <>
                        <div className="task-management-table-column ">
                            {activityTypes?.map((activity, key) => (
                                <div
                                    key={key}
                                    className="task-management-table-row task-management-table-row-alone-item"
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span
                                        className="task-management-activity-background"
                                        style={{ backgroundColor: activity.color }}>
                                        {activity.title}
                                    </span>
                                    <span className="task-management-table-column__icons">
                                        <button onClick={() => handleActivityTypeChange(activity)}>
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                        <button
                                            disabled={!activity.isDeleteable}
                                            onClick={() => setDeleteModal({ modalStatus: true, item: activity })}>
                                            <i
                                                className={`fa-solid fa-trash-can task-management-table-column__icons-deleted-${activity.isDeleteable}`}></i>
                                        </button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )} */}
                {/* {seciliTab === 'Job Description' && (
                    <>
                        <div className="task-management-table-column">
                            {jobDescription?.map((activity, key) => (
                                <div key={key} className="task-management-table-row">
                                    <span
                                        className="task-management-activity-background"
                                        style={{ backgroundColor: activity.activityTypeColor }}>
                                        {activity.activityTypeName}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="task-management-table-column">
                            {jobDescription?.map((job, key) => (
                                <div
                                    key={key}
                                    className="task-management-table-row"
                                    style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    {job.mainProcess}{' '}
                                    <span className="task-management-table-column__icons">
                                        <button onClick={() => handleActivityTypeChange(job)}>
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                        <button
                                            disabled={!job.isDeleteable}
                                            onClick={() => setDeleteModal({ modalStatus: true, item: job })}>
                                            <i
                                                className={`fa-solid fa-trash-can task-management-table-column__icons-deleted-${job.isDeleteable}`}></i>
                                        </button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )} */}
                {/* {seciliTab === 'Business Process' && (
                    <>
                        <div className="task-management-table-column">
                            {businessProcess[0]?.map((activity, key) => (
                                <div key={key} className="task-management-table-row">
                                    <span
                                        className="task-management-activity-background"
                                        style={{ backgroundColor: activity.activityTypeColor }}>
                                        {activity.activityTypeName}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="task-management-table-column">
                            {businessProcess[0]?.map((job, key) => (
                                <div key={key} className="task-management-table-row">
                                    {job.mainProcessName}
                                </div>
                            ))}
                        </div>
                        <div className="task-management-table-column">
                            {businessProcess[0]?.map((process, key) => (
                                <div
                                    key={key}
                                    className="task-management-table-row"
                                    style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    {process.businessProcessName}{' '}
                                    <span className="task-management-table-column__icons">
                                        <button title={t('UPDATE')} id={process.id} onClick={updateBusinessProcess}>
                                            <i
                                                id={process.id}
                                                onClick={updateBusinessProcess}
                                                className="fa-solid fa-pencil"></i>
                                        </button>
                                        <button
                                            title={
                                                process.isDeleteable
                                                    ? t('delete')
                                                    : t(
                                                          'You can not delete this process. Firstly delete linked processes.'
                                                      )
                                            }
                                            disabled={!process.isDeleteable}
                                            onClick={() => setDeleteModal({ modalStatus: true, item: process })}>
                                            <i
                                                className={`fa-solid fa-trash-can task-management-table-column__icons-deleted-${process.isDeleteable}`}></i>
                                        </button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )} */}
                {/* {seciliTab === 'Parent' && (
                    <>
                        <div className="task-management-table-column">
                            {parentProcess?.map((activity, key) => (
                                <div key={key} className="task-management-table-row">
                                    <span
                                        className="task-management-activity-background"
                                        style={{ backgroundColor: activity.activityTypeColor }}>
                                        {activity.activityTypeName}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="task-management-table-column">
                            {parentProcess?.map((job, key) => (
                                <div key={key} className="task-management-table-row">
                                    {job.mainProcessName}
                                </div>
                            ))}
                        </div>
                        <div className="task-management-table-column">
                            {parentProcess?.map((process, key) => (
                                <div key={key} className="task-management-table-row">
                                    {process.businessProcessName}
                                </div>
                            ))}
                        </div>
                        <div className="task-management-table-column">
                            {parentProcess?.map((process, key) => (
                                <div
                                    key={key}
                                    className="task-management-table-row"
                                    style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    {process.title}{' '}
                                    <span className="task-management-table-column__icons">
                                        <button onClick={() => handleActivityTypeChange(process)}>
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                        <button
                                            disabled={!process.isDeleteable}
                                            onClick={() => setDeleteModal({ modalStatus: true, item: process })}>
                                            <i
                                                className={`fa-solid fa-trash-can task-management-table-column__icons-deleted-${process.isDeleteable}`}></i>
                                        </button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )} */}
                {/* {seciliTab === 'Sub Process' && (
                    <>
                        <div className="task-management-table-column">
                            {subProcess[0]?.map((activity, key) => (
                                <div key={key} className="task-management-table-row">
                                    <span
                                        className="task-management-activity-background"
                                        style={{ backgroundColor: activity.activityTypeColor }}>
                                        {activity.activityTypeName}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="task-management-table-column">
                            {subProcess[0]?.map((job, key) => (
                                <div key={key} className="task-management-table-row">
                                    {job.mainProcessName}
                                </div>
                            ))}
                        </div>
                        <div className="task-management-table-column">
                            {subProcess[0]?.map((process, key) => (
                                <div key={key} className="task-management-table-row">
                                    {process.businessProcessName}
                                </div>
                            ))}
                        </div>
                        <div className="task-management-table-column">
                            {subProcess[0]?.map((process, key) => (
                                <div key={key} className="task-management-table-row">
                                    {process.parentProcessTitle}
                                </div>
                            ))}
                        </div>
                        <div className="task-management-table-column">
                            {subProcess[0]?.map((process, key) => (
                                <div
                                    key={key}
                                    className="task-management-table-row"
                                    style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    {process.title}{' '}
                                    <span className="task-management-table-column__icons">
                                        <button title={t('UPDATE')} id={process.id} onClick={updateSubProcess}>
                                            <i
                                                id={process.id}
                                                onClick={updateSubProcess}
                                                className="fa-solid fa-pencil"></i>
                                        </button>
                                        <button
                                            title={
                                                process.isDeleteable
                                                    ? t('delete')
                                                    : t(
                                                          'You can not delete this process. Firstly delete linked processes.'
                                                      )
                                            }
                                            disabled={!process.isDeleteable}
                                            onClick={() => setDeleteModal({ modalStatus: true, item: process })}>
                                            <i
                                                className={`fa-solid fa-trash-can task-management-table-column__icons-deleted-${process.isDeleteable}`}></i>
                                        </button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )} */}
            </div>

            <Modal show={onModal} onHide={() => setOnModal(false)} className="task-management__modal">
                <Modal.Header>
                    <Modal.Title>{seciliTab}</Modal.Title>
                    <button className="task-management__modal-close-btn" onClick={() => setOnModal(false)}>
                        <i className="dripicons-cross"></i>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    {/* {seciliTab === 'Activity Types' && (
                        <UpdateActivityModal updateActivityType={updateActivityType} setOnModal={setOnModal} />
                    )} */}
                    {/* {seciliTab === 'Job Description' && (
                        <UpdateJobDescriptionModal updateActivityType={updateActivityType} setOnModal={setOnModal} />
                    )} */}
                    {/* {seciliTab === 'Parent' && (
                        <UpdateParentProcessModal updateActivityType={updateActivityType} setOnModal={setOnModal} />
                    )} */}
                </Modal.Body>
            </Modal>
            {/* {deleteModal.modalStatus && (
                <DeleteItemModal
                    deleteModal={deleteModal}
                    seciliTab={seciliTab}
                    setDeleteModal={setDeleteModal}
                    activityTypes={activityTypes}
                    jobDescription={jobDescription}
                    businessProcess={businessProcess}
                    parentProcess={parentProcess}
                    subProcess={subProcess}
                    setActivityTypes={setActivityTypes}
                    setJobDescription={setJobDescription}
                    setBusinessProcess={setBusinessProcess}
                    setParentProcess={setParentProcess}
                    setSubProcess={setSubProcess}
                />
            )} */}
        </div>
    );
};

export default MainTable;
