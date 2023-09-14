import React, { useState } from 'react'
import GlobalModal from '../../../../../components/GlobalNew/Modal'
import { AutoCompleteInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs'
import { SingleSelects } from '../../../../../components/GlobalNew/Selects';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';


const UpdateModal = ({
    show,
    setShow,
    optionsHeaderName,
    setOptionsHeaderName,
    optionsAbb,
    setOptionsAbb,
    obj,
    applyFilter
}) => {
  
    const { t } = useTranslation();
    const history = useHistory();
    console.log(obj);
    const createdBy = localStorage.getItem('userName');

    //header name
    const [headerName, setHeaderName] = useState(obj?.header);
    
    //language
    const [language, setLanguage] = useState([
        {
            value:1,
            label:obj?.language
        }
    ]);
    const [selectLanguage, setSelectLanguage] = useState(
        {
            value:1,
            label:obj?.language
        }
    );

    //abbrevation
    const [abbrevation, setAbbrevation] = useState(obj?.abb);

    //description
    const [description, setDescription] = useState(obj?.description);
       
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

    const updateHeder = () => {
        const body = {
            id:obj?.id,
            headerName:headerName,
            abbrevation:abbrevation,
            description:description,
            modifiedBy:createdBy
        }
        FetchApiPost('services/AdminPanel/Header/UpdateHeader','POST',body)
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
    header='Update Header'
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
        editObjectName={obj?.header}
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
        editObjectName={obj?.abb}
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
            <Button  variant="warning" onClick={updateHeder} disabled ={addDisable()}>
                {t('update')}
            </Button>
        </>
    }
    />
    </>
  )
}

export default UpdateModal