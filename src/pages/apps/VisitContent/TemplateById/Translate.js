import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { MultipleSelects } from '../../../../components/GlobalNew/Selects';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import FailModal from '../../../../components/FailModal';

const Translate = ({ setShowModal, showModal, data, applyFilter, name, page }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [selectLanguage, setSelectLanguage] = useState([]);
    const [optionsLanguage, setOptionsLanguage] = useState([]);
    const [status, setStatus] = useState('default');
    const [showFailModal, setShowFailModal] = useState(false);
    const [error, setError] = useState([]);
    const user = localStorage.getItem('userName');
    const toggle = () => {
        setShowModal(false);
    };
    useEffect(() => {
        const id = data.needId === 0 ? data.id : data.needId;
        FetchApiGet(`services/Pages/Need/GetNeedsByCorporateId?id=${id}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setOptionsLanguage(
                        data?.map((el) => ({
                            value: el.language.languageAbbId,
                            label: el.language.languageAbb,
                            id: el.id,
                        }))
                    );
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsLanguage([]);
            }
        });
    }, [history, data]);
    const addTranslate = () => {
        if (selectLanguage.length === 0) {
            return setStatus('error');
        } else {
            setStatus('default');
            const id = optionsLanguage
                .filter((el) => selectLanguage.find((x) => el.value === x.value))
                .map((x) => x.id);
            const saveBody = {
                id: page, //need benefit disad adv veya profile ıd gelicek
                translateIds: id,
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
        }
    };
    return (
        <>
            <GlobalModal
                header={t('Translate')}
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
                            options={optionsLanguage}
                            placeholder="language"
                            width="100%"
                            status={status}
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

export default React.memo(Translate);
