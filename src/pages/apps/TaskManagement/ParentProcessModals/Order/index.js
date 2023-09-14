import React, { useEffect, useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { NewInput } from '../../../../../components/GlobalNew/Inputs';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Order = ({ showAddModal, setShowAddModal, selectedItem }) => {
    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);

    const { t } = useTranslation();

    const [loader, setLoader] = useState()

    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        setLoader(false);
        FetchApiGet(`services/TaskManagement/SubProcess/GetSubProcessListByParentProcessId?parentProcessId=${selectedItem}`, 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setOrderItems(data)
                        setLoader(true);
                    })
                }
            })
    }, [selectedItem])
    
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
          }

          const items = reorder(
            orderItems,
            result.source.index,
            result.destination.index
        )
      
          setOrderItems(
            items
          );
    }


    const style = {
        display: 'flex',
        left: 'auto !important',
        top: 'auto !important'
    }

    useEffect(() => {
        if(orderItems.length > 0){
            setAddButtonDisableStatus(false)
        }else{
            setAddButtonDisableStatus(true)
        }
    }, [orderItems])

    useEffect(() => {
        if(isClickAdd){
            FetchApiPost('services/TaskManagement/SubProcess/UpdateOrderSubProcess', 'POST', {
                subProcessOrder: orderItems.map((i, index) => ({
                    subProcessId: i.id,
                    order: index,
                    modifiedBy: localStorage.getItem('userName')
                }))
            }).then(res => {
                if(res.status === 200 || res.status === 201){
                    setShowAddModal(false)
                }
            })
        }
    }, [isClickAdd])

    return (
        <>
            {showAddModal && (
                <GlobalModal
                    showModal={showAddModal}
                    setShowModal={setShowAddModal}
                    toggle={() => setShowAddModal(false)}
                    header={t('add Order')}
                    size={"md"}
                    body={
                        <div style={{position: "relative"}}>
                            {
                                ((loader === true) && (orderItems.length === 0)) && (
                                    <div style={{color: 'red'}}>{t('There is no s&op data in the sub processes it is connected to')}</div>
                                )
                            }
                            <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable" >
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} >
                                    {orderItems.map((item, index) => (
                                        <Draggable key={item.id} draggableId={`${item.subProcessTitle}-${item.id}`} index={index}>
                                            {(provided) => (
                                                <div 
                                                
                                                className="tom-add-container__compulsory-item" style={style}
                                                     ref={provided.innerRef} 
                                                    {...provided.draggableProps}
                                                    // {...provided.dragHandleProps}>
                                                >
                                                    <div className="tom-add-container__compulsory-item-container">
                                                        {/* <img alt='drag-icon' {...provided.dragHandleProps} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAl0lEQVRIie2UOw4CMQxExwhRTw6XcuEWQLVIcJQtcznXSMg0S6q4QS74+JWTp0ykSAP8G+Id1Fp3pZQbgAmAmdmiqnNr7R7hb71iklcAx/5CkRNJADhH+BuvWET2g+wQ5bvFAGyQPaJ8t9jMlkE8yt7y3T9W1ZkkRGR6Xayqlyg/+X1yuTq5XCu5XMnnk8vVyeVayeX6Pp4gi8bEgLk5bgAAAABJRU5ErkJggg==" /> */}
                                                        <i className="fa-solid fa-grip-lines" {...provided.dragHandleProps}></i>
                                                        <div style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{item.subProcessTitle}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                     {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                        </div>
                    }
                    footer={
                        <>
                            <Button onClick={() => setShowAddModal(false)} variant="secondary">
                                {t('cancel')}
                            </Button>
                            <Button onClick={() => setIsClickAdd(true)} disabled={addButtonDisableStatus} variant={"primary"}>
                                {t('add')}
                            </Button>
                        </>
                    }
                />
            )}
        </>
    );
};

export default Order;