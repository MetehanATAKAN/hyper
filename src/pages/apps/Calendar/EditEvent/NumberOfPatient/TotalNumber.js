import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'

const TotalNumber = (props) => {
  const { t } = useTranslation();
  const appStatus = useSelector(state => state.Calendar.appStatus);
  const exceptThisSymbols = ["e", "E", "+", "-", ".", "," , "*", "/", " "];

  return (
    <div className='total_number'>
        <Row>
            <Col xs='8'>
                <div>{t('total number patient per month')}</div>
                <input onWheel={ event => event.currentTarget.blur() } style={{textIndent: ".5rem"}} disabled={appStatus === 4} type='number' placeholder={t('number')}  defaultValue={props.totalNumber} onChange={(e)=>props.setTotalNumber(e.target.value)} onKeyDown={(e)=>exceptThisSymbols.includes(e.key) && e.preventDefault()} />
            </Col>
            <Col xs='4'>
                <div>{t('total profile p.n.m')}</div>
                <input type='text' placeholder={props.totalProfile} defaultValue={props.totalProfile} value={props.totalProfile} disabled/>
            </Col>
        </Row>
        <hr/>
    </div>
  )
}

export default TotalNumber