import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { NewInput } from '../../../../components/GlobalNew/Inputs';
import { statusControl } from '../../../../components/Function/StatusCheck';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import FailModal from '../../../../components/FailModal';

const EditModal = ({ showModal, setShowModal, item, getMenu }) => {
    const { t } = useTranslation();
    const iconRef = useRef(0);
    const history = useHistory();
    const modifiedBy = localStorage.getItem('userName');
    const [groupName, setGroupName] = useState(item.label);
    const [selectedIcon, setSelectedIcon] = useState(item.icon);
    const [hoverId, setHoverId] = useState(null);
    const [status, setStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
    ]);
    const [showFailModal, setShowFailModal] = useState(false);
    const [error, setError] = useState(false);
    const [icons, setIcons] = useState([
        { id: 'fa-solid fa-pen', icon: <i className="fa-solid fa-pen"></i> },
        { id: 'fa-solid fa-image', icon: <i className="fa-solid fa-image"></i> },
        { id: 'fa-solid fa-arrows-to-dot', icon: <i className="fa-solid fa-arrows-to-dot"></i> },
        { id: 'fa-solid fa-coins', icon: <i className="fa-solid fa-coins"></i> },
        { id: 'fas fa-sack-dollar', icon: <i className="fas fa-sack-dollar"></i> },
        { id: 'fas fa-dollar-sign', icon: <i className="fas fa-dollar-sign"></i> },
        { id: 'fas fa-calendar', icon: <i className="fas fa-calendar"></i> },
        { id: 'fas fa-wallet', icon: <i className="fas fa-wallet"></i> },
        { id: 'fas fa-users', icon: <i className="fas fa-users"></i> },
        { id: 'fas fa-user', icon: <i className="fas fa-user"></i> },
        { id: 'fas fa-toolbox', icon: <i className="fas fa-toolbox"></i> },
        { id: 'fas fa-tasks', icon: <i className="fas fa-tasks"></i> },
        { id: 'fas fa-list-ul', icon: <i className="fas fa-list-ul"></i> },
        { id: 'fas fa-table', icon: <i className="fas fa-table"></i> },
        { id: 'fas fa-store', icon: <i className="fas fa-store"></i> },
        { id: 'fas fa-shopping-cart', icon: <i className="fas fa-shopping-cart"></i> },
        { id: 'fas fa-search-dollar', icon: <i className="fas fa-search-dollar"></i> },
        { id: 'fas fa-scroll', icon: <i className="fas fa-scroll"></i> },
        { id: 'fas fa-recycle', icon: <i className="fas fa-recycle"></i> },
        { id: 'fas fa-question-circle', icon: <i className="fas fa-question-circle"></i> },
        { id: 'fas fa-paperclip', icon: <i className="fas fa-paperclip"></i> },
        { id: 'fas fa-network-wired', icon: <i className="fas fa-network-wired"></i> },
        { id: 'fas fa-money-check-alt', icon: <i className="fas fa-money-check-alt"></i> },
        { id: 'fas fa-money-bill-alt', icon: <i className="fas fa-money-bill-alt"></i> },
        { id: 'fas fa-layer-group', icon: <i className="fas fa-layer-group"></i> },
        { id: 'fas fa-landmark', icon: <i className="fas fa-landmark"></i> },
        { id: 'fas fa-id-card', icon: <i className="fas fa-id-card"></i> },
        { id: 'fas fa-hashtag', icon: <i className="fas fa-hashtag"></i> },
        { id: 'fas fa-globe', icon: <i className="fas fa-globe"></i> },
        { id: 'fas fa-gem', icon: <i className="fas fa-gem"></i> },
        { id: 'fas fa-folder', icon: <i className="fas fa-folder"></i> },
        { id: 'fas fa-folder-open', icon: <i className="fas fa-folder-open"></i> },
        { id: 'fas fa-file-invoice-dollar', icon: <i className="fas fa-file-invoice-dollar"></i> },
        { id: 'fas fa-copy', icon: <i className="fas fa-copy"></i> },
        { id: 'fas fa-check-circle', icon: <i className="fas fa-check-circle"></i> },
    ]);
    const updateBtn = () => {
        const condition = [groupName.trim() === '', selectedIcon === ''];
        if (condition[1] === true) {
            iconRef.current.style.borderColor = 'red';
        } else {
            iconRef.current.style.borderColor = '#DEE2E6';
        }
        statusControl(condition, status, setStatus);
        if (condition.some((x) => x === true)) return;
        const data = {
            label: groupName.trim(),
            key: item.key,
            icon: selectedIcon,
            createdBy: modifiedBy,
        };
        FetchApiPost('services/AdminPanel/Module/UpdateModule', 'POST', data).then((res) => {
            if (res.status === 201) {
                setShowModal(false);
                getMenu();
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
        });
    };
    return (
        <>
            <GlobalModal
                header={t('Edit Group')}
                showModal={showModal}
                setShowModal={setShowModal}
                toggle={() => {
                    setShowModal(!showModal);
                }}
                body={
                    <div>
                        <NewInput
                            label="group name"
                            placeholder="enter a name"
                            value={groupName}
                            setValue={setGroupName}
                            isStar={true}
                            width="100%"
                            status={status[0].status}
                        />

                        <div
                            className="icons-container"
                            ref={iconRef}
                            style={{ border: '1px solid', borderColor: '#DEE2E6' }}>
                            {icons.map((el, i) => (
                                <span
                                    id={el.id}
                                    style={{
                                        borderColor:
                                            selectedIcon === el.id
                                                ? '#00A0DF'
                                                : hoverId === el.id
                                                ? '#00A0DF'
                                                : '#DEE2E6',
                                    }}
                                    onClick={() => setSelectedIcon(el.id)}
                                    onMouseEnter={() => setHoverId(el.id)}
                                    onMouseLeave={() => setHoverId(null)}
                                    className="icons-span"
                                    key={i}>
                                    {el.icon}
                                </span>
                            ))}
                        </div>
                    </div>
                }
                footer={
                    <>
                        <Button onClick={() => setShowModal(false)} variant="light">
                            {t('cancel')}
                        </Button>
                        <Button onClick={updateBtn} variant="primary">
                            {t('save')}
                        </Button>
                    </>
                }
            />
            {showFailModal && <FailModal modalShow={showFailModal} setModalShow={setShowFailModal} error={error} />}
        </>
    );
};

export default EditModal;
