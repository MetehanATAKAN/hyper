import { mdiCheck, mdiClose, mdiDeleteSweepOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react'
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router';
import { statusControl } from '../../../../components/Function/StatusCheck';
import { useDispatch } from 'react-redux';
import { productPaFilters, productPaSelectQuarter } from '../../../../redux/actions';
import Filter from '../../../../components/Filter';

const Filters = ({
    selectFilter,
    setisApplyFilter,
    setApplyData,
    setIsApply,
    isOpenFilter,
    setSubPromoLoading,
    setisTable,
    setIsOpenFilter
}) => {

    const history = useHistory();
    const empId = Number(localStorage.getItem('userEmpId'));
    const countryId = localStorage.getItem('countryId');
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const [productBodyValue, setProductBodyValue] = useState({});

    //is change state
    const [isChange, setIsChange] = useState(false);

    // years
    const [year, setYear] = useState([]);
    const [selectYear, setSelectYear] = useState({
        value:new Date().getFullYear(),
        label:String(new Date().getFullYear())
    });
   
    // quarter
    const quarter = [
        {
            value: 1,
            label: "Q1"
        },
        {
            value: 2,
            label: "Q2"
        },
        {
            value: 3,
            label: "Q3"
        },
        {
            value: 4,
            label: "Q4"
        }
    ]
    const [selectQuarter, setSelectQuarter] = useState(
        new Date().getMonth() >= 0 && new Date().getMonth() < 3
            ? {
                value: 1,
                label: "Q1"
            }
            : new Date().getMonth() >= 3 && new Date().getMonth() < 6
                ? {
                    value: 2,
                    label: "Q2"
                }
                : new Date().getMonth() >= 6 && new Date().getMonth() < 9
                    ? {
                        value: 3,
                        label: "Q3"
                    }
                    : {
                        value: 4,
                        label: "Q4"
                    }
    );

    //country
    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState();
                   
    //bus unit
    const [busUnit, setBusUnit] = useState([]);
    const [selectBusUnit, setSelectBusUnit] = useState();

    //place
    const [place, setPlace] = useState([]);
    const [selectPlace, setSelectPlace] = useState();
    const [placeHeaderName, setplaceHeaderName] = useState('place');
             
    //place type
    const [placeType, setPlaceType] = useState([]);
    const [selectPlaceType, setSelectPlaceType] = useState();
    const [placeTypeHeaderName, setPlaceTypeHeaderName] = useState('place type');
    
    //type of priority
    const [typeOfPriority, setTypeOfPriority] = useState([]);
    const [selectTypeOfPriority, setSelectTypeOfPriority] = useState();
    const [typeOfPriorityHeaderName, settypeOfPriorityHeaderName] = useState('type of priority');
    
    //client type
    const [clientType, setClientType] = useState([]);
    const [selectClientType, setSelectClientType] = useState();
    const [clientTypeHeaderName, setClientTypeHeaderName] = useState('client type');
    console.log(selectClientType);
    //specialization
    const [specialization, setSpecialization] = useState([]);
    const [selectSpecialization, setSelectSpecialization] = useState();

    //brand
    const [brand, setBrand] = useState([]);
    const [selectBrand, setSelectBrand] = useState([]);
                
    //global sku
    const [globalSku, setGlobalSku] = useState([]);
    const [selectGlobalSku, setSelectGlobalSku] = useState([]);

    // org type
    const [orgType, setOrgType] = useState([]);
    const [selectOrgType, setSelectOrgType] = useState([]);

    //category
    
    const [category, setCategory] = useState([])
    const [selectCategory, setSelectCategory] = useState();

    //PrioDatas
    const prioDatas = [
        {
            value: 1,
            label: "Promo"
        },
        {
            value: 2,
            label: "Sub P."
        },
        {
            value: 3,
            label: "NON"
        }
    ]
    const [selectprioAlloType, setSelectPrioAlloType] = useState(
        {
            value: 1,
            label: "Promo"
        },
    );
    
    //zone
    const [zone, setZone] = useState([]);
    const [selectZone, setSelectZone] = useState([]);

    //city
    const [city, setCity] = useState([]);
    const [selectCity, setSelectCity] = useState([]);
  
    //clinic
    const [clinic, setClinic] = useState([]);
    const [selectClinic, setSelectClinic] = useState();

    //client
    const [client, setClient] = useState([]);
    const [selectClient, setSelectClient] = useState();
    
    //customer
    const [customer, setCustomer] = useState([]);
    const [selectCustomer, setSelectCustomer] = useState();

    //pharmacy name & adress
    const [pharmacyNameAdress, setPharmacyNameAdress] = useState([]);
    const [selectPharmacyNameAdress, setSelectPharmacyNameAdress] = useState();

    const filters = [
        {
            key: 'year',
            label: 'year',
            options: year,
            state: selectYear,
            setState: setSelectYear,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key: 'quarter',
            label: 'quarter',
            options: quarter,
            state: selectQuarter,
            setState: setSelectQuarter,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key: 'country',
            label: 'country',
            options: country,
            state: selectCountry,
            setState: setSelectCountry,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key: 'business unite',
            label: 'business unite',
            options: busUnit,
            state: selectBusUnit,
            setState: setSelectBusUnit,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'place',
            options:place,
            state:selectPlace,
            setState:setSelectPlace,
            label:placeHeaderName,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'place type',
            options:placeType,
            state:selectPlaceType,
            setState:setSelectPlaceType,
            label:placeTypeHeaderName,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'type of priority',
            options:typeOfPriority,
            state:selectTypeOfPriority,
            setState:setSelectTypeOfPriority,
            label:typeOfPriorityHeaderName,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'client type',
            options:clientType,
            state:selectClientType,
            setState:setSelectClientType,
            label:clientTypeHeaderName,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'specialization',
            options:specialization,
            state:selectSpecialization,
            setState:setSelectSpecialization,
            label:'specialization',
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'brand',
            options:brand,
            state:selectBrand,
            setState:setSelectBrand,
            label:'brand',
            type: 'multiselect',
            maxSelect:true,
            maxSelectItem:10
        },
        {
            key:'category',
            options:category,
            state:selectCategory,
            setState:setSelectCategory,
            label:'category',
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'priority allocation type',
            options:prioDatas,
            state:selectprioAlloType,
            setState:setSelectPrioAlloType,
            label:'priority allocation type',
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
    ]

    //**select client type ıd = 246 this filter works */
    const filters2 = [
        {
            key: 'year',
            label: 'year',
            options: year,
            state: selectYear,
            setState: setSelectYear,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key: 'quarter',
            label: 'quarter',
            options: quarter,
            state: selectQuarter,
            setState: setSelectQuarter,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key: 'country',
            label: 'country',
            options: country,
            state: selectCountry,
            setState: setSelectCountry,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key: 'business unite',
            label: 'business unite',
            options: busUnit,
            state: selectBusUnit,
            setState: setSelectBusUnit,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'place',
            options:place,
            state:selectPlace,
            setState:setSelectPlace,
            label:placeHeaderName,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'place type',
            options:placeType,
            state:selectPlaceType,
            setState:setSelectPlaceType,
            label:placeTypeHeaderName,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'type of priority',
            options:typeOfPriority,
            state:selectTypeOfPriority,
            setState:setSelectTypeOfPriority,
            label:typeOfPriorityHeaderName,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'client type',
            options:clientType,
            state:selectClientType,
            setState:setSelectClientType,
            label:clientTypeHeaderName,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'work place',
            options:clinic,
            state:selectClinic,
            setState:setSelectClinic,
            label:'work place',
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'specialization',
            options:specialization,
            state:selectSpecialization,
            setState:setSelectSpecialization,
            label:'specialization',
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'client',
            options:client,
            state:selectClient,
            setState:setSelectClient,
            label:'client',
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'brand',
            options:brand,
            state:selectBrand,
            setState:setSelectBrand,
            label:'brand',
            type: 'multiselect',
            maxSelect:true,
            maxSelectItem:10
        },
        {
            key:'category',
            options:category,
            state:selectCategory,
            setState:setSelectCategory,
            label:'category',
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
        {
            key:'priority allocation type',
            options:prioDatas,
            state:selectprioAlloType,
            setState:setSelectPrioAlloType,
            label:'priority allocation type',
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false
        },
    ]

    const handleChangeFilter = (value, label, headerName) => {
        setIsApply(false);
        switch (headerName) {
            case 'year':
                return (
                    setSelectYear(),

                    setSelectBusUnit(),
                    setBusUnit([]),

                    setSelectBrand([]),
                    setBrand([]),

                    setSelectSpecialization(),
                    setSpecialization([]),

                    setSelectClinic(),
                    setClinic([])
                )
            case 'quarter':
                return (
                    setSelectQuarter(),

                    setSelectBrand([]),
                    setBrand([])
                )
            case 'country':
                return (

                    setSelectCountry(),

                    setSelectBusUnit(),
                    setBusUnit([]),

                    setSelectSpecialization(),
                    setSpecialization([]),

                    setSelectGlobalSku([]),
                    setGlobalSku([]),

                    setZone([]),
                    setSelectZone([])
                )
            case 'business unite':
                return (
                    setSelectBusUnit(),

                    setSelectBrand([]),
                    setBrand([]),

                    setSelectSpecialization(),
                    setSpecialization([]),

                    setSelectGlobalSku([]),
                    setGlobalSku([]),

                    setZone([]),
                    setSelectZone([]),

                    setCity([]),
                    setSelectCity([]),

                    setClinic([]),
                    setSelectClinic([]),

                    setPharmacyNameAdress([]),
                    setSelectPharmacyNameAdress()
                )
            case 'place':
                return (

                    setSelectPlaceType(),
                    setPlaceType([]),

                    setSelectTypeOfPriority(),
                    setTypeOfPriority([]),

                    setSelectClientType(),
                    setClientType([]),

                    setSelectSpecialization(),
                    setSpecialization([]),

                    setSelectCategory(),
                    setCategory([]),

                    setSelectClinic(),
                    setClinic([])
                )
            case 'place type':
                return (

                    setSelectTypeOfPriority(),
                    setTypeOfPriority([]),

                    setSelectClientType(),
                    setClientType([]),

                    setSelectSpecialization(),
                    setSpecialization([]),

                    setSelectCategory(),
                    setCategory([])
                )
            case 'type of priority':
                return (
                    setSelectClientType(),
                    setClientType([]),

                    setSelectSpecialization(),
                    setSpecialization([]),

                    setSelectCategory(),
                    setCategory([])
                )
            case 'client type':
                return (
                    setSelectSpecialization(),
                    setSpecialization([]),

                    setSelectCategory(),
                    setCategory([])
                )
            case 'specialization':
                return (
                    setSelectCategory(),
                    setCategory([]),

                    setSelectClient(),
                    setClient([])
                )
            case 'brand':
                return (
                    setSelectGlobalSku([]),
                    setGlobalSku([])
                )

            case 'organization type':
                return (
                    setSelectClinic(),
                    setClinic([])
                )
            case 'clinic':
                return (
                    setSelectClient(),
                    setClient([])
                )
            default:
                break;
        }
    }

    const [selectStatusSpec, setSelectStatusSpec] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
        { id: 4, status: 'default' },
        { id: 5, status: 'default' },
        { id: 6, status: 'default' },
        { id: 7, status: 'default' },
        { id: 8, status: 'default' },
        { id: 9, status: 'default' },
        { id: 10, status: 'default' },
        { id: 11, status: 'default' }
    ])

    const [selectStatusSpec2, setSelectStatusSpec2] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
        { id: 4, status: 'default' },
        { id: 5, status: 'default' },
        { id: 6, status: 'default' },
        { id: 7, status: 'default' },
        { id: 8, status: 'default' },
        { id: 9, status: 'default' },
        { id: 10, status: 'default' },
        { id: 11, status: 'default' },
        { id: 12, status: 'default' },
        { id: 13, status: 'default' }
    ])

    const [selectStatusCustomer, setSelectStatusCustomer] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
        { id: 4, status: 'default' },
        { id: 5, status: 'default' },
        { id: 6, status: 'default' },
        { id: 7, status: 'default' },
        { id: 8, status: 'default' },
        { id: 9, status: 'default' },
        { id: 10, status: 'default' },
        { id: 11, status: 'default' },
        { id: 12, status: 'default' }
    ])

    const [selectStatusPharmacy, setSelectStatusPharmacy] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
        { id: 4, status: 'default' },
        { id: 5, status: 'default' },
        { id: 6, status: 'default' },
        { id: 7, status: 'default' },
        { id: 8, status: 'default' },
        { id: 9, status: 'default' },
        { id: 10, status: 'default' },
        { id: 11, status: 'default' }
    ])

    
    const applyFilter = () => {

        setApplyData([]);
        if (selectClientType?.value === 92) {

            if (selectClinic === undefined && selectClient === undefined) {

                const getProduct = {
                    CountryId: selectCountry?.value,
                    BusinessUnitId: selectBusUnit?.value,
                    Year: selectYear?.value,
                    Quarter: selectQuarter?.value,
                    placeId: selectPlace?.value,
                    placeTypeId: selectPlaceType?.value,
                    typeOfPriorityId: selectTypeOfPriority?.value,
                    SpecId: selectSpecialization ? selectSpecialization?.value : [],
                    Category: selectCategory?.label,
                    productIds: selectBrand.map(data => data?.value),
                    clientTypeId:selectClientType?.value
                }

                // const saveBodyValue = {
                //     CountryId: selectCountry.value,
                //     BusinessUnitId: selectBusUnit.value,
                //     BusinessUnitName: selectBusUnit.label,
                //     Year: selectYear.value,
                //     Quarter: selectQuarter.value,
                //     SpecName: selectSpecialization.label,
                //     SpecId: selectSpecialization.value,
                //     Category: selectCategory.value,
                //     OrganizationTypeId: selectOrgType.value,
                //     OrganizationTypeName: selectOrgType.label,
                // }


                // setProductBodyValue(saveBodyValue);
                if(  selectYear &&
                    selectQuarter &&
                    selectCountry &&
                    selectBusUnit &&
                    selectPlace &&
                    selectPlaceType &&
                    selectTypeOfPriority &&
                    selectClientType &&
                    selectBrand.length !== 0 &&
                    selectCategory &&
                    selectprioAlloType ){
                        setSubPromoLoading(true);
                FetchApiPost('services/VisitMix/GetProductPriorityAllocation', 'POST', getProduct)
                    .then((res) =>
                        (async () => {
                            try {
                                if (res.status === 200) {
                                    res.json().then(data => (
                                        setApplyData(data.data)
                                    ))
                                    setisApplyFilter(true);
                                    setSubPromoLoading(false);
                                    setisTable(true);
                                }
                                else if (res.status === 500 || res.status === 499) {
                                    setSubPromoLoading(false);
                                    history.push('/error-500');
                                }
                                else {
                                    setSubPromoLoading(false);
                                }

                            } catch (error) {
                                console.log('error', error);
                            }
                        })()
                    )
                    }
                    
            }
            else {
                const body = {
                    CountryId: selectCountry?.value,
                    BusinessUnitId: selectBusUnit?.value,
                    Year: selectYear?.value,
                    Quarter: selectQuarter?.value,
                    SpecId: selectSpecialization?.value,
                    Category: selectCategory?.label,
                    placeId: selectPlace?.value,
                    placeTypeId: selectPlaceType?.value,
                    typeOfPriorityId: selectTypeOfPriority?.value,
                    clientTypeId: selectClientType?.value,
                    clientId: selectClient?.value,
                    productIds:selectBrand?.map(data => data?.value)
                }

                if(
                    selectYear &&
                    selectQuarter &&
                    selectCountry &&
                    selectBusUnit &&
                    selectPlace &&
                    selectPlaceType &&
                    selectTypeOfPriority &&
                    selectClientType &&
                    selectClinic &&
                    selectSpecialization &&
                    selectClient &&
                    selectBrand.length !== 0 &&
                    selectCategory &&
                    selectprioAlloType 
                ) {
                    setSubPromoLoading(true);
                FetchApiPost('services/VisitMix/GetProductPriorityAllocationForCustomer', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => (
                                    setApplyData(data.data)
                                ))
                                setisApplyFilter(true);
                                setSubPromoLoading(false);
                                setisTable(true);
                            }
                            else if (res.status === 500 || res.status === 499) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
                }
                
            }
        
            // const condition = [
            //     selectYear === undefined,
            //     selectQuarter === undefined,
            //     selectCountry === undefined,
            //     selectBusUnit === undefined,
            //     selectSpecialization === undefined,
            //     selectBrand.length === 0,
            //     selectGlobalSku.length === 0,
            //     selectOrgType === undefined,
            //     selectCategory === undefined,
            //     selectprioAlloType.length === 0
            // ]

            // statusControl(condition, selectStatusSpec, setSelectStatusSpec);
            // if (condition.some((x) => x === true)) return;

            // setSubPromoLoading(true);

            // const getProduct = {
            //     CountryId: selectCountry.value, // GetFrequency de CountyId yok
            //     BusinessUnitId: selectBusUnit.value,
            //     Year: selectYear.value,
            //     Quarter: selectQuarter.value,
            //     SpecId: selectSpecialization.value,
            //     Category: selectCategory.value,
            //     OrganizationTypeId: selectOrgType.value,
            //     productIds:selectBrand.map(data => data?.value)
            // }

            // const saveBodyValue = {
            //     CountryId: selectCountry.value,
            //     BusinessUnitId: selectBusUnit.value,
            //     BusinessUnitName: selectBusUnit.label,
            //     Year: selectYear.value,
            //     Quarter: selectQuarter.value,
            //     SpecName: selectSpecialization.label,
            //     SpecId: selectSpecialization.value,
            //     Category: selectCategory.value,
            //     OrganizationTypeId: selectOrgType.value,
            //     OrganizationTypeName: selectOrgType.label,
            // }


            // setProductBodyValue(saveBodyValue);
            // FetchApiPost('services/VisitMix/GetProductPriorityAllocation', 'POST', getProduct)
            //     .then((res) =>
            //         (async () => {
            //             try {
            //                 if (res.status === 200) {
            //                     res.json().then(data => (
            //                         setApplyData(data.data)
            //                     ))
            //                     setisApplyFilter(true);
            //                     setSubPromoLoading(false);
            //                     setisTable(true);
            //                 }
            //                 else if (res.status === 500 || res.status === 499) {
            //                     history.push('/error-500');
            //                 }

            //             } catch (error) {
            //                 console.log('error', error);
            //             }
            //         })()
            //     )
        }
        else if(selectClientType?.value === 99) {
           
            const getProduct = {
                CountryId:selectCountry?.value,
                BusinessUnitId:selectBusUnit?.value,
                Year:selectYear?.value,
                Quarter:selectQuarter?.value,
                placeId: selectPlace?.value,
                placeTypeId: selectPlaceType?.value,
                typeOfPriorityId: selectTypeOfPriority?.value,
                clientTypeId: selectClientType?.value,
                Category:selectCategory?.label,
                productIds:selectBrand.map(data => data?.value),
                specId:selectSpecialization?.value
            }
    
            if(
                selectYear &&
                    selectQuarter &&
                    selectCountry &&
                    selectBusUnit &&
                    selectPlace &&
                    selectPlaceType &&
                    selectTypeOfPriority &&
                    selectClientType &&
                    selectSpecialization &&
                    selectBrand.length !== 0 &&
                    selectCategory &&
                    selectprioAlloType &&
                    selectSpecialization
            ){
                setSubPromoLoading(true);
                FetchApiPost('services/VisitMix/GetProductPriorityAllocationForPharmacy', 'POST', getProduct)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => (
                                    setApplyData(data.data)
                                ))
                                setisApplyFilter(true);
                                setSubPromoLoading(false);
                                setisTable(true);
                            }
                            else if (res.status === 500 || res.status === 499) {
                                history.push('/error-500');
                                setSubPromoLoading(false);
                            }
                            else {
                                setSubPromoLoading(false);
                            }
                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
            }
        }
        else if(selectClientType === undefined) {
            // const condition = [
            //     selectYear === undefined,
            //     selectQuarter === undefined,
            //     selectCountry === undefined,
            //     selectBusUnit === undefined,
            //     selectPlace === undefined,
            //     selectPlaceType === undefined,
            //     selectTypeOfPriority === undefined,
            //     selectClientType !== undefined,
            //     selectSpecialization === undefined,
            //     selectBrand === undefined,
            //     selectCategory === undefined,
            //     selectprioAlloType === undefined
            // ]
    
            // statusControl(condition,selectStatusSpec,setSelectStatusSpec);
            //     if (condition.some((x) => x === true)) return;
            const getProduct = {
                CountryId: selectCountry?.value,
                BusinessUnitId: selectBusUnit?.value,
                Year: selectYear?.value,
                Quarter: selectQuarter?.value,
                placeId: selectPlace?.value,
                placeTypeId: selectPlaceType?.value,
                typeOfPriorityId: selectTypeOfPriority?.value,
                SpecId: selectSpecialization ? selectSpecialization?.value :0,
                Category: selectCategory?.label,
                productIds:selectBrand.map(data => data?.value),
                clientTypeId:0
            }
    
           if(
            selectYear &&
            selectQuarter &&
            selectCountry &&
            selectBusUnit &&
            selectPlace &&
            selectPlaceType &&
            selectTypeOfPriority &&
            selectBrand.length !== 0 &&
            selectCategory &&
            selectprioAlloType
           )
           {
            setSubPromoLoading(true);
            FetchApiPost('services/VisitMix/GetProductPriorityAllocation', 'POST', getProduct)
            .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                       res.json().then( data => (
                       setApplyData(data.data)
                    ))
                    setisApplyFilter(true);
                    setSubPromoLoading(false);
                    setisTable(true);
                    }
                    else if (res.status === 500 || res.status === 499) {
                        setSubPromoLoading(false);
                        history.push('/error-500');
                    }
                    else {
                        setSubPromoLoading(false);
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        )
           }
            
        }
       
    }

    const changeFilter = (name) => {
        setisTable(false);
        switch (name) {
            case ('country'):
                return (
                    setBusUnit([]),
                    setSelectBusUnit(),

                    setPlace([]),
                    setSelectPlace(),

                    setPlaceType([]),
                    setSelectPlaceType(),

                    setTypeOfPriority([]),
                    setSelectTypeOfPriority(),

                    setClientType([]),
                    setSelectClientType(),

                    setSpecialization([]),
                    setSelectSpecialization(),

                    setCategory([]),
                    setSelectCategory()
                )
            case ('business unite'):
                return (
                    setPlace([]),
                    setSelectPlace(),

                    setPlaceType([]),
                    setSelectPlaceType(),

                    setTypeOfPriority([]),
                    setSelectTypeOfPriority(),

                    setClientType([]),
                    setSelectClientType(),

                    setSpecialization([]),
                    setSelectSpecialization(),

                    setCategory([]),
                    setSelectCategory(),

                    setBrand([]),
                    setSelectBrand([])
                )
            case ('place'):
                return (
                    setPlaceType([]),
                    setSelectPlaceType(),

                    setTypeOfPriority([]),
                    setSelectTypeOfPriority(),

                    setClientType([]),
                    setSelectClientType(),

                    setClinic([]),
                    setSelectClient(),

                    setSpecialization([]),
                    setSelectSpecialization(),

                    setCategory([]),
                    setSelectCategory()
                )
            case ('place type'):
                return (
                    setTypeOfPriority([]),
                    setSelectTypeOfPriority(),

                    setClientType([]),
                    setSelectClientType(),

                    setClinic([]),
                    setSelectClient(),

                    setSpecialization([]),
                    setSelectSpecialization(),

                    setCategory([]),
                    setSelectCategory()
                )
            case ('type of priority'):
                return (
                    setClientType([]),
                    setSelectClientType(),

                    setClinic([]),
                    setSelectClient(),

                    setSpecialization([]),
                    setSelectSpecialization(),

                    setCategory([]),
                    setSelectCategory()
                )
            case ('client type'):
                return (
                    setClient([]),
                    setSelectClient(),

                    setSpecialization([]),
                    setSelectSpecialization(),

                    setCategory([]),
                    setSelectCategory()
                )
            case ('specialization'):
                    return (
                        setClient([]),
                        setSelectClient(),

                        setCategory([]),
                        setSelectCategory(),

                        setBrand([]),
                        setSelectBrand([])
                    )
            case ('work place'):
                    return (
                        setClient([]),
                        setSelectClient()
                    )
            default:
                break;
        }
    }
    const clearAllFilters = () => {
        setSelectYear();
        setSelectQuarter();
        setSelectCountry();

        setBusUnit([]);
        setSelectBusUnit();

        setPlace([]);
        setSelectPlace();

        setPlaceType([]);
        setSelectPlaceType();

        setTypeOfPriority([]);
        setSelectTypeOfPriority();

        setClientType([]);
        setSelectClientType();

        setSpecialization([]);
        setSelectSpecialization();

        setBrand([]);
        setSelectBrand([]);

        setGlobalSku([]);
        setSelectGlobalSku([]);

        setSelectOrgType();

        setSelectCategory();

        setSelectPrioAlloType();

        setClinic([]);
        setSelectClinic([]);

        setCustomer([]);
        setSelectCustomer();

    }

    useEffect(() => {
        //Years
        FetchApiGet('api/OldSystem/GetYear', 'GET')
        .then((res) =>
        (async () => {
            try {
                if (res.status === 200) {
                    res.json().then( data => (
                        setYear(data.map(year => (
                            {
                                value:year.Id,
                                label:year.Val1
                            }
                        )))
                    ))
                }
                else if (res.status === 500 || res.status === 499) {
                    history.push('/error-500');
                }

            } catch (error) {
                console.log('error', error);
            }
        })()
    )

        
        //Country 
        FetchApiGet(`api/OldSystem/GetCompanies/${empId}`, 'GET')
            .then((res) =>
        (async () => {
            try {
                if (res.status === 200) {
                    res.json().then( data => {
                        return (
                            setCountry(data.map(country => (
                                {
                                    value: country?.CompanyId,
                                    label: country?.CompanyName
                                }
                            ))),
                            setSelectCountry({
                                value:data[0]?.CompanyId,
                                label:data[0]?.CompanyName
                            })
                        )
                    })        
                }
                else if (res.status === 500 || res.status === 499) {
                    history.push('/error-500');
                }

            } catch (error) {
                console.log('error', error);
            }
        })()
    )
        //Organization Type
        FetchApiGet('api/OldSystem/GetOrganization', 'GET')
        .then((res) =>
        (async () => {
            try {
                if (res.status === 200) {
                    res.json().then( data => {
                        return (
                            setOrgType(data.map(org => (
                                {
                                    value: org?.Id,
                                    label: org?.Val1
                                }
                            ))),
                            setSelectOrgType(
                                {
                                    value: data[0]?.Id,
                                    label: data[0]?.Val1
                                }
                            )
                        )
                    }) 
                }
                else if (res.status === 500 || res.status === 499) {
                    history.push('/error-500');
                }

            } catch (error) {
                console.log('error', error);
            }
        })()
    )
    }, [empId, history])

    //Business Unit
    useEffect(() => {
        if (selectCountry && selectYear) {
           
            const bussinessBody = {
                empId: localStorage.getItem('userEmpId'),
                month: new Date().getMonth() + 1,
                ScmId: selectCountry?.value?.toString(),
                year: selectYear?.value
            }
            FetchApiPost('api/OldSystem/GetProductPriorityBusinessFilter', 'POST', bussinessBody)
            .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then( data => {
                            return (
                                setBusUnit(data.map((item) => (
                                    {
                                        value: item?.Id,
                                        label: item?.Val1
                                    }
                                ))),
                                data?.length === 0
                                ?null
                                :setSelectBusUnit(
                                    { value: data[0]?.Id, label: data[0]?.Val1 }
                                )
                            )
                        }) 
                    }
                    else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    }
    
                } catch (error) {
                    console.log('error', error);
                }
            })()
        )
                
        }
    }, [history, selectCountry, selectYear])

    //Place
    useEffect(() => {
        if (selectCountry  && selectYear  && selectBusUnit ) {
           
            const placeBody = {
                BusinessUnitId: selectBusUnit?.value,
                CompanyId: selectCountry?.value,
                Year: selectYear?.value,
                employeeId :empId
            }
            FetchApiPost('services/Organization/Organization/ProductPriorityAllocation/GetPlace', 'POST', placeBody)
            .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then( data => {
                            return (
                                setPlace(data.data.map((item) => (
                                    {
                                        value: item?.id,
                                        label: item?.name
                                    }
                                ))),
                                data?.data?.length === 0
                                ?null
                                :setSelectPlace(
                                    { value: data.data[0]?.id, label: data.data[0]?.name }
                                )
                            )
                        }) 
                    }
                    else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    }
    
                } catch (error) {
                    console.log('error', error);
                }
            })()
        )
                
        }
    }, [empId, history, selectBusUnit, selectCountry, selectYear])

     //Place type
     useEffect(() => {
        if (selectCountry  && selectYear  && selectBusUnit  && selectPlace?.value ) {
           
            const placeTypeBody = {
                BusinessUnitId: selectBusUnit?.value,
                CompanyId: selectCountry?.value,
                Year: selectYear?.value,
                PlaceIds:[selectPlace?.value],
                employeeId :empId
            }
            FetchApiPost('services/Organization/Organization/ProductPriorityAllocation/GetPlaceType', 'POST', placeTypeBody)
            .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then( data => {
                            return (
                                setPlaceType(data.data.map((item) => (
                                    {
                                        value: item?.id,
                                        label: item?.name
                                    }
                                ))),
                                data?.data?.length === 0
                                ?null
                                :setSelectPlaceType(
                                    { value: data.data[0]?.id, label: data.data[0]?.name }
                                )
                            )
                        }) 
                    }
                    else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    }
    
                } catch (error) {
                    console.log('error', error);
                }
            })()
        )
                
        }
    }, [history, selectBusUnit, selectCountry, selectYear, selectPlace, empId])

    //Type of priority
    useEffect(() => {
        if (selectCountry  && selectYear  && selectBusUnit  && selectPlace  && selectPlaceType ) {
           
            const typeOfPriorityBody = {
                BusinessUnitId: selectBusUnit?.value,
                CompanyId: selectCountry?.value,
                Year: selectYear?.value,
                PlaceIds:[selectPlace?.value],
                PlaceTypeIds:[selectPlaceType?.value],
                employeeId :empId
            }
            FetchApiPost('services/Organization/Organization/ProductPriorityAllocation/GetTypeOfPriority', 'POST', typeOfPriorityBody)
            .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then( data => {
                            return (
                                setTypeOfPriority(data.data.map((item) => (
                                    {
                                        value: item?.id,
                                        label: item?.name
                                    }
                                ))),
                                data?.data?.length === 0
                                ?null
                                :setSelectTypeOfPriority(
                                    { value: data.data[0]?.id, label: data.data[0]?.name }
                                )
                            )
                        }) 
                    }
                    else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    }
    
                } catch (error) {
                    console.log('error', error);
                }
            })()
        )
                
        }
    }, [empId, history, selectBusUnit, selectCountry, selectPlace, selectPlaceType, selectYear])

    //Client type
    useEffect(() => {
        if (selectCountry  && selectYear  && selectBusUnit  && selectPlace  && selectPlaceType  && selectTypeOfPriority ) {
           
            const typeOfPriorityBody = {
                BusinessUnitId: selectBusUnit?.value,
                CompanyId: selectCountry?.value,
                Year: selectYear?.value,
                PlaceIds:[selectPlace?.value],
                PlaceTypeIds:[selectPlaceType?.value],
                TypeOfPriorityIds:[selectTypeOfPriority?.value],
                employeeId :empId
            }
            FetchApiPost('services/Organization/Organization/ProductPriorityAllocation/GetClientType', 'POST', typeOfPriorityBody)
            .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then( data => {
                            return (
                                setClientType(data.data.map((item) => (
                                    {
                                        value: item?.id,
                                        label: item?.name
                                    }
                                )))
                                // data.data.length >0 && setSelectClientType(
                                //     { value: data.data[0]?.id, label: data.data[0]?.name }
                                //  )
                                
                            )
                        }) 
                    }
                    else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    }
    
                } catch (error) {
                    console.log('error', error);
                }
            })()
        )
                
        }
    }, [history, selectBusUnit, selectCountry, selectPlace, selectPlaceType, selectYear, selectTypeOfPriority, empId])

     //Work Place
     useEffect(() => {
        if (selectPlace && selectPlaceType && selectTypeOfPriority) {
           
            const clinicBody = {
                employeeId: empId,
                placeIds: [selectPlace?.value],
                placeTypeIds: [selectPlaceType?.value],
                typeOfPriorityIds: [selectTypeOfPriority?.value]
            }
            if (selectClientType?.value === 246) {
                FetchApiPost('services/CRM/WorkPlace/GetWorkPlaceForVisitPlanning', 'POST', clinicBody)
                    .then((res) =>
                        (async () => {
                            try {
                                if (res.status === 200) {
                                    res.json().then(data => {
                                        return (
                                            setClinic(data?.data?.map((item) => (
                                                {
                                                    value: item?.id,
                                                    label: item?.name
                                                }
                                            )))
                                        )
                                    })
                                }
                                else if (res.status === 500 || res.status === 499) {
                                    history.push('/error-500');
                                }

                            } catch (error) {
                                console.log('error', error);
                            }
                        })()
                    )
            }    
        }
    }, [empId, history, selectClientType, selectPlace, selectPlaceType, selectTypeOfPriority])

    //Client
    useEffect(() => {
        if (selectClinic && selectClientType && selectSpecialization) {
           
            const clientBody = {
                workPlaceIds: [selectClinic?.value],
                clientTypeIds: [selectClientType?.value],
                specIds: [selectSpecialization?.value]
            }
            FetchApiPost('services/CRM/Client/GetClientForMarketing', 'POST', clientBody)
            .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then( data => {
                            return (
                                setClient(data?.data?.map((item) => (
                                    {
                                        value: item?.id,
                                        label: item?.name
                                    }
                                ))),
                                data?.data?.length === 0
                                ?null
                                :setSelectClient(
                                    {
                                        value: data.data[0]?.id,
                                        label: data.data[0]?.name
                                    }
                                )
                            )
                        }) 
                    }
                    else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    }
    
                } catch (error) {
                    console.log('error', error);
                }
            })()
        )
                
        }
    }, [history, selectClientType, selectClinic, selectSpecialization])

    //specialization
    useEffect(() => {
        if ( selectYear  && selectCountry  && selectBusUnit  && selectPlace  && selectPlaceType  && selectTypeOfPriority && selectClientType   ) {
           
            const body = {
                Year: selectYear?.value,
                CompanyId: selectCountry?.value,
                BusinessUnitId: selectBusUnit?.value,
                PlaceIds: [selectPlace?.value],
                PlaceTypeIds: [selectPlaceType?.value],
                TypeOfPriorityIds: [selectTypeOfPriority?.value],
                ClientTypeIds: selectClientType ? [selectClientType?.value] : []
            }
            FetchApiPost('services/Organization/Organization/ProductPriorityAllocation/GetSpecialization', 'POST', body)
            .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then( data => {
                            return (
                                setSpecialization(data.data.map((item) => (
                                    { value: item.id, label: item.name }
                                ))),
                                data?.data?.length === 0
                                ?null
                                :setSelectSpecialization(
                                    { value: data.data[0]?.id, label: data.data[0]?.name }
                                )
                            )
                        }) 
                    }
                    else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    }
    
                } catch (error) {
                    console.log('error', error);
                }
            })()
        )
                
        }
    }, [history, selectBusUnit, selectClientType, selectCountry, selectPlace, selectPlaceType, selectTypeOfPriority, selectYear])

    //category
    useEffect(() => {
        if ( selectYear  && selectCountry  && selectBusUnit  && selectPlace  && selectPlaceType  && selectTypeOfPriority  ) {
           
            const body = {
                Year: selectYear?.value,
                CompanyId: selectCountry?.value,
                BusinessUnitId: selectBusUnit?.value,
                PlaceIds: [selectPlace?.value],
                PlaceTypeIds: [selectPlaceType?.value],
                TypeOfPriorityIds: [selectTypeOfPriority?.value],
                ClientTypeIds: selectClientType ? [selectClientType?.value] : [],
                SpecIds: selectSpecialization ? [selectSpecialization?.value] : []
            }
            FetchApiPost('services/Organization/Organization/ProductPriorityAllocation/GetCategory', 'POST', body)
            .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then( data => {
                            return (
                                setCategory(data.data.map((item,index) => (
                                    { value: index, label: item.name }
                                ))),
                                data?.data?.length === 0
                                ?null
                                :setSelectCategory(
                                    { value: 0, label: data.data[0]?.name }
                                 )
                            )
                        }) 
                    }
                    else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    }
    
                } catch (error) {
                    console.log('error', error);
                }
            })()
        )
                
        }
    }, [history, selectBusUnit, selectClientType, selectCountry, selectPlace, selectPlaceType, selectSpecialization, selectTypeOfPriority, selectYear])

    //brand
    useEffect(() => {
        if ( selectBusUnit  && selectYear  &&  selectQuarter ) {
           
            let arr = [];
            let selectItems = [];
            const body = {
                year: selectYear?.value,
                busId: selectBusUnit?.value?.toString(),
                specIds: selectSpecialization ? [selectSpecialization?.value] : [],
                quarters: [selectQuarter?.value],
            }
            FetchApiPost('api/OldSystem/GetProductPrePlanFilter', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    return (

                                        data.map((data) => (
                                            arr.push({ label: data?.ProductName, value: data?.ProductId, ProductId: data?.ProductId })
                                        )),
                                        setBrand([...arr]),
                                        data?.map((el,index)=> {
                                            if(index<10) selectItems.push({ label: el?.ProductName, value: el?.ProductId, ProductId: el?.ProductId })
                                        }),
                                        setSelectBrand(selectItems)
                                    )
                                })
                            }
                            else if (res.status === 500 || res.status === 499) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
                
        }
    }, [history, selectBusUnit, selectQuarter, selectSpecialization, selectYear])

    


    // redux quarter
    useEffect(() => {
        if (
            selectFilter === 'specialization' &&
            selectCountry && 
            selectYear && 
            selectBusUnit &&
            selectSpecialization && 
            selectCategory && 
            selectOrgType 
            ) {
            dispatch(productPaFilters({
                selectCountry,
                selectYear,
                selectBusUnit,
                selectSpecialization,
                selectCategory,
                selectOrgType,
            }))
        }
    }, [dispatch, selectBusUnit, selectCategory, selectCountry, selectFilter, selectOrgType, selectPharmacyNameAdress, selectSpecialization, selectYear])
    
    /**input header */
    useEffect(() => {
      FetchApiGet(`services/AdminPanel/Header/GetHeadersForMarketing?id=${empId}`,'GET')
      .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                   data?.data?.map(item => {
                                    if(item.id === 1) {
                                        setplaceHeaderName(item?.translates[0]?.headerName)
                                    }
                                    else if(item.id === 8) {
                                        setPlaceTypeHeaderName(item?.translates[0]?.headerName)
                                    }
                                    else if(item.id === 15) {
                                        settypeOfPriorityHeaderName(item?.translates[0]?.headerName)
                                    }
                                    else if(item.id === 22) {
                                        setClientTypeHeaderName(item?.translates[0]?.headerName)
                                    }
                                   })
                                })
                            }
                            else if (res.status === 500 || res.status === 499) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
    }, [empId, history])
    
    useEffect(() => {
        if (
            selectFilter === 'customer' &&
            selectCountry && 
            selectYear && 
            selectBusUnit &&
            selectSpecialization && 
            selectCategory && 
            selectOrgType &&
            selectCustomer
            ) {
            dispatch(productPaFilters({
                selectCountry,
                selectYear,
                selectBusUnit,
                selectSpecialization,
                selectCategory,
                selectOrgType,
                selectCustomer
            }))
        }
    }, [dispatch, selectBusUnit, selectCategory, selectCountry, selectCustomer, selectFilter, selectOrgType, selectPharmacyNameAdress, selectSpecialization, selectYear])

    useEffect(() => {
         
            dispatch(productPaFilters({
                selectCountry,
                selectQuarter,
                selectYear,
                selectBusUnit,
                selectSpecialization,
                selectCategory,
                selectOrgType,
                selectPharmacyNameAdress,
                selectPlace,
                selectPlaceType,
                selectTypeOfPriority,
                selectClientType,
                selectBrand,
                selectprioAlloType,
                selectClinic,
                selectClient
            }))
        
    }, [dispatch, selectBrand, selectBusUnit, selectCategory, selectClient, selectClientType, selectClinic, selectCountry, selectOrgType, selectPharmacyNameAdress, selectPlace, selectPlaceType, selectQuarter, selectSpecialization, selectTypeOfPriority, selectYear, selectprioAlloType])
    useEffect(() => {
        if(selectQuarter) {
            dispatch(productPaSelectQuarter(selectQuarter))
      }
    }, [dispatch, selectQuarter])
    

  return (
    <>
    {
        isOpenFilter &&
        
          <Filter 
          filterComponentsData={selectClientType?.value === 246 ? filters2 : filters} 
          isFilterBtn={true}
          getAllFilterData={applyFilter}
          isHandleChange={true}
          deleteFilter={clearAllFilters}
          handleChange={changeFilter}
          setCloseFilter={setIsOpenFilter}
           />
        
    }
    {/* {
        isOpenFilter &&
        <div className='filters-container'>
              <div className='filters'>
                  {
                    selectClientType?.value === 246
                    ?filters2.map((data,index) =>(
                        data?.multi === true
                              ? <MultipleSelects
                                  options={data?.options}
                                  selectedItems={data?.selectFilter}
                                  setSelectedItems={data?.setSelectFilter}
                                  label={data?.label}
                                  className='filter-radius'
                                  size="small"
                                  placeholder='select'
                                  headerName={data?.label}
                                  key={index}
                                  handleChange={handleChangeFilter}
                                //   status={
                                //       selectFilter === 'specialization'
                                //           ? selectStatusSpec[index].status
                                //           : selectFilter === 'customer'
                                //               ? selectStatusCustomer[index].status
                                //               : selectFilter === 'pharmacy'
                                //                   ? selectStatusPharmacy[index].status
                                //                   : null
                                //   }
                              />
                              : <SingleSelects
                                  options={data?.options}
                                  selectedItems={data?.selectFilter}
                                  setSelectedItems={data?.setSelectFilter}
                                  label={data?.label}
                                  className='filter-radius'
                                  size="small"
                                  key={index}
                                  headerName={data?.label}
                                  handleChange={handleChangeFilter}
                                  clearIcon={true}
                                  status={selectClientType?.value === 246
                                    ?selectStatusSpec2[index].status
                                    :null
                                }
                              />
                    ))
                    :filters.map((data,index) =>(
                        data?.multi === true
                              ? <MultipleSelects
                                  options={data?.options}
                                  selectedItems={data?.selectFilter}
                                  setSelectedItems={data?.setSelectFilter}
                                  label={data?.label}
                                  className='filter-radius'
                                  size="small"
                                  placeholder='select'
                                  headerName={data?.label}
                                  key={index}
                                  handleChange={handleChangeFilter}
                                //   status={
                                //       selectFilter === 'specialization'
                                //           ? selectStatusSpec[index].status
                                //           : selectFilter === 'customer'
                                //               ? selectStatusCustomer[index].status
                                //               : selectFilter === 'pharmacy'
                                //                   ? selectStatusPharmacy[index].status
                                //                   : null
                                //   }
                              />
                              : <SingleSelects
                                  options={data?.options}
                                  selectedItems={data?.selectFilter}
                                  setSelectedItems={data?.setSelectFilter}
                                  label={data?.label}
                                  className='filter-radius'
                                  size="small"
                                  key={index}
                                  headerName={data?.label}
                                  handleChange={handleChangeFilter}
                                  clearIcon={true}
                                  status={selectStatusSpec[index].status}
                              />
                    ))
                    
                     
                  }
              </div>
              <div className='filter-button'>
                  <Icon
                      className="page-list-icons"
                      path={mdiCheck}
                      size={1}
                      color={'#0ACF97'}
                      onClick={applyFilter}
                  />
                  <Icon
                      path={mdiDeleteSweepOutline}
                      className="page-list-icons"
                      size={1}
                      color={'#FA5C7C'}
                      onClick={clearAllFilters}
                  />
                  <Icon
                      path={mdiClose}
                      size={1}
                      color={'#6C757D'}
                      className="page-list-icons"

                  />
              </div>
          </div>
    }           */}
    </>
  )
}

export default Filters