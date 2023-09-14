import React from 'react';
import { Dropdown } from 'react-bootstrap';
import NewModal from './NewButtonModal/index';
import { Input } from 'antd';
import Table from './Table';
import 'antd/dist/antd.css';
import SendIcon from '../../../components/Icons/SendIcon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    statusApprovalOptions,
    statusApprovedOptions,
    statusOptions,
    statusRedactOptions,
    statusRejectOptions,
} from './Status';
import Approve from './ActionModals/Approve';
import Delete from './ActionModals/Delete';
import { FetchApiPost } from '../../../utils/http.helper';
import Reject from './ActionModals/Reject';
import Update from './Update';
import Tippy from '@tippyjs/react';
import Dropdowns from '../../../components/Dropdowns';

const Quatity = (props) => {
    const {
        showNewModal,
        setShowNewModal,
        filterComponentsData,
        clearFilter,
        budgetData,
        setBudgetData,
        applyBudgetFilter,
        detailData,
        setDetailData,
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
        { accessorKey: 'jan', header: t('Jan') },
        { accessorKey: 'feb', header: t('Feb') },
        { accessorKey: 'mar', header: t('Mar') },
        { accessorKey: 'apr', header: t('Apr') },
        { accessorKey: 'may', header: t('May') },
        { accessorKey: 'jun', header: t('Jun') },
        { accessorKey: 'jul', header: t('Jul') },
        { accessorKey: 'aug', header: t('Aug') },
        { accessorKey: 'sep', header: t('Sep') },
        { accessorKey: 'oct', header: t('Oct') },
        { accessorKey: 'nov', header: t('Nov') },
        { accessorKey: 'Dec', header: t('Dec') },
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
    const monthInputChange = (e, budgetIds, monthId, price) => {
        const arr2 = detailData?.map((item, i) =>
            item.map((el, idx) => {
                if (Number(el.budgetId) === Number(budgetIds) && Number(el.monthId) === Number(monthId)) {
                    return { ...el, quantity: Number(e.target.value) };
                }
                return el;
            })
        );
        setDetailData(arr2);
        const data = {
            budgetId: budgetIds,
            monthId: monthId,
            price: price,
            quantity: Number(e.target.value),
        };
        FetchApiPost('services/Budget/Budget/SaveBudgetDetail', 'POST', data)
            .then((res) => {
                if (res.status === 201) {
                    applyBudgetFilter();
                }
            })
            .catch((err) => console.log(err));
    };

    const tableData = budgetData
        ?.filter((item) => item.quantityStatus !== false)
        ?.map((el, i) => ({
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
            jan: (
                <Input
                    onChange={(e) =>
                        monthInputChange(e, detailData[i][0].budgetId, detailData[i][0].monthId, detailData[i][0].price)
                    }
                    placeholder="-"
                    value={detailData.length !== 0 && detailData[i][0].quantity}
                    type="number"
                    name="jan"
                    size="small"
                    style={{ textAlign: 'right' }}
                    disabled={detailData.length !== 0 && detailData[i][0].disabled === 'disable' && true}
                />
            ),
            feb: (
                <Input
                    onChange={(e) =>
                        monthInputChange(e, detailData[i][1].budgetId, detailData[i][1].monthId, detailData[i][1].price)
                    }
                    placeholder="-"
                    value={detailData.length !== 0 && detailData[i][1].quantity}
                    type="number"
                    name="jan"
                    size="small"
                    style={{ textAlign: 'right' }}
                    disabled={detailData.length !== 0 && detailData[i][1].disabled === 'disable' && true}
                />
            ),
            mar: (
                <Input
                    onChange={(e) =>
                        monthInputChange(e, detailData[i][2].budgetId, detailData[i][2].monthId, detailData[i][2].price)
                    }
                    placeholder="-"
                    value={detailData.length !== 0 && detailData[i][2].quantity}
                    type="number"
                    name="jan"
                    size="small"
                    style={{ textAlign: 'right' }}
                    disabled={detailData.length !== 0 && detailData[i][2].disabled === 'disable' && true}
                />
            ),
            apr: (
                <Input
                    onChange={(e) =>
                        monthInputChange(e, detailData[i][3].budgetId, detailData[i][3].monthId, detailData[i][3].price)
                    }
                    placeholder="-"
                    value={detailData.length !== 0 && detailData[i][3].quantity}
                    type="number"
                    name="jan"
                    size="small"
                    style={{ textAlign: 'right' }}
                    disabled={detailData.length !== 0 && detailData[i][3].disabled === 'disable' && true}
                />
            ),
            may: (
                <Input
                    onChange={(e) =>
                        monthInputChange(e, detailData[i][4].budgetId, detailData[i][4].monthId, detailData[i][4].price)
                    }
                    placeholder="-"
                    value={detailData.length !== 0 && detailData[i][4].quantity}
                    type="number"
                    name="jan"
                    size="small"
                    style={{ textAlign: 'right' }}
                    disabled={detailData.length !== 0 && detailData[i][4].disabled && true}
                />
            ),
            jun: (
                <Input
                    onChange={(e) =>
                        monthInputChange(e, detailData[i][5].budgetId, detailData[i][5].monthId, detailData[i][5].price)
                    }
                    placeholder="-"
                    value={detailData.length !== 0 && detailData[i][5].quantity}
                    type="number"
                    name="jan"
                    size="small"
                    style={{ textAlign: 'right' }}
                    disabled={detailData.length !== 0 && detailData[i][5].disabled === 'disable' && true}
                />
            ),
            jul: (
                <Input
                    onChange={(e) =>
                        monthInputChange(e, detailData[i][6].budgetId, detailData[i][6].monthId, detailData[i][6].price)
                    }
                    placeholder="-"
                    value={detailData.length !== 0 && detailData[i][6].quantity}
                    type="number"
                    name="jan"
                    size="small"
                    style={{ textAlign: 'right' }}
                    disabled={detailData.length !== 0 && detailData[i][6].disabled === 'disable' && true}
                />
            ),
            aug: (
                <Input
                    onChange={(e) =>
                        monthInputChange(e, detailData[i][7].budgetId, detailData[i][7].monthId, detailData[i][7].price)
                    }
                    placeholder="-"
                    value={detailData.length !== 0 && detailData[i][7].quantity}
                    type="number"
                    name="jan"
                    size="small"
                    style={{ textAlign: 'right' }}
                    disabled={detailData.length !== 0 && detailData[i][7].disabled === 'disable' && true}
                />
            ),
            sep: (
                <Input
                    onChange={(e) =>
                        monthInputChange(e, detailData[i][8].budgetId, detailData[i][8].monthId, detailData[i][8].price)
                    }
                    placeholder="-"
                    value={detailData.length !== 0 && detailData[i][8].quantity}
                    type="number"
                    name="jan"
                    size="small"
                    style={{ textAlign: 'right' }}
                    disabled={detailData.length !== 0 && detailData[i][8].disabled === 'disable' && true}
                />
            ),
            oct: (
                <Input
                    onChange={(e) =>
                        monthInputChange(e, detailData[i][9].budgetId, detailData[i][9].monthId, detailData[i][9].price)
                    }
                    placeholder="-"
                    value={detailData.length !== 0 && detailData[i][9].quantity}
                    type="number"
                    name="jan"
                    size="small"
                    style={{ textAlign: 'right' }}
                    disabled={detailData.length !== 0 && detailData[i][9].disabled === 'disable' && true}
                />
            ),
            nov: (
                <Input
                    onChange={(e) =>
                        monthInputChange(
                            e,
                            detailData[i][10].budgetId,
                            detailData[i][10].monthId,
                            detailData[i][10].price
                        )
                    }
                    placeholder="-"
                    value={detailData.length !== 0 && detailData[i][10].quantity}
                    type="number"
                    name="jan"
                    size="small"
                    style={{ textAlign: 'right' }}
                    disabled={detailData.length !== 0 && detailData[i][10].disabled === 'disable' && true}
                />
            ),
            Dec: (
                <Input
                    onChange={(e) =>
                        monthInputChange(
                            e,
                            detailData[i][11].budgetId,
                            detailData[i][11].monthId,
                            detailData[i][11].price
                        )
                    }
                    placeholder="-"
                    value={detailData.length !== 0 && detailData[i][11].quantity}
                    type="number"
                    name="jan"
                    size="small"
                    style={{ textAlign: 'right' }}
                    disabled={detailData.length !== 0 && detailData[i][11].disabled === 'disable' && true}
                />
            ),
            total: el.quantitySum,
            status: el.statusId,
            action: el.statusId,
        }));

    return (
        <>
            <Table
                columns={columns}
                data={tableData}
                filterComponentsData={filterComponentsData}
                clearFilter={clearFilter}
                applyBudgetFilter={applyBudgetFilter}
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
                    header="Update Quantity"
                    showModal={showUpdateModal}
                    setShowModal={setShowUpdateModal}
                    applyBudgetFilter={applyBudgetFilter}
                    budgetId={budgetId}
                />
            )}
        </>
    );
};

export default React.memo(Quatity);
