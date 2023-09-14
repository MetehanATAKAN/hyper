import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';
import FailModal from '../../../../components/FailModal';
import { statusControl } from '../../../../components/Function/StatusCheck';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
const AddModal = ({ showModal, setShowModal, getAllForm, applyFilter }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const userName = localStorage.getItem('userName');
    const [showFailModal, setShowFailModal] = useState(false);
    const [selectForm, setSelectForm] = useState();
    const [selectUnit, setSelectUnit] = useState([]);
    const [optionsForm, setOptionsForm] = useState([]);
    const [optionsUnit, setoptionsUnit] = useState([]);
    const [status, setStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
    ]);
    const [error, setError] = useState('');
    useEffect(() => {
        getAllForm().then((res) => setOptionsForm(res?.map((el) => ({ value: el.id, label: el.formName }))));
    }, [getAllForm]);
    useEffect(() => {
        FetchApiGet('services/Material/Unit/GetAllUnit ', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setoptionsUnit(data?.map((el) => ({ value: el.id, label: el.unitName })));
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, []);
    const handleAddButton = () => {
        const condition = [!selectForm ? true : false, selectUnit.length === 0 ? true : false];
        statusControl(condition, status, setStatus);
        if (condition.some((x) => x === true)) return;
        const data = {
            formId: selectForm?.value,
            unitIds: selectUnit?.map((x) => x.value),
            createdBy: userName,
        };
        FetchApiPost('services/Material/UnitsOfForm/CreateUnitOfForm', 'POST', data).then((res) => {
            if (res.status === 201 || res.status === 200) {
                applyFilter();
                setShowModal(false);
            }
            if (res.status === 400 || res.status === 409 || res.status === 404) {
                res.json().then(({ errors }) => {
                    setShowFailModal(true);
                    setError(errors);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    return (
        <>
            <GlobalModal
                header={t('Add Units of Form')}
                showModal={showModal}
                setShowModal={setShowModal}
                toggle={() => setShowModal(!showModal)}
                body={
                    <div>
                        <SingleSelects
                            label="form"
                            isStar={true}
                            selectedItems={selectForm}
                            setSelectedItems={setSelectForm}
                            options={optionsForm}
                            width="100%"
                            status={status[0].status}
                        />
                        <MultipleSelects
                            label="unit"
                            isStar={true}
                            selectedItems={selectUnit}
                            setSelectedItems={setSelectUnit}
                            options={optionsUnit}
                            width="100%"
                            status={status[1].status}
                        />
                    </div>
                }
                footer={
                    <>
                        <Button onClick={() => setShowModal(false)} variant="light">
                            {t('cancel')}
                        </Button>
                        <Button variant="primary" onClick={handleAddButton}>
                            {t('add')}
                        </Button>
                    </>
                }
            />
            {showFailModal && <FailModal modalShow={showFailModal} setModalShow={setShowFailModal} error={error} />}
        </>
    );
};

export default React.memo(AddModal);
