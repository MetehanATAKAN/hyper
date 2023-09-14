import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { statusControl } from '../../../../../components/Function/StatusCheck';
import { NewInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import { MultipleSelects, SingleSelects } from '../../../../../components/GlobalNew/Selects';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';

const UpdateNeed = ({ isShow, setIsShow, needFilter, updateData }) => {
    const { t } = useTranslation();
    console.log(updateData);
    const history = useHistory();
    const [modal, setModal] = useState(true);
    const toggle = () => {
        setIsShow(false);
    };
    // Product
    const [product, setProduct] = useState([]);
    const [selectProduct, setSelectProduct] = useState();

    // Indication
    const [indication, setIndication] = useState([]);
    const [selectIndication, setSelectIndication] = useState([]);

    // Profile
    const [profile, setProfile] = useState([]);
    const [selectProfile, setSelectProfile] = useState([]);

    // Specialization
    const [specialization, setSpecialization] = useState([]);
    const [selectSpecialization, setselectSpecialization] = useState([]);

    // Need Name
    const [needName, setNeedName] = useState('');
    // Content
    const [content, setContent] = useState('');
    useEffect(() => {
        setSelectProduct({ value: updateData.productId, label: updateData.productName });
        setSelectIndication(updateData.indications?.map((obj) => ({ value: obj.indicationId, label: obj.indication })));
        setSelectProfile(updateData.profiles?.map((obj) => ({ value: obj.profileId, label: obj.profile })));
        setselectSpecialization(updateData.specializations?.map((obj) => ({ value: obj.specId, label: obj.specName })));
        setNeedName(updateData.needName);
        setContent(updateData.content);
    }, [updateData]);

    const [status, setStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
        { id: 4, status: 'default' },
        { id: 5, status: 'default' },
    ]);
    useEffect(() => {
        if (modal === true) {
            FetchApiGet('services/Pages/Page/GetGlobalBrandList', 'GET').then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(({ data }) => {
                                return setProduct(
                                    data.map((item) => ({
                                        value: item.globalBrandId,
                                        label: item.globalBrandName,
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
    }, [history, modal]);
    useEffect(() => {
        if (selectProduct) {
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
        if (selectProduct && selectIndication.length !== 0) {
            const indicationId = selectIndication.map((item) => item.value);
            const indicationStr = indicationId.join(',');
            const profileBody = {
                BrandIds: String(selectProduct.value),
                IndicationIds: indicationStr,
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
        if (selectProduct && selectIndication.length !== 0 && selectProfile.length !== 0) {
            const indicationId = selectIndication.map((item) => item.value);
            const indicationStr = indicationId.join(',');
            const profileId = selectProfile.map((item) => item.value);
            const profileStr = profileId.join(',');
            const specBody = {
                BrandIds: String(selectProduct.value),
                indicationIds: indicationStr,
                profileIds: profileStr,
            };
            FetchApiPost('api/OldSystem/GetSpecsForContent', 'POST', specBody).then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((data) => {
                                return (
                                    setSpecialization(
                                        data?.map((data) => ({
                                            value: data.SpecId,
                                            label: data.SpecAbb,
                                        }))
                                    ),
                                    setselectSpecialization(
                                        data?.map((data) => ({
                                            value: data.SpecId,
                                            label: data.SpecAbb,
                                        }))
                                    )
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
    const addNeed = () => {
        const condition = [
            !selectProduct ? true : false,
            selectIndication.length === 0,
            selectProfile.length === 0,
            selectSpecialization.length === 0,
            needName === '',
            content === '',
        ];
        statusControl(condition, status, setStatus);
        if (condition.some((x) => x === true)) return;
        const addNeedBody = {
            id: updateData.id,
            productId: selectProduct.value,
            productName: selectProduct.label,
            indicationIds: selectIndication?.map((x) => x.value),
            profileIds: selectProfile?.map((x) => x.value),
            specIds: selectSpecialization?.map((item) => item.value),
            needName: needName,
            content: content,
            modifiedBy: localStorage.getItem('userName'),
        };
        FetchApiPost('services/Pages/Need/UpdateNeed', 'POST', addNeedBody).then((res) =>
            (async () => {
                try {
                    if (res.status === 201) {
                        setIsShow(false);
                        needFilter();
                    } else if (res.status === 500) {
                        history.push('/error-500');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    };
    const handleChange = (value, label, name) => {
        switch (name) {
            case 'product':
                setSelectIndication([]);
                setSelectProfile([]);
                setselectSpecialization([]);
                return setSelectProduct(label);
            case 'indication':
                setSelectProfile([]);
                setselectSpecialization([]);
                return setSelectIndication(label);
            case 'profile':
                setselectSpecialization([]);
                return setSelectProfile(label);
            case 'specialization':
                return setselectSpecialization(label);
            default:
                break;
        }
    };
    const clearAll = (name) => {
        switch (name) {
            case 'indication':
                setSelectIndication([]);
                setSelectProfile([]);
                setselectSpecialization([]);
                break;
            case 'profile':
                setSelectProfile([]);
                setselectSpecialization([]);
                break;
            case 'specialization':
                return setselectSpecialization([]);
            default:
                break;
        }
    };
    return (
        <>
            <GlobalModal
                showModal={isShow}
                setShowModal={setIsShow}
                toggle={toggle}
                header={t('Update Need')}
                body={
                    <div className="mb-3">
                        <SingleSelects
                            label="product"
                            isStar={true}
                            selectedItems={selectProduct}
                            setSelectedItems={() => {}}
                            options={product}
                            status={status[0].status}
                            handleChange={(value, label) => handleChange(value, label, 'product')}
                            placeholder="product"
                            width="100%"
                            disabled={true}
                        />
                        <MultipleSelects
                            label="indication"
                            isStar={true}
                            selectedItems={selectIndication}
                            setSelectedItems={() => {}}
                            allSelect={() => setSelectIndication(indication)}
                            allClear={() => clearAll('indication')}
                            options={indication}
                            status={status[1].status}
                            placeholder="indication"
                            width="100%"
                            handleChange={(value, label) => handleChange(value, label, 'indication')}
                        />

                        <MultipleSelects
                            label="profile"
                            isStar={true}
                            selectedItems={selectProfile}
                            setSelectedItems={() => {}}
                            options={profile}
                            status={status[2].status}
                            placeholder="profile"
                            width="100%"
                            handleChange={(value, label) => handleChange(value, label, 'profile')}
                            allSelect={() => setSelectProfile(profile)}
                            allClear={() => clearAll('profile')}
                        />
                        <MultipleSelects
                            label="specialization"
                            isStar={true}
                            selectedItems={selectSpecialization}
                            setSelectedItems={() => {}}
                            options={specialization}
                            status={status[3].status}
                            placeholder="specialization"
                            width="100%"
                            handleChange={(value, label) => handleChange(value, label, 'specialization')}
                            allSelect={() => setselectSpecialization(specialization)}
                            allClear={() => clearAll('specialization')}
                        />

                        <NewInput
                            label="need name"
                            placeholder="need name"
                            value={needName}
                            setValue={setNeedName}
                            isStar={true}
                            width="100%"
                            isUpperCase={true}
                            status={status[4].status}
                        />
                        <NewTextArea
                            label="content"
                            placeholder="content"
                            value={content}
                            setValue={setContent}
                            isStar={true}
                            width="100%"
                            status={status[5].status}
                        />
                    </div>
                }
                footer={
                    <>
                        <Button className="btn-light" style={{ backgroundColor: '#EBEBEB' }} onClick={toggle}>
                            {t('cancel')}
                        </Button>
                        <Button className="btn-warning" onClick={addNeed}>
                            {t('update')}
                        </Button>
                    </>
                }
            />
        </>
    );
};

export default UpdateNeed;
