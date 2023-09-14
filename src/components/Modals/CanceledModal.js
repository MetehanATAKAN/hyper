import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cancelClickEvent} from '../../redux/actions';
import { FetchApiGet } from '../../utils/http.helper';

function CanceledModal() {
    const [show, setShow] = useState(true);
    const [cancelMessage, setCancelMessage] = useState(null);
    const modalShow = useSelector(state => state.Calendar.cancelModelShow);
    const eventDatas = useSelector(state => state.Calendar.eventData);
    const dispatch = useDispatch() ;
    const handleClose = () => {
        setShow(false);
        dispatch(cancelClickEvent(false));
    };
    useEffect(() => {
      if(modalShow === true){
          setShow(true)
      }
      else{
          setShow(false)
      }
    }, [modalShow]);
    useEffect(() => {
     FetchApiGet(`services/Daywork/EventReport/GetCanceledReportByEventId?id=${eventDatas.id}`,"GET")
    .then((response)=>response.json())
    .then((response)=>setCancelMessage(response.data.message))
    .catch((error)=>console.log('Error=>',error))
    }, [eventDatas.id])
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{cancelMessage}</Modal.Body>
      </Modal>
    </div>
  )
}

export default CanceledModal