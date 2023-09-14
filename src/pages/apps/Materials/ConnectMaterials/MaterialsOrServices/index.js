import React, { useState, useEffect } from 'react'
import MainTable from '../../../../../components/MainTable';
import { Dropdown } from 'react-bootstrap';
import '../../../../../assets/scss/custom/components/pageList.scss';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import AddModal from './AddModal/AddModal';
import Filter from '../Filter';
import UpdateModal from './UpdateModal/UpdateModal';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Delete from '../Delete';


const MaterialsOrServices = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const [addModal, setAddModal] = useState(false);

    const [updateItem, setUpdateItem] = useState();
    const [updateModalIsShow, setUpdateModalIsShow] = useState(false);

    const [closeFilter, setCloseFilter] = useState(false);

    const [deleteItem, setDeleteItem] = useState();
    const [deleteModalIsShow, setDeleteModalIsShow] = useState(false);
    

    const [columns] = useState([
        { name: 'countryFor', title: t('Country for') },
        { name: 'companies', title: t('Companies') },
        { name: 'mainType', title: t('Main Type') },
        { name: 'type', title: t('Type') },
        { name: 'assetsType', title: t('Assets Type') },
        { name: 'dutiesType', title: t('Duties Type') },
        { name: 'materialUsage', title: t('Material Usage') },
        { name: 'materialOrServices', title: t('Material or Services') },
        { name: 'materialOrServicesType', title: t('Materials or Services Type') },
        { name: 'modelOrForm', title: t('Model or Form') },
        { name: 'measure', title: t('Measure') },
        { name: 'sMoq', title: t('S MOQ') },
        { name: 'shelflife', title: t('Shelflife') },
        { name: 'batchsize', title: t('Batchsize') },
        { name: 'lastOffer', title: t('Last Offer') },
        { name: 'paymentTerms', title: t('Payment Terms') },
        { name: 'discount', title: t('Discount') },
        { name: 'startDate', title: t('Start Date') },
        { name: 'licenseStatus', title: t('Licence Status') },
        { name: 'currency', title: t('Currency') },
        { name: 'fees', title: t('Fees') },
        { name: 'documentation', title: t('Documentation') },
        { name: 'deliveryLead', title: t('Delivery Lead') },
        { name: 'sample', title: t('Sample') },
        { name: 'coA', title: t('CoA') },
        { name: 'consigment', title: t('Consigment') },
        { name: 'incoterms', title: t('Incoterms') },
        { name: 'shippingInstraction', title: t('Shipping Instraction') },
        { name: 'purchasingNote', title: t('Purchasing Note') },
        { name: 'procurementNote', title: t('Procurement Note') },
        { name: 'actions', title: ' ' },
    ]);

    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'countryFor', width: "10%" },
        { columnName: 'companies', width: "14%" },
        { columnName: 'mainType', width: "12%" },
        { columnName: 'type', width: "12%" },
        { columnName: 'assetsType', width: "12%" },
        { columnName: 'dutiesType', width: "12%" },
        { columnName: 'materialUsage', width: "12%" },
        { columnName: 'materialOrServices', width: "16%" },
        { columnName: 'materialOrServicesType', width: "13%" },
        { columnName: 'modelOrForm', width: "16%" },
        { columnName: 'measure', width: "8%" },
        { columnName: 'sMoq', width: "8%" },
        { columnName: 'shelflife', width: "8%" },
        { columnName: 'batchsize', width: "8%" },
        { columnName: 'lastOffer', width: "11%" },
        { columnName: 'paymentTerms', width: "15%" },
        { columnName: 'discount', width: "7%" },
        { columnName: 'startDate', width: "8%" },
        { columnName: 'licenseStatus', width: "9%" },
        { columnName: 'currency', width: "8%" },
        { columnName: 'fees', width: "8%" },
        { columnName: 'documentation', width: "10%" },
        { columnName: 'deliveryLead', width: "10%" },
        { columnName: 'sample', width: "7%" },
        { columnName: 'coA', width: "16%" },
        { columnName: 'consigment', width: "16%" },
        { columnName: 'incoterms', width: "16%" },
        { columnName: 'shippingInstraction', width: "16%" },
        { columnName: 'purchasingNote', width: "16%" },
        { columnName: 'procurementNote', width: "16%" },
        { columnName: 'actions', width: "4%" },
    ]);

    const [tableColumnExtensions] = useState([
        { columnName: 'countryFor', width: 100 },
        { columnName: 'companies', width: 100 },
        { columnName: 'mainType', width: 100 },
        { columnName: 'type', width: 100 },
        { columnName: 'assetsType', width: 100 },
        { columnName: 'dutiesType', width: 100 },
        { columnName: 'materialUsage', width: 100 },
        { columnName: 'materialOrServices', width: 100 },
        { columnName: 'materialOrServicesType', width: 100 },
        { columnName: 'modelOrForm', width: 100 },
        { columnName: 'measure', width: 100 },
        { columnName: 'sMoq', width: 100 },
        { columnName: 'shelflife', width: 100 },
        { columnName: 'batchsize', width: 100 },
        { columnName: 'lastOffer', width: 100 },
        { columnName: 'paymentTerms', width: 100 },
        { columnName: 'discount', width: 100 },
        { columnName: 'startDate', width: 100 },
        { columnName: 'licenseStatus', width: 100 },
        { columnName: 'currency', width: 100 },
        { columnName: 'fees', width: 100 },
        { columnName: 'documentation', width: 100 },
        { columnName: 'deliveryLead', width: 100 },
        { columnName: 'sample', width: 100 },
        { columnName: 'coA', width: 100 },
        { columnName: 'consigment', width: 100 },
        { columnName: 'incoterms', width: 100 },
        { columnName: 'shippingInstraction', width: 100 },
        { columnName: 'purchasingNote', width: 100 },
        { columnName: 'procurementNote', width: 100 },
        { columnName: 'actions', width: 100 },
    ]);

    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Country for', columnName: 'countryFor', width: 100 },
        { id: '2', isFreeze: false, content: 'Companies', columnName: 'companies', width: 100 },
        { id: '3', isFreeze: false, content: 'Main Type', columnName: 'mainType', width: 100 },
        { id: '4', isFreeze: false, content: 'Type', columnName: 'type', width: 100 },
        { id: '5', isFreeze: false, content: 'Assets Type', columnName: 'assetsType', width: 100 },
        { id: '6', isFreeze: false, content: 'Duties Type', columnName: 'dutiesType', width: 100 },
        { id: '7', isFreeze: false, content: 'Material Usage', columnName: 'materialUsage', width: 100 },
        { id: '8', isFreeze: false, content: 'Material or Services', columnName: 'materialOrServices', width: 100 },
        { id: '9', isFreeze: false, content: 'Material or Services Type', columnName: 'materialOrServicesType', width: 100 },
        { id: '10', isFreeze: false, content: 'Model or Form', columnName: 'modelOrForm', width: 100 },
        { id: '11', isFreeze: false, content: 'Measure', columnName: 'measure', width: 100 },
        { id: '12', isFreeze: false, content: 'S Moq', columnName: 'sMoq', width: 100 },
        { id: '13', isFreeze: false, content: 'Shelflife', columnName: 'shelflife', width: 100 },
        { id: '14', isFreeze: false, content: 'Batchsize', columnName: 'batchsize', width: 100 },
        { id: '15', isFreeze: false, content: 'Last Offer', columnName: 'lastOffer', width: 100 },
        { id: '16', isFreeze: false, content: 'Payment Terms', columnName: 'paymentTerms', width: 100 },
        { id: '17', isFreeze: false, content: 'Discount', columnName: 'discount', width: 100 },
        { id: '18', isFreeze: false, content: 'Start Date', columnName: 'startDate', width: 100 },
        { id: '19', isFreeze: false, content: 'License Status', columnName: 'licenseStatus', width: 100 },
        { id: '20', isFreeze: false, content: 'Currency', columnName: 'currency', width: 100 },
        { id: '21', isFreeze: false, content: 'Fees', columnName: 'fees', width: 100 },
        { id: '22', isFreeze: false, content: 'Documentation', columnName: 'documentation', width: 100 },
        { id: '23', isFreeze: false, content: 'Delivery Lead', columnName: 'deliveryLead', width: 100 },
        { id: '24', isFreeze: false, content: 'Sample', columnName: 'sample', width: 100 },
        { id: '25', isFreeze: false, content: 'CoA', columnName: 'coA', width: 100 },
        { id: '26', isFreeze: false, content: 'Consigment', columnName: 'consigment', width: 100 },
        { id: '27', isFreeze: false, content: 'Incoterms', columnName: 'incoterms', width: 100 },
        { id: '28', isFreeze: false, content: 'Shipping Instraction', columnName: 'shippingInstraction', width: 100 },
        { id: '29', isFreeze: false, content: 'Purchasing Note', columnName: 'purchasingNote', width: 100 },
        { id: '30', isFreeze: false, content: 'Procurement Note', columnName: 'procurementNote', width: 100 }
    ];

    const [groupByItems, setGroupByItems] = useState([
        { id: '0', isShow: true, columnName: 'countryFor', content: t('Country for') },
        { id: '1', isShow: true, columnName: 'companies', content: t('Companies') },
        { id: '2', isShow: true, columnName: 'mainType', content: t('Main Type') },
        { id: '3', isShow: true, columnName: 'type', content: t('Type') },
        { id: '4', isShow: true, columnName: 'assetsType', content: t('Assets Type') },
        { id: '5', isShow: true, columnName: 'dutiesType', content: t('Duties Type') },
        { id: '6', isShow: true, columnName: 'materialUsage', content: t('Material Usage') },
        { id: '7', isShow: true, columnName: 'materialOrServices', content: t('Material Or Services') },
        { id: '8', isShow: true, columnName: 'materialOrServicesType', content: t('Material Or Services Type') },
        { id: '9', isShow: true, columnName: 'modelOrForm', content: t('Model or Form') },
        { id: '10', isShow: true, columnName: 'measure', content: t('Measure') },
        { id: '11', isShow: true, columnName: 'sMoq', content: t('S Moq') },
        { id: '12', isShow: true, columnName: 'shelflife', content: t('Shelflife') },
        { id: '13', isShow: true, columnName: 'batchsize', content: t('Batchsize') },
        { id: '14', isShow: true, columnName: 'lastOffer', content: t('Last Offer') },
        { id: '15', isShow: true, columnName: 'paymentTerms', content: t('Payment Terms') },
        { id: '16', isShow: true, columnName: 'discount', content: t('Discount') },
        { id: '17', isShow: true, columnName: 'startDate', content: t('Start Date') },
        { id: '18', isShow: true, columnName: 'licenseStatus', content: t('License Status') },
        { id: '19', isShow: true, columnName: 'currency', content: t('Currency') },
        { id: '20', isShow: true, columnName: 'fees', content: t('Fees') },
        { id: '21', isShow: true, columnName: 'documentation', content: t('Documentation') },
        { id: '22', isShow: true, columnName: 'deliveryLead', content: t('Delivery Lead') },
        { id: '23', isShow: true, columnName: 'sample', content: t('Sample') },
        { id: '24', isShow: true, columnName: 'coA', content: t('CoA') },
        { id: '25', isShow: true, columnName: 'consigment', content: t('Consigment') },
        { id: '26', isShow: true, columnName: 'incoterms', content: t('Incoterms') },
        { id: '27', isShow: true, columnName: 'shippingInstraction', content: t('Shipping Instraction') },
        { id: '28', isShow: true, columnName: 'purchasingNote', content: t('Purchasing Note') },
        { id: '29', isShow: true, columnName: 'procurementNote', content: t('Procurement Note') },
    ]);

    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'countryFor', title: t('Country for') },
        { isShow: true, name: 'companies', title: t('Companies') },
        { isShow: true, name: 'mainType', title: t('Main Type') },
        { isShow: true, name: 'type', title: t('Type') },
        { isShow: true, name: 'assetsType', title: t('Assets Type') },
        { isShow: true, name: 'dutiesType', title: t('Duties Type') },
        { isShow: true, name: 'materialUsage', title: t('Material Usage') },
        { isShow: true, name: 'materialOrServices', title: t('Material or Services') },
        { isShow: true, name: 'materialOrServicesType', title: t('Material or Services Type') },
        { isShow: true, name: 'modelOrForm', title: t('Model or Form') },
        { isShow: true, name: 'measure', title: t('Measure') },
        { isShow: true, name: 'sMoq', title: t('S Moq') },
        { isShow: true, name: 'shelflife', title: t('Shelflife') },
        { isShow: true, name: 'batchsize', title: t('Batchsize') },
        { isShow: true, name: 'lastOffer', title: t('Last Offer') },
        { isShow: true, name: 'paymentTerms', title: t('Payment Terms') },
        { isShow: true, name: 'discount', title: t('Discount') },
        { isShow: true, name: 'startDate', title: t('Start Date') },
        { isShow: true, name: 'licenseStatus', title: t('License Status') },
        { isShow: true, name: 'currency', title: t('Currency') },
        { isShow: true, name: 'fees', title: t('Fees') },
        { isShow: true, name: 'documentation', title: t('Documentation') },
        { isShow: true, name: 'deliveryLead', title: t('Delivery Lead') },
        { isShow: true, name: 'sample', title: t('Sample') },
        { isShow: true, name: 'coA', title: t('CoA') },
        { isShow: true, name: 'consigment', title: t('Consigment') },
        { isShow: true, name: 'incoterms', title: t('Incoterms') },
        { isShow: true, name: 'shippingInstraction', title: t('Shipping Instraction') },
        { isShow: true, name: 'purchasingNote', title: t('Purchasing Note') },
        { isShow: true, name: 'procurementNote', title: t('Procurement Note') },
    ]);

    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'countryFor', columnName: 'Country for', width: 150 },
        { type: 'companies', columnName: 'Companies', width: 150 },
        { type: 'mainType', columnName: 'Main Type', width: 150 },
        { type: 'type', columnName: 'Type', width: 150 },
        { type: 'assetsType', columnName: 'Assets Type', width: 150 },
        { type: 'dutiesType', columnName: 'Duties Type', width: 150 },
        { type: 'materialUsage', columnName: 'Material Usage', width: 150 },
        { type: 'materialOrServices', columnName: 'Material or Services', width: 150 },
        { type: 'materialOrServicesType', columnName: 'Material or Services Type', width: 150 },
        { type: 'modelOrForm', columnName: 'Model or Form', width: 150 },
        { type: 'measure', columnName: 'Measure', width: 150 },
        { type: 'sMoq', columnName: 'S Moq', width: 150 },
        { type: 'shelflife', columnName: 'Shelflife', width: 150 },
        { type: 'batchsize', columnName: 'Batchsize', width: 150 },
        { type: 'lastOffer', columnName: 'Last Offer', width: 150 },
        { type: 'paymentTerms', columnName: 'Payment Terms', width: 150 },
        { type: 'discount', columnName: 'Discount', width: 150 },
        { type: 'startDate', columnName: 'Start Date', width: 150 },
        { type: 'licenseStatus', columnName: 'License Status', width: 150 },
        { type: 'currency', columnName: 'Currency', width: 150 },
        { type: 'fees', columnName: 'Fees', width: 150 },
        { type: 'documentation', columnName: 'Documentation', width: 150 },
        { type: 'deliveryLead', columnName: 'Delivery Lead', width: 150 },
        { type: 'sample', columnName: 'Sample', width: 150 },
        { type: 'coA', columnName: 'CoA', width: 150 },
        { type: 'consigment', columnName: 'Consigment', width: 150 },
        { type: 'incoterms', columnName: 'Incoterms', width: 150 },
        { type: 'shippingInstraction', columnName: 'Shipping Instraction', width: 150 },
        { type: 'purchasingNote', columnName: 'Purchasing Note', width: 150 },
        { type: 'procurementNote', columnName: 'Procurement Note', width: 150 },
        { type: 'actions', columnName: 'Actions', width: 150 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'countryFor', width: 150 },
        { type: 'count', columnName: 'companies', width: 150 },
        { type: 'count', columnName: 'mainType', width: 150 },
        { type: 'count', columnName: 'type', width: 150 },
        { type: 'count', columnName: 'assetsType', width: 150 },
        { type: 'count', columnName: 'dutiesType', width: 150 },
        { type: 'count', columnName: 'materialUsage', width: 150 },
        { type: 'count', columnName: 'materialOrServices', width: 150 },
        { type: 'count', columnName: 'materialOrServicesType', width: 150 },
        { type: 'count', columnName: 'modelOrForm', width: 150 },
        { type: 'count', columnName: 'measure', width: 150 },
        { type: 'count', columnName: 'sMoq', width: 150 },
        { type: 'count', columnName: 'shelflife', width: 150 },
        { type: 'count', columnName: 'batchsize', width: 150 },
        { type: 'count', columnName: 'lastOffer', width: 150 },
        { type: 'count', columnName: 'paymentTerms', width: 150 },
        { type: 'count', columnName: 'discount', width: 150 },
        { type: 'count', columnName: 'startDate', width: 150 },
        { type: 'count', columnName: 'licenseStatus', width: 150 },
        { type: 'count', columnName: 'currency', width: 150 },
        { type: 'count', columnName: 'fees', width: 150 },
        { type: 'count', columnName: 'documentation', width: 150 },
        { type: 'count', columnName: 'deliveryLead', width: 150 },
        { type: 'count', columnName: 'sample', width: 150 },
        { type: 'count', columnName: 'coA', width: 150 },
        { type: 'count', columnName: 'consigment', width: 150 },
        { type: 'count', columnName: 'incoterms', width: 150 },
        { type: 'count', columnName: 'shippingInstraction', width: 150 },
        { type: 'count', columnName: 'purchasingNote', width: 150 },
        { type: 'count', columnName: 'procurementNote', width: 150 },
        { type: 'count', columnName: 'actions', width: 150 },
    ]);

    const [columnOrders, setColumnOrders] = useState(['countryFor', 'companies', 'mainType', 'type', 'assetsType', 'dutiesType', 'materialUsage', 'materialOrServices', 'materialOrServicesType', 'modelOrForm', 'measure', 'sMoq', 'shelflife', 'batchsize', 'lastOffer', 'paymentTerms', 'discount', 'startDate', 'licenseStatus', 'currency', 'fees', 'documentation', 'deliveryLead', 'sample', 'coA', 'consigment', 'incoterms', 'shippingInstraction', 'purchasingNote', 'procurementNote', 'actions']);

    const [filterData, setFilterData] = useState([
        // {
        //     id: 1,
        //     countryFor: 'USA',
        //     companies: 'Company 1',
        //     mainType: 'Main Type 1',
        //     type: 'Type 1',
        //     assetsType: 'Assets Type 1',
        //     dutiesType: 'Duties Type 1',
        //     materialUsage: 'Material Usage 1',
        //     materialOrServices: 'Material or Services 1',
        //     materialOrServicesType: 'Material or Services Type 1',
        //     modelOrForm: 'Model or Form 1',
        //     measure: 'Measure 1',
        //     sMoq: 'S Moq 1',
        //     shelflife: 'Shelflife 1',
        //     batchsize: 'Batchsize 1',
        //     lastOffer: 'Last Offer 1',
        //     paymentTerms: 'Payment Terms 1',
        //     discount: 'Discount 1',
        //     startDate: 'Start Date 1',
        //     licenseStatus: 'License Status 1',
        //     currency: 'Currency 1',
        //     fees: 'Fees 1',
        //     documentation: 'Documentation 1',
        //     deliveryLead: 'Delivery Lead 1',
        //     sample: 'Sample 1',
        //     coA: 'CoA 1',
        //     consigment: 'Consigment 1',
        //     incoterms: 'Incoterms 1',
        //     shippingInstraction: 'Shipping Instraction 1',
        //     purchasingNote: 'Purchasing Note 1',
        //     procurementNote: 'Procurement Note 1'
        // }
    ]);

    const [countryOptions, setCountryOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [companiesOptions, setCompaniesOptions] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [mainTypeOptions, setMainTypeOptions] = useState([]);
    const [selectedMainType, setSelectedMainType] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);
    const [selectedType, setSelectedType] = useState([]);
    const [assetsTypeOptions, setAssetsTypeOptions] = useState([]);
    const [selectedAssetsType, setSelectedAssetsType] = useState([]);
    const [dutiesTypeOptions, setDutiesTypeOptions] = useState([]);
    const [selectedDutiesType, setSelectedDutiesType] = useState([]);
    const [materialUsageOptions, setMaterialUsageOptions] = useState([]);
    const [selectedMaterialUsage, setSelectedMaterialUsage] = useState([]);
    const [materialOrServicesOptions, setMaterialOrServicesOptions] = useState([]);
    const [selectedMaterialOrServices, setSelectedMaterialOrServices] = useState([]);
    const [materialOrServicesTypeOptions, setMaterialOrServicesTypeOptions] = useState([]);
    const [selectedMaterialOrServicesType, setSelectedMaterialOrServicesType] = useState([]);
    const [modelOrFormOptions, setModelOrFormOptions] = useState([]);
    const [selectedModelOrForm, setSelectedModelOrForm] = useState([]);
    const [measureOptions, setMeasureOptions] = useState([]);
    const [selectedMeasure, setSelectedMeasure] = useState([]);
    const [lastOfferOptions, setLastOfferOptions] = useState([]);
    const [selectedLastOffer, setSelectedLastOffer] = useState([]);
    const [createDate, setCreateDate] = useState([]);
    const [selectedCreateDate, setSelectedCreateDate] = useState([]);
    const [licenceStatusOptions, setLicenceStatusOptions] = useState([]);
    const [selectedLicenceStatus, setSelectedLicenceStatus] = useState([]);
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState([]);
    const [sampleOptions, setSampleOptions] = useState([]);
    const [selectedSample, setSelectedSample] = useState([]);

    const filterComponentsData = [
        { label: 'Country', options: countryOptions, state: selectedCountry, setState: setSelectedCountry },
        { label: 'Companies', options: companiesOptions, state: selectedCompanies, setState: setSelectedCompanies },
        { label: 'Main Type', options: mainTypeOptions, state: selectedMainType, setState: setSelectedMainType },
        { label: 'Type', options: typeOptions, state: selectedType, setState: setSelectedType },
        { label: 'Assets Type', options: assetsTypeOptions, state: selectedAssetsType, setState: setSelectedAssetsType },
        { label: 'Duties Type', options: dutiesTypeOptions, state: selectedDutiesType, setState: setSelectedDutiesType },
        { label: 'Material Usage Facility', options: materialUsageOptions, state: selectedMaterialUsage, setState: setSelectedMaterialUsage },
        { label: 'Material or Services', options: materialOrServicesOptions, state: selectedMaterialOrServices, setState: setSelectedMaterialOrServices },
        { label: 'Material or Services Type', options: materialOrServicesTypeOptions, state: selectedMaterialOrServicesType, setState: setSelectedMaterialOrServicesType },
        { label: 'Model or Form', options: modelOrFormOptions, state: selectedModelOrForm, setState: setSelectedModelOrForm },
        { label: 'Measure', options: measureOptions, state: selectedMeasure, setState: setSelectedMeasure },
        { label: 'Last Offer', options: lastOfferOptions, state: selectedLastOffer, setState: setSelectedLastOffer },
        { label: 'Create Date', options: createDate, state: selectedCreateDate, setState: setSelectedCreateDate },
        { label: 'Licence Status', options: licenceStatusOptions, state: selectedLicenceStatus, setState: setSelectedLicenceStatus },
        { label: 'Currency', options: currencyOptions, state: selectedCurrency, setState: setSelectedCurrency },
        { label: 'Sample', options: sampleOptions, state: selectedSample, setState: setSelectedSample }
    ];

    useEffect(() => {
        FetchApiGet('api/OldSystem/GetAllCountries', 'GET')
              .then(res => {
                  if(res.status === 200){
                      res.json().then(data => {
                          setSelectedCountry(data.map(c =>{
                              return { value: c.CountryId, label: c.CountryName }
                          }))
                          setCountryOptions(data.map(c =>{
                              return { value: c.CountryId, label: c.CountryName }
                          }))
                      })
                  } else if(res.status === 500){
                      history.push('/error-500');
                  }
              })
      }, [history])

      // get companies
      useEffect(() => {
        const selectedCountryIds = selectedCountry.map((c) => c.value);
        if(selectedCountryIds.length > 0){
            FetchApiPost('services/Material/Company/GetCompaniesByCountryIds', 'POST', {
                countryIds: selectedCountry.map((c) => c.value),
                }).then((res) => {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            setCompaniesOptions(
                                data.data.map((c) => {
                                    return { value: c.id, label: c.name };
                                })
                            );
                            setSelectedCompanies(
                                data.data.map((c) => {
                                    return { value: c.id, label: c.name };
                                })
                            );
                        });
                    } else if (res.status === 500) {
                        history.push('/error-500');
                    }
                });
        }else{
            setCompaniesOptions([])
            setSelectedCompanies([])
        }
      }, [history, selectedCountry])

      // main assets type duties facility
      useEffect(() => {
        const selectedCompanyIds = selectedCompanies.map((c) => c.value)
        if(selectedCompanyIds.length > 0){
        FetchApiPost('services/Material/Company/GetCompaniesByCompanyIds', 'POST', {
            companyIds: selectedCompanyIds,
        })
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => {

                        let mainTypeArray = []
                        
                        data?.data?.map((main) => 
                        main?.mainTypes.map((t) => {
                            mainTypeArray.filter(abb => abb.value === t.id).length === 0 && mainTypeArray.push({ value: t.id, label: t.name })
                        }))
                        setMainTypeOptions(mainTypeArray)
                        setSelectedMainType(mainTypeArray)

                        let typeArray = []
                        
                        data?.data?.map((main) => 
                        main?.types.map((t) => {
                            typeArray.filter(abb => abb.value === t.id).length === 0 && typeArray.push({ value: t.id, label: t.name })
                        }))
                        setTypeOptions(typeArray)
                        setSelectedType(typeArray)

                        let assetsTypeArray = []
                        
                        data?.data?.map((main) => 
                        main?.assetsTypes.map((t) => {
                            assetsTypeArray.filter(abb => abb.value === t.id).length === 0 && assetsTypeArray.push({ value: t.id, label: t.name })
                        }))
                        setAssetsTypeOptions(assetsTypeArray)
                        setSelectedAssetsType(assetsTypeArray)

                        let dutiesArray = []
                        
                        data?.data?.map((main) => 
                        main?.dutiesTypes.map((t) => {
                            dutiesArray.filter(abb => abb.value === t.id).length === 0 && dutiesArray.push({ value: t.id, label: t.name })
                        }))
                        setDutiesTypeOptions(dutiesArray)
                        setSelectedDutiesType(dutiesArray)

                        let materialUsageArray = []
                        
                        data?.data?.map((main) => 
                        main?.facilities.map((t) => {
                            materialUsageArray.filter(abb => abb.value === t.id).length === 0 && materialUsageArray.push({ value: t.id, label: t.name })
                        }))
                        setMaterialUsageOptions(materialUsageArray)
                        setSelectedMaterialUsage(materialUsageArray)
                    })
                }
            })
        }else{
            setMainTypeOptions([])
            setSelectedMainType([])
            setTypeOptions([])
            setSelectedType([])
            setAssetsTypeOptions([])
            setSelectedAssetsType([])
            setDutiesTypeOptions([])
            setSelectedDutiesType([])
            setMaterialUsageOptions([])
            setSelectedMaterialUsage([])
        }
      }, [history, selectedCompanies])

      useEffect(() => {
        FetchApiGet('services/Material/MaterialOrServices/GetAllMaterialOrServices', 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setSelectedMaterialOrServices(data.data.map(m => {
                            return { value: m.id, label: m.name }
                        }))
                        setMaterialOrServicesOptions(data.data.map(m => {
                            return { value: m.id, label: m.name }
                        }))
                    })
                }
            })
      }, [history])

      useEffect(() => {
        const selectedMaterialOrServicesIds = selectedMaterialOrServices.map(m => m.value)
        if(selectedMaterialOrServicesIds.length > 0){
            FetchApiPost('services/Material/MaterialOrServicesType/GetMaterialOrServicesTypeByMaterialIds', 'POST', {
                materialIds: selectedMaterialOrServices.map(m => m.value)
            }).then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setMaterialOrServicesTypeOptions(data.data.map(m => {
                            return { value: m.id, label: m.name }
                        }))
                        setSelectedMaterialOrServicesType(data.data.map(m => {
                            return { value: m.id, label: m.name }
                        }))
                    })
                }
            })
        }else {
            setMaterialOrServicesTypeOptions([])
            setSelectedMaterialOrServicesType([])
        }
        
      }, [history, selectedMaterialOrServices])

      // model or form sonradan zorunlu yapıldı filtreye eklenmesi gerekiyor
      const getAllFilterData = () => {
        const data = {
            companyIds: selectedCompanies.map((c) => c.value),
            mainTypeIds: selectedMainType.map((m) => m.value),
            typeIds: selectedType.map((t) => t.value),
            assetsTypeIds: selectedAssetsType.map((a) => a.value),
            dutiesTypeIds: selectedDutiesType.map((d) => d.value),
            usageFacilityIds: selectedMaterialUsage.map((m) => m.value),
            materialOrServicesIds: selectedMaterialOrServices.map((m) => m.value),
            materialOrServicesTypeIds: selectedMaterialOrServicesType.map((m) => m.value),
            modelOrForms: selectedModelOrForm.map((m) => m.label),
        }

        if(selectedMaterialOrServicesType.length === materialOrServicesTypeOptions.length){
            data.materialOrServicesTypeIds = []
        }
        

        FetchApiPost('services/Material/MaterialOrServicesToCompany/GetAllMaterialOrServicesToCompany', 'POST', {
            ...data,
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setFilterData(data.data)
                    setCloseFilter(true);
                })
            }
        })
      }

      useEffect(() => {
        let companyIds = selectedCompanies.map((c) => c.value)
        let mainTypeIds = selectedMainType.map((m) => m.value)
        let typeIds = selectedType.map((t) => t.value)
        let assetsTypeIds = selectedAssetsType.map((a) => a.value)
        let dutiesTypeIds = selectedDutiesType.map((d) => d.value)
        let usageFacilityIds = selectedMaterialUsage.map((m) => m.value)
        let materialOrServicesIds = selectedMaterialOrServices.map((m) => m.value)
        let materialOrServicesTypeIds = selectedMaterialOrServicesType.map((m) => m.value)
        if(companyIds.length > 0 && mainTypeIds.length > 0 && typeIds.length > 0 && assetsTypeIds.length > 0 && dutiesTypeIds.length > 0 && usageFacilityIds.length > 0 && materialOrServicesIds.length > 0 && materialOrServicesTypeIds.length > 0){
            FetchApiPost('services/Material/MaterialOrServicesToCompany/GetAllModelOrForm', 'POST', {
                companyIds: companyIds,
                  mainTypeIds: mainTypeIds,
                  typeIds: typeIds,
                  assetsTypeIds: assetsTypeIds,
                  dutiesTypeIds: dutiesTypeIds,
                  usageFacilityIds: usageFacilityIds,
                  materialOrServicesIds: materialOrServicesIds,
                  materialOrServicesTypeIds: materialOrServicesTypeIds
            }).then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setModelOrFormOptions(data.data.map((m, index) => {
                            return { value: index, label: m }
                        }))
                        setSelectedModelOrForm(data.data.map((m, index) => {
                            return { value: index, label: m }
                        }))
                    })
                }
            })
        }else{
            setModelOrFormOptions([])
            setSelectedModelOrForm([])
        }

      }, [selectedCompanies, selectedMainType, selectedType, selectedAssetsType, selectedDutiesType, selectedMaterialUsage, selectedMaterialOrServices, selectedMaterialOrServicesType])

      const handleUpdateGetAgainModelOrForm = () => {
        let companyIds = selectedCompanies.map((c) => c.value)
        let mainTypeIds = selectedMainType.map((m) => m.value)
        let typeIds = selectedType.map((t) => t.value)
        let assetsTypeIds = selectedAssetsType.map((a) => a.value)
        let dutiesTypeIds = selectedDutiesType.map((d) => d.value)
        let usageFacilityIds = selectedMaterialUsage.map((m) => m.value)
        let materialOrServicesIds = selectedMaterialOrServices.map((m) => m.value)
        let materialOrServicesTypeIds = selectedMaterialOrServicesType.map((m) => m.value)
        if(companyIds.length > 0 && mainTypeIds.length > 0 && typeIds.length > 0 && assetsTypeIds.length > 0 && dutiesTypeIds.length > 0 && usageFacilityIds.length > 0 && materialOrServicesIds.length > 0 && materialOrServicesTypeIds.length > 0){
            FetchApiPost('services/Material/MaterialOrServicesToCompany/GetAllModelOrForm', 'POST', {
                companyIds: companyIds,
                  mainTypeIds: mainTypeIds,
                  typeIds: typeIds,
                  assetsTypeIds: assetsTypeIds,
                  dutiesTypeIds: dutiesTypeIds,
                  usageFacilityIds: usageFacilityIds,
                  materialOrServicesIds: materialOrServicesIds,
                  materialOrServicesTypeIds: materialOrServicesTypeIds
            }).then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setModelOrFormOptions(data.data.map((m, index) => {
                            return { value: index, label: m }
                        }))
                        setSelectedModelOrForm(data.data.map((m, index) => {
                            return { value: index, label: m }
                        }))
                    })
                }
            })
        }else{
            setModelOrFormOptions([])
            setSelectedModelOrForm([])
        }
      }
    const statusOptions = [
        { id: 0, value: 'Edit', icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i> },
        {
            id: 1,
            value: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        }
    ];

    const dropDownItemClick = (e) => {
        const ids = e.target.id.split(' ');
        const selectedStatus = statusOptions.find((el) => el.id === Number(ids[1]));

        if (selectedStatus.value === 'Edit') {
            const item = filterData.find((el) => el.id === Number(ids[0]));
            setUpdateItem(item);
            setUpdateModalIsShow(true);
        }
        if (selectedStatus.value === 'Delete') {
            const item = filterData.find((el) => el.id === Number(ids[0]));
            setDeleteItem(item);
            setDeleteModalIsShow(true);
        }
    };

    const action = filterData.map((el, i) => ({
        id: el.id,
        content: (
            <span className="table-dropdown">
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <i style={{ fontSize: '20px' }} className="fas fa-ellipsis-v"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-container">
                        {
                            statusOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.id} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 1 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                    </Dropdown.Menu>
                </Dropdown>
            </span>
        ),
    }));


    const getDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    const tableData = filterData.map((item, index) => ({
        id: item.id,
        countryFor: item.countriesForUse[0].countryName,
        companies: item.company.name,
        mainType: item.mainType.name,
        type: item.type.name,
        assetsType: item.assetsType.name,
        dutiesType: item.dutiesType.name,
        materialUsage: item.materialUsageFacility.name,
        materialOrServices: item.materialOrServices?.name,
        materialOrServicesType: item.materialOrServicesType?.name,
        modelOrForm: item.modelOrForm,
        measure: item.measure,
        sMoq: item.moq,
        shelflife: item.shelfLife,
        batchsize: item.batchSize,
        lastOffer: "",
        paymentTerms: "",
        discount: "",
        startDate: getDate(item.startDate),
        licenseStatus: item.licenseStatus,
        currency: "",
        fees: item.fees,
        documentation: "",
        deliveryLead: "",
        sample: item.isSampleRequest,
        coA: 
        <Tippy content={item.documentCoA.map(doc => <div>{doc}</div>)} placement="bottom-start" arrow={false}>
                <span>
                    {item.documentCoA.join(', ')}
                </span>
            </Tippy>,
        consigment: "",
        incoterms: "",
        shippingInstraction: "",
        purchasingNote: "",
        procurementNote: "",
        actions: action[index].content
    }))

    

    const handleAddModal = () => {
        setAddModal(true);
    }

    const handleUpdate = (data) => {
        setFilterData(filterData.map((el) => (el.id === data.id ? data : el)));
    }

    const deleteFilter = () => {
        setSelectedCountry([])
        setSelectedCompanies([])
        setSelectedMainType([])
        setSelectedType([])
        setSelectedAssetsType([])
        setSelectedDutiesType([])
        setSelectedMaterialUsage([])
        setSelectedMaterialOrServices([])
        setSelectedMaterialOrServicesType([])
        setSelectedModelOrForm([])
        setSelectedMeasure([])
        setSelectedLastOffer([])
        setSelectedCreateDate([])
        setSelectedLicenceStatus([])
        setSelectedCurrency([])
        setSelectedSample([])
    }

    const handleDelete = () => {
        FetchApiPost('services/Material/MaterialOrServicesToCompany/DeleteMaterialOrServicesToCompany', 'POST', {
            id: deleteItem.id,
            modifiedBy: localStorage.getItem('userName')
        }).then(res => {
            if(res.status === 201){
                res.json().then(data => {
                    setFilterData(filterData.filter((el) => el.id !== deleteItem.id));
                    setDeleteModalIsShow(false);
                })
            }else{
                  
            }
        })
    }

    console.log('deleteıTEM', deleteItem)

  return (
    <>
         <div id="disadvantage-table">
            <MainTable 
                tableData={tableData}
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
                addButtonFunction={handleAddModal}
                isAddButton={true}
                isFilters={true}
                setCloseFilter={setCloseFilter}
                closeFilter={closeFilter}
                filters={
                    <Filter
                        filterComponentsData={filterComponentsData}
                        getAllFilterData={getAllFilterData}
                        deleteFilter={deleteFilter}
                        setCloseFilter={setCloseFilter}
                    />
                }
            />
        </div>

        {
            addModal && (
                <AddModal 
                    isShow={addModal}
                    setIsShow={setAddModal}
                    setFilterData={setFilterData}
                />
            )
        }
        {
            updateModalIsShow && (
                <UpdateModal handleUpdateGetAgainModelOrForm={handleUpdateGetAgainModelOrForm} handleUpdate={handleUpdate} selectedValue={updateItem} isShow={updateModalIsShow} setIsShow={setUpdateModalIsShow} />
            )
        }
        {
            deleteModalIsShow && (
                <Delete handleClickDeleteButton={handleDelete} modalShow={deleteModalIsShow} setModalShow={setDeleteModalIsShow} message={`${deleteItem.materialOrServices.name} / ${deleteItem.company.name}`} />
            )
        }
    </>
  )
}

export default MaterialsOrServices