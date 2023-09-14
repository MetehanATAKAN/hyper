import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useRef } from 'react';
import { useEffect } from 'react';

const Reject = ({ modalShow, setModalShow, item, applyFilter }) => {
    const { t } = useTranslation();
    const [rejectReason, setRejectReason] = useState('');
    const reasonArea = useRef(0);
    const createdBy = localStorage.getItem('userName');
    const [rejectUrl, setRejectUrl] = useState('services/Pages/Need/ApproveNeed');
    const onHide = () => {
        setModalShow(true);
    };
    const toggle = () => {
        setModalShow(false);
    };
    // useEffect(() => {
    //     if (item.id.charAt(0) === 'T') {
    //         setRejectUrl('services/Pages/TranslateNeed/ApproveTranslateNeed ');
    //     }
    //     if (item.id.charAt(0) === 'N') {
    //         setRejectUrl('services/Pages/Need/ApproveNeed');
    //     }
    // }, [item]);

    console.log(item)

    const rejectNeedBtn = () => {
        if (rejectReason) {
            let data = {
                id: item.item.id,
                needName: item.item.needName,
                content: item.item.content,
                profileId: item.item.profile.id,
                languageId: item.item.language.languageAbbId,
                isApproved: 4,
                specializationIds: item.item.specializations.map((item) => item.specId),
                modifiedBy: createdBy,
                rejectReason: rejectReason.trim(),
            };
            // if (item.id.charAt(0) === 'T') {
            //     data = { ...data, translateNeedName: item.name };
            // }
            FetchApiPost("services/Pages/Need/UpdateNeed", 'POST', data)
                .then((res) => {
                    if (res.status === 201) {
                        applyFilter();
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
                            <Icon path={mdiAlertCircleOutline} size={3} color="#FA5C7C" />
                        </div>
                        <div className="alert-modal-title" style={{ marginTop: '10px' }}>
                            <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                        </div>
                        <div style={{ marginBottom: '17px', marginTop: '10px' }} className="alert-modal-question">
                            {t('Are you sure you want to reject this need ?')} <br /> "{item.name}"
                        </div>
                        <div className="mb-3">
                            <span className="mb-1" style={{ float: 'left' }}>
                                {t('Reject Reason')}{' '}
                            </span>
                            <Form.Control
                                as="textarea"
                                placeholder={t('Please enter a reject reason')}
                                style={{ maxHeight: '75px', margin: 0, borderColor: '#cecece' }}
                                ref={reasonArea}
                                onChange={(e) => setRejectReason(e.target.value)}
                            />
                        </div>

                        <div className="alert-modal-buttons">
                            <button
                                style={{
                                    backgroundColor: '#FA5C7C',
                                    color: '#fff',
                                    fontWeight: '600',
                                    width: '75px',
                                }}
                                className="cancel"
                                onClick={rejectNeedBtn}
                                disabled={rejectReason.trim().length === 0}
                                >
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

export default React.memo(Reject);
