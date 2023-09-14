import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../../components/MainTable';
import TableAccordion from '../../../../../components/Tables/TableAccordion';

const MainCategoryTable = (props) => {
    const { data, addModal } = props;
    const { t } = useTranslation();
    
    const columns = [
        {
            header: t('Main Category'),
            accessorKey: 'mainCategory',
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
            filterShow={false}
            handleNewButton={addModal}
            isShowNewBtn={true}
            isBulkButtons={true}

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
            /> */}
        </div>
    );
};

export default React.memo(MainCategoryTable);
