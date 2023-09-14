import React, { useState, useEffect, useMemo } from 'react';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PlannedVisit from '../../EditEvent/PlannedVisit/index';
import EditEventsButtons from '../EditEventsButtons';
import HomePageButtons from './HomePageButtons';
import NumberOfPatients from '../NumberOfPatient/index';
import VisitPromo from '../VisitEvulotion/Promo';
import VisitNonPromo from '../VisitEvulotion/NonPromo';
import VisitOther from '../VisitEvulotion/Other';
import LoyaltyPromo from '../LoyaltyProduct/Promo';
import LoyaltyNonPromo from '../LoyaltyProduct/NonPromo';
import LoyaltyOther from '../LoyaltyProduct/Other';
import AddPharmacySplit from '../PharmacySplit/AddPharmacySplit';
import Wants from '../Wants/index';
import Previous from '../Previous/index';
import New from '../New/index';
import Coa from '../CoA/index';
import PromoMaterial from '../PromoMaterial/PromoMaterial';
import FinishReport from '../FinishedReport/FinishReport';
import FinishReportButtons from '../FinishedReport/FinishReportButtons';
import HomePageTitle from './HomePageTitle';
import EventDeleteModal from '../../../../../components/Modals/EventDeleteModal';
import HomePageUpdate from './HomePageUpdate';
import { useHistory } from 'react-router-dom';
import { pharmacySplitData } from '../../../../../redux/actions';

import GlobalModal from '../../../../../components/GlobalNew/Modal';
import NewUpdate from './NewUpdate';

