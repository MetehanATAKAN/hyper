import React from 'react';
import { useEffect } from 'react';
import Boxes from './Boxes';

const Month = ({
        quarter, 
        month,
        clickRow1,
        clickRow2,
        clickRow3,
        clickRow4,
        clickRow5,
        clickRow6,
        activeDraggable1,
        activeDraggable2,
        activeDraggable3,
        activeDraggable4,
        activeDraggable5,
        activeDraggable6,
        isEnableDraggable,
        calendarDatas
    }) => {

    return (
        <div className='month-main-container'>
            <div className='month-content-title-container'>
                <div className='month-content-title-left'>
                    <span>{quarter}</span>
                </div>
                <div className='month-content-title-right'>
                    <span>{month}</span>
                </div>
            </div>
            <div className='month-content-container'>
                <Boxes 
                    month={month}
                    clickRow1={clickRow1} 
                    clickRow2={clickRow2} 
                    clickRow3={clickRow3} 
                    clickRow4={clickRow4} 
                    clickRow5={clickRow5} 
                    clickRow6={clickRow6} 
                    activeDraggable1={activeDraggable1}
                    activeDraggable2={activeDraggable2}
                    activeDraggable3={activeDraggable3}
                    activeDraggable4={activeDraggable4}
                    activeDraggable5={activeDraggable5}
                    activeDraggable6={activeDraggable6}
                    isEnableDraggable={isEnableDraggable} 
                    calendarDatas={calendarDatas}
                    />
            </div>
        </div>
    )
}

export default React.memo(Month) ;
