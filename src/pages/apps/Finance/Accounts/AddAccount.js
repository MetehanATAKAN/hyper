import React, { useEffect, useState } from 'react'
import GlobalModal from '../../../../components/GlobalNew/Modal'
import { useTranslation } from 'react-i18next'
import { Button as ButtonB } from 'react-bootstrap';
import { NewInput } from '../../../../components/GlobalNew/Inputs';
import Icon from '@mdi/react';
import { mdiFileExcelOutline, mdiDeleteOutline } from '@mdi/js';
import { ToastContainer, toast } from 'react-toastify';
import { Upload, Button } from 'antd';
import { config } from '../../../../config'
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';

const AddAccount = ({
    show,
    setShow,
    callTable,
    setCallTable,
    setIsApply
}) => {

    const { t } = useTranslation();
    const history = useHistory();

    /**user empId */
    const userId = Number(localStorage.getItem('userEmpId'));

    /**created by */
    const createdBy = localStorage.getItem('userName');

    /**config apiURL */
    const apiURL = config.API_URL;

    /**error modal */
    const [errorModal, setErrorModal] = useState(false);

    /**error modal text */
    const [errorModalText, setErrorModalText] = useState('');

    /**document */
    const [document, setDocument] = useState([]);

    /**bank or case */
    const [bankOrCase, setBankOrCase] = useState([]);
    const [selectBankOrCase, setSelectBankOrCase] = useState();
   
    /**bank or case name */
    const [bankOrCaseName, setBankOrCaseName] = useState([]);
    const [selectBankOrCaseName, setSelectBankOrCaseName] = useState();

    /**branch code */
    const [branchCode, setBranchCode] = useState([]);
    const [selectBranchCode, setSelectBranchCode] = useState();

    /**account name */
    const [accountName, setAccountName] = useState('');

    /**country */
    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState();

    /**type */
    const [type, setType] = useState([]);
    const [selectType, setSelectType] = useState();

    /**party type */
    const [partyType, setPartyType] = useState([]);
    const [selectPartyType, setSelectPartyType] = useState();

    /**party */
    const [party, setParty] = useState([]);
    const [selectParty, setSelectParty] = useState();

    /**account type */
    const [accountType, setAccountType] = useState([]);
    const [selectAccountType, setSelectAccountType] = useState();

    /**account sub type */
    const [accountSubType, setAccountSubType] = useState([]);
    const [selectAccountSubType, setSelectAccountSubType] = useState();

    /**currency */
    const [currency, setCurrency] = useState([]);
    const [selectCurrency, setSelectCurrency] = useState();

    /**account number */
    const [accountNumber, setAccountNumber] = useState('');

    /**iban */
    const [iban, setIban] = useState('');

    /**account priority */
    const [accountPriority, setAccountPriority] = useState([]);
    const [selectAccountPriority, setSelectAccountPriority] = useState();

    /**bank name */
    const [bankName, setBankName] = useState('');

    /**swift */
    const [swift, setSwift] = useState('');

    const removeFile = (file) => {
        setDocument(document.filter((item) => item.uid !== file.uid));
    };

    const reg = new RegExp(/^[^<>%$&*!@#^(){}[\]~`+=|\\:;?/]*$/);
    const handleCheckUploadedFile = (file) => {
        let characterControl = false;
        console.log(file);
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
            // setErrorModalShow(true);
        } else {
            setDocument(file);
        }
    };

    const beforeUpload = (file) => {
        const docTypeControl =
            file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/pdf';
        if (!docTypeControl) {
            toast.error(<>{file.name.length < 25 ? <>{file.name}</> : <>{file.name.slice(0, 22)}...</>} {t(`must be of xlsx, xls or pdf file type`)}</>, {
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

    const sendFile = (id) => {
        if (document.length > 0) {
            console.log(id);
            const fd = new FormData();
            for (let index = 0; index < document.length; index++) {
                fd.append('files', document[index].originFileObj, `${id}╚${document[index].name}`);
            }

            // create the request
            const xhr = new XMLHttpRequest();

            // path to server would be where you'd normally post the form to
            xhr.open('POST', `${apiURL}/services/Finance/Bank/UpdateFilesToBank`, true);
            xhr.send(fd);
            
            xhr.onload = () => {
                setShow(false);
                setCallTable(true);
            };
        } else {
            setShow(false);
        }
    };

    const addAccount = () => {
        if (selectBankOrCase !== undefined &&
            selectBankOrCaseName !== undefined &&
            branchCode !== undefined &&
            accountName !== '' &&
            selectCountry !== undefined &&
            selectType !== undefined &&
            selectPartyType !== undefined &&
            selectParty !== undefined &&
            selectAccountType !== undefined &&
            selectCurrency !== undefined &&
            accountNumber !== '' &&
            iban !== '' &&
            selectAccountPriority !== undefined
        ) {
            const body = {
                branchId: selectBranchCode?.value,
                accountName: accountName,
                countryId: selectCountry?.value,
                typeId: selectType?.value,
                partyTypeId: selectPartyType?.value,
                partyId: selectParty?.value,
                accountTypeId: selectAccountType?.value,
                accountSubTypeId: 0,
                currencyId: selectCurrency?.value,
                accountNumber: accountNumber,
                iban: iban,
                accountPriorityId: selectAccountPriority?.value,
                isCompanyAccount: true,
                createdBy: createdBy
            }


            FetchApiPost('services/Finance/Account/CreateAccount', 'POST', body)
                .then(res => {
                    if (res.status === 201) {
                        res.json().then(({ data }) => {
                            console.log(data);
                            setIsApply(true);
                            setShow(false);
                        });
                    }
                    else if (res.status === 409) {
                        setErrorModal(true);
                        res.json().then(data => setErrorModalText(data?.errors[0]));
                    }
                    else {
                        history.push('/error-500')
                    }
                })
        }
    }

    /**bank or case */
    useEffect(() => {
        FetchApiGet('services/Finance/Branch/GetTypes', 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setBankOrCase(res?.data?.map(data => {
                            return {
                                value: data?.id,
                                label: data?.name
                            }
                        }))
                        if(res.data.length !== 0) {
                            setSelectBankOrCase(
                                {
                                    value: res?.data[0]?.id,
                                    label: res?.data[0]?.name
                                }
                            )
                        }
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
    }, [history])

    /**bank or case name */
    useEffect(() => {
        if(selectBankOrCase) {
            FetchApiGet(`services/Finance/Bank/GetBankOrCaseByTypeId?id=${selectBankOrCase?.value}`, 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setSelectBankOrCaseName();
                        setBankOrCaseName(res?.data?.map(data => {
                            return {
                                value: data?.id,
                                label: data?.name
                            }
                        }))
                        if(res.data.length !== 0) {
                            setSelectBankOrCaseName(
                                {
                                    value: res?.data[0]?.id,
                                    label: res?.data[0]?.name
                                }
                            )
                        }
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
        }
    }, [history, selectBankOrCase])

    /**branch code */
    useEffect(() => {
        if(selectBankOrCaseName) {
            FetchApiGet(`services/Finance/Branch/GetBranchByBankId?bankId=${selectBankOrCaseName?.value}`, 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setBranchCode(res?.data?.map(data => {
                            if(selectBankOrCase?.value === 1) {
                                return {
                                    value: data?.id,
                                    label: data?.branchCode
                                }
                            }
                            else {
                                return {
                                    value: data?.id,
                                    label: data?.name
                                }
                            }
                        }))
                        if(selectBankOrCase?.value === 1) {
                            setSelectBranchCode(
                                {
                                    value: res?.data[0]?.id,
                                    label: res?.data[0]?.branchCode
                                }
                            )
                        }
                        else {
                            setSelectBranchCode(
                                {
                                    value: res?.data[0]?.id,
                                    label: res?.data[0]?.name
                                }
                            )
                        }
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
        }
    }, [history, selectBankOrCaseName])

    /**type */
    useEffect(() => {
        FetchApiGet('services/Finance/Account/GetAccountPartyType', 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setType(res?.data.map(data => {
                            return {
                                value: data?.id,
                                label: data?.name
                            }
                        }))
                        setSelectType(
                            {
                                value: res.data[0]?.id,
                                label: res.data[0]?.name
                            }
                        )
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
    }, [history])

     /**party type */
     useEffect(() => {
        if(selectType) {
            if(selectType?.value === 3) {
                FetchApiGet(`api/OldSystem/GetCompanies/${userId}`, 'GET')
                .then(res => {
                    if (res.status === 200) {
                        res.json().then(res => {
                            setPartyType(res?.map(data => {
                                return {
                                    value: data?.CompanyId,
                                    label: data?.CompanyName
                                }
                            }))
                            setSelectPartyType(
                                {
                                    value: res[0]?.CompanyId,
                                    label: res[0]?.CompanyName
                                }
                            )
                        })
                    }
                    else {
                        history.push('/error-500')
                    }
                })
            }
            else if(selectType?.value === 2) {
                FetchApiGet('services/Material/MainType/GetAllMainType', 'GET')
                .then(res => {
                    if (res.status === 200) {
                        res.json().then(res => {
                            setPartyType(res?.data.map(data => {
                                return {
                                    value: data?.id,
                                    label: data?.name
                                }
                            }))
                            setSelectPartyType(
                                {
                                    value: res.data[0]?.id,
                                    label: res.data[0]?.name
                                }
                            )
                        })
                    }
                    else {
                        history.push('/error-500')
                    }
                })
            }
            else {
                FetchApiGet('services/Material/OurCompany/GetAllCompanyType', 'GET')
                .then(res => {
                    if (res.status === 200) {
                        res.json().then(res => {
                            setPartyType(res?.data.map(data => {
                                return {
                                    value: data?.id,
                                    label: data?.name
                                }
                            }))
                            setSelectPartyType(
                                {
                                    value: res.data[0]?.id,
                                    label: res.data[0]?.name
                                }
                            )
                        })
                    }
                    else {
                        history.push('/error-500')
                    }
                })
            }
        }
    }, [history, selectType, userId])

     /**party */
     useEffect(() => {
        if(selectType && selectPartyType) {
            if(selectType?.value === 3) {
                FetchApiGet(`api/OldSystem/GetEmpDataByCompanyId?companyId=${selectPartyType?.value}`, 'GET')
                .then(res => {
                    if (res.status === 200) {
                        res.json().then(res => {
                            setParty(res?.map(data => {
                                return {
                                    value: data?.Id,
                                    label: data?.FullName
                                }
                            }))
                            setSelectParty(
                                {
                                    value: res[0]?.Id,
                                    label: res[0]?.FullName
                                }
                            )
                        })
                    }
                    else {
                        history.push('/error-500')
                    }
                })
            }
            else {
                FetchApiGet(`api/OldSystem/GetCompanies/${userId}`, 'GET')
                .then(res => {
                    if (res.status === 200) {
                        res.json().then(res => {
                            setParty(res?.map(data => {
                                return {
                                    value: data?.CompanyId,
                                    label: data?.CompanyName
                                }
                            }))
                            setSelectParty(
                                {
                                    value: res[0]?.CompanyId,
                                    label: res[0]?.CompanyName
                                }
                            )
                        })
                    }
                    else {
                        history.push('/error-500')
                    }
                })
            }
           
        }
    }, [history, selectPartyType, selectType, userId])

    /**account type */
    useEffect(() => {
        FetchApiGet('services/Finance/Account/GetAccountType', 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setAccountType(res?.data.map(data => {
                            return {
                                value: data?.id,
                                label: data?.name
                            }
                        }))
                        setSelectAccountType(
                            {
                                value: res.data[0]?.id,
                                label: res.data[0]?.name
                            }
                        )
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
    }, [history])

    /**country */
    useEffect(() => {
        FetchApiGet(`api/OldSystem/GetAllCountriesList/${userId}`, 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setCountry(res?.map(data => {
                            return {
                                value: data?.CountryId,
                                label: data?.CountryName
                            }
                        }))
                        setSelectCountry(
                            {
                                value: res[0]?.CountryId,
                                label: res[0]?.CountryName
                            }
                        )
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
    }, [history, userId])
    
     /**currency */
     useEffect(() => {
        FetchApiGet('api/OldSystem/GetAllCurrency', 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setCurrency(res?.map(data => {
                            return {
                                value: data?.Id,
                                label: data?.Val1
                            }
                        }))
                        setSelectCurrency(
                            {
                                value: res[0]?.Id,
                                label: res[0]?.Val1
                            }
                        )
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
    }, [history])

    /**account number */
    useEffect(() => {
        FetchApiGet('services/Finance/Account/GetAccountPriority', 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setAccountPriority(res?.data.map(data => {
                            return {
                                value: data?.id,
                                label: data?.name
                            }
                        }))
                        setSelectAccountPriority(
                            {
                                value: res.data[0]?.id,
                                label: res.data[0]?.name
                            }
                        )
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
    }, [history])

    return (
        <>
            <GlobalModal
                showModal={show}
                setShowModal={setShow}
                toggle={() => setShow(false)}
                header={t('Add Account')}
                body={
                    <div>
                         <SingleSelects
                            label='bank or case'
                            isStar={true}
                            options={bankOrCase}
                            selectedItems={selectBankOrCase}
                            setSelectedItems={setSelectBankOrCase}
                            width='100%'
                            clearIcon={false}
                        />
                        <div className='d-flex justify-content-between'>
                        <SingleSelects
                            label='bank or case name'
                            isStar={true}
                            options={bankOrCaseName}
                            selectedItems={selectBankOrCaseName}
                            setSelectedItems={setSelectBankOrCaseName}
                            width='48%'
                        />
                          <SingleSelects
                            label='branch code'
                            isStar={true}
                            options={branchCode}
                            selectedItems={selectBranchCode}
                            setSelectedItems={setSelectBranchCode}
                            width='48%'
                        />
                        </div>
                        <NewInput
                            label='account name'
                            isStar={true}
                            value={accountName}
                            setValue={setAccountName}
                            width='100%'
                            placeholder='account name'
                        />
                         <SingleSelects
                            label='country'
                            isStar={true}
                            options={country}
                            selectedItems={selectCountry}
                            setSelectedItems={setSelectCountry}
                            width='100%'
                        />
                        <SingleSelects
                            label='type'
                            isStar={true}
                            options={type}
                            selectedItems={selectType}
                            setSelectedItems={setSelectType}
                            width='100%'
                        />
                        <div className='d-flex justify-content-between'>
                        <SingleSelects
                            label='party type'
                            isStar={true}
                            options={partyType}
                            selectedItems={selectPartyType}
                            setSelectedItems={setSelectPartyType}
                            width='48%'
                        />
                          <SingleSelects
                            label='party'
                            isStar={true}
                            options={party}
                            selectedItems={selectParty}
                            setSelectedItems={setSelectParty}
                            width='48%'
                        />
                        </div>
                        <div className='d-flex justify-content-between'>
                        <SingleSelects
                            label='account type'
                            isStar={true}
                            options={accountType}
                            selectedItems={selectAccountType}
                            setSelectedItems={setSelectAccountType}
                            width='48%'
                        />
                          <SingleSelects
                            label='account sub type'
                            options={accountSubType}
                            selectedItems={selectAccountSubType}
                            setSelectedItems={setSelectAccountSubType}
                            width='48%'
                        />
                        </div>
                        <div className='d-flex justify-content-between'>
                        <SingleSelects
                            label='currency'
                            isStar={true}
                            options={currency}
                            selectedItems={selectCurrency}
                            setSelectedItems={setSelectCurrency}
                            width='48%'
                        />
                           <NewInput
                            label='account number'
                            isStar={true}
                            value={accountNumber}
                            setValue={setAccountNumber}
                            width='48%'
                            placeholder='account number'
                        />
                        </div>
                        <NewInput
                            label='iban'
                            isStar={true}
                            value={iban}
                            setValue={setIban}
                            width='100%'
                            placeholder='iban'
                        />
                        <SingleSelects
                            label='account priority'
                            isStar={true}
                            options={accountPriority}
                            selectedItems={selectAccountPriority}
                            setSelectedItems={setSelectAccountPriority}
                            width='100%'
                        />
                    </div>
                }
                footer={
                    <>
                        <ButtonB variant="light" onClick={() => setShow(false)}>
                            {t('cancel')}
                        </ButtonB>
                        <ButtonB
                            variant="primary"
                            onClick={addAccount}
                            disabled={
                                selectBankOrCase !== undefined &&
                                    selectBankOrCaseName !== undefined &&
                                    branchCode !== undefined &&
                                    accountName !== '' &&
                                    selectCountry !== undefined &&
                                    selectType !== undefined &&
                                    selectPartyType !== undefined &&
                                    selectParty !== undefined &&
                                    selectAccountType !== undefined &&
                                    selectCurrency !== undefined &&
                                    accountNumber !== '' &&
                                    iban !== '' &&
                                    selectAccountPriority !== undefined
                                    ? false
                                    : true
                            }
                            >
                            {t('add')}
                        </ButtonB>
                    </>
                }
            />
            {
                errorModal &&
                <PharmacySplitPercentProblem
                show={errorModal}
                handleClose={()=>setErrorModal(false)}
                messages={errorModalText}
                />
            }
        </>
    )
}

export default AddAccount