import React, { useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

const AddModal = ({ showAddModal, setShowAddModal, getFilterData, setFirstActivityAdd, businessProcess2, setBusinessProcess2, setParentProcess, setTest, setProcessFilteredDatas, setBusinessProcessFilteredDatas, businessProcessFilteredDatas }) => {
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const [tabValue, setTabValue] = useState('1');

    const [onChangeTab, setOnChangeTab] = useState(false);
    const { t } = useTranslation();


    const closeButton = () => {
        setShowAddModal(false);
        setFirstActivityAdd(false);
    }

    const clickAddButton = () => {
        setOnChangeTab(true)
    }


    return (
        <>
            {showAddModal && (
                <GlobalModal
                    showModal={showAddModal}
                    setShowModal={setShowAddModal}
                    toggle={() => setShowAddModal(false)}
                    header={t("add Process")}
                    size={"md"}
                    body={
                        <Body
                            isClickAdd={isClickAdd}
                            setIsClickAdd={setIsClickAdd}
                            setShowAddModal={setShowAddModal}
                            getFilterData={getFilterData}
                            setAddButtonDisableStatus={setAddButtonDisableStatus}

                            setFirstActivityAdd={setFirstActivityAdd}
                            businessProcess2={businessProcess2}
                            setBusinessProcess2={setBusinessProcess2}
                            setParentProcess={setParentProcess}
                            setTest={setTest}
                            setProcessFilteredDatas={setProcessFilteredDatas}
                            setBusinessProcessFilteredDatas={setBusinessProcessFilteredDatas}
                            businessProcessFilteredDatas={businessProcessFilteredDatas}
                            tabValue={tabValue}
                            setTabValue={setTabValue}
                            onChangeTab={onChangeTab}
                            setOnChangeTab={setOnChangeTab}
                        />
                    }
                    footer={
                        <>
                            <Button onClick={() => closeButton()} variant="light">
                                {t('cancel')}
                            </Button>
                            <Button onClick={() => clickAddButton()} disabled={addButtonDisableStatus} variant="primary">
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