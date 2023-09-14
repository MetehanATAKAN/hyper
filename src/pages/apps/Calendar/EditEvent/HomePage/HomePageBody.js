import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { FormInput } from '../../../../../components';
import HyperDatepicker from '../../../../../components/Datepicker';
import { useTranslation } from 'react-i18next';
import { editEventModalSteps } from '../../../../../pageTour/Steps';
import { Steps } from 'intro.js-react';

const HomePageBody = (props) => {
    const { isEditable, onUpdateEvent, onAddEvent } = props;
    const { t } = useTranslation();
    const eventData = useSelector(state => state.Calendar.eventData);
    // FORM
    const schemaResolver = yupResolver(yup.object().shape({
            title: yup.string().required('Please enter event name'),
            className: yup.string().required('Please select category')}));
    const methods = useForm({ defaultValues: eventData, resolver: schemaResolver });
    const { handleSubmit, register, control, formState: { errors },} = methods;
    const onSubmitEvent = (data) => { isEditable ? onUpdateEvent(data) : onAddEvent(data) };
        // Activity Time
    const [selectedDate, setSelectedDate] = useState(eventData.start);
    const onDateChange = (date) => { date && setSelectedDate(date) };


    const [stepsEnabled, setStepsEnabled] = useState(false);
    const [initialStep, setInitialStep] = useState(0);

    const [hintsEnabled, setHintsEnabled] = useState(true);
    const [hints, setHints] = useState(
        [
            {
              element: ".hello",
              hint: "Hello hint",
              hintPosition: "middle-right"
            }
          ]
    )
    return (
        <div>
            {/* <button onClick={()=>setStepsEnabled(!stepsEnabled)} >page tourss</button> */}
        <form noValidate name="chat-form" id="chat-form" onSubmit={handleSubmit(onSubmitEvent)}>
            <Steps
        enabled={stepsEnabled}
        steps={editEventModalSteps}
        initialStep={initialStep}
        onExit={()=>setStepsEnabled(!stepsEnabled)}
        />
        
            <Row className="px-4">
                <Col className='eventName'>
                    <FormInput
                        type="text"
                        label={t('Event Name')}
                        name="title"
                        className="form-control"
                        placeholder="Insert Event Name"
                        containerClass={'mb-2'}
                        register={register}
                        key="title"
                        errors={errors}
                        control={control}
                    />
                </Col>
            </Row>
            <Row className="px-4">
                <Col className='activityDate'>
                    <h5>{t('Activity Date')}</h5>
                    <HyperDatepicker
                        hideAddon={true}
                        register={register}
                        errors={errors}
                        control={control}
                        value={selectedDate}
                        onChange={(date) => { onDateChange(date) }}
                    />
                </Col>
            </Row>
        </form>
        </div>
    );
};

export default HomePageBody;
