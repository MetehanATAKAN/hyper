import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { FetchApiPost } from '../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import PharmacySplitPercentProblem from '../../../components/Modals/PharmacySplitPercentProblem';

const UpdateActionList = ({ updateActionList, setOnModal, actionList, setActionList, checkList, setCheckList }) => {
    const [actionName, setActionName] = useState('');
    const { t } = useTranslation();
    const [show, setShow] = useState(false);

    const handleUpdateAction = async () => {
        let checkName = await actionList.filter(item => item.title === actionName);

        if (checkName.length === 0) {
            await FetchApiPost('services/TaskManagement/ActionAndCheckList/UpdateAction', 'POST', {
                id: updateActionList.id,
                title: actionName,
                modifiedBy: localStorage.getItem('userName') || updateActionList.modifiedBy,
            })
    
            let newActionList = await actionList.map(action => (
                action.id === updateActionList.id ? { ...action, title: actionName } : action
            ))
    
            let newCheckList = await checkList.map(check => {
                return {
                    ...check,
                    actions: check.actions.map(action => (
                        updateActionList.id === action.id ? { ...action, title: actionName } : action
                    ))
                }
            })
            setActionList(newActionList);
            setCheckList(newCheckList);
            setOnModal(false);
        } else if (checkName.length === 1 && checkName[0].id === updateActionList.id) {
            await FetchApiPost('services/TaskManagement/ActionAndCheckList/UpdateAction', 'POST', {
                id: updateActionList.id,
                title: actionName,
                modifiedBy: localStorage.getItem('userName') || updateActionList.modifiedBy,
            })
    
            let newActionList = await actionList.map(action => (
                action.id === updateActionList.id ? { ...action, title: actionName } : action
            ))
    
            let newCheckList = await checkList.map(check => {
                return {
                    ...check,
                    actions: check.actions.map(action => (
                        updateActionList.id === action.id ? { ...action, title: actionName } : action
                    ))
                }
            })
            setActionList(newActionList);
            setCheckList(newCheckList);
            setOnModal(false);
        } else {
            setShow(true);
        }
        
    }

    const handleClose = () => {
        setShow(false);
    }

  return (
    <div className='action-list-add'>
        {
            show && <PharmacySplitPercentProblem show={show} handleClose={handleClose} messages={t('Action name already exists')} />
        }
        <div className='action-list-add__container'>
            <div>{t('action')}</div>
            <input type="text" className='form-control' placeholder={updateActionList.title} onChange={(e) => setActionName(e.target.value)} />
        </div>
        <div className="task-management-footer-btn">
            <Button variant="light" onClick={() => setOnModal(false)} >{t('cancel')}</Button>
            <Button variant="warning" className='task-management-footer-btn__update' onClick={() => handleUpdateAction()} disabled={actionName.trim().length === 0}>
                {t('update')}
            </Button>
        </div>
    </div>
  )
}

export default UpdateActionList