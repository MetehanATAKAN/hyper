import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { FetchApiPost } from '../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import PharmacySplitPercentProblem from '../../../components/Modals/PharmacySplitPercentProblem';

const ActionListAdd = ({ setOnModal, setActionList, actionList }) => {
    const [actionName, setActionName] = useState('');
    const { t } = useTranslation();
    const [show, setShow] = useState(false);

    const handleCreateAction = async () => {
        const varmi = await actionList.find(item => item.title === actionName.trim());
        if (varmi === undefined) {
            FetchApiPost('services/TaskManagement/ActionAndCheckList/CreateAction', 'POST', {
              title: actionName,
              createdBy: localStorage.getItem('userName') || "string"
            }).then(res => res.json())
            .then(res => res.data)
          .then(res => setActionList(prev => [...prev, res ]))

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
            show && <PharmacySplitPercentProblem show={show} handleClose={handleClose} messages={t('Action Name Already Exists')} />
        }
        <div className='action-list-add__container'>
            <div>{t('action')}</div>
            <input type="text" className='form-control' onChange={(e) => setActionName(e.target.value)} />
        </div>
        <div className="task-management-footer-btn">
            <Button variant="light" onClick={() => setOnModal(false)} >{t('cancel')}</Button>
            <Button variant="primary" onClick={() => handleCreateAction()} disabled={actionName.trim().length === 0}>{t('add')}</Button>
        </div>
    </div>
  )
}

export default ActionListAdd;