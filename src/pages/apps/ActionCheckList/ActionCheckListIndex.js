import React, { useState, useEffect } from 'react';
import ActionListTable from './ActionListTable';
import CheckListTable from './CheckListTable';
import TableTabs from './TableTabs';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ActionListAdd from './ActionListAdd';
import CheckListAdd from './CheckListAdd';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const ActionCheckListIndex = () => {
    const [checkedTab, setCheckedTab] = useState('Action List');
    const [actionList, setActionList] = useState([]);
    const [onModal, setOnModal] = useState(false);
    const { t } = useTranslation();
    const [checkList, setCheckList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        FetchApiGet('services/TaskManagement/ActionAndCheckList/GetAllActions', 'GET')
            .then((res) => res.json())
            .then((res) => setActionList(res.data));

        FetchApiGet('services/TaskManagement/ActionAndCheckList/GetAllCheckList', 'GET')
            .then((res) => res.json())
            .then((res) => setCheckList(res.data));
    }, []);

    return (
        <div className="action-checklist">
            <h4 className="action-checklist__header">{t('Action & Check List')}</h4>
            <div className="action-checklist__container">
                <TableTabs setCheckedTab={setCheckedTab} setOnModal={setOnModal} />
                {checkedTab === 'Action List' && (
                    <ActionListTable
                        actionList={actionList}
                        checkedTab={checkedTab}
                        setActionList={setActionList}
                        checkList={checkList}
                        setCheckList={setCheckList}
                    />
                )}
                {checkedTab === 'Check List' && (
                    <CheckListTable
                        actionList={actionList}
                        checkList={checkList}
                        setCheckList={setCheckList}
                        checkedTab={checkedTab}
                    />
                )}
            </div>
            <Modal show={onModal} className="task-management__modal">
                <Modal.Header className="task-management__modal-header">
                    <Modal.Title>{checkedTab === 'Action List' ? t('Add Action') : t('Add Check List')}</Modal.Title>
                    <button className="task-management__modal-close-btn" onClick={() => setOnModal(false)}>
                        <i className="dripicons-cross"></i>
                    </button>
                </Modal.Header>
                <Modal.Body className="p-0" style={{ position: 'relative' }}>
                    {checkedTab === 'Action List' && (
                        <ActionListAdd setOnModal={setOnModal} setActionList={setActionList} actionList={actionList} />
                    )}
                    {checkedTab === 'Check List' && (
                        <CheckListAdd
                            actionList={actionList}
                            setOnModal={setOnModal}
                            checkList={checkList}
                            setCheckList={setCheckList}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ActionCheckListIndex;
