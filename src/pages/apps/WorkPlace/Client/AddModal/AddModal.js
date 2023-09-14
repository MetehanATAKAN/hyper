import React, { useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const AddModal = ({ show, setShow, getFilterData, clientTypeName }) => {
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const { t } = useTranslation();

    const [modalTabValue, setModalTabValue] = useState(0);

    const [nextButtonDisableStatus, setNextButtonDisableStatus] = useState(true);
    
  return (
    <>
    {show && (
        <GlobalModal
            showModal={show}
            setShowModal={setShow}
            toggle={() => setShow(false)}
            header={t('add Client')}
            size={'md'}
            body={
                <Body
                    isClickAdd={isClickAdd}
                    setIsClickAdd={setIsClickAdd}
                    setShow={setShow}
                    getFilterData={getFilterData}
                    setAddButtonDisableStatus={setAddButtonDisableStatus}
                    clientTypeName={clientTypeName}
                    modalTabValue={modalTabValue}
                    setModalTabValue={setModalTabValue}
                    setNextButtonDisableStatus={setNextButtonDisableStatus}
                />
            }
            footer={
                <>
                {
                    modalTabValue === 0 ? (
                        <>
                            <Button onClick={() => setShow(false)} variant="secondary">
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
                            <Button onClick={() => setModalTabValue(0)} variant="secondary">
                                {t('back')}
                            </Button>
                            <Button
                                onClick={() => setIsClickAdd(true)}
                                disabled={addButtonDisableStatus}
                                variant="primary">
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