import React from 'react'
import { mdiCheck, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

const Filter = () => {
  return (
    <div className="global-filter">
    <div className="global-filter-container">
       

        <div className="global-filter-buttons">
            <button  className="global-filter-buttons__apply">
                <Icon path={mdiCheck} size={1} />
            </button>
            <button  className="global-filter-buttons__delete">
                <i className="fa-sharp fa-solid fa-broom"></i>
            </button>
            <button  className="global-filter-buttons__close">
                <Icon path={mdiClose} size={1} />
            </button>
        </div>
    </div>
    
</div>
  )
}

export default Filter