import React, { useState } from 'react'
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import Body from './Body';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import '../../../../../assets/scss/custom/survey/share.scss'

const AddModal = ({ showAddModal, setShowAddModal, setData, shareSurveyId, setSelectTab }) => {
    const { t } = useTranslation();

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [clickAdd, setClickAdd] = useState(false);
    const toggle = () => {
        setShowAddModal(false);
    };

    const addSurvey = () => {


    }

  return (
    <>
        <GlobalModal 
            header={t("add Share")}
            showModal={showAddModal}
            setShowModal={setShowAddModal}
            toggle={toggle}
            body={
                <Body 
                    setData={setData}
                    shareSurveyId={shareSurveyId}
                    clickAdd={clickAdd}
                    setClickAdd={setClickAdd}
                    setButtonDisabled={setButtonDisabled}
                    setShowAddModal={setShowAddModal}
                    setSelectTab={setSelectTab}
                />
            }
            footer={
                <>
                    <Button onClick={() => setShowAddModal(false)} variant="light">
                        {t('cancel')}
                    </Button>
                    <Button onClick={() => setClickAdd(true)} variant="primary" disabled={buttonDisabled}>
                        {t('add')}
                    </Button>
                </>
            }
        />
    </>
  )
}

export default AddModal