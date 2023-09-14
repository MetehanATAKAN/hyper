import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import { FetchApiGet } from '../../../../utils/http.helper';
import Table from './Table';
import Dropdowns from '../../../../components/Dropdowns';
import AddModal from './AddModal';
import ActionModal from '../../../../components/Modals/ActionModal';
import EditModal from './EditModal';

const FormIndex = () => {
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
    const getAllForms = useCallback(() => {
        setLoader(true);
        FetchApiGet('services/Material/Form/GetAllForm', 'GET').then((res) => {
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
        getAllForms();
    }, [getAllForms]);
    const tableData = data?.map((el, i) => ({
        id: el.id,
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
        abb: el.formAbbreviation,
        action: <Dropdowns item={`?${el.id}?${el.formName}`} option={items} onClick={statusClick} />,
    }));
    return (
        <>
            <Spin size="large" spinning={loader}>
                <Table data={tableData} addModal={() => setShowAddModal(true)} />
            </Spin>
            {showAddModal && (
                <AddModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} getData={getAllForms} />
            )}
            {showEditModal && (
                <EditModal
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                    itemId={item.id}
                    getData={getAllForms}
                />
            )}
            {showDeleteModal && (
                <ActionModal
                    type="delete"
                    setShowModal={setShowDeleteModal}
                    showModal={showDeleteModal}
                    url={'services/Material/Form/DeleteForm'}
                    postData={{ id: item.id, modifiedBy: userName }}
                    dataName={item.name}
                    handleData={getAllForms}
                />
            )}
        </>
    );
};

export default FormIndex;
// import React, { useState } from 'react';
// import AccessControl from '../../../../permission/AccessControl';
// import { Button } from '../../../../components/FormElements/Button';
// import { BreadCrumbs } from '../../../../components/FormElements/BreadCrumb';
// import Header from '../../../../components/Header';
// import TableAccordion from '../../../../components/Tables/TableAccordion';
// import TableLayout from '../../../../components/Tables/index';
// import CustomBadge from '../../../../components/Badge';
// import CustomStatus from '../../../../components/CustomStatus';
// import { DropDowns } from '../../../../components/FormElements/DropDown/DropDowns';
// import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';
// const FormIndex = () => {
//     const [first, setfirst] = useState();
//     return (
//         // <TableAccordion />
//         // <TableLayout />

//         <div className="d-flex justify-content-center mt-3">
//             <AccessControl allowedPermissions={['delete', 'view']} renderNoAccess={() => <div>no access</div>}>
//                 <button className="m-4 config-test" onClick={() => alert('ALERT!')}>
//                     delete
//                 </button>
//             </AccessControl>
//             {/* <Button>Button</Button> */}
//             {/* <CustomBadge type="raspberry" /> */}
//             {/* <CustomStatus type="refactor" /> */}
//             {/* <SingleSelects
//                 label={'test'}
//                 selectedItems={first}
//                 setSelectedItems={setfirst}
//                 status="warning"
//                 options={[
//                     { value: 1, label: 'item 1' },
//                     { value: 2, label: 'item 2' },
//                 ]}
//             /> */}
//         </div>
//     );
// };

// export default FormIndex;
