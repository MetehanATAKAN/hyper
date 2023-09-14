import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import HyperDatepicker from '../../../../../components/Datepicker';
import { Row, Col, Alert } from 'react-bootstrap';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';

import { Spin } from 'antd';
import 'antd/dist/antd.css';

const HomePageUpdate = ({ eventId, setHomePageUpdateButtonDisabled, onSubmitUpdateForm, setOnSubmitUpdateForm }) => {
  const [loader, setLoader] = useState(false);
  const { t } = useTranslation();
  const [event, setEvent] = useState({});
  const dateInfo = useSelector((state) => state.Calendar.dateInfo);
  const calendarDate = useSelector((state) => state.Calendar);
  const eventDate = String(calendarDate.eventData.start);
  const eventDay = eventDate.slice(0, 15);
  const eventDay2 = new Date(eventDay);

  const userDate = new Date().toDateString();
  const userDate2 = new Date(userDate);

  const [allData, setAllData] = useState({})
  const schemaResolver = yupResolver(
    yup.object().shape({
        title: yup.string().required('Please enter event name'),
        className: yup.string().required('Please select category'),
    })
);

  const methods = useForm({ defaultValues: event, resolver: schemaResolver });
  const {
      handleSubmit,
      register,
      control,
      formState: { errors },
  } = methods;

  const [isEditable, setIsEditable] = useState(false);

  const [activityType, setActivityType] = useState({
    id: 1,
    value: "Clinic Visit",
    label: "Clinic Visit"
  })

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedTime, setSelectedTime] = useState({ value: 'Select Time', label: t('Select Time') });

  const mainTimes = [
    '09:00',
    '09:15',
    '09:30',
    '09:45',
    '10:00',
    '10:15',
    '10:30',
    '10:45',
    '11:00',
    '11:15',
    '11:30',
    '11:45',
    '12:00',
    '12:15',
    '12:30',
    '12:45',
    '13:00',
    '13:15',
    '13:30',
    '13:45',
    '14:00',
    '14:15',
    '14:30',
    '14:45',
    '15:00',
    '15:15',
    '15:30',
    '15:45',
    '16:00',
    '16:15',
    '16:30',
    '16:45',
    '17:00',
    '17:15',
    '17:30',
    '17:45',
    '18:00',
    '18:15',
    '18:30',
    '18:45',
];

  const onDateChange = async (date) => {
    if (date) {
        await setClinicVisits([])
        await setSelectedDate(date);
        await setSelectedClinicVisit({ value: 'Select Clinic', label: t('Select Clinic') });
        await setSelectedCustomer({ value: 'Select Customer', label: t('Select Customer') });
        await setHomePageUpdateButtonDisabled(true);
        await setCustomerInfo([]);
    }
};

const changeSelectedTime = (event) => {
  setSelectedTime(event);
  if(selectedClinicVisit.value === 'Select Clinic') {
    setHomePageUpdateButtonDisabled(true);
  }
  if(selectedCustomer.value === 'Select Customer') {
      setHomePageUpdateButtonDisabled(true);
  }else {
      setHomePageUpdateButtonDisabled(false);
  }
};

const [selectedDurationActivity, setSelectedDurationActivity] = useState({
  value: 15,
  label: 15,
});
const duration = [15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480];

const changeDurationActivity = (event) => {
  setSelectedDurationActivity(event);
  if(selectedClinicVisit.value === 'Select Clinic') {
    setHomePageUpdateButtonDisabled(true);
}
if(selectedCustomer.value === 'Select Customer') {
    setHomePageUpdateButtonDisabled(true);
}else {
    setHomePageUpdateButtonDisabled(false);
}
};

const [businessUnite, setBusinessUnite] = useState([])
const [selectedBusinessUnite, setSelectedBusinessUnite] = useState();

// Clinic Visit
const [clinicVisits, setClinicVisits] = useState([])

const [selectedClinicVisit, setSelectedClinicVisit] = useState({value: 'Select Clinic', label: t('Select Clinic')});

const [pharmacyDatas, setPharmacyDatas] = useState([{
  id: 1,
  name: "Pharmacy",
  name: "Address",
}])

const [selectedPharmacy, setSelectedPharmacy] = useState({value: 'Pharmacy', label: t('Pharmacy')});

// Convert Time

const addDayZero = () => {
  if (selectedDate.getDate() < 10) {
      return '0' + selectedDate.getDate();
  } else {
      return selectedDate.getDate();
  }
};

const addMonthZero = () => {
  if (selectedDate.getMonth() < 9) {
      return '0' + (parseInt(selectedDate.getMonth()) + 1);
  } else {
      return selectedDate.getMonth() + 1;
  }
};

// Customer Info
const [customerInfo, setCustomerInfo] = useState([])

