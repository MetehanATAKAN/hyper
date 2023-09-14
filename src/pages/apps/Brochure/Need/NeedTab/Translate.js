import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { statusControl } from '../../../../../components/Function/StatusCheck';
import { NewInput } from '../../../../../components/GlobalNew/Inputs';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import { MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';

const Translate = ({ setShowModal, showModal, item, needFilter }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [selectSpecialization, setSelectSpecialization] = useState([]);
    const [optionsSpec, setOptionsSpec] = useState([]);
    const [needName, setNeedName] = useState('');
    const [selectLanguage, setSelectLanguage] = useState([]);
    const [optionsLanguage, setOptionsLanguage] = useState([]);
    const user = localStorage.getItem('userName');
    const empId = localStorage.getItem('userEmpId');
    useEffect(() => {
        const specs = item.specializations.map((el) => ({ value: el.specId, label: el.specAbb }));
        setOptionsSpec(specs);
        setSelectSpecialization(specs);
        setNeedName(item.needName);
    }, [item]);

    const toggle = () => {
        setShowModal(false);
    };
    useEffect(() => {
        const data = {
            employeeId: Number(empId),
            id: item.id,
        };
        FetchApiPost('services/Pages/TranslateNeed/GetTranslateLanguage', 'POST', data).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    if (data.length !== 0) {
                        setSelectLanguage([
                            { value: data[0].defaultLanguageAbbId, label: data[0].defaultLanguageName },
                        ]);
                    }

                    setOptionsLanguage(data?.map((el) => ({ value: el.languageAbbId, label: el.languageAbb })));
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsLanguage([]);
            }
        });
    }, []);
    const [status, setStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
    ]);
    const addLanguage = () => {
        const condition = [selectSpecialization.length === 0, selectLanguage.length === 0];
        statusControl(condition, status, setStatus);
        if (condition.some((x) => x === true)) return;
        const data = {
            id: [item.id],
            languageId: selectLanguage?.map((el) => el.value),
            specIds: selectSpecialization?.map((el) => el.value),
            createdBy: user,
        };
        FetchApiPost('services/Pages/TranslateNeed/SaveTranslateNeed', 'POST', data).then((res) => {
            if (res.status === 201) {
                needFilter();
                setShowModal(false);
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    return (
        <GlobalModal
            header={t('Translate')}
            setShowModal={setShowModal}
            showModal={showModal}
            toggle={toggle}
            body={
                <div>
                    <MultipleSelects
                        label="specialization"
                        isStar={true}
                        selectedItems={selectSpecialization}
                        setSelectedItems={setSelectSpecialization}
                        options={optionsSpec}
                        status={status[0].status}
                        placeholder="specialization"
                        width="100%"
                    />
                    <NewInput
                        label="need name"
                        placeholder="need name"
                        value={needName}
                        setValue={setNeedName}
                        isStar={true}
                        width="100%"
                        disabled={true}
                    />
                    <MultipleSelects
                        label="language"
                        isStar={true}
                        selectedItems={selectLanguage}
                        setSelectedItems={setSelectLanguage}
                        options={optionsLanguage}
                        status={status[1].status}
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
                    <Button className="btn-primary" onClick={addLanguage}>
                        {t('add')}
                    </Button>
                </>
            }
        />
    );
};

export default Translate;
