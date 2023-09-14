import React, { useState } from 'react';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useRef } from 'react';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Reject = ({ modalShow, setModalShow, item, apply }) => {
    const { t } = useTranslation();
    const history = useHistory();
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
                id: Number(item.id),
                surveyName: item.name,
                type: Number(item.type),
                categoryId: Number(item.category.value),
                languageAbbId: Number(item.language.value),
                isApproved: item.statusId,
                validStatus: false,
                rejectReason: rejectReason,
                modifiedBy: createdBy,
            };
            FetchApiPost('services/SurveySystem/Survey/UpdateSurvey', 'POST', data).then((res) => {
                if (res.status === 201) {
                    apply();
                    setModalShow(false);
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            });
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
                            {t('Are you sure you want to reject this need ?')} <br /> {item.name}
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
                                    backgroundColor: '#FA5C7C',
                                    color: '#fff',
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

export default React.memo(Reject);
