import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import FilterSelect from '../../../../components/FilterSelect';
import MainTable from '../../../../components/MainTable';
import { filterData, setOldSubProcessId } from '../../../../redux/actions';
import { FetchApiGet } from '../../../../utils/http.helper';
import DeleteItemModal from '../DeleteItemModal';
import UpdateSubProcess from '../UpdateSubProcess';
import TableAccordion from '../../../../components/Tables/TableAccordion';
import Dropdowns from '../../../../components/Dropdowns';

import AddSopModal from '../SubProcessModals/AddSopModal';


const SubProcessTable = (props) => {
    const {
        subProcess,
        setUpdateSubProcess,
        updateSubProcess,
        seciliTab,
        setSubProcess,
        parentProcess,
        setParentProcess,
        activityTypes,
        setNewModal
    } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [onModal, setOnModal] = useState(false);
    const showFilter = useSelector((state) => state.TaskManagement.filterShow);
    const [deleteModal, setDeleteModal] = useState({ modalStatus: false, item: {} });
    const [selectProcessName, setSelectProcessName] = useState([]);
    const [selectDepartment, setSelectDepartment] = useState([]);
    const [selectApprove, setSelectApprove] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [filterSubData, setFilterSubData] = useState([]);


    const [showSopModal, setShowSopModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState();


    const subProcessIdNew = useSelector((state) => state.TaskManagement.newSubProcessId);
    const subProcessIdOld = useSelector((state) => state.TaskManagement.oldSubProcessId);
    async function updateBtnSubProcess(event) {
        const updateData = await subProcess.find((item) => item.id === Number(event.target.id));
        await dispatch(setOldSubProcessId(updateData.id));
        await setUpdateSubProcess([updateData]);
        await setOnModal(true);
    }
    useEffect(() => {
        if (selectProcessName.length === 0) return;
        FetchApiGet('services/TaskManagement/SubProcess/GetDepartmant', 'GET')
            .then((res) => res.json())
            .then((res) =>
                res.data.map(
                    (item) => (
                        setDepartmentOptions((prev) => [
                            ...prev,
                            { id: item.departmantId, title: item.departmantName, label: t(item.departmantName) },
                        ]),
                        setSelectDepartment((prev) => [
                            ...prev,
                            { id: item.departmantId, value: item.departmantName, label: t(item.departmantName) },
                        ])
                    )
                )
            )
            .catch((err) => console.log(err));
    }, [selectProcessName]);

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

        dispatch(setOldSubProcessId(obj.id));
        setUpdateSubProcess([obj]);
        setOnModal(true);
   }
}

const selectRow = (id) => {
   const obj = subProcess?.find(data => data?.id === id);
   return obj;
}

