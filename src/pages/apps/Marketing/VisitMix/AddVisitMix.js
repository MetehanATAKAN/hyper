// @flow
import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Button, Alert} from 'react-bootstrap';
// components
import { FormInput } from '../../../../components';
import { useTranslation } from 'react-i18next';

type AddEditEventProps = {
    isOpen?: boolean,
    onClose?: () => void,
    isEditable?: boolean,
    buttonClick?: boolean,
    eventData?: any,
    onRemoveEvent?: () => void,
    onUpdateEvent: (value: any) => void,
    onAddEvent: (value: any) => void,
};

const AddVisitMix = ({
    isOpen,
    onClose,
    isEditable,
    buttonClick,
    eventData,
    onRemoveEvent,
    onUpdateEvent,
    onAddEvent,
}: AddEditEventProps): React$Element<any> => {
    const { t } = useTranslation();
    return (
        <>
            <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false}>
            <Modal.Header className="pb-0 pt-0 px-4 border-bottom-0 rm-title">
                <Modal.Title id="modal-title">
                    <h5 className="text-light">{t('ADD VISIT MIX')}</h5>
                </Modal.Title>
                    <div className="rm-close-button-cont" onClick={onClose}>
                        <i className="dripicons-cross rm-close-button"></i>
                    </div>
            </Modal.Header>
                <Modal.Body className="px-2">
                    <Row className="px-3">
                        <Col>
                            <h5>{t('Year')}</h5>
                            <FormInput
                                type="select"
                                containerClass="mb-3"
                                className="form-select"
                                >
                                <option>{t('select')}</option>
                            </FormInput>
                        </Col>
                        <Col>
                            <h5>{t('Specialization')}</h5>
                            <FormInput
                                type="select"
                                containerClass="mb-3"
                                className="form-select"
                                >
                                <option>{t('select')}</option>
                            </FormInput>
                        </Col>
                    </Row>
                    <Row className="px-3">
                        <Col>
                            <h5>{t('Organization Type')}</h5>
                            <FormInput
                                type="select"
                                className="form-select"
                                >
                                <option>{t('select')}</option>
                            </FormInput>
                        </Col>
                        <Col>
                            <h5>{t('Categorie')}</h5>
                            <FormInput
                                type="select"
                                className="form-select"
                                >
                                <option>{t('select')}</option>
                            </FormInput>
                        </Col>
                    </Row>
                </Modal.Body>
                <hr></hr>
                <Row className="px-4 pb-2 report-rds">
                    <Col className="text-end dlt-sv-btn">
                        <Button variant="primary" className="btn btn-primary me-1">
                            {t('Add')}
                        </Button>
                        <Button variant="secondary" type="submit" className="btn btn-secondary" onClick={onClose}>
                            {t('Cancel')}
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default AddVisitMix;
