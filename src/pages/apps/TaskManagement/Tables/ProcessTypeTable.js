import React, { useState } from 'react';
import MainTable from '../../../../components/MainTable';
import { useTranslation } from 'react-i18next';
import DeleteItemModal from '../DeleteItemModal';
import UpdateProcessTypeModal from '../UpdateProcessTypeModal';
import { Modal, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import TableAccordion from '../../../../components/Tables/TableAccordion';
import Dropdowns from '../../../../components/Dropdowns';
const ProcessTypeTable = ({
    processType,
    setProcessType,
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
    setNewModal,
    activityTypeFilteredDatas,jobDescriptionFilteredDatas,businessProcessFilteredDatas,processFilteredDatas,
 setActivityTypeFilteredDatas,setJobDescriptionFilteredDatas,setBusinessProcessFilteredDatas,setProcessFilteredDatas
}) => {
    const { t } = useTranslation();
    const [updateProcessType, setUpdateProcessType] = useState({});
    const [onModal, setOnModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ modalStatus: false, item: {} });
    
    const handleActivityTypeChange = (value) => {
        console.log(value);
        setUpdateProcessType(value);
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
        setUpdateProcessType(obj);
        setOnModal(true);
       }
    }

    const selectRow = (id) => {
       const obj = processType?.find(data => data?.id === id);
       return obj;
    }

    const isDisabledRow = (id) => {
        const obj = processType?.find(data => data?.id === id);
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

    // const popover = (props) => (
    //     <Popover id="popover-basic" {...props}>
    //         <Popover.Body>{props}</Popover.Body>
    //     </Popover>
    // );
    // const buttons = processType.map((process, index) => ({
    //     id: index,
    //     content: (
    //         <span className="task-management-table-column__icons">
    //             <OverlayTrigger placement="top" trigger="hover" overlay={popover(t('Update'))}>
    //                 <button id={process.id} onClick={() => handleActivityTypeChange(process)}>
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

    const processTableData = processType.map((el, index) => ({
        id: el.id,
        processType: (
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

    return (
        <>

                <TableAccordion
                data={processTableData}
                columns={columns}
                isShowNewBtn={true}
                isFilter={false}
                isCheckBox={false}
                handleNewButton={()=>setNewModal(true)}
            />
            {/* <MainTable
                tableData={processTableData}
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
                    processType={processType}
                    setProcessType={setProcessType}
                />
            )}

            {
                onModal && (
                    <UpdateProcessTypeModal
                    activityTypes={activityTypes}
                    setActivityTypes={setActivityTypes}
                    processType={processType}
                    setProcessType={setProcessType}
                    updateProcessType={updateProcessType}
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
                )
            }
        </>
    );
};

export default ProcessTypeTable;
