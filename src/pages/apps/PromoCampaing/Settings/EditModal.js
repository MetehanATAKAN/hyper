import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { statusControl } from '../../../../components/Function/StatusCheck';
import { NewInput, NewTextArea } from '../../../../components/GlobalNew/Inputs';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import FailModal from '../../../../components/FailModal';
import { FetchApiPost } from '../../../../utils/http.helper';
const EditModal = ({ showModal, setShowModal, data, getData }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [name, setName] = useState(data.name ?? '');
    const [desc, setDesc] = useState(data.description ?? '');
    const [lang, setLang] = useState(data.languageName ?? '');
    const [error, setError] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [status, setStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
    ]);
    console.log(data);
    const user = localStorage.getItem('userName');
    const handleSaveBtn = () => {
        const condition = [name.trim() === '', desc.trim() === ''];
        statusControl(condition, status, setStatus);
        if (condition.some((x) => x === true)) return;
        const postData = {
            id: data.id,
            corporateId: data.corporateId,
            name: name.trim(),
            languageName: lang,
            description: desc.trim(),
            modifiedBy: user,
        };
        FetchApiPost('services/Organization/Organization/CampaignSetting/UpdateCampaignSetting', 'POST', postData)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setShowModal(false);
                    getData();
                }
                if (res.status === 400 || res.status === 404 || res.status === 409) {
                    res.json().then(({ errors }) => {
                        setErrorModal(true);
                        setError(errors);
                    });
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <GlobalModal
                header={t('Edit')}
                showModal={showModal}
                setShowModal={setShowModal}
                toggle={() => setShowModal(!showModal)}
                body={
                    <div>
                        <NewInput
                            width="100%"
                            label={t('name')}
                            value={name}
                            setValue={setName}
                            isStar={true}
                            isUpperCase={true}
                            status={status[0].status}
                        />
                        <NewTextArea
                            label={t('description')}
                            value={desc}
                            setValue={setDesc}
                            isStar={true}
                            status={status[1].status}
                        />
                        <NewInput
                            width="100%"
                            label={t('language')}
                            value={lang.toUpperCase()}
                            setValue={setLang}
                            disabled={true}
                        />
                    </div>
                }
                footer={
                    <>
                        <Button onClick={() => setShowModal(false)} variant="secondary">
                            {t('cancel')}
                        </Button>
                        <Button onClick={handleSaveBtn} variant="warning">
                            {t('edit')}
                        </Button>
                    </>
                }
            />
            {errorModal && <FailModal modalShow={errorModal} setModalShow={setErrorModal} error={error} />}
        </>
    );
};

export default EditModal;
