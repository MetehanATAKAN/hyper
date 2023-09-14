import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../components/MainTable';

const Table = (props) => {
    const { data, addModal, filters, closeFilter, setCloseFilter } = props;
    const { t } = useTranslation();
    const [columns, setColumns] = useState([
        { name: 'form', title: t('Form') },
        { name: 'formType', title: t('Form Type') },
        { name: 'abb', title: t('Abbreviation') },
        { name: 'unit', title: t('Unit') },
        { name: 'action', title: '-' },
    ]);

    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'form', width: '20%' },
        { columnName: 'formType', width: '20%' },
        { columnName: 'abb', width: '20%' },
        { columnName: 'unit', width: '30%' },
        { columnName: 'action', width: '5%' },
    ]);
    const [tableColumnExtensions] = useState([
        { columnName: 'form', width: 200 },
        { columnName: 'formType', width: 200 },
        { columnName: 'abb', width: 200 },
        { columnName: 'unit', width: 200 },
        { columnName: 'action', width: 200 },
    ]);
    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: t('Form'), columnName: 'form', width: 200 },
        { id: '2', isFreeze: false, content: t('Form Type'), columnName: 'formType', width: 200 },
        { id: '3', isFreeze: false, content: t('Abbreviation'), columnName: 'abb', width: 200 },
        { id: '4', isFreeze: false, content: t('Unit'), columnName: 'unit', width: 200 },
    ];
    const [groupByItems, setGroupByItems] = useState([
        { id: '1', isShow: true, content: t('Form'), columnName: 'form' },
        { id: '2', isShow: true, content: t('Form Type'), columnName: 'formType' },
        { id: '3', isShow: true, content: t('Abbreviation'), columnName: 'abb' },
        { id: '4', isShow: true, content: t('Unit'), columnName: 'unit' },
    ]);
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, title: t('Form'), name: 'form' },
        { isShow: true, title: t('Form Type'), name: 'formType' },
        { isShow: true, title: t('Abbreviation'), name: 'abb' },
        { isShow: true, title: t('Unit'), name: 'unit' },
    ]);
    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'form', width: 200 },
        { type: 'count', columnName: 'formType', width: 200 },
        { type: 'count', columnName: 'abb', width: 200 },
        { type: 'count', columnName: 'unit', width: 200 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'form', width: 200 },
        { type: 'count', columnName: 'formType', width: 200 },
        { type: 'count', columnName: 'abb', width: 200 },
        { type: 'count', columnName: 'unit', width: 200 },
    ]);
    const [columnOrders, setColumnOrders] = useState(['form', 'abb', 'formType', 'unit', 'action']);

    return (
        <div id="material-table">
            <MainTable
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
                filters={filters}
                isFilters={true}
                closeFilter={closeFilter}
                setCloseFilter={setCloseFilter}
            />
        </div>
    );
};

export default Table;
