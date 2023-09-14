import React from 'react';
import "antd/dist/antd.css";
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import Icon from '@mdi/react';
import { mdiInformation, mdiCloseCircle, mdiCheckCircle, mdiAlertCircle } from '@mdi/js';
import { useTranslation } from 'react-i18next';
type IModal = ModalProps;

export const InfoModal: React.FC<IModal> = ({ setShowModal, title = '', message = '', func, ...rest }) => {
    const { t } = useTranslation();
    const [modal, contextHolder] = Modal.useModal();

    const handleClickOk = () => {
        if (func) {
            func()
        }
        setShowModal(false)
    }

    React.useEffect(() => {
        modal.info({
            ...rest,
            title: t(title),
            content: t(message),
            wrapClassName: 'informationModal',
            centered: true,
            icon: <span className='anticon anticon-exclamation-circle confirm-modal-icon'><Icon path={mdiInformation} size={1} /></span>,
            okText: t('OK'),
            onOk() {
                handleClickOk()
            },
        });
      }, []);
    return (
        <>{contextHolder}</>
    )
};

export const SuccessModal: React.FC<IModal> = ({ setShowModal, title = '', message = '', func, ...rest }) => {
    const { t } = useTranslation();
    const [modal, contextHolder] = Modal.useModal();

    const handleClickOk = () => {
        if (func) {
            func()
        }
        setShowModal(false)
    }

    React.useEffect(() => {
        modal.success({
            ...rest,
            title: t(title),
            content: t(message),
            wrapClassName: 'informationModal',
            centered: true,
            icon: <span className='anticon anticon-exclamation-circle'><Icon path={mdiCheckCircle} size={1} /></span>,
            okText: t('OK'),
            onOk() {
                handleClickOk()
            },
        });
      }, []);
    return (
        <>{contextHolder}</>
    )
}

export const ErrorModal: React.FC<IModal> = ({ setShowModal, func, title = '', message = '', ...rest }) => {
    const { t } = useTranslation();
    const [modal, contextHolder] = Modal.useModal();

    const handleClickOk = () => {
        if (func) {
            func()
        }
        setShowModal(false)
    }

    React.useEffect(() => {
        modal.error({
            ...rest,
            title: t(title),
            content: t(message),
            wrapClassName: 'informationModal',
            centered: true,
            icon: <span className='anticon anticon-exclamation-circle confirm-modal-icon'><Icon path={mdiCloseCircle} size={1} /></span>,
            okText: t('OK'),
            onOk() {
                handleClickOk()
            },
            onCancel() {
                setShowModal(false)
            }
        });
      }, []);
    return (
        <>{contextHolder}</>
    )
}

export const WarningModal: React.FC<IModal> = ({ setShowModal, func, title = '', message = '', ...rest }) => {
    const { t } = useTranslation();
    const [modal, contextHolder] = Modal.useModal();

    const handleClickOk = () => {
        if (func) {
            func()
        }
        setShowModal(false)
    }

    React.useEffect(() => {
        modal.warning({
            ...rest,
            title: t(title),
            content: t(message),
            wrapClassName: 'informationModal',
            centered: true,
            icon: <span className='anticon anticon-exclamation-circle'><Icon path={mdiAlertCircle} size={1} /></span>,
            okText: t('OK'),
            onOk() {
                handleClickOk()
            },
            onCancel() {
                setShowModal(false)
            }
        });
      }, []);
    return (
        <>{contextHolder}</>
    )
}

export const ConfirmModal: React.FC<IModal> = ({ setShowModal, type = 'error', func, title = '', message = '', specialText }) => {
    const { t } = useTranslation();
    const [modal, contextHolder] = Modal.useModal();

    const handleClickOk = () => {
        if (func) {
            func()
        }
        setShowModal(false)
    }

    React.useEffect(() => {
        modal.confirm({
            title: t(title),
            icon: type === 'info' ? <span className='anticon anticon-exclamation-circle confirm-modal-icon'><Icon path={mdiInformation} size={1} /></span> 
                : 
            type === 'error' ?  <span className='anticon anticon-exclamation-circle confirm-modal-icon'><Icon path={mdiCloseCircle} size={1} /></span>
                :
            type === 'success' ? <span className='anticon anticon-exclamation-circle'><Icon path={mdiCheckCircle} size={1} /></span> 
            :
            type === 'warning' ? <span className='anticon anticon-exclamation-circle'><Icon path={mdiAlertCircle} size={1} /></span> 
            :
            <span className='anticon anticon-exclamation-circle'><Icon path={mdiCloseCircle} size={1} /></span>
            ,
            content: <>
                {t(message)}
                    {
                        specialText && (
                            <div style={{textAlign:'center', marginLeft: '-38px'}}>"{specialText}"</div>
                        )
                    }
                </>,
            okText: t('Yes'),
            wrapClassName: `informationModal confirmModal confirmModal-${type}`,
            cancelText: t('Cancel'),
            centered: true,
            onOk() {
                handleClickOk()
            },
            onCancel() {
                setShowModal(false)
            },
            });
      }, []);
    return (
        <>{contextHolder}</>
    )
}