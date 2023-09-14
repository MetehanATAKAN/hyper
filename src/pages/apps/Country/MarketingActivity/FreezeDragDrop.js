import React, { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


const FreezeDragDrop = ({ freezeRef,freezeColumn, setLeftColumns,leftColumns,columnsFreeze,setColumnsFreeze,setHiddenFreeze,freeze }) => {
 
  console.log(columnsFreeze);
  console.log(leftColumns);
  console.log(freezeColumn);
  const onDragEnd = (result, columns, setColumns) => {

 
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumnsFreeze({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });

      // Freeze Colum Name and Column Items 
      if (sourceColumn.name === 'To do' || destColumn.name === 'To do') {
        let column = sourceColumn.name === 'To do' ? sourceItems : destItems;
        setLeftColumns(
          column.map(item => (
            item.columnName
          ))
        )
      }
    }

    else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };
  
  
  
  const freezeGroupColumnDelete =  (itemName,item)=> {

    let mainColumn={};
    let dropColumns={};

    Object.entries(columnsFreeze).map(([columnId, column], index)=>(
      columnId === '100'
      ? mainColumn=column
      : dropColumns=column
      ))
      setColumnsFreeze({...columnsFreeze,101:{...dropColumns,items:dropColumns.items.filter(item=>item.content!==itemName)},100:{...mainColumn,items:[...mainColumn.items,item]}});
  }
 
  useEffect(() => {
    Object.entries(columnsFreeze).map(([columnId, column], index)=>(
      columnId === '101'
      ?setLeftColumns(
        column.items.map((item)=>(
          item.columnName
        ))
      )
      :null
    ))
  }, [columnsFreeze, setLeftColumns])


  useEffect(() => {

    const closeSearch = e => {
       
      if(freeze === false) {
        if (!freezeRef.current.contains(e.target)) {
          setHiddenFreeze(false);
          console.log(freezeRef.current);
      }
      }
      else if(freeze === true) {
        if (!freezeRef.current.contains(e.target)) {
          setHiddenFreeze(false);
          console.log(freezeRef.current);
      }
      }
        
    }

    document.body.addEventListener('mousedown', closeSearch)

    return () => {
        document.body.removeEventListener('mousedown', closeSearch)
    }
}, [])
  
    
  return (
    <div style={{ display: "flex", height: "100%" }}  ref={freezeRef}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columnsFreeze, setColumnsFreeze)}
      >
        {Object.entries(columnsFreeze).map(([columnId, column], index) => {
          return (
            <div
              className={columnId === '100' ? 'drag-drop-freeze' : 'drag-drop-freeze2'}
              key={columnId}
            >
              <div style={leftColumns.length !==0 ?{display:'none'}: {display:'block'}} >
                {
                  columnId !== '100' && ' Columns freeze'
                }
              </div>
                <Droppable droppableId={columnId} key={columnId} direction={columnId === '100' ? 'vertical' : 'horizontal'}>
                  {(provided, snapshot) => {
                    return (
                      <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{height: '100%'}}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <>
                                      <span> {item.content}</span>
                                      {
                                        columnId === '101' &&
                                        <svg values={item.content} onClick={()=>freezeGroupColumnDelete(item.content,item)} style={{color:'rgba(0, 0, 0, 0.26)',fontSize:'22px'}} className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiChip-deleteIcon MuiChip-deleteIconMedium MuiChip-deleteIconColorDefault MuiChip-deleteIconOutlinedColorDefault css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CancelIcon"><path  d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
                                      }
                                    </>
                                  </li>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ul>
                    );
                  }}
                </Droppable>
              
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default FreezeDragDrop;
