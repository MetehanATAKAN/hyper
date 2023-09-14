import React, { useState, useEffect } from 'react';
import { Modal as CustomModal } from '../../../../components/FormElements/Modal';
import { Divider } from '../../../../components/FormElements/Divider';
import { Button } from '../../../../components/FormElements/Button';
import { useTranslation } from 'react-i18next';
import { InputDefault, TextArea } from '../../../../components/FormElements/Input';
import { FetchApiPost, FetchApiGet } from '../../../../utils/http.helper';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import { ErrorModal } from '../../../../components/FormElements/InformationModal';

import Recurrency from './Recurrency';

const CreateModal = ({ show, setShow, getData }) => {
    const { t } = useTranslation();

    const [showRecurrency, setShowRecurrency] = useState(true);

    const [buttonDisable, setButtonDisable] = useState(true);
    const [processName, setProcessName] = useState('');
    const [description, setDescription] = useState('');

    const [ownerDepartment, setOwnerDepartment] = useState();
    const [ownerDepartmentOptions, setOwnerDepartmentOptions] = useState([]);

    const [priorty, setPriorty] = useState([]);
    const [priortyOptions, setPriortyOptions] = useState([
        {
            value: 0,
            label: 'Low',
        },
        {
            value: 1,
            label: 'Medium',
        },
        {
            value: 2,
            label: 'High',
        },
    ]);

    const [isRecurrency, setIsRecurrency] = useState();
    const [recurrencyOptions, setRecurrencyOptions] = useState([
        {
            value: 0,
            label: 'Yes',
        },
        {
            value: 1,
            label: 'No',
        },
    ]);

    const [processType, setProcessType] = useState();
    const [processTypeOptions, setProcessTypeOptions] = useState([]);

    const [mainProcess, setMainProcess] = useState();
    const [mainProcessOptions, setMainProcessOptions] = useState([]);

    const [businessProcess, setBusinessProcess] = useState([]);
    const [businessProcessOptions, setBusinessProcessOptions] = useState([]);
    const [onClick, setOnClick] = useState(false);

    const [errorModal, setErrorModal] = useState(false);

    const [recurrencyButtonDisable, setRecurrencyButtonDisable] = useState(true);

    const [createdProcessResponse, setCreatedProcessResponse] = useState();
    const [onClickRecurrence, setOnClickRecurrence] = useState(false);
 
    useEffect(() => {
        if (
            processName.trim().length > 0 &&
            description.length > 0 &&
            ownerDepartment &&
            priorty &&
            isRecurrency &&
            processType &&
            mainProcess &&
            businessProcess
        ) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [processName, description, ownerDepartment, priorty, isRecurrency, processType, mainProcess, businessProcess]);

    useEffect(() => {
        FetchApiGet('services/TaskManagement/ProcessType/GetAllProcessTypes', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setProcessTypeOptions(
                        data.map((item) => ({
                            value: item.id,
                            label: item.title,
                        }))
                    );

                    if (data.length === 1) {
                        setProcessType({ value: data[0].id, label: data[0].title });
                    }
                });
            }
        });
    }, []);

    useEffect(() => {
        setMainProcess();
        setMainProcessOptions([]);
        if (!processType) return;

        FetchApiPost('services/TaskManagement/JobDescription/GetJobDescriptionForApply', 'POST', {
            processProjectTypeIds: [processType.value],
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    setMainProcessOptions(data.map((i) => ({ value: i.id, label: i.mainProcess })));
                    if (data.length === 1) {
                        setMainProcess({ value: data[0].id, label: data[0].mainProcess });
                    }
                });
            }
        });
    }, [processType]);

    useEffect(() => {
        setBusinessProcess();
        setBusinessProcessOptions([]);
        if (!mainProcess) return;

        FetchApiPost('services/TaskManagement/BusinessProcess/GetBusinessProcessForApply', 'POST', {
            processProjectTypeIds: [processType.value],
            mainProcessIds: [mainProcess.value],
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    setBusinessProcessOptions(data.map((i) => ({ value: i.id, label: i.businessProcessTitle })));
                    if (data.length === 1) {
                        setBusinessProcess({ value: data[0].id, label: data[0].businessProcessTitle });
                    }
                });
            }
        });
    }, [mainProcess]);

    useEffect(() => {
        FetchApiGet('services/HR/Department/GetAllDepartments', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setOwnerDepartmentOptions(data.map((i) => ({ value: i.id, label: i.departmentName })));
                    if (data.length === 1) {
                        setOwnerDepartment({ value: data[0].id, label: data[0].departmentName });
                    }
                });
            }
        });
    }, []);

    useEffect(() => {
        if (onClick) {
            const body = {
                title: processName.trim(),
                description: description.trim(),
                processOwnerDepartmentId: ownerDepartment.value,
                priorityId: priorty.value,
                isRecurrency: isRecurrency.value,
                processProjectTypeId: processType.value,
                mainProcessId: mainProcess.value,
                businessProcessId: businessProcess.value,
                approveStatus: 1,
                createdBy: localStorage.getItem('userName'),
            };
            FetchApiPost('services/TaskManagement/ParentProcess/CreateParentProcess', 'POST', body).then((res) => {
                if (res.status === 201 || res.status === 200) {
                    res.json().then((data) => {
                        setCreatedProcessResponse(data.data)
                        if(isRecurrency.value === 0){
                            setShowRecurrency(true)
                        }else{
                            setShow(false);
                        }
                        getData();
                    });
                } else if (res.status === 409) {
                    setOnClick(false);
                    setErrorModal(true);
                }
            });
        }
    }, [onClick]);

    return (
        <>
            {show && (
                <CustomModal
                    showModal={show}
                    setShowModal={setShow}
                    toggle={() => setShow(false)}
                    header={t('New Process')}
                    size={'lg'}
                    body={
                        <>
                            {showRecurrency === false ? (
                                <>
                                    <InputDefault
                                        label={t('process name')}
                                        value={processName}
                                        setValue={setProcessName}
                                        isStar={true}
                                        width={'100%'}
                                        placeholder="process name"
                                        isUpperCase={true}
                                    />

                                    <TextArea
                                        label={t('description')}
                                        value={description}
                                        setValue={setDescription}
                                        isStar={true}
                                        width={'100%'}
                                        placeholder="description"
                                    />

                                    <SingleSelects
                                        label={'process owner department'}
                                        width={'100%'}
                                        options={ownerDepartmentOptions}
                                        selectedItems={ownerDepartment}
                                        setSelectedItems={setOwnerDepartment}
                                        isStar={true}
                                    />

                                    <SingleSelects
                                        label={'priorty'}
                                        width={'100%'}
                                        options={priortyOptions}
                                        selectedItems={priorty}
                                        setSelectedItems={setPriorty}
                                        isStar={true}
                                    />

                                    <SingleSelects
                                        label={'is recurrency'}
                                        width={'100%'}
                                        options={recurrencyOptions}
                                        selectedItems={isRecurrency}
                                        setSelectedItems={setIsRecurrency}
                                        isStar={true}
                                    />

                                    <Divider title={t('connection')} plain={true} />

                                    <SingleSelects
                                        label={'process & project type'}
                                        width={'100%'}
                                        options={processTypeOptions}
                                        selectedItems={processType}
                                        setSelectedItems={setProcessType}
                                        isStar={true}
                                    />

                                    <SingleSelects
                                        label={'main process'}
                                        width={'100%'}
                                        options={mainProcessOptions}
                                        selectedItems={mainProcess}
                                        setSelectedItems={setMainProcess}
                                        isStar={true}
                                    />

                                    <SingleSelects
                                        label={'business process'}
                                        width={'100%'}
                                        options={businessProcessOptions}
                                        selectedItems={businessProcess}
                                        setSelectedItems={setBusinessProcess}
                                        isStar={true}
                                    />
                                </>
                            ) : (
                                <Recurrency setRecurrencyButtonDisable={setRecurrencyButtonDisable} onClick={onClickRecurrence} createdProcessResponse={createdProcessResponse} getData={getData} setShow={setShow} />
                            )}
                        </>
                    }
                    footer={
                        <>
                        {
                            showRecurrency === true ? (
                                <>
                                    <Button type="primary" disabled={recurrencyButtonDisable} onClick={() => setOnClickRecurrence(true)}>
                                        {t('save')}
                                    </Button>
                                </>
                            ) : (
                                <Button type="primary" disabled={buttonDisable} onClick={() => setOnClick(true)}>
                                    {isRecurrency?.value === 0 ? t('next') : t('save')}
                                </Button>
                            )
                        }
                        </>
                    }
                />
            )}
            {errorModal && (
                <ErrorModal
                    setShowModal={setErrorModal}
                    message="Business process name already exists."
                    title="Cannot be Created"
                />
            )}
        </>
    );
};

export default CreateModal;
