import React, { useState } from 'react';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
// import '../../../../../assets/scss/custom/components/alertModal.scss';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useRef } from 'react';

const RejectModal = ({ modalShow, setModalShow, rejectItem, pageListFilteredDatas, setPageListFilteredDatas }) => {
    const { t } = useTranslation();
    const [rejectReason, setRejectReason] = useState('');
    const reasonArea = useRef(0);
    const createdBy = localStorage.getItem('userName');
    const onHide = () => {
        setModalShow(true);
    };
    const toggle = () => {
        setModalShow(false);
    };

    const rejectNeedBtn = () => {
        if (rejectReason) {
            const data = {
                contentId: rejectItem.contentId,
                appStatus: 3,
                modifiedBy: createdBy,
                rejectReason: rejectReason,
            };
            FetchApiPost('services/Pages/Disadvantage/ApprovePageForDisadvantage', 'POST', data)
                .then((res) => {
                    if (res.status === 200) {
                        const filteredArr = pageListFilteredDatas?.map((el) => {
                            if (el.contentId === Number(rejectItem.contentId)) {
                                return { ...el, isApprovedContent: 3 };
                            }
                            return el;
                        });
                        setPageListFilteredDatas(filteredArr);
                        setModalShow(false);
                    }
                })
                .catch((err) => console.log('Error', err));
        } else {
            reasonArea.current.style.borderColor = 'red';
        }
    };
    return (
        <div className="alert-modal">
            <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                <Modal.Body>
                    <div className="alert-modal-items">
                        <div className="alert-modal-icon" style={{ marginTop: '5px' }}>
                            <Icon path={mdiAlertCircleOutline} size={3} color="#FFBC00" />
                        </div>
                        <div className="alert-modal-title" style={{ marginTop: '10px' }}>
                            <span style={{ color: '#6C757D' }}>{t('Warning')}</span>
                        </div>
                        <div style={{ marginBottom: '17px', marginTop: '10px' }} className="alert-modal-question">
                            {t('Are you sure you want to reject')} {rejectItem?.passportOfProductName} {t('need')}?
                        </div>
                        <FloatingLabel controlId="floatingTextarea" label={t("Reject Reason")} className="mb-3">
                            <Form.Control
                                as="textarea"
                                placeholder={t('Please enter a reject reason')}
                                style={{ maxHeight: '75px', margin: 0, borderColor: '#cecece' }}
                                ref={reasonArea}
                                onChange={(e) => setRejectReason(e.target.value)}
                            />
                        </FloatingLabel>
                        <div className="alert-modal-buttons">
                            <button
                                style={{
                                    backgroundColor: '#FFBC00',
                                    color: '#3B3B3B',
                                    fontWeight: '600',
                                    width: '75px',
                                }}
                                className="cancel"
                                onClick={rejectNeedBtn}>
                                {t('Reject')}
                            </button>
                            <button
                                style={{
                                    backgroundColor: '#EEF2F7',
                                    color: '#3B3B3B',
                                    fontWeight: '600',
                                    width: '75px',
                                }}
                                className="cancel"
                                onClick={toggle}>
                                {t('Go Back')}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default React.memo(RejectModal);
