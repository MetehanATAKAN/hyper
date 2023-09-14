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

    const [errorModal, setErrorModal] = useState(false);

    const [buttonDisable, setButtonDisable] = useState(true);
    const [mainPorcess, setMainProcess] = useState('');
    const [description, setDescription] = useState('');
    const [process, setProcess] = useState();
    const [processOptions, setProcessOptions] = useState([]);

    const [onClick, setOnClick] = useState(false);

    useEffect(() => {
        if (mainPorcess.trim().length > 0 && description.trim().length > 0 && process) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [mainPorcess, description, process]);

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
        if (onClick) {
            const body = {
                mainProcess: mainPorcess.trim(),
                description: description.trim(),
                processProjectTypeId: process.value,
                createdBy: localStorage.getItem('userName'),
            };
            FetchApiPost('services/TaskManagement/JobDescription/CreateJobDescription', 'POST', body).then((res) => {
                if (res.status === 201 || res.status === 200) {
                    res.json().then((data) => {
                        setShow(false);
                        getData();
                    });
                } else if(res.status === 409){
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
                    header={t('New Main Process')}
                    size={'lg'}
                    body={
                        <>
                        <InputDefault
                                label={t('main process')}
                                value={mainPorcess}
                                setValue={setMainProcess}
                                isStar={true}
                                width={'100%'}
                                placeholder={t("main process")}
                                isUpperCase={true}
                            />

                            <TextArea
                                label={t('description')}
                                value={description}
                                setValue={setDescription}
                                isStar={true}
                                width={'100%'}
                                placeholder={t("description")}
                            />

                            <Divider title={t("connection")} plain={true} />
                            <SingleSelects
                                label={t('process & project type')}
                                width={'100%'}
                                options={processOptions}
                                selectedItems={process}
                                setSelectedItems={setProcess}
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
            {errorModal && <ErrorModal setShowModal={setErrorModal} message="Main process name already exists." title="Cannot be Created" />}
        </>
    );
};

export default CreateModal;
