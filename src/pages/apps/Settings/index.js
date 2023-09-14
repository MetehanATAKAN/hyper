import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../../components/BreadCrumb';
import Tab from '../../../components/Tab';
import Roles from './Roles';
import Permissions from './Permissions';
import { useTranslation } from 'react-i18next';
import ManageLeftBar from './ManageBar';
import { FetchApiPost } from '../../../utils/http.helper';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import Columns from './Columns';
const Settings = () => {
    const { t } = useTranslation();
    const [rolesAssignUserButton, setRolesAssignUserButton] = useState(false);
    const history = useHistory();
    const [roleId, setRoleId] = useState(null);
    const pageTabs = useSelector((state) => state.UserPermission.pageTabs);

    const breadCrumbProps = [{ label: 'Home', url: '/apps/calendar' }, { label: 'Settings' }];
    const [selectTab, setSelectTab] = useState({
        key: 3,
        label: t('Manage left nav bar'),
    });

    const [tabProps, setTabProps] = useState([]);
    useEffect(() => {
        const tabsArr = pageTabs?.map((tab, index) => ({
            key: index,
            label: t(tab.tabName),
        }));
        setTabProps(tabsArr);
    }, [pageTabs]);
    return (
        <div className="settings-page">
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <Tab selectTab={selectTab} setSelectTab={setSelectTab} tabProps={tabProps} />
            {selectTab.key === 0 && (
                <Roles
                    setRolesAssignUserButton={setRolesAssignUserButton}
                    setSelectTab={setSelectTab}
                    setRoleId={setRoleId}
                    roleId={roleId}
                />
            )}
            {selectTab.key === 1 && (
                <Permissions
                    rolesAssignUserButton={rolesAssignUserButton}
                    setRolesAssignUserButton={setRolesAssignUserButton}
                    roleId={roleId}
                />
            )}
            {selectTab.key === 2 && <ManageLeftBar />}
            {selectTab.key === 3 && <Columns />}
        </div>
    );
};

export default Settings;
