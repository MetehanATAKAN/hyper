import { mdiAlertCircleOutline, mdiCheckCircleOutline, mdiPencilCircleOutline, mdiSendCheck } from '@mdi/js';
import Icon from '@mdi/react';
import { Form, Modal } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../utils/http.helper';
import FailModal from '../FailModal';
import { useHistory } from 'react-router-dom';
export type Props = {
    showModal: Boolean,
    setShowModal: Boolean,
    applyFilter: () => {},
    url: String,
    postData: Object,
    deleteQuestion: String,
    handleData: () => {},
    type: 'redact' | 'approval' | 'approved' | 'delete' | 'reject',
    dataName: String,
};

const ActionModals = ({
    showModal,
    setShowModal,
    applyFilter,
    url,
    postData,
    deleteQuestion = `you won't be able to revert this! You CAN NOT view this in your list anymore if you delete.`,
    handleData, //if page doesn't have filters
    type = 'redact', //has to be modal type
    dataName = 'name', // has to be selected item name
    showDataName = true,
}: Props) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [error, setError] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const reasonArea = useRef(0);
    const onHide = () => {
        setShowModal(false);
    };
    useEffect(() => {
        setRejectReason('');
    }, []);

    const [content, setContent] = useState({
        id: 1,
        color: '#6C757D',
        icon: <Icon path={mdiPencilCircleOutline} size={4} color="#6C757D" />,
        question: 'Are you sure you want to send this need for redact ?',
        btnQuestion: 'Yes, Editable it!',
    });
    const contents = [
        {
            id: 0,
            color: '#FA5C7C',
            icon: <Icon path={mdiAlertCircleOutline} size={4} color="#FA5C7C" />,
            question: deleteQuestion,
            btnQuestion: 'Yes, delete it!',
        },
        {
            id: 1,
            color: '#6C757D',
            icon: <Icon path={mdiPencilCircleOutline} size={4} color="#6C757D" />,
            question: 'Are you sure you want to send this need for redact ?',
            btnQuestion: 'Yes, Editable it!',
        },
        {
            id: 2,
            color: '#FFBC00',
            icon: <Icon path={mdiSendCheck} size={4} color="#FFBC00" />,
            question: 'Are you sure you want to send this need for approval ?',
            btnQuestion: 'Yes, Approval it!',
        },
        {
            id: 3,
            color: '#0ACF97',
            icon: <Icon path={mdiCheckCircleOutline} size={4} color="#0ACF97" />,
            question: 'Are you sure you want to send this need for approved ?',
            btnQuestion: 'Yes, Approved it!',
        },
        {
            id: 4,
            color: '#FA5C7C',
            icon: <Icon path={mdiAlertCircleOutline} size={4} color="#FA5C7C" />,
            question: 'Are you sure you want to reject ?',
            btnQuestion: 'Yes, Reject it!',
        },
    ];
    useEffect(() => {
        switch (type) {
            case 'delete':
                setContent(contents[0]);
                break;
            case 'redact':
                setContent(contents[1]);
                break;
            case 'approval':
                setContent(contents[2]);
                break;
            case 'approved':
                setContent(contents[3]);
                break;
            case 'reject':
                setContent(contents[4]);
                break;
            default:
                break;
        }
    }, [type]);
    const fetchPost = (data) => {
        FetchApiPost(url, 'POST', data).then((res) => {
            if (res.status === 200 || res.status === 201) {
                applyFilter && applyFilter();
                setShowModal(false);
                handleData && handleData();
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
            if (res.status === 400 || res.status === 404 || res.status === 409) {
                res.json().then(({ errors }) => {
                    setErrorModal(true);
                    setError(errors);
                });
            }
        });
    };
    const handleClick = () => {
        if (!postData) return;
        if (type === 'reject') {
            if (rejectReason) {
                const newObj = { ...postData, rejectReason: rejectReason };
                fetchPost(newObj);
            } else {
                return (reasonArea.current.style.borderColor = 'red');
            }
        }
        if (type !== 'reject' && postData.hasOwnProperty('rejectReason')) {
            delete postData.rejectReason;
        }
        if (type === 'reject') return;
        fetchPost(postData);
    };
    return (
        <>
            <div id="action-modal-container">
                <Modal size="md" centered show={showModal} onHide={onHide} className="action-modal">
                    <Modal.Body>
                        <div className="action-modal-body">
                            <div className="action-modal-body__icon">{content.icon}</div>
                            <div className="action-modal-body__title">
                                <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                            </div>
                            <div className="action-modal-body__question">{t(content.question)}</div>
                            {showDataName && <span style={{ fontWeight: 'bold' }}>"{dataName}"</span>}
                            {type === 'reject' && (
                                <div>
                                    <span className="mb-1 mt-2" style={{ float: 'left' }}>
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
                            )}
                            <div className="action-modal-body__buttons">
                                <button
                                    style={{
                                        backgroundColor: content.color,
                                        color: '#fff',
                                        fontWeight: '600',
                                    }}
                                    className="delete"
                                    onClick={handleClick}>
                                    {t(content.btnQuestion)}
                                </button>
                                <button
                                    style={{
                                        backgroundColor: '#EEF2F7',
                                        color: '#6C757C',
                                        fontWeight: '600',
                                    }}
                                    className="cancel"
                                    onClick={() => setShowModal(false)}>
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

export default ActionModals;