const HomePage = (props) => {
    const { isOpen, onClose, hideRm, setShow, onSubmitUpdateForm, setOnSubmitUpdateForm,setIsOpen } = props; //Props get index.js(calendar)

    
    const history = useHistory();

    const dispatch = useDispatch();
    

    const page = useSelector((state) => state.Calendar.changePage);
    const pageSplit = useSelector((state) => state.Calendar.splitPage);
    const eventData = useSelector((state) => state.Calendar.eventData);
    const eventId = useSelector((state) => state.Calendar.eventId);
    const eventDetailId = useSelector(state => state.Calendar.eventData.eventDetailId);
    const pharmacyTable = useSelector((state) => state.Calendar.pharmacyData);
    const appStatus = useSelector((state) => state.Calendar.appStatus);
    const [closeModal, setCloseModal] = useState(false);
    const [handleButton, setHandleButton] = useState(false);
    const [reportTitle, setReportTitle] = useState('EDIT EVENT');

    // Visit Evulotion
    const [visitEvolationsPromo, setVisitEvolationsPromo] = useState([]);

    const [visitEvolationsNonPromo, setVisitEvolationsNonPromo] = useState([]);
    const [visitEvulotionsOther, setVisitEvulotionsOther] = useState([]);
    const [visitEvulotionCounter, setVisitEvulotionCounter] = useState({ promo: null, nonpromo: null, other: null });
    // Loyalty
    const [loyaltyPromo, setLoyaltyPromo] = useState([]);
    const [loyaltyNonPromo, setLoyaltyNonPromo] = useState([]);
    const [loyaltyOther, setLoyaltyOther] = useState([]);
    const [loyaltyProductCounter, setLoyaltyProductCounter] = useState({ promo: 0, nonpromo: 0, other: 0 });
    // Planned Visit
    const [customerInfo, setCustomerInfo] = useState();
    const [promo, setPromo] = useState([]);
    const [nonPromo, setNonPromo] = useState([]);
    const [addPromited, setAddPromited] = useState([]);
    const [image, setImage] = useState('');
    // Promo Material
    const [promoMaterial, setPromoMaterial] = useState([]);
    const [materialData, setMaterialData] = useState([]);
    const [selectPromoMaterial, setSelectPromoMaterial] = useState([]);
    // Number Of Patients
    const [product, setProduct] = useState();
    const [totalNumber, setTotalNumber] = useState(null);
    const [totalProfileNumber, setTotalProfileNumber] = useState(0);
    const [totalProfile, settotalProfile] = useState(null);
    // Pharmacy Split
    const [pharmacytTableData, setPharmacytTableData] = useState([]);
    const [backupPharmacyTableData, setBackupPharmacyTableData] = useState([]);
    const [clinicName, setClinicName] = useState([]);
    const [selectClinicName, setSelectClinicName] = useState();
    const [pharmacy, setPharmacy] = useState([]);
    const [selectPharmacy, setSelectPharmacy] = useState();
    const [inputPercent, setInputPercent] = useState(100);
    const [successModal, setSuccessModal] = useState(false);
    const [pharmacytTableDataCopy, setPharmacytTableDataCopy] = useState([]);

    // Wants
    const [wantsName, setWantsName] = useState([]);
    
    // Previous
    const [previousInput, setPreviousInput] = useState();
    const [previousText, setPreviousText] = useState();
    // New
    const [contactInfo, setContactInfo] = useState([
        // { value: 1522926, label: 'BESTE PULLUKÇU', mail: 'b.pullukcu@diten.tech', title: 'TEAM LEADER' },
        // { value: 1522927, label: 'METEHAN ATAKAN', mail: 'm.atakakan@diten.tech', title: 'FRONTEND' },
        // { value: 1522928, label: 'EMİR BALCI', mail: 'e.balci@diten.tech', title: 'BACKEND' },
    ]);

    const [isChecked, setIsChecked] = useState();
    const [selectMailName, setSelectMailName] = useState({ value: null, label: null, mail: null, title: null });
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [newRadioIsCheckedPromo, setNewRadioIsCheckedPromo] = useState(false);
    const [newRadioIsCheckedServis, setNewRadioIsCheckedServis] = useState(false);
    // CoA
    const [coaValue, setCoaValue] = useState(null);
    // Next Button Disable
    const [buttonDisable, setButtonDisable] = useState({ disable: true, message: null });

    const [resetButton, setResetButton] = useState({ buttonStatus: false, loyaltyName: null });

    const [newNumberBrandName, setNewNumberBrandName] = useState([]); // tablar için 330 750
    const [newNumberIndicationName, setNewNumberIndicationName] = useState([]); // indication tabları için

    const [complatedButton, setComplatedButton] = useState(true); // Number of Patient compalated button

    // const savePharmacy = () => {
    //     console.log('save pharmacy');
    //     setSuccessModal(true);
    //     setPharmacytTableDataCopy(
    //         pharmacytTableData.map((item) => ({
    //             category: item.category,
    //             clinicId: item.clinicId,
    //             clinicName: item.clinicName,
    //             customerId: item.customerId,
    //             customerName: item.customerName,
    //             eventId: item.eventId,
    //             inputPercent: item.inputPercent,
    //             label: item.label,
    //             value: item.value,
    //         }))
    //     );

    //     const pharmacySaveBody = {
    //         EventId: eventId,
    //         details: pharmacytTableData.map((data) => ({
    //             ClinicId: selectClinicName.value,
    //             ClinicName: selectClinicName.label,
    //             CustomerId: 0,
    //             CustomerName: 'string',
    //             PharmacyId: data.value,
    //             PharmacyName: data.label,
    //             Category: data.category,
    //             PharmacyPercent: data.inputPercent,
    //         })),
    //     };

    //     FetchApiPost('services/Daywork/Split/SaveClinicConnectedPharmacy', 'POST', pharmacySaveBody)
    //         .then((response) => response.json())
    //         .then((response) => console.log(response))
    //         .catch((error) => console.log(error));
    // };

    const resetPharmacyTableData =  () => {
        FetchApiGet(`services/Daywork/Split/GetClinicConnectedPharmacyByEventId?eventId=${eventId}`, 'GET')
        .then((res) =>
             (async () => {
               try {
                 if (res.status === 200) {
                   res.json().then(item => {
                    setPharmacytTableData(item?.data?.map(data => (
                         {
                            value: data.pharmacyId,
                            label: data.pharmacyName,
                            inputPercent: data.pharmacyPercent,
                            category: data.category,
                            clinicId: data.clinicId,
                            clinicName: data.clinicName,
                            customerId: data.customerId,
                            customerName: data.customerName,
                            eventId: data.eventId,
                            pharmacyId:data.pharmacyId,
                            pharmacyName:data.pharmacyName
                        }
                    )))
                   })
   
                 }
                 else if (res.status === 401) {
                   history.push('/error-404');
                 }
                 else if (res.status === 500 || res.status === 499) {
                   history.push('/error-500');
                 }
   
               } catch (error) {
                 console.log('error', error);
               }
             })()
           )
    };

    useEffect(() => {
        if (handleButton === true) {
            if (appStatus !== 4) {
                // Planned Visit
                const customerInfoBody = {
                    EventId: eventId,
                    BrandIds: '',
                };
                (async () => {
                    try {
                        const eventid = await { EventId: Number(eventId) };
                        const response = await FetchApiPost('api/OldSystem/GetPromoMaterials', 'POST', eventid);
                        const json = await response.json();
                        await setMaterialData([...json]);
                    } catch (error) {
                        console.log(error);
                    }
                })();
                FetchApiPost('api/OldSystem/GetCustomerInfo', 'POST', customerInfoBody)
                    .then((response) => response.json())
                    .then((response) => setCustomerInfo(response))
                    .catch((error) => console.log(error));

                FetchApiGet(
                    `services/daywork/eventreport/GetEventReportProductsByEventDetailId?eventDetailId=${eventDetailId}`,
                    'POST'
                )
                    .then((response) => response.json())
                    .then((response) =>
                        response.data.map((data) =>
                            data.isPromo === true
                                ? data.isAdditional === false
                                    ? (setPromo((prev) => [
                                          ...prev,
                                          {
                                              value: data.productId,
                                              label: data.productName,
                                              isAdditional: data.isAdditional, 
                                              isPromo: data.isPromo,
                                          },
                                      ]),
                                      setPromoMaterial((prev) => [
                                          ...prev,
                                          { label: data.productName, id: data.productId },
                                      ]))
                                    : (setAddPromited((prev) => [
                                          ...prev,
                                          {
                                              value: data.productId,
                                              label: data.productName,
                                              isAdditional: data.isAdditional,
                                              isPromo: data.isPromo,
                                          },
                                      ]),
                                      setPromoMaterial((prev) => [
                                          ...prev,
                                          { label: data.productName, id: data.productId },
                                      ]))
                                : data.isPromo === false
                                ? data.isAdditional === false
                                    ? (setNonPromo((prev) => [
                                          ...prev,
                                          {
                                              value: data.productId,
                                              label: data.productName,
                                              isAdditional: data.isAdditional,
                                              isPromo: data.isPromo,
                                          },
                                      ]),
                                      setPromoMaterial((prev) => [
                                          ...prev,
                                          { label: data.productName, id: data.productId },
                                      ]))
                                    : (setAddPromited((prev) => [
                                          ...prev,
                                          {
                                              value: data.productId,
                                              label: data.productName,
                                              isAdditional: data.isAdditional,
                                              isPromo: data.isPromo,
                                          },
                                      ]),
                                      setPromoMaterial((prev) => [
                                          ...prev,
                                          { label: data.productName, id: data.productId },
                                      ]))
                                : null
                        )
                    )
                    .catch((error) => console.log(error));
                // Visit Evulotions Promo
                FetchApiGet(
                    `services/daywork/eventreport/GetEventReportPromoProductsByEventId?eventId=${eventId}`,
                    'GET'
                )
                    .then((res) => res.json())
                    .then((res) => res.data)
                    .then((data) => setVisitEvolationsPromo(data.map((item) => item)))
                    .catch((err) => console.log(err));
                // Visit Evulotions Non Promo
                FetchApiGet(
                    `services/daywork/eventreport/GetEventReportNonPromoProductsByEventId?eventId=${eventId}`,
                    'GET'
                )
                    .then((res) => res.json())
                    .then((res) => res.data)
                    .then((data) => setVisitEvolationsNonPromo(data.map((item) => item)))
                    .catch((err) => console.log(err));
                // Visit Evulotions Other
                FetchApiGet(`api/OldSystem/GetExceptPromoAndNonPromoProductList?EventId=${eventId}`, 'GET')
                    .then((res) => res.json())
                    .then((data) => setVisitEvulotionsOther(data.map((item) => item)))
                    .catch((err) => console.log('OTHER', err));
                //Pharmacy Split
                FetchApiGet(`services/Daywork/Split/GetClinicConnectedPharmacyByEventId?eventId=${eventId}`, 'GET')
                    .then((response) => response.json())
                    .then((response) =>
                        response.data.map((data) => {
                            return (
                                setPharmacytTableData((prev) => [
                                    ...prev,
                                    {
                                        value: data.pharmacyId,
                                        label: data.pharmacyName,
                                        inputPercent: data.pharmacyPercent,
                                        category: data.category,
                                        clinicId: data.clinicId,
                                        clinicName: data.clinicName,
                                        customerId: data.customerId,
                                        customerName: data.customerName,
                                        eventId: data.eventId,
                                        pharmacyId:data.pharmacyId,
                                        pharmacyName:data.pharmacyName
                                    },
                                ]),
                                setBackupPharmacyTableData((prev) => [
                                    ...prev,
                                    {
                                        value: data.pharmacyId,
                                        label: data.pharmacyName,
                                        inputPercent: data.pharmacyPercent,
                                        category: data.category,
                                        clinicId: data.clinicId,
                                        clinicName: data.clinicName,
                                        customerId: data.customerId,
                                        customerName: data.customerName,
                                        eventId: data.eventId,
                                    },
                                ]),
                                setPharmacytTableDataCopy((prev) => [
                                    ...prev,
                                    {
                                        value: data.pharmacyId,
                                        label: data.pharmacyName,
                                        inputPercent: data.pharmacyPercent,
                                        category: data.category,
                                        clinicId: data.clinicId,
                                        clinicName: data.clinicName,
                                        customerId: data.customerId,
                                        customerName: data.customerName,
                                        eventId: data.eventId,
                                    },
                                ]),
                                dispatch(pharmacySplitData(response.data))
                            );
                        })
                    )
                    .catch((error) => console.log(error));
                // Number Of Patients
                FetchApiGet(`services/daywork/eventreport/GetEventReportProfilePatient?EventId=${eventId}`, 'POST')
                    .then((respone) => respone.json())
                    .then((response) => {
                        setProduct(response.data.map((data) => ({ ...data, profileNumber: null })));
                        let newBrans = [];
                        response?.data?.map((data) => {
                            if (
                                newBrans.filter((item) => item.brandName === data.brandList[0].brandName).length === 0
                            ) {
                                if (newBrans.length === 0) {
                                    newBrans.push({
                                        brandName: data.brandList[0].brandName,
                                        brandId: data.brandList[0].brandId,
                                        brandAbb: data.brandList[0].brandAbb,
                                        selected: true,
                                        totalProfile: 0,
                                        enteredProfile: 0,
                                        indications: [],
                                    });
                                } else {
                                    newBrans.push({
                                        brandName: data.brandList[0].brandName,
                                        brandId: data.brandList[0].brandId,
                                        brandAbb: data.brandList[0].brandAbb,
                                        selected: false,
                                        totalProfile: 0,
                                        enteredProfile: 0,
                                        indications: [],
                                    });
                                }
                            }
                        });
                        setNewNumberBrandName(newBrans);
                        let newIndications = [];
                        response?.data?.map((data) => {
                            if (
                                newIndications.filter((item) => item.indicationName === data.indicationName).length ===
                                0
                            ) {
                                newIndications.push({
                                    brandName: data.brandList[0].brandName,
                                    indicationName: data.indicationName,
                                    allData: data,
                                    indications: [{ ...data, profileNumber: null }],
                                });
                            } else {
                                newIndications.map((item, newIndicationIndex) => {
                                    if (
                                        item.indicationName === data.indicationName &&
                                        item.brandName === data.brandList[0].brandName &&
                                        item.indications.filter((profFilter) => profFilter.profileId === data.profileId)
                                            .length === 0
                                    ) {
                                        item.indications.push({ ...data, profileNumber: null });
                                        //newIndications[newIndicationIndex].indications = [...newIndications[newIndicationIndex].indications, {...data, profileNumber: null}]
                                    } else if (
                                        newIndications.filter(
                                            (item) =>
                                                item.indicationName === data.indicationName &&
                                                item.brandName === data.brandList[0].brandName
                                        ).length === 0
                                    ) {
                                        newIndications.push({
                                            brandName: data.brandList[0].brandName,
                                            indicationName: data.indicationName,
                                            allData: data,
                                            indications: [{ ...data, profileNumber: null }],
                                        });
                                    }
                                    // else if((item.indicationName === data.indicationName) && (item.brandName !== data.brandList[0].brandName)){
                                    //     // console.log(data)
                                    //      newIndications.push({brandName: data.brandList[0].brandName ,indicationName: data.indicationName, allData: data, indications: [{...data, profileNumber: null}]})
                                    //  }
                                });
                            }
                        });
                        setNewNumberIndicationName(newIndications);
                    })
                    .catch((error) => console.log(error));

                // FetchApiGet(`api/OldSystem/GetProfilePatientsList/${eventId}`, 'GET').then(res => res.json())
                // Wants
                FetchApiGet(`services/Daywork/EventReport/GetWantsList?id=${eventId}`, 'GET')
                .then((response) => response.json())
                .then((response) =>
                    setWantsName(
                        response.data.map((wants) => ({
                            id: wants.id,
                            name: wants.wantsName,
                            percentNumber: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                            percent: wants.percent,
                        }))
                    )
                )
                .catch((error) => console.log(error));
                // FetchApiGet('services/Daywork/EventReport/GetWants', 'GET')
                //     .then((response) => response.json())
                //     .then((response) =>
                //         setWantsName(
                //             response.data.map((wants) => ({
                //                 id: wants.id,
                //                 name: wants.wantsName,
                //                 percentNumber: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                //                 percent: null,
                //             }))
                //         )
                //     )
                //     .catch((error) => console.log(error));

                //Coa
                FetchApiGet(`services/Daywork/EventReport/GetPreviousCoA?id=${eventId}`, 'GET')
                .then((response) => response.json())
                .then((response) =>
                    setCoaValue(response.data)
                )
                .catch((error) => console.log(error));
                // Loyalty to Product
                FetchApiGet(`api/OldSystem/GetGlobalSkusByBrandIdListEmployeeAndCustomerId?EventId=${eventId}`, 'GET')
                    .then((res) => res.json())
                    .then((res) =>
                        res?.map(
                            (item) => (
                                item.isPromoOrOther === 0 &&
                                    setLoyaltyNonPromo((state) => [
                                        ...state,
                                        {
                                            BrandId: item.BrandId,
                                            GlobalSkuId: item.GlobalSkuId,
                                            GlobalSkuName: item.GlobalSkuName,
                                            isPromoOrOther: item.isPromoOrOther,
                                            percentage: item.Percentage === 0 ? null : item.Percentage,
                                            data: null,
                                            profileIncrement: null,
                                            Profile: item.Profile.map((prof) => ({
                                                Profile: prof.Profile,
                                                ProfileId: prof.ProfileId,
                                                IndicationId: prof.IndicationId,
                                                percentage: prof.Percentage === 0 ? null : prof.Percentage,
                                                data: null,
                                                selectedData: null,
                                                quantity: 0,
                                            })),
                                        },
                                    ]),
                                item.isPromoOrOther === 1 &&
                                    setLoyaltyPromo((state) => [
                                        ...state,
                                        {
                                            BrandId: item.BrandId,
                                            GlobalSkuId: item.GlobalSkuId,
                                            GlobalSkuName: item.GlobalSkuName,
                                            isPromoOrOther: item.isPromoOrOther,
                                            percentage: item.Percentage === 0 ? null : item.Percentage,
                                            data: null,
                                            profileIncrement: null,
                                            Profile: item.Profile.map((prof) => ({
                                                Profile: prof.Profile,
                                                ProfileId: prof.ProfileId,
                                                IndicationId: prof.IndicationId,
                                                percentage: prof.Percentage === 0 ? null : prof.Percentage,
                                                data: null,
                                                selectedData: null,
                                                quantity: 0,
                                            })),
                                        },
                                    ]),
                                item.isPromoOrOther === 2 &&
                                    setLoyaltyOther((state) => [
                                        ...state,
                                        {
                                            BrandId: item.BrandId,
                                            GlobalSkuId: item.GlobalSkuId,
                                            GlobalSkuName: item.GlobalSkuName,
                                            isPromoOrOther: item.isPromoOrOther,
                                            percentage: item.Percentage === 0 ? null : item.Percentage,
                                            data: null,
                                            profileIncrement: null,
                                            Profile: item.Profile.map((prof) => ({
                                                Profile: prof.Profile,
                                                ProfileId: prof.ProfileId,
                                                IndicationId: prof.IndicationId,
                                                percentage: prof.Percentage === 0 ? null : prof.Percentage,
                                                data: null,
                                                selectedData: null,
                                                quantity: 0,
                                            })),
                                        },
                                    ])
                            )
                        )
                    );
                //
                const emailBody = {
                    EventId: eventId,
                };
                FetchApiPost('api/OldSystem/GetEmailReceivers', 'POST', emailBody)
                    .then((response) => response.json())
                    .then((response) =>
                        setContactInfo(
                            response.map((data) => ({
                                value: data.EmpId,
                                label: data.Name,
                                title: data.PosName,
                                mail: data.Email,
                            }))
                        )
                    );
            } else {
                FetchApiPost('api/OldSystem/GetCustomerInfo', 'POST', {
                    EventId: eventId,
                    BrandIds: '',
                })
                    .then((response) => response.json())
                    .then((response) => setCustomerInfo(response))
                    .catch((error) => console.log(error));

                FetchApiGet(`services/daywork/eventreport/GetEventReportsByEventId?Id=${eventId}`, 'GET')
                    .then((res) => res.json())
                    .then((res) => {
                        // Planned Visit
                        res.data.eventReportProducts.map((data) =>
                            data.isAdditional === true
                                ? (setAddPromited((prev) => [
                                      ...prev,
                                      {
                                          value: data.productId,
                                          label: data.productName,
                                          isAdditional: data.isAdditional,
                                          isPromo: data.isPromo,
                                      },
                                  ]),
                                  setPromoMaterial((prev) => [
                                      ...prev,
                                      { label: data.productName, id: data.productId },
                                  ]))
                                : data.isPromo === false
                                ? (setNonPromo((prev) => [
                                      ...prev,
                                      {
                                          value: data.productId,
                                          label: data.productName,
                                          isAdditional: data.isAdditional,
                                          isPromo: data.isPromo,
                                      },
                                  ]),
                                  setPromoMaterial((prev) => [
                                      ...prev,
                                      { label: data.productName, id: data.productId },
                                  ]))
                                : data.isPromo === true
                                ? (setPromo((prev) => [
                                      ...prev,
                                      {
                                          value: data.productId,
                                          label: data.productName,
                                          isAdditional: data.isAdditional,
                                          isPromo: data.isPromo,
                                      },
                                  ]),
                                  setPromoMaterial((prev) => [
                                      ...prev,
                                      { label: data.productName, id: data.productId },
                                  ]))
                                : null
                        );

                        // Number Of Patients
                        setProduct(res.data.eventProfilePatientNumbers);
                        setTotalNumber(res.data.eventReport.patientNumber);
                        setTotalProfileNumber(res.data.eventReport.totalProfile);
                        settotalProfile(res.data.eventReport.totalProfile);

                        let newBrans = [];
                        res.data.eventProfilePatientNumbers.map((data) => {
                            if (
                                newBrans.filter((item) => item.brandName === data.brandList[0].brandName).length === 0
                            ) {
                                if (newBrans.length === 0) {
                                    newBrans.push({
                                        brandName: data.brandList[0].brandName,
                                        brandId: data.brandList[0].brandId,
                                        brandAbb: data.brandList[0].brandAbb,
                                        selected: true,
                                        totalProfile: 0,
                                        enteredProfile: 0,
                                        indications: [],
                                    });
                                } else {
                                    newBrans.push({
                                        brandName: data.brandList[0].brandName,
                                        brandId: data.brandList[0].brandId,
                                        brandAbb: data.brandList[0].brandAbb,
                                        selected: false,
                                        totalProfile: 0,
                                        enteredProfile: 0,
                                        indications: [],
                                    });
                                }
                            }
                        });
                        setNewNumberBrandName(newBrans);

                        let newIndications = [];
                        res.data.eventProfilePatientNumbers.map((data) => {
                            if (
                                newIndications.filter((item) => item.indicationName === data.indicationName).length ===
                                0
                            ) {
                                newIndications.push({
                                    brandName: data.brandList[0].brandName,
                                    indicationName: data.indicationName,
                                    allData: data,
                                    indications: [{ ...data, profileNumber: data.patientNumber }],
                                });
                            } else {
                                // newIndications.map(item => {
                                //     if((item.indicationName === data.indicationName) && (item.brandName === data.brandList[0].brandName)){
                                //         item.indications.push({...data, profileNumber: data.patientNumber})
                                //     }else if((item.indicationName === data.indicationName) && (item.brandName !== data.brandList[0].brandName)){
                                //         newIndications.push({brandName: data.brandList[0].brandName ,indicationName: data.indicationName, allData: data, indications: [{...data, profileNumber: data.patientNumber}]})

                                //     }
                                // })
                                // console.log("newIndications.filter(item => ((item.indicationName === data.indicationName) && (item.brandName === data.brandList[0].brandName)))", newIndications.filter(item => ((item.indicationName === data.indicationName) && (item.brandName === data.brandList[0].brandName))))
                                // newIndications.filter(item => ((item.indicationName === data.indicationName) && (item.brandName === data.brandList[0].brandName)))
                                newIndications.map((item) => {
                                    if (
                                        item.indicationName === data.indicationName &&
                                        item.brandName === data.brandList[0].brandName
                                    ) {
                                        item.indications.push({ ...data, profileNumber: data.patientNumber });
                                    } else if (
                                        newIndications.filter(
                                            (item) =>
                                                item.indicationName === data.indicationName &&
                                                item.brandName === data.brandList[0].brandName
                                        ).length === 0
                                    ) {
                                        newIndications.push({
                                            brandName: data.brandList[0].brandName,
                                            indicationName: data.indicationName,
                                            allData: data,
                                            indications: [{ ...data, profileNumber: data.patientNumber }],
                                        });
                                    }
                                });
                            }
                        });
                        setNewNumberIndicationName(newIndications);

                        // Visit Evulotion
                        res.data.eventReportProducts.map((data) =>
                            data.isAdditional === true
                                ? setVisitEvulotionsOther((prev) => [
                                      ...prev,
                                      {
                                          ProductId: data.productId,
                                          ProductName: data.productName,
                                          isAdditional: data.isAdditional,
                                          isPromo: data.isPromo,
                                          productPercent: data.productPercent,
                                      },
                                  ])
                                : data.isPromo === false
                                ? setVisitEvolationsNonPromo((prev) => [
                                      ...prev,
                                      {
                                          productId: data.productId,
                                          productName: data.productName,
                                          isAdditional: data.isAdditional,
                                          isPromo: data.isPromo,
                                          productPercent: data.productPercent,
                                      },
                                  ])
                                : data.isPromo === true
                                ? setVisitEvolationsPromo((prev) => [
                                      ...prev,
                                      {
                                          productId: data.productId,
                                          productName: data.productName,
                                          isAdditional: data.isAdditional,
                                          isPromo: data.isPromo,
                                          productPercent: data.productPercent,
                                      },
                                  ])
                                : null
                        );

                        // Loyalty to Product
                        res.data.eventReportLoyalties.map(
                            (sku) => (
                                sku?.isPromoOrOther === 0 &&
                                    setLoyaltyNonPromo((state) => [
                                        ...state,
                                        {
                                            isPromoOrOther: 0,
                                            lastData: sku.boxQuantity,
                                            percentage: sku.percentage,
                                            quantity: sku.quantity,
                                            GlobalSkuName: sku.skuName,
                                            data: handleProfileDataSet(Number(sku.boxQuantity)),
                                            profileIncrement: sku.boxQuantity / 10,
                                            boxQuantity: sku.boxQuantity,
                                            Profile: res?.data?.eventProfileLoyalties
                                                ?.filter((product) => sku.id === product.eventReportLoyaltyId)
                                                .map((prof) => ({
                                                    Profile: prof.profileName,
                                                    ProfileId: prof.profileId,
                                                    IndicationId: prof.id,
                                                    percentage: prof.percentage,
                                                    data: handleProfileDataSet(Number(prof.boxQuantity)),
                                                    quantity: prof.quantity,
                                                })),
                                        },
                                    ]),
                                sku?.isPromoOrOther === 1 &&
                                    setLoyaltyPromo((state) => [
                                        ...state,
                                        {
                                            isPromoOrOther: 0,
                                            lastData: sku.boxQuantity,
                                            percentage: sku.percentage,
                                            quantity: sku.quantity,
                                            GlobalSkuName: sku.skuName,
                                            data: handleProfileDataSet(Number(sku.boxQuantity)),
                                            profileIncrement: sku.boxQuantity / 10,
                                            boxQuantity: sku.boxQuantity,
                                            Profile: res?.data?.eventProfileLoyalties
                                                ?.filter((product) => sku.id === product.eventReportLoyaltyId)
                                                .map((prof) => ({
                                                    Profile: prof.profileName,
                                                    ProfileId: prof.profileId,
                                                    IndicationId: prof.id,
                                                    percentage: prof.percentage,
                                                    data: handleProfileDataSet(Number(prof.boxQuantity)),
                                                    quantity: prof.quantity,
                                                })),
                                        },
                                    ]),
                                sku?.isPromoOrOther === 2 &&
                                    setLoyaltyOther((state) => [
                                        ...state,
                                        {
                                            isPromoOrOther: 0,
                                            lastData: sku.boxQuantity,
                                            percentage: sku.percentage,
                                            quantity: sku.quantity,
                                            GlobalSkuName: sku.skuName,
                                            data: handleProfileDataSet(Number(sku.boxQuantity)),
                                            profileIncrement: sku.boxQuantity / 10,
                                            boxQuantity: sku.boxQuantity,
                                            Profile: res?.data?.eventProfileLoyalties
                                                ?.filter((product) => sku.id === product.eventReportLoyaltyId)
                                                .map((prof) => ({
                                                    Profile: prof.profileName,
                                                    ProfileId: prof.profileId,
                                                    IndicationId: prof.id,
                                                    percentage: prof.percentage,
                                                    data: handleProfileDataSet(Number(prof.boxQuantity)),
                                                    quantity: prof.quantity,
                                                })),
                                        },
                                    ])
                            )
                        );
                        // PROMO MATERIAL
                        res.data.eventReportPromotionalMaterials.map((data) =>
                            setMaterialData((prev) => [...prev, data])
                        );
                        // PHARMACY SPLIT
                        res.data.clinicConnectedPharmacies.map((data) => {
                            setPharmacytTableData((prev) => [
                                ...prev,
                                {
                                    value: data.pharmacyId,
                                    label: data.pharmacyName,
                                    inputPercent: data.pharmacyPercent,
                                    category: data.category,
                                    clinicId: data.clinicId,
                                    clinicName: data.clinicName,
                                    customerId: data.customerId,
                                    customerName: data.customerName,
                                    eventId: data.eventId,
                                },
                            ]);
                            setBackupPharmacyTableData((prev) => [
                                ...prev,
                                {
                                    value: data.pharmacyId,
                                    label: data.pharmacyName,
                                    inputPercent: data.pharmacyPercent,
                                    category: data.category,
                                    clinicId: data.clinicId,
                                    clinicName: data.clinicName,
                                    customerId: data.customerId,
                                    customerName: data.customerName,
                                    eventId: data.eventId,
                                },
                            ]);
                        });

                        // Wants
                        setWantsName(
                            res.data.eventReportWants.map((wants) => ({
                                id: wants.wants.id,
                                name: wants.wants.wantsName,
                                percentNumber: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                                percent: wants.wantsPercent,
                            }))
                        );

                        // Previous
                        setPreviousText(res.data.eventPrevious);

                        // New
                        setTitle(res.data.eventReportMails[0]?.employeeTitle);
                        setDescription(res.data.eventReportMails[0]?.eventReport.opinions);
                        setSelectMailName({
                            value: res.data.eventReportMails[0]?.employeeId,
                            label: res.data.eventReportMails[0]?.fullName,
                            mail: res.data.eventReportMails[0]?.email,
                            title: res.data.eventReportMails[0]?.employeeTitle,
                        });
                        // Coa
                        setCoaValue(res.data.eventReport.coA);
                    });
            }
        }
    }, [eventId, handleButton]);

    const handleProfileDataSet = (data) => {
        let array = [0];
        let increment = data / 10;
        for (let i = 0; i < 10; i++) {
            if (Number(array[i]) === array[i] && array[i] % 1 !== 0) {
                array.push(Number((array[i] + increment).toFixed(2)));
            } else {
                array.push(array[i] + increment);
            }
        }
        return array;
    };

    // Visit Evalution Page Control
    useEffect(() => {
        if (visitEvolationsPromo.length === 0) {
            setVisitEvulotionCounter((prev) => ({ ...prev, promo: 0 }));
        } else {
            setVisitEvulotionCounter((prev) => ({ ...prev, promo: 1 }));
        }
        if (visitEvolationsNonPromo.length === 0) {
            setVisitEvulotionCounter((prev) => ({ ...prev, nonpromo: 0 }));
        } else {
            setVisitEvulotionCounter((prev) => ({ ...prev, nonpromo: 1 }));
        }

        if (visitEvulotionsOther.length === 0) {
            setVisitEvulotionCounter((prev) => ({ ...prev, other: 0 }));
        } else {
            setVisitEvulotionCounter((prev) => ({ ...prev, other: 1 }));
        }
    }, [visitEvolationsPromo, visitEvolationsNonPromo, visitEvulotionsOther]);

    // Loyalty to Product Page Control

    useEffect(() => {
        if (appStatus !== 4) {
            loyaltyPromo?.map((globalSku) =>
                globalSku?.Profile?.map((skuProfile) =>
                    product?.map(
                        (item) =>
                            item?.brandList[0]?.brandId === globalSku?.BrandId &&
                            item?.profileId === skuProfile?.ProfileId &&
                            item?.indicationId === skuProfile?.IndicationId &&
                            item?.profileNumber !== null &&
                            setLoyaltyProductCounter((prev) => ({ ...prev, promo: 1 }))
                    )
                )
            );
        } else {
            loyaltyPromo.length > 0 && setLoyaltyProductCounter((prev) => ({ ...prev, promo: 1 }));
        }
    }, [loyaltyPromo, product, totalProfile]);

    useEffect(() => {
        if (appStatus !== 4) {
            loyaltyNonPromo?.map((globalSku) =>
                globalSku?.Profile?.map((skuProfile) =>
                    product?.map(
                        (item) =>
                            item?.brandList[0]?.brandId === globalSku?.BrandId &&
                            item?.profileId === skuProfile?.ProfileId &&
                            item?.indicationId === skuProfile?.IndicationId &&
                            item?.profileNumber !== null &&
                            setLoyaltyProductCounter((prev) => ({ ...prev, nonpromo: 1 }))
                    )
                )
            );
        } else {
            loyaltyNonPromo.length > 0 && setLoyaltyProductCounter((prev) => ({ ...prev, nonpromo: 1 }));
        }
    }, [loyaltyNonPromo, product, totalProfile]);

    useEffect(() => {
        if (appStatus !== 4) {
            loyaltyOther?.map((globalSku) =>
                globalSku?.Profile?.map((skuProfile) =>
                    product?.map(
                        (item) =>
                            item?.brandList[0]?.brandId === globalSku?.BrandId &&
                            item?.profileId === skuProfile?.ProfileId &&
                            item?.indicationId === skuProfile?.IndicationId &&
                            item?.profileNumber !== null &&
                            setLoyaltyProductCounter((prev) => ({ ...prev, other: 1 }))
                    )
                )
            );
        } else {
            loyaltyOther.length > 0 && setLoyaltyProductCounter((prev) => ({ ...prev, other: 1 }));
        }
    }, [loyaltyOther, product, totalProfile]);

    // PROMO PRODUCT
    const getPromoProduct = useMemo(() => {
        const material = selectPromoMaterial.filter((el) => el.SubTypeId !== 0);
        const promoPercent = visitEvolationsPromo.map((data) => data.productPercent);
        const proProduct = promo.map((data, index) => ({
            productId: data.value,
            productName: data.label,
            keyOpenerLider: true,
            isPromo: data.isPromo,
            productPercent: promoPercent[index],
            isAdditional: data.isAdditional,
            eventReportPromotionalMaterials: material.map((el) =>
                data.value === el.BrandId
                    ? {
                          promotionalMaterialId: el.SubTypeId,
                          promotionalMaterialName: el.label,
                      }
                    : {}
            ),
        }));
        return proProduct;
    }, [promo, selectPromoMaterial, visitEvolationsPromo]);
    // NON PROMO PRODUCT
    const getNonPromoProduct = useMemo(() => {
        const material = selectPromoMaterial.filter((el) => el.SubTypeId !== 0);
        const nonPromoPercent = visitEvolationsNonPromo.map((data) => data.productPercent);
        const nonProProduct = nonPromo.map((data, index) => ({
            productId: data.value,
            productName: data.label,
            keyOpenerLider: true,
            isPromo: data.isPromo,
            productPercent: nonPromoPercent[index],
            isAdditional: data.isAdditional,
            eventReportPromotionalMaterials: material.map((el) =>
                data.value === el.BrandId
                    ? {
                          promotionalMaterialId: el.SubTypeId,
                          promotionalMaterialName: el.label,
                      }
                    : {}
            ),
        }));
        return nonProProduct;
    }, [nonPromo, selectPromoMaterial, visitEvolationsNonPromo]);
    // OTHER PRODUCT
    const getOtherProduct = useMemo(() => {
        const material = selectPromoMaterial.filter((el) => el.SubTypeId !== 0);
        return visitEvulotionsOther
            .filter((data) => data.productPercent !== null)
            .map((data) => ({
                productId: data.ProductId,
                productName: data.ProductName,
                keyOpenerLider: true,
                isPromo: data.isPromo,
                productPercent: data.productPercent,
                isAdditional: data.isAdditional,
                eventReportPromotionalMaterials: material.map((el) =>
                    data.value === el.BrandId
                        ? {
                              promotionalMaterialId: el.SubTypeId,
                              promotionalMaterialName: el.label,
                          }
                        : {}
                ),
            }));
    }, [selectPromoMaterial, visitEvulotionsOther]);

    const finalProduct = getPromoProduct.concat(getNonPromoProduct, getOtherProduct);
    // receivers
    let receiver = [];
    if (selectMailName.mail !== null && selectMailName.label !== null && title !== null) {
        receiver = [
            {
                employeeId: eventData.employeeId,
                email: selectMailName.mail,
                fullName: selectMailName.label,
                employeeTitle: title,
            },
        ];
    } else {
        receiver = [];
    }
    // Opinion

    const opinion = description !== null ? description : 'string';
    //LOYALTY PROMO FOR SAVE
    const loyaltyPromoProduct = useMemo(() => {
        const test1 = loyaltyPromo.filter((data) => data.percentage !== null);
      
        const promo = test1.map((data, index) => ({
            skuId: data.GlobalSkuId,
            skuName: data.GlobalSkuName,
            quantity: 2,
            boxQuantity: appStatus !== 4 && data.data[10],
            percentage: data.percentage,
            isPromoOrOther: data.isPromoOrOther,
            eventProfileLoyalties: data.Profile.filter((el) => el.percentage !== null).map((profile) => ({
                profileId: profile.ProfileId,
                profileName: profile.Profile,
                percentage: profile.percentage,
                quantity: profile.quantity,
                boxQuantity: appStatus !== 4 && profile.data[10],
            })),
        }));
        return promo;
    }, [loyaltyPromo]);
    const loyaltyNonPromoProduct = useMemo(() => {
        const test2 = loyaltyNonPromo.filter((data) => data.percentage !== null);
        const promo = test2.map((data, index) => ({
            skuId: data.GlobalSkuId,
            skuName: data.GlobalSkuName,
            quantity: 2,
            boxQuantity: appStatus !== 4 && data.data[10],
            percentage: data.percentage,
            isPromoOrOther: data.isPromoOrOther,
            eventProfileLoyalties: data.Profile.filter((el) => el.percentage !== null).map((profile) => ({
                profileId: profile.ProfileId,
                profileName: profile.Profile,
                percentage: profile.percentage,
                quantity: profile.quantity,
                boxQuantity: appStatus !== 4 && profile.data[10],
            })),
        }));
        return promo;
    }, [loyaltyNonPromo]);
    const loyaltyOtherProduct = useMemo(() => {
        const test3 = loyaltyOther.filter((data) => data.percentage !== null);
        const promo = test3.map((data, index) => ({
            skuId: data.GlobalSkuId,
            skuName: data.GlobalSkuName,
            quantity: 2,
            boxQuantity: appStatus !== 4 && data.data[10],
            percentage: data.percentage,
            isPromoOrOther: data.isPromoOrOther,
            eventProfileLoyalties: data.Profile.filter((el) => el.percentage !== null).map((profile) => ({
                profileId: profile.ProfileId,
                profileName: profile.Profile,
                percentage: profile.percentage,
                quantity: profile.quantity,
                boxQuantity: appStatus !== 4 && profile.data[10],
            })),
        }));
        return promo;
    }, [loyaltyOther]);
    const loyaltyfinalProduct = useMemo(() => {
        return loyaltyPromoProduct.concat(loyaltyNonPromoProduct, loyaltyOtherProduct);
    }, [loyaltyNonPromoProduct, loyaltyOtherProduct, loyaltyPromoProduct]);
    // Send report to backend
    const saveReportData = () => {
        const saveReport = {
            eventDetailId: eventData.id,
            visitStatus: true,
            descMissedVisit: 'string', // FALSE
            eventReportOpinion: opinion,
            reportedEmpId: eventData.employeeId,
            patientNumber: Number(totalNumber),
            totalProfile: Number(totalProfileNumber),
            coA: Number(coaValue),
            eventReportProducts: finalProduct,
            eventReportConnectedPharmacies: pharmacyTable.map((data) => ({
                eventReportId: data.clinicId,
                connectedPharmacyId: data.value,
                pharmacyPercent: data.inputPercent,
                connectedPharmacyName: data.label,
            })),
            eventReportWants: wantsName
                .filter((data) => data.percent !== null)
                .map((data) => ({
                    wantsId: data.id,
                    wantsName: data.name,
                    wantsPercent: data.percent,
                })),
            receivers: receiver,
            eventProfilePatientNumbers: product
                .filter((data) => Number(data.profileNumber) !== 0)
                .map((data) => ({
                    profileId: data.profileId,
                    profileName: data.profileName,
                    indicationId: data.indicationId,
                    indicationName: data.indicationName,
                    patientNumber: Number(data.profileNumber),
                })),
            eventReportLoyalties: loyaltyfinalProduct,
        };
        return saveReport;
    };
    const saveReportClick = () => {
        const data = saveReportData();
        console.log('savereportclikte');
        FetchApiPost('services/daywork/EventReport/CreateEventReport', 'POST', data)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    // setCloseModal(false);
                    setIsOpen(false);
                    window.location.reload();
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const withOutAlert = () => {
        setShow(false);
    };
    const [modal, setModal] = useState(false);
    const [hide, setHide] = useState(false);
    const toggle = () => {
        setModal(!modal);
        setHide(!hide);
    };
    const closeRmAlertNoIsSaving = () => {
        toggle();
        setShow(true);
    };
    const closeRmAlertYesClose = () => {
        setShow(false);
        toggle();
        const eventId = { EventId: eventData.id };
        FetchApiPost('services/Daywork/Event/DeleteEvent ', 'PATCH', {
            eventId: [eventId.EventId],
            deleteReason: 'string',
        }).catch((err) => console.log(err));
        setTimeout(() => {
            // window.location.reload();
        }, 500);
    };

    const [homePageUpdateButtonDisabled, setHomePageUpdateButtonDisabled] = useState(true);

    return (
        // modal backdrop css = competitor1.scss
        <>
            <EventDeleteModal
                modal={modal}
                toggle={toggle}
                noButton={closeRmAlertNoIsSaving}
                yesButton={closeRmAlertYesClose}
            />

                <GlobalModal
                    showModal={isOpen}
                    setShowModal={page === 1 ? withOutAlert : onClose}
                    toggle={page === 1 ? withOutAlert : onClose}
                    header={<HomePageTitle />}
                    size={'md'}
                    body={
                        <>
                        {page === 1 || pageSplit === 1 ? (

                        // <HomePageUpdate
                        //     setOnSubmitUpdateForm={setOnSubmitUpdateForm}
                        //     onSubmitUpdateForm={onSubmitUpdateForm}
                        //     eventId={eventId}
                        //     setHomePageUpdateButtonDisabled={setHomePageUpdateButtonDisabled}
                        // />
                        <NewUpdate 
                            eventId={eventId}
                            setHomePageUpdateButtonDisabled={setHomePageUpdateButtonDisabled}
                            onSubmitUpdateForm={onSubmitUpdateForm}
                            setOnSubmitUpdateForm={setOnSubmitUpdateForm}
                        />
                    ) : null}
                    {page === 2 && (
                        <PlannedVisit
                            customerInfo={customerInfo}
                            promo={promo}
                            nonPromo={nonPromo}
                            addPromited={addPromited}
                            setButtonDisable={setButtonDisable}
                            image={image}
                            setImage={setImage}
                            setReportTitle={setReportTitle}
                        />
                    )}
                    {page === 3 && (
                        <NumberOfPatients
                            totalProfile={totalProfile}
                            settotalProfile={settotalProfile}
                            product={product}
                            totalNumber={totalNumber}
                            setTotalNumber={setTotalNumber}
                            setTotalProfileNumber={setTotalProfileNumber}
                            setButtonDisable={setButtonDisable}
                            setReportTitle={setReportTitle}
                            newNumberBrandName={newNumberBrandName}
                            newNumberIndicationName={newNumberIndicationName}
                            setNewNumberBrandName={setNewNumberBrandName}
                            setComplatedButton={setComplatedButton}
                            setProduct={setProduct}
                        />
                    )}
                    {page === 4 && (
                        <VisitPromo
                            visitEvolationsPromo={visitEvolationsPromo}
                            setVisitEvolationsPromo={setVisitEvolationsPromo}
                            setButtonDisable={setButtonDisable}
                            setReportTitle={setReportTitle}
                        />
                    )}
                    {page === 5 && (
                        <VisitNonPromo
                            visitEvolationsNonPromo={visitEvolationsNonPromo}
                            setVisitEvolationsNonPromo={setVisitEvolationsNonPromo}
                            setButtonDisable={setButtonDisable}
                            setReportTitle={setReportTitle}
                        />
                    )}
                    {page === 6 && (
                        <VisitOther
                            visitEvulotionsOther={visitEvulotionsOther}
                            setVisitEvulotionsOther={setVisitEvulotionsOther}
                            setButtonDisable={setButtonDisable}
                            setReportTitle={setReportTitle}
                        />
                    )}
                    {page === 7 && (
                        <PromoMaterial
                            promoMaterial={promoMaterial}
                            materialData={materialData}
                            setButtonDisable={setButtonDisable}
                            setReportTitle={setReportTitle}
                            selectPromoMaterial={selectPromoMaterial}
                            setSelectPromoMaterial={setSelectPromoMaterial}
                        />
                    )}
                    {page === 8 && (
                        <LoyaltyPromo
                            product={product}
                            loyaltyPromo={loyaltyPromo}
                            setLoyaltyPromo={setLoyaltyPromo}
                            resetButton={resetButton}
                            setResetButton={setResetButton}
                            setButtonDisable={setButtonDisable}
                        />
                    )}
                    {page === 9 && (
                        <LoyaltyNonPromo
                            product={product}
                            loyaltyNonPromo={loyaltyNonPromo}
                            setLoyaltyNonPromo={setLoyaltyNonPromo}
                            resetButton={resetButton}
                            setResetButton={setResetButton}
                            setButtonDisable={setButtonDisable}
                        />
                    )}
                    {page === 10 && (
                        <LoyaltyOther
                            resetButton={resetButton}
                            loyaltyOther={loyaltyOther}
                            setLoyaltyOther={setLoyaltyOther}
                            setResetButton={setResetButton}
                            setButtonDisable={setButtonDisable}
                        />
                    )}
                    {page === 11 && (
                        <AddPharmacySplit
                            setButtonDisable={setButtonDisable}
                            successModal={successModal}
                            setSuccessModal={setSuccessModal}
                            pharmacytTableData={pharmacytTableData}
                            setPharmacytTableData={setPharmacytTableData}
                            clinicName={clinicName}
                            setClinicName={setClinicName}
                            selectClinicName={selectClinicName}
                            setSelectClinicName={setSelectClinicName}
                            pharmacy={pharmacy}
                            setPharmacy={setPharmacy}
                            selectPharmacy={selectPharmacy}
                            setSelectPharmacy={setSelectPharmacy}
                            inputPercent={inputPercent}
                            setInputPercent={setInputPercent}
                            setReportTitle={setReportTitle}
                            pharmacytTableDataCopy={pharmacytTableDataCopy}
                        />
                    )}
                    {page === 12 && (
                        <Wants
                            wantsName={wantsName}
                            setWantsName={setWantsName}
                            setButtonDisable={setButtonDisable}
                            setReportTitle={setReportTitle}
                        />
                    )}
                    {page === 13 && (
                        <Previous
                            previousInput={previousInput}
                            setPreviousInput={setPreviousInput}
                            setReportTitle={setReportTitle}
                            previousText={previousText}
                        />
                    )}
                    {page === 14 && (
                        <New
                            isChecked={isChecked}
                            setIsChecked={setIsChecked}
                            contactInfo={contactInfo}
                            title={title}
                            setTitle={setTitle}
                            selectMailName={selectMailName}
                            setSelectMailName={setSelectMailName}
                            description={description}
                            setButtonDisable={setButtonDisable}
                            setDescription={setDescription}
                            newRadioIsCheckedPromo={newRadioIsCheckedPromo}
                            setNewRadioIsCheckedPromo={setNewRadioIsCheckedPromo}
                            newRadioIsCheckedServis={newRadioIsCheckedServis}
                            setNewRadioIsCheckedServis={setNewRadioIsCheckedServis}
                            setReportTitle={setReportTitle}
                        />
                    )}
                    {page === 15 && (
                        <Coa coaValue={coaValue} setCoaValue={setCoaValue} setReportTitle={setReportTitle} />
                    )}
                        </>
                    }
                    footer={
                        <>
                           {page !== 16 && (
                    <div className={page === 11 || page === 10 || page === 9 || page === 8 || page === 90 ? 'd-flex justify-content-between w-100' : null}>
                        {page === 1 ? (
                            <HomePageButtons
                                setOnSubmitUpdateForm={setOnSubmitUpdateForm}
                                homePageUpdateButtonDisabled={homePageUpdateButtonDisabled}
                                setHandleButton={setHandleButton}
                                setShow={setShow}
                                toggle={toggle}
                            />
                        ) : page < 16 ? (
                            <EditEventsButtons
                                loyaltyProductCounter={loyaltyProductCounter}
                                visitEvulotionCounter={visitEvulotionCounter}
                                resetButton={resetButton}
                                setResetButton={setResetButton}
                                resetPharmacyTableData={resetPharmacyTableData}
                                buttonDisable={buttonDisable}
                                inputPercent={inputPercent}
                                setCloseModal={setCloseModal}
                                complatedButton={complatedButton}
                                pharmacytTableData={pharmacytTableData}
                                setSuccessModal={setSuccessModal}
                                isSaveNext = { page === 15 ? true : false}
                                saveReportClick={saveReportClick}
                            />
                        ) : null}
                    </div>
                )}
                        </>
                    }
                />
            {/* <Modal className={hideRm ? 'rm-cont-hide' : null} show={isOpen}>
                <Modal.Header className={`pb-0 pt-0 px-4 border-bottom-0 homepage-modal-header`}>
                    <Modal.Title id="modal-title">
                        <HomePageTitle />
                    </Modal.Title>
                    <div className="rm-close-button-cont" onClick={page === 1 ? withOutAlert : onClose}>
                        <i className="dripicons-cross rm-close-button"></i>
                    </div>
                </Modal.Header>
                <Modal.Body style={{ height: 'auto', overflow: 'auto!important' }}>
                    {page === 1 || pageSplit === 1 ? (
                        <HomePageUpdate
                            setOnSubmitUpdateForm={setOnSubmitUpdateForm}
                            onSubmitUpdateForm={onSubmitUpdateForm}
                            eventId={eventId}
                            setHomePageUpdateButtonDisabled={setHomePageUpdateButtonDisabled}
                        />
                        // <NewUpdate />
                    ) : null}
                    {page === 2 && (
                        <PlannedVisit
                            customerInfo={customerInfo}
                            promo={promo}
                            nonPromo={nonPromo}
                            addPromited={addPromited}
                            setButtonDisable={setButtonDisable}
                            image={image}
                            setImage={setImage}
                            setReportTitle={setReportTitle}
                        />
                    )}
                    {page === 3 && (
                        <NumberOfPatients
                            totalProfile={totalProfile}
                            settotalProfile={settotalProfile}
                            product={product}
                            totalNumber={totalNumber}
                            setTotalNumber={setTotalNumber}
                            setTotalProfileNumber={setTotalProfileNumber}
                            setButtonDisable={setButtonDisable}
                            setReportTitle={setReportTitle}
                            newNumberBrandName={newNumberBrandName}
                            newNumberIndicationName={newNumberIndicationName}
                            setNewNumberBrandName={setNewNumberBrandName}
                            setComplatedButton={setComplatedButton}
                            setProduct={setProduct}
                        />
                    )}
                    {page === 4 && (
                        <VisitPromo
                            visitEvolationsPromo={visitEvolationsPromo}
                            setVisitEvolationsPromo={setVisitEvolationsPromo}
                            setButtonDisable={setButtonDisable}
                            setReportTitle={setReportTitle}
                        />
                    )}
                    {page === 5 && (
                        <VisitNonPromo
                            visitEvolationsNonPromo={visitEvolationsNonPromo}
                            setVisitEvolationsNonPromo={setVisitEvolationsNonPromo}
                            setButtonDisable={setButtonDisable}
                            setReportTitle={setReportTitle}
                        />
                    )}
                    {page === 6 && (
                        <VisitOther
                            visitEvulotionsOther={visitEvulotionsOther}
                            setVisitEvulotionsOther={setVisitEvulotionsOther}
                            setButtonDisable={setButtonDisable}
                            setReportTitle={setReportTitle}
                        />
                    )}
                    {page === 7 && (
                        <PromoMaterial
                            promoMaterial={promoMaterial}
                            materialData={materialData}
                            setButtonDisable={setButtonDisable}
                            setReportTitle={setReportTitle}
                            selectPromoMaterial={selectPromoMaterial}
                            setSelectPromoMaterial={setSelectPromoMaterial}
                        />
                    )}
                    {page === 8 && (
                        <LoyaltyPromo
                            product={product}
                            loyaltyPromo={loyaltyPromo}
                            setLoyaltyPromo={setLoyaltyPromo}
                            resetButton={resetButton}
                            setResetButton={setResetButton}
                            setButtonDisable={setButtonDisable}
                        />
                    )}
                    {page === 9 && (
                        <LoyaltyNonPromo
                            product={product}
                            loyaltyNonPromo={loyaltyNonPromo}
                            setLoyaltyNonPromo={setLoyaltyNonPromo}
                            resetButton={resetButton}
                            setResetButton={setResetButton}
                            setButtonDisable={setButtonDisable}
                        />
                    )}
                    {page === 10 && (
                        <LoyaltyOther
                            resetButton={resetButton}
                            loyaltyOther={loyaltyOther}
                            setLoyaltyOther={setLoyaltyOther}
                            setResetButton={setResetButton}
                            setButtonDisable={setButtonDisable}
                        />
                    )}
                    {page === 11 && (
                        <AddPharmacySplit
                            setButtonDisable={setButtonDisable}
                            successModal={successModal}
                            setSuccessModal={setSuccessModal}
                            pharmacytTableData={pharmacytTableData}
                            setPharmacytTableData={setPharmacytTableData}
                            clinicName={clinicName}
                            setClinicName={setClinicName}
                            selectClinicName={selectClinicName}
                            setSelectClinicName={setSelectClinicName}
                            pharmacy={pharmacy}
                            setPharmacy={setPharmacy}
                            selectPharmacy={selectPharmacy}
                            setSelectPharmacy={setSelectPharmacy}
                            inputPercent={inputPercent}
                            setInputPercent={setInputPercent}
                            setReportTitle={setReportTitle}
                            pharmacytTableDataCopy={pharmacytTableDataCopy}
                        />
                    )}
                    {page === 12 && (
                        <Wants
                            wantsName={wantsName}
                            setWantsName={setWantsName}
                            setButtonDisable={setButtonDisable}
                            setReportTitle={setReportTitle}
                        />
                    )}
                    {page === 13 && (
                        <Previous
                            previousInput={previousInput}
                            setPreviousInput={setPreviousInput}
                            setReportTitle={setReportTitle}
                            previousText={previousText}
                        />
                    )}
                    {page === 14 && (
                        <New
                            isChecked={isChecked}
                            setIsChecked={setIsChecked}
                            contactInfo={contactInfo}
                            title={title}
                            setTitle={setTitle}
                            selectMailName={selectMailName}
                            setSelectMailName={setSelectMailName}
                            description={description}
                            setButtonDisable={setButtonDisable}
                            setDescription={setDescription}
                            newRadioIsCheckedPromo={newRadioIsCheckedPromo}
                            setNewRadioIsCheckedPromo={setNewRadioIsCheckedPromo}
                            newRadioIsCheckedServis={newRadioIsCheckedServis}
                            setNewRadioIsCheckedServis={setNewRadioIsCheckedServis}
                            setReportTitle={setReportTitle}
                        />
                    )}
                    {page === 15 && (
                        <Coa coaValue={coaValue} setCoaValue={setCoaValue} setReportTitle={setReportTitle} />
                    )}
                </Modal.Body>
                {page !== 16 && (
                    <Modal.Footer className={page === 11 || page === 90 ? 'd-flex justify-content-between' : null}>
                        {page === 1 ? (
                            <HomePageButtons
                                setOnSubmitUpdateForm={setOnSubmitUpdateForm}
                                homePageUpdateButtonDisabled={homePageUpdateButtonDisabled}
                                setHandleButton={setHandleButton}
                                setShow={setShow}
                                toggle={toggle}
                            />
                        ) : page < 16 ? (
                            <EditEventsButtons
                                loyaltyProductCounter={loyaltyProductCounter}
                                visitEvulotionCounter={visitEvulotionCounter}
                                resetButton={resetButton}
                                setResetButton={setResetButton}
                                resetPharmacyTableData={resetPharmacyTableData}
                                buttonDisable={buttonDisable}
                                inputPercent={inputPercent}
                                setCloseModal={setCloseModal}
                                complatedButton={complatedButton}
                                pharmacytTableData={pharmacytTableData}
                                setSuccessModal={setSuccessModal}
                                isSaveNext = { page === 15 ? true : false}
                                saveReportClick={saveReportClick}
                            />
                        ) : null}
                    </Modal.Footer>
                )}
            </Modal> */}
            <Modal show={closeModal} className="finish-modal">
                <Modal.Body>
                    <FinishReport setReportTitle={setReportTitle} />
                    <FinishReportButtons saveReportClick={saveReportClick} setCloseModal={setCloseModal} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default HomePage;
