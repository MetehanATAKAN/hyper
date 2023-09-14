import React, { useState, useEffect } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { FormInput } from '../../../../../components';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { MultiSelectLabels, SelectLabels } from '../../../../forms/Basic';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { disadvantageTab, setDisadvantageContentId } from '../../../../../redux/actions';

const CreatePageForNeedModal = ({ showModal, setShowModal }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const history = useHistory();

    const toggle = () => {
        setShowModal(false);
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

    // Need
    const [need, setNeed] = useState([]);
    const [selectNeed, setSelectNeed] = useState([]);

     // Disadvantage
     const [disadvantage, setDisadvantage] = useState([]);
     const [selectDisadvantage, setSelectDisadvantage] = useState([]);

    useEffect(() => {
        FetchApiGet('services/Pages/Page/GetGlobalBrandList', 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => (
                        setProduct(data.data.map(item => ({
                            value: item.globalBrandId,
                            label: item.globalBrandName
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
        setDisadvantage([]);

        setSelectProduct(e);
        setSelectIndication([]);
        setSelectProfile([]);
        setSelectNeed([]);
        setSelectDisadvantage([]);

        FetchApiPost('api/OldSystem/GetIndicationsForContentByBrandIds', 'POST',{
            BrandIds: `${e.value}`
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
        
            // FetchApiPost('api/OldSystem/GetCompetitorComposition', 'POST',{
            //     brandIds: `${e.value}`
            // } ).then(res => {
            //     if(res.status === 200){
            //         res.json().then(data => (
            //             setCompetitorComposition(data.map(item => ({
            //                 value: item.CompetitorInnId,
            //                 label: item.CompetitorInnName
            //             })))
            //         ))
            //     } else if(res.status === 500){
            //         history.push('/error-500');
            //     }
            // })
    }

    const handleChangeIndication = (e) => {
        setProfile([]);
        setNeed([]);
        setDisadvantage([]);

        setSelectIndication(e);
        setSelectProfile([]);
        setSelectNeed([]);
        setSelectDisadvantage([]);

        FetchApiPost('api/OldSystem/GetProfileForContentByIndicationId', 'POST',{
            BrandIds: `${selectProduct.value}`,
            IndicationIds: `${e.value}`
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
    }

    const handleChangeProfile = (e) => {
        setNeed([]);
        setDisadvantage([]);

        setSelectProfile(e);
        setSelectNeed([]);
        setSelectDisadvantage([]);

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
    }

    const handleChangeNeed = (e) => {
        setSelectNeed(e);
        setSelectDisadvantage([]);
        setDisadvantage([]);
        FetchApiGet(`services/Pages/Disadvantage/GetDisadvantageByNeedId?needId=${e.value}`, 'GET' ).then(res => {
            if(res.status === 200){
                res.json().then(data => (
                    setDisadvantage(data.data?.map(item => ({
                        value: item.disadvantageId,
                        label: item.disadvantageName
                    })))
                ))
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })

    }

    // const handleChangeCompetitorComposition = (e) => {
    //     setSelectCompetitorComposition(e);
    // }

    const createPageGallery = () => {
        
        FetchApiPost('services/Pages/Disadvantage/CreatePageForDisadvantage', 'POST', {
            disadvantageId: selectDisadvantage.value,
            createdBy: localStorage.getItem('userName')
        }).then(res => {
            if(res.status === 201){
                res.json().then(data => {
                    dispatch(setDisadvantageContentId(Number(data.data.contentId)));
                    localStorage.setItem('disadvantagePageListctId', Number(data.data.contentId));
                    dispatch(disadvantageTab('Templates'))
                    setShowModal(false);
                })
              
            }else if(res.status === 500){
                history.push('/error-500');
            }
        })
    }

  return (
    <Modal show={showModal} onHide={toggle} size={'md'} >
                <Modal.Header onHide={toggle} closeButton style={{ backgroundColor: '#FFFFFF', color: '#000000' }} >
                    <h4
                        className="modal-title"
                        style={{
                            color: '#7A7A7A',
                            font: '18px',
                        }}
                    >
                        {t('Create Page for Disadvantage')}
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

                        <SelectLabels
                            options={need}
                            disabled={false}
                            multi={false}
                            value={selectNeed}
                            change={(e) => handleChangeNeed(e)}
                            headerName='Need'
                        />

                        <SelectLabels
                            options={disadvantage}
                            disabled={false}
                            multi={false}
                            value={selectDisadvantage}
                            change={(e) => setSelectDisadvantage(e)}
                            headerName='Disadvantage'
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
                        onClick={() => createPageGallery()}
                        disabled={
                            selectProduct.length === 0 ||
                            selectIndication.length === 0 ||
                            selectProfile.length === 0 ||
                            selectNeed.length === 0 ||
                            selectDisadvantage.length === 0
                        }
                    >
                        {t('add')}
                    </Button>
                </Modal.Footer>
            </Modal>
  )
}

export default CreatePageForNeedModal