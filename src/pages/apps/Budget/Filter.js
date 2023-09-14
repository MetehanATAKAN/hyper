import Icon from '@mdi/react';
import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { mdiCheck, mdiClose, mdiDeleteSweepOutline } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import { MultipleSelects, SingleSelects } from '../../../components/GlobalNew/Selects';

const FilterSelect = ({ value, options, setValue, placeholder, key, disabled, label }) => {
    const { t } = useTranslation();
    return (
        <div>
            <MultipleSelects
                key={key}
                label={label}
                selectedItems={value}
                setSelectedItems={setValue}
                options={options}
                disabled={disabled}
                className="filter-radius"
                labelClassName="label-filter"
                width={'100%'}
            />
        </div>
    );
};
const Filter = (props) => {
    const { filterComponentsData, applyBudgetFilter, compareSwitch, setCompareSwitch, clearFilter, setCloseFilter } =
        props;
    const { t } = useTranslation();
    return (
        <>
            <Row className="mt-2 mb-2 budget-filter">
                <Col className="d-flex flex-wrap" style={{ rowGap: '.5rem', alignItems: 'center' }}>
                    <span className="budget-switch" onClick={() => setCompareSwitch(!compareSwitch)}>
                        <span style={{ marginRight: '8px' }}>{t('compare')}</span>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            checked={compareSwitch}
                            onChange={() => setCompareSwitch(!compareSwitch)}
                        />
                    </span>
                    {filterComponentsData.map((item, key) => (
                        <>
                            {' '}
                            {key !== 0 && (
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
                            )}
                            {key === 0 && (
                                <>
                                    <SingleSelects
                                        isStar
                                        label="currency"
                                        selectedItems={item.state}
                                        setSelectedItems={item.setState}
                                        options={item.options?.map((el) => ({
                                            id: el.id,
                                            value: el.title,
                                            label: el.title,
                                        }))}
                                        width="100%"
                                    />
                                    <div
                                        style={{
                                            borderLeft: '1px solid #DEE2E6',
                                            height: '26px',
                                            marginRight: '3px',
                                        }}></div>
                                </>
                            )}
                        </>
                    ))}
                </Col>
                {/* <div className="filter-select-buttons">
                    <Icon
                        className="page-list-icons"
                        onClick={() => {
                            applyBudgetFilter();
                            setCloseFilter(true);
                        }}
                        path={mdiCheck}
                        size={1}
                        color={'#0ACF97'}
                    />
                    <Icon
                        path={mdiDeleteSweepOutline}
                        onClick={clearFilter}
                        className="page-list-icons"
                        size={1}
                        color={'#FA5C7C'}
                    />
                    <Icon
                        path={mdiClose}
                        onClick={() => setCloseFilter(true)}
                        size={1}
                        color={'#6C757D'}
                        className="page-list-icons"
                    />
                </div> */}
            </Row>
        </>
    );
};

export default React.memo(Filter);
