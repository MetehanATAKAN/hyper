import React, { useState, useEffect } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { FormInput } from '../../../../../components';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { SelectLabels } from '../../../../forms/Basic';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const UpdatePageList = ({ isShow, setIsShow, updatePageListData, setHandleAddNewPageList }) => {
    const { t } = useTranslation();

    const history = useHistory();

        // Product
        const [product, setProduct] = useState([]);
        const [selectProduct, setSelectProduct] = useState({ value: updatePageListData.productId, label: updatePageListData.productName });
    
        // Indication
        const [indication, setIndication] = useState([]);
        const [selectIndication, setSelectIndication] = useState({ value: updatePageListData.indicationId, label: updatePageListData.indicationName });
    
        // Profile
        const [profile, setProfile] = useState([]);
        const [selectProfile, setSelectProfile] = useState({ value: updatePageListData.profileId, label: updatePageListData.profileName });
    
        // Need
        const [need, setNeed] = useState([]);
        const [selectNeed, setSelectNeed] = useState({ value: updatePageListData.needId, label: updatePageListData.needName });
    
        // Disadvantage
        const [disadvantage, setDisadvantage] = useState([]);
        const [selectDisadvantage, setSelectDisadvantage] = useState({ value: updatePageListData.passportOfProductId, label: updatePageListData.passportOfProductName });

    const toggle = () => {
        setIsShow(false);
    }

    useEffect(() => {

        // Get indication
        FetchApiPost('api/OldSystem/GetIndicationsForContentByBrandIds', 'POST',{
            brandIds: `${updatePageListData.productId}`
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

        // get profile
        FetchApiPost('api/OldSystem/GetProfileForContentByIndicationId', 'POST',{
            BrandIds: updatePageListData.productId,
            IndicationIds: updatePageListData.indicationId
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

        // get need
        FetchApiPost('services/Pages/Need/GetNeedsForDisadvantage', 'POST',{
            brandIds: [updatePageListData.productId],
            indicationIds: [updatePageListData.indicationId],
            profileIds: [updatePageListData.profileId]
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

        // get disadvantage
        FetchApiGet(`services/Pages/Disadvantage/GetDisadvantageByNeedId?needId=${updatePageListData.needId}`, 'GET')
        .then(res => {
            if(res.status === 200){
                res.json().then(data => (
                    setDisadvantage(data.data?.map(item => ({
                        value       :   item.disadvantageId,
                        label       :   item.disadvantageName
                    })))
                ))
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })


    }, [updatePageListData, history])

    const handleChangeIndication = (e) => {
        setProfile([]);
        setNeed([]);
        setDisadvantage([]);

        setSelectIndication(e);
        setSelectProfile([]);
        setSelectNeed([]);
        setSelectDisadvantage([]);

        FetchApiPost('api/OldSystem/GetProfileForContentByIndicationId', 'POST',{
            BrandIds: selectProduct.value,
            IndicationIds: e.value
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

        FetchApiGet(`services/Pages/Disadvantage/GetDisadvantageByNeedId?needId=${e.value}`, 'GET')
            .then(res => {
            if(res.status === 200){
                res.json().then(data => (
                    setDisadvantage(data.data?.map(item => ({
                        value       :   item.disadvantageId,
                        label       :   item.disadvantageName
                    })))
                ))
            } else if(res.status === 500){
                history.push('/error-500');
            }
        })
    }



    const updateDisadvantages = () => {

        FetchApiPost('services/Pages/Disadvantage/UpdatePageForDisadvantage', 'POST', {
            contentId: updatePageListData.contentId,
            disadvantageId: selectDisadvantage.value,
            modifiedBy: localStorage.getItem('userName')
        }).then(res => {
            if(res.status === 201){
                setHandleAddNewPageList(true);
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
                        {t('Update Page List')}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <div className='mb-3' >
                        <SelectLabels
                            options={product}
                            disabled={true}
                            multi={false}
                            value={selectProduct}
                            headerName={t('Product')}
                        />

                        <SelectLabels
                            options={indication}
                            disabled={false}
                            multi={false}
                            value={selectIndication}
                            change={(e) => handleChangeIndication(e)}
                            headerName={t('Indication')}
                        />

                        <SelectLabels
                            options={profile}
                            disabled={false}
                            multi={false}
                            value={selectProfile}
                            change={(e) => handleChangeProfile(e)}
                            headerName={t('Profile')}
                        />

                                <SelectLabels
                                    options={need}
                                    disabled={false}
                                    multi={false}
                                    value={selectNeed}
                                    change={(e) => handleChangeNeed(e)}
                                    headerName={t('Need')}
                                />

                        <SelectLabels
                            options={disadvantage}
                            disabled={false}
                            multi={false}
                            value={selectDisadvantage}
                            change={(e) => setSelectDisadvantage(e)}
                            headerName={t('Disadvantage')}
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
                        className='btn-warning'
                        onClick={() => updateDisadvantages()}
                        disabled={
                            selectProduct.length === 0 ||
                            selectIndication.length === 0 ||
                            selectProfile.length === 0 ||
                            selectNeed.length === 0 ||
                            selectDisadvantage.length === 0
                        }
                    >
                        {t('update')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
  )
}

export default UpdatePageList