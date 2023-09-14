import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../components/MainTable';

const Table = (props) => {
    const { data, addModal } = props;
    const { t } = useTranslation();
    const [columns, setColumns] = useState([
        { name: 'unit', title: t('Unit') },
        { name: 'action', title: '-' },
    ]);

    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'unit', width: '90%' },
        { columnName: 'action', width: '5%' },
    ]);
    const [tableColumnExtensions] = useState([
        { columnName: 'unit', width: 200 },
        { columnName: 'action', width: 200 },
    ]);
    const itemsFromBackend = [{ id: '1', isFreeze: false, content: t('Unit'), columnName: 'unit', width: 200 }];
    const [groupByItems, setGroupByItems] = useState([
        { id: '1', isShow: true, content: t('Unit'), columnName: 'unit' },
    ]);
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, title: t('Unit'), name: 'unit' },
    ]);
    const [totalSummaryItems, setTotalSummaryItems] = useState([{ type: 'count', columnName: 'unit', width: 200 }]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([{ type: 'count', columnName: 'unit', width: 200 }]);
    const [columnOrders, setColumnOrders] = useState(['unit', 'action']);

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
