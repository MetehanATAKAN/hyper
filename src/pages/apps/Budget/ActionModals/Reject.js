import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FetchApiPost } from '../../../../utils/http.helper';

const Reject = (props) => {
    const { modalShow, setModalShow, item, applyBudgetFilter } = props;
    const { t } = useTranslation();
    const [rejectReason, setRejectReason] = useState('');
    const [budgetDataById, setBudgetDataById] = useState(null);
    const reasonArea = useRef(0);
    const createdBy = localStorage.getItem('userName');
    const onHide = () => {
        setModalShow(true);
    };
    const toggle = () => {
        setModalShow(false);
    };
    useEffect(() => {
        if (item.itemId === 0) return;
        const postData = { budgetId: Number(item.itemId) };
        FetchApiPost('services/Budget/Budget/GetBudgetById', 'POST', postData)
            .then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) =>
                        setBudgetDataById({
                            year: data.yearId,
                            company: data.companyName,
                            department: data.departmentName,
                            center: data.accountCostCenterName,
                        })
                    );
                }
            })
            .catch((err) => console.log(err));
    }, [item]);
    const rejectNeedBtn = () => {
        if (rejectReason) {
            const data = {
                budgetId: item.itemId,
                approveStatus: item.selectedStatus.id,
                approverName: createdBy,
                RejectReason: rejectReason,
            };
            FetchApiPost('services/Budget/Budget/ApproveBudget', 'POST', data).then((res) => {
                if (res.status === 200) {
                    applyBudgetFilter();
                    setModalShow(false);
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
                            <Icon path={mdiAlertCircleOutline} size={3} color="#FFBC00" />
                        </div>
                        <div className="alert-modal-title" style={{ marginTop: '10px' }}>
                            <span style={{ color: '#6C757D' }}>{t('Warning')}</span>
                        </div>
                        <div style={{ marginBottom: '17px', marginTop: '10px' }} className="alert-modal-question">
                            {t(`Are you sure you want to reject this budget ?`)}
                            {budgetDataById !== null &&
                                `${budgetDataById.year} - ${budgetDataById.company} / ${budgetDataById.department} / ${budgetDataById.center}`}
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

export default React.memo(Reject);
