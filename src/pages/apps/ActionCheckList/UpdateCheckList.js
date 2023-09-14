import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import PharmacySplitPercentProblem from '../../../components/Modals/PharmacySplitPercentProblem';

const UpdateCheckList = ({ updateCheckList, setOnModal, checkList, setCheckList, actionList}) => {

  const [listName, setListName] = useState(updateCheckList.title);
    const [selectedOptions, setSelectedOptions] = useState(null);
    const [option, setOptions] = useState([]);
    const [compulsory, setCompulsory] = useState([]);
    const [firstCompulsory, setFirstCompulsory] = useState([]);
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const [pushCompulsory, setPushCompulsory] = useState([]);
    const [deletedActions, setDeletedActions] = useState([]);
    const modifiedBy = localStorage.getItem('userName') || "string"

    const [totalCompulsory, setTotalCompulsory] = useState([]);

    const handleAddCompulsory = async (e) => {
        if(selectedOptions !== null){
            let newOptions = await option.filter(item => selectedOptions?.id !== item.id);
            setOptions(newOptions);
            setCompulsory(prev => [...prev, selectedOptions]);
            setSelectedOptions(null);
            // pushCompulsory.find(item => item.id === selectedOptions.id) === undefined ?
            //     setPushCompulsory(prev => [...prev, {id: selectedOptions.id, isChecked: selectedOptions.isChecked, status: true}])
            //     :
            //     setPushCompulsory(prev => prev.map(item => {
            //         if(selectedOptions.id === item.id){
            //             return {
            //                 id: item.id,
            //                 isChecked: item.isChecked,
            //                 status: true
            //             }
            //         } else {
            //             return {
            //                 id: item.id,
            //                 isChecked: item.isChecked,
            //                 status: item.status
            //             }
            //         }
            //     }))
                pushCompulsory.find(item => item.id === selectedOptions.id) === undefined ? setPushCompulsory(
                    prev => [...prev, {id: selectedOptions.id, isChecked: selectedOptions.isChecked, status: true}]
                )
                : setPushCompulsory(pushCompulsory.map(item => {
                    if(selectedOptions.id === item.id){
                        return {
                            id: item.id,
                            isChecked: item.isChecked,
                            status: true
                        }
                    } else {
                        return {
                            id: item.id,
                            isChecked: item.isChecked,
                            status: item.status
                        }
                    }
                }))
        }
            
    }
    console.log("PUSHCOMPULSORY", pushCompulsory);
    useEffect(() => {
        let firstOptions = actionList.filter(item => (
            updateCheckList.actions.map(item2 => item2.id).includes(item.id) === false
        ))
        setOptions(firstOptions);
    }, [])

    useEffect(() => {
      setCompulsory(updateCheckList.actions.map((item) => {
        return {
          id: item.id,
          isChecked: item.isChecked,
          label: item.title,
          value: item.title,
          status: true
        }
      }));

      setFirstCompulsory(updateCheckList.actions.map((item) => {
        return {
          id: item.id,
          isChecked: item.isChecked,
          label: item.title,
          value: item.title,
          status: true
        }
      }))

      setTotalCompulsory(updateCheckList.actions.map((item) => {
        return {
          id: item.id,
          isChecked: item.isChecked,
          label: item.title,
          value: item.title,
          status: true
        }
      }))

      setPushCompulsory(updateCheckList.actions.map((item) => {
        return {
          id: item.id,
          isChecked: item.isChecked,
          label: item.title,
          value: item.title,
          status: true
        }
      }))

    }, [])

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
    
      return result;
    };


    // burda push compulsory yi yeniden düzenle compulsory state ine göre
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
      console.log("DRAGGGGGGGGGGGGGGGGGGGGGGGGGGGG");
      let newCompulsory = [...compulsory]
      pushCompulsory.map(item => compulsory.find(item2 => item.id !== item2.id) === undefined ? newCompulsory.push(item) : null)
        setPushCompulsory(newCompulsory)

    }

  const handleDeleteCompulsoryItem = async (e) => {
    //   let newCompulsory = await compulsory.filter(item => item.id !== e.id);
    //   let deletedItem = await actionList.find(item => item.id === e.id);
    //   setOptions(prev => [...prev, deletedItem]);
    //   setCompulsory(newCompulsory);

    let newCompulsory = await firstCompulsory.find(item => item.id === e.id)

    if(newCompulsory === undefined){
        let deletedItem = await actionList.find(item => item.id === e.id);
        setOptions(prev => [...prev, deletedItem]);
        setPushCompulsory(pushCompulsory.filter(item => item.id !== e.id));
    } else {
        let addetItem = await actionList.find(item => item.id === e.id)
        
        setOptions(prev => [...prev, addetItem]);
        setPushCompulsory(pushCompulsory.map(item => {
            if(e.id === item.id){
                return {
                    id: item.id,
                    isChecked: item.isChecked,
                    status: false
                }
            } else {
                return {
                    id: item.id,
                    isChecked: item.isChecked,
                    status: item.status
                }
            }
        }))
    }

    setCompulsory(prev => prev.filter(item => item.id !== e.id))
    

    //   (firstCompulsory.find(item => item.id === e.id) === undefined) ? (
    //   setOptions(prev => [...prev, actionList.find(item => item.id === e.id)]),
    //   setCompulsory(compulsory.filter(item => item.id !== e.id)))
    //   :
    //     (setCompulsory(compulsory.filter(item => item.id !== e.id)),
    //     setOptions(prev => [...prev, actionList.find(item => item.id === e.id)]),
    //     setPushCompulsory(pushCompulsory.map(item => {
    //         if(e.id === item.id){
    //             return {
    //                 id: item.id,
    //                 isChecked: item.isChecked,
    //                 status: false
    //             }
    //         } else {
    //             return {
    //                 id: item.id,
    //                 isChecked: item.isChecked,
    //                 status: item.status
    //             }
    //         }
    //     })))
      
  }

  console.log("compulsorycompulsory",compulsory);

  const handleUpdate = async () => {
    let checkName = await checkList.filter(item => item.title === listName);
    let newfirstCompulsory = await firstCompulsory.map(item => compulsory.find(c => (c.id === item.id)) === undefined ? {id: item.id, isChecked: item.isChecked, status: false, modifiedBy: modifiedBy} : null);
    let filterCompulsory = await newfirstCompulsory.filter(item => item !== null);
    // await setPushCompulsory([...compulsory.map(item => {
    //     return {
    //         id: item.id,
    //         isChecked: item.isChecked,
    //         status: true,
    //         modifiedBy: modifiedBy
    //     }
    // }), ...filterCompulsory])

    if (checkName.length === 0) {
       
      await FetchApiPost('services/TaskManagement/ActionAndCheckList/UpdateCheckList', 'POST', {
                      id: updateCheckList.id,
                      title: listName,
                      modifiedBy: localStorage.getItem('userName') || "string",
                      actions: [...pushCompulsory.map(item => {
                        return {
                            actionId: item.id,
                            isChecked: item.isChecked,
                            status: item.status,
                            modifiedBy: modifiedBy
                        }
                    })]
                  }).then(res => res.json())
                  .then(res => res.data)
                  .then(res => setCheckList(checkList.map(item => item.id === res.id ? 
                    {actions: res.actions, 
                    createdBy: res.createdBy,
                    createdDate: res.createdDate,
                    id: res.id,
                    modifiedBy: res.modifiedBy,
                    modifiedDate: res.modifiedDate,
                    status: res.status,
                    title: res.title
                    } 
                    : item)))
                //   .then(res => res.json())
                //   .then(res => res.data)
                //   .then(res => setCheckList(prev => [...prev, res ]))
      setOnModal(false)
    } else if (checkName.length === 1 && checkName[0].id === updateCheckList.id) {
          await FetchApiPost('services/TaskManagement/ActionAndCheckList/UpdateCheckList', 'POST', {
                      id: updateCheckList.id,
                      title: listName,
                      modifiedBy: localStorage.getItem('userName') || "string",
                      actions: [...pushCompulsory.map(item => {
                        return {
                            actionId: item.id,
                            isChecked: item.isChecked,
                            status: item.status,
                            modifiedBy: modifiedBy
                        }
                    })]
                  }).then(res => res.json())
                  .then(res => res.data)
                  .then(res => setCheckList(checkList.map(item => item.id === res.id ? 
                    {actions: res.actions, 
                    createdBy: res.createdBy,
                    createdDate: res.createdDate,
                    id: res.id,
                    modifiedBy: res.modifiedBy,
                    modifiedDate: res.modifiedDate,
                    status: res.status,
                    title: res.title
                    } 
                    : item)))
                //   .then(res => res.json())
                //   .then(res => console.log(res.data))
                //   .then(res => setCheckList(prev => [...prev, res ]))
      setOnModal(false)
    }else {
        setShow(true);
    }
  }



    console.log("pushcompulsory",pushCompulsory)
  

  const handleCheckedCompulsoryItem = (item, e) => {
      let newCompulsory = [...compulsory];
      newCompulsory.map(i => {
          i.id === item.id ? i.isChecked = e : i.isChecked = i.isChecked;
      }
      )
      setCompulsory(newCompulsory);

      let newCompulsory2 = [...pushCompulsory];
      newCompulsory2.map(i => {
          i.id === item.id ? i.isChecked = e : i.isChecked = i.isChecked;
      }
      )
      
    setPushCompulsory(newCompulsory2);
  }

  const handleClose = () => {
    setShow(false);
  }

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
                        placeholder="select"
                        classNamePrefix="react-select"
                        onChange={(e) => setSelectedOptions(e)}
                        options={option?.map((option) => ({
                            id: option.id,
                            value: option.title,
                            label: option.title,
                            isChecked: option.isChecked,
                            status: option.status
                    }))}></Select>
                    <Button variant='primary' onClick={() => handleAddCompulsory()}>{t('add')}</Button>
                </div>
            </div>
            <div className='checklist-add-container__compulsory'>
                <div>{t('compulsory')}</div>
                <div className='checklist-add-container__compulsory-box' style={{position: "relative"}}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable" >
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} >
                                    {compulsory.map((item, index) => (
                                        <Draggable key={item.value} draggableId={item.value} index={index}>
                                            {(provided, snapshot) => (
                                                <div ref={provided.innerRef} className="checklist-add-container__compulsory-item"
                                                snapshot={snapshot}
                                                {...provided.draggableProps}
                                                >
                                                    <div className="checklist-add-container__compulsory-item-container">
                                                        <img {...provided.dragHandleProps} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAl0lEQVRIie2UOw4CMQxExwhRTw6XcuEWQLVIcJQtcznXSMg0S6q4QS74+JWTp0ykSAP8G+Id1Fp3pZQbgAmAmdmiqnNr7R7hb71iklcAx/5CkRNJADhH+BuvWET2g+wQ5bvFAGyQPaJ8t9jMlkE8yt7y3T9W1ZkkRGR6Xayqlyg/+X1yuTq5XCu5XMnnk8vVyeVayeX6Pp4gi8bEgLk5bgAAAABJRU5ErkJggg==" />
                                                        <input className='checklist-add-container__compulsory-item-checkbox' type="checkbox" value={item.isChecked} checked={item.isChecked} onChange={e => handleCheckedCompulsoryItem(item, e.target.checked)} />
                                                        <div>{item.value}</div>
                                                    </div>
                                                    <button onClick={() => handleDeleteCompulsoryItem(item)} disabled={item.isChecked} className="checklist-add-container__compulsory-item-delete">
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </div>
        <div className="task-management-footer-btn">
            <Button variant="light" onClick={() => setOnModal(false)} >{t('cancel')}</Button>
            <Button variant="warning" className='task-management-footer-btn__update' disabled={(listName.trim().length === 0 || compulsory.length === 0) && true} onClick={() => handleUpdate()}>{t('update')}</Button>
        </div>
    </div>
  )
}

export default UpdateCheckList