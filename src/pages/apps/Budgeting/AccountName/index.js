import React, { useEffect, useState } from 'react'
import MainTable from '../../../../components/MainTable';
import { useTranslation } from 'react-i18next';
import AddModal from './AddModal/AddModal';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import Filter from '../Filter';
import 'antd/dist/antd.css';
import UpdateModal from './UpdateModal/UpdateModal';
import Dropdowns from '../../../../components/Dropdowns';
import Delete from '../Delete';
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';
import { Spin } from 'antd';

const AccountName = () => {
    const { t } = useTranslation();
    const [closeFilter, setCloseFilter] = useState(false);

    const [isShow, setIsShow] = useState(false);
    const [loader, setLoader] = useState(false);

    const [updateItem, setUpdateItem] = useState();
    const [updateModalIsShow, setUpdateModalIsShow] = useState(false);

    const [deleteItem, setDeleteItem] = useState();
    const [deleteModalIsShow, setDeleteModalIsShow] = useState(false);

    const [filterData, setFilterData] = useState([]);

    const [errorModalMessage, setErrorModalMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [message2, setMessage2] = useState()

    const handleErrorModal = () => {
      setShowErrorModal(false);
    }
 
     const [columns] = useState([
         { name: 'accountGroupName', title: t('Account Group') },
         { name: 'accountSubGroupName', title: t('Account Sub Group') },
         { name: 'accountName', title: t('Account Name') },
         { name: 'accountId', title: t('Account ID') },
         { name: 'actions', title: ' ' },
       ]);
     
     
       //Export Columns
       const [exportColumns] = useState([
         { name: 'accountGroupName', title: t('Account Group') },
         { name: 'accountSubGroupName', title: t('Account Sub Group') },
         { name: 'accountName', title: t('Account Name') },
         { name: 'accountId', title: t('Account ID') },
     ])
     
       // Table Columns Resizing Width
       const [columnWidths, setColumnWidths] = useState([
         { columnName: 'accountGroupName', width: '26%' },
         { columnName: 'accountSubGroupName', width: '26%' },
         { columnName: 'accountName', width: '26%' },
         { columnName: 'accountId', width: '17%' },
         { columnName: 'actions', width: '5%' },
       ]);
     
       //Table Column Reordering
       const [tableColumnExtensions] = useState([
         { columnName: 'accountGroupName', width: '26%' },
         { columnName: 'accountSubGroupName', width: '26%' },
         { columnName: 'accountName', width: '26%' },
          { columnName: 'accountId', width: '17%' },
         { columnName: 'actions', width: '5%' },
       ]);
     
       //Freeze Columns
       const itemsFromBackend = [
         { id: '1', isFreeze: false, content: 'Account Group', columnName: 'accountGroupName', width: 150 },
         { id: '2', isFreeze: false, content: 'Account Sub Group', columnName: 'accountSubGroupName', width: 150 },
          { id: '3', isFreeze: false, content: 'Account Name', columnName: 'accountName', width: 150 },
          { id: '4', isFreeze: false, content: 'Account ID', columnName: 'accountId', width: 150 },
       ];
     
       // Table show or hide items
       const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
         { isShow: true, name: 'accountGroupName', title: 'Account Group' },
         { isShow: true, name: 'accountSubGroupName', title: 'Account Sub Group' },
          { isShow: true, name: 'accountName', title: 'Account Name' },
          { isShow: true, name: 'accountId', title: 'Account ID' },
       ])
     
       // Group By Items
       const [groupByItems, setGroupByItems] = useState([
         { id:'0',isShow: true, content: 'Account Group', columnName: 'accountGroupName' },
         { id:'1',isShow: true, content: 'Account Sub Group', columnName: 'accountSubGroupName'},
         { id:'2',isShow: true, content: 'Account Name', columnName: 'accountName' },
          { id:'3',isShow: true, content: 'Account ID', columnName: 'accountId' },
       ])
     
       // Summary
       const [totalSummaryItems, setTotalSummaryItems] = useState([
         { type: 'count', columnName: 'accountGroupName', width: 150 },
         { type: 'count', columnName: 'accountSubGroupName', width: 150 },
         { type: 'count', columnName: 'accountName', width: 150},
         { type: 'count', columnName: 'accountId', width: 150}
       ])
     
       const [groupSummaryItems, setGroupSummaryItems] = useState([
         { type: 'count', columnName: 'accountGroupName', width: 150 },
         { type: 'count', columnName: 'accountSubGroupName', width: 150 },
         { type: 'count', columnName: 'accountName', width: 150},
          { type: 'count', columnName: 'accountId', width: 150}
       ])
       
       const [columnOrders, setColumnOrders] = useState(['accountGroupName', 'accountSubGroupName', 'accountName', 'accountId', 'actions']);
 
       const handleAddModal = () => {
         setIsShow(true);
       }
 
       const statusOptions = [
         { id: 0, key: 'Edit', icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i> },
         {
             id: 1,
             key: 'Delete',
             icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
             color: '#FA5C7C',
         }
       ];
 
       const dropDownItemClick = (e) => {
         // const ids = e.target.id.split(' ');
         // const selectedStatus = statusOptions.find((el) => el.id === Number(ids[1]));
         const ids = e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id
         const ids2 = ids.split(' ');
         // ilk sayı option id 
         // ikinci sayı selectedValue id
         console.log(ids2)
 
         // Edit
         if (ids2[0] === "0") {
             const item = filterData.find((el) => el.id === Number(ids2[1]));
             setUpdateItem(item);
             setUpdateModalIsShow(true);
         }
         // Delete
         else if (ids2[0] === "1") {
             const item = filterData.find((el) => el.id === Number(ids2[1]));
             setDeleteItem(item);
             setDeleteModalIsShow(true);
         }
     };

     const [accountGroupOptions, setAccountGroupOptions] = useState([]);
     const [selectedAccountGroup, setSelectedAccountGroup] = useState([]);

     const [accountSubGroupOptions, setAccountSubGroupOptions] = useState([]);
     const [selectedAccountSubGroup, setSelectedAccountSubGroup] = useState([]);

     const filterComponentsData = [
      { label: 'account group', options: accountGroupOptions, state: selectedAccountGroup, setState: setSelectedAccountGroup },
      { label: 'account sub group', options: accountSubGroupOptions, state: selectedAccountSubGroup, setState: setSelectedAccountSubGroup },
     ];

     useEffect(() => {
      setLoader(true)
      FetchApiGet('services/Budget/AccSetting/GetAllAccountGroup', 'GET')
        .then(res => {
          if(res.status === 200){
            res.json().then(({data}) => {
              setAccountGroupOptions(data.map(item => ({value: item.id, label: item.accountGroupName})))
              setSelectedAccountGroup(data.map(item => ({value: item.id, label: item.accountGroupName})))
              setLoader(false)
            })
          }else{
            setLoader(false)
          }
        })
     }, [])

     useEffect(() => {
      if(selectedAccountGroup.length === 0) {
        setAccountSubGroupOptions([])
        setSelectedAccountSubGroup([])
        return
      };
      setLoader(true)
      let accountGroupIds = selectedAccountGroup.map(item => item.value)
      FetchApiPost('services/Budget/AccSetting/GetAccountSubGroupByAccountGroupId', 'POST', {
        accountGroupIds: accountGroupIds
      }).then(res => {
        if(res.status === 200){
          res.json().then(({data}) => {
            setAccountSubGroupOptions(data.map(item => ({value: item.id, label: item.accountSubGroupName})))
            setSelectedAccountSubGroup(data.map(item => ({value: item.id, label: item.accountSubGroupName})))
            setLoader(false)
          })
        }else{
          setLoader(false)
        }
      })
     }, [selectedAccountGroup])
 
       const tableData = filterData.map((item, index) => ({
         id: item.id,
         accountGroupName: item.accountGroupName,
         accountSubGroupName: item.accountSubGroupName,
         accountName: item.accountName,
          accountId: item.accountId,
         actions: <Dropdowns
             item={`${item.id}`}
             option={statusOptions}
             onClick={dropDownItemClick}
         />,
       }))

       const getAllFilterData = () => {
        setLoader(true)
          const data = {
            accountGroupIds: selectedAccountGroup.map(item => item.value),
            accountSubGroupIds: selectedAccountSubGroup.map(item => item.value)
          }
          FetchApiPost('services/Budget/AccSetting/GetAccountNameByAccountGroupId', 'POST', data)
            .then(res => {
              if(res.status === 200){
                res.json().then(({data}) => {
                  setFilterData(data)
                  setCloseFilter(true)
                  setLoader(false)
                })
              }else{
                setLoader(false)
              }
            })
       }

       const deleteFilter = () => {
        setSelectedAccountGroup([]);
        setSelectedAccountSubGroup([]);
        setAccountSubGroupOptions([]);
       }

       const handleClickDeleteButton = () => {
          FetchApiPost('services/Budget/AccSetting/DeleteAccountName', 'POST', {
            accountNameId: deleteItem.id,
            modifiedBy: localStorage.getItem('userName')
          }).then(res => {
            if(res.status === 200){
              res.json().then(({data}) => {
                if(data){
                  let newData = filterData.filter(item => item.id !== deleteItem.id);
                  setDeleteModalIsShow(false);
                  setFilterData(newData);
                }
              })
            }else if(res.status === 409){
              res.json().then(({errors}) => {
                setErrorModalMessage('It is impossible delete account name because following account cost center are connected')
                setMessage2(errors[0])
                setShowErrorModal(true)
              })
            }
          })
      }
       
  return (
    <div className="company-type">
      <Spin size="large" spinning={loader} style={{ top: '50%' }}>
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
              addButtonFunction={handleAddModal}
              isFilters={true}
              setCloseFilter={setCloseFilter}
              closeFilter={closeFilter}
              filters={<Filter 
                filterComponentsData={filterComponentsData}  
                getAllFilterData={getAllFilterData}
                setCloseFilter={setCloseFilter}
                deleteFilter={deleteFilter}
              />}
          />
      </Spin>
        

          {
            isShow && (
                <AddModal 
                    isShow={isShow}
                    setIsShow={setIsShow}
                    filterData={filterData}
                    setFilterData={setFilterData}
                    setErrorModalMessage={setErrorModalMessage}
                    setShowErrorModal={setShowErrorModal}
                    getAllFilterData={getAllFilterData}
                />
            )
          }

          {
            updateModalIsShow && 
                <UpdateModal
                    isShow={updateModalIsShow}
                    setIsShow={setUpdateModalIsShow}
                    filterData={filterData}
                    setFilterData={setFilterData}
                    selectedValue={updateItem}
                    setErrorModalMessage={setErrorModalMessage}
                    setShowErrorModal={setShowErrorModal}
                />
          }

          {
            deleteModalIsShow && (
              <Delete 
                modalShow={deleteModalIsShow}
                setModalShow={setDeleteModalIsShow}
                handleClickDeleteButton={handleClickDeleteButton}
                message={`"${deleteItem.accountName}"`}
              />
            )
          }

        {
            showErrorModal && (
                <PharmacySplitPercentProblem messages={errorModalMessage} show={showErrorModal} handleClose={handleErrorModal} message2={message2} />
            )
        }

    </div>
  )
}

export default AccountName