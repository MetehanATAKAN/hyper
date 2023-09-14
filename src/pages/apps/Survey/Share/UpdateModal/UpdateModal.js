import React, { useState } from 'react'
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import '../../../../../assets/scss/custom/survey/share.scss'

const AddModal = ({ showAddModal, setShowAddModal, setData, data, selectedValue }) => {
    const { t } = useTranslation();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [clickAdd, setClickAdd] = useState(false);
    const toggle = () => {
        setShowAddModal(false);
    };

    const updateSurvey = () => {}

  return (
    <>
        <GlobalModal 
            header={t("Update Share")}
            showModal={showAddModal}
            setShowModal={setShowAddModal}
            toggle={toggle}
            body={
                <Body 
                    setData={setData}
                    selectedValue={selectedValue}
                    data={data}
                    setButtonDisabled={setButtonDisabled}
                    clickAdd={clickAdd}
                    setClickAdd={setClickAdd}
                    setShowAddModal={setShowAddModal}
                />
            }
            footer={
                <>
                    <Button onClick={() => setShowAddModal(false)} variant="light">
                        {t('cancel')}
                    </Button>
                    <Button onClick={() => setClickAdd(true)} variant="warning" disabled={buttonDisabled}>
                        {t('update')}
                    </Button>
                </>
            }
        />
    </>
  )
}

export default AddModal