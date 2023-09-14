import React,{ useState,useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
const NewRadioButton = ({isChecked,setIsChecked,newRadioIsCheckedPromo,newRadioIsCheckedServis,setNewRadioIsCheckedPromo,setNewRadioIsCheckedServis,setButtonDisable}) => {
    console.log(newRadioIsCheckedPromo,newRadioIsCheckedServis);
    const { t } = useTranslation();
    const appStatus = useSelector(state => state.Calendar.appStatus);
    const handleRadio = (e) => {
        setIsChecked(e.target.value)
        if(e.target.value === 'promo') {
            setNewRadioIsCheckedPromo(true);
            setNewRadioIsCheckedServis(false);
        }
        else if (e.target.value === 'servis') {
            setNewRadioIsCheckedPromo(false);
            setNewRadioIsCheckedServis(true);
        }
    }
    // useEffect(() => {
    //  if(newRadioIsCheckedPromo=== false && newRadioIsCheckedServis===false) {
    //     setButtonDisable({disable:false,message:null})
    //     console.log('new if');
    //  }
    //  else {
    //     setButtonDisable({disable:true,message:'geçemezsin'})
    //     console.log('new else');
    //  }
    // }, [newRadioIsCheckedPromo, newRadioIsCheckedServis, setButtonDisable])
    
    return (
        <div className='new_radio_button'>
            <Row>
                <Col>
                    <input disabled={appStatus === 4} onClick={(e)=>handleRadio(e)} type="radio" id="promo" name="new_radio_button" value={t("promo")} checked={newRadioIsCheckedPromo} />
                    <label htmlFor="html">{t('promo')}</label>
                </Col>
                <Col>
                    <input disabled={appStatus === 4} onClick={(e)=>handleRadio(e)} type="radio" id="servis" name="new_radio_button" value={t("servis")} checked={newRadioIsCheckedServis} />
                    <label htmlFor="css">{t('servis')}</label>
                </Col>
            </Row>
        </div>
    )
}

export default NewRadioButton