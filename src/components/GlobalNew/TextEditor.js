import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/scss/custom/GlobalNew/textEditor.scss';
import EditorToolbar, { modules, formats, modules2 } from './EditorToolbar';

const TextEditor = ({
    value,
    setValue,
    disabled = false,
    label = '',
    isStar = false,
    toolbar_uniq_label = 'toolbar_uniq_label',
    placeholder,
    isLabelShow = true,
    className,
    isShowSave,
    handleCloseBtn,
    handleSaveBtn,
    quillRef
}) => {
    const { t } = useTranslation();

    return (
        <div className={`global-rich-text-editor ${disabled && 'global-rich-text-editor-disabled'} ${className}`}>
            {isLabelShow && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label className="label-text-field">{t(label)}</label>
                    {isStar && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
                </div>
            )}

            {
                // !disabled &&
                <EditorToolbar
                    toolbar_uniq_label={toolbar_uniq_label}
                    isShowSave={isShowSave}
                    handleCloseBtn={handleCloseBtn}
                    handleSaveBtn={handleSaveBtn}
                />
            }

            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules2(toolbar_uniq_label)}
                formats={formats}
                readOnly={disabled}
                placeholder={placeholder && placeholder}
                ref={quillRef}
            />
        </div>
    );
};

export default React.memo(TextEditor);
