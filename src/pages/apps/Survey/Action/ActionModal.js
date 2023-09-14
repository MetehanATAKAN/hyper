import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mdiCheckCircleOutline, mdiPencilCircleOutline, mdiSendCheck } from '@mdi/js';
import Icon from '@mdi/react';
import FailModal from '../../../../components/FailModal';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
const ActionModal = (props) => {
    const { modalShow, setModalShow, item, apply } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const createdBy = localStorage.getItem('userName');
    const [btnColor, setBtnColor] = useState('#6C757D');
    const [error, setError] = useState('');
    const [failModal, setFailModal] = useState(false);
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
            surveyName: item.name,
            type: Number(item.type),
            categoryId: Number(item.category.value),
            languageAbbId: Number(item.language.value),
            isApproved: item.statusId,
            validStatus: item.statusId === 3 ? true : false,
            rejectReason: null,
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
            if (res.status === 400 || res.status === 409 || res.status === 404) {
                res.json().then(({ errors }) => (setFailModal(true), setError(errors)));
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
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
                                    `Are you sure you want to send this need for ${
                                        item.statusId === 1
                                            ? 'redact'
                                            : item.statusId === 2
                                            ? 'approval'
                                            : item.statusId === 3
                                            ? 'approved'
                                            : ''
                                    } ?`
                                )}
                                <br />"{item.name}"
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
            {failModal && <FailModal modalShow={failModal} setModalShow={setFailModal} error={error} />}
        </>
    );
};

export default React.memo(ActionModal);
