import React from 'react'
import { Form, Row } from 'react-bootstrap'
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { useEffect } from 'react';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import { useHistory } from 'react-router';
import Loading from '../../../components/Loading';
import { MultipleSelects, SingleSelects } from '../../../components/GlobalNew/Selects';
import { useTranslation } from 'react-i18next';
import Filters from '../../../components/Filter';
import { useDispatch } from 'react-redux';
import { reconciliationFilterDatas } from '../../../redux/reconciliation/actions';
 
const Filter = ({
    tableData,
    setTableData
}) => {

    const { RangePicker } = DatePicker;
    const { t } = useTranslation();

    const history = useHistory();
    const [radioButtonName, setRadioButtonName] = useState('seller');

    const dispatch = useDispatch();

    const empId = localStorage.getItem('userEmpId');
   
    //Country
    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState();
    const [countryLoading, setCountryLoading] = useState();

    //Seller Type
    const [sellerType, setSellerType] = useState([]);
    const [selectSellerType, setSelectSellerType] = useState();
    const [sellerTypeLoading, setSellerTypeLoading] = useState();

    //Single Seller
    const [sellerSingle, setSellerSingle] = useState([]);
    const [selectSellerSingle, setSelectSellerSingle] = useState();
    const [sellerSingleLoading, setSellerSingleLoading] = useState();
        
    // Multy Seller
    const [sellerMulty, setSellerMulty] = useState([]);
    const [selectSellerMulty, setSelectSellerMulty] = useState([]);
    const [sellerMultyLoading, setSellerMultyLoading] = useState();

    // Type of contractor
    const [typeOfContractor, setTypeOfContractor] = useState([]);
    const [selectTypeOfContractor, setSelectTypeOfContractor] = useState([]);
    const [typeOfContractorLoading, setTypeOfContractorLoading] = useState();

    // Buyer Multi
    const [buyerMulti, setBuyerMulti] = useState([]);
    const [selectBuyerMulti, setSelectBuyerMulti] = useState([]);
    const [buyerMultiLoading, setBuyerMultiLoading] = useState();
   
    // Buyer Single
    const [buyerSingle, setBuyerSingle] = useState([]);
    const [selectBuyerSingle, setSelectBuyerSingle] = useState();
    const [buyerSingleLoading, setBuyerSingleLoading] = useState();
   
    // Buyer Country
    const [buyerCountry, setBuyerCountry] = useState([]);
    const [selectBuyerCountry, setSelectBuyerCountry] = useState([]);

    // Agreement
    const [agreement, setAgreement] = useState([]);
    const [selectAgreement, setselectAgreement] = useState([]);
    const [agreementLoading, setAgreementLoading] = useState();

    // Valid / not valid
    const [valid, setValid] = useState([]);
    const [selectValid, setSelectValid] = useState([]);
    const [validLoading, setValidLoading] = useState();

    // Currency
    const [currency, setCurrency] = useState([]);
    const [selectCurrency, setSelectCurrency] = useState();
    const [currencyLoading, setCurrencyLoading] = useState();

    const [startDate, setStartDate] = useState(moment().format('DD/MM/YYYY'));
    const [endDate, setEndDate] = useState(moment().format('DD/MM/YYYY'));

    const [applyLoading, setApplyLoading] = useState(false);

    const filters = [
        {
            options: country,
            change: setSelectCountry,
            value: selectCountry,
            placeHolder: 'country',
            multy: false
        },
        {
            options: sellerType,
            change: setSelectSellerType,
            value: selectSellerType,
            placeHolder: 'seller type',
            multy: false
        },
        {
            options: radioButtonName === 'seller' ?  sellerSingle : buyerSingle ,
            change: radioButtonName === 'seller' ?  setSelectSellerSingle :setSelectBuyerSingle,
            value: radioButtonName === 'seller' ? selectSellerSingle :selectBuyerSingle ,
            placeHolder: radioButtonName === 'seller' ? 'seller' : 'buyer',
            multy:  false 
        },
        {
            options: radioButtonName !== 'seller' ?  sellerSingle : buyerSingle ,
            change: radioButtonName !== 'seller' ?  setSelectSellerSingle :setSelectBuyerSingle,
            value: radioButtonName !== 'seller' ? selectSellerSingle :selectBuyerSingle ,
            placeHolder: radioButtonName !== 'seller' ? 'seller' : 'buyer',
            multy:  false 
        },
        {
            options: typeOfContractor,
            change: setSelectTypeOfContractor,
            value: selectTypeOfContractor,
            placeHolder: 'type of contractor',
            multy: true
        },
        {
            options: agreement,
            change: setselectAgreement,
            value: selectAgreement,
            placeHolder: 'aggrement',
            multy: true
        },
        {
            options: valid,
            change: setSelectValid,
            value: selectValid,
            placeHolder: 'valid / not valid',
            multy: true
        },
        {
            placeHolder: 'date',
            options: [],
            state: [],
            setState: []
        },
        {
            options: currency,
            change: setSelectCurrency,
            value: selectCurrency,
            placeHolder: 'currency',
            multy: false
        },
    ]

    const onChangeDate = (dates) => {
        if (dates) {
            const [start, end] = dates;
            setStartDate(moment(start).format());
            setEndDate(moment(end).format());
        } else {
            setStartDate([]);
            setEndDate([]);
        }
    };

    const filterComponentsData = [
        {
            label: 'country',
            state: selectCountry,
            setState: setSelectCountry,
            options: country,
            type: 'singleselect'
        },
        {
            label: 'seller type',
            state: selectSellerType,
            setState: setSelectSellerType,
            options: sellerType,
            type: 'singleselect'
        },
        {
            label: radioButtonName === 'seller' ? 'seller' : 'buyer',
            state: radioButtonName === 'seller' ? selectSellerSingle :selectBuyerSingle ,
            setState: radioButtonName === 'seller' ?  setSelectSellerSingle :setSelectBuyerSingle,
            options: radioButtonName === 'seller' ?  sellerSingle : buyerSingle ,
            type: 'singleselect'
        },
        {
            label: 'buyer country',
            state: selectBuyerCountry,
            setState: setSelectBuyerCountry,
            options: buyerCountry,
            type: 'singleselect'
        },
        {
            label: radioButtonName !== 'seller' ? 'seller' : 'buyer',
            state: radioButtonName !== 'seller' ? selectSellerSingle :selectBuyerSingle ,
            setState: radioButtonName !== 'seller' ?  setSelectSellerSingle :setSelectBuyerSingle,
            options: radioButtonName !== 'seller' ?  sellerSingle : buyerSingle ,
            type: 'singleselect'
        },
        {
            label: 'type of contractor',
            state: selectTypeOfContractor,
            setState: setSelectTypeOfContractor,
            options: typeOfContractor,
            type: 'multiselect'
        },
        {
            label: 'aggrement',
            state: selectAgreement,
            setState: setselectAgreement,
            options: agreement,
            type: 'multiselect'
        },
        {
            label: 'valid / not valid',
            state: selectValid,
            setState: setSelectValid,
            options: valid,
            type: 'multiselect'
        },
        {
            label: 'date',
            state: [],
            setState: onChangeDate,
            options: [],
            type: 'rangepicker'
        },
        {
            label: 'currency',
            state: selectCurrency,
            setState: setSelectCurrency,
            options: currency,
            type: 'singleselect'
        },
    ]


    const todayDay = `${new Date().toLocaleDateString('en-us')}` ;
  
    const applyFilter = () => {

        const body = {
            EmpId: empId,
            SellerCountryId: selectSellerSingle?.CountryId,
            SellerType: selectSellerType?.value,
            SellerId: selectSellerSingle?.value,
            TypeOfContract:String( selectTypeOfContractor?.map(data => data.value)),
            BuyerCountryId: selectCountry?.value,
            BuyerId: selectBuyerSingle?.value,
            Aggrement: selectAgreement?.value,
            Status: "1",
            StartDate: startDate.length === 0 ? todayDay : startDate,
            FinishDate: endDate.length === 0 ? todayDay : endDate,
            Currency: selectCurrency?.value
        }

        setApplyLoading(true);
        FetchApiPost('api/Reconcilation/GetReconcilationData','POST',body)
        .then((res) =>
        (async () => {
            try {
                if (res.status === 200) {
                    res.json().then(data => {
                        setApplyLoading(false);
                        setTableData(data?.map((item,index) =>(
                            {
                                id:index,
                                typeOfContractor:item.TypeOfContract === null ? '-' : item.TypeOfContract,
                                agreement:item.Aggrement === null ? '-' : item.Aggrement,
                                seller:item.Seller === null ? '-' : item.Seller,
                                buyer:item.Buyer === null ? '-' : item.Buyer,
                                docType:item.DocType,
                                documentNo:item.DocumentNumber === null ? '-' : item.DocumentNumber,
                                date:item.Date,
                                debit:item.Debit,
                                debitCurrency:item.Currency,
                                credit:item.Credit,
                                creditCurrency:item.Currency,
                                balance:item.Balance,
                                balanceCurrency:item.Currency,
                                exchangeRange:item.Rate,
                                connection:item.Connect === null ? '-' : item.Connect
                            }
                        )))
                       
                    })

                }
                else if (res.status === 500 || res.status === 499) {
                    setApplyLoading(false);
                    history.push('/error-500');

                }
                else {
                    setApplyLoading(false);
                }

            } catch (error) {
                console.log('error', error);
            }
        })()
    )
    }

    // Country 
    useEffect(() => {
        setCountryLoading(true);
        FetchApiGet(`api/Reconcilation/GetCountry?empId=${empId}`, 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setCountryLoading(false);
                            res.json().then(item => {
                                return (
                                    setCountry(item.map(data => (
                                        {
                                            value: data.Id,
                                            label: data.Val1
                                        }
                                    ))),
                                    setSelectCountry({
                                        value: item[0]?.Id,
                                        label: item[0]?.Val1
                                    }),
                                    setBuyerCountry(item.map(data => (
                                        {
                                            value: data.Id,
                                            label: data.Val1
                                        }
                                    ))),
                                    setSelectBuyerCountry({
                                        value: item[0]?.Id,
                                        label: item[0]?.Val1
                                    })
                                )
                            })
                        }
                        else if (res.status === 500 || res.status === 499) {
                            history.push('/error-500');
                        }
                        else {
                            console.log('hata');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }, [empId, history])

    // Valid
    useEffect(() => {
        setValidLoading(true);
        FetchApiGet('api/Reconcilation/GetValidStatus', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setValidLoading(false);
                            res.json().then(item => {
                                return (
                                    setValid(item.map(data => (
                                        {
                                            value: data.Val1,
                                            label: data.Val1
                                        }
                                    ))),
                                    setSelectValid(item.map(data => (
                                        {
                                            value: data.Val1,
                                            label: data.Val1
                                        }
                                    )))
                                )
                            })
                        }
                        else if (res.status === 500) {
                            history.push('/error-500');
                        }
                        else if (res.status === 499) {
                            history.push('/error-500');
                        }
                        else {
                            console.log('hata');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )

        // Currency
        setCurrencyLoading(true);
        FetchApiGet('api/Reconcilation/GetCurrency', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setCurrencyLoading(false);
                            res.json().then(item => {
                                
                                    setCurrency(item.map(data => (
                                        {
                                            value: data.Id,
                                            label: data.Val1
                                        }
                                    )));
                                    const selectObj = item?.filter(el => el?.Id === 1);
                                    setSelectCurrency(
                                        {
                                            value: selectObj[0].Id,
                                            label: selectObj[0].Val1
                                        }
                                    )
                                
                            })
                        }
                        else if (res.status === 500) {
                            history.push('/error-500');
                        }
                        else if (res.status === 499) {
                            history.push('/error-500');
                        }
                        else {
                            console.log('hata');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }, [history])

    // Seller Type
    useEffect(() => {
        setSellerTypeLoading(true);
        FetchApiGet('api/Reconcilation/GetSellerType', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            setSellerTypeLoading(false);
                            res.json().then(item => {
                                return (
                                    setSellerType(item.map(data => (
                                        {
                                            value: data.Id,
                                            label: data.Val1
                                        }
                                    ))),
                                    setSelectSellerType({
                                        value: item[0]?.Id,
                                        label: item[0]?.Val1
                                    })
                                )
                            })
                        }
                        else if (res.status === 500) {
                            history.push('/error-500');
                        }
                        else if (res.status === 499) {
                            history.push('/error-500');
                        }
                        else {
                            console.log('hata');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }, [history])

    // Seller
    useEffect(() => {
        if (selectCountry  && selectSellerType ) {

            const body = {
                SellerCountryId: selectCountry.value,
                SellerType: selectSellerType.value
            }
            // Seller 
            setSellerSingleLoading(true);
            FetchApiPost('api/Reconcilation/GetSeller', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                setSellerSingleLoading(false);
                                res.json().then(item => {
                                    return (
                                        setSellerSingle(item.map(data => (
                                            {
                                                value: data.Value,
                                                label: data.Text,
                                                CountryId:data.CountryId,
                                                SellerId:data.SellerId,
                                                SellerType:data.SellerType
                                            }
                                        ))),
                                        setSelectSellerSingle(
                                            {
                                                value: item[0]?.Value,
                                                label: item[0]?.Text,
                                                CountryId:item[0]?.CountryId,
                                                SellerId:item[0]?.SellerId,
                                                SellerType:item[0]?.SellerType
                                            }
                                        )
                                    )
                                })
                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }
                            else if (res.status === 499) {
                                history.push('/error-500');
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
    }, [history, selectCountry, selectSellerType])

    // Buyer 
    useEffect(() => {
        if (selectBuyerCountry   && selectSellerSingle?.value) {
            const body = {
                SellerId: selectSellerSingle.value,
                BuyerCountryId: selectBuyerCountry.value
            } 
            setBuyerSingleLoading(true);
            FetchApiPost('api/Reconcilation/GetBuyer', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                setBuyerSingleLoading(false);
                                res.json().then(item => {
                                    setBuyerSingle(item.map(data => (
                                        {
                                            value:data.Value,
                                            label:data.Text,
                                            buyerId:data.BuyerId,
                                            CountryId:data.CountryId
                                        }
                                    )))
                                    setSelectBuyerSingle(
                                        {
                                            value:item[0]?.Value,
                                            label:item[0]?.Text,
                                            buyerId:item[0]?.BuyerId,
                                            CountryId:item[0]?.CountryId
                                        }
                                    )
                                })
                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }
                            else if (res.status === 499) {
                                history.push('/error-500');
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
    }, [history, selectBuyerCountry, selectSellerSingle])

    // Type of Contractor
    useEffect(() => {
        if (selectBuyerMulti.length !== 0 || selectBuyerSingle) {

            const body = {
                BuyerID:selectBuyerSingle.value
            }

            setTypeOfContractorLoading(true);
            FetchApiPost('api/Reconcilation/GetTypeOfContract', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                setTypeOfContractorLoading(false);
                                res.json().then(item => {
                                    setTypeOfContractor(item.map(data =>(
                                        {
                                            value:data.Id,
                                            label:data.Val1
                                        }
                                    )))
                                    setSelectTypeOfContractor(item.map(data =>(
                                        {
                                            value:data.Id,
                                            label:data.Val1
                                        }
                                    )))
                                })
                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }
                            else if (res.status === 499) {
                                history.push('/error-500');
                            }
                            else {
                                console.log('hata');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )

                setAgreementLoading(true);
                FetchApiPost('api/Reconcilation/GetAggrement', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                setAgreementLoading(false);
                                res.json().then(item => {
                                    setAgreement(item.map(data => (
                                        {
                                            value:data.Id,
                                            label:data.Val1
                                        }
                                    )))
                                    setselectAgreement(item.map(data => (
                                        {
                                            value:data.Id,
                                            label:data.Val1
                                        }
                                    )))
                                })
                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }
                            else if (res.status === 499) {
                                history.push('/error-500');
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
    }, [history, selectBuyerMulti, selectBuyerSingle])

    useEffect(() => {
      dispatch(reconciliationFilterDatas({
        country:selectCountry,
        sellerType:selectSellerType,
        seller:selectSellerSingle,
        buyer:selectBuyerSingle,
        typeOfContractor:selectTypeOfContractor,
        aggrement:selectAgreement,
        valid:selectValid,
        startDate:startDate,
        endDate:endDate,
        currency:selectCurrency
      }))
    }, [dispatch, endDate, selectAgreement, selectBuyerSingle, selectCountry, selectCurrency, selectSellerSingle, selectSellerType, selectTypeOfContractor, selectValid, startDate])
    

    return (
        <div>
            <Row>
                <div className='d-flex'>
                    <div className='d-flex  me-3'>
                        <label>{t('total')}</label>
                        <Form.Check
                            type='switch'
                            className='text-center'
                            disabled
                            checked={true}
                        />
                        <label>{t('detail')}</label>
                    </div>
                    <Form.Check
                        inline
                        label="seller"
                        name="group1"
                        type={'radio'}
                        id={`inline-seller-1`}
                        onChange={(e) => setRadioButtonName(e.target.value)}
                        value='seller'
                        defaultChecked={true}
                    />

                    <Form.Check
                        inline
                        label="buyer"
                        name="group1"
                        type={'radio'}
                        id={`inline-buyer-1`}
                        onChange={(e) => setRadioButtonName(e.target.value)}
                        value='buyer'
                    />
                </div>
            </Row>
            <Filters
            filterComponentsData={filterComponentsData}
            getAllFilterData={applyFilter}
            isFilterBtn={false}
            isRangePickerDisabled={false}
            />
            {/* <div className="connect-material-filter-container">

                <div className='connect-material-filter-container-filters' >
                    {
                        filters.map(data => (
                            data.placeHolder !== 'date'
                                ?
                                data.multy === true
                                    ?
                                    <MultipleSelects
                                        options={data.options}
                                        selectedItems={data.value}
                                        setSelectedItems={data.change}
                                        label={data.placeHolder}
                                        className="filter-radius"
                                        placeholder='select...'
                                        width={'10rem'}
                                        labelStyle={{ color: '#6c757d' }}
                                        size="small"
                                        status={'default'}
                                    />
                                    :
                                    <SingleSelects
                                        options={data.options}
                                        selectedItems={data.value}
                                        setSelectedItems={data.change}
                                        label={data.placeHolder}
                                        className="filter-radius"
                                        width={'10rem'}
                                        labelStyle={{ color: '#6c757d' }}
                                        size="small"
                                        status={'default'}
                                    />
                                :
                                <div style={{display:'grid'}} >
                                    <label className='label-text-field'>{t('Date')}</label>
                                    <RangePicker
                                        style={{
                                            width: '10rem',
                                        }}
                                        className="connect-material-filter-container-filters-date"
                                        onChange={onChangeDate}
                                        format="DD/MM/YYYY"
                                        separator={
                                            <i
                                                style={{ color: '#c7c7c7', paddingTop: '3px' }}
                                                className="fas fa-arrow-right"></i>
                                        }
                                    />
                                </div>
                        ))
                    }
                </div>

                <div className="connect-material-filter-container-buttons">
                        <Icon
                            className="filter-button-icons"
                            path={mdiCheck}
                            size={1}
                            color={'#0ACF97'}
                            onClick={applyFilter}
                        />
                        <Icon
                            path={mdiDeleteSweepOutline}
                            className="filter-button-icons"
                            size={1}
                            color={'#FA5C7C'}

                        />
                        <Icon
                            path={mdiClose}
                            size={1}
                            color={'#6C757D'}
                            className="filter-button-icons"
                        />
                    </div>
            </div> */}
            
            <Loading loading={countryLoading} />
            <Loading loading={sellerTypeLoading} />
            <Loading loading={validLoading} />
            <Loading loading={currencyLoading} />
            <Loading loading={buyerSingleLoading} />
            <Loading loading={agreementLoading} />
            <Loading loading={applyLoading} />
        </div>
    )
}

export default Filter