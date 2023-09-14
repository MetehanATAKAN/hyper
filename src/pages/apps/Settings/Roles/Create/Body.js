import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Row, Col } from 'react-bootstrap';
import { SingleSelects, MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { AutoCompleteInput, NewInput } from '../../../../../components/GlobalNew/Inputs';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';

const Body = ({ setButtonDisableStatus, onClickAddBtn, setIsShow, setFilterData, getAllFilterData }) => {
    const { t } = useTranslation();

    const [roleName, setRoleName] = useState('');
    const [roleNameOptions, setRoleNameOptions] = useState([]);

    const [roleClone, setRoleClone] = useState();
    const [roleCloneOptions, setRoleCloneOptions] = useState([]);

    const [globalCheck, setGlobalCheck] = useState(false);
    const [restrictedCheck, setRestrictedCheck] = useState(false);
    const [territoryCheck, setTerritoryCheck] = useState(false);

    const handleChangeCheckBox = (checkbox) => {
        switch (checkbox) {
            case 'global':
                setGlobalCheck(!globalCheck);
                setRestrictedCheck(false);
                setTerritoryCheck(false);
                break;
            case 'restricted':
                setGlobalCheck(false);
                setRestrictedCheck(!restrictedCheck);
                setTerritoryCheck(false);
                break;
            case 'territory':
                setGlobalCheck(false);
                setRestrictedCheck(false);
                setTerritoryCheck(!territoryCheck);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (roleName.trim().length > 0 && (globalCheck || restrictedCheck || territoryCheck)) {
            setButtonDisableStatus(false);
        } else {
            setButtonDisableStatus(true);
        }
    }, [roleName, roleClone, globalCheck, restrictedCheck, territoryCheck]);

    useEffect(() => {
        FetchApiGet('services/AuthorizationSystem/Role/GetAllRole', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setRoleCloneOptions(
                        data.data.map((item) => {
                            return {
                                label: item.roleName,
                                value: item.id,
                            };
                        })
                    );
                });
            }
        });
    }, []);

    useEffect(() => {
        const data = {
            roleName: roleName.trim(),
            copyRoleId: roleClone !== undefined ? String(roleClone.value) : '0',
            scopeId: globalCheck ? 0 : restrictedCheck ? 1 : 2,
            createdBy: localStorage.getItem('userName'),
        };
        if (onClickAddBtn) {
            FetchApiPost('services/AuthorizationSystem/Role/CreateRole', 'POST', data).then((res) => {
                if (res.status === 201) {
                    res.json().then((data) => {
                        getAllFilterData();
                        setIsShow(false);
                    });
                }
            });
        }
    }, [onClickAddBtn]);

    return (
        <div className="setting-role-create">
            <Row>
                <Col>
                    <AutoCompleteInput
                        value={roleName}
                        setValue={setRoleName}
                        label={'role name'}
                        isStar={true}
                        placeholder={'role name'}
                        width={'100%'}
                        options={roleNameOptions}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <SingleSelects
                        selectedItems={roleClone}
                        setSelectedItems={setRoleClone}
                        options={roleCloneOptions}
                        label={'select a role to clone'}
                        width={'100%'}
                    />
                </Col>
            </Row>
            <Row>
                <label>{t('set the default scope gor this role')}</label>
            </Row>
            <Row className="create-role-checkbox-container">
                <Col>
                    <Form.Check type="radio" checked={globalCheck} onClick={() => handleChangeCheckBox('global')} />
                </Col>
                <Col className="create-role-checkbox-container__labels">
                    <label>{t('global access')}</label>
                    <label>{t('can access all records')}</label>
                </Col>
            </Row>
            <Row className="create-role-checkbox-container">
                <Col>
                    <Form.Check
                        type="radio"
                        checked={restrictedCheck}
                        onClick={() => handleChangeCheckBox('restricted')}
                    />
                </Col>
                <Col className="create-role-checkbox-container__labels">
                    <label>{t('restricted access')}</label>
                    <label>{t('can only access assigned records')}</label>
                </Col>
            </Row>
            <Row className="create-role-checkbox-container">
                <Col>
                    <Form.Check
                        type="radio"
                        checked={territoryCheck}
                        onClick={() => handleChangeCheckBox('territory')}
                    />
                </Col>
                <Col className="create-role-checkbox-container__labels">
                    <label>{t('territory access / group access')}</label>
                    <label>{t('Can access records in their territory/groups; can also access assigned records')}</label>
                </Col>
            </Row>
            {globalCheck && (
                <Row className="create-role-checkbox-description">
                    <label>{t('Global access')}</label>
                    <p>
                        {t(
                            'This is useful managers and admins who need complate access to data across the organization'
                        )}
                    </p>
                </Row>
            )}
            {restrictedCheck && (
                <Row className="create-role-checkbox-description">
                    <label>{t('Restricted access')}</label>
                    <p>
                        {t(
                            'This works best for vendors, constractors and partners who need to have restricted access to your data'
                        )}
                    </p>
                </Row>
            )}
            {territoryCheck && (
                <Row className="create-role-checkbox-description">
                    <label>{t('Territory access / Group access')}</label>
                    <p>
                        {t('Territory access is ideal for sales teams who need to access data by territories')} (
                        {t('defined by regions, sources, or business size')}).{' '}
                        {t('Group access is ideal for support agents who need to access conversations by groups')} (
                        {t('like sales groups, billing groups, and support groups')})
                    </p>
                </Row>
            )}
        </div>
    );
};

export default Body;
