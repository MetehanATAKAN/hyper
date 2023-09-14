import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeSplitPage, showSplitModal } from '../../../../../redux/actions';
import { useTranslation } from 'react-i18next';

const SplitPage2Buttons = ({ setBtnClick }) => {

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const isCancelButton = useSelector(state =>state.Calendar.splitModaReportPage);
  
    const cancelButton = () => {
        if(isCancelButton === true){
            dispatch(showSplitModal(false));
        }
        else {
            setBtnClick(true);
            dispatch(changeSplitPage(1));
        }
    }
    return (
        <Row>
            <Col>
                <Button
                    className="btn btn-light split-cancel-btn"
                    onClick={cancelButton}>
                    {t('Cancel')}
                </Button>
            </Col>
            <Col>
                <Button className="btn btn-primary split-pharmacy-btn" onClick={cancelButton}>
                    {t('Pharmacy Connection')}
                </Button>
            </Col>
        </Row>
    );
};

export default SplitPage2Buttons;
