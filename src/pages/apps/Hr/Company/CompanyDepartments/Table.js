import React from 'react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../../components/MainTable';
import AddDepartmentModal from './AddDepartmentModal';
import Filter from './Filter';

const Table = ({tableData,setTableData}) => {

    const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const [isFilters, setIsFilters] = useState(true);

    const [columns] = useState([
        { name: 'companies', title: t('Companies') },
        { name: 'departments', title: t('Departments') },
        { name: 'responsible', title: t('Responsible') },
        { name: 'status', title: t('Status') },
        { name: 'startDate', title: t('Start Date') },
        { name: 'endDate', title: t('End Date') },
        { name: 'departmentOverview', title: t('Department Overview') },
        { name: 'upperDepartment', title: t('Upper Department') },
        { name: 'subDepartment', title: t('Sub-Department') },
        { name: 'positions', title: t('Positions') },
        { name: 'hierarchy', title: t('Hierarchy') },
        { name: 'actions', title: ' ' },
      ]);
    
    
      //Export Columns
      const [exportColumns] = useState([
        { name: 'companies', title: t('Companies') },
        { name: 'departments', title: t('Departments') },
        { name: 'responsible', title: t('Responsible') },
        { name: 'startDate', title: t('Start Date') },
        { name: 'endDate', title: t('End Date') },
        { name: 'departmentOverview', title: t('Department Overview') },
        { name: 'upperDepartment', title: 'Upper Department' },
        { name: 'subDepartment', title: 'Sub-Department' },
        { name: 'positions', title: 'Positions' },
        { name: 'hierarchy', title: 'Hierarchy' },
    ])
    
      // Table Columns Resizing Width
      const [columnWidths, setColumnWidths] = useState([
        { columnName: 'companies', width: '15%' },
        { columnName: 'departments', width: '15%' },
        { columnName: 'responsible', width: '15%' },
        { columnName: 'status', width: '7%' },
        { columnName: 'startDate', width: '10%'},
        { columnName: 'endDate', width: '10%' },
        { columnName: 'departmentOverview', width: '10%' },
        { columnName: 'upperDepartment', width: '10%' },
        { columnName: 'subDepartment', width: '10%' },
        { columnName: 'positions', width: '10%' },
        { columnName: 'hierarchy', width: '9%' },
        { columnName: 'actions', width: '3%' },
      ]);
    
      //Table Column Reordering
      const [tableColumnExtensions] = useState([
        { columnName: 'companies', width: '15%' },
        { columnName: 'departments', width: '15%' },
        { columnName: 'responsible', width: '15%' },
        { columnName: 'status', width: '5%' },
        { columnName: 'startDate', width: '15%'},
        { columnName: 'endDate', width: '10%' },
        { columnName: 'departmentOverview', width: '10%' },
        { columnName: 'upperDepartment', width: '10%' },
        { columnName: 'subDepartment', width: '10%' },
        { columnName: 'positions', width: '10%' },
        { columnName: 'hierarchy', width: '10%' },
        { columnName: 'actions', width: '5%' },
      ]);
    
      //Freeze Columns
      const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Companies', columnName: 'companies', width: 150 },
        { id: '2', isFreeze: false, content: 'Departments', columnName: 'departments', width: 150 },
        { id: '3', isFreeze: false, content: 'Responsible', columnName: 'responsible', width: 150 },
        { id: '4', isFreeze: false, content: 'Status', columnName: 'status', width: 150 },
        { id: '5', isFreeze: false, content: 'Start Date', columnName: 'startDate', width: 150 },
        { id: '6', isFreeze: false, content: 'End Date', columnName: 'endDate', width: 150 },
        { id: '7', isFreeze: false, content: 'Department Overview', columnName: 'departmentOverview', width: 150 },
        { id: '8', isFreeze: false, content: 'Upper Department', columnName: 'upperDepartment', width: 150 },
        { id: '9', isFreeze: false, content: 'Sub-Department', columnName: 'subDepartment', width: 150 },
        { id: '10', isFreeze: false, content: 'Positions', columnName: 'positions', width: 150 },
        { id: '11', isFreeze: false, content: 'Hierarchy', columnName: 'hierarchy', width: 150 },
        // { id: '6', isFreeze: false, content: '', columnName: 'actions', width: 100 },
      ];
    
      // Table show or hide items
      const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'companies', title: 'Companies' },
        { isShow: true, name: 'departments', title: 'Departments' },
        { isShow: true, name: 'responsible', title: 'Responsible' },
        { isShow: true, name: 'status', title: 'Status' },
        { isShow: true, name: 'startDate', title: 'Start Date' },
        { isShow: true, name: 'endDate', title: 'End Date' },
        { isShow: true, name: 'departmentOverview', title: 'Department Overview' },
        { isShow: true, name: 'upperDepartment', title: 'Upper Department' },
        { isShow: true, name: 'subDepartment', title: 'subDepartment' },
        { isShow: true, name: 'positions', title: 'Positions' },
        { isShow: true, name: 'hierarchy', title: 'hierarchy' },
      ])
    
      // Group By Items
      const [groupByItems, setGroupByItems] = useState([
        { id: '1',  isShow: true, content: 'Companies', columnName: 'companies' },
        { id: '2',  isShow: true, content: 'Departments', columnName: 'departments' },
        { id: '3',  isShow: true, content: 'Responsible', columnName: 'responsible'},
        { id: '4',  isShow: true, content: 'Status', columnName: 'status'},
        { id: '5',  isShow: true, content: 'Start Date', columnName: 'startDate' },
        { id: '6',  isShow: true, content: 'End Date', columnName: 'endDate' },
        { id: '7',  isShow: true, content: 'Department Overview', columnName: 'departmentOverview' },
        { id: '8',  isShow: true, content: 'Upper Department', columnName: 'upperDepartment' },
        { id: '9',  isShow: true, content: 'Sub-Department', columnName: 'subDepartment' },
        { id: '10', isShow: true, content: 'Positions', columnName: 'positions' },
        { id: '11', isShow: true, content: 'Hierarchy', columnName: 'hierarchy'},
      ])
    
      // Summary
      const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'companies', width: 150 },
        { type: 'count', columnName: 'departments', width: 150 },
        { type: 'count', columnName: 'responsible', width: 150 },
        { type: 'count', columnName: 'status', width: 150 },
        { type: 'count', columnName: 'startDate', width: 100 },
        { type: 'count', columnName: 'endDate', width: 100 },
        { type: 'count', columnName: 'departmentOverview', width: 100 },
        { type: 'count', columnName: 'upperDepartment', width: 100 },
        { type: 'count', columnName: 'subDepartment', width: 100 },
        { type: 'count', columnName: 'positions', width: 100 },
        { type: 'count', columnName: 'hierarchy', width: 100 },
      ])
    
      const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'companies', width: 150 },
        { type: 'count', columnName: 'departments', width: 150 },
        { type: 'count', columnName: 'responsible', width: 150 },
        { type: 'count', columnName: 'status', width: 150 },
        { type: 'count', columnName: 'startDate', width: 100 },
        { type: 'count', columnName: 'endDate', width: 100 },
        { type: 'count', columnName: 'departmentOverview', width: 100 },
        { type: 'count', columnName: 'upperDepartment', width: 100 },
        { type: 'count', columnName: 'subDepartment', width: 100 },
        { type: 'count', columnName: 'positions', width: 100 },
        { type: 'count', columnName: 'hierarchy', width: 100 },
      ])

      const [columnOrders, setColumnOrders] = useState(['companies', 'departments', 'responsible', 'status', 'startDate', 'endDate','departmentOverview','upperDepartment','subDepartment','positions','hierarchy','actions']);

      const addDepartmentModal = () => {
        setShow(true);
      }
  return (
    <div className='hr-main'>
      <MainTable
              tableData={tableData}
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
              addButtonFunction={addDepartmentModal}
              isFilters={isFilters}
              filters={<Filter tableData={tableData} setTableData={setTableData} isFilters={isFilters} setIsFilters={setIsFilters} />}
          />

          {
            show && 
            <AddDepartmentModal show={show} setShow={setShow} />
          }
    </div>
  )
}

export default Table