const [selectedCustomer, setSelectedCustomer] = useState({ value: 'Select Customer', label: t('Select Customer') })

const changeClinic = (event) => {
  setSelectedClinicVisit(event);
  setSelectedCustomer({value: 'Select Customer', label: t('Select Customer')});
  setCustomerInfo([]);
  setHomePageUpdateButtonDisabled(true);
  setLoader(true);
  FetchApiPost('services/daywork/event/GetCustomers', 'POST', {
    empId: localStorage.getItem('userEmpId'),
    date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
    clinicId: event.id,
    start:
        selectedDate.getFullYear() +
        '-' +
        addMonthZero(selectedDate) +
        '-' +
        addDayZero(selectedDate) +
        'T' +
        selectedTime.value +
        ':00.296Z',
    orgTypeId: event.orgType,
    busId: selectedBusinessUnite.id,
})
    .then((response) => response.json())
    .then((response) => {
      setCustomerInfo(response.data)
      setLoader(false);
    })
    .catch((error) => {
        console.error('Error:', error);
        setLoader(false);
    });
    if(selectedClinicVisit.value === 'Select Clinic') {
      setHomePageUpdateButtonDisabled(true);
    }
    if(selectedCustomer.value === 'Select Customer') {
        setHomePageUpdateButtonDisabled(true);
    }else {
        setHomePageUpdateButtonDisabled(false);
    }
};

const changePharmacy = (event) => {
  setSelectedPharmacy(event);
};



const changeCustomer = (event) => {
  setSelectedCustomer(event);
  setHomePageUpdateButtonDisabled(false);
};

useEffect(() => {
  FetchApiGet(`services/Daywork/Event/GetEventById?id=${eventId}`, 'GET')
    .then(res => res.json())
    .then(res => {
      setAllData(res)
      setActivityType({
        id: res.activityTypeId,
        value: res.activityTypeName,
        label: res.activityTypeName
      })
      setSelectedDate(new Date(res.startDate))
      setSelectedTime({ value: res.startDate.slice(11, 16), label: res.startDate.slice(11, 16)})
      setSelectedDurationActivity({
        value: (Math.abs(new Date(res.endDate) - new Date(res.startDate)) / 1000) / 60,
        label: (Math.abs(new Date(res.endDate) - new Date(res.startDate)) / 1000) / 60
      })
      setBusinessUnite([{
        id: res.busId,
        value: res.busName,
        label: res.busName
      }])
      setSelectedBusinessUnite({
        id: res.busId,
        value: res.busName,
        label: res.busName
      })
      setSelectedClinicVisit({
        id: res.clinicId,
        value: res.clinicName,
        label: `${res.clinicName} / ${res.orgTypeId === 1 ? t('POLYCLINIC') : t('HOSPITAL')}`,
        orgTypeId: res.orgTypeId,
      })
      setSelectedCustomer({
        id: res.customerId,
        value: res.title,
        label: res.title,
        category: res.category,
        specId: res.specId,
        specName: res.specName,
        customerName: res.title
      })
    })
}, [])

const clinicParams = useCallback(() => {
  const data = {
      empId: localStorage.getItem('userEmpId'),
      date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
      busId: selectedBusinessUnite.id,
  };
  return data;
}, [selectedBusinessUnite, selectedDate]);


useEffect(() => {
  if (activityType.value === 'Clinic Visit') {
      (async () => {
          try {
              // await getBusinessUnite();
              const data = await clinicParams();
              if(selectedBusinessUnite !== undefined){
                await getClinicData(data);
              }
             
          } catch (error) {
              console.log(error);
          }
      })();
  }
}, [activityType, selectedDate]);

const getClinicData = (data) => {
  setLoader(true);
  FetchApiPost('services/daywork/event/GetClinics', 'POST', data)
      .then((response) => response.json())
      .then((response) => {
          if (response.errors !== null) {
              // setClinicError(true);
              // setSetClinicErrorMessage(response.errors);
              setLoader(false);
          } else {
            setClinicVisits(response.data);
            setLoader(false);
          }

          // setTimeout(() => {
          //     setClinicError(false);
          // }, 2500);
      })
      .catch((error) => {
          console.error('Error:', error);
          setLoader(false);
      });
};

//onSubmit={handleSubmit(onSubmitEvent)}

const [createErrMessage, setCreateErrMessage] = useState();
const [isCreateErr, setIsCreateErr] = useState(false);

