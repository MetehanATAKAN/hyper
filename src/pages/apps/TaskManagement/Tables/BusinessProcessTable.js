import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Popover, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../components/MainTable';
import BusinessProcessFilter from '../BusinessProcessFilter';
import DeleteItemModal from '../DeleteItemModal';
import { useSelector } from 'react-redux';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import FilterSelect from '../../../../components/FilterSelect';
import { useCallback } from 'react';
import Dropdowns from '../../../../components/Dropdowns';
import TableAccordion from '../../../../components/Tables/TableAccordion';

const BusinessProcessTable = (props) => {
    const {
        businessProcess,
        setUpdateBusinessProcess,
        setMainModal,
        seciliTab,
        setBusinessProcess,
        jobDescription,
        setJobDescription,
        processType,
        activityTypes,
        setActivityTypes,
        jobDescriptionFilteredDatas,
        businessProcessFilteredDatas,
        setJobDescriptionFilteredDatas,
        setBusinessProcessFilteredDatas,
        test,
        setTest,
        setNewModal
    } = props;
    const { t } = useTranslation();
    const [deleteModal, setDeleteModal] = useState({ modalStatus: false, item: {} });
    
    const showFilter = useSelector((state) => state.TaskManagement.filterShow);
    const [selectProcessType, setSelectProcessType] = useState([...processType.map(el => ({
        id: el.id,
        value: el.title,
        label: el.title,
    }))]);
    const [selectActivityType, setSelectActivityType] = useState([]);
    const [selectMainProcess, setSelectMainProcess] = useState([]);
    const [departmantOptions, setDepartmentOptions] = useState([]);
    const [selectOwner, setSelectOwner] = useState([]);

    const [tableShow, setTableShow] = useState(false);

    useEffect(() => {
        if(selectMainProcess.length === 0) return; 
        FetchApiGet('services/TaskManagement/SubProcess/GetDepartmant', 'GET')
            .then((res) => res.json())
            .then(res => (

                setDepartmentOptions([...res.data.map(item => ({
                    id: item.departmantId, title: item.departmantName, label: t(item.departmantName)
                }))
                ]),
                setSelectOwner([...res.data.map(item => ({
                    id: item.departmantId, value: item.departmantName, label: t(item.departmantName)
                }))])
            ))
            .catch((err) => console.log(err));
    }, [selectMainProcess]);

    // FILTER PROCESS TYPE

    // options state inede ata !!!!!!!!!!!!!!!!!!!!!!
    useEffect(() => {
        const processIds = selectProcessType.map((x) => x.id);
        FetchApiPost('services/TaskManagement/ActivityType/GetActivityTypeListByProcessTypeIdList', 'POST', processIds)
            .then((res) => res.json())
            .then((json) => (
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
            .catch((err) => console.log(err)) 
    }, [selectProcessType]);


    // FILTER ACTIVITY TYPE
    useEffect(() => {
        const activityIds = selectActivityType.map((x) => x.id);
        FetchApiPost(
            'services/TaskManagement/JobDescription/GetJobDescriptionListByActivityTypeIdList',
            'POST',
            activityIds
        )
            .then((res) => res.json())
            .then((json) => (
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

    // FILTER MAIN PROCESS
    useEffect(() => {
        const mainIds = selectMainProcess.map((x) => x.id);
        FetchApiPost(
            'services/TaskManagement/BusinessProcess/GetBusinessProcessListByJobDescriptionIdList',
            'POST',
            mainIds
        )
            .then((res) => res.json())
            .then((json) => setBusinessProcess(json.data))
            .catch((err) => console.log(err));
    }, [selectMainProcess]);

    const updateBusinessProcess = (event) => {
        setMainModal(true);
        const updateData = businessProcess?.find((item) => item.id === Number(event.target.id))
        setUpdateBusinessProcess([updateData]);
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
        setMainModal(true);
        setUpdateBusinessProcess([obj]);
       }
    }

    const selectRow = (id) => {
       const obj = businessProcess?.find(data => data?.id === id);
       return obj;
    }

    const isDisabledRow = (id) => {
        const obj = businessProcess?.find(data => data?.id === id);
        if (obj?.isDeleteable === false) return true
        else return false
    }

    const columns = [
        {
            header: t('Process Type'),
            accessorKey: 'processType',
            size: '150'
        },
        {
            header: t('Activity Type'),
            accessorKey: 'activityType',
            size: '150'
        },
        {
            header: t('Main Process'),
            accessorKey: 'mainProcess',
            size: '150'
        },
        {
            header: t('Business Process'),
            accessorKey: 'businessProcess',
            size: '150'
        },
        {
            header: t('Owner Business Department'),
            accessorKey: 'ownerBusinessDepartmant',
            size: '150'
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


    const popover = (props) => (
        <Popover id="popover-basic" {...props}>
            <Popover.Body>{props}</Popover.Body>
        </Popover>
    );

   
    const buttons = businessProcess?.map((process, index) => ({
        id: index,
        content: (
            <span className="task-management-table-column__icons">
                <OverlayTrigger placement="top" trigger="hover" overlay={popover(t('Update'))}>
                    <button id={process.id} onClick={updateBusinessProcess}>
                        <i id={process.id} onClick={updateBusinessProcess} className="fa-solid fa-pencil"></i>
                    </button>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    trigger="hover"
                    overlay={popover(
                        process.isDeleteable
                            ? t('Delete')
                            : t('You can not delete this process. Firstly delete linked processes.')
                    )}>
                    <div style={{ display: 'inline-block', cursor: 'not-allowed' }}>
                        <button
                            style={{ pointerEvents: process.isDeleteable === false && 'none' }}
                            disabled={!process.isDeleteable}
                            onClick={() => setDeleteModal({ modalStatus: true, item: process })}>
                            <i
                                className={`fa-solid fa-trash-can task-management-table-column__icons-deleted-${process.isDeleteable}`}></i>
                        </button>
                    </div>
                </OverlayTrigger>
            </span>
        ),
        columnName: 'actions',
        width: 100,
    }));

    const businessTableData = businessProcess?.map((el, index) => ({
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
        ownerBusinessDepartmant: el.ownerDepartmant,
        actions: buttons[index].content,
    }));

    const [columnOrders, setColumnOrders] = useState([
        'processType',
        'activityType',
        'mainProcess',
        'businessProcess',
        'ownerBusinessDepartmant',
        'actions',
    ]);
    const parentFilters = useCallback(() => {
        const processIds = selectProcessType.map((x) => x.id);
        const activityIds = selectActivityType.map((x) => x.id);
        const mainIds = selectMainProcess.map((x) => x.id);
        const ownerIds = selectOwner.map((x) => x.id);
        const conditionArr = [
            processIds.length !== 0,
            activityIds.length !== 0,
            mainIds.length !== 0,
            ownerIds.length !== 0,
        ];
        if (conditionArr.some((el) => el === false)) return;

        const filterData = businessProcess?.filter(
            (el) =>
                processIds.includes(el.processTypeId) &&
                activityIds.includes(el.activityTypeId) &&
                mainIds.includes(el.mainProcessId) &&
                ownerIds.includes(el.ownerDepartmantId)
        );
        setBusinessProcessFilteredDatas([...filterData]);
        setTableShow(true);
    }, [businessProcess, selectActivityType, selectMainProcess, selectOwner, selectProcessType]);

    useEffect(() => {
        if (test === true) {
            parentFilters();
        }
    }, [parentFilters, test]);

    const cancelFilters = () => {
        setBusinessProcessFilteredDatas([businessProcess]);
        setSelectProcessType([]);
        setSelectActivityType([]);
        setSelectMainProcess([]);
        setSelectOwner([]);
    };

    const filterComponentsData = [
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
            label: 'Owner',
            options: departmantOptions,
            state: selectOwner,
            setState: setSelectOwner,
        },
    ];

    return (
        <>
            {showFilter === true && (
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
            )}

        <TableAccordion
                data={businessTableData}
                columns={columns}
                isShowNewBtn={true}
                isFilter={false}
                isCheckBox={false}
                handleNewButton={()=>setNewModal(true)}
            />
            {/* <MainTable
                tableData={businessTableData}
                columns={columns}
                columnWidths={columnWidths}
                setColumnWidths={setColumnWidths}
                tableColumnExtensions={tableColumnExtensions}
                itemsFromBackend={itemsFromBackend}
                columnOrders={columnOrders}
                setColumnOrders={setColumnOrders}
                disableFreeze={true}
                groupByItems={groupByItems}
                setGroupByItems={setGroupByItems}
                showorHideColumnsItems={showorHideColumnsItems}
                totalSummaryItems={totalSummaryItems}
                groupSummaryItems={groupSummaryItems}
            /> */}

            {deleteModal.modalStatus && (
                <DeleteItemModal
                    deleteModal={deleteModal}
                    seciliTab={"Business Process"}
                    setDeleteModal={setDeleteModal}
                    businessProcessFilteredDatas={businessProcessFilteredDatas}
                    setBusinessProcessFilteredDatas={setBusinessProcessFilteredDatas}
                    jobDescriptionFilteredDatas={jobDescriptionFilteredDatas}
                    setJobDescriptionFilteredDatas={setJobDescriptionFilteredDatas}
                    jobDescription={jobDescription}
                    setJobDescription={setJobDescription}
                    businessProcess={businessProcess}
                    setBusinessProcess={setBusinessProcess}
                />
            )}
        </>
    );
};

export default BusinessProcessTable;
