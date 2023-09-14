import React, { useState } from 'react';
import MainTable from '../../../../../components/MainTable';
import { useTranslation } from 'react-i18next';
import { mdiLinkVariantOff, mdiEyeOutline, mdiPlus, mdiSendCheck, mdiTranslate } from '@mdi/js';
import Icon from '@mdi/react';
import AddNeedModal from './AddNeedModal';
import Filter from './Filter';
import 'antd/dist/antd.css';
import { useDispatch } from 'react-redux';
import { needTab, needPageButtonDatas } from '../../../../../redux/actions';
import Delete from './Delete';
import { FetchApiPost } from '../../../../../utils/http.helper';
import UpdateNeed from './UpdateNeed';
import Reject from './Reject';
import ActionModal from './ActionModal';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Dropdowns from '../../../../../components/Dropdowns';
import {
    statusApprovalOptions,
    statusApprovedOptions,
    statusRedactOptions,
    statusRejectOptions,
    statusTranslateOptions,
} from './Statuses';
import SendIcon from '../../../../../components/Icons/SendIcon';
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import ContentModal from './ContentModal';
import Duplicate from './Duplicate';
import Translate from './Translate';
import TranslateIcon from '../../../../../components/Icons/TranslateIcon';
import EditableSpan from '../../../../../components/EditableSpan';
import TranslateAction from './TranslateAction';
import TranslateEdit from './TranslateEdit';
const Table = ({ needFilteredDatas, setNeedFilteredDatas, setSelectedTab }) => {
    const { t } = useTranslation();

    const [columns] = useState([
        { name: 'needName', title: t('Need Name') },
        { name: 'link', title: t('Link') },
        { name: 'content', title: t('Content') },
        { name: 'product', title: t('Product') },
        { name: 'specialization', title: t('Specialization') },
        { name: 'indication', title: t('Indication') },
        { name: 'profile', title: t('Profile') },
        { name: 'needId', title: t('Need ID') },
        { name: 'page', title: t('Page') },
        { name: 'status', title: t('Status') },
        { name: 'language', title: t('Language') },
        { name: 'actions', title: '' },
    ]);

    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'needName', width: '22%' },
        { columnName: 'link', width: '5%' },
        { columnName: 'content', width: '6%' },
        { columnName: 'product', width: '10%' },
        { columnName: 'specialization', width: '10%' },
        { columnName: 'indication', width: '22%' },
        { columnName: 'profile', width: '26%' },
        { columnName: 'needId', width: '8%' },
        { columnName: 'page', width: '6%' },
        { columnName: 'status', width: '12%' },
        { columnName: 'language', width: '9%' },
        { columnName: 'actions', width: '25px' },
    ]);

    const [tableColumnExtensions] = useState([
        { columnName: 'needName', width: 150 },
        { columnName: 'link', width: 150 },
        { columnName: 'content', width: 150 },
        { columnName: 'product', width: 150 },
        { columnName: 'specialization', width: 150 },
        { columnName: 'indication', width: 150 },
        { columnName: 'profile', width: 150 },
        { columnName: 'needId', width: 150 },
        { columnName: 'page', width: 150 },
        { columnName: 'status', width: 150 },
        { columnName: 'language', width: 150 },
        { columnName: 'actions', width: 50 },
    ]);

    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Need Name', columnName: 'needName', width: 100 },
        { id: '2', isFreeze: false, content: 'Link', columnName: 'link', width: 100 },
        { id: '3', isFreeze: false, content: 'Content', columnName: 'content', width: 100 },
        { id: '4', isFreeze: false, content: 'Product', columnName: 'product', width: 100 },
        { id: '5', isFreeze: false, content: 'Specialization', columnName: 'specialization', width: 100 },
        { id: '6', isFreeze: false, content: 'Indication', columnName: 'indication', width: 100 },
        { id: '7', isFreeze: false, content: 'Profile', columnName: 'profile', width: 100 },
        { id: '8', isFreeze: false, content: 'Need ID', columnName: 'needId', width: 100 },
        { id: '9', isFreeze: false, content: 'Page', columnName: 'page', width: 100 },
        { id: '10', isFreeze: false, content: 'Status', columnName: 'status', width: 100 },
        { id: '11', isFreeze: false, content: 'Language', columnName: 'language', width: 100 },
    ];

    const [groupByItems, setGroupByItems] = useState([
        { id: '0', isShow: true, columnName: 'needName', content: t('Need Name') },
        { id: '1', isShow: true, columnName: 'link', content: t('Link') },
        { id: '2', isShow: true, columnName: 'content', content: t('Content') },
        { id: '3', isShow: true, columnName: 'product', content: t('Product') },
        { id: '4', isShow: true, columnName: 'specialization', content: t('Specialization') },
        { id: '5', isShow: true, columnName: 'indication', content: t('Indication') },
        { id: '6', isShow: true, columnName: 'profile', content: t('Profile') },
        { id: '7', isShow: true, columnName: 'needId', content: t('Need ID') },
        { id: '8', isShow: true, columnName: 'page', content: t('Page') },
        { id: '9', isShow: true, columnName: 'status', content: t('Status') },
        { id: '10', isShow: true, columnName: 'language', content: t('Language') },
    ]);

    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'needName', title: t('Need Name') },
        { isShow: true, name: 'link', title: t('Link') },
        { isShow: true, name: 'content', title: t('Content') },
        { isShow: true, name: 'product', title: t('Product') },
        { isShow: true, name: 'specialization', title: t('Specialization') },
        { isShow: true, name: 'indication', title: t('Indication') },
        { isShow: true, name: 'profile', title: t('Profile') },
        { isShow: true, name: 'needId', title: t('Need ID') },
        { isShow: true, name: 'page', title: t('Page') },
        { isShow: true, name: 'status', title: t('Status') },
        { isShow: true, name: 'language', title: t('Language') },
    ]);

    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'needName', width: 150 },
        { type: 'count', columnName: 'link', width: 150 },
        { type: 'count', columnName: 'content', width: 150 },
        { type: 'count', columnName: 'product', width: 150 },
        { type: 'count', columnName: 'specialization', width: 150 },
        { type: 'count', columnName: 'indication', width: 150 },
        { type: 'count', columnName: 'profile', width: 150 },
        { type: 'count', columnName: 'needId', width: 150 },
        { type: 'count', columnName: 'page', width: 150 },
        { type: 'count', columnName: 'status', width: 150 },
        { type: 'count', columnName: 'language', width: 150 },
        { type: 'count', columnName: 'actions', width: 50 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'needName', width: 150 },
        { type: 'count', columnName: 'link', width: 150 },
        { type: 'count', columnName: 'content', width: 150 },
        { type: 'count', columnName: 'product', width: 150 },
        { type: 'count', columnName: 'specialization', width: 150 },
        { type: 'count', columnName: 'indication', width: 150 },
        { type: 'count', columnName: 'profile', width: 150 },
        { type: 'count', columnName: 'needId', width: 150 },
        { type: 'count', columnName: 'page', width: 150 },
        { type: 'count', columnName: 'status', width: 150 },
        { type: 'count', columnName: 'language', width: 150 },
        { type: 'count', columnName: 'actions', width: 50 },
    ]);
    const [columnOrders, setColumnOrders] = useState([
        'link',
        'needName',
        'product',
        'needId',
        'content',
        'page',
        'language',
        'indication',
        'profile',
        'specialization',
        'status',
        'actions',
    ]);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const history = useHistory();
    const [needModal, setNeedModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showContentModal, setShowContentModal] = useState(false);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [showTranslateModal, setShowTranslateModal] = useState(false);
    const [contentData, setContentData] = useState(null);
    const [needId, setNeedId] = useState(null);
    const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
    const [updateData, setUpdateData] = useState(null);
    const [rejectId, setRejectId] = useState(null);
    const [showActionModal, setShowActionModal] = useState(false);
    const [showTranslateActionModal, setShowTranslateActionModal] = useState(false);
    const [showTrEditModal, setShowTrEditModal] = useState(false);
    const [actionItem, setActionItem] = useState({ id: 0, statusId: 99, name: '' });

    const handleClickPageButton = async (data) => {
        await dispatch(
            needPageButtonDatas({
                product: {
                    value: data.brandName,
                    label: data.brandName,
                    id: data.brandId,
                },
                indication: {
                    value: data.indicationName,
                    label: data.indicationName,
                    id: data.indicationId,
                },
                profile: {
                    value: data.profileName,
                    label: data.profileName,
                    id: data.profileId,
                },
                specialization: [
                    data.specializations.map((item) => {
                        return {
                            value: item.specName,
                            label: item.specName,
                            id: item.specId,
                        };
                    }),
                ],
            })
        );

        await setSelectedTab('Page List');
        await dispatch(needTab('Page List'));
    };
    const statusClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );
        const statusId = Number(getIds[0]);
        const itemId = getIds[1];
        const itemName = getIds[2];
        setActionItem({ id: itemId, statusId: statusId, name: itemName });
        const findNeedById = needFilteredDatas.find((obj) => obj.id === itemId);
        setUpdateData(findNeedById);
        const isTranslate = findNeedById.isTranslate;
        console.log(isTranslate);
        if (isTranslate === false) {
            switch (statusId) {
                case 0:
                    setShowDeleteModal(true);
                    break;
                case 1:
                case 2:
                case 3:
                    setShowActionModal(true);
                    break;
                case 4:
                    setShowRejectModal(true);
                    break;
                case 5:
                    setShowTranslateModal(true);
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
        }
        if (isTranslate === true) {
            switch (statusId) {
                case 0:
                    setShowDeleteModal(true);
                    break;
                case 1:
                case 2:
                case 3:
                    setShowTranslateActionModal(true);
                    break;
                case 4:
                    setShowRejectModal(true);
                    break;
                case 9:
                    setShowTrEditModal(true);
                    break;
                default:
                    break;
            }
        }
    };
    const openContent = (obj) => {
        setShowContentModal(true);
        setContentData(obj);
    };
    const getStatusOptions = (status, isTranslate) => {
        switch (status) {
            case 1:
                return statusRedactOptions;
            case 2:
                return statusApprovalOptions;
            case 3:
                if (isTranslate === false) {
                    return statusApprovedOptions;
                }
                if (isTranslate === true) {
                    const arr = statusApprovedOptions.filter((x) => x.id !== 5 && x.id !== 6);
                    return arr;
                }
                break;
            case 4:
                return statusRejectOptions;
            case 5:
                return statusTranslateOptions;
            default:
                break;
        }
    };
    const needTable = needFilteredDatas?.map((el, index) => ({
        id: el.id,
        needName: (
            <Tippy content={el.needName} placement="bottom" arrow={false}>
                {el.approveStatus === 5 ? (
                    <EditableSpan data={el} objName="needName" setAllData={setNeedFilteredDatas} />
                ) : (
                    <span>{el.needName}</span>
                )}
            </Tippy>
        ),
        link: (
            <span className="page-area">
                <Icon path={mdiLinkVariantOff} title="Link" size={0.8} horizontal vertical color="#6c757d" />
            </span>
        ),
        content: (
            <span
                className="page-area"
                onClick={() => openContent({ id: el.id, content: el.content, status: el.approveStatus })}>
                <Icon
                    path={mdiEyeOutline}
                    title="Content"
                    size={0.8}
                    horizontal
                    vertical
                    color={el.approveStatus === 5 ? '#FFBC00' : '#6c757d'}
                />
            </span>
        ),
        product: el.productName,
        specialization: (
            <Tippy
                content={el.specializations?.map((x, idx) => (
                    <>
                        <span style={{ fontSize: '12px' }}>
                            <i className="fas fa-circle" style={{ fontSize: '9px' }}></i> {x.specName}
                        </span>
                        <br />
                    </>
                ))}
                placement="left">
                <span>
                    {el.specializations?.map((item, idx) => (
                        <span>
                            {item.specAbb}
                            {el.specializations.length - 1 !== idx && ', '}{' '}
                        </span>
                    ))}
                </span>
            </Tippy>
        ),
        indication: (
            <Tippy
                content={el.indications?.map((x, idx) => (
                    <>
                        <span style={{ fontSize: '12px' }}>
                            <i className="fas fa-circle" style={{ fontSize: '9px' }}></i> {x.indication}
                        </span>
                        <br />
                    </>
                ))}
                placement="left">
                <span>
                    {el.indications?.map((item, idx) => (
                        <span>
                            {item.indication}
                            {el.indications.length - 1 !== idx && ', '}{' '}
                        </span>
                    ))}
                </span>
            </Tippy>
        ),
        profile: (
            <Tippy
                content={el.profiles?.map((x, idx) => (
                    <>
                        <span style={{ fontSize: '12px' }}>
                            <i className="fas fa-circle" style={{ fontSize: '9px' }}></i> {x.profile}
                        </span>
                        <br />
                    </>
                ))}
                placement="left">
                <span>
                    {el.profiles?.map((item, idx) => (
                        <span>
                            {item.profile}
                            {el.profiles.length - 1 !== idx && ', '}{' '}
                        </span>
                    ))}
                </span>
            </Tippy>
        ),
        language: el.language.languageAbb,
        needId: el.abb,
        page: (
            <span className="page-area" onClick={() => handleClickPageButton(el)}>
                <Icon path={mdiPlus} title="Page" size={0.8} horizontal vertical color="#6c757d" />
            </span>
        ),
        status: (
            <Tippy disabled={el.approveStatus !== 4 ? true : false} content={el.rejectReason} placement="left">
                <span
                    style={
                        el.approveStatus === 1 //Redact
                            ? {
                                  backgroundColor: '#6C757D',
                                  color: '#fff',
                              }
                            : el.approveStatus === 2 //'Approval'
                            ? {
                                  backgroundColor: '#FFBC00',
                                  color: '#fff',
                              }
                            : el.approveStatus === 3 //'Approved'
                            ? {
                                  backgroundColor: '#0ACF97',
                                  color: '#fff',
                              }
                            : el.approveStatus === 4 // Reject
                            ? {
                                  backgroundColor: '#FA5C7C',
                                  color: '#fff',
                              }
                            : el.approveStatus === 5 // Translate
                            ? {
                                  backgroundColor: '#00BAFF',
                                  color: '#fff',
                              }
                            : {}
                    }
                    className="status-title">
                    {el.approveStatus === 1 && <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>}
                    {el.approveStatus === 2 && <SendIcon />}
                    {el.approveStatus === 3 && <i style={{ marginRight: '8px' }} className="fas fa-check"></i>}
                    {el.approveStatus === 4 && <i style={{ marginRight: '8px' }} className="fas fa-exclamation"></i>}
                    {el.approveStatus === 5 && <Icon path={mdiTranslate} size={0.7} />}
                    {el.approveStatus === 1 && t('Redact')}
                    {el.approveStatus === 2 && t('Approval')}
                    {el.approveStatus === 3 && t('Approved')}
                    {el.approveStatus === 4 && t('Reject')}
                    {el.approveStatus === 5 && t('translate awaited')}
                </span>
            </Tippy>
        ),
        actions: (
            <Dropdowns
                item={`?${el.id}?${el.needName}`}
                option={getStatusOptions(el.approveStatus, el.isTranslate)}
                onClick={statusClick}
            />
        ),
    }));
    const addNeedModal = () => {
        setNeedModal(true);
    };
    const [selectCountries, setSelectCountries] = useState([]);
    const [selectProducts, setSelectProducts] = useState([]);
    const [selectIndications, setSelectIndications] = useState([]);
    const [selectProfiles, setSelectProfiles] = useState([]);
    const [selectSpecializations, setSelectSpecializations] = useState([]);
    const [selectStatus, setSelectStatus] = useState([
        { value: 1, label: 'Editable' },
        { value: 2, label: 'Approval' },
        { value: 3, label: 'Approved' },
        { value: 4, label: 'Reject' },
    ]);
    const [countries, setCountries] = useState([]);
    const [products, setProducts] = useState([]);
    const [indications, setIndications] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [status, setStatus] = useState([
        { value: 1, label: t('Editable') },
        { value: 2, label: t('Approval') },
        { value: 3, label: t('Approved') },
        { value: 4, label: t('Reject') },
    ]);
    const [closeFilter, setCloseFilter] = useState(false);
    const [selectLink, setSelectLink] = useState([
        { value: 0, label: t('Not Connect') },
        { value: 1, label: t('Connect') },
    ]);
    const [link, setLink] = useState([
        { value: 0, label: t('Not Connect') },
        { value: 1, label: t('Connect') },
    ]);
    const needFilter = () => {
        const countryId = selectCountries.map((item) => item.value);
        const productId = selectProducts.map((item) => item.value);
        const indicationId = selectIndications.map((item) => item.value);
        const profileId = selectProfiles.map((item) => item.value);
        const specId = selectSpecializations.map((item) => item.value);
        const linkId = selectLink.map((item) => item.value);
        const statusId = selectStatus.map((item) => item.value);
        const conditionArr = [
            countryId.length !== 0,
            productId.length !== 0,
            indicationId.length !== 0,
            profileId.length !== 0,
            specId.length !== 0,
            statusId.length !== 0,
            linkId.length !== 0,
        ];
        if (conditionArr.some((el) => el === false)) return;
        setLoader(true);
        setCloseFilter(true);
        FetchApiPost('services/Pages/Need/ApplyNeedFilter', 'POST', {
            countryIds: countryId,
            productIds: productId,
            indicationIds: indicationId,
            profileIds: profileId,
            statusIds: statusId,
            link: linkId,
            specIds: specId,
        })
            .then((res) => {
                if (res.status === 200) {
                    res.json().then((res) => {
                        setLoader(false);
                        setNeedFilteredDatas(res.data);
                    });
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <div id="page-list-table">
                <Spin size="large" spinning={loader}>
                    <MainTable
                        tableData={needTable}
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
                        addButtonFunction={addNeedModal}
                        isFilters={true}
                        setCloseFilter={setCloseFilter}
                        closeFilter={closeFilter}
                        filters={
                            <Filter
                                needFilter={needFilter}
                                setCloseFilter={setCloseFilter}
                                selectCountries={selectCountries}
                                setSelectCountries={setSelectCountries}
                                selectProducts={selectProducts}
                                setSelectProducts={setSelectProducts}
                                selectIndications={selectIndications}
                                setSelectIndications={setSelectIndications}
                                selectProfiles={selectProfiles}
                                setSelectProfiles={setSelectProfiles}
                                selectSpecializations={selectSpecializations}
                                setSelectSpecializations={setSelectSpecializations}
                                selectStatus={selectStatus}
                                setSelectStatus={setSelectStatus}
                                countries={countries}
                                setCountries={setCountries}
                                products={products}
                                setProducts={setProducts}
                                indications={indications}
                                setIndications={setIndications}
                                profiles={profiles}
                                setProfiles={setProfiles}
                                specializations={specializations}
                                setSpecializations={setSpecializations}
                                status={status}
                                setStatus={setStatus}
                                selectLink={selectLink}
                                setSelectLink={setSelectLink}
                                link={link}
                                setLink={setLink}
                            />
                        }
                    />
                </Spin>
            </div>
            {needModal && <AddNeedModal isShow={needModal} setIsShow={setNeedModal} needFilter={needFilter} />}
            {showRejectModal && (
                <Reject
                    modalShow={showRejectModal}
                    setModalShow={setShowRejectModal}
                    item={actionItem}
                    applyFilter={needFilter}
                />
            )}
            {showDeleteModal && (
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    item={actionItem}
                    applyFilter={needFilter}
                />
            )}

            {isShowUpdateModal && (
                <UpdateNeed
                    isShow={isShowUpdateModal}
                    setIsShow={setIsShowUpdateModal}
                    needFilter={needFilter}
                    updateData={updateData}
                />
            )}
            {showTranslateModal && (
                <Translate
                    showModal={showTranslateModal}
                    setShowModal={setShowTranslateModal}
                    item={updateData}
                    needFilter={needFilter}
                />
            )}
            {showActionModal && (
                <ActionModal
                    modalShow={showActionModal}
                    setModalShow={setShowActionModal}
                    item={actionItem}
                    applyFilter={needFilter}
                />
            )}
            {showContentModal && (
                <ContentModal
                    showModal={showContentModal}
                    setShowModal={setShowContentModal}
                    contentData={contentData}
                    applyFilter={needFilter}
                />
            )}
            {showDuplicateModal && (
                <Duplicate
                    isShow={showDuplicateModal}
                    setIsShow={setShowDuplicateModal}
                    needFilter={needFilter}
                    updateData={updateData}
                />
            )}
            {showTranslateActionModal && (
                <TranslateAction
                    modalShow={showTranslateActionModal}
                    setModalShow={setShowTranslateActionModal}
                    item={actionItem}
                    applyFilter={needFilter}
                />
            )}
            {showTrEditModal && (
                <TranslateEdit
                    showModal={showTrEditModal}
                    setShowModal={setShowTrEditModal}
                    item={updateData}
                    needFilter={needFilter}
                />
            )}
        </>
    );
};

export default Table;
