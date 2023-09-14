import React from 'react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../../components/MainTable';
import CreateTeamModal from './CreateTeamModal';
import Filter from './Filter';
import Icon from '@mdi/react';
import { mdiEyeOutline } from '@mdi/js';
import { Dropdown, Menu } from 'antd';
import Tippy from '@tippyjs/react';
import Update from './Update';
import Delete from './Delete';
import { useSelector } from 'react-redux';

const Table = ({ tableData, setTableData }) => {

  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [isFilters, setIsFilters] = useState(true);

  const [updateModal, setUpdateModal] = useState(false);
  const [tableItem, setTableItem] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);


  const [columns] = useState([
    { name: 'companies', title: t('Companies') },
    { name: 'businessUnite', title: t('Business Unite') },
    { name: 'department', title: t('Department') },
    { name: 'teamName', title: t('Team Name') },
    { name: 'positions', title: t('Positions') },
    { name: 'hierarchy', title: t('Hierarchy') },
    { name: 'actions', title: ' ' },
  ]);


  //Export Columns
  const [exportColumns] = useState([
    { name: 'companies', title: t('Companies') },
    { name: 'businessUnite', title: t('Business Unite') },
    { name: 'department', title: t('Department') },
    { name: 'teamName', title: t('Team Name') },
    { name: 'positions', title: t('Positions') },
  ])

  // Table Columns Resizing Width
  const [columnWidths, setColumnWidths] = useState([
    { columnName: 'companies', width: '20%' },
    { columnName: 'businessUnite', width: '20%' },
    { columnName: 'department', width: '20%' },
    { columnName: 'teamName', width: '15%' },
    { columnName: 'positions', width: '15%' },
    { columnName: 'hierarchy', width: '7%' },
    { columnName: 'actions', width: '3%' },
  ]);

  //Table Column Reordering
  const [tableColumnExtensions] = useState([
    { columnName: 'companies', width: '20%' },
    { columnName: 'businessUnite', width: '20%' },
    { columnName: 'department', width: '20%' },
    { columnName: 'teamName', width: '15%' },
    { columnName: 'positions', width: '10%' },
    { columnName: 'hierarchy', width: '10%' },
    { columnName: 'actions', width: '5%' },
  ]);

  //Freeze Columns
  const itemsFromBackend = [
    { id: '1', isFreeze: false, content: 'Companies', columnName: 'companies', width: '20%' },
    { id: '2', isFreeze: false, content: 'Business Unite', columnName: 'businessUnite', width: '20%' },
    { id: '3', isFreeze: false, content: 'Department', columnName: 'department', width: '20%' },
    { id: '4', isFreeze: false, content: 'Team Name', columnName: 'teamName', width: '15%' },
    { id: '5', isFreeze: false, content: 'Positions', columnName: 'positions', width: '10%' },
    { id: '6', isFreeze: false, content: 'Hierarchy', columnName: 'hierarchy', width: '10%' },
  ];

  // Table show or hide items
  const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
    { isShow: true, name: 'companies', title: t('Companies') },
    { isShow: true, name: 'businessUnite', title: t('Business Unite') },
    { isShow: true, name: 'department', title: t('Department') },
    { isShow: true, name: 'teamName', title: t('Team Name') },
    { isShow: true, name: 'positions', title: t('Positions') },
    { isShow: true, name: 'hierarchy', title: t('Hierarchy') },
  ])

  // Group By Items
  const [groupByItems, setGroupByItems] = useState([
    { id: '1', isShow: true, content: 'Companies', columnName: 'companies' },
    { id: '2', isShow: true, content: 'Business Unite', columnName: 'businessUnite' },
    { id: '3', isShow: true, content: 'Department', columnName: 'department' },
    { id: '4', isShow: true, content: 'Team Name', columnName: 'teamName' },
    { id: '5', isShow: true, content: 'Positions', columnName: 'positions' },
    { id: '6', isShow: true, content: 'Hierarchy', columnName: 'hierarchy' },
  ])

  // Summary
  const [totalSummaryItems, setTotalSummaryItems] = useState([
    { type: 'count', columnName: 'companies', width: '20%' },
    { type: 'count', columnName: 'businessUnite', width: '20%' },
    { type: 'count', columnName: 'department', width: '20%' },
    { type: 'count', columnName: 'teamName', width: '15%' },
    { type: 'count', columnName: 'positions', width: '10%' },
    { type: 'count', columnName: 'hierarchy', width: '10%' },
  ])

  const [groupSummaryItems, setGroupSummaryItems] = useState([
    { type: 'count', columnName: 'companies', width: '20%' },
    { type: 'count', columnName: 'businessUnite', width: '20%' },
    { type: 'count', columnName: 'department', width: '20%' },
    { type: 'count', columnName: 'teamName', width: '15%' },
    { type: 'count', columnName: 'positions', width: '10%' },
    { type: 'count', columnName: 'hierarchy', width: '10%' },
  ])

  const [columnOrders, setColumnOrders] = useState(['companies', 'businessUnite', 'department', 'teamName', 'positions', 'hierarchy', 'actions']);

  const createTeamModal = () => {
    setShow(true);
  }

  const actions = (name, data) => {

    if (name === 'Edit') {
      console.log('if içinde');
      setUpdateModal(true);
      setTableItem(data);
    }
    else if (name === 'Delete') {
      setDeleteModal(true);
      setTableItem(data);
    }

  }

  const statusOptions = [
    {
      id: 9,
      key: 'Edit',
      icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
      color: '#6C757D',
    },
    {
      id: 0,
      key: 'Delete',
      icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
      color: '#FA5C7C',
    },
  ];

  const menu = (data) => {
    return <Menu>
      {statusOptions?.map((el, i) => (
        <Menu.Item
          style={{ paddingTop: 0, paddingBottom: 0, marginBottom: '5px' }}
          onClick={(e) => actions(el.key, data)}
          key={i}
        >
          <span style={{ color: el.color }}>
            {el.icon}
            {t(el.key)}
          </span>
        </Menu.Item>
      ))}
    </Menu>
  }

  const teamsTable = tableData?.map(data => (
    {
      companies: (
        <Tippy
          placement='left'
          content={
            <span>
              {data.companyName}
            </span>
          }
        >
          <span>
            {data.companyName}
          </span>
        </Tippy>
      ),
      businessUnite: data.businessUnitName,
      department: (
        <span
          className="task-management-activity-background"
          style={{
            backgroundColor: data?.department?.color + '50',
            color: data?.department?.color,
            padding: '3px 6px',
            fontSize: '.7rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            marginRight: '5px',
          }}>
          {data?.department?.departmentName}
        </span>
      ),
      teamName: data.teamName,
      positions: `+${data.employee?.length}`,
      hierarchy: (
        <div className='text-center'>
          <Icon path={mdiEyeOutline}
            size={1}
            color={'#6C757D'}
          />
        </div>
      ),
      actions: (
        <Dropdown overlayStyle={{ minWidth: '155px' }} trigger={'click'} overlay={() => menu(data)} placement="bottom">
          <i style={{ cursor: 'pointer' }} className="fas fa-ellipsis-v"></i>
        </Dropdown>

      )
    }
  ))

  return (
    <div className='hr-main'>
      <MainTable
        tableData={teamsTable}
        columns={columns}
        exportColumns={exportColumns}
        columnWidths={columnWidths}
        setColumnWidths={setColumnWidths}
        tableColumnExtensions={tableColumnExtensions}
        itemsFromBackend={itemsFromBackend}
        columnOrders={columnOrders}
        setColumnOrders={setColumnOrders}
        showorHideColumnsItems={showorHideColumnsItems}
        totalSummaryItems={totalSummaryItems}
        groupSummaryItems={groupSummaryItems}
        groupByItems={groupByItems}
        setGroupByItems={setGroupByItems}
        isAddButton={true}
        addButtonFunction={createTeamModal}
        isFilters={isFilters}
        filters={<Filter
          tableData={tableData}
          setTableData={setTableData}
          isFilters={isFilters}
          setIsFilters={setIsFilters}
        />
        }
      />

      {
        show &&
        <CreateTeamModal
          show={show}
          setShow={setShow}
          setTableData={setTableData}
        />
      }

      {
        updateModal &&
        (<Update
          show={updateModal}
          setShow={setUpdateModal}
          data={tableItem}
          setTableData={setTableData}
        />)

      }

      {
        deleteModal &&
        <Delete
          modalShow={deleteModal}
          setModalShow={setDeleteModal}
          data={tableItem}
          setIsFilters={setIsFilters}
          setTableData={setTableData}
        />
      }
    </div>
  )
}

export default Table