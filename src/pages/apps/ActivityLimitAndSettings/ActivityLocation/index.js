import React from 'react'
import ActivityLocationSelect from './ActivityLocationSelect'
import CheckActivityLocation from './CheckActivityLocation'

const ActivityLocation = () => {
  return (
    <div className='activity-location'>
        <CheckActivityLocation/>
        <ActivityLocationSelect/>
    </div>
  )
}

export default ActivityLocation