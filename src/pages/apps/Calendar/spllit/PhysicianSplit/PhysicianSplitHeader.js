import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
const PhysicianSplitHeader = (props) => {
    const { physicianData, setPhysicianData, pharmacyName, pharmacyId, skuName, skuId } = props;
    const { t } = useTranslation();
    
    const savePhysiciansSplit = () => {
        const savePhysiciansSplitBody = {
            createPhysicianSplitDetailCommands: physicianData.map((data) => ({
                customerId: data.customerId,
                customerName: data.customerName,
                customerCategory: data.customerCategory,
                pharmacyId: data.pharmacyId,
                pharmacyName: data.pharmacyName,
                skuId: data.skuId,
                skuName: data.skuName,
                salesActual:0,
                loyality: data.loyality,
                allocation: data.allocation,
            })),
        };
        FetchApiPost('services/Daywork/Split/SavePhysicianSplitDetail', 'POST', savePhysiciansSplitBody)
            .then((response) => response.json())
            .then((response) => console.log('savePhysiciansSplitBody =>', response))
            .catch((error) => console.log(error));
    };

    return (
        <div className="physician-split-header">
            <Row className="split-header">
                <Col xs={5}>
                    <div className="physician-split-pharmacy-name">{t(`${pharmacyName}`)}</div>
                </Col>
                {/* <Col xs={7}>
                    <Button variant="outline-danger">
                        <i className="fa-solid fa-recycle "></i>
                        {t('reset')}
                    </Button>{' '}
                    <Button variant="outline-dark">
                        <i className="fa-solid fa-copy icon"></i>
                        {t('copy')}
                    </Button>
                    <Button variant="outline-success" onClick={savePhysiciansSplit}>
                        <i className="fa-solid fa-floppy-disk icon"></i>
                        {t('save')}
                    </Button>{' '}
                </Col> */}
            </Row>
        </div>
    );
};

export default React.memo(PhysicianSplitHeader);
