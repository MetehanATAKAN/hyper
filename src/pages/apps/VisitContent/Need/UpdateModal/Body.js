import React, { useState, useEffect } from 'react';
import { SingleSelects, MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { Button, Upload } from 'antd';
import 'antd/dist/antd.css';
import { useTranslation } from 'react-i18next';
import { mdiFileExcelOutline, mdiDeleteOutline, mdiDownload } from '@mdi/js';
import Icon from '@mdi/react';
import { useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import FileError from './FileError';

import FailModal from '../../../../../components/FailModal';
import { toast, ToastContainer } from 'react-toastify';

const Body = ({ selectedItem, isClickAdd, getFilterData, setShowAddModal, setAddButtonDisableStatus, setIsClickAdd, BrandOptions, companyIdForFilter }) => {
    const { t } = useTranslation();
    const history = useHistory();

    const disabledSelects = selectedItem.item.usedBenefitIds.length > 0;

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

    const [globalBrand, setGlobalBrand] = useState({ value: selectedItem.item.brand.globalBrandId, label: selectedItem.item.brand.globalBrandName });
    const [globalBrandOptions, setGlobalBrandOptions] = useState([...BrandOptions]);

    const [indication, setIndication] = useState({ value: selectedItem.item.indication.indicationId, label: selectedItem.item.indication.indication });
    const [indicationOptions, setIndicationOptions] = useState([]);

    const [profile, setProfile] = useState({ value: selectedItem.item.profile.id, label: selectedItem.item.profile.profileName });
    const [profileOptions, setProfileOptions] = useState([]);

    const [specialization, setSpecialization] = useState(selectedItem.item.specializations.map((item) => ({ value: item.specId, label: item.specName })));
    const [specializationOptions, setSpecializationOptions] = useState([]);

    const [need, setNeed] = useState(selectedItem.item.needName);

    const [document, setDocument] = useState([]);

    const [failModal, setFailModal] = useState(false);
    const [failMessage, setFailMessage] = useState('');

    const removeFile = (file) => {
       setDocument(document.filter((item) => item.uid !== file.uid));
    }

    useEffect(() => {
        setDocument(selectedItem.item.documents.map(doc => {
            return {
                uid: (doc.split("__")[0]),
                name: doc.split("__")[1]
            }
        }))
    }, [selectedItem])

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
        if(workPlaceHeader && selectedItem){
            FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
                id: workPlaceHeader.pl.id,
                countryId: Number(localStorage.getItem('countryId'))
            }).then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setPlaceOptions(data.map(item => ({ label: item.definationName, value: item.definationId })))
                        let d = data.find(i => i.definationId === selectedItem.item.placeId)
                        setPlace({ value: d.definationId, label: d.definationName })
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
                        let d = data.find(i => i.definationId === selectedItem.item.placeTypeId)
                        setPlaceType({ value: d.definationId, label: d.definationName })
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
                        let d = data.find(i => i.definationId === selectedItem.item.typeOfPriorityId)
                        setTypeOfPriority({ value: d.definationId, label: d.definationName })
                    })
                }
            })
        }
    }, [workPlaceHeader, selectedItem])

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
    if(!clientTypeName || !selectedItem) return;
    FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderId', 'POST', {
        countryId: Number(localStorage.getItem('countryId')),
        id: clientTypeName[0].id
    }).then(res => {
        if(res.status === 200){
            res.json().then(({ data }) => {
                setClientTypeOptions(data.map(item => ({ value: item.definationId, label: item.definationName})))
                let d = data.find(i => i.definationId === selectedItem.item.clientTypeId)
                if(d){
                    setClientType({ value: d.definationId, label: d.definationName })
                }
            })
        }
    })
}, [history, clientTypeName, selectedItem])

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
        if(!place || !placeType || !typeOfPriority || !globalBrand || !selectedItem) return ;
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
    }, [history, globalBrand, selectedItem, place, placeType, typeOfPriority, clientType])

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
        if(isClickAdd){
            const body = {
                id: Number(selectedItem.id),
                placeId: place.value,
                placeTypeId: placeType.value,
                typeofPriorityId: typeOfPriority.value,
                clientTypeId: clientType ? clientType.value : 0,
                needName: need.trim(),
                profileId: profile.value,
                languageId: selectedItem.item.language.languageAbbId,
                isApproved: selectedItem.item.approveStatus,
                rejectReason: selectedItem.item.rejectReason || '',
                specializationIds: clientType ? specialization.map(item => item.value) : [0],
                modifiedBy: localStorage.getItem('userName'),
                validStatus: selectedItem.item.validStatus,
            }
            FetchApiPost('services/Pages/Need/UpdateNeed', 'POST', body)
                .then(res => {
                    if(res.status === 201){
                        res.json().then(({data}) => {
                            getFilterData()
                            setShowAddModal(false)
                            handleUpdateDocument()
                        })
                    }else if(res.status === 500 || res.status === 502){
                        history.push('/error-500');
                    }else{
                        res.json().then(({errors}) => {
                            setIsClickAdd(false);
                            setFailModal(true);
                            setFailMessage(errors[0])
                        })
                    }
                })
        }
    }, [isClickAdd])

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


    const reg = new RegExp(/^[^<>%$&*!@#^(){}[\]~`+=|\\:;?/]*$/);
    const handleCheckUploadedFile = (file) => {
        let characterControl = false;
        for(let index = 0; index < file.length; index++){
            if(file[index].name.includes('__') || !reg.test(file[index].name)){
                characterControl = true;
                break;
            }else{
                let dotCount = 0;
                for (let x = 0; x < file[index].name.length; x++) {
                    if(file[index].name[x] === '.'){
                        dotCount++;
                    }
                }
                if(dotCount > 1){
                    characterControl = true;
                    break;
                }
            }
        }
        if(characterControl){
            setErrorModalShow(true);
        }else{
            setDocument(file);
        }
    }

    const handleUpdateDocument = () => {
        const fd = new FormData();
            for (let index = 0; index < document.length; index++) {
                if(document[index].originFileObj){
                    fd.append('files', document[index].originFileObj, `${selectedItem.item.id}╚${document[index].name}`);
                }else{
                    let file = new File([document[index]], `${selectedItem.item.id}╚${document[index].uid}__${document[index].name}`);
                    fd.append('files', file, `${selectedItem.item.id}╚${document[index].uid}__${document[index].name}`);
                }
                
            }

            // create the request
            const xhr = new XMLHttpRequest();
           

            // path to server would be where you'd normally post the form to
            xhr.open(
                'POST',
                `http://178.18.200.171:5000/services/Pages/Need/UpdateFilesToNeed`,
                true
            )
            xhr.send(fd);

            xhr.onload = () => {
                setShowAddModal(false)
                getFilterData();
            };
     }

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
                    disabled={true}
                />
                <SingleSelects
                    label={workPlaceHeader?.pt ? workPlaceHeader?.pt?.headerName: "place type"}
                    width={'217px'}
                    options={placeTypeOptions}
                    selectedItems={placeType}
                    setSelectedItems={setPlaceType}
                    isStar={true}
                    handleChange={() => handleChangeSelect('place type')}
                    disabled={true}
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
                    disabled={true}
                />
                <SingleSelects
                    label={clientTypeName ? clientTypeName[0].headerName : 'client type'}
                    width={'217px'}
                    options={clientTypeOptions}
                    selectedItems={clientType}
                    setSelectedItems={setClientType}
                    handleChange={() => handleChangeSelect('client')}
                    disabled={true}
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
                disabled={disabledSelects}
            />

            <SingleSelects
                label="indication"
                width={'100%'}
                options={indicationOptions}
                selectedItems={indication}
                setSelectedItems={setIndication}
                isStar={true}
                handleChange={() => handleChangeSelect('indication')}
                disabled={disabledSelects}
            />

            <SingleSelects
                label="profile"
                width={'100%'}
                options={profileOptions}
                selectedItems={profile}
                setSelectedItems={setProfile}
                isStar={true}
                handleChange={() => handleChangeSelect('profile')}
                disabled={disabledSelects}
            />

            <MultipleSelects
                label="specialization"
                width={'100%'}
                options={specializationOptions}
                selectedItems={specialization}
                setSelectedItems={setSpecialization}
                isStar={clientType ? true : false}
                disabled={disabledSelects ? true : !clientType ? true : false}
            />

            <NewTextArea label="need" width={'100%'} value={need} setValue={setNeed} isStar={true} placeholder="need" />

            <label>{t('reference document')}<span style={{color: 'red'}}>*</span></label>
            <div className="visit-content-need-add__file-upload">
                <Upload multiple={true} onChange={(e) => handleCheckUploadedFile(e.fileList)} fileList={document} beforeUpload={beforeUpload}>
                    <Button style={{ color: '#6c757d' }}>
                        {t('file upload')}
                    </Button>
                </Upload>
                <label>{t('not selected')}</label>
            </div>

            {
                document.length > 0 && (
                    <div className='visit-content-need-add__files'>
                        {
                            document.map((item, index) => (
                                <div className='visit-content-need-add__files-container'>
                                    <div className='visit-content-need-add__files-item'>
                                        <div className='visit-content-need-add__files-item-icon'>
                                            <Icon path={mdiFileExcelOutline} size={1} />
                                        </div>
                                        <div className='visit-content-need-add__files-item-name'>
                                            {item.name}
                                        </div>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                    {item.uid.charAt(0) !== 'r' && (
                                                    // eslint-disable-next-line react/jsx-no-target-blank
                                                    <a
                                                        href={`http://178.18.200.171:5017/NeedFiles/${item.uid}__${item.name}`}
                                                        target="_blank"
                                                        download={item.name}
                                                        className="visit-content-need-add__files-item-download">
                                                        <Icon path={mdiDownload} size={1} />
                                                    </a>
                                                )}
                                    <button className='visit-content-need-add__files-item-delete'
                                     onClick={() => removeFile(item)}
                                     style={{ border: 'none', backgroundColor: 'transparent' }}
                                     >
                                        <Icon path={mdiDeleteOutline} size={1} />
                                    </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }

            {
                errorModalShow && (
                    <FileError 
                        modalShow={errorModalShow}
                        setModalShow={setErrorModalShow}
                    />
                )
            }
            {failModal && <FailModal modalShow={failModal} setModalShow={setFailModal} error={failMessage} />}
        </div>
    );
};

export default Body;
