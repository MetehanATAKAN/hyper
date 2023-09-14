import React, { useEffect, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AutoComplete } from 'antd';
import 'antd/dist/antd.css';
import { FetchApiGet } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const MainType = ({ mainType, setMainType, mainDescription, setMainDescription, setButtonDisable }) => {
    const { t } = useTranslation();
    const [options, setOptions] = useState();
    const history = useHistory();

    useEffect(() => {
        if(mainType.trim().length === 0 || mainDescription.trim().length === 0){
            setButtonDisable(true)
        }else{
            setButtonDisable(false)
        }
    }, [mainType, mainDescription])

      useEffect(() => {
        FetchApiGet('services/Material/MainType/GetAllMainType', 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => (
                        setOptions(data.data.map(item => {
                            return {
                                key: item.id,
                                value: item.name,
                                label: item.name
                            }
                        }))
                    ))
                } else if(res.status === 500){
                    history.push('/error-500');
                }
            })
      }, [history])

  return (
    <div>
        <Row>
            <Col style={{fontWeight: 600, color: '#6c757d'}} className='p-0'>{t('main type')}</Col>
            <Col style={{fontSize: "1.2rem", color: 'red'}} className='p-0 text-end font-weight-bold'>*</Col>
        </Row>
        <Row>
            <AutoComplete
                options={mainType.length !== 0 && options}
                value={mainType}
                placeholder={t("main")}
                onChange={(e) => setMainType(e)}
                dropdownStyle={{ zIndex: 5000 }}
                style={{
                width: '100%',
                }}
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                  notFoundContent={null}
            />
        </Row>
        <Row className='mt-3'>
            <Col style={{fontWeight: 600, color: '#6c757d'}} className='p-0'>{t('description')}</Col>
            <Col style={{fontSize: "1.2rem", color: 'red'}} className='p-0 text-end font-weight-bold'>*</Col>
        </Row>
        <Row>
            <Form.Control as="textarea" rows={3} placeholder="...." value={mainDescription} onChange={(e) => setMainDescription(e.target.value)} />
        </Row>
    </div>
  )
}

export default MainType