import React, { useEffect } from 'react'
import { Row } from 'react-bootstrap'
import Select from 'react-select'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
const NewBodySelect = ({contactInfo,title,setTitle,selectMailName,setSelectMailName,setButtonDisable,description,setDescription,newRadioIsCheckedPromo,newRadioIsCheckedServis}) => {
    console.log(newRadioIsCheckedPromo,newRadioIsCheckedServis);
    console.log(contactInfo);
    const { t } = useTranslation();
    const changeMailName =(e)=> {
        setSelectMailName({
            value: e.value,
            label: e.label,
            mail: e.mail,
            title: e.title
        });
    }
    const appStatus = useSelector(state => state.Calendar.appStatus);
    console.log(selectMailName);
    useEffect(() => {
      if(newRadioIsCheckedPromo === false && newRadioIsCheckedServis === false) {
        setButtonDisable({disable:false,message:null})
      }
      else {
          if(title !==null && description !== null && selectMailName !==undefined) {
            setButtonDisable({disable:false,message:null})
          }
          else {
            setButtonDisable({disable:true,message:t('Fill in all fields.')})
          }
      }
    }, [description, newRadioIsCheckedPromo, newRadioIsCheckedServis, selectMailName, setButtonDisable, title])
    
    return (
        <div className='new_body_selects'>
            <div className='select_div'>
                <label>{t('title')}</label>
                <Row><input disabled={(newRadioIsCheckedPromo === false && newRadioIsCheckedServis === false ? true :false) || appStatus === 4} className='title_input' type='text' defaultValue={title} onChange={(e)=>setTitle(e.target.value)} /></Row>
            </div>
            <div className='select_div'>
                <label>{t('description of request')}</label>
                <Row><textarea disabled={(newRadioIsCheckedPromo === false && newRadioIsCheckedServis === false ? true :false) || appStatus === 4} id='description' name='description' rows={4} cols={30} defaultValue={description} onChange={(e)=>setDescription(e.target.value)}></textarea></Row>
            </div>
            <div className='select_div'>
                <label>{t('who would you like to send request to?')}</label>
                <Row>
                    <Select
                        isMulti={false}
                        options={contactInfo}
                        className="react-select"
                        classNamePrefix="react-select"
                        onChange={changeMailName}
                        value={selectMailName}
                        isDisabled={(newRadioIsCheckedPromo === false && newRadioIsCheckedServis === false ? true :false) || appStatus === 4}
                    />
                </Row>
            </div>
        </div>
    )
}

export default NewBodySelect