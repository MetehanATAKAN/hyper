import React, { useState } from 'react';
import GlobalModal from '../../../../../../components/GlobalNew/Modal';
import Body from './Body';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';

const AddModal = ({ isShow, setIsShow, setFilterData }) => {
    const [rawMaterial, setRawMaterial] = useState(false);
    const [arrow, setArrow] = useState(false);
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
                    header={t("add Materials or Services to Company")}
                    size={rawMaterial === false ? 'lg' : 'xl'}
                    body={
                        <Body
                            setRawMaterial={setRawMaterial}
                            rawMaterial={rawMaterial}
                            arrow={arrow}
                            setArrow={setArrow}
                            isClickAdd={isClickAdd}
                            addButtonDisableStatus={addButtonDisableStatus}
                            setAddButtonDisableStatus={setAddButtonDisableStatus}
                            setShowModal={setIsShow}
                            setFilterData={setFilterData}
                        />
                    }
                    footer={<Footer addBtn={addBtn} cancelBtn={cancelBtn} addButtonDisableStatus={addButtonDisableStatus} />}
                />
            )}
        </>
    );
};

export default AddModal;
