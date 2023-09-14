import { Draggable, Droppable } from 'react-beautiful-dnd';

const ProfileCard = ({ name, isDragging, usage, color }) => {
    const profileName = name.split(',');
    return (
        <span
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                width: usage === 'week' ? '232px' : '264px',
                height: '36px',
                background: isDragging ? '#6C757D' : `rgb(${color})`,
                gap: 2,
            }}>
            {profileName.map((x, i) => (
                <span
                    key={i}
                    style={{
                        width: 26,
                        height: 26,
                        backgroundColor: x === 'P' ? 'rgba(250,250,250,0.2)' : 'rgba(250,250,250,0.12)',
                        borderRadius: '4px',
                        textAlign: 'center',
                        color: '#fff',
                    }}>
                    {x}
                </span>
            ))}
        </span>
    );
};
export const DraggableProfileCard = ({ profile, index, color }) => {
    return (
        <Draggable key={profile.id} draggableId={profile.id} index={index}>
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{ ...provided.draggableProps.style, position: 'static' }}>
                    <ProfileCard key={index} name={profile.name} isDragging={snapshot.isDragging} color={color} />
                </div>
            )}
        </Draggable>
    );
};

export const DroppableList = ({ item }) => {
    return (
        <Droppable droppableId={`list-${item.id}`}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {item.name}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {item.profiles.map(
                            (profile, j) =>
                                profile.orderId === null && (
                                    <DraggableProfileCard
                                        key={profile.id}
                                        profile={profile}
                                        index={j}
                                        color={profile.color}
                                    />
                                )
                        )}
                    </div>
                    <span style={{ display: 'none' }}>{provided.placeholder}</span>
                </div>
            )}
        </Droppable>
    );
};

export const DroppableWeekData = ({ x, index }) => {
    return (
        <Droppable droppableId={x.id}>
            {(provided, snapshot) => (
                <div style={{ border: '1px dashed #CED4DA', padding: '4px' }}>
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            width: '254px',
                            height: '36px',
                            backgroundColor: snapshot.isDraggingOver ? '#00A0DF' : '#EEF2F7',
                        }}>
                        <div style={{ display: 'flex' }}>
                            <span
                                style={{
                                    width: 22,
                                    height: 36,
                                    background: '#6C757D',
                                    color: '#fff',
                                    display: 'grid',
                                    placeItems: 'center',
                                    fontSize: '14px',
                                }}>
                                {index + 1}
                            </span>
                            {x.isUsed === false ? (
                                <Draggable draggableId={x.name} index={index}>
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            key={index}
                                            style={{ ...provided.draggableProps.style, position: 'static' }}>
                                            {x.box && (
                                                <ProfileCard
                                                    key={index}
                                                    name={x.box?.name}
                                                    usage="week"
                                                    color={x.box?.color}
                                                />
                                            )}
                                        </div>
                                    )}
                                </Draggable>
                            ) : (
                                <div key={index} style={{ position: 'static' }}>
                                    {x.box && (
                                        <ProfileCard key={index} name={x.box?.name} usage="week" color={x.box?.color} />
                                    )}
                                </div>
                            )}
                        </div>
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
};
