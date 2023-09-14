import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { NewInput } from '../../../../components/GlobalNew/Inputs';
import FailModal from '../../../../components/FailModal';
import { Button } from 'react-bootstrap';
import { statusControl } from '../../../../components/Function/StatusCheck';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
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
const AddModal = ({ showModal, setShowModal, getData }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const userName = localStorage.getItem('userName');
    const [showFailModal, setShowFailModal] = useState(false);
    const [unit, setUnit] = useState('');
    const [color, setColor] = useState('');
    const [status, setStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
    ]);
    const [error, setError] = useState('');
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
    const handleAddButton = () => {
        const condition = [unit.trim() === '', color === ''];
        statusControl(condition, status, setStatus);
        if (condition.some((x) => x === true)) return;
        const data = {
            unitName: unit,
            color: color,
            createdBy: userName,
        };
        FetchApiPost('services/Material/Unit/CreateUnit', 'POST', data).then((res) => {
            if (res.status === 201 || res.status === 200) {
                getData();
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
                header={t('Add Unit')}
                showModal={showModal}
                setShowModal={setShowModal}
                toggle={() => setShowModal(!showModal)}
                body={
                    <div>
                        <NewInput
                            isUpperCase={true}
                            width="100%"
                            value={unit}
                            setValue={setUnit}
                            placeholder="unit"
                            label="unit"
                            status={status[0].status}
                            isStar={true}
                            isDropDown={true}
                            btnTooltip="Colors"
                            btnIcon={<i className="fas fa-ellipsis-h"></i>}
                            dropDownItems={items}
                            dropDownStatus={status[1].status}
                            dropDownSetValue={setColor}
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
