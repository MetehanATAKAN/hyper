import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { setNewSubProcessId } from '../../../../redux/taskManagement/actions';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';

const UpdateName = (props) => {
    const {
        setOnModal,
        subProcess,
        updateSubProcess,
        setUpdateSubProcess,
        setTabValue,
        activityTypes,
        setSubProcess,
        filterBtn,
        setFilterSubData,
        selectProcessName,
        selectDepartments,
        selectApprove,
    } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const subProcessIdNew = useSelector((state) => state.TaskManagement.newSubProcessId);
    const subProcessIdOld = useSelector((state) => state.TaskManagement.oldSubProcessId);
    const [subProcessName, setSubProcessName] = useState('');
    const [selectActivity, setSelectActivity] = useState({
        id: 0,
        value: 'select activity types',
        label: t('select activity types'),
    });
    const [selectJobDescription, setSelectJobDescription] = useState({
        id: 0,
        value: 'select main process',
        label: t('select main process'),
    });
    const [jobDescriptionOptions, setJobDescriptionOptions] = useState([]);
    const [selectBusiness, setSelectBusiness] = useState({
        id: 0,
        value: 'select business process',
        label: t('select business process'),
    });
    const [businessOptions, setBusinessOptions] = useState([]);
    const [selectParent, setSelectParent] = useState({
        id: 0,
        value: 'select process',
        label: t('select process'),
    });
    const [parentOptions, setParentOptions] = useState([]);
    const [selectProductProcess, setSelectProductProcess] = useState({
        id: 0,
        value: 'select product or process',
        label: t('select product or process'),
    });
    const productProcessOptions = [
        { id: 1, value: 'product', label: t('product') },
        { id: 2, value: 'process', label: t('process') },
    ];
    //
    const [selectDepartment, setSelectDepartment] = useState({
        id: 0,
        value: 'select department',
        label: t('select department'),
    });
    const [departmantOptions, setDepartmentOptions] = useState([]);
    const [positionOptions, setPositionOptions] = useState([]);
    const [selectChainCompany, setSelectChainCompany] = useState([]);
    const [selectChainOffice, setSelectChainOffice] = useState([]);
    const [selectChainSide, setSelectChainSide] = useState([]);
    const [companyIds, setCompanyIds] = useState('');
    const [officeIds, setOfficeIds] = useState('');
    const [sideIds, setSideIds] = useState('');
    useEffect(() => {
        FetchApiGet('services/TaskManagement/SubProcess/GetDepartmant', 'GET')
            .then((res) => res.json())
            .then((res) =>
                res.data.map((item) =>
                    setDepartmentOptions((prev) => [
                        ...prev,
                        { id: item.departmantId, value: item.departmantName, label: t(item.departmantName) },
                    ])
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
                        updateSubProcess[0].serviceCompanies.includes(item.positionName) &&
                            setSelectChainCompany((prev) => [
                                ...prev,
                                { id: item.positionId, value: item.positionName, label: t(item.positionName) },
                            ]),
                        updateSubProcess[0].regionalOffices.includes(item.positionName) &&
                            setSelectChainOffice((prev) => [
                                ...prev,
                                { id: item.positionId, value: item.positionName, label: t(item.positionName) },
                            ]),
                        updateSubProcess[0].productionSides.includes(item.positionName) &&
                            setSelectChainSide((prev) => [
                                ...prev,
                                { id: item.positionId, value: item.positionName, label: t(item.positionName) },
                            ])
                    )
                )
            )
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (e) => {
        setSubProcessName(e.target.value);
    };
    useEffect(() => {
        const id1 = selectChainCompany.map((x) => x.id);
        setCompanyIds(id1.join(','));
        const id2 = selectChainOffice.map((x) => x.id);
        setOfficeIds(id2.join(','));
        const id3 = selectChainSide.map((x) => x.id);
        setSideIds(id3.join(','));
    }, [selectChainCompany, selectChainOffice, selectChainSide]);
    const loggedUserName = localStorage.getItem('userName');
    const handleSubmit = (e) => {
        e.preventDefault();
        const conditionArr = [
            subProcess !== '',
            Number(selectProductProcess.id) !== 0,
            Number(selectParent.id) !== 0,
            Number(selectDepartment.id) !== 0,
            Number(selectChainCompany.id) !== 0,
            Number(selectChainOffice.id) !== 0,
            Number(selectChainSide.id) !== 0,
        ];
        if (conditionArr.every((v) => v === true)) {
            (async () => {
                try {
                    const subData = await {
                        id: Number(subProcessIdNew) === 0 ? Number(subProcessIdOld) : Number(subProcessIdNew),
                        subProcessTitle: subProcessName,
                        modifiedBy: loggedUserName,
                        parentProcessId: Number(selectParent.id),
                        productOrProcess: Number(selectProductProcess.id),
                        departmantId: Number(selectDepartment.id),
                        departmantName: selectDepartment.value,
                        serviceCompanyIds: companyIds,
                        regionalOfficeIds: officeIds,
                        productionSideIds: sideIds,
                    };
                    const res = await FetchApiPost(
                        'services/TaskManagement/SubProcess/UpdateSubProcess',
                        'POST',
                        subData
                    );
                    const js = await res.json();
                    await dispatch(setNewSubProcessId(js.data.id));
                    setTabValue('2');
                    const response = await FetchApiGet('services/TaskManagement/SubProcess/GetAllSubProcess', 'GET');
                    const json = await response.json();
                    await setSubProcess([json.data]);
                    const processIds = await selectProcessName.map((x) => x.id);
                    const departmentIds = await selectDepartments.map((x) => x.id);
                    const approveIds = await selectApprove.map((x) => x.id);
                    const filterData = await json.data.filter(
                        (el) =>
                            processIds.includes(el.parentProcessId) &&
                            departmentIds.includes(el.departmantId) &&
                            approveIds.includes(el.isApproveNecessary)
                    );
                    await setFilterSubData([...filterData]);
                    setSubProcessName('');
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    };

    const changeActivity = (e) => {
        setSelectActivity(e);
    };
    const changeJobDescription = (e) => {
        setSelectJobDescription(e);
    };
    const changeBusiness = (e) => {
        setSelectBusiness(e);
    };
    const changeParent = (e) => {
        setSelectParent(e);
    };
    useEffect(() => {
        setSubProcessName(updateSubProcess[0].title);
        setSelectActivity({
            id: updateSubProcess[0].activityTypeId,
            value: updateSubProcess[0].activityTypeName,
            label: updateSubProcess[0].activityTypeName,
        });
        setSelectJobDescription({
            id: updateSubProcess[0].mainProcessId,
            value: updateSubProcess[0].mainProcessName,
            label: updateSubProcess[0].mainProcessName,
        });
        setSelectBusiness({
            id: updateSubProcess[0].businessProcessId,
            value: updateSubProcess[0].businessProcessName,
            label: updateSubProcess[0].businessProcessName,
        });
        setSelectParent({
            id: updateSubProcess[0].parentProcessId,
            value: updateSubProcess[0].parentProcessTitle,
            label: updateSubProcess[0].parentProcessTitle,
        });
        setSelectDepartment({
            id: updateSubProcess[0].departmantId,
            value: updateSubProcess[0].departmantName,
            label: t(updateSubProcess[0].departmantName),
        });
        updateSubProcess[0].productorProcess === 1
            ? setSelectProductProcess({ id: 1, value: 'product', label: t('product') })
            : setSelectProductProcess({ id: 2, value: 'process', label: t('process') });
    }, []);
    useEffect(() => {
        if (selectActivity.id !== 0 && updateSubProcess[0].activityTypeId !== selectActivity.id) {
            FetchApiGet(
                `services/TaskManagement/JobDescription/GetJobDescriptionListByActivityTypeId?activityTypeId=${selectActivity.id}`,
                'GET'
            )
                .then((res) => res.json())
                .then(
                    (json) => (
                        setSelectJobDescription({
                            id: 0,
                            value: 'select main process',
                            label: t('select main process'),
                        }),
                        setSelectBusiness({
                            id: 0,
                            value: 'select business process',
                            label: t('select business process'),
                        }),
                        setSelectParent({
                            id: 0,
                            value: 'select process',
                            label: t('select process'),
                        }),
                        setJobDescriptionOptions([json.data])
                    )
                )
                .catch((err) => console.log(err));
        }
    }, [selectActivity]);
    useEffect(() => {
        if (selectJobDescription.id !== 0 && selectJobDescription.id !== updateSubProcess[0].mainProcessId) {
            FetchApiGet(
                `services/TaskManagement/BusinessProcess/GetBusinessProcessListByJobDescriptionId?jobDescriptionId=${selectJobDescription.id}`,
                'GET'
            )
                .then((res) => res.json())
                .then(
                    (json) => (
                        setSelectBusiness({
                            id: 0,
                            value: 'select business process',
                            label: t('select business process'),
                        }),
                        setBusinessOptions([json.data])
                    )
                )
                .catch((err) => console.log(err));
        }
    }, [selectJobDescription]);
    useEffect(() => {
        if (selectBusiness.id !== 0 && selectBusiness.id !== updateSubProcess[0].businessProcessId) {
            FetchApiGet(
                `services/TaskManagement/ParentProcess/GetParentProcessListByBusinessProcessId?businessProcessId=${selectBusiness.id}`,
                'GET'
            )
                .then((res) => res.json())
                .then(
                    (json) => (
                        setSelectParent({
                            id: 0,
                            value: 'select process',
                            label: t('select process'),
                        }),
                        setParentOptions([json.data])
                    )
                )
                .catch((err) => console.log(err));
        }
    }, [selectBusiness]);
    return (
        <div className="sub-process-name">
            <div className="parent-process-activity-type">
                <label>
                    <span style={{ color: 'red' }}>*</span> {t('activity types')}
                </label>
                <Select
                    isMulti={false}
                    isSearchable={false}
                    className="react-select"
                    placeholder="select"
                    classNamePrefix="react-select"
                    onChange={changeActivity}
                    value={selectActivity}
                    options={activityTypes?.map((option) => ({
                        id: option.id,
                        value: option.title,
                        label: option.title,
                    }))}></Select>
            </div>
            <div className="parent-process-job-description">
                <label>
                    <span style={{ color: 'red' }}>*</span> {t('main process')}
                </label>
                <Select
                    isMulti={false}
                    isSearchable={false}
                    isDisabled={selectActivity.id === 0}
                    className="react-select"
                    placeholder="select"
                    classNamePrefix="react-select"
                    onChange={changeJobDescription}
                    value={selectJobDescription}
                    options={jobDescriptionOptions[0]?.map((option) => ({
                        id: option.id,
                        value: option.mainProcess,
                        label: option.mainProcess,
                    }))}></Select>
            </div>
            <div className="parent-process-business-process">
                <label>
                    <span style={{ color: 'red' }}>*</span> {t('business process')}
                </label>
                <Select
                    isMulti={false}
                    isSearchable={false}
                    isDisabled={selectJobDescription.id === 0}
                    className="react-select"
                    placeholder="select"
                    classNamePrefix="react-select"
                    onChange={changeBusiness}
                    value={selectBusiness}
                    options={businessOptions[0]?.map((option) => ({
                        id: option.id,
                        value: option.businessProcessTitle,
                        label: option.businessProcessTitle,
                    }))}></Select>
            </div>
            <div className="parent-process-business-process">
                <label>
                    <span style={{ color: 'red' }}>*</span> {t('process')}
                </label>
                <Select
                    isMulti={false}
                    isSearchable={false}
                    isDisabled={selectBusiness.id === 0}
                    className="react-select"
                    placeholder="select"
                    classNamePrefix="react-select"
                    onChange={changeParent}
                    value={selectParent}
                    options={parentOptions[0]?.map((option) => ({
                        id: option.id,
                        value: option.title,
                        label: option.title,
                    }))}></Select>
            </div>
            <Row>
                <Col xs={6}>
                    <div className="parent-process-business-process">
                        <label>
                            <span style={{ color: 'red' }}>*</span> {t('product and process')}
                        </label>
                        <Select
                            isMulti={false}
                            isSearchable={false}
                            isDisabled={selectBusiness.id === 0}
                            className="react-select"
                            placeholder="select"
                            classNamePrefix="react-select"
                            onChange={(e) => setSelectProductProcess(e)}
                            value={selectProductProcess}
                            options={productProcessOptions?.map((option) => ({
                                id: option.id,
                                value: option.value,
                                label: option.label,
                            }))}></Select>
                    </div>
                </Col>
                <Col xs={6}>
                    <div className="parent-process-add-sub">
                        <label>
                            <span style={{ color: 'red' }}>*</span> {t('sub process')}
                        </label>
                        <Form.Control
                            disabled={selectProductProcess.id === 0}
                            type="text"
                            data-testid="sub-process-name"
                            value={subProcessName}
                            onChange={handleChange}
                            placeholder={t('add sub process')}></Form.Control>
                    </div>
                </Col>
            </Row>
            <hr style={{ marginBottom: '8px' }} />
            <div className="sub-process-dropdowns">
                <label>
                    <span style={{ color: 'red' }}>*</span> {t('department')}
                </label>
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
                <label>
                    <span style={{ color: 'red' }}>*</span> {t('chain of responsible position services company')}
                </label>
                <MultiSelect
                    value={selectChainCompany}
                    options={positionOptions.filter(
                        (el) => !selectChainOffice.includes(el) && !selectChainSide.includes(el)
                    )}
                    onChange={(e) => setSelectChainCompany(e.map((x) => x))}
                    overrideStrings={{
                        allItemsAreSelected: t(`All company are selected.`),
                        noOptions: t('No options'),
                        search: t('Search'),
                        selectAll: t('Select All'),
                        selectSomeItems: t('Select service company'),
                    }}
                />
            </div>
            <div className="sub-process-dropdowns">
                <label>
                    <span style={{ color: 'red' }}>*</span> {t('chain of responsible position regional office')}
                </label>
                <MultiSelect
                    value={selectChainOffice}
                    options={positionOptions.filter(
                        (el) => !selectChainCompany.includes(el) && !selectChainSide.includes(el)
                    )}
                    onChange={(e) => setSelectChainOffice(e.map((x) => x))}
                    overrideStrings={{
                        allItemsAreSelected: t(`All company are selected.`),
                        noOptions: t('No options'),
                        search: t('Search'),
                        selectAll: t('Select All'),
                        selectSomeItems: t('Select regional office'),
                    }}
                />
            </div>
            <div className="sub-process-dropdowns">
                <label>
                    <span style={{ color: 'red' }}>*</span> {t('chain of responsible position production side')}
                </label>
                <MultiSelect
                    value={selectChainSide}
                    options={positionOptions.filter(
                        (el) => !selectChainCompany.includes(el) && !selectChainOffice.includes(el)
                    )}
                    onChange={(e) => setSelectChainSide(e.map((x) => x))}
                    overrideStrings={{
                        allItemsAreSelected: t(`All company are selected.`),
                        noOptions: t('No options'),
                        search: t('Search'),
                        selectAll: t('Select All'),
                        selectSomeItems: t('Select production side'),
                    }}
                />
            </div>
            <div className="task-management-sub-process-footer-btn">
                <Button
                    variant="light"
                    onClick={() => {
                        setOnModal(false);
                    }}>
                    {t('cancel')}
                </Button>
                <Button data-testid="create-sub-process" variant="warning" onClick={handleSubmit}>
                    {t('update')}
                </Button>
            </div>
        </div>
    );
};

export default React.memo(UpdateName);
