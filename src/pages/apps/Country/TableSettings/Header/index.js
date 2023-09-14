import React, { useState } from 'react'
import Table from './Table';

const Header = () => {

    const [optionsHeaderName, setOptionsHeaderName] = useState([]);
    const [optionsAbb, setOptionsAbb] = useState([]);

    return (
        <>
            <Table
                optionsHeaderName={optionsHeaderName}
                setOptionsHeaderName={setOptionsHeaderName}
                optionsAbb={optionsAbb}
                setOptionsAbb={setOptionsAbb}
            />
        </>
    )
}

export default Header