import React from 'react'

const ModalHeader = ({ setShowModal }) => {
    return (
        <>
            <button className='split-close-button' onClick={() => setShowModal(false)}>
                <i className="fa-solid fa-xmark"></i>
            </button>
            <div className='split-error-modal__icon'>
                <i className="fa-solid fa-circle-exclamation"></i>
                <div>
                    WARNING
                </div>
            </div>
        </>
    )
}

export default ModalHeader