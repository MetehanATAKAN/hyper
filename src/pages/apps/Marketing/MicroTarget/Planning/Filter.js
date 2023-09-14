import React, { useEffect, useState } from 'react'
import Filters from '../../../../../components/Filter';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import PharmacyShouldSave from '../../../../../components/Modals/PharmacyShouldSave';
import { useTranslation } from 'react-i18next';
import { radioValueMicroTarget } from '../../../../../redux/microtarget/actions';
import PharmacySplitPercentProblem from '../../../../../components/Modals/PharmacySplitPercentProblem';

const Filter = ({
    applyFilter,
    setApplyFilter,
    setTableData1,
    setTableData2,
    orgData1,
    orgData2,
    clearFilter,
    setClearFilter,
    setLoading,
    radio 
}) => {

    const [isOpenFilter, setIsOpenFilter] = useState(true);

    const { t } = useTranslation();

    const history = useHistory();
    const empId = Number(localStorage.getItem('userEmpId'));
   
    const dispatch = useDispatch();

    /**warnnig messages */
    const [isWarningMessages, setIsWarningMessages] = useState(false);
    const [warningMessages, setWarningMessages] = useState('');

    // years
    const [year, setYear] = useState([]);
    const [selectYear, setSelectYear] = useState({
        value: new Date().getFullYear(),
        label: String(new Date().getFullYear())
    });

    //month single
    const [month, setMonth] = useState([]);
    const [selectMonth, setSelectMonth] = useState();
    
    //Week single
    const [week, setWeek] = useState([]);
    const [selectWeek, setSelectWeek] = useState();

    //Company single
    const [company, setCompany] = useState([]);
    const [selectCompany, setSelectCompany] = useState();

    //bus unit single
    const [busUnit, setBusUnit] = useState([]);
    const [selectBusUnit, setSelectBusUnit] = useState();
   
    //zone single
    const [zone, setzone] = useState([]);
    const [selectZone, setSelectZone] = useState();

    //employee
    const [employee, setEmployee] = useState([]);
    const [selectEmployee, setSelectEmployee] = useState();

    //microzone
    const [microzone, setMicrozone] = useState([]);
    const [selectMicrozone, setSelectMicrozone] = useState([]);

    //place
    const [place, setPlace] = useState([]);
    const [selectPlace, setSelectPlace] = useState([]);
    const [placeName, setPlaceName] = useState('place');

    //place type
    const [placeType, setPlaceType] = useState([]);
    const [selectPlaceType, setSelectPlaceType] = useState([]);
    const [placeTypeName, setPlaceTypeName] = useState('place type');

    //type of priority
    const [typeOfPriority, setTypeOfPriority] = useState([]);
    const [selectTypeOfPriority, setSelectTypeOfPriority] = useState([]);
    const [typeOfPriorityHeaderName, settypeOfPriorityHeaderName] = useState('type of priority');  

    // headerIDS
    const [headerIds, setHeaderIds] = useState([]);
    
    //workplace category
    const [workplaceCategory, setWorkplaceCategory] = useState([]);
    const [selectWorkplaceCategory, setSelectWorkplaceCategory] = useState([]);

    //client category
    const [clientCategory, setClientCategory] = useState([]);
    const [selectClientCategory, setSelectClientCategory] = useState([]);

   

    const [noDataModal, setNoDataModal] = useState(false);

    const handleNoData = () => {
        setNoDataModal(false);
    }

    const [radioValue, setRadioValue] = useState(radio);
   
    const radioGroup = [
        {
            value:1,
            label:'microzone'
        },
        {
            value:2,
            label:'workplace'
        },
        {
            value:3,
            label:'client'
        }
    ]
    const radioChange = (e) => {
        setRadioValue(e.target.value);
        dispatch(radioValueMicroTarget(e.target.value))
    }

    const clientFilters = [
        {
            radioGroup:radioGroup,
            value:radioValue,
            change:radioChange,
            className:'planning',
            type: 'radio',
        },
        {
            key:'year',
            label: 'year',
            options: year,
            state: selectYear,
            setState: setSelectYear,
            type: 'singleselect',
        },
        {
            key:'month',
            label: 'month',
            options: month,
            state: selectMonth,
            setState: setSelectMonth,
            type: 'singleselect',
        },
        {
            key:'week',
            label: 'week',
            options: week,
            state: selectWeek,
            setState: setSelectWeek,
            type: 'singleselect',
        },
        {
            key:'company',
            label: 'company',
            options: company,
            state: selectCompany,
            setState: setSelectCompany,
            type: 'singleselect',
        },
        {
            key:'business unite',
            label: 'business unite',
            options: busUnit,
            state: selectBusUnit,
            setState: setSelectBusUnit,
            type: 'singleselect',
        },
        {
            key:'zone',
            label: 'zone',
            options: zone,
            state: selectZone,
            setState: setSelectZone,
            type: 'singleselect',
        },
        {
            key:'employee',
            label: 'employee',
            options: employee,
            state: selectEmployee,
            setState: setSelectEmployee,
            type: 'singleselect',
        },
        {
            key:'microzone',
            label: 'microzone',
            options: microzone,
            state: selectMicrozone,
            setState: setSelectMicrozone,
            type: 'multiselect',
        },
        {
            key:'place',
            label: placeName,
            options: place,
            state: selectPlace,
            setState: setSelectPlace,
            type: 'multiselect',
        },
        {
            key:'place type',
            label: placeTypeName,
            options: placeType,
            state: selectPlaceType,
            setState: setSelectPlaceType,
            type: 'multiselect',
        },
        {
            key:'type of priority',
            label: typeOfPriorityHeaderName,
            options: typeOfPriority,
            state: selectTypeOfPriority,
            setState: setSelectTypeOfPriority,
            type: 'multiselect',
        },
        {
            key:'workplace category',
            label: 'workplace category',
            options: workplaceCategory,
            state: selectWorkplaceCategory,
            setState: setSelectWorkplaceCategory,
            type: 'multiselect',
        },
        {
            key:'client category',
            label: 'client category',
            options: clientCategory,
            state: selectClientCategory,
            setState: setSelectClientCategory,
            type: 'multiselect',
        }
    ]

    const workPlaceFilters = [
        {
            radioGroup:radioGroup,
            value:radioValue,
            change:radioChange,
            className:'planning',
            type: 'radio',
        },
        {
            key:'year',
            label: 'year',
            options: year,
            state: selectYear,
            setState: setSelectYear,
            type: 'singleselect',
        },
        {
            key:'month',
            label: 'month',
            options: month,
            state: selectMonth,
            setState: setSelectMonth,
            type: 'singleselect',
        },
        {
            key:'week',
            label: 'week',
            options: week,
            state: selectWeek,
            setState: setSelectWeek,
            type: 'singleselect',
        },
        {
            key:'company',
            label: 'company',
            options: company,
            state: selectCompany,
            setState: setSelectCompany,
            type: 'singleselect',
        },
        {
            key:'business unite',
            label: 'business unite',
            options: busUnit,
            state: selectBusUnit,
            setState: setSelectBusUnit,
            type: 'singleselect',
        },
        {
            key:'zone',
            label: 'zone',
            options: zone,
            state: selectZone,
            setState: setSelectZone,
            type: 'singleselect',
        },
        {
            key:'employee',
            label: 'employee',
            options: employee,
            state: selectEmployee,
            setState: setSelectEmployee,
            type: 'singleselect',
        },
        {
            key:'microzone',
            label: 'microzone',
            options: microzone,
            state: selectMicrozone,
            setState: setSelectMicrozone,
            type: 'multiselect',
        },
        {
            key:'place',
            label: placeName,
            options: place,
            state: selectPlace,
            setState: setSelectPlace,
            type: 'multiselect',
        },
        {
            key:'place type',
            label: placeTypeName,
            options: placeType,
            state: selectPlaceType,
            setState: setSelectPlaceType,
            type: 'multiselect',
        },
        {
            key:'type of priority',
            label: typeOfPriorityHeaderName,
            options: typeOfPriority,
            state: selectTypeOfPriority,
            setState: setSelectTypeOfPriority,
            type: 'multiselect',
        },
        {
            key:'workplace category',
            label: 'workplace category',
            options: workplaceCategory,
            state: selectWorkplaceCategory,
            setState: setSelectWorkplaceCategory,
            type: 'multiselect',
        }
    ]

    const microzoneFilters = [
        {
            radioGroup:radioGroup,
            value:radioValue,
            change:radioChange,
            className:'planning',
            type: 'radio',
        },
        {
            key:'year',
            label: 'year',
            options: year,
            state: selectYear,
            setState: setSelectYear,
            type: 'singleselect',
        },
        {
            key:'month',
            label: 'month',
            options: month,
            state: selectMonth,
            setState: setSelectMonth,
            type: 'singleselect',
        },
        {
            key:'week',
            label: 'week',
            options: week,
            state: selectWeek,
            setState: setSelectWeek,
            type: 'singleselect',
        },
        {
            key:'company',
            label: 'company',
            options: company,
            state: selectCompany,
            setState: setSelectCompany,
            type: 'singleselect',
        },
        {
            key:'business unite',
            label: 'business unite',
            options: busUnit,
            state: selectBusUnit,
            setState: setSelectBusUnit,
            type: 'singleselect',
        },
        {
            key:'zone',
            label: 'zone',
            options: zone,
            state: selectZone,
            setState: setSelectZone,
            type: 'singleselect',
        },
        {
            key:'employee',
            label: 'employee',
            options: employee,
            state: selectEmployee,
            setState: setSelectEmployee,
            type: 'singleselect',
        },
        {
            key:'microzone',
            label: 'microzone',
            options: microzone,
            state: selectMicrozone,
            setState: setSelectMicrozone,
            type: 'multiselect',
        }
    ]
    
    
    
/**apply filter */
    const apply = () => {
        setApplyFilter(false);
     
        const body = {
            employeeId: selectEmployee?.value,
            loginEmployeeId:empId,
            year: selectYear?.value,
            month: selectMonth?.value,
            week: selectWeek?.value,
            companyId: selectCompany?.value,
            businessUnitId: selectBusUnit?.value,
            zoneId: selectZone?.value,
            microZoneIds: selectMicrozone?.map(data => data.value),
            placeIds: (
                radioValue === 1
                ?   []
                :   radioValue === 2 || radioValue === 3
                ?   selectPlace?.map(data => data.value)
                :   []
            ),
            playeTypeIds: (
                radioValue === 1
                ?   []
                :   radioValue === 2 || radioValue === 3
                ?   selectPlaceType?.map(data => data.value)
                :   []
            ),
            typeOfPriorityIds: (
                radioValue === 1
                ?   []
                :   radioValue === 2 || radioValue === 3
                ?   selectTypeOfPriority?.map(data => data.value)
                :   []
            ),
            placeCategories: (
                radioValue === 1
                ?   []
                :   radioValue === 2 || radioValue === 3
                ?   selectWorkplaceCategory?.map(data => data.label)
                :   []
            ),
            clientCategories: (
                radioValue === 1 || radioValue === 2
                ?   []
                :   radioValue === 3 
                ?   selectClientCategory?.map(data => data.label)
                :   []
            )
        }
        const conditionMicroZone    =  selectYear && selectMonth && selectWeek && selectCompany && selectBusUnit && selectZone ;
        const conditionWorkplace    =  selectYear && selectMonth && selectWeek && selectCompany && selectBusUnit && selectZone && selectPlace.length !== 0 && selectPlaceType.length !== 0 && selectTypeOfPriority.length !== 0 && selectWorkplaceCategory.length !== 0 ;
        const conditionClient       =  selectYear && selectMonth && selectWeek && selectCompany && selectBusUnit && selectZone && selectPlace.length !== 0 && selectPlaceType.length !== 0 && selectTypeOfPriority.length !== 0 && selectWorkplaceCategory.length !== 0 && selectClientCategory.length !== 0 ;

        if(true
            // radioValue === 1
            // ?   conditionMicroZone
            // :   radioValue === 2
            // ?   conditionWorkplace
            // :   conditionClient
        ) {
            setLoading(true);
            FetchApiPost('services/CRM/MicroTarget/GetMicroTargetByFilter','POST' , body)
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                           if(radioValue === 1) {
                            setTableData1([]);
                            setTableData2([]);
                            setLoading(false);
                            res.json().then(data => {

                                const filteredData1 = data?.data?.filter((el)=> el?.isRecommended === true);
                                const filteredData2 = data?.data?.filter((el)=> el?.isRecommended === false);

                                setTableData1(filteredData1.map((item,index)=>(
                                    {
                                        id: index,
                                        loginEmployeeId:item?.loginEmployeeId,
                                        employeeId:item?.employeeId,
                                        targeted: item?.criteria,
                                        isRecommended:item?.isRecommended,
                                        days: item?.days,
                                        order: item?.order,
                                        startTime: item?.startTime,
                                        totalTime: item?.totalTime,
                                        travellingTime: item?.travellingTime,
                                        name: item?.name,
                                        nameId: item?.nameId,
                                        category: item?.category,
                                        potential: item?.potential,
                                        avarageVisit: item?.avarageVisit,
                                        actualSales: item?.actualSales,
                                        type: item?.type,
                                        workPlace: item?.workPlaceCount,
                                        a: item?.a,
                                        b: item?.b,
                                        c: item?.c,
                                        company: item?.companyName,
                                        companyId:item?.companyId,
                                        busUnit: item?.businessUnitName,
                                        businessUnitId: item?.businessUnitId,
                                        zone: item?.zoneName,
                                        zoneId: item?.zoneId
                                    }
                                )))

                                setTableData2(filteredData2.map((item, index) => (
                                    {
                                        id: index,
                                        loginEmployeeId:item?.loginEmployeeId,
                                        employeeId:item?.employeeId,
                                        targeted: item?.criteria,
                                        isRecommended:item?.isRecommended,
                                        days: item?.days,
                                        order: item?.order,
                                        startTime: item?.startTime,
                                        totalTime: item?.totalTime,
                                        travellingTime: item?.travellingTime,
                                        name: item?.name,
                                        nameId: item?.nameId,
                                        category: item?.category,
                                        potential: item?.potential,
                                        avarageVisit: item?.avarageVisit,
                                        actualSales: item?.actualSales,
                                        type: item?.type,
                                        workPlace: item?.workPlaceCount,
                                        a: item?.a,
                                        b: item?.b,
                                        c: item?.c,
                                        company: item?.companyName,
                                        companyId:item?.companyId,
                                        busUnit: item?.businessUnitName,
                                        businessUnitId: item?.businessUnitId,
                                        zone: item?.zoneName,
                                        zoneId: item?.zoneId
                                    }
                                )))
                                // data?.data?.map((item,index)=>{
                                //     if(item?.isRecommended) {
                                //        return(
                                //         setTableData1(prev => [...prev,{
                                //             id:index,
                                //             targeted:item?.criteria,
                                //             days:item?.days,
                                //             order:item?.order,
                                //             startTime:item?.startTime,
                                //             totalTime:item?.totalTime,
                                //             travellingTime:item?.travellingTime,
                                //             name:item?.name,
                                //             nameId:item?.nameId,
                                //             category:item?.category,
                                //             potential:item?.potential,
                                //             avarageVisit:item?.avarageVisit,
                                //             actualSales:item?.actualSales,
                                //             type:item?.type,
                                //             workPlace:item?.workPlaceCount,
                                //             a:item?.a,
                                //             b:item?.b,
                                //             c:item?.c,
                                //             company:item?.companyName,
                                //             busUnit:item?.businessUnitName,
                                //             businessUnitId:item?.businessUnitId,
                                //             zone:item?.zoneName,
                                //             zoneId:item?.zoneId
                                //         }])
                                //        )
                                //     }
                                //     else {
                                //        return(
                                //         setTableData2(prev => [...prev,],{
                                //             id:index,
                                //             targeted:item?.criteria,
                                //             days:item?.days,
                                //             order:item?.order,
                                //             startTime:item?.startTime,
                                //             totalTime:item?.totalTime,
                                //             travellingTime:item?.travellingTime,
                                //             name:item?.name,
                                //             nameId:item?.nameId,
                                //             category:item?.category,
                                //             potential:item?.potential,
                                //             avarageVisit:item?.avarageVisit,
                                //             actualSales:item?.actualSales,
                                //             type:item?.type,
                                //             workPlace:item?.workPlaceCount,
                                //             a:item?.a,
                                //             b:item?.b,
                                //             c:item?.c,
                                //             company:item?.companyName,
                                //             busUnit:item?.businessUnitName,
                                //             businessUnitId:item?.businessUnitId,
                                //             zone:item?.zoneName,
                                //             zoneId:item?.zoneId
                                //         })
                                //        )
                                //     }
                                // })
                            })
                           }
                           else if(radioValue === 2) {
                            setTableData1([]);
                            setTableData2([]);
                            setLoading(false);

                            res.json().then(data => {
                                const filteredData1 = data?.data?.filter((el)=> el?.isRecommended === true);
                                const filteredData2 = data?.data?.filter((el)=> el?.isRecommended === false);

                                setTableData1(filteredData1.map((item,index)=>(
                                    {
                                        id:index,
                                        loginEmployeeId:item?.loginEmployeeId,
                                        employeeId:item?.employeeId,
                                        targeted:item?.criteria,
                                        days:item?.days,
                                        order:index+1,
                                        startTime:item?.startTime,
                                        totalTime:item?.totalTime,
                                        travellingTime:item?.travellingTime,
                                        name:item?.name,
                                        nameId:item?.nameId,
                                        isRecommended:item?.isRecommended,
                                        category:item?.category,
                                        potential:item?.potential,
                                        avarageVisit:item?.avarageVisit,
                                        actualSales:item?.actualSales,
                                        type:item?.type,
                                        client:item?.clientCount,
                                        spec:'-',
                                        a:item?.a,
                                        b:item?.b,
                                        c:item?.c,
                                        company:item?.companyName,
                                        companyId:item?.companyId,
                                        busUnit:item?.businessUnitName,
                                        businessUnitId:item?.businessUnitId,
                                        zone:item?.zoneName,
                                        zoneId:item?.zoneId,
                                        place:item?.placeName,
                                        placeId:item?.placeId,
                                        placeType:item?.placeTypeName,
                                        placeTypeId:item?.placeTypeId,
                                        typeOfPriority:item?.typeOfPriorityName,
                                        typeOfPriorityId:item?.typeOfPriorityId,
                                        microzoneName:'-',
                                        specCount:item?.specCount
                                    }
                                )))

                                setTableData2(filteredData2.map((item,index)=>(
                                    {
                                        id:index,
                                        loginEmployeeId:item?.loginEmployeeId,
                                        employeeId:item?.employeeId,
                                        targeted:item?.criteria,
                                        days:item?.days,
                                        order:'-',
                                        startTime:item?.startTime,
                                        totalTime:item?.totalTime,
                                        travellingTime:item?.travellingTime,
                                        name:item?.name,
                                        nameId:item?.nameId,
                                        category:item?.category,
                                        potential:item?.potential,
                                        avarageVisit:item?.avarageVisit,
                                        actualSales:item?.actualSales,
                                        type:item?.type,
                                        client:item?.clientCount,
                                        spec:'-',
                                        a:item?.a,
                                        b:item?.b,
                                        c:item?.c,
                                        company:item?.companyName,
                                        companyId:item?.companyId,
                                        busUnit:item?.businessUnitName,
                                        businessUnitId:item?.businessUnitId,
                                        zone:item?.zoneName,
                                        zoneId:item?.zoneId,
                                        place:item?.placeName,
                                        placeId:item?.placeId,
                                        placeType:item?.placeTypeName,
                                        placeTypeId:item?.placeTypeId,
                                        typeOfPriority:item?.typeOfPriorityName,
                                        typeOfPriorityId:item?.typeOfPriorityId,
                                        microzoneName:'-',
                                        specCount:item?.specCount
                                    }
                                )))
                               
                                // data?.data?.map((item,index)=>{
                                //     if(item?.isRecommended === true) {
                                //        return(
                                //         setTableData1(prev => [...prev,{
                                //             id:index,
                                //             targeted:item?.criteria,
                                //             days:item?.days,
                                //             order:item?.order,
                                //             startTime:item?.startTime,
                                //             totalTime:item?.totalTime,
                                //             travellingTime:item?.travellingTime,
                                //             name:item?.name,
                                //             nameId:item?.nameId,
                                //             category:item?.category,
                                //             potential:item?.potential,
                                //             avarageVisit:item?.avarageVisit,
                                //             actualSales:item?.actualSales,
                                //             type:item?.type,
                                //             client:item?.clientCount,
                                //             spec:'-',
                                //             a:item?.a,
                                //             b:item?.b,
                                //             c:item?.c,
                                //             company:item?.companyName,
                                //             busUnit:item?.businessUnitName,
                                //             businessUnitId:item?.businessUnitId,
                                //             zone:item?.zoneName,
                                //             zoneId:item?.zoneId,
                                //             place:item?.placeName,
                                //             placeId:item?.placeId,
                                //             placeType:item?.placeTypeName,
                                //             placeTypeId:item?.placeTypeId,
                                //             typeOfPriority:item?.typeOfPriorityName,
                                //             typeOfPriorityId:item?.typeOfPriorityId,
                                //             microzoneName:'-'
                                //         }])
                                //        )
                                //     }
                                //     else {
                                //        return(
                                //         setTableData2(prev => [...prev,],{
                                //             id:index,
                                //             targeted:item?.criteria,
                                //             days:item?.days,
                                //             order:item?.order,
                                //             startTime:item?.startTime,
                                //             totalTime:item?.totalTime,
                                //             travellingTime:item?.travellingTime,
                                //             name:item?.name,
                                //             nameId:item?.nameId,
                                //             category:item?.category,
                                //             potential:item?.potential,
                                //             avarageVisit:item?.avarageVisit,
                                //             actualSales:item?.actualSales,
                                //             type:item?.type,
                                //             client:item?.clientCount,
                                //             spec:'-',
                                //             a:item?.a,
                                //             b:item?.b,
                                //             c:item?.c,
                                //             company:item?.companyName,
                                //             busUnit:item?.businessUnitName,
                                //             businessUnitId:item?.businessUnitId,
                                //             zone:item?.zoneName,
                                //             zoneId:item?.zoneId,
                                //             place:item?.placeName,
                                //             placeId:item?.placeId,
                                //             placeType:item?.placeTypeName,
                                //             placeTypeId:item?.placeTypeId,
                                //             typeOfPriority:item?.typeOfPriorityName,
                                //             typeOfPriorityId:item?.typeOfPriorityId,
                                //             microzoneName:'-'
                                //         })
                                //        )
                                //     }
                                // })
                            })
                           }
                           else { // radioValue === 3
                            setTableData1([]);
                            setTableData2([]);
                            setLoading(false);

                            res.json().then(data => {
                                const filteredData1 = data?.data?.filter((el)=> el?.isRecommended === true);
                                const filteredData2 = data?.data?.filter((el)=> el?.isRecommended === false);

                                setTableData1(filteredData1.map((item,index)=>(
                                    {
                                        id:index+1,
                                        loginEmployeeId:item?.loginEmployeeId,
                                        employeeId:item?.employeeId,
                                        days:item?.days,
                                        hour:item?.startTime,
                                        time:item?.totalTime,
                                        timeBetween:0,
                                        name:item?.name,
                                        nameId:item?.nameId,
                                        targeted:item?.criteria,
                                        category:item?.category,
                                        potential:item?.potential,
                                        avarageVisit:item?.avarageVisit,
                                        actualSales:item?.actualSales,
                                        type:item?.type,
                                        typeId:item?.typeId,
                                        spec:item?.specName,
                                        specId:item?.specId,
                                        connectedWorkplace:item?.workPlaceName,
                                        workPlaceId:item?.workPlaceId,
                                        company:item?.companyName,
                                        companyId:item?.companyId,
                                        busUnit:item?.businessUnitName,
                                        businessUnitId:item?.businessUnitId,
                                        zone:item?.zoneName,
                                        zoneId:item?.zoneId,
                                        zoneType:'-',
                                        year:item?.year,
                                        month:item?.month,
                                        week:item?.week,
                                        placeId:item?.placeId,
                                        placeName:item?.placeName,
                                        placeTypeId:item?.placeTypeId,
                                        placeTypeName:item?.placeTypeName,
                                        typeOfPriorityId:item?.typeOfPriorityId,
                                        typeOfPriorityName:item?.typeOfPriorityName,
                                        isRecommended:item?.isRecommended,
                                        travellingTime:item?.travellingTime,
                                        clientCount:item?.clientCount,
                                        a:item?.a,
                                        b:item?.b,
                                        c:item?.c
                                    }
                                )))
                                orgData1(filteredData1.map((item,index)=>(
                                    {
                                        id:index+1,
                                        loginEmployeeId:item?.loginEmployeeId,
                                        employeeId:item?.employeeId,
                                        days:item?.days,
                                        hour:item?.startTime,
                                        time:item?.totalTime,
                                        timeBetween:0,
                                        name:item?.name,
                                        nameId:item?.nameId,
                                        targeted:item?.criteria,
                                        category:item?.category,
                                        potential:item?.potential,
                                        avarageVisit:item?.avarageVisit,
                                        actualSales:item?.actualSales,
                                        type:item?.type,
                                        typeId:item?.typeId,
                                        spec:item?.specName,
                                        specId:item?.specId,
                                        connectedWorkplace:item?.workPlaceName,
                                        workPlaceId:item?.workPlaceId,
                                        company:item?.companyName,
                                        companyId:item?.companyId,
                                        busUnit:item?.businessUnitName,
                                        businessUnitId:item?.businessUnitId,
                                        zone:item?.zoneName,
                                        zoneId:item?.zoneId,
                                        zoneType:'-',
                                        year:item?.year,
                                        month:item?.month,
                                        week:item?.week,
                                        placeId:item?.placeId,
                                        placeName:item?.placeName,
                                        placeTypeId:item?.placeTypeId,
                                        placeTypeName:item?.placeTypeName,
                                        typeOfPriorityId:item?.typeOfPriorityId,
                                        typeOfPriorityName:item?.typeOfPriorityName,
                                        isRecommended:item?.isRecommended,
                                        travellingTime:item?.travellingTime,
                                        clientCount:item?.clientCount,
                                        a:item?.a,
                                        b:item?.b,
                                        c:item?.c
                                    }
                                )))
                                setTableData2(filteredData2.map((item,index)=>(
                                    {
                                        id:index+1,
                                        loginEmployeeId:item?.loginEmployeeId,
                                        employeeId:item?.employeeId,
                                        days:item?.days,
                                        hour:item?.startTime,
                                        time:item?.totalTime,
                                        timeBetween:0,
                                        name:item?.name,
                                        nameId:item?.nameId,
                                        targeted:item?.criteria,
                                        category:item?.category,
                                        potential:item?.potential,
                                        avarageVisit:item?.avarageVisit,
                                        actualSales:item?.actualSales,
                                        type:item?.type,
                                        typeId:item?.typeId,
                                        spec:item?.specName,
                                        specId:item?.specId,
                                        connectedWorkplace:item?.workPlaceName,
                                        workPlaceId:item?.workPlaceId,
                                        company:item?.companyName,
                                        companyId:item?.companyId,
                                        busUnit:item?.businessUnitName,
                                        businessUnitId:item?.businessUnitId,
                                        zone:item?.zoneName,
                                        zoneId:item?.zoneId,
                                        zoneType:'-',
                                        year:item?.year,
                                        month:item?.month,
                                        week:item?.week,
                                        placeId:item?.placeId,
                                        placeName:item?.placeName,
                                        placeTypeId:item?.placeTypeId,
                                        placeTypeName:item?.placeTypeName,
                                        typeOfPriorityId:item?.typeOfPriorityId,
                                        typeOfPriorityName:item?.typeOfPriorityName,
                                        isRecommended:item?.isRecommended,
                                        travellingTime:item?.travellingTime,
                                        clientCount:item?.clientCount,
                                        a:item?.a,
                                        b:item?.b,
                                        c:item?.c
                                    }
                                )))
                                orgData2(filteredData2.map((item,index)=>(
                                    {
                                        id:index+1,
                                        loginEmployeeId:item?.loginEmployeeId,
                                        employeeId:item?.employeeId,
                                        days:item?.days,
                                        hour:item?.startTime,
                                        time:item?.totalTime,
                                        timeBetween:0,
                                        name:item?.name,
                                        nameId:item?.nameId,
                                        targeted:item?.criteria,
                                        category:item?.category,
                                        potential:item?.potential,
                                        avarageVisit:item?.avarageVisit,
                                        actualSales:item?.actualSales,
                                        type:item?.type,
                                        typeId:item?.typeId,
                                        spec:item?.specName,
                                        specId:item?.specId,
                                        connectedWorkplace:item?.workPlaceName,
                                        workPlaceId:item?.workPlaceId,
                                        company:item?.companyName,
                                        companyId:item?.companyId,
                                        busUnit:item?.businessUnitName,
                                        businessUnitId:item?.businessUnitId,
                                        zone:item?.zoneName,
                                        zoneId:item?.zoneId,
                                        zoneType:'-',
                                        year:item?.year,
                                        month:item?.month,
                                        week:item?.week,
                                        placeId:item?.placeId,
                                        placeName:item?.placeName,
                                        placeTypeId:item?.placeTypeId,
                                        placeTypeName:item?.placeTypeName,
                                        typeOfPriorityId:item?.typeOfPriorityId,
                                        typeOfPriorityName:item?.typeOfPriorityName,
                                        isRecommended:item?.isRecommended,
                                        travellingTime:item?.travellingTime,
                                        clientCount:item?.clientCount,
                                        a:item?.a,
                                        b:item?.b,
                                        c:item?.c
                                    }
                                )))
                            })
                           }
                        }
                        else if(res.status === 409) {
                            res.json().then(data => {
                                setLoading(false);
                                setIsWarningMessages(true);
                                setWarningMessages(data.errors[0]);
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

    const clear = () => {
        setClearFilter(false);

        setSelectYear();
        setSelectMonth();
        setSelectWeek();
        setSelectCompany();

        setBusUnit([]);
        setSelectBusUnit();

        setzone([]);
        setSelectZone();

        setMicrozone([]);
        setSelectMicrozone([]);

        setSelectPlace([]);
        setSelectPlaceType([]);
        setSelectTypeOfPriority([]);

        setSelectWorkplaceCategory([]);
        setSelectClientCategory([]);
    }

    /**Change Filter */
    const changeFilter = (name) => {
        switch (name) {
            case 'year':
                return (
                    setSelectBusUnit(),
                    setBusUnit([]),

                    setSelectMicrozone([]),
                    setMicrozone([]),

                    setSelectZone(),
                    setzone([])
                )
            case 'month':
                return (
                    setSelectBusUnit(),
                    setBusUnit([]),

                    setSelectMicrozone([]),
                    setMicrozone([])
                )
            case 'company':
                return (
                    setSelectBusUnit(),
                    setBusUnit([]),

                    setSelectZone(),
                    setzone([])
                )
            case 'business unite':
                return (
                    setSelectZone(),
                    setzone([])
                )
            case 'zone':
                return (
                    setSelectMicrozone([]),
                    setMicrozone([]),

                    setSelectEmployee(),
                    setEmployee([])
                )
            default:
                break;
        }
    }

    const isFilters = () => {

        if (radioValue === 1) {
            return microzoneFilters
        }
        else if (radioValue === 2) {
            return workPlaceFilters
        }
        else if (radioValue === 3) {
            return clientFilters
        }

    }

    /**year */
    useEffect(() => {
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
    }, [empId, history])

    /**month */
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetMonth', 'GET')
        .then((res) =>
        (async () => {
            try {
                if (res.status === 200) {
                    res.json().then( data => {
                        setMonth(data?.map(month => (
                            {
                                value:month?.Id,
                                label:month?.Val1
                            }
                        )));
                        const selectedMonth = data?.filter((el)=> el?.Val2 === 'selected');

                        setSelectMonth(
                            {
                                value:selectedMonth[0]?.Id,
                                label:selectedMonth[0]?.Val1
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
    }, [history])

    /**week */
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetWeek', 'GET')
        .then((res) =>
        (async () => {
            try {
                if (res.status === 200) {
                    res.json().then( data => {
                        setWeek(data?.map(month => (
                            {
                                value:month?.Id,
                                label:month?.Val1
                            }
                        )));
                        const selectedWeek = data?.filter((el)=> el.Val2 === 'selected');

                        setSelectWeek(
                            {
                                value:selectedWeek[0]?.Id,
                                label:selectedWeek[0]?.Val1
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
    }, [history])

    /**company */
    useEffect(() => {
        FetchApiGet(`api/OldSystem/GetCompanies/${empId}`, 'GET')
        .then((res) =>
        (async () => {
            try {
                if (res.status === 200) {
                    res.json().then(data => {
                        setCompany(data?.map(item => (
                            {
                                value: item?.CompanyId,
                                label: item?.CompanyName
                            }
                        )));
                        data?.length !== 0
                            ? setSelectCompany({
                                value: data[0]?.CompanyId,
                                label: data[0]?.CompanyName
                            })
                            : setSelectCompany()
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

    /**business unite */
    useEffect(() => {
        if(selectMonth && selectCompany && selectYear) {
            const body = {
                empId:empId,
                month:selectMonth?.value,
                ScmId:String(selectCompany?.value),
                year:selectYear?.value
            }
            FetchApiPost('api/OldSystem/GetProductPriorityBusinessFilter','POST' , body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setBusUnit(data?.map(item => (
                                        {
                                            value: item?.Id,
                                            label: item?.Val1
                                        }
                                    )))
                                    data?.length !== 0
                                    ?setSelectBusUnit(
                                        {
                                            value: data[0]?.Id,
                                            label: data[0]?.Val1
                                        } 
                                    )
                                    :setSelectBusUnit()
                                    
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
         
    }, [empId, history, selectCompany, selectMonth, selectYear])

    /**zone */
    useEffect(() => {
        if(selectBusUnit && selectCompany) {
            const body = {
                busId:selectBusUnit?.value,
                countryId:selectCompany?.value,
                empId:empId
            }
            FetchApiPost('api/OldSystem/GetZoneByBusinessUnitAndCountryId','POST' , body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setzone(data?.map(item => (
                                        {
                                            value: item?.Id,
                                            label: item?.Name
                                        }
                                    )))
                                    data?.length !== 0
                                    ?  setSelectZone(
                                        {
                                            value: data[0]?.Id,
                                            label: data[0]?.Name
                                        }
                                    )
                                    :setSelectZone()
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
         
    }, [empId, history, selectBusUnit, selectCompany])

    /**employee */
    useEffect(() => {
        if(selectZone) {
            const body = {
                ZoneIds:[selectZone?.value]
            }
            FetchApiPost('api/OldSystem/GetRepByBusIds','POST' , body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setEmployee(data?.map(item => (
                                        {
                                            value: item?.UserId,
                                            label: item?.UserName
                                        }
                                    )))
                                    data?.length !== 0
                                    ?  setSelectEmployee(
                                        {
                                            value: data[0]?.UserId,
                                            label: data[0]?.UserName
                                        }
                                    )
                                    :setSelectEmployee()
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
         
    }, [history, selectZone])

    /**microzone */
    useEffect(() => {
        if(selectZone && selectYear && selectMonth) {
            const body = {
                zoneIds: [selectZone?.value],
                year: selectYear?.value,
                month: selectMonth?.value
            }
            FetchApiPost('api/OldSystem/GetMicroZoneByZoneId','POST' , body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setMicrozone(data?.map(item => (
                                        {
                                            value: item?.MicroZoneId,
                                            label: item?.MicroZoneName
                                        }
                                    )))
                                    setSelectMicrozone(data?.map(item => (
                                        {
                                            value: item?.MicroZoneId,
                                            label: item?.MicroZoneName
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
         
    }, [history, selectMonth, selectYear, selectZone])

    /**header */
    useEffect(() => {
        FetchApiGet(`services/AdminPanel/Header/GetHeadersForMicroTarget?id=${empId}`,'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setHeaderIds([]);
                            res.json().then(data => {
                                data?.data?.map(item => {
                                    if(item?.id === 1) {
                                        setPlaceName(item?.translates[0].headerName);
                                    }
                                    else if (item?.id === 8) {
                                        setPlaceTypeName(item?.translates[0].headerName);
                                    }
                                    else if(item?.id === 15) {
                                        settypeOfPriorityHeaderName(item?.translates[0].headerName);
                                    }
                                    setHeaderIds((prev)=>[...prev,item?.id]);
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


    /**place , place type and type of priority */
    useEffect(() => {
        if(headerIds.length === 3) {
            for (let index = 0; index < headerIds.length; index++) {
                const body = {
                    headerId: headerIds[index],
                    employeeId: empId
                }
                FetchApiPost('services/AdminPanel/Defination/GetDefinationsForMicroTarget', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    if(headerIds[index] === 1) {
                                        setPlace(data?.data?.map(item => (
                                            {
                                                value:item.id,
                                                label:item?.definationName
                                            }
                                        )))
                                        setSelectPlace(data?.data?.map(item => (
                                            {
                                                value:item.id,
                                                label:item?.definationName
                                            }
                                        )))
                                    }
                                    else if (headerIds[index] === 8) {
                                        setPlaceType(data?.data?.map(item => (
                                            {
                                                value:item.id,
                                                label:item?.definationName
                                            }
                                        )))
                                        setSelectPlaceType(data?.data?.map(item => (
                                            {
                                                value:item.id,
                                                label:item?.definationName
                                            }
                                        )))
                                    }
                                    else if(headerIds[index] === 15 ) {
                                        setTypeOfPriority(data?.data?.map(item => (
                                            {
                                                value:item.id,
                                                label:item?.definationName
                                            }
                                        )))
                                        setSelectTypeOfPriority(data?.data?.map(item => (
                                            {
                                                value:item.id,
                                                label:item?.definationName
                                            }
                                        )))
                                    }
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
    }, [headerIds, history])

    /**workplace category and client category */
    useEffect(() => {
        if (radioValue !== 1) {
            FetchApiGet('services/CRM/WorkPlace/GetCategories', 'GET')
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setWorkplaceCategory(data?.data?.map(item => (
                                        {
                                            value: item?.id,
                                            label: item?.name
                                        }
                                    )))
                                    setSelectWorkplaceCategory(data?.data?.map(item => (
                                        {
                                            value: item?.id,
                                            label: item?.name
                                        }
                                    )))
                                    setClientCategory(data?.data?.map(item => (
                                        {
                                            value: item?.id,
                                            label: item?.name
                                        }
                                    )))
                                    setSelectClientCategory(data?.data?.map(item => (
                                        {
                                            value: item?.id,
                                            label: item?.name
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
    }, [history, radioValue])

    /** redux radio value */
    // useEffect(() => {
    //   dispatch(radioValueMicroTarget(radioValue))
    // }, [dispatch, radioValue])
        
    useEffect(() => {
      applyFilter && apply();
    }, [applyFilter])

    useEffect(() => {
        clearFilter && clear();
      }, [clearFilter])

      
       
    return (
        <div>
            {
                isOpenFilter &&
                <Filters
                    filterComponentsData={isFilters()}
                    isFilterBtn={false}
                    handleChange={changeFilter}
                    isHandleChange={true}

                />
            }
            {
                noDataModal === true &&
                <PharmacyShouldSave messages={t('No Data')} show={noDataModal} handleClose={handleNoData} />
            }
            {
                isWarningMessages === true &&
                <PharmacySplitPercentProblem
                    show={isWarningMessages}
                    handleClose={() => setIsWarningMessages(false)}
                    messages={warningMessages}
                />
            }
        </div>
    )
}

export default React.memo(Filter);