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

const AddBranch = ({
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

    /**country */
    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState();

    /**company */
    const [company, setCompany] = useState([]);
    const [selectCompany, setSelectCompany] = useState();

    /**type */
    const [type, setType] = useState([]);
    const [selectType, setSelectType] = useState();
  
    /**bank name */
    const [bankName, setBankName] = useState([]);
    const [selectBankName, setSelectBankName] = useState();

    /**case name */
    const [caseName, setCaseName] = useState([]);
    const [selectCaseName, setSelectCaseName] = useState();

    /**city */
    const [city, setCity] = useState([]);
    const [selectCity, setSelectCity] = useState();

    /**branch name */
    const [branchName, setBranchName] = useState('');
 
    /**branch code */
    const [branchCode, setBranchCode] = useState('');

    /**swift */
    const [swift, setSwift] = useState([]);
    const [selectSwift, setSelectSwift] = useState();

    /**adress */
    const [adress, setAdress] = useState('');

    const addBranch = () => {
        const body = {
            branchCode: selectType?.value === 1 ? branchCode : null,
            bankOrCaseId: selectType?.value === 1 ? selectBankName?.value : selectCaseName?.value,
            name: selectType?.value === 1 ? null : branchName,
            countryId: selectType?.value === 1 ? selectCountry?.value : 0,
            companyId: selectType?.value === 1 ? 0 : selectCompany?.value,
            cityId: selectType?.value === 1 ? selectCity?.value : 0,
            address: selectType?.value === 1 ? adress : null,
            createdBy: createdBy
        }

        
            FetchApiPost('services/Finance/Branch/CreateBranch', 'POST', body)
                .then(res => {
                    if (res.status === 201) {
                        setShow(false);
                        setIsApply(true);
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

    /**type */
    useEffect(() => {
        FetchApiGet('services/Finance/Branch/GetTypes', 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setType(res?.data?.map(data => {
                            return {
                                value: data?.id,
                                label: data?.name
                            }
                        }))
                        setSelectType(
                            {
                                value: res?.data[0]?.id,
                                label: res?.data[0]?.name
                            }
                        )
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
    }, [history])

    /**bank name */
    useEffect(() => {
        FetchApiGet('services/Finance/Bank/GetAllBanks', 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setBankName(res?.data?.map(data => {
                            return {
                                value: data?.id,
                                label: data?.bankName
                            }
                        }))
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
    }, [history])

    /**swift code */
    // useEffect(() => {
    //     if(selectBankName){
    //         FetchApiGet(`services/Finance/Branch/GetSwiftCodeByBankId?bankId=${selectBankName?.value}`, 'GET')
    //         .then(res => {
    //             if (res.status === 200) {
    //                 res.json().then(res => {
    //                     setSwift(
    //                       [ {
    //                             value: res?.data?.id,
    //                             label: res?.data?.swiftCode
    //                         }]
    //                     )
    //                     setSelectSwift(
    //                         {
    //                              value: res?.data?.id,
    //                              label: res?.data?.swiftCode
    //                          }
    //                      )
    //                 })
    //             }
    //             else {
    //                 history.push('/error-500')
    //             }
    //         })
    //     }
    // }, [history, selectBankName])

    /**case name */
    useEffect(() => {
        if(selectType){
            FetchApiGet(`services/Finance/Bank/GetBankOrCaseByTypeId?id=${selectType?.value}`, 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        if(selectType?.value === 1) {
                            setBankName(res?.data?.map(data => {
                                return {
                                    value: data?.id,
                                    label: data?.name
                                }
                            }))
                            setSelectBankName(
                                {
                                    value: res?.data[0]?.id,
                                    label: res?.data[0]?.name
                                }
                            )
                        }
                        else {
                            setCaseName(res?.data?.map(data => {
                                return {
                                    value: data?.id,
                                    label: data?.name
                                }
                            }))
                            setSelectCaseName(
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
    }, [history, selectType])

    /**company */
    useEffect(() => {
            FetchApiGet(`api/OldSystem/GetCompanies/${userId}`, 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setCompany(res?.map(data => {
                            return {
                                value: data?.CompanyId,
                                label: data?.CompanyName
                            }
                        }))
                        setSelectCompany(
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
        
    }, [history, userId])

    /**city */
    useEffect(() => {
        if(selectCountry) {
            const body = {
                CountryIds:[selectCountry?.value]
            }
            FetchApiPost('services/CRM/City/GetCitiesByCountryIds', 'POST',body)
                .then(res => {
                    if (res.status === 200) {
                        res.json().then(res => {
                            setCity(res?.data?.map(data => {
                                return {
                                    value: data?.id,
                                    label: data?.cityName
                                }
                            }))
                            setSelectCity(
                                {
                                    value: res.data[0]?.id,
                                    label: res.data[0]?.cityName
                                }
                            )
                        })
                    }
                    else {
                        history.push('/error-500')
                    }
                })
        }
       
    }, [history, selectCountry])

    return (
        <>
            <GlobalModal
                showModal={show}
                setShowModal={setShow}
                toggle={() => setShow(false)}
                header={t('Add Branch')}
                body={
                    <div>
                         <SingleSelects
                            label='type'
                            isStar={true}
                            options={type}
                            selectedItems={selectType}
                            setSelectedItems={setSelectType}
                            width='100%'
                            clearIcon={false}
                        />
                        {
                            selectType?.value === 1
                                ? <>
                                    <SingleSelects
                                        label='name'
                                        isStar={true}
                                        options={bankName}
                                        selectedItems={selectBankName}
                                        setSelectedItems={setSelectBankName}
                                        width='100%'
                                    />
                                    <SingleSelects
                                        label='country'
                                        isStar={true}
                                        options={country}
                                        selectedItems={selectCountry}
                                        setSelectedItems={setSelectCountry}
                                        width='100%'
                                    />
                                    <NewInput
                                        label='branch code'
                                        isStar={true}
                                        value={branchCode}
                                        setValue={setBranchCode}
                                        width='100%'
                                        placeholder='branch code'
                                    />
                                    <SingleSelects
                                        label='city'
                                        isStar={true}
                                        options={city}
                                        selectedItems={selectCity}
                                        setSelectedItems={setSelectCity}
                                        width='100%'
                                    />
                                    <NewInput
                                        label='adress'
                                        isStar={true}
                                        value={adress}
                                        setValue={setAdress}
                                        width='100%'
                                        placeholder='adress'
                                    />
                                </>
                                : <>
                                    <SingleSelects
                                        label='case name'
                                        isStar={true}
                                        options={caseName}
                                        selectedItems={selectCaseName}
                                        setSelectedItems={setSelectCaseName}
                                        width='100%'
                                    />
                                    <SingleSelects
                                        label='company'
                                        isStar={true}
                                        options={company}
                                        selectedItems={selectCompany}
                                        setSelectedItems={setSelectCompany}
                                        width='100%'
                                    />
                                    <NewInput
                                        label='name'
                                        isStar={true}
                                        value={branchName}
                                        setValue={setBranchName}
                                        width='100%'
                                        placeholder='name'
                                    />
                                </>
                        }
                    </div>
                }
                footer={
                    <>
                        <ButtonB variant="light" onClick={() => setShow(false)}>
                            {t('cancel')}
                        </ButtonB>
                        <ButtonB
                            variant="primary"
                            onClick={addBranch}
                            disabled={
                                selectType?.value === 1
                                    ? selectCountry !== undefined &&
                                        selectType !== undefined &&
                                        selectBankName !== undefined &&
                                        branchCode !== '' &&
                                        selectCity !== undefined &&
                                        adress !== ''
                                        ? false
                                        : true
                                    : caseName !== undefined &&
                                        selectCompany !== undefined &&
                                        branchName !== ''
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

export default AddBranch