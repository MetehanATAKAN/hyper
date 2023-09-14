import React from 'react'
import DoctorInfo from '../../DoctorInfo'


const Header = ({doctorInfo}) => {
  return (
    <div className='objection_header'>
     <DoctorInfo />
      <hr/>
    </div>
  )
}

export default React.memo(Header)