import React, { useState } from 'react'
import GlobalModal from '../../../../../components/GlobalNew/Modal'
import { AutoCompleteInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs'
import { SingleSelects } from '../../../../../components/GlobalNew/Selects';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import ErrorModal from './ErrorModal';


const UpdateModal = ({
    show,
    setShow,
    optionsDefinationsName,
    setOptionsDefinationsName,
    optionsAbb,
    setOptionsAbb,
    obj,
    applyFilter
}) => {
  
    const { t } = useTranslation();
    const history = useHistory();

    const createdBy = localStorage.getItem('userName');

     /**Error Modal */
     const [errorModalShow, setErrorModalShow] = useState(false);
     const [errorModalMessages, setErrorModalMessages] = useState('');

     //defination type 
     const [definationType, setDefinationType] = useState([]);
     const [selectDefinationType, setSelectDefinationType] = useState(obj?.definationTypeName);
 
     //defination name
     const [definationName, setDefinationName] = useState(obj?.defination);
 
     //abbrevation
     const [abbrevation, setAbbrevation] = useState(obj?.abb);
 
     //description
     const [description, setDescription] = useState(obj?.description);

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
        // if (
        //     headerName !== '' &&
        //     selectLanguage.length !== 0 &&
        //     abbrevation !== '' &&
        //     description !== ''
        //     ) {
        //         return false
        //     }
        //     else return true
    }

    const updateHeder = () => {
        const body = {
            id:obj?.id,
            definationName:definationName,
            abbrevation:abbrevation,
            description:description,
            modifiedBy:createdBy
        }
        FetchApiPost('services/AdminPanel/Defination/UpdateDefination','POST',body)
        .then((res) =>
              (async () => {
                  try {
                      if (res.status === 201) {
                        await setShow(false);
                        await applyFilter();
                      }
                      else if (res.status === 401) {
                          history.push('/error-404');
                      }
                      else if (res.status === 409) {
                        setErrorModalShow(true);
                        res.json().then(data => {
                            setErrorModalMessages(data?.errors[0]);
                        })
                    }
                      else if (res.status === 500 || res.status === 499) {
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
    header='Update Defination'
    body={
        <div>

        <SingleSelects
            options={definationType}
            selectedItems={selectDefinationType}
            setSelectedItems={setSelectDefinationType}
            label='header'
            width='100%'
            isStar={true}
            disabled={true}
        />

        <AutoCompleteInput
            options={optionsDefinationsName}
            label='defination name'
            isStar={true}
            width='100%'
            value={definationName}
            setValue={setDefinationName}
            isContentValid={true}
            isContentWarningMessages='previously recorded under the same name'
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
            <Button  variant="light" onClick={()=> setShow(false)} >
                {t('cancel')}
            </Button>
            <Button  
            variant="warning"
            onClick={updateHeder}
            disabled={
                definationName !== '' && abbrevation !== '' && description !== ''
                ? false
                : true
            }
             >
                {t('update')}
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
    </>
  )
}

export default UpdateModal