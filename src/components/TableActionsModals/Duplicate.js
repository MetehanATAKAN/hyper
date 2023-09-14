import React from 'react'
import GlobalModal from '../GlobalNew/Modal'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import Icon from '@mdi/react'
import { mdiArchive } from '@mdi/js'

const Duplicate = ({
    show,
    setShow,
    messages,
    isDuplicate,
    data,
    onHide
}) => {

    const { t } = useTranslation();

  return (
      <div className="alert-modal">
         <Modal size="md" centered show={show} onHide={onHide} className="alert-modal">
                <Modal.Body>
                    <div className="alert-modal-items">
                        <div className="alert-modal-icon" 
                        style={{
                             marginTop: '2px' ,
                             border:'2px solid #bd6710',
                             width:'max-content',
                             borderRadius:'100%',
                             padding:'10px',
                             margin:'auto'
                             }}>
                            <Icon path={mdiArchive} size={3} color="#bd6710" />
                        </div>
                        <div className="alert-modal-question">
                            {t(
                               messages
                            )}
                        </div>
                        <div className="alert-modal-buttons" style={{ marginTop: '25px' }}>
                            <button
                                style={{
                                    color: '#fff',
                                    fontWeight: '600',
                                    width: '75px',
                                    backgroundColor:'#bd6710'
                                }}
                                onClick={()=>isDuplicate(data)}
                                >
                                {t('Yes')}
                            </button>
                            <button
                                style={{
                                    backgroundColor: '#EEF2F7',
                                    color: '#6C757C',
                                    fontWeight: '600',
                                    width: '75px',
                                }}
                                onClick={() => setShow(false)}>
                                {t('cancel')}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
      </div>
  )
}

export default Duplicate