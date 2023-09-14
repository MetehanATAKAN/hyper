import React, { useEffect,useState } from 'react'
import DoctorInfo from './DoctorInfo'
import PromoSelect from './PromoSelect'

const Index = ({customerInfo,promo,nonPromo,addPromited, setButtonDisable,image,setImage, setReportTitle}) => {

  useEffect(() => {
    setButtonDisable({disabled: false, message: null})
  }, [setButtonDisable])
  setReportTitle("PLANNED VISIT");
  
  return (
    <div className='planned_visit'>
      {
        customerInfo && <DoctorInfo value={customerInfo} image={image} setImage={setImage} />
      }
      <PromoSelect promo={promo} nonPromo={nonPromo} addPromited={addPromited} />
    </div>
  )
}

export default Index