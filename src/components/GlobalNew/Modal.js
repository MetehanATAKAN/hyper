import React from 'react';
import { Modal, ModalDialog } from 'react-bootstrap';
import '../../assets/scss/custom/GlobalNew/globalNewModal.scss';

const GlobalModal = ({ showModal, setShowModal, toggle, size = 'md', header, body, footer, isFooter = true, isHeader = true }) => {
    return (
        <Modal id="global-new-modal" show={showModal} onHide={toggle} size={size} backdrop="static">
            {isHeader && <Modal.Header onHide={toggle} closeButton>
                <h4>{header}</h4>
            </Modal.Header>}
            <Modal.Body>{body}</Modal.Body>
            {isFooter && <Modal.Footer>{footer}</Modal.Footer>}
        </Modal>
    );
};

export default GlobalModal;