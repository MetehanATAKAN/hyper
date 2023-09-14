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

const AccountSubGroup = () => {
    const { t } = useTranslation();
    const [closeFilter, setCloseFilter] = useState(false);

    const [loader, setLoader] = useState(false);

    const [isShow, setIsShow] = useState(false);

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
         { name: 'actions', title: ' ' },
       ]);
     
     
       //Export Columns
       const [exportColumns] = useState([
         { name: 'accountGroupName', title: t('Account Group') },
         { name: 'accountSubGroupName', title: t('Account Sub Group') },
     ])
     
       // Table Columns Resizing Width
       const [columnWidths, setColumnWidths] = useState([
         { columnName: 'accountGroupName', width: '25%' },
         { columnName: 'accountSubGroupName', width: '70%' },
         { columnName: 'actions', width: '5%' },
       ]);
     
       //Table Column Reordering
       const [tableColumnExtensions] = useState([
         { columnName: 'accountGroupName', width: '25%' },
         { columnName: 'accountSubGroupName', width: '70%' },
         { columnName: 'actions', width: '5%' },
       ]);
     
       //Freeze Columns
       const itemsFromBackend = [
         { id: '1', isFreeze: false, content: 'Account Group', columnName: 'accountGroupName', width: 150 },
         { id: '2', isFreeze: false, content: 'Account Sub Group', columnName: 'accountSubGroupName', width: 150 },
       ];
     
       // Table show or hide items
       const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
         { isShow: true, name: 'accountGroupName', title: 'Account Group' },
         { isShow: true, name: 'accountSubGroupName', title: 'Account Sub Group' },
       ])
     
       // Group By Items
       const [groupByItems, setGroupByItems] = useState([
         { id:'0',isShow: true, content: 'Account Group', columnName: 'accountGroupName' },
         { id:'1',isShow: true, content: 'Account Sub Group', columnName: 'accountSubGroupName'}
       ])
     
       // Summary
       const [totalSummaryItems, setTotalSummaryItems] = useState([
         { type: 'count', columnName: 'accountGroupName', width: 150 },
         { type: 'count', columnName: 'accountSubGroupName', width: 150 },
       ])
     
       const [groupSummaryItems, setGroupSummaryItems] = useState([
         { type: 'count', columnName: 'accountGroupName', width: 150 },
         { type: 'count', columnName: 'accountSubGroupName', width: 150 },
       ])
       
       const [columnOrders, setColumnOrders] = useState(['accountGroupName', 'accountSubGroupName', 'actions']);
 
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

     const filterComponentsData = [
      { label: 'account group', options: accountGroupOptions, state: selectedAccountGroup, setState: setSelectedAccountGroup },
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
 
       const tableData = filterData.map((item, index) => ({
         id: item.id,
         accountGroupName: item.accountGroupName,
         accountSubGroupName: item.accountSubGroupName,
         actions: <Dropdowns
             item={`${item.id}`}
             option={statusOptions}
             onClick={dropDownItemClick}
         />,
       }))

       const getAllFilterData = () => {
        setLoader(true)
        let accountGroupIds = selectedAccountGroup.map(el => el.value)
        if(accountGroupIds.length !== 0){
          FetchApiPost('services/Budget/AccSetting/GetAccountSubGroupByAccountGroupId', 'POST', {
            accountGroupIds: accountGroupIds
          }).then(res => {
            if(res.status === 200 ){
              res.json().then(({data}) => {
                setFilterData([...data])
                setCloseFilter(true)
                setLoader(false)
              })
            }else{
              setLoader(false)
            }
          })
        }
       }

       const deleteFilter = () => {
        setSelectedAccountGroup([]);
       }

       const handleClickDeleteButton = () => {
        FetchApiPost('services/Budget/AccSetting/DeleteAccountSubGroup', 'POST', {
          accountSubGroupId: deleteItem.id,
          modifiedBy: localStorage.getItem('userName')
        }).then(res => {
          if(res.status === 200){
            res.json().then(({data}) => {
              if(data){
                setDeleteModalIsShow(false)
                setFilterData(filterData.filter((el) => el.id !== deleteItem.id))
              }
            })
          }else if(res.status === 409){
            res.json().then(({errors}) => {
              setErrorModalMessage('It is impossible delete account groups because following account name are connected')
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
                message={`"${deleteItem.accountSubGroupName}"`}
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

export default AccountSubGroup