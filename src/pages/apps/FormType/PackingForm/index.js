import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { Spin } from 'antd';
import { Row } from 'react-bootstrap';
import { MultipleSelects } from '../../../../components/GlobalNew/Selects';
import Dropdowns from '../../../../components/Dropdowns';
import Table from './Table';
import '../../../../assets/scss/custom/competitor/packingForm.scss';
import AddModal from './AddModal';
import EditModal from './EditModal';
import ActionModals from '../../../../components/Modals/ActionModal';
import { mdiCheck, mdiClose, mdiDeleteSweepOutline } from '@mdi/js';
import { useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';

const PackingForm = () => {
    const history = useHistory();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [item, setItem] = useState(null);
    const [selectMainForm, setSelectMainForm] = useState([]);
    const [optionsMainForm, setOptionsMainForm] = useState([]);
    const user = localStorage.getItem('userName');
    const [closeFilter, setCloseFilter] = useState(false);
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

    useEffect(() => {
        FetchApiGet('services/Material/PackingForm/GetAllMainForm', 'GET').then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    setSelectMainForm(data?.map((el) => ({ value: el.id, label: el.formName })));
                    setOptionsMainForm(data?.map((el) => ({ value: el.id, label: el.formName })));
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, []);

    const applyFilter = () => {
        if (selectMainForm.length === 0) return;
        setLoader(true);
        const data = {
            mainFormIds: selectMainForm?.map((x) => x.value),
        };
        FetchApiPost('services/Material/PackingForm/ApplyPackingForm', 'POST', data).then((res) => {
            if (res.status === 201 || res.status === 200) {
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
        mainForm: el.mainFormName,
        inside: el.mainInsideOneCassette,
        cassete: el.mainCassetteQuantity,
        total: el.mainTotal,
        assistForm: el.assistFormName,
        insideTwo: el.assistInsideOneCassette,
        casseteTwo: el.assistCassetteQuantity,
        totalTwo: el.assistTotal,
        action: <Dropdowns item={`?${el.id}?${el.mainFormName}`} option={items} onClick={statusClick} />,
    }));
    return (
        <div id="packing-form-table">
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
                                label="main form"
                                selectedItems={selectMainForm}
                                setSelectedItems={setSelectMainForm}
                                options={optionsMainForm}
                                width="200px"
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
                                    onClick={() => setSelectMainForm([])}
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
                <AddModal showModal={showAddModal} setShowModal={setShowAddModal} applyFilter={applyFilter} />
            )}
            {showEditModal && (
                <EditModal
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                    applyFilter={applyFilter}
                    itemId={item.id}
                />
            )}
            {showDeleteModal && (
                <ActionModals
                    type="delete"
                    setShowModal={setShowDeleteModal}
                    showModal={showDeleteModal}
                    url={'services/Material/PackingForm/DeletePackingForm'}
                    postData={{ id: item.id, modifiedBy: user }}
                    dataName={item.name}
                    applyFilter={applyFilter}
                />
            )}
        </div>
    );
};

export default PackingForm;
