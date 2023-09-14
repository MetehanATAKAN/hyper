import { bottom } from '@popperjs/core';
import React,{useEffect,useState} from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const CalendarDragDropTable3 = ({ handleDragEnd, droppableId, line, month1, month2, activeDraggable, clickRow, calendarDatas, janxx, lineNumber, frequency }) => {
    let monthLength = 0;
    const calendarProduct = useSelector((state) => state.VisitMix.calendarProduct);
    const [productData, setProductData] = useState([]);
    month1.map(data => (
        data === undefined
            ? monthLength++
            : null
    ))

    useEffect(() => {
        let calendarProductData = [];
        calendarProduct.map((data) => (
            calendarProductData.push(data.label)
        ))
        setProductData(calendarProductData)
    }, [calendarProduct])
    const z = (index, record) => {
        if (frequency === 4) {
            return (
                clickRow
                    ? lineNumber >= 4 ? 'box2 passive-box' : 'box1 passive-box'
                    : month1[0] === undefined
                        ? lineNumber >= 4 ? 'box2' : 'box1'
                        : month1[0].brandName === record.brandName && month1[1].brandName === record.brandName && month1[2].brandName === record.brandName && month1[3].brandName === record.brandName
                            ? lineNumber >= 4 ? 'box2' : 'box1'
                            : index === 0 && month1[0] !== undefined && (month1[1].brandName === record.brandName || month2[0].brandName === record.brandName)
                                ? 'calendarError'
                                : index === 1 && month1[0] !== undefined && (month1[0].brandName === record.brandName || month1[2].brandName === record.brandName || month2[1].brandName === record.brandName)
                                    ? 'calendarError'
                                    : index === 2 && month1[0] !== undefined && (month1[1].brandName === record.brandName || month1[3].brandName === record.brandName || month2[2].brandName === record.brandName)
                                        ? 'calendarError'
                                        : index === 3 && month1[0] !== undefined && (month1[2].brandName === record.brandName || month2[3].brandName === record.brandName)
                                            ? 'calendarError'
                                            : lineNumber >= 4 ? 'box2' : 'box1'
            )
        }
        else {
            return (
                lineNumber >= 4 ? 'box2' : 'box1'
            )
        }
    }
    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId={droppableId} direction="horizontal">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className={line}>
                            {
                                month1.length !== 0
                                    ? month1.map((record, index) => {
                                        return (
                                            <Draggable key={index} draggableId={index.toString()} index={index} isDragDisabled={
                                                activeDraggable && record !== undefined ? false : true
                                                // activeDraggable ? false : true,
                                                //  record===undefined?true:false
                                            } >
                                                {(provided) => (
                                                    <div ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={z(index, record)}
                                                    // {
                                                    //     frequency !==4
                                                    //     ?lineNumber>=4 ?'box2' :'box1'    
                                                    //     :clickRow 
                                                    //     ? lineNumber>=4 ?'box2 passive-box' :'box1 passive-box'
                                                    //     :month1[0]===undefined
                                                    //     ?lineNumber>=4 ?'box2' :'box1'
                                                    //     :month1[0].brandName===record.brandName && month1[1].brandName===record.brandName && month1[2].brandName===record.brandName && month1[3].brandName===record.brandName
                                                    //     ?lineNumber>=4 ?'box2' :'box1' 
                                                    //     :index===0 && month1[0]!==undefined && month2[0]!==undefined && (month1[1].brandName===record.brandName || month2[0].brandName===record.brandName)
                                                    //     ?'calendarError'
                                                    //     :index===0 && month1[0]!==undefined && month2[0]===undefined && (month1[1].brandName===record.brandName )
                                                    //     ?'calendarError'
                                                    //     :index===1 && month1[0]!==undefined && month2[0]!==undefined && (month1[0].brandName===record.brandName || month1[2].brandName===record.brandName || month2[1].brandName===record.brandName)
                                                    //     ?'calendarError'
                                                    //     :index===1 && month1[0]!==undefined && month2[0]===undefined && (month1[0].brandName===record.brandName || month1[2].brandName===record.brandName )
                                                    //     ?'calendarError'   
                                                    //     :index===2 && month1[0]!==undefined && month2[0]!==undefined && (month1[1].brandName===record.brandName || month1[3].brandName===record.brandName || month2[2].brandName===record.brandName)
                                                    //     ?'calendarError'
                                                    //     :index===2 && month1[0]!==undefined && month2[0]===undefined && (month1[1].brandName===record.brandName || month1[3].brandName===record.brandName )
                                                    //     ?'calendarError'
                                                    //     :index===3 && month1[0]!==undefined && month2[0]!==undefined && (month1[2].brandName===record.brandName || month2[3].brandName===record.brandName)
                                                    //     ?'calendarError'
                                                    //     :index===3 && month1[0]!==undefined && month2[0]===undefined && (month1[2].brandName===record.brandName )
                                                    //     ?'calendarError'
                                                    //     :lineNumber>=4 ?'box2' :'box1'

                                                    // }
                                                    // {
                                                    //     clickRow 
                                                    //     ?lineNumber>=4 ?'box2 passive-box' :'box1 passive-box'
                                                    //     :month1[0]===undefined
                                                    //     ?lineNumber>=4 ?'box2' :'box1'
                                                    //     :month1[0].brandName===record.brandName && month1[1].brandName===record.brandName && month1[2].brandName===record.brandName && month1[3].brandName===record.brandName
                                                    //     ?lineNumber>=4 ?'box2' :'box1' 
                                                    //     :index===0 && month1[0]!==undefined && (month1[1].brandName===record.brandName || month2[0].brandName===record.brandName)
                                                    //     ?'calendarError'
                                                    //     :index===1 && month1[0]!==undefined && (month1[0].brandName===record.brandName || month1[2].brandName===record.brandName || month2[1].brandName===record.brandName)
                                                    //     ?'calendarError'
                                                    //     :index===2 && month1[0]!==undefined && (month1[1].brandName===record.brandName || month1[3].brandName===record.brandName || month2[2].brandName===record.brandName)
                                                    //     ?'calendarError'
                                                    //     :index===3 && month1[0]!==undefined && (month1[2].brandName===record.brandName || month2[3].brandName===record.brandName)
                                                    //     ?'calendarError'
                                                    //     :lineNumber>=4 ?'box2' :'box1'
                                                    // }
                                                    >
                                                        <OverlayTrigger
                                                         key={index}
                                                         placement={bottom}
                                                         overlay={
                                                           <Tooltip id={`tooltip-${index}`}>
                                                             {
                                                                calendarDatas === null
                                                                ? janxx.map((data) => (
                                                                    data
                                                                ))
                                                                : record !== undefined
                                                                    ? record.brandName
                                                                    : null
                                                             }
                                                           </Tooltip>
                                                         }
                                                        >
                                                            <span className={productData.includes(record?.brandName) ? 'glow':'calendar_cell'} > 
                                                            {
                                                                calendarDatas === null
                                                                    ? janxx.map((data) => (
                                                                        data
                                                                    ))
                                                                    : record !== undefined
                                                                        ? record.brandAbb
                                                                        : null
                                                            }
                                                        </span>
                                                        </OverlayTrigger>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })
                                    : janxx.map((data, index) => {
                                        return (
                                            <div className={lineNumber >= 4 ? 'box2' : 'box1'}>
                                                <span></span>
                                            </div>
                                        )
                                    })
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>

    )
}

export default CalendarDragDropTable3