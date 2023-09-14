import React, { useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const AddModal = ({ showAddModal, setShowAddModal, getFilterData, companyIdForFilter }) => {
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const { t } = useTranslation();

    return (
        <>
            {showAddModal && (
                <GlobalModal
                    showModal={showAddModal}
                    setShowModal={setShowAddModal}
                    toggle={() => setShowAddModal(false)}
                    header={t("add Profile")}
                    size={"md"}
                    body={
                        <Body
                            isClickAdd={isClickAdd}
                            setIsClickAdd={setIsClickAdd}
                            setShowAddModal={setShowAddModal}
                            getFilterData={getFilterData}
                            setAddButtonDisableStatus={setAddButtonDisableStatus}
                            companyIdForFilter={companyIdForFilter}
                        />
                    }
                    footer={
                        <>
                            <Button onClick={() => setShowAddModal(false)} variant="light">
                                {t('cancel')}
                            </Button>
                            <Button onClick={() => setIsClickAdd(true)} disabled={addButtonDisableStatus} variant="primary">
                                {t('add')}
                            </Button>
                        </>
                    }
                />
            )}
        </>
    );
};

export default AddModal;
