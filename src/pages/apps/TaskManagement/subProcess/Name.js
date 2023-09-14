import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { MultiSelect } from 'react-multi-select-component';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { setNewSubProcessId } from '../../../../redux/taskManagement/actions';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';

const Name = (props) => {
    const { setOnModal, subProcess, activityTypes, setSubProcess, parentProcess, setParentProcess, setTabValue } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
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

    const [sop, setSop] = useState('');

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
                res.data.map((item) =>
                    setPositionOptions((prev) => [
                        ...prev,
                        { id: item.positionId, value: item.positionName, label: item.positionName },
                    ])
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
            // sop.trim().length > 0,
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
                        subProcessTitle: subProcessName,
                        createdBy: loggedUserName,
                        productOrProcess: Number(selectProductProcess.id),
                        parentProcessId: Number(selectParent.id),
                        departmantId: Number(selectDepartment.id),
                        departmantName: selectDepartment.value,
                        serviceCompanyIds: companyIds,
                        regionalOfficeIds: officeIds,
                        productionSideIds: sideIds,
                        positionName: null,
                        positionId: 0,
                        sop: null
                    };
                    const res = await FetchApiPost(
                        'services/TaskManagement/SubProcess/CreateSubProcess',
                        'POST',
                        subData
                    );
                    const js = await res.json();
                    await dispatch(setNewSubProcessId(js.data.id));
                    const response = await FetchApiGet('services/TaskManagement/SubProcess/GetAllSubProcess', 'GET');
                    const json = await response.json();
                    await setSubProcess(json.data);
                    setSubProcessName('');
                    let disableButton = await parentProcess?.map((item) =>
                        item.id === selectParent.id ? { ...item, isDeleteable: false } : item
                    );
                    setParentProcess(disableButton);
                    setTabValue('2')
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
        if (selectActivity.id !== 0) {
            FetchApiGet(
                `services/TaskManagement/JobDescription/GetJobDescriptionListByActivityTypeId?activityTypeId=${selectActivity.id}`,
                'GET'
            )
                .then((res) => res.json())
                .then((json) =>
                    json.data.length === 1
                        ? (setSelectJobDescription({
                              id: json.data[0].id,
                              value: json.data[0].mainProcess,
                              label: json.data[0].mainProcess,
                          }),
                          setJobDescriptionOptions([json.data])
                          )
                        : (setSelectJobDescription({
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
                          setJobDescriptionOptions([json.data]))
                )
                .catch((err) => console.log(err));
        }
    }, [selectActivity]);
    useEffect(() => {
        if (selectJobDescription.id !== 0) {
            FetchApiGet(
                `services/TaskManagement/BusinessProcess/GetBusinessProcessListByJobDescriptionId?jobDescriptionId=${selectJobDescription.id}`,
                'GET'
            )
                .then((res) => res.json())
                .then((json) =>
                    json.data.length === 1
                        ? (setSelectBusiness({
                              id: json.data[0].id,
                              value: json.data[0].businessProcessTitle,
                              label: json.data[0].businessProcessTitle,
                          }),
                          setBusinessOptions([json.data]))
                        : (setSelectBusiness({
                              id: 0,
                              value: 'select business process',
                              label: t('select business process'),
                          }),
                          setBusinessOptions([json.data]))
                )
                .catch((err) => console.log(err));
        }
    }, [selectJobDescription]);
    useEffect(() => {
        if (selectBusiness.id !== 0) {
            FetchApiGet(
                `services/TaskManagement/ParentProcess/GetParentProcessListByBusinessProcessId?businessProcessId=${selectBusiness.id}`,
                'GET'
            )
                .then((res) => res.json())
                .then((json) =>
                    json.data.length === 1
                        ? (setSelectParent({
                              id: json.data[0].id,
                              value: json.data[0].title,
                              label: json.data[0].title,
                          }),
                          setParentOptions([json.data]))
                        : (setSelectParent({
                              id: 0,
                              value: 'select process',
                              label: t('select process'),
                          }),
                          setParentOptions([json.data]))
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
            {/* <div className='sub-process-dropdowns'>

                        <label>
                            <span style={{ color: 'red' }}>*</span> {t('S&OP')}
                        </label>
                        <Form.Control
                            type="text"
                            data-testid="sub-process-name"
                            value={sop}
                            onChange={(e) => setSop(e.target.value)}
                            placeholder={t('add s&op')}></Form.Control>
            </div> */}
            <div className="task-management-sub-process-footer-btn">
                <Button
                    variant="light"
                    onClick={() => {
                        setOnModal(false);
                    }}>
                    {t('cancel')}
                </Button>
                <Button data-testid="create-sub-process" variant="primary" onClick={handleSubmit}>
                    {t('add')}
                </Button>
            </div>
        </div>
    );
};

export default React.memo(Name);