const getCreateData = () => {
  if (activityType.value === 'Clinic Visit') {
      FetchApiPost('services/Daywork/Event/UpdateEvent', 'POST', {
        EventId: eventId,
        DateTimeStart: selectedDate.getFullYear() +
        '-' +
        addMonthZero(selectedDate) +
        '-' +
        addDayZero(selectedDate) +
        'T' +
        selectedTime.value +
        ':00.296Z',
        LocationId: selectedClinicVisit.id,
        LocationName: selectedClinicVisit.value,
        EmployeeId: allData.employeeId,
        CustomerId: allData.customerId,
        CustomerName: selectedCustomer.customerName,
        SpecId: selectedCustomer.specId,
        DurationOfEachActivity: selectedDurationActivity.value,
        OrgTypeId: selectedClinicVisit.orgType,
        BusinessUnitId: selectedBusinessUnite.id,
        BusinessUnitName: selectedBusinessUnite.value,
        Category: selectedCustomer.category,
      })
          .then((response) => response.json())
          .then((response) => {
              if (response.errors !== null) {
                  setIsCreateErr(true);
                  
                  setCreateErrMessage(response.errors);
                  setTimeout(() => {
                      setIsCreateErr(false);
                  }, 2500);
              } else {
                  window.location.reload();
              }
          })
          .catch((error) => {
              console.error('Error:', error);
          });
  } else {
      // FetchApiPost('services/daywork/Event/CreateEvent', 'POST', createPharmacyData)
      //     .then((response) => response.json())
      //     .then((response) => {
      //         if (response.errors !== null) {
      //             setIsCreateErr(true);
      //             if (refresh === true) {
      //                 setRefresh(false);
      //             } else {
      //                 setRefresh(true);
      //             }
      //             setCreateErrMessage(response.errors);
      //             setTimeout(() => {
      //                 setIsCreateErr(false);
      //             }, 2500);
      //         } else {
      //             window.location.reload();
      //             onClose();
      //         }
      //     })
      //     .catch((error) => {
      //         console.error('Error:', error);
      //     });
  }
};

useEffect(() => {
  if(activityType.value === 'Clinic Visit') {
    if(onSubmitUpdateForm === true) {
      getCreateData();
      setOnSubmitUpdateForm(false);
    }
  }
}, [onSubmitUpdateForm])
 
