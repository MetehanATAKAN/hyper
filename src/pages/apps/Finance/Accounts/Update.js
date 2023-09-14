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

const UpdateAccount = ({
    show,
    setShow,
    callTable,
    setCallTable,
    setIsApply,
    data
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
    const [selectBankOrCaseName, setSelectBankOrCaseName] = useState({
        value:data?.bankOrCaseNameId,
        label:data?.bankOrCaseName
    });

    /**branch code */
    const [branchCode, setBranchCode] = useState([]);
    const [selectBranchCode, setSelectBranchCode] = useState({
        value:data?.branchCodeId,
        label:data?.branchCode
    });

    /**account name */
    const [accountName, setAccountName] = useState(data?.accountName);

    /**country */
    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState({
        value:data?.countryId,
        label:data?.country
    });

    /**type */
    const [type, setType] = useState([]);
    const [selectType, setSelectType] = useState({
        value:data?.typeId,
        label:data?.type
    });

    /**party type */
    const [partyType, setPartyType] = useState([]);
    const [selectPartyType, setSelectPartyType] = useState({
        value:data?.partyTypeId,
        label:data?.partyType
    });

    /**party */
    const [party, setParty] = useState([]);
    const [selectParty, setSelectParty] = useState({
        value:data?.partyId,
        label:data?.party
    });

    /**account type */
    const [accountType, setAccountType] = useState([]);
    const [selectAccountType, setSelectAccountType] = useState({
        value:data?.accountTypeId,
        label:data?.accountType
    });

    /**account sub type */
    const [accountSubType, setAccountSubType] = useState([]);
    const [selectAccountSubType, setSelectAccountSubType] = useState();

    /**currency */
    const [currency, setCurrency] = useState([]);
    const [selectCurrency, setSelectCurrency] = useState({
        value:data?.currencyId,
        label:data?.currency
    });

    /**account number */
    const [accountNumber, setAccountNumber] = useState(data?.accountNumber);

    /**iban */
    const [iban, setIban] = useState(data?.iban);

    /**account priority */
    const [accountPriority, setAccountPriority] = useState([]);
    const [selectAccountPriority, setSelectAccountPriority] = useState({
        value:data?.accountPriorityId,
        label:data?.accountPriority
    });

    
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
                id:data.id,
                branchId: selectBranchCode?.value,
                accountName: accountName,
                countryId: selectCountry?.value,
                typeId: selectBankOrCase?.value,
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


            FetchApiPost('services/Finance/Account/UpdateAccount', 'POST', body)
                .then(res => {
                    if (res.status === 201) {
                        res.json().then(({ data }) => {
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
                        // setSelectAccountType(
                        //     {
                        //         value: res.data[0]?.id,
                        //         label: res.data[0]?.name
                        //     }
                        // )
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
                        // setSelectAccountPriority(
                        //     {
                        //         value: res.data[0]?.id,
                        //         label: res.data[0]?.name
                        //     }
                        // )
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
                header={t('Update Account')}
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
                            disabled={true}
                        />
                        <div className='d-flex justify-content-between'>
                        <SingleSelects
                            label='bank or case name'
                            isStar={true}
                            options={bankOrCaseName}
                            selectedItems={selectBankOrCaseName}
                            setSelectedItems={setSelectBankOrCaseName}
                            width='48%'
                            disabled={true}
                        />
                          <SingleSelects
                            label='branch code'
                            isStar={true}
                            options={branchCode}
                            selectedItems={selectBranchCode}
                            setSelectedItems={setSelectBranchCode}
                            width='48%'
                            disabled={true}
                        />
                        </div>
                        <NewInput
                            label='account name'
                            isStar={true}
                            value={accountName}
                            setValue={setAccountName}
                            width='100%'
                            placeholder='account name'
                            disabled={true}
                        />
                         <SingleSelects
                            label='country'
                            isStar={true}
                            options={country}
                            selectedItems={selectCountry}
                            setSelectedItems={setSelectCountry}
                            width='100%'
                            disabled={true}
                        />
                        <SingleSelects
                            label='type'
                            isStar={true}
                            options={type}
                            selectedItems={selectType}
                            setSelectedItems={setSelectType}
                            width='100%'
                            disabled={true}
                        />
                        <div className='d-flex justify-content-between'>
                        <SingleSelects
                            label='party type'
                            isStar={true}
                            options={partyType}
                            selectedItems={selectPartyType}
                            setSelectedItems={setSelectPartyType}
                            width='48%'
                            disabled={true}
                        />
                          <SingleSelects
                            label='party'
                            isStar={true}
                            options={party}
                            selectedItems={selectParty}
                            setSelectedItems={setSelectParty}
                            width='48%'
                            disabled={true}
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
                            disabled={true}
                        />
                          <SingleSelects
                            label='account sub type'
                            options={accountSubType}
                            selectedItems={selectAccountSubType}
                            setSelectedItems={setSelectAccountSubType}
                            width='48%'
                            disabled={true}
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
                            disabled={true}
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
                            disabled={true}
                        />
                    </div>
                }
                footer={
                    <>
                        <ButtonB variant="light" onClick={() => setShow(false)}>
                            {t('cancel')}
                        </ButtonB>
                        <ButtonB
                            variant="warning"
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
            {/* {
                errorModal &&
                <PharmacySplitPercentProblem
                show={errorModal}
                handleClose={()=>setErrorModal(false)}
                messages={errorModalText}
                />
            } */}
        </>
    )
}

export default UpdateAccount