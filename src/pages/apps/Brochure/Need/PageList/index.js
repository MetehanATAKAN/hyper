import React, { useEffect } from 'react';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../../components/MainTable';
import '../../../../../assets/scss/custom/components/pageList.scss';
import SendIcon from '../../../../../components/Icons/SendIcon';
import CircleEdit from '../../../../../components/Icons/CircleEdit';
import Reject from './Reject';
import Delete from './Delete';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import NewButton from './NewButton';
import { useDispatch, useSelector } from 'react-redux';
import { setContentId, needPageButtonDatas as clearNeedPageFilter } from '../../../../../redux/actions';
import Filter from './Filter';
import Update from './Update';
import Icon from '@mdi/react';
import { mdiEyeOutline } from '@mdi/js';
import ActionModalPageList from './ActionModalPageList';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const PageList = ({ setSelectedTab }) => {
    const needPageButtonDatas = useSelector((state) => state.Need.needPageButtonDatas);
    const needTabName = useSelector((state) => state.Need.needTypeName);
    const [closeFilter, setCloseFilter] = useState(false);
    const { t } = useTranslation();
    const contentId = useSelector((state) => state.Brochure.contentId);
    const [columns] = useState([
        { name: 'needName', title: t('Need Name') },
        { name: 'needId', title: t('Need ID') },
        { name: 'page', title: t('Page') },
        { name: 'country', title: t('Country') },
        { name: 'product', title: t('Product') },
        { name: 'specialization', title: t('Specialization') },
        { name: 'creator', title: t('Creator') },
        { name: 'createDate', title: t('Create Date') },
        { name: 'status', title: t('Status') },
        { name: 'action', title: '-' },
    ]);
    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'needName', width: '20%' },
        { columnName: 'needId', width: '14%' },
        { columnName: 'page', width: '7%' },
        { columnName: 'country', width: '10%' },
        { columnName: 'product', width: '10%' },
        { columnName: 'specialization', width: '10%' },
        { columnName: 'creator', width: '10%' },
        { columnName: 'createDate', width: '9%' },
        { columnName: 'status', width: '10%' },
        { columnName: 'action', width: '25px' },
    ]);
    const [tableColumnExtensions] = useState([
        { columnName: 'needName', width: 200 },
        { columnName: 'needId', width: 150 },
        { columnName: 'page', width: 150 },
        { columnName: 'country', width: 150 },
        { columnName: 'product', width: 150 },
        { columnName: 'specialization', width: 150 },
        { columnName: 'creator', width: 150 },
        { columnName: 'createDate', width: 150 },
        { columnName: 'status', width: 150 },
        { columnName: 'action', width: 50 },
    ]);
    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Need Name', columnName: 'needName', width: 200 },
        { id: '2', isFreeze: false, content: 'Need ID', columnName: 'needId', width: 150 },
        { id: '3', isFreeze: false, content: 'Page', columnName: 'page', width: 150 },
        { id: '4', isFreeze: false, content: 'Country', columnName: 'country', width: 150 },
        { id: '5', isFreeze: false, content: 'Product', columnName: 'product', width: 150 },
        { id: '6', isFreeze: false, content: 'Specialization', columnName: 'specialization', width: 150 },
        { id: '7', isFreeze: false, content: 'Creator', columnName: 'creator', width: 150 },
        { id: '8', isFreeze: false, content: 'Create Date', columnName: 'createDate', width: 150 },
        { id: '9', isFreeze: false, content: 'Status', columnName: 'status', width: 150 },
    ];
    const [groupByItems, setGroupByItems] = useState([
        { id: '0', isShow: true, columnName: 'needName', content: t('Need Name') },
        { id: '1', isShow: true, columnName: 'needId', content: t('Need ID') },
        { id: '2', isShow: true, columnName: 'page', content: t('Page') },
        { id: '3', isShow: true, columnName: 'country', content: t('Country') },
        { id: '4', isShow: true, columnName: 'product', content: t('Product') },
        { id: '5', isShow: true, columnName: 'specialization', content: t('Specialization') },
        { id: '6', isShow: true, columnName: 'creator', content: t('Creator') },
        { id: '7', isShow: true, columnName: 'createDate', content: t('Create Date') },
        { id: '8', isShow: true, columnName: 'status', content: t('Status') },
    ]);
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'needName', title: t('Need Name') },
        { isShow: true, name: 'needId', title: t('Need ID') },
        { isShow: true, name: 'page', title: t('Page') },
        { isShow: true, name: 'country', title: t('Country') },
        { isShow: true, name: 'product', title: t('Product') },
        { isShow: true, name: 'specialization', title: t('Specialization') },
        { isShow: true, name: 'creator', title: t('Creator') },
        { isShow: true, name: 'createDate', title: t('Create Date') },
        { isShow: true, name: 'status', title: t('Status') },
    ]);

    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'needName', width: 200 },
        { type: 'count', columnName: 'needId', width: 150 },
        { type: 'count', columnName: 'page', width: 150 },
        { type: 'count', columnName: 'country', width: 150 },
        { type: 'count', columnName: 'product', width: 150 },
        { type: 'count', columnName: 'specialization', width: 150 },
        { type: 'count', columnName: 'creator', width: 150 },
        { type: 'count', columnName: 'createDate', width: 150 },
        { type: 'count', columnName: 'status', width: 150 },
        { type: 'count', columnName: 'action', width: 50 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'needName', width: 200 },
        { type: 'count', columnName: 'needId', width: 150 },
        { type: 'count', columnName: 'page', width: 100 },
        { type: 'count', columnName: 'country', width: 150 },
        { type: 'count', columnName: 'product', width: 150 },
        { type: 'count', columnName: 'specialization', width: 150 },
        { type: 'count', columnName: 'creator', width: 150 },
        { type: 'count', columnName: 'createDate', width: 150 },
        { type: 'count', columnName: 'status', width: 150 },
        { type: 'count', columnName: 'action', width: 50 },
    ]);
    const [columnOrders, setColumnOrders] = useState([
        'needName',
        'needId',
        'page',
        'country',
        'product',
        'specialization',
        'creator',
        'createDate',
        'status',
        'action',
    ]);
    const history = useHistory();
    const dispatch = useDispatch();
    const createdBy = localStorage.getItem('userName');
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [actionModalData, setActionModalData] = useState(null);
    const [selectCountries, setSelectCountries] = useState([]);
    const [selectProduct, setSelectProduct] = useState([]);
    const [selectIndication, setSelectIndication] = useState([]);
    const [selectProfile, setSelectProfile] = useState([]);
    const [selectSpecialization, setSelectSpecialization] = useState([]);
    const [selectCreator, setSelectCreator] = useState([]);
    const [optionsCountries, setOptionsCountries] = useState([{ id: 0, title: 'Corparate' }]);
    const [optionsProduct, setOptionsProduct] = useState([]);
    const [optionsIndication, setOptionsIndication] = useState([]);
    const [optionsProfile, setOptionsProfile] = useState([]);
    const [optionsSpecialization, setOptionsSpecialization] = useState([]);
    const [optionsCreator, setOptionsCreator] = useState([]);
    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
    const [brochuries, setBrochuries] = useState([]);
    const [needId, setNeedId] = useState(0);
    const optionsStatus = [
        { id: 1, title: 'Editable' },
        { id: 2, title: 'Approval' },
        { id: 3, title: 'Approved' },
    ];
    const [selectStatus, setSelectStatus] = useState(
        optionsStatus.map((el) => ({ id: el.id, value: el.title, label: el.title }))
    );
    const statusOptions = [
        {
            id: 1,
            value: 'Editable',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        { id: 2, value: 'Approval', icon: <SendIcon />, backgroundColor: '#FFBC00', color: '#FFFFFF' },
        {
            id: 0,
            value: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
        {
            id: 3,
            value: 'Approved',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-check"></i>,
            backgroundColor: '#0ACF97',
            color: '#FFFFFF',
        },
        {
            id: 4,
            value: 'Reject',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-exclamation"></i>,
            color: '#FA5C7C',
        },
        { id: 5, value: 'Force Edit', icon: <CircleEdit /> },
        { id: 6, value: 'Duplicate', icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i> },
        { id: 7, value: 'Archive', icon: <i style={{ marginRight: '8px' }} className="fas fa-archive"></i> },
        {
            id: 9,
            value: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
    ];
    const statusEditableOptions = [
        {
            id: 9,
            value: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        { id: 2, value: 'Approval', icon: <SendIcon />, backgroundColor: '#FFBC00', color: '#FFFFFF' },
        {
            id: 0,
            value: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
    ];
    const statusApprovalOptions = [
        {
            id: 1,
            value: 'Editable',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        {
            id: 3,
            value: 'Approved',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-check"></i>,
            backgroundColor: '#0ACF97',
            color: '#0ACF97',
        },
        {
            id: 0,
            value: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
    ];
    const statusApprovedOptions = [
        {
            id: 1,
            value: 'Editable',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        {
            id: 4,
            value: 'Reject',
            icon: <i style={{ marginRight: '18px' }} className="fas fa-exclamation"></i>,
            color: '#FA5C7C',
        },
        { id: 5, value: 'Force Edit', icon: <CircleEdit /> },
        { id: 6, value: 'Duplicate', icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i> },
        { id: 7, value: 'Archive', icon: <i style={{ marginRight: '8px' }} className="fas fa-archive"></i> },
    ];
    useEffect(() => {
        FetchApiGet('api/OldSystem/GetCountries', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((json) =>
                    json.map((el) =>
                        setOptionsCountries((prev) => [...prev, { id: el.CountryId, title: el.CountryName }])
                    )
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsCountries([]);
            }
        });

        FetchApiGet('api/OldSystem/GetAllGlobalBrands', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(
                    (json) => (
                        json?.map((el) =>
                            setOptionsProduct((prev) => [...prev, { id: el.GlobalBrandId, title: el.GlobalBrandName }])
                        ),
                        needPageButtonDatas.product.value === null
                            ? setSelectProduct(
                                  json?.map((el) => ({
                                      id: el.GlobalBrandId,
                                      value: el.GlobalBrandName,
                                      label: el.GlobalBrandName,
                                  }))
                              )
                            : setSelectProduct([needPageButtonDatas.product])
                    )
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsProduct([]);
            }
        });
    }, []);
    useEffect(() => {
        if (optionsCountries.length === 0) return;
        setSelectCountries(optionsCountries?.map((el) => ({ id: el.id, value: el.title, label: el.title })));
    }, [optionsCountries]);

    //Indication
    useEffect(() => {
        if (selectProduct.length === 0) return;
        const postProductIds = { brandIds: selectProduct?.map((el) => el.id).join(', ') };
        FetchApiPost('api/OldSystem/GetIndicationsForContentByBrandIds', 'POST', postProductIds).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    (json) => (
                        needPageButtonDatas.indication.value === null
                            ? setSelectIndication(
                                  json?.map((el) => ({
                                      id: el.IndicationId,
                                      value: el.Indication,
                                      label: el.Indication,
                                  }))
                              )
                            : setSelectIndication([needPageButtonDatas.indication]),
                        setOptionsIndication(
                            json?.map((el) => ({
                                id: el.IndicationId,
                                title: el.Indication,
                            }))
                        )
                    )
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setSelectIndication([]);
                setOptionsIndication([]);
            }
        });
    }, [selectProduct]);
    //Profile
    useEffect(() => {
        if (selectIndication.length === 0) return;
        const ids = {
            brandIds: selectProduct?.map((el) => el.id).join(', '),
            indicationIds: selectIndication?.map((el) => el.id).join(', '),
        };
        FetchApiPost('api/OldSystem/GetProfileForContentByIndicationId', 'POST', ids).then((res) => {
            if (res.status === 200) {
                res.json().then(
                    (json) => (
                        needPageButtonDatas.profile.value === null
                            ? setSelectProfile(
                                  json?.map((el) => ({
                                      id: el.ProfileId,
                                      value: el.Profile,
                                      label: el.Profile,
                                  }))
                              )
                            : setSelectProfile([needPageButtonDatas.profile]),
                        setOptionsProfile(
                            json?.map((el) => ({
                                id: el.ProfileId,
                                title: el.Profile,
                            }))
                        )
                    )
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setSelectProfile([]);
                setOptionsProfile([]);
            }
        });
    }, [selectIndication]);
    useEffect(() => {
        if (selectProfile.length === 0) return;
        const ids = {
            brandIds: selectProduct?.map((el) => el.id).join(', '),
            indicationIds: selectIndication?.map((el) => el.id).join(', '),
            profileIds: selectProfile?.map((el) => el.id).join(', '),
        };
        FetchApiPost('api/OldSystem/GetSpecsForContent', 'POST', ids).then((res) => {
            if (res.status === 200) {
                res.json().then((json) =>
                    needPageButtonDatas.specialization.length === 0
                        ? (setSelectSpecialization(
                              json?.map((el) => ({
                                  id: el.SpecId,
                                  value: el.SpecName,
                                  label: el.SpecAbb,
                              }))
                          ),
                          setOptionsSpecialization(
                              json?.map((el) => ({
                                  id: el.SpecId,
                                  title: el.SpecName,
                                  specAbb: el.SpecAbb,
                              }))
                          ))
                        : (async () => {
                              await setSelectSpecialization(needPageButtonDatas.specialization[0]);
                              await setOptionsSpecialization(
                                  json?.map((el) => ({
                                      id: el.SpecId,
                                      title: el.SpecName,
                                      specAbb: el.SpecAbb,
                                  }))
                              );
                              await dispatch(
                                  clearNeedPageFilter({
                                      product: {
                                          value: null,
                                          label: null,
                                          id: null,
                                      },
                                      indication: {
                                          value: null,
                                          label: null,
                                          id: null,
                                      },
                                      profile: {
                                          value: null,
                                          label: null,
                                          id: null,
                                      },
                                      specialization: [],
                                  })
                              );
                          })()
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setSelectSpecialization([]);
                setOptionsSpecialization([]);
            }
        });
    }, [selectProfile]);

    useEffect(() => {
        if (selectSpecialization.length === 0) return;
        const ids = {
            products: selectProduct?.map((el) => el.id),
            countries: [0],
            indications: selectIndication?.map((el) => el.id),
            profiles: selectProfile?.map((el) => el.id),
            specs: selectSpecialization?.map((el) => el.id),
        };
        FetchApiPost('services/Pages/ProductPage/GetCreatorForPageListFilter', 'POST', ids).then((res) => {
            if (res.status === 200) {
                res.json().then((json) =>
                    setSelectCreator(
                        json.data?.map((el) => ({
                            id: el.creatorId,
                            value: el.creatorName,
                            label: el.creatorName,
                        })),
                        setSelectStatus(optionsStatus.map((el) => ({ id: el.id, value: el.title, label: el.title }))),
                        setOptionsCreator(
                            json.data?.map((el) => ({
                                id: el.creatorId,
                                title: el.creatorName,
                            }))
                        )
                    )
                );
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setSelectCreator([]);
                setOptionsCreator([]);
            }
        });
    }, [selectSpecialization]);
    const filterComponentsData = [
        { label: 'Countries', options: optionsCountries, state: selectCountries, setState: setSelectCountries },
        { label: 'Product', options: optionsProduct, state: selectProduct, setState: setSelectProduct },
        { label: 'Indication', options: optionsIndication, state: selectIndication, setState: setSelectIndication },
        { label: 'Profile', options: optionsProfile, state: selectProfile, setState: setSelectProfile },
        {
            label: 'Specialization',
            options: optionsSpecialization,
            state: selectSpecialization,
            setState: setSelectSpecialization,
        },
        { label: 'Creator', options: optionsCreator, state: selectCreator, setState: setSelectCreator },
        { label: 'Create Date', options: [], state: [], setState: [] },
        { label: 'Status', options: optionsStatus, state: selectStatus, setState: setSelectStatus },
    ];
    const dropDownItemClick = (e) => {
        const ids = e.target.id.split(' ');
        const selectedStatus = statusOptions.find((el) => el.id === Number(ids[1]));
        const item = brochuries.find((el) => Number(el.contentId) === Number(ids[0]));
        setNeedId(Number(item.contentId));
        console.log(selectedStatus.value);
        if (selectedStatus.value === 'Reject') {
            setShowRejectModal(true);
        }
        if (selectedStatus.value === 'Delete') {
            setShowDeleteModal(true);
        }
        if (selectedStatus.value === 'Edit') {
            setShowUpdateModal(true);
        }
        if (
            selectedStatus.value === 'Editable' ||
            selectedStatus.value === 'Approval' ||
            selectedStatus.value === 'Approved'
        ) {
            setShowActionModal(true);
            setActionModalData({
                itemId: Number(ids[0]),
                selectedStatus: selectedStatus,
            });
        }
    };
    // const insert = (arr, index, newItem) => [
    //     // part of the array before the specified index
    //     ...arr.slice(0, index),
    //     // inserted item
    //     newItem,
    //     // part of the array after the specified index
    //     ...arr.slice(index),
    // ];

    // const acordionControl = (e, item) => {
    //     const btn = document.getElementsByClassName('table-acordion-icon').namedItem(e.target.id);
    //     const classes = [...btn.classList];
    //     if (!classes.includes('rotate180')) {
    //         btn.classList.add('rotate180');
    //         const item = {
    //             id: 7,
    //             passportOfProductName: 'dasdasdasdas',
    //             abb: 'PRF.02.ND.CRP',
    //             page: '+',
    //             countryName: 'Corparate',
    //             productName: 'PARI-FLO',
    //             specialization: 'GNP, N',
    //             createdBy: 'tuncay',
    //             createDate: '18.10.2022',
    //             status: 'Approved',
    //         };
    //         const index = brochuries.findIndex((el) => el.contentId === Number(e.target.id));
    //         const result = insert(brochuries, index + 1, item);
    //         setBrochuries(result);
    //     }
    //     if (classes.includes('rotate180')) {
    //         btn.classList.remove('rotate180');
    //         const arr = brochuries.filter((el) => el.id !== 7);
    //         setBrochuries(arr);
    //     }
    // };
    const goToTemplateTab = (e) => {
        dispatch(setContentId(Number(e.target.id)));
        localStorage.setItem('ctId', Number(e.target.id));
        setSelectedTab('Templates');
    };
    const action = brochuries.map((el, i) => ({
        id: el.contentId,
        content: (
            <span className="table-dropdown">
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <i style={{ fontSize: '20px' }} className="fas fa-ellipsis-v"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-container">
                        {el.isApprovedContent === 1 && //'Editable'
                            statusEditableOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.contentId} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 0 || item.id === 3 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                        {el.isApprovedContent === 2 && // Approval
                            statusApprovalOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.contentId} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 0 || item.id === 3 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                        {el.isApprovedContent === 3 && // Approved
                            statusApprovedOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.contentId} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 4 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                    </Dropdown.Menu>
                </Dropdown>
            </span>
        ),
    }));

    const pageListTableData = brochuries?.map((el, i) => ({
        id: el.contentId,
        parentId: i + 1,
        needName: (
            <Tippy content={el.passportOfProductName} placement="bottom-start" arrow={false}>
                <span contentEditable={true} onInput={(e) => console.log(e.currentTarget.textContent)}>
                    {/* {el.id !== 7 && (
                        <i
                            onClick={(e) => acordionControl(e, item)}
                            id={el.contentId}
                            className="fas fa-angle-up table-acordion-icon"></i>
                    )} */}
                    {el.passportOfProductName}
                </span>
            </Tippy>
        ),
        needId: el.abb,
        page:
            el.jsonFile === null || el.jsonFile === '' ? (
                <span className="page-area" id={el.contentId} onClick={goToTemplateTab}>
                    +
                </span>
            ) : (
                <span className="page-area" id={el.contentId}>
                    <Link to={`template/details=${el.contentId}&country=${el.countryId}`}>
                        <Icon path={mdiEyeOutline} size={1} horizontal vertical color="#6c757d" />
                    </Link>
                </span>
            ),
        country: el.countryName,
        product: el.productName,
        specialization: (
            <Tippy
                content={el.getSpec?.map((x) => (
                    <span>{x.specName}, </span>
                ))}
                placement="bottom">
                <div>
                    {el.getSpec?.map((item) => (
                        <Tippy content={item.specName}>
                            <span>{item.specAbb}, </span>
                        </Tippy>
                    ))}
                </div>
            </Tippy>
        ),

        creator: (
            <Tippy content={el.createdBy}>
                <span>{el.createdBy}</span>
            </Tippy>
        ),
        createDate: moment(el.createdDate).format('DD/MM/YYYY'),
        status: (
            <span
                style={
                    el.isApprovedContent === 1 //Editable
                        ? {
                              backgroundColor: '#6C757D',
                              color: '#fff',
                          }
                        : el.isApprovedContent === 2 //'Approval'
                        ? {
                              backgroundColor: '#FFBC00',
                              color: '#fff',
                          }
                        : el.isApprovedContent === 3 //'Approved'
                        ? {
                              backgroundColor: '#0ACF97',
                              color: '#fff',
                          }
                        : el.isApprovedContent === 4
                        ? {
                              backgroundColor: '#FA5C7C',
                              color: '#fff',
                          }
                        : {}
                }
                className="status-title">
                {el.isApprovedContent === 1 && <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>}
                {el.isApprovedContent === 2 && <SendIcon />}
                {el.isApprovedContent === 3 && <i style={{ marginRight: '8px' }} className="fas fa-check"></i>}
                {el.isApprovedContent === 4 && <i style={{ marginRight: '8px' }} className="fas fa-exclamation"></i>}
                {el.isApprovedContent === 1 && t('Editable')}
                {el.isApprovedContent === 2 && t('Approval')}
                {el.isApprovedContent === 3 && t('Approved')}
                {el.isApprovedContent === 4 && t('Reject')}
            </span>
        ),
        action: action[i].content,
    }));
    const newButton = () => {
        setShowModal(true);
    };
    const onChangeDate = (dates) => {
        if (dates) {
            const [start, end] = dates;
            setStartDate(moment(start).format());
            setEndDate(moment(end).format());
        } else {
            setStartDate([]);
            setEndDate([]);
        }
    };
    const clearFilters = () => {
        setSelectCountries([]);
        setSelectProduct([]);
        setSelectIndication([]);
        setSelectProfile([]);
        setSelectSpecialization([]);
        setSelectCreator([]);
        setSelectStatus([]);

        // need tabı page butonuyla gelindiğinde etki eden filtrenin temizlenmesi için
        dispatch(
            clearNeedPageFilter({
                product: {
                    value: null,
                    label: null,
                    id: null,
                },
                indication: {
                    value: null,
                    label: null,
                    id: null,
                },
                profile: {
                    value: null,
                    label: null,
                    id: null,
                },
                specialization: [],
            })
        );
    };
    const applyFilter = () => {
        const applyCondition = [
            selectCountries.length === 0,
            selectProduct.length === 0,
            selectIndication.length === 0,
            selectProfile.length === 0,
            selectSpecialization.length === 0,
            selectCreator.length === 0,
            selectStatus.length === 0,
        ];
        if (applyCondition.every((v) => v === false)) {
            const newStart = startDate.length !== 0 && startDate.split('T');
            const newEnd = endDate.length !== 0 && endDate.split('T');
            const data = {
                countries: selectCountries?.map((el) => el.id),
                products: selectProduct?.map((el) => el.id),
                indications: selectIndication?.map((el) => el.id),
                profiles: selectProfile?.map((el) => el.id),
                specs: selectSpecialization?.map((el) => el.id),
                creatorNames: selectCreator?.map((el) => el.value),
                startDate: startDate.length === 0 ? '1999-01-01T00:00:00.000Z' : newStart[0] + 'T00:00:00+03:00',
                endDate: endDate.length === 0 ? '1999-01-01T00:00:00.000Z' : newEnd[0] + 'T23:59:59+03:00',
                status: selectStatus?.map((el) => el.id),
            };
            FetchApiPost('services/Pages/ProductPage/ApplyForPageListFilter', 'POST', data)
                .then((res) => {
                    if (res.status === 200) {
                        res.json().then((json) => setBrochuries(json.data));
                    } else if (res.status === 500 || res.status === 502) {
                        history.push('/error-500');
                    } else {
                        setBrochuries([]);
                    }
                })
                .catch((error) => console.log('Error', error));
        }
    };
    return (
        <div>
            <div id="page-list-table">
                <MainTable
                    tableData={pageListTableData}
                    columns={columns}
                    columnWidths={columnWidths}
                    setColumnWidths={setColumnWidths}
                    tableColumnExtensions={tableColumnExtensions}
                    itemsFromBackend={itemsFromBackend}
                    columnOrders={columnOrders}
                    setColumnOrders={setColumnOrders}
                    disableFreeze={true}
                    groupByItems={groupByItems}
                    setGroupByItems={setGroupByItems}
                    showorHideColumnsItems={showorHideColumnsItems}
                    totalSummaryItems={totalSummaryItems}
                    groupSummaryItems={groupSummaryItems}
                    isAddButton={true}
                    addButtonFunction={newButton}
                    closeFilter={closeFilter}
                    setCloseFilter={setCloseFilter}
                    filters={
                        <Filter
                            filterComponentsData={filterComponentsData}
                            onChangeDate={onChangeDate}
                            applyFilter={applyFilter}
                            clearFilters={clearFilters}
                            setSelectProduct={setSelectProduct}
                            setSelectIndication={setSelectIndication}
                            setSelectProfile={setSelectProfile}
                            setSelectSpecialization={setSelectSpecialization}
                            setSelectCreator={setSelectCreator}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            setSelectStatus={setSelectStatus}
                            setCloseFilter={setCloseFilter}
                        />
                    }
                    isFilters={true}
                />
            </div>
            <Reject
                modalShow={showRejectModal}
                setModalShow={setShowRejectModal}
                brochuries={brochuries}
                setBrochuries={setBrochuries}
                contentId={needId}
            />
            <Delete
                modalShow={showDeleteModal}
                setModalShow={setShowDeleteModal}
                brochuries={brochuries}
                setBrochuries={setBrochuries}
                contentId={needId}
            />
            {showActionModal && (
                <ActionModalPageList
                    modalShow={showActionModal}
                    setModalShow={setShowActionModal}
                    item={actionModalData}
                    brochuries={brochuries}
                    setBrochuries={setBrochuries}
                    applyFilter={applyFilter}
                />
            )}
            {showModal && (
                <NewButton
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setBrochuries={setBrochuries}
                    brochuries={brochuries}
                    applyFilter={applyFilter}
                />
            )}
            {showUpdateModal && (
                <Update
                    showModal={showUpdateModal}
                    setShowModal={setShowUpdateModal}
                    setBrochuries={setBrochuries}
                    brochuries={brochuries}
                    contentId={needId}
                    applyFilter={applyFilter}
                />
            )}
        </div>
    );
};

export default React.memo(PageList);
