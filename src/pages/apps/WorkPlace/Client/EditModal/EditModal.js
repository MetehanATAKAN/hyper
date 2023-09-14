import React, { useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const AddModal = ({ show, setShow, getFilterData, clientTypeName, selectedItem }) => {
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const [nextButtonDisableStatus, setNextButtonDisableStatus] = useState(true);
    const { t } = useTranslation();
    const [modalTabValue, setModalTabValue] = useState(0);
    
  return (
    <>
    {show && (
        <GlobalModal
            showModal={show}
            setShowModal={setShow}
            toggle={() => setShow(false)}
            header={t('Update Client')}
            size={'md'}
            body={
                <Body
                    isClickAdd={isClickAdd}
                    setIsClickAdd={setIsClickAdd}
                    setShow={setShow}
                    getFilterData={getFilterData}
                    setAddButtonDisableStatus={setAddButtonDisableStatus}
                    clientTypeName={clientTypeName}
                    selectedItem={selectedItem}
                    setNextButtonDisableStatus={setNextButtonDisableStatus}
                    modalTabValue={modalTabValue}
                    setModalTabValue={setModalTabValue}
                />
            }
            footer={
                <>
                {
                    modalTabValue === 0 ? (
                        <>
                            <Button onClick={() => setShow(false)} variant="light">
                            {t('cancel')}
                            </Button>
                            <Button
                                onClick={() => setModalTabValue(1)}
                                disabled={nextButtonDisableStatus}
                                variant="primary">
                                {t('next')}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => setModalTabValue(0)} variant="light">
                                {t('back')}
                            </Button>
                            <Button
                                onClick={() => setIsClickAdd(true)}
                                disabled={addButtonDisableStatus}
                                variant="primary">
                                {t('update')}
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