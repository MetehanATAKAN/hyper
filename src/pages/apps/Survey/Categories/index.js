import React, { useEffect, useState } from 'react';
import Table from './Table';
import Dropdowns from '../../../../components/Dropdowns';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { conditionFunc } from '../../Materials/Materials';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NewInput, NewTextArea } from '../../../../components/GlobalNew/Inputs';
import { Button } from 'react-bootstrap';
import Delete from './Delete';
import FailModal from '../../../../components/FailModal';

const Categories = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const createdBy = localStorage.getItem('userName');
    const [loader, setLoader] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState('');
    const [actionItem, setActionItem] = useState({ id: 0, statusId: 99, name: '' });
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState([]);
    const [status, setStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
    ]);
    const actions = [
        {
            id: 9,
            key: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            color: '#6C757D',
        },
        {
            id: 0,
            key: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
    ];
    const getAllCategories = () => {
        setLoader(true);
        FetchApiGet('services/SurveySystem/Category/GetAllCategory', 'GET').then((res) => {
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
        getAllCategories();
    }, []);
    const statusClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );
        const statusId = Number(getIds[0]);
        const itemId = Number(getIds[1]);
        const itemName = getIds[2];
        const itemDescription = getIds[3];
        setActionItem({ id: itemId, statusId: statusId, name: itemName, description: itemDescription });
        if (statusId === 0) {
            setShowDeleteModal(true);
        }
        if (statusId === 9) {
            setCategoryName(itemName);
            setDescription(itemDescription);
            setShowEditModal(true);
        }
    };
    const addModalOpen = () => {
        setShowAddModal(true);
    };
    const toggle = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setCategoryName('');
        setDescription('');
        setStatus([
            { id: 0, status: 'default' },
            { id: 1, status: 'default' },
        ]);
    };
    const cancelBtn = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setCategoryName('');
        setDescription('');
        setStatus([
            { id: 0, status: 'default' },
            { id: 1, status: 'default' },
        ]);
    };
    const addBtn = () => {
        const condition = [categoryName === '', description === ''];
        conditionFunc(condition, status, setStatus);
        if (condition.some((x) => x === true)) return;
        const data = {
            name: categoryName,
            description: description,
            createdBy: createdBy,
        };
        FetchApiPost('services/SurveySystem/Category/CreateCategory', 'POST', data).then((res) => {
            if (res.status === 201) {
                setCategoryName('');
                setDescription('');
                setShowAddModal(false);
                getAllCategories();
            } else if (res.status === 400 || res.status === 409 || res.status === 404) {
                res.json().then(({ errors }) => (setShowErrorModal(true), setError(errors)));
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setData([]);
            }
        });
    };
    const updateBtn = () => {
        const condition = [categoryName === '', description === ''];
        conditionFunc(condition, status, setStatus);
        if (condition.some((x) => x === true)) return;
        const data = {
            id: actionItem.id,
            name: categoryName,
            description: description,
            modifiedBy: createdBy,
        };
        FetchApiPost('services/SurveySystem/Category/UpdateCategory', 'POST', data).then((res) => {
            if (res.status === 201) {
                setCategoryName('');
                setDescription('');
                setShowEditModal(false);
                getAllCategories();
            } else if (res.status === 400 || res.status === 409 || res.status === 404) {
                res.json().then(({ errors }) => (setShowErrorModal(true), setError(errors)));
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setData([]);
            }
        });
    };
    const tableData = data?.map((el, i) => ({
        id: el.id,
        categoryName: el.categoryName,
        description: el.description,
        action: (
            <Dropdowns
                item={`?${el.id}?${el.categoryName}?${el.description}`}
                option={actions}
                width="100px"
                onClick={statusClick}
            />
        ),
    }));
    return (
        <>
            <Spin size="large" spinning={loader} style={{ top: '50%' }}>
                <Table data={tableData} addModal={addModalOpen} />
            </Spin>
            {showAddModal && (
                <GlobalModal
                    header={t('Add Survey Category')}
                    showModal={showAddModal}
                    setShowModal={setShowAddModal}
                    toggle={toggle}
                    body={
                        <div>
                            <NewInput
                                label="category name"
                                placeholder="enter a name"
                                value={categoryName}
                                setValue={setCategoryName}
                                isStar={true}
                                width="100%"
                                status={status[0].status}
                            />
                            <NewTextArea
                                label="description"
                                placeholder="enter a description"
                                value={description}
                                setValue={setDescription}
                                isStar={true}
                                width="100%"
                                status={status[1].status}
                            />
                        </div>
                    }
                    footer={
                        <>
                            <Button onClick={cancelBtn} variant="light">
                                {t('cancel')}
                            </Button>
                            <Button onClick={addBtn} variant="primary">
                                {t('add')}
                            </Button>
                        </>
                    }
                />
            )}
            {showEditModal && (
                <GlobalModal
                    header={t('Update Survey Category')}
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                    toggle={toggle}
                    body={
                        <div>
                            <NewInput
                                label="category name"
                                placeholder="enter a name"
                                value={categoryName}
                                setValue={setCategoryName}
                                isStar={true}
                                width="100%"
                                status={status[0].status}
                            />
                            <NewTextArea
                                label="description"
                                placeholder="enter a description"
                                value={description}
                                setValue={setDescription}
                                isStar={true}
                                width="100%"
                                status={status[1].status}
                            />
                        </div>
                    }
                    footer={
                        <>
                            <Button onClick={cancelBtn} variant="light">
                                {t('cancel')}
                            </Button>
                            <Button onClick={updateBtn} variant="warning">
                                {t('update')}
                            </Button>
                        </>
                    }
                />
            )}
            {showDeleteModal && (
                <Delete
                    modalShow={showDeleteModal}
                    setModalShow={setShowDeleteModal}
                    item={actionItem}
                    apply={getAllCategories}
                />
            )}
            {showErrorModal && <FailModal modalShow={showErrorModal} setModalShow={setShowErrorModal} error={error} />}
        </>
    );
};

export default React.memo(Categories);
