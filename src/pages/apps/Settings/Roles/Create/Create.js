import React, { useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import Body from './Body';
import Footer from './Footer';

const Create = ({ isShow, setIsShow, setFilterData, getAllFilterData }) => {
    const { t } = useTranslation();
    const [buttonDisableStatus, setButtonDisableStatus] = useState(true);

    const [onClickAddBtn, setOnClickAddBtn] = useState(false);

    const cancelButton = () => {
        setIsShow(false);
    };

    const onHide = () => {
        setIsShow(false);
    };

    return (
        <>
            {isShow && (
                <GlobalModal
                    showModal={isShow}
                    setShowModal={setIsShow}
                    toggle={onHide}
                    header={t('Create Role')}
                    size={'md'}
                    body={
                        <Body
                            setShowModal={setIsShow}
                            setButtonDisableStatus={setButtonDisableStatus}
                            onClickAddBtn={onClickAddBtn}
                            setIsShow={setIsShow}
                            setFilterData={setFilterData}
                            getAllFilterData={getAllFilterData}
                        />
                    }
                    footer={
                        <Footer cancelButton={cancelButton} buttonDisableStatus={buttonDisableStatus} setOnClickAddBtn={setOnClickAddBtn} />
                    }
                />
            )}
        </>
    );
};

export default Create;
