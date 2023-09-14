import React, { useState } from 'react'
import MainTable from '../../../components/MainTable';
import { useTranslation } from 'react-i18next';
import DeleteModal from './DeleteModal';
import UpdateCheckList from './UpdateCheckList';
import { Modal, OverlayTrigger, Button, Popover, Tooltip, Image } from 'react-bootstrap';

const CheckListTable = ({ checkedTab, checkList, setCheckList, actionList}) => {
  const [deleteModal, setDeleteModal] = useState({ modalStatus: false, item: {} });
  const [updateCheckList, setUpdateCheckList] = useState({});
  const [onModal, setOnModal] = useState(false);
  const { t } = useTranslation();

  const handleCheckListChange = (value) => {
    setUpdateCheckList(value);
    setOnModal(true);
};

  const [columns] = useState([
    { name: 'sharp', title: '#' },
    { name: 'name', title: t('Name') },
    { name: 'checkList', title: t('Check List') },
    { name: 'actions', title: t('Actions') },
]);

const [columnWidths, setColumnWidths] = useState([
    { columnName: 'sharp', width: "6%" },
    { columnName: 'name', width: "69%" },
    { columnName: 'checkList', width: "15%" },
    { columnName: 'actions', width: "10%" },
]);

const [tableColumnExtensions] = useState([
    { columnName: 'sharp', width: 70 },
    { columnName: 'name', width: 150 },
    { columnName: 'checkList', width: 500 },
    { columnName: 'actions', width: 95 },
]);

const itemsFromBackend = [
    { id: '1', content: '#', columnName: 'sharp', width: 100 },
    { id: '2', content: t('Name'), columnName: 'name', width: 500 },
    { id: '3', content: t('Check List'), columnName: 'checkList', width: 500 },
];

// Group By Items
  const [groupByItems, setGroupByItems] = useState([
    { id: '0', isShow: true, columnName: 'name', content: t('Name') },
    { id: '1', isShow: true, columnName: 'checkList', content: t('Check List') },
    { id: '1', isShow: true, columnName: 'actions', content: t('Actions') },
  ]);

  const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
    { isShow: true, name: 'name', title: t('Name') },
    { isShow: true, name: 'checkList', title: t('Check List') },
    { isShow: true, name: 'actions', title: t('Actions') },
  ]);

  const [totalSummaryItems, setTotalSummaryItems] = useState([
    { type: 'count', columnName: 'name', width: 150 },
    { type: 'count', columnName: 'checkList', width: 150 },
    { type: 'count', columnName: 'actions', width: 100 },
  ]);

  const [groupSummaryItems, setGroupSummaryItems] = useState([
    { type: 'count', columnName: 'name', width: 150 },
    { type: 'count', columnName: 'checkList', width: 150 },
    { type: 'count', columnName: 'actions', width: 100 },
  ]);


const buttons = checkList?.map((item, index) => ({
    id: index,
    content: (
        <span className="task-management-table-column__icons">
            <button disabled><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABOElEQVRIie2TTU7CUBSFv9taJ+zAbehcFiBxBUxI6BvrUIOJRBNwwLxtQuLPAog61gXIOlwBTuSF44AWC8EEZKIJ3+i+175zT+/pgy1b/jxWXjjnjiWdAAdApfwsTdO5d+M41oLWh6S3IAh6SZI8FZtBUTSbzY6kAXC4KL4iFTOrSnqM4/h67gty5wPgE2h57x/6/f77OuqNRmMviqK6pDawK6mWZdnzDkA+FszsIkmSm1+4JzfUdc4hqWNmp8C0AbCfN7orH1oy56WU8wnD8NZ732Ga43cGAN57Y0Mmk0mYlwIoRjQ0s2oURXWgu8zZGg3qAGY2nDUIgqAnqSqp7ZxjPB7fbxDyZW66B6V7kP9aZz8JrHAPZki6yrKsBaUM0jQ9l1QDXoHROu5zRmb2AhwV4lu2/BO+AAXnkSL4g/moAAAAAElFTkSuQmCC"/></button>
            <button title={t('Update')} id={item.id} onClick={() => handleCheckListChange(item)} >
                <i className="fa-solid fa-pencil"></i>
            </button>
            <button title={t('Delete')} onClick={() => setDeleteModal({ modalStatus: true, item: item })}>
                <i className={`fa-solid fa-trash-can task-management-table-column__icons-deleted-true`}></i>
            </button>
        </span>
    ),
    columnName: '-',
    width: 150,
}));

