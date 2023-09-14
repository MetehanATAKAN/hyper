import { mdiCheck, mdiDeleteSweepOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Button, Divider, Spin } from 'antd';
import React from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects';

const Filter = (props) => {
    const {
        selectType,
        setSelectType,
        selectBrand,
        setSelectBrand,
        setSelectName,
        setSelectLanguage,
        setSelectStatus,
        selectName,
        selectLanguage,
        optionsLanguage,
        selectStatus,
        optionsStatus,
        applyFilter,
        clearFilter,
        ids,
        name,
    } = props;
    const { t } = useTranslation();
    return (
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
                options={[]}
                width="160px"
                disabled
            />
            <MultipleSelects
                className="filter-radius"
                labelClassName="label-filter"
                size="small"
                label="brand"
                selectedItems={selectBrand}
                setSelectedItems={setSelectBrand}
                options={[]}
                width="160px"
                disabled
            />
            <MultipleSelects
                className="filter-radius"
                labelClassName="label-filter"
                size="small"
                label="name"
                maxTagTextLength={45}
                selectedItems={selectName}
                setSelectedItems={setSelectName}
                options={[]}
                width="300px"
                disabled
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
            </div>
            {name !== 'MechanismPage' && (
                <Link
                    to={`/apps/templates/connect=${ids}&product=${name}&sub=false`}
                    style={{
                        backgroundColor: '#00a0df',
                        padding: '1px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 'auto',
                        height: '32px',
                        marginTop: '10px',
                        color: '#fff',
                    }}>
                    <span style={{ paddingBottom: '4px' }}>{t('new')}</span>
                    <i style={{ fontSize: '12px' }} className="ms-1 fas fa-plus" />
                </Link>
            )}
        </Row>
    );
};

export default React.memo(Filter);
