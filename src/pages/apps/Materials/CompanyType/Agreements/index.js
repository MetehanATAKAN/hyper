import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Filter from '../../../../../components/Filter';
import Status from '../../../../../components/Status';
import {
    mdiPlus,
    mdiEyeOutline,
    mdiPencilBoxOutline,
    mdiTranslate,
    mdiSquareEditOutline,
    mdiLinkVariantOff,
    mdiMagnify
} from '@mdi/js';
import Icon from '@mdi/react';

import TableLayout from '../../../../../components/Tables';
import Dropdowns from '../../../../../components/Dropdowns';

import AddModal from './AddModal';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import Delete from './Delete';
import EditModal from './EditModal';

const Agreements = () => {
    const { t } = useTranslation();

    const [loader, setLoader] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [closeFilter, setCloseFilter] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [allData, setAllData] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const [showEditModal, setShowEditModal] = useState(false);

    const statusOptions = [
        {
            id: 9,
            key: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            color: '#6C757D',
        },
        {
            id: 0,
            key: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
    ]

    const statusClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );
        const statusId = Number(getIds[0]);
        const itemId = Number(getIds[1]);

        console.log(statusId, itemId)
        const item = allData.find(i => i.id === Number(itemId))
        setSelectedItem(item)
        if(Number(statusId) === 0){
            setShowDeleteModal(true);
        }else if(Number(statusId) === 9){
            setShowEditModal(true);
        }
    }

    const columns = [
        {
            header: t('Contract Number'),
            accessorKey: 'contractNumber',
            size: '230',
        },
        {
            header: t('Contract Start Date'),
            accessorKey: 'startDate',
            size: '200',
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: t('Contract Finish Date'),
            accessorKey: 'finishDate',
            size: '220',
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: t('Buyer'),
            accessorKey: 'buyer',
        },
        {
            header: t('Seller'),
            accessorKey: 'seller',
        },
        {
            header: t('Contract Currency'),
            accessorKey: 'contractCurrency',
            size: '200',
        },
        {
            header: t('Payment Terms'),
            accessorKey: 'paymentTerms',
            size: '180'
        },
        {
            header: t('Discount'),
            accessorKey: 'discount',
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: t('Incoterms'),
            accessorKey: 'incoterms',
        },
        {
            header: t('Details'),
            accessorKey: 'details',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: () => (
                <button style={{background: 'transparent', border: 'none'}}>
                    <Icon path={mdiMagnify} size={0.75} />
                </button>
            )
        },
        {
            header: '',
            accessorKey: 'action',
            size: '50',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ row }) => {
                return (
                    <Dropdowns
                        item={`?${row.original.id}`}
                        option={statusOptions}
                        onClick={statusClick}
                    />
                );
            },
        },
    ]

    const filterComponentsData = []

    const clearFilter = () => {}
    
    const applyFilter = () => {
        FetchApiPost('services/Material/Agreement/GetAgreementsForApply', 'POST', {})
            .then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setAllData(data)
                        setTableData(data.map(i => ({
                            id: i.id,
                            contractNumber: i.agreementNumber,
                            startDate: handleGetDate(i.startDate),
                            finishDate: handleGetDate(i.finishDate),
                            buyer: i.toCompany?.name, // seller ve buyer a company yi coydum ali abiye sor
                            seller: i.fromCompany?.name,
                            contractCurrency: i.currency.name, // buraya currency id geliyor adınında gelmesi lazım,
                            paymentTerms: i.paymentTerm,
                            discount: `${i.discount}%`,
                            incoterms: i.incoterm.name
                        })))
                    })
                }
            })
    }

    const handleGetDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    useEffect(() => {
        FetchApiPost('services/Material/Agreement/GetAgreementsForApply', 'POST', {})
            .then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setAllData(data)
                        setTableData(data.map(i => ({
                            id: i.id,
                            contractNumber: i.agreementNumber,
                            startDate: handleGetDate(i.startDate),
                            finishDate: handleGetDate(i.finishDate),
                            buyer: i.toCompany?.name, // seller ve buyer a company yi coydum ali abiye sor
                            seller: i.fromCompany?.name,
                            contractCurrency: i.currency.name, // buraya currency id geliyor adınında gelmesi lazım,
                            paymentTerms: i.paymentTerm,
                            discount: `${i.discount}%`,
                            incoterms: i.incoterm.name
                        })))
                    })
                }
            })
    }, [])
    
  return (
    <div>
         <TableLayout
                isLoading={loader}
                isNewButton={true}
                handleNewButton={setShowAddModal}
                isCheckBox={false}
                data={tableData}
                columns={columns}
                columnPinningRight={['action']}
                filterShow={closeFilter}
                setFilterShow={setCloseFilter}
                handlApplyBtn={applyFilter}
                handlClearBtn={clearFilter}
                filter={<Filter filterComponentsData={filterComponentsData} setCloseFilter={setCloseFilter} />}
            />

            {
                showAddModal && (
                    <AddModal 
                        showAddModal={showAddModal}
                        setShowAddModal={setShowAddModal}
                        applyFilter={applyFilter}
                    />
                )
            }

            {
                showDeleteModal && (
                    <Delete 
                        modalShow={showDeleteModal}
                        setModalShow={setShowDeleteModal}
                        item={selectedItem}
                        getFilterData={applyFilter}
                    />
                )
            }

            {
                showEditModal && (
                    <EditModal 
                        showAddModal={showEditModal}
                        setShowAddModal={setShowEditModal}
                        applyFilter={applyFilter}
                        selectedItem={selectedItem}
                    />
                  
                )
            }
    </div>
  )
}

export default Agreements