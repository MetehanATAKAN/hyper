import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TableLayout from '../../../components/Tables';
import Filter from '../../../components/Filter';

const Table = (props) => {
    const { data, columns, filterComponentsData, applyBudgetFilter, loader, clearFilter } = props;
    const [closeFilter, setCloseFilter] = useState(false);
    return (
        <div id="budget-table">
            <TableLayout
                isLoading={loader}
                isNewButton={false}
                isCheckBox={false}
                data={data}
                columns={columns}
                filterShow={closeFilter}
                setFilterShow={setCloseFilter}
                handlApplyBtn={applyBudgetFilter}
                handlClearBtn={clearFilter}
                filter={<Filter filterComponentsData={filterComponentsData} setCloseFilter={setCloseFilter} />}
            />
        </div>
    );
};

export default React.memo(Table);
