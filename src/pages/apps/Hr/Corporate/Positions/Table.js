import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../../components/MainTable';
import AddPositionsModal from './AddPositionsModal';

import { Dropdown } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiDeleteSweepOutline, mdiDotsVertical, mdiEyeOutline, mdiPencil } from '@mdi/js';
import Tippy from '@tippyjs/react';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import { useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import TableLayout from '../../../../../components/Tables';

import { useDispatch } from 'react-redux';
import { filterFunct } from '../../../../../redux/actions';
import Filter from '../../../../../components/Filter';
import Dropdowns from '../../../../../components/Dropdowns';

const Table = () => {
    const { t } = useTranslation();
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    const [isFilters, setIsFilters] = useState(true);

    const [tableData, setTableData] = useState([]);
    const [allData, setAllData] = useState([]);

    const history = useHistory();

    const [updateModal, setUpdateModal] = useState(false);
    const [tableItem, setTableItem] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);

    const statusOptions = [
        {
            id: 1,
            key: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            color: '#6C757D',
        },
        {
            id: 0,
            key: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        }
    ]

    const statusClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );
        const statusId = Number(getIds[0]);
        const itemId = Number(getIds[1]);
    
        let selectedItem = allData.filter(i => i.id === itemId)[0]
        setTableItem(selectedItem);
        console.log(selectedItem)
        switch (statusId) {
            case 0:
                setDeleteModal(true);
                break;
            case 1:
                setUpdateModal(true);
                break;
            default:
                break;
        }
    };

    const columns = [
        {
            header: t('Position Name'),
            accessorKey: 'positionName',
        },
        { accessorKey: 'positionOverview', header: t('Position Overview') },
        { accessorKey: 'abbreviation', header: t('Abbreviation') },
        { accessorKey: 'department', header: t('Department') },
        { accessorKey: 'additionalDepartment', header: t('Additional Department') },
        { accessorKey: 'workingType', header: t('Working Type') },
        { accessorKey: 'plSection', header: t('P&L Section') },
        {
            accessorKey: 'documentation',
            header: t('Documentation'),
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: () => (
                <>
                    <Icon path={mdiEyeOutline} size={1} color={'#6C757D'} />
                </>
            ),
        },
        {
            header: '',
            accessorKey: 'actions',
            size: '50',
            muiTableBodyCellProps: {
                align: 'center',
              },
            Cell: ({ cell, row }) => {
                    return (
                        <Dropdowns
                            item={`?${row.original.id}`}
                            option={statusOptions}
                            onClick={statusClick}
                        />
                    )
            }
        }
    ];

    const [isShow, setIsShow] = useState(false);

    const positionModal = () => {
        setIsShow(true);
    };

    

    const [department, setDepartment] = useState([]);
    const [selectDepartmant, setSelectDepartmant] = useState([]);

    // addDepartmant
    const [addDepartmant, setAddDepartmant] = useState([]);
    const [selectAddDepartmant, setSelectAddDepartmant] = useState([]);

    // working type
    const [workingType, setWorkingType] = useState([
        {
            value: 1,
            label: 'Office',
        },
        {
            value: 2,
            label: 'Production',
        },
        {
            value: 3,
            label: 'Field',
        },
    ]);
    const [selectWorkingType, setSelectWorkingType] = useState([
        {
            value: 1,
            label: 'Office',
        },
        {
            value: 2,
            label: 'Production',
        },
        {
            value: 3,
            label: 'Field',
        },
    ]);

    // pl selection
    const [plSelection, setPlSelection] = useState([]);
    const [selectPlSelection, setSelectPlSelection] = useState([]);

    const filterComponentsData = [
        {
            label: t('department'),
            type: 'multiselect',
            state: selectDepartmant,
            setState: setSelectDepartmant,
            options: department,
        },
        {
            label: t('working type'),
            type: 'multiselect',
            state: selectWorkingType,
            setState: setSelectWorkingType,
            options: workingType,
        },
        {
            label: t('PL section'),
            type: 'multiselect',
            state: selectPlSelection,
            setState: setSelectPlSelection,
            options: plSelection,
        },
    ];

    const applyFilter = () => {
        const body = {
            DepartmentIds: selectDepartmant?.map((data) => data.value),
            WorkingTypeIds: selectWorkingType?.map((data) => data.value),
            PandLSectionIds: selectPlSelection?.map((data) => data.value),
        };
        FetchApiPost('services/Hr/Position/ApplyForPositionFilter ', 'POST', body).then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        setIsFilters(false);
                        res.json().then((item) => {
                            setAllData(item.data);
                            setTableData(
                                item?.data.map((data) => ({
                                    id: data.id,
                                    positionName: data.positionName,
                                    positionOverview: data.positionOverview,
                                    abbreviation: data.abbreviation,
                                    department: data?.department?.departmentName,
                                    additionalDepartment: data?.additionalDepartment.departmentName,
                                    workingType:
                                        data.workingType === 1
                                            ? 'Office'
                                            : data.workingType === 2
                                            ? 'Production'
                                            : data.workingType === 3
                                            ? 'Field'
                                            : null,
                                    plSection: data.pandLSectionName,
                                    plSectionId: data.pandLSectionId,
                                    documentation: data.document,
                                }))
                            );
                        });
                    } else if (res.status === 500) {
                        history.push('/error-500');
                    } else {
                        console.log('hata');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    };

    useEffect(() => {
        FetchApiGet('services/Hr/Position/GetDepartmentsForPositionFilter', 'GET').then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then((item) => {
                            return (
                                setDepartment(
                                    item.data.map((data) => ({
                                        value: data.id,
                                        label: data.departmentName,
                                    }))
                                ),
                                setSelectDepartmant(
                                    item.data.map((data) => ({
                                        value: data.id,
                                        label: data.departmentName,
                                    }))
                                )
                            );
                        });
                    } else if (res.status === 500) {
                        history.push('/error-500');
                    } else {
                        console.log('hata');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    }, [history]);

    useEffect(() => {
        if (selectDepartmant.length !== 0) {
            const body = {
                DepartmentIds: selectDepartmant.map((data) => data.value),
            };
            FetchApiPost('services/Hr/Position/GetAddDepartmentsForPositionFilter ', 'POST', body).then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((item) => {
                                return (
                                    setAddDepartmant(
                                        item.data.map((data) => ({
                                            value: data.id,
                                            label: data.departmentName,
                                        }))
                                    ),
                                    setSelectAddDepartmant(
                                        item.data.map((data) => ({
                                            value: data.id,
                                            label: data.departmentName,
                                        }))
                                    )
                                );
                            });
                        } else if (res.status === 500) {
                            history.push('/error-500');
                        } else {
                            console.log('hata');
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            );
        }
    }, [history, selectDepartmant]);

    useEffect(() => {
        if (selectDepartmant.length !== 0 && selectWorkingType.length !== 0) {
            const body = {
                DepartmentIds: selectDepartmant.map((data) => data.value),
                WorkingType: selectWorkingType.map((data) => data.value),
            };
            FetchApiPost('services/Hr/Position/GetPLSectionForPositionFilter', 'POST', body).then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((item) => {
                                return (
                                    setPlSelection(
                                        item.data.map((data) => ({
                                            value: data.pandLSectionId,
                                            label: data.pandLSectionName,
                                        }))
                                    ),
                                    setSelectPlSelection(
                                        item.data.map((data) => ({
                                            value: data.pandLSectionId,
                                            label: data.pandLSectionName,
                                        }))
                                    )
                                );
                            });
                        } else if (res.status === 500) {
                            history.push('/error-500');
                        } else {
                            console.log('hata');
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            );
        }
    }, [history, selectDepartmant, selectWorkingType]);

    useEffect(() => {
        dispatch(
            filterFunct({
                DepartmentIds: selectDepartmant?.map((data) => data.value),
                WorkingTypeIds: selectWorkingType?.map((data) => data.value),
                PandLSectionIds: selectPlSelection?.map((data) => data.value),
            })
        );
    }, [dispatch, selectDepartmant, selectPlSelection, selectWorkingType]);

    return (
        <div className="hr-main">
            {/* <MainTable
                tableData={positionTable}
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
                addButtonFunction={positionModal}
                isFilters={isFilters}
                filters={
                    <Filter
                        tableData={tableData}
                        setTableData={setTableData}
                        isFilters={isFilters}
                        setIsFilters={setIsFilters}
                    />
                }
            /> */}

            <TableLayout
                data={tableData}
                columns={columns}
                isAccordion={false}
                isCheckBox={false}
                // handleDropDownItemClick={statusClick}
                // dropdownOptions={statusOptions}
                columnPinningRight={['action']}
                handleNewButton={() => setIsShow(true)}
                isLoading={loader}
                isFilter={isFilters}
                filterShow={true}
                setFilterShow={setIsFilters}
                handlApplyBtn={applyFilter}
                filter={<Filter filterComponentsData={filterComponentsData} isFilterBtn={false} />}
            />

            {isShow && (
                <AddPositionsModal
                    isShow={isShow}
                    setIsShow={setIsShow}
                    setIsFilters={setIsFilters}
                    setTableData={applyFilter}
                />
            )}

            {updateModal && (
                <UpdateModal
                    data={tableItem}
                    tableData={tableData}
                    setTableData={applyFilter}
                    isShow={updateModal}
                    setIsShow={setUpdateModal}
                />
            )}

            {deleteModal && (
                <DeleteModal
                    data={tableItem}
                    modalShow={deleteModal}
                    setModalShow={setDeleteModal}
                    setTableData={applyFilter}
                />
            )}
        </div>
    );
};

export default Table;
