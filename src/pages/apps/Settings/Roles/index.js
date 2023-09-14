import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import '../../../../assets/scss/custom/components/pageList.scss';
import CreateModal from './Create/Create';
import Update from './Update/Update';
import Delete from './Delete';
import Icon from '@mdi/react';
import { mdiAccountPlus, mdiCogOutline, mdiDelete, mdiPencil } from '@mdi/js';
import AssignUserModal from '../Permissions/AssignUserModal/index';
import Dropdowns from '../../../../components/Dropdowns';
import { config2 } from '../../../../config';
import TableLayout from '../../../../components/Tables/index';
import { MultipleSelects } from '../../../../components/GlobalNew/Selects';

const Roles = ({ setRolesAssignUserButton, setSelectTab, setRoleId, roleId }) => {
    const { t } = useTranslation();
    const history = useHistory();

    const [addModal, setAddModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [updateItem, setUpdateItem] = useState();
    const [updateModalIsShow, setUpdateModalIsShow] = useState(false);

    const [deleteItem, setDeleteItem] = useState();
    const [deleteModalIsShow, setDeleteModalIsShow] = useState(false);

    const [isShowAssignUserModal, setIsShowAssignUserModal] = useState(false);

    const columns = [
        { accessorKey: 'roles', header: t('Roles') },
        { accessorKey: 'scopeRole', header: t('Scope for this role') },
        { accessorKey: 'createBy', header: t('Create By') },
        { accessorKey: 'createDate', header: t('Create Date') },
        { accessorKey: 'updateBy', header: t('Update By') },
        { accessorKey: 'updateDate', header: t('Update Date') },
        { accessorKey: 'actions', header: '', size: 30 },
    ];

    const [employee, setEmployee] = useState();
    const [employeeOptions, setEmployeeOptions] = useState([]);

    useEffect(() => {
        fetch(`${config2.API_URL}/api/Accounts/GetAllEmployees`).then((res) => {
            if (res.status === 201) {
                res.json().then((data) => {
                    setEmployeeOptions(
                        data.data.map((item) => {
                            return { value: item.id, label: item.name };
                        })
                    );
                    setEmployee(
                        data.data.map((item) => {
                            return { value: item.id, label: item.name };
                        })
                    );
                });
            }
        });
    }, []);

    const [filterData, setFilterData] = useState([]);

    const statusOptions = [
        {
            id: 0,
            key: 'Edit',
            icon: (
                <Icon
                    path={mdiPencil}
                    style={{ width: '14.4px', height: '14.44px', marginRight: '8px', fontWeight: '900' }}
                />
            ),
        },
        {
            id: 1,
            key: 'Delete',
            icon: (
                <Icon
                    path={mdiDelete}
                    color="#FA5C7C"
                    style={{ width: '14.4px', height: '14.44px', marginRight: '8px', fontWeight: '900' }}
                />
            ),
        },
        {
            id: 2,
            key: 'Manage Permissions',
            icon: (
                <Icon
                    path={mdiCogOutline}
                    style={{ width: '14.4px', height: '14.44px', marginRight: '8px', fontWeight: '900' }}
                />
            ),
        },
        {
            id: 3,
            key: 'Assign users',
            icon: <Icon path={mdiAccountPlus} style={{ width: '14.4px', height: '14.44px', marginRight: '8px' }} />,
        },
    ];

    const statusClick = (e) => {
        const getIds = (e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id).split(
            '?'
        );

        const statusId = Number(getIds[0]);

        const selectedStatus = statusOptions.find((el) => el.id === Number(statusId));
        if (selectedStatus.key === 'Edit') {
            const item = filterData.find((el) => el.id === getIds[1]);
            setUpdateItem(item);
            setUpdateModalIsShow(true);
        }
        if (selectedStatus.key === 'Delete') {
            const item = filterData.find((el) => el.id === getIds[1]);
            setDeleteItem(item);
            setDeleteModalIsShow(true);
        }
        if (selectedStatus.key === 'Manage Permissions') {
            const item = filterData.find((el) => el.id === getIds[1]);
            setRoleId(item?.id);
            handleClickAssignUser();
        }
        if (selectedStatus.key === 'Assign users') {
            const item = filterData.find((el) => el.id === getIds[1]);
            setRoleId(item?.id);
            setIsShowAssignUserModal(true);
        }
    };

    const handleClickAssignUser = () => {
        setSelectTab({
            key: 1,
            label: 'Permissions',
        });
    };

    const getDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    const tableData = filterData.map((item, index) => ({
        id: item.id,
        roles: item.roleName,
        user: (
            <button className="setting-role-table__user" onClick={() => handleClickAssignUser()}>
                <i className="fa-solid fa-user-plus"></i>
                <span>{t('Assign users')}</span>
            </button>
        ),
        scopeRole:
            item.scopeId === 0
                ? 'Global Access'
                : item.scopeId === 1
                ? 'Restricted Access'
                : 'Territory Access / Group Access',
        createBy: item.createBy,
        createDate: getDate(item.createdDate),
        updateBy: item.updateBy,
        updateDate: item.updateBy !== null ? getDate(item.updateDate) : '',
        actions: <Dropdowns item={`?${item.id}?${item.roleName}`} option={statusOptions} onClick={statusClick} />,
    }));
    useEffect(() => {
        setIsLoading(true);
        FetchApiGet('services/AuthorizationSystem/Role/GetAllRole', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setFilterData(
                        data.data.map((item) => {
                            return {
                                id: item.id,
                                roleName: item.roleName,
                                scopeId: item.scopeId,
                                createBy: item.createdBy,
                                createdDate: item.createdDate,
                                updateBy: item.modifiedBy,
                                updateDate: item.modifiedDate,
                            };
                        })
                    );
                    setIsLoading(false);
                });
            }
        });
    }, []);
    const getAllFilterData = (second) => {};

    const handelDeleteItem = () => {
        FetchApiPost('services/AuthorizationSystem/Role/DeleteRole', 'POST', {
            id: String(deleteItem.id),
            modifiedBy: localStorage.getItem('userName'),
        }).then((res) => {
            if (res.status === 201) {
                res.json().then((data) => {
                    setDeleteModalIsShow(false);
                    let newFilter = filterData.filter((item) => {
                        return item.id !== deleteItem.id;
                    });
                    setFilterData(newFilter);
                });
            }
        });
    };

    return (
        <div className="setting-role-table">
            <TableLayout
                tableLayout="fixed"
                isLoading={isLoading}
                data={tableData}
                columns={columns}
                isCheckBox={false}
                isFilterBtnShow={false}
                filterShow={false}
                handleNewButton={() => setAddModal(true)}
            />

            {addModal && (
                <CreateModal
                    isShow={addModal}
                    setIsShow={setAddModal}
                    setFilterData={setFilterData}
                    getAllFilterData={getAllFilterData}
                />
            )}

            {updateModalIsShow && (
                <Update
                    isShow={updateModalIsShow}
                    setIsShow={setUpdateModalIsShow}
                    selectedValue={updateItem}
                    setFilterData={setFilterData}
                    filterData={filterData}
                />
            )}

            {deleteModalIsShow && (
                <Delete
                    modalShow={deleteModalIsShow}
                    setModalShow={setDeleteModalIsShow}
                    handelDeleteItem={handelDeleteItem}
                    item={deleteItem}
                />
            )}
            {isShowAssignUserModal && (roleId !== null || roleId !== undefined) && (
                <AssignUserModal
                    isShow={isShowAssignUserModal}
                    setIsShow={setIsShowAssignUserModal}
                    pageNum={1}
                    roleId={roleId}
                />
            )}
        </div>
    );
};

export default Roles;
