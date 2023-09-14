import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '@mdi/react';
import { mdiAccountPlus } from '@mdi/js';
import AssignUserModal from './AssignUserModal/index';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SuccessModal from '../../../../components/Modals/SuccessModal';

const PermissionsActionsButtons = ({ tableItems, roleId }) => {
    const { t } = useTranslation();
    const history = useHistory();

    //createdBy
    const createdBy = localStorage.getItem('userName');
    const [show, setShow] = useState(false);

    const [successModal, setSuccessModal] = useState(false);

    const save = () => {
        const datas = [];
        const body = {
            x: tableItems?.forEach((element) => {
                element?.forEach((data) => {
                    data?.datas?.forEach((item) => {
                        if (item.isCheck === true) {
                            item?.authorizations?.map((per) => datas.push(per));
                        }
                    });
                });
            }),
        };

        const apiBody = {
            permission: datas?.map((item) => ({
                pageTabId: String(item.pageTabId),
                authorizationId: String(item.id),
                authorizationValue: item.isActive,
                scopeId: item.scopeId,
                createdBy: createdBy,
            })),
            roleId: String(roleId),
        };
        FetchApiPost('services/AuthorizationSystem/RolePermissions/AuthorizeTheRole', 'POST', apiBody).then((res) =>
            (async () => {
                try {
                    if (res.status === 201) {
                        setSuccessModal(true);
                    } else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    } else {
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    };
    return (
        <>
            <div className="assign-user-buttons d-flex justify-content-between">
                <div className="d-flex assign-user" onClick={() => setShow(true)}>
                    <button className="assign-user-button text">{t('assign user')}</button>

                    <button className="assign-user-button icon">
                        <Icon path={mdiAccountPlus} />
                    </button>
                </div>
                <button
                    className="assign-user-button text" //save button classname
                    onClick={save}>
                    {t('save')}
                </button>
            </div>

            <AssignUserModal isShow={show} setIsShow={setShow} roleId={roleId} />
            <SuccessModal show={successModal} handleClose={setSuccessModal} messages="Save Successful" />
        </>
    );
};

export default PermissionsActionsButtons;
