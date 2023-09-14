import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Dropdown, Input, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

export const AutoCompleteInput = ({
    value,
    setValue,
    options,
    label,
    labelStyle,
    width = 200,
    status = 'default',
    placeholder = 'Input...',
    disabled = false,
    isStar = false,
    size = 'middle',
    className,
    isContentValid = false,
    isContentWarning = false,
    isContentWarningMessages,
    abb = false,
    abbWarningMessages,
    isAbbWarning = false,
    editObjectName = null,
    isAddInputs = false,
    obj,
    addInputsArr,
    onChangeControl,
}) => {
    const { t } = useTranslation();

    const [warning, setwarning] = useState(isContentWarning);
    const [abbWarning, setAbbWarning] = useState(isAbbWarning);

    const [inputValue, setInputValue] = useState(value);

    const [keyDown, setKeyDown] = useState(null);

    const onChange = (value, object) => {
        if (isAddInputs) {
        } else {
            if (abb) {
                const data = value.toUpperCase().trim();
                const valueLength = data.length;
                const obj = options?.filter((el) => el.label === data);

                if (keyDown !== 32) {
                    if (isContentValid === false) {
                        if (valueLength > 4) {
                            setAbbWarning(true);
                            setValue('');
                            setInputValue('');
                        } else {
                            setValue(data);
                            setInputValue(data);
                        }
                    } else {
                        if (valueLength > 4) {
                            setAbbWarning(true);
                            setValue('');
                            setInputValue('');
                        } else {
                            setAbbWarning(false);
                            if (editObjectName === null) {
                                if (obj.length !== 0) {
                                    setValue(data);
                                    setInputValue(data);
                                    setwarning(true);
                                } else {
                                    setValue(data);
                                    setInputValue(data);
                                    setwarning(false);
                                }
                            } else {
                                if (obj[0]?.label === editObjectName) {
                                    setValue(data);
                                    setInputValue(data);
                                    setwarning(false);
                                } else {
                                    if (obj.length !== 0) {
                                        setValue(data);
                                        setInputValue(data);
                                        setwarning(true);
                                    } else {
                                        setValue(data);
                                        setInputValue(data);
                                        setwarning(false);
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                const data = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                const obj = options?.filter((el) => el.label === data);
                if (isContentValid === false) {
                    setValue(data);
                    setInputValue(data);
                } else {
                    if (editObjectName === null) {
                        console.log('ifte');
                        if (obj.length !== 0) {
                            setValue(data);
                            setInputValue(data);
                            setwarning(true);
                        } else {
                            setValue(data);
                            setInputValue(data);
                            setwarning(false);
                        }
                    } else {
                        console.log('else de');
                        if (obj[0]?.label === editObjectName) {
                            setValue(data);
                            setInputValue(data);
                            setwarning(false);
                        } else {
                            if (obj.length !== 0) {
                                setValue(data);
                                setInputValue(data);
                                setwarning(true);
                            } else {
                                setValue(data);
                                setInputValue(data);
                                setwarning(false);
                            }
                        }
                    }
                }
            }
        }
    };

    const onSelect = (data, obj) => {
        setValue(obj.label);
    };
    return (
        <div style={{ width: width }}>
            <div>
                <label className="label-text-field" style={labelStyle}>
                    {t(label)}
                </label>
                {isStar && <span style={{ color: '#fa5c7c', marginLeft: '4px' }}>*</span>}
            </div>
            <AutoComplete
                options={value !== '' && options}
                style={{ width: '100%' }}
                value={inputValue}
                setValue={setInputValue}
                className={`new-dropdown-select ${className}`}
                size={size}
                dropdownStyle={{ zIndex: 2000 }}
                status={status}
                disabled={disabled}
                onChange={onChange}
                onKeyDown={(e) => setKeyDown(e.keyCode)}
                onSelect={onSelect}
                placeholder={t(placeholder)}
                filterOption={(inputValue, option) =>
                    option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                notFoundContent={null}
            />
            {warning && <span style={{ color: '#fa5c7c' }}>{t(isContentWarningMessages)}</span>}
            {abbWarning && <span style={{ color: '#fa5c7c' }}>{t(abbWarningMessages)}</span>}
        </div>
    );
};
const exceptThisSymbols = ['e', 'E', '+', '-', '.', ',', '*', '/', ' '];
export const NewInput = ({
    value,
    setValue,
    label,
    labelStyle,
    width = 200,
    status = 'default',
    dropDownStatus = 'default',
    placeholder = 'Input...',
    disabled = false,
    type = 'text',
    isButton = false,
    btnTooltip = 'Tooltip',
    btnClick,
    btnIcon,
    isStar = false,
    isDropDown = false,
    dropDownItems,
    dropDownSetValue,
    isKeyDown = null,
    exceptThisSymbols = [],
    isUpperCase = false,
    handleChange,
    suffixIcon,
    isSpecialLabel = false,
    specialLabelIcon,
    specialLabelButton = false,
    specialLabelButtonFunc,
    maxLength,
    isSearch = false,
    listName,
}) => {
    const { t } = useTranslation();

    const onChange = (e) => {
        const inp = e.target.value;
        if (isUpperCase) {
            setValue(inp.charAt(0).toUpperCase() + inp.slice(1).toLowerCase());
        } else {
            setValue(e.target.value);
        }
    };
    const [items, setItems] = useState([
        { label: 'item 1', key: 'item-1' }, // remember to pass the key prop
        { label: 'item 2', key: 'item-2' },
    ]);
    const handleMenuClick = (e) => {
        dropDownSetValue(e.key);
    };
    useEffect(() => {
        setItems(dropDownItems);
    }, [dropDownItems]);
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <div style={{ width: width }}>
            {isSpecialLabel === false ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label className="label-text-field" style={labelStyle}>
                        {t(label)}
                    </label>
                    {isStar && <span style={{ color: '#FF0000', marginLeft: '4px' }}>*</span>}
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label className="label-text-field" style={labelStyle}>
                            {t(label)}
                        </label>
                        {isStar && <span style={{ color: '#FF0000' }}>*</span>}
                    </div>
                    <button
                        style={{ border: 'none', background: 'transparent', padding: '0px' }}
                        onClick={() => (specialLabelButton ? specialLabelButtonFunc() : {})}>
                        {specialLabelIcon}
                    </button>
                </div>
            )}

            <Input.Group>
                <Input
                    value={value}
                    style={{
                        width:
                            isButton === false
                                ? isDropDown === false
                                    ? '100%'
                                    : 'calc(100% - 35px)'
                                : 'calc(100% - 35px)',
                    }}
                    className="new-dropdown-select"
                    size="middle"
                    type={type}
                    status={status}
                    // onChange={onChange}
                    onChange={(e) => (handleChange ? handleChange(e.target.value) : onChange(e))}
                    disabled={disabled}
                    placeholder={t(placeholder)}
                    onKeyDown={(e) =>
                        isKeyDown !== null ? exceptThisSymbols.includes(e.key) && e.preventDefault() : null
                    }
                    onWheel={(event) => event.currentTarget.blur()}
                    suffix={suffixIcon && suffixIcon}
                    maxLength={maxLength}
                    list={listName}
                />
                {isButton && (
                    <Tooltip title={btnTooltip}>
                        <Button style={{ maxWidth: '35px' }} disabled={disabled} icon={btnIcon} onClick={btnClick} />
                    </Tooltip>
                )}
                {isDropDown && (
                    <Tooltip title={btnTooltip}>
                        <Dropdown.Button
                            danger={dropDownStatus === 'error' && 'danger'}
                            trigger="click"
                            menu={menuProps}
                            onClick={(e) => console.log(e)}
                            placement="bottom"
                            style={{ maxWidth: '35px' }}
                            overlayStyle={{ zIndex: '9999999999' }}
                            disabled={disabled}
                            icon={btnIcon}
                        />
                    </Tooltip>
                )}
            </Input.Group>
        </div>
    );
};
export const NewTextArea = ({
    value,
    setValue,
    label,
    labelStyle,
    isStar,
    width = '100%',
    status = 'default',
    placeholder = 'text area',
    disabled = false,
}) => {
    const { t } = useTranslation();
    return (
        <div style={{ width: width }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label className="label-text-field" style={labelStyle}>
                    {t(label)}
                </label>
                {isStar && <span style={{ color: 'red' }}>*</span>}
            </div>
            <TextArea
                className="new-dropdown-select"
                value={value}
                status={status}
                style={{ width: '100%' }}
                onChange={(e) => setValue(e.target.value)}
                placeholder={t(placeholder)}
                autoSize={{ minRows: 2 }}
                disabled={disabled}
            />
        </div>
    );
};
