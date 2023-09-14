import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../components/MainTable';

const Table = (props) => {
    const { data, addModal } = props;
    const { t } = useTranslation();
    const [columns, setColumns] = useState([
        { name: 'categoryName', title: t('Category Name') },
        { name: 'description', title: t('Description') },
        { name: 'action', title: '-' },
    ]);

    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'categoryName', width: '45%' },
        { columnName: 'description', width: '48%' },
        { columnName: 'action', width: '4%' },
    ]);
    const [tableColumnExtensions] = useState([
        { columnName: 'categoryName', width: 200 },
        { columnName: 'description', width: 200 },
        { columnName: 'action', width: 50 },
    ]);
    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Category Name', columnName: 'categoryName', width: 200 },
        { id: '2', isFreeze: false, content: 'Description', columnName: 'description', width: 200 },
    ];
    const [groupByItems, setGroupByItems] = useState([
        { id: '1', isShow: true, columnName: 'categoryName', content: t('Category Name') },
        { id: '2', isShow: true, columnName: 'description', content: t('Description') },
    ]);
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'categoryName', title: 'Category Name' },
        { isShow: true, name: 'description', title: t('Description') },
    ]);
    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'categoryName', width: 200 },
        { type: 'count', columnName: 'description', width: 200 },
        { type: 'count', columnName: 'action', width: 50 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'categoryName', width: 200 },
        { type: 'count', columnName: 'description', width: 200 },
        { type: 'count', columnName: 'action', width: 50 },
    ]);
    const [columnOrders, setColumnOrders] = useState(['categoryName', 'description', 'action']);

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
            />
        </div>
    );
};

export default Table;
