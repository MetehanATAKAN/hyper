import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FetchApiGet } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router';
import TableLayout from '../../../../../components/Tables';
import AssignTable from './AssignTable';
const Body = ({ tableData, setTableData, roleId, rowSelection, setRowSelection }) => {
    const { t } = useTranslation();
    const userId = localStorage.getItem('roleId');
    const history = useHistory();

    // const [selectDatas, setSelectDatas] = useState([]);

    const columns = [
        { accessorKey: 'user', header: t('User') },
        { accessorKey: 'department', header: t('Department') },
        { accessorKey: 'position', header: t('Position') },
        { accessorKey: 'country', header: t('Country') },
        { accessorKey: 'company', header: t('Company') },
    ];

    useEffect(() => {
        if (roleId !== undefined) {
            FetchApiGet(`services/AuthorizationSystem/Role/GetUsersByRoleId?id=${roleId}`, 'GET').then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((data) => {
                                setTableData(
                                    data?.data?.map((item) => ({
                                        id: String(item.id),
                                        user: `${item.surname} ${item.name}`,
                                        department: item.departmant === null ? '-' : item.departmant.positionName,
                                        position: item.position === null ? '-' : item.position.positionName,
                                        country: item.country?.countryName,
                                        company: item.company?.companyName,
                                        roleId: String(item.roleId),
                                        status: item.roleStatus,
                                    }))
                                );
                                const newObject = {};
                                data?.data
                                    ?.filter((select) => select.roleStatus === true)
                                    .map((x) => (newObject[x.id] = true));
                                setRowSelection(newObject);
                            });
                        } else if (res.status === 500 || res.status === 499) {
                            history.push('/error-500');
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            );
        }
    }, [history, roleId, setTableData, userId]);

    return (
        <AssignTable
            tableLayout="auto"
            data={tableData}
            columns={columns}
            isCheckBox={true}
            isHasStatus={false}
            isFilterBtnShow={false}
            filterShow={false}
            isNewButton={false}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
        />
    );
};

export default Body;
