import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../components/MainTable';

const Table = (props) => {
    const { data, addModal } = props;
    const { t } = useTranslation();
    const [columns, setColumns] = useState([
        { name: 'surveyName', title: t('Survey Name') },
        { name: 'activities', title: t('Activities') },
        { name: 'category', title: t('Category') },
        { name: 'language', title: t('Language') },
        { name: 'design', title: t('Design') },
        { name: 'share', title: t('Share') },
        { name: 'creator', title: t('Creator') },
        { name: 'createDate', title: t('Create Date') },
        { name: 'updateDate', title: t('Update Date') },
        { name: 'status', title: t('Status') },
        { name: 'action', title: '-' },
    ]);

    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'surveyName', width: '15%' },
        { columnName: 'activities', width: '8%' },
        { columnName: 'category', width: '15%' },
        { columnName: 'language', width: '7%' },
        { columnName: 'design', width: '7%' },
        { columnName: 'share', width: '7%' },
        { columnName: 'creator', width: '12%' },
        { columnName: 'createDate', width: '10%' },
        { columnName: 'updateDate', width: '10%' },
        { columnName: 'status', width: '10%' },
        { columnName: 'action', width: '4%' },
    ]);
    const [tableColumnExtensions] = useState([
        { columnName: 'surveyName', width: 200 },
        { columnName: 'activities', width: 200 },
        { columnName: 'category', width: 200 },
        { columnName: 'language', width: 200 },
        { columnName: 'design', width: 200 },
        { columnName: 'share', width: 200 },
        { columnName: 'creator', width: 200 },
        { columnName: 'createDate', width: 200 },
        { columnName: 'updateDate', width: 200 },
        { columnName: 'status', width: 200 },
        { columnName: 'action', width: 50 },
    ]);
    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: t('Survey Name'), columnName: 'surveyName', width: 200 },
        { id: '2', isFreeze: false, content: t('Activities'), columnName: 'activities', width: 200 },
        { id: '3', isFreeze: false, content: t('Category'), columnName: 'category', width: 200 },
        { id: '4', isFreeze: false, content: t('Language'), columnName: 'language', width: 200 },
        { id: '5', isFreeze: false, content: t('Design'), columnName: 'design', width: 200 },
        { id: '6', isFreeze: false, content: t('Share'), columnName: 'share', width: 200 },
        { id: '7', isFreeze: false, content: t('Creator'), columnName: 'creator', width: 200 },
        { id: '8', isFreeze: false, content: t('Create Date'), columnName: 'createDate', width: 200 },
        { id: '9', isFreeze: false, content: t('Update Date'), columnName: 'updateDate', width: 200 },
        { id: '10', isFreeze: false, content: t('Status'), columnName: 'status', width: 200 },
    ];
    const [groupByItems, setGroupByItems] = useState([
        { id: '1', isShow: true, content: t('Survey Name'), columnName: 'surveyName' },
        { id: '2', isShow: true, content: t('Activities'), columnName: 'activities' },
        { id: '3', isShow: true, content: t('Category'), columnName: 'category' },
        { id: '4', isShow: true, content: t('Language'), columnName: 'language' },
        { id: '5', isShow: true, content: t('Design'), columnName: 'design' },
        { id: '6', isShow: true, content: t('Share'), columnName: 'share' },
        { id: '7', isShow: true, content: t('Creator'), columnName: 'creator' },
        { id: '8', isShow: true, content: t('Create Date'), columnName: 'createDate' },
        { id: '9', isShow: true, content: t('Update Date'), columnName: 'updateDate' },
        { id: '10', isShow: true, content: t('Status'), columnName: 'status' },
    ]);
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, title: t('Survey Name'), name: 'surveyName' },
        { isShow: true, title: t('Activities'), name: 'activities' },
        { isShow: true, title: t('Category'), name: 'category' },
        { isShow: true, title: t('Language'), name: 'language' },
        { isShow: true, title: t('Design'), name: 'design' },
        { isShow: true, title: t('Share'), name: 'share' },
        { isShow: true, title: t('Creator'), name: 'creator' },
        { isShow: true, title: t('Create Date'), name: 'createDate' },
        { isShow: true, title: t('Update Date'), name: 'updateDate' },
        { isShow: true, title: t('Status'), name: 'status' },
    ]);
    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'surveyName', width: 200 },
        { type: 'count', columnName: 'activities', width: 200 },
        { type: 'count', columnName: 'category', width: 200 },
        { type: 'count', columnName: 'language', width: 200 },
        { type: 'count', columnName: 'design', width: 200 },
        { type: 'count', columnName: 'share', width: 200 },
        { type: 'count', columnName: 'creator', width: 200 },
        { type: 'count', columnName: 'createDate', width: 200 },
        { type: 'count', columnName: 'updateDate', width: 200 },
        { type: 'count', columnName: 'status', width: 200 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'surveyName', width: 200 },
        { type: 'count', columnName: 'activities', width: 200 },
        { type: 'count', columnName: 'category', width: 200 },
        { type: 'count', columnName: 'language', width: 200 },
        { type: 'count', columnName: 'design', width: 200 },
        { type: 'count', columnName: 'share', width: 200 },
        { type: 'count', columnName: 'creator', width: 200 },
        { type: 'count', columnName: 'createDate', width: 200 },
        { type: 'count', columnName: 'updateDate', width: 200 },
        { type: 'count', columnName: 'status', width: 200 },
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
