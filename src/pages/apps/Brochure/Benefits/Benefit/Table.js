import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../../components/MainTable';
import AddBenefitModal from './AddBenefitModal';
import Filter from './Filter';
import { mdiLinkVariantOff, mdiEyeOutline, mdiPlus, mdiDotsVertical, mdiLeadPencil, mdiSendCheck, mdiDeleteOutline, mdiCircleEditOutline, mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { benefitPageButtonDatas, benefitTab } from '../../../../../redux/actions';
import UpdateBenefit from './UpdateBenefit';
import Delete from './Delete';
import Reject from './Reject';
import ArchiveModal from './ArchiveModal';
import DuplicateModal from './DuplicateModal';
import ActionModal from './ActionModal';
import { useHistory } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import SendIcon from '../../../../../components/Icons/SendIcon';
import Dropdowns from '../../../../../components/Dropdowns';
import { statusApprovalOptions, statusApprovedOptions, statusRedactOptions, statusRejectOptions } from './Statuses';
import ContentModal from './ContentModal';
import Duplicate from './Duplicate';

const Table = ({ tableData, setTableData }) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const [isFilter, setIsFilter] = useState(true);
    console.log(isFilter);
    console.log(tableData);
    const [benefitModal, setBenefitModal] = useState(false);

    const [needModal, setNeedModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [needId, setNeedId] = useState(null);

    const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
    const [updateBenefitData, setUpdateBenefitData] = useState(null);

    console.log(updateBenefitData);

    const [isShowArchive, setIsShowArchive] = useState(false);
    const [archiveData, setArchiveData] = useState(null);

    const [rejectId, setRejectId] = useState(null);
    const [rejectData, setRejectData] = useState(null);

    const [isShowDuplicate, setIsShowDuplicate] = useState(false);
    const [duplicateData, setDuplicateData] = useState(null);

    const [showActionModal, setShowActionModal] = useState(false);
    const [actionModalData, setActionModalData] = useState(null);

    const [showContentModal, setShowContentModal] = useState(false);
    const [contentData, setContentData] = useState(null);

    const [exportTableData, setExportTableData] = useState([]);



    //Export Columns
    const [exportColumns] = useState([
        { name: 'company', title: t('Company') },
        { name: 'position', title: t('Position') },
        { name: 'businessUnıte', title: t('Business Unite') },
        { name: 'productZoneorArea', title: t('Product/Zone or Area') },
    ])

    const [columns] = useState([
        { name: 'link', title: t('Link') },
        { name: 'country', title: t('Country') },
        { name: 'product', title: t('Product') },
        { name: 'benefit', title: t('Benefit') },
        { name: 'benefitId', title: t('Benefit Id') },
        { name: 'content', title: t('Content') },
        { name: 'languages', title: t('Language') },
        { name: 'page', title: t('Page') },
        { name: 'specialization', title: t('Specialization') },
        { name: 'indication', title: t('Indication') },
        { name: 'profile', title: t('Profile') },
        { name: 'mechanismOfAction', title: t('Mechanism of Action') },
        { name: 'status', title: t('Status') },
        { name: 'actions', title: ' ' },

    ]);

    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'link', width: "8%" },
        { columnName: 'country', width: "15%" },
        { columnName: 'product', width: "10%" },
        { columnName: 'benefit', width: "10%" },
        { columnName: 'benefitId', width: "10%" },
        { columnName: 'content', width: "10%" },
        { columnName: 'languages', width: "15%" },
        { columnName: 'page', width: "10%" },
        { columnName: 'specialization', width: "20%" },
        { columnName: 'indication', width: "15%" },
        { columnName: 'profile', width: "10%" },
        { columnName: 'mechanismOfAction', width: "15%" },
        { columnName: 'status', width: "10%" },
        { columnName: 'actions', width: "3%" },
    ]);

    const [tableColumnExtensions] = useState([
        { columnName: 'link', width: "8%" },
        { columnName: 'country', width: "22%" },
        { columnName: 'product', width: "10%" },
        { columnName: 'benefit', width: "10%" },
        { columnName: 'benefitId', width: "10%" },
        { columnName: 'content', width: "22%" },
        { columnName: 'languages', width: "26%" },
        { columnName: 'page', width: "26%" },
        { columnName: 'specialization', width: "8%" },
        { columnName: 'indication', width: "5%" },
        { columnName: 'profile', width: "10%" },
        { columnName: 'mechanismOfAction', width: "10%" },
        { columnName: 'status', width: "25px" },
        { columnName: 'actions', width: "5%" },

    ]);

    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Link', columnName: 'link', width: 100 },
        { id: '2', isFreeze: false, content: 'Country', columnName: 'country', width: 100 },
        { id: '3', isFreeze: false, content: 'Product', columnName: 'product', width: 100 },
        { id: '4', isFreeze: false, content: 'Benefit', columnName: 'benefit', width: 100 },
        { id: '5', isFreeze: false, content: 'Benefit Id', columnName: 'benefitId', width: 100 },
        { id: '6', isFreeze: false, content: 'Content', columnName: 'content', width: 100 },
        { id: '7', isFreeze: false, content: 'Language', columnName: 'languages', width: 100 },
        { id: '8', isFreeze: false, content: 'Page', columnName: 'page', width: 100 },
        { id: '9', isFreeze: false, content: 'Specialization', columnName: 'specialization', width: 100 },
        { id: '10', isFreeze: false, content: 'Indication', columnName: 'indication', width: 100 },
        { id: '11', isFreeze: false, content: 'Profile', columnName: 'profile', width: 100 },
        { id: '12', isFreeze: false, content: 'Mechanism of Action', columnName: 'mechanismOfAction', width: 100 },
        { id: '13', isFreeze: false, content: 'Status', columnName: 'status', width: 100 },
    ];

    const [groupByItems, setGroupByItems] = useState([
        { id: '1', isShow: true, content: t('Link'), columnName: 'link', width: 100 },
        { id: '2', isShow: true, content: t('Country'), columnName: 'country', width: 100 },
        { id: '3', isShow: true, content: t('Product'), columnName: 'product', width: 100 },
        { id: '4', isShow: true, content: t('Benefit'), columnName: 'benefit', width: 100 },
        { id: '5', isShow: true, content: t('Benefit Id'), columnName: 'benefitId', width: 100 },
        { id: '6', isShow: true, content: t('Content'), columnName: 'content', width: 100 },
        { id: '7', isShow: true, content: t('Language'), columnName: 'languages', width: 100 },
        { id: '8', isShow: true, content: t('Page'), columnName: 'page', width: 100 },
        { id: '9', isShow: true, content: t('Specialization'), columnName: 'specialization', width: 100 },
        { id: '10', isShow: true, content: t('Indication'), columnName: 'indication', width: 100 },
        { id: '11', isShow: true, content: t('Profile'), columnName: 'profile', width: 100 },
        { id: '12', isShow: true, content: t('Mechanism of Action'), columnName: 'mechanismOfAction', width: 100 },
        { id: '13', isShow: true, content: t('Status'), columnName: 'status', width: 100 },
    ]);

    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([

        { isShow: true, title: t('Link'), name: 'link' },
        { isShow: true, title: t('Country'), name: 'country' },
        { isShow: true, title: t('Product'), name: 'product' },
        { isShow: true, title: t('Benefit'), name: 'benefit' },
        { isShow: true, title: t('Benefit Id'), name: 'benefitId' },
        { isShow: true, title: t('Content'), name: 'content' },
        { isShow: true, title: t('Language'), name: 'languages' },
        { isShow: true, title: t('Page'), name: 'page' },
        { isShow: true, title: t('Specialization'), name: 'specialization' },
        { isShow: true, title: t('Indication'), name: 'indication' },
        { isShow: true, title: t('Profile'), name: 'profile' },
        { isShow: true, title: t('Mechanism of Action'), name: 'mechanismOfAction' },
        { isShow: true, title: t('Status'), name: 'status' },
    ]);

    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'link' },
        { type: 'count', columnName: 'country' },
        { type: 'count', columnName: 'product' },
        { type: 'count', columnName: 'benefit' },
        { type: 'count', columnName: 'benefitId' },
        { type: 'count', columnName: 'content' },
        { type: 'count', columnName: 'languages' },
        { type: 'count', columnName: 'page' },
        { type: 'count', columnName: 'specialization' },
        { type: 'count', columnName: 'indication' },
        { type: 'count', columnName: 'profile' },
        { type: 'count', columnName: 'mechanismOfAction' },
        { type: 'count', columnName: 'status' },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'link' },
        { type: 'count', columnName: 'country' },
        { type: 'count', columnName: 'product' },
        { type: 'count', columnName: 'benefit' },
        { type: 'count', columnName: 'benefitId' },
        { type: 'count', columnName: 'content' },
        { type: 'count', columnName: 'languages' },
        { type: 'count', columnName: 'page' },
        { type: 'count', columnName: 'specialization' },
        { type: 'count', columnName: 'indication' },
        { type: 'count', columnName: 'profile' },
        { type: 'count', columnName: 'mechanismOfAction' },
        { type: 'count', columnName: 'status' },
    ]);

    const [columnOrders, setColumnOrders] = useState(['link', 'country', 'product', 'benefit', 'benefitId', 'content', 'languages', 'page', 'specialization', 'indication', 'profile', 'mechanismOfAction', 'status', 'actions']);
    const addBenefitModal = () => {
        setBenefitModal(true);
    }

    const [actionItem, setActionItem] = useState({ id: 0, statusId: 99, name: '' });

    console.log(actionItem);

    const statusClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );
        const statusId = Number(getIds[0]);
        const itemId = Number(getIds[1]);
        const itemName = getIds[2];

        console.log(getIds);
        console.log(statusId);
        setActionItem({ id: itemId, statusId: statusId, name: itemName });
        if (statusId === 0) {
            setShowDeleteModal(true);
        }
        if (statusId === 1 || statusId === 2 || statusId === 3) {
            setShowActionModal(true);
        }
        if (statusId === 4) {
            setShowRejectModal(true);
        }
        if (statusId === 6) {
            setIsShowDuplicate(true);
        }
        if (statusId === 9) {
            const findNeedById = tableData.find((obj) => obj.id === itemId);
            setUpdateBenefitData(findNeedById)
            setIsShowUpdateModal(true);
        }
    };



    const editableOptions = [
        {
            id: 8,
            value: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        // {
        //     id: 1,
        //     value: 'Editable',
        //     icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
        //     backgroundColor: '#6C757D',
        //     color: '#FFFFFF',
        // },
        {
            id: 2, value: 'Approval', icon: <Icon path={mdiCheck}
                size={1}
                color="#6c757d"
            />, backgroundColor: '#FFBC00', color: '#FFFFFF'
        },
        {
            id: 0,
            value: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
        // {
        //     id: 3,
        //     value: 'Update',
        //     icon: <i style={{ marginRight: '8px' }} className="fas fa-arrow"></i>,
        //     color: '#FFBC00',
        // },

    ]

    const rejectOptions = [
        {
            id: 1,
            value: 'Editable',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        { id: 7, value: 'Archive', icon: <i style={{ marginRight: '8px' }} className="fas fa-archive"></i> },
        {
            id: 3,
            value: 'Approved',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-check"></i>,
            backgroundColor: '#0ACF97',
            color: '#0ACF97',
        }
    ];

    const approvalOptions = [
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
    const approvedOptions = [
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
        {
            id: 5, value: 'Force Edit', icon: <Icon path={mdiCircleEditOutline}
                size={1}
                color="#6c757d"
            />
        },
        { id: 6, value: 'Duplicate', icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i> },
        { id: 7, value: 'Archive', icon: <i style={{ marginRight: '8px' }} className="fas fa-archive"></i> },
    ];

    const statusOptions = [
        {
            id: 1,
            value: 'Editable',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        {
            id: 2, value: 'Approval', icon: <Icon
                path={mdiSendCheck}
                title="Approval"
                size={1}
                horizontal
                vertical
                color="#fff" />, backgroundColor: '#FFBC00', color: '#FFFFFF'
        },
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
        {
            id: 5, value: 'Force Edit', icon: <Icon
                path={mdiSendCheck}
                title="Approval"
                size={1}
                horizontal
                vertical
                color="#fff" />
        },
        { id: 6, value: 'Duplicate', icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i> },
        { id: 7, value: 'Archive', icon: <i style={{ marginRight: '8px' }} className="fas fa-archive"></i> },
        { id: 8, value: 'Edit', icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i> },
    ];

    const openContent = (obj) => {
        setShowContentModal(true);
        setContentData(obj);
    };

    const dropDownItemClick = (e) => {
        const ids = e.target.id.split(' ');
        const selectedStatus = statusOptions.find((el) => el.id === Number(ids[1]));
        
        if (selectedStatus.value === 'Reject') {
            const item = tableData.find((el) => el.id === Number(ids[0]));
            setRejectData(item);
            setRejectId(item.id);
            setShowRejectModal(true);
        }
        if (selectedStatus.value === 'Edit') {
            const item = tableData.find((el) => el.id === Number(ids[0]));
            setUpdateBenefitData(item);
            setIsShowUpdateModal(true);
        }
        if (selectedStatus.value === 'Delete') {
            const item = tableData.find((el) => el.id === Number(ids[0]));
            setNeedId(Number(item.id));
            setShowDeleteModal(true);
        }
        if (selectedStatus.value === 'Duplicate') {
            const item = tableData.find((el) => el.id === Number(ids[0]));
            setIsShowDuplicate(true);
            setDuplicateData(item);
        }
        if (selectedStatus.value === 'Archive') {
            const item = tableData.find((el) => el.id === Number(ids[0]));
            setArchiveData(item);
            setIsShowArchive(true);
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
            // let changedData = {};
            // const arr = tableData.map((el, i) => {
            //     if (el.id === Number(ids[0])) {
            //         changedData = {
            //             benefitId: el.id,
            //             approveStatus: selectedStatus.value === "Editable" ? 1 : selectedStatus.value === "Approval" ? 2 : selectedStatus.value === "Approved" ? 3 : 4,
            //             approverName: selectedStatus.value === "Editable" ? null : selectedStatus.value === "Approval" ? null : selectedStatus.value === "Approved" ? localStorage.getItem('userName') : 4,
            //             rejectReason: null,  
            //         };
            //         return { ...el, status: selectedStatus.value, approveStatus: selectedStatus.id };
            //     }
            //     return el;
            // });
            // FetchApiPost('services/Pages/Benefit/ApproveBenefit', 'POST', changedData);
            // setTableData(arr);
        }
    };

    const handleClickPageButton = async (data) => {
        console.log(data);
        await dispatch(benefitPageButtonDatas({
                    product: {
                        value: data.brandId,
                        label: data.brandName,
                    },
                    indication: {
                        value: data.indicationId,
                        label: data.indicationName,
                    },
                    profile: {
                        value: data.profileId,
                        label: data.profileName,
                    },
                    need: {
                        value: data.needResponses.needId,
                        label: data.needResponses.needName
                    },
                    specialization: [
                        data.specializations.map(item => {
                            return {
                                value: item.specId,
                                label: item.specName,
                                specAbb: item.specAbb
                            }
                        })
                    ]
                }));

        // await setSelectedTab("Page List");
        await dispatch(benefitTab("Page List"));
    }

    const action = tableData.map((el, i) => ({
        id: el.id,
        content: (
            <span className="table-dropdown">
                <Dropdown as={ButtonGroup} >
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <i style={{ fontSize: '20px' }} className="fas fa-ellipsis-v"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-container">
                        {el.approveStatus === 1 && //'Editable'
                            editableOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.id} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 0 || item.id === 4 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {item.value}
                                </Dropdown.Item>
                            ))}
                        {el.approveStatus === 2 && // Approval
                            approvalOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.id} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 0 || item.id === 3 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {item.value}
                                </Dropdown.Item>
                            ))}
                        {el.approveStatus === 3 && // Approved
                            approvedOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.id} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 4 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {item.value}
                                </Dropdown.Item>
                            ))}
                        {el.approveStatus === 4 && // Reject
                            rejectOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.id} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 3 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {item.value}
                                </Dropdown.Item>
                            ))}
                    </Dropdown.Menu>
                </Dropdown>
            </span>
        ),
    }));

    const needTable = tableData?.map((el, index) => ({
        id: el.id,
        benefit: el.benefitName,
        benefitId: el.abb,
        content: (
            <span
                className="page-area"
                onClick={() => openContent({ id: el.id, content: el.content, status: el.approveStatus })}>
                <Icon path={mdiEyeOutline} title="Content" size={0.8} horizontal vertical color="#6c757d" />
            </span>
        ),
        languages: el.language.language,
        link: <a href={el.link} target="_blank" rel="noreferrer" className="page-area">
            <Icon path={mdiLinkVariantOff}
                title="Link"
                size={0.8}
                color="#6c757d"
            />
        </a>,
        country: el.country,
        product: el.productName,
        specialization:(
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
        mechanismOfAction: 'mete',
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
        need: (
            <Tippy
                content={el.needs?.map((x, idx) => (
                    <>
                        <span style={{ fontSize: '12px' }}>
                            <i className="fas fa-circle" style={{ fontSize: '9px' }}></i> {x.needName}
                        </span>
                        <br />
                    </>
                ))}
                placement="left">
                <span>
                    {el.needs?.map((item, idx) => (
                        <span>
                            {item.needName}
                            {el.needs.length - 1 !== idx && ', '}{' '}
                        </span>
                    ))}
                </span>
            </Tippy>
        ),
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
                    color="#6c757d"
                />
            </span>
        ),
        status: (
            <>
            {
                el.approveStatus === 4
                ?<Tippy content={
                    <>
                                <span style={{ fontSize: '12px' }}>
                                    {el.rejectReason}
                                </span>
                                <br />
                            </>
                        }
                        placement='left'
                    >
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
                                            : {}
                        }
                        className="status-title">
                        {el.approveStatus === 1 && <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>}
                        {el.approveStatus === 2 && <SendIcon />}
                        {el.approveStatus === 3 && <i style={{ marginRight: '8px' }} className="fas fa-check"></i>}
                        {el.approveStatus === 4 && <i style={{ marginRight: '8px' }} className="fas fa-exclamation"></i>}
                        {el.approveStatus === 1 && t('Redact')}
                        {el.approveStatus === 2 && t('Approval')}
                        {el.approveStatus === 3 && t('Approved')}
                        {el.approveStatus === 4 && t('Reject')}
                    </span>
                    </Tippy>
                :
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
                                            : {}
                        }
                        className="status-title">
                        {el.approveStatus === 1 && <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>}
                        {el.approveStatus === 2 && <SendIcon />}
                        {el.approveStatus === 3 && <i style={{ marginRight: '8px' }} className="fas fa-check"></i>}
                        {el.approveStatus === 4 && <i style={{ marginRight: '8px' }} className="fas fa-exclamation"></i>}
                        {el.approveStatus === 1 && t('Redact')}
                        {el.approveStatus === 2 && t('Approval')}
                        {el.approveStatus === 3 && t('Approved')}
                        {el.approveStatus === 4 && t('Reject')}
                    </span>
            }
            
            
            </>
        ),
        actions: (
            <Dropdowns
                item={`?${el.id}?${el.needName}`}
                option={
                    el.approveStatus === 1
                        ? statusRedactOptions
                        : el.approveStatus === 2
                            ? statusApprovalOptions
                            : el.approveStatus === 3
                                ? statusApprovedOptions
                                : el.approveStatus === 4
                                    ? statusRejectOptions
                                    : []
                }
                onClick={statusClick}
            />
        )
    }));

    // Get all benefit
    // useEffect(() => {
    //   FetchApiGet('services/Pages/Benefit/GetAllBenefits','GET')
    //   .then((res) =>
    //         (async () => {
    //             try {
    //                 if (res.status === 200) {
    //                     res.json().then((data) => {
    //                        setTableData(data.data)
    //                     });
    //                 } else if (res.status === 500) {
    //                     history.push('/error-500');
    //                 }
    //             } catch (error) {
    //                 console.log('error', error);
    //             }
    //         })()
    //     );
    // }, [history, setTableData])

    return (
        <div id="page-list-table">
            <MainTable
                tableData={needTable}
                exportTableData={exportTableData}
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
                addButtonFunction={addBenefitModal}
                isFilters={isFilter}
                setIsFilters={setIsFilter}
                filters={
                    <Filter
                        setTableData={setTableData}
                        isFilter={isFilter}
                        setIsFilters={setIsFilter}
                    />
                }
            />

            {
                benefitModal &&
                <AddBenefitModal
                    isShow={benefitModal}
                    setIsShow={setBenefitModal}
                    setTableData={setTableData}
                />
            }
            {
                showRejectModal &&
                <Reject
                    modalShow={showRejectModal}
                    setModalShow={setShowRejectModal}
                    needId={actionItem}
                    tableData={tableData}
                    setTableData={setTableData}
                    data={rejectData}
                />
            }
            {
                showDeleteModal &&
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    tableData={tableData}
                    setTableData={setTableData}
                    needId={actionItem}
                />
            }
            {
                isShowArchive &&
                <ArchiveModal
                    modalShow={isShowArchive}
                    setModalShow={setIsShowArchive}
                    data={archiveData}
                />
            }

            {
                isShowUpdateModal &&
                <UpdateBenefit
                    isShowUpdateModal={isShowUpdateModal}
                    setIsShowUpdateModal={setIsShowUpdateModal}
                    updateBenefitData={updateBenefitData}
                    tableData={tableData}
                    setTableData={setTableData}
                />
            }

            {
                showActionModal &&
                <ActionModal
                    modalShow={showActionModal}
                    setModalShow={setShowActionModal}
                    item={actionItem}
                    tableData={tableData}
                    setTableData={setTableData}
                />
            }

            {showContentModal && (
                <ContentModal
                    showModal={showContentModal}
                    setShowModal={setShowContentModal}
                    contentData={contentData}
                    tableData={tableData}
                    setTableData={setTableData}
                />
            )}

            {
                isShowDuplicate && (
                    <Duplicate isShow={isShowDuplicate} setIsShow={setIsShowDuplicate} />
                )
            }
        </div>
    )
}

export default Table