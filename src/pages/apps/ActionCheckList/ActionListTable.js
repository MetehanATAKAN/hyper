import React, { useState } from 'react'
import MainTable from '../../../components/MainTable';
import { useTranslation } from 'react-i18next';
import DeleteModal from './DeleteModal';
import UpdateActionList from './UpdateActionList';
import { Modal } from 'react-bootstrap';

const ActionListTable = ({ actionList, checkedTab, setActionList, checkList, setCheckList }) => {
  const [deleteModal, setDeleteModal] = useState({ modalStatus: false, item: {} });
  const [updateActionList, setUpdateActionList] = useState({});
  const [onModal, setOnModal] = useState(false);
  const { t } = useTranslation();
  const handleActivityTypeChange = (value) => {
    setUpdateActionList(value);
    setOnModal(true);
};

  const [columns] = useState([
    { name: 'actionList', title: t('Action List') },
    { name: 'actions', title: t('Actions') },
]);

const [columnWidths, setColumnWidths] = useState([
    { columnName: 'actionList', width: "92%" },
    { columnName: 'actions', width: "8%" },
]);

const [tableColumnExtensions] = useState([
    { columnName: 'actionList', width: 500 },
    { columnName: 'actions', width: 95 },
]);

const itemsFromBackend = [
    { id: '1', isFreeze: false, content: t('Action List'), columnName: 'actionList', width: 500 },
    { id: '2', isFreeze: false, content: t('Actions'), columnName: 'actions', width: 100 },
];

// Group By Items
const [groupByItems, setGroupByItems] = useState([
    { id: '0', isShow: true, columnName: 'actionList', content: t('Action List') },
    { id: '1', isShow: true, columnName: 'actions', content: t('Actions') },
]);

const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
    { isShow: true, name: 'actionList', title: t('Action List') },
    { isShow: true, name: 'actions', title: t('Actions') },
]);

const [totalSummaryItems, setTotalSummaryItems] = useState([
    { type: 'count', columnName: 'actionList', width: 150 },
    { type: 'count', columnName: 'actions', width: 100 },
]);

const [groupSummaryItems, setGroupSummaryItems] = useState([
    { type: 'count', columnName: 'actionList', width: 150 },
    { type: 'count', columnName: 'actions', width: 100 },
]);

const buttons = actionList?.map((action, index) => ({
    id: index,
    content: (
        <span className="task-management-table-column__icons">
            <button title={t('Update')} id={action.id} onClick={() => handleActivityTypeChange(action)} >
                <i id={action.id} className="fa-solid fa-pencil"></i>
            </button>
            <button title={t('Delete')} onClick={() => setDeleteModal({ modalStatus: true, item: action })}>
                <i className={`fa-solid fa-trash-can task-management-table-column__icons-deleted-true`}></i>
            </button>
        </span>
    ),
    columnName: 'actions',
    width: 150,
}));

const actionListTableData = actionList?.map((el, index) => ({
    id: el.id,
    parentId: null,
    actionList: el.title,
    actions: buttons[index].content,
}));

const [columnOrders, setColumnOrders] = useState(['actionList', 'actions']);

  return (
    <div>
        <MainTable
            tableData={actionListTableData}
            columns={columns}
            columnWidths={columnWidths}
            setColumnWidths={setColumnWidths}
            tableColumnExtensions={tableColumnExtensions}
            itemsFromBackend={itemsFromBackend}
            columnOrders={columnOrders}
            setColumnOrders={setColumnOrders}
            disableFreeze={true}
            groupByItems={groupByItems}
            setGroupByItems={setGroupByItems}
            showorHideColumnsItems={showorHideColumnsItems}
            totalSummaryItems={totalSummaryItems}
            groupSummaryItems={groupSummaryItems}
        />
        {
            deleteModal.modalStatus && (
              <DeleteModal
                deleteModal={deleteModal}
                checkedTab={checkedTab}
                setDeleteModal={setDeleteModal}
                actionList={actionList}
                setActionList={setActionList}
              />
        )}
        
        <Modal show={onModal} onHide={() => setOnModal(false)} className="task-management__modal">
            <Modal.Header>
                <Modal.Title>{t('Update Action')}</Modal.Title>
                <button className="task-management__modal-close-btn" onClick={() => setOnModal(false)}>
                    <i className="dripicons-cross"></i>
                </button>
            </Modal.Header>
            <Modal.Body className='p-0'>
                <UpdateActionList setCheckList={setCheckList} checkList={checkList} updateActionList={updateActionList} setOnModal={setOnModal} actionList={actionList} setActionList={setActionList} />
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default ActionListTable