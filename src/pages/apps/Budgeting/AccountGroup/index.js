import React, { useEffect, useState } from 'react'
import MainTable from '../../../../components/MainTable';
import { useTranslation } from 'react-i18next';
import AddModal from './AddModal/AddModal';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
// import Filter from './Filter';
import 'antd/dist/antd.css';
import UpdateModal from './UpdateModal/UpdateModal';
import Dropdowns from '../../../../components/Dropdowns';
import Delete from '../Delete';
import { Spin } from 'antd';
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';

const AccountGroup = () => {
    const { t } = useTranslation();
    const [closeFilter, setCloseFilter] = useState(false);

    const [loader, setLoader] = useState(false);

    const [isShow, setIsShow] = useState(false);

    const [updateItem, setUpdateItem] = useState();
    const [updateModalIsShow, setUpdateModalIsShow] = useState(false);

    const [deleteItem, setDeleteItem] = useState();
    const [deleteModalIsShow, setDeleteModalIsShow] = useState(false);

    const [errorModalMessage, setErrorModalMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [message2, setMessage2] = useState()

    const handleErrorModal = () => {
      setShowErrorModal(false);
    }

    const [filterData, setFilterData] = useState([]);

    const [columns] = useState([
        { name: 'accountGroupName', title: t('Account Group') },
        { name: 'actions', title: ' ' },
      ]);
    
    
      //Export Columns
      const [exportColumns] = useState([
        { name: 'accountGroupName', title: t('Account Group') },
    ])
    
      // Table Columns Resizing Width
      const [columnWidths, setColumnWidths] = useState([
        { columnName: 'accountGroupName', width: '95%' },
        { columnName: 'actions', width: '5%' },
      ]);
    
      //Table Column Reordering
      const [tableColumnExtensions] = useState([
        { columnName: 'accountGroupName', width: '95%' },
        { columnName: 'actions', width: '5%' },
      ]);
    
      //Freeze Columns
      const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Account Group', columnName: 'accountGroupName', width: 150 },
      ];
    
      // Table show or hide items
      const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'accountGroupName', title: 'Account Group' },
      ])
    
      // Group By Items
      const [groupByItems, setGroupByItems] = useState([
        { id:'0',isShow: true, content: 'Account Group', columnName: 'accountGroupName' },
      ])
    
      // Summary
      const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'accountGroupName', width: 150 },
      ])
    
      const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'accountGroupName', width: 150 },
      ])
      
      const [columnOrders, setColumnOrders] = useState(['accountGroupName', 'actions']);

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

      const tableData = filterData.map((item, index) => ({
        id: item.id,
        accountGroupName: item.accountGroupName,
        actions: <Dropdowns
            item={`${item.id}`}
            option={statusOptions}
            onClick={dropDownItemClick}
        />,
      }))

      useEffect(() => {
        setLoader(true)
        FetchApiGet('services/Budget/AccSetting/GetAllAccountGroup', 'GET')
          .then(res => {
            if(res.status === 200){
              res.json().then(({data}) => {
                setFilterData(data)
                setLoader(false)
              })
            }
          })
      }, [])

      const handleClickDeleteButton = () => {
        FetchApiPost('services/Budget/AccSetting/DeleteAccountGroup', 'POST', {
          accountGroupId: deleteItem.id,
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
              setErrorModalMessage('It is impossible delete account groups because following account sub groups are connected')
              setMessage2(errors[0])
              setShowErrorModal(true)
            })
            
          }
        })
      }

  return (
    <div>
        
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
                message={`"${deleteItem.accountGroupName}"`}
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

export default AccountGroup;