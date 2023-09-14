import React from 'react'
import ObjectionHeader from './Header';
import ObjectionBody from './Body'

const index = (props) => {
    const {objectionPromo, objectionNonPromo, objectionOther, setBrand} = props;
    return (
        <div className='objection_main'>
            <ObjectionHeader />
            <ObjectionBody objectionPromo={objectionPromo} objectionNonPromo={objectionNonPromo} objectionOther={objectionOther} setBrand={setBrand} />
        </div>
    )
}

export default React.memo(index)