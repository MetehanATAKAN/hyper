import React from 'react'
import DoctorInfo from '../../DoctorInfo'


const Header = ({doctorInfo}) => {
  return (
    <div className='competitor_header'>
     <DoctorInfo/>
      <hr/>
    </div>
  )
}

export default Header