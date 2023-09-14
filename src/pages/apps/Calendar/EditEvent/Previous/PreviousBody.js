import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
const PreviousBody = ({previousInput,setPreviousInput,previousText}) => {
    const { t } = useTranslation();
    const appStatus = useSelector(state => state.Calendar.appStatus);
    const handleRadio = (e) => {
        console.log(e.target.value);
        setPreviousInput(e.target.value)
    }
    return (
        <div>
            <Row className='lord_input'><input type='text' disabled placeholder={previousText} /></Row>
            <div className='previous_radio'>
                <span>
                    <input disabled={appStatus === 4} onClick={(e) => handleRadio(e)} type="radio" id='done' name="fav_language" value="done" checked={previousInput === 'done' ? true:false} />
                    <label htmlFor="done">{t('done')}</label>
                </span>
                <span>
                    <input disabled={appStatus === 4} onClick={(e) => handleRadio(e)} type="radio" id='waiting' name="fav_language" value="waiting" checked={previousInput === 'waiting' ? true:false} />
                    <label htmlFor="waiting">{t('waiting')}</label>
                </span>
                <span>
                    <input disabled={appStatus === 4} onClick={(e) => handleRadio(e)} type="radio" id='declain' name="fav_language" value="declain" checked={previousInput === 'daclain' ? true:false} />
                    <label htmlFor="declain">{t('declain')}</label>
                </span>
            </div>
        </div>
    )
}

export default PreviousBody