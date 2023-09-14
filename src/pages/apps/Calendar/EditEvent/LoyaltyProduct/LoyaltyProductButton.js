import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
const LoyaltyProductButton = ({ resetButton, setResetButton, name }) => {
  const { t } = useTranslation();
  const appStatus = useSelector(state => state.Calendar.appStatus);
    const handleClick = () => {
        setResetButton({buttonStatus: true, loyaltyName: name})
    }
    return (
        <>
             
                <button disabled={appStatus === 4} className='loyalty-product-reset-button' onClick={() => handleClick()}>{t('reset')}</button>
            
      </>
    )
}

export default React.memo(LoyaltyProductButton)