// useEffect(() => {
//   if(selectedClinicVisit.value === 'Select Clinic') {
//       setHomePageUpdateButtonDisabled(true);
//   }
//   if(selectedCustomer.value === 'Select Customer') {
//       setHomePageUpdateButtonDisabled(true);
//   }else {
//       setHomePageUpdateButtonDisabled(false);
//   }
// }, [selectedDate, selectedTime, selectedDurationActivity, selectedBusinessUnite, selectedClinicVisit, selectedCustomer])

  return (
    <div className='pb-2'>
      {isCreateErr ? (
          <Alert variant="danger" className="mb-3">
              <div className="visit-acti-error">
                  <span>{createErrMessage}</span>
              </div>
          </Alert>
      ) : null}
      <form noValidate name="chat-form" id="chat-form" >
                            <Row>
                                {!isEditable ? (
                                    <Row className="visit-acti-input-cont">
                                        <Col lg={6}>
                                            <h5>{t('Activity Type')}</h5>
                                            <Select
                                                isMulti={false}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={t('Select...')}
                                                value={activityType}
                                                isDisabled={true}
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <h5>{t('Activity Date')}</h5>
                                                <HyperDatepicker
                                                    hideAddon={true}
                                                    register={register}
                                                    errors={errors}
                                                    control={control}
                                                    value={selectedDate}
                                                    onChange={(date) => {
                                                        onDateChange(date);
                                                    }}
                                                    disabled={((allData.appStatus === 1 && eventDay2.getTime() < userDate2.getTime()) || userDate2.getTime() < eventDay2.getTime()) ? false : true}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                ) : null}

                                {!isEditable ? (
                                    <Row className="visit-acti-input-cont">
                                        <Col lg={6}>
                                            <h5>{t('Activity Start')}</h5>
                                            <Select
                                                isMulti={false}
                                                options={mainTimes.map((times) => ({ value: times, label: times }))}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder={t('Select...')}
                                                onChange={changeSelectedTime}
                                                value={selectedTime}
                                                isDisabled={((allData.appStatus === 1 && eventDay2.getTime() < userDate2.getTime()) || userDate2.getTime() < eventDay2.getTime()) ? false : true}
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3 hint4">
                                                <h5 className="hint1">{t('Duration of Each Activity')}</h5>
                                                <Select
                                                    isMulti={false}
                                                    options={duration.map((duration) => ({
                                                        value: duration,
                                                        label: duration,
                                                    }))}
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    placeholder={t('Select...')}
                                                    onChange={changeDurationActivity}
                                                    value={selectedDurationActivity}
                                                    isDisabled={((allData.appStatus === 1 && eventDay2.getTime() < userDate2.getTime()) || userDate2.getTime() < eventDay2.getTime()) ? false : true}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                ) : null}
                                {!isEditable ? (
                                    <Row className="visit-acti-input-cont hint4">
                                        <Col lg={12}>
                                            <h5>{t('Business Unite')}</h5>
                                            <Select
                                                isMulti={false}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                options={businessUnite.map((data) => ({
                                                    id: data.id,
                                                    value: data.value,
                                                    label: data.label,
                                                }))}
                                                onChange={(event) => setSelectedBusinessUnite(event)}
                                                value={selectedBusinessUnite}
                                                isDisabled={((allData.appStatus === 1 && eventDay2.getTime() < userDate2.getTime()) || userDate2.getTime() < eventDay2.getTime()) ? false : true}
                                            />
                                        </Col>
                                    </Row>
                                ) : null}
                                {!isEditable ? (
                                    <Row className="visit-acti-input-cont hint4">
                                        <Col>
                                            <h5>
                                                {activityType.value === 'Clinic Visit'
                                                    ? t('Clinic')
                                                    : activityType.value === 'Pharmacy Visit'
                                                    ? t('Pharmacy')
                                                    : null}
                                            </h5>
                                            {activityType.value !== 'Select Activity Type' ? (
                                                <Select
                                                    isMulti={false}
                                                    isDisabled={selectedTime.value === 'Select Time' ? true : false}
                                                    options={
                                                      activityType.value === 'Clinic Visit'
                                                            ? clinicVisits.map((clinicInfo) => ({
                                                                  id: clinicInfo.clinicId,
                                                                  value: clinicInfo.clinicName,
                                                                  label: `${clinicInfo.clinicName} / ${clinicInfo.clinicAddress} / ${clinicInfo.orgTypeId === 1 ? t('POLYCLINIC') : t('HOSPITAL')} `,
                                                                  orgType: clinicInfo.orgTypeId,
                                                              }))
                                                            : activityType.value === 'Pharmacy Visit'
                                                            ? pharmacyDatas.map((pharmacyDatas) => ({
                                                                  id: pharmacyDatas.id,
                                                                  value: pharmacyDatas.name,
                                                                  label: pharmacyDatas.name,
                                                              }))
                                                            : null
                                                    }
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    placeholder={
                                                      activityType.value === 'Clinic Visit'
                                                            ? t('Select Clinic')
                                                            : activityType.value === 'Pharmacy Visit'
                                                            ? t('Select Pharmacy')
                                                            : null
                                                    }
                                                    onChange={
                                                      activityType.value === 'Clinic Visit'
                                                            ? changeClinic
                                                            : activityType.value === 'Pharmacy Visit'
                                                            ? changePharmacy
                                                            : null
                                                    }
                                                    value={
                                                      activityType.value === 'Clinic Visit'
                                                            ? selectedClinicVisit
                                                            : activityType.value === 'Pharmacy Visit'
                                                            ? selectedPharmacy
                                                            : null
                                                    }
                                                    isDisabled={((allData.appStatus === 1 && eventDay2.getTime() < userDate2.getTime()) || userDate2.getTime() < eventDay2.getTime()) ? false : true}
                                                />
                                            ) : null}
                                        </Col>
                                    </Row>
                                ) : null}
                                {!isEditable ? (
                                    <Row className="visit-acti-input-cont">
                                        <Col>
                                            <h5>
                                                {activityType.value === 'Clinic Visit'
                                                    ? t('Customer')
                                                    : activityType.value === 'Pharmacy Visit'
                                                    ? t('Pharmaciest')
                                                    : null}
                                            </h5>
                                            {activityType.value !== 'Select Activity Type' ? (
                                                <Select
                                                    isMulti={false}
                                                    options={
                                                      activityType.value === 'Clinic Visit'
                                                            ? customerInfo?.map((customerInfo) => ({
                                                                  id: customerInfo.customerId,
                                                                  value: `${customerInfo.customerName} / ${customerInfo.category} / ${customerInfo.spec}`,
                                                                  label: `${customerInfo.customerName} / ${customerInfo.category} / ${customerInfo.spec}`,
                                                                  category: customerInfo.category,
                                                                  specId: customerInfo.specId,
                                                                  specName: customerInfo.specName,
                                                                  customerName: customerInfo.customerName,
                                                              }))
                                                            : null
                                                    }
                                                    className="react-select"
                                                    classNamePrefix="react-select"
                                                    placeholder={t('Select...')}
                                                    onChange={
                                                      activityType.value === 'Clinic Visit'
                                                            ? changeCustomer
                                                            : null
                                                    }
                                                    value={
                                                      activityType.value === 'Clinic Visit'
                                                            ? selectedCustomer
                                                            : null
                                                    }
                                                    isDisabled={((allData.appStatus === 1 && eventDay2.getTime() < userDate2.getTime()) || userDate2.getTime() < eventDay2.getTime()) ? false : true}
                                                />
                                            ) : null}
                                        </Col>
                                    </Row>
                                ) : null}
                            </Row>
                        </form>
    </div>
  )
}

export default HomePageUpdate