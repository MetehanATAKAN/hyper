import React, { useState } from 'react'
import TableAccordion from '../../../../components/Tables/TableAccordion'
import { useTranslation } from 'react-i18next'
import Filter from './Filter';
import { Link, useHistory } from "react-router-dom";

const Table = ({
    tableData,
    setTableData
}) => {

    const { t } = useTranslation();
    const history = useHistory();

    const [showAddModal, setShowAddModal] = useState(false);

    const [filterShow, setFilterShow] = useState(true);

    const [applyFilter, setApplyFilter] = useState(false);

    const [clearFilter, setClearFilter] = useState(false);
    const [loading, setLoading] = useState(false);

    const columnsx = [
        {
            header: t('Year'),
            accessorKey: 'year',
            size: '75'
        },
        {
            header: t('Place'),
            accessorKey: 'place',
            size: '75'
        },
        {
            header: t('Place Type'),
            accessorKey: 'placeType',
            size: '75'
        },
        {
            header: t('Type Of Priority'),
            accessorKey: 'typeOfPriority',
            size: '75'
        },
        {
            header: t('Client Type'),
            accessorKey: 'clientType',
            size: '75'
        },
        {
            header: t('Specialization'),
            accessorKey: 'specialization',
            size: '75'
        },
        {
            header: t('Category'),
            accessorKey: 'category',
            size: '75',
            muiTableBodyCellProps: {
                align: 'center',
            }
        },
        {
            header: t('V.FRQ'),
            accessorKey: 'vfrq',
            size: '75',
            muiTableBodyCellProps: {
                align: 'left',
            }
        },
        {
            header: t('DTBS'),
            accessorKey: 'dtbs',
            size: '75',
            muiTableBodyCellProps: {
                align: 'left',
            }
        },
        {
            header: t('PC T.'),
            accessorKey: 'pct',
            size: '75',
            muiTableBodyCellProps: {
                align: 'left',
            }
        },
        {
            header: t('V.Q.'),
            accessorKey: 'vq',
            size: '75',
            muiTableBodyCellProps: {
                align: 'left',
            }
        },
        {
            header: t('V.SHR.'),
            accessorKey: 'vshr',
            size: '75',
            muiTableBodyCellProps: {
                align: 'left',
            }
        },
        {
            header: t('P.SHR.'),
            accessorKey: 'pshr',
            size: '75',
            muiTableBodyCellProps: {
                align: 'left',
            }
        },
        {
            header: t('MIX'),
            accessorKey: 'mix',
            size: '75',
            muiTableBodyCellProps: {
                align: 'center',
            }
        },
    ]

    const prePlanPage = () => history.push('/apps/marketing/visitmix/pre-plan');
  return (
    <div>
        <TableAccordion
                    data={tableData}
                    columns={columnsx}
                    isAccordion={true}
                    handleNewButton={() => setShowAddModal(true)}
                    filterShow={filterShow}
                    setFilterShow={setFilterShow}
                    isCheckBox={false}
                    isShowNewBtn={false}
                    handlApplyBtn={()=>setApplyFilter(true)}
                    prePlanButton={true}
                    prePlanFunc={prePlanPage}
                    handlClearBtn={() => setClearFilter(true)}
                    isLoading={loading}
                    filter={
                    <Filter 
                    applyFilter={applyFilter}
                    clearFilter={clearFilter}
                    setApplyFilter={setApplyFilter}
                    setClearFilter={setClearFilter}
                    setTableData={setTableData}
                    setLoading={setLoading}
                     />}
                />
    </div>
  )
}

export default Table