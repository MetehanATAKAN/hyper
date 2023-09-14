import React, { useState } from 'react'
import GlobalModal from '../../../../components/GlobalNew/Modal'
import { AutoCompleteInput, NewInput, NewTextArea } from '../../../../components/GlobalNew/Inputs'
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AddModal = ({
    show,
    setShow
}) => {

    const { t } = useTranslation();

    //header name
    const [headerName, setHeaderName] = useState('');
    
    //language
    const [language, setLanguage] = useState([]);
    const [selectLanguage, setSelectLanguage] = useState([]);

    //abbrevation
    const [abbrevation, setAbbrevation] = useState('');

    //description
    const [description, setDescription] = useState('');

    const options = [
        {
            value: 'mete',
            label: 'mete'
        },
        {
            value: 'atakan',
            label: 'atakan'
        },
    ]

    
  return (
    <>
    <GlobalModal
    showModal={show}
    setShowModal={setShow}
    toggle={() => setShow(false)}
    header='Add Header'
    body={
        <div>
        <AutoCompleteInput
        options={options}
        label='header name'
        isStar={true}
        width='100%'
        value={headerName}
        setValue={setHeaderName}
        isContentValid={true}
        isContentWarningMessages='previously recorded under the same name'
        />
        <SingleSelects
        options={language}
        selectedItems={selectLanguage}
        setSelectedItems={setSelectLanguage}
        label='language'
        width='100%'
        isStar={true}
        />
         <AutoCompleteInput
        options={options}
        label='abbrevation'
        isStar={true}
        width='100%'
        value={abbrevation}
        setValue={setAbbrevation}
        isContentValid={true}
        isContentWarningMessages='previously recorded under the same name'
        />
        <NewTextArea
        value={description}
        setValue={setDescription}
        isStar={true}
        label='description'
        width='100%'  
        />
        </div>
    }
    footer={
        <>
            <Button  variant="light">
                {t('cancel')}
            </Button>
            <Button  variant="primary">
                {t('add')}
            </Button>
        </>
    }
    />
    </>
  )
}

export default AddModal