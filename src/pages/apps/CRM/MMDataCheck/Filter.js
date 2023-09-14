import React, { useEffect, useState } from 'react'
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router';
import Filters from '../../../../components/Filter';
import SaveSuccess from './SaveSuccess';
import { Details } from '@mui/icons-material';

const Filter = ({
    tableData=[],
    setTableData,
    tableItem,
    setTableItem,
    setSelectReportTypeName,
    selectReportTypeName,
    setPercentOfBox,
    percentOfBox,
    isFilter,
    setNoDataModalShow,
    reportType,
    selectReportType,
    setSelectReportType,
    setIsApply,
    isApply,
    setLoading,
    isSave,
    setIsSave,
    isDelete,
    setIsDelete
}) => {
  
    const history = useHistory();

    const userId = Number(localStorage.getItem('userEmpId'));
   
    const [selectCountry, setSelectCountry] = useState('');
    const [countryLoading, setCountryLoading] = useState(false);

    const [isTableSave, setIsTableSave] = useState(false);

    //company
    const [company, setCompany] = useState([]);
    const [selectCompany, setSelectCompany] = useState('');

    //business unite
    const [businessUnite, setBusinessUnite] = useState([]);
    const [selectBusinessUnite, setSelectBusinessUnite] = useState([]);
    const [busUniteLoading, setBusUniteLoading] = useState(false);

    //region
    const [region, setRegion] = useState([]);
    const [selectRegion, setSelectRegion] = useState([]);
 
    //area
    const [area, setArea] = useState([]);
    const [selectArea, setSelectArea] = useState([]);

    //zone
    const [zone, setZone] = useState([]);
    const [selectZone, setSelectZone] = useState([]);
    const [zoneLoading, setZoneLoading] = useState(false);

    //clinic
    const [clinic, setClinic] = useState([]);
    const [selectClinic, setSelectClinic] = useState([]);
   
    //visit type
    const [visitType, setVisitType] = useState([]);
    const [selectVisitType, setSelectVisitType] = useState();
   
    //spec
    const [spec, setSpec] = useState([]);
    const [selectSpec, setSelectSpec] = useState([]);

    //categorie
    const [categorie, setCategorie] = useState([
        {
            value : 1,
            label : 'A',
        },
        {
            value : 2,
            label : 'B',
        },
        {
            value : 3,
            label : 'C',
        }
    ]);
    const [selectCategorie, setSelectCategorie] = useState([
        {
            value : 1,
            label : 'A',
        },
        {
            value : 2,
            label : 'B',
        },
        {
            value : 3,
            label : 'C',
        }
    ]);
   
    //product
    const [product, setProduct] = useState([]);
    const [selectProduct, setselectProduct] = useState([]);
 
    /**wants type */
    const [wantsType, setwantsType] = useState([]);
    const [selectWantsType, setSelectWantsType] = useState([]);

    //global sku
    const [globalSku, setGlobalSku] = useState([]);
    const [selectGlobalSku, setSelectGlobalSku] = useState([]);
    const [globalSkuLoading, setGlobalSkuLoading] = useState(false);

    //clients
    const [clients, setClients] = useState([]);
    const [selectClients, setSelectClients] = useState([]);

    /**header client type */
    const [headerClientType, setHeaderClientType] = useState();
    
   
    const [selectPercent, setSelectPercent] = useState(
        {
            value:1,
            label:'Percent'
        },
    );
 
    //type
    const [type, setType] = useState([
        {
            value : 1,
            label : 'Last Visit'
        },
        {
            value : 2,
            label : 'New Client'
        }
    ]);
    const [selectType, setSelectType] = useState(
        {
            value : 1,
            label : 'Last Visit'
        }
    );
    
    //profile
    const [profile, setProfile] = useState([]);
    const [selectProfile, setSelectProfile] = useState([]);
 

    /**work place name */
    const [workPlaceName, setWorkPlaceName] = useState([]);
    const [selectWorkPlaceName, setSelectWorkPlaceName] = useState([]);

    /**client name */
    const [clientName, setClientName] = useState([]);
    const [selectClientName, setSelectClientName] = useState([]);


    /**Collective Filters */
    const filters = [
        {
            key: 'client type',
            label: headerClientType ? headerClientType.label : 'client type',
            options: visitType,
            state: selectVisitType,
            setState: setSelectVisitType,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'type',
            label: 'type',
            options: type,
            state: selectType,
            setState: setSelectType,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'report type',
            label: 'report type',
            options: reportType,
            state: selectReportType,
            setState: setSelectReportType,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :false
        },
        {
            key: 'company',
            label: 'company',
            options: company,
            state: selectCompany,
            setState: setSelectCompany,
            type: 'singleselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'business unite',
            label: 'business unite',
            options: businessUnite,
            state: selectBusinessUnite,
            setState: setSelectBusinessUnite,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'region',
            label: 'region',
            options: region,
            state: selectRegion,
            setState: setSelectRegion,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'zone',
            label: 'zone',
            options: zone,
            state: selectZone,
            setState: setSelectZone,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'specialization',
            label: 'specialization',
            options: spec,
            state: selectSpec,
            setState: setSelectSpec,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'category',
            label: 'category',
            options: categorie,
            state: selectCategorie,
            setState: setSelectCategorie,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        }
    ]

    /**select report type wants filter */
    const wantsFilter = [
        {
            key: 'wants type',
            label: 'wants type',
            options: wantsType,
            state: selectWantsType,
            setState: setSelectWantsType,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'workplace name',
            label: 'workplace name',
            options: workPlaceName,
            state: selectWorkPlaceName,
            setState: setSelectWorkPlaceName,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'client name',
            label: 'client name',
            options: clientName,
            state: selectClientName,
            setState: setSelectClientName,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        }
    ]

    const numberOfPatientFilter = [
        {
            key: 'product',
            label: 'product',
            options: product,
            state: selectProduct,
            setState: setselectProduct,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'profile',
            label: 'profile',
            options: profile,
            state: selectProfile,
            setState: setSelectProfile,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'workplace name',
            label: 'workplace name',
            options: workPlaceName,
            state: selectWorkPlaceName,
            setState: setSelectWorkPlaceName,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'client name',
            label: 'client name',
            options: clientName,
            state: selectClientName,
            setState: setSelectClientName,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        }
    ]

    const loyaltyFilter = [
        {
            key: 'product',
            label: 'product',
            options: product,
            state: selectProduct,
            setState: setselectProduct,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'profile',
            label: 'profile',
            options: profile,
            state: selectProfile,
            setState: setSelectProfile,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'global sku',
            label: 'global sku',
            options: globalSku,
            state: selectGlobalSku,
            setState: setSelectGlobalSku,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'workplace name',
            label: 'workplace name',
            options: workPlaceName,
            state: selectWorkPlaceName,
            setState: setSelectWorkPlaceName,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'client name',
            label: 'client name',
            options: clientName,
            state: selectClientName,
            setState: setSelectClientName,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        }
    ]

    const visitEvaluationFilter = [
        {
            key: 'product',
            label: 'product',
            options: product,
            state: selectProduct,
            setState: setselectProduct,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'workplace name',
            label: 'workplace name',
            options: workPlaceName,
            state: selectWorkPlaceName,
            setState: setSelectWorkPlaceName,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        },
        {
            key: 'client name',
            label: 'client name',
            options: clientName,
            state: selectClientName,
            setState: setSelectClientName,
            type: 'multiselect',
            maxSelect:false,
            maxSelectItem:false,
            clearIcon :true
        }
    ]
    

    const clearFilter = () => {
        setTableData([]);

        setSelectCountry('');

        setBusinessUnite([]);
        setSelectBusinessUnite([]);

        setRegion([]);
        setSelectRegion([]);

        setZone([]);
        setSelectZone([]);

        setClinic([]);
        setSelectClinic([]);

        setSelectVisitType('');
        

        setSpec([]);
        setSelectSpec([]);

        setSelectCategorie([]);

        setProduct([]);
        setselectProduct('');

        setClients([]);
        setSelectClients('');

        setProfile([]);
        setSelectProfile([]);

        setSelectType('');

        setSelectPercent('');
    }
   
    console.log(tableData);
    
    const save = () => {
     
        setIsSave(false);
        if(tableData.length>0) {
            if(selectReportType?.value === 4) { //wants
                if(selectType?.value === 2) { // new client
                    const body = {
                        wants: tableData?.map(data => (
                            {
                                workPlaceId: data.workPlaceId,
                                clientId: data.clientId,
                                businessUnitId: data.businessUnitId,
                                wantId: data.wantId,
                                percent: data.wantsPercent
                            }
                        ))
                    }
                    FetchApiPost('services/daywork/MMDataCheck/SaveWantsForNewClient', 'POST', body)
                            .then((res) =>
                                (async () => {
                                    try {
                                        if (res.status === 200) {
                                            setIsTableSave(true);
                                            res.json().then(el => {
                                              
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
                else if(selectType?.value === 1) { // last visit
                    const body = {
                        wants: tableData?.map(data => (
                            {
                                reportWantId:data.eventReportWantId,
                                reportWantPercent:data.wantsPercent
                            }
                        ))
                    }
                    FetchApiPost('services/daywork/MMDataCheck/SaveWantsForLastVisit', 'POST', body)
                            .then((res) =>
                                (async () => {
                                    try {
                                        if (res.status === 200) {
                                            setIsTableSave(true);
                                            res.json().then(el => {
                                              
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
            else if (selectReportType?.value === 1) { //number of patients
                if(selectType?.value === 2) { // new client
                    const body = {
                        numberOfPatients: tableData?.map(data => (
                            {
                                clientId: data.clientId,
                                workPlaceId: data.workPlaceId,
                                businessUnitId: data.businessUnitId,
                                productId: data.productId,
                                indicationId: data.indicaitonId,
                                profileId: data.profileId,
                                percent: data.numberOfPatients
                            }
                        ))
                    }
                    FetchApiPost('services/daywork/MMDataCheck/SaveNumberOfPatientForNewClient', 'POST', body)
                            .then((res) =>
                                (async () => {
                                    try {
                                        if (res.status === 200) {
                                            setIsTableSave(true);
                                            res.json().then(el => {
                                              
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
                else if(selectType?.value === 1) { //last visit
                    const body = {
                        data: tableData?.map(data => (
                            {
                                patientNumberId: 0,
                                percent: 0
                            }
                        ))
                    }
                    FetchApiPost('services/daywork/MMDataCheck/SaveNumberOfPatientForNewClient', 'POST', body)
                            .then((res) =>
                                (async () => {
                                    try {
                                        if (res.status === 200) {
                                            setIsTableSave(true);
                                            res.json().then(el => {
                                              
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
            else if (selectReportType?.value === 3) { // visit evaluation
                if(selectType?.value === 2) { // new client
                    const body = {
                        data: tableData?.map(data => (
                            {
                                clientId: data.clientId,
                                workPlaceId: data.workPlaceId,
                                businessUnitId: data.businessUnitId,
                                productId: data.productId,
                                percent: data.evaluationPercent
                            }
                        ))
                    }
                    FetchApiPost('services/daywork/MMDataCheck/SaveVisitEvaluationForNewClient', 'POST', body)
                            .then((res) =>
                                (async () => {
                                    try {
                                        if (res.status === 200) {
                                            setIsTableSave(true);
                                            res.json().then(el => {
                                              
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
                else if(selectType?.value === 1) { // last visit
                    const body = {
                        data: tableData?.map(data =>(
                            {  
                                id: data.evaluationId,
                                percent: data.evaluationPercent
                            }
                        ))
                    }
                    FetchApiPost('services/daywork/MMDataCheck/SaveVisitEvaluationForLastVisit', 'POST', body)
                            .then((res) =>
                                (async () => {
                                    try {
                                        if (res.status === 200) {
                                            setIsTableSave(true);
                                            res.json().then(el => {
                                              
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
            else { // loyalty
                if(selectType?.value === 2) { // new client
                    const body = {
                        data: tableData?.map(data => (
                            {
                                clientId: data.clientId,
                                workPlaceId: data.workPlaceId,
                                businessUnitId: data.businessUnitId,
                                globalSkuId: data.globalSkuId,
                                profileId: data.profileId,
                                indicationId: data.indicationId,
                                percent: data.loyalty
                            }
                        ))
                    }
                    FetchApiPost('services/daywork/MMDataCheck​/SaveLoyaltyForNewVisit', 'POST', body)
                            .then((res) =>
                                (async () => {
                                    try {
                                        if (res.status === 200) {
                                            setIsTableSave(true);
                                            res.json().then(el => {
                                              
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
                else if(selectType?.value === 1) { // last visit
                    const body = {
                        data: tableData?.map(data =>(
                            {  
                                id: data.id,
                                percent: data.percentage
                            }
                        ))
                    }
                    FetchApiPost('services/daywork/MMDataCheck/SaveLoyaltyForLastVisit', 'POST', body)
                            .then((res) =>
                                (async () => {
                                    try {
                                        if (res.status === 200) {
                                            setIsTableSave(true);
                                            res.json().then(el => {
                                              
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
        }
    }
 
    const applyFilter = () => {
        
        setIsApply(false)
        if(selectReportType?.value === 4) {
            if(selectBusinessUnite.length !== 0 && 
                selectVisitType && 
                selectSpec.length !== 0 && 
                selectCategorie.length !== 0 &&
                selectWantsType.length !== 0 &&
                selectWorkPlaceName.length !== 0 &&
                selectClientName.length !== 0 &&
                selectType
                ) {
                    setLoading(true);
            const body = {
                employeeId: userId,
                businessUnitIds: selectBusinessUnite?.map(data => data.value),
                clientTypeId: selectVisitType?.value,
                specializationIds: selectSpec?.map(data => data.value),
                categories: selectCategorie?.map(data => data.label),
                wantsType: selectWantsType?.map(data => data.value),
                workPlaceIds: selectWorkPlaceName?.map(data => data.value),
                clientIds: selectClientName?.map(data => data.value),
                type: selectType?.value
            }
            FetchApiPost('services/Daywork/MMDataCheck/GetWantsForApply', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                setLoading(false);
                                res.json().then(data => {
                                    return(
                                        setTableData(data.data?.map(el =>(
                                            {
                                                id:el.id,
                                                clientType:el.clientTypeName,
                                                clientTypeId:el.clientTypeId,
                                                reportType:el.reportTypeName,
                                                reportTypeId:el.reportTypeId,
                                                businessUnite:el.businessUnitName,
                                                businessUnitId:el.businessUnitId,
                                                workPlace:el.workPlaceName,
                                                workPlaceId:el.workPlaceId,
                                                specialization:el.specializationName,
                                                specializationId:el.specializationId,
                                                client:el.clientName,
                                                clientId:el.clientId,
                                                category:el.category,
                                                wantsType:el.wantName,
                                                wantId:el.wantId,
                                                wantsPercent:el.wantPercent,
                                                eventReportWantId:el.eventReportWantId
                                            }
                                        )))
                                    )
                                })

                            }
                            else if (res.status === 500 || res.status === 499) {
                                setBusUniteLoading(false);
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
            }
        }
        else if(selectReportType?.value === 2) {
            if(selectBusinessUnite.length !== 0 && 
                selectVisitType && 
                selectSpec.length !== 0 && 
                selectCategorie.length !== 0 &&
                selectProduct.length !== 0 &&
                selectGlobalSku.length !== 0 &&
                selectWorkPlaceName.length !== 0 &&
                selectClientName.length !== 0 &&
                selectType &&
                selectProfile.length !== 0
                ) {
                    setLoading(true);
            const body = {
                employeeId: userId,
                businessUnitIds: selectBusinessUnite?.map(data => data.value),
                clientTypeId: selectVisitType?.value,
                specializationIds: selectSpec?.map(data => data.value),
                categories: selectCategorie?.map(data => data.label),
                productIds: selectProduct?.map(data => data.value),
                globalSkuIds:selectGlobalSku?.map(data => data.value),
                workPlaceIds: selectWorkPlaceName?.map(data => data.value),
                clientIds: selectClientName?.map(data => data.value),
                type: selectType?.value,
                profileIds:selectProfile?.map(data => data.value)
            }
            FetchApiPost('services/Daywork/MMDataCheck/GetLoyaltyForApply', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                setLoading(false);
                                res.json().then(data => {
                                    return(
                                        setTableData(data.data?.map(el =>(
                                            { 
                                                id:el.id,
                                                clientType:el.clientTypeName,
                                                clientTypeId:el.clientTypeId,
                                                reportType:el.reportTypeName,
                                                reportTypeId:el.reportTypeId,
                                                businessUnite:el.businessUnitName,
                                                businessUnitId:el.businessUnitId,
                                                workPlace:el.workPlaceName,
                                                workPlaceId:el.workPlaceId,
                                                specialization:el.specializationName,
                                                specializationId:el.specializationId,
                                                client:el.clientName,
                                                clientId:el.clientId,
                                                category:el.category,
                                                product:el.productName ,
                                                productId:el.productId,
                                                globalSku:el.globalSkuName,
                                                globalSkuId:el.globalSkuId ,
                                                loyalty:el.percentage,
                                                profile:el.profileName,
                                                profileId:el.profileId,
                                                indication:el.indicationName,
                                                indicationId:el.indicationId
                                            }
                                        )))
                                    )
                                })

                            }
                            else if (res.status === 500 || res.status === 499) {
                                setLoading(false);
                                history.push('/error-500');
                            }
                            else {
                                history.push('/error-500');
                                setLoading(false);
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
            }
        }
        else if(selectReportType?.value === 1) {
            if(selectBusinessUnite.length !== 0 && 
                selectVisitType && 
                selectSpec.length !== 0 && 
                selectCategorie.length !== 0 && 
                selectProduct.length !== 0 && 
                selectWorkPlaceName.length !== 0 && 
                selectClientName.length !== 0 && 
                selectType && 
                selectCompany &&
                selectZone.length !== 0 &&
                selectProfile.length !== 0
                ) {
                    setLoading(true);
            const body = {
                employeeId: userId,
                clientTypeId: selectVisitType?.value,
                typeId: selectType?.value,
                companyId:selectCompany?.value,
                businessUnitIds: selectBusinessUnite?.map(data => data.value),
                specializationIds: selectSpec?.map(data => data.value),
                categories: selectCategorie?.map(data => data.label),
                brandIds:selectProduct?.map(data => data.value),
                workPlaceIds: selectWorkPlaceName?.map(data => data.value),
                clientIds: selectClientName?.map(data => data.value),
                zoneIds:selectZone?.map(data => data.value),
                profileIds:selectProfile?.map(data => data.value)
            }

            FetchApiPost('services/Daywork/MMDataCheck/GetPatientNumberForApply', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                let newData = [];
                                setLoading(false);
                               await res.json().then(data => {
                                    data.data.map(el => {
                                        if(el.getPatientNumberProfileDetails?.length >0) {
                                            if(el.getPatientNumberProfileDetails?.length === 1) {
                                                newData.push(
                                                    {
                                                        id:el.getPatientNumberProfileDetails[0].patientNumberCounter,
                                                        clientType:el.clientTypeName,
                                                        clientTypeId:el.clientTypeId,
                                                        reportType:el.reportTypeName,
                                                        reportTypeId:el.reportTypeId,
                                                        businessUnite:el.businessUnitName,
                                                        businessUnitId:el.businessUnitId,
                                                        workPlace:el.workPlaceName,
                                                        workPlaceId:el.workPlaceId,
                                                        specialization:el.specName,
                                                        specializationId:el.specId,
                                                        client:el.clientName,
                                                        clientId:el.clientId,
                                                        product:el.brandName,
                                                        productId:el.brandId,
                                                        indicaiton:el.getPatientNumberProfileDetails[0].indicationName,
                                                        indicaitonId:el.getPatientNumberProfileDetails[0].indicationId,
                                                        profileName:el.getPatientNumberProfileDetails[0].profileName,
                                                        profileId:el.getPatientNumberProfileDetails[0].profileId,
                                                        numberOfPatients:el.getPatientNumberProfileDetails[0].patientNumber,
                                                        category:el.category
                                                    }
                                                )
                                            }
                                            else {
                                                el.getPatientNumberProfileDetails?.map(det => (
                                                    newData.push(
                                                        {
                                                            id:det.patientNumberCounter,
                                                            clientType:el.clientTypeName,
                                                            clientTypeId:el.clientTypeId,
                                                            reportType:el.reportTypeName,
                                                            reportTypeId:el.reportTypeId,
                                                            businessUnite:el.businessUnitName,
                                                            businessUnitId:el.businessUnitId,
                                                            workPlace:el.workPlaceName,
                                                            workPlaceId:el.workPlaceId,
                                                            specialization:el.specName,
                                                            specializationId:el.specId,
                                                            client:el.clientName,
                                                            clientId:el.clientId,
                                                            product:el.brandName,
                                                            productId:el.brandId,
                                                            indicaiton:det.indicationName,
                                                            indicaitonId:det.indicationId,
                                                            profileName:det.profileName,
                                                            profileId:det.profileId,
                                                            numberOfPatients:det.patientNumber,
                                                            category:el.category
                                                        }
                                                    )
                                                ))
                                            }
                                        }
                                        // else {
                                        //     newData.push(
                                        //         {
                                        //             id:el.getPatientNumberProfileDetails[0].patientNumberCounter,
                                        //             clientType:el.clientTypeName,
                                        //             clientTypeId:el.clientTypeId,
                                        //             reportType:el.reportTypeName,
                                        //             reportTypeId:el.reportTypeId,
                                        //             businessUnite:el.businessUnitName,
                                        //             businessUnitId:el.businessUnitId,
                                        //             workPlace:el.workPlaceName,
                                        //             workPlaceId:el.workPlaceId,
                                        //             specialization:el.specName,
                                        //             specializationId:el.specId,
                                        //             client:el.clientName,
                                        //             clientId:el.clientId,
                                        //             product:el.brandName,
                                        //             productId:el.brandId,
                                        //             indicaiton:el.getPatientNumberProfileDetails[0].indicationName,
                                        //             indicaitonId:el.getPatientNumberProfileDetails[0].indicationId,
                                        //             profileName:el.getPatientNumberProfileDetails[0].profileName,
                                        //             profileId:el.getPatientNumberProfileDetails[0].profileId,
                                        //             numberOfPatients:el.getPatientNumberProfileDetails[0].patientNumber,
                                        //             category:el.category
                                        //         }
                                        //     )
                                        // }
                                        return el
                                    })
                                })
                                setTableData(newData);
                            }
                            else if (res.status === 500 || res.status === 499) {
                                setLoading(false);
                                history.push('/error-500');
                            }
                            else {
                                history.push('/error-500');
                                setLoading(false);
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
            }
        }
        else  { // visit evaluation
            if(selectCompany &&
                selectBusinessUnite.length !== 0 &&
                selectZone.length !== 0 &&
                selectVisitType &&
                selectSpec.length !== 0 &&
                selectCategorie.length !== 0 &&
                selectProduct.length !== 0 &&
                selectWorkPlaceName.length !== 0 &&
                selectClientName.length !== 0 &&
                selectType
                ) {
            const body = {
                employeeId: userId,
                companyId:selectCompany?.value,
                businessUnitIds: selectBusinessUnite?.map(data => data.value),
                zoneIds:selectZone?.map(data => data.value),
                clientTypeId: selectVisitType?.value,
                specializationIds: selectSpec?.map(data => data.value),
                categories: selectCategorie?.map(data => data.label),
                brandIds: selectProduct?.map(data => data.value),
                workPlaceIds: selectWorkPlaceName?.map(data => data.value),
                clientIds: selectClientName?.map(data => data.value),
                typeId: selectType?.value,   
            }
            FetchApiPost('services/Daywork/MMDataCheck/GetVisitEvaluationForApply', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    console.log(data);
                                    return(
                                        setTableData(data.data?.map(el =>(
                                            { 
                                                id:el.evaluationId,
                                                evaluationId:el.id,
                                                clientType:el.clientTypeName,
                                                clientTypeId:el.clientTypeId,
                                                reportType:el.reportTypeName,
                                                reportTypeId:el.reportTypeId,
                                                businessUnite:el.businessUnitName,
                                                businessUnitId:el.businessUnitId,
                                                workPlace:el.workPlaceName,
                                                workPlaceId:el.workPlaceId,
                                                specialization:el.specName,
                                                specializationId:el.specId,
                                                client:el.clientName,
                                                clientId:el.clientId,
                                                category:el.category,
                                                product:el.brandName ,
                                                productId:el.brandId,
                                                evaluationPercent:el.evaluationPercent
                                            }
                                        )))
                                    )
                                })

                            }
                            else if (res.status === 500 || res.status === 499) {
                                setLoading(false);
                                history.push('/error-500');
                            }
                            else {
                                history.push('/error-500');
                                setLoading(false);
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
        setTableData([]);
        switch (name) {
            case 'company':
                return (
                    setSelectBusinessUnite([]),
                    setBusinessUnite([]),

                    setSelectRegion([]),
                    setRegion([]),

                    setSelectZone([]),
                    setZone([]),

                    setSelectProfile([]),
                    setProfile([])
                )
            case 'client type':
                return (
                    selectType?.value === 1 && (setSelectSpec([]), setSpec([])),
                    setSelectProfile([]),
                    setProfile([])
                )
            case 'type':
                return (
                    setSelectSpec([]),
                    setSpec([]),
                    setselectProduct([]),
                    setProduct([]),
                    setSelectWorkPlaceName([]),
                    setWorkPlaceName([])
                )
            case 'business unite':
                return (
                    selectType?.value === 1 && (setSelectSpec([]), setSpec([])),
                    setSelectRegion([]),
                    setRegion([]),
                    setSelectZone([]),
                    setZone([]),
                    setselectProduct([]),
                    setProduct([]),
                    selectType?.value === 1 && (setSelectWorkPlaceName([]), setWorkPlaceName([]))
                )
            case 'region':
                return (
                    setSelectZone([]),
                    setZone([])
                )
            case 'zone':
                return (
                    selectType?.value === 2 && (setSelectWorkPlaceName([]), setWorkPlaceName([]))
                )
            case 'specialization':
                return (
                    setselectProduct([]),
                    setProduct([]),
                    setSelectProfile([]),
                    setProfile([]),
                    setSelectClientName([]),
                    setClientName([]),
                    selectType?.value === 1 && (setSelectWorkPlaceName([]), setWorkPlaceName([]))
                )
            case 'category':
                return (
                    setSelectClientName([]),
                    setClientName([])
                )
            case 'product':
                return (
                    setSelectProfile([]),
                    setProfile([]),
                    setSelectGlobalSku([]),
                    setGlobalSku([])
                )
            case 'workplace name':
                return (
                   setSelectClientName([]),
                   setClientName([])
                )
            default:
                break;
        }
    }

    // useEffect(() => {
    //  setSelectReportTypeName(selectReportType.label)
    // }, [selectReportType, setSelectReportTypeName])

    // useEffect(() => {
    //  setPercentOfBox(selectPercent.label)
    // }, [selectPercent, setPercentOfBox])

    // useEffect(() => {
    //     const filter = reportType.filter(data => data.label === selectReportTypeName);
    //     setSelectReportType(filter[0]);
    // }, [selectReportTypeName])
    
     
    /**company */
    useEffect(() => {
        setCountryLoading(true);
        FetchApiGet(`api/OldSystem/GetCompanies/${userId}`, 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(data => {
                                return (
                                    setCompany(data.map(data => (
                                        {
                                            value: data.CompanyId,
                                            label: data.CompanyName,
                                        }
                                    ))),
                                    setSelectCompany(
                                        {
                                            value: data[0].CompanyId,
                                            label: data[0].CompanyName,
                                        }
                                    )
                                )
                            })

                        }
                        else if (res.status === 500 || res.status === 499) {
                            history.push('/error-500');
                            setCountryLoading(false);
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }, [history, userId])
  
    //Bus unit
    useEffect(() => {
        if (selectCompany) {
            const body = {
                companyId: selectCompany?.value,
                year: new Date().getFullYear()
            }
            setBusUniteLoading(true);
            FetchApiPost('api/OldSystem/GetBusinessUnitCampaign', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    return (
                                        setBusinessUnite(data.map(data => (
                                            {
                                                value: data.BusinessUnitId,
                                                label: data.BusinessUnitName
                                            }
                                        ))),
                                        setSelectBusinessUnite(data.map(data => (
                                            {
                                                value: data.BusinessUnitId,
                                                label: data.BusinessUnitName
                                            }
                                        )))
                                    )
                                })

                            }
                            else if (res.status === 500 || res.status === 499) {
                                setBusUniteLoading(false);
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        }

    }, [history, selectCompany, userId])

    //region
    useEffect(() => {
        if (selectBusinessUnite.length !== 0 && selectCompany) {
            const body = {
                busIds: selectBusinessUnite.map(data => data.value),
                companyId: selectCompany?.value,
                empId: userId
            }
            FetchApiPost('api/OldSystem/GetRegionByBusIdsAndCompanyId', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    return (
                                        setRegion(data?.map(data => (
                                            {
                                                value: data.Id,
                                                label: data.Name
                                            }
                                        ))),
                                        setSelectRegion(data?.map(data => (
                                            {
                                                value: data.Id,
                                                label: data.Name
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

    }, [history, selectBusinessUnite, selectCompany, userId])

    //zone
    useEffect(() => {
        if (selectBusinessUnite.length !== 0 && selectRegion.length !== 0 && selectCompany) {
            const body = {
                busId: selectBusinessUnite?.map(data => data.value),
                regionId: selectRegion?.map(data => data.value),
                companyId: selectCompany?.value,
                empId: userId
            }
            FetchApiPost('api/OldSystem/GetZoneByBusAndRegionIdsWithCompany', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                setZoneLoading(false);
                                res.json().then(data => {
                                    return (
                                        setZone(data?.map(data => (
                                            {
                                                value: data.Id,
                                                label: data.Name
                                            }
                                        ))),
                                        setSelectZone(data?.map(data => (
                                            {
                                                value: data.Id,
                                                label: data.Name
                                            }
                                        )))
                                    )
                                })

                            }
                            else if (res.status === 500 || res.status === 499) {
                                setZoneLoading(false);
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        }

    }, [history, selectBusinessUnite, selectCompany, selectRegion, userId])

    //client type header
    useEffect(() => {
        FetchApiGet(`services/AdminPanel/Header/GetHeadersForDataCheck?id=${userId}`, 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(el => {
                                console.log(el.data);
                                setHeaderClientType({
                                    value: el.data[0].id,
                                    label: el.data[0].translates[0]?.headerName
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
    }, [history, userId])

    //client type
    useEffect(() => {
        if (headerClientType) {
            const body = {
                headerId: headerClientType?.value,
                employeeId: userId
            }
            FetchApiPost('services/AdminPanel/Defination/GetDefinationsForMicroTarget', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(el => {
                                    setVisitType(el.data?.map(data => (
                                        {
                                            value: data.id,
                                            label: data.definationName
                                        }
                                    )))
                                    setSelectVisitType(
                                        {
                                            value: el.data[0].id,
                                            label: el.data[0].definationName
                                        }
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
    }, [headerClientType, history, userId])

    //specialziation
    useEffect(() => {
        if (selectZone.length !== 0 && selectType?.value === 2) {
            const body = {
                ZoneIds:selectZone?.map(data => data?.value)
            }
            FetchApiPost('api/OldSystem/GetSpecializationList', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(el => {
                                 setSpec(el?.map(data =>(
                                    {
                                        value:data.SpecId,
                                        label:data.SpecName
                                    }
                                 )))
                                 setSelectSpec(el?.map(data =>(
                                    {
                                        value:data.SpecId,
                                        label:data.SpecName
                                    }
                                 )))
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
    }, [history, selectType, selectZone])

    //specialziation 2
    useEffect(() => {
        if (selectBusinessUnite.length !== 0 && selectVisitType && selectType?.value === 1) {
            const body = {
                businessUnitIds:selectBusinessUnite?.map(data => data.value),
                clientTypeId:selectVisitType?.value
            }
            FetchApiPost('services/Daywork/EventReport/GetEventReportSpecList', 'POST',body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(el => {
                                 setSpec(el?.data?.map(data =>(
                                    {
                                        value:data.specId,
                                        label:data.specName
                                    }
                                 )))
                                 setSelectSpec(el?.data?.map(data =>(
                                    {
                                        value:data.specId,
                                        label:data.specName
                                    }
                                 )))
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
    }, [history, selectBusinessUnite, selectType, selectVisitType])

    //category
    useEffect(() => {
        
            FetchApiGet('services/CRM/WorkPlace/GetCategories', 'GET')
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(el => {
                                 setCategorie(el?.data?.map(data =>(
                                    {
                                        value:data.id,
                                        label:data.name
                                    }
                                 )))

                                 setSelectCategorie(el?.data?.map(data =>(
                                    {
                                        value:data.id,
                                        label:data.name
                                    }
                                 )))
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
    }, [history])

    

    //product
    useEffect(() => {
        if (selectBusinessUnite.length !== 0 && selectSpec.length !== 0 && selectType?.value === 2) {


            const body = {
                BusIds: selectBusinessUnite.map(data => data.value),
                SpecIds: selectSpec?.map(data => data.value)
            }
            FetchApiPost('api/OldSystem/GetProductByBusAndSpecIds', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(el => {
                                    setProduct(el.map(data => (
                                        {
                                            value: data.ProductId,
                                            label: data.ProductName
                                        }
                                    )))
                                    setselectProduct(el.map(data => (
                                        {
                                            value: data.ProductId,
                                            label: data.ProductName
                                        }
                                    )))
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
    }, [history, selectBusinessUnite, selectSpec,selectType])

    //product 2
    useEffect(() => {
        if (selectBusinessUnite.length !== 0 && selectSpec.length !== 0 && selectType?.value === 1) {


            const body = {
                businessUnitIds: selectBusinessUnite?.map(data => data.value),
                specIds: selectSpec?.map(data => data.value)
            }
            FetchApiPost('services/Daywork/EventReport/GetProductListByBusAndSpecIds', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(el => {
                                    setProduct(el?.data?.map(data => (
                                        {
                                            value: data.productId,
                                            label: data.productName
                                        }
                                    )))
                                    setselectProduct(el?.data?.map(data => (
                                        {
                                            value: data.productId,
                                            label: data.productName
                                        }
                                    )))
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
    }, [history, selectBusinessUnite, selectSpec,selectType])

    //profile
    useEffect(() => {
        if (selectProduct?.length !== 0 && selectSpec?.length !== 0 && selectVisitType && selectCompany) {


            const body = {
                ProductIds: selectProduct?.map(data => data.value),
                SpecIds: selectSpec?.map(data => data.value),
                ClientTypeId: selectVisitType?.value,
                CompanyId: selectCompany?.value
            }
            FetchApiPost('services/Pages/Profile/GetProfilesForDataCheck', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(el => {
                                    setProfile(el.data?.map(data => (
                                        {
                                            value: data.id,
                                            label: data.profileName
                                        }
                                    )))
                                    setSelectProfile(el.data?.map(data => (
                                        {
                                            value: data.id,
                                            label: data.profileName
                                        }
                                    )))
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
    }, [history, selectCompany, selectProduct, selectSpec, selectVisitType])

    //global sku
    useEffect(() => {
        if (selectProduct.length !== 0) {


            const body = {
                employeeId: userId,
                productIdList: selectProduct?.map(data => data.value)
            }
            FetchApiPost('api/OldSystem/GetGlobalSkuListByBrandIdListandEmployeeId', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(el => {
                                    setGlobalSku(el.map(data => (
                                        {
                                            value: data.GlobalSkuId,
                                            label: data.GlobalSkuName
                                        }
                                    )))
                                    setSelectGlobalSku(el.map(data => (
                                        {
                                            value: data.GlobalSkuId,
                                            label: data.GlobalSkuName
                                        }
                                    )))
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
    }, [history, selectProduct, userId])

    //wants type
    useEffect(() => {

        FetchApiGet('services/Daywork/EventReport/GetWants', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(el => {
                                setwantsType(el?.data?.map(data => (
                                    {
                                        value: data.id,
                                        label: data.wantsName
                                    }
                                )))

                                setSelectWantsType(el?.data?.map(data => (
                                    {
                                        value: data.id,
                                        label: data.wantsName
                                    }
                                )))
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
    }, [history])

    //work place name
    useEffect(() => {
        if (selectZone.length !== 0 && selectType?.value === 2) {


            const body = {
                zoneIds:selectZone?.map(data => data.value)
            }
            FetchApiPost('services/CRM/WorkPlace/GetWorkPlacesByZoneIds', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(el => {
                                    setWorkPlaceName(el.data?.map(data => (
                                        {
                                            value: data.id,
                                            label: data.name
                                        }
                                    )))
                                    setSelectWorkPlaceName(el.data?.map(data => (
                                        {
                                            value: data.id,
                                            label: data.name
                                        }
                                    )))
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
    }, [history, selectZone,selectType])

    //work place name 2
    useEffect(() => {
        if (selectBusinessUnite.length !== 0 && selectSpec?.length !== 0 && selectVisitType && selectType?.value === 1) {


            const body = {
                businessUnitIds:selectBusinessUnite?.map(data => data.value),
                specIds:selectSpec?.map(data => data.value),
                clientTypeId:selectVisitType?.value
            }
            FetchApiPost('services/Daywork/EventReport/GetWorkPlaceListByBusAndSpecIds', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(el => {
                                    setWorkPlaceName(el.data?.map(data => (
                                        {
                                            value: data.id,
                                            label: data.name
                                        }
                                    )))
                                    setSelectWorkPlaceName(el.data?.map(data => (
                                        {
                                            value: data.id,
                                            label: data.name
                                        }
                                    )))
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
    }, [history, selectBusinessUnite, selectSpec, selectType, selectVisitType])

    //client name
    useEffect(() => {
        if (selectVisitType && selectCategorie.length !== 0 && selectWorkPlaceName.length !== 0 && selectSpec.length !== 0) {


            const body = {
                clientTypeId: selectVisitType?.value,
                categories: selectCategorie?.map(data => data.label),
                workPlaceIds: selectWorkPlaceName?.map(data => data.value),
                specIds: selectSpec?.map(data => data.value)
            }
            FetchApiPost('services/CRM/Client/GetClientForDataCheck', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(el => {
                                    setClientName(el.data?.map(data => (
                                        {
                                            value: data.id,
                                            label: data.name
                                        }
                                    )))
                                    setSelectClientName(el.data?.map(data => (
                                        {
                                            value: data.id,
                                            label: data.name
                                        }
                                    )))
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
    }, [history, selectCategorie, selectSpec, selectVisitType, selectWorkPlaceName])

    /**apply */
    useEffect(() => {
      isApply &&
      applyFilter()
    }, [isApply])

    /**clear filter */
    useEffect(() => {
        isDelete &&
            clearFilter()
    }, [isDelete])
    
    /**apply */
    useEffect(() => {
        isSave &&
        save()
      }, [isSave])
      
  return (
    <>
    <Filters
          filterComponentsData={
            filters.concat(
                selectReportType?.value === 1
                ?numberOfPatientFilter
                :selectReportType?.value === 2
                ?loyaltyFilter
                :selectReportType?.value === 3
                ?visitEvaluationFilter
                :selectReportType?.value === 4
                ?wantsFilter
                :numberOfPatientFilter

            )
          }   
          handleChange={changeFilter}
          isHandleChange={true}
          isClearIcon={false}
          deleteFilter={clearFilter}
           />    
           {
            isTableSave &&
            <SaveSuccess 
            modalShow={isTableSave} 
            setModalShow={setIsTableSave}
            messages={'Save Succesful.'}
            />
           }
    </>
  )
}

export default Filter