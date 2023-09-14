import React, { useState, useEffect } from 'react'
import MainTable from '../../../../components/MainTable';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const OwnersTable = ({ tableData, setTableData, exportTableData, seteEportTableData }) => {

  const { t } = useTranslation();
  const ownerTable=useSelector(state=>state.ActivityLimit.ownersTableDataMain);
  

  const [columns] = useState([
    { name: 'company', title: t('Company') },
    { name: 'position', title: t('Position') },
    { name: 'businessUnıte', title: t('Business Unite') },
    { name: 'productZoneorArea', title: t('Product/Zone or Area') },
    { name: 'client', title: t('Client') },
    { name: 'budget', title: t('Budget') },
    { name: 'kol', title: t('KOL') },
    { name: 'companyParticipants', title: t('Company Participants') },
    { name: 'guest', title: t('Guest') },
  ]);


  //Export Columns
  const [exportColumns] = useState([
    { name: 'company', title: t('Company') },
    { name: 'position', title: t('Position') },
    { name: 'businessUnıte', title: t('Business Unite') },
    { name: 'productZoneorArea', title: t('Product/Zone or Area') },
])

  // Table Columns Resizing Width
  const [columnWidths, setColumnWidths] = useState([
    { columnName: 'company', width: '20%' },
    { columnName: 'position', width: '20%' },
    { columnName: 'businessUnıte', width: '20%' },
    { columnName: 'productZoneorArea', width: '20%' },
    { columnName: 'client', width: '20%' },
    { columnName: 'budget', width: '20%' },
    { columnName: 'kol', width: '20%' },
    { columnName: 'companyParticipants', width: '20%' },
    { columnName: 'guest', width: '20%' },
  ]);

  //Table Column Reordering
  const [tableColumnExtensions] = useState([
    { columnName: 'company', width: 150 },
    { columnName: 'position', width: 150 },
    { columnName: 'businessUnıte', width: 150 },
    { columnName: 'productZoneorArea', width: 150 },
    { columnName: 'client', width: 100 },
    { columnName: 'budget', width: 100 },
    { columnName: 'kol', width: 100 },
    { columnName: 'companyParticipants', width: 100 },
    { columnName: 'guest', width: 100 },
  ]);

  //Freeze Columns
  const itemsFromBackend = [
    { id: '1', isFreeze: false, content: 'Company', columnName: 'company', width: 150 },
    { id: '2', isFreeze: false, content: 'Position', columnName: 'position', width: 150 },
    { id: '3', isFreeze: false, content: 'Activity', columnName: 'activity', width: 150 },
    { id: '4', isFreeze: false, content: 'Business Unite', columnName: 'businessUnıte', width: 150 },
    { id: '5', isFreeze: false, content: 'Product/Zone or Area', columnName: 'productZoneorArea', width: 150 },
    { id: '6', isFreeze: false, content: 'Client', columnName: 'client', width: 100 },
    { id: '7', isFreeze: false, content: 'Budget', columnName: 'budget', width: 100 },
    { id: '8', isFreeze: false, content: 'KOL', columnName: 'kol', width: 100 },
    { id: '9', isFreeze: false, content: 'Company Participants', columnName: 'companyParticipants', width: 100 },
    { id: '10', isFreeze: false, content: 'Guest', columnName: 'guest', width: 100 },
  ];

  // Table show or hide items
  const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
    { isShow: true, name: 'company', title: 'Company' },
    { isShow: true, name: 'position', title: 'Position' },
    { isShow: true, name: 'businessUnıte', title: 'Business Unite' },
    { isShow: true, name: 'productZoneorArea', title: 'Product/Zone or Area' },
    { isShow: true, name: 'client', title: 'Client' },
    { isShow: true, name: 'budget', title: 'Budget' },
    { isShow: true, name: 'kol', title: 'KOL' },
    { isShow: true, name: 'companyParticipants', title: 'Company Participants' },
    { isShow: true, name: 'guest', title: 'Guest' },
  ])

  // Group By Items
  const [groupByItems, setGroupByItems] = useState([
    { id:'0',isShow: true, columnName: 'company',             content: 'Company' },
    { id:'1',isShow: true, columnName: 'position',            content: 'Position' },
    { id:'2',isShow: true, columnName: 'businessUnıte',       content: 'Business Unite' },
    { id:'3',isShow: true, columnName: 'productZoneorArea',   content: 'Product/Zone or Area' },
    { id:'4',isShow: true, columnName: 'client',              content: 'Client' },
    { id:'5',isShow: true, columnName: 'budget',              content: 'Budget' },
    { id:'6',isShow: true, columnName: 'kol',                 content: 'KOL' },
    { id:'7',isShow: true, columnName: 'companyParticipants', content: 'Company Participants' },
    { id:'8',isShow: true, columnName: 'guest',               content: 'Guest' },
  ])

  // Summary
  const [totalSummaryItems, setTotalSummaryItems] = useState([
    { type: 'count', columnName: 'company', width: 150 },
    { type: 'count', columnName: 'position', width: 150 },
    { type: 'count', columnName: 'businessUnıte', width: 150 },
    { type: 'count', columnName: 'productZoneorArea', width: 150 },
    { type: 'count', columnName: 'client', width: 100 },
    { type: 'count', columnName: 'budget', width: 100 },
    { type: 'count', columnName: 'kol', width: 100 },
    { type: 'count', columnName: 'companyParticipants', width: 100 },
    { type: 'count', columnName: 'guest', width: 100 },
  ])

  const [groupSummaryItems, setGroupSummaryItems] = useState([
    { type: 'count', columnName: 'company', width: 150 },
    { type: 'count', columnName: 'position', width: 150 },
    { type: 'count', columnName: 'businessUnıte', width: 150 },
    { type: 'count', columnName: 'productZoneorArea', width: 150 },
    { type: 'count', columnName: 'client', width: 100 },
    { type: 'count', columnName: 'budget', width: 100 },
    { type: 'count', columnName: 'kol', width: 100 },
    { type: 'count', columnName: 'companyParticipants', width: 100 },
    { type: 'count', columnName: 'guest', width: 100 },
  ])

  useEffect(() => {
    const element = document.querySelector('.modal-dialog');
    const node =element.childNodes;
    // const parentNode = node[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[2].childNodes[0].childNodes[1].childNodes[0];
    // console.log(node[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[2].childNodes[0].childNodes[1].childNodes[0]);
    const parentNode = node[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[2].childNodes[0].childNodes[1].childNodes[0];
    parentNode.style.maxHeight = '170px';
    parentNode.style.overflow  = 'auto';
  }, [tableData])
  

  const [columnOrders, setColumnOrders] = useState(['company', 'position', 'businessUnıte', 'productZoneorArea', 'client', 'budget', 'kol', 'companyParticipants', 'guest']);
  
  return (
    <div className='owner-table'>
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
      setGroupByItems={setGroupByItems} />
    </div>
  )
}

export default OwnersTable
