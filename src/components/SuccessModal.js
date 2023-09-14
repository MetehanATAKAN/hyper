import React from 'react'
import Swal from 'sweetalert2'

const SuccessModal = () => {
    const successModal=()=>{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })
    }
  return (
    <div>
        {()=>successModal()}
    </div>
  )
}

export default SuccessModal