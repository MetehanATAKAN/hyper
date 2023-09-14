import React, { useEffect, useState } from 'react';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router';

const PermissionsEdit = ({ roleId, tableItems, setTableItems }) => {
    const history = useHistory();

    const changePermissions = (id) => {
        const newTable = tableItems.map((data) =>
            data.map((item) => {
                if (item.id === id) {
                    item.status = !item.status;

                    item.datas.map((per) => {
                        if (item.status === true) {
                            per.isCheck = true;
                            per.authorizations.map((auth) => {
                                auth.isActive = true;
                                return auth;
                            });
                        } else {
                            per.isCheck = false;
                            per.authorizations.map((auth) => {
                                auth.isActive = false;
                                return auth;
                            });
                        }
                        return per;
                    });
                }
                return item;
            })
        );
        setTableItems(newTable);
    };

    const changeTab = (parentId, id) => {
        let tabStatusNum = 0;

        const newTable = tableItems.map((data) =>
            data.map((item) => {
                if (item.id === parentId) {
                    item.datas.map((tab) => {
                        if (tab.id === id) {
                            tab.isCheck = !tab.isCheck;
                            if (tab.isCheck === true) {
                                item.status = true;
                                tab.authorizations.map((auth) => {
                                    auth.isActive = true;
                                    return auth;
                                });
                            }
                            if (tab.isCheck === false) {
                                tab.authorizations.map((auth) => {
                                    auth.isActive = false;
                                    return auth;
                                });
                            }
                        }
                        if (tab.isCheck === false) {
                            tabStatusNum++;
                        }

                        if (tabStatusNum === item.datas.length) item.status = false;
                        return tab;
                    });
                }
                return item;
            })
        );
        setTableItems(newTable);
    };

    const permissionNameIsActive = (parentId, itemId, perId) => {
        const newTable = tableItems.map((data) =>
            data.map((item) => {
                if (item.id === parentId) {
                    item.datas.map((x) => {
                        if (x.id === itemId) {
                            x.authorizations.map((per) => {
                                if (per.id === perId) {
                                    if (perId === 1) {
                                        if (per.isActive === true) {
                                            per.isActive = false;
                                            x.isCheck = false;
                                            const filteredData = x.authorizations.filter((element) => element.id !== 1);
                                            filteredData.map((el) => (el.isActive = false));
                                            const datas = item.datas.filter((el) => el.isCheck === true);

                                            if (datas?.length !== 0) {
                                                item.status = true;
                                            } else item.status = false;
                                        } else {
                                            per.isActive = true;
                                            x.isCheck = true;
                                            item.status = true;
                                        }
                                    } else {
                                        if (per.isActive === false) {
                                            per.isActive = true;
                                            const filteredData = x.authorizations.filter((element) => element.id === 1);
                                            filteredData.map((el) => (el.isActive = true));
                                            x.isCheck = true;
                                            item.status = true;
                                        } else {
                                            per.isActive = false;
                                            const filteredData = x.authorizations.filter((element) => element.id === 1);
                                            filteredData.map((el) => (el.isActive = true));
                                            if (filteredData[0].isActive === true) {
                                                item.status = true;
                                            } else item.status = false;
                                        }
                                    }
                                }
                                return per;
                            });
                        }
                        return x;
                    });
                }
                return item;
            })
        );
        setTableItems(newTable);
    };

    const moduleStatus = (tabs) => {
        const perStatusResult = tabs.map((tab) => checkStatus(tab));
        const result = perStatusResult.find((per) => per === true);

        if (result === undefined) return false;
        else return true;
    };

    const checkStatus = (tab) => {
        const viewInfo = tab.authorizations?.find((auth) => auth.isAuthorized === true);
        if (viewInfo === undefined) return false;
        else return true;
    };

    useEffect(() => {
        FetchApiGet(`services/AuthorizationSystem/RolePermissions/GetPermissionsTheRole?id=${roleId}`, 'GET').then(
            (res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((data) => {
                                const arr = data.data?.map((items) =>
                                    items.pages.map((item) => ({
                                        id: item.id,
                                        mainHeader: items.label,
                                        headerId: items.label,
                                        parentHeader: item.label,
                                        status: moduleStatus(item.tabs),
                                        moduleId: item.moduleId,
                                        datas: item.tabs.map((tab) => ({
                                            id: tab.id,
                                            isParentHeader: false,
                                            isParent: false,
                                            parentHeader: tab.tabName,
                                            isChild: true,
                                            mainHeader: items.label,
                                            scope:
                                                item.tabs[0].authorizations[0].scopeId === 0
                                                    ? 'global access'
                                                    : item.tabs[0].authorizations[0].scopeId === 1
                                                    ? 'restricted access'
                                                    : 'territory access / group access',
                                            scopeId: item.tabs[0].authorizations[0].scopeId,
                                            isCheck: checkStatus(tab),
                                            authorizations: tab.authorizations.map((aut, index) => ({
                                                id: aut.id,
                                                pageTabId: tab.id,
                                                name: aut.authorizationName,
                                                isActive: aut.isAuthorized,
                                                scopeId: aut.scopeId,
                                            })),
                                        })),
                                    }))
                                );
                                setTableItems(arr);
                            });
                        } else if (res.status === 500 || res.status === 499) {
                            history.push('/error-500');
                        } else {
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                })()
        );
    }, [history]);
    return (
        <div>
            <div className="permissions-view">
                {tableItems?.map((item, index) =>
                    item?.map((data, i) => (
                        <div key={i} id={i === 0 && data.headerId}>
                            {i === 0 && <h4> {data.mainHeader} </h4>}
                            <div className="label-and-table">
                                {data.datas?.length !== 0 && (
                                    <label className="custom-checkbox-label">
                                        <input
                                            type="checkbox"
                                            onClick={() => changePermissions(data.id)}
                                            checked={data.status}
                                        />

                                        <div className="checkbox-text">{data.parentHeader}</div>
                                    </label>
                                )}
                                {data.datas?.length !== 0 &&
                                    data.datas.map((item, key) => (
                                        <table key={key} className="permissions-container">
                                            <tbody>
                                                <tr className="permission-block">
                                                    <td className="permissions-for">
                                                        <div
                                                            className={`custom-checkbox ${
                                                                item.isParentHeader === false ? 'not-parent' : 'parent'
                                                            }`}>
                                                            <label className="custom-checkbox-label">
                                                                <input
                                                                    type="checkbox"
                                                                    onClick={() => changeTab(data.id, item.id)}
                                                                    checked={item.isCheck}
                                                                />

                                                                <div className="checkbox-text">{item.parentHeader}</div>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="privileges col-md-8">
                                                        <div className="d-flex">
                                                            <div className="flex--2">
                                                                {item?.authorizations?.map((per, perIndex) => (
                                                                    // ${item.permissions.length === index+1 && 'last'}
                                                                    <div
                                                                        className={`each-privilege ${
                                                                            per.isActive === false ? 'passive' : null
                                                                        } ${
                                                                            item.authorizations.length ===
                                                                                perIndex + 1 && 'last'
                                                                        }`}>
                                                                        <span
                                                                            onClick={() =>
                                                                                permissionNameIsActive(
                                                                                    data.id,
                                                                                    item.id,
                                                                                    per.id
                                                                                )
                                                                            }>
                                                                            {per.name}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="flex--auto">
                                                                <div className="scope">
                                                                    <div>
                                                                        <div className="fsa-tag-content">
                                                                            <div className="tag-content">
                                                                                <span>{item.scope}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PermissionsEdit;
