import React from 'react'
import WantsHeader from './WantsHeader'
import WantsPercent from './WantsPercent'

const index = ({wantsName,setWantsName,setButtonDisable, setReportTitle }) => {
  setReportTitle("WANTS");
  return (
    <div className='wants'>
        <WantsHeader/>
        <WantsPercent wantsName={wantsName} setWantsName={setWantsName} setButtonDisable={setButtonDisable}/>
    </div>
  )
}

export default index