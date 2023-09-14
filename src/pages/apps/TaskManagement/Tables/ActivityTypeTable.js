import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../components/MainTable';
import DeleteItemModal from '../DeleteItemModal';
import UpdateActivityModal from '../UpdateActivityModal';
import { Modal, OverlayTrigger, Popover, Row, Col, Button } from 'react-bootstrap';
import FilterSelect from '../../../../components/FilterSelect';
import { useSelector } from 'react-redux';
import { FetchApiPost } from '../../../../utils/http.helper';
import TableAccordion from '../../../../components/Tables/TableAccordion';
import Dropdowns from '../../../../components/Dropdowns';

const ActivityTypeTable = ({
    activityTypes,
    setActivityTypes,
    seciliTab,
    jobDescription,
    setJobDescription,
    businessProcess,
    setBusinessProcess,
    parentProcess,
    setParentProcess,
    subProcess,
    setSubProcess,
    processType,
    setProcessType,
    filteredDatas,
    setFilteredDatas,
    setNewModal,
    onNewModal,
    activityTypeFilteredDatas,
    jobDescriptionFilteredDatas,
    businessProcessFilteredDatas,
    processFilteredDatas,
    setActivityTypeFilteredDatas,
    setJobDescriptionFilteredDatas,
    setBusinessProcessFilteredDatas,
    setProcessFilteredDatas,
}) => {
    const [onModal, setOnModal] = useState(false);
    const { t } = useTranslation();
    const [updateActivityType, setUpdateActivityType] = useState({});
    const [deleteModal, setDeleteModal] = useState({ modalStatus: false, item: {} });
    console.log(deleteModal);
    // const [filteredDatas, setFilteredDatas] = useState([]);
    const showFilter = useSelector((state) => state.TaskManagement.filterShow);
    const [selectFilterProcess, setSelectFilterProcess] = useState([]);

    const [tableShow, setTableShow] = useState(false);

    useEffect(() => {
        const processIds = selectFilterProcess.map((el) => el.id);
        FetchApiPost('services/TaskManagement/ActivityType/GetActivityTypeListByProcessTypeIdList', 'POST', processIds)
            .then((res) => res.json())
            .then((json) => setActivityTypes([...json.data]))
            .catch((err) => console.log(err));
    }, [selectFilterProcess]);

    const handleActivityTypeChange = (value) => {
        setUpdateActivityType(value);
        setOnModal(true);
    };

    const statusOptions = [
        {
            id: 9,
            key: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            color: '#6C757D',
            disabled:false
        },
        {
            id: 0,
            key: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
            disabled:true
        },
    ]

    const statusClick = (e,obj,status) => {
          
       if(status.id === 0) { // delete
        setDeleteModal({ modalStatus: true, item: obj })
       }
       else { // edit
        setUpdateActivityType(obj);
        setOnModal(true);
       }
    }

    const selectRow = (id) => {
       const obj = activityTypes?.find(data => data?.id === id);
       return obj;
    }

    const isDisabledRow = (id) => {
        const obj = activityTypes?.find(data => data?.id === id);
        if (obj?.isDeleteable === false) return true
        else return false
    }

    const columns = [
        {
            header: t('Process Type'),
            accessorKey: 'processType',
            size: '600'
        },
        {
            header: t('Activity Type'),
            accessorKey: 'activityType',
            size: '600'
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
                        disabled = {isDisabledRow(row.original.id)}
                    />
                )
            }
        }
    ];

    // const [columns] = useState([
    //     { name: 'processType', title: t('Process Type') },
    //     { name: 'activityType', title: t('Activity Type') },
    //     { name: 'actions', title: t('Actions') },
    // ]);

    // const [columnWidths, setColumnWidths] = useState([
    //     { columnName: 'processType', width: '45%' },
    //     { columnName: 'activityType', width: '45%' },
    //     { columnName: 'actions', width: '10%' },
    // ]);

    // const [tableColumnExtensions] = useState([
    //     { columnName: 'processType', width: 500 },
    //     { columnName: 'activityType', width: 500 },
    //     { columnName: 'actions', width: 95 },
    // ]);

    // const itemsFromBackend = [
    //     { id: '1', isFreeze: false, content: 'Process Type', columnName: 'processType', width: 500 },
    //     { id: '2', isFreeze: false, content: 'Activity Type', columnName: 'activityType', width: 500 },
    //     { id: '3', isFreeze: false, content: 'Actions', columnName: 'actions', width: 95 },
    // ];

    // // Group By Items
    // const [groupByItems, setGroupByItems] = useState([
    //     { id: '0', isShow: true, columnName: 'processType', content: t('Process Type') },
    //     { id: '1', isShow: true, columnName: 'activityType', content: t('Activity Type') },
    //     { id: '2', isShow: true, columnName: 'actions', content: t('Actions') },
    // ]);

    // const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
    //     { isShow: true, name: 'processType', title: t('Process Type') },
    //     { isShow: true, name: 'activityType', title: t('Activity Type') },
    //     { isShow: true, name: 'actions', title: t('Actions') },
    // ]);

    // const [totalSummaryItems, setTotalSummaryItems] = useState([
    //     { type: 'count', columnName: 'processType', width: 150 },
    //     { type: 'count', columnName: 'activityType', width: 150 },
    //     { type: 'count', columnName: 'actions', width: 100 },
    // ]);

    // const [groupSummaryItems, setGroupSummaryItems] = useState([
    //     { type: 'count', columnName: 'processType', width: 150 },
    //     { type: 'count', columnName: 'activityType', width: 150 },
    //     { type: 'count', columnName: 'actions', width: 100 },
    // ]);

    // const popover = (props) => (
    //     <Popover id="popover-basic" {...props}>
    //         <Popover.Body>{props}</Popover.Body>
    //     </Popover>
    // );
    // const buttons = activityTypes.map((process, index) => ({
    //     id: index,
    //     content: (
    //         <span className="task-management-table-column__icons">
    //             <OverlayTrigger placement="top" trigger="hover" overlay={popover(t('Update'))}>
    //                 <button title={t('UPDATE')} id={process.id} onClick={() => handleActivityTypeChange(process)}>
    //                     <i id={process.id} className="fa-solid fa-pencil"></i>
    //                 </button>
    //             </OverlayTrigger>
    //             <OverlayTrigger
    //                 placement="top"
    //                 trigger="hover"
    //                 overlay={popover(
    //                     process.isDeleteable
    //                         ? t('Delete')
    //                         : t('You can not delete this process. Firstly delete linked processes.')
    //                 )}>
    //                 <div style={{ display: 'inline-block', cursor: 'not-allowed' }}>
    //                     <button
    //                         style={{ pointerEvents: process.isDeleteable === false && 'none' }}
    //                         disabled={!process.isDeleteable}
    //                         onClick={() => setDeleteModal({ modalStatus: true, item: process })}>
    //                         <i
    //                             className={`fa-solid fa-trash-can task-management-table-column__icons-deleted-${process.isDeleteable}`}></i>
    //                     </button>
    //                 </div>
    //             </OverlayTrigger>
    //         </span>
    //     ),
    //     columnName: 'actions',
    //     width: 150,
    // }));

    const activityTableData = activityTypes.map((el, index) => ({
        id: el.id,
        parentId: null,
        processType: (
            <div key={index * 100} className="task-management-table-row">
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
        activityType: (
            <div key={index} className="task-management-table-row">
                <span
                    className="task-management-activity-background"
                    style={{
                        backgroundColor: el.color,
                        padding: '3px 6px',
                        borderRadius: '14px',
                        fontSize: '.7rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                    }}>
                    {el.title}
                </span>
            </div>
        ),
        // actions: buttons[index].content,
    }));

    const [columnOrders, setColumnOrders] = useState(['processType', 'activityType', 'actions']);

    const filterButton = () => {
        if (selectFilterProcess.length === 0) return;
        const processIds = selectFilterProcess.map((x) => x.id);
        const filteredData = activityTypes.filter((el) => processIds.includes(el.processTypeId));
        setActivityTypeFilteredDatas([...filteredData]);
        setTableShow(true);
    };
    const cancelFilter = () => {
        setActivityTypeFilteredDatas(activityTypes);
        setSelectFilterProcess([]);
    };

    const filterComponentsData = [
        { label: 'Process Type', stateArr: processType, state: selectFilterProcess, setState: setSelectFilterProcess },
    ];
    useEffect(() => {
        setSelectFilterProcess(
            processType.map((el) => ({
                id: el.id,
                value: el.title,
                label: el.title,
            }))
        );
    }, [processType]);

    return (
        <>
            {showFilter === true && (
                <Row className="filter-select-container">
                    {filterComponentsData.map((item) => (
                        <FilterSelect
                            value={item.state}
                            placeholder={item.label}
                            options={item.stateArr?.map((el) => ({
                                id: el.id,
                                value: el.title,
                                label: el.title,
                            }))}
                            setValue={item.setState}
                        />
                    ))}
                    <Col xs={12} md={3} className="filter-select-btn">
                        <Button onClick={cancelFilter} variant="light">
                            {t('cancel')}
                        </Button>
                        <Button onClick={filterButton} variant="primary">
                            {t('apply')}
                        </Button>
                    </Col>
                </Row>
            )}

<TableAccordion
                data={activityTableData}
                columns={columns}
                isShowNewBtn={true}
                isFilter={false}
                isCheckBox={false}
                handleNewButton={()=>setNewModal(true)}
            />
            {
                // <MainTable
                //     tableData={activityTableData}
                //     columns={columns}
                //     columnWidths={columnWidths}
                //     setColumnWidths={setColumnWidths}
                //     tableColumnExtensions={tableColumnExtensions}
                //     itemsFromBackend={itemsFromBackend}
                //     columnOrders={columnOrders}
                //     setColumnOrders={setColumnOrders}
                //     disableFreeze={true}
                //     groupByItems={groupByItems}
                //     setGroupByItems={setGroupByItems}
                //     showorHideColumnsItems={showorHideColumnsItems}
                //     totalSummaryItems={totalSummaryItems}
                //     groupSummaryItems={groupSummaryItems}
                // />
            }

            {deleteModal.modalStatus && (
                <DeleteItemModal
                    deleteModal={deleteModal}
                    seciliTab={seciliTab}
                    setDeleteModal={setDeleteModal}
                    processType={processType}
                    setProcessType={setProcessType}
                    activityTypeFilteredDatas={activityTypeFilteredDatas}
                    jobDescriptionFilteredDatas={jobDescriptionFilteredDatas}
                    businessProcessFilteredDatas={businessProcessFilteredDatas}
                    processFilteredDatas={processFilteredDatas}
                    setActivityTypeFilteredDatas={setActivityTypeFilteredDatas}
                    setJobDescriptionFilteredDatas={setJobDescriptionFilteredDatas}
                    setBusinessProcessFilteredDatas={setBusinessProcessFilteredDatas}
                    setProcessFilteredDatas={setProcessFilteredDatas}
                    activityTypes={activityTypes}
                    setActivityTypes={setActivityTypes}
                />
            )}
            {
                onModal &&
                <UpdateActivityModal
                        activityTypes={activityTypes}
                        setActivityTypes={setActivityTypes}
                        updateActivityType={updateActivityType}
                        setOnModal={setOnModal}
                        onModal={onModal}
                        jobDescription={jobDescription}
                        setJobDescription={setJobDescription}
                        businessProcess={businessProcess}
                        setBusinessProcess={setBusinessProcess}
                        parentProcess={parentProcess}
                        setParentProcess={setParentProcess}
                        subProcess={subProcess}
                        setSubProcess={setSubProcess}
                        activityTypeFilteredDatas={activityTypeFilteredDatas}
                        jobDescriptionFilteredDatas={jobDescriptionFilteredDatas}
                        businessProcessFilteredDatas={businessProcessFilteredDatas}
                        processFilteredDatas={processFilteredDatas}
                        setActivityTypeFilteredDatas={setActivityTypeFilteredDatas}
                        setJobDescriptionFilteredDatas={setJobDescriptionFilteredDatas}
                        setBusinessProcessFilteredDatas={setBusinessProcessFilteredDatas}
                        setProcessFilteredDatas={setProcessFilteredDatas}
                    />
            }
        </>
    );
};

export default ActivityTypeTable;
