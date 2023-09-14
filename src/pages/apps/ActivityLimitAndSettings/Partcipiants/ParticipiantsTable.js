import React, { useState } from 'react'
import MainTable from '../../../../components/MainTable';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
const ParticipiantsTable = ({ tableData, setTableData,exportTableData, setExportTableData }) => {

  const { t } = useTranslation();

  const [columns] = useState([
    { name: 'company', title: t('Company') },
    { name: 'position', title: 'Position' },
    { name: 'BusinessUnıte', title: 'Business Unite' },
    { name: 'productZoneArea', title: 'Product/Zone/Area' },
    { name: 'performer', title: 'Performer' },
    { name: 'checklist', title: 'Checklist' },
    { name: 'delete', title: '.' },
  ]);

  
  //Export Columns
  const [exportColumns] = useState([
    { name: 'company', title: t('Company') },
    { name: 'position', title: 'Position' },
    { name: 'BusinessUnıte', title: 'Business Unite' },
    { name: 'productZoneArea', title: 'Product/Zone/Area' },
])

  // Table Columns Resizing Width
  const [columnWidths, setColumnWidths] = useState([
    { columnName: 'company', width: '20%' },
    { columnName: 'position', width: '20%' },
    { columnName: 'BusinessUnıte', width: '20%' },
    { columnName: 'productZoneArea', width: '20%' },
    { columnName: 'performer', width: '5%' },
    { columnName: 'checklist', width: '10%' },
    { columnName: 'delete', width: '5%' },
  ]);

  //Table Column Reordering
  const [tableColumnExtensions] = useState([
    { columnName: 'company', width: 'auto' },
    { columnName: 'position', width: 'auto' },
    { columnName: 'BusinessUnıte', width: 'auto' },
    { columnName: 'productZoneArea', width: 'auto' },
    { columnName: 'performer', width: 'auto' },
    { columnName: 'checklist', width: 'auto' },
    { columnName: 'delete', width: 'auto' },
  ]);

  //Freeze Columns
  const itemsFromBackend = [
    { id: '1', content: 'Company', columnName: 'company', width: 50 },
    { id: '2', content: 'Position', columnName: 'position', width: 50 },
    { id: '3', content: 'Business Unite', columnName: 'BusinessUnıte', width: 50 },
    { id: '4', content: 'Product/Zone/Area', columnName: 'productZoneArea', width: 50 },
    { id: '5', content: 'Performer', columnName: 'performer', width: 50 },
    { id: '6', content: 'Checklist', columnName: 'checklist', width: 50 },
    { id: '7', content: '.', columnName: 'delete', width: 50 },
  ];


  // Table show or hide items
  const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
    { isShow: true, name: 'company', title: 'Company' },
    { isShow: true, name: 'position', title: 'Position' },
    { isShow: true, name: 'BusinessUnıte', title: 'Business Unite' },
    { isShow: true, name: 'productZoneArea', title: 'Product/Zone/Area' },
    { isShow: true, name: 'performer', title: 'Performer' },
    { isShow: true, name: 'checklist', title: 'Checklist' },
    { isShow: true, name: 'delete', title: '.' },
  ])

  // Group By Items
  const [groupByItems, setGroupByItems] = useState([
    { id: '0', isShow: true, columnName: 'company', content: 'Company' },
    { id: '1', isShow: true, columnName: 'position', content: 'Position' },
    { id: '2', isShow: true, columnName: 'BusinessUnıte', content: 'Business Unite' },
    { id: '3', isShow: true, columnName: 'productZoneorArea', content: 'Product/Zone or Area' },
    { id: '4', isShow: true, columnName: 'performer', content: 'Performer' },
    { id: '5', isShow: true, columnName: 'checklist', content: 'Checklist' },
    { id: '6', isShow: true, columnName: 'delete', content: '.' },
  ])

  // Summary
  const [totalSummaryItems, setTotalSummaryItems] = useState([
    { type: 'count', columnName: 'company', width: 150 },
    { type: 'count', columnName: 'position', width: 150 },
    { type: 'count', columnName: 'BusinessUnıte', width: 150 },
    { type: 'count', columnName: 'productZoneorArea', width: 150 },
    { type: 'count', columnName: 'performer', width: 100 },
    { type: 'count', columnName: 'checklist', width: 100 },
    { type: 'count', columnName: 'delete', width: 100 },
  ])

  const [groupSummaryItems, setGroupSummaryItems] = useState([
    { type: 'count', columnName: 'company', width: 150 },
    { type: 'count', columnName: 'position', width: 150 },
    { type: 'count', columnName: 'BusinessUnıte', width: 150 },
    { type: 'count', columnName: 'productZoneorArea', width: 150 },
    { type: 'count', columnName: 'performer', width: 100 },
    { type: 'count', columnName: 'checklist', width: 100 },
    { type: 'count', columnName: 'delete', width: 100 },
  ])

  const [columnOrders, setColumnOrders] = useState(['company', 'position', 'BusinessUnıte', 'productZoneArea', 'performer', 'checklist', 'delete']);

  return (
    <div>
      <br />
      <MainTable
        tableData={tableData}
        exportTableData={exportTableData}
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
      />
      {/* <MainTable tableData={tableData} columns={columns} columnWidths={columnWidths} setColumnWidths={setColumnWidths} tableColumnExtensions={tableColumnExtensions} itemsFromBackend={itemsFromBackend} columnOrders={columnOrders} setColumnOrders={setColumnOrders} showorHideColumnsItems={showorHideColumnsItems} /> */}
      <br />
      <hr />
    </div>
  )
}

export default ParticipiantsTable