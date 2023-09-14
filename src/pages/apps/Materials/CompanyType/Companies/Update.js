import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { SingleSelects, MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { AutoCompleteInput, NewInput } from '../../../../../components/GlobalNew/Inputs';
import { FetchApiGet } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Update = ({ handleUpdate, selectedValue, isShow, setIsShow }) => {

  console.log(selectedValue);
    const { t } = useTranslation();
    const history = useHistory();

    const [country, setCountry] = useState({ value: selectedValue.countryId, label: selectedValue.countryName});
    const [countryOptions, setCountryOptions] = useState([]);
    const [city, setCity] = useState(selectedValue.cityName);
    const [cityOptions, setCityOptions] = useState([]);

    const [organizationName, setOrganizationName] = useState(selectedValue.name);
    const [organizationAdress, setOrganizationAdress] = useState(selectedValue.organizationAddress);

    const [zipNumber, setZipNumber] = useState(selectedValue.zipNumber);
    const [contactPerson, setContactPerson] = useState(selectedValue.contactPerson);

    const [contactPhone, setContactPhone] = useState(selectedValue.contactPhone);
    const [contactEmail, setContactEmail] = useState(selectedValue.contactEmail);

    const [companyRegistirationNumber, setCompanyRegistirationNumber] = useState(selectedValue.companyRegistrationNumber);
    const [taxNumber, setTaxNumber] = useState(selectedValue.taxNumber);

    const [vatNumber, setVatNumber] = useState(selectedValue.vatNumber);


    const [organizationNameOptions, setOrganizationNameOptions] = useState([]);
    const [organizationAdressOptions, setOrganizationAdressOptions] = useState([]);
    const [companyRegistirationNumberOptions, setCompanyRegistirationNumberOptions] = useState([]);
  
    const [mainType, setMainType] = useState(selectedValue.dutiesTypeIds.map((dId, index) => {
      return {
        value: dId,
        label: selectedValue.dutiesTypeNames.split(',')[index]
      }
    }));
    const [mainTypeOptions, setMainTypeOptions] = useState([]);
    const [type, setType] = useState(selectedValue.typeIds.map((dId, index) => {
      return {
        value: dId,
        label: selectedValue.typeNames.split(',')[index]
      }
    }));
    const [typeOptions, setTypeOptions] = useState([]);
    const [assetsType, setAssetsType] = useState(selectedValue.assetsTypeIds.map((dId, index) => {
      return {
        value: dId,
        label: selectedValue.assetsTypeNames.split(',')[index]
      }
    }));
    const [assetsTypeOptions, setAssetsTypeOptions] = useState([]);
    const [dutiesType, setDutiesType] = useState(selectedValue.dutiesTypeIds.map((dId, index) => {
      return {
        value: dId,
        label: selectedValue.dutiesTypeNames.split(',')[index]
      }
    }));
    const [dutiesTypeOptions, setDutiesTypeOptions] = useState([]);
    const [materialUsageFacility, setMaterialUsageFacility] = useState(selectedValue.facilityIds.map((dId, index) => {
      return {
        value: dId,
        label: selectedValue.facilityNames.split(',')[index]
      }
    }));
    const [materialUsageFacilityOptions, setMaterialUsageFacilityOptions] = useState([]);

    const toggle = () => {
        setIsShow(false)
    }

    useEffect(() => {
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
    }, [history])

    console.log(selectedValue)

    const handleSetData = () => {
      const maintTypeStr = mainType.map(c => c.value).join(',');
      const typeStr = type.map(c => c.value).join(',');
      const assetsTypeStr = assetsType.map(c => c.value).join(',');
      const dutiesTypeStr = dutiesType.map(c => c.value).join(',');
      const facilityStr = materialUsageFacility.map(c => c.value).join(',');

      const data = {
        id: selectedValue.id,
        name: organizationName.trim(),
        modifiedBy: localStorage.getItem('userName'),
        countryId: country.value,
        countryName: country.label,
        cityName: city.trim(),
        organizationAddress: organizationAdress.trim(),
        zipNumber: zipNumber.trim(),
        contactPerson: contactPerson.trim(),
        contactPhone: contactPhone.trim(),
        contactEmail: contactEmail.trim(),
        companyRegistrationNumber: companyRegistirationNumber.trim(),
        taxNumber: taxNumber.trim(),
        vatNumber: vatNumber.trim(),
        mainTypeIds: maintTypeStr,
        typeIds: typeStr,
        assetsTypeIds: assetsTypeStr,
        dutiesTypeIds: dutiesTypeStr,
        facilityIds: facilityStr
      }

      handleUpdate(data);
    }

  return (
    <Modal show={isShow} onHide={toggle} size={'xl'} className="copmany-type-add-modal" id={`company-type-6`} >
                <Modal.Header onHide={toggle} closeButton style={{ backgroundColor: '#FFFFFF', color: '#000000' }} >
                    <h4
                        className="modal-title"
                        style={{
                            color: '#7A7A7A',
                            font: '18px',
                        }}
                    >
                        {t('Update Companies')}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <div className='mb-3' style={{padding: '16px'}} >
                    <div className='company-type-companies'>
            <Row>
                <Col>
                  <SingleSelects 
                    selectedItems={country.label}
                    setSelectedItems={setCountry}
                    options={countryOptions}
                    label='country'
                    placeholder='Select...'
                    isStar={true}
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                    disabled={true}
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
                    isStar={true}
                    width={'100%'}
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
                    label='main type'
                    placeholder='select...'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                    isStar={true}
                  />
                </Col>
                <Col sm={12} md={4}>
                  <MultipleSelects 
                    selectedItems={type}
                    setSelectedItems={setType}
                    options={typeOptions}
                    label='type'
                    placeholder='select...'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                    isStar={true}
                  />
                </Col>
                <Col sm={12} md={4}>
                  <MultipleSelects 
                    selectedItems={assetsType}
                    setSelectedItems={setAssetsType}
                    options={assetsTypeOptions}
                    label='assets type'
                    placeholder='select...'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                    isStar={true}
                  />
                </Col>
            </Row>

            <Row className='mt-2'>
                <Col sm={12} md={4}>
                  <MultipleSelects 
                    selectedItems={dutiesType}
                    setSelectedItems={setDutiesType}
                    options={dutiesTypeOptions}
                    label='duties type'
                    placeholder='select...'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                    isStar={true}
                  />
                </Col>
                <Col sm={12} md={4}>
                  <MultipleSelects 
                    selectedItems={materialUsageFacility}
                    setSelectedItems={setMaterialUsageFacility}
                    options={materialUsageFacilityOptions}
                    label='material usage facility'
                    placeholder='select...'
                    width={'100%'}
                    labelStyle={{color: '#6c757d'}}
                    isStar={true}
                  />
                </Col>
                <Col>
                </Col>
            </Row>
            
        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#FAFBFE ' }} >
                    <Button
                        className='btn-light'
                        style={{ backgroundColor: '#EBEBEB' }}
                        onClick={toggle}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        className='btn-warning'
                        onClick={() => handleSetData()}
                        disabled={country === undefined || city.trim().length === 0 || organizationName.trim().length === 0 || organizationAdress.trim().length === 0 || mainType.length === 0 || type.length === 0 || assetsType.length === 0 || dutiesType.length === 0 || materialUsageFacility.length === 0 }
                       >
                        {t('update')}
                    </Button>
                </Modal.Footer>
            </Modal>
  )
}

export default Update