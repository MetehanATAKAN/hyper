import { mdiCheck, mdiClose, mdiDeleteSweepOutline } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react'
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';
import Filters from '../../../../components/Filter';
import Table from './Table';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router';
import { mdiPlus } from '@mdi/js';
import { useDispatch } from 'react-redux';
import { getVisitMixCalendarData, getVisitMixCalendarDataBody, setVisitMixCalendarButton } from '../../../../redux/VisitMix/actions';
import PharmacyShouldSave from '../../../../components/Modals/PharmacyShouldSave';
import { useTranslation } from 'react-i18next';

const Filter = ({
    applyFilter,
    setApplyFilter,
    setTableData,
    clearFilter,
    setClearFilter,
    setLoading
}) => {

    const [isOpenFilter, setIsOpenFilter] = useState(true);

    const { t } = useTranslation();

    const history = useHistory();
    const empId = Number(localStorage.getItem('userEmpId'));
    const countryId = localStorage.getItem('countryId');

    const dispatch = useDispatch();

    // years
    const [year, setYear] = useState([]);
    const [selectYear, setSelectYear] = useState({
        value: new Date().getFullYear(),
        label: String(new Date().getFullYear())
    });

    //country
    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState();

    //bus unit
    const [busUnit, setBusUnit] = useState([]);
    const [selectBusUnit, setSelectBusUnit] = useState();
   
    //place
    const [place, setPlace] = useState([]);
    const [selectPlace, setSelectPlace] = useState([]);
    const [placeHeaderName, setplaceHeaderName] = useState('place');

    //place type
    const [placeType, setPlaceType] = useState([]);
    const [selectPlaceType, setSelectPlaceType] = useState([]);
    const [placeTypeHeaderName, setPlaceTypeHeaderName] = useState('place type');

    //type of priority
    const [typeOfPriority, setTypeOfPriority] = useState([]);
    const [selectTypeOfPriority, setSelectTypeOfPriority] = useState([]);
    const [typeOfPriorityHeaderName, settypeOfPriorityHeaderName] = useState('type of priority');  

    //client type
    const [clientType, setClientType] = useState([]);
    const [selectClientType, setSelectClientType] = useState([]);
    const [clientTypeHeaderName, setClientTypeHeaderName] = useState('client type');

    //specialization
    const [specialization, setSpecialization] = useState([]);
    const [selectSpecialization, setSelectSpecialization] = useState();

     //clinic
     const [clinic, setClinic] = useState([]);
     const [selectClinic, setSelectClinic] = useState();
 
     //client
     const [client, setClient] = useState([]);
     const [selectClient, setSelectClient] = useState();
    
    //category
    const [category, setCategory] = useState([])
    const [selectCategory, setSelectCategory] = useState([]);

    const [visitMixCalendar, setVisitMixCalendar] = useState();

    const [noDataModal, setNoDataModal] = useState(false);

    const handleNoData = () => {
        setNoDataModal(false);
    }

    const filters = [
        {
            key:'year',
            label: 'year',
            options: year,
            state: selectYear,
            setState: setSelectYear,
            type: 'singleselect',
        },
        {
            key: 'country',
            label: 'country',
            options: country,
            state: selectCountry,
            setState: setSelectCountry,
            type: 'singleselect',
        },
        {
            key: 'business unite',
            label: 'business unite',
            options: busUnit,
            state: selectBusUnit,
            setState: setSelectBusUnit,
            type: 'singleselect',
        },
        {
            key: 'place',
            label: placeHeaderName,
            options: place,
            state: selectPlace,
            setState: setSelectPlace,
            type: 'multiselect',
        },
        {
            key: 'place type',
            label: placeTypeHeaderName,
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
            key:'client type',
            options:clientType,
            state:selectClientType,
            setState:setSelectClientType,
            label:clientTypeHeaderName,
            type: 'multiselect',
        },
        {
            key:'specialization',
            options:specialization,
            state:selectSpecialization,
            setState:setSelectSpecialization,
            label:'specialization',
            type: 'singleselect',
        },
        {
            key:'category',
            options:category,
            state:selectCategory,
            setState:setSelectCategory,
            label:'category',
            type: 'multiselect',
        }
    ]

    const filters2 = [
        {
            key:'year',
            label: 'year',
            options: year,
            state: selectYear,
            setState: setSelectYear,
            type: 'singleselect',
        },
        {
            key: 'country',
            label: 'country',
            options: country,
            state: selectCountry,
            setState: setSelectCountry,
            type: 'singleselect',
        },
        {
            key: 'business unite',
            label: 'business unite',
            options: busUnit,
            state: selectBusUnit,
            setState: setSelectBusUnit,
            type: 'singleselect',
        },
        {
            key: 'place',
            label: placeHeaderName,
            options: place,
            state: selectPlace,
            setState: setSelectPlace,
            type: 'multiselect',
        },
        {
            key: 'place type',
            label: placeTypeHeaderName,
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
            key:'client type',
            options:clientType,
            state:selectClientType,
            setState:setSelectClientType,
            label:clientTypeHeaderName,
            type: 'multiselect',
        },
        {
            key:'work place',
            options:clinic,
            state:selectClinic,
            setState:setSelectClinic,
            label:'work place',
            type: 'singleselect'
        },
        {
            key:'specialization',
            options:specialization,
            state:selectSpecialization,
            setState:setSelectSpecialization,
            label:'specialization',
            type: 'singleselect',
        },
        {
            key:'client',
            options:client,
            state:selectClient,
            setState:setSelectClient,
            label:'client',
            type: 'singleselect'
        },
        {
            key:'category',
            options:category,
            state:selectCategory,
            setState:setSelectCategory,
            label:'category',
            type: 'multiselect',
        }
    ]


    //button click to calendar
    const calendar=(data)=>{
        const dataCalendar={ 
            year: data?.yearId,
            countryId: selectCountry?.value,
            businessUnitId: selectBusUnit?.value,
            specIds:selectSpecialization?.value ? [selectSpecialization?.value] : [],
            placeIds: [data?.placeId],
            placeTypeIds: [data?.placeTypeId],
            typeOfPriorityIds: [data?.typeOfPriorityId],
            clientTypeIds: [data?.clientTypeId],
            clientId: 0,
            categories: [data?.category],
            brandIds: [
              0
            ],
            indications: [
              0
            ],
            profiles: [
              0
            ],
            promoSubjects: [
              0
            ],
            promoMaterials: [
              0
            ]
        }
        dispatch(getVisitMixCalendarDataBody(dataCalendar));
        localStorage.setItem('calendarDataBody',JSON.stringify(dataCalendar));
        FetchApiPost('services/VisitMix/GetVisitMixCalendar','POST',dataCalendar)
            .then((data)=>data.json())
            .then((data)=>{
                (async() => {
                    if(data.data !== null){
                        await localStorage.setItem('calendarDatas','')
                        await localStorage.setItem('calendarDatas',JSON.stringify(data.data))
                        await dispatch(setVisitMixCalendarButton(data));
                        await dispatch(getVisitMixCalendarData(data));
                        setVisitMixCalendar("/apps/marketing/visitmix/calendar")
                        history.push("/apps/marketing/visitmix/calendar")
                    }else{
                        setNoDataModal(true)
                    }
                    
                })()
            })
            .catch((err)=>(
                console.log(err)
            ));
         const yearFrq = {
             year: selectYear?.value,
             countryId: selectCountry?.value,
             businessUnitId: selectBusUnit?.value,
             placeId: selectPlace.map(data => data.value),
             placeTypeId: selectPlaceType?.map(data => data.value),
             typeOfPriorityId: selectTypeOfPriority?.map(data => data.value),
             clientTypeId: selectClientType?.map(data => data.value),
             specIds:selectSpecialization?.value ? [selectSpecialization?.value] : [],
             categories: selectCategory.map(data => data.label)
         }
            FetchApiPost('services/Organization/Organization/BusinessUnitCampaignCalendar/GetFrequency','POST',yearFrq)
            .then(response=>response.json())
            .then(response=>localStorage.setItem('monthFrequency',JSON.stringify(response.data)))
            .catch(error=>console.log(error))
}

/**apply filter */
    const apply = () => {
      
      setApplyFilter(false);
        const body = {
            year: selectYear?.value,
            countryId: selectCountry?.value,
            businessUnitId: selectBusUnit?.value,
            placeId: selectPlace?.map(data => data.value),
            placeTypeId: selectPlaceType?.map(data => data.value),
            typeOfPriorityId: selectTypeOfPriority?.map(data => data.value),
            clientTypeId: selectClientType.length !== 0 ? selectClientType?.map(data => data.value) : [],
            specIds: selectSpecialization ? [selectSpecialization?.value] : [],
            categories: selectCategory?.map(data => data.label),
            employeeId :empId
        }

        if(
            selectYear &&
            selectCountry &&
            selectBusUnit &&
            selectPlace.length !== 0 &&
            selectPlaceType.length !== 0 &&
            selectTypeOfPriority.length !== 0 &&
            selectCategory.length !== 0 
        )
        {
            setLoading(true);
            FetchApiPost('services/VisitMix/GetVisitMixFromPromoCompaing', 'POST', body)
        .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        setLoading(false);
                        res.json().then(data => {
                            setTableData(data?.data?.map(item => (
                                {
                                    year:item.yearId,
                                    place:item.placeName,
                                    placeType:item.placeTypeName,
                                    typeOfPriority:item.typeOfPriorityName,
                                    clientType:item.clientTypeName,
                                    specialization:item.specName,
                                    category:item.category,
                                    vfrq:item.frekans,
                                    dtbs:item.dtb,
                                    pct:item.pct,
                                    vq:item.vq,
                                    vshr:item.vShare,
                                    pshr:item.pShare,
                                    mix:<Icon onClick={()=>calendar(item)} path={mdiPlus} size={1} />
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
        
    }

    const clear = () => {
        setClearFilter(false);

        setSelectYear();

        setSelectCountry();

        setSelectBusUnit();
        setBusUnit([]);

        setSelectPlace([]);
        setPlace([]);

        setSelectPlaceType([]);
        setPlaceType([]);

        setSelectTypeOfPriority([]);
        setTypeOfPriority([]);

        setSelectClientType([]);
        setClientType([]);

        setSelectSpecialization();
        setSpecialization([]);

        setSelectCategory([]);
        setCategory([]);
    }

    const changeFilter = (name) => {
        switch (name) {
            case 'year':
                return (
                    setSelectBusUnit(),
                    setBusUnit([]),

                    setSelectPlace([]),
                    setPlace([]),
                    
                    setSelectPlaceType([]),
                    setPlaceType([]),

                    setSelectTypeOfPriority([]),
                    setTypeOfPriority([]),

                    setSelectClientType([]),
                    setClientType([]),

                    setSelectSpecialization(),
                    setSpecialization([]),

                    setSelectCategory([]),
                    setCategory([])
                )
            case 'country':
                return (
                    setSelectBusUnit(),
                    setBusUnit([]),

                    setSelectPlace([]),
                    setPlace([]),
                    
                    setSelectPlaceType([]),
                    setPlaceType([]),

                    setSelectTypeOfPriority([]),
                    setTypeOfPriority([]),

                    setSelectClientType([]),
                    setClientType([]),

                    setSelectSpecialization(),
                    setSpecialization([]),

                    setSelectCategory([]),
                    setCategory([])
                )
            case 'business unite':
                return (
                    setSelectPlace([]),
                    setPlace([]),

                    setSelectPlaceType([]),
                    setPlaceType([]),

                    setSelectTypeOfPriority([]),
                    setTypeOfPriority([]),

                    setSelectClientType([]),
                    setClientType([]),

                    setSelectSpecialization(),
                    setSpecialization([]),

                    setSelectCategory([]),
                    setCategory([])
                )
            case 'place':
                return (
                    setSelectPlaceType([]),
                    setPlaceType([]),

                    setSelectTypeOfPriority([]),
                    setTypeOfPriority([]),

                    setSelectClientType([]),
                    setClientType([]),

                    setSelectSpecialization(),
                    setSpecialization([]),

                    setSelectCategory([]),
                    setCategory([])
                )

            case 'place type':
                return (
                    setSelectTypeOfPriority([]),
                    setTypeOfPriority([]),

                    setSelectClientType([]),
                    setClientType([]),

                    setSelectSpecialization(),
                    setSpecialization([]),

                    setSelectCategory([]),
                    setCategory([])
                )
            case 'type of priority':
                return (
                    setSelectClientType([]),
                    setClientType([]),

                    setSelectSpecialization(),
                    setSpecialization([]),

                    setSelectCategory([]),
                    setCategory([])
                )
            case 'client type':
                return (
                    setSelectSpecialization(),
                    setSpecialization([]),

                    setSelectCategory([]),
                    setCategory([])
                )
            case 'specialization':
                return (
                    setClient([]),
                    setSelectClient(),

                    setSelectCategory([]),
                    setCategory([])
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

    const isFilters = () => {
      
        if(selectClientType.length !== 0) {
            const clientType = selectClientType?.filter(data => data?.value === 246);
      
            if(clientType.length === 1) {
                return filters2
            }
            else {
                return filters
            }
        }
        else return filters
      }

    useEffect(() => {
        //Country 
        FetchApiGet(`api/OldSystem/GetCompanies/${empId}`, 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(data => {
                                return (
                                    setCountry(data.map(country => (
                                        {
                                            value: country?.CompanyId,
                                            label: country?.CompanyName
                                        }
                                    ))),
                                    setSelectCountry({
                                        value: data[0]?.CompanyId,
                                        label: data[0]?.CompanyName
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

        //Years
        FetchApiGet('api/OldSystem/GetYear', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(data => (
                                setYear(data.map(year => (
                                    {
                                        value: year.Id,
                                        label: year.Val1
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
    
     //Business Unit
     useEffect(() => {
        if (selectCountry !== undefined && selectYear !== undefined) {
           
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
                                res.json().then(data => {
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
                                setSelectPlace(data.data.map((item) => (
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
    }, [empId, history, selectBusUnit, selectCountry, selectYear])

     //Place type
     useEffect(() => {
        if (selectCountry  && selectYear  && selectBusUnit  && selectPlace.length !== 0 ) {
           
            const placeTypeBody = {
                BusinessUnitId: selectBusUnit?.value,
                CompanyId: selectCountry?.value,
                Year: selectYear?.value,
                PlaceIds:selectPlace?.map(data => data.value),
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
                                setSelectPlaceType(data.data.map((item) => (
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
    }, [empId, history, selectBusUnit, selectCountry, selectPlace, selectYear])

    //Type of priority
    useEffect(() => {
        if (selectCountry  && selectYear  && selectBusUnit  && selectPlace.length !== 0  && selectPlaceType.length !== 0 ) {
           
            const typeOfPriorityBody = {
                BusinessUnitId: selectBusUnit?.value,
                CompanyId: selectCountry?.value,
                Year: selectYear?.value,
                PlaceIds:selectPlace?.map(data => data.value),
                PlaceTypeIds:selectPlaceType?.map(data => data.value),
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
                                setSelectTypeOfPriority(data.data.map((item) => (
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
    }, [empId, history, selectBusUnit, selectCountry, selectPlace, selectPlaceType, selectYear])

    //Client type
    useEffect(() => {
        if (selectCountry  && selectYear  && selectBusUnit  && selectPlace.length !== 0  && selectPlaceType.length !== 0  && selectTypeOfPriority.length !== 0 ) {
           
            const typeOfPriorityBody = {
                BusinessUnitId: selectBusUnit?.value,
                CompanyId: selectCountry?.value,
                Year: selectYear?.value,
                PlaceIds:selectPlace?.map(data => data.value),
                PlaceTypeIds:selectPlaceType?.map(data => data.value),
                TypeOfPriorityIds:selectTypeOfPriority?.map(data => data.value),
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
                                ))),
                                setSelectClientType(data.data.map((item) => (
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
    }, [empId, history, selectBusUnit, selectCountry, selectPlace, selectPlaceType, selectTypeOfPriority, selectYear])


    //specialization
    useEffect(() => {
        if ( selectYear  && selectCountry  && selectBusUnit  && selectPlace.length !== 0  && selectPlaceType.length !== 0  && selectTypeOfPriority.length !== 0  ) {
           
            const body = {
                Year: selectYear?.value,
                CompanyId: selectCountry?.value,
                BusinessUnitId: selectBusUnit?.value,
                PlaceIds:selectPlace?.map(data => data.value),
                PlaceTypeIds:selectPlaceType?.map(data => data.value),
                TypeOfPriorityIds:selectTypeOfPriority?.map(data => data.value),
                ClientTypeIds: selectClientType ?selectClientType?.map(data => data.value) : [],
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
        if ( selectYear  && selectCountry  && selectBusUnit  && selectPlace.length !== 0  && selectPlaceType.length !== 0  && selectTypeOfPriority.length !== 0  ) {
           
            const body = {
                Year: selectYear?.value,
                CompanyId: selectCountry?.value,
                BusinessUnitId: selectBusUnit?.value,
                PlaceIds:selectPlace?.map(data => data.value),
                PlaceTypeIds:selectPlaceType?.map(data => data.value),
                TypeOfPriorityIds:selectTypeOfPriority?.map(data => data.value),
                ClientTypeIds: selectClientType ?selectClientType?.map(data => data.value) : [],
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
                                setSelectCategory(data.data.map((item,index) => (
                                    { value: index, label: item.name }
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
    }, [history, selectBusUnit, selectClientType, selectCountry, selectPlace, selectPlaceType, selectSpecialization, selectTypeOfPriority, selectYear])

    const isClientType = () => {
            
        const x =selectClientType?.filter(data => data.value === 246);
        if(x.length !== 0) return true;
        else return false;
        
    }

    //Work Place
    useEffect(() => {
        if (selectPlace.length !== 0 && selectPlaceType.length !== 0 && selectTypeOfPriority.length !== 0) {
           
            const clinicBody = {
                employeeId: empId,
                placeIds: selectPlace?.map(data => data.value),
                placeTypeIds: selectPlaceType?.map(data => data.value),
                typeOfPriorityIds: selectTypeOfPriority?.map(data => data.value)

               
            }
            if(isClientType()) {
                FetchApiPost('services/CRM/WorkPlace/GetWorkPlaceForVisitPlanning', 'POST', clinicBody)
                .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then( data => {
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
        if (selectClinic && selectClientType.length !== 0 && selectSpecialization) {
           
            const clientBody = {
                workPlaceIds: [selectClinic?.value],
                clientTypeIds: selectClientType?.map(data => data.value),
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
    </div>
    )
}

export default Filter