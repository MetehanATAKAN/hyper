import { Col, Row } from 'antd';
import React, { useState } from 'react'
import { InputNumberDefault } from '../../../../../../components/FormElements/Input';

const Total = () => {

     /**expected day */
     const [expectedDay, setExpectedDay] = useState(0);

     /**easy */
     const [easy, setEasy] = useState(0);
 
     /**medium */
     const [medium, setMedium] = useState(0);
 
     /**hard */
     const [hard, setHard] = useState(0);
 
     /**extreme */
     const [extreme, setExtreme] = useState(0);

     const inputsNumber = [
        {
            label:'expected day',
            value:expectedDay,
            setValue:setExpectedDay,
            width:'75%',
            xl:8
        },
        {
            label:'easy',
            value:easy,
            setValue:setEasy,
            width:'25%',
            xl:3
        },
        {
            label:'medium',
            value:medium,
            setValue:setMedium,
            width:'25%',
            xl:3
        },
        {
            label:'hard',
            value:hard,
            setValue:setHard,
            width:'25%',
            xl:3
        },
        {
            label:'extreme',
            value:extreme,
            setValue:setExtreme,
            width:'25%',
            xl:3
        },
    ]
  return (
    <>
    <Row className='expected-day' justify="space-between">
              {
                  inputsNumber?.map(data => (
                      <Col xs={24}  xl={data.xl} >
                          <InputNumberDefault
                              label={data.label}
                              value={data.value}
                              setValue={data.setValue}
                              isRequired={false}
                              width={data.width}
                          />
                      </Col>
                  ))
              }
          </Row>
    </>
  )
}

export default Total