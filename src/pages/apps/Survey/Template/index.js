import React, { useEffect, useState } from 'react';
import { mdiPlus, mdiShareVariantOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Tippy from '@tippyjs/react';
import { Spin } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import SendIcon from '../../../../components/Icons/SendIcon';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import AddModal from './AddModal';
import Dropdowns from '../../../../components/Dropdowns';
import Table from './Table';
import { statusApprovalOptions, statusApprovedOptions, statusRedactOptions, statusRejectOptions } from '../Statuses';
import Delete from '../Action/Delete';
import ActionModal from '../Action/ActionModal';
import Reject from '../Action/Reject';
import EditModal from './EditModal';
import { useDispatch } from 'react-redux';
import { surveyId } from '../../../../redux/actions';
import ShareAddModal from '../Share/AddModal/AddModal';

const Template = ({ setSelectTab }) => {
    const history = useHistory();
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [actionItem, setActionItem] = useState(null);
    const [loader, setLoader] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);

    const [shareAddModal, setShareAddModal] = useState(false);
    const [shareSurveyId, setShareSurveyId] = useState();

    const activities = [
        { id: 1, activity: 'inside', backgroundColor: '#00A0DF2E', color: '#00A0DF' },
        // { id: 2, activity: 'outside', backgroundColor: '#6C757D2E', color: '#6C757D' },
        // { id: 3, activity: 'candidate', backgroundColor: '#727cf526', color: '#727CF5' },
    ];

    const handleClickShare = (surveyId) => {
        setShareSurveyId(surveyId);
        setShareAddModal(true);
    };

    const getAllTemplates = () => {
        setLoader(true);
        FetchApiGet('services/SurveySystem/Survey/GetAllSurvey', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setData(data);
                    setLoader(false);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setData([]);
            }
        });
    };
    useEffect(() => {
        getAllTemplates();
    }, []);
    const statusClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );
        const statusId = Number(getIds[0]);
        const itemId = Number(getIds[1]);
        const itemName = getIds[2];
        const itemType = getIds[3];
        const itemCategoryId = getIds[4];
        const itemCategoryName = getIds[5];
        const itemLnId = getIds[6];
        const itemLnName = getIds[7];
        setActionItem({
            id: itemId,
            statusId: statusId,
            name: itemName,
            type: itemType,
            category: { value: itemCategoryId, label: itemCategoryName },
            language: { value: itemLnId, label: itemLnName },
        });
        if (statusId === 0) {
            setShowDeleteModal(true);
        }
        if (statusId === 1 || statusId === 2 || statusId === 3) {
            setShowActionModal(true);
        }
        if (statusId === 4) {
            setShowRejectModal(true);
        }
        if (statusId === 9) {
            setShowEditModal(true);
        }
    };
    const getStatusOptions = (status, questions) => {
        switch (status) {
            case 1:
                if (questions.length === 0) {
                    const arr = statusRedactOptions.filter((x) => x.id !== 2);
                    return arr;
                } else {
                    return statusRedactOptions;
                }
            case 2:
                return statusApprovalOptions;
            case 3:
                return statusApprovedOptions;
            case 4:
                return statusRejectOptions;
            default:
                return [];
        }
    };
    const tableData = data?.map((el, i) => ({
        surveyName: (
            <Tippy content={el.surveyName} placement="bottom">
                <span>{el.surveyName}</span>
            </Tippy>
        ),
        activities: activities.map((obj) => {
            if (obj.id === el.type) {
                return (
                    <span
                        style={{
                            backgroundColor: obj.backgroundColor,
                            color: obj.color,
                            padding: '1px 8px',
                            borderRadius: 3,
                            display: 'grid',
                            placeItems: 'center',
                        }}>
                        {obj.activity}
                    </span>
                );
            }
        }),
        category: (
            <Tippy content={el.category.categoryName} placement="bottom">
                <span>{el.category.categoryName}</span>
            </Tippy>
        ),
        language: <span style={{ display: 'grid', placeItems: 'center' }}>{el.languageAbb.languageAbb}</span>,
        design:
            el.isApproved !== 3 ? (
                <Link
                    to={{
                        pathname: '/apps/survey-add-question',
                        search: `?surveyId=${el.id}`,
                    }}>
                    <span style={{ display: 'grid', placeItems: 'center' }}>
                        <Icon path={mdiPlus} title="design" size={0.8} horizontal vertical color="#6c757d" />
                    </span>
                </Link>
            ) : (
                <span style={{ display: 'grid', placeItems: 'center', opacity: '0.5' }}>
                    <Icon path={mdiPlus} title="design" size={0.8} horizontal vertical color="#6c757d" />
                </span>
            ),
        share:
            el.isApproved !== 3 ? (
                <span style={{ display: 'grid', placeItems: 'center', opacity: '0.5' }}>
                    <Icon path={mdiShareVariantOutline} title="share" size={0.8} horizontal vertical color="#6c757d" />
                </span>
            ) : (
                <span style={{ display: 'grid', placeItems: 'center' }}>
                    <Icon
                        path={mdiShareVariantOutline}
                        title="share"
                        size={0.8}
                        horizontal
                        vertical
                        color="#6c757d"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleClickShare(el.id)}
                    />
                </span>
            ),
        creator: (
            <Tippy content={el.createdBy} placement="left">
                <span>{el.createdBy}</span>
            </Tippy>
        ),
        createDate: (
            <span style={{ display: 'grid', placeItems: 'center' }}>
                {moment(el.createdDate).format('DD MMM YYYY')}
            </span>
        ),
        updateDate: (
            <span style={{ display: 'grid', placeItems: 'center' }}>
                {new Date(el.modifiedDate).getFullYear() === 1
                    ? 'Not update'
                    : moment(el.modifiedDate).format('DD MMM YYYY')}
            </span>
        ),
        status: (
            <Tippy disabled={el.isApproved !== 4 ? true : false} content={el.rejectReason} placement="left">
                <span
                    style={
                        el.isApproved === 1 //Redact
                            ? {
                                  backgroundColor: '#6C757D',
                                  color: '#fff',
                              }
                            : el.isApproved === 2 //'Approval'
                            ? {
                                  backgroundColor: '#FFBC00',
                                  color: '#fff',
                              }
                            : el.isApproved === 3 //'Approved'
                            ? {
                                  backgroundColor: '#0ACF97',
                                  color: '#fff',
                              }
                            : el.isApproved === 4 // Reject
                            ? {
                                  backgroundColor: '#FA5C7C',
                                  color: '#fff',
                              }
                            : {}
                    }
                    className="status-title">
                    {el.isApproved === 1 && <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>}
                    {el.isApproved === 2 && <SendIcon />}
                    {el.isApproved === 3 && <i style={{ marginRight: '8px' }} className="fas fa-check"></i>}
                    {el.isApproved === 4 && <i style={{ marginRight: '8px' }} className="fas fa-exclamation"></i>}
                    {el.isApproved === 1 && t('Redact')}
                    {el.isApproved === 2 && t('Approval')}
                    {el.isApproved === 3 && t('Approved')}
                    {el.isApproved === 4 && t('Reject')}
                </span>
            </Tippy>
        ),
        action: (
            <Dropdowns
                item={`?${el.id}?${el.surveyName}?${el.type}?${el.category.id}?${el.category.categoryName}?${el.languageAbb.languageAbbId}?${el.languageAbb.languageAbb}`}
                option={getStatusOptions(el.isApproved, el.questionIds)}
                onClick={statusClick}
            />
        ),
    }));

    return (
        <>
            <Spin size="large" spinning={loader}>
                <Table data={tableData} addModal={() => setShowAddModal(true)} />
            </Spin>
            {showAddModal && (
                <AddModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} apply={getAllTemplates} />
            )}
            {showDeleteModal && (
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    apply={getAllTemplates}
                    item={actionItem}
                />
            )}
            {showActionModal && (
                <ActionModal
                    modalShow={showActionModal}
                    setModalShow={setShowActionModal}
                    apply={getAllTemplates}
                    item={actionItem}
                />
            )}
            {showRejectModal && (
                <Reject
                    modalShow={showRejectModal}
                    setModalShow={setShowRejectModal}
                    apply={getAllTemplates}
                    item={actionItem}
                />
            )}
            {showEditModal && (
                <EditModal
                    modalShow={showEditModal}
                    setModalShow={setShowEditModal}
                    apply={getAllTemplates}
                    item={actionItem}
                />
            )}
            {shareAddModal && (
                <ShareAddModal
                    showAddModal={shareAddModal}
                    setShowAddModal={setShareAddModal}
                    shareSurveyId={shareSurveyId}
                    setSelectTab={setSelectTab}
                />
            )}
        </>
    );
};

export default React.memo(Template);
