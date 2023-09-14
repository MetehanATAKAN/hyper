import React, { useCallback, useEffect, useState } from 'react';
import { Spin } from 'antd';
import Dropdowns from '../../../../components/Dropdowns';
import ActionModals from '../../../../components/Modals/ActionModal';
import Table from './Table';
import AddModal from './AddModal';
import EditModal from './EditModal';
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';
import { Row } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiCheck, mdiClose, mdiDeleteSweepOutline } from '@mdi/js';
import { useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { statusControl } from '../../../../components/Function/StatusCheck';
const UnitsFormIndex = () => {
    const history = useHistory();
    const userName = localStorage.getItem('userName');
    const [loader, setLoader] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [item, setItem] = useState(null);
    const [data, setData] = useState([]);
    const [selectForm, setSelectForm] = useState([]);
    const [selectFormType, setSelectFormType] = useState([]);
    const [optionsForm, setOptionsForm] = useState([]);
    const [optionsFormType, setOptionsFormType] = useState([]);
    const [closeFilter, setCloseFilter] = useState(false);
    const [filterStatus, setFilterStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
    ]);
    const items = [
        {
            id: 1,
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
    const statusClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );
        const statusId = Number(getIds[0]);
        const itemId = Number(getIds[1]);
        const itemName = getIds[2];
        setItem({ id: itemId, name: itemName });
        switch (statusId) {
            case 0:
                return setShowDeleteModal(true);
            case 1:
                return setShowEditModal(true);
            default:
                break;
        }
    };
    const getAllForm = useCallback(async () => {
        const response = await FetchApiGet('services/Material/Form/GetAllForm', 'GET');
        const json = await response.json();
        if (response.status === 200) {
            const { data } = json;
            return data;
        }
        if (response.status === 400 || response.status === 409 || response.status === 404) {
            const { error } = json;
            return error;
        }
        if (response.status === 500 || response.status === 502) {
            history.push('/error-500');
        }
    }, [history]);
    const getFormTypeById = useCallback(async () => {
        const body = await { ids: selectForm?.map((x) => x.value) };
        const response = await FetchApiPost('services/Material/UnitsOfForm/GetFormTypesByIds', 'POST', body);
        const json = await response.json();
        if (response.status === 200) {
            const { data } = json;
            return data;
        }
        if (response.status === 400 || response.status === 409 || response.status === 404) {
            const { error } = json;
            return error;
        }
        if (response.status === 500 || response.status === 502) {
            history.push('/error-500');
        }
    }, [history, selectForm]);

    useEffect(() => {
        getAllForm().then((res) => {
            setOptionsForm(res?.map((el) => ({ value: el.id, label: el.formName })));
            setSelectForm(res?.map((el) => ({ value: el.id, label: el.formName })));
        });
    }, [getAllForm]);

    useEffect(() => {
        setSelectFormType([]);
        setOptionsFormType([]);
        if (selectForm.length === 0) return;
        getFormTypeById().then((res) => {
            setOptionsFormType(res?.map((el) => ({ value: el.id, label: el.formTypeName })));
            setSelectFormType(res?.map((el) => ({ value: el.id, label: el.formTypeName })));
        });
    }, [getFormTypeById, selectForm]);

    const applyFilter = () => {
        const condition = [selectForm.length === 0 ? true : false, selectFormType.length === 0 ? true : false];
        statusControl(condition, filterStatus, setFilterStatus);
        if (condition.some((x) => x === true)) return;
        setLoader(true);
        const body = {
            formIds: selectForm?.map((x) => x.value),
            formTypeIds: selectFormType?.map((x) => x.value),
        };
        FetchApiPost('services/Material/UnitsOfForm/ApplyUnitsOfFormFilter', 'POST', body).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    setCloseFilter(true);
                    setData(data);
                    setLoader(false);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };

    const tableData = data?.map((el, i) => ({
        form: el.formName,
        formType: (
            <span
                style={{
                    backgroundColor: `rgba(${el.color},0.15)`,
                    color: `rgb(${el.color})`,
                    padding: '1px 8px',
                    borderRadius: 3,
                }}>
                {el.formTypeName}
            </span>
        ),
        abb: el.abbraviation,
        unit: el.units?.map((item, i) => (
            <span
                style={{
                    backgroundColor: `rgba(${item.color},0.15)`,
                    color: `rgb(${item.color})`,
                    padding: '1px 8px',
                    borderRadius: 3,
                    marginRight: '4px',
                }}>
                {item.unitName}
            </span>
        )),
        action: <Dropdowns item={`?${el.id}?${el.formName}`} option={items} onClick={statusClick} />,
    }));

    return (
        <>
            <Spin size="large" spinning={loader}>
                <Table
                    data={tableData}
                    addModal={() => setShowAddModal(true)}
                    closeFilter={closeFilter}
                    setCloseFilter={setCloseFilter}
                    filters={
                        <Row
                            style={{
                                display: 'flex',
                                columnGap: '8px',
                                backgroundColor: '#F1F3FA',
                                padding: '1rem 1.5rem',
                            }}
                            className="m-0 filters-row-padding">
                            <MultipleSelects
                                className="filter-radius"
                                labelClassName="label-filter"
                                size="small"
                                label="form"
                                selectedItems={selectForm}
                                setSelectedItems={setSelectForm}
                                options={optionsForm}
                                width="200px"
                                status={filterStatus[0].status}
                            />
                            <MultipleSelects
                                className="filter-radius"
                                labelClassName="label-filter"
                                size="small"
                                label="form type"
                                selectedItems={selectFormType}
                                setSelectedItems={setSelectFormType}
                                options={optionsFormType}
                                width="200px"
                                status={filterStatus[1].status}
                            />
                            <div className="filter-select-buttons">
                                <Icon
                                    className="filter-button-icons"
                                    onClick={applyFilter}
                                    path={mdiCheck}
                                    size={1}
                                    color={'#0ACF97'}
                                />
                                <Icon
                                    onClick={() => {
                                        setSelectForm([]);
                                        setSelectFormType([]);
                                    }}
                                    path={mdiDeleteSweepOutline}
                                    className="filter-button-icons"
                                    size={1}
                                    color={'#FA5C7C'}
                                />
                                <Icon
                                    onClick={() => setCloseFilter(true)}
                                    path={mdiClose}
                                    size={1}
                                    color={'#6C757D'}
                                    className="filter-button-icons"
                                />
                            </div>
                        </Row>
                    }
                />
            </Spin>
            {showAddModal && (
                <AddModal
                    showModal={showAddModal}
                    setShowModal={setShowAddModal}
                    getAllForm={getAllForm}
                    applyFilter={applyFilter}
                />
            )}
            {showEditModal && (
                <EditModal
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                    itemId={item.id}
                    getAllForm={getAllForm}
                    applyFilter={applyFilter}
                />
            )}
            {showDeleteModal && (
                <ActionModals
                    type="delete"
                    setShowModal={setShowDeleteModal}
                    showModal={showDeleteModal}
                    url={'services/Material/UnitsOfForm/DeleteUnitOfForm'}
                    postData={{ id: item.id, modifiedBy: userName }}
                    dataName={item.name}
                    applyFilter={applyFilter}
                />
            )}
        </>
    );
};

export default UnitsFormIndex;
