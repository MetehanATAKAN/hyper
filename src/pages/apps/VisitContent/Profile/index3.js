import React, { useEffect, useState } from 'react';
import MainTable from '../../../../components/MainTable';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
import Filter from '../../../../components/Filter';
import { mdiPlus, mdiSquareEditOutline, mdiLinkVariantOff } from '@mdi/js';
import 'antd/dist/antd.css';
import Icon from '@mdi/react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Status from '../../../../components/Status';
import { FetchApiPost } from '../../../../utils/http.helper';
import { Link, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import WhereLinkedModal from './WhereLinkedModal';

const Profile = ({ filterComponentsData, loader, setLoader }) => {
    const { t } = useTranslation();
    const history = useHistory();

    const [closeFilter, setCloseFilter] = useState(false);

    const [filterData, setFilterData] = useState([]);

    const [columns] = useState([
        { name: 'link', title: ' ' },
        { name: 'globalBrand', title: t('Global Brand') },
        { name: 'profile', title: t('Profile') },
        { name: 'profileAbb', title: t('Profile') },
        { name: 'page', title: t('Page') },
        { name: 'request', title: t('Request') },
        { name: 'warning', title: t('Warning') },
        { name: 'language', title: t('Language') },
        { name: 'specialization', title: t('Specialization') },
        { name: 'indication', title: t('Indication') },
        { name: 'valid', title: t('Valid') },
        { name: 'status', title: t('Status') },
    ]);

    //Export Columns
    const [exportColumns] = useState([
        { name: 'link', title: ' ' },
        { name: 'globalBrand', title: t('Global Brand') },
        { name: 'profile', title: t('Profile') },
        { name: 'profileAbb', title: t('Profile') },
        { name: 'page', title: t('Page') },
        { name: 'request', title: t('Request') },
        { name: 'warning', title: t('Warning') },
        { name: 'language', title: t('Language') },
        { name: 'specialization', title: t('Specialization') },
        { name: 'indication', title: t('Indication') },
        { name: 'valid', title: t('Valid') },
        { name: 'status', title: t('Status') },
    ]);

    // Table Columns Resizing Width
    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'link', width: '5%' },
        { columnName: 'globalBrand', width: '10%' },
        { columnName: 'profile', width: '25%' },
        { columnName: 'profileAbb', width: '7%' },
        { columnName: 'page', width: '5%' },
        { columnName: 'request', width: '7%' },
        { columnName: 'warning', width: '7%' },
        { columnName: 'language', width: '7%' },
        { columnName: 'specialization', width: '10%' },
        { columnName: 'indication', width: '10%' },
        { columnName: 'valid', width: '5%' },
        { columnName: 'status', width: '14%' },
    ]);

    //Table Column Reordering
    const [tableColumnExtensions] = useState([
        { columnName: 'link', width: '5%' },
        { columnName: 'globalBrand', width: '10%' },
        { columnName: 'profile', width: '25%' },
        { columnName: 'profileAbb', width: '7%' },
        { columnName: 'page', width: '5%' },
        { columnName: 'request', width: '7%' },
        { columnName: 'warning', width: '7%' },
        { columnName: 'language', width: '7%' },
        { columnName: 'specialization', width: '10%' },
        { columnName: 'indication', width: '10%' },
        { columnName: 'valid', width: '5%' },
        { columnName: 'status', width: '14%' },
    ]);

    //Freeze Columns
    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: ' ', columnName: 'link', width: 150 },
        { id: '2', isFreeze: false, content: 'Global Brand', columnName: 'globalBrand', width: 150 },
        { id: '3', isFreeze: false, content: 'Profile', columnName: 'profile', width: 150 },
        { id: '4', isFreeze: false, content: 'Profile', columnName: 'profileAbb', width: 150 },
        { id: '5', isFreeze: false, content: 'Page', columnName: 'page', width: 150 },
        { id: '6', isFreeze: false, content: 'Request', columnName: 'request', width: 150 },
        { id: '7', isFreeze: false, content: 'Warning', columnName: 'warning', width: 150 },
        { id: '8', isFreeze: false, content: 'Language', columnName: 'language', width: 150 },
        { id: '9', isFreeze: false, content: 'Specialization', columnName: 'specialization', width: 150 },
        { id: '10', isFreeze: false, content: 'Indication', columnName: 'indication', width: 150 },
        { id: '11', isFreeze: false, content: 'Valid', columnName: 'valid', width: 150 },
        { id: '12', isFreeze: false, content: 'Status', columnName: 'status', width: 150 },
    ];

    // Table show or hide items
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'link', title: ' ' },
        { isShow: true, name: 'globalBrand', title: 'Global Brand' },
        { isShow: true, name: 'profile', title: 'Profile' },
        { isShow: true, name: 'profileAbb', title: 'Profile' },
        { isShow: true, name: 'page', title: 'Page' },
        { isShow: true, name: 'request', title: 'Request' },
        { isShow: true, name: 'warning', title: 'Warning' },
        { isShow: true, name: 'language', title: 'Language' },
        { isShow: true, name: 'specialization', title: 'Specialization' },
        { isShow: true, name: 'indication', title: 'Indication' },
        { isShow: true, name: 'valid', title: 'Valid' },
        { isShow: true, name: 'status', title: 'Status' },
    ]);

    // Group By Items
    const [groupByItems, setGroupByItems] = useState([
        { id: '0', isShow: true, content: ' ', columnName: 'link' },
        { id: '1', isShow: true, content: 'Global Brand', columnName: 'globalBrand' },
        { id: '2', isShow: true, content: 'Profile', columnName: 'profile' },
        { id: '3', isShow: true, content: 'Profile', columnName: 'profileAbb' },
        { id: '4', isShow: true, content: 'Page', columnName: 'page' },
        { id: '5', isShow: true, content: 'Request', columnName: 'request' },
        { id: '6', isShow: true, content: 'Warning', columnName: 'warning' },
        { id: '7', isShow: true, content: 'Language', columnName: 'language' },
        { id: '8', isShow: true, content: 'Specialization', columnName: 'specialization' },
        { id: '9', isShow: true, content: 'Indication', columnName: 'indication' },
        { id: '10', isShow: true, content: 'Valid', columnName: 'valid' },
        { id: '11', isShow: true, content: 'Status', columnName: 'status' },
    ]);

    // Summary
    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'link', width: 150 },
        { type: 'count', columnName: 'globalBrand', width: 150 },
        { type: 'count', columnName: 'profile', width: 150 },
        { type: 'count', columnName: 'profileAbb', width: 150 },
        { type: 'count', columnName: 'page', width: 150 },
        { type: 'count', columnName: 'request', width: 150 },
        { type: 'count', columnName: 'warning', width: 150 },
        { type: 'count', columnName: 'language', width: 150 },
        { type: 'count', columnName: 'specialization', width: 150 },
        { type: 'count', columnName: 'indication', width: 150 },
        { type: 'count', columnName: 'valid', width: 150 },
        { type: 'count', columnName: 'status', width: 150 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'link', width: 150 },
        { type: 'count', columnName: 'globalBrand', width: 150 },
        { type: 'count', columnName: 'profile', width: 150 },
        { type: 'count', columnName: 'profileAbb', width: 150 },
        { type: 'count', columnName: 'page', width: 150 },
        { type: 'count', columnName: 'request', width: 150 },
        { type: 'count', columnName: 'warning', width: 150 },
        { type: 'count', columnName: 'language', width: 150 },
        { type: 'count', columnName: 'specialization', width: 150 },
        { type: 'count', columnName: 'indication', width: 150 },
        { type: 'count', columnName: 'valid', width: 150 },
        { type: 'count', columnName: 'status', width: 150 },
    ]);

    const [columnOrders, setColumnOrders] = useState([
        'link',
        'globalBrand',
        'profile',
        'profileAbb',
        'page',
        'request',
        'warning',
        'language',
        'specialization',
        'indication',
        'valid',
        'status',
    ]);

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

    const tableData = filterData.map((item, index) => ({
        id: item?.id,
        link: (
            <div className="visit-content__table-icons">
                <button onClick={() => whereItLinked(item)}>
                    <Icon
                        path={mdiLinkVariantOff}
                        size={0.85}
                        color={item?.usingNeedIds?.length > 0 ? '#00A0DF' : '#6C757D'}
                    />
                </button>
            </div>
        ),
        globalBrand: item?.brand?.globalBrandName,
        profile: (
            <Tippy content={item?.profileName} placement="left">
                <span>{item?.profileName}</span>
            </Tippy>
        ),
        profileAbb: <div className="visit-content__table-icons">{`PRF${item?.profileId}`}</div>,
        page:
            item?.productPages === null || item?.productPages?.length === 0 ? (
                <div className="visit-content__table-icons">
                    <Link to={`/apps/templates/connect=${item.id}&product=Profile&sub=false`}>
                        <Icon path={mdiPlus} size={0.85} color="#6C757D" />
                    </Link>
                </div>
            ) : (
                <div className="visit-content__table-icons">
                    <Link to={`/apps/templates/templatedetails=${item?.id}&Product=Profile`}>
                        <Icon path={mdiSquareEditOutline} size={0.85} color="#6C757D" />
                    </Link>
                </div>
            ),
        request: <div className="visit-content__table-icons">-</div>,
        warning: <div className="visit-content__table-icons">-</div>,
        language: <div className="visit-content__table-icons">{item?.language?.languageAbb}</div>,
        specialization: (
            <Tippy
                content={item.spec?.map((x, idx) => (
                    <>
                        <span style={{ fontSize: '12px' }}>
                            <i className="fas fa-circle" style={{ fontSize: '9px' }}></i> {x.specName}
                        </span>
                        <br />
                    </>
                ))}
                placement="left">
                <span>
                    {item.spec?.map((i, idx) => (
                        <span>
                            {i.specAbb}
                            {item.spec.length - 1 !== idx && ', '}{' '}
                        </span>
                    ))}
                </span>
            </Tippy>
        ),
        indication: item?.indication?.indication,
        valid: (
            <div className="visit-content__table-icons">
                <Form.Check
                    type="switch"
                    style={{ fontSize: '.9rem' }}
                    onChange={(e) => changeValid(item?.id, e.target.checked, item?.isApproved)}
                    defaultChecked={item?.validStatus}
                />
            </div>
        ),
        status: (
            <Tippy disabled={item?.isApproved !== 4 ? true : false} content={item?.rejectReason} placement="left">
                <Status approveStatus={item?.isApproved} />
            </Tippy>
        ),
    }));

    const getFilterData = () => {
        if (
            filterComponentsData[0].state.length === 0 ||
            filterComponentsData[1].state.length === 0 ||
            filterComponentsData[2].state.length === 0 ||
            filterComponentsData[3].state.length === 0 ||
            filterComponentsData[5].state.length === 0 ||
            filterComponentsData[6].state.length === 0 ||
            filterComponentsData[7].state.length === 0
        ) {
            return;
        }
        setLoader(true);
        const data = {
            brandIds: filterComponentsData[0].state.map((item) => item.value),
            specIds: filterComponentsData[1].state.map((item) => item.value),
            indicationIds: filterComponentsData[2].state.map((item) => item.value),
            profileIds: filterComponentsData[3].state.map((item) => item.value),
            languageIds: filterComponentsData[5].state.map((item) => item.value),
            statuses: filterComponentsData[6].state.map((item) => item.value),
            isLink:
                filterComponentsData[7].state.length === 2
                    ? [true, true]
                    : filterComponentsData[7].state[0].value === 0
                    ? [false]
                    : [true],
        };

        FetchApiPost('services/Pages/Profile/GetAllProfileFilter', 'POST', data).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    // setFilterData(data);
                    setLoader(false);
                    setCloseFilter(true);
                    let newData = data.map((item) => {
                        if (!item.profileName || !item.indication.indication) {
                            if (item.isApproved === 1) {
                                // statüyü missinge çek
                                return changeStatus(item, 0);
                            } else {
                                return item;
                            }
                        } else if (item.profileName && item.indication.indication && item.isApproved === 0) {
                            // statüyü redact a çek
                            return changeStatus(item, 1);
                        } else {
                            return item;
                        }
                    });
                    setFilterData(newData);
                });
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
                    isFilters={true}
                    setCloseFilter={setCloseFilter}
                    closeFilter={closeFilter}
                    filters={
                        <Filter
                            filterComponentsData={filterComponentsData.filter((item) => item.label !== 'need')}
                            getAllFilterData={getFilterData}
                            setCloseFilter={setCloseFilter}
                            deleteFilter={deleteFilter}
                            isFilterBtn={true}
                        />
                    }
                />
            </Spin>

            {linkedModal && (
                <WhereLinkedModal modalShow={linkedModal} setModalShow={setLinkedModal} linkedData={linkedData} />
            )}
        </div>
    );
};

export default Profile;
