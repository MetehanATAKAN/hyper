import React, { useState, useEffect } from 'react';
import { Modal as CustomModal } from '../../../../components/FormElements/Modal';
import { Button } from '../../../../components/FormElements/Button';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../utils/http.helper';
import { ErrorModal } from '../../../../components/FormElements/InformationModal';
import { InputSelectColor, TextArea } from '../../../../components/FormElements/Input';

const UpdateModal = ({ show, setShow, getData, selectedData }) => {
    const { t } = useTranslation();

    const [errorModal, setErrorModal] = useState(false);

    const [buttonDisable, setButtonDisable] = useState(true);
    const [processName, setProcessName] = useState(selectedData?.title ?? '');
    const [color, setColor] = useState(selectedData?.color ?? '');
    const [description, setDescription] = useState(selectedData?.description ?? '');

    const [onClick, setOnClick] = useState(false);

    useEffect(() => {
        if(processName.trim().length > 0 && color && description.trim().length > 0){
            setButtonDisable(false)
        }else{
            setButtonDisable(true)
        }
    }, [processName, color, description])

    useEffect(() => {
        if(onClick){
            const body = {
                id: Number(selectedData.id),
                title: processName.trim(),
                description: description.trim(),
                color: color,
                modifiedBy: localStorage.getItem('userName')
            }
            FetchApiPost('services/TaskManagement/ProcessType/UpdateProcessType', 'POST', body)
                .then(res => {
                    if(res.status === 201 || res.status === 200){
                        res.json().then(data => {
                            setShow(false)
                            getData();
                        })
                    }else if(res.status === 409){
                        setErrorModal(true)
                        setOnClick(false)
                    }
                })
        }
    }, [onClick])


    return (
        <>
            {show && (
                <CustomModal
                    showModal={show}
                    setShowModal={setShow}
                    toggle={() => setShow(false)}
                    header={t('Edit Process & Project Type')}
                    size={'lg'}
                    body={
                        <>
                            <InputSelectColor 
                                label={t("process & project type")}
                                value={processName}
                                setValue={setProcessName}
                                width={'100%'}
                                placeholder={t('process & project type')}
                                isStar={true}
                                setColor={(e) => setColor(e)}
                                isHelpIcon={false}
                                isUpperCase={true}
                            />

                            <TextArea 
                                label={t("description")}
                                value={description}
                                setValue={setDescription}
                                isStar={true}
                                width={"100%"}
                                placeholder={t("description")}
                            />
                   
                        </>
                    }
                    footer={<Button type="primary" disabled={buttonDisable} onClick={() => setOnClick(true)}>{t('edit')}</Button>}
                />
            )}
            {errorModal && <ErrorModal setShowModal={setErrorModal} message="Process project type name already exists." title="Cannot be Updated" />}
        </>
    );
};

export default UpdateModal;