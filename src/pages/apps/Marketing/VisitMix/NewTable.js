// @flow
import React, { useRef, useEffect, forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
    useAsyncDebounce,
    useExpanded,
} from 'react-table';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import Select from 'react-select';
import {  Row, Col, Button, Popover, OverlayTrigger} from 'react-bootstrap';
import { MultiSelect } from "react-multi-select-component";
import { Backdrop, CircularProgress } from "@material-ui/core";
// components
import { setVisitMixCountry,getVisitMixCalendarData,getVisitMixCalendarDataBody,setVisitMixCalendarButton} from '../../../../redux/VisitMix/actions';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useTranslation } from 'react-i18next';
import PharmacyShouldSave from '../../../../components/Modals/PharmacyShouldSave';

// Define a default UI for filtering
const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const { t } = useTranslation();
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    // Search
    return (
        <div className={classNames(searchBoxClass) + "search-main-cont"}>
            <span className="d-flex align-items-center table-top-left-icons">

                <input
                    value={value || ''}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    // placeholder={`${count} records...`}
                    placeholder={t("search")}
                    className="form-control"
                />
                   <i className="uil-search table-search-icon"/>
            </span>
        </div>
    );
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef: any = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
                <label htmlFor="form-check-input" className="form-check-label"></label>
            </div>
        </>
    );
});

type TableProps = {
    isSearchable?: boolean,
    isSortable?: boolean,
    pagination?: boolean,
    isSelectable?: boolean,
    isExpandable?: boolean,
    pageSize: number,
    columns: Array<any>,
    data: Array<any>,
    searchBoxClass?: string,
    tableClass?: string,
    theadClass?: string,
    sizePerPageList: {
        text: string,
        value: number,
    }[],
};

