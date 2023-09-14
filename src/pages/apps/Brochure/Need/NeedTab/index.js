import React, { useState } from 'react';
import Table from './Table';

const NeedTab = ({ setSelectedTab }) => {
    const [needFilteredDatas, setNeedFilteredDatas] = useState([]);

    return (
        <div className="need-page">
            <Table
                needFilteredDatas={needFilteredDatas}
                setNeedFilteredDatas={setNeedFilteredDatas}
                setSelectedTab={setSelectedTab}
            />
        </div>
    );
};

export default NeedTab;
