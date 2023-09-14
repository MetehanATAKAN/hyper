import React, { useState } from 'react'
import TableAccordion from '../../../../../components/Tables/TableAccordion'
import { Button } from '../../../../../components/FormElements/Button'
import NewSubProcessAddModal from './NewSubProcessAddModal';

const Table = ({
    columns,
    data,
    setData,
    header
}) => {

    /**modal show */
    const [show, setShow] = useState(false);

    return (
        <>
            <div className='new-sub-process-table-header'>
                <span className='required'>*</span>
                {header}
                <Button
                type="primary" 
                className='new-sub-process-table-add-button'
                onClick={()=>setShow(true)}
                >
                    + <span>add</span>
                </Button>
            </div>
            <TableAccordion
                columns={columns}
                data={data}
                isBulkButtons={false}
                isCheckBox={false}
                enableExpanding={false}
                isFilter={false}
                isTopToolbarShow={false}
                isShowNewBtn={true}
            />
            {
                show && (
                    <NewSubProcessAddModal
                        show={show}
                        setShow={setShow}
                        modalHeder={header}
                        setData={setData}
                        data={data}
                        header={header}
                    />
                )
            }
        </>
    )
}

export default Table