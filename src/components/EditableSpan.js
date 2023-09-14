import { Input } from 'antd';
import React from 'react';
import { useState } from 'react';

const EditableSpan = ({ data, setAllData, objName }) => {
    const [isEditing, setIsEditing] = useState(false);

    function handleDoubleClick() {
        setIsEditing(true);
    }

    function handleBlur() {
        setIsEditing(false);
    }
    function handleChange(event) {
        setAllData((prev) =>
            prev.map((item) => {
                if (item.id === data.id) {
                    return { ...item, [objName]: event.target.value };
                }
                return item;
            })
        );
    }
    return (
        <div>
            {isEditing ? (
                <Input
                    value={data.needName}
                    type="text"
                    name={data.needName}
                    size="small"
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
            ) : (
                <span style={{ color: '#FFBC00' }} onDoubleClick={handleDoubleClick}>
                    {data.needName}
                </span>
            )}
        </div>
    );
};

export default EditableSpan;
