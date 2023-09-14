import React, { useEffect, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FetchApiGet } from '../../../../../utils/http.helper';
import { AutoComplete } from 'antd';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';

const OurCompany = ({ companyType, setCompanyType, companyDescription, setCompanyDescription, setButtonDisable }) => {
    
    const { t } = useTranslation();
    const [options, setOptions] = useState();
    const history = useHistory();

    useEffect(() => {
        if(companyType.trim().length === 0 || companyDescription.trim().length === 0){
            setButtonDisable(true)
        }else{
            setButtonDisable(false)
        }
    }, [companyType, companyDescription])

      useEffect(() => {
        FetchApiGet('services/Material/OurCompany/GetAllCompanyType', 'GET')
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
            <Col style={{fontWeight: 600, color: '#6c757d'}} className='p-0'>{t('company type')}</Col>
            <Col style={{fontSize: "1.2rem", color: 'red'}} className='p-0 text-end font-weight-bold'>*</Col>
        </Row>
        <Row>
            <AutoComplete
                options={companyType.length !== 0 && options}
                value={companyType}
                placeholder={t("company")}
                onChange={(e) => setCompanyType(e)}
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
            <Form.Control as="textarea" rows={3} placeholder="...." value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} />
        </Row>
    </div>
  )
}

export default OurCompany