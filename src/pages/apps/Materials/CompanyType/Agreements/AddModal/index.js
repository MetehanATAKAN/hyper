import React, { useState } from 'react';
import GlobalModal from '../../../../../../components/GlobalNew/Modal';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const AddModal = ({ showAddModal, setShowAddModal, applyFilter }) => {
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const [nextButtonDisableStatus, setNextButtonDisableStatus] = useState(true)
    const { t } = useTranslation();

    const [modalPageNumber, setModalPageNumber] = useState(1);

  return (
    <>
            {showAddModal && (
                <GlobalModal
                    showModal={showAddModal}
                    setShowModal={setShowAddModal}
                    toggle={() => setShowAddModal(false)}
                    header={t("add Agreement")}
                    size={"lg"}
                    body={
                        <Body
                            isClickAdd={isClickAdd}
                            setIsClickAdd={setIsClickAdd}
                            setShowAddModal={setShowAddModal}
                            setAddButtonDisableStatus={setAddButtonDisableStatus}
                            modalPageNumber={modalPageNumber}
                            setNextButtonDisableStatus={setNextButtonDisableStatus}
                            applyFilter={applyFilter}
                        />
                    }
                    footer={
                        <>
                        {
                            modalPageNumber === 1 ? (
                                <>
                                <Button onClick={() => setShowAddModal(false)} variant="secondary">
                                {t('cancel')}
                                </Button>
                                <Button onClick={() => setModalPageNumber(2)} disabled={nextButtonDisableStatus} variant="primary">
                                    {t('next')}
                                </Button>
                                </>
                            ) : (
                                <>
                                <Button onClick={() => setModalPageNumber(1)} variant="secondary">
                                {t('back')}
                            </Button>
                            <Button onClick={() => setIsClickAdd(true)} disabled={addButtonDisableStatus} variant="primary">
                                {t('add')}
                            </Button>
                                </>
                            )
                        }
                            
                        </>
                    }
                />
)}
            </>
  )
}

export default AddModal