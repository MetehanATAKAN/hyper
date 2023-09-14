import React, { useState } from 'react'
import Table from './Table'
import { mdiLinkVariant, mdiCheck, mdiCircleEditOutline, mdiSendCheck, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react'
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ActionModal from './ActionModal';
import Delete from './Delete';
import Reject from './Reject';
import { useDispatch } from 'react-redux';
import { promoSubjectPagesDatas } from '../../../../redux/actions';
import { useTranslation } from 'react-i18next';

const PromoSubjectIndex = () => {


    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [needId, setNeedId] = useState(null);

    const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
    const [updateBenefitData, setUpdateBenefitData] = useState(null);

    const [isShowArchive, setIsShowArchive] = useState(false);
    const [archiveData, setArchiveData] = useState(null);

    const [rejectId, setRejectId] = useState(null);
    const [rejectData, setRejectData] = useState(null);

    const [isShowDuplicate, setIsShowDuplicate] = useState(false);
    const [duplicateData, setDuplicateData] = useState(null);

    const [showActionModal, setShowActionModal] = useState(false);
    const [actionModalData, setActionModalData] = useState(null);

    const [pagesData, setPagesData] = useState(null);

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

    const dropDownItemClick = (e) => {
        const ids = e.target.id.split(' ');
        const selectedStatus = statusOptions.find((el) => el.id === Number(ids[1]));
        console.log(selectedStatus);
        console.log(ids);
        console.log('item click de');
        if (selectedStatus.value === 'Reject') {
            const item = tableData.find((el) => el.id === Number(ids[0]));
            setRejectData(item);
            setRejectId(item.id);
            setShowRejectModal(true);
        }
        if (selectedStatus.value === 'Edit') {
            const item = tableData.find((el) => el.id === Number(ids[0]));
            console.log(item);
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

    const actions = (id, approveStatus) => {

        return (
            <span className="table-dropdown">
                <Dropdown as={ButtonGroup} >
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <i style={{ fontSize: '20px' }} className="fas fa-ellipsis-v"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-container">
                        {approveStatus === 1 && //'Editable'
                            editableOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${id} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 0 || item.id === 4 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {item.value}
                                </Dropdown.Item>
                            ))
                        }
                        {approveStatus === 2 && // Approval
                            approvalOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${id} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 0 || item.id === 3 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {item.value}
                                </Dropdown.Item>
                            ))}
                        {approveStatus === 3 && // Approved
                            approvedOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${id} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 4 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {item.value}
                                </Dropdown.Item>
                            ))}
                        {approveStatus === 4 && // Reject
                            rejectOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${id} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 3 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {item.value}
                                </Dropdown.Item>
                            ))}
                    </Dropdown.Menu>
                </Dropdown>
            </span>
        )
    }

    const status = (approveStatus) => {
        console.log('status çağırıldı', approveStatus);
        return (
            <div
                style={
                    approveStatus === 1 //Editable
                        ? {
                            backgroundColor: '#6C757D'
                        }
                        : approveStatus === 2 //'Approval'
                            ? {
                                backgroundColor: '#FFBC00'
                            }
                            : approveStatus === 3 //'Approved'
                                ? {
                                    backgroundColor: '#0ACF97'
                                }
                                : approveStatus === 4 // Reject
                                    ? {
                                        backgroundColor: '#FF5B5C'
                                    }
                                    : {}
                }
                className="status-title">
                {
                    approveStatus === 1 &&
                    <div
                        className="status-title-name"
                    >
                        <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>
                        <span>Editable</span>
                    </div>
                }
                {
                    approveStatus === 2 &&
                    <div className="status-title-name">
                        <Icon
                            path={mdiSendCheck}
                            title="Approval"
                            size={1}
                            horizontal
                            vertical
                            color="#fff" />
                        <span>Approval</span>
                    </div>
                }
                {
                    approveStatus === 3 &&
                    <div className="status-title-name">
                        <i style={{ marginRight: '8px' }} className="fas fa-check"></i>
                        <span>Approved</span>
                    </div>
                }
                {
                    approveStatus === 4 &&
                    <div className="status-title-name">
                        <i style={{ marginRight: '10px' }} className="fas fa-exclamation"></i>
                        <span>Reject</span>
                    </div>
                }
            </div>
        )
    }

    const deneme = [
        {
            approveStatus: 1,
            id: 23,
            product: 'Almiba',
            promoSubject: 'Promo Subject Name1',
            need: 'N-01',
            benefit: 'B-01,B-02,B-03',
            specialization: 'KA, GNP',
            orgType: 'Hospital',
        }
    ]

    const [approveStatus, setapproveStatus] = useState(1);
    const [id, setid] = useState(23);
    const [tableData, setTableData] = useState([]
        // deneme.map(data => (
        //     {
        //         approveStatus: data.approveStatus,
        //         id: data.id,
        //         link: (
        //             <Icon path={mdiLinkVariant} size={1} />
        //         ),
        //         product: 'Almiba',
        //         promoSubject: 'Promo Subject Name1',
        //         need: 'N-01',
        //         needId:131,
        //         benefit: 'B-01,B-02,B-03',
        //         benefitIds :[1, 2],
        //         specialization: 'KA, GNP',
        //         orgType: 'Hospital',
        //         visitStracture: (
        //             <div className='text-center'>
        //                 <Icon path={mdiPlus} size={1} />
        //             </div>
        //         ),
        //         page: (
        //             <Link
        //                 to={{
        //                     pathname: `/passport-of-products/pages`,
        //                     search: `?id=${23}`,
        //                     // hash: "#the-hash",
        //                     // state: { Details: true }
        //                 }}
        //                 style={{ color: '#6C757D' }}
        //             >
        //                 <div className='text-center'>
        //                     <Icon path={mdiPlus} size={1} />
        //                 </div>
        //             </Link>
        //         ),
        //         actions: (
        //             <span className="table-dropdown">
        //                 <Dropdown as={ButtonGroup} >
        //                     <Dropdown.Toggle variant="light" id="dropdown-basic">
        //                         <i style={{ fontSize: '20px' }} className="fas fa-ellipsis-v"></i>
        //                     </Dropdown.Toggle>
        //                     <Dropdown.Menu className="dropdown-menu-container">
        //                         {data.approveStatus === 1 && //'Editable'
        //                             editableOptions.map((item, i) => (
        //                                 <Dropdown.Item
        //                                     as="button"
        //                                     eventKey={item.id}
        //                                     id={`${id} ${item.id}`}
        //                                     onClick={dropDownItemClick}
        //                                     style={item.id === 0 || item.id === 4 ? { color: `${item.color}` } : {}}>
        //                                     {item.icon} {item.value}
        //                                 </Dropdown.Item>
        //                             ))
        //                         }
        //                         {data.approveStatus === 2 && // Approval
        //                             approvalOptions.map((item, i) => (
        //                                 <Dropdown.Item
        //                                     as="button"
        //                                     eventKey={item.id}
        //                                     id={`${id} ${item.id}`}
        //                                     onClick={dropDownItemClick}
        //                                     style={item.id === 0 || item.id === 3 ? { color: `${item.color}` } : {}}>
        //                                     {item.icon} {item.value}
        //                                 </Dropdown.Item>
        //                             ))}
        //                         {data.approveStatus === 3 && // Approved
        //                             approvedOptions.map((item, i) => (
        //                                 <Dropdown.Item
        //                                     as="button"
        //                                     eventKey={item.id}
        //                                     id={`${id} ${item.id}`}
        //                                     onClick={dropDownItemClick}
        //                                     style={item.id === 4 ? { color: `${item.color}` } : {}}>
        //                                     {item.icon} {item.value}
        //                                 </Dropdown.Item>
        //                             ))}
        //                         {data.approveStatus === 4 && // Reject
        //                             rejectOptions.map((item, i) => (
        //                                 <Dropdown.Item
        //                                     as="button"
        //                                     eventKey={item.id}
        //                                     id={`${id} ${item.id}`}
        //                                     onClick={dropDownItemClick}
        //                                     style={item.id === 3 ? { color: `${item.color}` } : {}}>
        //                                     {item.icon} {item.value}
        //                                 </Dropdown.Item>
        //                             ))}
        //                     </Dropdown.Menu>
        //                 </Dropdown>
        //             </span>
        //         ),
        //         renk: (
        //             data.approveStatus === 1 //Editable
        //                 ? {
        //                     backgroundColor: '#6C757D'
        //                 }
        //                 : data.approveStatus === 2 //'Approval'
        //                     ? {
        //                         backgroundColor: '#FFBC00'
        //                     }
        //                     : data.approveStatus === 3 //'Approved'
        //                         ? {
        //                             backgroundColor: '#0ACF97'
        //                         }
        //                         : data.approveStatus === 4 // Reject
        //                             ? {
        //                                 backgroundColor: '#FF5B5C'
        //                             }
        //                             : {}
        //         ),
        //         status: (
        //             <div
        //                 style={
        //                     data.approveStatus === 1 //Editable
        //                         ? {
        //                             backgroundColor: '#6C757D'
        //                         }
        //                         : data.approveStatus === 2 //'Approval'
        //                             ? {
        //                                 backgroundColor: '#FFBC00'
        //                             }
        //                             : data.approveStatus === 3 //'Approved'
        //                                 ? {
        //                                     backgroundColor: '#0ACF97'
        //                                 }
        //                                 : data.approveStatus === 4 // Reject
        //                                     ? {
        //                                         backgroundColor: '#FF5B5C'
        //                                     }
        //                                     : {}
        //                 }
        //                 className="status-title">
        //                 {
        //                     data.approveStatus === 1 &&
        //                     <div
        //                         className="status-title-name"
        //                     >
        //                         <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>
        //                         <span>Editable</span>
        //                     </div>
        //                 }
        //                 {
        //                     data.approveStatus === 2 &&
        //                     <div className="status-title-name">
        //                         <Icon
        //                             path={mdiSendCheck}
        //                             title="Approval"
        //                             size={1}
        //                             horizontal
        //                             vertical
        //                             color="#fff" />
        //                         <span>Approval</span>
        //                     </div>
        //                 }
        //                 {
        //                     data.approveStatus === 3 &&
        //                     <div className="status-title-name">
        //                         <i style={{ marginRight: '8px' }} className="fas fa-check"></i>
        //                         <span>Approved</span>
        //                     </div>
        //                 }
        //                 {
        //                     data.approveStatus === 4 &&
        //                     <div className="status-title-name">
        //                         <i style={{ marginRight: '10px' }} className="fas fa-exclamation"></i>
        //                         <span>Reject</span>
        //                     </div>
        //                 }
        //             </div>
        //         )
        //     }
        // ))
    );
    console.log(tableData);

    const promoSubjectTable = tableData?.map(data => (
        {
                                            
            approveStatus: data.approveStatus,
            id: data.id,
            link: (
                <Icon path={mdiLinkVariant} size={1} />
            ),
            product: data.brandName,
            promoSubject: data.promoSubjectName,
            need: data.needResponses?.needAbb,
            needId:data.needResponses?.needId,
            benefit: (
                data?.benefit?.map((item,index) => (
                    <>
                    {item.abb}
                    {index !== data.benefit.length-1 && ','}
                    </>
                ))
            ),
            benefitIds :data.benefit?.map(data => (
                data.id
            )),
            specialization: (
                data.specializations?.map((item,index) => (
                    <>
                    {item?.specAbb}
                    {index !== data.specializations.length-1 && ','}
                    </>
                ))
            ),
            specializationId:data.specializations?.map(data => (
                data.specId
            )),
            orgType: data.organizationType.map((item,index) => (
                item === 1 
                ? <>
                clinic
                {index !== data?.organizationType?.length-1 && ','}
                </> 
                : <>
                hospital
                {index !== data?.organizationType?.length-1 && ','}
                </>
            )),
            visitStracture: (
                <div className='text-center'>
                    <Icon path={mdiPlus} size={1} />
                </div>
            ),
            page: (
                <Link
                    to={{
                        pathname: `/passport-of-products/pages`,
                        search: `?id=${data.id}`,
                        // hash: "#the-hash",
                        // state: { Details: true }
                    }}
                    style={{ color: '#6C757D' }}
                >
                    <div className='text-center' onClick={()=>dispatch(promoSubjectPagesDatas(data))} >
                        <Icon path={mdiPlus} size={1} />
                    </div>
                </Link>
            ),
            actions: (
                <span className="table-dropdown">
                    <Dropdown as={ButtonGroup} >
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <i style={{ fontSize: '20px' }} className="fas fa-ellipsis-v"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-container">
                            {data.approveStatus === 1 && //'Editable'
                                editableOptions.map((item, i) => (
                                    <Dropdown.Item
                                        as="button"
                                        eventKey={item.id}
                                        id={`${data.id} ${item.id}`}
                                        onClick={dropDownItemClick}
                                        style={item.id === 0 || item.id === 4 ? { color: `${item.color}` } : {}}>
                                        {item.icon} {t(item.value)}
                                    </Dropdown.Item>
                                ))
                            }
                            {data.approveStatus === 2 && // Approval
                                approvalOptions.map((item, i) => (
                                    <Dropdown.Item
                                        as="button"
                                        eventKey={item.id}
                                        id={`${data.id} ${item.id}`}
                                        onClick={dropDownItemClick}
                                        style={item.id === 0 || item.id === 3 ? { color: `${item.color}` } : {}}>
                                        {item.icon} {t(item.value)}
                                    </Dropdown.Item>
                                ))}
                            {data.approveStatus === 3 && // Approved
                                approvedOptions.map((item, i) => (
                                    <Dropdown.Item
                                        as="button"
                                        eventKey={item.id}
                                        id={`${data.id} ${item.id}`}
                                        onClick={dropDownItemClick}
                                        style={item.id === 4 ? { color: `${item.color}` } : {}}>
                                        {item.icon} {t(item.value)}
                                    </Dropdown.Item>
                                ))}
                            {data.approveStatus === 4 && // Reject
                                rejectOptions.map((item, i) => (
                                    <Dropdown.Item
                                        as="button"
                                        eventKey={item.id}
                                        id={`${data.id} ${item.id}`}
                                        onClick={dropDownItemClick}
                                        style={item.id === 3 ? { color: `${item.color}` } : {}}>
                                        {item.icon} {t(item.value)}
                                    </Dropdown.Item>
                                ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </span>
            ),
            renk: (
                data.approveStatus === 1 //Editable
                    ? {
                        backgroundColor: '#6C757D'
                    }
                    : data.approveStatus === 2 //'Approval'
                        ? {
                            backgroundColor: '#FFBC00'
                        }
                        : data.approveStatus === 3 //'Approved'
                            ? {
                                backgroundColor: '#0ACF97'
                            }
                            : data.approveStatus === 4 // Reject
                                ? {
                                    backgroundColor: '#FF5B5C'
                                }
                                : {}
            ),
            status: (
                <div
                    style={
                        data.approveStatus === 1 //Editable
                            ? {
                                backgroundColor: '#6C757D'
                            }
                            : data.approveStatus === 2 //'Approval'
                                ? {
                                    backgroundColor: '#FFBC00'
                                }
                                : data.approveStatus === 3 //'Approved'
                                    ? {
                                        backgroundColor: '#0ACF97'
                                    }
                                    : data.approveStatus === 4 // Reject
                                        ? {
                                            backgroundColor: '#FF5B5C'
                                        }
                                        : {}
                    }
                    className="status-title">
                    {
                        data.approveStatus === 1 &&
                        <div
                            className="status-title-name"
                        >
                            <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>
                            <span>{t('Editable')}</span>
                        </div>
                    }
                    {
                        data.approveStatus === 2 &&
                        <div className="status-title-name">
                            <Icon
                                path={mdiSendCheck}
                                title="Approval"
                                size={1}
                                horizontal
                                vertical
                                color="#fff" />
                            <span>{t('Approval')}</span>
                        </div>
                    }
                    {
                        data.approveStatus === 3 &&
                        <div className="status-title-name">
                            <i style={{ marginRight: '8px' }} className="fas fa-check"></i>
                            <span>{t('Approved')}</span>
                        </div>
                    }
                    {
                        data.approveStatus === 4 &&
                        <div className="status-title-name">
                            <i style={{ marginRight: '10px' }} className="fas fa-exclamation"></i>
                            <span>{t('Reject')}</span>
                        </div>
                    }
                </div>
            )
        
    }
    ))

    // useEffect(() => {
    //     const data = document.querySelector('.status-title');
    //     const parentNode = data?.parentElement;
    //     console.log('parent node',parentNode);
    //     if(parentNode) {
    //         parentNode.style.padding = '0';
    //     }
    // }, [tableData])

    return (
        <div>
            <Table 
            tableData={promoSubjectTable} 
            setTableData={setTableData}
            showModal={isShowUpdateModal}
            setShowModal={setIsShowUpdateModal}
            data={updateBenefitData}
             />

            {
                showActionModal &&
                <ActionModal
                    modalShow={showActionModal}
                    setModalShow={setShowActionModal}
                    item={actionModalData}
                    tableData={tableData}
                    setTableData={setTableData}
                    setapproveStatus={setapproveStatus}
                />
            }

            {
                showDeleteModal &&
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    tableData={tableData}
                    setTableData={setTableData}
                    needId={needId}
                />
            }

            {
                showRejectModal &&
                <Reject
                    modalShow={showRejectModal}
                    setModalShow={setShowRejectModal}
                    needId={rejectId}
                    tableData={tableData}
                    setTableData={setTableData}
                    data={rejectData}
                />
            }

            {/* {
                isShowUpdateModal &&
                <Edit
                showModal={isShowUpdateModal}
                setShowModal={setIsShowUpdateModal}
                data={updateBenefitData}
                />
            } */}
        </div>
    )
}

export default PromoSubjectIndex