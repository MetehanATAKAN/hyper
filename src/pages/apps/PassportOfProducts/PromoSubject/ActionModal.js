import React, { useEffect, useState } from 'react'

import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiCheckCircleOutline,mdiPencilCircleOutline, mdiSendCheck } from '@mdi/js';
import Icon from '@mdi/react';
import { FetchApiPost } from '../../../../utils/http.helper';

const ActionModal = ({ modalShow, setModalShow, item, tableData, setTableData,setapproveStatus }) => {
    const { t } = useTranslation();

    console.log('item',item);
    console.log(tableData);
    const [selectedData, setSelectedData] = useState();

    console.log(selectedData);
    const onHide = () => {
        setModalShow(true);
    };

    useEffect(() => {
        tableData?.map((el, i) => {
            if (Number(el.id) === Number(item.itemId)) {
                setSelectedData(el);
            }
            return el
        });
    }, [tableData, item])

    const [btnColor, setBtnColor] = useState('#6C757D');

    useEffect(() => {
        if (item.selectedStatus.value === 'Approval') {
            setBtnColor('#FFBC00');
        } else if (item.selectedStatus.value === 'Approved') {
            setBtnColor('#0ACF97');
        } else {
            setBtnColor('#6C757D');
        }
    }, [item]);

    const handleClick = () => {
        let changedData = {};
        const arr = tableData.map((el, i) => {
            if (el.id === item.itemId) {
                console.log(el);
                changedData = {
                    id: el.id,
                    approveStatus: item.selectedStatus.value === "Editable" ? 1 : item.selectedStatus.value === "Approval" ? 2 : item.selectedStatus.value === "Approved" ? 3 : null,
                    approverName: 'string',              
                    rejectReason : 'string'
                };
                return { ...el, approveStatus: item.selectedStatus.id };
            }
            return el;
        });
        FetchApiPost('services/Pages/PromoSubject/ApprovePromoSubject', 'POST', changedData);

        console.log(arr);
        setTableData(arr);
        setModalShow(false);
    }
    
  return (
    <div className="alert-modal">
            <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                <Modal.Body>
                    <div className="alert-modal-items">
                        <div className="alert-modal-icon" style={{ marginTop: '2px' }}>
                        {item.selectedStatus.value === 'Redact' && (
                                        <Icon path={mdiPencilCircleOutline} size={3} color="#6C757D" />
                                    )}
                                    {item.selectedStatus.value === 'Approval' && (
                                        <Icon path={mdiSendCheck} size={3} color="#FFBC00" />
                                    )}
                                    {item.selectedStatus.value === 'Approved' && (
                                        <Icon path={mdiCheckCircleOutline} size={3} color="#0ACF97" />
                                    )}
                        </div>
                        <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                            <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                        </div>
                        <div className="alert-modal-question">
                            {t('Are you sure want to send')} {selectedData?.benefit[0].benefitName} / {selectedData?.brandName} {t('for')} {t(item.selectedStatus.value)}?
                        </div>
                        <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                            <button
                                style={{
                                    backgroundColor: btnColor,
                                    color: '#fff',
                                    fontWeight: '600',
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