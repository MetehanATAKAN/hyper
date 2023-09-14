import React, { useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const SelectTranslate = ({ showSelectTranslateModal, setShowSelectTranslateModal, selectedItem, getFilterData, filterLanguageOptions }) => {
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const { t } = useTranslation();

    // const handleCloseModal = () => {setIsShow(false)}

    return (
        <>
            {showSelectTranslateModal && (
                <GlobalModal
                    showModal={showSelectTranslateModal}
                    setShowModal={setShowSelectTranslateModal}
                    toggle={() => setShowSelectTranslateModal(false)}
                    header={t("Translate")}
                    size={"md"}
                    body={
                        <Body
                            isClickAdd={isClickAdd}
                            setIsClickAdd={setIsClickAdd}
                            setShowSelectTranslateModal={setShowSelectTranslateModal}
                            setAddButtonDisableStatus={setAddButtonDisableStatus}
                            selectedItem={selectedItem}
                            getFilterData={getFilterData}
                            filterLanguageOptions={filterLanguageOptions}
                        />
                    }
                    footer={
                        <>
                            <Button onClick={() => setShowSelectTranslateModal(false)} variant="light">
                                {t('cancel')}
                            </Button>
                            <Button onClick={() => setIsClickAdd(true)} disabled={addButtonDisableStatus} variant="primary">
                                {t('send')}
                            </Button>
                        </>
                    }
                />
            )}
        </>
    );
};

export default SelectTranslate;
