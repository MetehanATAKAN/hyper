import React, { useEffect, useState } from 'react'
import { FetchApiPost } from '../../../../../utils/http.helper';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';

const ActionModal = ({ modalShow, setModalShow, item, pageListFilteredDatas, setPageListFilteredDatas }) => {
    const { t } = useTranslation();

    const [selectedData, setSelectedData] = useState();
    const onHide = () => {
        setModalShow(true);
    };

    useEffect(() => {
        pageListFilteredDatas?.map((el, i) => {
            if (Number(el.contentId) === Number(item.itemId)) {
                setSelectedData(el);
            }
        });
    }, [pageListFilteredDatas, item])

    const handleClick = () => {
        let changedData = {};
        const arr = pageListFilteredDatas.map((el, i) => {
            if (el.contentId === item.itemId) {
                changedData = {
                    contentId: el.contentId,
                    appStatus: item.selectedStatus.value === "Editable" ? 0 : item.selectedStatus.value === "Approval" ? 1 : item.selectedStatus.value === "Approved" ? 2 : null,
                    modifiedBy: localStorage.getItem('userName'),
                    rejectReason: '',
                };
                return { ...el, isApprovedContent: item.selectedStatus.id };
            }
            return el;
        });
        FetchApiPost('services/Pages/Disadvantage/ApprovePageForDisadvantage', 'POST', changedData);
        setPageListFilteredDatas(arr);
        setModalShow(false);
    }
    
  return (
    <div className="alert-modal">
            <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                <Modal.Body>
                    <div className="alert-modal-items">
                        <div className="alert-modal-icon" style={{ marginTop: '2px' }}>
                            <Icon path={mdiAlertCircleOutline} size={3} color="#FA5C7C" />
                        </div>
                        <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                            <span style={{ color: '#6C757D' }}>
                            {
                                item.selectedStatus.value === "Editable" ? t('Are you sure you want to edit it?') : 
                                item.selectedStatus.value === "Approval" ? t('Are you sure you want to approve?') : 
                                item.selectedStatus.value === "Approved" ? t('Are you sure you want to approved?') : null
                            }
                            </span>
                        </div>
                        <div className="alert-modal-question">
                            {selectedData?.passportOfProductName} / {selectedData?.productName} {
                                item.selectedStatus.value === "Editable" ? t('Are you sure you want to send it to edit?') : 
                                item.selectedStatus.value === "Approval" ? t('Are you sure you want to submit it for approval?') : 
                                item.selectedStatus.value === "Approved" ? t('Are you sure you want to approved?') : null
                            }
                        </div>
                        <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                            <button
                                style={{
                                    color: '#fff',
                                    fontWeight: '600',
                                    width: '125px',
                                    whiteSpace: 'nowrap',
                                }}
                                className="delete"
                                onClick={handleClick}>
                                {item.selectedStatus.value === "Editable" ? t('Yes, Editable it!') : item.selectedStatus.value === "Approval" ? t('Yes, Approval it!') : item.selectedStatus.value === "Approved" ? t('Yes, Approved it!') : null}
                            </button>
                            <button
                                style={{
                                    backgroundColor: '#EEF2F7',
                                    color: '#6C757C',
                                    fontWeight: '600',
                                    width: '75px',
                                }}
                                className="cancel"
                                onClick={() => setModalShow(false)}>
                                {t('cancel')}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
  )
}

export default ActionModal