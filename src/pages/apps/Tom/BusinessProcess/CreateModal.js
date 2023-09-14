import React, { useState, useEffect } from 'react';
import { Modal as CustomModal } from '../../../../components/FormElements/Modal';
import { Divider } from '../../../../components/FormElements/Divider';
import { Button } from '../../../../components/FormElements/Button';
import { useTranslation } from 'react-i18next';
import { InputDefault, TextArea } from '../../../../components/FormElements/Input';
import { FetchApiPost, FetchApiGet } from '../../../../utils/http.helper';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import { ErrorModal } from '../../../../components/FormElements/InformationModal';

const CreateModal = ({ show, setShow, getData }) => {
    const { t } = useTranslation();

    const [buttonDisable, setButtonDisable] = useState(true);
    const [businessProcess, setBusinessProcess] = useState('');
    const [description, setDescription] = useState('');
    const [process, setProcess] = useState();
    const [processOptions, setProcessOptions] = useState([]);
    const [mainProcess, setMainProcess] = useState();
    const [mainProcessOptions, setMainProcessOptions] = useState([]);

    const [onClick, setOnClick] = useState(false);

    const [errorModal, setErrorModal] = useState(false);

    useEffect(() => {
        if (businessProcess.trim().length > 0 && description.trim().length > 0 && mainProcess && process) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [businessProcess, mainProcess, description, process]);

    useEffect(() => {
        FetchApiGet('services/TaskManagement/ProcessType/GetAllProcessTypes', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setProcessOptions(
                        data.map((item) => ({
                            value: item.id,
                            label: item.title,
                        }))
                    );

                    if(data.length === 1){
                        setProcess({ value: data[0].id, label: data[0].title })
                    }
                });
            }
        });
    }, []);

    useEffect(() => {
        setMainProcess();
        setMainProcessOptions([]);
        if(!process) return;

        FetchApiPost('services/TaskManagement/JobDescription/GetJobDescriptionForApply', 'POST', { processProjectTypeIds: [process.value] })
            .then(res => {
                if(res.status === 200 || res.status === 201){
                    res.json().then(({ data }) => {
                        setMainProcessOptions(data.map(i => ({ value: i.id, label: i.mainProcess })))
                        if(data.length === 1){
                            setMainProcess({ value: data[0].id, label: data[0].mainProcess })
                        }
                    })
                }
            })
    }, [process])

    useEffect(() => {
        if (onClick) {
            const body = {
                businessProcessTitle: businessProcess.trim(),
                description: description.trim(),
                mainProcessId: mainProcess.value,
                processProjectId: process.value,
                createdBy: localStorage.getItem('userName'),
            };
            FetchApiPost('services/TaskManagement/BusinessProcess/CreateBusinessProcess', 'POST', body).then((res) => {
                if (res.status === 201 || res.status === 200) {
                    res.json().then((data) => {
                        setShow(false);
                        getData();
                    });
                } else if(res.status === 409) {
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
                    header={t('New Business Process')}
                    size={'lg'}
                    body={
                        <>
                            <InputDefault
                                label={t('business process')}
                                value={businessProcess}
                                setValue={setBusinessProcess}
                                isStar={true}
                                width={'100%'}
                                placeholder="business process"
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

                            <Divider title={t("connection")} plain={true} />

                            <SingleSelects
                                label={'process & project type'}
                                width={'100%'}
                                options={processOptions}
                                selectedItems={process}
                                setSelectedItems={setProcess}
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
                        </>
                    }
                    footer={
                        <Button type="primary" disabled={buttonDisable} onClick={() => setOnClick(true)}>
                            {t('save')}
                        </Button>
                    }
                />
            )}
            {errorModal && <ErrorModal setShowModal={setErrorModal} message="Business process name already exists." title="Cannot be Created" />}
        </>
    );
};

export default CreateModal;
