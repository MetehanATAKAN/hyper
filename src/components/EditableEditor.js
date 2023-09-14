import React from 'react';
import { useState } from 'react';
import TextEditor from './GlobalNew/TextEditor';

const EditableEditor = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState('');
    function handleDoubleClick() {
        setIsEditing(true);
    }
    const handleCloseBtn = () => {
        setIsEditing(false);
    };
    const handleSaveBtn = () => {
        alert('save');
    };
    // function handleChange(event) {
    //     setAllData((prev) =>
    //         prev.map((item) => {
    //             if (item.id === data.id) {
    //                 return { ...item, [objName]: event.target.value };
    //             }
    //             return item;
    //         })
    //     );
    // }
    return (
        <>
            {isEditing ? (
                <TextEditor
                    value={content}
                    setValue={setContent}
                    isStar={true}
                    isLabelShow={false}
                    className="page-editor-container"
                    isShowSave
                    handleCloseBtn={handleCloseBtn}
                    handleSaveBtn={handleSaveBtn}
                />
            ) : (
                <span onDoubleClick={handleDoubleClick}>Content Test</span>
            )}
        </>
    );
};

export default React.memo(EditableEditor);
