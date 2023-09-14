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
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';
import { Spin } from 'antd';

const AccSettings = () => {
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
        { name: 'pageName', title: t('Page') },
        { name: 'sectionName', title: t('Section') },
        { name: 'departmentName', title: t('Department') },
        { name: 'positionName', title: t('Position') },
        { name: 'pandIdName', title: t('P&L Section') },
        { name: 'accountGroupName', title: t('Account Cost Group') },
        { name: 'accountSubGroupName', title: t('Account Sub Group') },
        { name: 'accountCostCenterName', title: t('Account Cost') },
        { name: 'actions', title: ' ' },
    ]);

    //Export Columns
    const [exportColumns] = useState([
        { name: 'pageName', title: t('Page') },
        { name: 'sectionName', title: t('Section') },
        { name: 'departmentName', title: t('Department') },
        { name: 'positionName', title: t('Position') },
        { name: 'pandIdName', title: t('P&L Section') },
        { name: 'accountGroupName', title: t('Account Cost Group') },
        { name: 'accountSubGroupName', title: t('Account Sub Group') },
        { name: 'accountCostCenterName', title: t('Account Cost') },
    ]);

    // Table Columns Resizing Width
    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'pageName', width: '13%' },
        { columnName: 'sectionName', width: '14%' },
        { columnName: 'departmentName', width: '14%' },
        { columnName: 'positionName', width: '14%' },
        { columnName: 'pandIdName', width: '10%' },
        { columnName: 'accountGroupName', width: '10%' },
        { columnName: 'accountSubGroupName', width: '10%' },
        { columnName: 'accountCostCenterName', width: '15%' },
        { columnName: 'actions', width: '5%' },
    ]);

    //Table Column Reordering
    const [tableColumnExtensions] = useState([
        { columnName: 'pageName', width: '13%' },
        { columnName: 'sectionName', width: '14%' },
        { columnName: 'departmentName', width: '14%' },
        { columnName: 'positionName', width: '14%' },
        { columnName: 'pandIdName', width: '10%' },
        { columnName: 'accountGroupName', width: '10%' },
        { columnName: 'accountSubGroupName', width: '10%' },
        { columnName: 'accountCostCenterName', width: '15%' },
        { columnName: 'actions', width: '5%' },
    ]);

    //Freeze Columns
    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Page', columnName: 'pageName', width: 150 },
        { id: '2', isFreeze: false, content: 'Section', columnName: 'sectionName', width: 150 },
        { id: '3', isFreeze: false, content: 'Department', columnName: 'departmentName', width: 150 },
        { id: '4', isFreeze: false, content: 'Position', columnName: 'positionName', width: 150 },
        { id: '5', isFreeze: false, content: 'P&L Section', columnName: 'pandIdName', width: 150 },
        { id: '6', isFreeze: false, content: 'Account Cost Group', columnName: 'accountGroupName', width: 150 },
        { id: '7', isFreeze: false, content: 'Account Sub Group', columnName: 'accountSubGroupName', width: 150 },
        { id: '8', isFreeze: false, content: 'Account Cost', columnName: 'accountCostCenterName', width: 150 },
    ];

    // Table show or hide items
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'pageName', title: 'Page' },
        { isShow: true, name: 'sectionName', title: 'Section' },
        { isShow: true, name: 'departmentName', title: 'Department' },
        { isShow: true, name: 'positionName', title: 'Position' },
        { isShow: true, name: 'pandIdName', title: 'P&L Section' },
        { isShow: true, name: 'accountGroupName', title: 'Account Cost Group' },
        { isShow: true, name: 'accountSubGroupName', title: 'Account Sub Group' },
        { isShow: true, name: 'accountCostCenterName', title: 'Account Cost' },
    ]);

    // Group By Items
    const [groupByItems, setGroupByItems] = useState([
        { id: '0', isShow: true, content: 'Page', columnName: 'pageName' },
        { id: '1', isShow: true, content: 'Section', columnName: 'sectionName' },
        { id: '2', isShow: true, content: 'Department', columnName: 'departmentName' },
        { id: '3', isShow: true, content: 'Position', columnName: 'positionName' },
        { id: '4', isShow: true, content: 'P&L Section', columnName: 'pandIdName' },
        { id: '5', isShow: true, content: 'Account Cost Group', columnName: 'accountGroupName' },
        { id: '6', isShow: true, content: 'Account Sub Group', columnName: 'accountSubGroupName' },
        { id: '7', isShow: true, content: 'Account Cost', columnName: 'accountCostCenterName' },
    ]);

    // Summary
    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'pageName', width: 150 },
        { type: 'count', columnName: 'sectionName', width: 150 },
        { type: 'count', columnName: 'departmentName', width: 150 },
        { type: 'count', columnName: 'positionName', width: 150 },
        { type: 'count', columnName: 'pandIdName', width: 150 },
        { type: 'count', columnName: 'accountGroupName', width: 150 },
        { type: 'count', columnName: 'accountSubGroupName', width: 150 },
        { type: 'count', columnName: 'accountCostCenterName', width: 150}
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'pageName', width: 150 },
        { type: 'count', columnName: 'sectionName', width: 150 },
        { type: 'count', columnName: 'departmentName', width: 150 },
        { type: 'count', columnName: 'positionName', width: 150 },
        { type: 'count', columnName: 'pandIdName', width: 150 },
        { type: 'count', columnName: 'accountGroupName', width: 150 },
        { type: 'count', columnName: 'accountSubGroupName', width: 150 },
        { type: 'count', columnName: 'accountCostCenterName', width: 150}
    ]);

    const [columnOrders, setColumnOrders] = useState([
        'pageName',
        'sectionName',
        'departmentName',
        'positionName',
        'pandIdName',
        'accountGroupName',
        'accountSubGroupName',
        'accountCostCenterName',
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

    const [pageOptions, setPageOptions] = useState([]);
    const [selectedPage, setSelectedPage] = useState([]);

    const [sectionOptions, setSectionOptions] = useState([]);
    const [selectedSection, setSelectedSection] = useState([]);

    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([]);

    const [positionOptions, setPositionOptions] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState([]);

    const [pLSectionOptions, setPLSectionOptions] = useState([]);
    const [selectedPLSection, setSelectedPLSection] = useState([]);

    const [accountCostGroupOptions, setAccountCostGroupOptions] = useState([]);
    const [selectedAccountCostGroup, setSelectedAccountCostGroup] = useState([]);

    const [accountSubGroupOptions, setAccountSubGroupOptions] = useState([]);
    const [selectedAccountSubGroup, setSelectedAccountSubGroup] = useState([]);

    const [accountCostCenterOptions, setAccountCostCenterOptions] = useState([]);
    const [selectedAccountCostCenter, setSelectedAccountCostCenter] = useState([]);

    const filterComponentsData = [
        {
            label: 'page',
            options: pageOptions,
            state: selectedPage,
            setState: setSelectedPage,
        },
        {
            label: 'section',
            options: sectionOptions,
            state: selectedSection,
            setState: setSelectedSection
        },
        {
            label: 'department',
            options: departmentOptions,
            state: selectedDepartment,
            setState: setSelectedDepartment
        },
        {
            label: 'position',
            options: positionOptions,
            state: selectedPosition,
            setState: setSelectedPosition
        },
        {
            label: 'p&l section',
            options: pLSectionOptions,
            state: selectedPLSection,
            setState: setSelectedPLSection
        },
        {
            label: 'account cost group',
            options: accountCostGroupOptions,
            state: selectedAccountCostGroup,
            setState: setSelectedAccountCostGroup
        },
        {
            label: 'account sub group',
            options: accountSubGroupOptions,
            state: selectedAccountSubGroup,
            setState: setSelectedAccountSubGroup
        },
        {
            label: 'account cost center',
            options: accountCostCenterOptions,
            state: selectedAccountCostCenter,
            setState: setSelectedAccountCostCenter
        },
    ];

    useEffect(() => {
        setLoader(true);
        FetchApiGet('services/Budget/AccSetting/GetPages', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setPageOptions(data.map((item) => ({ value: item.pageId, label: item.pageName })));
                    setSelectedPage(data.map((item) => ({ value: item.pageId, label: item.pageName })));
                });
                setLoader(false);
            }else{
                setLoader(false);
            }
        });

    }, [])

    useEffect(() => {
        setLoader(true);
        FetchApiGet('services/Hr/Department/GetAllDepartments', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setDepartmentOptions(data.map((item) => ({ value: item.id, label: item.departmentName })));
                    setSelectedDepartment(data.map((item) => ({ value: item.id, label: item.departmentName })));
                });
                setLoader(false);
            }else{
                setLoader(false);
            }
        });
    }, [])

    useEffect(() => {
        setLoader(true);
        FetchApiGet('api/OldSystem/GetPLSection', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setPLSectionOptions(data.map((item) => ({ value: item.Id, label: item.Val1 })));
                    setSelectedPLSection(data.map((item) => ({ value: item.Id, label: item.Val1 })));
                });
                setLoader(false);
            }else{
                setLoader(false);
            }
        });
    }, [])

    useEffect(() => {
        setLoader(true);
        FetchApiGet('services/Budget/AccSetting/GetAllAccountGroup', 'GET')
            .then(res => {
                if(res.status === 200) {
                    res.json().then(({ data }) => {
                        setAccountCostGroupOptions(data.map((item) => ({ value: item.id, label: item.accountGroupName })))
                        setSelectedAccountCostGroup(data.map((item) => ({ value: item.id, label: item.accountGroupName })))
                    })
                    setLoader(false);
                }else{
                    setLoader(false);
                }
            })
    }, [])

    useEffect(() => {
        if(selectedPage.length === 0){
            setSectionOptions([]);
            setSelectedSection([]);
            return;
        }
        let pageIds = selectedPage.map((item) => item.value);
        setLoader(true);
        FetchApiPost('services/Budget/AccSetting/GetSectionByPageId', 'POST', {
            pageIds: pageIds,
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setSectionOptions(data.map((item) => ({ value: item.sectionId, label: item.sectionName })));
                    setSelectedSection(data.map((item) => ({ value: item.sectionId, label: item.sectionName })));
                });
                setLoader(false);
            }else{
                setLoader(false);
            }
        });
    }, [selectedPage]);



    useEffect(() => {
        if(selectedDepartment.length === 0){
            setPositionOptions([]);
            setSelectedPosition([]);
            return;
        };
        let departmentIds = selectedDepartment.map((item) => item.value);
        setLoader(true);
        FetchApiPost('services/Hr/CompanyDepartment/GetPositionByDepIds', 'POST', departmentIds)
            .then(res => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setPositionOptions(data.map((item) => ({ value: item.id, label: item.positionName })));
                        setSelectedPosition(data.map((item) => ({ value: item.id, label: item.positionName })));
                    })
                    setLoader(false);
                }else{
                    setLoader(false);
                }
            })
    }, [selectedDepartment])

    useEffect(() => {
        if(selectedAccountCostGroup.length === 0){
            setAccountSubGroupOptions([]);
            setSelectedAccountSubGroup([]);
            setAccountCostCenterOptions([]);
            setSelectedAccountCostCenter([]);
            return;
        };
        let ids = selectedAccountCostGroup.map((item) => item.value)
        setLoader(true);
        FetchApiPost('services/Budget/AccSetting/GetAccountSubGroupByAccountGroupId', 'POST', {
            accountGroupIds: ids
        }).then(res => {
            if(res.status === 200) {
                res.json().then(({ data }) => {
                    setAccountSubGroupOptions(data.map((item) => ({ value: item.id, label: item.accountSubGroupName })))
                    setSelectedAccountSubGroup(data.map((item) => ({ value: item.id, label: item.accountSubGroupName })))
                })
                setLoader(false);
            }else{
                setLoader(false);
            }
        })
    }, [selectedAccountCostGroup])

    useEffect(() => {
        if(selectedAccountSubGroup.length === 0){
            setAccountCostCenterOptions([]);
            setSelectedAccountCostCenter([]);
            return;
        };
        let ids = selectedAccountSubGroup.map((item) => item.value)
        setLoader(true);
        FetchApiPost('services/Budget/AccSetting/GetAccountCostCenterByAccountSubGroupId', 'POST', {
            accountSubGroupIds: ids
        }).then(res => {
            if(res.status === 200) {
                res.json().then(({ data }) => {
                    setAccountCostCenterOptions(data.map((item) => ({ value: item.id, label: item.accountCostCenterName })))
                    setSelectedAccountCostCenter(data.map((item) => ({ value: item.id, label: item.accountCostCenterName })))
                })
                setLoader(false);
            }else{
                setLoader(false);
            }
        })
    }, [selectedAccountSubGroup])


    const tableData = filterData?.map((item, index) => ({
        id: item.id,
        pageName: item.pageName,
        sectionName: item.sectionName,
        departmentName: item.departmentName,
        positionName: item.positionName,
        pandIdName: item.pandIdName,
        accountGroupName: item.accountGroupName,
        accountSubGroupName: item.accountSubGroupName,
        accountCostCenterName: item.accountCostCenterName,
        actions: <Dropdowns item={`${item.id}`} option={statusOptions} onClick={dropDownItemClick} />,
    }));

    const getAllFilterData = () => {

        const data = {
            pageIds: selectedPage.map((item) => item.value),
            sectionIds: selectedSection.map((item) => item.value),
            departmentIds: selectedDepartment.map((item) => item.value),
            positionIds: selectedPosition.map((item) => item.value),
            pandLIds: selectedPLSection.map((item) => item.value),
            accountCostCenterIds: selectedAccountCostCenter.map((item) => item.value),
        }

        if(selectedPage.length > 0 && selectedSection.length > 0 && selectedDepartment.length > 0 && selectedPosition.length > 0 && selectedPLSection.length > 0 && selectedAccountCostCenter.length > 0){
            setLoader(true);
            FetchApiPost('services/Budget/AccSetting/GetAccSetting', 'POST', data)
                .then(res => {
                    if(res.status === 200){
                        res.json().then(({ data }) => {
                            setFilterData(data);
                        })
                        setLoader(false);
                    }else{
                        setLoader(false);
                    }
                })
        }
        
    };

    const deleteFilter = () => {
        setSelectedPage([]);

        setSelectedSection([]);
        setSectionOptions([]);

        setSelectedDepartment([]);
        setDepartmentOptions([]);

        setSelectedPosition([]);
        setPositionOptions([]);

        setSelectedPLSection([]);
        setPLSectionOptions([]);

        setSelectedAccountCostGroup([]);
        setAccountCostGroupOptions([]);

        setSelectedAccountSubGroup([]);
        setAccountSubGroupOptions([]);
    };

    const handleClickDeleteButton = () => {
        setLoader(true);
        FetchApiPost('services/Budget/AccSetting/DeleteAccountCostCenterSetting', 'POST', {
            settingId: deleteItem.id,
            modifiedBy: localStorage.getItem('userName')
        })
            .then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        if(data){
                            let newData = filterData.filter((item) => item.id !== deleteItem.id);
                            setFilterData(newData);
                            setDeleteModalIsShow(false)
                        }
                    })
                    setLoader(false);
                }else{
                    setLoader(false);
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
                <AddModal isShow={isShow} setIsShow={setIsShow} filterData={filterData} setFilterData={setFilterData} getAllFilterData={getAllFilterData} setErrorModalMessage={setErrorModalMessage}
                    setShowErrorModal={setShowErrorModal}
                    setMessage2={setMessage2}
                    />
            )}

            {updateModalIsShow && (
                <UpdateModal
                    isShow={updateModalIsShow}
                    setIsShow={setUpdateModalIsShow}
                    filterData={filterData}
                    setFilterData={setFilterData}
                    selectedValue={updateItem}
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

export default AccSettings;
