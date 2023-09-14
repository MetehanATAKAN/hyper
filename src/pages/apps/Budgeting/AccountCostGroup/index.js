import React, { useEffect, useState } from 'react';
import MainTable from '../../../../components/MainTable';
import { useTranslation } from 'react-i18next';
import AddModal from './AddModal/AddModal';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import Filter from '../Filter';
import 'antd/dist/antd.css';
import UpdateModal from './UpdateModal/UpdateModal';
import Dropdowns from '../../../../components/Dropdowns';
import Delete from '../Delete';
import { Spin } from 'antd';
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';

const AccountCostGroup = () => {
    const { t } = useTranslation();
    const [closeFilter, setCloseFilter] = useState(false);

    const [isShow, setIsShow] = useState(false);

    const [loader, setLoader] = useState(false);

    const [updateItem, setUpdateItem] = useState();
    const [updateModalIsShow, setUpdateModalIsShow] = useState(false);

    const [deleteItem, setDeleteItem] = useState();
    const [deleteModalIsShow, setDeleteModalIsShow] = useState(false);

    const [errorModalMessage, setErrorModalMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [filterData, setFilterData] = useState([]);

    const [message2, setMessage2] = useState()

    const handleErrorModal = () => {
        setShowErrorModal(false);
      }

    const [columns] = useState([
        { name: 'accountGroup', title: t('Account Group') },
        { name: 'accountSubGroup', title: t('Account Sub Group') },
        { name: 'accountName', title: t('Account Name') },
        { name: 'accountId', title: t('Account ID') },
        { name: 'accountCostCenterName', title: t('Account Cost Center') },
        { name: 'accId', title: t('ACC ID') },
        { name: 'description', title: t('Description') },
        { name: 'descriptionRu', title: t('Description RU') },
        { name: 'depreciationTerm', title: t('Depreciation Term') },
        { name: 'effectiveIndirect', title: t('Effective Indirect') },
        { name: 'comment', title: t('Comment') },
        { name: 'actions', title: ' ' },
    ]);

    //Export Columns
    const [exportColumns] = useState([
        { name: 'accountGroup', title: t('Account Group') },
        { name: 'accountSubGroup', title: t('Account Sub Group') },
        { name: 'accountName', title: t('Account Name') },
        { name: 'accountId', title: t('Account ID') },
        { name: 'accountCostCenterName', title: t('Account Cost Center') },
        { name: 'accId', title: t('ACC ID') },
        { name: 'description', title: t('Description') },
        { name: 'descriptionRu', title: t('Description RU') },
        { name: 'depreciationTerm', title: t('Depreciation Term') },
        { name: 'effectiveIndirect', title: t('Effective Indirect') },
        { name: 'comment', title: t('Comment') },
    ]);

    // Table Columns Resizing Width
    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'accountGroup', width: '20%' },
        { columnName: 'accountSubGroup', width: '20%' },
        { columnName: 'accountName', width: '20%' },
        { columnName: 'accountId', width: '10%' },
        { columnName: 'accountCostCenterName', width: '10%' },
        { columnName: 'accId', width: '10%' },
        { columnName: 'description', width: '18%' },
        { columnName: 'descriptionRu', width: '18%' },
        { columnName: 'depreciationTerm', width: '14%' },
        { columnName: 'effectiveIndirect', width: '16%' },
        { columnName: 'comment', width: '16%' },
        { columnName: 'actions', width: '5%' },
    ]);

    //Table Column Reordering
    const [tableColumnExtensions] = useState([
        { columnName: 'accountGroup', width: '20%' },
        { columnName: 'accountSubGroup', width: '20%' },
        { columnName: 'accountName', width: '20%' },
        { columnName: 'accountId', width: '10%' },
        { columnName: 'accountCostCenterName', width: '10%' },
        { columnName: 'accId', width: '10%' },
        { columnName: 'description', width: '18%' },
        { columnName: 'descriptionRu', width: '18%' },
        { columnName: 'depreciationTerm', width: '14%' },
        { columnName: 'effectiveIndirect', width: '16%' },
        { columnName: 'comment', width: '16%'},
        { columnName: 'actions', width: '5%' },
    ]);

    //Freeze Columns
    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Account Group', columnName: 'accountGroup', width: 150 },
        { id: '2', isFreeze: false, content: 'Account Sub Group', columnName: 'accountSubGroup', width: 150 },
        { id: '3', isFreeze: false, content: 'Account Name', columnName: 'accountName', width: 150 },
        { id: '4', isFreeze: false, content: 'Account ID', columnName: 'accountId', width: 150 },
        { id: '5', isFreeze: false, content: 'Account Cost Center', columnName: 'accountCostCenterName', width: 150 },
        { id: '6', isFreeze: false, content: 'ACC ID', columnName: 'accId', width: 150 },
        { id: '7', isFreeze: false, content: 'Description', columnName: 'description', width: 150 },
        { id: '8', isFreeze: false, content: 'Description RU', columnName: 'descriptionRu', width: 150 },
        { id: '9', isFreeze: false, content: 'Depreciation Term', columnName: 'depreciationTerm', width: 150 },
        { id: '10', isFreeze: false, content: 'Effective Indirect', columnName: 'effectiveIndirect', width: 150 },
        { id: '11', isFreeze: false, content: 'Comment', columnName: 'comment', width: 150 },
    ];

    // Table show or hide items
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'accountGroup', title: 'Account Group' },
        { isShow: true, name: 'accountSubGroup', title: 'Account Sub Group' },
        { isShow: true, name: 'accountName', title: 'Account Name' },
        { isShow: true, name: 'accountId', title: 'Account ID' },
        { isShow: true, name: 'accountCostCenterName', title: 'Account Cost Center' },
        { isShow: true, name: 'accId', title: 'ACC ID' },
        { isShow: true, name: 'description', title: 'Description' },
        { isShow: true, name: 'descriptionRu', title: 'Description RU' },
        { isShow: true, name: 'depreciationTerm', title: 'Depreciation Term' },
        { isShow: true, name: 'effectiveIndirect', title: 'Effective Indirect' },
        { isShow: true, name: 'comment', title: 'Comment' },
    ]);

    // Group By Items
    const [groupByItems, setGroupByItems] = useState([
        { id: '0', isShow: true, content: 'Account Group', columnName: 'accountGroup' },
        { id: '1', isShow: true, content: 'Account Sub Group', columnName: 'accountSubGroup' },
        { id: '2', isShow: true, content: 'Account Name', columnName: 'accountName' },
        { id: '3', isShow: true, content: 'Account ID', columnName: 'accountId' },
        { id: '4', isShow: true, content: 'Account Cost Center', columnName: 'accountCostCenterName' },
        { id: '5', isShow: true, content: 'ACC ID', columnName: 'accId' },
        { id: '6', isShow: true, content: 'Description', columnName: 'description' },
        { id: '7', isShow: true, content: 'Description RU', columnName: 'descriptionRu' },
        { id: '8', isShow: true, content: 'Depreciation Term', columnName: 'depreciationTerm' },
        { id: '9', isShow: true, content: 'Effective Indirect', columnName: 'effectiveIndirect' },
        { id: '10', isShow: true, content: 'Comment', columnName: 'comment' },
    ]);

    // Summary
    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'accountGroup', width: 150 },
        { type: 'count', columnName: 'accountSubGroup', width: 150 },
        { type: 'count', columnName: 'accountName', width: 150 },
        { type: 'count', columnName: 'accountId', width: 150 },
        { type: 'count', columnName: 'accountCostCenterName', width: 150},
        { type: 'count', columnName: 'accId', width: 150 },
        { type: 'count', columnName: 'description', width: 150 },
        { type: 'count', columnName: 'descriptionRu', width: 150 },
        { type: 'count', columnName: 'depreciationTerm', width: 150 },
        { type: 'count', columnName: 'effectiveIndirect', width: 150 },
        { type: 'count', columnName: 'comment', width: 150}
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'accountGroup', width: 150 },
        { type: 'count', columnName: 'accountSubGroup', width: 150 },
        { type: 'count', columnName: 'accountName', width: 150 },
        { type: 'count', columnName: 'accountId', width: 150 },
        { type: 'count', columnName: 'accountCostCenterName', width: 150},
        { type: 'count', columnName: 'accId', width: 150 },
        { type: 'count', columnName: 'description', width: 150 },
        { type: 'count', columnName: 'descriptionRu', width: 150 },
        { type: 'count', columnName: 'depreciationTerm', width: 150 },
        { type: 'count', columnName: 'effectiveIndirect', width: 150 },
        { type: 'count', columnName: 'comment', width: 150}
    ]);

    const [columnOrders, setColumnOrders] = useState([
        'accountGroup',
        'accountSubGroup',
        'accountName',
        'accountId',
        'accountCostCenterName',
        'accId',
        'description',
        'descriptionRu',
        'depreciationTerm',
        'effectiveIndirect',
        'comment',
        'actions',
    ]);

    const handleAddModal = () => {
        setIsShow(true);
    };

    const statusOptions = [
        { id: 0, key: 'Edit', icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i> },
        {
            id: 1,
            key: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
    ];

    const dropDownItemClick = (e) => {
        // const ids = e.target.id.split(' ');
        // const selectedStatus = statusOptions.find((el) => el.id === Number(ids[1]));
        const ids = e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id;
        const ids2 = ids.split(' ');
        // ilk sayı option id
        // ikinci sayı selectedValue id
        console.log(ids2);

        // Edit
        if (ids2[0] === '0') {
            const item = filterData.find((el) => el.id === Number(ids2[1]));
            setUpdateItem(item);
            setUpdateModalIsShow(true);
        }
        // Delete
        else if (ids2[0] === '1') {
            const item = filterData.find((el) => el.id === Number(ids2[1]));
            setDeleteItem(item);
            setDeleteModalIsShow(true);
        }
    };

    const [accountGroupOptions, setAccountGroupOptions] = useState([]);
    const [selectedAccountGroup, setSelectedAccountGroup] = useState([]);

    const [accountSubGroupOptions, setAccountSubGroupOptions] = useState([]);
    const [selectedAccountSubGroup, setSelectedAccountSubGroup] = useState([]);

    const [accountNameOptions, setAccountNameOptions] = useState([]);
    const [selectedAccountName, setSelectedAccountName] = useState([]);

    const filterComponentsData = [
        {
            label: 'account group',
            options: accountGroupOptions,
            state: selectedAccountGroup,
            setState: setSelectedAccountGroup,
        },
        {
            label: 'account sub group',
            options: accountSubGroupOptions,
            state: selectedAccountSubGroup,
            setState: setSelectedAccountSubGroup,
        },
        {
            label: 'account name',
            options: accountNameOptions,
            state: selectedAccountName,
            setState: setSelectedAccountName,
        },
    ];

    useEffect(() => {
        setLoader(true);
        FetchApiGet('services/Budget/AccSetting/GetAllAccountGroup', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setAccountGroupOptions(data.map((item) => ({ value: item.id, label: item.accountGroupName })));
                    setSelectedAccountGroup(data.map((item) => ({ value: item.id, label: item.accountGroupName })));
                    setLoader(false)
                });
            }
        });
    }, []);

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

       useEffect(() => {
        if(selectedAccountSubGroup.length === 0 || selectedAccountGroup.length === 0) {
            setAccountNameOptions([])
            setSelectedAccountName([])
            return
        }
        setLoader(true)
        const data = {
            accountGroupIds: selectedAccountGroup.map(item => item.value),
            accountSubGroupIds: selectedAccountSubGroup.map(item => item.value)
        }
        FetchApiPost('services/Budget/AccSetting/GetAccountNameByAccountGroupId', 'POST', data)
            .then(res => {
                if(res.status === 200) {
                    res.json().then(({data}) => {
                        setAccountNameOptions(data.map(item => ({value: item.id, label: item.accountName})))
                        setSelectedAccountName(data.map(item => ({value: item.id, label: item.accountName})))
                        setLoader(false)
                    })
                }
            })
       }, [selectedAccountSubGroup])

    const tableData = filterData.map((item, index) => ({
        id: item.id,
        accountGroup: item.accountGroupName,
        accountSubGroup: item.accountSubGroupName,
        accountName: item.accountName,
        accountId: item.accountNameIdStr,
        accountCostCenterName: item.accountCostCenterName,
        accId: item.accountCostCenterId,
        description: item.description,
        descriptionRu: item.descriptionRu,
        depreciationTerm: item.depreationTerm,
        effectiveIndirect: item.costTypeName,
        comment: item.comment,
        actions: <Dropdowns item={`${item.id}`} option={statusOptions} onClick={dropDownItemClick} />,
    }));

    const getAllFilterData = () => {
        setLoader(true);
        FetchApiPost('services/Budget/AccSetting/GetAccountCostCenter', 'POST', {
            accountGroupIds: selectedAccountGroup.map(item => item.value),
            accountSubGroupIds: selectedAccountSubGroup.map(item => item.value),
            accountNameIds: selectedAccountName.map(item => item.value)
        })
            .then(res => {
                if(res.status === 200){
                    res.json().then(({data}) => {
                        setFilterData(data);
                        setLoader(false);
                        setCloseFilter(true);
                    })
                }else{
                    setLoader(false);
                }
            })
    };

    const deleteFilter = () => {
        setSelectedAccountGroup([]);
        setSelectedAccountSubGroup([]);
        setSelectedAccountName([]);
        setAccountSubGroupOptions([]);
        setAccountNameOptions([]);
    };

    const handleClickDeleteButton = () => {
        FetchApiPost('services/Budget/AccSetting/DeleteAccountCostCenter', 'POST', {
            accountCostCenterId: deleteItem.id,
            modifiedBy: localStorage.getItem('userName')
        }).then(res => {
            if(res.status === 200){
                res.json().then(({data}) => {
                    setDeleteModalIsShow(false);
                    setFilterData(filterData.filter(item => item.id !== deleteItem.id));
                })
            }else if(res.status === 409){
                res.json().then(({errors}) => {
                  setErrorModalMessage('It is impossible delete account cost center because following account cost center settings are connected')
                  setMessage2(errors[0])
                  setShowErrorModal(true)
                })
              }
        })
    };

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
                filters={
                    <Filter
                        filterComponentsData={filterComponentsData}
                        getAllFilterData={getAllFilterData}
                        setCloseFilter={setCloseFilter}
                        deleteFilter={deleteFilter}
                    />
                }
            />
            </Spin>

            {isShow && (
                <AddModal 
                    isShow={isShow} 
                    setIsShow={setIsShow} 
                    getAllFilterData={getAllFilterData} 
                    setErrorModalMessage={setErrorModalMessage}
                    setShowErrorModal={setShowErrorModal}
                />
            )}

            {updateModalIsShow && (
                <UpdateModal
                    isShow={updateModalIsShow}
                    setIsShow={setUpdateModalIsShow}
                    filterData={filterData}
                    setFilterData={setFilterData}
                    selectedValue={updateItem}
                    setErrorModalMessage={setErrorModalMessage}
                    setShowErrorModal={setShowErrorModal}

                />
            )}

            {deleteModalIsShow && (
                <Delete
                    modalShow={deleteModalIsShow}
                    setModalShow={setDeleteModalIsShow}
                    handleClickDeleteButton={handleClickDeleteButton}
                    message={`"${deleteItem.accountCostCenterName}"`}
                />
            )}

        {
            showErrorModal && (
                <PharmacySplitPercentProblem messages={errorModalMessage} show={showErrorModal} handleClose={handleErrorModal} message2={message2} />
            )
        }
        </div>
    );
};

export default AccountCostGroup;
