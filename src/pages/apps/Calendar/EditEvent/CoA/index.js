import React from 'react'
import WantsHeader from '../Wants/WantsHeader'
import CoaInput from './coaInput'

const index = ({ coaValue, setCoaValue, setReportTitle }) => {
  setReportTitle("COA");
  return (
    <div className='coa'>
        <WantsHeader/>
        <CoaInput coaValue={coaValue} setCoaValue={setCoaValue}/>
    </div>
  )
}

export default index