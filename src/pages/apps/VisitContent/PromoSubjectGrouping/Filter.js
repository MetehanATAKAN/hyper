import React, { useEffect, useState } from 'react'
import Filters from '../../../../components/Filter';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import PharmacyShouldSave from '../../../../components/Modals/PharmacyShouldSave';
import { useTranslation } from 'react-i18next';
import { radioValueMicroTarget } from '../../../../redux/microtarget/actions';

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
    radio,
    setAllData
}) => {

    const [isOpenFilter, setIsOpenFilter] = useState(true);
   ;
    const { t } = useTranslation();
    const { history } = useHistory();

    const [tableData, setTableData] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);

    const [loader, setLoader] = useState(false);
    const [filterShow, setFilterShow] = useState(true);


    const [selectLanguage, setSelectLanguage] = useState([]);
    const [languageOptions, setLanguageOptions] = useState([]);

    const [workPlaceHeader, setWorkPlaceHeader] = useState();
    const [clientTypeName, setClientTypeName] = useState();

    const [globalBrand, setGlobalBrand] = useState([]);
    const [globalBrandsOption, setGlobalBrandsOption] = useState([]);

    //place
    const [place, setPlace] = useState([]);
    const [placeOptions, setPlaceOptions] = useState([]);

    //place type
    const [placeType, setPlaceType] = useState([]);
    const [placeTypeOptions, setPlaceTypeOptions] = useState([]);

    //type of priority
    const [typeOfPriority, setTypeOfPriority] = useState([]);
    const [typeOfPriorityOptions, setTypeOfPriorityOptions] = useState([]);

    //client type
    const [clientType, setClientType] = useState([]);
    const [clientTypeOptions, setClientTypeOptions] = useState([]);

    const [specialization, setSpecialization] = useState([]);
    const [specializationsOption, setSpecializationsOption] = useState([]);

    const [indication, setIndication] = useState([]);
    const [indicationsOption, setIndicationsOption] = useState([]);

    const [profile, setProfile] = useState([]);
    const [profilesOption, setProfilesOption] = useState([]);

    const [need, setNeed] = useState([]);
    const [needsOption, setNeedsOption] = useState([]);

    const [benefit, setBenefit] = useState([]);
    const [benefitsOption, setBenefitsOption] = useState([]);

    const [type, setType] = useState([
        { value: 0, label: t('Child') },
        { value: 1, label: t('Parent') },
    ]);
    const [typesOption, setTypesOption] = useState([
        { value: 0, label: t('Child') },
        { value: 1, label: t('Parent') },
    ]);

    const [link, setLink] = useState([
        { value: 0, label: t('Not Connect') },
        { value: 1, label: t('Connect') },
    ]);
    const [linksOption, setLinksOption] = useState([
        { value: 0, label: t('Not Connect') },
        { value: 1, label: t('Connect') },
    ]);

    const [status, setStatus] = useState([
        { value: 0, label: 'Missing' },
        { value: 1, label: 'Redact' },
        { value: 2, label: 'Approval' },
        { value: 3, label: 'Approved' },
        { value: 5, label: 'Translate Awaited' },
    ]);
    const [statusesOption, setStatusesOption] = useState([
        { value: 0, label: 'Missing' },
        { value: 1, label: 'Redact' },
        { value: 2, label: 'Approval' },
        { value: 3, label: 'Approved' },
        { value: 5, label: 'Translate Awaited' },
    ]);



    const [noDataModal, setNoDataModal] = useState(false);

    const [companyIdForFilter, setCompanyIdForFilter] = useState();

    const handleNoData = () => {
        setNoDataModal(false);
    }



    const filterComponentsData = [
        {
            label: 'company',
            state: selectLanguage,
            setState: setSelectLanguage,
            options: languageOptions,
            type: 'multiselect',
        },
        {
            label: workPlaceHeader?.pl ? workPlaceHeader?.pl?.headerName : "place",
            state: place,
            setState: setPlace,
            options: placeOptions,
            type: 'multiselect',
        },
        {
            label: workPlaceHeader?.pt ? workPlaceHeader?.pt?.headerName : "place type",
            state: placeType,
            setState: setPlaceType,
            options: placeTypeOptions,
            type: 'multiselect',
        },
        {
            label: workPlaceHeader?.tp ? workPlaceHeader?.tp?.headerName : "type of priority",
            state: typeOfPriority,
            setState: setTypeOfPriority,
            options: typeOfPriorityOptions,
            type: 'multiselect',
        },
        {
            label: clientTypeName ? clientTypeName[0].headerName : t('client type'),
            state: clientType,
            setState: setClientType,
            options: clientTypeOptions,
            type: 'multiselect',
        },
        {
            label: 'global brand',
            state: globalBrand,
            setState: setGlobalBrand,
            options: globalBrandsOption,
            type: 'multiselect',
        },
        {
            label: 'indication',
            state: indication,
            setState: setIndication,
            options: indicationsOption,
            type: 'multiselect',
        },
        {
            label: 'profile',
            state: profile,
            setState: setProfile,
            options: profilesOption,
            type: 'multiselect',
        },
        {
            label: 'specialization',
            state: specialization,
            setState: setSpecialization,
            options: specializationsOption,
            type: 'multiselect',
        },
        {
            label: 'need',
            state: need,
            setState: setNeed,
            options: needsOption,
            type: 'multiselect',
        },
        {
            label: 'benefit',
            state: benefit,
            setState: setBenefit,
            options: benefitsOption,
            type: 'multiselect',
        },
        {
            label: 'type',
            state: type,
            setState: setType,
            options: typesOption,
            type: 'multiselect',
        },
        {
            label: 'link',
            state: link,
            setState: setLink,
            options: linksOption,
            type: 'multiselect',
        },
        {
            label: 'status',
            state: status,
            setState: setStatus,
            options: statusesOption,
            type: 'multiselect',
        },
    ];

    const handleGetDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };


    /**apply filter */
    const apply = () => {
        console.log('apply da');
        setApplyFilter(false);
        if (
            selectLanguage.length === 0 ||
            globalBrand.length === 0 ||
            specialization.length === 0 ||
            indication.length === 0 ||
            profile.length === 0 ||
            need.length === 0 ||
            benefit.length === 0 ||
            type.length === 0 ||
            link.length === 0 ||
            status.length === 0
        ) {
            return;
        }
        setLoading(true);
        const body = {
            languageIds: selectLanguage.map((item) => item.value),
            brandIds: globalBrand.map((item) => item.value),
            specIds: specialization.map((item) => item.value),
            indicationIds: indication.map((item) => item.value),
            profileIds: profile.map((item) => item.value),
            needIds: need.map((item) => item.value),
            benefitIds: benefit.map((item) => item.value),
            organizationTypeIds: [0],
            typeIds: type.map((item) => item.value),
            isLink: link.map((item) => item.value),
            statusIds: status.map((item) => item.value),
            placeIds: place.map(i => i.value),
            placeTypeIds: placeType.map(i => i.value),
            typeOfPriorityIds: typeOfPriority.map(i => i.value),
            clientTypeIds: clientType.map(i => i.value)
        };
        FetchApiPost('services/Pages/PromoSubjectGrouping/GetPromoSubjectGroupingForApply', 'POST', body).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    const filteredData1 = data.filter(el => el?.type === 1);
                    const filteredData2 = data.filter(el => el?.type === 0);
                    setAllData(
                        data.map((item) => item)
                    );
                    setTableData1(
                        filteredData1.map((item) => {
                            return {
                                id: item.id,
                                place: item.placeName,
                                placeType: item.placeTypeStr,
                                typeOfPriority: item.typeOfPriorityStr,
                                clientType: item.clientTypeStr,
                                benefitsData:item?.benefits,
                                needData:item?.need,
                                brand: item.brand.globalBrandName,
                                name: item.name,
                                reference: null,
                                visitStructure: null,
                                request: null,
                                warning: null,
                                quiz: null,
                                language: item.language.languageAbb,
                                type: item.type === 0 ? t('Child') : t('Parent'),
                                specializations: item.specializations.map((item) => item.specAbb).join(', '),
                                indication: item.indication.indication,
                                profile: item.profile.profileName,
                                need: item.need.needName,
                                benefits: item.benefits[0].benefitName,
                                startDate:  handleGetDate(item.startDate),
                                endDate:    handleGetDate(item.endDate),
                                validStatus: item.validStatus,
                                approveStatus: item.approveStatus,
                                action: item.approveStatus,
                                isCorporate: item.isCorporate,
                            };
                        })
                    );
                    setTableData2(
                        filteredData2.map((item) => {
                            return {
                                id: item.id,
                                place: item.placeName,
                                placeType: item.placeTypeStr,
                                benefitsData:item?.benefits,
                                needData:item?.need,
                                typeOfPriority: item.typeOfPriorityStr,
                                clientType: item.clientTypeStr,
                                brand: item.brand.globalBrandName,
                                name: item.name,
                                reference: null,
                                visitStructure: null,
                                request: null,
                                warning: null,
                                quiz: null,
                                language: item.language.languageAbb,
                                type: item.type === 0 ? t('Child') : t('Parent'),
                                specializations: item.specializations.map((item) => item.specAbb).join(', '),
                                indication: item.indication.indication,
                                profile: item.profile.profileName,
                                need: item.need.needName,
                                benefits: item.benefits[0].benefitName,
                                startDate:  handleGetDate(item.startDate),
                                endDate:    handleGetDate(item.endDate),
                                validStatus: item.validStatus,
                                approveStatus: item.approveStatus,
                                action: item.approveStatus,
                                isCorporate: item.isCorporate,
                            };
                        })
                    );
                    orgData2(
                        filteredData2.map((item) => {
                            return {
                                id: item.id,
                                place: item.placeName,
                                placeType: item.placeTypeStr,
                                benefitsData:item?.benefits,
                                needData:item?.need,
                                typeOfPriority: item.typeOfPriorityStr,
                                clientType: item.clientTypeStr,
                                brand: item.brand.globalBrandName,
                                name: item.name,
                                reference: null,
                                visitStructure: null,
                                request: null,
                                warning: null,
                                quiz: null,
                                language: item.language.languageAbb,
                                type: item.type === 0 ? t('Child') : t('Parent'),
                                specializations: item.specializations.map((item) => item.specAbb).join(', '),
                                indication: item.indication.indication,
                                profile: item.profile.profileName,
                                need: item.need.needName,
                                benefits: item.benefits[0].benefitName,
                                startDate:  handleGetDate(item.startDate),
                                endDate:    handleGetDate(item.endDate),
                                validStatus: item.validStatus,
                                approveStatus: item.approveStatus,
                                action: item.approveStatus,
                                isCorporate: item.isCorporate,
                            };
                        })
                    );
                });
                setLoading(false);
            }
        });
    };

    const clear = () => {
        setClearFilter(false);

        setSelectLanguage([]);
        setGlobalBrand([]);
        setSpecialization([]);
        setSpecializationsOption([]);
        setIndication([]);
        setIndicationsOption([]);
        setProfile([]);
        setProfilesOption([]);
        setNeed([]);
        setNeedsOption([]);
        setBenefit([]);
        setBenefitsOption([]);

        setPlace([]);
        setPlaceType([]);
        setTypeOfPriority([]);
        setClientType([]);

        setType([]);
        setLink([]);
        setStatus([]);
    }

    /**Change Filter */
    const changeFilter = (name) => {

    }

    const isFilters = () => {



    }



    useEffect(() => {
        setLoader(true);
        let empId = localStorage.getItem('userEmpId');
        FetchApiGet(`api/OldSystem/GetCompanies/{empId}?empId=${empId}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    let companyId = 0;

                    if (data.length === 1) {
                        companyId = data[0].CompanyId;
                    } else if (data.length > 1 && data.find((item) => item.CompanyId === 238)) {
                        companyId = 238;
                    } else {
                        companyId = data[0].CompanyId;
                    }

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
            } else {
                setLoader(false);
            }
        });
    }, [history]);

    const [companyId, setCompanyId] = useState();
    useEffect(() => {
        let empId = localStorage.getItem('userEmpId');
        FetchApiGet(`api/OldSystem/GetCompanies/{empId}?empId=${empId}`, 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        if (data.length === 1) {
                            setCompanyId(data[0].CompanyId)
                        } else if (data.length > 1 && data.find((item) => item.CompanyId === 238)) {
                            setCompanyId(238)
                        } else {
                            setCompanyId(data[0].CompanyId)
                        }
                    })
                }
            })
    }, [])

    useEffect(() => {
        if (!companyId) return;
        let countryId = localStorage.getItem('countryId');
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForWorkPlace`, 'POST', {
            headerIds: [0],
            countryId: countryId,
            companyId: companyId
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
    }, [history, companyId]);


    useEffect(() => {
        if (!companyId) return;
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForClient`, 'POST', {
            headerIds: [0],
            countryId: Number(localStorage.getItem('countryId')),
            companyId: companyId
        })
            .then(res => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setClientTypeName(data)
                    })
                } else {
                    setClientTypeName()
                }
            })
    }, [companyId])

    useEffect(() => {
        if (workPlaceHeader) {
            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.pl.id,
                countryId: Number(localStorage.getItem('countryId')),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setPlaceOptions(data.map((item) => ({ label: item.definationName, value: item.definationId })));
                        setPlace(data.map((item) => ({ label: item.definationName, value: item.definationId })));
                    });
                } else {
                    setPlaceOptions([]);
                    setPlace([]);
                }
            });

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.pt.id,
                countryId: Number(localStorage.getItem('countryId')),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setPlaceTypeOptions(
                            data.map((item) => ({ label: item.definationName, value: item.definationId }))
                        );
                        setPlaceType(
                            data.map((item) => ({ label: item.definationName, value: item.definationId }))
                        );
                    });
                } else {
                    setPlaceTypeOptions([]);
                    setPlaceType([]);
                }
            });

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.tp.id,
                countryId: Number(localStorage.getItem('countryId')),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        setTypeOfPriorityOptions(
                            data.map((item) => ({ label: item.definationName, value: item.definationId }))
                        );
                        setTypeOfPriority(
                            data.map((item) => ({ label: item.definationName, value: item.definationId }))
                        );
                    });
                } else {
                    setTypeOfPriorityOptions([]);
                    setTypeOfPriority([]);
                }
            });
        } else {
            setPlaceOptions([]);
            setPlaceTypeOptions([]);
            setTypeOfPriorityOptions([]);
            setPlace([]);
            setPlaceType([]);
            setTypeOfPriority([]);
        }
    }, [workPlaceHeader]);

    useEffect(() => {
        if (!clientTypeName) return;
        FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
            countryId: Number(localStorage.getItem('countryId')),
            id: clientTypeName[0].id
        }).then(res => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setClientTypeOptions([{ value: 0, label: 'N/A' }, ...data.map(item => ({ value: item.definationId, label: item.definationName }))])
                    setClientType([{ value: 0, label: 'N/A' }, ...data.map(item => ({ value: item.definationId, label: item.definationName }))])
                })
            }
        })
    }, [clientTypeName])

    useEffect(() => {
        if (place.length === 0 || placeType.length === 0 || typeOfPriority.length === 0 || clientType.length === 0) {
            setGlobalBrand([]);
            setGlobalBrandsOption([]);
            return;
        }
        setLoader(true);
        FetchApiPost('services/Pages/Need/GetBrandsForNeedCreate', 'POST', {
            placeIds: place.map(i => i.value),
            placeTypeIds: placeType.map(i => i.value),
            typeOfPriorityIds: typeOfPriority.map(i => i.value),
            clientTypeIds: clientType.map(i => i.value)
        }).then(res => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setLoader(false);
                    setGlobalBrandsOption(data.map(item => ({ value: item.globalBrandId, label: item.globalBrandName })))
                    setGlobalBrand(data.map(item => ({ value: item.globalBrandId, label: item.globalBrandName })))
                })
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        })
    }, [history, place, placeType, typeOfPriority, clientType])

    useEffect(() => {
        if (place.length === 0 || placeType.length === 0 || typeOfPriority.length === 0 || globalBrand.length === 0) {
            setIndication([]);
            setIndicationsOption([]);
            return;
        }
        setLoader(true);
        FetchApiPost('services/Pages/Need/GetIndicationsForNeedCreate', 'POST', {
            placeIds: place.map(i => i.value),
            placeTypeIds: placeType.map(i => i.value),
            typeOfPriorityIds: typeOfPriority.map(i => i.value),
            clientTypeIds: clientType.map(i => i.value),
            brandIds: globalBrand.map(i => i.value)
        }).then(res => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setLoader(false);
                    setIndicationsOption(data.map(item => ({ label: item.indicationName, value: item.indicationId })))
                    setIndication(data.map(item => ({ label: item.indicationName, value: item.indicationId })))

                })
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        })
    }, [history, globalBrand])


    useEffect(() => {
        if (indication.length === 0) {
            setProfilesOption([])
            setProfile([])
            return;
        }
        setLoader(true)
        FetchApiPost('services/Pages/Need/GetProfileForNeedCreate', 'POST', {
            placeIds: place.map(i => i.value),
            placeTypeIds: placeType.map(i => i.value),
            typeOfPriorityIds: typeOfPriority.map(i => i.value),
            clientTypeIds: clientType.map(i => i.value),
            brandIds: globalBrand.map(i => i.value),
            indicationIds: indication.map(i => i.value)
        }).then(res => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setProfilesOption(data.map(i => ({ value: i.profileId, label: i.profileName })))
                    setProfile(data.map(i => ({ value: i.profileId, label: i.profileName })))
                    setLoader(false)
                })
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setLoader(false);
            }
        })
    }, [indication])

    useEffect(() => {
        if (profile.length === 0) {
            setSpecializationsOption([]);
            setSpecialization([]);
            return;
        }
        setLoader(true);
        FetchApiPost('services/Pages/Need/GetSpecForNeedCreate', 'POST', {
            placeIds: place.map(i => i.value),
            placeTypeIds: placeType.map(i => i.value),
            typeOfPriorityIds: typeOfPriority.map(i => i.value),
            clientTypeIds: clientType.map(i => i.value),
            brandIds: globalBrand.map(i => i.value),
            indicationIds: indication.map(i => i.value),
            profileIds: profile.map(i => i.value)
        }).then(res => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setLoader(false)
                    setSpecializationsOption(data.map(item => ({ label: item.specName, value: item.specId })))
                    setSpecialization(data.map(item => ({ label: item.specName, value: item.specId })))
                })
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        })
    }, [history, profile])

    useEffect(() => {
        if (profile.length === 0) {
            setNeedsOption([])
            setNeed([])
            return;
        }
        setLoader(true);
        FetchApiPost('services/Pages/Need/GetNeedsForBenefitFilter', 'POST', {
            SpecIds: specialization.length > 0 ? specialization.map(i => i.value) : [0],
            IndicationIds: indication.map(i => i.value),
            ProfileIds: profile.map(i => i.value),
            PlaceIds: place.map(i => i.value),
            PlaceTypeIds: placeType.map(i => i.value),
            TypeOfPriorityIds: typeOfPriority.map(i => i.value),
            ClientTypeIds: clientType.map(i => i.value),
            BrandIds: globalBrand.map(i => i.value)
        }).then(res => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setNeedsOption(data.map(item => {
                        return {
                            value: item.id,
                            label: item.needName
                        }
                    }))
                    setNeed(data.map(item => {
                        return {
                            value: item.id,
                            label: item.needName
                        }
                    }))
                    setLoader(false)
                })
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        })

    }, [history, profile])


    useEffect(() => {
        if (
            globalBrand.length === 0 ||
            indication.length === 0 ||
            profile.length === 0 ||
            specialization.length === 0 ||
            need.length === 0
        ) {
            setBenefitsOption([]);
            setBenefit([]);
            return;
        }
        FetchApiPost('services/Pages/Benefit/GetBenefitForPromoSubject', 'POST', {
            brandIds: globalBrand.map((brand) => brand.value),
            indicationIds: indication.map((indication) => indication.value),
            profileIds: profile.map((profile) => profile.value),
            specIds: specialization.map((spec) => spec.value),
            needIds: need.map((need) => need.value),
            PlaceIds: place.map(i => i.value),
            PlaceTypeIds: placeType.map(i => i.value),
            TypeOfPriorityIds: typeOfPriority.map(i => i.value),
            ClientTypeIds: clientType.map(i => i.value),
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setBenefitsOption(
                        data.map((item) => {
                            return {
                                value: item.id,
                                label: item.benefitName,
                            };
                        })
                    );
                    setBenefit(
                        data.map((item) => {
                            return {
                                value: item.id,
                                label: item.benefitName,
                            };
                        })
                    );
                    setLoader(false);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [history, globalBrand, indication, profile, specialization, need]);

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
                    filterComponentsData={filterComponentsData}
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