import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../components/MainTable';
import DeleteItemModal from '../DeleteItemModal';
import UpdateParentProcessModal from '../UpdateParentProcessModal';
import { Button, Col, Modal, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useDispatch, useSelector } from 'react-redux';
import FilterSelect from '../../../../components/FilterSelect';
import { setRecurrenceUpdateData } from '../../../../redux/actions';
import TableAccordion from '../../../../components/Tables/TableAccordion';
import Dropdowns from '../../../../components/Dropdowns';

import AddModal from '../ParentProcessModals/AddModal';

import OrderModal from '../ParentProcessModals/Order';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Sop from '../ParentProcessModals/SOP';

const ParentProcessTable = ({
    parentProcess,
    setParentProcess,
    seciliTab,
    subProcess,
    setSubProcess,
    businessProcess,
    setBusinessProcess,
    activityTypes,
    setActivityTypes,
    jobDescription,
    setJobDescription,
    processType,
    test,
    setTest,
    processFilteredDatas,
    setProcessFilteredDatas,
    businessProcessFilteredDatas,
    setBusinessProcessFilteredDatas,
    subProcessFilteredDatas,
    setSubProcessFilteredDatas,
    setNewModal,

    setFirstActivityAdd,
    businessProcess2,
    setBusinessProcess2
}) => {
    const [onModal, setOnModal] = useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [showAddModal, setShowAddModal] = useState();
    const [selectedItem, setSelectedItem] = useState();

    const showFilter = useSelector((state) => state.TaskManagement.filterShow);
    const [deleteModal, setDeleteModal] = useState({ modalStatus: false, item: {} });
    const [updateParentProcess, setUpdateParentProcess] = useState({});
    const [departmantOptions, setDepartmentOptions] = useState([]);
    const [filtersParentData, setFiltersParentData] = useState([]);
    const [selectUserCompany, setSelectUserCompany] = useState([]);
    const [selectProcessType, setSelectProcessType] = useState([]);
    const [selectActivityType, setSelectActivityType] = useState([]);
    const [selectMainProcess, setSelectMainProcess] = useState([]);
    const [selectBusinessProcess, setSelectBusinessProcess] = useState([]);
    const [selectCategory, setSelectCategory] = useState([]);
    const [selectOwner, setSelectOwner] = useState([]);
    const [tableShow, setTableShow] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState([
        { id: 1, title: 'A' },
        { id: 2, title: 'B' },
        { id: 3, title: 'C' },
    ]);
    const [parentId, setParentId] = useState('');

    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showSopModal, setShowSopModal] = useState(false)

    const handleParentProcessChange = (value) => {
        setUpdateParentProcess(value);
        setOnModal(true);
        setParentId(value.id);
        FetchApiGet(`services/TaskManagement/ParentProcess/GetRecurrenceByParentProcessId?id=${value.id}`, 'GET')
            .then((res) => res.json())
            .then((json) => dispatch(setRecurrenceUpdateData(json.data)))
            .catch((err) => console.log('Something went wrong', err));
    };
    useEffect(() => {
        if (selectBusinessProcess.length === 0) return;
        FetchApiGet('services/TaskManagement/SubProcess/GetDepartmant', 'GET')
            .then((res) => res.json())
            .then((res) =>
                res.data.map(
                    (item) => (
                        setDepartmentOptions((prev) => [
                            ...prev,
                            { id: item.departmantId, title: item.departmantName, label: t(item.departmantName) },
                        ]),
                        setSelectOwner((prev) => [
                            ...prev,
                            { id: item.departmantId, value: item.departmantName, label: t(item.departmantName) },
                        ])
                    )
                )
            )
            .catch((err) => console.log(err));
    }, [selectBusinessProcess]);

    const statusOptions = [
        {
            id: 9,
            key: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            color: '#6C757D',
            disabled: false,
        },
        {
            id: 0,
            key: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
            disabled: true,
        },
    ];

    const statusClick = (e, obj, status) => {
        if (status.id === 0) {
            // delete
            console.log(obj)
            setDeleteModal({ modalStatus: true, item: obj });
        } else {
            // edit
            setUpdateParentProcess(obj);
            setOnModal(true);
            setParentId(obj.id);
            FetchApiGet(`services/TaskManagement/ParentProcess/GetRecurrenceByParentProcessId?id=${obj.id}`, 'GET')
                .then((res) => res.json())
                .then((json) => dispatch(setRecurrenceUpdateData(json.data)))
                .catch((err) => console.log('Something went wrong', err));
        }
    };

    const selectRow = (id) => {
        const obj = parentProcess?.find((data) => data?.id === id);
        return obj;
    };

    const isDisabledRow = (id) => {
        const obj = parentProcess?.find((data) => data?.id === id);
        if (obj?.isDeleteable === false) return true;
        else return false;
    };

    const columns = [
        {
            header: t('User Company'),
            accessorKey: 'userCompany',
            size: '100',
        },
        {
            header: t('Process Type'),
            accessorKey: 'processType',
            size: '150',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            )
        },
        {
            header: t('Activity Type'),
            accessorKey: 'activityType',
            size: '150',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            )
        },
        {
            header: t('Main Process'),
            accessorKey: 'mainProcess',
            size: '100',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            )
        },
        {
            header: t('Business Process'),
            accessorKey: 'businessProcess',
            size: '100',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            )
        },
        {
            header: t('Process'),
            accessorKey: 'parentProcess',
            size: '100',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            )
        },
        {
            header: t('Category'),
            accessorKey: 'category',
            size: '100',
        },
        {
            header: t('Owner Business Department'),
            accessorKey: 'ownerDepartmant',
            size: '300',
        },
        {
            header: t('S&OP'),
            accessorKey: 'sop',
            size: '180',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ row }) => (
                <button style={{ border: 'none', background: 'transparent' }} onClick={() => (setShowSopModal(true), setSelectedItem(row.original.id))}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            ),
        },
        {
            header: t('Order'),
            accessorKey: 'order',
            size: '180',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ row }) => (
                <button style={{ border: 'none', background: 'transparent' }} onClick={() =>(setShowOrderModal(true), setSelectedItem(row.original.id))}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            ),
        },
        {
            header: t(' '),
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
                        obj={selectRow(row.original.id)}
                        disabled={isDisabledRow(row.original.id)}
                    />
                );
            },
        },
    ];

    // FILTER PROCESS
    useEffect(() => {
        setSelectProcessType(
            processType?.map((el) => ({
                id: el.id,
                value: el.title,
                label: el.title,
            }))
        );
    }, []);
    useEffect(() => {
        if (selectBusinessProcess.length === 0) return;
        setSelectCategory(categoryOptions.map((el) => ({ id: el.id, value: el.title, label: el.title })));
    }, [selectBusinessProcess]);

    useEffect(() => {
        const processIds = selectProcessType.map((x) => x.id);
        FetchApiPost('services/TaskManagement/ActivityType/GetActivityTypeListByProcessTypeIdList', 'POST', processIds)
            .then((res) => res.json())
            .then(
                (json) => (
                    setActivityTypes([...json.data]),
                    setSelectActivityType(
                        json.data?.map((el) => ({
                            id: el.id,
                            value: el.title,
                            label: el.title,
                        }))
                    )
                )
            )
            .catch((err) => console.log(err));
    }, [selectProcessType]);
    useEffect(() => {
        const activityIds = selectActivityType.map((x) => x.id);
        FetchApiPost(
            'services/TaskManagement/JobDescription/GetJobDescriptionListByActivityTypeIdList',
            'POST',
            activityIds
        )
            .then((res) => res.json())
            .then(
                (json) => (
                    setJobDescription([...json.data]),
                    setSelectMainProcess(
                        json.data?.map((el) => ({
                            id: el.id,
                            value: el.mainProcess,
                            title: el.mainProcess,
                        }))
                    )
                )
            )
            .catch((err) => console.log(err));
    }, [selectActivityType]);
    useEffect(() => {
        const mainIds = selectMainProcess.map((x) => x.id);
        FetchApiPost(
            'services/TaskManagement/BusinessProcess/GetBusinessProcessListByJobDescriptionIdList',
            'POST',
            mainIds
        )
            .then((res) => res.json())
            .then(
                (json) => (
                    setBusinessProcess([json.data]),
                    setSelectBusinessProcess(
                        json.data?.map((el) => ({
                            id: el.id,
                            value: el.businessProcessName,
                            title: el.businessProcessName,
                        }))
                    )
                )
            )
            .catch((err) => console.log(err));
    }, [selectMainProcess]);

    const parentFilters = useCallback(() => {
        // const processIds = selectProcessType.map((x) => x.id);
        // const activityIds = selectActivityType.map((x) => x.id);
        // const mainIds = selectMainProcess.map((x) => x.id);
        // const businessIds = selectBusinessProcess.map((x) => x.id);
        // const categoryValue = selectCategory.map((x) => x.value);
        // const ownerIds = selectOwner.map((x) => x.id);
        // const conditionArr = [
        //     processIds.length !== 0,
        //     activityIds.length !== 0,
        //     mainIds.length !== 0,
        //     businessIds.length !== 0,
        //     categoryValue.length !== 0,
        //     ownerIds.length !== 0,
        // ];
        // if (conditionArr.some((el) => el === false)) return;
        // const filterData = parentProcess.filter(
        //     (el) =>
        //         processIds.includes(el.processTypeId) &&
        //         activityIds.includes(el.activityTypeId) &&
        //         mainIds.includes(el.mainProcessId) &&
        //         businessIds.includes(el.businessProcessId) &&
        //         categoryValue.includes(el.category) &&
        //         ownerIds.includes(el.ownerDepartmantId)
        // );
        // setProcessFilteredDatas([...filterData]);
        // setTableShow(true);
    }, [
        selectProcessType,
        selectActivityType,
        selectMainProcess,
        selectBusinessProcess,
        selectCategory,
        selectOwner,
        parentProcess,
    ]);
    const cancelFilters = () => {
        setProcessFilteredDatas(parentProcess);
        setSelectActivityType([]);
        setSelectBusinessProcess([]);
        setSelectCategory([]);
        setSelectMainProcess([]);
        setSelectOwner([]);
        setSelectProcessType([]);
        setSelectUserCompany([]);
    };
    const filterComponentsData = [
        { label: 'User Company', options: [], state: selectUserCompany, setState: setSelectUserCompany },
        {
            label: 'Process Type',
            options: processType,
            state: selectProcessType,
            setState: setSelectProcessType,
        },
        {
            label: 'Activity Type',
            options: activityTypes,
            state: selectActivityType,
            setState: setSelectActivityType,
        },
        {
            label: 'Main Process',
            options: jobDescription?.map((el) => ({
                id: el.id,
                title: el.mainProcess,
            })),
            state: selectMainProcess,
            setState: setSelectMainProcess,
        },
        {
            label: 'Business Process',
            options: businessProcess?.map((el) => ({
                id: el.id,
                title: el.businessProcessName,
            })),
            state: selectBusinessProcess,
            setState: setSelectBusinessProcess,
        },
        {
            label: 'Category',
            options: categoryOptions,
            state: selectCategory,
            setState: setSelectCategory,
        },
        {
            label: 'Owner',
            options: departmantOptions,
            state: selectOwner,
            setState: setSelectOwner,
        },
    ];

    const [parentProcessTableData, setParentProcessTableData] = useState([]);
    useEffect(() => {
        setParentProcessTableData(parentProcess.map((el, index) => ({
            id: el.id,
            parentId: null,
            processType: (
                <div key={index} className="task-management-table-row">
                    <span
                        className="task-management-activity-background"
                        style={{
                            backgroundColor: el.processTypeColor,
                            padding: '3px 6px',
                            borderRadius: '14px',
                            fontSize: '.7rem',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                        }}>
                        {el.processTypeName}
                    </span>
                </div>
            ),
            userCompany: '-',
            activityType: (
                <div key={index} className="task-management-table-row">
                    <span
                        className="task-management-activity-background"
                        style={{
                            backgroundColor: el.activityTypeColor,
                            padding: '3px 6px',
                            borderRadius: '14px',
                            fontSize: '.7rem',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                        }}>
                        {el.activityTypeName}
                    </span>
                </div>
            ),
            mainProcess: el.mainProcessName,
            businessProcess: el.businessProcessName,
            parentProcess: el.title,
            category: el.category,
            ownerDepartmant: el.ownerDepartmant,
            // actions: buttons[index].content,
        })))
    }, [parentProcess])

    useEffect(() => {
        if (test === true) {
            parentFilters();
            setTest(false);
        }
    }, [test, parentFilters]);

    return (
        <>
            {showFilter === true ? (
                <Row className="filter-select-container">
                    {filterComponentsData.map((item) => (
                        <FilterSelect
                            value={item.state}
                            placeholder={item.label}
                            options={item.options?.map((el) => ({
                                id: el.id,
                                value: el.title,
                                label: el.title,
                            }))}
                            setValue={item.setState}
                        />
                    ))}
                    <Col xs={12} md={3} className="filter-select-btn">
                        <Button onClick={cancelFilters} variant="light">
                            {t('cancel')}
                        </Button>
                        <Button onClick={parentFilters} variant="primary">
                            {t('apply')}
                        </Button>
                    </Col>
                </Row>
            ) : null}

            <TableAccordion
                data={parentProcessTableData}
                columns={columns}
                isShowNewBtn={true}
                isFilter={false}
                isCheckBox={false}
                handleNewButton={() => setShowAddModal(true)}
            />

            {showAddModal && (
                <AddModal 
                    showAddModal={showAddModal}
                    setShowAddModal={setShowAddModal}

                    setFirstActivityAdd={setFirstActivityAdd}
                    businessProcess2={businessProcess2}
                    setBusinessProcess2={setBusinessProcess2}
                    setParentProcess={setParentProcess}
                    setTest={setTest}
                    setProcessFilteredDatas={setProcessFilteredDatas}
                    setBusinessProcessFilteredDatas={setBusinessProcessFilteredDatas}
                    businessProcessFilteredDatas={businessProcessFilteredDatas}
                />
            )}

            {deleteModal.modalStatus && (
                <DeleteItemModal
                    deleteModal={deleteModal}
                    seciliTab={'Process'}
                    setDeleteModal={setDeleteModal}
                    parentProcess={parentProcess}
                    setParentProcess={setParentProcess}
                    businessProcess={businessProcess}
                    setBusinessProcess={setBusinessProcess}
                    processFilteredDatas={processFilteredDatas}
                    setProcessFilteredDatas={setProcessFilteredDatas}
                    businessProcessFilteredDatas={businessProcessFilteredDatas}
                    setBusinessProcessFilteredDatas={setBusinessProcessFilteredDatas}
                />
            )}
            {
                onModal && (
<Modal show={onModal} onHide={() => setOnModal(false)} className="task-management__modal">
                <Modal.Header>
                    <Modal.Title>{t(`Edit ${seciliTab}`)}</Modal.Title>
                    <button className="task-management__modal-close-btn" onClick={() => setOnModal(false)}>
                        <i className="dripicons-cross"></i>
                    </button>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <UpdateParentProcessModal
                        parentId={parentId}
                        parentProcess={parentProcess}
                        setParentProcess={setParentProcess}
                        updateParentProcess={updateParentProcess}
                        setOnModal={setOnModal}
                        subProcess={subProcess}
                        setSubProcess={setSubProcess}
                        setTest={setTest}
                        processFilteredDatas={processFilteredDatas}
                        setProcessFilteredDatas={setProcessFilteredDatas}
                        setSubProcessFilteredDatas={setSubProcessFilteredDatas}
                        subProcessFilteredDatas={subProcessFilteredDatas}
                    />
                </Modal.Body>
            </Modal>
                )
            }
            


            {
                showOrderModal && (
                    <OrderModal 
                        showAddModal={showOrderModal}
                        setShowAddModal={setShowOrderModal}
                        selectedItem={selectedItem}
                    />
                )
            }

            {
                showSopModal && (
                    <Sop
                    showAddModal={showSopModal}
                        setShowAddModal={setShowSopModal}
                        selectedItem={selectedItem}
                    />
                )
            }
        </>
    );
};

export default ParentProcessTable;
