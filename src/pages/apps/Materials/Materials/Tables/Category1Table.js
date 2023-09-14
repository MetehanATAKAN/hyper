import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../../components/MainTable';
import TableAccordion from '../../../../../components/Tables/TableAccordion';

const Category1Table = (props) => {
    const { data, addModal, filters, closeFilter, setCloseFilter,clearFilter,applyFilter } = props;
    const { t } = useTranslation();

    const [filterShow, setFilterShow] = useState(true);
    
    const columns = [
        {
            header: t('Main Category'),
            accessorKey: 'mainCategory',
            size: '170'
        },
        {
            header: t('Category'),
            accessorKey: 'category',
            size: '170'
        },
        {
            header: t('Category Sub 1'),
            accessorKey: 'categorySub1',
            size: '170'
        },
        {
            header: t('Abbreviation'),
            accessorKey: 'abb',
            size: '170'
        },
        {
            header: t('Technical Info'),
            accessorKey: 'technicalInfo',
            size: '170'
        },
        {
            header: t(' '),
            accessorKey: 'action',
            size: '50',
            muiTableBodyCellProps: {
                align: 'center',
            },
        }
    ];

    return (
        <div id="material-table">
           <TableAccordion
            data={data}
            columns={columns}
            filterShow={filterShow}
            setFilterShow={setFilterShow}
            handleNewButton={addModal}
            isShowNewBtn={true}
            isBulkButtons={true}
            filter={filters}
             handlClearBtn={clearFilter}
             handlApplyBtn={applyFilter}
            />
            {/* <MainTable
                tableData={data}
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
                isAddButton={true}
                addButtonFunction={addModal}
                closeFilter={closeFilter}
                setCloseFilter={setCloseFilter}
                filters={filters}
                isFilters={true}
            /> */}
        </div>
    );
};

export default React.memo(Category1Table);
