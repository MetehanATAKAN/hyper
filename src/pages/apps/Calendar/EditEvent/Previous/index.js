import React from 'react'
import WantsHeader from '../Wants/WantsHeader'
import PreviousBody from './PreviousBody'

const index = ({previousInput,setPreviousInput, setReportTitle, previousText}) => {
  setReportTitle("PREVIOUS");
  return (
    <div className='previous' >
        <WantsHeader/>
        <PreviousBody previousInput={previousInput} setPreviousInput={setPreviousInput} previousText={previousText}/>
    </div>
  )
}

export default index