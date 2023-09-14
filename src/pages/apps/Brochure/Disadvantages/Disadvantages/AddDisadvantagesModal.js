import React, { useState, useEffect } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { FormInput } from '../../../../../components';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { MultiSelectLabels, SelectLabels } from '../../../../forms/Basic';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const AddDisadvantagesModal = ({ isShow, setIsShow, setHandleAddNewDisadvantages }) => {
    const { t } = useTranslation();

    const history = useHistory();

    const toggle = () => {
        setIsShow(false);
    }

    // Product
    const [product, setProduct] = useState([]);
    const [selectProduct, setSelectProduct] = useState([]);

    // Indication
    const [indication, setIndication] = useState([]);
    const [selectIndication, setSelectIndication] = useState([]);

    // Profile
    const [profile, setProfile] = useState([]);
    const [selectProfile, setSelectProfile] = useState([]);

    // Specialization
    const [specialization, setSpecialization] = useState([]);
    const [selectSpecialization, setselectSpecialization] = useState([]);

    // Need
    const [need, setNeed] = useState([]);
    const [selectNeed, setSelectNeed] = useState([]);

    // Competitor Composition
    const [competitorComposition, setCompetitorComposition] = useState([]);
    const [selectCompetitorComposition, setSelectCompetitorComposition] = useState([]);

    // Disadvantages Name
    const [disadvantagesName, setDisadvantagesName] = useState('');
    

    useEffect(() => {
        FetchApiGet('api/OldSystem/GetAllGlobalBrands', 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => (
                        setProduct(data.map(item => ({
                            value: item.GlobalBrandId,
                            label: item.GlobalBrandName
                        })))
                    ))
                } else if(res.status === 500){
                    history.push('/error-500');
                }
            })
    }, [])

    
    const handleChangeProduct = (e) => {
        setIndication([]);
        setProfile([]);
        setNeed([]);
        setSpecialization([]);

        setSelectProduct(e);
        setSelectIndication([]);
        setSelectProfile([]);
        setSelectNeed([]);
        setselectSpecialization([]);
        setSelectCompetitorComposition([]);

        FetchApiPost('api/OldSystem/GetIndicationsForContentByBrandIds', 'POST',{
            brandIds: `${e.value}`
        } ).then(res => {
            if(res.status === 200){
                res.json().then(data => (
                    setIndication(data.map(item => ({
                        value: item.IndicationId,
                        label: item.Indication
                    })))
                ))
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })
            // .then(res => (
            //     setIndication(res.map(item => ({
            //         value: item.IndicationId,
            //         label: item.Indication
            //     })))
            // ))

        
            FetchApiPost('api/OldSystem/GetCompetitorComposition', 'POST',{
                brandIds: `${e.value}`
            } ).then(res => {
                if(res.status === 200){
                    res.json().then(data => (
                        setCompetitorComposition(data.map(item => ({
                            value: item.CompetitorInnId,
                            label: item.CompetitorInnName
                        })))
                    ))
                } else if(res.status === 500){
                    history.push('/error-500');
                }
            })
                // .then(res => (
                //     setCompetitorComposition(res?.map(item => ({
                //         value       :   item.CompetitorInnId,
                //         label       :   item.CompetitorInnName
                //     })))
                // ))
    }

    const handleChangeIndication = (e) => {
        setProfile([]);
        setNeed([]);
        setSpecialization([]);

        setSelectIndication(e);
        setSelectProfile([]);
        setSelectNeed([]);
        setselectSpecialization([]);

        FetchApiPost('api/OldSystem/GetProfileForContentByIndicationId', 'POST',{
            brandIds: `${selectProduct.value}`,
            indicationIds: `${e.value}`
        } ).then(res => {
            if(res.status === 200){
                res.json().then(data => (
                    setProfile(data.map(item => ({
                        value: item.ProfileId,
                        label: item.Profile
                    })))
                ))
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })
            // .then(res => (
            //     setProfile(res.map(item => ({
            //         value: item.ProfileId,
            //         label: item.Profile
            //     })))
            // ))
    }

    const handleChangeProfile = (e) => {
        setNeed([]);
        setSpecialization([]);

        setSelectProfile(e);
        setSelectNeed([]);
        setselectSpecialization([]);

        FetchApiPost('services/Pages/Need/GetNeedsForDisadvantage', 'POST',{
            brandIds: [selectProduct.value],
            indicationIds: [selectIndication.value],
            profileIds: [e.value]
        } ).then(res => {
            if(res.status === 200){
                res.json().then(data => (
                    setNeed(data.data?.map(item => ({
                        value: item.id,
                        label: item.needName
                    })))
                ))
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })
            // .then(res => (
            //     setNeed(res.data?.map(item => ({
            //         value: item.id,
            //         label: item.needName
            //     })))
            // ))
    }

    const handleChangeNeed = (e) => {
        setSpecialization([]);

        setSelectNeed(e);
        setselectSpecialization([]);

        FetchApiPost('services/Pages/Need/GetNeedsSpecsByNeedIds', 'POST',{
            needIds: [e.value]
        } ).then(res => {
            if(res.status === 200){
                res.json().then(data => (
                    setSpecialization(data.data?.map(item => ({
                        value       :   item.specId,
                        label       :   item.specName,
                        SpecAbb     :   item.specAbb
                    }))),
                    setselectSpecialization(data.data?.map(item => ({
                        value       :   item.specId,
                        label       :   item.specName,
                        SpecAbb     :   item.specAbb
                    })))
                ))
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })
            // .then(res => (
            //     setSpecialization(res.data?.map(item => ({
            //         value       :   item.specId,
            //         label       :   item.specName,
            //         SpecAbb     :   item.specAbb
            //     }))),
            //     setselectSpecialization(res.data?.map(item => ({
            //         value       :   item.specId,
            //         label       :   item.specName,
            //         SpecAbb     :   item.specAbb
            //     })))
            // ))
    }

    const handleChangeSpecialization = (e) => {
        setselectSpecialization(e);
        
    }

    const handleChangeCompetitorComposition = (e) => {
        setSelectCompetitorComposition(e);
    }

    const addDisadvantages = () => {
        const spec = selectSpecialization.map(item => item.value)
        const specStr = spec.join(',');

        const comp = selectCompetitorComposition.map(item => item.value)
        const compStr = comp.join(',');

        FetchApiPost('services/Pages/Disadvantage/CreateDisadvantage', 'POST', {
            disadvantageName: disadvantagesName.trim(),
            productId: selectProduct.value,
            productName: selectProduct.label,
            indicationId: selectIndication.value,
            indicationName: selectIndication.label,
            profileId: selectProfile.value,
            profileName: selectProfile.label,
            specIds: specStr,
            competitorInnIds: compStr,
            needId: selectNeed.value,
            createdBy: localStorage.getItem('userName')
        }).then(res => {
            if(res.status === 201){
                setHandleAddNewDisadvantages(true);
                setIsShow(false);
            }else if(res.status === 500){
                history.push('/error-500');
            }
        })
    }

    return (
        <>
            <Modal show={isShow} onHide={toggle} size={'md'} >
                <Modal.Header onHide={toggle} closeButton style={{ backgroundColor: '#FFFFFF', color: '#000000' }} >
                    <h4
                        className="modal-title"
                        style={{
                            color: '#7A7A7A',
                            font: '18px',
                        }}
                    >
                        {t('Add Disadvantages')}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <div className='mb-3' >
                        <SelectLabels
                            options={product}
                            disabled={false}
                            multi={false}
                            value={selectProduct}
                            change={(e) => handleChangeProduct(e)}
                            headerName='Product'
                        />

                        <SelectLabels
                            options={indication}
                            disabled={false}
                            multi={false}
                            value={selectIndication}
                            change={(e) => handleChangeIndication(e)}
                            headerName='Indication'
                        />

                        <SelectLabels
                            options={profile}
                            disabled={false}
                            multi={false}
                            value={selectProfile}
                            change={(e) => handleChangeProfile(e)}
                            headerName='Profile'
                        />
                        <Row>
                            <Col md={7}>
                                <SelectLabels
                                    options={need}
                                    disabled={false}
                                    multi={false}
                                    value={selectNeed}
                                    change={(e) => handleChangeNeed(e)}
                                    headerName='Need'
                                />
                            </Col>

                            <Col md={5}>
                                <MultiSelectLabels
                                    options={specialization}
                                    change={(e) => handleChangeSpecialization(e)}
                                    headerName={'Specialization'}
                                    value={selectSpecialization}
                                />
                            </Col>
                        </Row>

                        <MultiSelectLabels
                            options={competitorComposition}
                            disabled={false}
                            value={selectCompetitorComposition}
                            change={(e) => handleChangeCompetitorComposition(e)}
                            headerName='Competitor INN'
                        />

                        <FormInput
                            label={t("Disadvantage Name")}
                            type="textarea"
                            name="textarea"
                            rows="5"
                            containerClass={'mb-3'}
                            key="textarea"
                            onChange={(e) => setDisadvantagesName(e.target.value)}
                        />
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
                        className='btn-primary'
                        onClick={() => addDisadvantages()}
                        disabled={
                            selectProduct.length === 0 ||
                            selectIndication.length === 0 ||
                            selectProfile.length === 0 ||
                            selectNeed.length === 0 ||
                            disadvantagesName.trim().length === 0
                        }
                    >
                        {t('add')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddDisadvantagesModal