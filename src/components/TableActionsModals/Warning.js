import React from 'react'
import GlobalModal from '../GlobalNew/Modal'
import Icon from '@mdi/react'
import { mdiAlertCircleOutline } from '@mdi/js'
import { useTranslation } from 'react-i18next'
import { Button } from 'react-bootstrap'

const Warning = (
    {
        messages,
        modalShow,
        setModalShow
    }
) => {

    const { t } = useTranslation();

    const handleCloseModal = () => setModalShow(false);
    

  return (
    <>
    <GlobalModal
    isFooter={false}
    isHeader={false}
    showModal={modalShow}
    setShowModal={setModalShow}
    size='sm'
    toggle={()=>setModalShow(false)}
    body={
        <div className='text-center'>
        
                        <div className="alert-modal-icon" style={{ marginTop: '2px' }}>
                            <Icon path={mdiAlertCircleOutline} size={3} color={'#FFBC00'} />
                        </div>
                        
                        <div className="alert-modal-question">
                            {messages}
                        </div>
                        <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                            <Button variant='light' onClick={() => setModalShow(false)}>
                            {t('cancel')}
                            </Button>
                    
                        </div>
               
        </div>
    }
    />
    </>
  )
}

export default Warning