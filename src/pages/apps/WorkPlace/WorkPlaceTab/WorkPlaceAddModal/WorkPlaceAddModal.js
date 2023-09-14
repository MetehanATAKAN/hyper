import React, { useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const WorkPlaceAddModal = ({ show, setShow, tableHeader, getFilterData, country, zone }) => {
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const { t } = useTranslation();

    return (
        <>
            {show && (
                <GlobalModal
                    showModal={show}
                    setShowModal={setShow}
                    toggle={() => setShow(false)}
                    header={t('add Work Place')}
                    size={'md'}
                    body={
                        <Body
                            isClickAdd={isClickAdd}
                            setIsClickAdd={setIsClickAdd}
                            setShow={setShow}
                            tableHeader={tableHeader}
                            getFilterData={getFilterData}
                            setAddButtonDisableStatus={setAddButtonDisableStatus}
                            filterCountry={country}
                            filterZone={zone}
                        />
                    }
                    footer={
                        <>
                            <Button onClick={() => setShow(false)} variant="light">
                                {t('cancel')}
                            </Button>
                            <Button
                                onClick={() => setIsClickAdd(true)}
                                disabled={addButtonDisableStatus}
                                variant="primary">
                                {t('add')}
                            </Button>
                        </>
                    }
                />
            )}
        </>
    );
};

export default WorkPlaceAddModal;
