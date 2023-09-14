import React, { useState } from 'react'
import GlobalModal from '../../../../../components/GlobalNew/Modal'
import { AutoCompleteInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs'
import { SingleSelects } from '../../../../../components/GlobalNew/Selects';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import ErrorModal from '../Defination/ErrorModal';
import Loading from '../../../../../components/Loading';


const AddModal = ({
    show,
    setShow,
    optionsHeaderName,
    setOptionsHeaderName,
    optionsAbb,
    setOptionsAbb,
    getAllHeader
}) => {

    const { t } = useTranslation();
    const history = useHistory();

    const createdBy = localStorage.getItem('userName');

     /**Error Modal */
     const [errorModalShow, setErrorModalShow] = useState(false);
     const [errorModalMessages, setErrorModalMessages] = useState('');

     /**Loading */
     const [addHeaderLoading, setAddHeaderLoading] = useState(false);

    //header name
    const [headerName, setHeaderName] = useState('');
    
    //language
    const [language, setLanguage] = useState([
        {
            value:1,
            label:'EN'
        }
    ]);
    const [selectLanguage, setSelectLanguage] = useState(
        {
            value:1,
            label:'EN'
        }
    );

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

    const addDisable = () => {
        if (
            headerName !== '' &&
            selectLanguage.length !== 0 &&
            abbrevation !== '' &&
            description !== ''
            ) {
                return false
            }
            else return true
    }

    const addHeader = () => {
        setAddHeaderLoading(true);
        const body = {
            headerName:headerName,
            abbrevation:abbrevation,
            description:description,
            createdBy:createdBy
        }
        FetchApiPost('services/AdminPanel/Header/CreateHeader','POST',body)
        .then((res) =>
              (async () => {
                  try {
                      if (res.status === 201) {
                        await setAddHeaderLoading(false);
                        await setShow(false);
                        await getAllHeader();
                      }
                      else if (res.status === 401) {
                        setAddHeaderLoading(false);
                          history.push('/error-404');
                      }
                      else if (res.status === 409) {
                        setAddHeaderLoading(false);
                        setErrorModalShow(true);
                        res.json().then(data => {
                            setErrorModalMessages(data?.errors[0]);
                        })
                    }
                      else if (res.status === 500 || res.status === 499) {
                        setAddHeaderLoading(false);
                          history.push('/error-500');
                      }

                  } catch (error) {
                      console.log('error', error);
                  }
              })()
          )
    }
    
  return (
    <>
    <GlobalModal
    showModal={show}
    setShowModal={setShow}
    toggle={() => setShow(false)}
    header={t('Add Header')}
    body={
        <div>
        <AutoCompleteInput
        options={optionsHeaderName}
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
        disabled={true}
        />
         <AutoCompleteInput
        options={optionsAbb}
        label='abbrevation'
        isStar={true}
        width='100%'
        value={abbrevation}
        setValue={setAbbrevation}
        isContentValid={true}
        isContentWarningMessages='previously recorded under the same name'
        abb={true}
        abbWarningMessages='This abbreviation was used'
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
            <Button  variant="light" onClick={()=> setShow(false)}>
                {t('cancel')}
            </Button>
            <Button  variant="primary" onClick={addHeader} disabled ={addDisable()}>
                {t('add')}
            </Button>
        </>
    }
    />
    {
        errorModalShow &&
        <ErrorModal
        modalShow={errorModalShow}
        setModalShow={setErrorModalShow}
        messages={errorModalMessages}
        />
    }
    <Loading loading={addHeaderLoading} />
    </>
  )
}

export default AddModal