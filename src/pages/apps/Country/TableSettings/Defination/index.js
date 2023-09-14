import React, { useState } from 'react'
import Table from './Table'

const Defination = () => {

    const [optionsDefinationsName, setOptionsDefinationsName] = useState([]);
    const [optionsAbb, setOptionsAbb] = useState([]);

    return (
        <>
            <Table
                optionsDefinationsName={optionsDefinationsName}
                setOptionsDefinationsName={setOptionsDefinationsName}
                optionsAbb={optionsAbb}
                setOptionsAbb={setOptionsAbb}
            />
        </>
    )
}

export default Defination