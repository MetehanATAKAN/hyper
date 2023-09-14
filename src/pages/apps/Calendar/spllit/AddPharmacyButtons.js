import React from 'react';
import { Col, Button, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { showSplitModal } from '../../../../redux/actions';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../../../../components/LoadingSpinner';

type pharmacyButtonsProps = { savePharmacy: ?() => void };
const AddPharmacyButtons = ({
    savePharmacy,
    inputPercent,
    homePageOpen,
    setPharmacySaveControl,
    pharmacySaveControl,
    pharmacytTableData,
    setShouldSaveModal,
    btnClick,
    getPharmacySplitDatas,
}: pharmacyButtonsProps): React$Element<any> => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const previousBtn = () => {
        dispatch(showSplitModal(false));
        homePageOpen(true);
    };

    const nextButtonControl = () => {
        if (pharmacySaveControl === pharmacytTableData) {
            getPharmacySplitDatas();
        } else {
            setShouldSaveModal(true);
        }
    };

    return (
        <>
            <Col>
                <Row>
                    <Col>
                        <Button
                            disabled={inputPercent === 100 ? false : true}
                            variant="success"
                            className="me-1"
                            onClick={() => savePharmacy()}>
                            {t('save')}
                        </Button>
                    </Col>
                    <Col className="pharmacyButtons">
                        <Button variant="success" className="btn btn-light me-1" onClick={previousBtn}>
                            {t('previous')}
                        </Button>
                        <Button
                            disabled={inputPercent === 100 ? false : true}
                            className="btn btn-primary py-1"
                            onClick={() => nextButtonControl()}>
                            {t('next')}
                        </Button>
                        {btnClick === false && <LoadingSpinner />}
                    </Col>
                </Row>
            </Col>
        </>
    );
};

export default React.memo(AddPharmacyButtons);
