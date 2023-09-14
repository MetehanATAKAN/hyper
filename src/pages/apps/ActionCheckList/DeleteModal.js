import React from 'react'
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../utils/http.helper';
const DeleteModal = ({ checkedTab, deleteModal, setDeleteModal, actionList, setActionList, checkList, setCheckList }) => {
    
    const { t } = useTranslation();
    const deleteItem = () => {
        if(checkedTab === 'Action List'){
            const newActionList = actionList.filter(action => action.id !== deleteModal.item.id);
            setActionList(newActionList);
            setDeleteModal({ modalStatus: false, item: {} });
            
            FetchApiPost('services/TaskManagement/ActionAndCheckList/DeleteAction', 'POST', {
                id: deleteModal.item.id
            })
        }else if(checkedTab === 'Check List'){
            const newCheckList = checkList.filter(check => check.id !== deleteModal.item.id);
            setCheckList(newCheckList);
            setDeleteModal({ modalStatus: false, item: {} });
            
            FetchApiPost('services/TaskManagement/ActionAndCheckList/DeleteCheckList', 'POST', {
                id: deleteModal.item.id
            })
        }
    }

  return (
    <div className="split-error">
            <Modal show={deleteModal.modalStatus} centered className="split-error-modal">
                <Modal.Body className="text-center">
                    <button
                        className="split-close-button"
                        onClick={() => setDeleteModal({ modalStatus: false, item: {} })}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="split-error-modal__icon">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <div>{t('WARNING')}</div>
                    </div>
                    {checkedTab === 'Action List' && (
                        <div className="split-error-modal__message">
                            {deleteModal.item.title}, {t('Are you sure you want to delete ?')}
                        </div>
                    )}
                    {
                        checkedTab === 'Check List' && (
                            <div className="split-error-modal__message">
                                {deleteModal.item.title}, {t('Are you sure you want to delete ?')}
                            </div>
                        )
                    }
                </Modal.Body>
                <Modal.Footer className="border-top-0 split-error-modal__footer">
                    <div className="split-error-modal__button-container m-auto">
                        <button
                            className="split-cancel-btn"
                            onClick={() => setDeleteModal({ modalStatus: false, item: {} })}>
                            {t('cancel')}
                        </button>
                        <button className="split-delete-btn" onClick={() => deleteItem()}>
                            {t('delete')}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
  )
}

export default DeleteModal