import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import MainTable from '../../../../../components/MainTable';
import Filter from './Filter';
import AddPageListModal from './AddPageListModal';
import Icon from '@mdi/react';
import { mdiLinkVariantOff, mdiEyeOutline, mdiPlus, mdiSendCheck } from '@mdi/js';
import '../../../../../assets/scss/custom/components/pageList.scss';
import CircleEdit from '../../../../../components/Icons/CircleEdit';
import 'antd/dist/antd.css';
import SendIcon from '../../../../../components/Icons/SendIcon';
import { Dropdown } from 'react-bootstrap';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import moment from 'moment';
import Delete from './Delete';
import ActionModal from './ActionModal';
import RejectModal from './RejectModal';
import UpdatePageList from './UpdatePageList';
import { useDispatch, useSelector } from 'react-redux';
import { setDisadvantageContentId, disadvantageTab } from '../../../../../redux/actions';

const Table = ({ pageListFilteredDatas, setPageListFilteredDatas, handleAddNewPageList, setHandleAddNewPageList, setSelectedTab }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();


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

    // update
    const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
    const [updatePageListData, setUpdatePageListData] = useState(null);

    const [columns] = useState([
        { name: 'disadvantages', title: t('Disadvantages Name') },
        { name: 'pageId', title: t('Page ID') },
        { name: 'competitorComposition', title: t('Competitor Composition') },
        { name: 'country', title: t('Country') },
        { name: 'product', title: t('Product') },
        { name: 'specialization', title: t('Specialization') },
        { name: 'creator', title: t('Creator') },
        { name: 'createDate', title: t('Create Date') },
        { name: 'status', title: t('Status') },
        { name: 'actions', title: '' },
    ]);

    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'disadvantages', width: "20%" },
        { columnName: 'pageId', width: "7%" },
        { columnName: 'competitorComposition', width: "15%" },
        { columnName: 'country', width: "10%" },
        { columnName: 'product', width: "10%" },
        { columnName: 'specialization', width: "10%" },
        { columnName: 'creator', width: "22%" },
        { columnName: 'createDate', width: "16%" },
        { columnName: 'status', width: "10%" },
        { columnName: 'actions', width: "25px" },
    ]);

    const [tableColumnExtensions] = useState([
        { columnName: 'disadvantages', width: 150 },
        { columnName: 'pageId', width: 150 },
        { columnName: 'competitorComposition', width: 150 },
        { columnName: 'country', width: 150 },
        { columnName: 'product', width: 150 },
        { columnName: 'specialization', width: 150 },
        { columnName: 'creator', width: 150 },
        { columnName: 'createDate', width: 150 },
        { columnName: 'status', width: 200 },
        { columnName: 'actions', width: 150 },
    ]);

    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Disadvantages Name', columnName: 'disadvantages', width: 100 },
        { id: '2', isFreeze: false, content: 'Page ID', columnName: 'pageId', width: 100 },
        { id: '3', isFreeze: false, content: 'Competitor Composition', columnName: 'competitorComposition', width: 100 },
        { id: '4', isFreeze: false, content: 'Country', columnName: 'country', width: 100 },
        { id: '5', isFreeze: false, content: 'Product', columnName: 'product', width: 100 },
        { id: '6', isFreeze: false, content: 'Specialization', columnName: 'specialization', width: 100 },
        { id: '7', isFreeze: false, content: 'Creator', columnName: 'creator', width: 100 },
        { id: '8', isFreeze: false, content: 'Create Date', columnName: 'createDate', width: 200 },
        { id: '9', isFreeze: false, content: 'Status', columnName: 'status', width: 200 },
    ];

    const [groupByItems, setGroupByItems] = useState([
        { id: '0', isShow: true, columnName: 'disadvantages', content: t('Disadvantages Name') },
        { id: '1', isShow: true, columnName: 'pageId', content: t('Page ID') },
        { id: '2', isShow: true, columnName: 'competitorComposition', content: t('Competitor Composition') },
        { id: '3', isShow: true, columnName: 'country', content: t('Country') },
        { id: '4', isShow: true, columnName: 'product', content: t('Product') },
        { id: '5', isShow: true, columnName: 'specialization', content: t('Specialization') },
        { id: '6', isShow: true, columnName: 'creator', content: t('Creator') },
        { id: '7', isShow: true, columnName: 'Create Date', content: t('createDate') },
        { id: '8', isShow: true, columnName: 'status', content: t('Status') },
    ]);

    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'disadvantages', title: t('Disadvantages Name') },
        { isShow: true, name: 'pageId', title: t('Page ID') },
        { isShow: true, name: 'competitorComposition', title: t('Competitor Composition') },
        { isShow: true, name: 'country', title: t('Country') },
        { isShow: true, name: 'product', title: t('Product') },
        { isShow: true, name: 'specialization', title: t('Specialization') },
        { isShow: true, name: 'creator', title: t('Creator') },
        { isShow: true, name: 'createDate', title: t('Create Date') },
        { isShow: true, name: 'status', title: t('Status') },
    ]);

    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'disadvantages', columnName: 'Disadvantages Name', width: 150 },
        { type: 'pageId', columnName: 'Page ID', width: 150 },
        { type: 'competitorComposition', columnName: 'Competitor Composition', width: 150 },
        { type: 'country', columnName: 'Country', width: 150 },
        { type: 'product', columnName: 'Product', width: 150 },
        { type: 'specialization', columnName: 'Specialization', width: 150 },
        { type: 'creator', columnName: 'Creator', width: 150 },
        { type: 'createDate', columnName: 'Create Date', width: 150 },
        { type: 'status', columnName: 'Status', width: 200 },
        { type: 'actions', columnName: 'Actions', width: 150 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'disadvantages', width: 150 },
        { type: 'count', columnName: 'pageId', width: 150 },
        { type: 'count', columnName: 'competitorComposition', width: 150 },
        { type: 'count', columnName: 'country', width: 150 },
        { type: 'count', columnName: 'product', width: 150 },
        { type: 'count', columnName: 'specialization', width: 150 },
        { type: 'count', columnName: 'creator', width: 150 },
        { type: 'count', columnName: 'createDate', width: 150 },
        { type: 'count', columnName: 'status', width: 200 },
        { type: 'count', columnName: 'actions', width: 50 }
    ]);

    const [columnOrders, setColumnOrders] = useState(['disadvantages', 'pageId', 'competitorComposition', 'country', 'product', 'specialization', 'creator', 'createDate', 'status', 'actions']);

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
            const item = pageListFilteredDatas.find((el) => el.contentId === Number(ids[0]));
            setRejectItem(item);
            setShowRejectModal(true);
        }
        if (selectedStatus.value === 'Edit') {
            const item = pageListFilteredDatas.find((el) => el.contentId === Number(ids[0]));
            setUpdatePageListData(item);
            setIsShowUpdateModal(true);
        }
        if (selectedStatus.value === 'Delete') {
            const item = pageListFilteredDatas.find((el) => el.contentId === Number(ids[0]));
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

    const action = pageListFilteredDatas.map((el, i) => ({
        id: el.passportOfProductId,
        content: (
            <span className="table-dropdown">
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <i style={{ fontSize: '20px' }} className="fas fa-ellipsis-v"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-container">
                        {el.isApprovedContent === 0 && //'Editable'
                            editableOptions.map((item, i) => (
                                el.pageId === 0 && item.value === "Approval" ? null :
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.contentId} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 10 || item.id === 3 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                        {el.isApprovedContent === 1 && // Approval
                            approvalOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.contentId} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 10 || item.id === 2 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                        {el.isApprovedContent === 2 && // Approved
                            approvedOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.contentId} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 3 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                        {el.isApprovedContent === 3 && // Reject
                            rejectOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.contentId} ${item.id}`}
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
    const goToTemplateTab = (e) => {
        dispatch(setDisadvantageContentId(Number(e.target.id)));
        localStorage.setItem('disadvantagePageListctId', Number(e.target.id));
        setSelectedTab("Templates");
        dispatch(disadvantageTab("Templates"));
    };


    const pageListTable = pageListFilteredDatas?.map((el, index) => ({
        id: el.contentId,
        disadvantages: (
            <Tippy content={el.passportOfProductName} placement="bottom-start" arrow={false}>
                <span>
                    {el.passportOfProductName}
                </span>
            </Tippy>
        ),
        pageId: el.jsonFile === null || el.jsonFile === '' ? (
            <span className="page-area" id={el.contentId} onClick={goToTemplateTab}>
                +
            </span>
        ) : (
            <span className="page-area" id={el.contentId}>
                <Link to={`template/detailspagelist=${el.contentId}&country=${el.countryId}`}>
                    <Icon path={mdiEyeOutline} size={1} horizontal vertical color="#6c757d" />
                </Link>
            </span>
        ),
        competitorComposition: (
            <Tippy
                content={el.competitorInn?.map((x, competitorIndex) => (
                    <span>{x.competitorInnName}{el.competitorInn.length -1 !== competitorIndex && ", "}</span>
                ))}
                placement="bottom">
                <div>
                    {el.competitorInn?.map((item, competitorIndex) => (
                        <Tippy content={item.competitorInnName} placement="right">
                            <span>{item.competitorInnAbb}{el.competitorInn.length -1 !== competitorIndex && ", "}</span>
                        </Tippy>
                    ))}
                </div>
            </Tippy>
        ),
        country: el.countryName,
        product: el.productName,
        specialization: (
            <Tippy
                content={el.getSpec?.map((x, specIndex) => (
                    <span>{x.specName}{el.getSpec.length -1 !== specIndex && ", "}</span>
                ))}
                placement="bottom">
                <div>
                    {el.specializations?.map((item, specIndex) => (
                        <Tippy content={item.specName} placement="right">
                            <span>{item.specAbb}{el.getSpec.length -1 !== specIndex && ", "}</span>
                        </Tippy>
                    ))}
                </div>
            </Tippy>
        ),
        creator: <Tippy
                content={el.createdBy}
                placement="bottom">
                <span>
                    {el.createdBy}
                </span>
            </Tippy>,
        createDate: <Tippy
                content={moment(el.createdDate).format('DD/MM/YYYY')}
                placement="bottom">
                <span>
                    {moment(el.createdDate).format('DD/MM/YYYY')}
                </span>
            </Tippy>,
        status: (
            <span
                style={
                    el.isApprovedContent === 0 //Editable
                        ? {
                              backgroundColor: '#6C757D',
                              color: '#fff',
                          }
                        : el.isApprovedContent === 1 //'Approval'
                        ? {
                              backgroundColor: '#FFBC00',
                              color: '#fff',
                          }
                        : el.isApprovedContent === 2 //'Approved'
                        ? {
                              backgroundColor: '#0ACF97',
                              color: '#fff',
                          }
                        : el.isApprovedContent === 3 // Reject
                            ?{
                                backgroundColor: '#FF5B5C',
                                color: '#fff',
                            }
                            : {}
                }
                className="status-title">
                {el.isApprovedContent === 0 && <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>}
                {el.isApprovedContent === 1 && <Icon 
                    path={mdiSendCheck}
                    title="Approval"
                    size={1}
                    horizontal
                    vertical
                    color="#fff"/>}
                {el.isApprovedContent === 2 && <i style={{ marginRight: '8px' }} className="fas fa-check"></i>}
                {el.isApprovedContent === 3 && <i style={{ marginRight: '10px' }} className="fas fa-exclamation"></i>}
                {el.isApprovedContent === 0 && (t('Editable'))}
                {el.isApprovedContent === 1 && (t('Approval'))}
                {el.isApprovedContent === 2 && (t('Approved'))}
                {el.isApprovedContent === 3 && (t('Reject'))}
            </span>
        ),
        actions: action[index].content
    }));

    const addPageListModal = () => {
        setAddModalIsShow(true);
    };

    const [selectCountries, setSelectCountries] = useState([]);
    const [selectProducts, setSelectProducts] = useState([]);
    const [selectIndications, setSelectIndications] = useState([]);
    const [selectCompetitorInn, setSelectCompetitorInn] = useState([]);
    const [selectProfiles, setSelectProfiles] = useState([]);
    const [selectNeed, setSelectNeed] = useState([]);
    
    const [selectSpecializations, setSelectSpecializations] = useState([]);
    const [selectCreator, setSelectCreator] = useState([]);
    const [selectCreateDate, setSelectCreateDate] = useState([]);
    const [selectStatus, setSelectStatus] = useState([
        { id: 0, title: "Editable", value: "Editable" },
        { id: 1, title: "Approval", value: "Approval" },
        { id: 2, title: "Approved", value: "Approved" },
        { id: 3, title: "Reject", value: "Reject" }
    ]);

    const [countries, setCountries] = useState([]);
    const [products, setProducts] = useState([]);
    const [indications, setIndications] = useState([]);
    const [competitorInn, setCompetitorInn] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [needs, setNeeds] = useState([]);
    
    const [specializations, setSpecializations] = useState([]);
    const [creator, setCreator] = useState([]);
    const [createDate, setCreateDate] = useState([]);
    const [status, setStatus] = useState([
        { id: 0, title: "Editable", value: "Editable" },
        { id: 1, title: "Approval", value: "Approval" },
        { id: 2, title: "Approved", value: "Approved" },
        { id: 3, title: "Reject", value: "Reject" }
    ]);

    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);

    const [closeFilter, setCloseFilter] = useState(false);

  return (
    <div id="disadvantage-table">
            <MainTable 
                tableData={pageListTable}
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
                addButtonFunction={addPageListModal}
                isFilters={true}
                setCloseFilter={setCloseFilter}
                closeFilter={closeFilter}
                filters={<Filter 
                    setCloseFilter={setCloseFilter}
                    pageListFilteredDatas={pageListFilteredDatas}
                    setPageListFilteredDatas={setPageListFilteredDatas}
                    handleAddNewPageList={handleAddNewPageList}
                    setHandleAddNewPageList={setHandleAddNewPageList}
                    selectCountries={selectCountries}
                    setSelectCountries={setSelectCountries}
                    selectProducts={selectProducts}
                    setSelectProducts={setSelectProducts}
                    selectIndications={selectIndications}
                    setSelectIndications={setSelectIndications}
                    selectCompetitorInn={selectCompetitorInn}
                    setSelectCompetitorInn={setSelectCompetitorInn}
                    selectProfiles={selectProfiles}
                    setSelectProfiles={setSelectProfiles}
                    selectNeed={selectNeed}
                    setSelectNeed={setSelectNeed}
                    selectSpecializations={selectSpecializations}
                    setSelectSpecializations={setSelectSpecializations}
                    selectCreator={selectCreator}
                    setSelectCreator={setSelectCreator}
                    selectCreateDate={selectCreateDate}
                    setSelectCreateDate={setSelectCreateDate}
                    selectStatus={selectStatus}
                    setSelectStatus={setSelectStatus}
                    countries={countries}
                    setCountries={setCountries}
                    products={products}
                    setProducts={setProducts}
                    indications={indications}
                    setIndications={setIndications}
                    competitorInn={competitorInn}
                    setCompetitorInn={setCompetitorInn}
                    profiles={profiles}
                    setProfiles={setProfiles}
                    needs={needs}
                    setNeeds={setNeeds}
                    specializations={specializations}
                    setSpecializations={setSpecializations}
                    creator={creator}
                    setCreator={setCreator}
                    createDate={createDate}
                    setCreateDate={setCreateDate}
                    status={status}
                    setStatus={setStatus}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                   />}
            />

        {
            addModalIsShow && 
            <AddPageListModal 
                isShow = {addModalIsShow} 
                setIsShow = {setAddModalIsShow}
                setHandleAddNewPageList = {setHandleAddNewPageList}
            />
        }

        {
            deleteModalIsShow && 
            <Delete 
                deleteItem={deleteItem}
                setModalShow={setDeleteModalIsShow}
                modalShow={deleteModalIsShow}
                pageListFilteredDatas={pageListFilteredDatas}
                setPageListFilteredDatas={setPageListFilteredDatas}
            />
        }

        {   showActionModal &&
                <ActionModal 
                    modalShow={showActionModal}
                    setModalShow={setShowActionModal}
                    item={actionModalData}
                    pageListFilteredDatas={pageListFilteredDatas}
                    setPageListFilteredDatas={setPageListFilteredDatas}
                />
        }

        {
            showRejectModal &&
            <RejectModal 
                modalShow={showRejectModal}
                setModalShow={setShowRejectModal}
                rejectItem={rejectItem}
                pageListFilteredDatas={pageListFilteredDatas}
                setPageListFilteredDatas={setPageListFilteredDatas}
            />
        }

{
                isShowUpdateModal && 
                <UpdatePageList 
                    isShow={isShowUpdateModal} 
                    setIsShow={setIsShowUpdateModal} 
                    updatePageListData={updatePageListData}
                    pageListFilteredDatas={pageListFilteredDatas}
                    setHandleAddNewPageList = {setHandleAddNewPageList}
                />
            }

    </div>
  )
}

export default Table