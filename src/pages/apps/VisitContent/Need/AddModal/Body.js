import React, { useState, useEffect } from 'react';
import { SingleSelects, MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { Button, Upload } from 'antd';
import 'antd/dist/antd.css';
import { useTranslation } from 'react-i18next';
import { mdiFileExcelOutline, mdiDeleteOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import FileError from './FileError';
import FailModal from '../../../../../components/FailModal';
import { toast, ToastContainer } from 'react-toastify';

const Body = ({ isClickAdd, setShowAddModal, setAddButtonDisableStatus, getFilterData, setIsClickAdd, companyIdForFilter }) => {
    const { t } = useTranslation();
    const history = useHistory();

    const [errorModalShow, setErrorModalShow] = useState(false);

    const [workPlaceHeader, setWorkPlaceHeader] = useState();

    const [clientTypeName, setClientTypeName] = useState();

    const [place, setPlace] = useState();
    const [placeOptions, setPlaceOptions] = useState([]);

    const [placeType, setPlaceType] = useState();
    const [placeTypeOptions, setPlaceTypeOptions] = useState([]);

    const [typeOfPriority, setTypeOfPriority] = useState();
    const [typeOfPriorityOptions, setTypeOfPriorityOptions] = useState([]);

    const [clientType, setClientType] = useState();
    const [clientTypeOptions, setClientTypeOptions] = useState([]);

    const [globalBrand, setGlobalBrand] = useState();
    const [globalBrandOptions, setGlobalBrandOptions] = useState([]);

    const [indication, setIndication] = useState();
    const [indicationOptions, setIndicationOptions] = useState([]);

    const [profile, setProfile] = useState();
    const [profileOptions, setProfileOptions] = useState([]);

    const [specialization, setSpecialization] = useState([]);
    const [specializationOptions, setSpecializationOptions] = useState([]);

    const [need, setNeed] = useState('');

    const [document, setDocument] = useState([]);

    const [failModal, setFailModal] = useState(false);
    const [failMessage, setFailMessage] = useState('');

    const removeFile = (file) => {
        setDocument(document.filter((item) => item.uid !== file.uid));
    };


    // -----------------------------------------

    // work place lerin header ını çekmek için
    useEffect(() => {
        if(!companyIdForFilter) return;
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForWorkPlace`, 'POST', {
            headerIds: [0],
            countryId: Number(localStorage.getItem('countryId')),
            companyId: companyIdForFilter
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    let arr = { pl: {}, pt: {}, tp: {} };
                    data.map((item, index) => {
                        if (item.abbrevation === 'PL') {
                            arr.pl = item;
                        }
                    });
                    data.map((item, index) => {
                        if (item.abbrevation === 'PT') {
                            arr.pt = item;
                        }
                    });
                    data.map((item, index) => {
                        if (item.abbrevation === 'PRT') {
                            arr.tp = item;
                        }
                    });
                    setWorkPlaceHeader(arr);
                });
            } else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            } else {
                setWorkPlaceHeader();
            }
        });
    }, [history, companyIdForFilter]);

    // work place optionları çekmke için
    useEffect(() => {
        if(workPlaceHeader){
            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.pl.id,
                countryId: Number(localStorage.getItem('countryId'))
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setPlaceOptions(data.map(item => ({ label: item.definationName, value: item.definationId })))
                        if(data.length === 1){
                            setPlace({ label: data[0].definationName, value: data[0].definationId })
                        }
                    })
                }
            })

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.pt.id,
                countryId: Number(localStorage.getItem('countryId'))
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setPlaceTypeOptions(data.map(item => ({ label: item.definationName, value: item.definationId })))
                        if(data.length === 1){
                            setPlaceType({ label: data[0].definationName, value: data[0].definationId })
                        }
                    })
                }
            })

            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.tp.id,
                countryId: Number(localStorage.getItem('countryId'))
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setTypeOfPriorityOptions(data.map(item => ({ label: item.definationName, value: item.definationId })))
                        if(data.length === 1){
                            setTypeOfPriority({ label: data[0].definationName, value: data[0].definationId })
                        }
                    })
                }
            })
        }else{
            setPlace();
            setPlaceOptions([]);
            setPlaceType();
            setPlaceTypeOptions([]);
            setTypeOfPriority();
            setTypeOfPriorityOptions([]);
        }
    }, [workPlaceHeader])

    // client type ın header ını çekmek için
    useEffect(() => {
        if(!companyIdForFilter) return;
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForClient`, 'POST', {
            headerIds: [0],
            countryId: Number(localStorage.getItem('countryId')),
            companyId: companyIdForFilter
        })
            .then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setClientTypeName(data)
                    })
                }else{
                    setClientTypeName()
                }
            })
    }, [companyIdForFilter])

        // client type optionları
        useEffect(() => {
            if(!clientTypeName) return;
            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                countryId: Number(localStorage.getItem('countryId')),
                id: clientTypeName[0].id
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setClientTypeOptions(data.map(item => ({ value: item.definationId, label: item.definationName})))
                        if(data.length === 1){
                            setClientType({ value: data[0].definationId, label: data[0].definationName})
                        }
                    })
                }
            })
        }, [history, clientTypeName])

    // ---------------------------------


    useEffect(() => {
        if(!place || !placeType || !typeOfPriority) return;
        FetchApiPost('services/Pages/Need/GetBrandsForNeedCreate', 'POST', {
            placeIds: [place.value],
            placeTypeIds: [placeType.value],
            typeOfPriorityIds: [typeOfPriority.value],
            clientTypeIds: clientType ? [clientType.value] : [0]
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setGlobalBrandOptions(data.map(item => ({ value: item.globalBrandId, label: item.globalBrandName })))
                    if(data.length === 1){
                        setGlobalBrand({ value: data[0].globalBrandId, label: data[0].globalBrandName })
                    }
                })
            }else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        })
    }, [history, place, placeType, typeOfPriority, clientType])

    useEffect(() => {
        if(!place || !placeType || !typeOfPriority || !globalBrand) return ;
        FetchApiPost('services/Pages/Need/GetIndicationsForNeedCreate', 'POST', {
            placeIds: [place.value],
            placeTypeIds: [placeType.value],
            typeOfPriorityIds: [typeOfPriority.value],
            clientTypeIds: clientType ? [clientType.value] : [0],
            brandIds: [globalBrand.value]
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setIndicationOptions(data.map(item => ({ label: item.indicationName, value: item.indicationId })))
                    if(data.length === 1){
                        setIndication({ value: data[0].indicationId, label: data[0].indicationName })
                    }
                })
            }else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        })
    }, [history, globalBrand])

    useEffect(() => {
        if(!place || !placeType || !typeOfPriority || !globalBrand || !indication) return ;
        FetchApiPost('services/Pages/Need/GetProfileForNeedCreate', 'POST', {
            placeIds: [place.value],
            placeTypeIds: [placeType.value],
            typeOfPriorityIds: [typeOfPriority.value],
            clientTypeIds: clientType ? [clientType.value] : [0],
            brandIds: [globalBrand.value],
            indicationIds: [indication.value]
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setProfileOptions(data.map(item => ({ label: item.profileName, value: item.profileId })))
                    if(data.length === 1){
                        setProfile({ value: data[0].profileId, label: data[0].profileName })
                    }
                })
            }else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        })
    }, [history, indication])

    useEffect(() => {
        if(!place || !placeType || !typeOfPriority || !globalBrand || !indication || !profile || !clientType) return ;
        FetchApiPost('services/Pages/Need/GetSpecForNeedCreate', 'POST', {
            placeIds: [place.value],
            placeTypeIds: [placeType.value],
            typeOfPriorityIds: [typeOfPriority.value],
            clientTypeIds: clientType ? [clientType.value] : [0],
            brandIds: [globalBrand.value],
            indicationIds: [indication.value],
            profileIds: [profile.value]
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setSpecializationOptions(data.map(item => ({ label: item.specName, value: item.specId })))
                    if(data.length === 1){
                        setSpecialization([{ value: data[0].specId, label: data[0].specName }])
                    }
                })
            }else if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        })
    }, [history, profile, clientType])


    useEffect(() => {
        if (
            place && placeType && typeOfPriority &&
            globalBrand &&
            indication &&
            profile &&
            need.trim().length > 0 &&
            document.length > 0
        ) {
            if(clientType){
                if(specialization.length > 0){
                    setAddButtonDisableStatus(false);
                }else{
                    setAddButtonDisableStatus(true);
                }
            }else{
                setAddButtonDisableStatus(false);
            }
        } else {
            setAddButtonDisableStatus(true);
        }
    }, [globalBrand, indication, profile, specialization, need, document, place, placeType, typeOfPriority, clientType]);

    useEffect(() => {
        if (isClickAdd) {
            const body = {
                placeId: place.value,
                placeName: place.label,
                placeTypeId: placeType.value,
                placeTypeName: placeType.label,
                typeofPriorityId: typeOfPriority.value,
                typeofPriorityName: typeOfPriority.label,
                clientTypeId: clientType ? clientType.value : 0,
                content: "", 
                needId: 0,
                needName: need.trim(),
                profileId: profile.value,
                languageIds: [],
                specializationIds: clientType ? specialization.map((spec) => spec.value) : [0],
                createdBy: localStorage.getItem('userName'),
            };

            FetchApiPost('services/Pages/Need/CreateNeed', 'POST', body).then((res) => {
                if (res.status === 201) {
                    res.json().then(({ data }) => {
                        sendFilse(data[0].id);
                    });
                } else if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                } else {
                    res.json().then(({ errors }) => {
                        setIsClickAdd(false);
                        setFailModal(true);
                        setFailMessage(errors[0]);
                    });
                }
            });
        }
    }, [history, isClickAdd]);

    const sendFilse = (id) => {
        if (document.length > 0) {
            const fd = new FormData();
            for (let index = 0; index < document.length; index++) {
                fd.append('files', document[index].originFileObj, `${id}╚${document[index].name}`);
            }

            // create the request
            const xhr = new XMLHttpRequest();

            // path to server would be where you'd normally post the form to
            xhr.open('POST', `http://178.18.200.171:5000/services/Pages/Need/AddFilesToNeed`, true);
            xhr.send(fd);

            xhr.onload = () => {
                setShowAddModal(false);
                getFilterData();
            };
        } else {
            setShowAddModal(false);
        }
    };

    const reg = new RegExp(/^[^<>%$&*!@#^(){}[\]~`+=|\\:;?/]*$/);
    const handleCheckUploadedFile = (file) => {
        let characterControl = false;
        for (let index = 0; index < file.length; index++) {
            if (file[index].name.includes('__') || !reg.test(file[index].name)) {
                characterControl = true;
                break;
            } else {
                let dotCount = 0;
                for (let x = 0; x < file[index].name.length; x++) {
                    if (file[index].name[x] === '.') {
                        dotCount++;
                    }
                }
                if (dotCount > 1) {
                    characterControl = true;
                    break;
                }
            }
        }
        if (characterControl) {
            setErrorModalShow(true);
        } else {
            setDocument(file);
        }
    };

    const beforeUpload = (file) => {
        const docTypeControl =
            file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'application/pdf';
        if (!docTypeControl) {
            toast.error(<>{file.name.length < 25 ? <>{file.name}</> : <>{file.name.slice(0, 22)}...</>} {t(`must be of png/jpg or pdf file type`)}</>, {
                position: 'top-center',
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: 'light',
            });
        }

        return docTypeControl || Upload.LIST_IGNORE;
    };


    const handleChangeSelect = (name) => {
        switch (name) {
            case 'place':
                setGlobalBrand();
                setGlobalBrandOptions([]);
                setIndication();
                setIndicationOptions([]);
                setProfile();
                setProfileOptions([]);
                setSpecialization([]);
                setSpecializationOptions([]);
                break;
            case 'place type':
                setGlobalBrand();
                setGlobalBrandOptions([]);
                setIndication();
                setIndicationOptions([]);
                setProfile();
                setProfileOptions([]);
                setSpecialization([]);
                setSpecializationOptions([]);
                break;
            case 'priority':
                setGlobalBrand();
                setGlobalBrandOptions([]);
                setIndication();
                setIndicationOptions([]);
                setProfile();
                setProfileOptions([]);
                setSpecialization([]);
                setSpecializationOptions([]);
                break;
            case 'client':
                setGlobalBrand();
                setGlobalBrandOptions([]);
                setIndication();
                setIndicationOptions([]);
                setProfile();
                setProfileOptions([]);
                setSpecialization([]);
                setSpecializationOptions([]);
                break;
            case 'brand':
                setIndication();
                setIndicationOptions([]);
                setProfile();
                setProfileOptions([]);
                setSpecialization([]);
                setSpecializationOptions([]);
                break;
            case 'indication':
                setProfile();
                setProfileOptions([]);
                setSpecialization([]);
                setSpecializationOptions([]);
                break;
            case 'profile':
                setSpecialization([]);
                setSpecializationOptions([]);
                break;
            default:
                break;
        }
    }

    return (
        <div className="visit-content-need-add">
            <ToastContainer />

            <div style={{ display: 'grid', columnGap: '1rem', gridTemplateColumns: '1fr 1fr'}}>
                <SingleSelects
                    label={workPlaceHeader?.pl ? workPlaceHeader?.pl?.headerName: "place"}
                    width={'217px'}
                    options={placeOptions}
                    selectedItems={place}
                    setSelectedItems={setPlace}
                    isStar={true}
                    handleChange={() => handleChangeSelect('place')}
                />
                <SingleSelects
                    label={workPlaceHeader?.pt ? workPlaceHeader?.pt?.headerName: "place type"}
                    width={'217px'}
                    options={placeTypeOptions}
                    selectedItems={placeType}
                    setSelectedItems={setPlaceType}
                    isStar={true}
                    handleChange={() => handleChangeSelect('place type')}
                />
            </div>

            <div style={{ display: 'grid', columnGap: '1rem', gridTemplateColumns: '1fr 1fr'}}>
                <SingleSelects
                    label={workPlaceHeader?.tp ? workPlaceHeader?.tp?.headerName: "type of priority"}
                    width={'217px'}
                    options={typeOfPriorityOptions}
                    selectedItems={typeOfPriority}
                    setSelectedItems={setTypeOfPriority}
                    isStar={true}
                    handleChange={() => handleChangeSelect('priority')}
                />
                <SingleSelects
                    label={clientTypeName ? clientTypeName[0].headerName : 'client type'}
                    width={'217px'}
                    options={clientTypeOptions}
                    selectedItems={clientType}
                    setSelectedItems={setClientType}
                    handleChange={() => handleChangeSelect('client')}
                />
            </div>


            <SingleSelects
                label="global brand"
                width={'100%'}
                options={globalBrandOptions}
                selectedItems={globalBrand}
                setSelectedItems={setGlobalBrand}
                isStar={true}
                handleChange={() => handleChangeSelect('brand')}
            />

            <SingleSelects
                label="indication"
                width={'100%'}
                options={indicationOptions}
                selectedItems={indication}
                setSelectedItems={setIndication}
                isStar={true}
                handleChange={() => handleChangeSelect('indication')}
            />

            <SingleSelects
                label="profile"
                width={'100%'}
                options={profileOptions}
                selectedItems={profile}
                setSelectedItems={setProfile}
                isStar={true}
                handleChange={() => handleChangeSelect('profile')}
            />

            <MultipleSelects
                label="specialization"
                width={'100%'}
                options={specializationOptions}
                selectedItems={specialization}
                setSelectedItems={setSpecialization}
                isStar={clientType ? true : false}
                disabled={clientType ? false : true}
            />

            <NewTextArea label="need" width={'100%'} value={need} setValue={setNeed} isStar={true} placeholder="need" />

            <label>
                {t('reference document')}
                <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="visit-content-need-add__file-upload">
                <Upload multiple={true} onChange={(e) => handleCheckUploadedFile(e.fileList)} fileList={document} beforeUpload={beforeUpload}>
                    <Button style={{ color: '#6c757d' }}>{t('file upload')}</Button>
                </Upload>
                <label>{t('not selected')}</label>
            </div>

            {document.length > 0 && (
                <div className="visit-content-need-add__files">
                    {document.map((item, index) => (
                        <div className="visit-content-need-add__files-container">
                            <div className="visit-content-need-add__files-item">
                                <div className="visit-content-need-add__files-item-icon">
                                    <Icon path={mdiFileExcelOutline} size={1} />
                                </div>
                                <div className="visit-content-need-add__files-item-name">{item.name}</div>
                            </div>
                            <div className="visit-content-need-add__files-item-delete" onClick={() => removeFile(item)}>
                                <Icon path={mdiDeleteOutline} size={1} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {errorModalShow && <FileError modalShow={errorModalShow} setModalShow={setErrorModalShow} />}
            {failModal && <FailModal modalShow={failModal} setModalShow={setFailModal} error={failMessage} />}
        </div>
    );
};

export default Body;
