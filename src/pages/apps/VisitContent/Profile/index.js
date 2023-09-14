import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Filter from '../../../../components/Filter';
import { mdiPlus, mdiSquareEditOutline, mdiLinkVariantOff } from '@mdi/js';
import 'antd/dist/antd.css';
import Icon from '@mdi/react';
import 'tippy.js/dist/tippy.css';
import Status from '../../../../components/Status';
import { FetchApiPost, FetchApiGet } from '../../../../utils/http.helper';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import WhereLinkedModal from './WhereLinkedModal';

import TableLayout from '../../../../components/Tables/TableAccordion';
import AddModal from './AddModal/AddModal';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Profile = ({ selectedTab, setSelectTab }) => {
    const { t } = useTranslation();
    const history = useHistory();

    const location = useLocation();

    const [loader, setLoader] = useState(false);
    const [workPlaceHeader, setWorkPlaceHeader] = useState();
    const [clientTypeName, setClientTypeName] = useState();

    const [filterShow, setFilterShow] = useState(true);

    const [filterData, setFilterData] = useState([]);

    const [tableData, setTableData] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);

    const [selectPlace, setSelectPlace] = useState([]);
    const [placeOptions, setPlaceOptions] = useState([]);

    const [selectPlaceType, setSelectPlaceType] = useState([]);
    const [placeTypeOptions, setPlaceTypeOptions] = useState([]);

    const [selectTypeOfPriority, setSelectTypeOfPriority] = useState([]);
    const [typeOfPrioityOptions, setTypeOfPriorityOptions] = useState([]);

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

    const [selectLanguage, setSelectLanguage] = useState([]);
    const [languageOptions, setLanguageOptions] = useState([]);

    const [companyIdForFilter, setCompanyIdForFilter] = useState();

    useEffect(() => {
        // console.log(location)
        if(location.search === ('?tab=Promo Subject')){
            console.log("kljnfewajnıklfewjkewjknewnkjrewkjnerwnkjwrekjnerwnrewnkjrewk")

                    history.push('/apps/visit-content');
                    setSelectTab({
                        key: 3,
                        label: t('Promo Subject'),
                    })
                }

    }, [location])

    const [selectStatus, setSelectStatus] = useState([
        { value: 0, label: 'Missing' },
        { value: 1, label: 'Redact' },
        { value: 3, label: 'Approved' },
    ]);
    const [statusOptions, setStatusOptions] = useState([
        { value: 0, label: 'Missing' },
        { value: 1, label: 'Redact' },
        { value: 3, label: 'Approved' },
    ]);

    const [selectLink, setSelectLink] = useState([
        { value: 0, label: t('Not Connect') },
        { value: 1, label: t('Connect') },
    ]);
    const [linkOptions, setLinkOptions] = useState([
        { value: 0, label: t('Not Connect') },
        { value: 1, label: t('Connect') },
    ]);

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
        setLoader(true);
        FetchApiGet('api/OldSystem/GetAllGlobalBrands', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setGlobalBrandOptions(
                        data.map((brand) => {
                            return {
                                value: brand.GlobalBrandId,
                                label: brand.GlobalBrandName,
                            };
                        })
                    );
                    setSelectGlobalBrand(
                        data.map((brand) => {
                            return {
                                value: brand.GlobalBrandId,
                                label: brand.GlobalBrandName,
                            };
                        })
                    );
                    setLoader(false);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }else{
                setLoader(false)
                setGlobalBrandOptions([]);
                setSelectGlobalBrand([]);
            }
        });
    }, [history])

    useEffect(() => {
        if(!companyIdForFilter || selectGlobalBrand.length === 0){
            setIndicationOptions([])
            setSelectIndication([])
            setProfileOptions([])
            setSelectProfile([])
            setSpecializationOptions([])
            setSelectSpecialization([])
            return;
        }
        setLoader(true)
        FetchApiPost('api/OldSystem/GetIndicationsByBrandIdandCompanyId', 'POST', {
            Brands: [...selectGlobalBrand.map(i => i.value)],
            CompanyId: companyIdForFilter
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setIndicationOptions(data.map(i => ({ value: i.IndicationId, label: i.IndicationName })))
                    setSelectIndication(data.map(i => ({ value: i.IndicationId, label: i.IndicationName })))
                    setLoader(false)
                })
                }else if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }else{
                    setLoader(false);
                    setIndicationOptions([]);
                    setSelectIndication([]);
                }
        })
    }, [companyIdForFilter, selectGlobalBrand])

    useEffect(() => {
        if(selectIndication.length === 0 || !companyIdForFilter){
            setProfileOptions([])
            setSelectProfile([])
            setSpecializationOptions([])
            setSelectSpecialization([])
            return;
        }
        setLoader(true)
        FetchApiPost('api/OldSystem/GetProfileByIndicationIds', 'POST', {
            IndicationIds: [...selectIndication.map(i => i.value)],
            PageControl: 1,
            CompanyId: companyIdForFilter
        }).then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setProfileOptions(data.map(i => ({ value: i.ProfileId, label: i.ProfileName })))
                    setSelectProfile(data.map(i => ({ value: i.ProfileId, label: i.ProfileName })))
                    setLoader(false)
                })
            }else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }else{
                setLoader(false);
                setProfileOptions([]);
                setSelectProfile([]);
            }
        })
    }, [selectIndication, companyIdForFilter])

    useEffect(() => {
        setSelectSpecialization([]);
        setSpecializationOptions([]);

        if (selectGlobalBrand.length === 0 || selectIndication.length === 0 || selectProfile.length === 0 || selectClientType.length === 0) return;

        setLoader(true)
        FetchApiPost('api/OldSystem/GetSpecsByGlobalBrandIdsandIndicationIdsandProfileIds', 'POST', {
            brandIds: `${selectGlobalBrand.map(i => i.value).join(',')}`,
            indicationIds: `${selectIndication.map(i => i.value).join(',')}`,
            profileIds: `${selectProfile.map(i => i.value).join(',')}`,
            clientTypeIds: selectClientType.map(i => i.value).join(',')
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(data => {
                    setSpecializationOptions([{value: 0, label: 'N/A'}, ...data.map(i => ({ value: i.spec_id, label: i.spec_name }))])
                    setSelectSpecialization([{value: 0, label: 'N/A'}, ...data.map(i => ({ value: i.spec_id, label: i.spec_name }))])
                    setLoader(false)
                })
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }else{
                setLoader(false)
                setSpecializationOptions([]);
                setSelectSpecialization([]);
            }
        });
    }, [selectProfile, selectGlobalBrand, selectIndication, selectClientType]);

    useEffect(() => {
        setLoader(true);
        let empId = localStorage.getItem('userEmpId');
        FetchApiGet(`api/OldSystem/GetCompanies/{empId}?empId=${empId}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {

                    let companyId = Number(localStorage.getItem('companyId'));

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
                setLanguageOptions([]);
                setSelectLanguage([]);
            }
        });
    }, [history]);

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
                    <button onClick={() => whereItLinked(row.original)}>
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
            header: t('Profile'),
            accessorKey: 'profile',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            )
        },
        {
            header: t('Profile Abb'),
            accessorKey: 'profileAbb',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell }) => <>{`PRF${cell.getValue()}`}</>,
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
                        <Link to={`/apps/templates/connect=${row.original.id}&product=Profile&sub=false`}>
                            <Icon path={mdiPlus} size={0.85} color="#6C757D" />
                        </Link>
                    </div>
                ) : (
                    <div className="visit-content__table-icons">
                        <Link to={`/apps/templates/templatedetails=${row.original?.id}&Product=Profile`}>
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
            Cell: ({ cell }) => <>-</>,
        },
        {
            header: t('Warning'),
            accessorKey: 'warning',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell }) => <>-</>,
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
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            )
        },
        {
            header: t('Valid'),
            accessorKey: 'valid',
            size: '100',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) => (
                <Form.Check
                    type="switch"
                    style={{ fontSize: '.9rem' }}
                    onChange={(e) =>
                        changeValid(
                            row.original?.id,
                            e.target.checked,
                            row.original?.status === 'Missing' ? 0 : row.original?.status === 'Redact' ? 1 : 3
                        )
                    }
                    defaultChecked={cell.getValue()}
                />
            ),
        },
        {
            header: t('Status'),
            accessorKey: 'status',
            size: '170',
            Cell: ({ cell }) => (
                <Status approveStatus={cell.getValue() === 'Missing' ? 0 : cell.getValue() === 'Redact' ? 1 : 3} />
            ),
        },
    ];

    const changeValid = (id, checked, isApproved) => {
        FetchApiPost('services/Pages/Profile/UpdateProfileContent', 'POST', {
            id: id,
            modifiedBy: localStorage.getItem('userName'),
            isApproved: isApproved,
            validStatus: checked,
        }).then((res) => {
            if (res.status === 201) {
                let data = filterData.map((item) => {
                    if (id === item.id) {
                        return {
                            ...item,
                            validStatus: checked,
                        };
                    } else {
                        return item;
                    }
                });
                setFilterData(data);
            }
        });
    };

    const [linkedModal, setLinkedModal] = useState(false);

    const [linkedData, setLinkedData] = useState();
    const whereItLinked = (item) => {
        if (item?.usingNeedIds?.length > 0) {
            setLinkedData(item);
            setLinkedModal(true);
        }
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
            filterComponentsData[10].state.length === 0
        ) {
            return;
        }
        setLoader(true);
        const data = {
            placeIds: filterComponentsData[0].state.map((item) => item.value),
            placeTypeIds: filterComponentsData[1].state.map((item) => item.value),
            typeOfPriorityIds: filterComponentsData[2].state.map((item) => item.value),
            clientTypeIds: filterComponentsData[3].state.map((item) => item.value),
            brandIds: filterComponentsData[4].state.map((item) => item.value),
            indicationIds: filterComponentsData[5].state.map((item) => item.value),
            profileIds: filterComponentsData[6].state.map((item) => item.value),
            specIds:
                filterComponentsData[7].state.length === 0
                    ? [0]
                    : filterComponentsData[7].state.map((item) => item.value),
            languageIds: filterComponentsData[8].state.map((item) => item.value),
            statuses: filterComponentsData[9].state.map((item) => item.value),
            isLink:
                filterComponentsData[10].state.length === 2
                    ? [true, true]
                    : filterComponentsData[10].state[0].value === 0
                    ? [false]
                    : [true],
        };

        FetchApiPost('services/Pages/Profile/GetAllProfileFilter', 'POST', data).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setLoader(false);
                    setFilterShow(false)
                    setFilterData(data);
                    setTableData(
                        data.map((item) => ({
                            id: item.id,
                            link: item.usingNeedIds?.length > 0 ? 'connect' : 'not connect',
                            place: item.placeName,
                            placeType: item.placeTypeName,
                            typeOfPriority: item.typeOfPriorityName,
                            clientType: item.clientTypeName,
                            globalBrand: item?.brand?.globalBrandName,
                            profile: item?.profileName,
                            profileAbb: item?.profileId,
                            page: item?.productPages,
                            request: '-',
                            warning: '-',
                            language: item?.language?.languageAbb,
                            specialization: item?.spec?.map((i) => i.specAbb).join(', '),
                            indication: item?.indication?.indication,
                            valid: item?.validStatus,
                            status:
                                item?.isApproved === 0
                                    ? 'Missing'
                                    : item?.isApproved === 1
                                    ? 'Redact'
                                    : item?.isApproved === 3 && 'Approved',
                            subRows: item.translates.map((t) => ({
                                id: t.id,
                                link: t.usingNeedIds?.length > 0 ? 'connect' : 'not connect',
                                place: t.placeName,
                                placeType: t.placeTypeName,
                                typeOfPriority: t.typeOfPriorityName,
                                clientType: t.clientTypeName,
                                globalBrand: t?.brand?.globalBrandName,
                                profile: t?.profileName,
                                profileAbb: t?.profileId,
                                page: t?.productPages,
                                request: '-',
                                warning: '-',
                                language: t?.language?.languageAbb,
                                specialization: t?.spec?.map((i) => i.specAbb).join(', '),
                                indication: t?.indication?.indication,
                                valid: t?.validStatus,
                                status:
                                    t?.isApproved === 0
                                        ? 'Missing'
                                        : t?.isApproved === 1
                                        ? 'Redact'
                                        : t?.isApproved === 3 && 'Approved',
                            })),
                        }))
                    );
                });
                //     res.json().then(({ data }) => {
                //         // setFilterData(data);
                //         setLoader(false);
                //         let newData = data.map((item) => {
                //             if (!item.profileName || !item.indication.indication) {
                //                 if (item.isApproved === 1) {
                //                     // statüyü missinge çek
                //                     return changeStatus(item, 0);
                //                 } else {
                //                     return item;
                //                 }
                //             } else if (item.profileName && item.indication.indication && item.isApproved === 0) {
                //                 // statüyü redact a çek
                //                 return changeStatus(item, 1);
                //             } else {
                //                 return item;
                //             }
                //         });
                //         setFilterData(newData);
                //         setTableData(
                //             newData.map(item => ({
                //                 id: item?.id,
                //                 link: item.usingNeedIds?.length > 0 ? 'connect' : 'not connect',
                //                 globalBrand: item?.brand?.globalBrandName,
                //                 profile: item?.profileName,
                //                 profileAbb: item?.profileId,
                //                 page: item?.productPages,
                //                 request: '-',
                //                 warning: '-',
                //                 language: item?.language?.languageAbb,
                //                 specialization: item?.spec?.map((i) => i.specAbb).join(', '),
                //                 indication: item?.indication?.indication,
                //                 valid: item?.validStatus,
                //                 status: item?.isApproved === 0 ? 'Missing' : item?.isApproved === 1 ? 'Redact' : item?.isApproved === 3 && 'Approved',
                //             }))
                //         )
                //     });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setFilterData([]);
            }
        });
    };

    const changeStatus = (item, status) => {
        let changeData = {};
        FetchApiPost('services/Pages/Profile/UpdateProfileContent', 'POST', {
            id: item.id,
            modifiedBy: localStorage.getItem('userName'),
            isApproved: item.isApproved,
            validStatus: status,
        }).then((res) => {
            if (res.status === 201) {
                changeData = {
                    ...item,
                    isApproved: status,
                };
            } else {
                changeData = {
                    ...item,
                };
            }
        });
        return changeData;
    };

    const deleteFilter = () => {
        filterComponentsData[0].setState([]);
        filterComponentsData[1].setState([]);
        filterComponentsData[2].setState([]);
        filterComponentsData[3].setState([]);
        filterComponentsData[4].setState([]);
        filterComponentsData[7].setState([]);
        filterComponentsData[5].setState([]);
        filterComponentsData[6].setState([]);
        filterComponentsData[8].setState([]);
        filterComponentsData[9].setState([]);
        filterComponentsData[10].setState([]);
    };

    return (
        <div>
            <TableLayout
                data={tableData}
                columns={columns}
                isAccordion={true}
                handleNewButton={() => setShowAddModal(true)}
                isLoading={loader}
                filterShow={filterShow}
                setFilterShow={setFilterShow}
                handlApplyBtn={getFilterData}
                handlClearBtn={deleteFilter}
                filter={<Filter filterComponentsData={filterComponentsData} />}
            />

            {linkedModal && (
                <WhereLinkedModal modalShow={linkedModal} setModalShow={setLinkedModal} linkedData={linkedData} />
            )}

            {showAddModal && (
                <AddModal
                    showAddModal={showAddModal}
                    setShowAddModal={setShowAddModal}
                    getFilterData={getFilterData}
                    companyIdForFilter={companyIdForFilter}
                />
            )}
        </div>
    );
};

export default Profile;
