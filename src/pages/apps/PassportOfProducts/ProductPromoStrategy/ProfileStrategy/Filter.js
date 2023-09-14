import React, { useEffect, useState } from 'react'
import { MultipleSelects, SingleSelects } from '../../../../../components/GlobalNew/Selects';
import Icon from '@mdi/react';
import { mdiCheck, mdiClose, mdiDeleteSweepOutline, mdiDotsVertical, mdiOpenInNew } from '@mdi/js';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router';
import { statusControl } from '../../../../../components/Function/StatusCheck';
import Loading from '../../../../../components/Loading';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Dropdown, Menu } from 'antd';

const Filter = ({
    tableData,
    setTableData,  
    setTableItems,
    tableItems,
    isFilter
}) => {

  
    const history = useHistory();
    const empId = localStorage.getItem('userEmpId');
    const { t } = useTranslation();
   
    const {tabOrDetails, detailsData} = useSelector(state => state.AnnualProductMix);

    // year
    const [year, setYear] = useState([]);
    const [selectYear, setSelectYear] = useState();

    // company
    const [company, setCompany] = useState([]);
    const [selectCompany, setSelectCompany] = useState([]);

    // global brand
    const [globalBrand, setGlobalBrand] = useState([]);
    const [selectGlobalBrand, setSelectGlobalBrand] = useState();
   
    // profile
    const [profile, setProfile] = useState([]);
    const [selectProfile, setSelectProfile] = useState([]);

    // spec
    const [spec, setSpec] = useState([]);
    const [selectSpec, setSelectSpec] = useState([]);

    const [loadingFilter, setLoadingFilter] = useState(false);

    const [applyCounter, setApplyCounter] = useState(0);

    const filters = [
        {
            id: 0,
            options: year,
            selectFilter: selectYear,
            setSelectFilter: setSelectYear,
            label: 'year',
            multi: false,
            isClearIcon: true
        },
        {
            id: 1,
            options: company,
            selectFilter: selectCompany,
            setSelectFilter: setSelectCompany,
            label: 'company',
            multi: true,
            isClearIcon: true
        },
        {
            id: 2,
            options: globalBrand,
            selectFilter: selectGlobalBrand,
            setSelectFilter: setSelectGlobalBrand,
            label: 'global brand',
            multi: false,
            isClearIcon: true
        },
        {
            id: 3,
            options: spec,
            selectFilter: selectSpec,
            setSelectFilter: setSelectSpec,
            label: 'specialization',
            multi: true,
            isClearIcon: true
        },
        {
            id: 4,
            options: profile,
            selectFilter: selectProfile,
            setSelectFilter: setSelectProfile,
            label: 'profile',
            multi: true,
            isClearIcon: true
        },
    ]

    const changePriority = (e) => {
        console.log(e.target.id);
        console.log(tableData);
    }

    const handleChange = (value, label, headerName) => {
   
        switch (headerName) {
            
            case 'year':
                return (
                    setSelectYear(),
                    setGlobalBrand([]),
                    setSelectGlobalBrand()
                )
            case 'company':
                return (
                    setSelectCompany([]),
                    setGlobalBrand([]),
                    setSelectGlobalBrand(),

                    setProfile([]),
                    setSelectProfile([]),

                    setSpec([]),
                    setSelectSpec([])
                )
            case 'global brand':
                return (
                    setSelectGlobalBrand(),
                    setSpec([]),
                    setSelectSpec([]),

                    setProfile([]),
                    setSelectProfile([])
                )
                case 'specialization':
                return (
                    setProfile([]),
                    setSelectProfile([])
                )
            default:
                break;
        }
    }

    const [copyModal, setCopyModal] = useState(false);

    const onHide = () => {
        setCopyModal(true);
    }

    const changeAction = (e) => {
        const rowId = e.domEvent.target.id.split(' ');
        setCopyModal(true);
    }

    const actionOption = [
        {
            id: 6,
            key: 'Duplicate',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i>,
            color: '#6C757D',
        }
    ]

    const menu = (
        <Menu>
            {actionOption?.map((el, i) => (
                <Menu.Item
                    style={{ paddingTop: 0, paddingBottom: 0, marginBottom: '5px' }}
                    onClick={(e) => changeAction(e)}
                    key={i}
                    >
                    <span >
                        {el.icon}
                        {t(el.key)}
                    </span>
                </Menu.Item>
            ))}
        </Menu>
    );

    const [selectStatus, setSelectStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
        { id: 4, status: 'default' }
    ])
    const applyFilter = () => {

        setApplyCounter(counter => counter + 1);
        const condition = [
            selectYear === undefined,
            selectCompany.length === 0,
            selectGlobalBrand === undefined,
            selectProfile.length === 0,
            selectSpec.length === 0,
        ];

        statusControl(condition,selectStatus,setSelectStatus);
            if (condition.some((x) => x === true)) return;

            const body = {
                yearId      :   selectYear?.value,
                companyIds  :   selectCompany?.map(data => data.value),
                brandIds    :   [selectGlobalBrand?.value],
                specIds     :   selectSpec?.map(data => data.value),
                profileIds  :   selectProfile?.map(data => data.value),
                empId       :   empId

            }
            setLoadingFilter(true);
            FetchApiPost('services/VisitMix/ProductStrategy/GetProfileStrategy','POST',body)
            .then((res) =>
                              (async () => {
                                  try {
                                      if (res.status === 200) {
                                        setLoadingFilter(false);
                                        res.json().then((item) => {
                                            setTableData(item?.data?.map( (data,index) => (
                                                {
                                                    id: index,
                                                    company: data.companyName,
                                                    companyId:data.companyId,
                                                    yearId:data.yearId,
                                                    brandId:data.brandId,
                                                    globalBrand: data.brandName,
                                                    indication: data.indicationName,
                                                    indicationId:data.indicationId,
                                                    profile: data.profileName,
                                                    profileId:data.profileId,
                                                    specialization:data.specName,
                                                    specId:data.specId,
                                                    details: <Icon id={index} path={mdiOpenInNew} size={1} />,
                                                   
                                                    groups: [
                                                        {
                                                            group:'A',
                                                            priority: data.priortiyA,
                                                            category: 'N/A',
                                                            pn: data.patientNumberA,
                                                            needsQty: data.needQuantityA,
                                                            visitQty:data.visitQuantityA,
                                                            months:data.monthsA,
                                                            plannedLoyalty:data.plannedLoyaltyA,
                                                            company: data.companyName,
                                                            companyId:data.companyId,
                                                            yearId:data.yearId,
                                                            brandId:data.brandId,
                                                            globalBrand: data.brandName,
                                                            indication: data.indicationName,
                                                            indicationId:data.indicationId,
                                                            profile: data.profileName,
                                                            profileId:data.profileId,
                                                            specialization:data.specName,
                                                            specId:data.specId,
                                                        },
                                                         {
                                                            group:'B',
                                                            priority: data.priortiyB,
                                                            category: 'N/A',
                                                            pn: data.patientNumberB,
                                                            needsQty: data.needQuantityB,
                                                            visitQty:data.visitQuantityB,
                                                            months:data.monthsB,
                                                            plannedLoyalty:data.plannedLoyaltyB,
                                                            company: data.companyName,
                                                            companyId:data.companyId,
                                                            yearId:data.yearId,
                                                            brandId:data.brandId,
                                                            globalBrand: data.brandName,
                                                            indication: data.indicationName,
                                                            indicationId:data.indicationId,
                                                            profile: data.profileName,
                                                            profileId:data.profileId,
                                                            specialization:data.specName,
                                                            specId:data.specId,
                                                        },
                                                        {
                                                            group:'C',
                                                            priority: data.priortiyC,
                                                            category: 'N/A',
                                                            pn: data.patientNumberC,
                                                            needsQty: data.needQuantityC,
                                                            visitQty:data.visitQuantityC,
                                                            months:data.monthsC,
                                                            plannedLoyalty:data.plannedLoyaltyC,
                                                            company: data.companyName,
                                                            companyId:data.companyId,
                                                            yearId:data.yearId,
                                                            brandId:data.brandId,
                                                            globalBrand: data.brandName,
                                                            indication: data.indicationName,
                                                            indicationId:data.indicationId,
                                                            profile: data.profileName,
                                                            profileId:data.profileId,
                                                            specialization:data.specName,
                                                            specId:data.specId,
                                                        }
                                                    ],
                                                    action: (
                                                        <Dropdown overlayStyle={{ minWidth: '155px' }} trigger={'click'} overlay={menu} placement="bottom">
                                                        <i style={{ cursor: 'pointer' }} className="fas fa-ellipsis-v"></i>
                                                    </Dropdown>
                                                    )

                                                }
                                            )))
                                            setTableItems(item?.data?.map( (data,index) => (
                                                {
                                                    id: index,
                                                    company: data.companyName,
                                                    companyId:data.companyId,
                                                    yearId:data.yearId,
                                                    brandId:data.brandId,
                                                    globalBrand: data.brandName,
                                                    indication: data.indicationName,
                                                    indicationId:data.indicationId,
                                                    profile: data.profileName,
                                                    profileId:data.profileId,
                                                    specialization:data.specName,
                                                    specId:data.specId,
                                                    details: <Icon id={index} path={mdiOpenInNew} size={1} />,
                                                    groups: [
                                                        {
                                                            group:'A',
                                                            priority: data.priortiyA,
                                                            category: 'N/A',
                                                            pn: data.patientNumberA,
                                                            needsQty: data.needQuantityA,
                                                            visitQty:data.visitQuantityA,
                                                            months:data.monthsA,
                                                            plannedLoyalty:data.plannedLoyaltyA,
                                                            company: data.companyName,
                                                            companyId:data.companyId,
                                                            yearId:data.yearId,
                                                            brandId:data.brandId,
                                                            globalBrand: data.brandName,
                                                            indication: data.indicationName,
                                                            indicationId:data.indicationId,
                                                            profile: data.profileName,
                                                            profileId:data.profileId,
                                                            specialization:data.specName,
                                                            specId:data.specId,
                                                        },
                                                         {
                                                            group:'B',
                                                            priority: data.priortiyB,
                                                            category: 'N/A',
                                                            pn: data.patientNumberB,
                                                            needsQty: data.needQuantityB,
                                                            visitQty:data.visitQuantityB,
                                                            months:data.monthsB,
                                                            plannedLoyalty:data.plannedLoyaltyB,
                                                            company: data.companyName,
                                                            companyId:data.companyId,
                                                            yearId:data.yearId,
                                                            brandId:data.brandId,
                                                            globalBrand: data.brandName,
                                                            indication: data.indicationName,
                                                            indicationId:data.indicationId,
                                                            profile: data.profileName,
                                                            profileId:data.profileId,
                                                            specialization:data.specName,
                                                            specId:data.specId,
                                                        },
                                                        {
                                                            group:'C',
                                                            priority: data.priortiyC,
                                                            category: 'N/A',
                                                            pn: data.patientNumberC,
                                                            needsQty: data.needQuantityC,
                                                            visitQty:data.visitQuantityC,
                                                            months:data.monthsC,
                                                            plannedLoyalty:data.plannedLoyaltyC,
                                                            company: data.companyName,
                                                            companyId:data.companyId,
                                                            yearId:data.yearId,
                                                            brandId:data.brandId,
                                                            globalBrand: data.brandName,
                                                            indication: data.indicationName,
                                                            indicationId:data.indicationId,
                                                            profile: data.profileName,
                                                            profileId:data.profileId,
                                                            specialization:data.specName,
                                                            specId:data.specId,
                                                        }
                                                    ],
                                                   
                                                    action: (
                                                        <Dropdown overlayStyle={{ minWidth: '155px' }} trigger={'click'} overlay={menu} placement="bottom">
                                                        <i style={{ cursor: 'pointer' }} className="fas fa-ellipsis-v"></i>
                                                    </Dropdown>
                                                    )

                                                }
                                            )))
                                      })
                                         
                                      }
                                      else if (res.status === 409 || res.status === 500 || res.status === 499) {
                                        setLoadingFilter(false);
                                          history.push('/error-500');
                                      }
                                      else {
                                        setLoadingFilter(false);
                                          console.log('hata');
                                      }
              
                                  } catch (error) {
                                      console.log('error', error);
                                  }
                              })()
                          )
            
    }

    const clearFilter = () => {
       
        setSelectYear();
        
        setSelectCompany([]);

        setSelectGlobalBrand();
        setGlobalBrand([]);

        setSelectSpec([]);
        setSpec([]);

        setSelectProfile([]);
        setProfile([]);
    }
    // year
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetYear', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(data => {
                                setYear(data.map(year => (
                                    {
                                        value: year.Id,
                                        label: year.Val1
                                    }
                                )))
                                if(tabOrDetails === 'details') {
                                    const year = data.filter(years => years.Id === detailsData.year);
                                    console.log(year);
                                    setSelectYear(
                                        {
                                            value: year[0].Id,
                                            label: year[0].Val1
                                        }
                                    )
                                }
                                else {
                                    setSelectYear(
                                        {
                                            value: new Date().getFullYear(),
                                            label: String(new Date().getFullYear())
                                        }
                                    )
                                }
                            })

                        }
                        else if (res.status === 500 || res.status === 499) {
                            history.push('/error-500')
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }, [detailsData, history, tabOrDetails])
   
    // company
    useEffect(() => {
        FetchApiGet(`api/OldSystem/GetCompanies/${empId}`, 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(data => {
                                setCompany(data.map(data => (
                                    {
                                        value: data.CompanyId,
                                        label: data.CompanyName
                                    }
                                )))
                                if(tabOrDetails === 'details') {
                                    const filtered = data.filter (companys => companys.CompanyId === detailsData.companyId);
                                    setSelectCompany(filtered.map(data => (
                                        {
                                            value: data.CompanyId,
                                            label: data.CompanyName
                                        }
                                    )))
                                }
                                else {
                                    setSelectCompany(data.map(data => (
                                        {
                                            value: data.CompanyId,
                                            label: data.CompanyName
                                        }
                                    )))
                                }
                            })

                        }
                        else if (res.status === 500 || res.status === 499) {
                            history.push('/error-500')
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }, [detailsData, empId, history, tabOrDetails])

    // global brand
    useEffect(() => {

        if (selectYear !== undefined && selectCompany.length !== 0) {

            const body = {
                yearIds: selectYear?.label,
                scmIds: String(selectCompany?.map(data => data.value))
            }

            FetchApiPost('api/OldSystem/GetGlobalBrandsByYearAndCompanyId', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setGlobalBrand(data?.map(data => (
                                        {
                                            value: data.GlobalBrandId,
                                            label: data.GlobalBrandName
                                        }
                                    )))

                                    if(tabOrDetails === 'details') {

                                        const filtered = data.filter(brands => brands.GlobalBrandId === detailsData.brandId);
                                        setSelectGlobalBrand(
                                            {
                                                value: filtered[0]?.GlobalBrandId,
                                                label: filtered[0]?.GlobalBrandName
                                            }
                                        )
                                    }
                                    else {
                                        setSelectGlobalBrand(
                                            {
                                                value: data[0]?.GlobalBrandId,
                                                label: data[0]?.GlobalBrandName
                                            }
                                        )
                                    }
                                })

                            }
                            else if (res.status === 500 || res.status === 499) {
                                history.push('/error-500')
                            }

                        } catch (error) {
                        }
                    })()
                )
        }


    }, [detailsData, history, selectCompany, selectYear, tabOrDetails])

    // profile
    useEffect(() => {

        if (selectCompany.length !== 0 && selectSpec.length !== 0 && selectGlobalBrand !== undefined) {

            const body = {
                SpecIds     :   String(selectSpec?.map(data => data.value)),
                BrandIds    :   String(selectGlobalBrand?.value),
                companyIds  :   String(selectCompany?.map(data => data.value)),
                empId       :   empId
            }

            FetchApiPost('api/OldSystem/ProfileStrategyProfile', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    return (
                                        setProfile(data?.map(data => (
                                            {
                                                value: data.ProfileId,
                                                label: data.ProfileName
                                            }
                                        ))),
                                        setSelectProfile(data?.map(data => (
                                            {
                                                value: data.ProfileId,
                                                label: data.ProfileName
                                            }
                                        )))
                                    )
                                })

                            }
                            else if (res.status === 500 || res.status === 499) {
                                history.push('/error-500')
                            }

                        } catch (error) {
                        }
                    })()
                )
        }

    }, [empId, history, selectCompany, selectGlobalBrand, selectSpec])

    // spec
    useEffect(() => {

        if (selectGlobalBrand !== undefined) {

            const body = {
                brandIds: String(selectGlobalBrand?.value)
            }

            FetchApiPost('api/OldSystem/GetSpecsByGlobalBrandIds', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setSpec(data?.map(data => (
                                        {
                                            value: data.spec_id,
                                            label: data.spec_name
                                        }
                                    )))
                                    if(tabOrDetails === 'details') {
                                        const filtered = data.filter(spec => spec.spec_id === detailsData.specId);
                                        setSelectSpec(filtered?.map(data => (
                                            {
                                                value: data.spec_id,
                                                label: data.spec_name
                                            }
                                        )))
                                    }
                                    else {
                                        setSelectSpec(data?.map(data => (
                                            {
                                                value: data.spec_id,
                                                label: data.spec_name
                                            }
                                        )))
                                    }
                                })

                            }
                            else if (res.status === 500 || res.status === 499) {
                                history.push('/error-500')
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        }


    }, [detailsData, history, selectGlobalBrand, tabOrDetails])

    useEffect(() => {

        if (tabOrDetails === 'details' &&
            selectYear !== undefined &&
            selectCompany.length !== 0 &&
            selectGlobalBrand !== undefined &&
            selectProfile.length !== 0 &&
            selectSpec.length !== 0 &&
            applyCounter === 0
            ) {
                applyFilter();
            }
    }, [selectCompany, selectGlobalBrand, selectProfile, selectSpec, selectYear, tabOrDetails,applyCounter])
    
    
   
    return (
        <>
        {
            isFilter &&
            <div className='filters-container'>
            <div className='filters'>
                {
                    filters.map((data, index) => (
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
                                clearIcon={data.isClearIcon}
                                status={
                                    selectStatus[index].status
                                }
                                handleChange={handleChange}
                                allClear={() => handleChange(data?.options,data?.options,data?.label)}
                            />
                            : <SingleSelects
                                options={data?.options}
                                selectedItems={data?.selectFilter}
                                setSelectedItems={data?.setSelectFilter}
                                label={data?.label}
                                className='filter-radius'
                                size="small"
                                key={index}
                                status={
                                    selectStatus[index].status
                                }
                                clearIcon={data.isClearIcon}
                                headerName={data?.label}
                                handleChange={handleChange}
                                allClear={() => handleChange(data?.options,data?.options,data?.label)}
                            />
                    ))
                }

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
                        onClick={clearFilter}
                    />
                    <Icon
                        path={mdiClose}
                        size={1}
                        color={'#6C757D'}
                        className="page-list-icons"
                    />
                </div>
            </div>
            <div style={{display:'hidden'}}>
                <Loading loading={loadingFilter} />
            </div>
        </div>
        }
        </>
       
    )
}

export default Filter