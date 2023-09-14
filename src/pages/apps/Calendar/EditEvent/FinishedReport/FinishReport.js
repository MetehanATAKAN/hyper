import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import '../../../../../assets/scss/custom/editevent/FinishReport.scss';
import { useTranslation } from 'react-i18next';
const FinishReport = () => {
    const { t } = useTranslation();
    return (
        <Row
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1.6rem 0',
            }}>
            <div
                className="split-error-modal__icon-save"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <i className="fas fa-question-circle"></i>
            </div>
            <div className="split-error-modal__message">{t('Are you sure you want to complete the report ?')}</div>
        </Row>
    );
};

export default FinishReport;