const isDisabledRow = (id) => {
    const obj = subProcess?.find(data => data?.id === id);
    if (obj?.isDeleteable === false) return true
    else return false
}

    const columns = [
        {
            header: t('Process Name'),
            accessorKey: 'processName',
            size: '100'
        },
        {
            header: t('Sub Process'),
            accessorKey: 'subProcess',
            size: '100'
        },
        {
            header: t('Product And Process Department'),
            accessorKey: 'productAndProcessDepartment',
            size: '300'
        },
        {
            header: t('Chain Of Responsible Position Service Company'),
            accessorKey: 'chainOfResponsiblePositionServiceCompany',
            size: '400'
        },
        {
            header: t('Chain Of Responsible Position Regional Office'),
            accessorKey: 'chainOfResponsiblePositionRegionalOffice',
            size: '400'
        },
        {
            header: t('Chain Of Responsible Position Production Side'),
            accessorKey: 'chainOfResponsiblePositionProductionSide',
            size: '400'
        },
        // {
        //     header: t('Process Name'),
        //     accessorKey: 'processName',
        //     size: '400'
        // },
        {
            header: t('S&OP'),
            accessorKey: 'sop',
            size: '100',
            muiTableBodyCellProps: {
                align: 'center',
              },
            Cell: ({row, cell}) => (
        
                  
                        <button style={{ border: 'none', background: 'transparent' }} onClick={() => (setSelectedItem({ id: Number(row.original.id), sop: cell.getValue()}), setShowSopModal(true))}>
                            {cell.getValue() === null ? <i className="fa-solid fa-plus"></i> : <i className="fa-regular fa-pen-to-square"></i>}
                        </button>
                    
                
                
            ),
        },
        {
            header: t('Approve'),
            accessorKey: 'approve',
            size: '100',
            muiTableBodyCellProps: {
                align: 'center',
              },
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

  
    // SORT PROCESS NAME
    useEffect(() => {
        // parentProcess.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
        parentProcess.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        setParentProcess([...parentProcess]);
    }, []);
    // FILTER PROCESS
    useEffect(() => {
        setSelectProcessName(
            parentProcess?.map((el) => ({
                id: el.id,
                value: el.title,
                label: el.title,
            }))
        );
    }, []);
    useEffect(() => {
        if (selectDepartment.length === 0) return;
        setSelectApprove(
            ['No', 'Yes'].map((el, index) => ({
                id: index === 0 ? false : true,
                value: el,
                title: el,
            }))
        );
    }, [selectDepartment]);

    const filterButton = () => {
        const conditionArr = [
            selectApprove.length !== 0,
            selectDepartment.length !== 0,
            selectProcessName.length !== 0,
        ];
        if (conditionArr.some((v) => v === false)) return;
        const processIds = selectProcessName.map((x) => x.id);
        const departmentIds = selectDepartment.map((x) => x.id);
        const approveIds = selectApprove.map((x) => x.id);
        const filterData = subProcess[0].filter(
            (el) =>
                processIds.includes(el.parentProcessId) &&
                departmentIds.includes(el.departmantId) &&
                approveIds.includes(el.isApproveNecessary)
        );
        setFilterSubData([...filterData]);
    };
    const cancelFilterButton = () => {
        setFilterSubData(subProcess[0]);
        setSelectApprove([]);
        setSelectDepartment([]);
        setSelectProcessName([]);
    };

    const filterComponentsData = [
        {
            label: 'Process Name',
            options: parentProcess,
            state: selectProcessName,
            setState: setSelectProcessName,
        },
        {
            label: 'Department',
            options: departmentOptions,
            state: selectDepartment,
            setState: setSelectDepartment,
        },
        {
            label: 'Approve',
            options: ['No', 'Yes'].map((el, index) => ({
                id: index === 0 ? false : true,
                title: el,
            })),
            state: selectApprove,
            setState: setSelectApprove,
        },
    ];


    const [subTableData, setSubTableData] = useState([])
    

    useEffect(() => {
        setSubTableData(subProcess?.map((el, index) => ({
            id: el.id,
            processName: el.parentProcessTitle || '',
            subProcess: el.title || '',
            productAndProcessDepartment: el.departmantName || '',
            chainOfResponsiblePositionServiceCompany: el?.serviceCompanies?.join(', ') || '',
            chainOfResponsiblePositionRegionalOffice: el?.regionalOffices?.join(', ') || '',
            chainOfResponsiblePositionProductionSide: el?.productionSides?.join(', ') || '',
            sop: el.sop,
            approve: (
                <div className="form-check form-switch d-flex justify-content-center">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        defaultChecked
                        disabled
                    />
                </div>
            ),
            // actions: buttons[index].content,
        })))
    }, [subProcess])

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
                        <Button onClick={cancelFilterButton} variant="light">
                            {t('cancel')}
                        </Button>
                        <Button onClick={filterButton} variant="primary">
                            {t('apply')}
                        </Button>
                    </Col>
                </Row>
            ) : null}
            <TableAccordion
                data={subTableData}
                columns={columns}
                isShowNewBtn={true}
                isFilter={false}
                isCheckBox={false}
                handleNewButton={()=>setNewModal(true)}
            />
            {/* <MainTable
                tableData={subTableData}
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
                    seciliTab={seciliTab}
                    setDeleteModal={setDeleteModal}
                    subProcess={subProcess}
                    setSubProcess={setSubProcess}
                    parentProcess={parentProcess}
                    setParentProcess={setParentProcess}
                />
            )}
            {
                onModal && (
                    <Modal show={onModal} className="task-management__modal">
                    <Modal.Header>
                        <Modal.Title>{t(`Edit ${seciliTab}`)}</Modal.Title>
                        <button className="task-management__modal-close-btn" onClick={() => setOnModal(false)}>
                            <i className="dripicons-cross"></i>
                        </button>
                    </Modal.Header>
                    <Modal.Body className="p-0">
                        <UpdateSubProcess
                            updateSubProcess={updateSubProcess}
                            subProcess={subProcess}
                            seciliTab={seciliTab}
                            filterBtn={filterButton}
                            setFilterSubData={setFilterSubData}
                            setSubProcess={setSubProcess}
                            setUpdateSubProcess={setUpdateSubProcess}
                            parentProcess={parentProcess}
                            activityTypes={activityTypes}
                            setOnModal={setOnModal}
                            selectProcessName={selectProcessName}
                            selectDepartments={selectDepartment}
                            selectApprove={selectApprove}
                        />
                    </Modal.Body>
                </Modal>
                )
            }

            {
                showSopModal && (
                    <AddSopModal 
                        showAddModal={showSopModal}
                        setShowAddModal={setShowSopModal}
                        selectedItem={selectedItem}
                        subProcess={subProcess}
                        setSubProcess={setSubProcess}
                    />
                )
            }
        </>
    );
};

export default SubProcessTable;
