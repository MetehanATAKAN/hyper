import React, { useEffect, useState } from 'react';
import MainTable from '../../../../components/MainTable';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
import Filter from '../../../../components/Filter';
import { Link, useHistory } from 'react-router-dom';
import AddBenefit from './AddBenefit/AddBenefit';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { mdiPlus, mdiEyeOutline, mdiPencilBoxOutline, mdiLinkVariantOff, mdiSquareEditOutline } from '@mdi/js';
import 'antd/dist/antd.css';
import Icon from '@mdi/react';
import DocumentDetail from './DocumentDetail/DocumentDetail';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Dropdowns from '../../../../components/Dropdowns';
import { statusRedactOptions } from './Statuses';

import ActionModal from './ActionModal';

import UpdateModal from './UpdateModal/UpdateModal';
import DublicateModal from './DublicateBenefit/DublicateModal';
import Delete from './Delete';
import { Form } from 'react-bootstrap';
import Status from '../../../../components/Status';

import TableLayout from '../../../../components/Tables/TableAccordion';

const Benefit = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const [filterShow, setFilterShow] = useState(true);

    const [isShow, setIsShow] = useState(false);

    const [actionItem, setActionItem] = useState();
    const [showActionModal, setShowActionModal] = useState(false);

    const [isDisableInput, setIsDisableInput] = useState(false);

    const [documentDetailShow, setDocumentDetailShow] = useState(false);
    const [documentDetailItems, setDocumentDetailItems] = useState({});

    const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);

    const [showDuplicateModal, setShowDuplicateModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [filterData, setFilterData] = useState([]);

    const [tableData, setTableData] = useState([]);

    const [loader, setLoader] = useState(false);

    const [workPlaceHeader, setWorkPlaceHeader] = useState();

    const [selectPlace, setSelectPlace] = useState([]);
    const [placeOptions, setPlaceOptions] = useState([]);

    const [selectPlaceType, setSelectPlaceType] = useState([]);
    const [placeTypeOptions, setPlaceTypeOptions] = useState([]);

    const[selectTypeOfPriority, setSelectTypeOfPriority] = useState([]);
    const [typeOfPrioityOptions, setTypeOfPriorityOptions] = useState([]);

    const [clientTypeName, setClientTypeName] = useState();

    const [selectClientType, setSelectClientType] = useState([]);
    const [clientTypeOptions, setClientTypeOptions] = useState([]);

    const [selectGlobalBrand, setSelectGlobalBrand] = useState([]);
    const [globalBrandOptions, setGlobalBrandOptions] = useState([]);

    const [selectSpecialization, setSelectSpecialization] = useState([]);
    const [specializationOptions, setSpecializationOptions] = useState([]);

    const [selectIndication, setSelectIndication] = useState([]);
    const [indicationOptions, setIndicationOptions] = useState([]);

    const [selectProfile, setSelectProfile] = useState([]);
    const [profileOptions, setProfileOptions] = useState([]);

    const [selectNeed, setSelectNeed] = useState([]);
    const [needOptions, setNeedOptions] = useState([]);

    const [selectLanguage, setSelectLanguage] = useState([]);
    const [languageOptions, setLanguageOptions] = useState([]);

    const [selectStatus, setSelectStatus] = useState([
        { value: 1, label: 'Redact' },
        { value: 3, label: 'Approved' },
        { value: 5, label: 'Translate Awaited' },
    ]);
    const [statusOptions, setStatusOptions] = useState([
        { value: 1, label: 'Redact' },
        { value: 3, label: 'Approved' },
        { value: 5, label: 'Translate Awaited' },
    ]);

    const [selectLink, setSelectLink] = useState([
        { value: 0, label: t('Not Connect') },
        { value: 1, label: t('Connect') },
    ]);
    const [linkOptions, setLinkOptions] = useState([
        { value: 0, label: t('Not Connect') },
        { value: 1, label: t('Connect') },
    ]);

    const [companyIdForFilter, setCompanyIdForFilter] = useState();

    // work place header
    useEffect(() => {
        if(!companyIdForFilter) return;
        let countryId = localStorage.getItem('countryId');
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForWorkPlace`, 'POST', {
            headerIds: [0],
            countryId: countryId,
            companyId: companyIdForFilter
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    let arr = { pl: {}, pt: {}, tp: {} };
                    data.map((item, index) => {
                        if (item.abbrevation === 'PL') {
                            arr.pl = item;
                        }
                    });
                    data.map((item, index) => {
                        if (item.abbrevation === 'PT') {
                            arr.pt = item;
                        }
                    });
                    data.map((item, index) => {
                        if (item.abbrevation === 'PRT') {
                            arr.tp = item;
                        }
                    });
                    setWorkPlaceHeader(arr);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setWorkPlaceHeader();
            }
        });
    }, [history, companyIdForFilter]);

    useEffect(() => {
        if(workPlaceHeader){
            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.pl.id,
                countryId: Number(localStorage.getItem('countryId'))
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setPlaceOptions(data.map(item => ({ label: item.definationName, value: item.definationId })))
                        setSelectPlace(data.map(item => ({ label: item.definationName, value: item.definationId })))
                    })
                }else{
                    setPlaceOptions([]);
                    setSelectPlace([]);
                }
            })

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.pt.id,
                countryId: Number(localStorage.getItem('countryId'))
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setPlaceTypeOptions(data.map(item => ({ label: item.definationName, value: item.definationId })))
                        setSelectPlaceType(data.map(item => ({ label: item.definationName, value: item.definationId })))
                    })
                }else{
                    setPlaceTypeOptions([]);
                    setSelectPlaceType([]);
                }
            })

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.tp.id,
                countryId: Number(localStorage.getItem('countryId'))
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setTypeOfPriorityOptions(data.map(item => ({ label: item.definationName, value: item.definationId })))
                        setSelectTypeOfPriority(data.map(item => ({ label: item.definationName, value: item.definationId })))
                    })
                }else{
                    setTypeOfPriorityOptions([]);
                    setSelectTypeOfPriority([]);
                }
            })
        }else{
            setPlaceOptions([]);
            setPlaceTypeOptions([]);
            setTypeOfPriorityOptions([])
            setSelectPlace([]);
            setSelectPlaceType([]);
            setSelectTypeOfPriority([]);
        }
    }, [workPlaceHeader])

    // client type name 

    useEffect(() => {
        if(!companyIdForFilter) return;
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForClient`, 'POST', {
            headerIds: [0],
            countryId: Number(localStorage.getItem('countryId')),
            companyId: companyIdForFilter
        })
            .then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setClientTypeName(data)
                    })
                }else{
                    setClientTypeName()
                }
            })
    }, [companyIdForFilter])
    
    useEffect(() => {
        if(!clientTypeName) return;
        FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
            countryId: Number(localStorage.getItem('countryId')),
            id: clientTypeName[0].id
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setClientTypeOptions([{value: 0, label: 'N/A'}, ...data.map(item => ({ value: item.definationId, label: item.definationName}))])
                    setSelectClientType([{value: 0, label: 'N/A'}, ...data.map(item => ({ value: item.definationId, label: item.definationName}))])
                })
            }
        })
    }, [clientTypeName])

    useEffect(() => {
        if(selectPlace.length !== 0 && selectPlaceType.length !== 0 && selectTypeOfPriority.length !== 0 && selectClientType.length !== 0 && globalBrandOptions.length > 0) return;

        if(selectPlace.length === 0 || selectPlaceType.length === 0 || selectTypeOfPriority.length === 0 || selectClientType.length === 0){
            setSelectGlobalBrand([]);
            setGlobalBrandOptions([]);
            return;
        }
        setLoader(true);
        FetchApiPost('services/Pages/Need/GetBrandsForNeedCreate', 'POST', {
            placeIds: selectPlace.map(i => i.value),
            placeTypeIds: selectPlaceType.map(i => i.value),
            typeOfPriorityIds: selectTypeOfPriority.map(i => i.value),
            clientTypeIds: selectClientType.map(i => i.value)
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setLoader(false);
                    setGlobalBrandOptions(data.map(item => ({ value: item.globalBrandId, label: item.globalBrandName })))
                    setSelectGlobalBrand(data.map(item => ({ value: item.globalBrandId, label: item.globalBrandName })))
                })
            }else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }else{
                setLoader(false);
                setSelectGlobalBrand([]);
                setGlobalBrandOptions([]);
            }
        })
    }, [history, selectPlace, selectPlaceType, selectTypeOfPriority, selectClientType])

    useEffect(() => {
        if(selectPlace.length === 0 || selectPlaceType.length === 0 || selectTypeOfPriority.length === 0 || selectGlobalBrand.length === 0){
            setSelectIndication([]);
            setIndicationOptions([]);
            return;
        }
        setLoader(true);
        FetchApiPost('services/Pages/Need/GetIndicationsForNeedCreate', 'POST', {
            placeIds: selectPlace.map(i => i.value),
            placeTypeIds: selectPlaceType.map(i => i.value),
            typeOfPriorityIds: selectTypeOfPriority.map(i => i.value),
            clientTypeIds: selectClientType.map(i => i.value),
            brandIds: selectGlobalBrand.map(i => i.value)
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setLoader(false);
                    setIndicationOptions(data.map(item => ({ label: item.indicationName, value: item.indicationId })))
                    setSelectIndication(data.map(item => ({ label: item.indicationName, value: item.indicationId })))
                    
                })
            }else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }else{
                setLoader(false);
                setSelectIndication([]);
                setIndicationOptions([]);
            }
        })
    }, [history, selectGlobalBrand])

    useEffect(() => {
        if(selectIndication.length === 0){
            setProfileOptions([])
            setSelectProfile([])
            return;
        }
        setLoader(true)
        FetchApiPost('services/Pages/Need/GetProfileForNeedCreate', 'POST', {
            placeIds: selectPlace.map(i => i.value),
            placeTypeIds: selectPlaceType.map(i => i.value),
            typeOfPriorityIds: typeOfPrioityOptions.map(i => i.value),
            clientTypeIds: selectClientType.map(i => i.value),
            brandIds: selectGlobalBrand.map(i => i.value),
            indicationIds: selectIndication.map(i => i.value)
        }).then(res => {
            if(res.status === 200){
                res.json().then(({data}) => {
                    setProfileOptions(data.map(i => ({ value: i.profileId, label: i.profileName })))
                    setSelectProfile(data.map(i => ({ value: i.profileId, label: i.profileName })))
                    setLoader(false)
                })
            }else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }else{
                setLoader(false);
                setProfileOptions([])
                setSelectProfile([])
            }
        })
    }, [selectIndication])

    useEffect(() => {
        if(selectProfile.length === 0 ){
            setSpecializationOptions([]);
            setSelectSpecialization([]);
            return;
        }
        setLoader(true);
        FetchApiPost('services/Pages/Need/GetSpecForNeedCreate', 'POST', {
            placeIds: selectPlace.map(i => i.value),
            placeTypeIds: selectPlaceType.map(i => i.value),
            typeOfPriorityIds: selectTypeOfPriority.map(i => i.value),
            clientTypeIds: selectClientType.map(i => i.value),
            brandIds: selectGlobalBrand.map(i => i.value),
            indicationIds: selectIndication.map(i => i.value),
            profileIds: selectProfile.map(i => i.value)
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setLoader(false)
                    setSpecializationOptions([{ label: 'N/A', value: 0 }, ...data.map(item => ({ label: item.specName, value: item.specId }))])
                    setSelectSpecialization([{ label: 'N/A', value: 0 }, ...data.map(item => ({ label: item.specName, value: item.specId }))])
                })
            }else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }else{
                setLoader(false)
                setSpecializationOptions([]);
                setSelectSpecialization([]);
            }
        })
    }, [history, selectProfile])

    useEffect(() => {
        setLoader(true);
        let empId = localStorage.getItem('userEmpId');
        FetchApiGet(`api/OldSystem/GetCompanies/{empId}?empId=${empId}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {

                    let companyId = Number(localStorage.getItem('companyId'));

                    // if (data.length === 1) {
                    //     companyId = data[0].CompanyId;
                    // } else if (data.length > 1 && data.find((item) => item.CompanyId === 238)) {
                    //     companyId = 238;
                    // } else {
                    //     companyId = data[0].CompanyId;
                    // }

                    if (companyId === 238) {
                        setLanguageOptions([
                            { value: 42, label: 'EN' },
                            { value: 40, label: 'TR' },
                            { value: 52, label: 'UZ' },
                            { value: 54, label: 'KZ' },
                            { value: 43, label: 'AZ' },
                            { value: 48, label: 'RU' },
                            { value: 29, label: 'GE' },
                        ]);
                        setSelectLanguage([
                            { value: 42, label: 'EN' },
                            { value: 40, label: 'TR' },
                            { value: 52, label: 'UZ' },
                            { value: 54, label: 'KZ' },
                            { value: 43, label: 'AZ' },
                            { value: 48, label: 'RU' },
                            { value: 29, label: 'GE' },
                        ]);
                    } else if (companyId === 269 || companyId === 274) {
                        setLanguageOptions([
                            { value: 42, label: 'EN' },
                            { value: 40, label: 'TR' },
                        ]);
                        setSelectLanguage([
                            { value: 42, label: 'EN' },
                            { value: 40, label: 'TR' },
                        ]);
                    } else if (companyId === 270 || companyId === 272) {
                        setLanguageOptions([{ value: 54, label: 'KZ' }]);
                        setSelectLanguage([{ value: 54, label: 'KZ' }]);
                    } else if (companyId === 246) {
                        setLanguageOptions([{ value: 43, label: 'AZ' }]);
                        setSelectLanguage([{ value: 43, label: 'AZ' }]);
                    } else if (companyId === 247) {
                        setLanguageOptions([
                            { value: 52, label: 'UZ' },
                            { value: 42, label: 'EN' },
                            { value: 48, label: 'RU' },
                        ]);
                        setSelectLanguage([
                            { value: 52, label: 'UZ' },
                            { value: 42, label: 'EN' },
                            { value: 48, label: 'RU' },
                        ]);
                    } else if (companyId === 248) {
                        setLanguageOptions([{ value: 29, label: 'GE' }]);
                        setSelectLanguage([{ value: 29, label: 'GE' }]);
                    } else if (companyId === 249) {
                        setLanguageOptions([
                            { value: 42, label: 'EN' },
                            { value: 48, label: 'RU' },
                        ]);
                        setSelectLanguage([
                            { value: 42, label: 'EN' },
                            { value: 48, label: 'RU' },
                        ]);
                    } else if (companyId === 245) {
                        setLanguageOptions([
                            { value: 42, label: 'EN' },
                            { value: 48, label: 'RU' },
                            { value: 29, label: 'GE' },
                        ]);
                        setSelectLanguage([
                            { value: 42, label: 'EN' },
                            { value: 48, label: 'RU' },
                            { value: 29, label: 'GE' },
                        ]);
                    } else {
                        setLanguageOptions([{ value: 42, label: 'EN' }]);
                        setSelectLanguage([{ value: 42, label: 'EN' }]);
                    }

                    setCompanyIdForFilter(companyId);
                    setLoader(false);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }else{
                setLoader(false);
            }
        });
    }, [history]);

    useEffect(() => {
        if(selectPlace.length === 0 || selectPlaceType.length === 0 || selectTypeOfPriority.length === 0 || selectSpecialization.length === 0){
            setNeedOptions([]);
            setSelectNeed([]);
            return;
        }
        FetchApiPost('services/Pages/Need/GetNeedsForBenefitFilter', 'POST', {
            SpecIds: selectSpecialization.length > 0 ? selectSpecialization.map(i => i.value) : [0],
            IndicationIds: selectIndication.map(i => i.value),
            ProfileIds: selectProfile.map(i => i.value),
            PlaceIds: selectPlace.map(i => i.value),
            PlaceTypeIds: selectPlaceType.map(i => i.value),
            TypeOfPriorityIds: selectTypeOfPriority.map(i => i.value),
            ClientTypeIds: selectClientType.map(i => i.value),
            BrandIds: selectGlobalBrand.map(i => i.value)
        }).then(res => {
            if(res.status === 200){
                res.json().then(({data}) => {
                    setNeedOptions(data.map(item => {
                        return {
                            value: item.id,
                            label: item.needName
                        }
                    }))
                        setSelectNeed(data.map(item => {
                            return {
                                value: item.id,
                                label: item.needName
                            }
                        }))
                    
                })
            }else if(res.status === 500 || res.status === 502){
                history.push('/error-500');
            }else{
                setLoader(false)
                setNeedOptions([]);
                setSelectNeed([]);
            }
        })
    
}, [history, selectPlace, selectPlaceType, selectClientType, selectSpecialization])

const filterComponentsData = [
    {
        label: workPlaceHeader ? workPlaceHeader?.pl?.headerName: "place",
        options: placeOptions,
        state: selectPlace,
        setState: setSelectPlace,
        type: 'multiselect'
    },
    {
        label: workPlaceHeader ? workPlaceHeader?.pt?.headerName: "place type",
        options: placeTypeOptions,
        state: selectPlaceType,
        setState: setSelectPlaceType,
        type: 'multiselect'
    },
    {
        label: workPlaceHeader ? workPlaceHeader?.tp?.headerName: "type of priority",
        options: typeOfPrioityOptions,
        state: selectTypeOfPriority,
        setState: setSelectTypeOfPriority,
        type: 'multiselect'
    },
    {
        label: clientTypeName ? clientTypeName[0].headerName : t('client type'),
        options: clientTypeOptions,
        state: selectClientType,
        setState: setSelectClientType,
        type: 'multiselect'
    },
    {
        label: 'global brand',
        options: globalBrandOptions,
        state: selectGlobalBrand,
        setState: setSelectGlobalBrand,
        type: 'multiselect',
    },
    {
        label: 'indication',
        options: indicationOptions,
        state: selectIndication,
        setState: setSelectIndication,
        type: 'multiselect'
    },
    {
        label: 'profile',
        options: profileOptions,
        state: selectProfile,
        setState: setSelectProfile,
        type: 'multiselect'
    },
    {
        label: 'specialization',
        options: specializationOptions,
        state: selectSpecialization,
        setState: setSelectSpecialization,
        type: 'multiselect'
    },
    {
        label: 'need',
        options: needOptions,
        state: selectNeed,
        setState: setSelectNeed,
        setOptions: setNeedOptions,
        type: 'multiselect'
    },
    {
        label: 'language',
        options: languageOptions,
        state: selectLanguage,
        setState: setSelectLanguage,
        type: 'multiselect'
    },
    {
        label: 'status',
        options: statusOptions,
        state: selectStatus,
        setState: setSelectStatus,
        type: 'multiselect'
    },
    {
        label: 'link',
        options: linkOptions,
        state: selectLink,
        setState: setSelectLink,
        type: 'multiselect'
    }
]

    const columns = [
        {
            header: '',
            accessorKey: 'link',
            size: '70',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) => (
                <div className="visit-content__table-icons">
                    <button>
                        <Icon
                            path={mdiLinkVariantOff}
                            size={0.85}
                            color={cell.getValue() === 'connect' ? '#00A0DF' : '#6C757D'}
                        />
                    </button>
                </div>
            ),
        },
        {
            header: workPlaceHeader?.pl ? workPlaceHeader.pl.headerName : t('Place'),
            accessorKey: 'place',
        },
        {
            header: workPlaceHeader?.pt ? workPlaceHeader.pt.headerName : t('Place Type'),
            accessorKey: 'placeType',
        },
        {
            header: workPlaceHeader?.tp ? workPlaceHeader.tp.headerName : t('Types of Priporty'),
            accessorKey: 'typeOfPriority',
        },
        {
            header: clientTypeName ? clientTypeName[0].headerName : t('Client Type'),
            accessorKey: 'clientType',
        },
        {
            header: t('Global Brand'),
            accessorKey: 'globalBrand',
        },
        {
            header: t('Benefit'),
            accessorKey: 'benefit',
        },
        {
            header: t('Reference'),
            accessorKey: 'reference',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) => (
                <button
                    onClick={() => handleClickDomunet(row.original.id)}
                    style={{ backgroundColor: 'transparent', border: 'none' }}>
                    {cell.getValue() === 1 || cell.getValue() === 5 ? (
                        <Icon path={mdiPencilBoxOutline} size={0.85} />
                    ) : (
                        <Icon path={mdiEyeOutline} size={0.85} />
                    )}
                </button>
            ),
        },
        {
            header: t('Mechanism of Action'),
            accessorKey: 'mechanism',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) =>
                cell.getValue() === null || cell.getValue() === 0 ? (
                    <div className="visit-content__table-icons">
                        <Link to={`/apps/templates/connect=${row.original.id}&product=MechanismPage&sub=false`}>
                            <Icon path={mdiPlus} size={0.85} color="#6C757D" />
                        </Link>
                    </div>
                ) : (
                    <div className="visit-content__table-icons">
                        <Link to={`/apps/templates/templatedetails=${row.original.id}&Product=MechanismPage`}>
                            <Icon path={mdiSquareEditOutline} size={0.85} color="#6C757D" />
                        </Link>
                    </div>
                ),
        },
        {
            header: t('Page'),
            accessorKey: 'page',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) =>
                cell.getValue() === null || cell.getValue()?.length === 0 ? (
                    <div className="visit-content__table-icons">
                        <Link to={`/apps/templates/connect=${row.original.id}&product=Benefit&sub=false`}>
                            <Icon path={mdiPlus} size={0.85} color="#6C757D" />
                        </Link>
                    </div>
                ) : (
                    <div className="visit-content__table-icons">
                        <Link to={`/apps/templates/templatedetails=${row.original.id}&Product=Benefit`}>
                            <Icon path={mdiSquareEditOutline} size={0.85} color="#6C757D" />
                        </Link>
                    </div>
                ),
        },
        {
            header: t('Request'),
            accessorKey: 'request',
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: t('Warning'),
            accessorKey: 'warning',
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: t('Language'),
            accessorKey: 'language',
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: t('Specialization'),
            accessorKey: 'specialization',
        },
        {
            header: t('Indication'),
            accessorKey: 'indication',
        },
        {
            header: t('Profile'),
            accessorKey: 'profile',
        },
        {
            header: t('Need'),
            accessorKey: 'need',
        },
        {
            header: t('Valid'),
            accessorKey: 'valid',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) => (
                <Form.Check
                    type="switch"
                    style={{ fontSize: '.9rem' }}
                    onChange={(e) => changeValid(row.original?.id, e.target.checked)}
                    defaultChecked={cell.getValue()}
                    disabled={validSwitchDisableControl(row.original.id)}
                />
            ),
        },
        {
            header: t('Status'),
            accessorKey: 'status',
            size: '170',
            Cell: ({ cell }) => (
                <Status approveStatus={cell.getValue() === 'Redact' ? 1 : cell.getValue() === 'Approved' ? 3 : 5} />
            ),
        },
        {
            header: '',
            accessorKey: 'action',
            size: '50',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) => {
                return (
                    <Dropdowns
                        item={`?${row.original.id}?${row.original.benefit}`}
                        option={getStatusOptions(cell.getValue())}
                        onClick={statusClick}
                    />
                );
            },
        },
    ];

    const validSwitchDisableControl = (id) => {
        let item = filterData.filter((f) => f.id === Number(id))[0];
        if (item.isLink === 1 && item.validStatus === true) {
            return true;
        } else {
            return false;
        }
    };

    const handleClickDomunet = (itemId) => {
        let item = filterData.filter((i) => i.id === itemId)[0];
        setDocumentDetailShow(true);
        setDocumentDetailItems(item);
        if (item.approveStatus === 1 || item.approveStatus === 4 || item.approveStatus === 5) {
            setIsDisableInput(false);
        } else {
            setIsDisableInput(true);
        }
    };

    const getStatusOptions = (status, benefitId, documents) => {
        switch (status) {
            case 1:
                return statusRedactOptions;
            default:
                break;
        }
    };

    const statusClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );
        const statusId = Number(getIds[0]);
        const itemId = getIds[1];
        const itemName = getIds[2];

        const benefitItem = filterData.find((x) => x.id === Number(itemId));

        setActionItem({ id: itemId, statusId: statusId, name: itemName, item: benefitItem });

        switch (statusId) {
            case 0:
                setShowDeleteModal(true);
                break;
            case 1:
            case 2:
            case 3:
                setShowActionModal(true);
                break;
            case 6:
                setShowDuplicateModal(true);
                break;
            case 9:
                setIsShowUpdateModal(true);
                break;
            default:
                break;
        }
    };

    const changeValid = (i, checked) => {
        let item = filterData.filter((f) => f.id === Number(i))[0];
        const body = {
            id: Number(item.id),
            placeId: item.placeId,
            placeTypeId: item.placeTypeId,
            typeofPriorityId: item.typeOfPriortiyId,
            clientTypeId: item.clientTypeId,
            benefitName: item.benefitName.trim(),
            needId: item.needId,
            profileId: item.profile.id,
            languageId: item.language.languageAbbId,
            isApproved: item.approveStatus,
            rejectReason: item.rejectReason,
            specializationIds: item.specializations.map((item) => item.specId),
            modifiedBy: localStorage.getItem('userName'),
            validStatus: checked,
        };
        FetchApiPost('services/Pages/Benefit/UpdateBenefit', 'POST', body).then((res) => {
            if (res.status === 201) {
                res.json().then(({ data }) => {
                    let newData = filterData.map((i) => {
                        if (i.id === item.id) {
                            return { ...i, validStatus: checked };
                        } else {
                            return i;
                        }
                    });
                    setFilterData(newData);
                    let newTableData = tableData.map((i) => {
                        if (i.id === item.id) {
                            return { ...i, validStatus: checked };
                        } else {
                            return i;
                        }
                    });
                    setTableData(newTableData);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };

    const getFilterData = () => {
        if (
            filterComponentsData[0].state.length === 0 ||
            filterComponentsData[1].state.length === 0 ||
            filterComponentsData[2].state.length === 0 ||
            filterComponentsData[3].state.length === 0 ||
            filterComponentsData[4].state.length === 0 ||
            filterComponentsData[5].state.length === 0 ||
            filterComponentsData[6].state.length === 0 ||
            filterComponentsData[7].state.length === 0 ||
            filterComponentsData[8].state.length === 0 ||
            filterComponentsData[9].state.length === 0 ||
            filterComponentsData[10].state.length === 0 ||
            filterComponentsData[11].state.length === 0
        )
            return;
        setLoader(true);
        const body = {
            placeIds: filterComponentsData[0].state.map((item) => item.value),
            placeTypeIds: filterComponentsData[1].state.map((item) => item.value),
            typeOfPriorityIds: filterComponentsData[2].state.map((item) => item.value),
            clientTypeIds: filterComponentsData[3].state.map((item) => item.value),
            brandIds: filterComponentsData[4].state.map((el) => el.value),
            indicationIds: filterComponentsData[5].state.map((el) => el.value),
            profileIds: filterComponentsData[6].state.map((el) => el.value),
            specIds: filterComponentsData[7].state.map((el) => el.value),
            needIds: filterComponentsData[8].state.map((el) => el.value),
            languageIds: filterComponentsData[9].state.map((el) => el.value),
            statusIds: filterComponentsData[10].state.map((el) => el.value),
            isLink: filterComponentsData[11].state.map((el) => el.value),
        };

        FetchApiPost('services/Pages/Benefit/GetAllBenefitForApply', 'POST', body).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setFilterData(data);
                    setFilterShow(false)
                    setTableData(
                        data.map((item) => ({
                            id: item.id,
                            link: item.isLink === 1 ? 'connect' : 'not connect',
                            place: item.placeName,
                            placeType: item.placeTypeName,
                            typeOfPriority: item.typeofPriorityName,
                            clientType: item.clientTypeName,
                            globalBrand: item.brand.globalBrandName,
                            benefit: item.benefitName,
                            reference: item.approveStatus,
                            mechanism: item.mechanismPage,
                            page: item.productPages,
                            request: '-',
                            warning: '-',
                            language: item.language.languageAbb,
                            specialization: item.specializations.map((s) => s.specAbb).join(','),
                            indication: item.indication.indication,
                            profile: item.profile.profileName,
                            need: item.need.needName,
                            valid: item.validStatus,
                            status:
                                item?.approveStatus === 1
                                    ? 'Redact'
                                    : item?.approveStatus === 3
                                    ? 'Approved'
                                    : item?.approveStatus === 5 && 'Translate Awaited',
                            action: item.approveStatus,
                        }))
                    );
                    setLoader(false);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };

    const deleteFilter = () => {
        filterComponentsData[0].setState([]);
        filterComponentsData[1].setState([]);
        filterComponentsData[2].setState([]);
        filterComponentsData[3].setState([]);
        filterComponentsData[4].setState([]);
        filterComponentsData[5].setState([]);
        filterComponentsData[6].setState([]);
        filterComponentsData[7].setState([]);
        filterComponentsData[8].setState([]);
        filterComponentsData[9].setState([]);
        filterComponentsData[10].setState([]);
        filterComponentsData[11].setState([]);
    };

    return (
        <div>
            <TableLayout
                data={tableData}
                columns={columns}
                isAccordion={true}
                handleNewButton={() => setIsShow(true)}
                isLoading={loader}
                filterShow={filterShow}
                setFilterShow={setFilterShow}
                handlApplyBtn={getFilterData}
                handlClearBtn={deleteFilter}
                columnPinningRight={['action']}
                handleDropDownItemClick={statusClick}
                filter={<Filter filterComponentsData={filterComponentsData} />}
            />
            {isShow && (
                <AddBenefit
                    showAddModal={isShow}
                    setShowAddModal={setIsShow}
                    getFilterData={getFilterData}
                    companyIdForFilter={companyIdForFilter}
                />
            )}

            {documentDetailShow && (
                <DocumentDetail
                    documentDetailShow={documentDetailShow}
                    setDocumentDetailShow={setDocumentDetailShow}
                    item={documentDetailItems}
                    getFilterData={getFilterData}
                    isDisableInput={isDisableInput}
                />
            )}

            {isShowUpdateModal && (
                <UpdateModal
                    showAddModal={isShowUpdateModal}
                    setShowAddModal={setIsShowUpdateModal}
                    item={actionItem}
                    getFilterData={getFilterData}
                    companyIdForFilter={companyIdForFilter}
                />
            )}

            {showDuplicateModal && (
                <DublicateModal
                    showAddModal={showDuplicateModal}
                    setShowAddModal={setShowDuplicateModal}
                    item={actionItem}
                    getFilterData={getFilterData}
                    companyIdForFilter={companyIdForFilter}
                />
            )}

            {showActionModal && (
                <ActionModal
                    modalShow={showActionModal}
                    setModalShow={setShowActionModal}
                    item={actionItem}
                    applyFilter={getFilterData}
                />
            )}

            {showDeleteModal && (
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    item={actionItem}
                    applyFilter={getFilterData}
                />
            )}
        </div>
    );
};

export default Benefit;
