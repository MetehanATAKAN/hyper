import { mdiMinus, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useSelector } from 'react-redux';

const ContentModal = ({ showModal, setShowModal, contentData, tableData, setTableData }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const user = localStorage.getItem('userName');
    const toggle = () => {
        setShowModal(false);
    };
    const [newContent, setNewContent] = useState('');
    const [openNew, setOpenNew] = useState(false);
    const [checkContent, setCheckContent] = useState(false);

    const filterData = useSelector( state => state.Need.filterFunct);

    const benefitFilter = () => {

        const benefitBody = filterData;

        FetchApiPost('services/Pages/Benefit/ApplyForBenefitFilter','POST',benefitBody)
        .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(data => {
                                    setTableData(data.data)
                                })

                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
    }

    const updateContent = async () => {
        if (newContent.trim() === '') {
            return setCheckContent(true);
        } else {
            setCheckContent(false);
            const data = {
                benefitId: contentData.id,
                content: newContent,
                modifiedBy: user,
            };
            FetchApiPost('services/Pages/Benefit/UpdateContent', 'POST', data)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 201) {
                                await benefitFilter();
                                await setShowModal(false);
                            }
                            else if (res.status === 500 || res.status === 502 || res.status === 499) {
                                history.push('/error-500');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        }
    };

    const openNewContent = () => {
        setOpenNew(!openNew);
    };
    return (
        <GlobalModal
            showModal={showModal}
            setShowModal={setShowModal}
            header={openNew === false ? t('Content') : t('Update Content')}
            toggle={toggle}
            body={
                <div>
                    <Button
                        onClick={openNewContent}
                        className="d-flex align-items-center"
                        size="sm"
                        style={{
                            backgroundColor: '#fff',
                            color: '#6c757d',
                            border: 'none',
                            boxShadow: 'none',
                            padding: '0',
                            marginBottom: '8px',
                            fontSize: '.9rem',
                            fontWeight: '600',
                        }}>
                        {contentData.status !== 3 &&
                            (openNew === false ? (
                                <>
                                    <Icon
                                        path={mdiPlus}
                                        title="content"
                                        size={0.7}
                                        horizontal
                                        vertical
                                        color="#6c757d"
                                    />
                                    {t('update content')}
                                </>
                            ) : (
                                <>
                                    <Icon
                                        path={mdiMinus}
                                        title="content"
                                        size={0.7}
                                        horizontal
                                        vertical
                                        color="#6c757d"
                                    />
                                    {t('update content')}
                                </>
                            ))}
                    </Button>
                    <NewTextArea
                        label={openNew === false ? 'content' : 'previous content'}
                        value={contentData.content}
                        disabled={true}
                        width="100%"
                    />
                    {openNew && (
                        <>
                            <hr />
                            <NewTextArea
                                label="new content"
                                placeholder="content"
                                value={newContent}
                                setValue={setNewContent}
                                isStar={true}
                                width="100%"
                                status={checkContent === true ? 'error' : 'default'}
                            />
                        </>
                    )}
                </div>
            }
            footer={
                <>
                    <Button className="btn-light" style={{ backgroundColor: '#EBEBEB' }} onClick={toggle}>
                        {t('cancel')}
                    </Button>
                    {openNew && (
                        <Button className="btn-warning" onClick={updateContent}>
                            {t('update')}
                        </Button>
                    )}
                </>
            }
        />
    );
};

export default ContentModal;
