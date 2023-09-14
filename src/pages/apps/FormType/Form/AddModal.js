import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { NewInput } from '../../../../components/GlobalNew/Inputs';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import FailModal from '../../../../components/FailModal';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Dropdown } from 'antd';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { statusControl } from '../../../../components/Function/StatusCheck';
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
const AddModal = ({ showAddModal, setShowAddModal, getData }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const createdBy = localStorage.getItem('userName');
    const [showFailModal, setShowFailModal] = useState(false);
    const [form, setForm] = useState('');
    const [selectFormType, setSelectFormType] = useState();
    const [optionsFormType, setOptionsFormType] = useState([]);
    const [abb, setAbb] = useState('');
    const [color, setColor] = useState('');
    const [error, setError] = useState('');
    const [status, setStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
    ]);
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
        setColor(e.key);
    };
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    useEffect(() => {
        FetchApiGet('services/Material/Form/GetAllFormType', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setOptionsFormType(data?.map((el) => ({ value: el.id, label: el.formTypeName })));
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setOptionsFormType([]);
            }
        });
    }, []);

    const handleAddButton = () => {
        const condition = [form.trim() === '', !selectFormType ? true : false, color === '', abb.trim() === ''];
        statusControl(condition, status, setStatus);
        if (condition.some((x) => x === true)) return;
        const data = {
            formName: form,
            formTypeId: selectFormType.value,
            formTypeName: selectFormType.label,
            formAbbreviation: abb,
            createdBy: createdBy,
            color: color,
        };
        FetchApiPost('services/Material/Form/CreateForm', 'POST', data).then((res) => {
            if (res.status === 201 || res.status === 200) {
                getData();
                setShowAddModal(false);
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
                header={t('Add Form Type')}
                showModal={showAddModal}
                setShowModal={setShowAddModal}
                toggle={() => setShowAddModal(!showAddModal)}
                body={
                    <div>
                        <NewInput
                            isUpperCase={true}
                            label="form"
                            value={form}
                            setValue={setForm}
                            isStar={true}
                            width="100%"
                            status={status[0].status}
                        />
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                            <SingleSelects
                                label="form type"
                                isStar={true}
                                selectedItems={selectFormType}
                                setSelectedItems={setSelectFormType}
                                options={optionsFormType}
                                width="100%"
                                status={status[1].status}
                            />
                            <Dropdown.Button
                                danger={status[2].status === 'error' && 'danger'}
                                trigger="click"
                                menu={menuProps}
                                placement="bottom"
                                style={{ maxWidth: '35px', alignSelf: 'flex-end' }}
                                overlayStyle={{ zIndex: '5000' }}
                                icon={<i className="fas fa-ellipsis-h"></i>}
                            />
                        </div>
                        <NewInput
                            isUpperCase={true}
                            label="abbreviation"
                            value={abb}
                            setValue={setAbb}
                            isStar={true}
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
