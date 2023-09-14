import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiCheckCircleOutline, mdiPencilCircleOutline, mdiSendCheck } from '@mdi/js';
import Icon from '@mdi/react';
import { FetchApiPost } from '../../../../utils/http.helper';
import FailModal from '../../../../components/FailModal';
const ActionModal = (props) => {
    const { modalShow, setModalShow, item, applyFilter } = props;
    const { t } = useTranslation();
    const createdBy = localStorage.getItem('userName');
    const [btnColor, setBtnColor] = useState('#6C757D');
    const [error, setError] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const onHide = () => {
        setModalShow(true);
    };
    useEffect(() => {
        if (item.statusId === 2) {
            setBtnColor('#FFBC00');
        } else if (item.statusId === 3) {
            setBtnColor('#0ACF97');
        } else {
            setBtnColor('#6C757D');
        }
    }, [item]);

    const handleClick = () => {
        const data = {
            id: Number(item.id),
            benefitName: item.item.benefitName,
            content: item.item.content,
            needId: item.item.need.id,
            profileId: item.item.profile.id,
            languageId: item.item.language.languageAbbId,
            isApproved: item.statusId,
            rejectReason: item.item.rejectReason || '',
            specializationIds: item.item.specializations.map((item) => item.specId),
            modifiedBy: createdBy
        };
        FetchApiPost('services/Pages/Benefit/UpdateBenefit', 'POST', data).then((res) => {
            if (res.status === 201) {
                applyFilter();
                setModalShow(false);
            }
            if (res.status === 409) {
                res.json().then(({ errors }) => (setError(errors), setErrorModal(true)));
            }
        });
    };
    return (
        <>
            <div className="alert-modal">
                <Modal size="md" centered show={modalShow} onHide={onHide} className="alert-modal">
                    <Modal.Body>
                        <div className="alert-modal-items">
                            <div className="alert-modal-icon" style={{ marginTop: '2px' }}>
                                {item.statusId === 1 && ( // redact
                                    <Icon path={mdiPencilCircleOutline} size={3} color="#6C757D" />
                                )}
                                {item.statusId === 2 && ( // send to approval
                                    <Icon path={mdiSendCheck} size={3} color="#FFBC00" />
                                )}
                                {item.statusId === 3 && ( // approved
                                    <Icon path={mdiCheckCircleOutline} size={3} color="#0ACF97" />
                                )}
                            </div>
                            <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                                <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                            </div>
                            <div className="alert-modal-question">
                                {t(
                                    `Are you sure you want to send this benefit for ${
                                        item.statusId === 1
                                            ? 'redact'
                                            : item.statusId === 2
                                            ? 'approval'
                                            : item.statusId === 3
                                            ? 'approved'
                                            : ''
                                    } ?`
                                )}
                                <br />
                                "{item.name}"
                            </div>
                            <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                                <button
                                    style={{
                                        backgroundColor: btnColor,
                                        color: '#fff',
                                        fontWeight: '600',
                                        width: '150px',
                                    }}
                                    className="delete"
                                    onClick={handleClick}>
                                    {item.statusId === 1
                                        ? t('Yes, Editable it!')
                                        : item.statusId === 2
                                        ? t('Yes, Approval it!')
                                        : item.statusId === 3
                                        ? t('Yes, Approved it!')
                                        : null}
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
            {errorModal && <FailModal modalShow={errorModal} setModalShow={setErrorModal} error={error} />}
        </>
    );
};

export default React.memo(ActionModal);
