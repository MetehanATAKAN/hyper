import { Spin } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Dropdowns from '../../../../components/Dropdowns';
import ActionModals from '../../../../components/Modals/ActionModal';
import { FetchApiGet } from '../../../../utils/http.helper';
import AddModal from './AddModal';
import EditModal from './EditModal';
import Table from './Table';

const UnitIndex = () => {
    const history = useHistory();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [item, setItem] = useState(null);
    const userName = localStorage.getItem('userName');
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
    const getAllUnit = useCallback(() => {
        setLoader(true);
        FetchApiGet('services/Material/Unit/GetAllUnit ', 'GET').then((res) => {
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
    }, [history]);
    useEffect(() => {
        getAllUnit();
    }, [getAllUnit]);
    const tableData = data?.map((el, i) => ({
        unit: el.unitName,
        action: <Dropdowns item={`?${el.id}?${el.unitName}`} option={items} onClick={statusClick} />,
    }));
    return (
        <>
            <Spin size="large" spinning={loader}>
                <Table data={tableData} addModal={() => setShowAddModal(true)} />
            </Spin>
            {showAddModal && <AddModal showModal={showAddModal} setShowModal={setShowAddModal} getData={getAllUnit} />}
            {showEditModal && (
                <EditModal
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                    itemId={item.id}
                    getData={getAllUnit}
                />
            )}
            {showDeleteModal && (
                <ActionModals
                    type="delete"
                    setShowModal={setShowDeleteModal}
                    showModal={showDeleteModal}
                    url={'services/Material/Unit/DeleteUnit'}
                    postData={{ id: item.id, modifiedBy: userName }}
                    dataName={item.name}
                    handleData={getAllUnit}
                />
            )}
        </>
    );
};

export default UnitIndex;
