import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import FailModal from '../../../../components/FailModal';
import { NewInput } from '../../../../components/GlobalNew/Inputs';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { statusControl } from '../../../../components/Function/StatusCheck';
const AddModal = ({ showAddModal, setShowAddModal, apply }) => {
    const history = useHistory();
    const { t } = useTranslation();
    const user = localStorage.getItem('userName');
    const [failModal, setFailModal] = useState(false);
    const [error, setError] = useState('');
    const [surveyName, setSurveyName] = useState('');
    const [selectActivity, setSelectActivity] = useState({ value: 1, label: 'inside' });
    const [selectCategory, setSelectCategory] = useState();
    const [selectLanguage, setSelectLanguage] = useState();
    const [optionsActivity, setOptionsActivity] = useState([
        { value: 1, label: 'inside' },
        // { value: 2, label: 'outside' },
        // { value: 3, label: 'candidate' },
    ]);
    const [optionsCategory, setOptionsCategory] = useState([]);
    const [optionsLanguage, setOptionsLanguage] = useState([]);
    const [status, setStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
    ]);

    useEffect(() => {
        FetchApiGet('services/SurveySystem/Category/GetAllCategory', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setOptionsCategory(data?.map((el) => ({ value: el.id, label: el.categoryName })));
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsCategory([]);
            }
        });
        FetchApiGet('api/OldSystem/GetAllLanguageAbb', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setOptionsLanguage(data?.map((el) => ({ value: el.LanguageAbbId, label: el.LanguageAbb })));
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsLanguage([]);
            }
        });
    }, [history]);
    const addSurvey = () => {
        const condition = [
            surveyName.trim() === '',
            !selectActivity ? true : false,
            !selectCategory ? true : false,
            !selectLanguage ? true : false,
        ];
        statusControl(condition, status, setStatus);
        if (condition.some((x) => x === true)) return;
        const data = {
            surveyName: surveyName.trim(),
            type: selectActivity && selectActivity.value,
            categoryId: selectCategory && selectCategory.value,
            languageAbbId: selectLanguage && selectLanguage.value,
            createdBy: user,
        };
        FetchApiPost('services/SurveySystem/Survey/CreateSurvey', 'POST', data).then((res) => {
            if (res.status === 201) {
                apply();
                setShowAddModal(false);
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
            if (res.status === 400 || res.status === 409 || res.status === 404) {
                res.json().then(({ errors }) => (setFailModal(true), setError(errors)));
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const toggle = () => {
        setShowAddModal(false);
    };
    return (
        <>
            <GlobalModal
                header={t('Add Survey')}
                showModal={showAddModal}
                setShowModal={setShowAddModal}
                toggle={toggle}
                body={
                    <div>
                        <NewInput
                            label="survey name"
                            placeholder="enter a name"
                            value={surveyName}
                            setValue={setSurveyName}
                            isStar={true}
                            width="100%"
                            status={status[0].status}
                        />
                        <SingleSelects
                            label="activity"
                            isStar={true}
                            selectedItems={selectActivity}
                            setSelectedItems={setSelectActivity}
                            options={optionsActivity}
                            width="100%"
                            status={status[1].status}
                        />
                        <SingleSelects
                            label="category"
                            isStar={true}
                            selectedItems={selectCategory}
                            setSelectedItems={setSelectCategory}
                            options={optionsCategory}
                            width="100%"
                            status={status[2].status}
                        />
                        <SingleSelects
                            label="language"
                            isStar={true}
                            selectedItems={selectLanguage}
                            setSelectedItems={setSelectLanguage}
                            options={optionsLanguage}
                            width="100%"
                            status={status[3].status}
                        />
                    </div>
                }
                footer={
                    <>
                        <Button onClick={() => setShowAddModal(false)} variant="light">
                            {t('cancel')}
                        </Button>
                        <Button onClick={addSurvey} variant="primary">
                            {t('add')}
                        </Button>
                    </>
                }
            />
            {failModal && <FailModal modalShow={failModal} setModalShow={setFailModal} error={error} />}
        </>
    );
};

export default AddModal;
