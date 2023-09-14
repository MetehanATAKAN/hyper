import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';

const DeleteItemModal = ({
    deleteModal,
    setDeleteModal,
    seciliTab,
    activityTypes,
    setActivityTypes,
    subProcess,
    setSubProcess,
    processType,
    setProcessType,
    jobDescription,
    setJobDescription,
    setBusinessProcess,
    businessProcess,
    parentProcess,
    setParentProcess,
    activityTypeFilteredDatas,jobDescriptionFilteredDatas,businessProcessFilteredDatas,processFilteredDatas,
 setActivityTypeFilteredDatas,setJobDescriptionFilteredDatas,setBusinessProcessFilteredDatas,setProcessFilteredDatas
}) => {
    const { t } = useTranslation();
    const deleteElement = [];
    

    const deleteItem = () => {
        if (seciliTab === 'Process Type') {
            FetchApiPost('services/TaskManagement/ProcessType/DeleteProcessType', 'POST', {
                Id: deleteModal.item.id,
            }).then(
                (async () => {
                    let arr = await processType.filter((item) => item.id !== deleteModal.item.id);
                    setProcessType(arr);
                })()
            );
        }
        else if (seciliTab === 'Activity Type') {
            FetchApiPost('services/TaskManagement/ActivityType/DeleteActivityType', 'POST', {
                id: deleteModal.item.id,
            }).then(
                (async () => {
                    let arr = await activityTypeFilteredDatas.filter((item) => item.id !== deleteModal.item.id);
                    await setActivityTypeFilteredDatas(arr);
                    let newArray = await arr.find((item) => item.processTypeId === deleteModal.item.processTypeId);
                    if(newArray === undefined) {
                        let newProcess = await processType?.map((item) => item.id === deleteModal.item.processTypeId ? { ...item, isDeleteable: true } : item);
                        setProcessType(newProcess);
                    }

                    let arr2 = await activityTypes.filter((item) => item.id !== deleteModal.item.id);
                    await setActivityTypes(arr);
                    let newArray2 = await arr2.find((item) => item.processTypeId === deleteModal.item.processTypeId);
                    if(newArray2 === undefined) {
                        let newProcess2 = await processType?.map((item) => item.id === deleteModal.item.processTypeId ? { ...item, isDeleteable: true } : item);
                        setProcessType(newProcess2);
                    }

                })()
            );
        } else if (seciliTab === 'Main Process') {
            FetchApiPost('services/TaskManagement/JobDescription/DeleteJobDescription', 'POST', {
                id: deleteModal.item.id,
            }).then(
                (async () => {
                    let arr = await jobDescriptionFilteredDatas.filter((item) => item.id !== deleteModal.item.id);
                    await setJobDescriptionFilteredDatas(arr);
                    let newArray = await arr.find((item) => item.activityTypeId === deleteModal.item.activityTypeId)
                    if(newArray === undefined) {
                        let newActivity = await activityTypeFilteredDatas?.map((item) => item.id === deleteModal.item.activityTypeId ? { ...item, isDeleteable: true} : item)
                        setActivityTypeFilteredDatas(newActivity);
                    }
                    
                    let arr2 = await jobDescription.filter((item) => item.id !== deleteModal.item.id);
                    
                    await setJobDescription(arr2);
                    let newArray2 = await arr2.find((item) => item.activityTypeId === deleteModal.item.activityTypeId)
                    if(newArray2 === undefined) {
                        let newActivity2 = await activityTypes?.map((item) => item.id === deleteModal.item.activityTypeId ? { ...item, isDeleteable: true} : item)
                        setActivityTypes(newActivity2);
                    }

                })()
            );
            
        } else if (seciliTab === 'Business Process') {
            FetchApiPost('services/TaskManagement/BusinessProcess/DeleteBusinessProcess', 'POST', {
                id: deleteModal.item.id,
            }).then(
                (async () => {
                    let arr = await businessProcess.filter((item) => item.id !== deleteModal.item.id);
                    setBusinessProcessFilteredDatas([arr]);
                    setBusinessProcess(arr)
                    let newArray = await arr.find((item) => item.mainProcessId === deleteModal.item.mainProcessId)
                    if(newArray === undefined) {
                        let newJob = await jobDescriptionFilteredDatas?.map((item) => item.id === deleteModal.item.mainProcessId ? { ...item, isDeleteable: true} : item)
                        setJobDescriptionFilteredDatas(newJob);
                    }
                    let arr2 = await businessProcess.filter((item) => item.id !== deleteModal.item.id);
                    setBusinessProcess(arr);
                    let newArray2 = await arr.find((item) => item.mainProcessId === deleteModal.item.mainProcessId)
                    if(newArray2 === undefined) {
                        let newJob2 = await jobDescription?.map((item) => item.id === deleteModal.item.mainProcessId ? { ...item, isDeleteable: true} : item)
                        setJobDescription(newJob2);
                    }
                })()
            );
        } else if (seciliTab === 'Process') {
            FetchApiPost('services/TaskManagement/ParentProcess/DeleteParentProcess', 'POST', {
                id: deleteModal.item.id,
            }).then(
                (async () => {
                    let arr = await parentProcess.filter((item) => item.id !== deleteModal.item.id);
                    setProcessFilteredDatas(arr);
                    let newArray = await arr.find((item) => item.businessProcessId === deleteModal.item.businessProcessId)
                    if(newArray === undefined) {
                        let newJob = await businessProcessFilteredDatas?.map((item) => item.id === deleteModal.item.businessProcessId ? { ...item, isDeleteable: true} : item)
                        setBusinessProcessFilteredDatas(newJob);
                    }

                    let arr2 = await parentProcess.filter((item) => item.id !== deleteModal.item.id);
                    setParentProcess(arr2);
                    let newArray2 = await arr2.find((item) => item.businessProcessId === deleteModal.item.businessProcessId)
                    if(newArray2 === undefined) {
                        let newJob2 = await businessProcess?.map((item) => item.id === deleteModal.item.businessProcessId ? { ...item, isDeleteable: true} : item)
                        setBusinessProcess(newJob2);
                    }
                })()
            );
        } else if (seciliTab === 'Sub Process') {
            FetchApiPost('services/TaskManagement/SubProcess/DeleteSubProcess', 'POST', {
                id: deleteModal.item.id,
            }).then(
                (async () => {
                    let arr = await subProcess.filter((item) => item.id !== deleteModal.item.id);
                    setSubProcess(arr);
                    let newArray = await arr.find((item) => item.parentProcessId === deleteModal.item.parentProcessId)
                    if(newArray === undefined) {
                        let newJob = await parentProcess?.map((item) => item.id === deleteModal.item.parentProcessId ? { ...item, isDeleteable: true} : item)
                        setParentProcess(newJob);
                    }
                })()
            );
        }
        setDeleteModal({ modalStatus: false, item: {} });
    };
    console.log("deleteElementdeleteElementdeleteElement",deleteElement, seciliTab)
    switch (seciliTab) {
        case 'Process Type':
            deleteElement.push(processType.find((el) => el.id === deleteModal.item.id));
            break;
        case 'Activity Type':
            deleteElement.push(activityTypes.find((el) => el.id === deleteModal.item.id));
            break;
        case 'Main Process':
            deleteElement.push(jobDescription.find((el) => el.id === deleteModal.item.id));
            break;
        case 'Business Process':
            deleteElement.push(businessProcess.find((el) => el.id === deleteModal.item.id));
            break;
        case 'Process':
            deleteElement.push(parentProcess.find((el) => el.id === deleteModal.item.id));
            break;
        case 'Sub Process':
            deleteElement.push(subProcess.find((el) => el.id === deleteModal.item.id));
            break;
        default:
            break;
    }
    console.log("deleteElementdeleteElement",deleteElement);
    return (
        <div className="split-error">
            <Modal show={deleteModal.modalStatus} centered className="split-error-modal">
                <Modal.Body className="text-center">
                    <button
                        className="split-close-button"
                        onClick={() => setDeleteModal({ modalStatus: false, item: {} })}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="split-error-modal__icon">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <div>{t('WARNING')}</div>
                    </div>
                    {seciliTab === 'Process Type' && (
                        <div className="split-error-modal__message">
                            {deleteElement[0].title ?? 'N/A'}, {t('Are you sure you want to delete ?')}
                        </div>
                    )}
                    {seciliTab === 'Activity Type' && (
                        <div className="split-error-modal__message">
                            {`${deleteElement[0].processTypeName ?? 'N/A'} / ${deleteElement[0].title ?? 'N/A'}`}, {t('Are you sure you want to delete ?')}
                        </div>
                    )}
                    {seciliTab === 'Main Process' && (
                        <div className="split-error-modal__message">
                            {`${deleteElement[0].processTypeName ?? 'N/A'} / ${deleteElement[0].activityTypeName ?? 'N/A'} / ${deleteElement[0].mainProcess ?? 'N/A'}`},{''}
                            {t('Are you sure you want to delete ?')}
                        </div>
                    )}
                    {seciliTab === 'Business Process' && (
                        <div className="split-error-modal__message">
                            {`${deleteElement[0]?.processTypeName ?? 'N/A'} / ${deleteElement[0]?.activityTypeName ?? 'N/A'} / ${deleteElement[0]?.mainProcessName ?? 'N/A'} / ${deleteElement[0]?.businessProcessName ?? 'N/A'}`}
                            ,{''} {t('Are you sure you want to delete ?')}
                        </div>
                    )}
                    {seciliTab === 'Process' && (
                        <div className="split-error-modal__message">
                            {`${deleteElement[0]?.activityTypeName ?? 'N/A'} / ${deleteElement[0]?.mainProcessName ?? 'N/A'} / ${deleteElement[0]?.businessProcessName ?? 'N/A'} / ${deleteElement[0]?.title ?? 'N/A'}`}
                            <br/>

                            
                            "{deleteElement[0]?.title ?? 'N/A'}"
                        </div>
                    )}
                    {seciliTab === 'Sub Process' && (
                        <div className="split-error-modal__message">
                            {`${deleteElement[0]?.parentProcessTitle ?? 'N/A'}  / ${deleteElement[0]?.title ?? 'N/A'} / ${deleteElement[0]?.departmantName ?? 'N/A'} / ${deleteElement[0]?.serviceCompanies.join(', ') ?? 'N/A'} / ${deleteElement[0]?.regionalOffices.join(', ') ?? 'N/A'} / ${deleteElement[0]?.productionSides.join(', ') ?? 'N/A'}`}
                            
                            {t('Are you sure you want to delete ?')} <br/>
                            "{deleteModal?.item?.title}"
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="border-top-0 split-error-modal__footer">
                    <div className="split-error-modal__button-container m-auto">
                        <button
                            className="split-cancel-btn"
                            onClick={() => setDeleteModal({ modalStatus: false, item: {} })}>
                            {t('cancel')}
                        </button>
                        <button className="split-delete-btn" onClick={() => deleteItem()}>
                            {t('delete')}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteItemModal;
