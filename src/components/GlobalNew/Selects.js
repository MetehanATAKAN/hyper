import React from 'react';
import { Button, Divider, Select, Space } from 'antd';
import 'antd/dist/antd.css';
import { useTranslation } from 'react-i18next';
export const MultipleSelects = ({
    selectedItems,
    setSelectedItems,
    width = 200,
    options,
    placeholder = 'Select...',
    status = 'default',
    disabled = false,
    label,
    labelStyle,
    isStar = false,
    className,
    size = 'middle',
    isIcon = false,
    icon,
    handleChange,
    headerName,
    isMaxSelect = false,
    maxSelectItem = 3,
    allSelect,
    allClear,
    clearIcon,
    maxTagTextLength = 12,
    labelClassName,
}) => {
    const { t } = useTranslation();
    const selectAll = (e) => {
        e.preventDefault();
        setSelectedItems(options);
        allSelect && allSelect();
    };
    const onSelect = (value, label) => {
        if (isMaxSelect === true) {
            if (selectedItems.length < maxSelectItem) {
                if (selectedItems) {
                    setSelectedItems((prev) => [...prev, label]);
                }
                if (!selectedItems) {
                    setSelectedItems([label]);
                }
            }
        }
        if (isMaxSelect === false) {
            if (selectedItems) {
                setSelectedItems((prev) => [...prev, label]);
            }
            if (!selectedItems) {
                setSelectedItems([label]);
            }
        }
    };
    const onDeselect = (value) => {
        const arr = selectedItems?.filter((x) => Number(x.value) !== Number(value));
        setSelectedItems(arr);
    };
    const onClear = () => {
        setSelectedItems([]);
        allClear && allClear();
    };
    // If the selected data is not desired to appear in the options
    // let difference = options.filter(function (obj1) {
    //     let match = selectedItems.find(function (obj2) {
    //         return obj1.value === obj2.value;
    //     });
    //     return !match;
    // });

    return (
        <div direction="vertical" style={{ width: width }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label className={`label-text-field ${labelClassName}`} style={labelStyle}>
                    {t(label)}
                </label>
                {isStar && <span style={{ color: '#fa5c7c', marginLeft: '4px' }}>*</span>}
                {isIcon && icon}
            </div>
            <Select
                className={`new-dropdown-select ${className}`}
                placeholder={t(placeholder)}
                value={selectedItems}
                size={size}
                dropdownStyle={{ zIndex: 99999999999, fontFamily: 'Roboto' }}
                style={{ width: '100%' }}
                status={status}
                disabled={disabled}
                showSearch
                optionFilterProp="label"
                filterOption={true}
                clearIcon={clearIcon}
                mode="multiple"
                maxTagCount="responsive"
                maxTagTextLength={maxTagTextLength}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onClear={onClear}
                onDeselect={onDeselect}
                onSelect={onSelect}
                onChange={(value, label) => handleChange && handleChange(value, label, headerName)}
                options={options?.map((item, i) => ({
                    value: item.value,
                    label: item.label,
                }))}
                dropdownMatchSelectWidth={210}
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Divider
                            style={{
                                margin: '4px 0',
                            }}
                        />
                        <Space
                            style={{
                                padding: '0 8px 4px',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            {isMaxSelect === false && (
                                <Button size="small" type="text" onMouseDown={selectAll}>
                                    {t('Select All')}
                                </Button>
                            )}
                            <Button size="small" type="text" style={{ color: '#FA5C7C' }} onMouseDown={onClear}>
                                {t('Clear All')}
                            </Button>
                        </Space>
                    </>
                )}
            />
        </div>
    );
};

export const SingleSelects = ({
    selectedItems,
    setSelectedItems,
    width = 200,
    options,
    placeholder = 'Select...',
    status = 'default',
    disabled = false,
    label,
    labelStyle,
    isStar = false,
    className,
    size = 'middle',
    isIcon = false,
    icon,
    handleChange,
    headerName,
    isSortable = true,
    allClear,
    clearIcon = true,
    labelClassName,
    isLabel=true
}) => {
    const { t } = useTranslation();

    const onSelect = (value, label) => {
        setSelectedItems(label);

        if (handleChange) {
            handleChange(value, label, headerName);
        }
    };

    const onClear = () => {
        setSelectedItems('');
        allClear && allClear();
    };
    return (
        <div direction="vertical" style={{ width: width }} className="single-selects">
            {
                label && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {isStar && <span style={{ color: '#c53434', marginRight: '4px' }}>*</span>}
                        <label className={`label-text-field ${labelClassName}`} style={labelStyle}>
                            {t(label)}
                        </label>
                        {isIcon && icon}
                    </div>
                )
            }
            <Select
                value={selectedItems}
                className={`new-dropdown-select ${className}`}
                placeholder={t(placeholder)}
                size={size}
                dropdownStyle={{ zIndex: 99999999999 }}
                style={{ width: '100%' }}
                allowClear={clearIcon}
                onClear={onClear}
                clearIcon={<i onClick={() => setSelectedItems(undefined)} className="fas fa-times-circle"></i>}
                status={status}
                disabled={disabled}
                showSearch
                optionFilterProp="label"
                mode="single"
                filterSort={(optionA, optionB) =>
                    isSortable &&
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={(value, label) => handleChange && handleChange(value, label, headerName)}
                onSelect={onSelect}
                options={options?.map((item, i) => item)}
                notFoundContent={null}
            />
        </div>
    );
};
