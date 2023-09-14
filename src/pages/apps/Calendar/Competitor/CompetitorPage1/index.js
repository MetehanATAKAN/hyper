import React from 'react'
import CompetitorHeader from './Header'
import CompetitorBody from './Body'

const index = ({competitor}) => {
    return (
        <div className='competitor_main'>
            <CompetitorHeader />
            <CompetitorBody competitor={competitor} />
        </div>
    )
}

export default index