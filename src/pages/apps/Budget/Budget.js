import Tippy from '@tippyjs/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SendIcon from '../../../components/Icons/SendIcon';
import Approve from './ActionModals/Approve';
import Delete from './ActionModals/Delete';
import Reject from './ActionModals/Reject';
import NewModal from './NewButtonModal/index';
import {
    statusApprovalOptions,
    statusApprovedOptions,
    statusOptions,
    statusRedactOptions,
    statusRejectOptions,
} from './Status';
import Table from './Table';
import Update from './Update';
import Dropdowns from '../../../components/Dropdowns';

const BudgetTab = (props) => {
    const {
        showNewModal,
        setShowNewModal,
        filterComponentsData,
        applyBudgetFilter,
        budgetData,
        setBudgetData,
        clearFilter,
        loader,
    } = props;
    const { t } = useTranslation();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [actionModalData, setActionModalData] = useState({});
    const [budgetId, setBudgetId] = useState(0);

    const getStatusOptions = (id) => {
        switch (id) {
            case 1:
                return statusRedactOptions;
            case 2:
                return statusApprovalOptions;
            case 3:
                return statusApprovedOptions;
            case 4:
                return statusRejectOptions;
            default:
                break;
        }
    };

    const columns = [
        { accessorKey: 'year', header: t('Year'), size: 100 },
        { accessorKey: 'company', header: t('Company') },
        { accessorKey: 'department', header: t('Department') },
        {
            accessorKey: 'position',
            header: t('Position'),
            Cell: ({ cell }) => (
                <span
                    style={
                        cell.getValue() === '-'
                            ? {
                                  color: 'orange',
                                  fontSize: '24px',
                                  fontWeight: 'bold',
                                  display: 'flex',
                                  justifyContent: 'center',
                              }
                            : {}
                    }>
                    {cell.getValue()}
                </span>
            ),
        },
        {
            accessorKey: 'pl',
            header: t('P&L'),
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <span>{cell.getValue()}</span>
                </Tippy>
            ),
        },
        {
            accessorKey: 'accountGroup',
            header: t('Account Group'),
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <span>{cell.getValue()}</span>
                </Tippy>
            ),
        },
        {
            accessorKey: 'accountCost',
            header: t('Account Cost'),
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <span>{cell.getValue()}</span>
                </Tippy>
            ),
        },
        {
            accessorKey: 'serviceOrMaterial',
            header: t('Service or Material'),
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <span>{cell.getValue()}</span>
                </Tippy>
            ),
        },
        {
            accessorKey: 'technicalInfo',
            header: t('Technical info'),
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <span>{cell.getValue()}</span>
                </Tippy>
            ),
        },
        {
            accessorKey: 'description',
            header: t('Description of the aim and value of'),
            size: 290,
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <span>{cell.getValue()}</span>
                </Tippy>
            ),
        },
        {
            accessorKey: 'quantity',
            header: t('Quantity'),
            Cell: ({ cell }) => <span className="quatity">{cell.getValue()}</span>,
        },
        { accessorKey: 'budgetType', header: t('Budget Type') },
        { accessorKey: 'procurementAnalize', header: t('Procurement Analize') },
        {
            accessorKey: 'currency',
            header: t('Currency'),
            Cell: ({ cell }) => <span className="currency">{cell.getValue()}</span>,
        },
        {
            accessorKey: 'jan',
            header: t('Jan'),
            Cell: ({ cell }) => <span className="month-currency">{cell.getValue()}</span>,
        },
        {
            accessorKey: 'feb',
            header: t('Feb'),
            Cell: ({ cell }) => <span className="month-currency">{cell.getValue()}</span>,
        },
        {
            accessorKey: 'mar',
            header: t('Mar'),
            Cell: ({ cell }) => <span className="month-currency">{cell.getValue()}</span>,
        },
        {
            accessorKey: 'apr',
            header: t('Apr'),
            Cell: ({ cell }) => <span className="month-currency">{cell.getValue()}</span>,
        },
        {
            accessorKey: 'may',
            header: t('May'),
            Cell: ({ cell }) => <span className="month-currency">{cell.getValue()}</span>,
        },
        {
            accessorKey: 'jun',
            header: t('Jun'),
            Cell: ({ cell }) => <span className="month-currency">{cell.getValue()}</span>,
        },
        {
            accessorKey: 'jul',
            header: t('Jul'),
            Cell: ({ cell }) => <span className="month-currency">{cell.getValue()}</span>,
        },
        {
            accessorKey: 'aug',
            header: t('Aug'),
            Cell: ({ cell }) => <span className="month-currency">{cell.getValue()}</span>,
        },
        {
            accessorKey: 'sep',
            header: t('Sep'),
            Cell: ({ cell }) => <span className="month-currency">{cell.getValue()}</span>,
        },
        {
            accessorKey: 'oct',
            header: t('Oct'),
            Cell: ({ cell }) => <span className="month-currency">{cell.getValue()}</span>,
        },
        {
            accessorKey: 'nov',
            header: t('Nov'),
            Cell: ({ cell }) => <span className="month-currency">{cell.getValue()}</span>,
        },
        {
            accessorKey: 'Dec',
            header: t('Dec'),
            Cell: ({ cell }) => <span className="month-currency">{cell.getValue()}</span>,
        },
        {
            accessorKey: 'total',
            header: t('Total'),
            Cell: ({ cell }) => <span className="total">{cell.getValue()}</span>,
        },
        {
            accessorKey: 'status',
            header: t('Status'),
            Cell: ({ cell }) => (
                <span
                    style={
                        cell.getValue() === 1 //Edit
                            ? {
                                  backgroundColor: '#6C757D',
                                  color: '#fff',
                              }
                            : cell.getValue() === 2 //'Approval'
                            ? {
                                  backgroundColor: '#FFBC00',
                                  color: '#fff',
                              }
                            : cell.getValue() === 3 //'Approved'
                            ? {
                                  backgroundColor: '#0ACF97',
                                  color: '#fff',
                              }
                            : cell.getValue() === 4 // Reject
                            ? {
                                  backgroundColor: '#FA5C7C',
                                  color: '#fff',
                              }
                            : {}
                    }
                    className="full-cell">
                    {cell.getValue() === 1 && (
                        <span style={{ display: 'flex', columnGap: '8px' }}>
                            <i className="fas fa-pen"></i> {t('Redact')}{' '}
                        </span>
                    )}
                    {cell.getValue() === 2 && (
                        <span style={{ display: 'flex', columnGap: '8px' }}>
                            <SendIcon /> {t('Approval')}
                        </span>
                    )}
                    {cell.getValue() === 3 && (
                        <span style={{ display: 'flex', columnGap: '8px' }}>
                            <i className="fas fa-check"></i> {t('Approved')}{' '}
                        </span>
                    )}
                    {cell.getValue() === 4 && (
                        <span style={{ display: 'flex', columnGap: '8px' }}>
                            <i className="fas fa-exclamation"></i> {t('Reject')}{' '}
                        </span>
                    )}
                </span>
            ),
        },
        {
            accessorKey: 'action',
            header: '',
            size: 50,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableColumnActions: false,
            Cell: ({ cell, row }) => {
                return (
                    <Dropdowns
                        item={`?${row.original.budgetId}`}
                        option={getStatusOptions(cell.getValue())}
                        onClick={dropDownItemClick}
                    />
                );
            },
        },
    ];
    const dropDownItemClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );
        const selectedStatus = statusOptions.find((el) => el.id === Number(getIds[0]));
        setBudgetId(Number(getIds[1]));
        switch (Number(getIds[0])) {
            case 0:
                setShowDeleteModal(true);
                break;
            case 1:
            case 2:
            case 3:
                setShowActionModal(true);
                setActionModalData({
                    itemId: Number(getIds[1]),
                    selectedStatus: selectedStatus,
                });
                break;
            case 4:
                setActionModalData({
                    itemId: Number(getIds[1]),
                    selectedStatus: selectedStatus,
                });
                return setShowRejectModal(true);
            case 9:
                setShowUpdateModal(true);
                break;
            default:
                break;
        }
    };

    const tableData = budgetData?.map((el, i) => ({
        budgetId: el.budgetId,
        year: el.yearId,
        company: el.companyName,
        department: el.departmentName,
        position: el.positionName,
        pl: el.pandLName,
        accountGroup: el.accountGroupName,
        accountCost: el.accountCostCenterName,
        serviceOrMaterial: el.materialName,
        technicalInfo: el.technicalInfo,
        description: el.description,
        quantity: el.quantitySum,
        budgetType: el.budgetType,
        procurementAnalize: el.procurmentType,
        currency: el.currencyName,
        jan: el.detail[0].sum,
        feb: el.detail[1].sum,
        mar: el.detail[2].sum,
        apr: el.detail[3].sum,
        may: el.detail[4].sum,
        jun: el.detail[5].sum,
        jul: el.detail[6].sum,
        aug: el.detail[7].sum,
        sep: el.detail[8].sum,
        oct: el.detail[9].sum,
        nov: el.detail[10].sum,
        Dec: el.detail[11].sum,
        total: el.sum,
        status: el.statusId,
        action: el.statusId,
    }));
    return (
        <>
            <Table
                columns={columns}
                data={tableData}
                filterComponentsData={filterComponentsData}
                applyBudgetFilter={applyBudgetFilter}
                clearFilter={clearFilter}
                loader={loader}
            />

            {showNewModal && (
                <NewModal
                    showModal={showNewModal}
                    setShowModal={setShowNewModal}
                    applyBudgetFilter={applyBudgetFilter}
                />
            )}
            {showActionModal && (
                <Approve
                    modalShow={showActionModal}
                    setModalShow={setShowActionModal}
                    item={actionModalData}
                    applyBudgetFilter={applyBudgetFilter}
                />
            )}
            {showDeleteModal && (
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    budgetId={budgetId}
                    budgetData={budgetData}
                    setBudgetData={setBudgetData}
                />
            )}
            {showRejectModal && (
                <Reject
                    modalShow={showRejectModal}
                    setModalShow={setShowRejectModal}
                    item={actionModalData}
                    applyBudgetFilter={applyBudgetFilter}
                />
            )}
            {showUpdateModal && (
                <Update
                    header="Update Budget"
                    showModal={showUpdateModal}
                    setShowModal={setShowUpdateModal}
                    applyBudgetFilter={applyBudgetFilter}
                    budgetId={budgetId}
                />
            )}
        </>
    );
};

export default React.memo(BudgetTab);
