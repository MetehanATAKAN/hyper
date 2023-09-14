import Icon from '@mdi/react';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { mdiCheck, mdiClose, mdiDeleteSweepOutline } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import { MultiSelect } from 'react-multi-select-component';
import 'antd/dist/antd.css';

const FilterSelect = ({ value, options, setValue, placeholder, key, disabled }) => {
    const { t } = useTranslation();
    return (
        <div className="filter-table-select">
            <MultiSelect
                key={key}
                value={value}
                disabled={disabled}
                options={options}
                onChange={(e) => setValue(e.map((x) => x))}
                overrideStrings={{
                    allItemsAreSelected: t(`All selected.`),
                    noOptions: t('No options'),
                    search: t('Search'),
                    selectAll: t('Select All'),
                    selectSomeItems: t(placeholder),
                }}
            />
        </div>
    );
};

const Filter = ({ filterComponentsData, setCloseFilter, deleteFilter, applyFilter }) => {
  return (
    <>
            <Row className="mt-2 mb-2 budget-filter" >
                <Col className="d-flex" style={{ rowGap: '.5rem', alignItems: 'center' }}>
                    {filterComponentsData.map((item, key) => (
                        <>
                            {
                                <FilterSelect
                                    key={key}
                                    value={item.state}
                                    placeholder={item.label}
                                    options={item.options?.map((el) => ({
                                        id: el.id,
                                        value: el.title,
                                        label: el.title,
                                    }))}
                                    setValue={item.setState}
                                />
                            }
                        </>
                    ))}
                </Col>
                <Col className="filter-select-buttons">
                    <Icon
                        className="page-list-icons"
                        onClick={applyFilter}
                        path={mdiCheck}
                        size={1}
                        color={'#0ACF97'}
                    />
                    <Icon
                        path={mdiDeleteSweepOutline}
                        onClick={deleteFilter}
                        className="page-list-icons"
                        size={1}
                        color={'#FA5C7C'}
                    />
                    <Icon path={mdiClose} size={1} color={'#6C757D'} className="page-list-icons" onClick={() => setCloseFilter(true)} />
                    
                </Col>
            </Row>
        </>
  )
}

export default Filter