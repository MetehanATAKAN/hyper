import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
// import '../../../../../assets/scss/custom/components/alertModal.scss';
import { useRef } from 'react';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const Reject = ({ modalShow, setModalShow, needId, tableData, setTableData, data }) => {
    const { t } = useTranslation();
    const [rejectReason, setRejectReason] = useState('');
    const history = useHistory();
    const [name, setName] = useState(null);
    const filterData = useSelector( state => state.Need.filterFunct);
    const reasonArea = useRef(0);
    const createdBy = localStorage.getItem('userName');
    const onHide = () => {
        setModalShow(true);
    };
    const toggle = () => {
        setModalShow(false);
    };

    const benefitFilter = () => {

        const benefitBody = filterData;

        FetchApiPost('services/Pages/Benefit/ApplyForBenefitFilter','POST',benefitBody)
        .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setTableData(data.data)
                                })

                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
    }

    const rejectNeedBtn = async () => {
        if (rejectReason) {
            const rejectBody = {
                id: needId?.id,
                approveStatus: 4,
                approverName: createdBy,
                rejectReason: rejectReason,
            };
            FetchApiPost('services/Pages/Benefit/ApproveBenefit', 'POST', rejectBody)
                .then((res) => {
                    if (res.status === 200) {
                        benefitFilter();
                        setModalShow(false);
                    }
                })
                .catch((err) => console.log('Error', err));
        } else {
            reasonArea.current.style.borderColor = 'red';
        }
    };

    useEffect(() => {
      let name = tableData.find( data => data.id === needId.id)
      console.log('namee',name);
        setName(name);
    }, [needId, tableData])
    
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
                            {t('Are you sure you want to reject this benefit ?')} <br/> {name?.benefitName}
                        </div>
                        <FloatingLabel controlId="floatingTextarea" label={t('Reject Reason')} className="mb-3">
                            <Form.Control
                                type='text'
                                placeholder={t('Please enter a reject reason')}
                                style={{ margin: 0, borderColor: '#cecece' }}
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
