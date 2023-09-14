import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ModalHeader from './ModalHeader'
import { useTranslation } from 'react-i18next'
const PharmacySplitDeletePharmacy = ({
  messages,
  deleteItem,
  deletePharmacyInfo,
  setDeleteModal,
  deleteModal
}) => {
  const [showModal, setShowModal] = useState(true)
  const { t } = useTranslation();
  console.log(deletePharmacyInfo);
  return (
    <div className='split-error'>
        {/* <Button variant="primary" onClick={() => setShowModal(true)}>
            Pharmacy Split Delete Pharmacy
        </Button> */}
  
        <Modal show={deleteModal} centered className='split-error-modal'>
            <Modal.Body className='text-center'>
            <ModalHeader setShowModal={setDeleteModal} />
            <div className='split-error-modal__message'>
              {t(messages)}
            </div>
            </Modal.Body>
          <Modal.Footer className='border-top-0 split-error-modal__footer'>
              <div className='split-error-modal__button-container m-outo' style={{marginLeft: 'auto', marginRight: 'auto', display: 'flex', alignItems: 'center'}}>
                <button className='split-cancel-btn m-0' onClick={()=> setDeleteModal(false)}>
                    {t('cancel')}
                </button>
                <button className='split-delete-btn m-0' onClick={()=> deleteItem(deletePharmacyInfo)}>
                    {t('delete')}
                </button>
              </div>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default PharmacySplitDeletePharmacy

// PAGE 7