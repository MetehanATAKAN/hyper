import { mdiCheck, mdiDeleteSweepOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Spin } from 'antd';
import React from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { MultipleSelects, SingleSelects } from '../../../../../components/GlobalNew/Selects';

const Filter = (props) => {
    const {
        loaderFilter,
        selectType,
        setSelectType,
        optionsType,
        selectBrand,
        setSelectBrand,
        optionsBrand,
        setSelectName,
        setSelectLanguage,
        setSelectStatus,
        selectName,
        optionsName,
        selectLanguage,
        optionsLanguage,
        selectStatus,
        optionsStatus,
        applyFilter,
        clearFilter,
    } = props;
    const { t } = useTranslation();
    return (
        <Spin spinning={loaderFilter} size="small">
            <Row
                style={{
                    display: 'flex',
                    columnGap: '8px',
                    border: '1px solid #dee2e6',
                }}
                className="py-2 px-4 template-filters ">
                <SingleSelects
                    className="filter-radius"
                    labelClassName="label-filter"
                    size="small"
                    label="type"
                    selectedItems={selectType}
                    setSelectedItems={setSelectType}
                    options={optionsType}
                    width="160px"
                />
                <MultipleSelects
                    className="filter-radius"
                    labelClassName="label-filter"
                    size="small"
                    label="brand"
                    selectedItems={selectBrand}
                    setSelectedItems={setSelectBrand}
                    options={optionsBrand}
                    width="160px"
                    allClear={() => {
                        setSelectBrand([]);
                        setSelectName([]);
                        setSelectLanguage([]);
                        setSelectStatus([]);
                    }}
                />
                <MultipleSelects
                    className="filter-radius"
                    labelClassName="label-filter"
                    size="small"
                    label="name"
                    selectedItems={selectName}
                    setSelectedItems={setSelectName}
                    options={optionsName}
                    allClear={() => {
                        setSelectName([]);
                        setSelectLanguage([]);
                        setSelectStatus([]);
                    }}
                    width="160px"
                />
                <MultipleSelects
                    className="filter-radius"
                    labelClassName="label-filter"
                    size="small"
                    label="language"
                    selectedItems={selectLanguage}
                    setSelectedItems={setSelectLanguage}
                    options={optionsLanguage}
                    width="160px"
                />
                <MultipleSelects
                    className="filter-radius"
                    labelClassName="label-filter"
                    size="small"
                    label="status"
                    selectedItems={selectStatus}
                    setSelectedItems={setSelectStatus}
                    options={optionsStatus}
                    width="160px"
                />
                <div className="filter-select-buttons pb-1">
                    <Icon
                        onClick={applyFilter}
                        className="filter-button-icons"
                        path={mdiCheck}
                        size={1}
                        color={'#0ACF97'}
                    />
                    <Icon
                        path={mdiDeleteSweepOutline}
                        onClick={clearFilter}
                        className="filter-button-icons"
                        size={1}
                        color={'#FA5C7C'}
                    />
                </div>
            </Row>
        </Spin>
    );
};

export default React.memo(Filter);
