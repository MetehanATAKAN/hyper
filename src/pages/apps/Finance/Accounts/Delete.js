import React from 'react'
import Delete from '../../../../components/TableActionsModals/Delete'

const DeleteAccount = ({
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
            messages='Are you sure you want to delete this accounts?'
            obj={`'${data.accountName}'`}
            deleteFunction={deleteFunction}
            onHide={() => setShow(false)}
        />
        }
        </>
    )
}

export default DeleteAccount