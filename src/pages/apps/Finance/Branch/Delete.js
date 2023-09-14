import React from 'react'
import Delete from '../../../../components/TableActionsModals/Delete'

const DeleteBranch = ({
    deleteFunction,
    show,
    setShow,
    data
}) => {
    
    return (
        <>
        {
            show &&
            <Delete
            show={show}
            setShow={setShow}
            messages='Are you sure you want to delete this branch?'
            obj={`'${data.branchCode === '-' ? data.name : data.branchCode}'`}
            deleteFunction={deleteFunction}
            onHide={() => setShow(false)}
        />
        }
        </>
    )
}

export default DeleteBranch