import Icon from '@mdi/react';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { mdiCheck, mdiClose, mdiDeleteSweepOutline } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import { MultiSelect } from 'react-multi-select-component';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

const FilterSelect = ({
    value,
    options,
    setValue,
    placeholder,
    key,
    setSelectProduct,
    setSelectIndication,
    setSelectProfile,
    setSelectSpecialization,
    setSelectCreator,
    setSelectStatus,
}) => {
    const { t } = useTranslation();
    const filterChange = (e) => {
        setValue(e.map((x) => x));
        switch (placeholder) {
            case 'Countries':
                setSelectProduct([]);
                setSelectIndication([]);
                setSelectProfile([]);
                setSelectSpecialization([]);
                setSelectCreator([]);
                setSelectStatus([]);
                break;
            case 'Product':
                setSelectIndication([]);
                setSelectProfile([]);
                setSelectSpecialization([]);
                setSelectCreator([]);
                setSelectStatus([]);

                break;
            case 'Indication':
                setSelectProfile([]);
                setSelectSpecialization([]);
                setSelectCreator([]);
                setSelectStatus([]);

                break;
            case 'Profile':
                setSelectSpecialization([]);
                setSelectCreator([]);
                setSelectStatus([]);
                break;
            case 'Specialization':
                setSelectCreator([]);
                setSelectStatus([]);
                break;
            case 'Creator':
                setSelectStatus([]);
                break;
            default:
                break;
        }
    };
    return (
        <div className="filter-table-select">
            <MultiSelect
                key={key}
                value={value}
                options={options}
                onChange={(e) => filterChange(e)}
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
    const {
        filterComponentsData,
        onChangeDate,
        applyFilter,
        clearFilters,
        setSelectProduct,
        setSelectIndication,
        setSelectProfile,
        setSelectSpecialization,
        setSelectCreator,
        setSelectStatus,
        showFilter,
        setShowFilter,
        setCloseFilter,
    } = props;

    return (
        <>
            <Row className="filter-table-select-container">
                {filterComponentsData.map((item, i) => (
                    <>
                        {item.label !== 'Create Date' && (
                            <FilterSelect
                                key={i}
                                value={item.state}
                                placeholder={item.label}
                                options={item.options?.map((el) => ({
                                    id: el.id,
                                    value: el.title,
                                    label: el.title,
                                }))}
                                setValue={item.setState}
                                setSelectProduct={setSelectProduct}
                                setSelectIndication={setSelectIndication}
                                setSelectProfile={setSelectProfile}
                                setSelectSpecialization={setSelectSpecialization}
                                setSelectCreator={setSelectCreator}
                                setSelectStatus={setSelectStatus}
                            />
                        )}
                        {item.label === 'Create Date' && (
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
                        )}
                    </>
                ))}
                <Col className="filter-select-buttons">
                    <Icon
                        className="page-list-icons"
                        path={mdiCheck}
                        size={1}
                        color={'#0ACF97'}
                        onClick={() => {
                            applyFilter();
                            setCloseFilter(true);
                        }}
                    />
                    <Icon
                        path={mdiDeleteSweepOutline}
                        className="page-list-icons"
                        onClick={clearFilters}
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
                </Col>
            </Row>
        </>
    );
};

export default React.memo(Filter);
