import React, { useState, useEffect } from 'react';
import { SingleSelects, MultipleSelects } from '../../../../../../components/GlobalNew/Selects';
import { NewTextArea, NewInput } from '../../../../../../components/GlobalNew/Inputs';
import { useTranslation } from 'react-i18next';
import { Divider, Upload, Button } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import { FetchApiGet, FetchApiPost } from '../../../../../../utils/http.helper';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import FileError from './FileError';

const Body = ({ modalPageNumber, setNextButtonDisableStatus, isClickAdd, setAddButtonDisableStatus, setIsClickAdd, setShowAddModal, applyFilter }) => {
    const { t } = useTranslation();

    const [errorModalShow, setErrorModalShow] = useState(false);

    const [partyType, setPartyType] = useState();
    const [partyTypeOptions, setPartyTypeOptions] = useState([]);

    

    const [buyerCountry, setBuyerCountry] = useState();
    const [buyerContractor, setBuyerContractor] = useState();
    const [buyerMainType, setBuyerMainType] = useState([]);
    const [buyerType, setBuyerType] = useState([]);
    const [buyerDutiesType, setBuyerDutiesType] = useState([]);
    const [buyerAssetsType, setBuyerAssetsType] = useState([]);
    const [buyerMaterialUsage, setBuyerMaterialUsage] = useState([]);

    const [buyerCountryOptions, setBuyerCountryOptions] = useState([]);
    const [buyerContactorCompanyAllOptions, setBuyerContactorCompanyAllOptions] = useState([]);
    const [buyerContractorOptions, setBuyerContractorOptions] = useState([]);
    const [buyerMainTypeOptions, setBuyerMainTypeOptions] = useState([]);
    const [buyerTypeOptions, setBuyerTypeOptions] = useState([]);
    const [buyerDutiesTypeOptions, setBuyerDutiesTypeOptions] = useState([]);
    const [buyerAssetsTypeOptions, setBuyerAssetsTypeOptions] = useState([]);
    const [buyerMaterialUsageOptions, setBuyerMaterialUsageOptions] = useState([]);

    // -----------------------------------------

    const [sellerCountry, setSellerCountry] = useState();
    const [sellerContractor, setSellerContractor] = useState();
    const [sellerMainType, setSellerMainType] = useState([]);
    const [sellerType, setSellerType] = useState([]);
    const [sellerDutiesType, setSellerDutiesType] = useState([]);
    const [sellerAssetsType, setSellerAssetsType] = useState([]);
    const [sellerMaterialUsage, setSellerMaterialUsage] = useState([]);

    const [sellerCountryOptions, setSellerCountryOptions] = useState([]);
    const [sellerContractorOptions, setSellerContractorOptions] = useState([]);
    const [sellerContactorCompanyAllOptions, setSellerContactorCompanyAllOptions] = useState([]);
    const [sellerMainTypeOptions, setSellerMainTypeOptions] = useState([]);
    const [sellerTypeOptions, setSellerTypeOptions] = useState([]);
    const [sellerDutiesTypeOptions, setSellerDutiesTypeOptions] = useState([]);
    const [sellerAssetsTypeOptions, setSellerAssetsTypeOptions] = useState([]);
    const [sellerMaterialUsageOptions, setSellerMaterialUsageOptions] = useState([]);

    // 2. sayfa -------------------------------------

    const [agreementNumber, setAgreementNumber] = useState('');
    const [contactCurrency, setContactCurrency] = useState();
    const [contactCurrencyOptions, setContactCurrencyOptions] = useState([]);
    const [startDate, setStartDate] = useState();
    const [finishDate, setFinishDate] = useState();
    const [discount, setDiscount] = useState('');
    const [incoterms, setIncoterms] = useState();
    const [incotermsOptions, setIncotermsOptions] = useState([]);
    
    const [buyerBankNameOptions, setBuyerBankNameOptions] = useState([]);
    const [sellerBankNameOptions, setSellerBankNameOptions] = useState([]);
    const [termFile, setTermFile] = useState();
    
    const [correspondentBankName, setCorrespondentBankName] = useState('');
    
    const [correspondentAccountNumber, setCorrespondentAccountNumber] = useState('');
    
    
    const [correspondentBankAdress, setCorrespondentBankAddress] = useState('');
    const [expirationLimit, setExpirationLimit] = useState('');
    const [correspondentSwift, setCorrespondentSwift] = useState('');
    const [paymentTerms, setPaymentTerms] = useState('');
    const [consignmentOperator, setConsignmentOperator] = useState();
    const [consignmentOperatorOptions, setConsignmentOperatorOptions] = useState([]);

    const [buyerBankName, setBuyerBankName] = useState([]);
    const [buyerBankAddress, setBuyerBankAddress] = useState([]);
    const [buyerBankAddressOptions, setBuyerBankAddressOptions] = useState([]);
    const [buyerSwift, setBuyerSwift] = useState([]);
    const [buyerSwiftOptions, setBuyerSwiftOptions] = useState([]);
    const [buyerAccountNumber, setBuyerAccountNumber] = useState([]);
    const [buyerAccountNumberOptions, setBuyerAccountNumberOptions] = useState([]);

    const [sellerBankName, setSellerBankName] = useState([]);
    const [sellerBankAddress, setSellerBankAddress] = useState([]);
    const [sellerBankAddressOptions, setSellerBankAddressOptions] = useState([]);
    const [sellerSwift, setSellerSwift] = useState([]);
    const [sellerSwiftOptions, setSellerSwiftOptions] = useState([]);
    const [sellerAccountNumber, setSellerAccountNumber] = useState([]);
    const [sellerAccountNumberOptions, setSellerAccountNumberOptions] = useState([]);

    useEffect(() => {
        if(partyType && buyerCountry && sellerCountry && buyerContractor && sellerContractor){
            setNextButtonDisableStatus(false)
        }else{
            setNextButtonDisableStatus(true)
        }
    }, [partyType, buyerCountry, sellerCountry, buyerContractor, sellerContractor])

    const getContractorCompany = (name, value) => {
        if (!value) return;
        FetchApiPost('services/Material/Company/GetCompaniesByCountryIds', 'POST', {
            CountryIds: [value],
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    if (name === 'buyer') {
                            if(sellerContractor){
                                setBuyerContractorOptions(data.map((i) => ({ value: i.id, label: i.name })).filter(f => f.value !== sellerContractor.value));
                            }else{
                                setBuyerContractorOptions(data.map((i) => ({ value: i.id, label: i.name })));
                            }
                            setBuyerContactorCompanyAllOptions(data.map((i) => ({ value: i.id, label: i.name })))
                    } else if (name === 'seller') {
                            if(buyerContractor){
                                setSellerContractorOptions(data.map((i) => ({ value: i.id, label: i.name })).filter(f => f.value !== buyerContractor.value));
                            }else{
                                setSellerContractorOptions(data.map((i) => ({ value: i.id, label: i.name })));
                            }
                            
                            setSellerContactorCompanyAllOptions(data.map((i) => ({ value: i.id, label: i.name })))
                    }
                });
            }
        });
    };

    const getAllCompaniesAndTypes = (name, value) => {
        FetchApiGet(`services/Material/Company/GetMainTypesByCompanyId?companyId=${value}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    if(name === 'buyer'){
                        setBuyerMainTypeOptions(data.map(i => ({ value: i.id, label: i.name })))
                        setBuyerMainType(data.map(i => ({ value: i.id, label: i.name })))
                    }else{
                        setSellerMainTypeOptions(data.map(i => ({ value: i.id, label: i.name })))
                        setSellerMainType(data.map(i => ({ value: i.id, label: i.name })))
                    }
                })
            }
        });

        FetchApiGet(`services/Material/Company/GetTypesByCompanyId?companyId=${value}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    if(name === 'buyer'){
                        setBuyerTypeOptions(data.map(i => ({ value: i.id, label: i.name })))
                        setBuyerType(data.map(i => ({ value: i.id, label: i.name })))
                    }else{
                        setSellerTypeOptions(data.map(i => ({ value: i.id, label: i.name })))
                        setSellerType(data.map(i => ({ value: i.id, label: i.name })))
                    }
                })
            }
        });
        FetchApiGet(`services/Material/Company/GetAssetsTypesByCompanyId?companyId=${value}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    if(name === 'buyer'){
                        setBuyerAssetsTypeOptions(data.map(i => ({ value: i.id, label: i.name })))
                        setBuyerAssetsType(data.map(i => ({ value: i.id, label: i.name })))
                    }else{
                        setSellerAssetsTypeOptions(data.map(i => ({ value: i.id, label: i.name })))
                        setSellerAssetsType(data.map(i => ({ value: i.id, label: i.name })))
                    }
                })
            }
        });
        FetchApiGet(`services/Material/Company/GetDutiesTypesByCompanyId?companyId=${value}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    if(name === 'buyer'){
                        setBuyerDutiesTypeOptions(data.map(i => ({ value: i.id, label: i.name })))
                        setBuyerDutiesType(data.map(i => ({ value: i.id, label: i.name })))
                    }else{
                        setSellerDutiesTypeOptions(data.map(i => ({ value: i.id, label: i.name })))
                        setSellerDutiesType(data.map(i => ({ value: i.id, label: i.name })))
                    }
                })
            }
        });
        FetchApiGet(`services/Material/Company/GetMaterialUsageFacilityByCompanyId?companyId=${value}`, 'GET').then(
            (res) => {
                if (res.status === 200) {
                    res.json().then(({ data }) => {
                        if(name === 'buyer'){
                            setBuyerMaterialUsageOptions(data.map(i => ({ value: i.id, label: i.name })))
                            setBuyerMaterialUsage(data.map(i => ({ value: i.id, label: i.name })))
                        }else{
                            setSellerMaterialUsageOptions(data.map(i => ({ value: i.id, label: i.name })))
                            setSellerMaterialUsage(data.map(i => ({ value: i.id, label: i.name })))
                        }
                    })
                }
            }
        );
    };

    useEffect(() => {
        FetchApiGet('services/Material/Agreement/GetPartyTypes', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setPartyTypeOptions(data.map((i) => ({ value: i.id, label: i.name })));
                    if (data.length === 1) {
                        setPartyType({ value: data[0].id, label: data[0].name });
                    }
                });
            }
        });

        FetchApiGet(`api/OldSystem/GetAllCountriesList/${localStorage.getItem('userEmpId')}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setSellerCountryOptions(data.map((i) => ({ value: i.CountryId, label: i.CountryName })));
                    setBuyerCountryOptions(data.map((i) => ({ value: i.CountryId, label: i.CountryName })));
                    if (data.length === 1) {
                        setSellerCountry({ value: data[0].CountryId, label: data[0].CountryName });
                        setBuyerCountry({ value: data[0].CountryId, label: data[0].CountryName });
                        // getContractorCompany('buyer', data[0].CountryId);
                        // getContractorCompany('seller', data[0].CountryId);
                    }
                });
            }
        });

        // 2. sayfa --------------------------------------
        FetchApiGet('api/OldSystem/GetAllCurrency', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setContactCurrencyOptions(data.map((i) => ({ value: i.Id, label: i.Val2 })));
                    if (data.length === 1) {
                        setContactCurrency({ value: data[0].Id, label: data[0].Val2 });
                    }
                });
            }
        });

        FetchApiGet('api/OldSystem/GetIncoterm', 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setIncotermsOptions(data.map((i) => ({ value: i.Id, label: i.Val1 })));
                    if (data.length === 1) {
                        setIncoterms({ value: data[0].Id, label: data[0].Val1 });
                    }
                });
            }
        });

        // FetchApiGet('services/Finance/Bank/GetAllBankList', 'GET').then((res) => {
        //     if (res.status === 200) {
        //         res.json().then(({ data }) => {
        //             setBankNameOptions(data.map((i) => ({ value: i.id, label: i.name })));
        //             if (data.length === 1) {
        //                 setBuyerBankName(data.map((i) => ({ value: i.id, label: i.name })));
        //                 setSellerBankName(data.map((i) => ({ value: i.id, label: i.name })));
        //             }
        //         });
        //     }
        // });
    }, []);

    useEffect(() => {
        if(!buyerCountry){
            setBuyerBankName([]);
            setBuyerBankNameOptions([]);
            return;
        }
        FetchApiGet(`services/Finance/Bank/GetBanksByCountryId?id=${buyerCountry.value}`, 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setBuyerBankNameOptions(data.map((i) => ({ value: i.id, label: i.name })));
                        if (data.length === 1) {
                            setBuyerBankName(data.map((i) => ({ value: i.id, label: i.name })));
                        }
                    })
                }
            })
    }, [buyerCountry])

    useEffect(() => {
        if(!sellerCountry){
            setSellerBankName([]);
            setSellerBankNameOptions([]);
            return;
        }
        FetchApiGet(`services/Finance/Bank/GetBanksByCountryId?id=${sellerCountry.value}`, 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(({ data }) => {
                        setSellerBankNameOptions(data.map((i) => ({ value: i.id, label: i.name })));
                        if (data.length === 1) {
                            setSellerBankName(data.map((i) => ({ value: i.id, label: i.name })));
                        }
                    })
                }
            })
    }, [sellerCountry])


    const handleChangeSelect = (name, value) => {
        console.log(value)
        switch (name) {
            case 'buyerCountry':
                setBuyerContractorOptions([]);
                setBuyerContractor();
                setBuyerMainType();
                setBuyerMainTypeOptions([]);
                setBuyerType();
                setBuyerTypeOptions([]);
                setBuyerDutiesType();
                setBuyerDutiesTypeOptions([]);
                setBuyerAssetsType();
                setBuyerAssetsTypeOptions([]);
                setBuyerMaterialUsage();
                setBuyerMaterialUsageOptions([]);
                setBuyerBankName([])
                setBuyerBankNameOptions([])
                setBuyerBankAddress([]);
                setBuyerBankAddressOptions([]);
                setBuyerSwift([]);
                setBuyerSwiftOptions([])
                setBuyerAccountNumber([]);
                setBuyerAccountNumberOptions([])
                break;
            case 'sellerCountry':
                setSellerContractorOptions([]);
                setSellerContractor();
                setSellerMainType();
                setSellerMainTypeOptions([]);
                setSellerType();
                setSellerTypeOptions([]);
                setSellerDutiesType();
                setSellerDutiesTypeOptions([]);
                setSellerAssetsType();
                setSellerAssetsTypeOptions([]);
                setSellerMaterialUsage();
                setSellerMaterialUsageOptions([]);
                setSellerBankName([])
                setSellerBankNameOptions([])
                setSellerBankAddress([]);
                setSellerBankAddressOptions([]);
                setSellerSwift([]);
                setSellerSwiftOptions([])
                setSellerAccountNumber([]);
                setSellerAccountNumberOptions([])
                break;
            case 'buyerContractorCompany':
                setBuyerMainType();
                setBuyerMainTypeOptions([]);
                setBuyerType();
                setBuyerTypeOptions([]);
                setBuyerDutiesType();
                setBuyerDutiesTypeOptions([]);
                setBuyerAssetsType();
                setBuyerAssetsTypeOptions([]);
                setBuyerMaterialUsage();
                setBuyerMaterialUsageOptions([]);
                if(value){
                    setSellerContractorOptions(sellerContactorCompanyAllOptions.filter(i => i.value !== value))
                }else{
                    setSellerContractorOptions(sellerContactorCompanyAllOptions)
                }

                break;
            case 'sellerContractorCompany':
                setSellerMainType();
                setSellerMainTypeOptions([]);
                setSellerType();
                setSellerTypeOptions([]);
                setSellerDutiesType();
                setSellerDutiesTypeOptions([]);
                setSellerAssetsType();
                setSellerAssetsTypeOptions([]);
                setSellerMaterialUsage();
                setSellerMaterialUsageOptions([]);
                if(value){
                    setBuyerContractorOptions(buyerContactorCompanyAllOptions.filter(i => i.value !== value))
                }else{
                    setBuyerContractorOptions(buyerContactorCompanyAllOptions)
                }

                break;
            case 'buyerBankName':
                setBuyerBankAddress([]);
                setBuyerBankAddressOptions([]);
                setBuyerSwift([]);
                setBuyerSwiftOptions([]);
                setBuyerAccountNumberOptions([]);
                setBuyerAccountNumber([]);
                break;
            case 'sellerBankName':
                setSellerBankAddress([]);
                setSellerBankAddressOptions([]);
                setSellerSwift([]);
                setSellerSwiftOptions([]);
                setSellerAccountNumberOptions([]);
                setSellerAccountNumber([]);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (!buyerCountry) return;
        getContractorCompany('buyer', buyerCountry.value);
    }, [buyerCountry]);

    useEffect(() => {
        if (!sellerCountry) return;
        getContractorCompany('seller', sellerCountry.value);
    }, [sellerCountry]);

    useEffect(() => {
        if (!sellerContractor) return;
        getAllCompaniesAndTypes('seller', sellerContractor.value);
    }, [sellerContractor]);

    useEffect(() => {
        if (!buyerContractor) return;
        getAllCompaniesAndTypes('buyer', buyerContractor.value);
    }, [buyerContractor]);

    useEffect(() => {
        if(buyerBankName.length === 0) return;
        FetchApiPost('services/Finance/Bank/GetBankAddressListByBankIds', 'POST', {
            BankIds: buyerBankName.map(i => i.value)
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setBuyerBankAddressOptions(data.map(i => ({ value: i.id, label: i.address })))
                    if(data.length === 1){
                        setBuyerBankAddress(data.map(i => ({ value: i.id, label: i.address })))
                    }
                })
            }
        })
    }, [buyerBankName])

    useEffect(() => {
        if(sellerBankName.length === 0) return;
        FetchApiPost('services/Finance/Bank/GetBankAddressListByBankIds', 'POST', {
            BankIds: sellerBankName.map(i => i.value)
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setSellerBankAddressOptions(data.map(i => ({ value: i.id, label: i.address })))
                    if(data.length === 1){
                        setSellerBankAddress(data.map(i => ({ value: i.id, label: i.address })))
                    }
                })
            }
        })
    }, [sellerBankName])

    useEffect(() => {
        if(buyerBankName.length === 0) return;
        FetchApiPost('services/Finance/Account/GetAccountByBankIds', 'POST', {
            BankIds: buyerBankName.map(i => i.value)
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setBuyerAccountNumberOptions(data.map(i => ({ value: i.id, label: i.accountNumber })))
                    if(data.length === 1){
                        setBuyerAccountNumber(data.map(i => ({ value: i.id, label: i.accountNumber })))
                    }
                })
            }
        })

        FetchApiPost('services/Finance/Bank/GetBanksByBankIds', 'POST', {
            BankIds: buyerBankName.map(i => i.value)
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setBuyerSwiftOptions(data.map(i => ({ value: i.id, label: i.swiftCode })))
                    if(data.length === 1){
                        setBuyerSwift(data.map(i => ({ value: i.id, label: i.swiftCode })))
                    }
                })
            }
        })
    }, [buyerBankName])

    useEffect(() => {
        if(sellerBankName.length === 0) return;
        FetchApiPost('services/Finance/Account/GetAccountByBankIds', 'POST', {
            BankIds: sellerBankName.map(i => i.value)
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setSellerAccountNumberOptions(data.map(i => ({ value: i.id, label: i.accountNumber })))
                    if(data.length === 1){
                        setSellerAccountNumber(data.map(i => ({ value: i.id, label: i.accountNumber })))
                    }
                })
            }
        })

        FetchApiPost('services/Finance/Bank/GetBanksByBankIds', 'POST', {
            BankIds: sellerBankName.map(i => i.value)
        }).then(res => {
            if(res.status === 200){
                res.json().then(({ data }) => {
                    setSellerSwiftOptions(data.map(i => ({ value: i.id, label: i.swiftCode })))
                    if(data.length === 1){
                        setSellerSwift(data.map(i => ({ value: i.id, label: i.swiftCode })))
                    }
                })
            }
        })
    }, [sellerBankName])

    const disabledDate = (current) => {
        return current && current < moment().startOf('day');
    };

    const disabledFinishDate = (current) => {
        return current && current < moment(new Date(startDate), "DD/MM/YYYY").add(1, "days");
        
    };

    useEffect(() => {
        if(termFile && agreementNumber.trim().length > 0 && contactCurrency && startDate && finishDate && discount.trim().length > 0 && incoterms && buyerBankName.length > 0 && sellerBankName.length > 0 && buyerBankAddress.length > 0 && sellerBankAddress.length > 0
            && buyerSwift.length > 0 && sellerSwift.length > 0 && buyerAccountNumber.length > 0 && sellerAccountNumber.length > 0 && correspondentBankName.trim().length > 0 && correspondentAccountNumber.trim().length > 0 && 
            correspondentBankAdress.trim().length > 0 && expirationLimit.trim().length > 0 && correspondentSwift.trim().length > 0 && paymentTerms.trim().length > 0 
        ){
            setAddButtonDisableStatus(false)
        }else{
            setAddButtonDisableStatus(true)
        }
    }, [agreementNumber, contactCurrency, startDate, finishDate, discount, incoterms, buyerBankName, sellerBankName, buyerBankAddress, sellerBankAddress, buyerSwift, sellerSwift, buyerAccountNumber, sellerAccountNumber, correspondentBankName, correspondentBankAdress, correspondentAccountNumber,
        expirationLimit, correspondentSwift, paymentTerms, termFile
    ])

    useEffect(() => {
        if(isClickAdd){
            const body = {
                partyTypeId: partyType.value,
                fromCompanyId: sellerContractor.value,
                toCompanyId: buyerContractor.value,
                agreementNumber: agreementNumber,
                currencyId: contactCurrency.value,
                startDate: startDate,
                finishDate: finishDate,
                discount: discount.trim(),
                incotermId: incoterms.value,
                fromBankId: sellerBankName.map(i => i.value),
                toBankId: buyerBankName.map(i => i.value),
                fromBankAddress: sellerBankAddress.map(i => i.label),
                toBankAddress: buyerBankAddress.map(i => i.label),
                fromBankSwift: sellerSwift.map(i => i.label),
                toBankSwift: buyerSwift.map(i => i.label),
                fromAccountNumber: sellerAccountNumber.map(i => i.value),
                toAccountNumber: buyerAccountNumber.map(i => i.value),
                expirationLimit: expirationLimit.trim(),
                paymentTerm: paymentTerms.trim(),
                correspondentBankName: correspondentBankName.trim(),
                correspondentAccountNumber: correspondentAccountNumber.trim(),
                correspondentBankAddress: correspondentBankAdress.trim(),
                correspondentBankSwift: correspondentSwift.trim(),
                consignmentOperatorIds: [0],
                createdBy: localStorage.getItem('userName')
            }
            FetchApiPost('services/Material/Agreement/CreateAgreement', 'POST', body)
                .then(res => {
                    if(res.status === 201){
                        res.json().then(({ data }) => {
                            handleUpdateDocument(data.id)
                        })
                        
                    }
                })
            setIsClickAdd(false)
        }
    }, [isClickAdd])

    const handleUpdateDocument = (id) => {
        const fd = new FormData();
            for (let index = 0; index < termFile.length; index++) {
                if(termFile[index].originFileObj){
                    fd.append('files', termFile[index].originFileObj, `${id}╚${termFile[index].name}`);
                }
            }

            // create the request
            const xhr = new XMLHttpRequest();
           

            // path to server would be where you'd normally post the form to
            xhr.open(
                'POST',
                `http://178.18.200.171:5000/services/Material/Agreement/UpdateFilesToAgreement`,
                true
            )
            xhr.send(fd);

            xhr.onload = () => {
                // setDocumentDetailShow(false)
                // getFilterData();
                applyFilter();
                setShowAddModal(false)
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
           setTermFile([file[file.length -1]]);
       }
       
   }

   const numberControl = (number, name) => {
        if(number.length === 1 && Number(number) === 0) return;
        if(number < 101){
            if(name === "discount"){
                setDiscount(number)
            }else{
                setExpirationLimit(number)
            }
        }else{
            return
        }
   }

    return (
        <div>
            <ToastContainer />
            {modalPageNumber === 1 && (
                <>
                    <SingleSelects
                        label="party type"
                        width={'358.5px'} // '217px'
                        options={partyTypeOptions}
                        selectedItems={partyType}
                        setSelectedItems={setPartyType}
                        isStar={true}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr' }}>
                        {/* Modalın ilk sayfası ------------ */}

                        <div>
                            <label style={{ color: '#00A0DF' }}>{t('buyer')}</label>
                            <div style={{ marginTop: '1rem' }}>
                                <SingleSelects
                                    label="country"
                                    width={'358.5px'}
                                    options={buyerCountryOptions}
                                    selectedItems={buyerCountry}
                                    setSelectedItems={setBuyerCountry}
                                    isStar={true}
                                    handleChange={() => handleChangeSelect('buyerCountry')}
                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <SingleSelects
                                    label="contractor company"
                                    width={'358.5px'}
                                    options={buyerContractorOptions}
                                    selectedItems={buyerContractor}
                                    setSelectedItems={setBuyerContractor}
                                    isStar={true}
                                    handleChange={(value) => handleChangeSelect('buyerContractorCompany', value)}
                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    label="main type"
                                    width={'358.5px'}
                                    options={buyerMainTypeOptions}
                                    selectedItems={buyerMainType}
                                    setSelectedItems={setBuyerMainType}
                                    isStar={true}
                                    disabled={true}
                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    label="type"
                                    width={'358.5px'}
                                    options={buyerTypeOptions}
                                    selectedItems={buyerType}
                                    setSelectedItems={setBuyerType}
                                    isStar={true}
                                    disabled={true}

                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    label="duties type"
                                    width={'358.5px'}
                                    options={buyerDutiesTypeOptions}
                                    selectedItems={buyerDutiesType}
                                    setSelectedItems={setBuyerDutiesType}
                                    isStar={true}
                                    disabled={true}
                                />
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    label="assets type"
                                    width={'358.5px'}
                                    options={buyerAssetsTypeOptions}
                                    selectedItems={buyerAssetsType}
                                    setSelectedItems={setBuyerAssetsType}
                                    isStar={true}
                                    disabled={true}
                                />
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    label="material usage facility"
                                    width={'358.5px'}
                                    options={buyerMaterialUsageOptions}
                                    selectedItems={buyerMaterialUsage}
                                    setSelectedItems={setBuyerMaterialUsage}
                                    isStar={true}
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <Divider
                            type="vertical"
                            className="page-split-divider"
                            style={{
                                height: 'auto',
                                marginLeft: '1rem',
                                marginRight: '1rem',
                            }}
                        />

                        <div>
                            <label style={{ color: '#00A0DF' }}>{t('seller')}</label>
                            <div style={{ marginTop: '1rem' }}>
                                <SingleSelects
                                    label="country"
                                    width={'358.5px'}
                                    options={sellerCountryOptions}
                                    selectedItems={sellerCountry}
                                    setSelectedItems={setSellerCountry}
                                    isStar={true}
                                    handleChange={() => handleChangeSelect('sellerCountry')}
                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <SingleSelects
                                    label="contractor company"
                                    width={'358.5px'}
                                    options={sellerContractorOptions}
                                    selectedItems={sellerContractor}
                                    setSelectedItems={setSellerContractor}
                                    isStar={true}
                                    handleChange={(value) => handleChangeSelect('sellerContractorCompany', value)}
                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    label="main type"
                                    width={'358.5px'}
                                    options={sellerMainTypeOptions}
                                    selectedItems={sellerMainType}
                                    setSelectedItems={setSellerMainType}
                                    isStar={true}
                                    disabled={true}
                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    label="type"
                                    width={'358.5px'} // '217px'
                                    options={sellerTypeOptions}
                                    selectedItems={sellerType}
                                    setSelectedItems={setSellerType}
                                    isStar={true}
                                    disabled={true}
                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    label="duties type"
                                    width={'358.5px'}
                                    options={sellerDutiesTypeOptions}
                                    selectedItems={sellerDutiesType}
                                    setSelectedItems={setSellerDutiesType}
                                    isStar={true}
                                    disabled={true}
                                />
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    label="assets type"
                                    width={'358.5px'}
                                    options={sellerAssetsTypeOptions}
                                    selectedItems={sellerAssetsType}
                                    setSelectedItems={setSellerAssetsType}
                                    isStar={true}
                                    disabled={true}
                                />
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    label="material usage facility"
                                    width={'358.5px'}
                                    options={sellerMaterialUsageOptions}
                                    selectedItems={sellerMaterialUsage}
                                    setSelectedItems={setSellerMaterialUsage}
                                    isStar={true}
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
            {modalPageNumber === 2 && (
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1rem' }}>
                        <NewInput
                            value={agreementNumber}
                            setValue={setAgreementNumber}
                            label="agreement number"
                            type='number'
                            width={'367px'}
                            placeholder="agreement number"
                            isStar={true}
                            isKeyDown={true}
                            exceptThisSymbols={["e", "E", "+", "-", ".", "," , "*", "/", " "]}
                        />

                        <SingleSelects
                            label="contact currency"
                            width={'367px'}
                            options={contactCurrencyOptions}
                            selectedItems={contactCurrency}
                            setSelectedItems={setContactCurrency}
                            isStar={true}
                        />
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            columnGap: '1rem',
                            marginTop: '1rem',
                        }}>
                        <div style={{width: '367px', display: 'grid', rowGap: '2px'}}>
                            <label>{t('start date')} <span style={{color: 'red'}}>*</span></label>
                            <DatePicker  
                            placeholder={t('Select Date')}
                            onChange={(e) => {{e ? setStartDate(moment(e).format()) : setStartDate(null)} setFinishDate(null)}}
                            //  disabledDate={disabledDate}
                             format="DD/MM/YYYY"
                             defaultValue={startDate && moment(startDate)}
                             style={{
                                width: '100%',
                                border: '1px solid #d9d9d9',
                            }}
                             />
                        </div>
                        <div style={{width: '367px', display: 'grid', rowGap: '2px'}}>
                            <label>{t('finish date')} <span style={{color: 'red'}}>*</span></label>
                            <DatePicker  
                            placeholder={t('Select Date')}
                            disabled={!startDate}
                             onChange={(e) =>  {e ? setFinishDate(moment(e).format()) : setFinishDate(null)}}
                             disabledDate={disabledFinishDate}
                             defaultValue={finishDate && moment(finishDate)}
                             value={finishDate ? moment(finishDate) : null}
                             format="DD/MM/YYYY"
                             style={{
                                width: '100%',
                                border: '1px solid #d9d9d9',
                            }}
                             />
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            columnGap: '1rem',
                            marginTop: '1rem',
                        }}>
                        <div>
                            <NewInput
                                value={discount}
                                setValue={(e) => numberControl(e, "discount")}
                                label="discount %"
                                width={'367px'}
                                placeholder="discount"
                                isStar={true}
                                isKeyDown={true}
                                exceptThisSymbols={["e", "E", "+", "-", ".", "," , "*", "/", " "]}
                                type='number'
                            />
                        </div>
                        <div>
                            <SingleSelects
                                label="incoterms"
                                width={'367px'}
                                options={incotermsOptions}
                                selectedItems={incoterms}
                                setSelectedItems={setIncoterms}
                                isStar={true}
                            />
                        </div>
                    </div>

                    {/* 2. SAYFA SELLER BUYER */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', marginTop: '1rem' }}>
                        <div>
                            <label style={{ color: '#00A0DF' }}>{t('buyer')}</label>
                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    label="bank name"
                                    width={'358.5'}
                                    options={buyerBankNameOptions}
                                    selectedItems={buyerBankName}
                                    setSelectedItems={setBuyerBankName}
                                    isStar={true}
                                    handleChange={() => handleChangeSelect('buyerBankName')}
                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                    <MultipleSelects
                                    options={buyerBankAddressOptions}
                                    selectedItems={buyerBankAddress}
                                    setSelectedItems={setBuyerBankAddress}
                                    label="bank address"
                                    width={'358.5px'}
                                    isStar={true}
                                />
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    options={buyerSwiftOptions}
                                    selectedItems={buyerSwift}
                                    setSelectedItems={setBuyerSwift}
                                    label="swift"
                                    width={'358.5px'}
                                    isStar={true}
                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                            <MultipleSelects
                                    label="account number"
                                    width={'358.5px'} // '217px'
                                    options={buyerAccountNumberOptions}
                                    selectedItems={buyerAccountNumber}
                                    setSelectedItems={setBuyerAccountNumber}
                                    isStar={true}
                                />
                            </div>
                        </div>

                        <Divider
                            type="vertical"
                            className="page-split-divider"
                            style={{
                                height: 'auto',
                                marginLeft: '1rem',
                                marginRight: '1rem',
                            }}
                        />

                        <div>
                            <label style={{ color: '#00A0DF' }}>{t('seller')}</label>
                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    label="bank name"
                                    width={'358.5'}
                                    options={sellerBankNameOptions}
                                    selectedItems={sellerBankName}
                                    setSelectedItems={setSellerBankName}
                                    isStar={true}
                                    handleChange={() => handleChangeSelect('sellerBankName')}
                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    options={sellerBankAddressOptions}
                                    selectedItems={sellerBankAddress}
                                    setSelectedItems={setSellerBankAddress}
                                    label="bank address"
                                    width={'358.5px'}
                                    isStar={true}
                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    options={sellerSwiftOptions}
                                    selectedItems={sellerSwift}
                                    setSelectedItems={setSellerSwift}
                                    label="swift"
                                    width={'358.5px'}
                                    isStar={true}
                                />
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <MultipleSelects
                                    label="account number"
                                    width={'358.5px'}
                                    options={sellerAccountNumberOptions}
                                    selectedItems={sellerAccountNumber}
                                    setSelectedItems={setSellerAccountNumber}
                                    isStar={true}
                                />
                            </div>
                        </div>
                    </div>

                    {
                        // BURAYA FİLE GELİCEK !!!!
                    }

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            columnGap: '1rem',
                            marginTop: '1rem',
                        }}>
                        <div style={{width: '367px'}}>
                            <label>
                                {t('terms file')}
                                <span style={{ color: 'red' }}>*</span>
                            </label>
                            <div className="visit-content-need-add__file-upload">
                                <Upload multiple={false} beforeUpload={beforeUpload} onChange={(e) => handleCheckUploadedFile(e.fileList)} fileList={termFile}>
                                    <Button style={{ color: '#6c757d' }}>{t('file upload')}</Button>
                                </Upload>
                                <label>{termFile ? termFile[0].name : t('not selected')}</label>
                            </div>
                        </div>

                        <div>
                            <NewInput
                                value={correspondentBankName}
                                setValue={setCorrespondentBankName}
                                label="correspondent bank name"
                                width={'367px'}
                                placeholder="correspondent bank name"
                                isStar={true}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            columnGap: '1rem',
                            marginTop: '1rem',
                        }}>
                        <div>
                            <NewInput
                                value={correspondentAccountNumber}
                                setValue={setCorrespondentAccountNumber}
                                label="correspondent account number"
                                width={'367px'}
                                placeholder="correspondent account number"
                                isStar={true}
                                isKeyDown={true}
                                exceptThisSymbols={["e", "E", "+", "-", ".", "," , "*", "/", " "]}
                                type='number'
                            />
                        </div>

                        <div>
                            <NewInput
                                value={correspondentBankAdress}
                                setValue={setCorrespondentBankAddress}
                                label="correspondent bank address"
                                width={'367px'}
                                placeholder="correspondent bank address"
                                isStar={true}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            columnGap: '1rem',
                            marginTop: '1rem',
                        }}>
                        <div>
                            <NewInput
                                value={expirationLimit}
                                setValue={(e) => numberControl(e, "expiration")}
                                label="expiration limit %"
                                width={'367px'}
                                placeholder="expiration limit %"
                                isStar={true}
                                isKeyDown={true}
                                exceptThisSymbols={["e", "E", "+", "-", ".", "," , "*", "/", " "]}
                                type='number'
                            />
                        </div>

                        <div>
                            <NewInput
                                value={correspondentSwift}
                                setValue={setCorrespondentSwift}
                                label="correspondent swift"
                                width={'367px'}
                                placeholder="correspondent swift"
                                isStar={true}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            columnGap: '1rem',
                            marginTop: '1rem',
                        }}>
                        <div>
                            <NewInput
                                value={paymentTerms}
                                setValue={setPaymentTerms}
                                label="payment terms"
                                width={'367px'}
                                placeholder="payment terms"
                                isStar={true}
                            />
                        </div>

                        <div>
                            <SingleSelects
                                label="consignment operator"
                                width={'367px'}
                                options={consignmentOperatorOptions}
                                selectedItems={consignmentOperator}
                                setSelectedItems={setConsignmentOperator}
                                isStar={true}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Body;
