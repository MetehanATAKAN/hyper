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

const Benefit = ({ filterComponentsData, loader, setLoader, setFilterComponentsData }) => {
    const { t } = useTranslation();
    const history = useHistory();

    const [closeFilter, setCloseFilter] = useState(false);

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

    const [columns] = useState([
        { name: 'link', title: '' },
        { name: 'globalBrand', title: t('Global Brand') },
        { name: 'benefit', title: t('Benefit') },
        { name: 'reference', title: t('Reference') },
        { name: 'mechanism', title: t('Mechanism of Action') },
        { name: 'page', title: t('Page') },
        { name: 'request', title: t('Request') },
        { name: 'warning', title: t('Warning') },
        { name: 'language', title: t('Language') },
        { name: 'specialization', title: t('Specialization') },
        { name: 'indication', title: t('Indication') },
        { name: 'profile', title: t('Profile') },
        { name: 'need', title: t('Need') },
        { name: 'valid', title: t('Valid') },
        { name: 'status', title: t('Status') },
        { name: 'actions', title: ' ' },
    ]);

    //Export Columns
    const [exportColumns] = useState([
        { name: 'link', title: '' },
        { name: 'globalBrand', title: t('Global Brand') },
        { name: 'benefit', title: t('Benefit') },
        { name: 'reference', title: t('Reference') },
        { name: 'mechanism', title: t('Mechanism of Action') },
        { name: 'page', title: t('Page') },
        { name: 'request', title: t('Request') },
        { name: 'warning', title: t('Warning') },
        { name: 'language', title: t('Language') },
        { name: 'specialization', title: t('Specialization') },
        { name: 'indication', title: t('Indication') },
        { name: 'profile', title: t('Profile') },
        { name: 'need', title: t('Need') },
        { name: 'valid', title: t('Valid') },
        { name: 'status', title: t('Status') },
    ]);

    // Table Columns Resizing Width
    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'link', width: '5%' },
        { columnName: 'globalBrand', width: '10%' },
        { columnName: 'benefit', width: '10%' },
        { columnName: 'reference', width: '5%' },
        { columnName: 'mechanism', width: '7%' },
        { columnName: 'page', width: '5%' },
        { columnName: 'request', width: '5%' },
        { columnName: 'warning', width: '5%' },
        { columnName: 'language', width: '5%' },
        { columnName: 'specialization', width: '10%' },
        { columnName: 'indication', width: '20%' },
        { columnName: 'profile', width: '22%' },
        { columnName: 'need', width: '5%' },
        { columnName: 'valid', width: '5%' },
        { columnName: 'status', width: '14%' },
        { columnName: 'actions', width: '5%' },
    ]);

    //Table Column Reordering
    const [tableColumnExtensions] = useState([
        { columnName: 'link', width: '5%' },
        { columnName: 'globalBrand', width: '10%' },
        { columnName: 'benefit', width: '10%' },
        { columnName: 'reference', width: '5%' },
        { columnName: 'mechanism', width: '7%' },
        { columnName: 'page', width: '5%' },
        { columnName: 'request', width: '5%' },
        { columnName: 'warning', width: '5%' },
        { columnName: 'language', width: '5%' },
        { columnName: 'specialization', width: '10%' },
        { columnName: 'indication', width: '20%' },
        { columnName: 'profile', width: '22%' },
        { columnName: 'need', width: '5%' },
        { columnName: 'valid', width: '5%' },
        { columnName: 'status', width: '14%' },
        { columnName: 'actions', width: '5%' },
    ]);

    //Freeze Columns
    const itemsFromBackend = [
        { id: '1', isFreeze: true, content: '', columnName: 'link', width: 50 },
        { id: '2', isFreeze: false, content: 'Global Brand', columnName: 'globalBrand', width: 150 },
        { id: '3', isFreeze: false, content: 'Benefit', columnName: 'benefit', width: 150 },
        { id: '4', isFreeze: false, content: 'Reference', columnName: 'reference', width: 150 },
        { id: '5', isFreeze: false, content: 'Mechanism of Action', columnName: 'mechanism', width: 150 },
        { id: '6', isFreeze: false, content: 'Page', columnName: 'page', width: 150 },
        { id: '7', isFreeze: false, content: 'Request', columnName: 'request', width: 150 },
        { id: '8', isFreeze: false, content: 'Warning', columnName: 'warning', width: 150 },
        { id: '9', isFreeze: false, content: 'Language', columnName: 'language', width: 150 },
        { id: '10', isFreeze: false, content: 'Specialization', columnName: 'specialization', width: 150 },
        { id: '11', isFreeze: false, content: 'Indication', columnName: 'indication', width: 150 },
        { id: '12', isFreeze: false, content: 'Profile', columnName: 'profile', width: 150 },
        { id: '13', isFreeze: false, content: 'Need', columnName: 'need', width: 150 },
        { id: '14', isFreeze: false, content: 'Valid', columnName: 'valid', width: 150 },
        { id: '15', isFreeze: false, content: 'Status', columnName: 'status', width: 150 },
    ];

    // Table show or hide items
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'link', title: '' },
        { isShow: true, name: 'globalBrand', title: 'Global Brand' },
        { isShow: true, name: 'benefit', title: 'Benefit' },
        { isShow: true, name: 'reference', title: 'Reference' },
        { isShow: true, name: 'mechanism', title: 'Mechanism of Action' },
        { isShow: true, name: 'page', title: 'Page' },
        { isShow: true, name: 'request', title: 'Request' },
        { isShow: true, name: 'warning', title: 'Warning' },
        { isShow: true, name: 'language', title: 'Language' },
        { isShow: true, name: 'specialization', title: 'Specialization' },
        { isShow: true, name: 'indication', title: 'Indication' },
        { isShow: true, name: 'profile', title: 'Profile' },
        { isShow: true, name: 'need', title: 'Need' },
        { isShow: true, name: 'valid', title: 'Valid' },
        { isShow: true, name: 'status', title: 'Status' },
    ]);

    // Group By Items
    const [groupByItems, setGroupByItems] = useState([
        { id: '0', isShow: true, content: '', columnName: 'link' },
        { id: '1', isShow: true, content: 'Global Brand', columnName: 'globalBrand' },
        { id: '2', isShow: true, content: 'Benefit', columnName: 'benefit' },
        { id: '3', isShow: true, content: 'Reference', columnName: 'reference' },
        { id: '4', isShow: true, content: 'Mechanism of Action', columnName: 'mechanism' },
        { id: '5', isShow: true, content: 'Page', columnName: 'page' },
        { id: '6', isShow: true, content: 'Request', columnName: 'request' },
        { id: '7', isShow: true, content: 'Warning', columnName: 'warning' },
        { id: '8', isShow: true, content: 'Language', columnName: 'language' },
        { id: '9', isShow: true, content: 'Specialization', columnName: 'specialization' },
        { id: '10', isShow: true, content: 'Indication', columnName: 'indication' },
        { id: '11', isShow: true, content: 'Profile', columnName: 'profile' },
        { id: '12', isShow: true, content: 'Need', columnName: 'need' },
        { id: '13', isShow: true, content: 'Valid', columnName: 'valid' },
        { id: '15', isShow: true, content: 'Status', columnName: 'status' },
    ]);

    // Summary
    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'link', width: 50 },
        { type: 'count', columnName: 'globalBrand', width: 150 },
        { type: 'count', columnName: 'benefit', width: 150 },
        { type: 'count', columnName: 'reference', width: 150 },
        { type: 'count', columnName: 'mechanism', width: 150 },
        { type: 'count', columnName: 'page', width: 150 },
        { type: 'count', columnName: 'request', width: 150 },
        { type: 'count', columnName: 'warning', width: 150 },
        { type: 'count', columnName: 'language', width: 150 },
        { type: 'count', columnName: 'specialization', width: 150 },
        { type: 'count', columnName: 'indication', width: 150 },
        { type: 'count', columnName: 'profile', width: 150 },
        { type: 'count', columnName: 'need', width: 150 },
        { type: 'count', columnName: 'valid', width: 150 },
        { type: 'count', columnName: 'status', width: 150 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'link', width: 50 },
        { type: 'count', columnName: 'globalBrand', width: 150 },
        { type: 'count', columnName: 'benefit', width: 150 },
        { type: 'count', columnName: 'reference', width: 150 },
        { type: 'count', columnName: 'mechanism', width: 150 },
        { type: 'count', columnName: 'page', width: 150 },
        { type: 'count', columnName: 'request', width: 150 },
        { type: 'count', columnName: 'warning', width: 150 },
        { type: 'count', columnName: 'language', width: 150 },
        { type: 'count', columnName: 'specialization', width: 150 },
        { type: 'count', columnName: 'indication', width: 150 },
        { type: 'count', columnName: 'profile', width: 150 },
        { type: 'count', columnName: 'need', width: 150 },
        { type: 'count', columnName: 'valid', width: 150 },
        { type: 'count', columnName: 'status', width: 150 },
    ]);

    const [columnOrders, setColumnOrders] = useState([
        'link',
        'globalBrand',
        'benefit',
        'reference',
        'mechanism',
        'page',
        'request',
        'warning',
        'language',
        'specialization',
        'indication',
        'profile',
        'need',
        'valid',
        'status',
        'actions',
    ]);

    const handleClickDomunet = (item) => {
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

    const changeValid = (item, checked) => {
        const body = {
            id: item.id,
            benefitName: item.benefitName,
            needId: item.need.id,
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
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };

    const tableData = filterData.map((el, index) => ({
        id: index,
        link: (
            <div className="visit-content__table-icons">
                <button>
                    <Icon path={mdiLinkVariantOff} size={0.85} />
                </button>
            </div>
        ),
        globalBrand: el.brand.globalBrandName,
        benefit: (
            <Tippy content={el.benefitName} placement="left">
                <span>{el.benefitName}</span>
            </Tippy>
        ),
        reference: (
            <div className="visit-content__table-icons">
                <button onClick={() => handleClickDomunet(el)}>
                    {el.approveStatus === 1 || el.approveStatus === 4 || el.approveStatus === 5 ? (
                        <Icon path={mdiPencilBoxOutline} size={0.85} />
                    ) : (
                        <Icon path={mdiEyeOutline} size={0.85} />
                    )}
                </button>
            </div>
        ),
        mechanism:
            el.mechanismPage === null || el.mechanismPage.id === 0 ? (
                <div className="visit-content__table-icons">
                    <Link to={`/apps/templates/connect=${el.id}&product=MechanismPage&sub=false`}>
                        <Icon path={mdiPlus} size={0.85} color="#6C757D" />
                    </Link>
                </div>
            ) : (
                <div className="visit-content__table-icons">
                    <Link to={`/apps/templates/templatedetails=${el.id}&Product=MechanismPage`}>
                        <Icon path={mdiSquareEditOutline} size={0.85} color="#6C757D" />
                    </Link>
                </div>
            ),
        page:
            el.productPages === null || el.productPages.length === 0 ? (
                <div className="visit-content__table-icons">
                    <Link to={`/apps/templates/connect=${el.id}&product=Benefit&sub=false`}>
                        <Icon path={mdiPlus} size={0.85} color="#6C757D" />
                    </Link>
                </div>
            ) : (
                <div className="visit-content__table-icons">
                    <Link to={`/apps/templates/templatedetails=${el.id}&Product=Benefit`}>
                        <Icon path={mdiSquareEditOutline} size={0.85} color="#6C757D" />
                    </Link>
                </div>
            ),
        request: <div className="visit-content__table-icons">-</div>,
        warning: <div className="visit-content__table-icons">-</div>,
        language: <div className="visit-content__table-icons">{el.language.languageAbb}</div>,
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
            <Tippy content={el.indication.indication} placement="left">
                <span>{el.indication.indication}</span>
            </Tippy>
        ),
        profile: (
            <Tippy content={el.profile.profileName} placement="left">
                <span>{el.profile.profileName}</span>
            </Tippy>
        ),
        need: (
            <Tippy content={el.need.needName} placement="left">
                <span>{el.need.needName}</span>
            </Tippy>
        ),
        valid: (
            <div className="visit-content__table-icons">
                <Form.Check
                    type="switch"
                    style={{ fontSize: '.9rem' }}
                    onChange={(e) => changeValid(el, e.target.checked)}
                    defaultChecked={el.validStatus}
                />
            </div>
        ),
        status: (
            <Tippy disabled={el.approveStatus !== 4 ? true : false} content={el.rejectReason} placement="left">
                <Status approveStatus={el.approveStatus} />
            </Tippy>
        ),
        actions: (
            <Dropdowns
                item={`?${el.id}?${el.benefitName}`}
                option={getStatusOptions(el.approveStatus, el.benefitId, el.documents)}
                onClick={statusClick}
            />
        ),
    }));

    const getFilterData = () => {
        if (
            filterComponentsData[0].state.length === 0 ||
            filterComponentsData[1].state.length === 0 ||
            filterComponentsData[2].state.length === 0 ||
            filterComponentsData[3].state.length === 0 ||
            filterComponentsData[4].state.length === 0 ||
            filterComponentsData[5].state.length === 0 ||
            filterComponentsData[6].state.length === 0 ||
            filterComponentsData[7].state.length === 0
        )
            return;
        setLoader(true);
        const body = {
            brandIds: filterComponentsData[0].state.map((el) => el.value),
            specIds: filterComponentsData[1].state.map((el) => el.value),
            indicationIds: filterComponentsData[2].state.map((el) => el.value),
            profileIds: filterComponentsData[3].state.map((el) => el.value),
            needIds: filterComponentsData[4].state.map((el) => el.value),
            languageIds: filterComponentsData[5].state.map((el) => el.value),
            statusIds: filterComponentsData[6].state.map((el) => el.value),
            isLink: filterComponentsData[7].state.map((el) => el.value),
        };

        FetchApiPost('services/Pages/Benefit/GetAllBenefitForApply', 'POST', body).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setFilterData(data);
                    setLoader(false);
                    setCloseFilter(true);
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
    };

    return (
        <div>
            <Spin size="large" spinning={loader} style={{ top: '50%' }}>
                <MainTable
                    tableData={tableData}
                    columns={columns}
                    exportColumns={exportColumns}
                    columnWidths={columnWidths}
                    setColumnWidths={setColumnWidths}
                    tableColumnExtensions={tableColumnExtensions}
                    itemsFromBackend={itemsFromBackend}
                    columnOrders={columnOrders}
                    setColumnOrders={setColumnOrders}
                    showorHideColumnsItems={showorHideColumnsItems}
                    totalSummaryItems={totalSummaryItems}
                    groupSummaryItems={groupSummaryItems}
                    groupByItems={groupByItems}
                    setGroupByItems={setGroupByItems}
                    isAddButton={true}
                    addButtonFunction={() => setIsShow(true)}
                    isFilters={true}
                    setCloseFilter={setCloseFilter}
                    closeFilter={closeFilter}
                    filters={
                        <Filter
                            filterComponentsData={filterComponentsData}
                            getAllFilterData={getFilterData}
                            setCloseFilter={setCloseFilter}
                            deleteFilter={deleteFilter}
                            isFilterBtn={true}
                        />
                    }
                />
            </Spin>
            {isShow && <AddBenefit showAddModal={isShow} setShowAddModal={setIsShow} getFilterData={getFilterData} />}

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
                />
            )}

            {showDuplicateModal && (
                <DublicateModal
                    showAddModal={showDuplicateModal}
                    setShowAddModal={setShowDuplicateModal}
                    item={actionItem}
                    getFilterData={getFilterData}
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
