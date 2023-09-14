import React from 'react';
import { Col } from 'react-bootstrap';
import { MultiSelect } from 'react-multi-select-component';
import { useTranslation } from 'react-i18next';

const FilterSelect = ({ value, options, setValue, placeholder }) => {
    const { t } = useTranslation();
    return (
        <Col xs={6} md={4} lg={2} className="filter-select">
            <MultiSelect
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
        </Col>
    );
};

export default FilterSelect;
