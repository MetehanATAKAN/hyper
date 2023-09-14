import React, { useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../components/MainTable';
import AddDepartmantModal from './AddDepartmantModal';
import Filter from './Filter';

const Table = ({ tableData, setTableData, allDatas}) => {

    const { t } = useTranslation();

    console.log(allDatas);
    
    const [columns,setColumns] = useState([
        { name: 'departments', title: t('Departments') },
        { name: 'departmentOverview', title: t('Department Overview') },
        { name: 'positions', title: t('Positions') },
        { name: 'additionalPositions', title: t('Additional Positions') },
        { name: 'abbreviation', title: t('Abbreviation') },
        { name: 'actions', title: ' ' },
      ]);
    
    
      //Export Columns
      const [exportColumns,setExportColumns] = useState([
        { name: 'departments', title: t('Departments') },
        { name: 'departmentOverview', title: t('Department Overview') },
        { name: 'positions', title: t('Positions') },
        { name: 'additionalPositions', title: t('Additional Positions') },
        { name: 'abbreviation', title: t('Abbreviation') },
    ])
    
      // Table Columns Resizing Width
      const [columnWidths, setColumnWidths] = useState([
        { columnName: 'departments', width: '20%' },
        { columnName: 'departmentOverview', width: '20%' },
        { columnName: 'positions', width: '20%' },
        { columnName: 'additionalPositions', width: '20%' },
        { columnName: 'abbreviation', width: '17%' },
        { columnName: 'actions', width: '3%' },
      ]);
    
      //Table Column Reordering
      const [tableColumnExtensions,setTableColumnExtensions] = useState([
        { columnName: 'departments', width: 210 },
        { columnName: 'departmentOverview', width: 190 },
        { columnName: 'positions', width: 150 },
        { columnName: 'additionalPositions', width: 170 },
        { columnName: 'abbreviation', width: 130 },
        { columnName: 'actions', width: 30 },
      ]);
    
      //Freeze Columns
      const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Departments', columnName: 'departments', width: 150 },
        { id: '2', isFreeze: false, content: 'Department Overview', columnName: 'departmentOverview', width: 150 },
        { id: '3', isFreeze: false, content: 'Positions', columnName: 'positions', width: 150 },
        { id: '4', isFreeze: false, content: 'Additional Positions', columnName: 'additionalPositions', width: 150 },
        { id: '5', isFreeze: false, content: 'Abbreviation', columnName: 'abbreviation', width: 150 },
        { id: '6', isFreeze: false, content: ' ', columnName: 'actions', width: 100 },
      ];
    
      // Table show or hide items
      const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'departments', title: 'Departments' },
        { isShow: true, name: 'departmentOverview', title: 'Department Overview' },
        { isShow: true, name: 'positions', title: 'Positions' },
        { isShow: true, name: 'additionalPositions', title: 'Additional Positions' },
        { isShow: true, name: 'abbreviation', title: 'Abbreviation' },
      ])
    
      // Group By Items
      const [groupByItems, setGroupByItems] = useState([
        { id:'0',isShow: true, columnName: 'departments',           content: 'Departments' },
        { id:'1',isShow: true, columnName: 'departmentOverview',    content: 'Department Overview' },
        { id:'2',isShow: true, columnName: 'positions',             content: 'Positions' },
        { id:'3',isShow: true, columnName: 'additionalPositions',   content: 'Additional Positions' },
        { id:'4',isShow: true, columnName: 'abbreviation',          content: 'Abbreviation' },
      ])
    
      // Summary
      const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'departments', width: 150 },
        { type: 'count', columnName: 'departmentOverview', width: 150 },
        { type: 'count', columnName: 'positions', width: 150 },
        { type: 'count', columnName: 'additionalPositions', width: 150 },
        { type: 'count', columnName: 'abbreviation', width: 100 },
      ])
    
      const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'departments', width: 150 },
        { type: 'count', columnName: 'departmentOverview', width: 150 },
        { type: 'count', columnName: 'positions', width: 150 },
        { type: 'count', columnName: 'additionalPositions', width: 150 },
        { type: 'count', columnName: 'abbreviation', width: 100 },
      ])

      const [isShow, setIsShow] = useState(false);

      const addDepartmentModal = () => {
        setIsShow(true);
      }

      const [columnOrders, setColumnOrders] = useState(['departments', 'departmentOverview', 'positions', 'additionalPositions', 'abbreviation', 'actions']);

      // useEffect(() => {
      //   setColumns(allDatas?.map(data => (
      //     { name: data.departments, title: data.departments }
      //   )))
      //   setColumnWidths(allDatas?.map(data => (
      //     { columnName: data.departments, width: '20%' }
      //   )))
      //   setTableColumnExtensions(allDatas?.map(data => (
      //     { columnName: data.departments, width: 150 }
      //   )))
      //   setShoworHideColumnsItems(allDatas?.map(data => (
      //     { isShow: true, name: data.departments, title: data.departments }
      //   )))
      //   setColumnOrders(allDatas?.map(data => (
      //     data.departments
      //   )))
      // }, [allDatas])
      
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
              // isFilters={true}
              // filters={<Filter tableData={tableData} setTableData={setTableData} />}
          />

          {
              isShow &&
              <AddDepartmantModal
                  isShow={isShow}
                  setIsShow={setIsShow}
                  tableData={tableData}
                  setTableData={setTableData}
              />
          }
      </div>
  )
}

export default Table