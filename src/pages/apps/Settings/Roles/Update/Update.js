import React, { useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import Body from './Body';
import Footer from './Footer';

const Update = ({ isShow, setIsShow, setFilterData, selectedValue, filterData }) => {
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
                    header={t('Update Role')}
                    size={'md'}
                    body={
                        <Body
                            setShowModal={setIsShow}
                            setButtonDisableStatus={setButtonDisableStatus}
                            onClickAddBtn={onClickAddBtn}
                            setIsShow={setIsShow}
                            setFilterData={setFilterData}
                            selectedValue={selectedValue}
                            filterData={filterData}
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

export default Update;
