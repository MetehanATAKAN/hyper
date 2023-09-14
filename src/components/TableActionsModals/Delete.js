import React from 'react'
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';

const Delete = ({
    show,
    setShow,
    onHide,
    deleteFunction,
    messages,
    obj
}) => {

    const { t } = useTranslation();

    const tooltip = (
        <Tooltip id="tooltip">
          <strong>{obj}</strong> 
        </Tooltip>
      );
   
    return (
        <div className="alert-modal">
            <Modal size="md" centered show={show} onHide={onHide} className="alert-modal">
                <Modal.Body>
                    <div className="alert-modal-items">
                        <div className="alert-modal-icon" style={{ marginTop: '2px' }}>
                            <Icon path={mdiAlertCircleOutline} size={3} color="#FA5C7C" />
                        </div>
                        <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                            <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                        </div>
                        <div className="alert-modal-question">
                            {t(messages)}
                        </div>

                        <OverlayTrigger placement="bottom" overlay={tooltip}>
                            <div className="alert-modal-obj">
                                {obj}
                            </div>
                        </OverlayTrigger>

                        <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                            <button
                                style={{
                                    color: '#fff',
                                    fontWeight: '600',
                                    width: '125px',
                                }}
                                className="delete"
                                onClick={deleteFunction}>
                                {t('Yes, delete it!')}
                            </button>
                            <button
                                style={{
                                    backgroundColor: '#EEF2F7',
                                    color: '#6C757C',
                                    fontWeight: '600',
                                    width: '75px',
                                }}
                                className="cancel"
                                onClick={() => setShow(false)}>
                                {t('cancel')}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Delete