import React, { useState } from 'react';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
// import '../../../../../assets/scss/custom/components/alertModal.scss';
import { useRef } from 'react';
import { FetchApiPost } from '../../../../utils/http.helper';


const Reject = ({ modalShow, setModalShow, needId, tableData, setTableData, data }) => {
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

    console.log(needId);
    console.log(data);
    const rejectNeedBtn = () => {
        if (rejectReason) {
            const rejectBody = {
                id: data?.id,
                approveStatus: 4,
                approverName: createdBy,
                rejectReason: rejectReason,
            };
            FetchApiPost('services/Pages/PromoSubject/ApprovePromoSubject ', 'POST', rejectBody)
                .then((res) => {
                    if (res.status === 200) {
                        setModalShow(false);
                        // const filteredArr = needFilteredDatas?.filter((el) => el.id !== Number(needId));
                        // const filteredArr = tableData?.map((el) => {
                        //     if (el.id === Number(data?.id)) {
                        //         return { ...el, approveStatus: 4 };
                        //     }
                        //     return el;
                        // });
                        // setTableData(filteredArr);
                        // setTimeout(() => {
                        //     setModalShow(false);
                        // }, 1000);
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
                            {t('Are you sure you want to reject')} {data?.promoSubject} {t('promo subject')}?
                        </div>
                        <FloatingLabel controlId="floatingTextarea" label={t('Reject Reason')} className="mb-3">
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

export default Reject;
