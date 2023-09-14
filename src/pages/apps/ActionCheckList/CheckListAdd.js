import React, { useState } from 'react'
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import PharmacySplitPercentProblem from '../../../components/Modals/PharmacySplitPercentProblem';

const CheckListAdd = ({ setOnModal, actionList, setCheckList, checkList }) => {
    const [listName, setListName] = useState('');
    const [selectedOptions, setSelectedOptions] = useState(null);
    const [option, setOptions] = useState([...actionList]);
    const [compulsory, setCompulsory] = useState([]);
    let grid = 5
    const { t } = useTranslation();
    const [show, setShow] = useState(false);

    const handleAddCompulsory = async (e) => {
        if(selectedOptions !== null){
            let newOptions = await option.filter(item => selectedOptions?.id !== item.id);
            setOptions(newOptions);
            setCompulsory(prev => [...prev, selectedOptions]);
            setSelectedOptions(null);
        }
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };

      const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
      
        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",
      
        // styles we need to apply on draggables
        ...draggableStyle
      });
      
      const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250
      });

      const onDragEnd = result => {
        if(!result.destination) {
            return;
        }
        const items = reorder(
            compulsory,
            result.source.index,
            result.destination.index
        )
        setCompulsory(items);
      }

    const handleDeleteCompulsoryItem = async (e) => {
        let newCompulsory = await compulsory.filter(item => item.id !== e.id);
        let deletedItem = await actionList.find(item => item.id === e.id);
        setOptions(prev => [...prev, deletedItem]);
        setCompulsory(newCompulsory);
    }

    const handleCreateList = () => {
        let checkName = checkList.find(item => item.title === listName.trim());
        if(checkName === undefined){
                FetchApiPost('services/TaskManagement/ActionAndCheckList/CreateCheckList', 'POST', {
                    title: listName,
                    createdBy: localStorage.getItem('userName') || "string",
                    actions: compulsory.map(item => {
                        return {
                            actionId: item.id,
                            isChecked: item.isChecked,
                            createdBy: localStorage.getItem('userName') || "string"
                        }
                    })

                })
                .then(res => res.json())
                .then(res => res.data)
                .then(res => setCheckList(prev => [...prev, res ]))
            setOnModal(false)
        } else {
            setShow(true);
        }
        
    }
    

    const handleCheckedCompulsoryItem = (item, e) => {
        let newCompulsory = [...compulsory];
        newCompulsory.map(i => {
            i.id === item.id ? i.isChecked = e : i.isChecked = i.isChecked;
        }
        )
        setCompulsory(newCompulsory);
    }

    const handleClose = () => {
        setShow(false);
    }

    console.log("compulsorycompulsorycompulsory", compulsory)

  return (
    <div className='checklist-add'>
        {
            show && <PharmacySplitPercentProblem show={show} handleClose={handleClose} messages={t('List name already exists')} />
        }
        <div className='checklist-add-container'>
            <div className='checklist-add-container__list-name'>
                <div>{t('list name')}</div>
                <input type="text" className='form-control' value={listName} onChange={(e) => setListName(e.target.value)} placeholder={t('add check list name')} />
            </div>
            <div className='checklist-add-container__select'>
                <div>{t('select action')}</div>
                <div className='checklist-add-container__select-form'>
                    <Select
                        isMulti={false}
                        className="react-select"
                        placeholder={t("select")}
                        classNamePrefix="react-select"
                        onChange={(e) => setSelectedOptions(e)}
                        options={option?.map((option) => ({
                            id: option.id,
                            value: option.title,
                            label: option.title,
                            isChecked: option.isChecked
                    }))}></Select>
                    <Button variant='primary' onClick={() => handleAddCompulsory()}>{t('add')}</Button>
                </div>
            </div>
            <div className='checklist-add-container__compulsory'>
                <div>{t('compulsory')}</div>
                <div className='checklist-add-container__compulsory-box' style={{position: "relative"}}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable" >
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} >
                                    {compulsory.map((item, index) => (
                                        <Draggable key={item.value} draggableId={item.value} index={index}>
                                            {(provided) => (
                                                <div 
                                                
                                                className="checklist-add-container__compulsory-item"
                                                     ref={provided.innerRef} 
                                                    {...provided.draggableProps}
                                                    // {...provided.dragHandleProps}>
                                                >
                                                    <div className="checklist-add-container__compulsory-item-container">
                                                        <img alt='drag-icon' {...provided.dragHandleProps} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAl0lEQVRIie2UOw4CMQxExwhRTw6XcuEWQLVIcJQtcznXSMg0S6q4QS74+JWTp0ykSAP8G+Id1Fp3pZQbgAmAmdmiqnNr7R7hb71iklcAx/5CkRNJADhH+BuvWET2g+wQ5bvFAGyQPaJ8t9jMlkE8yt7y3T9W1ZkkRGR6Xayqlyg/+X1yuTq5XCu5XMnnk8vVyeVayeX6Pp4gi8bEgLk5bgAAAABJRU5ErkJggg==" />
                                                        <input className='checklist-add-container__compulsory-item-checkbox' type="checkbox" value={item.isChecked} onChange={e => handleCheckedCompulsoryItem(item, e.target.checked)} />
                                                        <div>{item.value}</div>
                                                    </div>
                                                    <button onClick={() => handleDeleteCompulsoryItem(item)} disabled={item.isChecked} className="checklist-add-container__compulsory-item-delete">
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button>
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
            </div>
        </div>
        <div className="task-management-footer-btn">
            <Button variant="light" onClick={() => setOnModal(false)} >{t('cancel')}</Button>
            <Button variant="primary" disabled={(listName.trim().length === 0 || compulsory.length === 0) && true} onClick={() => handleCreateList()}>{t('save')}</Button>
        </div>
    </div>
  )
}

export default CheckListAdd;