const NewTable = (props: TableProps): React$Element<React$FragmentType> => {
    const history = useHistory();
    const isSearchable = props['isSearchable'] || false;
    const isSortable = props['isSortable'] || false;
    const pagination = props['pagination'] || false;
    const isSelectable = props['isSelectable'] || false;
    const isExpandable = props['isExpandable'] || false;

    const [allTableDatas, setAllTableDatas] = useState([])
    const [applyLoading, setApplyLoading] = useState();
    const [visitMixCalendar, setVisitMixCalendar] = useState()

    const [noDataModal, setNoDataModal] = useState(false);

    const handleNoData = () => {
        setNoDataModal(false);
    }

    const dispatch=useDispatch();
    
    const saveFilter = () => {
        setApplyLoading(true);
        const visitMixData = {
            //CountryId : selectCompanies.value,
            BusId: selectBusinessUnite.value,
            Year: selectYears.value,
            SpecIds: selectSpecialization.map((data) => data.value),
            OrgTypes: selectOrganizations.map((data) => data.value),
            Categories: selectCategory.map((data) => data.label)
        }

        console.log(visitMixData);

        //setIsOpen(false);
        FetchApiPost('api/OldSystem/GetVisitMix','POST',visitMixData)
        .then(response=> response.json())
        .then(response => {
            console.log(response);
            setApplyLoading(false);
            setAllTableDatas(response.map((data,index) => (
                {
                    year: data.YearId,
                    specialization: data.SpecName,
                    organizationType: data.OrgType,
                    organizationTypeId:data.OrgTypeId,
                    ctg: data.Category,
                    vFrq: data.Frekans,
                    dtbs: data.DTB,
                    pcT: data.PCT,
                    vQ: data.VQ,
                    vShr: data.VShare,
                    pShr:   <i className="mdi mdi-chart-pie table-icons4"/>,
                    prePlanControl:data.PrePlanControl,
                    specAbb:data.SpecAbb,
                    specId:data.SpecId,

                    // mix:    <i className="mdi mdi-square-edit-outline table-icons4"/>   data.length !== 0 ? "/apps/marketing/visitmix/calendar" : "#",
                    mix:  <span id={index} onClick={()=>calendar(data) }><i id={index} className="fas fa-plus table-icons4" /></span>, 
                    edit:   <div className="table-icons-cont">
                       <i className="mdi mdi-check-bold table-icons"/> 
                       <i className="dripicons-copy table-icons1"/> 
                       <i className="dripicons-italic table-icons2"/> 
                       <i className="mdi mdi-delete table-icons3"/>
                   </div>
                }
            )));
            console.log(response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    // const tableData = [
    //     allTableDatas.map((index) => ({ 
    //        year: index.YearId,
    //        specialization: index.SpecName,
    //        organizationType: index.OrgType,
    //        ctg: index.Category,
    //        vFrq: index.Frekans,
    //        dtbs: index.DTB,
    //        pcT: index.PCT,
    //        vQ: index.VQ,
    //        vShr: 0,
    //        //pShr:   <i className="mdi mdi-chart-pie table-icons4"/>,
    //        pShr:   <i className="mdi mdi-chart-pie table-icons4"/>,
    //        mix:    <i className="mdi mdi-square-edit-outline table-icons4"/>,
    //        edit:   <div className="table-icons-cont">
    //                    <i className="mdi mdi-check-bold table-icons"/> 
    //                    <i className="dripicons-copy table-icons1"/> 
    //                    <i className="dripicons-italic table-icons2"/> 
    //                    <i className="mdi mdi-delete table-icons3"/>
    //                </div>
    //     }))
    // ]
    
    // const data = [
    //     {
    //         year: 20,
    //         specialization: "Cardiology",
    //         organizationType: 'Hospital',
    //         ctg: 'A',
    //         vFrq: 11,
    //         dtbs: 11,
    //         pcT: 21,
    //         vQ: 21,
    //         vShr: "%14",
    //         pShr: <i className="mdi mdi-chart-pie table-icons4"/>,
    //         mix: <i className="mdi mdi-square-edit-outline table-icons4"/>,
    //         edit: <div className="table-icons-cont">
    //                 <i className="mdi mdi-check-bold table-icons"/> 
    //                 <i className="dripicons-copy table-icons1"/> 
    //                 <i className="dripicons-italic table-icons2"/> 
    //                 <i className="mdi mdi-delete table-icons3"/>
    //             </div>
    //     },
    // ]

    const [editDataTable, setEditDataTable] = useState(props['columns']);

    // Popover
    const popover = (index) => (
        <Popover className="new-table-title-popover-cont">
            <Popover.Body className="new-table-title-popover">{index ? index : null}</Popover.Body>
        </Popover>
    );

    const dataTable = useTable(
        {
            columns: editDataTable,
            data: allTableDatas,
            // data: props['data'],
            initialState: { pageSize: props['pageSize'] || 10 },
        },
        isSearchable && useGlobalFilter,
        isSortable && useSortBy,
        isExpandable && useExpanded,
        pagination && usePagination,
        isSelectable && useRowSelect,
        (hooks) => {
            isSelectable &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllPageRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);

            isExpandable &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        // Build our expander column
                        id: 'expander', // Make sure it has an ID
                        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                            <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? '-' : '+'}</span>
                        ),
                        Cell: ({ row }) =>
                            // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
                            // to build the toggle for expanding a row
                            row.canExpand ? (
                                <span
                                    {...row.getToggleRowExpandedProps({
                                        style: {
                                            // We can even use the row.depth property
                                            // and paddingLeft to indicate the depth
                                            // of the row
                                            paddingLeft: `${row.depth * 2}rem`,
                                        },
                                    })}>
                                    {row.isExpanded ? '-' : '+'}
                                </span>
                            ) : null,
                    },
                    ...columns,

                ]);
        }
    );
    
    //Years
    let year = useSelector((state) => state.VisitMix.visitMixYearDatas)
    const [yearsDatas, setYearsDatas] = useState([]);
    const [selectYears, setSelectYears] = useState({value : new Date().getFullYear(), label :(new Date()).getFullYear().toString()});
    
    const changeYears = event => {
        setSelectYears({label: event.label, value: event.value});
        setSelectBusinessUnite([]);
    }


    //Companies
    const country=useSelector((state)=>state.VisitMix.visitMixCountryDatas);
    const [companiesDatas, setCompaniesDatas] = useState([]);
    const [selectCompanies, setSelectCompanies] = useState([]);
    console.log(selectCompanies);
    const changeCompanies = event => {
        setSelectCompanies({label: event.label, value: event.value});
    }
    //Business Unite
    const [businessUniteDatas, setBusinessUniteDatas] = useState([]);
    const [selectBusinessUnite, setSelectBusinessUnite] = useState([]);
    console.log(selectBusinessUnite);
    const changeBusinessUnite= event => {
        setSelectBusinessUnite({label: event.label, value: event.value});
    }
    
    //Organization
    const [organizationsDatas, setOrganizationsDatas] = useState([]);
    const [selectOrganizations, setSelectOrganizations] = useState([]);
    const [selectOrganizationsId, setSelectOrganizationsId] = useState([]);

    //Specialization
    const [specializationDatas, setSpecializationDatas] = useState([]);
    const [selectSpecialization, setSelectSpecialization] = useState([]);
    const [selectSpecializationId, setSelectSpecializationId] = useState([]);
   
    const { t } = useTranslation();

    //Category
    const categoryDatas = [
        {
            value: 1,
            label: "A"
        },
        {
            value: 2,
            label: "B"
        },
        {
            value: 3,
            label: "C"
        }
    ]
    const [selectCategory, setSelectCategory] = useState([]);

    const changeCategory = event => {
        setSelectCategory(Array.isArray(event) ? event.map(x => x.label) : []);
    }

    // const empId = sessionStorage.getItem('userEmpId');
    // TEST FOR OPEN NEW TAB
    const empId = localStorage.getItem('userEmpId');

    
    useEffect(() => {

        const fetchFilterApi = async () => {
            //Visit Mix Country

            FetchApiGet(`api/OldSystem/GetCompanies/${empId}`,'GET')
            .then(response=>response.json())
            .then(response => {
                setCompaniesDatas(response.map((data) => (
                    { value: data.CompanyId, label: data.CompanyName }
                )))
                setSelectCompanies({label:response[0].CompanyName,value:response[0].CompanyId})
            })
            .catch(error=>console.log(error))

            //Visit Mix Year
            await FetchApiGet('api/OldSystem/GetYear','GET')
                .then(response => response.json())
                .then(response => {
                    setYearsDatas(response.map((index) => (
                        { value: index.Id, label: index.Val1 }
                    )))
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

             //Visit Mix Organization Type
             await FetchApiGet('api/OldSystem/GetOrganization','GET')
            .then(response=> response.json())
            .then(response => {
                setOrganizationsDatas(response.map((index) => (
                    {value: index.Id, label: index.Val1}
                )))
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

        fetchFilterApi();
    }, [empId]);

    // useEffect(() => {
    //     setCompaniesDatas(country.map((data)=>(
    //         data
    //     )))
    //     country.map((data)=>(
    //         setSelectCompanies(data)
    //     ))
    // }, [country])
    

    useEffect(() => {
        const bussinessBody = {
            empId : empId,  
            scmId :selectCompanies.value,
            year : selectYears.value
        }
        FetchApiPost('api/OldSystem/GetBussinessVisitMix','POST',bussinessBody)
        .then(response=> response.json())
        .then(response => {
            console.log('response visit mix =>',response);
            setBusinessUniteDatas(response.map((data) => (
                {value: data.Id, label: data.Val1}
            )))
            setSelectBusinessUnite({value: response[0].Id, label: response[0].Val1})
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    },[country, empId, selectCompanies, selectYears])

    useEffect(() => {
        const specBody = {
            busId : selectBusinessUnite.value,
            year : selectYears.value
        }
        FetchApiPost('api/OldSystem/GetSpec','POST',specBody)
        .then(response=> response.json())
        .then(response => {
            setSpecializationDatas(response.map((index) => (
                {value: index.Id, label: index.Val1}
            )))
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    },[selectBusinessUnite, selectYears])

    let rows = pagination ? dataTable.page : dataTable.rows;

    const [isOpenCollapse, setIsOpenCollapse] = useState(true);

    const openCollapse = () => {
        setIsOpenCollapse(!openCollapse);
    }

    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const openEditColumns = () => {
        setIsOpenEdit(!isOpenEdit);
    }

    const [isChecked1, setIsChecked1] = useState(true);
    const [isChecked2, setIsChecked2] = useState(true);
    const [isChecked3, setIsChecked3] = useState(true);
    const [isChecked4, setIsChecked4] = useState(true);
    const [isChecked5, setIsChecked5] = useState(true);
    const [isChecked6, setIsChecked6] = useState(true);
    const [isChecked7, setIsChecked7] = useState(true);
    const [isChecked8, setIsChecked8] = useState(true);
    const [isChecked9, setIsChecked9] = useState(true);
    const [isChecked10, setIsChecked10] = useState(true);
    const [isChecked11, setIsChecked11] = useState(true);
    const [isChecked12, setIsChecked12] = useState(true);

    const editColumnsInputClick1 = () => {
        if(isChecked1 === false){
            setIsChecked1(true);
            setEditDataTable(props['columns']);

        }else{
            setIsChecked1(false);
            setEditDataTable([]);
        }

        if(isChecked1 && isChecked2){
            setIsChecked2(!isChecked2);
        }else if(isChecked1 && !isChecked2){
            setIsChecked2(false);
        }else{
            setIsChecked2(true);
        }

        if(isChecked1 && isChecked3){
            setIsChecked3(!isChecked3);
        }else if(isChecked1 && !isChecked3){
            setIsChecked3(false);
        }else{
            setIsChecked3(true);
        }

        if(isChecked1 && isChecked4){
            setIsChecked4(!isChecked4);
        }else if(isChecked1 && !isChecked4){
            setIsChecked4(false);
        }else{
            setIsChecked4(true);
        }

        if(isChecked1 && isChecked5){
            setIsChecked5(!isChecked5);
        }else if(isChecked1 && !isChecked5){
            setIsChecked5(false);
        }else{
            setIsChecked5(true);
        }

        if(isChecked1 && isChecked6){
            setIsChecked6(!isChecked6);
        }else if(isChecked1 && !isChecked6){
            setIsChecked6(false);
        }else{
            setIsChecked6(true);
        }

        if(isChecked1 && isChecked7){
            setIsChecked7(!isChecked7);
        }else if(isChecked1 && !isChecked7){
            setIsChecked7(false);
        }else{
            setIsChecked7(true);
        }

        if(isChecked1 && isChecked8){
            setIsChecked8(!isChecked8);
        }else if(isChecked1 && !isChecked8){
            setIsChecked8(false);
        }else{
            setIsChecked8(true);
        }

        if(isChecked1 && isChecked9){
            setIsChecked9(!isChecked9);
        }else if(isChecked1 && !isChecked9){
            setIsChecked9(false);
        }else{
            setIsChecked9(true);
        }

        if(isChecked1 && isChecked10){
            setIsChecked10(!isChecked10);
        }else if(isChecked1 && !isChecked10){
            setIsChecked10(false);
        }else{
            setIsChecked10(true);
        }

        if(isChecked1 && isChecked11){
            setIsChecked11(!isChecked11);
        }else if(isChecked1 && !isChecked11){
            setIsChecked11(false);
        }else{
            setIsChecked11(true);
        }

        if(isChecked1 && isChecked12){
            setIsChecked12(!isChecked12);
        }else if(isChecked1 && !isChecked12){
            setIsChecked12(false);
        }else{
            setIsChecked12(true);
        }
    }
    const editColumnsInputClick2 = () => {
        if(isChecked2 === false){
            setIsChecked2(true)
            const sum = [props['columns'].filter(obj => obj.Header === "YEAR")[0], ...editDataTable]
            setEditDataTable(sum);
        }else{
            setIsChecked2(false)
            setEditDataTable(editDataTable.filter(obj => obj.Header !== "YEAR"));
        }
    }
    const editColumnsInputClick3 = () => {
        if(isChecked3 === false){
            setIsChecked3(true);
            const sum = [props['columns'].filter(obj => obj.Header === "SPECIALIZATION")[0], ...editDataTable]
            setEditDataTable(sum.sort(function(a,b){return a.id - b.id;}));
        }else{
            setIsChecked3(false);
            setEditDataTable(editDataTable.filter(obj => obj.Header !== "SPECIALIZATION"));
        }
    }
    const editColumnsInputClick4 = () => {
        if(isChecked4 === false){
            setIsChecked4(true);
            const sum = [props['columns'].filter(obj => obj.Header === "ORGANIZATION TYPE")[0], ...editDataTable]
            setEditDataTable(sum.sort(function(a,b){return a.id - b.id;}));
        }else{
            setIsChecked4(false);
            setEditDataTable(editDataTable.filter(obj => obj.Header !== "ORGANIZATION TYPE"));
        }
    }
    const editColumnsInputClick5 = () => {
        if(isChecked5 === false){
            setIsChecked5(true);
            const sum = [props['columns'].filter(obj => obj.Header === "CTG")[0], ...editDataTable]
            setEditDataTable(sum.sort(function(a,b){return a.id - b.id;}));
        }else{
            setIsChecked5(false);
            setEditDataTable(editDataTable.filter(obj => obj.Header !== "CTG"));
        }
    }
    const editColumnsInputClick6 = () => {
        if(isChecked6 === false){
            setIsChecked6(true);
            const sum = [props['columns'].filter(obj => obj.Header === "V.FRQ")[0], ...editDataTable]
            setEditDataTable(sum.sort(function(a,b){return a.id - b.id;}));
        }else{
            setIsChecked6(false);
            setEditDataTable(editDataTable.filter(obj => obj.Header !== "V.FRQ"));
        }
    }

    const editColumnsInputClick7 = () => {
        if(isChecked7 === false){
            setIsChecked7(true);
            const sum = [props['columns'].filter(obj => obj.Header === "DTBS")[0], ...editDataTable]
            setEditDataTable(sum.sort(function(a,b){return a.id - b.id;}));
        }else{
            setIsChecked7(false);
            setEditDataTable(editDataTable.filter(obj => obj.Header !== "DTBS"));
        }
    }

    const editColumnsInputClick8 = () => {
        if(isChecked8 === false){
            setIsChecked8(true);
            const sum = [props['columns'].filter(obj => obj.Header === "PC T.")[0], ...editDataTable]
            setEditDataTable(sum.sort(function(a,b){return a.id - b.id;}));
        }else{
            setIsChecked8(false);
            setEditDataTable(editDataTable.filter(obj => obj.Header !== "PC T."));
        }
    }

    const editColumnsInputClick9 = () => {
        if(isChecked9 === false){
            setIsChecked9(true);
            const sum = [props['columns'].filter(obj => obj.Header === "V.Q.")[0], ...editDataTable]
            setEditDataTable(sum.sort(function(a,b){return a.id - b.id;}));
        }else{
            setIsChecked9(false);
            setEditDataTable(editDataTable.filter(obj => obj.Header !== "V.Q."));
        }
    }

    const editColumnsInputClick10 = () => {
        if(isChecked10 === false){
            setIsChecked10(true);
            const sum = [props['columns'].filter(obj => obj.Header === "V.SHR.")[0], ...editDataTable]
            setEditDataTable(sum.sort(function(a,b){return a.id - b.id;}));
        }else{
            setIsChecked10(false);
            setEditDataTable(editDataTable.filter(obj => obj.Header !== "V.SHR."));
        }
    }

    const editColumnsInputClick11 = () => {
        if(isChecked11 === false){
            setIsChecked11(true);
            const sum = [props['columns'].filter(obj => obj.Header === "P.SHR.")[0], ...editDataTable]
            setEditDataTable(sum.sort(function(a,b){return a.id - b.id;}));
        }else{
            setIsChecked11(false);
            setEditDataTable(editDataTable.filter(obj => obj.Header !== "P.SHR."));
        }
    }

    const editColumnsInputClick12 = () => {
        if(isChecked12 === false){
            setIsChecked12(true);
            const sum = [props['columns'].filter(obj => obj.Header === "MIX")[0], ...editDataTable]
            setEditDataTable(sum.sort(function(a,b){return a.id - b.id;}));
        }else{
            setIsChecked12(false);
            setEditDataTable(editDataTable.filter(obj => obj.Header !== "MIX"));
        }
    }

    // cancel button
    const collapseCancel = () => {
        setIsOpenCollapse(false);
    }
    //clear select button
    const collapseClear = () => {
        setSelectCompanies([]);
        setSelectYears([]);
        setSelectSpecialization([]);
        setSelectOrganizations([]);
        setSelectCategory([]);
    }
    //button click to calendar
    const calendar = (data) => {
        console.log(data);
        const dataCalendar = {
            OrganizationTypeId: data.OrgTypeId,
            BusinessUnitId: selectBusinessUnite.value,
            SpecId: data.SpecId,
            CountryId: selectCompanies.value,
            Category: data.Category,
            Year: data.YearId,
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
        localStorage.setItem('calendarDataBody', JSON.stringify(dataCalendar));
        FetchApiPost('services/VisitMix/GetVisitMixCalendar', 'POST', dataCalendar)
            .then((data) => data.json())
            .then((data) => {
                (async () => {
                    if (data.data !== null) {
                        await localStorage.setItem('calendarDatas', '')
                        await localStorage.setItem('calendarDatas', JSON.stringify(data.data))
                        await dispatch(setVisitMixCalendarButton(data));
                        await dispatch(getVisitMixCalendarData(data));
                        setVisitMixCalendar("/apps/marketing/visitmix/calendar")
                        history.push("/apps/marketing/visitmix/calendar")
                    } else {
                        setNoDataModal(true)
                    }

                })()
            })
            .catch((err) => (
                console.log(err)
            ));
        const yearFrq = {
            BusId: selectBusinessUnite.value,
            Year: data.YearId,
            SpecId: data.SpecId,
            OrganizationTypeId: data.OrgTypeId,
            Category: data.Category,

            year: 2023,
            countryId: 247,
            businessUnitId: 48,
            placeId: [
                309
            ],
            placeTypeId: [
                419
            ],
            typeOfPriorityId: [
                183
            ],
            clientTypeId: [],
            specIds: [],
            categories: [
                "A"
            ]
        }
        FetchApiPost('services/Organization/Organization/BusinessUnitCampaignCalendar/GetFrequency', 'POST', yearFrq)
            .then(response => response.json())
            .then(response => localStorage.setItem('monthFrequency', JSON.stringify(response)))
            .catch(error => console.log(error))
    }
    
    return (
        <>
            {isSearchable && (
                <div className="table-top-cont">
                    <div className="mb-2">
                        <GlobalFilter
                            preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
                            globalFilter={dataTable.state.globalFilter}
                            setGlobalFilter={dataTable.setGlobalFilter}
                            searchBoxClass={props['searchBoxClass']}
                        />
                    </div>
                    <Col className="table-btn-cont">
                        <div>
                            <Button variant="white" type="submit" className="btn btn-white me-1 table-btn1" as={Link} to="/apps/marketing/visitmix/pre-plan" >
                                    {t('pre-plan')}
                            </Button>
                            {isOpenEdit ? (
                                <div className="columns-dropdown-main-cont columns-dropdown-cont-scrollbar">
                                    <div className="columns-dropdown-cont">
                                        <div className={isChecked1 ? "columns-dropdown-div1 columns-dropdown-div" : "columns-dropdown-div1"} onClick={editColumnsInputClick1} >
                                            <input type="checkbox" className="form-check-input" checked={isChecked1} /> <span>{t('Select All')}</span>
                                        </div>
                                        <div className={isChecked2 ? "columns-dropdown-div1 columns-dropdown-div" : "columns-dropdown-div1"} onClick={editColumnsInputClick2} >
                                            <input type="checkbox" className="form-check-input" checked={isChecked2} /> <span>{t('Year')}</span>
                                        </div>
                                        <div className={isChecked3 ? "columns-dropdown-div1 columns-dropdown-div" : "columns-dropdown-div1"} onClick={editColumnsInputClick3} >
                                            <input type="checkbox" className="form-check-input" checked={isChecked3} /> <span>{t('Specialization')}</span>
                                        </div>
                                        <div className={isChecked4 ? "columns-dropdown-div1 columns-dropdown-div" : "columns-dropdown-div1"} onClick={editColumnsInputClick4} >
                                            <input type="checkbox" className="form-check-input" checked={isChecked4}/> <span>{t('Organization Type')}</span>
                                        </div>
                                        <div className={isChecked5 ? "columns-dropdown-div1 columns-dropdown-div" : "columns-dropdown-div1"} onClick={editColumnsInputClick5} >
                                            <input type="checkbox" className="form-check-input" checked={isChecked5} /> <span>{t('Category')}</span>
                                        </div>
                                        <div className={isChecked6 ? "columns-dropdown-div1 columns-dropdown-div" : "columns-dropdown-div1"} onClick={editColumnsInputClick6} >
                                            <input type="checkbox" className="form-check-input" checked={isChecked6} /> <span>{t('Visit Frequency')}</span>
                                        </div>
                                        <div className={isChecked7 ? "columns-dropdown-div1 columns-dropdown-div" : "columns-dropdown-div1"} onClick={editColumnsInputClick7} >
                                            <input type="checkbox" className="form-check-input" checked={isChecked7} /> <span>{t('Database')}</span>
                                        </div>
                                        <div className={isChecked8 ? "columns-dropdown-div1 columns-dropdown-div" : "columns-dropdown-div1"} onClick={editColumnsInputClick8} >
                                            <input type="checkbox" className="form-check-input" checked={isChecked8} /> <span>{t('Promo Campaign Targeted')}</span>
                                        </div>
                                        <div className={isChecked9 ? "columns-dropdown-div1 columns-dropdown-div" : "columns-dropdown-div1"} onClick={editColumnsInputClick9} >
                                            <input type="checkbox" className="form-check-input" checked={isChecked9} /> <span>{t('Visit Quantity')}</span>
                                        </div>
                                        <div className={isChecked10 ? "columns-dropdown-div1 columns-dropdown-div" : "columns-dropdown-div1"} onClick={editColumnsInputClick10} >
                                            <input type="checkbox" className="form-check-input" checked={isChecked10} /> <span>{t('Visit Share')}</span>
                                        </div>
                                        <div className={isChecked11 ? "columns-dropdown-div1 columns-dropdown-div" : "columns-dropdown-div1"} onClick={editColumnsInputClick11} >
                                            <input type="checkbox" className="form-check-input" checked={isChecked11} /> <span>{t('Product Share')}</span>
                                        </div>
                                        <div className={isChecked12 ? "columns-dropdown-div2 columns-dropdown-div" : "columns-dropdown-div2"} onClick={editColumnsInputClick12} >
                                            <input type="checkbox" className="form-check-input" checked={isChecked12} /> <span>{t('Mix')}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <Button variant="white" type="submit" className={isOpenEdit ? ("btn btn-white me-1 table-btn2-1") : ("btn btn-white me-1 table-btn2") } onClick={openEditColumns}>
                                {t('edit columns')}
                            </Button>

                        </div>
                        <div>
                            <Button variant="secondary" type="submit" className="btn btn-secondary table-btn3" onClick={openCollapse}>
                                {t('filter')} <i className="uil-sort filter-icon" />
                            </Button>
                        </div>
                    </Col>
                </div>
            )}
            {openCollapse ? (
                <div className="collapse-main-cont mb-2">
                    <div className="mb-2 mt-2">
                        <div className="px-3 collapse-select-cont">
                            <div className="collapse-item1">
                                <h5>{t('Year')}</h5>
                                <Select
                                    isMulti={false}
                                    options={yearsDatas}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    placeholder={t("Select...")}
                                    onChange={changeYears}
                                    value={selectYears}
                                />
                            </div>
                            <div className="collapse-item2">
                                <h5>{t('Country')}</h5>
                                <Select
                                    isMulti={false}
                                    options={companiesDatas}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    placeholder={t("Select...")}
                                    onChange={changeCompanies}
                                    value={selectCompanies}
                                />
                            </div>
                            <div className="collapse-item3">
                                <h5>{t('Business Unite')}</h5>
                                <Select
                                    isMulti={false}
                                    options={businessUniteDatas}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    placeholder={t("Select...")}
                                    onChange={changeBusinessUnite}
                                    value={selectBusinessUnite}
                                />
                            </div>
                            <div className="collapse-item4">
                                <h5>{t('Specialization')}</h5>
                                <MultiSelect
                                  options={specializationDatas}
                                  value={selectSpecialization}
                                  onChange={setSelectSpecialization}
                                  labelledBy={t("Select...")}
                                  overrideStrings={{
                                    "allItemsAreSelected": t("All items are selected."),
                                    "noOptions": t("No options"),
                                    "search": t("Search"),
                                    "selectAll": t("Select All"),
                                    "selectSomeItems": t("Select..."),
                                  }}
                                />
                            </div>
                            <div className="collapse-item5">
                                <h5>{t('Organization Type')}</h5>
                                <MultiSelect
                                options={organizationsDatas}
                                value={selectOrganizations}
                                onChange={setSelectOrganizations}
                                labelledBy={t("Select...")}
                                overrideStrings={{
                                    "allItemsAreSelected": t("All items are selected."),
                                    "noOptions": t("No options"),
                                    "search": t("Search"),
                                    "selectAll": t("Select All"),
                                    "selectSomeItems": t("Select..."),
                                  }}
                                />
                            </div>
                            <div className="collapse-item6">
                                <h5>{t('Category')}</h5>
                                <MultiSelect
                                options={categoryDatas}
                                value={selectCategory}
                                onChange={setSelectCategory}
                                labelledBy={t("Select...")}
                                overrideStrings={{
                                    "allItemsAreSelected": t("All items are selected."),
                                    "noOptions": t("No options"),
                                    "search": t("Search"),
                                    "selectAll": t("Select All"),
                                    "selectSomeItems": t("Select..."),
                                  }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="collapse-buttons-cont">
                        <Row className="px-3">
                            <Col className="text-end mt-2 mb-2">
                                {/* <button onClick={()=>setIsOpen(true)} >clickk</button> */}
                                <Button variant="primary" type="submit" className="btn btn-primary me-1 collapse-btn1 step4" onClick={saveFilter}>
                                    {t('apply')}
                                </Button>
                                <Button variant="gray" type="submit" className="btn btn-gray me-1 collapse-btn2 step5" onClick={collapseCancel}>
                                    {t('cancel')}
                                </Button>
                                <Button variant="danger" type="submit" className="btn btn-danger collapse-btn3 step6" onClick={collapseClear}>
                                    <i className="dripicons-brush" />
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            ):null}
            <div className="table-responsive">
                <table
                    {...dataTable.getTableProps()}
                    className={classNames('table table-centered react-table table-main-cont', props['tableClass'])}>
                    <thead className={props['theadClass']}>
                        {dataTable.headerGroups.map((headerGroup) => (
                            <tr className="new-table-main-cont" {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.sort && column.getSortByToggleProps())}
                                        className={classNames({
                                            sorting_desc: column.isSortedDesc === true,
                                            sorting_asc: column.isSortedDesc === false,
                                            sortable: column.sort === true,
                                        })+"new-table-cont"}
                                        >
                                        <OverlayTrigger placement="top" overlay={popover(column.render('name'))} >
                                            <span className={'new-table-titles'}>
                                                {column.render('Header')}
                                            </span>
                                        </OverlayTrigger>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...dataTable.getTableBodyProps()}>
                        {(rows || []).map((row, i) => {
                            dataTable.prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className={(parseInt(row.id))%2 === 0 ? "even-child-table" : "odd-child-table"}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()} className="table-data-cont">
                                            <div className='table-items-cont'>
                                                {cell.render('Cell')}
                                            </div>
                                        </td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="table-end-container">
                <div className="table-end-left">
                    <select
                        value={dataTable.state.pageSize}
                        onChange={(e) => {
                            dataTable.setPageSize(Number(e.target.value));
                        }}
                        className="form-select d-inline-block w-auto table-end-left-select">
                        {(props['sizePerPageList']).map((pageSize, index) => {
                            return (
                                <option key={index} value={pageSize.value}>
                                    {pageSize.text}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="table-end-middle">
                    <span className="mx-3">
                        {t('Page')}{' '}
                        <strong>
                            {dataTable.state.pageIndex + 1} {t('of')} {dataTable.pageOptions.length}
                        </strong>{' '}
                    </span>
                </div>
                <div className="table-end-right">
                    <button
                        onClick={() => dataTable.previousPage()}
                        className="table-left-button"
                        disabled={!dataTable.canPreviousPage}>
                        <i className="dripicons-chevron-left"/>
                    </button>
                    <div className="buttons-text">
                        <strong>
                            {dataTable.state.pageIndex + 1}
                        </strong>
                    </div>
                    <button
                        onClick={() => dataTable.nextPage()}
                        className="table-right-button"
                        disabled={!dataTable.canNextPage}>
                        <i className="dripicons-chevron-right"/>
                    </button>
                </div>

            </div>
            <Backdrop style={{zIndex:"9999"}} open={applyLoading}>
            <CircularProgress/>
            </Backdrop>
            {/* {pagination && <Pagination tableProps={dataTable} sizePerPageList={props['sizePerPageList']} />} */}
            {
                noDataModal === true && 
                <PharmacyShouldSave messages={t('No Data')} show={noDataModal} handleClose={handleNoData} />
            }
        </>
    );
};

export default NewTable;