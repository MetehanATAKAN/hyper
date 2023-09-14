import React from 'react'
import WantsHeader from '../Wants/WantsHeader'
import NewBodySelect from './NewBodySelect'
import NewRadioButton from './NewRadioButton'

const index = ({setReportTitle,isChecked,setIsChecked,contactInfo,title,setTitle,selectMailName,setSelectMailName,description,setDescription,setButtonDisable,newRadioIsCheckedPromo,setNewRadioIsCheckedPromo,newRadioIsCheckedServis,setNewRadioIsCheckedServis, newReciever, setNewRecevier}) => {
  setReportTitle("NEW");
  return (
    <div className='new'>
      <WantsHeader/>
      <NewRadioButton isChecked={isChecked} setIsChecked={setIsChecked} setButtonDisable={setButtonDisable} newRadioIsCheckedPromo={newRadioIsCheckedPromo} setNewRadioIsCheckedPromo={setNewRadioIsCheckedPromo} newRadioIsCheckedServis={newRadioIsCheckedServis} setNewRadioIsCheckedServis={setNewRadioIsCheckedServis} />
      <NewBodySelect contactInfo={contactInfo} title={title} setTitle={setTitle} selectMailName={selectMailName} setButtonDisable={setButtonDisable} setSelectMailName={setSelectMailName} description={description} setDescription={setDescription} newRadioIsCheckedPromo={newRadioIsCheckedPromo} newRadioIsCheckedServis={newRadioIsCheckedServis} newReciever={newReciever} setNewRecevier={setNewRecevier}/>
    </div>
  )
}

export default index