const handleLength = (action) => {
    let checkedLength = 0;
    action.actions.map((item) => (
        item.isChecked === true && checkedLength++
    ))
    return `${checkedLength}/${action.actions.length}`;
}

const actionListTableData = checkList?.map((el, index) => ({
    id: el.id,
    parentId: null,
    sharp: index + 1,
    name: el.title,
    checkList: <OverlayTrigger className="checklist-table__overlay"
    trigger="focus"
    key="bottom"
    placement="bottom"
    onEntering={(e) => (
    e.children[1].style.backgroundColor = 'rgba(255, 255, 255, 1)',
    e.children[1].style.border = '1px solid rgba(0,0,0,0.2)',
    e.children[1].style.color = 'black',
    e.children[0].style.opacity = '1',
    console.log(e)
    )}
    overlay={<Tooltip id="button-tooltip-2">{el.actions.map((item, index) => (
      <div key={index} className="checklist-main-wiev-checks">
        <img alt='list-image' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAl0lEQVRIie2UOw4CMQxExwhRTw6XcuEWQLVIcJQtcznXSMg0S6q4QS74+JWTp0ykSAP8G+Id1Fp3pZQbgAmAmdmiqnNr7R7hb71iklcAx/5CkRNJADhH+BuvWET2g+wQ5bvFAGyQPaJ8t9jMlkE8yt7y3T9W1ZkkRGR6Xayqlyg/+X1yuTq5XCu5XMnnk8vVyeVayeX6Pp4gi8bEgLk5bgAAAABJRU5ErkJggg==" />
        <input class="form-check-input" type="checkbox" value="" checked={item.isChecked}></input>
        <div>{item.title}</div>
      </div>
    ))}</Tooltip>}
  >
    {({ ref, ...triggerHandler }) => (
        <div className="checklist-main-wiev-checks__button" ><span>{handleLength(el)}</span> <button style={{background: "transparent", border: "none"}} {...triggerHandler}><input ref={ref} disabled className="form-check-input" type="checkbox"/></button></div>
    )}
  </OverlayTrigger>,
    actions: buttons[index].content,
}));

/*
<OverlayTrigger
    trigger="focus"
    key="bottom"
    placement="bottom"
    overlay={
      <Popover id={`popover-positioned-bottom`}>
        <Popover.Body>
          {el.actions.map((item, index) => (
            <div key={index} className="checklist-main-wiev-checks">
              <img alt='list-image' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAl0lEQVRIie2UOw4CMQxExwhRTw6XcuEWQLVIcJQtcznXSMg0S6q4QS74+JWTp0ykSAP8G+Id1Fp3pZQbgAmAmdmiqnNr7R7hb71iklcAx/5CkRNJADhH+BuvWET2g+wQ5bvFAGyQPaJ8t9jMlkE8yt7y3T9W1ZkkRGR6Xayqlyg/+X1yuTq5XCu5XMnnk8vVyeVayeX6Pp4gi8bEgLk5bgAAAABJRU5ErkJggg==" />
              <input class="form-check-input" type="checkbox" value="" checked={item.isChecked}></input>
              <div>{item.title}</div>
            </div>
          ))}
        </Popover.Body>
      </Popover>
    }>
      <button className="checklist-main-wiev-checks__button" ><span>{handleLength(el)}</span> <input disabled class="form-check-input" type="checkbox"></input></button>
    </OverlayTrigger>,
*/
const [columnOrders, setColumnOrders] = useState(['sharp','name', 'checkList', 'actions']);
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
                checkList={checkList}
                setCheckList={setCheckList}
              />
        )}

        <Modal show={onModal} onHide={() => setOnModal(false)} className="task-management__modal">
          <Modal.Header>
              <Modal.Title>{t('Update Check')}</Modal.Title>
              <button className="task-management__modal-close-btn" onClick={() => setOnModal(false)}>
                  <i className="dripicons-cross"></i>
              </button>
          </Modal.Header>
          <Modal.Body className='p-0'>
              <UpdateCheckList actionList={actionList} updateCheckList={updateCheckList} setOnModal={setOnModal} checkList={checkList} setCheckList={setCheckList} />
          </Modal.Body>
        </Modal>
    </div>
  )
}

export default CheckListTable