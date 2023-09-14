import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import AddBusinessBrochure from './Modals/AddBusinessBrochure';
import AddBusinessProcess from './Modals/AddBusinessProcess';
import { useTranslation } from 'react-i18next';
import ActionModals from '../../../components/Modals/ActionModal';

const Gantt = () => {
    const [show, setShow] = useState(false);
    const { t } = useTranslation();
    const [addBusinessTab, setAddBusinessTab] = useState('Add Business Process');
    const handleClose = () => {
        setShow(false);
        setAddBusinessTab('Add Business Process');
    };

    return (
        <div>
            <div>Gant</div>
            <button className="btn btn-warning" onClick={() => setShow((prev) => !prev)}>
                Open Add Business
            </button>
            {/* <ActionModals type="approval" postData={{ name: 'deneme' }} showModal={show} setShowModal={setShow} /> */}

            <Modal
                show={show}
                onHide={handleClose}
                className={`task-management__modal ${addBusinessTab === 'Add Business Brochure' && 'nnnn'}`}
                backdrop={false}>
                <Modal.Header>
                    <Modal.Title style={{ color: 'rgba(0, 0, 0, .71)' }}>{t('Add Business Process')}</Modal.Title>
                    <button className="task-management__modal-close-btn" onClick={() => handleClose()}>
                        <i className="dripicons-cross"></i>
                    </button>
                </Modal.Header>
                <Modal.Body className="p-0">
                    {addBusinessTab === 'Add Business Process' ? (
                        <AddBusinessProcess setShow={setShow} setAddBusinessTab={setAddBusinessTab} />
                    ) : (
                        <AddBusinessBrochure handleClose={handleClose} />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Gantt;
