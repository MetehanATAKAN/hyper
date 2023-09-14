import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../../components/MainTable';
import Filter from './Filter';
import AddDisadvantagesModal from './AddDisadvantagesModal';
import Icon from '@mdi/react';
import { mdiLinkVariantOff, mdiEyeOutline, mdiPlus, mdiSendCheck } from '@mdi/js';
import '../../../../../assets/scss/custom/components/pageList.scss';
import CircleEdit from '../../../../../components/Icons/CircleEdit';
import 'antd/dist/antd.css';
import SendIcon from '../../../../../components/Icons/SendIcon';
import { Dropdown } from 'react-bootstrap';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import UpdateDisadvantageModal from './UpdateDisadvantageModal';
import Delete from './Delete';
import ActionModal from './ActionModal';
import RejectModal from './RejectModal';
import { useDispatch } from 'react-redux';
import { disadvantageTab, disadvantagePageButtonDatas } from '../../../../../redux/actions';

const Table = ({ disadvantagesFilteredDatas, setDisadvantagesFilteredDatas, handleAddNewDisadvantages, setHandleAddNewDisadvantages, setSelectedTab }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // update modal
    const [updateDisadvantageData, setUpdateDisadvantageData] = useState();
    const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);

    // Add modal
    const [addModalIsShow, setAddModalIsShow] = useState(false);

    // delete modal
    const [deleteModalIsShow, setDeleteModalIsShow] = useState(false);
    const [deleteItem, setDeleteItem] = useState();

    // action modal
    const [showActionModal, setShowActionModal] = useState(false);
    const [actionModalData, setActionModalData] = useState();

    // reject modal
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectItem, setRejectItem] = useState(null);

    const [columns] = useState([
        { name: 'disadvantages', title: t('Disadvantages Name') },
        { name: 'link', title: t('Link') },
        { name: 'competitorComposition', title: t('Competitor Composition') },
        { name: 'country', title: t('Country') },
        { name: 'product', title: t('Product') },
        { name: 'specialization', title: t('Specialization') },
        { name: 'indication', title: t('Indication') },
        { name: 'profile', title: t('Profile') },
        { name: 'structure', title: t('Structure') },
        { name: 'page', title: t('Page') },
        { name: 'status', title: t('Status') },
        { name: 'actions', title: '' },
    ]);

    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'disadvantages', width: "20%" },
        { columnName: 'link', width: "7%" },
        { columnName: 'competitorComposition', width: "15%" },
        { columnName: 'country', width: "10%" },
        { columnName: 'product', width: "10%" },
        { columnName: 'specialization', width: "10%" },
        { columnName: 'indication', width: "22%" },
        { columnName: 'profile', width: "26%" },
        { columnName: 'structure', width: "8%" },
        { columnName: 'page', width: "7%" },
        { columnName: 'status', width: "10%" },
        { columnName: 'actions', width: "25px" },
    ]);

    const [tableColumnExtensions] = useState([
        { columnName: 'disadvantages', width: 150 },
        { columnName: 'link', width: 150 },
        { columnName: 'competitorComposition', width: 150 },
        { columnName: 'country', width: 150 },
        { columnName: 'product', width: 150 },
        { columnName: 'specialization', width: 150 },
        { columnName: 'indication', width: 150 },
        { columnName: 'profile', width: 150 },
        { columnName: 'structure', width: 150 },
        { columnName: 'page', width: 150 },
        { columnName: 'status', width: 200 },
        { columnName: 'actions', width: 150 },
    ]);

    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Disadvantages Name', columnName: 'disadvantages', width: 100 },
        { id: '2', isFreeze: false, content: 'Link', columnName: 'link', width: 100 },
        { id: '3', isFreeze: false, content: 'Competitor Composition', columnName: 'competitorComposition', width: 100 },
        { id: '4', isFreeze: false, content: 'Country', columnName: 'country', width: 100 },
        { id: '5', isFreeze: false, content: 'Product', columnName: 'product', width: 100 },
        { id: '6', isFreeze: false, content: 'Specialization', columnName: 'specialization', width: 100 },
        { id: '7', isFreeze: false, content: 'Indication', columnName: 'indication', width: 100 },
        { id: '8', isFreeze: false, content: 'Profile', columnName: 'profile', width: 100 },
        { id: '9', isFreeze: false, content: 'Structure', columnName: 'structure', width: 100 },
        { id: '10', isFreeze: false, content: 'Page', columnName: 'page', width: 100 },
        { id: '11', isFreeze: false, content: 'Status', columnName: 'status', width: 200 },
    ];

    const [groupByItems, setGroupByItems] = useState([
        { id: '0', isShow: true, columnName: 'disadvantages', content: t('Disadvantages Name') },
        { id: '1', isShow: true, columnName: 'link', content: t('Link') },
        { id: '2', isShow: true, columnName: 'competitorComposition', content: t('Competitor Composition') },
        { id: '3', isShow: true, columnName: 'country', content: t('Country') },
        { id: '4', isShow: true, columnName: 'product', content: t('Product') },
        { id: '5', isShow: true, columnName: 'specialization', content: t('Specialization') },
        { id: '6', isShow: true, columnName: 'indication', content: t('Indication') },
        { id: '7', isShow: true, columnName: 'profile', content: t('Profile') },
        { id: '8', isShow: true, columnName: 'structure', content: t('Structure') },
        { id: '9', isShow: true, columnName: 'page', content: t('Page') },
        { id: '10', isShow: true, columnName: 'status', content: t('Status') },
    ]);

    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'disadvantages', title: t('Disadvantages Name') },
        { isShow: true, name: 'link', title: t('Link') },
        { isShow: true, name: 'competitorComposition', title: t('Competitor Composition') },
        { isShow: true, name: 'country', title: t('Country') },
        { isShow: true, name: 'product', title: t('Product') },
        { isShow: true, name: 'specialization', title: t('Specialization') },
        { isShow: true, name: 'indication', title: t('Indication') },
        { isShow: true, name: 'profile', title: t('Profile') },
        { isShow: true, name: 'structure', title: t('Structure') },
        { isShow: true, name: 'page', title: t('Page') },
        { isShow: true, name: 'status', title: t('Status') },
    ]);

    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'disadvantages', columnName: 'Disadvantages Name', width: 150 },
        { type: 'link', columnName: 'Link', width: 150 },
        { type: 'competitorComposition', columnName: 'Competitor Composition', width: 150 },
        { type: 'country', columnName: 'Country', width: 150 },
        { type: 'product', columnName: 'Product', width: 150 },
        { type: 'specialization', columnName: 'Specialization', width: 150 },
        { type: 'indication', columnName: 'Indication', width: 150 },
        { type: 'profile', columnName: 'Profile', width: 150 },
        { type: 'structure', columnName: 'Structure', width: 150 },
        { type: 'page', columnName: 'Page', width: 150 },
        { type: 'status', columnName: 'Status', width: 200 },
        { type: 'actions', columnName: 'Actions', width: 150 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'disadvantages', width: 150 },
        { type: 'count', columnName: 'link', width: 150 },
        { type: 'count', columnName: 'competitorComposition', width: 150 },
        { type: 'count', columnName: 'country', width: 150 },
        { type: 'count', columnName: 'product', width: 150 },
        { type: 'count', columnName: 'specialization', width: 150 },
        { type: 'count', columnName: 'indication', width: 150 },
        { type: 'count', columnName: 'profile', width: 150 },
        { type: 'count', columnName: 'structure', width: 150 },
        { type: 'count', columnName: 'page', width: 150 },
        { type: 'count', columnName: 'status', width: 200 },
        { type: 'count', columnName: 'actions', width: 50 }
    ]);

    const [columnOrders, setColumnOrders] = useState(['disadvantages', 'link', 'competitorComposition', 'country', 'product', 'specialization', 'indication', 'profile', 'structure', 'page', 'status', 'actions']);

    const statusOptions = [
        {
            id: 0,
            value: 'Editable',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        { id: 1, value: 'Approval', icon: <Icon 
            path={mdiSendCheck}
            title="Approval"
            size={1}
            horizontal
            vertical
            color="#fff"/>, backgroundColor: '#FFBC00', color: '#FFFFFF' },
        {
            id: 10,
            value: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
        {
            id: 2,
            value: 'Approved',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-check"></i>,
            backgroundColor: '#0ACF97',
            color: '#FFFFFF',
        },
        {
            id: 3,
            value: 'Reject',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-exclamation"></i>,
            color: '#FA5C7C',
            backgroundColor: '#FF5B5C',
        },
        { id: 5, value: 'Force Edit', icon: <Icon 
            path={mdiSendCheck}
            title="Approval"
            size={1}
            horizontal
            vertical
            color="#fff"/> },
        { id: 6, value: 'Duplicate', icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i> },
        { id: 7, value: 'Archive', icon: <i style={{ marginRight: '8px' }} className="fas fa-archive"></i> },
        { id: 8, value: 'Edit', icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i> },
    ];

    const editableOptions = [
        {
            id: 8,
            value: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        { id: 1, value: 'Approval', icon: <SendIcon />, backgroundColor: '#FFBC00', color: '#FFFFFF' },
        {
            id: 10,
            value: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
    ]

    const approvalOptions = [
        {
            id: 0,
            value: 'Editable',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        {
            id: 2,
            value: 'Approved',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-check"></i>,
            backgroundColor: '#0ACF97',
            color: '#0ACF97',
        },
        {
            id: 10,
            value: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
    ];

    const approvedOptions = [
        {
            id: 3,
            value: 'Reject',
            icon: <i style={{ marginRight: '18px' }} className="fas fa-exclamation"></i>,
            color: '#FA5C7C',
        },
        { id: 5, value: 'Force Edit', icon: <CircleEdit /> },
        { id: 6, value: 'Duplicate', icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i> },
        { id: 7, value: 'Archive', icon: <i style={{ marginRight: '8px' }} className="fas fa-archive"></i> },
    ];

    const rejectOptions = [
        {
            id: 0,
            value: 'Editable',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        { id: 7, value: 'Archive', icon: <i style={{ marginRight: '8px' }} className="fas fa-archive"></i> },
        {
            id: 2,
            value: 'Approved',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-check"></i>,
            backgroundColor: '#0ACF97',
            color: '#0ACF97',
        }
    ];

    const dropDownItemClick = (e) => {
        const ids = e.target.id.split(' ');
        const selectedStatus = statusOptions.find((el) => el.id === Number(ids[1]));
        if (selectedStatus.value === 'Reject') {
            const item = disadvantagesFilteredDatas.find((el) => el.disadvantageId === Number(ids[0]));
            setRejectItem(item);
            setShowRejectModal(true);
        }
        if (selectedStatus.value === 'Edit') {
            const item = disadvantagesFilteredDatas.find((el) => el.disadvantageId === Number(ids[0]));
            setUpdateDisadvantageData(item);
            setIsShowUpdateModal(true);
        }
        if (selectedStatus.value === 'Delete') {
            const item = disadvantagesFilteredDatas.find((el) => el.disadvantageId === Number(ids[0]));
            setDeleteItem(item);
            setDeleteModalIsShow(true);
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
            })
            
        }
    };

    const action = disadvantagesFilteredDatas.map((el, i) => ({
        id: el.disadvantageId,
        content: (
            <span className="table-dropdown">
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <i style={{ fontSize: '20px' }} className="fas fa-ellipsis-v"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-container">
                        {el.approveStatus === 0 && //'Editable'
                            editableOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.disadvantageId} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 10 || item.id === 3 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                        {el.approveStatus === 1 && // Approval
                            approvalOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.disadvantageId} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 10 || item.id === 2 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                        {el.approveStatus === 2 && // Approved
                            approvedOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.disadvantageId} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 3 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                        {el.approveStatus === 3 && // Reject
                            rejectOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.disadvantageId} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 3 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                    </Dropdown.Menu>
                </Dropdown>
            </span>
        ),
    }));

    const disadvantagesTable = disadvantagesFilteredDatas?.map((el, index) => ({
        id: el.disadvantageId,
        disadvantages: (
            <Tippy content={el.disadvantageName} placement="bottom-start" arrow={false}>
                <span>
                    {el.disadvantageName}
                </span>
            </Tippy>
        ),
        link: <a href={el.link} target="_blank" rel="noreferrer" className="page-area">
        <Icon path={mdiLinkVariantOff}
            title="Link"
            size={1}
            horizontal
            vertical
            color="#6c757d"
        />
    </a>,
        competitorComposition: (
            <Tippy
                content={el.competitorInns?.map((x, competitorIndex) => (
                    <span>{x.competitorInnName}{el.competitorInns.length -1 !== competitorIndex && ', '}</span>
                ))}
                placement="bottom">
                <div>
                    {el.competitorInns?.map((item, competitorIndex) => (
                        <Tippy content={item.competitorInnName} placement="right">
                            <span>{item.competitorInnAbb}{el.competitorInns.length -1 !== competitorIndex && ', '}</span>
                        </Tippy>
                    ))}
                </div>
            </Tippy>
        ),
        country: el.country,
        product: el.brandName,
        specialization: (
            <Tippy
                content={el.specializations?.map((x, specContentIndex) => (
                    <span>{x.specName}{el.specializations.length -1 !== specContentIndex && ", "} </span>
                ))}
                placement="bottom">
                <div>
                    {el.specializations?.map((item, specIndex) => (
                        <Tippy content={item.specName} placement="right">
                            <span>{item.specAbb}{el.specializations.length -1 !== specIndex && ", "} </span>
                        </Tippy>
                    ))}
                </div>
            </Tippy>
        ),
        indication: <Tippy
                content={el.indicationName}
                placement="bottom">
                <span>
                    {el.indicationName}
                </span>
            </Tippy>,
        profile: <Tippy
                content={el.profileName}
                placement="bottom">
                <span>
                    {el.profileName}
                </span>
            </Tippy>,
        structure: (<span className="page-area" >
        <Icon path={mdiEyeOutline}
            title="Structure"
            size={1}
            horizontal
            vertical
            color="#6c757d"
        />
    </span>),
        page: (
            <span className="page-area" onClick={() => handleClickPageButton(el)} >
                <Icon path={mdiPlus}
            title="Page"
            size={1}
            horizontal
            vertical
            color="#6c757d"
        />
            </span>
        ),
        status: (
            <span
                style={
                    el.approveStatus === 0 //Editable
                        ? {
                              backgroundColor: '#6C757D',
                              color: '#fff',
                          }
                        : el.approveStatus === 1 //'Approval'
                        ? {
                              backgroundColor: '#FFBC00',
                              color: '#fff',
                          }
                        : el.approveStatus === 2 //'Approved'
                        ? {
                              backgroundColor: '#0ACF97',
                              color: '#fff',
                          }
                        : el.approveStatus === 3 // Reject
                            ?{
                                backgroundColor: '#FF5B5C',
                                color: '#fff',
                            }
                            : {}
                }
                className="status-title">
                {el.approveStatus === 0 && <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>}
                {el.approveStatus === 1 && <Icon 
                    path={mdiSendCheck}
                    title="Approval"
                    size={1}
                    horizontal
                    vertical
                    color="#fff"/>}
                {el.approveStatus === 2 && <i style={{ marginRight: '8px' }} className="fas fa-check"></i>}
                {el.approveStatus === 3 && <i style={{ marginRight: '10px' }} className="fas fa-exclamation"></i>}
                {el.approveStatus === 0 && (t('Editable'))}
                {el.approveStatus === 1 && (t('Approval'))}
                {el.approveStatus === 2 && (t('Approved'))}
                {el.approveStatus === 3 && (t('Reject'))}
            </span>
        ),
        actions: action[index].content
    }));

    const addDisadvantagesModal = () => {
        setAddModalIsShow(true);
    }

    const [selectCountries, setSelectCountries] = useState([]);
    const [selectProducts, setSelectProducts] = useState([]);
    const [selectIndications, setSelectIndications] = useState([]);
    const [selectProfiles, setSelectProfiles] = useState([]);
    const [selectNeed, setSelectNeed] = useState([]);
    const [selectSpecializations, setSelectSpecializations] = useState([]);
    const [selectCompetitorInn, setSelectCompetitorInn] = useState([]);
    const [selectStatus, setSelectStatus] = useState([
        { id: 0, title: "Editable", value: "Editable" },
        { id: 1, title: "Approval", value: "Approval" },
        { id: 2, title: "Approved", value: "Approved" },
        { id: 3, title: "Reject", value: "Reject" }
    ]);
    const [selectStructures, setSelectStructures] = useState([]);
    const [selectPage, setSelectPage] = useState([]);

    const [countries, setCountries] = useState([]);
    const [products, setProducts] = useState([]);
    const [indications, setIndications] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [needs, setNeeds] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [competitorInn, setCompetitorInn] = useState([]);
    const [status, setStatus] = useState([
        { id: 0, title: "Editable", value: "Editable" },
        { id: 1, title: "Approval", value: "Approval" },
        { id: 2, title: "Approved", value: "Approved" },
        { id: 3, title: "Reject", value: "Reject" }
    ]);
    const [structures, setStructures] = useState([]); // şimdilik null rastgele
    const [page, setPage] = useState([]);

    const handleClickPageButton = async (data) => {

        await dispatch(disadvantagePageButtonDatas({
            product: {
                value: data.brandName,
                label: data.brandName,
                id: data.brandId
            },
            indication: {
                value: data.indicationName,
                label: data.indicationName,
                id: data.indicationId
            },
            profile: {
                value: data.profileName,
                label: data.profileName,
                id: data.profileId
            },
            need: {
                value: data.needResponses.needName,
                label: data.needResponses.needName,
                id: data.needResponses.needId
            },
            specialization: [
                data.specializations.map(item => {
                    return {
                        value: item.specName,
                        label: item.specName,
                        id: item.specId
                    }
                })
            ],
            status: selectStatus
        }));
        
        await setSelectedTab("Page List");
        await dispatch(disadvantageTab("Page List"));
    };

    const [closeFilter, setCloseFilter] = useState(false); 

  return (
    <>
        <div id="disadvantage-table">
            <MainTable 
                tableData={disadvantagesTable}
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
                addButtonFunction={addDisadvantagesModal}
                isFilters={true}
                setCloseFilter={setCloseFilter}
                closeFilter={closeFilter}
                filters={<Filter 
                    setCloseFilter={setCloseFilter}
                    disadvantagesFilteredDatas={disadvantagesFilteredDatas} 
                    setDisadvantagesFilteredDatas={setDisadvantagesFilteredDatas} 
                    handleAddNewDisadvantages={handleAddNewDisadvantages} 
                    setHandleAddNewDisadvantages={setHandleAddNewDisadvantages}
                    selectCountries={selectCountries}
                    setSelectCountries={setSelectCountries}
                    selectProducts={selectProducts}
                    setSelectProducts={setSelectProducts}
                    selectIndications={selectIndications}
                    setSelectIndications={setSelectIndications}
                    selectProfiles={selectProfiles}
                    setSelectProfiles={setSelectProfiles}
                    selectNeed={selectNeed}
                    setSelectNeed={setSelectNeed}
                    selectSpecializations={selectSpecializations}
                    setSelectSpecializations={setSelectSpecializations}
                    selectCompetitorInn={selectCompetitorInn}
                    setSelectCompetitorInn={setSelectCompetitorInn}
                    selectStatus={selectStatus}
                    setSelectStatus={setSelectStatus}
                    selectStructures={selectStructures}
                    setSelectStructures={setSelectStructures}
                    selectPage={selectPage}
                    setSelectPage={setSelectPage}
                    countries={countries}
                    setCountries={setCountries}
                    products={products}
                    setProducts={setProducts}
                    indications={indications}
                    setIndications={setIndications}
                    profiles={profiles}
                    setProfiles={setProfiles}
                    needs={needs}
                    setNeeds={setNeeds}
                    specializations={specializations}
                    setSpecializations={setSpecializations}
                    competitorInn={competitorInn}
                    setCompetitorInn={setCompetitorInn}
                    status={status}
                    setStatus={setStatus}
                    structures={structures}
                    setStructures={setStructures}
                    page={page}
                    setPage={setPage}
                    />}
            />
        </div>

        {
            addModalIsShow && 
            <AddDisadvantagesModal 
                isShow = {addModalIsShow} 
                setIsShow = {setAddModalIsShow}
                setHandleAddNewDisadvantages = {setHandleAddNewDisadvantages}
            />
        }

        {
            isShowUpdateModal &&
            <UpdateDisadvantageModal
                isShow={isShowUpdateModal}
                setIsShow={setIsShowUpdateModal}
                updateDisadvantageData={updateDisadvantageData}
                setHandleAddNewDisadvantages = {setHandleAddNewDisadvantages}
            />
        }

        {
            deleteModalIsShow && 
            <Delete 
                deleteItem={deleteItem}
                setModalShow={setDeleteModalIsShow}
                modalShow={deleteModalIsShow}
                disadvantagesFilteredDatas={disadvantagesFilteredDatas}
                setDisadvantagesFilteredDatas={setDisadvantagesFilteredDatas}
            />
        }

        {   showActionModal &&
                <ActionModal 
                    modalShow={showActionModal}
                    setModalShow={setShowActionModal}
                    item={actionModalData}
                    disadvantagesFilteredDatas={disadvantagesFilteredDatas}
                    setDisadvantagesFilteredDatas={setDisadvantagesFilteredDatas}
                />
        }

        {
            showRejectModal &&
            <RejectModal 
                modalShow={showRejectModal}
                setModalShow={setShowRejectModal}
                rejectItem={rejectItem}
                disadvantagesFilteredDatas={disadvantagesFilteredDatas}
                setDisadvantagesFilteredDatas={setDisadvantagesFilteredDatas}
            />
        }

    </>
  )
}

export default Table