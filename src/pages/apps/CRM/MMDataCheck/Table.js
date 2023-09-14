import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../components/MainTable';
import Filter from './Filter';


  const Table = ({tableData,setTableData,tableItem,setTableItem}) => {

    const { t } = useTranslation();

    const [columns,setColumns] = useState([]);
    
    
      //Export Columns
      const [exportColumns,setExportColumns] = useState([])
    
      // Table Columns Resizing Width
      const [columnWidths, setColumnWidths] = useState([]);
    
      //Table Column Reordering
      const [tableColumnExtensions,setTableColumnExtensions] = useState([]);
    
      //Freeze Columns
      // const itemsFromBackend = [
      //   { id: '1', isFreeze: false, content: 'Departments', columnName: 'departments', width: 150 },
      //   { id: '2', isFreeze: false, content: 'Department Overview', columnName: 'departmentOverview', width: 150 },
      //   { id: '3', isFreeze: false, content: 'Positions', columnName: 'positions', width: 150 },
      //   { id: '4', isFreeze: false, content: 'Additional Positions', columnName: 'additionalPositions', width: 150 },
      //   { id: '5', isFreeze: false, content: 'Abbreviation', columnName: 'abbreviation', width: 150 },
      //   // { id: '6', isFreeze: false, content: '', columnName: 'actions', width: 100 },
      // ];

      const [itemsFromBackend, setItemsFromBackend] = useState([])
    
      // Table show or hide items
      const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([])
    
      // Group By Items
      const [groupByItems, setGroupByItems] = useState([])
    
      // Summary
      const [totalSummaryItems, setTotalSummaryItems] = useState([])
    
      const [groupSummaryItems, setGroupSummaryItems] = useState([])

      const [columnOrders, setColumnOrders] = useState(['departments', 'departmentOverview', 'positions', 'additionalPositions', 'abbreviation', 'actions']);

      useEffect(() => {
       if(tableData.length !== 0) {
        setColumns(
          tableData[0]?.headers.map(data => (
            {
              name:data.name,
              title:data.title
            }
          ))
        )
        setColumnWidths(
          tableData[0]?.headers.map(data => (
            {
              columnName:data.name,
              width:'15%'
            }
          ))
        )
        setTableColumnExtensions(
          tableData[0]?.headers.map(data => (
            {
              columnName:data.name,
              width:'15%'
            }
          ))
        )
        setItemsFromBackend(
          tableData[0]?.headers.map((data,index) => (
            { id: index, isFreeze: false, content: data.title, columnName: data.name, width: 150 }
          ))
        )
        setShoworHideColumnsItems(
          tableData[0]?.headers.map(data => (
            { isShow: true, name: data.name, title: data.title }
          ))
        )
        setGroupByItems(
          tableData[0]?.headers.map((data,index) => (
            { id:index,isShow: true, columnName: data.name,content: data.title }
          ))
        )
        setColumnOrders(
          tableData[0]?.headers.map((data,index) => (
            data.name
          ))
        )
       }
      }, [tableData])
      
  return (
    <div>
        {
          tableData &&
          <MainTable
              tableData={tableItem}
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
              isFilters={true}
              filters={<Filter tableData={tableData} setTableData={setTableData} />}
          />
        }
    </div>
  )
}

export default Table