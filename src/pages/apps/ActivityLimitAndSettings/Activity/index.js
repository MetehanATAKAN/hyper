import React from 'react'
import ActivitySelect from './ActivitySelect'
import ActivitySwitch from './ActivitySwitch'

const ActivityIndex = () => {
  return (
    <div className='activity-limit-activity'>
        <ActivitySwitch/>
        <ActivitySelect/>
    </div>
  )
}

export default ActivityIndex