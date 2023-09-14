import React, { useMemo, useState, useEffect } from 'react';
import Filter from '../../../../components/Filter';
import 'antd/dist/antd.css';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
import {
    mdiPlus,
    mdiEyeOutline,
    mdiPencilBoxOutline,
    mdiTranslate,
    mdiSquareEditOutline,
    mdiLinkVariantOff,
} from '@mdi/js';
import Icon from '@mdi/react';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Status from '../../../../components/Status';

import { statusOptions } from './Actions';
import Dropdowns from '../../../../components/Dropdowns';

import { Form } from 'react-bootstrap';

import TableLayout from '../../../../components/Tables/TableAccordion';

import AddModal from './AddModal';
import { FetchApiPost, FetchApiGet } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

import SelectTranslate from './SelectTranslate/SelectTranslate';
import Delete from './Delete';
import ActionModal from './ActionModal';
import EditModal from './EditModal/EditModal';
import DublicateModal from './DublicateModal/DublicateModal';
import { Link } from 'react-router-dom';
import DocumentDetail from './DocumentDetail/DocumentDetail';

const PromoSubject = () => {
    const { t } = useTranslation();
    const { history } = useHistory();

    const [tableData, setTableData] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [filterShow, setFilterShow] = useState(true);

    const [loader, setLoader] = useState(false);

    const [selectedItem, setSelectedItem] = useState();
    const [showSelectTranslateModal, setShowSelectTranslateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [selectedActionItem, setSelectedActionItem] = useState({});

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDublicateModal, setShowDublicateModal] = useState(false);

    const [showDocumentDetailModal, setShowDocumentDetailModal] = useState(false);
    const [selectedDocumentItem, setSelectedDocumentItem] = useState();

    const [selectLanguage, setSelectLanguage] = useState([]);
    const [languageOptions, setLanguageOptions] = useState([]);

    const [company, setCompany] = useState([]);
    const [companyOptions, setCompanyOptions] = useState([
        { value: 42, label: 'EN' },
        { value: 40, label: 'TR' },
        { value: 52, label: 'UZ' },
        { value: 54, label: 'KZ' },
        { value: 43, label: 'AZ' },
        { value: 48, label: 'RU' },
        { value: 29, label: 'GE' },
    ]);

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
            )
        },
        {
            header: workPlaceHeader ? workPlaceHeader.pl.headerName : 'Place',
            accessorKey: 'place',
        },
        {
            header: workPlaceHeader ? workPlaceHeader.pt.headerName : 'Place Type',
            accessorKey: 'placeType',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            ),
        },
        {
            header: workPlaceHeader ? workPlaceHeader.tp.headerName : 'Type of Priority',
            accessorKey: 'typeOfPriority',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            ),
        },
        {
            header: clientTypeName ? clientTypeName[0].headerName : 'Client Type',
            accessorKey: 'clientType',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            ),
        },
        {
            header: t('Global Brand'),
            accessorKey: 'brand',
            size: '170',
        },
        {
            header: t('Promo Subject Name'),
            accessorKey: 'name',
            size: '275',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            ),
        },
        {
            header: t('Reference'),
            accessorKey: 'reference',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) => {
                // cell data yı veriyor ordan dökümanları al
                return (
                    <div className="visit-content__table-icons">
                        <button
                            onClick={() => {
                                setShowDocumentDetailModal(true);
                                setSelectedDocumentItem(row.original);
                            }}>
                            <Icon path={mdiEyeOutline} size={0.85} />
                        </button>
                    </div>
                );
            },
        },
        {
            header: t('V.S.'),
            accessorKey: 'visitStructure',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) => {
                return (
                    <div className="visit-content__table-icons">
                        <button>
                            <Link to={`/apps/templates/promoSubject=${row.original.id}`} style={{ color: '#6C757D' }}>
                                <Icon path={mdiPencilBoxOutline} size={0.85} />
                            </Link>
                        </button>
                    </div>
                );
            },
        },
        {
            header: t('Request'),
            accessorKey: 'request',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell }) => {
                return <div className="visit-content__table-icons">-</div>;
            },
        },
        {
            header: t('Warning'),
            accessorKey: 'warning',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell }) => {
                return <div className="visit-content__table-icons">-</div>;
            },
        },
        {
            header: t('Quiz'),
            accessorKey: 'quiz',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell }) => {
                return <div className="visit-content__table-icons">-</div>;
            },
        },
        {
            header: t('Company'),
            accessorKey: 'language',
        },
        {
            header: t('Type'),
            accessorKey: 'type',
        },
        {
            header: t('Specialization'),
            accessorKey: 'specializations',
            size: '200',
        },
        {
            header: t('Indication'),
            accessorKey: 'indication',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            ),
        },
        {
            header: t('Profile'),
            accessorKey: 'profile',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            ),
        },
        {
            header: t('Need'),
            accessorKey: 'need',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            ),
        },
        {
            header: t('Benefit'),
            accessorKey: 'benefits',
            Cell: ({ cell }) => (
                <Tippy content={cell.getValue()} placement="bottom">
                    <div>{cell.getValue()}</div>
                </Tippy>
            ),
        },
        {
            header: t('Start Date'),
            accessorKey: 'startDate',
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: t('End Date'),
            accessorKey: 'endDate',
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: t('Valid Status'),
            accessorKey: 'validStatus',
            size: '175',
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: ({ cell, row }) => {
                return (
                    <div className="visit-content__table-icons">
                        <Form.Check
                            type="switch"
                            style={{ fontSize: '.9rem' }}
                            onChange={(e) => changeValid(row.original?.id, e.target.checked)}
                            defaultChecked={cell.getValue()}
                            disabled={validSwitchDisableControl(row.original.id)}
                        />
                    </div>
                );
            },
        },
        {
            header: t('Status'),
            accessorKey: 'approveStatus',
            size: '170',
            Cell: ({ cell, row }) => <Status approveStatus={cell.getValue()} />,
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
                        item={`?${row.original.id}?${row.original.promoSubjectName}`}
                        option={getStatusOptions(cell.getValue(), row.original)}
                        // option={getStatusOptions(1)}
                        onClick={statusClick}
                    />
                );
            },
        },
    ];

    const validSwitchDisableControl = (id) => {
        let item = filterData.filter((f) => f.id === Number(id))[0];
        if(!item)return;
        if (item.isLink === 1 && item.validStatus === true) {
            return true;
        } else {
            return false;
        }
    };

    const changeValid = (i, checked) => {
        let item = filterData.filter((f) => f.id === Number(i))[0];
        console.log(item)
        // const body = {
        //         id: Number(item.id),
        //         placeId: item.placeId,
        //         placeTypeId: item.placeTypeId,
        //         typeofPriorityId: item.typeOfPriortiyId,
        //         clientTypeId: item.clientTypeId,
        //         benefitName: item.benefitName.trim(),
        //         needId: item.needId,
        //         profileId: item.profile.id,
        //         languageId: item.language.languageAbbId,
        //         isApproved: item.approveStatus,
        //         rejectReason: item.rejectReason,
        //         specializationIds: item.specializations.map(item => item.specId),
        //         modifiedBy: localStorage.getItem('userName'),
        //         validStatus: checked,
        // };
        // FetchApiPost('services/Pages/Benefit/UpdateBenefit', 'POST', body).then((res) => {
        //     if (res.status === 201) {
        //         res.json().then(({ data }) => {
        //             let newData = filterData.map((i) => {
        //                 if (i.id === item.id) {
        //                     return { ...i, validStatus: checked };
        //                 } else {
        //                     return i;
        //                 }
        //             });
        //             setFilterData(newData);
        //             let newTableData = tableData.map((i) => {
        //                 if (i.id === item.id) {
        //                     return { ...i, validStatus: checked };
        //                 } else {
        //                     return i;
        //                 }
        //             });
        //             setTableData(newTableData);
        //         });
        //     } else if (res.status === 500 || res.status === 502) {
        //         history.push('/error-500');
        //     }
        // });
    };

    const getStatusOptions = (status, item) => {
        
        if (item.isCorporate === true) {
            
            switch (status) {
                case 1:
                    if(item.link === "connect"){
                        return statusOptions.filter((x) => x.id === 6);
                    }else{
                        return statusOptions.filter((x) => x.id === 9 || x.id === 2 || x.id === 6 || x.id === 0);
                    }
                case 2:
                    if(item.link === "connect"){
                        return statusOptions.filter((x) => x.id === 6);
                    }else{
                        return statusOptions.filter((x) => x.id === 1 || x.id === 6 || x.id === 9 || x.id === 0 || x.id === 3);
                    }
                case 3:
                    if(item.link === "connect"){
                        return statusOptions.filter((x) => x.id === 6);
                    }else{
                        return statusOptions.filter((x) => x.id === 1 || x.id === 6 || x.id === 5);
                    }
                default:
                    break;
            }
        } else {
            switch (status) {
                case 5:
                    if(item.link === "connect"){
                        return []
                    }else{
                        return statusOptions.filter((x) => x.id === 9 || x.id === 2 || x.id === 0);
                    }
                    
                case 2:
                    let s = statusOptions.filter((x) => x.id === 5 || x.id === 9 || x.id === 3 || x.id === 0);
                    if(item.link === "connect"){
                        return []
                    }
                    return s.map((x) => {
                        if (x.id === 5) {
                            return {
                                ...x,
                                key: 'Translate Awaited',
                            };
                        } else {
                            return x;
                        }
                    });
                default:
                    break;
            }
        }
    };

    const statusClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );
        const statusId = Number(getIds[0]);
        const itemId = Number(getIds[1]);
        const itemName = getIds[2];

        let promoSubjectItem = filterData.find((x) => x.id === Number(itemId));

        if (!promoSubjectItem) {
            filterData.map((data) =>
                data.translates.map((tItem) => {
                    if (tItem.id === itemId) {
                        promoSubjectItem = tItem;
                    }
                })
            );
        }

        setSelectedItem(promoSubjectItem);

        switch (statusId) {
            case 0:
                setShowDeleteModal(true);
                break;
            case 5:
                if (promoSubjectItem.isCorporate === true) {
                    setShowSelectTranslateModal(true);
                } else {
                    setShowActionModal(true);
                    setSelectedActionItem({ id: promoSubjectItem.id, statusId: statusId, name: promoSubjectItem.name });
                }

                break;
            case 1:
            case 2:
            case 3:
                setShowActionModal(true);
                setSelectedActionItem({ id: promoSubjectItem.id, statusId: statusId, name: promoSubjectItem.name });
                break;
            case 6:
                setShowDublicateModal(true);
                break;
            case 9:
                setShowEditModal(true);
                break;
            default:
                break;
        }
    };


    const [companyIdForFilter, setCompanyIdForFilter] = useState();

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
                if(res.status === 200){
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
        if(!companyId) return;
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
        if(!companyId) return;
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForClient`, 'POST', {
            headerIds: [0],
            countryId: Number(localStorage.getItem('countryId')),
            companyId: companyId
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
            if(!clientTypeName) return;
            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                countryId: Number(localStorage.getItem('countryId')),
                id: clientTypeName[0].id
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setClientTypeOptions([{value: 0, label: 'N/A'}, ...data.map(item => ({ value: item.definationId, label: item.definationName}))])
                        setClientType([{value: 0, label: 'N/A'}, ...data.map(item => ({ value: item.definationId, label: item.definationName}))])
                    })
                }
            })
        }, [clientTypeName])

        useEffect(() => {
            if(place.length === 0 || placeType.length === 0 || typeOfPriority.length === 0 || clientType.length === 0){
                setGlobalBrand([]);
                setGlobalBrandsOption([]);
                setLoader(false)
                return;
            }
            setLoader(true);
            FetchApiPost('services/Pages/Need/GetBrandsForNeedCreate', 'POST', {
                placeIds: place.map(i => i.value),
                placeTypeIds: placeType.map(i => i.value),
                typeOfPriorityIds: typeOfPriority.map(i => i.value),
                clientTypeIds: clientType.map(i => i.value)
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setLoader(false);
                        setGlobalBrandsOption(data.map(item => ({ value: item.globalBrandId, label: item.globalBrandName })))
                        setGlobalBrand(data.map(item => ({ value: item.globalBrandId, label: item.globalBrandName })))
                    })
                }else if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }else{
                    setGlobalBrand([]);
                    setGlobalBrandsOption([]);
                    setLoader(false)
                }
            })
        }, [history, place, placeType, typeOfPriority, clientType])

        useEffect(() => {
            if(place.length === 0 || placeType.length === 0 || typeOfPriority.length === 0 || globalBrand.length === 0){
                setIndication([]);
                setIndicationsOption([]);
                setLoader(false);
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
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setLoader(false);
                        setIndicationsOption(data.map(item => ({ label: item.indicationName, value: item.indicationId })))
                        setIndication(data.map(item => ({ label: item.indicationName, value: item.indicationId })))
                        
                    })
                }else if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }else{
                    setIndication([]);
                    setIndicationsOption([]);
                    setLoader(false);
                }
            })
        }, [history, globalBrand])


        useEffect(() => {
            if(indication.length === 0){
                setProfilesOption([])
                setProfile([])
                setLoader(false)
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
                if(res.status === 200){
                    res.json().then(({data}) => {
                        setProfilesOption(data.map(i => ({ value: i.profileId, label: i.profileName })))
                        setProfile(data.map(i => ({ value: i.profileId, label: i.profileName })))
                        setLoader(false)
                    })
                }else if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }else{
                    setProfilesOption([])
                    setProfile([])
                    setLoader(false)
                }
            })
        }, [indication])

        useEffect(() => {
            if(profile.length === 0 ){
                setSpecializationsOption([]);
                setSpecialization([]);
                setLoader(false)
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
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setLoader(false)
                        setSpecializationsOption(data.map(item => ({ label: item.specName, value: item.specId })))
                        setSpecialization(data.map(item => ({ label: item.specName, value: item.specId })))
                    })
                }else if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }else{
                    setSpecializationsOption([]);
                    setSpecialization([]);
                    setLoader(false)
                }
            })
        }, [history, profile])

        useEffect(() => {
                if(profile.length === 0){
                    setNeedsOption([])
                    setNeed([])
                    setLoader(false)
                    return ;
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
                    if(res.status === 200){
                        res.json().then(({data}) => {
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
                    }else if(res.status === 500 || res.status === 502){
                        history.push('/error-500');
                    }else{
                        setNeedsOption([])
                        setNeed([])
                        setLoader(false)
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
            setLoader(false)
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
            }else{
                setBenefitsOption([]);
                setBenefit([]);
                setLoader(false)
            }
        });
    }, [history, globalBrand, indication, profile, specialization, need]);

    const filterComponentsData = [
        {
            label: 'company',
            state: selectLanguage,
            setState: setSelectLanguage,
            options: languageOptions,
            type: 'multiselect',
        },
        {
            label: workPlaceHeader?.pl ? workPlaceHeader?.pl?.headerName: "place",
            state: place,
            setState: setPlace,
            options: placeOptions,
            type: 'multiselect',
        },
        {
            label: workPlaceHeader?.pt ? workPlaceHeader?.pt?.headerName: "place type",
            state: placeType,
            setState: setPlaceType,
            options: placeTypeOptions,
            type: 'multiselect',
        },
        {
            label: workPlaceHeader?.tp ? workPlaceHeader?.tp?.headerName: "type of priority",
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

    const [filterData, setFilterData] = useState([]);

    const deleteFilter = () => {
        setCompany([]);
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
        setPlaceType([])
        setTypeOfPriority([])
        setClientType([])
    };

    const handleGetDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    const getFilterData = () => {
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
        setLoader(true);
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
        FetchApiPost('services/Pages/PromoSubject/GetAllPromoSubjectForApply', 'POST', body).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setFilterShow(false)
                    setTableData(
                        data.map((item) => {
                            return {
                                id: item.id,
                                link: item.isLink === 1 ? 'connect' : 'not connect',
                                place: item.placeName,
                                placeType: item.placeTypeStr,
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
                                benefits: item.benefits.map(b => b.benefitName).join(', '),
                                startDate: handleGetDate(item.startDate),
                                endDate: handleGetDate(item.endDate),
                                validStatus: item.validStatus,
                                approveStatus: item.approveStatus,
                                action: item.approveStatus,
                                isCorporate: item.isCorporate,
                                // subRows: item.translates.map((translateItem) => {
                                //     return {
                                //         id: translateItem.id,
                                //         brand: translateItem.brand.globalBrandName,
                                //         name: translateItem.name,
                                //         reference: null,
                                //         visitStructure: null,
                                //         request: null,
                                //         warning: null,
                                //         quiz: null,
                                //         language: translateItem.language.languageAbb,
                                //         type: translateItem.type === 0 ? t('Child') : t('Parent'),
                                //         specializations: translateItem.specializations
                                //             .map((item) => item.specAbb)
                                //             .join(', '),
                                //         indication: translateItem.indication.indication,
                                //         profile: translateItem.profile.profileName,
                                //         need: translateItem.need.needName,
                                //         benefits: translateItem.benefits[0].benefitName,
                                //         startDate: handleGetDate(translateItem.startDate),
                                //         endDate: handleGetDate(translateItem.endDate),
                                //         validStatus: translateItem.validStatus,
                                //         approveStatus: translateItem.approveStatus,
                                //         action: translateItem.approveStatus,
                                //         isCorporate: translateItem.isCorporate,
                                //     };
                                // }),
                            };
                        })
                    );
                    setFilterData(
                        data.map((item) => {
                            return {
                                ...item,
                                action: item.approveStatus,
                                subRows: item.translates.map((translateItem) => {
                                    return {
                                        ...translateItem,
                                        action: translateItem.approveStatus,
                                    };
                                }),
                            };
                        })
                    );
                });
                setLoader(false);
            }
        });
    };

    return (
        <div>
            <TableLayout
                data={tableData}
                columns={columns}
                isAccordion={true}
                handleDropDownItemClick={statusClick}
                dropdownOptions={statusOptions}
                columnPinningRight={['action']}
                handleNewButton={() => setShowAddModal(true)}
                isLoading={loader}
                handlApplyBtn={getFilterData}
                handlClearBtn={deleteFilter}
                filterShow={filterShow}
                setFilterShow={setFilterShow}
                filter={
                    <Filter
                        filterComponentsData={filterComponentsData}
                        isFilterBtn={false}
                    />
                }
            />

            {showAddModal && (
                <AddModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} getFilterData={getFilterData} />
            )}
            {showSelectTranslateModal && (
                <SelectTranslate
                    showSelectTranslateModal={showSelectTranslateModal}
                    setShowSelectTranslateModal={setShowSelectTranslateModal}
                    getFilterData={getFilterData}
                    selectedItem={selectedItem}
                    filterLanguageOptions={languageOptions}
                />
            )}
            {showDeleteModal && (
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    item={selectedItem}
                    getFilterData={getFilterData}
                />
            )}
            {showActionModal && (
                <ActionModal
                    modalShow={showActionModal}
                    setModalShow={setShowActionModal}
                    item={selectedActionItem}
                    getFilterData={getFilterData}
                />
            )}
            {showEditModal && (
                <EditModal
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                    item={selectedItem}
                    getFilterData={getFilterData}
                />
            )}
            {showDublicateModal && (
                <DublicateModal
                    showModal={showDublicateModal}
                    setShowModal={setShowDublicateModal}
                    item={selectedItem}
                    getFilterData={getFilterData}
                />
            )}
            {showDocumentDetailModal && (
                <DocumentDetail
                    documentDetailShow={showDocumentDetailModal}
                    setDocumentDetailShow={setShowDocumentDetailModal}
                    getFilterData={getFilterData}
                    item={selectedDocumentItem}
                    filterData={filterData}
                />
            )}
        </div>
    );
};

export default PromoSubject;
