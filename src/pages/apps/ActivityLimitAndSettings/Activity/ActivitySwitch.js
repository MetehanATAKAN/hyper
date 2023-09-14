import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { Switches } from '../../../forms/Basic'

const ActivitySwitch = () => {

    const {t}=useTranslation();

    const [autoCalculation, setAutoCalculation] = useState(false);
    const [checkList, setCheckList] = useState(false);

    const changeSwitch = (name)=> {
        if(name ===t('auto calculation')) {
            setAutoCalculation(!autoCalculation);
            if(autoCalculation === false) {
                document.querySelector('.auto,.calculation').classList.add('active');
            }
            else {
                document.querySelector('.auto,.calculation').classList.remove('active');
            }
        }
        else {
            setCheckList(!checkList);
            if(checkList === false) {
                document.querySelector('.check,.list').classList.add('active');
            }
            else {
                document.querySelector('.check,.list').classList.remove('active');
            }
        }
    }
    return (
        <div className='activity-switch'>
            <Row>
                <Col className='switch-header'  sm={3} >
                    <h5>{t('auto calculation')}</h5>
                    <Switches  changeSwitch={changeSwitch} switchLeftRight={['off','on']} switchName={t('auto calculation')}  />
                </Col>
                <Col className='switch-header'  sm={2} >
                    <h5>{t('check list')}</h5>
                    <Switches  changeSwitch={changeSwitch} switchLeftRight={['not','use']} switchName={t('check list')}  />
                </Col>
            </Row>
            {/* <Row className='switch'>
                <Col sm={3}> <Switches  changeSwitch={changeSwitch} switchLeftRight={['off','on']} switchName={t('auto calculation')}  /> </Col>
                <Col sm={2}> <Switches  changeSwitch={changeSwitch} switchLeftRight={['not','use']} switchName={t('check list')}  /> </Col>
            </Row> */}
        </div>
    )
}

export default ActivitySwitch