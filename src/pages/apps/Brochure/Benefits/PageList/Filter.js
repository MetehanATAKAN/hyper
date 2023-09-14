import Icon from '@mdi/react';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { mdiCheck, mdiClose, mdiDeleteSweepOutline } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import { MultiSelect } from 'react-multi-select-component';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { MultiSelectReact } from '../../../../forms/Basic';

const FilterSelect = ({ value, options, setValue, placeholder, key }) => {
    const { t } = useTranslation();
    return (
        <div className="filter-table-select">
            <MultiSelect
                key={key}
                value={value}
                options={options}
                onChange={(e) => setValue(e.map((x) => x))}
                overrideStrings={{
                    allItemsAreSelected: t(`All ${placeholder} are selected.`),
                    noOptions: t('No options'),
                    search: t('Search'),
                    selectAll: t('Select All'),
                    selectSomeItems: t(placeholder),
                }}
            />
        </div>
    );
};
const { RangePicker } = DatePicker;

const Filter = (props) => {
    const { filterComponentsData, onChangeDate, applyFilter, clearFilters } = props;

    console.log(filterComponentsData);
    return (
        <>
            <Row className='page-filters  mt-2 mb-2'>

                <Col xs={8} sm={9} md={10} className='d-flex flex-wrap multi-select-auto'>
                    {
                        filterComponentsData.map((data, key) => (
                            <>
                                {
                                    data.placeHolder !== 'Create Date' && (
                                        <MultiSelectReact
                                            key={key}
                                            options={data.options}
                                            change={(e) => data.change(data.placeHolder,e)}
                                            value={data.value}
                                            placeholder={data.placeHolder}
                                        />
                                    )
                                }
                                {
                                    data.placeHolder === 'Create Date' && (
                                        <RangePicker
                                            style={{
                                                borderRadius: '15px',
                                                maxWidth: '13.5rem',
                                                width: '100%',
                                                height: '26px',
                                                margin: '0 8px 26px 0',
                                                borderColor: '#aaa',
                                            }}
                                            onChange={onChangeDate}
                                            format="DD/MM/YYYY"
                                            separator={
                                                <i
                                                    style={{ color: '#c7c7c7', paddingTop: '3px' }}
                                                    className="fas fa-arrow-right"></i>
                                            }
                                        />
                                    )
                                }
                            </>
                        ))
                    }
                </Col>
                <Col xs={4} sm={3} md={2} className='buttons'>
                    <button onClick={applyFilter}>
                    <Icon
                        path={mdiCheck}
                        size={1}
                        color={'#0ACF97'}
                        
                    />
                    </button>
                    
                    <button onClick={clearFilters}>
                    <Icon
                        path={mdiDeleteSweepOutline}
                        size={1}
                        color={'#FA5C7C'}
                    />
                    </button>

                    <button>
                    <Icon path={mdiClose} size={1} color={'#6C757D'} />
                    </button>
                    
                    
                    
                </Col>
            </Row>
        </>
    );
};

export default Filter;
