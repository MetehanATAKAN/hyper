import React from 'react'
import Delete from '../../../../components/TableActionsModals/Delete'

const DeleteBank = ({
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
            messages='Are you sure you want to delete?'
            obj={`'${data.name}'`}
            deleteFunction={deleteFunction}
            onHide={() => setShow(false)}
        />
        }
        </>
    )
}

export default DeleteBank