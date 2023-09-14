import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../components/MainTable';
import { mdiLinkVariant,mdiDotsVertical,mdiDelete, mdiSendCheck, mdiExclamationThick   } from '@mdi/js';
import Icon from '@mdi/react'
import Filter from './Filter';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';

const Table = ({tableData,setTableData,showModal,setShowModal,data}) => {

    const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const menuRef = useRef();
    const [selectionItems, setSelectionItems] = useState([]);

    const [tableCollectiveMenu, setTableCollectiveMenu] = useState(false);
    console.log(tableCollectiveMenu);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = () => {
      console.log('handle click de');
      setTableCollectiveMenu(prev=>!prev);
    };
    
    const selection = (items) => {
      setSelectionItems(items)
    }

    const [sortingStateColumnExtensions] = useState([
      { columnName: 'actions', sortingEnabled: false },
    ]);
    const [defaultSorting] = useState([
      { columnName: 'gender', direction: 'desc' },
    ]);
  
    const [columns] = useState([
        { name: 'link', title: (<Icon path={mdiLinkVariant} size={1}/>) },
        { name: 'product', title: t('Product') },
        { name: 'promoSubject', title: t('Promo Subject') },
        { name: 'need', title: t('Need') },
        { name: 'benefit', title: t('Benefit') },
        { name: 'specialization', title: t('Specialization') },
        { name: 'orgType', title: t('Organization Type') },
        { name: 'visitStracture', title: t('Visit Stracture') },
        { name: 'page', title: t('Page') },
        { name: 'status', title: t('Status') },
        { name: 'actions', title:(
          <>
         <Icon onClick={()=>handleClick()} path={mdiDotsVertical} size={1}/>
          <div className={'table-collective-menu'} ref={menuRef}>
            <Paper>
                  <MenuList>
                    <MenuItem>
                     <span className='icon'>
                     <Icon path={mdiDelete} size={1}/>
                      </span>  

                      <span className='action-name'>
                      {t('Delete')}
                      </span>
                      </MenuItem>
                    <MenuItem>
                    <span className='icon'>
                     <Icon path={mdiDelete} size={1}/>
                      </span>  

                      <span className='action-name'>
                      {t('Approve')}
                      </span>
                    </MenuItem>
                    <MenuItem>
                    <span className='icon'>
                     <Icon path={mdiSendCheck} size={1}/>
                      </span>  

                      <span className='action-name'>
                      {t('Send to aprrove')}
                      </span>
                    </MenuItem>
                    <MenuItem>
                    <span className='icon'>
                     <Icon path={mdiExclamationThick} size={1}/>
                      </span>  

                      <span className='action-name'>
                      {t('Reject')}
                      </span>
                    </MenuItem>
                  </MenuList>
                </Paper>
                </div>
          </>
        )
        },
      ]);
    
    
      //Export Columns
      const [exportColumns] = useState([
        { name: 'product', title: t('Product') },
        { name: 'promoSubject', title: t('Promo Subject') },
        { name: 'need', title: t('Need') },
        { name: 'benefit', title: t('Benefit') },
        { name: 'specialization', title: t('Specialization') },
        { name: 'orgType', title: t('Organization Type') },
    ])
    
      // Table Columns Resizing Width
      const [columnWidths, setColumnWidths] = useState([
        { columnName: 'link', width: '8%' },
        { columnName: 'product', width: '20%' },
        { columnName: 'promoSubject', width: '16%' },
        { columnName: 'need', width: '10%' },
        { columnName: 'benefit', width: '15%'},
        { columnName: 'specialization', width: '25%' },
        { columnName: 'orgType', width: '10%' },
        { columnName: 'visitStracture', width: '10%' },
        { columnName: 'page', width: '10%' },
        { columnName: 'status', width: '10%' },
        { columnName: 'actions', width: '13%' },
      ]);
    
      //Table Column Reordering
      const [tableColumnExtensions] = useState([
        { columnName: 'product', width: '20%' },
        { columnName: 'promoSubject', width: '20%' },
        { columnName: 'need', width: '10%' },
        { columnName: 'benefit', width: '15%'},
        { columnName: 'specialization', width: '7%' },
        { columnName: 'orgType', width: '10%' },
      ]);
    
      //Freeze Columns
      const itemsFromBackend = [
        {  id: '1', isFreeze: false,columnName: 'link', width: '3%' },
        {  id: '2', isFreeze: false,columnName: 'product', width: '20%' },
        {  id: '3', isFreeze: false,columnName: 'promoSubject', width: '20%' },
        {  id: '4', isFreeze: false,columnName: 'need', width: '10%' },
        {  id: '5', isFreeze: false,columnName: 'benefit', width: '15%'},
        {  id: '7', isFreeze: false,columnName: 'specialization', width: '7%' },
        {  id: '8', isFreeze: false,columnName: 'orgType', width: '10%' },
        {  id: '9', isFreeze: false,columnName: 'visitStracture', width: '10%' },
        {  id: '10', isFreeze: false,columnName: 'page', width: '10%' },
        {  id: '11', isFreeze: false,columnName: 'status', width: '10%' },
        {  id: '12', isFreeze: false,columnName: 'actions', width: '10%' },
      ];
    
      // Table show or hide items
      const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true,name: 'link', title: (<Icon path={mdiLinkVariant}size={1}/>) },
        { isShow: true,name: 'product', title: t('Product') },
        { isShow: true,name: 'promoSubject', title: t('Promo Subject') },
        { isShow: true,name: 'need', title: t('Need') },
        { isShow: true,name: 'benefit', title: t('Benefit') },
        { isShow: true,name: 'specialization', title: t('Specialization') },
        { isShow: true,name: 'orgType', title: t('Organization Type') },
        { isShow: true,name: 'visitStracture', title: t('Visit Stracture') },
        { isShow: true,name: 'page', title: t('Page') },
        { isShow: true,name: 'status', title: t('Status') },
        { isShow: true,name: 'actions', title: ' ' },
      ])
    
      // Group By Items
      const [groupByItems, setGroupByItems] = useState([
        { id: '1', isShow: true,columnName: 'product', content: t('Product') },
        { id: '2', isShow: true,columnName: 'promoSubject', content: t('Promo Subject') },
        { id: '3', isShow: true,columnName: 'need', content: t('Need') },
        { id: '4', isShow: true,columnName: 'benefit', content: t('Benefit') },
        { id: '5', isShow: true,columnName: 'specialization', content: t('Specialization') },
        { id: '6', isShow: true,columnName: 'orgType', content: t('Organization Type') },
      ])
    
      // Summary
      const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count',columnName: 'product', width: '20%' },
        { type: 'count',columnName: 'promoSubject', width: '20%' },
        { type: 'count',columnName: 'need', width: '10%' },
        { type: 'count',columnName: 'benefit', width: '15%'},
        { type: 'count',columnName: 'specialization', width: '7%' },
        { type: 'count',columnName: 'orgType', width: '10%' },
      ])
    
      const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count',columnName: 'product', width: '20%' },
        { type: 'count',columnName: 'promoSubject', width: '20%' },
        { type: 'count',columnName: 'need', width: '10%' },
        { type: 'count',columnName: 'benefit', width: '15%'},
        { type: 'count',columnName: 'competitorInn', width: '15%' },
        { type: 'count',columnName: 'specialization', width: '7%' },
        { type: 'count',columnName: 'orgType', width: '10%' },
      ])

      const [columnOrders, setColumnOrders] = useState(['link', 'product', 'promoSubject', 'need', 'benefit', 'competitorInn','specialization','orgType','visitStracture','page','status','actions']);
      
      const addPromoSubjectModal = () => {
        setShow(true);
      }

    
      // Outside click to close settings
    useEffect(() => {
        const closeSearch = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setTableCollectiveMenu(false);
            }
        };

        document.body.addEventListener('mousedown', closeSearch);

        return () => {
            document.body.removeEventListener('mousedown', closeSearch);
        };
    }, []);

      return (
    <div className={`promo-subject ${tableCollectiveMenu === true ? 'main-table-active' : 'main-table'}`}>
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
              addButtonFunction={addPromoSubjectModal}
              isFilters={true}
              selectionItems={selection}
              isSelection={true}
              disableSorting={sortingStateColumnExtensions}
              defaultSorting={defaultSorting}
              filters={<Filter
                tableData={tableData}
                setTableData={setTableData}
                isShowUpdateModal={showModal}
                setIsShowUpdateModal={setShowModal}
                updateBenefitData={data}
                showModal={show}
                setShowModal={setShow}
                   />}
          />

{/* {
    show &&
    <AddPromoSubjectModal showModal={show} setShowModal={setShow} />
} */}
    </div>
  )
}

export default Table