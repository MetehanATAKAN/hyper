import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { SelectLabels } from '../../../../forms/Basic';
import { useTranslation } from 'react-i18next';

const Update = (props) => {
    const { showModal, setShowModal, setBrochuries, brochuries, contentId, applyFilter } = props;
    const history = useHistory();
    const { t } = useTranslation();
    const dispacth = useDispatch();
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setShowModal(!showModal);
    };
    //Updateable data
    const [updateData, setUpdateData] = useState([]);
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
    // Change Select
    const changeSelect = (selectName, e) => {
        switch (selectName) {
            case 'product':
                setSelectProduct(e);
                setSelectIndication([]);
                setSelectProfile([]);
                setSelectNeed([]);
                break;
            case 'indication':
                setSelectIndication(e);
                setSelectProfile([]);
                setSelectNeed([]);
                break;
            case 'profile':
                setSelectProfile(e);
                setSelectNeed([]);
                break;
            case 'need':
                setSelectNeed(e);
                break;
            default:
                break;
        }
    };
    console.log(selectNeed);
    useEffect(() => {
        const findData = brochuries?.find((el) => el.contentId === Number(contentId));
        if (findData) {
            setSelectProduct({ id: findData.productId, value: findData.productName, label: findData.productName });
            setSelectIndication({
                id: findData.indicationId,
                value: findData.indicationName,
                label: findData.indicationName,
            });
            setSelectProfile({ id: findData.profileId, value: findData.profileName, label: findData.profileName });
            setSelectNeed({
                id: findData.passportOfProductId,
                value: findData.passportOfProductName,
                label: findData.passportOfProductName,
            });
        }
    }, [brochuries, contentId]);
    const UpdateNeed = () => {
        const body = {
            contentId: Number(contentId),
            brandId: Number(selectProduct.id),
            brandName: selectProduct.value,
            indicationId: Number(selectIndication.id),
            indicationName: selectIndication.value,
            profileId: Number(selectProfile.id),
            profileName: selectProfile.value,
            passportOfProductType: Number(selectNeed.id),
            passportOfProductId: Number(selectNeed.id),
            passportOfProductName: selectNeed.value,
            needId: 0,
            needName: '',
            isArchived: false,
            modifiedBy: localStorage.getItem('userName'),
        };

        FetchApiPost('services/Pages/ProductPage/UpdateContentTemplate', 'POST', body).then((res) =>
            (async () => {
                try {
                    if (res.status === 201) {
                        applyFilter();
                        setShowModal(false);
                    } else if (res.status === 500) {
                        history.push('/error-500');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    };

    useEffect(() => {
        if (showModal === true) {
            FetchApiGet('services/Pages/Page/GetGlobalBrandList', 'GET').then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((data) => {
                                return setProduct(
                                    data.data.map((data) => ({
                                        value: data.globalBrandName,
                                        label: data.globalBrandName,
                                        id: data.globalBrandId,
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
                BrandIds: String(selectProduct.id),
            };
            FetchApiPost('api/OldSystem/GetIndicationsForContentByBrandIds', 'POST', body).then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((data) => {
                                return setIndication(
                                    data.map((data) => ({
                                        id: data.IndicationId,
                                        value: data.Indication,
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
                BrandIds: selectProduct.id,
                IndicationIds: selectIndication.id,
            };
            FetchApiPost('api/OldSystem/GetProfileForContentByIndicationId ', 'POST', profileBody).then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((data) => {
                                return setProfile(
                                    data.map((data) => ({
                                        value: data.Profile,
                                        label: data.Profile,
                                        id: data.ProfileId,
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
                brandId: selectProduct.id,
                indicationId: selectIndication.id,
                profileId: selectProfile.id,
            };

            FetchApiPost('services/Pages/Benefit/GetNeedsByContentCreationDatas', 'POST', needBody).then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((data) => {
                                return setNeed(
                                    data.data.map((data) => ({
                                        id: data.needId,
                                        value: data.needName,
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
                        {t('Update need')}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <SelectLabels
                            options={product}
                            disabled={true}
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
                        className="btn-warning"
                        disabled={
                            selectProduct !== '' && selectIndication !== '' && selectProfile !== '' && selectNeed !== ''
                                ? false
                                : true
                        }
                        onClick={UpdateNeed}>
                        {t('Update')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default React.memo(Update);
