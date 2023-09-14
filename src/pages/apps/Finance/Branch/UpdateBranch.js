import React, { useEffect, useState } from 'react'
import GlobalModal from '../../../../components/GlobalNew/Modal'
import { useTranslation } from 'react-i18next'
import { Button as ButtonB } from 'react-bootstrap';
import { NewInput } from '../../../../components/GlobalNew/Inputs';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';

const Update = ({
    show,
    setShow,
    callTable,
    setCallTable,
    data,
    setIsApply
}) => {

    const { t } = useTranslation();
    const history = useHistory();

    /**user empId */
    const userId = Number(localStorage.getItem('userEmpId'));

    /**created by */
    const createdBy = localStorage.getItem('userName');

  
    /**error modal */
    const [errorModal, setErrorModal] = useState(false);

    /**error modal text */
    const [errorModalText, setErrorModalText] = useState('');

    /**country */
    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState({
        value:data?.countryId,
        label:data?.country
    });

    /**company */
    const [company, setCompany] = useState([]);
    const [selectCompany, setSelectCompany] = useState({
        value:data.companyId,
        label:data.company
    });

    /**type */
    const [type, setType] = useState([]);
    const [selectType, setSelectType] = useState({
        value:data?.typeId,
        label:data?.type
    });
  
    /**bank name */
    const [bankName, setBankName] = useState([]);
    const [selectBankName, setSelectBankName] = useState({
        value:data?.bankId,
        label:data?.bankName
    });
 
    /**branch code */
    const [branchCode, setBranchCode] = useState(data?.branchCode);

    /**swift */
    const [swift, setSwift] = useState([]);
    const [selectSwift, setSelectSwift] = useState({
        value:data?.swiftId,
        label:data?.swift
    });

    /**adress */
    const [adress, setAdress] = useState(data?.adress);

    /**name */
    const [name, setName] = useState(data?.name);
    
    const updateBranch = () => {
        const body = {
             id :data.id,
             bankId : selectBankName?.value,
             branchCode :branchCode,
             name :name,
             countryId : data.typeId === 1 ? selectCountry?.value : 0,
             companyId : data.typeId === 2 ? selectCompany?.value : 0,
             cityId : 0,
             address :adress,
             modifiedBy : createdBy
        }

        if(selectBankName !== undefined && branchCode !== '' && adress !== '' && (selectCountry !== undefined || selectCompany !== undefined)) {
            FetchApiPost('services/Finance/Branch/UpdateBranch','POST',body)
            .then(res => {
                if(res.status === 201) {
                    setShow(false);
                    setIsApply(true);
                }
                else if(res.status === 409) {
                    setErrorModal(true);
                    res.json().then(data => setErrorModalText(data?.errors[0]));
                }
                else {
                    history.push('/error-500')
                }
              })
        }
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
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
    }, [history, userId])

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
                })
            }
            else {
                history.push('/error-500')
            }
        })
    
}, [history, userId])

    // /**type */
    // useEffect(() => {
    //     FetchApiGet('services/Finance/Branch/GetTypes', 'GET')
    //         .then(res => {
    //             if (res.status === 200) {
    //                 res.json().then(res => {
    //                     setType(res?.data?.map(data => {
    //                         return {
    //                             value: data?.id,
    //                             label: data?.name
    //                         }
    //                     }))
    //                 })
    //             }
    //             else {
    //                 history.push('/error-500')
    //             }
    //         })
    // }, [history])

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
                        }
                        else {
                             setBankName(res?.data?.map(data => {
                                return {
                                    value: data?.id,
                                    label: data?.name
                                }
                            }))
                        }
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
        }
    }, [history, selectType])

    /**swift code */
    useEffect(() => {
        if(selectBankName){
            FetchApiGet(`services/Finance/Branch/GetSwiftCodeByBankId?bankId=${selectBankName?.value}`, 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setSwift(
                          [ {
                                value: res?.data?.id,
                                label: res?.data?.swiftCode
                            }]
                        )
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
        }
    }, [history, selectBankName])
    
    return (
        <>
            <GlobalModal
                showModal={show}
                setShowModal={setShow}
                toggle={() => setShow(false)}
                header={t('Update Branch')}
                body={
                    <div>
                          {
                            data.typeId === 1
                            ?<SingleSelects
                            label='country'
                            isStar={true}
                            options={country}
                            selectedItems={selectCountry}
                            setSelectedItems={setSelectCountry}
                            width='100%'
                        />
                            :<SingleSelects
                            label='company'
                            isStar={true}
                            options={company}
                            selectedItems={selectCompany}
                            setSelectedItems={setSelectCompany}
                            width='100%'
                        />
                          }
                        <SingleSelects
                            label='type'
                            isStar={true}
                            options={type}
                            selectedItems={selectType}
                            setSelectedItems={setSelectType}
                            width='100%'
                            disabled={true}
                        />
                        <SingleSelects
                            label={selectType.value === 1 ? 'bank name' : 'case name'}
                            isStar={true}
                            options={bankName}
                            selectedItems={selectBankName}
                            setSelectedItems={setSelectBankName}
                            width='100%'
                        />
                       {
                        data.typeId === 2 &&
                        <NewInput
                        label='name'
                        isStar={true}
                        value={name}
                        setValue={setName}
                        width='100%'
                        placeholder='name'
                    />
                       }
                      {
                        data.typeId === 1 &&
                        <>
                          <NewInput
                            label='branch code'
                            isStar={true}
                            value={branchCode}
                            setValue={setBranchCode}
                            width='100%'
                            placeholder='branch code'
                        />
                        <SingleSelects
                            label='swift code'
                            isStar={true}
                            options={swift}
                            selectedItems={selectSwift}
                            setSelectedItems={setSelectSwift}
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
                      }
                    </div>
                }
                footer={
                    <>
                        <ButtonB variant="light" onClick={() => setShow(false)}>
                            {t('cancel')}
                        </ButtonB>
                        <ButtonB
                            variant="warning"
                            onClick={updateBranch}
                            disabled={
                                selectCountry !== undefined &&
                                selectType !== undefined &&
                                selectBankName !== undefined &&
                                branchCode !== '' &&
                                selectSwift !== undefined &&
                                adress !== ''
                                ? false
                                : true
                            }
                            >
                            {t('update')}
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

export default Update