import React from 'react'
import ContentHeader from './ContentHeader'
import Total from './Total'
import ActionListTable from './ActionListTable'

const ActionList = () => {
  return (
    <div className='new-sub-process-section '>
     <ContentHeader/>
     <Total/>
     <ActionListTable/>
    </div>
  )
}

export default ActionList