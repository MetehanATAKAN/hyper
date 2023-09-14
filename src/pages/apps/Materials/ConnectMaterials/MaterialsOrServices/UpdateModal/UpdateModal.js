import React, { useEffect, useState } from 'react';
import GlobalModal from '../../../../../../components/GlobalNew/Modal';
import Body from './Body';
import Footer from './Footer';
import { FetchApiPost } from '../../../../../../utils/http.helper';
import { useTranslation } from 'react-i18next';

const UpdateModal = ({ isShow, setIsShow, selectedValue, handleUpdate, handleUpdateGetAgainModelOrForm }) => {
    const { t } = useTranslation();
    const [rawMaterial, setRawMaterial] = useState(selectedValue.isRawMaterial);
    const [arrow, setArrow] = useState(false);
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);

    const handleCloseModal = () => {setIsShow(false)}

    const addBtn = () => {
        // setIsShow(false);
        setIsClickAdd(true);
    }

    const cancelBtn = () => {
        setIsShow(false);
    }

    useEffect(() => {
        console.log("update",selectedValue)
    }, [selectedValue])

    return (
        <>
            {isShow && (
                <GlobalModal
                    showModal={isShow}
                    setShowModal={setIsShow}
                    toggle={handleCloseModal}
                    header={t("update Materials or Services to Company")}
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
                            selectedValue={selectedValue}
                            handleUpdateGetAgainModelOrForm={handleUpdateGetAgainModelOrForm}
                            handleUpdate={handleUpdate}
                        />
                    }
                    footer={<Footer addBtn={addBtn} cancelBtn={cancelBtn} addButtonDisableStatus={addButtonDisableStatus} />}
                />
            )}
        </>
    );
};

export default UpdateModal;
