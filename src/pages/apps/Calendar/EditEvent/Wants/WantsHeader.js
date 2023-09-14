import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const WantsHeader = () => {
  const page = useSelector((state) => state.Calendar.changePage);
  const { t } = useTranslation();
  return (
    <div className='wants_header'>
        <div className='loyalty-product__headers nav-tabs'>
            <div className={page===12? 'nav-item nav-link active' :'nav-item'}>{t('Wants')}</div>
            <div className={page===13? 'nav-item nav-link active' :'nav-item'}>{t('Previous')}</div>
            <div className={page===14? 'nav-item nav-link active' :'nav-item'}>{t('New')}</div>
            <div className={page===15? 'nav-item nav-link active' :'nav-item'}>{t('CoA')}</div>
        </div>
    </div>
  )
}

export default WantsHeader