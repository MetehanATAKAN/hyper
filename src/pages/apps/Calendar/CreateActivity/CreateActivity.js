import React, { useState } from 'react';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { Spin } from 'antd';

const CreateActivity = ({ isOpen, onClose, eventsEndDate, dateInfo }) => {
    const { t } = useTranslation();
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [buttonDisableStatus, setButtonDisableStatus] = useState(true);
    const [loader, setLoader] = useState(false);
    return (
        <>
            {isOpen && (
                <>
                    {loader && (
                        <Spin
                            size="large"
                            spinning={loader}
                            style={{
                                position: 'fixed',
                                top: '0',
                                left: '0',
                                zIndex: '9999999',
                                background: 'rgba(0,0,0, .4)',
                                width: '100%',
                                height: '100%',
                                display: 'grid',
                                placeItems: 'center',
                            }}></Spin>
                    )}
                    <GlobalModal
                        showModal={isOpen}
                        setShowModal={onClose}
                        toggle={() => onClose()}
                        header={t('Create Activity')}
                        size={'md'}
                        body={
                            <>
                                <Body
                                    eventsEndDate={eventsEndDate}
                                    dateInfo={dateInfo}
                                    setButtonDisableStatus={setButtonDisableStatus}
                                    isClickAdd={isClickAdd}
                                    setIsClickAdd={setIsClickAdd}
                                    loader={loader}
                                    setLoader={setLoader}
                                />
                            </>
                        }
                        footer={
                            <>
                                <Button onClick={() => onClose()} variant="secondary">
                                    {t('cancel')}
                                </Button>
                                <Button
                                    onClick={() => setIsClickAdd(true)}
                                    disabled={buttonDisableStatus}
                                    variant="primary">
                                    {t('save')}
                                </Button>
                            </>
                        }
                    />
                </>
            )}
        </>
    );
};

export default CreateActivity;
