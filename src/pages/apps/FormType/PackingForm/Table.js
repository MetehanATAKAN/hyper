import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../components/MainTable';

const Table = (props) => {
    const { data, addModal, filters, closeFilter, setCloseFilter } = props;
    const { t } = useTranslation();
    const [columns, setColumns] = useState([
        { name: 'mainForm', title: t('Main Form') },
        { name: 'inside', title: t('Inside One') },
        { name: 'cassete', title: t('Cassette') },
        { name: 'total', title: t('Total') },
        { name: 'empty', title: t('.') },
        { name: 'empty2', title: t('.') },
        { name: 'assistForm', title: t('Assist Form') },
        { name: 'insideTwo', title: t('Inside One') },
        { name: 'casseteTwo', title: t('Cassette') },
        { name: 'totalTwo', title: t('Total') },
        { name: 'action', title: '-' },
    ]);

    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'mainForm', width: '22%' },
        { columnName: 'inside', width: '8%' },
        { columnName: 'cassete', width: '8%' },
        { columnName: 'total', width: '7%' },
        { columnName: 'assistForm', width: '20%' },
        { columnName: 'insideTwo', width: '8%' },
        { columnName: 'casseteTwo', width: '8%' },
        { columnName: 'totalTwo', width: '8%' },
        { columnName: 'action', width: '4%' },
        { columnName: 'empty', width: '13px' },
        { columnName: 'empty2', width: '13px' },
    ]);
    const [tableColumnExtensions] = useState([
        { columnName: 'mainForm', width: 200 },
        { columnName: 'inside', width: 200 },
        { columnName: 'cassete', width: 200 },
        { columnName: 'total', width: 200 },
        { columnName: 'assistForm', width: 200 },
        { columnName: 'insideTwo', width: 200 },
        { columnName: 'casseteTwo', width: 200 },
        { columnName: 'totalTwo', width: 200 },
        { columnName: 'action', width: 200 },
    ]);
    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: t('Main Form'), columnName: 'form', width: 200 },
        { id: '2', isFreeze: false, content: t('Inside'), columnName: 'inside', width: 200 },
        { id: '3', isFreeze: false, content: t('Cassette'), columnName: 'cassete', width: 200 },
        { id: '4', isFreeze: false, content: t('Total'), columnName: 'total', width: 200 },
        { id: '5', isFreeze: false, content: t('Assist Form'), columnName: 'assistForm', width: 200 },
        { id: '6', isFreeze: false, content: t('Inside'), columnName: 'insideTwo', width: 200 },
        { id: '7', isFreeze: false, content: t('Cassette'), columnName: 'casseteTwo', width: 200 },
        { id: '8', isFreeze: false, content: t('Total'), columnName: 'totalTwo', width: 200 },
    ];
    const [groupByItems, setGroupByItems] = useState([
        { id: '1', isShow: true, content: t('Main Form'), columnName: 'form' },
        { id: '2', isShow: true, content: t('Inside'), columnName: 'inside' },
        { id: '3', isShow: true, content: t('Cassette'), columnName: 'cassete' },
        { id: '4', isShow: true, content: t('Total'), columnName: 'total' },
        { id: '5', isShow: true, content: t('Assist Form'), columnName: 'assistForm' },
        { id: '6', isShow: true, content: t('Inside'), columnName: 'insideTwo' },
        { id: '7', isShow: true, content: t('Cassette'), columnName: 'casseteTwo' },
        { id: '8', isShow: true, content: t('Total'), columnName: 'totalTwo' },
    ]);
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, title: t('Main Form'), name: 'form' },
        { isShow: true, title: t('Inside'), name: 'inside' },
        { isShow: true, title: t('Cassette'), name: 'cassete' },
        { isShow: true, title: t('Total'), name: 'total' },
        { isShow: true, title: t('Assist Form'), name: 'assistForm' },
        { isShow: true, title: t('Inside'), name: 'insideTwo' },
        { isShow: true, title: t('Cassette'), name: 'casseteTwo' },
        { isShow: true, title: t('Total'), name: 'totalTwo' },
    ]);
    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'form', width: 200 },
        { type: 'count', columnName: 'inside', width: 200 },
        { type: 'count', columnName: 'cassete', width: 200 },
        { type: 'count', columnName: 'total', width: 200 },
        { type: 'count', columnName: 'assistForm', width: 200 },
        { type: 'count', columnName: 'insideTwo', width: 200 },
        { type: 'count', columnName: 'casseteTwo', width: 200 },
        { type: 'count', columnName: 'totalTwo', width: 200 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'form', width: 200 },
        { type: 'count', columnName: 'inside', width: 200 },
        { type: 'count', columnName: 'cassete', width: 200 },
        { type: 'count', columnName: 'total', width: 200 },
        { type: 'count', columnName: 'assistForm', width: 200 },
        { type: 'count', columnName: 'insideTwo', width: 200 },
        { type: 'count', columnName: 'casseteTwo', width: 200 },
        { type: 'count', columnName: 'totalTwo', width: 200 },
    ]);
    const [columnOrders, setColumnOrders] = useState([
        'mainForm',
        'inside',
        'cassete',
        'total',
        'empty',
        'assistForm',
        'insideTwo',
        'casseteTwo',
        'totalTwo',
        'empty2',
        'action',
    ]);

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
                isFilters={true}
                filters={filters}
                closeFilter={closeFilter}
                setCloseFilter={setCloseFilter}
            />
        </div>
    );
};

export default Table;
