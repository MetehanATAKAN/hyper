import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changePageBack } from '../../../../../redux/actions';
import { useTranslation } from 'react-i18next';
const FinishReportButtons = (props) => {
    const { saveReportClick, setCloseModal } = props;
    const cancelReport = () => {
        setCloseModal(false);
    };
    const { t } = useTranslation();
    return (
        <Row>
            <Col className="finish-btn">
                <Button variant="light" onClick={cancelReport}>
                    {t('No')}
                </Button>
                <Button variant="primary" type="submit" className="btn" onClick={saveReportClick}>
                    {t('Yes')}
                </Button>
            </Col>
        </Row>
    );
};

export default FinishReportButtons;
