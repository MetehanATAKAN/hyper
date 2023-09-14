import React, { useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const EditModal = ({ showModal, setShowModal, getFilterData, item }) => {
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const { t } = useTranslation();

  return (
    <>
            {showModal && (
                <GlobalModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    toggle={() => setShowModal(false)}
                    header={t("Update Promo Subject")}
                    size={"md"}
                    body={
                        <Body
                            isClickAdd={isClickAdd}
                            setIsClickAdd={setIsClickAdd}
                            setShowModal={setShowModal}
                            setAddButtonDisableStatus={setAddButtonDisableStatus}
                            selectedItem={item}
                            getFilterData={getFilterData}
                        />
                    }
                    footer={
                        <>
                            <Button onClick={() => setShowModal(false)} variant="light">
                                {t('cancel')}
                            </Button>
                            <Button onClick={() => setIsClickAdd(true)} disabled={addButtonDisableStatus} variant="warning">
                                {t('update')}
                            </Button>
                        </>
                    }
                />
            )}
        </>
  )
}

export default EditModal