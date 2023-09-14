import React from 'react'
import ProductProfile from './ProductProfile'

const Index = ({product, setComplatedButton, setProduct,totalNumber,setTotalNumber,setButtonDisable, setReportTitle, setTotalProfileNumber,totalProfile,settotalProfile,newNumberIndicationName,newNumberBrandName,setNewNumberBrandName}) => {
  setReportTitle("NUMBER OF PATIENT");
  return (
    <div className='number_of_patient'>
        <ProductProfile setProduct={setProduct} setComplatedButton={setComplatedButton} setNewNumberBrandName={setNewNumberBrandName} newNumberIndicationName={newNumberIndicationName} newNumberBrandName={newNumberBrandName} product={product} totalNumber={totalNumber} setTotalNumber={setTotalNumber} setButtonDisable={setButtonDisable} setTotalProfileNumber={setTotalProfileNumber} totalProfile={totalProfile} settotalProfile={settotalProfile}/>
    </div>
  )
}

export default Index