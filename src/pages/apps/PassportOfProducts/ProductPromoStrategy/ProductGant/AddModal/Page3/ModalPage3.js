import React, { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { DroppableList, DroppableWeekData } from './DragElements';

const ModalPage3 = ({ weekData, setWeekData, page3tableData, setPage3TableData }) => {
    const color = ['107, 94, 174', '126, 59, 138', '255, 21, 138', '255, 90, 196'];
    useEffect(() => {
        const arr = page3tableData.map((x, i) => {
            const profile = x.profiles.map((y) => {
                return { ...y, color: color[i] };
            });
            return { ...x, profiles: profile };
        });
        setPage3TableData(arr);
    }, []);

    const handleDragEnd = (result) => {
        const { draggableId, destination, source } = result;
        if (!destination) return;
        const group = source.droppableId.split('-');
        const destList = destination.droppableId.split('-')[0];
        if (destList === 'list') return;
        if (group[0] === 'list') {
            const items = Array.from(page3tableData);
            const sourceGroup = items.find((x) => x.id === group[1]);
            const sourceItem = sourceGroup.profiles.find((x) => x.id === draggableId);
            const isEmptyDest = weekData[destination.index].box === null ? false : true;
            if (isEmptyDest === true) return;
            sourceGroup.profiles.splice(source.index, 1);
            const newWeekData = weekData?.map((x, i) => {
                if (i === destination.index && x.box === null) {
                    return { ...x, box: sourceItem, profileId: sourceGroup.id, profileName: sourceGroup.name };
                }
                return x;
            });
            setWeekData(newWeekData);
            setPage3TableData(items);
        }
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
