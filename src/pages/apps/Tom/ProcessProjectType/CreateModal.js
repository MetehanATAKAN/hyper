import React, { useState, useEffect } from 'react';
import { Modal as CustomModal } from '../../../../components/FormElements/Modal';
import { Button } from '../../../../components/FormElements/Button';
import { useTranslation } from 'react-i18next';
import { InputSelectColor, TextArea } from '../../../../components/FormElements/Input';
import { FetchApiPost } from '../../../../utils/http.helper';
import { ErrorModal } from '../../../../components/FormElements/InformationModal';

const Colors = ({ label, color }) => {
    const { t } = useTranslation();
    return (
        <div style={{ color: `rgb(${color})`, display: 'flex', alignItems: 'center', fontWeight: '500' }}>
            <div
                style={{
                    width: '14px',
                    height: '14px',
                    backgroundColor: `rgba(${color}, 0.5)`,
                    borderRadius: '3px',
                    marginRight: '8px',
                }}></div>{' '}
            {t(label)}
        </div>
    );
};

const CreateModal = ({ show, setShow, getData }) => {
    const { t } = useTranslation();

    const [buttonDisable, setButtonDisable] = useState(true);
    const [processName, setProcessName] = useState('');
    const [color, setColor] = useState();
    const [description, setDescription] = useState('');

    const [errorModal, setErrorModal] = useState(false);

    const [onClick, setOnClick] = useState(false);

    const items = [
        { label: <Colors color="0, 160, 223" label={'Blue'} />, key: '0, 160, 223' }, // remember to pass the key prop
        { label: <Colors color="108, 117, 125" label={'Gray'} />, key: '108, 117, 125' },
        { label: <Colors color="10, 207, 151" label={'Green'} />, key: '10, 207, 151' },
        { label: <Colors color="255, 188, 0" label={'Yellow'} />, key: '255, 188, 0' },
        { label: <Colors color="250, 92, 124" label={'Red'} />, key: '250, 92, 124' },
        { label: <Colors color="57, 175, 209" label={'Turquoise'} />, key: '57, 175, 209' },
        { label: <Colors color="114, 124, 245" label={'Indigo'} />, key: '114, 124, 245' },
        { label: <Colors color="107, 94, 174" label={'Purple'} />, key: '107, 94, 174' },
        { label: <Colors color="255, 103, 155" label={'Pink'} />, key: '255, 103, 155' },
        { label: <Colors color="253, 126, 20" label={'Orange'} />, key: '253, 126, 20' },
        { label: <Colors color="2, 168, 181" label={'Teal'} />, key: '2, 168, 181' },
    ];

    const handleMenuClick = (e) => {
        const color = e.key;
        setColor(`rgba(${color},0.5)`);
    };
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

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
                title: processName.trim(),
                description: description.trim(),
                color: color,
                createdBy: localStorage.getItem('userName')
            }
            FetchApiPost('services/TaskManagement/ProcessType/CreateProcessType', 'POST', body)
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
                    header={t('New Process & Project Type')}
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
                    footer={<Button type="primary" disabled={buttonDisable} onClick={() => setOnClick(true)}>{t('save')}</Button>}
                />
            )}
            {errorModal && <ErrorModal setShowModal={setErrorModal} message="Process project type name already exists." title="Cannot be Created" />}
        </>
    );
};

export default CreateModal;