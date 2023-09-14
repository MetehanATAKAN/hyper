import React, { useState, useEffect } from 'react';
import { Modal as CustomModal } from '../../../../components/FormElements/Modal';
import { Divider } from '../../../../components/FormElements/Divider';
import { Button } from '../../../../components/FormElements/Button';
import { useTranslation } from 'react-i18next';
import { InputDefault, TextArea } from '../../../../components/FormElements/Input';
import { FetchApiPost, FetchApiGet } from '../../../../utils/http.helper';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import { ErrorModal } from '../../../../components/FormElements/InformationModal';

const CreateModal = ({ show, setShow, getData, selectedData }) => {
    const { t } = useTranslation();
    const [errorModal, setErrorModal] = useState(false);

    const [buttonDisable, setButtonDisable] = useState(true);
    const [mainPorcess, setMainProcess] = useState(selectedData.mainProcess ?? '');
    const [description, setDescription] = useState(selectedData.description ?? '');
    const [process, setProcess] = useState({ value: selectedData.processTypeId, label: selectedData.processTypeName });
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
                });
            }
        });
    }, []);

    useEffect(() => {
        if (onClick) {
            const body = {
                id: Number(selectedData.id),
                mainProcess: mainPorcess.trim(),
                description: description.trim(),
                projectProcessTypeId: process.value,
                modifiedBy: localStorage.getItem('userName'),
            };
            FetchApiPost('services/TaskManagement/JobDescription/UpdateJobDescription', 'POST', body).then((res) => {
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
                    header={t('Edit Main Process')}
                    size={'lg'}
                    body={
                        <>
                            <InputDefault
                                label={t('main process')}
                                value={mainPorcess}
                                setValue={setMainProcess}
                                isStar={true}
                                width={'100%'}
                                placeholder={"main process"}
                                isUpperCase={true}
                            />

                            <TextArea
                                label={t('description')}
                                value={description}
                                setValue={setDescription}
                                isStar={true}
                                width={'100%'}
                                placeholder={"description"}
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
                            {t('edit')}
                        </Button>
                    }
                />
            )}
            {errorModal && <ErrorModal setShowModal={setErrorModal} message="Main process name already exists." title="Cannot be Updated" />}
        </>
    );
};

export default CreateModal;
