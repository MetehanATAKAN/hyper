import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { needTab } from '../../../../../redux/actions';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { SelectLabels } from '../../../../forms/Basic';
import { useTranslation } from 'react-i18next';

const NewButton = ({ showModal, setShowModal, setBrochuries, brochuries }) => {
    const history = useHistory();
    const dispacth = useDispatch();
    const [modal, setModal] = useState(false);
    const { t } = useTranslation();
    const toggle = () => {
        setShowModal(!showModal);
    };

    // Product
    const [product, setProduct] = useState([]);
    const [selectProduct, setSelectProduct] = useState('');

    // Indication
    const [indication, setIndication] = useState([]);
    const [selectIndication, setSelectIndication] = useState('');

    // Profile
    const [profile, setProfile] = useState([]);
    const [selectProfile, setSelectProfile] = useState('');

    // Need
    const [need, setNeed] = useState([]);
    const [selectNeed, setSelectNeed] = useState('');
    console.log(selectNeed);

    //Benfit
    const [benefit, setBenefit] = useState([]);
    const [selectBenefit, setSelectBenefit] = useState('');

    // Change Select

    const changeSelect = (selectName, e) => {
        switch (selectName) {
            case 'product':
                return(
                    setSelectProduct(e),

                    setIndication([]),
                    setSelectIndication(''),

                    setProfile([]),
                    setSelectProfile(''),

                    setNeed([]),
                    setSelectNeed(''),

                    setBenefit([]),
                    setSelectBenefit('')
                )
            case 'indication':
                return(
                    setSelectIndication(e),

                    setProfile([]),
                    setSelectProfile(''),

                    setNeed([]),
                    setSelectNeed(''),

                    setBenefit([]),
                    setSelectBenefit('')

                )
            case 'profile':
                return(
                    setSelectProfile(e),

                    setNeed([]),
                    setSelectNeed(''),

                    setBenefit([]),
                    setSelectBenefit('')
                )
            case 'need':
                return(
                    setSelectNeed(e),

                    setBenefit([]),
                    setSelectBenefit('')
                )
            case 'benefit':
                return setSelectBenefit(e);

            default:
                break;
        }
    };

    // const addCreatePageForNeed = () => {
    //     const body = {
    //         ProductId: selectProduct.value,
    //         ProductName: selectProduct.label,
    //         ProductAbb: selectProduct.globalBrandAbb,
    //         IndicationId: selectIndication.value,
    //         IndicationName: selectIndication.label,
    //         ProfileId: selectProfile.value,
    //         ProfileName: selectProfile.label,
    //         SpecIds: selectNeed.specIds,
    //         PassportOfProductId: selectNeed.value,
    //         PassportOfProductName: selectNeed.label,
    //         CreatedBy: localStorage.getItem('userName'),
    //     };

    //     FetchApiPost('services/Pages/ProductPage/SavePageListForNeed', 'POST', body).then((res) =>
    //         (async () => {
    //             try {
    //                 if (res.status === 201) {
    //                     res.json().then((json) => setBrochuries((prev) => [...prev, json.data]));
    //                     setShowModal(false);
    //                     console.log(brochuries);
    //                 } else if (res.status === 500) {
    //                     history.push('/error-500');
    //                 }
    //             } catch (error) {
    //                 console.log('error', error);
    //             }
    //         })()
    //     );
    // };

    const addPageListItem = () => {

        const body = {
            ProductId                   :   selectProduct.value,    
            ProductName                 :   selectProduct.label,    
            ProductAbb                  :   selectProduct.globalBrandAbb,
            IndicationId                :   selectIndication.value,
            IndicationName              :   selectIndication.label,
            ProfileId                   :   selectProfile.value,
            ProfileName                 :   selectProfile.label,
            SpecIds                     :   selectNeed.specIds,
            PassportOfProductId         :   selectBenefit.value,
            PassportOfProductName       :   selectBenefit.label,
            NeedId                      :   selectNeed.value,
            NeedName                    :   selectNeed.label,
            CreatedBy                   :   localStorage.getItem('userName')
        }

        FetchApiPost('services/Pages/Benefit/SavePageListForBenefit','POST',body)
        .then((res) =>
                (async () => {
                    try {
                        if (res.status === 201) {
                            res.json().then(data => {
                                return(
                                    setBrochuries((prev) => [...prev, data.data]),
                                    setShowModal(false)
                                )
                                // return (
                                //     history.push({
                                //         pathname: '/apps/brochure/template/design',
                                //         search: `?id=${data.data.id}`,
                                //         // hash: "#react",
                                //         // state: { fromPopup: true }
                                //     })
                                // )
                            })
                        }
                        else {
                            console.log('hata');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }

    useEffect(() => {
        if (showModal === true) {
            FetchApiGet('services/Pages/Page/GetGlobalBrandList', 'GET').then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((data) => {
                                return setProduct(
                                    data.data.map((data) => ({
                                        value: data.globalBrandId,
                                        label: data.globalBrandName,
                                        globalBrandAbb: data.globalBrandAbb,
                                    }))
                                );
                            });
                        } else if (res.status === 500) {
                            history.push('/error-500');
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            );
        }
    }, [history, showModal]);

    useEffect(() => {
        if (selectProduct !== '') {
            const body = {
                BrandIds: String(selectProduct.value),
            };
            FetchApiPost('api/OldSystem/GetIndicationsForContentByBrandIds', 'POST', body).then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((data) => {
                                return setIndication(
                                    data.map((data) => ({
                                        value: data.IndicationId,
                                        label: data.Indication,
                                    }))
                                );
                            });
                        } else if (res.status === 500) {
                            history.push('/error-500');
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            );
        }
    }, [history, selectProduct]);

    useEffect(() => {
        if (selectProduct !== '' && selectIndication !== '') {
            const profileBody = {
                BrandIds: selectProduct.value,
                IndicationIds: selectIndication.value,
            };
            FetchApiPost('api/OldSystem/GetProfileForContentByIndicationId ', 'POST', profileBody).then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((data) => {
                                return setProfile(
                                    data.map((data) => ({
                                        value: data.ProfileId,
                                        label: data.Profile,
                                    }))
                                );
                            });
                        } else if (res.status === 500) {
                            history.push('/error-500');
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            );
        }
    }, [history, selectIndication, selectProduct]);

    useEffect(() => {
        if (selectProduct !== '' && selectIndication !== '' && selectProfile !== '') {
            const needBody = {
                brandId: selectProduct.value,
                indicationId: selectIndication.value,
                profileId: selectProfile.value,
            };

            FetchApiPost('services/Pages/Benefit/GetNeedsByContentCreationDatas', 'POST', needBody).then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((data) => {
                                return setNeed(
                                    data.data.map((data) => ({
                                        value: data.needId,
                                        label: data.needName,
                                        BrandId: data.brandId,
                                        BrandName: data.brandName,
                                        specIds: data.specIds,
                                    }))
                                );
                            });
                        } else if (res.status === 500) {
                            history.push('/error-500');
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            );
        }
    }, [history, selectIndication, selectProduct, selectProfile]);

    useEffect(() => {
        if (selectProduct !== '' && selectIndication !== '' && selectProfile !== '' && selectNeed !== '') {
            const needBody = {
                BrandId: selectProduct.value,
                IndicationId: selectIndication.value,
                ProfileId: selectProfile.value,
                NeedId:selectNeed.value
            };

            FetchApiPost('services/Pages/Benefit/GetBenefitsByContentCreationDatas', 'POST', needBody).then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((data) => {
                                return setBenefit(
                                    data.data.map(item =>({
                                        value:item.benefitId,
                                        label:item.benefitName
                                    }))
                                );
                            });
                        } else if (res.status === 500) {
                            history.push('/error-500');
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            );
        }
    }, [history, selectIndication, selectNeed, selectProduct, selectProfile])
    
    

    return (
        <>
            <Modal show={showModal} onHide={toggle} size={'md'}>
                <Modal.Header onHide={toggle} closeButton style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                    <h4
                        className="modal-title"
                        style={{
                            color: '#7A7A7A',
                            font: '18px',
                        }}>
                        {t('Create page for benefit')}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <SelectLabels
                            options={product}
                            disabled={false}
                            multi={false}
                            value={selectProduct}
                            change={(e) => changeSelect('product', e)}
                            headerName="product"
                        />

                        <SelectLabels
                            options={indication}
                            disabled={false}
                            multi={false}
                            value={selectIndication}
                            change={(e) => changeSelect('indication', e)}
                            headerName="indication"
                        />

                        <SelectLabels
                            options={profile}
                            disabled={false}
                            multi={false}
                            value={selectProfile}
                            change={(e) => changeSelect('profile', e)}
                            headerName="profile"
                        />

                        <SelectLabels
                            options={need}
                            disabled={false}
                            multi={false}
                            value={selectNeed}
                            change={(e) => changeSelect('need', e)}
                            headerName="need"
                        />

                        <SelectLabels
                            options={benefit}
                            disabled={false}
                            multi={false}
                            value={selectBenefit}
                            change={(e) => changeSelect('benefit', e)}
                            headerName="benefit"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#FAFBFE ' }}>
                    <Button
                        className="btn-light"
                        style={{ backgroundColor: '#EBEBEB' }}
                        onClick={() => setShowModal(false)}>
                        {t('cancel')}
                    </Button>
                    <Button
                        className="btn-primary"
                        disabled={
                            selectProduct !== '' && selectIndication !== '' && selectProfile !== '' && selectNeed !== '' && selectBenefit !== ''
                                ? false
                                : true
                        }
                        onClick={addPageListItem}>
                        {t('add')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewButton;
