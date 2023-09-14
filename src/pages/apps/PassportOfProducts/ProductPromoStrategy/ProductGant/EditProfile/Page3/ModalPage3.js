import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { DroppableList, DroppableWeekData } from './DragElements';

const ModalPage3 = ({ weekData, setWeekData, page3tableData, setPage3TableData }) => {
    const handleDragEnd = (result) => {
        const { draggableId, destination, source } = result;
        if (!destination) return;
        const itemsCopy = [...weekData];
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        const [removed] = itemsCopy.splice(sourceIndex, 1);
        itemsCopy.splice(destinationIndex, 0, removed);

        const updatedItems = itemsCopy.map((item) => {
            if (item.id === removed.id) {
                return { ...item, name: weekData[destinationIndex].name, id: weekData[destinationIndex].id };
            }
            if (item.id === weekData[destinationIndex].id) {
                return { ...item, name: removed.name, id: removed.id };
            }
            return item;
        });
        setWeekData(updatedItems);
    };
    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                {page3tableData.map((item, index) => (
                    <DroppableList key={item.id} item={item} />
                ))}
                <hr style={{ margin: '32px 0' }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {weekData.map((x, index) => (
                        <DroppableWeekData key={x.id} x={x} index={index} />
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default ModalPage3;
