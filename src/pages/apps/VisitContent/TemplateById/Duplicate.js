import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { MultipleSelects } from '../../../../components/GlobalNew/Selects';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { FetchApiPost } from '../../../../utils/http.helper';
import FailModal from '../../../../components/FailModal';
import { useEffect } from 'react';

const Duplicate = ({ setShowModal, showModal, data, applyFilter, name, page }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [selectLanguage, setSelectLanguage] = useState([]);
    const [showFailModal, setShowFailModal] = useState(false);
    const [error, setError] = useState([]);
    const user = localStorage.getItem('userName');

    const toggle = () => {
        setShowModal(false);
    };
    useEffect(() => {
        if (!data) return;
        setSelectLanguage({ value: data.language.languageAbbId, label: data.language.languageAbb });
    }, [data]);

    const addTranslate = () => {
        const saveBody = {
            id: page, //need benefit disad adv ıd gelicek
            translateIds: [data.id],
            createdBy: user,
            visitContent: name, //need benefit disad adv veya profile ismi gelicek
        };
        FetchApiPost('services/Pages/ProductPage/TranslateProductPage', 'POST', saveBody)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setShowModal(false);
                    applyFilter();
                }
                if (res.status === 400 || res.status === 404 || res.status === 409) {
                    res.json().then(({ errors }) => {
                        setShowFailModal(true);
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
                header={t('Duplicate')}
                setShowModal={setShowModal}
                showModal={showModal}
                toggle={toggle}
                body={
                    <div>
                        <MultipleSelects
                            label="language"
                            isStar={true}
                            selectedItems={selectLanguage}
                            setSelectedItems={setSelectLanguage}
                            options={[]}
                            disabled
                            placeholder="language"
                            width="100%"
                        />
                    </div>
                }
                footer={
                    <>
                        <Button className="btn-light" style={{ backgroundColor: '#EBEBEB' }} onClick={toggle}>
                            {t('cancel')}
                        </Button>
                        <Button className="btn-primary" onClick={addTranslate}>
                            {t('add')}
                        </Button>
                    </>
                }
            />
            {showFailModal && <FailModal modalShow={showFailModal} setModalShow={setShowFailModal} error={error} />}
        </>
    );
};

export default React.memo(Duplicate);
