import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button,Modal, } from 'react-bootstrap'
import { clickCalendarDate } from '../../redux/actions';
import { useTranslation } from 'react-i18next';

const PastDateEventModal = ({ message }) => {
    const { t } = useTranslation();
    const dispatch=useDispatch();
    const isShowModal=useSelector((state)=>state.Calendar.dateIsShow);
    
    const [show, setShow] = useState(true);

  const handleClose = () =>{
    let element = document.querySelectorAll(".split-error-modal")
    element[0].children[0].children[0].classList.add("modal-close-animation");

    setTimeout(async () => {
      setShow(false)
      dispatch(clickCalendarDate(false))
    }, 300)
    
  } ;
  
  useEffect(() => {
      if(isShowModal === true){
        setShow(true)
      }
      else if(isShowModal === false){
        setShow(false)
      }
  }, [isShowModal])
  
  return (
    <div className='split-error'>
     
      <Modal show={show} onHide={handleClose} centered className='split-error-modal'>
        <Modal.Body className='text-center'>
            <button className='split-close-button' onClick={()=> handleClose()}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className='split-error-modal__icon'>
              <i className="fa-solid fa-circle-exclamation"></i>
              <div>
                {t('WARNING')}
              </div>
            </div>
            <div className='split-error-modal__message'>
              {message}
            </div>
        </Modal.Body>
        <Modal.Footer className='border-top-0 split-error-modal__footer'>
          <button className='m-auto split-back-btn' onClick={handleClose}>
            {t('Close')}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PastDateEventModal

/*
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>It is not possible to enter an event in the past date !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
*/