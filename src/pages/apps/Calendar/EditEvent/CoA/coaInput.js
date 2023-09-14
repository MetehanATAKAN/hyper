import React from 'react'
import { Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
const CoaInput = ({coaValue,setCoaValue}) => {
  const { t } = useTranslation();
  const appStatus = useSelector(state => state.Calendar.appStatus);
  return (
    <div>
        <label>CoA</label>
        <Row><input type='number' disabled={appStatus === 4}  placeholder={t('number')} defaultValue={coaValue} onChange={(e)=>setCoaValue(e.target.value)}/></Row>
    </div>
  )
}

export default CoaInput