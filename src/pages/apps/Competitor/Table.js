import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../components/MainTable';

const Table = (props) => {
    const { data, filters, closeFilter, setCloseFilter } = props;
    const { t } = useTranslation();
    const [columns, setColumns] = useState([
        { name: 'product', title: t('Product') },
        { name: 'competitorBrand', title: t('Competitor Brand') },
        { name: 'sellerCountry', title: t('Seller Country') },
        { name: 'seller', title: t('Seller') },
        { name: 'manufacturCountry', title: t('Manufactur Country') },
        { name: 'manufacturer', title: t('Manufacturer') },
        { name: 'countryForUse', title: t('Country For use') },
        { name: 'materialName', title: t('Material Name') },
        { name: 'packingForm', title: t('Packing Form') },
        { name: 'details', title: t('Details') },
        { name: 'valid', title: t('Valid') },
        { name: 'status', title: t('Status') },
        { name: 'action', title: '-' },
    ]);

    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'product', width: '10%' },
        { columnName: 'competitorBrand', width: '13%' },
        { columnName: 'sellerCountry', width: '13%' },
        { columnName: 'seller', width: '13%' },
        { columnName: 'manufacturCountry', width: '12%' },
        { columnName: 'manufacturer', width: '15%' },
        { columnName: 'countryForUse', width: '12%' },
        { columnName: 'materialName', width: '25%' },
        { columnName: 'packingForm', width: '19%' },
        { columnName: 'details', width: '8%' },
        { columnName: 'valid', width: '8%' },
        { columnName: 'status', width: '12%' },
        { columnName: 'action', width: '25px' },
    ]);
    const [tableColumnExtensions] = useState([
        { columnName: 'product', width: 200 },
        { columnName: 'competitorBrand', width: 200 },
        { columnName: 'sellerCountry', width: 200 },
        { columnName: 'seller', width: 200 },
        { columnName: 'manufacturCountry', width: 200 },
        { columnName: 'manufacturer', width: 200 },
        { columnName: 'countryForUse', width: 200 },
        { columnName: 'materialName', width: 200 },
        { columnName: 'packingForm', width: 200 },
        { columnName: 'details', width: 200 },
        { columnName: 'valid', width: 200 },
        { columnName: 'status', width: 200 },
        { columnName: 'action', width: 50 },
    ]);
    const itemsFromBackend = [
        { id: '1', isFreeze: true, content: 'Product', columnName: 'product', width: 200 },
        { id: '2', isFreeze: true, content: 'Competitor Brand', columnName: 'competitorBrand', width: 200 },
        { id: '3', isFreeze: true, content: 'Seller Country', columnName: 'sellerCountry', width: 200 },
        { id: '4', isFreeze: true, content: 'Seller', columnName: 'seller', width: 200 },
        { id: '5', isFreeze: false, content: 'Manufactur Country', columnName: 'manufacturCountry', width: 200 },
        { id: '6', isFreeze: false, content: 'Manufacturer', columnName: 'manufacturer', width: 200 },
        { id: '7', isFreeze: false, content: 'Country For use', columnName: 'countryForUse', width: 200 },
        { id: '8', isFreeze: false, content: 'Material Name', columnName: 'materialName', width: 200 },
        { id: '9', isFreeze: false, content: 'Packing Form', columnName: 'packingForm', width: 200 },
        { id: '10', isFreeze: false, content: 'Details', columnName: 'details', width: 200 },
        { id: '11', isFreeze: false, content: 'Valid', columnName: 'valid', width: 200 },
        { id: '12', isFreeze: false, content: 'Status', columnName: 'status', width: 200 },
        { id: '13', isFreeze: true, content: '-', columnName: 'action', width: 200 },
    ];
    const [groupByItems, setGroupByItems] = useState([
        { id: '1', isShow: true, columnName: 'product', content: t('Product') },
        { id: '2', isShow: true, columnName: 'competitorBrand', content: t('Competitor Brand') },
        { id: '3', isShow: true, columnName: 'sellerCountry', content: t('Seller Country') },
        { id: '4', isShow: true, columnName: 'seller', content: t('Seller') },
        { id: '5', isShow: true, columnName: 'manufacturCountry', content: t('Manufactur Country') },
        { id: '6', isShow: true, columnName: 'manufacturer', content: t('Manufacturer') },
        { id: '7', isShow: true, columnName: 'countryForUse', content: t('Country For use') },
        { id: '8', isShow: true, columnName: 'materialName', content: t('Material Name') },
        { id: '9', isShow: true, columnName: 'packingForm', content: t('Packing Form') },
        { id: '10', isShow: true, columnName: 'details', content: t('Details') },
        { id: '11', isShow: true, columnName: 'Valid', content: t('Valid') },
        { id: '12', isShow: true, columnName: 'status', content: t('Status') },
    ]);
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'product', title: t('Product') },
        { isShow: true, name: 'competitorBrand', title: t('Competitor Brand') },
        { isShow: true, name: 'sellerCountry', title: t('Seller Country') },
        { isShow: true, name: 'seller', title: t('Seller') },
        { isShow: true, name: 'manufacturCountry', title: t('Manufactur Country') },
        { isShow: true, name: 'manufacturer', title: t('Manufacturer') },
        { isShow: true, name: 'countryForUse', title: t('Country For use') },
        { isShow: true, name: 'materialName', title: t('Material Name') },
        { isShow: true, name: 'packingForm', title: t('Packing Form') },
        { isShow: true, name: 'details', title: t('Details') },
        { isShow: true, name: 'valid', title: t('Valid') },
        { isShow: true, name: 'status', title: t('Status') },
    ]);
    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'product', width: 200 },
        { type: 'count', columnName: 'competitorBrand', width: 200 },
        { type: 'count', columnName: 'sellerCountry', width: 200 },
        { type: 'count', columnName: 'seller', width: 200 },
        { type: 'count', columnName: 'manufacturCountry', width: 200 },
        { type: 'count', columnName: 'manufacturer', width: 200 },
        { type: 'count', columnName: 'countryForUse', width: 200 },
        { type: 'count', columnName: 'materialName', width: 200 },
        { type: 'count', columnName: 'packingForm', width: 200 },
        { type: 'count', columnName: 'details', width: 50 },
        { type: 'count', columnName: 'valid', width: 50 },
        { type: 'count', columnName: 'status', width: 50 },
        { type: 'count', columnName: 'action', width: 50 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'product', width: 200 },
        { type: 'count', columnName: 'competitorBrand', width: 200 },
        { type: 'count', columnName: 'sellerCountry', width: 200 },
        { type: 'count', columnName: 'seller', width: 200 },
        { type: 'count', columnName: 'manufacturCountry', width: 200 },
        { type: 'count', columnName: 'manufacturer', width: 200 },
        { type: 'count', columnName: 'countryForUse', width: 200 },
        { type: 'count', columnName: 'materialName', width: 200 },
        { type: 'count', columnName: 'packingForm', width: 200 },
        { type: 'count', columnName: 'details', width: 50 },
        { type: 'count', columnName: 'valid', width: 50 },
        { type: 'count', columnName: 'status', width: 50 },
        { type: 'count', columnName: 'action', width: 50 },
    ]);
    const [columnOrders, setColumnOrders] = useState([
        'Product',
        'Competitor Brand',
        'Seller Country',
        'Seller',
        'Manufactur Country',
        'Manufacturer',
        'Country For use',
        'Material Name',
        'Packing Form',
        'Details',
        'Valid',
        'Status',
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
                closeFilter={closeFilter}
                setCloseFilter={setCloseFilter}
                filters={filters}
                isFilters={true}
            />
        </div>
    );
};

export default Table;
