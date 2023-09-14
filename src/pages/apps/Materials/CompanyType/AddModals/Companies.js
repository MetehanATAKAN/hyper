import React, { useState, useEffect } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { FormInput } from '../../../../../components';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { SingleSelects, MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { AutoCompleteInput, NewInput } from '../../../../../components/GlobalNew/Inputs';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Companies = (props) => {
  const { country, setCountry, countryOptions, setCountryOptions, city, setCity, cityOptions, setCityOptions, organizationName, setOrganizationName,
    organizationAdress, setOrganizationAdress, zipNumber, setZipNumber, contactPerson, setContactPerson,
    contactPhone, setContactPhone, contactEmail, setContactEmail, companyRegistirationNumber, setCompanyRegistirationNumber,
    taxNumber, setTaxNumber, vatNumber, setVatNumber,
    mainType, setMainType, type, setType, assetsType, setAssetsType, dutiesType, setDutiesType, materialUsageFacility, setMaterialUsageFacility,
    setButtonDisable
  } = props;
  const { t } = useTranslation();
  const history = useHistory();

  const [organizationNameOptions, setOrganizationNameOptions] = useState([]);
  const [organizationAdressOptions, setOrganizationAdressOptions] = useState([]);
  const [companyRegistirationNumberOptions, setCompanyRegistirationNumberOptions] = useState([]);

  
  const [mainTypeOptions, setMainTypeOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [assetsTypeOptions, setAssetsTypeOptions] = useState([]);
  const [dutiesTypeOptions, setDutiesTypeOptions] = useState([]);
  const [materialUsageFacilityOptions, setMaterialUsageFacilityOptions] = useState([]);

  useEffect(() => {
      if((country !== undefined) && (city.trim().length > 0) && (organizationName.trim().length > 0) && (organizationAdress.trim().length > 0) && (mainType.length > 0) && (type.length > 0) && (assetsType.length > 0) && (dutiesType.length > 0) && (materialUsageFacility.length > 0)){
      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }
  }, [country, city, organizationName, organizationAdress, zipNumber, contactPerson, contactPhone, contactEmail, companyRegistirationNumber, taxNumber, vatNumber, mainType, type, assetsType, dutiesType, materialUsageFacility])
  
  useEffect(() => {
    FetchApiGet('api/OldSystem/GetAllCountries', 'GET')
    .then(res => {
        if(res.status === 200){
            res.json().then(data => {
              setCountryOptions(data.map(c =>{
                    return { value: c.CountryId, label: c.CountryName }
                }))
            })
        } else if(res.status === 500){
            history.push('/error-500');
        }
    })

    

    FetchApiGet('services/Material/MainType/GetAllMainType', 'GET')
        .then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setMainTypeOptions(data.data.map(c =>{
                        return { value: c.id, label: c.name }
                    }))
                })
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })
        FetchApiGet('services/Material/MaterialType/GetAllMaterialType', 'GET')
        .then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setTypeOptions(data.data.map(c =>{
                        return { value: c.id, label: c.name }
                    }))
                })
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })

        FetchApiGet('services/Material/AssetsType/GetAllAssetsType', 'GET')
        .then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setAssetsTypeOptions(data.data.map(c =>{
                        return { value: c.id, label: c.name }
                    }))
                })
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })


            FetchApiGet('services/Material/DutiesType/GetAllDutiesType', 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setDutiesTypeOptions(data.data.map(c =>{
                            return { value: c.id, label: c.name }
                        }))
                    })
                } else if(res.status === 500){
                    history.push('/error-500');
                }
            })

        FetchApiGet('services/Material/Facility/GetAllFacility', 'GET')
        .then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    setMaterialUsageFacilityOptions(data.data.map(c =>{
                        return { value: c.id, label: c.name }
                    }))
                })
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })

  }, [])

    return (
        <div className='company-type-companies'>
            <Row>
                <Col>
                  <SingleSelects 
                    selectedItems={country}
                    setSelectedItems={setCountry}
                    options={countryOptions}
                    label='country'
                    placeholder='Select...'
                    isStar={true}
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
                <Col>
                  <AutoCompleteInput 
                    value={city}
                    setValue={setCity}
                    options={cityOptions}
                    label='city'
                    placeholder='city'
                    isStar={true}
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col>
                  <AutoCompleteInput 
                    value={organizationName}
                    setValue={setOrganizationName}
                    options={organizationNameOptions}
                    label='organization name'
                    placeholder='organization name'
                    width={'100%'}
                    isStar={true}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
                <Col>
                  <AutoCompleteInput 
                    value={organizationAdress}
                    setValue={setOrganizationAdress}
                    options={organizationAdressOptions}
                    label='organization adress'
                    placeholder='organization adress'
                    isStar={true}
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col>
                  <NewInput 
                    value={zipNumber}
                    setValue={setZipNumber}
                    label='ZIP number'
                    placeholder='zip number'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
                <Col>
                  <NewInput 
                    value={contactPerson}
                    setValue={setContactPerson}
                    label='contact person'
                    placeholder='contact person'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col>
                  <NewInput 
                    value={contactPhone}
                    setValue={setContactPhone}
                    label='contact phone'
                    placeholder='contact phone'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
                <Col>
                  <NewInput 
                    value={contactEmail}
                    setValue={setContactEmail}
                    label='contact e-mail'
                    placeholder='contact e-mail'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col>
                  <AutoCompleteInput 
                    value={companyRegistirationNumber}
                    setValue={setCompanyRegistirationNumber}
                    options={companyRegistirationNumberOptions}
                    label='company registiration number'
                    placeholder='company registiration number'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
                <Col>
                  <NewInput 
                    value={taxNumber}
                    setValue={setTaxNumber}
                    label='TAX number'
                    placeholder='tax number'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col>
                  <NewInput 
                    value={vatNumber}
                    setValue={setVatNumber}
                    label='VAT number'
                    placeholder='vat number'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
                <Col></Col>
            </Row>

            <hr style={{color: "#DEE2E6", opacity: .7}} className='mt-2 mb-2'/>
            <Row>
                <Col sm={12} md={4}>
                  <MultipleSelects 
                    selectedItems={mainType}
                    setSelectedItems={setMainType}
                    options={mainTypeOptions}
                    isStar={true}
                    label='main type'
                    placeholder='select...'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
                <Col sm={12} md={4}>
                  <MultipleSelects 
                    selectedItems={type}
                    setSelectedItems={setType}
                    options={typeOptions}
                    isStar={true}
                    label='type'
                    placeholder='select...'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
                <Col sm={12} md={4}>
                  <MultipleSelects 
                    selectedItems={assetsType}
                    setSelectedItems={setAssetsType}
                    options={assetsTypeOptions}
                    isStar={true}
                    label='assets type'
                    placeholder='select...'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
            </Row>

            <Row className='mt-2'>
                <Col sm={12} md={4}>
                  <MultipleSelects 
                    selectedItems={dutiesType}
                    setSelectedItems={setDutiesType}
                    options={dutiesTypeOptions}
                    isStar={true}
                    label='duties type'
                    placeholder='select...'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
                <Col sm={12} md={4}>
                  <MultipleSelects 
                    selectedItems={materialUsageFacility}
                    setSelectedItems={setMaterialUsageFacility}
                    options={materialUsageFacilityOptions}
                    isStar={true}
                    label='material usage facility'
                    placeholder='select...'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                  />
                </Col>
                <Col>
                </Col>
            </Row>
            
        </div>
    );
};

export default Companies;
