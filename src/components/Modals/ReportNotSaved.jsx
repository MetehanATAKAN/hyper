import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ReportNotSaved = ({ onHide, isRemove }) => {
    const { t } = useTranslation();
    useEffect(() => {
        setTimeout(() => {
           onHide()
        }, 2000)
    }, [])
  return (
      <div className="report-not-saved">
          <div className='report-not-saved__container'>
              <div className='report-not-saved__content'>
                <FaRegTimesCircle className='report-information-icon'/>
                <div className='report-information-text'>
                    {
                        isRemove === true ?
                        <>{t('Event is being deleted!')}</>
                        :
                        <>{t('Report not saved!')}</>
                    }
                </div>
              </div>
          </div>
      </div>
    
  )
}

export default ReportNotSaved