import React,{useState,useEffect} from 'react'
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FetchApiGet } from '../../../utils/http.helper';

const DoctorInfo = () => {
    const [doctorInfo, setDoctorInfo] = useState([]);
    const eventId = useSelector((state) => state.Calendar.eventId);

    useEffect(() => {
        FetchApiGet(`services/daywork/EventDetail/GetCustomerDetailByEventId?eventId=${eventId}`,'GET')
        .then(response=>response.json())
        .then(response=>setDoctorInfo(response.data))
        .catch(error=>console.log(error))
      }, [eventId])

  return (
    <div>
        <Row style={{marginLeft:'1px',marginBottom:'10px'}}>
        {
          doctorInfo?.map((doctor,index)=>(
            `${doctor.specName} ${doctor.customerName}`
          ))
        }
        </Row>
    </div>
  )
}

export default DoctorInfo