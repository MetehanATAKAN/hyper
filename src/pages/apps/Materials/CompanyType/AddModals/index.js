import React, { useEffect, useState } from 'react';
import OurCompany from './OurCompany';
import MainType from './MainType';
import Type from './Type';
import AssetsType from './AssetsType';
import DutiesType from './DutiesType';
import MaterialUsageFacility from './MaterialUsageFacility';
import Companies from './Companies';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../../utils/http.helper';
import PharmacySplitPercentProblem from '../../../../../components/Modals/PharmacySplitPercentProblem';

const AddModals = ({ modalTabValue, setModalTabValue, isShow, setIsShow, setHandleAddModalStatus }) => {
    const [buttonDisable, setButtonDisable] = useState(false);

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState('');

    // Our Company Type
    const [companyType, setCompanyType] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');

    // Main Type
    const [mainType, setMainType] = useState('');
    const [mainDescription, setMainDescription] = useState('');

    // Type
    const [type, setType] = useState('');
    const [typeDescription, setTypeDescription] = useState('');

    // Assets Type
    const [assetsType, setAssetsType] = useState('');
    const [assetsDescription, setAssetsDescription] = useState('');

    // Duties Type
    const [dutiesType, setDutiesType] = useState('');
    const [dutiesDescription, setDutiesDescription] = useState('');

    // Material Usage Facility
    const [materialUsage, setMaterialUsage] = useState('');
    const [materialUsageDescription, setMaterialUsageDescription] = useState('');

    // Companies
    const [country, setCountry] = useState();
    const [countryOptions, setCountryOptions] = useState([]);
    const [city, setCity] = useState("");
    const [cityOptions, setCityOptions] = useState([]);

    const [organizationName, setOrganizationName] = useState("");
    const [organizationAdress, setOrganizationAdress] = useState("");

    const [zipNumber, setZipNumber] = useState("");
    const [contactPerson, setContactPerson] = useState("");

    const [contactPhone, setContactPhone] = useState("");
    const [contactEmail, setContactEmail] = useState("");

    const [companyRegistirationNumber, setCompanyRegistirationNumber] = useState("");
    const [taxNumber, setTaxNumber] = useState("");

    const [vatNumber, setVatNumber] = useState("");

    const [companiesMainType, setCompaniesMainType] = useState([]);
    const [companiesType, setCompaniesType] = useState([]);
    const [companiesAssetsType, setCompaniesAssetsType] = useState([]);
    const [companiesDutiesType, setCompaniesDutiesType] = useState([]);
    const [companiesMaterialUsageFacility, setCompaniesMaterialUsageFacility] = useState([]);


    const { t } = useTranslation();
    
    const handleChange = (event, newValue) => {
        setModalTabValue(newValue);
    };
    
    const handleClickAdd = () => {
        if (modalTabValue === 0) {
            FetchApiPost('services/Material/OurCompany/CreateOurCompanyType', 'POST', {
                name: companyType.trim(),
                description: companyDescription.trim(),
                createdBy: localStorage.getItem('userName'),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setHandleAddModalStatus({ clickAdd: true, tabName: 'Our Company Type', item: data.data });
                        setCompanyType('');
                        setCompanyDescription('');
                    });
                }else if (res.status === 409){
                  res.json().then(err => {
                      setShowErrorModal(true)
                      setErrorModalMessage('Our Company Type is already exist in system')
                  })
                }else{
                    res.json().then(err => {
                        setShowErrorModal(true)
                        setErrorModalMessage(t(err.errors[0]))
                    })
                }
            });
        } else if (modalTabValue === 1) {
            FetchApiPost('services/Material/MainType/CreateMainType', 'POST', {
                name: mainType.trim(),
                description: mainDescription.trim(),
                createdBy: localStorage.getItem('userName'),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setHandleAddModalStatus({ clickAdd: true, tabName: 'Main Type', item: data.data });
                        setMainType('');
                        setMainDescription('');
                    });
                }else if (res.status === 409){
                    res.json().then(err => {
                        setShowErrorModal(true)
                        setErrorModalMessage('Main Type is already exist in system')
                    })
                  }else{
                      res.json().then(err => {
                          setShowErrorModal(true)
                          setErrorModalMessage(t(err.errors[0]))
                      })
                  }
            });
        } else if (modalTabValue === 2) {
            FetchApiPost('services/Material/MaterialType/CreateMaterialType', 'POST', {
                name: type.trim(),
                description: typeDescription.trim(),
                createdBy: localStorage.getItem('userName'),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setHandleAddModalStatus({ clickAdd: true, tabName: 'Type', item: data.data });
                        setType('');
                        setTypeDescription('');
                    });
                }else if (res.status === 409){
                    res.json().then(err => {
                        setShowErrorModal(true)
                        setErrorModalMessage('Type is already exist in system')
                    })
                  }else{
                      res.json().then(err => {
                          setShowErrorModal(true)
                          setErrorModalMessage(t(err.errors[0]))
                      })
                  }
            });
        } else if (modalTabValue === 3) {
            FetchApiPost('services/Material/AssetsType/CreateAssetsType', 'POST', {
                name: assetsType.trim(),
                description: assetsDescription.trim(),
                createdBy: localStorage.getItem('userName'),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setHandleAddModalStatus({ clickAdd: true, tabName: 'Assets Type', item: data.data });
                        setAssetsType('');
                        setAssetsDescription('');
                    });
                }else if (res.status === 409){
                    res.json().then(err => {
                        setShowErrorModal(true)
                        setErrorModalMessage('Assets is already exist in system')
                    })
                  }else{
                      res.json().then(err => {
                          setShowErrorModal(true)
                          setErrorModalMessage(t(err.errors[0]))
                      })
                  }
            });
        } else if (modalTabValue === 4) {
            FetchApiPost('services/Material/DutiesType/CreateDutiesType', 'POST', {
                name: dutiesType.trim(),
                description: dutiesDescription.trim(),
                createdBy: localStorage.getItem('userName'),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setHandleAddModalStatus({ clickAdd: true, tabName: 'Duties Type', item: data.data });
                        setDutiesType('');
                        setDutiesDescription('');
                    });
                }else if (res.status === 409){
                    res.json().then(err => {
                        setShowErrorModal(true)
                        setErrorModalMessage('Duties Type is already exist in system')
                    })
                  }else{
                      res.json().then(err => {
                          setShowErrorModal(true)
                          setErrorModalMessage(t(err.errors[0]))
                      })
                  }
            });
        } else if (modalTabValue === 5) {
            FetchApiPost('services/Material/Facility/CreateFacility', 'POST', {
                name: materialUsage.trim(),
                description: materialUsageDescription.trim(),
                createdBy: localStorage.getItem('userName'),
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setHandleAddModalStatus({
                            clickAdd: true,
                            tabName: 'Material Usage Facility',
                            item: data.data,
                        });
                        setMaterialUsage('');
                        setMaterialUsageDescription('');
                    });
                }else if (res.status === 409){
                    res.json().then(err => {
                        setShowErrorModal(true)
                        setErrorModalMessage('Material Usage Facility is already exist in system')
                    })
                  }else{
                      res.json().then(err => {
                          setShowErrorModal(true)
                          setErrorModalMessage(t(err.errors[0]))
                      })
                  }
            });
        } else if(modalTabValue === 6) {
            const countryName = countryOptions.filter((item) => item.value === country.value);
            const mainTypeIds = companiesMainType.map((item) => item.value);
            const mainTypeStr = mainTypeIds.join(',');
            const typeIds = companiesType.map((item) => item.value);
            const typeStr = typeIds.join(',');
            const assetsTypeIds = companiesAssetsType.map((item) => item.value);
            const assetsTypeStr = assetsTypeIds.join(',');
            const dutiesTypeIds = companiesDutiesType.map((item) => item.value);
            const dutiesTypeStr = dutiesTypeIds.join(',');
            const materialUsageFacilityIds = companiesMaterialUsageFacility.map((item) => item.value);
            const materialUsageFacilityStr = materialUsageFacilityIds.join(',');
            FetchApiPost('services/Material/Company/CreateCompany', 'POST', {
                name: organizationName.trim(),
                createdBy: localStorage.getItem('userName'),
                countryId: country.value,
                countryName: countryName.label,
                cityName: city.trim(),
                organizationAddress: organizationAdress.trim(),
                zipNumber: zipNumber.trim(),
                contactPerson: contactPerson.trim(),
                contactPhone: contactPhone.trim(),
                contactEmail: contactEmail.trim(),
                countryName: countryName[0].label,
                companyRegistrationNumber: companyRegistirationNumber.trim(),
                taxNumber: taxNumber.trim(),
                vatNumber: vatNumber.trim(),
                mainTypeIds: mainTypeStr,
                typeIds: typeStr,
                assetsTypeIds: assetsTypeStr,
                dutiesTypeIds: dutiesTypeStr,
                facilityIds: materialUsageFacilityStr,
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        setCountry();
                        setCity('');
                        setOrganizationAdress('');
                        setOrganizationName('');
                        setZipNumber('');
                        setContactPerson('');
                        setContactPhone('');
                        setContactEmail('');
                        setCompanyRegistirationNumber('');
                        setTaxNumber('');
                        setVatNumber('');
                        setCompaniesMainType([]);
                        setCompaniesType([]);
                        setCompaniesAssetsType([]);
                        setCompaniesDutiesType([]);
                        setCompaniesMaterialUsageFacility([]);
                        // setHandleAddModalStatus({ clickAdd: true, tabName: 'Organization', item: data.data });

                    });
                }else{
                  res.json().then(err => {
                    //   setShowErrorModal(true)
                    //   setErrorModalMessage("There is the same [country / city / organization / adress] company in system")
                  })
              }
            });
        }

    };

    const handleErrorModal = () => {
        setShowErrorModal(false);
        setErrorModalMessage('');
    };

    return (
        <>
            <Modal show={isShow} onHide={() => setIsShow(false)} size={modalTabValue === 6 ? 'xl' : 'md'} className="copmany-type-add-modal" id={`company-type-${modalTabValue}`}>
                <Modal.Header closeButton style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                    <h4
                        className="modal-title"
                        style={{
                            color: '#7A7A7A',
                            font: '18px',
                        }}>
                        {t('add')}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Box
                            sx={{
                                flexGrow: 1,
                                maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
                                bgcolor: 'background.paper'
                            }}
                            >
                            
                            <Tabs
                                value={modalTabValue}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons
                                aria-label="visible arrows tabs example"
                                sx={{
                                    [`& .${tabsClasses.scrollButtons}`]: {
                                        '&.Mui-disabled': { opacity: 0.3 },
                                    }
                                }}>
                                <Tab style={{ color: '#6c757d', fontWeight: '600', fontSize: '0.9rem' }} sx={{ textTransform: 'capitalize' }} label={t('Our Company')} />
                                <Tab style={{ color: '#6c757d', fontWeight: '600', fontSize: '0.9rem' }} sx={{ textTransform: 'capitalize' }} label={t('Main Type')} />
                                <Tab style={{ color: '#6c757d', fontWeight: '600', fontSize: '0.9rem' }} sx={{ textTransform: 'capitalize' }} label={t('Type')} />
                                <Tab style={{ color: '#6c757d', fontWeight: '600', fontSize: '0.9rem' }} sx={{ textTransform: 'capitalize' }} label={t('Assets Type')} />
                                <Tab style={{ color: '#6c757d', fontWeight: '600', fontSize: '0.9rem' }} sx={{ textTransform: 'capitalize' }} label={t('Duties Type')} />
                                <Tab style={{ color: '#6c757d', fontWeight: '600', fontSize: '0.9rem' }} sx={{ textTransform: 'capitalize' }} label={t('Material Usage Facility')} />
                                <Tab style={{ color: '#6c757d', fontWeight: '600', fontSize: '0.9rem' }} sx={{ textTransform: 'capitalize' }} label={t('Companies')} />
                            </Tabs>
                        </Box>
                        <div style={{ padding: '16px' }}>
                            {modalTabValue === 0 && (
                                <OurCompany
                                    companyType={companyType}
                                    setCompanyType={setCompanyType}
                                    companyDescription={companyDescription}
                                    setCompanyDescription={setCompanyDescription}
                                    setButtonDisable={setButtonDisable}
                                />
                            )}
                            {modalTabValue === 1 && (
                                <MainType
                                    mainType={mainType}
                                    setMainType={setMainType}
                                    mainDescription={mainDescription}
                                    setMainDescription={setMainDescription}
                                    setButtonDisable={setButtonDisable}
                                />
                            )}
                            {modalTabValue === 2 && (
                                <Type
                                    type={type}
                                    typeDescription={typeDescription}
                                    setType={setType}
                                    setTypeDescription={setTypeDescription}
                                    setButtonDisable={setButtonDisable}
                                />
                            )}
                            {modalTabValue === 3 && (
                                <AssetsType
                                    assetsType={assetsType}
                                    setAssetsType={setAssetsType}
                                    assetsDescription={assetsDescription}
                                    setAssetsDescription={setAssetsDescription}
                                    setButtonDisable={setButtonDisable}
                                />
                            )}
                            {modalTabValue === 4 && (
                                <DutiesType
                                    dutiesType={dutiesType}
                                    setDutiesType={setDutiesType}
                                    dutiesDescription={dutiesDescription}
                                    setDutiesDescription={setDutiesDescription}
                                    setButtonDisable={setButtonDisable}
                                />
                            )}
                            {modalTabValue === 5 && (
                                <MaterialUsageFacility
                                    materialUsage={materialUsage}
                                    setMaterialUsage={setMaterialUsage}
                                    materialUsageDescription={materialUsageDescription}
                                    setMaterialUsageDescription={setMaterialUsageDescription}
                                    setButtonDisable={setButtonDisable}
                                />
                            )}
                            {modalTabValue === 6 && <Companies 
                                setButtonDisable={setButtonDisable}
                                country={country}
                                setCountry={setCountry}
                                countryOptions={countryOptions}
                                setCountryOptions={setCountryOptions}
                                city={city}
                                setCity={setCity}
                                cityOptions={cityOptions}
                                setCityOptions={setCityOptions}
                                organizationName={organizationName}
                                setOrganizationName={setOrganizationName}
                                organizationAdress={organizationAdress}
                                setOrganizationAdress={setOrganizationAdress}
                                zipNumber={zipNumber}
                                setZipNumber={setZipNumber}
                                contactPerson={contactPerson}
                                setContactPerson={setContactPerson}
                                contactPhone={contactPhone}
                                setContactPhone={setContactPhone}
                                contactEmail={contactEmail}
                                setContactEmail={setContactEmail}
                                companyRegistirationNumber={companyRegistirationNumber}
                                setCompanyRegistirationNumber={setCompanyRegistirationNumber}
                                taxNumber={taxNumber}
                                setTaxNumber={setTaxNumber}
                                vatNumber={vatNumber}
                                setVatNumber={setVatNumber}
                                mainType={companiesMainType}    
                                setMainType={setCompaniesMainType}
                                type={companiesType}
                                setType={setCompaniesType}
                                assetsType={companiesAssetsType}
                                setAssetsType={setCompaniesAssetsType}
                                dutiesType={companiesDutiesType}
                                setDutiesType={setCompaniesDutiesType}
                                materialUsageFacility={companiesMaterialUsageFacility}
                                setMaterialUsageFacility={setCompaniesMaterialUsageFacility}
                            />}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#FAFBFE ' }}>
                    <Button className="btn-light" style={{ backgroundColor: '#EBEBEB' }} onClick={() => setIsShow(false)} >
                        {t('cancel')}
                    </Button>
                    <Button className="btn-primary" onClick={() => handleClickAdd()} disabled={buttonDisable}>
                        {t('add')}
                    </Button>
                </Modal.Footer>
            </Modal>

            {showErrorModal && (
                <PharmacySplitPercentProblem
                    messages={errorModalMessage}
                    show={showErrorModal}
                    handleClose={handleErrorModal}
                />
            )}
        </>
    );
};

export default AddModals;
