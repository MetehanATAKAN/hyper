import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';

const UpdateApprove = ({ setOnModal, updateSubProcess, setTabValue }) => {
    const { t } = useTranslation();
    const subProcessIdNew = useSelector((state) => state.TaskManagement.newSubProcessId);
    const subProcessIdOld = useSelector((state) => state.TaskManagement.oldSubProcessId);
    const loggedUserName = localStorage.getItem('userName');
    const [updateApproveData, setUpdateApproveData] = useState([]);
    const [departmantOptions, setDepartmentOptions] = useState([]);
    const [positionOptions, setPositionOptions] = useState([]);
    const [selectDepartment, setSelectDepartment] = useState({
        id: 0,
        value: 'select department',
        label: t('select department'),
    });
    const [selectChainCompany, setSelectChainCompany] = useState({
        id: 0,
        value: 'company',
        label: t('company'),
    });
    const [selectChainOffice, setSelectChainOffice] = useState({
        id: 0,
        value: 'office',
        label: t('office'),
    });
    const [selectChainSide, setSelectChainSide] = useState({
        id: 0,
        value: 'side',
        label: t('side'),
    });
    useEffect(() => {
        (async () => {
            try {
                const response = await FetchApiGet(
                    `services/TaskManagement/SubProcess/GetApproveBySubProcessId?subProcessId=${Number(
                        subProcessIdOld
                    )}`,
                    'GET'
                );
                const json = await response.json();
                await setUpdateApproveData(json.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [subProcessIdOld]);
    useEffect(() => {
        FetchApiGet('services/TaskManagement/SubProcess/GetDepartmant', 'GET')
            .then((res) => res.json())
            .then((res) =>
                res.data.map(
                    (item) => (
                        setDepartmentOptions((prev) => [
                            ...prev,
                            { id: item.departmantId, value: item.departmantName, label: t(item.departmantName) },
                        ]),
                        item.departmantId === updateApproveData.departmantId &&
                            setSelectDepartment({
                                id: item.departmantId,
                                value: item.departmantName,
                                label: t(item.departmantName),
                            })
                    )
                )
            )
            .catch((err) => console.log(err));

        FetchApiGet('services/TaskManagement/SubProcess/GetAllPosition', 'GET')
            .then((res) => res.json())
            .then((res) =>
                res.data.map(
                    (item) => (
                        setPositionOptions((prev) => [
                            ...prev,
                            { id: item.positionId, value: item.positionName, label: t(item.positionName) },
                        ]),
                        item.positionId === updateApproveData.serviceCompanyId &&
                            setSelectChainCompany({
                                id: item.positionId,
                                value: item.positionName,
                                label: t(item.positionName),
                            }),
                        item.positionId === updateApproveData.regionalOfficeId &&
                            setSelectChainOffice({
                                id: item.positionId,
                                value: item.positionName,
                                label: t(item.positionName),
                            }),
                        item.positionId === updateApproveData.productionSideId &&
                            setSelectChainSide({
                                id: item.positionId,
                                value: item.positionName,
                                label: t(item.positionName),
                            })
                    )
                )
            )
            .catch((err) => console.log(err));
    }, [updateApproveData]);

    const updateApprove = () => {
        const data = {
            subProcessId: Number(subProcessIdNew) === 0 ? Number(subProcessIdOld) : Number(subProcessIdNew),
            departmantId: Number(selectDepartment.id),
            departmantName: selectDepartment.value,
            modifiedBy: loggedUserName,
            serviceCompanyId: Number(selectChainCompany.id),
            serviceCompanyName: selectChainCompany.value,
            regionalOfficeId: Number(selectChainOffice.id),
            regionalOfficeName: selectChainOffice.value,
            productionSideId: Number(selectChainSide.id),
            productionSideName: selectChainSide.value,
        };
        FetchApiPost('services/TaskManagement/SubProcess/UpdateApproveSubProcess', 'POST', data).catch((err) =>
            console.log(err)
        );
        setTabValue('3');
    };
    return (
        <div className="sub-process-approve">
            <Form>
                <label>{t('necessary')}</label>
                <Form.Check type="switch" id="custom-switch" />
            </Form>
            <div className="sub-process-dropdowns">
                <label>{t('department')}</label>
                <Select
                    isMulti={false}
                    className="react-select"
                    placeholder="select"
                    classNamePrefix="react-select"
                    value={selectDepartment}
                    onChange={(e) => setSelectDepartment(e)}
                    options={departmantOptions}></Select>
            </div>
            <div className="sub-process-dropdowns">
                <label>{t('chain of responsible position services company')}</label>
                <Select
                    isMulti={false}
                    className="react-select"
                    placeholder="select"
                    classNamePrefix="react-select"
                    value={selectChainCompany}
                    onChange={(e) => setSelectChainCompany(e)}
                    options={positionOptions}></Select>
            </div>
            <div className="sub-process-dropdowns">
                <label>{t('chain of responsible position regional office')}</label>
                <Select
                    isMulti={false}
                    className="react-select"
                    placeholder="select"
                    classNamePrefix="react-select"
                    value={selectChainOffice}
                    onChange={(e) => setSelectChainOffice(e)}
                    options={positionOptions.filter((el) => el.id !== selectChainCompany.id)}></Select>
            </div>
            <div className="sub-process-dropdowns">
                <label>{t('chain of responsible position production side')}</label>
                <Select
                    isMulti={false}
                    className="react-select"
                    placeholder="select"
                    classNamePrefix="react-select"
                    value={selectChainSide}
                    onChange={(e) => setSelectChainSide(e)}
                    options={positionOptions.filter(
                        (el) => el.id !== selectChainCompany.id && el.id !== selectChainOffice.id
                    )}></Select>
            </div>
            <div className="task-management-sub-process-footer-btn">
                <Button onClick={() => setOnModal(false)} variant="light">
                    {t('cancel')}
                </Button>
                <Button data-testid="create-sub-process" onClick={updateApprove} variant="warning">
                    {t('update')}
                </Button>
            </div>
        </div>
    );
};

export default React.memo(UpdateApprove);
