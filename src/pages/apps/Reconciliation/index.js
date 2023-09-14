import React, { useState, useEffect } from 'react';
import Table from './Table';
import { useHistory } from 'react-router-dom';
import { FetchApiPost } from '../../../utils/http.helper';

const ReconciliationIndex = () => {
    const history = useHistory();
    const [tableData, setTableData] = useState([]);

    return (
        <div className="company-type">
            <Table tableData={tableData} setTableData={setTableData} />
        </div>
    );
};

export default ReconciliationIndex;
