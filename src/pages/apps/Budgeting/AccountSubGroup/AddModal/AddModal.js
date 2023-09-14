import React, { useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import Body from './Body';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';

const AddModal = ({ isShow, setIsShow, setFilterData, setErrorModalMessage, setShowErrorModal, getAllFilterData }) => {
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const { t } = useTranslation();
    const handleCloseModal = () => {setIsShow(false)}

    const addBtn = () => {
        // setIsShow(false);
        setIsClickAdd(true);
    }

    const cancelBtn = () => {
        setIsShow(false);
    }

    return (
        <>
            {isShow && (
                <GlobalModal
                    showModal={isShow}
                    setShowModal={setIsShow}
                    toggle={handleCloseModal}
                    header={t("add Account Sub Group")}
                    size={"md"}
                    body={
                        <Body
                            isClickAdd={isClickAdd}
                            addButtonDisableStatus={addButtonDisableStatus}
                            setAddButtonDisableStatus={setAddButtonDisableStatus}
                            setIsShow={setIsShow}
                            setFilterData={setFilterData}
                            setIsClickAdd={setIsClickAdd}
                            setErrorModalMessage={setErrorModalMessage}
                            setShowErrorModal={setShowErrorModal}
                            getAllFilterData={getAllFilterData}
                        />
                    }
                    footer={<Footer addBtn={addBtn} cancelBtn={cancelBtn} addButtonDisableStatus={addButtonDisableStatus} />}
                />
            )}
        </>
    );
};

export default AddModal;
