// @flow
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Modal, Row, Col, Button, Alert, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';

// components
import HyperDatepicker from '../../../components/Datepicker';
import { FormInput } from '../../../components/';
import { FaStar } from 'react-icons/fa';
import { login } from '../../../helpers';
import CanceledModal from '../../../components/Modals/CanceledModal';
import { FetchApiGet, FetchApiPost } from '../../../utils/http.helper';
import AddPharmacy from '../../../components/AddPharmacy';
import SplitPage2 from './spllit/splitPage2/SplitPage2';
import PhysicianSplitIndex from './spllit/PhysicianSplit/PhysicianSplitIndex';
import PhysicianTableDatas from './spllit/PhysicianSplit/PhysicianTableDatas';
import PhysicianSplitHeader from './spllit/PhysicianSplit/PhysicianSplitHeader';

import Index from './EditEvent/PlannedVisit/index';
import NumberOfPatientIndex from './EditEvent/NumberOfPatient/index';
import WantsIndex from './EditEvent/Wants/index';
import PreviousIndex from './EditEvent/Previous/index';
import PromoIndex from './EditEvent/LoyaltyProduct/Promo';
import NewIndex from './EditEvent/New/index';
import CoaIndex from './EditEvent/CoA/index';
import { pharmacySplit, skuAbb } from '../../../redux/actions';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PromoMaterial from './EditEvent/PromoMaterial/PromoMaterialBody';
import Promo from './EditEvent/LoyaltyProduct/Promo';
type ReportModalProps = {
    isOpen?: boolean,
    onClose?: () => void,
    isEditable?: boolean,
    eventData?: any,
    onRemoveEvent?: () => void,
    onUpdateEvent: (value: any) => void,
    onAddEvent: (value: any) => void,
    closeRmAlertYesClose: () => void,
};

const ReportModal = ({
    events,
    hideRm,
    isOpen,
    onClose,
    isEditable,
    eventData,
    onRemoveEvent,
    onUpdateEvent,
    onAddEvent,
    saveReportModal,
    closeRmAlertYesClose,
}: ReportModalProps): React$Element<any> => {
    const dispatch = useDispatch();

    // calender date redux
    const calendarDate = useSelector((state) => state.Calendar);
    const activityTypeName = useSelector((state) => state.Calendar.activityTypeName);
    const eventBgColor = useSelector((state) => state.Calendar.eventBgColor);

    // event state
    const [event] = useState(eventData);
    // event date day
    const userDate = new Date().toDateString();
    const userDay = Number(userDate.slice(8, 10));
    const eventDate = String(calendarDate.eventData.start);
    const eventDay = Number(eventDate.slice(8, 10));
    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            title: yup.string().required('Please enter event name'),
            className: yup.string().required('Please select category'),
        })
    );

    /*
     * form methods
     */
    const methods = useForm({ defaultValues: event, resolver: schemaResolver });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    /*
     * handle form submission
     */
    const onSubmitEvent = (data) => {
        isEditable ? onUpdateEvent(data) : onAddEvent(data);
    };

    // appStatus Values
    const [appStatus, setAppStatus] = useState();
    // FETCH -------------------------------------------------------

    const [datas, setDatas] = useState([]); // PROMO
    const [datas2, setDatas2] = useState([]); // NONE-PROMO
    //{value:"PRESLON",label:"PRESLON"},{value:"ALMİBA",label:"ALMİBA"},{value:"KEPLERON",label:"KEPLERON"}

    //
    // Report Pages ------

    const [changePage, setChangePage] = useState(14);
    const [reportTitle, setReportTitle] = useState('Edit Event');

    //------
    const [splitChangePage, setSplitChangePage] = useState(0);

    const [selectedPromoProducts, setSelectedPromoProducts] = useState([]);
    const [selectedPromoProductsName, setSelectedPromoProductsName] = useState([]);
    const [selectedNonPromoProducts, setSelectedNonPromoProducts] = useState([]);
    const [selectedNonPromoProductsName, setSelectedNonPromoProductsName] = useState([]);
    const [selectPromoName, setSelectPromoName] = useState([]);
    const [selectNonPromoName, setselectNonPromoName] = useState([]);

    console.log(selectPromoName, selectNonPromoName);

    //------ Success of Visit(3)
    const [productPercents, setProductPercents] = useState([]);
    const [nonProductPercents, setNonProductPercents] = useState([]);
    console.log(productPercents);
    console.log(nonProductPercents);
    //------ Key Opener Lider or No(4)
    const [promoKeyOpenOrLider, setPromoKeyOpenOrLider] = useState([]);
    const [nonPromoKeyOpenOrLider, setNonPromoKeyOpenOrLider] = useState([]);
    //

    //------ Product Loyalty(6)

    const [promoLoyalty, setPromoLoyalty] = useState([]);
    const [nonPromoLoyalty, setNonPromoLoyalty] = useState([]);

    //------Objections(8)
    const [objections1, setObjections1] = useState([
        { id: 1, selected: false, objectionName: 'High Retail Price' },
        { id: 3, selected: false, objectionName: 'Stock Out' },
        { id: 4, selected: false, objectionName: 'Effectivnicy' },
        { id: 5, selected: false, objectionName: 'Safety' },
        { id: 6, selected: false, objectionName: 'No Enough Sinefic Ivident' },
        { id: 7, selected: false, objectionName: '-' },
    ]);
    const [objections2, setObjections2] = useState([
        { id: 1, selected: false, objectionName: 'High Retail Price' },
        { id: 3, selected: false, objectionName: 'Stock Out' },
        { id: 4, selected: false, objectionName: 'Effectivnicy' },
        { id: 5, selected: false, objectionName: 'Safety' },
        { id: 6, selected: false, objectionName: 'No Enough Sinefic Ivident' },
        { id: 7, selected: false, objectionName: '-' },
    ]);
    const [objections3, setObjections3] = useState([
        { id: 1, selected: false, objectionName: 'High Retail Price' },
        { id: 3, selected: false, objectionName: 'Stock Out' },
        { id: 4, selected: false, objectionName: 'Effectivnicy' },
        { id: 5, selected: false, objectionName: 'Safety' },
        { id: 6, selected: false, objectionName: 'No Enough Sinefic Ivident' },
        { id: 7, selected: false, objectionName: '-' },
    ]);
    const [objections4, setObjections4] = useState([
        { id: 1, selected: false, objectionName: 'High Retail Price' },
        { id: 3, selected: false, objectionName: 'Stock Out' },
        { id: 4, selected: false, objectionName: 'Effectivnicy' },
        { id: 5, selected: false, objectionName: 'Safety' },
        { id: 6, selected: false, objectionName: 'No Enough Sinefic Ivident' },
        { id: 7, selected: false, objectionName: '-' },
    ]);
    const [objections5, setObjections5] = useState([
        { id: 1, selected: false, objectionName: 'High Retail Price' },
        { id: 3, selected: false, objectionName: 'Stock Out' },
        { id: 4, selected: false, objectionName: 'Effectivnicy' },
        { id: 5, selected: false, objectionName: 'Safety' },
        { id: 6, selected: false, objectionName: 'No Enough Sinefic Ivident' },
        { id: 7, selected: false, objectionName: '-' },
    ]);
    const [objections6, setObjections6] = useState([
        { id: 1, selected: false, objectionName: 'High Retail Price' },
        { id: 3, selected: false, objectionName: 'Stock Out' },
        { id: 4, selected: false, objectionName: 'Effectivnicy' },
        { id: 5, selected: false, objectionName: 'Safety' },
        { id: 6, selected: false, objectionName: 'No Enough Sinefic Ivident' },
        { id: 7, selected: false, objectionName: '-' },
    ]);
    const previousObjections = (response) => {
        const promoDatas = [];
        const nonPromoDatas = [];

        response.data.eventReportProducts.map((data) =>
            data.isPromo === true ? promoDatas.push(data) : nonPromoDatas.push(data)
        );

        console.log(promoDatas, nonPromoDatas);
        const obj1 = [...objections1];
        const obj2 = [...objections2];
        const obj3 = [...objections3];
        const obj4 = [...objections4];
        const obj5 = [...objections5];
        const obj6 = [...objections6];

        const objData = response.data.eventReportObjections;

        objData.map((objections) =>
            objections.eventReportProduct.isPromo === true
                ? objections.eventReportProduct.productId === promoDatas[0].productId
                    ? obj1.map((data) => (data.id === objections.objection.id ? (data.selected = true) : false))
                    : objections.eventReportProduct.productId === promoDatas[1].productId
                    ? obj2.map((data) => (data.id === objections.objection.id ? (data.selected = true) : false))
                    : objections.eventReportProduct.productId === promoDatas[2].productId
                    ? obj3.map((data) => (data.id === objections.objection.id ? (data.selected = true) : false))
                    : null
                : objections.eventReportProduct.productId === nonPromoDatas[0].productId
                ? obj4.map((data) => (data.id === objections.objection.id ? (data.selected = true) : false))
                : objections.eventReportProduct.productId === nonPromoDatas[1].productId
                ? obj5.map((data) => (data.id === objections.objection.id ? (data.selected = true) : false))
                : objections.eventReportProduct.productId === nonPromoDatas[2].productId
                ? obj6.map((data) => (data.id === objections.objection.id ? (data.selected = true) : false))
                : null
        );

        setObjections1([...obj1]);
        setObjections2([...obj2]);
        setObjections3([...obj3]);
        setObjections4([...obj4]);
        setObjections5([...obj5]);
        setObjections6([...obj6]);
    };

    // appStatus id api
    useEffect(() => {
        FetchApiGet(`services/Daywork/Event/GetEventAppStatusById?eventId=${eventData.id}`, 'GET')
            .then((response) => response.json())
            .then((response) => setAppStatus(response.data.appStatus))
            .catch((err) => console.log(err));
    }, [eventData]);

    // used to retrieve data if report is entered
    useEffect(() => {
        if (appStatus === 4) {
            FetchApiGet(`services/Daywork/EventReport/GetEventReportsByEventId?id=${eventData.id}`, 'GET')
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    response.data.eventReportProducts.map((data) =>
                        data.isPromo === true
                            ? (setSelectedPromoProducts((selectedPromoProducts) => [
                                  ...selectedPromoProducts,
                                  data.productId,
                              ]),
                              setSelectedPromoProductsName((selectedPromoProductsName) => [
                                  ...selectedPromoProductsName,
                                  data.productName,
                              ]),
                              setSelectPromoName((selectPromoName) => [
                                  ...selectPromoName,
                                  { value: data.productId, label: data.productName },
                              ]))
                            : (setSelectedNonPromoProducts((selectedNonPromoProducts) => [
                                  ...selectedNonPromoProducts,
                                  data.productId,
                              ]),
                              setSelectedNonPromoProductsName((selectedNonPromoProductsName) => [
                                  ...selectedNonPromoProductsName,
                                  data.productName,
                              ]),
                              setselectNonPromoName((selectNonPromoName) => [
                                  ...selectNonPromoName,
                                  { value: data.productId, label: data.productName },
                              ]))
                    );
                    //---(3)
                    response.data.eventReportProducts.map((data) =>
                        data.isPromo === true
                            ? setProductPercents((productPercents) => [...productPercents, data.productPercent])
                            : setNonProductPercents((nonProductPercents) => [
                                  ...nonProductPercents,
                                  data.productPercent,
                              ])
                    );

                    //---(4)
                    response.data.eventReportProducts.map((data) =>
                        data.isPromo === true
                            ? setPromoKeyOpenOrLider((promoKeyOpenOrLider) => [
                                  ...promoKeyOpenOrLider,
                                  data.keyOpenerLider,
                              ])
                            : setNonPromoKeyOpenOrLider((nonPromoKeyOpenOrLider) => [
                                  ...nonPromoKeyOpenOrLider,
                                  data.keyOpenerLider,
                              ])
                    );
                    //---(6)
                    response.data.eventReportProducts.map((data) =>
                        data.isPromo === true
                            ? setPromoLoyalty((promoLoyalty) => [...promoLoyalty, data.productLoyalty])
                            : setNonPromoLoyalty((nonPromoLoyalty) => [...nonPromoLoyalty, data.productLoyalty])
                    );
                    //---(7)
                    // eslint-disable-next-line array-callback-return
                    response.data.eventReportCompetitors.map((data) => {
                        setNewCompetitors((nameCompetitor) => [...nameCompetitor, data.competitorName]);
                        setNewCompetitorsPercent((percentCompetitor) => [...percentCompetitor, data.competitorPercent]);
                        setNewCompetitorsId((ıdCompetitor) => [...ıdCompetitor, data.competitorId]);
                    });
                    //---(8)
                    previousObjections(response);
                    //---(9)
                    setPatientValue(response.data.eventReport.patientNumberDaily);
                    //---(10)
                    setClicked(response.data.eventReport.physchoType.id);
                    //---(11)
                    response.data.eventReportWants.map((data) =>
                        data.wants.id === 1
                            ? setWantsClicked1(true)
                            : data.wants.id === 2
                            ? setWantsClicked2(true)
                            : data.wants.id === 3
                            ? setWantsClicked3(true)
                            : data.wants.id === 4
                            ? setWantsClicked4(true)
                            : data.wants.id === 5
                            ? setWantsClicked5(true)
                            : data.wants.id === 6
                            ? setWantsClicked6(true)
                            : data.wants.id === 7
                            ? setWantsClicked7(true)
                            : null
                    );
                    //---(12)
                    //---(13)
                    setSelectMailName(
                        response.data.eventReportMails.map((mailInfo) => ({
                            mail: mailInfo.email,
                            value: mailInfo.employeeId,
                            label: mailInfo.fullName,
                            title: mailInfo.employeeTitle,
                        }))
                    );
                    setOpinionsAbout(response.data.eventReport.opinions);
                })
                .catch((err) => console.log(err));

            setChangePage(2);
        } else if (appStatus !== undefined && appStatus !== 4 && appStatus !== 0) {
            FetchApiGet(`services/Daywork/EventReport/GetPreviousEventReportsByEventId?eventId=${eventData.id}`, 'POST')
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    response.data.eventReportProducts.map((data) =>
                        data.isPromo === true
                            ? ((selectedPromoProducts) => [...selectedPromoProducts, data.productId],
                              setSelectedPromoProductsName((selectedPromoProductsName) => [
                                  ...selectedPromoProductsName,
                                  data.productName,
                              ]),
                              setSelectPromoName((selectPromoName) => [
                                  ...selectPromoName,
                                  { value: data.productId, label: data.productName },
                              ]))
                            : (setSelectedNonPromoProducts((selectedNonPromoProducts) => [
                                  ...selectedNonPromoProducts,
                                  data.productId,
                              ]),
                              setSelectedNonPromoProductsName((selectedNonPromoProductsName) => [
                                  ...selectedNonPromoProductsName,
                                  data.productName,
                              ]),
                              setselectNonPromoName((selectNonPromoName) => [
                                  ...selectNonPromoName,
                                  { value: data.productId, label: data.productName },
                              ]))
                    );
                    //---(3)
                    response.data.eventReportProducts.map((data) =>
                        data.isPromo === true
                            ? setProductPercents((productPercents) => [...productPercents, data.productPercent])
                            : setNonProductPercents((nonProductPercents) => [
                                  ...nonProductPercents,
                                  data.productPercent,
                              ])
                    );

                    //---(4)
                    response.data.eventReportProducts.map((data) =>
                        data.isPromo === true
                            ? setPromoKeyOpenOrLider((promoKeyOpenOrLider) => [
                                  ...promoKeyOpenOrLider,
                                  data.keyOpenerLider,
                              ])
                            : setNonPromoKeyOpenOrLider((nonPromoKeyOpenOrLider) => [
                                  ...nonPromoKeyOpenOrLider,
                                  data.keyOpenerLider,
                              ])
                    );
                    //---(6)
                    response.data.eventReportProducts.map((data) =>
                        data.isPromo === true
                            ? setPromoLoyalty((promoLoyalty) => [...promoLoyalty, data.productLoyalty])
                            : setNonPromoLoyalty((nonPromoLoyalty) => [...nonPromoLoyalty, data.productLoyalty])
                    );
                    //---(7)
                    //---(8)
                    previousObjections(response);
                    //---(9)
                    setPatientValue(response.data.eventReport.patientNumberDaily);
                    //---(10)
                    setClicked(response.data.eventReport.physchoType.id);
                    //---(11)
                    response.data.eventReportWants.map((data) =>
                        data.wants.id === 1
                            ? setWantsClicked1(true)
                            : data.wants.id === 2
                            ? setWantsClicked2(true)
                            : data.wants.id === 3
                            ? setWantsClicked3(true)
                            : data.wants.id === 4
                            ? setWantsClicked4(true)
                            : data.wants.id === 5
                            ? setWantsClicked5(true)
                            : data.wants.id === 6
                            ? setWantsClicked6(true)
                            : data.wants.id === 7
                            ? setWantsClicked7(true)
                            : null
                    );
                    //---(12)
                    //---(13)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [appStatus, eventData]);

    useEffect(() => {
        //setSelectPromoName([...selectedPromoProductsName]);
        setPromoProduct([...selectedPromoProductsName]);
        setPromoProductName([...selectedPromoProducts]);
        setNonePromoProduct([...selectedNonPromoProductsName]);
        setNonePromoProductName([...selectedNonPromoProducts]);
    }, [datas]);

    useEffect(() => {
        productPercents.map((data, index) =>
            index === 0
                ? setFirstChangePoint(data / 20)
                : index === 1
                ? setSecondChangePoint(data / 20)
                : index === 2
                ? setThirdChangePoint(data / 20)
                : null
        );
        nonProductPercents.map((data, index) =>
            index === 0
                ? setFourthChangePoint(data / 20)
                : index === 1
                ? setFiftyChangePoint(data / 20)
                : index === 2
                ? setSixtyChangePoint(data / 20)
                : null
        );
        // setFirstChangePoint((productPercents[0]/20));
        // setSecondChangePoint((productPercents[1]/20));
        // setThirdChangePoint((productPercents[2]/20));
        // setFourthChangePoint((productPercents[3]/20));
        // setFiftyChangePoint((productPercents[4]/20));
        // setSixtyChangePoint((productPercents[5]/20));
    }, [nonProductPercents, productPercents]);

    useEffect(() => {
        promoKeyOpenOrLider.map((data, index) =>
            index === 0
                ? setFirstCheckbox(data)
                : index === 1
                ? setSecondCheckbox(data)
                : index === 2
                ? setThirdCheckbox(data)
                : null
        );
        nonPromoKeyOpenOrLider.map((data, index) =>
            index === 0
                ? setFourthCheckbox(data)
                : index === 1
                ? setFifthCheckbox(data)
                : index === 2
                ? setSixthCheckbox(data)
                : null
        );
        // setFirstCheckbox(allPageFour[0]);
        // setSecondCheckbox(allPageFour[1]);
        // setThirdCheckbox(allPageFour[2]);
        // setFourthCheckbox(allPageFour[3]);
    }, [nonPromoKeyOpenOrLider, promoKeyOpenOrLider]);

    useEffect(() => {
        promoLoyalty.map((data, index) =>
            index === 0
                ? setFirstRating(data)
                : index === 1
                ? setSecondRating(data)
                : index === 2
                ? setThirdRating(data)
                : null
        );
        nonPromoLoyalty.map((data, index) =>
            index === 0
                ? setFourthRating(data)
                : index === 1
                ? setFifthRating(data)
                : index === 2
                ? setSixthRating(data)
                : null
        );
        // setFirstRating((allPageSix[0]));
        // setSecondRating((allPageSix[1]));
        // setThirdRating((allPageSix[2]));
        // setFourthRating((allPageSix[3]));
    }, [nonPromoLoyalty, promoLoyalty]);

    const reportClick = (e) => {
        setReportTitle(appStatus === 4 ? 'Select Product' : 'Visit Status');
        setChangePage(appStatus === 4 ? 2 : 1);
        const openedReportBody = { EventId: eventData.id };
        FetchApiPost('services/Daywork/EventReport/OpenedReport', 'PATCH', openedReportBody);

        //Report page 2 promo and subpromo api
        FetchApiGet(`api/OldSystem/GetProduct?EventId=${eventData.id}`, 'GET')
            .then((response) => response.json())
            .then((response) => {
                var one = [1];
                var zero = [0];
                const promoDatas = response.filter((obj) => one.includes(obj.ProductStatus));
                const nonePromoDatas = response.filter((obj) => zero.includes(obj.ProductStatus));
                setDatas(promoDatas.map((index) => ({ value: index.ProductId, label: index.ProductName })));
                setDatas2(nonePromoDatas.map((index) => ({ value: index.ProductId, label: index.ProductName })));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // Not visiting -------------( PAGE 0 )--------------

    const [notVisiting, setNotVisiting] = useState(['string']);
    const changeNotVisiting = (event) => {
        // setNotVisiting(event.target);
        setNotVisiting(Array.isArray(event) ? event.map((x) => x.label) : []);
    };

    const notVisitingSelect = () => {
        if (notVisiting.length > 0) {
            if (notVisiting[0] === 'string') {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    };

    // Select Products -------------( PAGE 2 )--------------
    // Promo / None-Promo Product
    const [promoProduct, setPromoProduct] = useState([]); // PROMO NAME
    const [promoProductName, setPromoProductName] = useState([]); // PROMO ID
    const [nonePromoProduct, setNonePromoProduct] = useState([]); // NONE-PROMO NAME
    const [nonePromoProductName, setNonePromoProductName] = useState([]); // NONE-PROMO ID
    console.log(promoProduct);
    const [secondPromoName, setSecondPromoName] = useState();
    const [secondPromoId, setSecondPromoId] = useState();
    const [thirdPromoName, setThirdPromoName] = useState();
    const [thirdPromoId, setThirdPromoId] = useState();
    const [firstNonePromoName, setFirstNonePromoName] = useState();
    const [firstNonePromoId, setFirstNonePromoId] = useState();
    const [secondNonePromoName, setSecondNonePromoName] = useState();
    const [secondNonePromoId, setSecondNonePromoId] = useState();
    const [thirdNonePromoName, setThirdNonePromoName] = useState();
    const [thirdNonePromoId, setThirdNonePromoId] = useState();

    const changePromoProduct = (event) => {
        setPromoProduct(Array.isArray(event) ? event.map((x) => x.label) : []);
        setPromoProductName(Array.isArray(event) ? event.map((x) => x.value) : []);
        setSelectPromoName(Array.isArray(event) ? event.map((x) => x.label) : []);
        setSelectPromoName(event.map((data) => ({ value: data.value, label: data.label })));
    };
    const changeNonePromoProduct = (event) => {
        setNonePromoProduct(Array.isArray(event) ? event.map((x) => x.label) : []);
        setNonePromoProductName(Array.isArray(event) ? event.map((x) => x.value) : []);
        setselectNonPromoName(event.map((data) => ({ value: data.value, label: data.label })));
    };

    const isOpenPromo = () => {
        if (promoProduct.length > 2) {
            return true;
        } else {
            return false;
        }
    };

    const isOpenNonePromo = () => {
        if (nonePromoProduct.length > 2) {
            return true;
        } else {
            return false;
        }
    };

    // SUCCESS OF VİSİT (3) -------------( PAGE 3 )--------------
    const [changeFirstPoint, setFirstChangePoint] = useState(6);
    const firstSuccessVisit0 = () => {
        setFirstChangePoint(0);
        if (changeFirstPoint === 0) {
            setFirstChangePoint(6);
        }
    };

    const firstSuccessVisit20 = () => {
        setFirstChangePoint(1);
        if (changeFirstPoint === 1) {
            setFirstChangePoint(6);
        }
    };

    const firstSuccessVisit40 = () => {
        setFirstChangePoint(2);
        if (changeFirstPoint === 2) {
            setFirstChangePoint(6);
        }
    };

    const firstSuccessVisit60 = () => {
        setFirstChangePoint(3);
        if (changeFirstPoint === 3) {
            setFirstChangePoint(6);
        }
    };

    const firstSuccessVisit80 = () => {
        setFirstChangePoint(4);
        if (changeFirstPoint === 4) {
            setFirstChangePoint(6);
        }
    };

    const firstSuccessVisit100 = () => {
        setFirstChangePoint(5);
        if (changeFirstPoint === 5) {
            setFirstChangePoint(6);
        }
    };
    // -------
    const [changeSecondPoint, setSecondChangePoint] = useState(6);
    const secondSuccessVisit0 = () => {
        setSecondChangePoint(0);
        if (changeSecondPoint === 0) {
            setSecondChangePoint(6);
        }
    };
    const secondSuccessVisit20 = () => {
        setSecondChangePoint(1);
        if (changeSecondPoint === 1) {
            setSecondChangePoint(6);
        }
    };

    const secondSuccessVisit40 = () => {
        setSecondChangePoint(2);
        if (changeSecondPoint === 2) {
            setSecondChangePoint(6);
        }
    };

    const secondSuccessVisit60 = () => {
        setSecondChangePoint(3);
        if (changeSecondPoint === 3) {
            setSecondChangePoint(6);
        }
    };

    const secondSuccessVisit80 = () => {
        setSecondChangePoint(4);
        if (changeSecondPoint === 4) {
            setSecondChangePoint(6);
        }
    };

    const secondSuccessVisit100 = () => {
        setSecondChangePoint(5);
        if (changeSecondPoint === 5) {
            setSecondChangePoint(6);
        }
    };
    // -------
    const [changeThirdPoint, setThirdChangePoint] = useState(6);
    const thirdSuccessVisit0 = () => {
        setThirdChangePoint(0);
        if (changeThirdPoint === 0) {
            setThirdChangePoint(6);
        }
    };

    const thirdSuccessVisit20 = () => {
        setThirdChangePoint(1);
        if (changeThirdPoint === 1) {
            setThirdChangePoint(6);
        }
    };

    const thirdSuccessVisit40 = () => {
        setThirdChangePoint(2);
        if (changeThirdPoint === 2) {
            setThirdChangePoint(6);
        }
    };

    const thirdSuccessVisit60 = () => {
        setThirdChangePoint(3);
        if (changeThirdPoint === 3) {
            setThirdChangePoint(6);
        }
    };

    const thirdSuccessVisit80 = () => {
        setThirdChangePoint(4);
        if (changeThirdPoint === 4) {
            setThirdChangePoint(6);
        }
    };

    const thirdSuccessVisit100 = () => {
        setThirdChangePoint(5);
        if (changeThirdPoint === 5) {
            setThirdChangePoint(6);
        }
    };
    // -------
    const [changeFourthPoint, setFourthChangePoint] = useState(6);
    const fourthSuccessVisit0 = () => {
        setFourthChangePoint(0);
        if (changeFourthPoint === 0) {
            setFourthChangePoint(6);
        }
    };

    const fourthSuccessVisit20 = () => {
        setFourthChangePoint(1);
        if (changeFourthPoint === 1) {
            setFourthChangePoint(6);
        }
    };

    const fourthSuccessVisit40 = () => {
        setFourthChangePoint(2);
        if (changeFourthPoint === 2) {
            setFourthChangePoint(6);
        }
    };

    const fourthSuccessVisit60 = () => {
        setFourthChangePoint(3);
        if (changeFourthPoint === 3) {
            setFourthChangePoint(6);
        }
    };

    const fourthSuccessVisit80 = () => {
        setFourthChangePoint(4);
        if (changeFourthPoint === 4) {
            setFourthChangePoint(6);
        }
    };

    const fourthSuccessVisit100 = () => {
        setFourthChangePoint(5);
        if (changeFourthPoint === 5) {
            setFourthChangePoint(6);
        }
    };
    // -------
    const [changeFiftyPoint, setFiftyChangePoint] = useState(6);
    const FiftySuccessVisit0 = () => {
        setFiftyChangePoint(0);
        if (changeFiftyPoint === 0) {
            setFiftyChangePoint(6);
        }
    };
    const FiftySuccessVisit20 = () => {
        setFiftyChangePoint(1);
        if (changeFiftyPoint === 1) {
            setFiftyChangePoint(6);
        }
    };

    const FiftySuccessVisit40 = () => {
        setFiftyChangePoint(2);
        if (changeFiftyPoint === 2) {
            setFiftyChangePoint(6);
        }
    };

    const FiftySuccessVisit60 = () => {
        setFiftyChangePoint(3);
        if (changeFiftyPoint === 3) {
            setFiftyChangePoint(6);
        }
    };

    const FiftySuccessVisit80 = () => {
        setFiftyChangePoint(4);
        if (changeFiftyPoint === 4) {
            setFiftyChangePoint(6);
        }
    };

    const FiftySuccessVisit100 = () => {
        setFiftyChangePoint(5);
        if (changeFiftyPoint === 5) {
            setFiftyChangePoint(6);
        }
    };
    // -------
    const [changeSixtyPoint, setSixtyChangePoint] = useState(6);
    const SixtySuccessVisit0 = () => {
        setSixtyChangePoint(0);
        if (changeSixtyPoint === 0) {
            setSixtyChangePoint(6);
        }
    };
    const SixtySuccessVisit20 = () => {
        setSixtyChangePoint(1);
        if (changeSixtyPoint === 1) {
            setSixtyChangePoint(6);
        }
    };

    const SixtySuccessVisit40 = () => {
        setSixtyChangePoint(2);
        if (changeSixtyPoint === 2) {
            setSixtyChangePoint(6);
        }
    };

    const SixtySuccessVisit60 = () => {
        setSixtyChangePoint(3);
        if (changeSixtyPoint === 3) {
            setSixtyChangePoint(6);
        }
    };

    const SixtySuccessVisit80 = () => {
        setSixtyChangePoint(4);
        if (changeSixtyPoint === 4) {
            setSixtyChangePoint(6);
        }
    };

    const SixtySuccessVisit100 = () => {
        setSixtyChangePoint(5);
        if (changeSixtyPoint === 5) {
            setSixtyChangePoint(6);
        }
    };

    // KEY---Checkbox (4) -------------( PAGE 4)--------------
    const [firstCheckbox, setFirstCheckbox] = useState(true);
    const [secondCheckbox, setSecondCheckbox] = useState(true);
    const [thirdCheckbox, setThirdCheckbox] = useState(true);
    const [fourthCheckbox, setFourthCheckbox] = useState(true);
    const [fifthCheckbox, setFifthCheckbox] = useState(true);
    const [sixthCheckbox, setSixthCheckbox] = useState(true);

    const firstChangeChecked1 = () => {
        setFirstCheckbox(true);
    };
    const firstChangeChecked2 = () => {
        setFirstCheckbox(false);
    };
    //-
    const secondChangeChecked1 = () => {
        setSecondCheckbox(true);
    };
    const secondChangeChecked2 = () => {
        setSecondCheckbox(false);
    };
    //-
    const thirdChangeChecked1 = () => {
        setThirdCheckbox(true);
    };
    const thirdChangeChecked2 = () => {
        setThirdCheckbox(false);
    };
    //-
    const fourthChangeChecked1 = () => {
        setFourthCheckbox(true);
    };
    const fourthChangeChecked2 = () => {
        setFourthCheckbox(false);
    };
    //-
    const fifthChangeChecked1 = () => {
        setFifthCheckbox(true);
    };
    const fifthChangeChecked2 = () => {
        setFifthCheckbox(false);
    };
    //-
    const sixthChangeChecked1 = () => {
        setSixthCheckbox(true);
    };
    const sixthChangeChecked2 = () => {
        setSixthCheckbox(false);
    };

    //Promotional materials -------------( PAGE 5 )--------------

    const [allPromoMaterial, setAllPromoMaterial] = useState([]);

    const [materialsDatas1, setMaterialsDatas1] = useState({});
    const [materialsDatas2, setMaterialsDatas2] = useState({});
    const [materialsDatas3, setMaterialsDatas3] = useState({});
    const [materialsDatas4, setMaterialsDatas4] = useState({});
    const [materialsDatas5, setMaterialsDatas5] = useState({});
    const [materialsDatas6, setMaterialsDatas6] = useState({});

    const [material1, setMaterial1] = useState([]);
    const [material2, setMaterial2] = useState([]);
    const [material3, setMaterial3] = useState([]);
    const [material4, setMaterial4] = useState([]);
    const [material5, setMaterial5] = useState([]);
    const [material6, setMaterial6] = useState([]);

    const changeMaterials1 = (event) => {
        setMaterial1(event);
    };
    const changeMaterials2 = (event) => {
        setMaterial2(event);
    };
    const changeMaterials3 = (event) => {
        setMaterial3(event);
    };
    const changeMaterials4 = (event) => {
        setMaterial4(event);
    };
    const changeMaterials5 = (event) => {
        setMaterial5(event);
    };
    const changeMaterials6 = (event) => {
        setMaterial6(event);
    };

    //RATİNG -------------( PAGE 6 )--------------

    const [firstRating, setFirstRating] = useState();
    const [secondRating, setSecondRating] = useState();
    const [thirdRating, setThirdRating] = useState();
    const [fourthRating, setFourthRating] = useState();
    const [fifthRating, setFifthRating] = useState();
    const [sixthRating, setSixthRating] = useState();

    const [firstHover, setFirstHover] = useState(null);
    const [secondHover, setSecondHover] = useState(null);
    const [thirdHover, setThirdHover] = useState(null);
    const [fourthHover, setFourthHover] = useState(null);
    const [fifthHover, setFifthHover] = useState(null);
    const [sixthHover, setSixthHover] = useState(null);

    // FIRST LOYALTY  -------------( PAGE 7 )--------------

    // VALUES-Numbers

    const firstInputChange1 = (e) => {
        setFirstInput1(e.target.value);
    };
    const firstInputChange2 = (e) => {
        setFirstInput2(e.target.value);
    };
    const firstInputChange3 = (e) => {
        setFirstInput3(e.target.value);
    };
    const firstInputChange4 = (e) => {
        setFirstInput4(e.target.value);
    };

    // INPUTS
    const [competitor1, setCompetitor1] = useState(0);
    const [competitor2, setCompetitor2] = useState(0);
    const [competitor3, setCompetitor3] = useState(0);
    const [competitor4, setCompetitor4] = useState(0);

    const allCompetitorName1 = [competitor1, competitor2, competitor3, competitor4];

    // NEW COMPETİTOR GET && ADD
    const [newCompetitors, setNewCompetitors] = useState([]);
    const [newCompetitorsPercent, setNewCompetitorsPercent] = useState([]);
    const [newCompetitorsId, setNewCompetitorsId] = useState([]);

    // OLD COMPTETİTORS
    const [competitorId1, setCompetitorId1] = useState(0);
    const [competitorId2, setCompetitorId2] = useState(0);
    const [competitorId3, setCompetitorId3] = useState(0);
    const [competitorId4, setCompetitorId4] = useState(0);

    const allCompetitor1 = [competitorId1, competitorId2, competitorId3, competitorId4];

    const firstCompetitor1 = [competitor1, competitor2];
    const firstCompetitor2 = [competitor1, competitor2, competitor3];

    const [firstInput1, setFirstInput1] = useState(0);
    const [firstInput2, setFirstInput2] = useState(0);
    const [firstInput3, setFirstInput3] = useState(0);
    const [firstInput4, setFirstInput4] = useState(0);
    const allFirstInput1 = [firstInput1, firstInput2, firstInput3, firstInput4];

    var sum1 = +firstInput1 + +firstInput2 + +firstInput3 + +firstInput4; /// integer sum

    // query options -- query input
    const [firstCheck1, setFirstCheck1] = useState(false);
    const [firstCheck2, setFirstCheck2] = useState(false);
    const [firstCheck3, setFirstCheck3] = useState(false);
    const [firstCheck4, setFirstCheck4] = useState(false);

    // invisible
    const [invisible, setInvisible] = useState(0);
    const [isChangeComp1, setIsChangeComp1] = useState(false);
    const [isChangeComp2, setIsChangeComp2] = useState(false);
    const [isChangeComp3, setIsChangeComp3] = useState(false);
    const [isChangeComp4, setIsChangeComp4] = useState(false);

    // NEW COMPETİTOR GET APİ SHOW PAGE 7
    // change competitor1

    useEffect(() => {
        if (newCompetitors.length === 1) {
            setFirstCheck1(true);
            setIsChangeComp1(true);
            if (firstInput1 === 0) {
                setFirstInput1(100);
            }
        }
    }, [firstInput1, invisible, newCompetitors]);
    // change competitor2
    useEffect(() => {
        if (newCompetitors.length > 1) {
            setFirstCheck2(true);
            setIsChangeComp2(true);
            if (firstInput2 === 0) {
                setFirstInput1(50);
                setFirstInput2(50);
            }
            if (invisible === 0) {
                setInvisible(1);
            }
        }
    }, [firstInput2, invisible, newCompetitors]);
    // change competitor3
    useEffect(() => {
        if (newCompetitors.length > 2) {
            setIsChangeComp3(true);
            setFirstCheck3(true);
            if (firstInput3 === 0) {
                setFirstInput1(40);
                setFirstInput2(30);
                setFirstInput3(30);
            }
            if (invisible === 1) {
                setInvisible(2);
            }
        }
    }, [firstInput3, invisible, newCompetitors]);
    // change competitor4
    useEffect(() => {
        if (newCompetitors.length > 3) {
            setFirstCheck4(true);
            setIsChangeComp4(true);
            setFirstInput1(25);
            setFirstInput2(25);
            setFirstInput3(25);
            setFirstInput4(25);
        }
    }, [invisible, newCompetitors]);

    // OLD DEFAULT COMPETİTOR ON CHANGE METHOD
    const changeCompetitor1 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setCompetitor1(event.nativeEvent.target[index].text);
        setCompetitorId1(event.target.value);
        setFirstCheck1(true);
        setIsChangeComp1(true);
        if (firstInput1 === 0) {
            setFirstInput1(100);
        }
        if (invisible === 0) {
            setInvisible(1);
        }
    };
    const changeCompetitor2 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setCompetitor2(event.nativeEvent.target[index].text);
        setCompetitorId2(event.target.value);
        setFirstCheck2(true);
        setIsChangeComp2(true);
        if (firstInput2 === 0) {
            setFirstInput1(50);
            setFirstInput2(50);
        }
        if (invisible === 1) {
            setInvisible(2);
        }
    };
    const changeCompetitor3 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setCompetitor3(event.nativeEvent.target[index].text);
        setCompetitorId3(event.target.value);
        setIsChangeComp3(true);
        setFirstCheck3(true);
        if (firstInput3 === 0) {
            setFirstInput1(40);
            setFirstInput2(30);
            setFirstInput3(30);
        }
        if (invisible === 2) {
            setInvisible(3);
        }
    };
    const changeCompetitor4 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setCompetitor4(event.nativeEvent.target[index].text);
        setCompetitorId4(event.target.value);
        setFirstCheck4(true);
        setIsChangeComp4(true);
        setFirstInput1(25);
        setFirstInput2(25);
        setFirstInput3(25);
        setFirstInput4(25);
    };

    // SECOND LOYALTY

    // VALUES-Numbers
    const secondInputChange1 = (e) => {
        setSecondInput1(e.target.value);
    };
    const secondInputChange2 = (e) => {
        setSecondInput2(e.target.value);
    };
    const secondInputChange3 = (e) => {
        setSecondInput3(e.target.value);
    };
    const secondInputChange4 = (e) => {
        setSecondInput4(e.target.value);
    };

    // INPUTS
    const [secondCompetitor1, setSecondCompetitor1] = useState(0);
    const [secondCompetitor2, setSecondCompetitor2] = useState(0);
    const [secondCompetitor3, setSecondCompetitor3] = useState(0);
    const [secondCompetitor4, setSecondCompetitor4] = useState(0);

    const allCompetitorName2 = [secondCompetitor1, secondCompetitor2, secondCompetitor3, secondCompetitor4];

    const sumSecondCompetitor1 = [secondCompetitor1, secondCompetitor2];
    const sumSecondCompetitor2 = [secondCompetitor1, secondCompetitor2, secondCompetitor3];

    const [secondCompetitorId1, setSecondCompetitorId1] = useState(0);
    const [secondCompetitorId2, setSecondCompetitorId2] = useState(0);
    const [secondCompetitorId3, setSecondCompetitorId3] = useState(0);
    const [secondCompetitorId4, setSecondCompetitorId4] = useState(0);

    const allCompetitor2 = [secondCompetitorId1, secondCompetitorId2, secondCompetitorId3, secondCompetitorId4];
    const [secondInput1, setSecondInput1] = useState(0);
    const [secondInput2, setSecondInput2] = useState(0);
    const [secondInput3, setSecondInput3] = useState(0);
    const [secondInput4, setSecondInput4] = useState(0);

    const allSecondInput = [secondInput1, secondInput2, secondInput3, secondInput4];
    var sum2 = +secondInput1 + +secondInput2 + +secondInput3 + +secondInput4; /// integer sum

    // query options -- query input
    const [secondCheck1, setSecondCheck1] = useState(false);
    const [secondCheck2, setSecondCheck2] = useState(false);
    const [secondCheck3, setSecondCheck3] = useState(false);
    const [secondCheck4, setSecondCheck4] = useState(false);

    // invisible
    const [invisible2, setInvisible2] = useState(0);

    const changeSecondCompetitor1 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setSecondCompetitor1(event.nativeEvent.target[index].text);
        setSecondCompetitorId1(event.target.value);
        setSecondCheck1(true);
        if (secondInput1 === 0) {
            setSecondInput1(100);
        }
        if (invisible2 === 0) {
            setInvisible2(1);
        }
    };
    const changeSecondCompetitor2 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setSecondCompetitor2(event.nativeEvent.target[index].text);
        setSecondCompetitorId2(event.target.value);
        setSecondCheck2(true);
        if (secondInput2 === 0) {
            setSecondInput1(50);
            setSecondInput2(50);
        }
        if (invisible2 === 1) {
            setInvisible2(2);
        }
    };
    const changeSecondCompetitor3 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setSecondCompetitor3(event.nativeEvent.target[index].text);
        setSecondCompetitorId3(event.target.value);
        setSecondCheck3(true);
        if (secondInput3 === 0) {
            setSecondInput1(40);
            setSecondInput2(30);
            setSecondInput3(30);
        }
        if (invisible2 === 2) {
            setInvisible2(3);
        }
    };
    const changeSecondCompetitor4 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setSecondCompetitor4(event.nativeEvent.target[index].text);
        setSecondCompetitorId4(event.target.value);
        setSecondCheck4(true);
        setSecondInput1(25);
        setSecondInput2(25);
        setSecondInput3(25);
        setSecondInput4(25);
    };

    // THIRD LOYALTY

    // VALUES-Numbers
    const thirdInputChange1 = (e) => {
        setThirdInput1(e.target.value);
    };
    const thirdInputChange2 = (e) => {
        setThirdInput2(e.target.value);
    };
    const thirdInputChange3 = (e) => {
        setThirdInput3(e.target.value);
    };
    const thirdInputChange4 = (e) => {
        setThirdInput4(e.target.value);
    };

    // INPUTS
    const [thirdCompetitor1, setThirdCompetitor1] = useState(0);
    const [thirdCompetitor2, setThirdCompetitor2] = useState(0);
    const [thirdCompetitor3, setThirdCompetitor3] = useState(0);
    const [thirdCompetitor4, setThirdCompetitor4] = useState(0);
    const allCompetitorName3 = [thirdCompetitor1, thirdCompetitor2, thirdCompetitor3, thirdCompetitor4];

    const sumThirdCompetitor1 = [thirdCompetitor1, thirdCompetitor2];
    const sumThirdCompetitor2 = [thirdCompetitor1, thirdCompetitor2, thirdCompetitor3];

    const [thirdCompetitorId1, setThirdCompetitorId1] = useState(0);
    const [thirdCompetitorId2, setThirdCompetitorId2] = useState(0);
    const [thirdCompetitorId3, setThirdCompetitorId3] = useState(0);
    const [thirdCompetitorId4, setThirdCompetitorId4] = useState(0);
    const allCompetitor3 = [thirdCompetitorId1, thirdCompetitorId2, thirdCompetitorId3, thirdCompetitorId4];
    // INPUT--placeholder
    const [thirdInput1, setThirdInput1] = useState(0);
    const [thirdInput2, setThirdInput2] = useState(0);
    const [thirdInput3, setThirdInput3] = useState(0);
    const [thirdInput4, setThirdInput4] = useState(0);
    const allThirdInput = [thirdInput1, thirdInput2, thirdInput3, thirdInput4];
    var sum3 = +thirdInput1 + +thirdInput2 + +thirdInput3 + +thirdInput4; /// integer sum

    // query options -- query input
    const [thirdCheck1, setThirdCheck1] = useState(false);
    const [thirdCheck2, setThirdCheck2] = useState(false);
    const [thirdCheck3, setThirdCheck3] = useState(false);
    const [thirdCheck4, setThirdCheck4] = useState(false);

    // invisible
    const [invisible3, setInvisible3] = useState(0);

    const changeThirdCompetitor1 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setThirdCompetitor1(event.nativeEvent.target[index].text);
        setThirdCompetitorId1(event.target.value);
        setThirdCheck1(true);
        if (thirdInput1 === 0) {
            setThirdInput1(100);
        }
        if (invisible3 === 0) {
            setInvisible3(1);
        }
    };
    const changeThirdCompetitor2 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setThirdCompetitor2(event.nativeEvent.target[index].text);
        setThirdCompetitorId2(event.target.value);
        setThirdCheck2(true);
        if (thirdInput2 === 0) {
            setThirdInput1(50);
            setThirdInput2(50);
        }
        if (invisible3 === 1) {
            setInvisible3(2);
        }
    };
    const changeThirdCompetitor3 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setThirdCompetitor3(event.nativeEvent.target[index].text);
        setThirdCompetitorId3(event.target.value);
        setThirdCheck3(true);
        if (thirdInput3 === 0) {
            setThirdInput1(40);
            setThirdInput2(30);
            setThirdInput3(30);
        }
        if (invisible3 === 2) {
            setInvisible3(3);
        }
    };
    const changeThirdCompetitor4 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setThirdCompetitor4(event.nativeEvent.target[index].text);
        setThirdCompetitorId4(event.target.value);
        setThirdCheck4(true);
        setThirdInput1(25);
        setThirdInput2(25);
        setThirdInput3(25);
        setThirdInput4(25);
    };

    // FOURTH LOYALTY

    // VALUES-Numbers
    const fourthInputChange1 = (e) => {
        setFourthInput1(e.target.value);
    };
    const fourthInputChange2 = (e) => {
        setFourthInput2(e.target.value);
    };
    const fourthInputChange3 = (e) => {
        setFourthInput3(e.target.value);
    };
    const fourthInputChange4 = (e) => {
        setFourthInput4(e.target.value);
    };

    // INPUTS
    const [fourthCompetitor1, setFourthCompetitor1] = useState(0);
    const [fourthCompetitor2, setFourthCompetitor2] = useState(0);
    const [fourthCompetitor3, setFourthCompetitor3] = useState(0);
    const [fourthCompetitor4, setFourthCompetitor4] = useState(0);
    const allCompetitorName4 = [fourthCompetitor1, fourthCompetitor2, fourthCompetitor3, fourthCompetitor4];

    const [fourthCompetitorId1, setFourthCompetitorId1] = useState(0);
    const [fourthCompetitorId2, setFourthCompetitorId2] = useState(0);
    const [fourthCompetitorId3, setFourthCompetitorId3] = useState(0);
    const [fourthCompetitorId4, setFourthCompetitorId4] = useState(0);

    const allCompetitor4 = [fourthCompetitorId1, fourthCompetitorId2, fourthCompetitorId3, fourthCompetitorId4];
    const sumFourCompetitor1 = [fourthCompetitor1, fourthCompetitor2];
    const sumFourCompetitor2 = [fourthCompetitor1, fourthCompetitor2, fourthCompetitor3];

    // INPUT--placeholder
    const [fourthInput1, setFourthInput1] = useState(0);
    const [fourthInput2, setFourthInput2] = useState(0);
    const [fourthInput3, setFourthInput3] = useState(0);
    const [fourthInput4, setFourthInput4] = useState(0);
    const allFourthInput = [fourthInput1, fourthInput2, fourthInput3, fourthInput4];
    var sum4 = +fourthInput1 + +fourthInput2 + +fourthInput3 + +fourthInput4; /// integer sum
    // query options -- query input
    const [fourthCheck1, setFourthCheck1] = useState(false);
    const [fourthCheck2, setFourthCheck2] = useState(false);
    const [fourthCheck3, setFourthCheck3] = useState(false);
    const [fourthCheck4, setFourthCheck4] = useState(false);

    // invisible
    const [invisible4, setInvisible4] = useState(0);

    const changeFourthCompetitor1 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setFourthCompetitor1(event.nativeEvent.target[index].text);
        setFourthCompetitorId1(event.target.value);
        setFourthCheck1(true);
        if (fourthInput1 === 0) {
            setFourthInput1(100);
        }
        if (invisible4 === 0) {
            setInvisible4(1);
        }
    };
    const changeFourthCompetitor2 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setFourthCompetitor2(event.nativeEvent.target[index].text);
        setFourthCompetitorId2(event.target.value);
        setFourthCheck2(true);
        if (fourthInput2 === 0) {
            setFourthInput1(50);
            setFourthInput2(50);
        }
        if (invisible4 === 1) {
            setInvisible4(2);
        }
    };
    const changeFourthCompetitor3 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setFourthCompetitor3(event.nativeEvent.target[index].text);
        setFourthCompetitorId3(event.target.value);
        setFourthCheck3(true);
        if (fourthInput3 === 0) {
            setFourthInput1(40);
            setFourthInput2(30);
            setFourthInput3(30);
        }
        if (invisible4 === 2) {
            setInvisible4(3);
        }
    };
    const changeFourthCompetitor4 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setFourthCompetitor4(event.nativeEvent.target[index].text);
        setFourthCompetitorId4(event.target.value);
        setFourthCheck4(true);
        setFourthInput1(25);
        setFourthInput2(25);
        setFourthInput3(25);
        setFourthInput4(25);
    };
    // FİFTH LOYALTY

    // VALUES-Numbers
    const fifthInputChange1 = (e) => {
        setFourthInput1(e.target.value);
    };
    const fifthInputChange2 = (e) => {
        setFourthInput2(e.target.value);
    };
    const fifthInputChange3 = (e) => {
        setFourthInput3(e.target.value);
    };
    const fifthInputChange4 = (e) => {
        setFourthInput4(e.target.value);
    };

    // INPUTS
    const [fifthCompetitor1, setFifthCompetitor1] = useState(0);
    const [fifthCompetitor2, setFifthCompetitor2] = useState(0);
    const [fifthCompetitor3, setFifthCompetitor3] = useState(0);
    const [fifthCompetitor4, setFifthCompetitor4] = useState(0);
    const allCompetitorName5 = [fifthCompetitor1, fifthCompetitor2, fifthCompetitor3, fifthCompetitor4];

    const [fifthCompetitorId1, setFifthCompetitorId1] = useState(0);
    const [fifthCompetitorId2, setFifthCompetitorId2] = useState(0);
    const [fifthCompetitorId3, setFifthCompetitorId3] = useState(0);
    const [fifthCompetitorId4, setFifthCompetitorId4] = useState(0);

    const allCompetitor5 = [fifthCompetitorId1, fifthCompetitorId2, fifthCompetitorId3, fifthCompetitorId4];
    const sumFifthCompetitor1 = [fifthCompetitor1, fifthCompetitor2];
    const sumFifthCompetitor2 = [fifthCompetitor1, fifthCompetitor2, fifthCompetitor3];

    // INPUT--placeholder
    const [fifthInput1, setFifthInput1] = useState(0);
    const [fifthInput2, setFifthInput2] = useState(0);
    const [fifthInput3, setFifthInput3] = useState(0);
    const [fifthInput4, setFifthInput4] = useState(0);
    const allFifthInput = [fifthInput1, fifthInput2, fifthInput3, fifthInput4];
    var sum5 = +fifthInput1 + +fifthInput2 + +fifthInput3 + +fifthInput4; /// integer sum
    // query options -- query input
    const [fifthCheck1, setFifthCheck1] = useState(false);
    const [fifthCheck2, setFifthCheck2] = useState(false);
    const [fifthCheck3, setFifthCheck3] = useState(false);
    const [fifthCheck4, setFifthCheck4] = useState(false);

    // invisible
    const [invisible5, setInvisible5] = useState(0);

    const changeFifthCompetitor1 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setFifthCompetitor1(event.nativeEvent.target[index].text);
        setFifthCompetitorId1(event.target.value);
        setFifthCheck1(true);
        if (fifthInput1 === 0) {
            setFifthInput1(100);
        }
        if (invisible5 === 0) {
            setInvisible5(1);
        }
    };
    const changeFifthCompetitor2 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setFifthCompetitor2(event.nativeEvent.target[index].text);
        setFifthCompetitorId2(event.target.value);
        setFifthCheck2(true);
        if (fifthInput2 === 0) {
            setFifthInput1(50);
            setFifthInput2(50);
        }
        if (invisible5 === 1) {
            setInvisible5(2);
        }
    };
    const changeFifthCompetitor3 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setFifthCompetitor3(event.nativeEvent.target[index].text);
        setFifthCompetitorId3(event.target.value);
        setFifthCheck3(true);
        if (fifthInput3 === 0) {
            setFifthInput1(40);
            setFifthInput2(30);
            setFifthInput3(30);
        }
        if (invisible5 === 2) {
            setInvisible5(3);
        }
    };
    const changeFifthCompetitor4 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setFifthCompetitor4(event.nativeEvent.target[index].text);
        setFifthCompetitorId4(event.target.value);
        setFifthCheck4(true);
        setFifthInput1(25);
        setFifthInput2(25);
        setFifthInput3(25);
        setFifthInput4(25);
    };

    // SİXTH LOYALTY

    // VALUES-Numbers
    const sixthInputChange1 = (e) => {
        setSixthInput1(e.target.value);
    };
    const sixthInputChange2 = (e) => {
        setSixthInput2(e.target.value);
    };
    const sixthInputChange3 = (e) => {
        setSixthInput3(e.target.value);
    };
    const sixthInputChange4 = (e) => {
        setSixthInput4(e.target.value);
    };

    // INPUTS
    const [sixthCompetitor1, setSixthCompetitor1] = useState(0);
    const [sixthCompetitor2, setSixthCompetitor2] = useState(0);
    const [sixthCompetitor3, setSixthCompetitor3] = useState(0);
    const [sixthCompetitor4, setSixthCompetitor4] = useState(0);
    const allCompetitorName6 = [sixthCompetitor1, sixthCompetitor2, sixthCompetitor3, sixthCompetitor4];

    const [sixthCompetitorId1, setSixthCompetitorId1] = useState(0);
    const [sixthCompetitorId2, setSixthCompetitorId2] = useState(0);
    const [sixthCompetitorId3, setSixthCompetitorId3] = useState(0);
    const [sixthCompetitorId4, setSixthCompetitorId4] = useState(0);

    const allCompetitor6 = [sixthCompetitorId1, sixthCompetitorId2, sixthCompetitorId3, sixthCompetitorId4];
    const sumSixthCompetitor1 = [sixthCompetitor1, sixthCompetitor2];
    const sumSixthCompetitor2 = [sixthCompetitor1, sixthCompetitor2, sixthCompetitor3];

    // INPUT--placeholder
    const [sixthInput1, setSixthInput1] = useState(0);
    const [sixthInput2, setSixthInput2] = useState(0);
    const [sixthInput3, setSixthInput3] = useState(0);
    const [sixthInput4, setSixthInput4] = useState(0);
    const allSixthInput = [sixthInput1, sixthInput2, sixthInput3, sixthInput4];
    var sum6 = +sixthInput1 + +sixthInput2 + +sixthInput3 + +sixthInput4; /// integer sum
    // query options -- query input
    const [sixthCheck1, setSixthCheck1] = useState(false);
    const [sixthCheck2, setSixthCheck2] = useState(false);
    const [sixthCheck3, setSixthCheck3] = useState(false);
    const [sixthCheck4, setSixthCheck4] = useState(false);

    // invisible
    const [invisible6, setInvisible6] = useState(0);

    const changeSixthCompetitor1 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setSixthCompetitor1(event.nativeEvent.target[index].text);
        setSixthCompetitorId1(event.target.value);
        setSixthCheck1(true);
        if (sixthInput1 === 0) {
            setSixthInput1(100);
        }
        if (invisible6 === 0) {
            setInvisible6(1);
        }
    };
    const changeSixthCompetitor2 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setSixthCompetitor2(event.nativeEvent.target[index].text);
        setSixthCompetitorId2(event.target.value);
        setSixthCheck2(true);
        if (sixthInput2 === 0) {
            setSixthInput1(50);
            setSixthInput2(50);
        }
        if (invisible6 === 1) {
            setInvisible6(2);
        }
    };
    const changeSixthCompetitor3 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setSixthCompetitor3(event.nativeEvent.target[index].text);
        setSixthCompetitorId3(event.target.value);
        setSixthCheck3(true);
        if (sixthInput3 === 0) {
            setSixthInput1(40);
            setSixthInput2(30);
            setSixthInput3(30);
        }
        if (invisible6 === 2) {
            setInvisible6(3);
        }
    };
    const changeSixthCompetitor4 = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setSixthCompetitor4(event.nativeEvent.target[index].text);
        setSixthCompetitorId4(event.target.value);
        setSixthCheck4(true);
        setSixthInput1(25);
        setSixthInput2(25);
        setSixthInput3(25);
        setSixthInput4(25);
    };

    // Objection -------------( PAGE 8 )--------------

    const [selectObjId1, setSelectObjId1] = useState([]);
    const [selectObjId2, setSelectObjId2] = useState([]);
    const [selectObjId3, setSelectObjId3] = useState([]);
    const [selectObjId4, setSelectObjId4] = useState([]);

    const [firstObjCheck1, setFirstObjCheck1] = useState(false);
    const [firstObjCheck2, setFirstObjCheck2] = useState(false);
    const [firstObjCheck3, setFirstObjCheck3] = useState(false);
    const [firstObjCheck4, setFirstObjCheck4] = useState(false);
    const [firstObjCheck5, setFirstObjCheck5] = useState(false);
    const [firstObjCheck6, setFirstObjCheck6] = useState(false);
    const [firstObjCheck7, setFirstObjCheck7] = useState(false);

    const [secondObjCheck1, setSecondObjCheck1] = useState(false);
    const [secondObjCheck2, setSecondObjCheck2] = useState(false);
    const [secondObjCheck3, setSecondObjCheck3] = useState(false);
    const [secondObjCheck4, setSecondObjCheck4] = useState(false);
    const [secondObjCheck5, setSecondObjCheck5] = useState(false);
    const [secondObjCheck6, setSecondObjCheck6] = useState(false);
    const [secondObjCheck7, setSecondObjCheck7] = useState(false);

    const [thirdObjCheck1, setThirdObjCheck1] = useState(false);
    const [thirdObjCheck2, setThirdObjCheck2] = useState(false);
    const [thirdObjCheck3, setThirdObjCheck3] = useState(false);
    const [thirdObjCheck4, setThirdObjCheck4] = useState(false);
    const [thirdObjCheck5, setThirdObjCheck5] = useState(false);
    const [thirdObjCheck6, setThirdObjCheck6] = useState(false);
    const [thirdObjCheck7, setThirdObjCheck7] = useState(false);

    const [fourthObjCheck1, setFourthObjCheck1] = useState(false);
    const [fourthObjCheck2, setFourthObjCheck2] = useState(false);
    const [fourthObjCheck3, setFourthObjCheck3] = useState(false);
    const [fourthObjCheck4, setFourthObjCheck4] = useState(false);
    const [fourthObjCheck5, setFourthObjCheck5] = useState(false);
    const [fourthObjCheck6, setFourthObjCheck6] = useState(false);
    const [fourthObjCheck7, setFourthObjCheck7] = useState(false);

    // const firstChangeSelectObjId1 = (event) => {
    //     console.log(event.target.checked);
    //     if(event.target.checked === true){
    //         const newObjections1=[...objections1];
    //         newObjections1[0].selected=true;
    //         setObjections1([...newObjections1]);
    //     }else if(event.target.checked === false){
    //         const newObjections1=[...objections1];
    //         newObjections1[0].selected=false;
    //         setObjections1([...newObjections1]);
    //     }
    // }
    // const firstChangeSelectObjId2 = (event) => {
    //     if(event.target.checked === true){
    //         const newObjections1=[...objections1];
    //         newObjections1[1].selected=true;
    //         setObjections1([...newObjections1]);
    //     }else if(event.target.checked){
    //         const newObjections1=[...objections1];
    //         newObjections1[1].selected=false;
    //         setObjections1([...newObjections1]);
    // }
    // const firstChangeSelectObjId3 = (event) => {
    //     if(event.target.checked === true){
    //         const newObjections1=[...objections1];
    //         newObjections1[2].selected=true;
    //         setObjections1([...newObjections1]);
    //     }else if(event.target.checked){
    //         const newObjections1=[...objections1];
    //         newObjections1[2].selected=false;
    //         setObjections1([...newObjections1]);
    //     }
    // }
    // const firstChangeSelectObjId4 = (event) => {
    //     if(event.target.checked === true){
    //         const newObjections1=[...objections1];
    //         newObjections1[3].selected=true;
    //         setObjections1([...newObjections1]);
    //     }else if(event.target.checked){
    //         const newObjections1=[...objections1];
    //         newObjections1[3].selected=false;
    //         setObjections1([...newObjections1]);
    //     }
    // }
    // const firstChangeSelectObjId5 = (event) => {
    //     if(event.target.checked === true){
    //         const newObjections1=[...objections1];
    //         newObjections1[4].selected=true;
    //         setObjections1([...newObjections1]);
    //     }else if(event.target.checked){
    //         const newObjections1=[...objections1];
    //         newObjections1[4].selected=false;
    //         setObjections1([...newObjections1]);
    //     }
    // }
    // const firstChangeSelectObjId6 = (event) => {
    //     if(event.target.checked === true){
    //         const newObjections1=[...objections1];
    //         newObjections1[5].selected=true;
    //         setObjections1([...newObjections1]);
    //     }else if(event.target.checked){
    //         const newObjections1=[...objections1];
    //         newObjections1[5].selected=false;
    //         setObjections1([...newObjections1]);
    //     }
    // }

    const firstChangeSelectObjId1 = (event) => {
        if (event.target.checked === true) {
            const newObjections1 = [...objections1];
            newObjections1[0].selected = true;
            setObjections1([...newObjections1]);
        } else if (event.target.checked === false) {
            const newObjections1 = [...objections1];
            newObjections1[0].selected = false;
            setObjections1([...newObjections1]);
        }
    };
    const firstChangeSelectObjId2 = (event) => {
        if (event.target.checked === true) {
            const newObjections1 = [...objections1];
            newObjections1[1].selected = true;
            setObjections1([...newObjections1]);
        } else if (event.target.checked === false) {
            const newObjections1 = [...objections1];
            newObjections1[1].selected = false;
            setObjections1([...newObjections1]);
        }
    };
    const firstChangeSelectObjId3 = (event) => {
        if (event.target.checked === true) {
            const newObjections1 = [...objections1];
            newObjections1[2].selected = true;
            setObjections1([...newObjections1]);
        } else if (event.target.checked === false) {
            const newObjections1 = [...objections1];
            newObjections1[2].selected = false;
            setObjections1([...newObjections1]);
        }
    };
    const firstChangeSelectObjId4 = (event) => {
        if (event.target.checked === true) {
            const newObjections1 = [...objections1];
            newObjections1[3].selected = true;
            setObjections1([...newObjections1]);
        } else if (event.target.checked === false) {
            const newObjections1 = [...objections1];
            newObjections1[3].selected = false;
            setObjections1([...newObjections1]);
        }
    };
    const firstChangeSelectObjId5 = (event) => {
        if (event.target.checked === true) {
            const newObjections1 = [...objections1];
            newObjections1[4].selected = true;
            setObjections1([...newObjections1]);
        } else if (event.target.checked === false) {
            const newObjections1 = [...objections1];
            newObjections1[4].selected = false;
            setObjections1([...newObjections1]);
        }
    };
    const firstChangeSelectObjId6 = (event) => {
        if (event.target.checked === true) {
            const newObjections1 = [...objections1];
            newObjections1[5].selected = true;
            setObjections1([...newObjections1]);
        } else if (event.target.checked === false) {
            const newObjections1 = [...objections1];
            newObjections1[5].selected = false;
            setObjections1([...newObjections1]);
        }
    };

    //-----------------------------------
    const secondChangeSelectObjId1 = (event) => {
        if (event.target.checked === true) {
            const newObjections2 = [...objections2];
            newObjections2[0].selected = true;
            setObjections2([...newObjections2]);
        } else {
            const newObjections2 = [...objections2];
            newObjections2[0].selected = false;
            setObjections2([...newObjections2]);
        }
    };
    const secondChangeSelectObjId2 = (event) => {
        if (event.target.checked === true) {
            const newObjections2 = [...objections2];
            newObjections2[1].selected = true;
            setObjections2([...newObjections2]);
        } else {
            const newObjections2 = [...objections2];
            newObjections2[1].selected = false;
            setObjections2([...newObjections2]);
        }
    };
    const secondChangeSelectObjId3 = (event) => {
        if (event.target.checked === true) {
            const newObjections2 = [...objections2];
            newObjections2[2].selected = true;
            setObjections2([...newObjections2]);
        } else {
            const newObjections2 = [...objections2];
            newObjections2[2].selected = false;
            setObjections2([...newObjections2]);
        }
    };
    const secondChangeSelectObjId4 = (event) => {
        if (event.target.checked === true) {
            const newObjections2 = [...objections2];
            newObjections2[3].selected = true;
            setObjections2([...newObjections2]);
        } else {
            const newObjections2 = [...objections2];
            newObjections2[3].selected = false;
            setObjections2([...newObjections2]);
        }
    };
    const secondChangeSelectObjId5 = (event) => {
        if (event.target.checked === true) {
            const newObjections2 = [...objections2];
            newObjections2[4].selected = true;
            setObjections2([...newObjections2]);
        } else {
            const newObjections2 = [...objections2];
            newObjections2[4].selected = false;
            setObjections2([...newObjections2]);
        }
    };
    const secondChangeSelectObjId6 = (event) => {
        if (event.target.checked === true) {
            const newObjections2 = [...objections2];
            newObjections2[5].selected = true;
            setObjections2([...newObjections2]);
        } else {
            const newObjections2 = [...objections2];
            newObjections2[5].selected = false;
            setObjections2([...newObjections2]);
        }
    };

    //-----------------------------------
    const thirdChangeSelectObjId1 = (event) => {
        if (event.target.checked === true) {
            const newObjections3 = [...objections3];
            newObjections3[0].selected = true;
            setObjections3([...newObjections3]);
        } else if (event.target.checked === false) {
            const newObjections3 = [...objections3];
            newObjections3[0].selected = false;
            setObjections3([...newObjections3]);
        }
    };
    const thirdChangeSelectObjId2 = (event) => {
        if (event.target.checked === true) {
            const newObjections3 = [...objections3];
            newObjections3[1].selected = true;
            setObjections3([...newObjections3]);
        } else if (event.target.checked === false) {
            const newObjections3 = [...objections3];
            newObjections3[1].selected = false;
            setObjections3([...newObjections3]);
        }
    };
    const thirdChangeSelectObjId3 = (event) => {
        if (event.target.checked === true) {
            const newObjections3 = [...objections3];
            newObjections3[2].selected = true;
            setObjections3([...newObjections3]);
        } else if (event.target.checked === false) {
            const newObjections3 = [...objections3];
            newObjections3[2].selected = false;
            setObjections3([...newObjections3]);
        }
    };
    const thirdChangeSelectObjId4 = (event) => {
        if (event.target.checked === true) {
            const newObjections3 = [...objections3];
            newObjections3[3].selected = true;
            setObjections3([...newObjections3]);
        } else if (event.target.checked === false) {
            const newObjections3 = [...objections3];
            newObjections3[3].selected = false;
            setObjections3([...newObjections3]);
        }
    };
    const thirdChangeSelectObjId5 = (event) => {
        if (event.target.checked === true) {
            const newObjections3 = [...objections3];
            newObjections3[4].selected = true;
            setObjections3([...newObjections3]);
        } else if (event.target.checked === false) {
            const newObjections3 = [...objections3];
            newObjections3[4].selected = false;
            setObjections3([...newObjections3]);
        }
    };
    const thirdChangeSelectObjId6 = (event) => {
        if (event.target.checked === true) {
            const newObjections3 = [...objections3];
            newObjections3[5].selected = true;
            setObjections3([...newObjections3]);
        } else if (event.target.checked === false) {
            const newObjections3 = [...objections3];
            newObjections3[5].selected = false;
            setObjections3([...newObjections3]);
        }
    };

    //-----------------------------------
    const fourthChangeSelectObjId1 = (event) => {
        if (event.target.checked === true) {
            const newObjections4 = [...objections4];
            newObjections4[0].selected = true;
            setObjections4([...newObjections4]);
        } else if (event.target.checked === false) {
            const newObjections4 = [...objections4];
            newObjections4[0].selected = false;
            setObjections4([...newObjections4]);
        }
    };
    const fourthChangeSelectObjId2 = (event) => {
        if (event.target.checked === true) {
            const newObjections4 = [...objections4];
            newObjections4[1].selected = true;
            setObjections4([...newObjections4]);
        } else if (event.target.checked === false) {
            const newObjections4 = [...objections4];
            newObjections4[1].selected = false;
            setObjections4([...newObjections4]);
        }
    };
    const fourthChangeSelectObjId3 = (event) => {
        if (event.target.checked === true) {
            const newObjections4 = [...objections4];
            newObjections4[2].selected = true;
            setObjections4([...newObjections4]);
        } else if (event.target.checked === false) {
            const newObjections4 = [...objections4];
            newObjections4[2].selected = false;
            setObjections4([...newObjections4]);
        }
    };
    const fourthChangeSelectObjId4 = (event) => {
        if (event.target.checked === true) {
            const newObjections4 = [...objections4];
            newObjections4[3].selected = true;
            setObjections4([...newObjections4]);
        } else if (event.target.checked === false) {
            const newObjections4 = [...objections4];
            newObjections4[3].selected = false;
            setObjections4([...newObjections4]);
        }
    };
    const fourthChangeSelectObjId5 = (event) => {
        if (event.target.checked === true) {
            const newObjections4 = [...objections4];
            newObjections4[4].selected = true;
            setObjections4([...newObjections4]);
        } else if (event.target.checked === false) {
            const newObjections4 = [...objections4];
            newObjections4[4].selected = false;
            setObjections4([...newObjections4]);
        }
    };
    const fourthChangeSelectObjId6 = (event) => {
        if (event.target.checked === true) {
            const newObjections4 = [...objections4];
            newObjections4[5].selected = true;
            setObjections4([...newObjections4]);
        } else if (event.target.checked === false) {
            const newObjections4 = [...objections4];
            newObjections4[5].selected = false;
            setObjections4([...newObjections4]);
        }
    };
    //-----------------------------------
    const fifthChangeSelectObjId1 = (event) => {
        if (event.target.checked === true) {
            const newObjections5 = [...objections5];
            newObjections5[0].selected = true;
            setObjections5([...newObjections5]);
        } else if (event.target.checked === false) {
            const newObjections5 = [...objections5];
            newObjections5[0].selected = false;
            setObjections5([...newObjections5]);
        }
    };
    const fifthChangeSelectObjId2 = (event) => {
        if (event.target.checked === true) {
            const newObjections5 = [...objections5];
            newObjections5[1].selected = true;
            setObjections5([...newObjections5]);
        } else if (event.target.checked === false) {
            const newObjections5 = [...objections5];
            newObjections5[1].selected = false;
            setObjections5([...newObjections5]);
        }
    };
    const fifthChangeSelectObjId3 = (event) => {
        if (event.target.checked === true) {
            const newObjections5 = [...objections5];
            newObjections5[2].selected = true;
            setObjections5([...newObjections5]);
        } else if (event.target.checked === false) {
            const newObjections5 = [...objections5];
            newObjections5[2].selected = false;
            setObjections5([...newObjections5]);
        }
    };
    const fifthChangeSelectObjId4 = (event) => {
        if (event.target.checked === true) {
            const newObjections5 = [...objections5];
            newObjections5[3].selected = true;
            setObjections5([...newObjections5]);
        } else if (event.target.checked === false) {
            const newObjections5 = [...objections5];
            newObjections5[3].selected = false;
            setObjections5([...newObjections5]);
        }
    };
    const fifthChangeSelectObjId5 = (event) => {
        if (event.target.checked === true) {
            const newObjections5 = [...objections5];
            newObjections5[4].selected = true;
            setObjections5([...newObjections5]);
        } else if (event.target.checked === false) {
            const newObjections5 = [...objections5];
            newObjections5[4].selected = false;
            setObjections5([...newObjections5]);
        }
    };
    const fifthChangeSelectObjId6 = (event) => {
        if (event.target.checked === true) {
            const newObjections5 = [...objections5];
            newObjections5[5].selected = true;
            setObjections5([...newObjections5]);
        } else if (event.target.checked === false) {
            const newObjections5 = [...objections5];
            newObjections5[5].selected = false;
            setObjections5([...newObjections5]);
        }
    };
    //-----------------------------------
    const sixthChangeSelectObjId1 = (event) => {
        if (event.target.checked === true) {
            const newObjections6 = [...objections6];
            newObjections6[0].selected = true;
            setObjections6([...newObjections6]);
        } else if (event.target.checked === false) {
            const newObjections6 = [...objections6];
            newObjections6[0].selected = false;
            setObjections6([...newObjections6]);
        }
    };
    const sixthChangeSelectObjId2 = (event) => {
        if (event.target.checked === true) {
            const newObjections6 = [...objections6];
            newObjections6[1].selected = true;
            setObjections6([...newObjections6]);
        } else if (event.target.checked === false) {
            const newObjections6 = [...objections6];
            newObjections6[1].selected = false;
            setObjections6([...newObjections6]);
        }
    };
    const sixthChangeSelectObjId3 = (event) => {
        if (event.target.checked === true) {
            const newObjections6 = [...objections6];
            newObjections6[2].selected = true;
            setObjections6([...newObjections6]);
        } else if (event.target.checked === false) {
            const newObjections6 = [...objections6];
            newObjections6[2].selected = false;
            setObjections6([...newObjections6]);
        }
    };
    const sixthChangeSelectObjId4 = (event) => {
        if (event.target.checked === true) {
            const newObjections6 = [...objections6];
            newObjections6[3].selected = true;
            setObjections6([...newObjections6]);
        } else if (event.target.checked === false) {
            const newObjections6 = [...objections6];
            newObjections6[3].selected = false;
            setObjections6([...newObjections6]);
        }
    };
    const sixthChangeSelectObjId5 = (event) => {
        if (event.target.checked === true) {
            const newObjections6 = [...objections6];
            newObjections6[4].selected = true;
            setObjections6([...newObjections6]);
        } else if (event.target.checked === false) {
            const newObjections6 = [...objections6];
            newObjections6[4].selected = false;
            setObjections6([...newObjections6]);
        }
    };
    const sixthChangeSelectObjId6 = (event) => {
        if (event.target.checked === true) {
            const newObjections6 = [...objections6];
            newObjections6[5].selected = true;
            setObjections6([...newObjections6]);
        } else if (event.target.checked === false) {
            const newObjections6 = [...objections6];
            newObjections6[5].selected = false;
            setObjections6([...newObjections6]);
        }
    };

    // Patient Number Daily -------------( PAGE 9 )--------------

    const [patientValue, setPatientValue] = useState();

    const changePatient = (event) => {
        setPatientValue(event.target.value);
    };

    // Physcho Type -------------( PAGE 10 )--------------

    const [clicked, setClicked] = useState(0);
    //physcoType Name
    const [allPhyschoTypeName, setAllPhyschoTypeName] = useState([]);
    //physcoType id
    const [allPhysschoTypeId, setAllPhysschoTypeId] = useState([]);
    // seçilen physcoType id
    const [selectPhy, setSelectPhy] = useState();

    const [openPhyType, setOpenPhyType] = useState(false);

    const changePhyType = (id) => {
        console.log(id);
        setSelectPhy(id);
    };

    const checkClick1 = () => {
        setClicked(1);
    };
    const checkClick2 = () => {
        setClicked(2);
    };
    const checkClick3 = () => {
        setClicked(3);
    };
    const checkClick4 = () => {
        setClicked(4);
    };
    const checkClick5 = () => {
        setClicked(5);
    };
    const checkClick6 = () => {
        setClicked(6);
    };
    const checkClickOpen = () => {
        setOpenPhyType(true);
        if (openPhyType === true) {
            setOpenPhyType(false);
        }
    };

    // Wants -------------( PAGE 11 )--------------

    const [allWantsName, setAllWantsName] = useState([]);
    const [allWantsId, setAllWantsId] = useState([]);

    const [wantsClicked1, setWantsClicked1] = useState(false);
    const [wantsClicked2, setWantsClicked2] = useState(false);
    const [wantsClicked3, setWantsClicked3] = useState(false);
    const [wantsClicked4, setWantsClicked4] = useState(false);
    const [wantsClicked5, setWantsClicked5] = useState(false);
    const [wantsClicked6, setWantsClicked6] = useState(false);
    const [wantsClicked7, setWantsClicked7] = useState(false);

    const [clickWantsId1, setClickWantsId1] = useState([]);

    const clickWants1 = (event) => {
        if (event.target.checked === true) {
            setWantsClicked1(true);
            setClickWantsId1([...clickWantsId1, { wantsId: event.target.id, wantsName: event.target.name }]);
        } else {
            setWantsClicked1(false);
            setClickWantsId1((clickWantsId1) => clickWantsId1.filter((data) => data.wantsId !== event.target.id));
        }
    };
    const clickWants2 = (event) => {
        if (event.target.checked === true) {
            setWantsClicked2(true);
            setClickWantsId1([...clickWantsId1, { wantsId: event.target.id, wantsName: event.target.name }]);
        } else {
            setWantsClicked2(false);
            setClickWantsId1((clickWantsId1) => clickWantsId1.filter((data) => data.wantsId !== event.target.id));
        }
    };
    const clickWants3 = (event) => {
        if (event.target.checked === true) {
            setWantsClicked3(true);
            setClickWantsId1([...clickWantsId1, { wantsId: event.target.id, wantsName: event.target.name }]);
        } else {
            setWantsClicked3(false);
            setClickWantsId1((clickWantsId1) => clickWantsId1.filter((data) => data.wantsId !== event.target.id));
        }
    };
    const clickWants4 = (event) => {
        if (event.target.checked === true) {
            setWantsClicked4(true);
            setClickWantsId1([...clickWantsId1, { wantsId: event.target.id, wantsName: event.target.name }]);
        } else {
            setWantsClicked4(false);
            setClickWantsId1((clickWantsId1) => clickWantsId1.filter((data) => data.wantsId !== event.target.id));
        }
    };
    const clickWants5 = (event) => {
        if (event.target.checked === true) {
            setWantsClicked5(true);
            setClickWantsId1([...clickWantsId1, { wantsId: event.target.id, wantsName: event.target.name }]);
        } else {
            setWantsClicked5(false);
            setClickWantsId1((clickWantsId1) => clickWantsId1.filter((data) => data.wantsId !== event.target.id));
        }
    };
    const clickWants6 = (event) => {
        if (event.target.checked === true) {
            setWantsClicked6(true);
            setClickWantsId1([...clickWantsId1, { wantsId: event.target.id, wantsName: event.target.name }]);
        } else {
            setWantsClicked6(false);
            setClickWantsId1((clickWantsId1) => clickWantsId1.filter((data) => data.wantsId !== event.target.id));
        }
    };
    const clickWants7 = (event) => {
        if (event.target.checked === true) {
            setWantsClicked7(true);
            setClickWantsId1([...clickWantsId1, { wantsId: event.target.id, wantsName: event.target.name }]);
        } else {
            setWantsClicked7(false);
            setClickWantsId1((clickWantsId1) => clickWantsId1.filter((data) => data.wantsId !== event.target.id));
        }
    };

    // Connectes Pharmacy -------------( PAGE 12 )--------------

    const [pharmacyInput1, setPharmacyInput1] = useState(25);
    const [pharmacyInput2, setPharmacyInput2] = useState(25);
    const [pharmacyInput3, setPharmacyInput3] = useState(25);
    const [pharmacyInput4, setPharmacyInput4] = useState(25);

    var pharmacySum = +pharmacyInput1 + +pharmacyInput2 + +pharmacyInput3 + +pharmacyInput4; /// integer sum

    const [pharmacyInputCheck1, setPharmacyInputCheck1] = useState(true);
    const [pharmacyInputCheck2, setPharmacyInputCheck2] = useState(true);
    const [pharmacyInputCheck3, setPharmacyInputCheck3] = useState(true);
    const [pharmacyInputCheck4, setPharmacyInputCheck4] = useState(true);

    const pharmacyInputChange1 = (e) => {
        setPharmacyInput1(e.target.value);
        setPharmacyInputCheck1(false);
    };
    const pharmacyInputChange2 = (e) => {
        setPharmacyInput2(e.target.value);
        setPharmacyInputCheck2(false);
    };
    const pharmacyInputChange3 = (e) => {
        setPharmacyInput3(e.target.value);
        setPharmacyInputCheck3(false);
    };
    const pharmacyInputChange4 = (e) => {
        setPharmacyInput4(e.target.value);
        setPharmacyInputCheck4(false);
    };

    // Contacts -------------( PAGE 13 )--------------

    const [allContactDatas, setAllContactDatas] = useState([]);
    const [contactInfo, setContactInfo] = useState([
        { value: 1522926, label: 'BESTE PULLUKÇU', mail: 'b.pullukcu@diten.tech', title: 'TEAM LEADER' },
        { value: 1522927, label: 'METEHAN ATAKAN', mail: 'm.atakakan@diten.tech', title: 'FRONTEND' },
        { value: 1522928, label: 'EMİR BALCI', mail: 'e.balci@diten.tech', title: 'BACKEND' },
    ]);

    //email adress
    const [cntEmpIdEmail, setCntEmpIdEmail] = useState([]);
    const [selectMailName, setSelectMailName] = useState();

    const changeContacts = (event) => {
        setAllContactDatas(Array.isArray(event) ? event.map((x) => x.label) : []);
        //setCntEmpIdEmail(Array.isArray(event) ? event.map(x => x.mail) : []);
        setCntEmpIdEmail([
            { Email: event.mail, EmployeeId: event.value, FullName: event.label, EmployeeTitle: event.title },
        ]);
        setSelectMailName({ value: event.value, label: event.label, mail: event.mail, title: event.title });
    };

    const [opinionsAbout, setOpinionsAbout] = useState();

    const changeOpinionsAbout = (event) => {
        setOpinionsAbout(event.target.value);
    };

    //---------------------------------

    useEffect(() => {
        console.log(events);
    }, []);

    // ERROR MESSAGE
    const [errMes, setErrMes] = useState();

    // Report Err

    const [rprErr, setRprErr] = useState(false);

    // Patient Err

    const [pttErr1, setPttErr1] = useState(false);
    const [pttErr2, setPttErr2] = useState(false);

    // Competitor --------

    const [competitors1, setCompetitors1] = useState([]);
    const [competitors2, setCompetitors2] = useState([]);
    const [competitors3, setCompetitors3] = useState([]);
    const [competitors4, setCompetitors4] = useState([]);
    const [competitors5, setCompetitors5] = useState([]);
    const [competitors6, setCompetitors6] = useState([]);
    // Pharmacy --------
    const [pharmacy, setPharmacy] = useState(['demo']);

    // SAVE REPORT ---------------------------
    const nextPage = () => {
        console.log(changePage);
        console.log(promoProduct);
        console.log(appStatus);
        if (changePage === 2) {
            if (selectPromoName.length === 0) {
                setErrMes(true);
                setTimeout(() => {
                    setErrMes(false);
                }, 2000);
            } else {
                setChangePage(changePage + 1);
                setErrMes(false);
                setReportTitle('Success of Visit');
            }

            const competitorsCombine = [...promoProductName, ...nonePromoProductName];
            const competitordatas = {
                BrandIds: competitorsCombine.map((index) => index).toString(),
            };
            const competitorDatasArray = competitorsCombine.map((data) => data);
            FetchApiPost('api/OldSystem/GetBrandCompetitorsWithParam', 'POST', competitordatas)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    response.map((data) =>
                        data.ProductId === competitorDatasArray[0]
                            ? setCompetitors1((competitors1) => [...competitors1, data])
                            : data.ProductId === competitorDatasArray[1]
                            ? setCompetitors2((competitors2) => [...competitors2, data])
                            : data.ProductId === competitorDatasArray[2]
                            ? setCompetitors3((competitors3) => [...competitors3, data])
                            : data.ProductId === competitorDatasArray[3]
                            ? setCompetitors4((competitors4) => [...competitors4, data])
                            : data.ProductId === competitorDatasArray[4]
                            ? setCompetitors5((competitors5) => [...competitors5, data])
                            : data.ProductId === competitorDatasArray[5]
                            ? setCompetitors6((competitors6) => [...competitors6, data])
                            : null
                    );

                    // competitorDatasArray[0]!==undefined && data.productId===competitorDatasArray[0]
                    // ?data1.push(data)
                    // :competitorDatasArray[1]!==undefined && data.productId===competitorDatasArray[1]
                    // ?data2.push(data)
                    // :competitorDatasArray[2]!==undefined && data.productId===competitorDatasArray[2]
                    // ?data3.push(data)
                    // :competitorDatasArray[3]!==undefined && data.productId===competitorDatasArray[3]
                    // ?data4.push(data)
                    // :null
                    //******* */
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            //---------
            const promoMaterialsDatas = {
                EventId: 1,
                BrandIds: competitorsCombine.map((index) => index).toString(),
            };
            FetchApiPost('api/OldSystem/GetPromoMaterials', 'POST', promoMaterialsDatas)
                // fetch("http://178.18.200.171:5000/api/OldSystem/GetPromoMaterials",{
                //     method: "POST",
                //     body: JSON.stringify(promoMaterialsDatas),
                //     headers: {
                //         "access-control-allow-origin" : "*",
                //         "Content-type": "application/json; charset=UTF-8"
                //     }
                // })
                .then((response) => response.json())
                .then((response) => {
                    setAllPromoMaterial(response);
                    setMaterialsDatas1(
                        response
                            .filter((obj) => obj.BrandId === promoProductName[0])
                            .map((index) => ({
                                label: index.MainTypeName,
                                options: [
                                    {
                                        value: index.promoMaterialSubTypes[0].SubTypeId,
                                        label: index.promoMaterialSubTypes[0].SubTypeName,
                                    },
                                ],
                            }))
                    );
                    setMaterialsDatas2(
                        response
                            .filter((obj) => obj.BrandId === promoProductName[1])
                            .map((index) => ({
                                label: index.MainTypeName,
                                options: [
                                    {
                                        value: index.promoMaterialSubTypes[0].SubTypeId,
                                        label: index.promoMaterialSubTypes[0].SubTypeName,
                                    },
                                ],
                            }))
                    );
                    setMaterialsDatas3(
                        response
                            .filter((obj) => obj.BrandId === promoProductName[2])
                            .map((index) => ({
                                label: index.MainTypeName,
                                options: [
                                    {
                                        value: index.promoMaterialSubTypes[0].SubTypeId,
                                        label: index.promoMaterialSubTypes[0].SubTypeName,
                                    },
                                ],
                            }))
                    );
                    // setMaterialsDatas1(response.map((index) => (
                    //     {
                    //         label: index.MainTypeName,
                    //         options: [
                    //           { value: index.promoMaterialSubTypes[0].SubTypeId, label: index.promoMaterialSubTypes[0].SubTypeName }
                    //         ]
                    //       }
                    // )))
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            setErrMes(false);
            if (changePage === 1) {
                setChangePage(changePage + 1);
                setReportTitle('Select Products');
            }
            // setChangePage(changePage+1);
            // if(changePage === 1){
            //     setReportTitle("Select Products");
            //     setChangePage(changePage+1);
            // }
            else if (changePage === 3) {
                if (appStatus === 4) {
                    setChangePage(changePage + 1);
                    setReportTitle('Key Opener Lider or No');
                } else {
                    if (promoProduct.length === 1 && nonePromoProduct.length === 0) {
                        if (changeFirstPoint < 6) {
                            setChangePage(changePage + 1);
                            setReportTitle('Key Opener Lider or No');
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 2 && nonePromoProduct.length === 0) {
                        if (changeFirstPoint < 6 && changeSecondPoint < 6) {
                            setChangePage(changePage + 1);
                            setReportTitle('Key Opener Lider or No');
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 3 && nonePromoProduct.length === 0) {
                        if (changeFirstPoint < 6 && changeSecondPoint < 6 && changeThirdPoint < 6) {
                            setChangePage(changePage + 1);
                            setReportTitle('Key Opener Lider or No');
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    }
                    if (promoProduct.length === 1 && nonePromoProduct.length > 0) {
                        if (changeFirstPoint < 6 && changeFourthPoint < 6) {
                            setChangePage(changePage + 1);
                            setReportTitle('Key Opener Lider or No');
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 2 && nonePromoProduct.length > 0) {
                        if (changeFirstPoint < 6 && changeSecondPoint < 6 && changeFourthPoint < 6) {
                            setChangePage(changePage + 1);
                            setReportTitle('Key Opener Lider or No');
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 3 && nonePromoProduct.length > 0) {
                        if (
                            changeFirstPoint < 6 &&
                            changeSecondPoint < 6 &&
                            changeThirdPoint < 6 &&
                            changeFourthPoint < 6
                        ) {
                            setChangePage(changePage + 1);
                            setReportTitle('Key Opener Lider or No');
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    }
                }
            } else if (changePage === 4) {
                setReportTitle('Which Promotional materials did you use?');
                setChangePage(changePage + 1);
            } else if (changePage === 5) {
                // if(promoProduct.length === 1 && nonePromoProduct.length === 0){
                //     if(material1 !== null && material1.length !== 0){ // HERE
                //         setReportTitle("Product Loyalty");
                //         setChangePage(changePage+1);
                //     }else{
                //         setRprErr(true);
                //         setTimeout(() => {
                //             setRprErr(false);
                //         }, 1500);
                //     }
                // }
                setReportTitle('Product Loyalty');
                setChangePage(changePage + 1);
            } else if (changePage === 6) {
                if (appStatus === 4) {
                    setReportTitle('Competitor Loyalty');
                    setChangePage(changePage + 1);
                } else {
                    if (promoProduct.length === 1 && nonePromoProduct.length === 0) {
                        if (firstRating !== undefined) {
                            // HERE
                            setReportTitle('Competitor Loyalty');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 2 && nonePromoProduct.length === 0) {
                        if (firstRating !== undefined && secondRating !== undefined) {
                            setReportTitle('Competitor Loyalty');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 3 && nonePromoProduct.length === 0) {
                        if (firstRating !== undefined && secondRating !== undefined && thirdRating !== undefined) {
                            setReportTitle('Competitor Loyalty');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 1 && nonePromoProduct.length > 0) {
                        if (firstRating !== undefined && fourthRating !== undefined) {
                            setReportTitle('Competitor Loyalty');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 2 && nonePromoProduct.length > 0) {
                        if (firstRating !== undefined && secondRating !== undefined && fourthRating !== undefined) {
                            setReportTitle('Competitor Loyalty');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 3 && nonePromoProduct.length > 0) {
                        if (
                            firstRating !== undefined &&
                            secondRating !== undefined &&
                            thirdRating !== undefined &&
                            fourthRating !== undefined
                        ) {
                            setReportTitle('Competitor Loyalty');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    }
                }
            } else if (changePage === 7) {
                // && isChangeComp1 === true &&
                //     isChangeComp2 === true &&
                //     isChangeComp3 === true &&
                //     isChangeComp4 === true
                if (100 - sum1 === 0 || 100 - sum2 === 0 || 100 - sum3 === 0 || 100 - sum4 === 0) {
                    setReportTitle('Objection');
                    setChangePage(changePage + 1);
                    FetchApiGet('services/Daywork/EventDetail/GetObjections', 'GET')
                        // fetch("http://178.18.200.171:5000/services/Daywork/EventDetail/GetObjections",{
                        //     method: "GET",
                        //     headers: {
                        //         "access-control-allow-origin" : "*",
                        //         "Content-type": "application/json; charset=UTF-8"
                        //     }
                        // })
                        .then((response) => response.json())
                        .then((response) => {
                            return (
                                setSelectObjId1(response),
                                setSelectObjId2(response),
                                setSelectObjId3(response),
                                setSelectObjId4(response)
                            );
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                } else if (
                    competitors1.length === 0 &&
                    competitors2.length === 0 &&
                    competitors3.length === 0 &&
                    competitors4.length === 0
                ) {
                    setReportTitle('Objection');
                    setChangePage(changePage + 1);
                } else {
                    // setReportTitle("Objection");
                    // setChangePage(changePage+1);
                    setRprErr(true);
                    setTimeout(() => {
                        setRprErr(false);
                    }, 2000);
                }
                //
                if (promoProduct.length === 2) {
                    setSecondPromoName(promoProduct[1]);
                } else {
                    setSecondPromoName('string');
                }
                if (promoProductName.length === 2) {
                    setSecondPromoId(promoProductName[1]);
                } else {
                    setSecondPromoId(0);
                }
                //--------
                if (promoProduct.length === 3) {
                    setSecondPromoName(promoProduct[1]);
                    setThirdPromoName(promoProduct[2]);
                } else {
                    setSecondPromoName('string');
                    setThirdPromoName('string');
                }
                if (promoProductName.length === 3) {
                    setSecondPromoId(promoProductName[1]);
                    setThirdPromoId(promoProductName[2]);
                } else {
                    setSecondPromoId(0);
                    setThirdPromoId(0);
                }
                //--------
                if (nonePromoProduct.length === 1) {
                    setFirstNonePromoName(nonePromoProduct[0]);
                } else {
                    setFirstNonePromoName('string');
                }
                if (nonePromoProductName.length === 1) {
                    setFirstNonePromoId(nonePromoProductName[0]);
                } else {
                    setFirstNonePromoId(0);
                }
                //--------
                if (nonePromoProduct.length === 2) {
                    setFirstNonePromoName(nonePromoProduct[0]);
                    setSecondPromoName(nonePromoProduct[1]);
                } else {
                    setFirstNonePromoName('string');
                    setSecondNonePromoName('string');
                }
                if (nonePromoProductName.length === 2) {
                    setFirstNonePromoId(nonePromoProductName[0]);
                    setSecondNonePromoId(nonePromoProductName[1]);
                } else {
                    setFirstNonePromoId(0);
                    setSecondNonePromoId(0);
                }
                //--------
                if (nonePromoProduct.length === 3) {
                    setFirstNonePromoName(nonePromoProduct[0]);
                    setSecondPromoName(nonePromoProduct[1]);
                    setThirdPromoName(nonePromoProduct[2]);
                } else {
                    setFirstNonePromoName('string');
                    setSecondNonePromoName('string');
                    setThirdNonePromoName('string');
                }
                if (nonePromoProductName.length === 3) {
                    setFirstNonePromoId(nonePromoProductName[0]);
                    setSecondNonePromoId(nonePromoProductName[1]);
                    setThirdNonePromoId(nonePromoProductName[2]);
                } else {
                    setFirstNonePromoId(0);
                    setSecondNonePromoId(0);
                    setThirdNonePromoId(0);
                }
                //--------
            } else if (changePage === 8) {
                console.log(promoProduct, nonePromoProduct);
                if (appStatus === 4) {
                    setReportTitle('General Visit Report');
                    setChangePage(changePage + 1);
                } else {
                    if (promoProduct.length === 1 && nonePromoProduct.length === 0) {
                        let obj1 = 0;
                        objections1.map((obj) => (obj.selected === true ? obj1++ : null));
                        if (obj1 !== 0) {
                            // HERE
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 1 && nonePromoProduct.length === 1) {
                        let obj1 = 0;
                        let obj2 = 0;
                        objections1.map((obj) => (obj.selected === true ? obj1++ : null));
                        objections4.map((obj) => (obj.selected === true ? obj2++ : null));

                        if (obj1 > 0 && obj2 > 0) {
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 1 && nonePromoProduct.length === 2) {
                        let obj1 = 0;
                        let obj2 = 0;
                        let obj3 = 0;
                        objections1.map((obj) => (obj.selected === true ? obj1++ : null));
                        objections4.map((obj) => (obj.selected === true ? obj2++ : null));
                        objections5.map((obj) => (obj.selected === true ? obj3++ : null));

                        if (obj1 > 0 && obj2 > 0 && obj3 > 0) {
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 1 && nonePromoProduct.length === 3) {
                        let obj1 = 0;
                        let obj2 = 0;
                        let obj3 = 0;
                        let obj4 = 0;
                        objections1.map((obj) => (obj.selected === true ? obj1++ : null));
                        objections4.map((obj) => (obj.selected === true ? obj2++ : null));
                        objections5.map((obj) => (obj.selected === true ? obj3++ : null));
                        objections6.map((obj) => (obj.selected === true ? obj4++ : null));

                        if (obj1 > 0 && obj2 > 0 && obj3 > 0 && obj4 > 0) {
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 2 && nonePromoProduct.length === 0) {
                        let obj1 = 0;
                        let obj2 = 0;
                        objections1.map((obj) => (obj.selected === true ? obj1++ : null));
                        objections2.map((obj) => (obj.selected === true ? obj2++ : null));
                        if (obj1 !== 0 && obj2 !== 0) {
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 2 && nonePromoProduct.length === 1) {
                        let obj1 = 0;
                        let obj2 = 0;
                        let obj3 = 0;
                        objections1.map((obj) => (obj.selected === true ? obj1++ : null));
                        objections2.map((obj) => (obj.selected === true ? obj2++ : null));
                        objections4.map((obj) => (obj.selected === true ? obj3++ : null));
                        if (obj1 > 0 && obj2 > 0 && obj3 > 0) {
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 2 && nonePromoProduct.length === 2) {
                        let obj1 = 0;
                        let obj2 = 0;
                        let obj3 = 0;
                        let obj4 = 0;
                        objections1.map((obj) => (obj.selected === true ? obj1++ : null));
                        objections2.map((obj) => (obj.selected === true ? obj2++ : null));
                        objections4.map((obj) => (obj.selected === true ? obj3++ : null));
                        objections5.map((obj) => (obj.selected === true ? obj4++ : null));
                        if (obj1 > 0 && obj2 > 0 && obj3 > 0 && obj4 > 0) {
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 2 && nonePromoProduct.length === 3) {
                        let obj1 = 0;
                        let obj2 = 0;
                        let obj3 = 0;
                        let obj4 = 0;
                        let obj5 = 0;
                        objections1.map((obj) => (obj.selected === true ? obj1++ : null));
                        objections2.map((obj) => (obj.selected === true ? obj2++ : null));
                        objections4.map((obj) => (obj.selected === true ? obj3++ : null));
                        objections5.map((obj) => (obj.selected === true ? obj4++ : null));
                        objections6.map((obj) => (obj.selected === true ? obj5++ : null));
                        if (obj1 > 0 && obj2 > 0 && obj3 > 0 && obj4 > 0 && obj5 > 0) {
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 3 && nonePromoProduct.length === 0) {
                        let obj1 = 0;
                        let obj2 = 0;
                        let obj3 = 0;
                        objections1.map((obj) => (obj.selected === true ? obj1++ : null));
                        objections2.map((obj) => (obj.selected === true ? obj2++ : null));
                        objections3.map((obj) => (obj.selected === true ? obj3++ : null));

                        if (obj1 > 0 && obj2 > 0 && obj3 > 0) {
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 3 && nonePromoProduct.length === 1) {
                        let obj1 = 0;
                        let obj2 = 0;
                        let obj3 = 0;
                        let obj4 = 0;
                        objections1.map((obj) => (obj.selected === true ? obj1++ : null));
                        objections2.map((obj) => (obj.selected === true ? obj2++ : null));
                        objections3.map((obj) => (obj.selected === true ? obj3++ : null));
                        objections4.map((obj) => (obj.selected === true ? obj4++ : null));

                        if (obj1 > 0 && obj2 > 0 && obj3 > 0 && obj4 > 0) {
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 3 && nonePromoProduct.length === 2) {
                        let obj1 = 0;
                        let obj2 = 0;
                        let obj3 = 0;
                        let obj4 = 0;
                        let obj5 = 0;
                        objections1.map((obj) => (obj.selected === true ? obj1++ : null));
                        objections2.map((obj) => (obj.selected === true ? obj2++ : null));
                        objections3.map((obj) => (obj.selected === true ? obj3++ : null));
                        objections4.map((obj) => (obj.selected === true ? obj4++ : null));
                        objections5.map((obj) => (obj.selected === true ? obj5++ : null));

                        if (obj1 > 0 && obj2 > 0 && obj3 > 0 && obj4 > 0 && obj5 > 0) {
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 3 && nonePromoProduct.length === 3) {
                        let obj1 = 0;
                        let obj2 = 0;
                        let obj3 = 0;
                        let obj4 = 0;
                        let obj5 = 0;
                        let obj6 = 0;
                        objections1.map((obj) => (obj.selected === true ? obj1++ : null));
                        objections2.map((obj) => (obj.selected === true ? obj2++ : null));
                        objections3.map((obj) => (obj.selected === true ? obj3++ : null));
                        objections4.map((obj) => (obj.selected === true ? obj4++ : null));
                        objections5.map((obj) => (obj.selected === true ? obj5++ : null));
                        objections6.map((obj) => (obj.selected === true ? obj6++ : null));

                        if (obj1 > 0 && obj2 > 0 && obj3 > 0 && obj4 > 0 && obj5 > 0 && obj6 > 0) {
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    }
                    if (promoProduct.length === 1 && nonePromoProduct.length > 0) {
                        if (selectObjId1.length !== 0 && selectObjId4.length !== 0) {
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 2 && nonePromoProduct.length > 0) {
                        if (selectObjId1.length !== 0 && selectObjId2.length !== 0 && selectObjId4.length !== 0) {
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    } else if (promoProduct.length === 3 && nonePromoProduct.length > 0) {
                        if (
                            selectObjId1.length !== 0 &&
                            selectObjId2.length !== 0 &&
                            selectObjId3.length !== 0 &&
                            selectObjId4.length !== 0
                        ) {
                            setReportTitle('General Visit Report');
                            setChangePage(changePage + 1);
                        } else {
                            setRprErr(true);
                            setTimeout(() => {
                                setRprErr(false);
                            }, 1500);
                        }
                    }
                }
            } else if (changePage === 9) {
                if (patientValue > 0 && patientValue <= 400) {
                    setReportTitle('General Visit Report');
                    setChangePage(changePage + 1);
                    FetchApiGet('services/Daywork/EventDetail/GetPhyschoTypes', 'GET')
                        .then((response) => response.json())
                        .then((response) => {
                            console.log(response);
                            setAllPhyschoTypeName(response.data.map((data) => data.physchoTypeName));
                            setAllPhysschoTypeId(response.data.map((data) => data.id));
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
                // else if(patientValue === undefined){
                //     setRprErr(true);
                //         setTimeout(() => {
                //             setRprErr(false);
                //         }, 1500);
                // }
                else if (patientValue <= 0) {
                    setPttErr1(true);
                    setTimeout(() => {
                        setPttErr1(false);
                    }, 1500);
                } else if (patientValue >= 400) {
                    setPttErr2(true);
                    setTimeout(() => {
                        setPttErr2(false);
                    }, 1500);
                }
            } else if (changePage === 10) {
                if (clicked !== 0) {
                    setReportTitle('General Visit Report');
                    setChangePage(changePage + 1);
                    FetchApiGet('services/Daywork/EventDetail/GetWants', 'GET')
                        // fetch("http://178.18.200.171:5000/services/Daywork/EventDetail/GetWants",{
                        //     method: "GET",
                        //     headers: {
                        //         "access-control-allow-origin" : "*",
                        //         "Content-type": "application/json; charset=UTF-8"
                        //     }
                        //     })
                        .then((response) => response.json())
                        .then((response) => {
                            console.log(response);
                            setAllWantsName(response.data.map((index) => index.wantsName));
                            setAllWantsId(response.data.map((index) => index.id));
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                } else {
                    setRprErr(true);
                    setTimeout(() => {
                        setRprErr(false);
                    }, 1500);
                }
            } else if (changePage === 11) {
                if (
                    wantsClicked1 === true ||
                    wantsClicked2 === true ||
                    wantsClicked3 === true ||
                    wantsClicked4 === true ||
                    wantsClicked5 === true ||
                    wantsClicked6 === true ||
                    wantsClicked7 === true
                ) {
                    setReportTitle('General Visit Report');
                    setChangePage(changePage + 1);
                    const customerDatas = { EventId: eventData.id };
                    FetchApiPost('api/OldSystem/GetCustomerPharmacy', 'POST', customerDatas)
                        // fetch("http://178.18.200.171:5000/api/OldSystem/GetCustomerPharmacy",{
                        //     method: "POST",
                        //     body: JSON.stringify(customerDatas),
                        //     headers: {
                        //         "access-control-allow-origin" : "*",
                        //         "Content-type": "application/json; charset=UTF-8"
                        //     }
                        //     })
                        .then((response) => response.json())
                        .then((response) => {
                            setPharmacy(response);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                } else {
                    setRprErr(true);
                    setTimeout(() => {
                        setRprErr(false);
                    }, 1500);
                }
            } else if (changePage === 12) {
                setReportTitle('General Visit Report');
                setChangePage(changePage + 1);
                const customerDatas = { EventId: eventData.id };
                FetchApiPost('api/OldSystem/GetEmailReceivers', 'POST', customerDatas)
                    .then((response) => response.json())
                    .then((response) => {
                        setAllContactDatas(response);
                        // setContactInfo(
                        //     response.map((index) => (
                        //         {value: index.EmpId, label: index.Name, mail: index.Email}
                        //     ))
                        // )
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        }
    };

    const previousPage = () => {
        setErrMes(false);
        if (changePage === 2) {
            setReportTitle('Edit Event');
            setChangePage(appStatus === 4 ? 14 : changePage - 1);
        } else if (changePage === 3) {
            setReportTitle('Select Products');
            setChangePage(changePage - 1);
        } else if (changePage === 4) {
            setReportTitle('Success of Visit');
            setChangePage(changePage - 1);
        } else if (changePage === 5) {
            setReportTitle('Key Opener Lider or No');
            setChangePage(changePage - 1);
        } else if (changePage === 6) {
            setReportTitle('Which Promotional materials did you use?');
            setChangePage(changePage - 1);
        } else if (changePage === 7) {
            setReportTitle('Product Loyalty');
            setChangePage(changePage - 1);
        } else if (changePage === 8) {
            setReportTitle('Competitor Loyalty');
            setChangePage(changePage - 1);
        } else if (changePage === 9) {
            setReportTitle('Objection');
            setChangePage(changePage - 1);
        } else if (changePage === 10) {
            setReportTitle('General Visit Report');
            setChangePage(changePage - 1);
        } else if (changePage === 11) {
            setReportTitle('General Visit Report');
            setChangePage(changePage - 1);
        } else if (changePage === 12) {
            setReportTitle('General Visit Report');
            setChangePage(changePage - 1);
        } else if (changePage === 13) {
            setReportTitle('General Visit Report');
            setChangePage(changePage - 1);
        }
    };

    const closeEdit = () => {
        setChangePage(0);
    };

    const cancelEditPage = () => {
        setChangePage(1);
    };
    const [modal, setmodal] = useState(false);
    const saveCancel = () => {
        if (notVisiting[0] === 'string') {
            return false;
        } else {
            setmodal(true);
            const saveCancelBody = {
                eventDetailId: eventData.id,
                descMissedVisit: notVisiting[0],
                empId: localStorage.getItem('userEmpId'),
            };
            FetchApiPost('services/Daywork/EventReport/CanceledEventReport', 'POST', saveCancelBody)
                .then((response) => response.json())
                .then((response) => console.log(response))
                .then(() => closeRmAlertYesClose())
                .catch((err) => console.log(err));
        }
    };

    const optionsDemo = [
        {
            label: 'Group 1',
            options: [
                { label: 'Group 1, option 1', value: 'value_1' },
                { label: 'Group 1, option 2', value: 'value_2' },
            ],
        },
        {
            label: 'Group 2',
            options: [
                { label: 'Group 3, option 3', value: 'value_3' },
                { label: 'Group 4, option 4', value: 'value_4' },
            ],
        },
    ];

    // Phy main Client
    const [isClickedMC, setIsClickedMC] = useState(false);

    const clickMainClient = () => {
        setIsClickedMC(!isClickedMC);
    };

    // REPORT PAGE SAVE
    const saveReportPage = () => {
        const arr1 = [];
        const arr2 = [];
        const arr3 = [];
        const arr4 = [];
        const arr5 = [];
        const arr6 = [];

        promoProductName.map((data, index) =>
            index === 0
                ? objections1.map((data) => (data.selected === true ? arr1.push({ objectionId: data.id }) : null))
                : index === 1
                ? objections2.map((data) => (data.selected === true ? arr2.push({ objectionId: data.id }) : null))
                : index === 2
                ? objections3.map((data) => (data.selected === true ? arr3.push({ objectionId: data.id }) : null))
                : null
        );
        nonePromoProductName.map((data, index) =>
            index === 0
                ? objections4.map((data) => (data.selected === true ? arr4.push({ objectionId: data.id }) : null))
                : index === 1
                ? objections5.map((data) => (data.selected === true ? arr5.push({ objectionId: data.id }) : null))
                : index === 2
                ? objections6.map((data) => (data.selected === true ? arr6.push({ objectionId: data.id }) : null))
                : null
        );

        const keyOpenerLiderDatasPromo = [firstCheckbox, secondCheckbox, thirdCheckbox];
        const keyOpenerLiderDatasNonPromo = [fourthCheckbox, fifthCheckbox, sixthCheckbox];
        const promoProductPercent = [changeFirstPoint, changeSecondPoint, changeThirdPoint];
        const nonPromoProductPercent = [changeFourthPoint, changeFiftyPoint, changeSixtyPoint];
        const promoProductLoyalty = [firstRating, secondRating, thirdRating];
        const nonPromoProductLoyalty = [fourthRating, fifthRating, sixthRating];

        const eventReportCompetitorsPromo1 = [];
        const eventReportCompetitorsPromo2 = [];
        const eventReportCompetitorsPromo3 = [];
        const eventReportCompetitorsNonPromo1 = [];
        const eventReportCompetitorsNonPromo2 = [];
        const eventReportCompetitorsNonPromo3 = [];

        promoProductName.map((promo, index) =>
            index === 0
                ? allCompetitor1.map((competitor, compIndex) =>
                      competitor !== 0
                          ? eventReportCompetitorsPromo1.push({
                                competitorId: competitor,
                                competitorName: allCompetitorName1[compIndex],
                                competitorPercent: allFirstInput1[index],
                            })
                          : null
                  )
                : index === 1
                ? allCompetitor2.map((competitor, compIndex) =>
                      competitor !== 0
                          ? eventReportCompetitorsPromo2.push({
                                competitorId: competitor,
                                competitorName: allCompetitorName2[compIndex],
                                competitorPercent: allSecondInput[index],
                            })
                          : null
                  )
                : index === 2
                ? allCompetitor3.map((competitor, compIndex) =>
                      competitor !== 0
                          ? eventReportCompetitorsPromo3.push({
                                competitorId: competitor,
                                competitorName: allCompetitorName3[compIndex],
                                competitorPercent: allThirdInput[index],
                            })
                          : null
                  )
                : null
        );

        nonePromoProductName.map((promo, index) =>
            index === 0
                ? allCompetitor4.map((competitor, compIndex) =>
                      competitor !== 0
                          ? eventReportCompetitorsNonPromo1.push({
                                competitorId: competitor,
                                competitorName: allCompetitorName4[compIndex],
                                competitorPercent: allFourthInput[index],
                            })
                          : null
                  )
                : index === 1
                ? allCompetitor5.map((competitor, compIndex) =>
                      competitor !== 0
                          ? eventReportCompetitorsNonPromo2.push({
                                competitorId: competitor,
                                competitorName: allCompetitorName5[compIndex],
                                competitorPercent: allFifthInput[index],
                            })
                          : null
                  )
                : index === 2
                ? allCompetitor6.map((competitor, compIndex) =>
                      competitor !== 0
                          ? eventReportCompetitorsNonPromo3.push({
                                competitorId: competitor,
                                competitorName: allCompetitorName6[compIndex],
                                competitorPercent: allSixthInput[index],
                            })
                          : null
                  )
                : null
        );

        const promoEventReportProducts = promoProductName.map((data, index) => ({
            productId: promoProductName[index],
            productName: promoProduct[index],
            keyOpenerLider: !!keyOpenerLiderDatasPromo[index],
            productPercent: promoProductPercent[index] * 20,
            IsAdditional: true,
            isPromo: true,
            productLoyalty: promoProductLoyalty[index],
            eventReportCompetitors:
                index === 0
                    ? eventReportCompetitorsPromo1
                    : index === 1
                    ? eventReportCompetitorsPromo2
                    : index === 2
                    ? eventReportCompetitorsPromo3
                    : null,
            eventReportObjections: index === 0 ? arr1 : index === 1 ? arr2 : index === 2 ? arr3 : null,
            eventReportPromotionalMaterials: material1.map((index) => ({
                promotionalMaterialId: index.value,
                promotionalMaterialName: index.label,
            })),
        }));

        const nonPromoEventReportProducts = nonePromoProduct.map((data, index) => ({
            productId: nonePromoProductName[index],
            productName: nonePromoProduct[index],
            keyOpenerLider: !!keyOpenerLiderDatasNonPromo[index],
            productPercent: nonPromoProductPercent[index] * 20,
            isPromo: false,
            productLoyalty: nonPromoProductLoyalty[index],
            eventReportCompetitors:
                index === 0
                    ? eventReportCompetitorsNonPromo1
                    : index === 1
                    ? eventReportCompetitorsNonPromo2
                    : index === 2
                    ? eventReportCompetitorsNonPromo3
                    : null,
            eventReportObjections: index === 0 ? arr4 : index === 1 ? arr5 : index === 2 ? arr6 : null,
            eventReportPromotionalMaterials: material1.map((index) => ({
                promotionalMaterialId: index.value,
                promotionalMaterialName: index.label,
            })),
        }));
        const totalProduct = promoEventReportProducts.concat(nonPromoEventReportProducts);
        const saveReport = {
            //const totalPromoAndSubPromo=pr
            eventDetailId: eventData.id,
            visitStatus: true,
            descMissedVisit: notVisiting[0],
            eventReportOpinion: opinionsAbout,
            reportedEmpId: eventData.employeeId, // EmployeeId
            physchoTypeId: selectPhy, // ? Later
            patientNumberDaily: parseInt(patientValue),
            eventReportProducts: totalProduct,
            eventReportConnectedPharmacies: [
                {},
                // { id:0, eventReportId:0, connectedPharmacyId: 0, pharmacyPercent: 0, pharmacyPercent: 0, connectedPharmacyName: "string" }
            ],
            eventReportWants: clickWantsId1.map((data) => data),
            receivers: cntEmpIdEmail.map((email) => email),
        };
        FetchApiPost('services/daywork/EventReport/CreateEventReport', 'POST', saveReport)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        // saveReportModal();
    };
    const saveReport = useMemo(() => {
        return {
            eventDetailId: eventData.id,
            visitStatus: true,
            descMissedVisit: notVisiting[0],
            eventReportOpinion: opinionsAbout,
            reportedEmpId: eventData.employeeId, // EmployeeId
            physchoTypeId: selectPhy, // ? Later
            patientNumberDaily: parseInt(patientValue),
            eventReportProducts: [
                // TOTAL PRODUCT EKLENMELİ BURAYA
                {
                    productId: 0,
                    productName: 'string',
                    keyOpenerLider: true,
                    isPromo: true,
                    productPercent: 0,
                    productLoyalty: 0,
                    isAdditional: true,
                    eventReportPromotionalMaterials: [
                        {
                            promotionalMaterialId: 0,
                            promotionalMaterialName: 'string',
                        },
                    ],
                },
            ],
            eventReportConnectedPharmacies: [
                {
                    id: 0,
                    eventReportId: 0,
                    connectedPharmacyId: 0,
                    pharmacyPercent: 0,
                    connectedPharmacyName: 'string',
                },
            ],
            eventReportWants: clickWantsId1.map((data) => data),
            receivers: cntEmpIdEmail.map((email) => email),
        };
    }, [clickWantsId1, cntEmpIdEmail, eventData, notVisiting, opinionsAbout, patientValue, selectPhy]);
    const quit = useSelector((state) => state.Calendar.notSaveData);
    useEffect(() => {
        if (quit === true) {
            console.log('true');
        } else {
            console.log('false');
        }
    }, [dispatch, quit, saveReport]);

    // Activity Time
    const [selectedDate, setSelectedDate] = useState(eventData.start);
    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };
    // SPLİT
    const showSplit = (e) => {
        setChangePage(90);
    };
    const prevSplitPage = (e) => {
        if (changePage === 90) setChangePage(14);
        if (changePage === 91) setChangePage(90);
    };
    const changeSplitPage = (e) => {
        if (changePage === 90) setChangePage(91);
        if (changePage === 91) setChangePage(92);
    };
    return (
        <>
            {appStatus !== 2 ? (
                <Modal
                    className={hideRm ? 'rm-cont-hide' : null}
                    show={isOpen}
                    onHide={onClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header className="pb-0 pt-0 px-4 border-bottom-0 rm-title">
                        <Modal.Title id="modal-title">
                            <h5 className="text-light">{reportTitle}</h5>
                        </Modal.Title>
                        <div className="rm-close-button-cont" onClick={onClose}>
                            <i className="dripicons-cross rm-close-button"></i>
                        </div>
                    </Modal.Header>
                    {errMes ? (
                        <Alert variant="danger visit-acti-error-promo">
                            <div className="visit-acti-error">
                                <span>Select Promo</span>
                            </div>
                        </Alert>
                    ) : null}
                    {rprErr ? (
                        <Alert variant="danger visit-acti-error-promo">
                            <div className="visit-acti-error">
                                <span>Please check again...</span>
                            </div>
                        </Alert>
                    ) : null}
                    {pttErr1 ? (
                        <Alert variant="danger visit-acti-error-promo">
                            <div className="visit-acti-error">
                                <span>Number of patients cannot be less than 0</span>
                            </div>
                        </Alert>
                    ) : null}
                    {pttErr2 ? (
                        <Alert variant="danger visit-acti-error-promo">
                            <div className="visit-acti-error">
                                <span>Up to 400 writable!</span>
                            </div>
                        </Alert>
                    ) : null}
                    <Modal.Body className="pb-1 pt-3">
                        <form noValidate name="chat-form" id="chat-form" onSubmit={handleSubmit(onSubmitEvent)}>
                            {changePage === 90 ? (
                                <>
                                    <AddPharmacy
                                        changePage={changePage}
                                        onClick={changeSplitPage}
                                        prevSplitPage={prevSplitPage}
                                    />
                                </>
                            ) : null}
                            {changePage === 91 ? (
                                <>
                                    <Row>
                                        <SplitPage2 changeSplitPage={changeSplitPage} />
                                    </Row>
                                </>
                            ) : null}
                            {changePage === 92 ? (
                                <>
                                    <PhysicianSplitIndex />
                                </>
                            ) : null}
                            {changePage === 14 ? (
                                <>
                                    {/*!!!!!!!!!!!!!!!!!! BURASI DEĞİŞECEK !!!!!!!!!!!!! */}
                                    {appStatus === 3 || appStatus === 0 ? (
                                        <>
                                            <Row className="px-4">
                                                <Col>
                                                    <FormInput
                                                        type="text"
                                                        label="Event Name"
                                                        name="title"
                                                        className="form-control"
                                                        placeholder="Insert Event Name"
                                                        containerClass={'mb-2'}
                                                        register={register}
                                                        key="title"
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="px-4">
                                                <Col>
                                                    <h5>Activity Date</h5>
                                                    <HyperDatepicker
                                                        hideAddon={true}
                                                        register={register}
                                                        errors={errors}
                                                        control={control}
                                                        value={selectedDate}
                                                        onChange={(date) => {
                                                            onDateChange(date);
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                </>
                            ) : null}
                            {changePage === 0 ? (
                                <>
                                    <Row className="px-3">
                                        <Col>
                                            <h5>Select the reasons for not visiting.</h5>
                                        </Col>
                                    </Row>
                                    <Row className="px-3 py-1 pb-1">
                                        <Col>
                                            <Select
                                                isMulti={true}
                                                options={[
                                                    { value: 'first', label: 'Visit Cancellation by Doctor' },
                                                    { value: 'second', label: 'Absence of Person' },
                                                    { value: 'third', label: 'No Enough Time' },
                                                ]}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                isOptionDisabled={notVisitingSelect}
                                                onChange={changeNotVisiting}
                                            />
                                        </Col>
                                    </Row>
                                    {/* <NumberOfPatientIndex/> */}
                                    {/* <PreviousIndex/> */}
                                    {/* <Promo/> */}
                                    {/* <NewIndex/> */}
                                    {/* <CoaIndex/> */}
                                </>
                            ) : null}
                            {changePage === 1 && activityTypeName === 'Pharmacy Vis' ? (
                                <Row className="rm-page1-title">
                                    <span>Did you make this pharmacy?</span>
                                </Row>
                            ) : changePage === 1 && activityTypeName === 'Clinic Visit' ? (
                                <Row className="rm-page1-title">
                                    <span>Did you make this clinic?</span>
                                </Row>
                            ) : null}
                            {changePage === 2 && activityTypeName === 'Pharmacy Vis' ? (
                                <>
                                    <Row className="px-3 pb-2">
                                        <Col>
                                            <div>
                                                <h5>Promo Product</h5>
                                            </div>
                                            <Select
                                                isMulti={true}
                                                //isDisabled={true}
                                                options={datas}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="you can select up to 3 products."
                                                isOptionDisabled={isOpenPromo}
                                                onChange={changePromoProduct}
                                                value={datas.filter((obj) => promoProductName.includes(obj.value))}
                                                // value={promoProduct.map((index) => (
                                                //     {label: index}
                                                //     ))
                                                // }
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="px-3 pb-1">
                                        <Col>
                                            <h5>None-promo Product</h5>
                                            <Select
                                                isMulti={true}
                                                options={datas2}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="you can select up to 3 products."
                                                isOptionDisabled={isOpenNonePromo}
                                                onChange={changeNonePromoProduct}
                                                value={datas2.filter((obj) => nonePromoProductName.includes(obj.value))}
                                            />
                                        </Col>
                                    </Row>
                                </>
                            ) : changePage === 2 && activityTypeName === 'Clinic Visit' ? (
                                <>
                                    {/* <WantsIndex/> */}
                                    <Row className="px-3 pb-2">
                                        <Col>
                                            <div>
                                                <h5>Promo Product</h5>
                                            </div>
                                            <Select
                                                isMulti={true}
                                                isDisabled={appStatus === 4 ? true : false}
                                                options={datas}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="you can select up to 3 products."
                                                isOptionDisabled={isOpenPromo}
                                                onChange={changePromoProduct}
                                                value={selectPromoName}
                                                //value={datas.filter(obj => promoProductName.includes(obj.value))}
                                                // value={promoProduct.map((index) => (
                                                //     {label: index}
                                                //     ))
                                                // }
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="px-3 pb-1">
                                        <Col>
                                            <h5>None-promo Product</h5>
                                            <Select
                                                isMulti={true}
                                                isDisabled={appStatus === 4 ? true : false}
                                                options={datas2}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="you can select up to 3 products."
                                                isOptionDisabled={isOpenNonePromo}
                                                onChange={changeNonePromoProduct}
                                                value={selectNonPromoName}
                                                //value={datas2.filter(obj => nonePromoProductName.includes(obj.value))}
                                            />
                                        </Col>
                                    </Row>
                                </>
                            ) : null}
                            {changePage === 3 && activityTypeName === 'Clinic Visit' ? (
                                <>
                                    <Row className="px-3">
                                        <Col>
                                            <h5 className="success-of-visit-title">{selectPromoName[0].label}</h5>
                                        </Col>
                                    </Row>
                                    <Row className="px-3">
                                        <Col
                                            className={
                                                appStatus === 4
                                                    ? 'success-of-visit-cont-status4'
                                                    : 'success-of-visit-cont'
                                            }>
                                            <div
                                                className={
                                                    changeFirstPoint === 0 || changeFirstPoint === 1
                                                        ? 'success-of-visit1 success-of-visit-clk1'
                                                        : changeFirstPoint === 2 || changeFirstPoint === 3
                                                        ? 'success-of-visit1 success-of-visit-clk2'
                                                        : changeFirstPoint === 4 || changeFirstPoint === 5
                                                        ? 'success-of-visit1 success-of-visit-clk3'
                                                        : 'success-of-visit1'
                                                }
                                                onClick={firstSuccessVisit0}>
                                                <span>0%</span>
                                            </div>
                                            <div
                                                className={
                                                    changeFirstPoint === 1
                                                        ? 'success-of-visit2 success-of-visit-clk1'
                                                        : changeFirstPoint === 2 || changeFirstPoint === 3
                                                        ? 'success-of-visit2 success-of-visit-clk2'
                                                        : changeFirstPoint === 4 || changeFirstPoint === 5
                                                        ? 'success-of-visit2 success-of-visit-clk3'
                                                        : 'success-of-visit2'
                                                }
                                                onClick={firstSuccessVisit20}>
                                                <span>20%</span>
                                            </div>
                                            <div
                                                className={
                                                    changeFirstPoint === 2 || changeFirstPoint === 3
                                                        ? 'success-of-visit2 success-of-visit-clk2'
                                                        : changeFirstPoint === 4 || changeFirstPoint === 5
                                                        ? 'success-of-visit2 success-of-visit-clk3'
                                                        : 'success-of-visit2'
                                                }
                                                onClick={firstSuccessVisit40}>
                                                <span>40%</span>
                                            </div>
                                            <div
                                                className={
                                                    changeFirstPoint === 3
                                                        ? 'success-of-visit3 success-of-visit-clk2'
                                                        : changeFirstPoint === 4 || changeFirstPoint === 5
                                                        ? 'success-of-visit3 success-of-visit-clk3'
                                                        : 'success-of-visit3'
                                                }
                                                onClick={firstSuccessVisit60}>
                                                <span>60%</span>
                                            </div>
                                            <div
                                                className={
                                                    changeFirstPoint === 4 || changeFirstPoint === 5
                                                        ? 'success-of-visit4 success-of-visit-clk3'
                                                        : 'success-of-visit4'
                                                }
                                                onClick={firstSuccessVisit80}>
                                                <span>80%</span>
                                            </div>
                                            <div
                                                className={
                                                    changeFirstPoint === 5
                                                        ? 'success-of-visit5 success-of-visit-clk3'
                                                        : 'success-of-visit5'
                                                }
                                                onClick={firstSuccessVisit100}>
                                                <span>100%</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    {selectPromoName[1] ? (
                                        <>
                                            <Row className="px-3 pt-2">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectPromoName[1].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3">
                                                <Col
                                                    className={
                                                        appStatus === 4
                                                            ? 'success-of-visit-cont-status4'
                                                            : 'success-of-visit-cont'
                                                    }>
                                                    <div
                                                        className={
                                                            changeSecondPoint === 0 || changeSecondPoint === 1
                                                                ? 'success-of-visit1 success-of-visit-clk1'
                                                                : changeSecondPoint === 2 || changeSecondPoint === 3
                                                                ? 'success-of-visit1 success-of-visit-clk2'
                                                                : changeSecondPoint === 4 || changeSecondPoint === 5
                                                                ? 'success-of-visit1 success-of-visit-clk3'
                                                                : 'success-of-visit1'
                                                        }
                                                        onClick={secondSuccessVisit0}>
                                                        <span>0%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSecondPoint === 1
                                                                ? 'success-of-visit2 success-of-visit-clk1'
                                                                : changeSecondPoint === 2 || changeSecondPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeSecondPoint === 4 || changeSecondPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={secondSuccessVisit20}>
                                                        <span>20%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSecondPoint === 2 || changeSecondPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeSecondPoint === 4 || changeSecondPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={secondSuccessVisit40}>
                                                        <span>40%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSecondPoint === 3
                                                                ? 'success-of-visit3 success-of-visit-clk2'
                                                                : changeSecondPoint === 4 || changeSecondPoint === 5
                                                                ? 'success-of-visit3 success-of-visit-clk3'
                                                                : 'success-of-visit3'
                                                        }
                                                        onClick={secondSuccessVisit60}>
                                                        <span>60%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSecondPoint === 4 || changeSecondPoint === 5
                                                                ? 'success-of-visit4 success-of-visit-clk3'
                                                                : 'success-of-visit4'
                                                        }
                                                        onClick={secondSuccessVisit80}>
                                                        <span>80%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSecondPoint === 5
                                                                ? 'success-of-visit5 success-of-visit-clk3'
                                                                : 'success-of-visit5'
                                                        }
                                                        onClick={secondSuccessVisit100}>
                                                        <span>100%</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {selectPromoName[2] ? (
                                        <>
                                            <Row className="px-3 pt-2">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectPromoName[2].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3">
                                                <Col
                                                    className={
                                                        appStatus === 4
                                                            ? 'success-of-visit-cont-status4'
                                                            : 'success-of-visit-cont'
                                                    }>
                                                    <div
                                                        className={
                                                            changeThirdPoint === 0 || changeThirdPoint === 1
                                                                ? 'success-of-visit1 success-of-visit-clk1'
                                                                : changeThirdPoint === 2 || changeThirdPoint === 3
                                                                ? 'success-of-visit1 success-of-visit-clk2'
                                                                : changeThirdPoint === 4 || changeThirdPoint === 5
                                                                ? 'success-of-visit1 success-of-visit-clk3'
                                                                : 'success-of-visit1'
                                                        }
                                                        onClick={thirdSuccessVisit0}>
                                                        <span>0%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeThirdPoint === 1
                                                                ? 'success-of-visit2 success-of-visit-clk1'
                                                                : changeThirdPoint === 2 || changeThirdPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeThirdPoint === 4 || changeThirdPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={thirdSuccessVisit20}>
                                                        <span>20%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeThirdPoint === 2 || changeThirdPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeThirdPoint === 4 || changeThirdPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={thirdSuccessVisit40}>
                                                        <span>40%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeThirdPoint === 3
                                                                ? 'success-of-visit3 success-of-visit-clk2'
                                                                : changeThirdPoint === 4 || changeThirdPoint === 5
                                                                ? 'success-of-visit3 success-of-visit-clk3'
                                                                : 'success-of-visit3'
                                                        }
                                                        onClick={thirdSuccessVisit60}>
                                                        <span>60%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeThirdPoint === 4 || changeThirdPoint === 5
                                                                ? 'success-of-visit4 success-of-visit-clk3'
                                                                : 'success-of-visit4'
                                                        }
                                                        onClick={thirdSuccessVisit80}>
                                                        <span>80%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeThirdPoint === 5
                                                                ? 'success-of-visit5 success-of-visit-clk3'
                                                                : 'success-of-visit5'
                                                        }
                                                        onClick={thirdSuccessVisit100}>
                                                        <span>100%</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {selectNonPromoName[0] ? (
                                        <>
                                            <Row className="px-3 pt-2">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectNonPromoName[0].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3 pb-1">
                                                <Col
                                                    className={
                                                        appStatus === 4
                                                            ? 'success-of-visit-cont-status4'
                                                            : 'success-of-visit-cont'
                                                    }>
                                                    <div
                                                        className={
                                                            changeFourthPoint === 0 || changeFourthPoint === 1
                                                                ? 'success-of-visit1 success-of-visit-clk1'
                                                                : changeFourthPoint === 2 || changeFourthPoint === 3
                                                                ? 'success-of-visit1 success-of-visit-clk2'
                                                                : changeFourthPoint === 4 || changeFourthPoint === 5
                                                                ? 'success-of-visit1 success-of-visit-clk3'
                                                                : 'success-of-visit1'
                                                        }
                                                        onClick={fourthSuccessVisit0}>
                                                        <span>0%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFourthPoint === 1
                                                                ? 'success-of-visit2 success-of-visit-clk1'
                                                                : changeFourthPoint === 2 || changeFourthPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeFourthPoint === 4 || changeFourthPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={fourthSuccessVisit20}>
                                                        <span>20%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFourthPoint === 2 || changeFourthPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeFourthPoint === 4 || changeFourthPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={fourthSuccessVisit40}>
                                                        <span>40%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFourthPoint === 3
                                                                ? 'success-of-visit3 success-of-visit-clk2'
                                                                : changeFourthPoint === 4 || changeFourthPoint === 5
                                                                ? 'success-of-visit3 success-of-visit-clk3'
                                                                : 'success-of-visit3'
                                                        }
                                                        onClick={fourthSuccessVisit60}>
                                                        <span>60%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFourthPoint === 4 || changeFourthPoint === 5
                                                                ? 'success-of-visit4 success-of-visit-clk3'
                                                                : 'success-of-visit4'
                                                        }
                                                        onClick={fourthSuccessVisit80}>
                                                        <span>80%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFourthPoint === 5
                                                                ? 'success-of-visit5 success-of-visit-clk3'
                                                                : 'success-of-visit5'
                                                        }
                                                        onClick={fourthSuccessVisit100}>
                                                        <span>100%</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {selectNonPromoName[1] ? (
                                        <>
                                            <Row className="px-3 pt-2">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectNonPromoName[1].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3 pb-1">
                                                <Col
                                                    className={
                                                        appStatus === 4
                                                            ? 'success-of-visit-cont-status4'
                                                            : 'success-of-visit-cont'
                                                    }>
                                                    <div
                                                        className={
                                                            changeFiftyPoint === 0 || changeFiftyPoint === 1
                                                                ? 'success-of-visit1 success-of-visit-clk1'
                                                                : changeFiftyPoint === 2 || changeFiftyPoint === 3
                                                                ? 'success-of-visit1 success-of-visit-clk2'
                                                                : changeFiftyPoint === 4 || changeFiftyPoint === 5
                                                                ? 'success-of-visit1 success-of-visit-clk3'
                                                                : 'success-of-visit1'
                                                        }
                                                        onClick={FiftySuccessVisit0}>
                                                        <span>0%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFiftyPoint === 1
                                                                ? 'success-of-visit2 success-of-visit-clk1'
                                                                : changeFiftyPoint === 2 || changeFiftyPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeFiftyPoint === 4 || changeFiftyPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={FiftySuccessVisit20}>
                                                        <span>20%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFiftyPoint === 2 || changeFiftyPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeFiftyPoint === 4 || changeFiftyPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={FiftySuccessVisit40}>
                                                        <span>40%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFiftyPoint === 3
                                                                ? 'success-of-visit3 success-of-visit-clk2'
                                                                : changeFiftyPoint === 4 || changeFiftyPoint === 5
                                                                ? 'success-of-visit3 success-of-visit-clk3'
                                                                : 'success-of-visit3'
                                                        }
                                                        onClick={FiftySuccessVisit60}>
                                                        <span>60%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFiftyPoint === 4 || changeFiftyPoint === 5
                                                                ? 'success-of-visit4 success-of-visit-clk3'
                                                                : 'success-of-visit4'
                                                        }
                                                        onClick={FiftySuccessVisit80}>
                                                        <span>80%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFiftyPoint === 5
                                                                ? 'success-of-visit5 success-of-visit-clk3'
                                                                : 'success-of-visit5'
                                                        }
                                                        onClick={FiftySuccessVisit100}>
                                                        <span>100%</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {selectNonPromoName[2] ? (
                                        <>
                                            <Row className="px-3 pt-2">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectNonPromoName[2].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3 pb-1">
                                                <Col
                                                    className={
                                                        appStatus === 4
                                                            ? 'success-of-visit-cont-status4'
                                                            : 'success-of-visit-cont'
                                                    }>
                                                    <div
                                                        className={
                                                            changeSixtyPoint === 0 || changeSixtyPoint === 1
                                                                ? 'success-of-visit1 success-of-visit-clk1'
                                                                : changeSixtyPoint === 2 || changeSixtyPoint === 3
                                                                ? 'success-of-visit1 success-of-visit-clk2'
                                                                : changeSixtyPoint === 4 || changeSixtyPoint === 5
                                                                ? 'success-of-visit1 success-of-visit-clk3'
                                                                : 'success-of-visit1'
                                                        }
                                                        onClick={SixtySuccessVisit0}>
                                                        <span>0%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSixtyPoint === 1
                                                                ? 'success-of-visit2 success-of-visit-clk1'
                                                                : changeSixtyPoint === 2 || changeSixtyPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeSixtyPoint === 4 || changeSixtyPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={SixtySuccessVisit20}>
                                                        <span>20%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSixtyPoint === 2 || changeSixtyPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeSixtyPoint === 4 || changeSixtyPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={SixtySuccessVisit40}>
                                                        <span>40%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSixtyPoint === 3
                                                                ? 'success-of-visit3 success-of-visit-clk2'
                                                                : changeSixtyPoint === 4 || changeSixtyPoint === 5
                                                                ? 'success-of-visit3 success-of-visit-clk3'
                                                                : 'success-of-visit3'
                                                        }
                                                        onClick={SixtySuccessVisit60}>
                                                        <span>60%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSixtyPoint === 4 || changeSixtyPoint === 5
                                                                ? 'success-of-visit4 success-of-visit-clk3'
                                                                : 'success-of-visit4'
                                                        }
                                                        onClick={SixtySuccessVisit80}>
                                                        <span>80%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSixtyPoint === 5
                                                                ? 'success-of-visit5 success-of-visit-clk3'
                                                                : 'success-of-visit5'
                                                        }
                                                        onClick={SixtySuccessVisit100}>
                                                        <span>100%</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                </>
                            ) : changePage === 3 && activityTypeName === 'Pharmacy Vis' ? (
                                <>
                                    <Row className="px-3">
                                        <Col>
                                            <h5 className="success-of-visit-title">{promoProduct[0]}</h5>
                                        </Col>
                                    </Row>
                                    <Row className="px-3">
                                        <Col className="success-of-visit-cont">
                                            <div
                                                className={
                                                    changeFirstPoint === 0 || changeFirstPoint === 1
                                                        ? 'success-of-visit1 success-of-visit-clk1'
                                                        : changeFirstPoint === 2 || changeFirstPoint === 3
                                                        ? 'success-of-visit1 success-of-visit-clk2'
                                                        : changeFirstPoint === 4 || changeFirstPoint === 5
                                                        ? 'success-of-visit1 success-of-visit-clk3'
                                                        : 'success-of-visit1'
                                                }
                                                onClick={firstSuccessVisit0}>
                                                <span>0%</span>
                                            </div>
                                            <div
                                                className={
                                                    changeFirstPoint === 1
                                                        ? 'success-of-visit2 success-of-visit-clk1'
                                                        : changeFirstPoint === 2 || changeFirstPoint === 3
                                                        ? 'success-of-visit2 success-of-visit-clk2'
                                                        : changeFirstPoint === 4 || changeFirstPoint === 5
                                                        ? 'success-of-visit2 success-of-visit-clk3'
                                                        : 'success-of-visit2'
                                                }
                                                onClick={firstSuccessVisit20}>
                                                <span>20%</span>
                                            </div>
                                            <div
                                                className={
                                                    changeFirstPoint === 2 || changeFirstPoint === 3
                                                        ? 'success-of-visit2 success-of-visit-clk2'
                                                        : changeFirstPoint === 4 || changeFirstPoint === 5
                                                        ? 'success-of-visit2 success-of-visit-clk3'
                                                        : 'success-of-visit2'
                                                }
                                                onClick={firstSuccessVisit40}>
                                                <span>40%</span>
                                            </div>
                                            <div
                                                className={
                                                    changeFirstPoint === 3
                                                        ? 'success-of-visit3 success-of-visit-clk2'
                                                        : changeFirstPoint === 4 || changeFirstPoint === 5
                                                        ? 'success-of-visit3 success-of-visit-clk3'
                                                        : 'success-of-visit3'
                                                }
                                                onClick={firstSuccessVisit60}>
                                                <span>60%</span>
                                            </div>
                                            <div
                                                className={
                                                    changeFirstPoint === 4 || changeFirstPoint === 5
                                                        ? 'success-of-visit4 success-of-visit-clk3'
                                                        : 'success-of-visit4'
                                                }
                                                onClick={firstSuccessVisit80}>
                                                <span>80%</span>
                                            </div>
                                            <div
                                                className={
                                                    changeFirstPoint === 5
                                                        ? 'success-of-visit5 success-of-visit-clk3'
                                                        : 'success-of-visit5'
                                                }
                                                onClick={firstSuccessVisit100}>
                                                <span>100%</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    {promoProduct[1] ? (
                                        <>
                                            <Row className="px-3 pt-2">
                                                <Col>
                                                    <h5 className="success-of-visit-title">{promoProduct[1]}</h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3">
                                                <Col className="success-of-visit-cont">
                                                    <div
                                                        className={
                                                            changeSecondPoint === 0 || changeSecondPoint === 1
                                                                ? 'success-of-visit1 success-of-visit-clk1'
                                                                : changeSecondPoint === 2 || changeSecondPoint === 3
                                                                ? 'success-of-visit1 success-of-visit-clk2'
                                                                : changeSecondPoint === 4 || changeSecondPoint === 5
                                                                ? 'success-of-visit1 success-of-visit-clk3'
                                                                : 'success-of-visit1'
                                                        }
                                                        onClick={secondSuccessVisit0}>
                                                        <span>0%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSecondPoint === 1
                                                                ? 'success-of-visit2 success-of-visit-clk1'
                                                                : changeSecondPoint === 2 || changeSecondPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeSecondPoint === 4 || changeSecondPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={secondSuccessVisit20}>
                                                        <span>20%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSecondPoint === 2 || changeSecondPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeSecondPoint === 4 || changeSecondPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={secondSuccessVisit40}>
                                                        <span>40%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSecondPoint === 3
                                                                ? 'success-of-visit3 success-of-visit-clk2'
                                                                : changeSecondPoint === 4 || changeSecondPoint === 5
                                                                ? 'success-of-visit3 success-of-visit-clk3'
                                                                : 'success-of-visit3'
                                                        }
                                                        onClick={secondSuccessVisit60}>
                                                        <span>60%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSecondPoint === 4 || changeSecondPoint === 5
                                                                ? 'success-of-visit4 success-of-visit-clk3'
                                                                : 'success-of-visit4'
                                                        }
                                                        onClick={secondSuccessVisit80}>
                                                        <span>80%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSecondPoint === 5
                                                                ? 'success-of-visit5 success-of-visit-clk3'
                                                                : 'success-of-visit5'
                                                        }
                                                        onClick={secondSuccessVisit100}>
                                                        <span>100%</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {promoProduct[2] ? (
                                        <>
                                            <Row className="px-3 pt-2">
                                                <Col>
                                                    <h5 className="success-of-visit-title">{promoProduct[2]}</h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3">
                                                <Col className="success-of-visit-cont">
                                                    <div
                                                        className={
                                                            changeThirdPoint === 0 || changeThirdPoint === 1
                                                                ? 'success-of-visit1 success-of-visit-clk1'
                                                                : changeThirdPoint === 2 || changeThirdPoint === 3
                                                                ? 'success-of-visit1 success-of-visit-clk2'
                                                                : changeThirdPoint === 4 || changeThirdPoint === 5
                                                                ? 'success-of-visit1 success-of-visit-clk3'
                                                                : 'success-of-visit1'
                                                        }
                                                        onClick={thirdSuccessVisit0}>
                                                        <span>0%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeThirdPoint === 1
                                                                ? 'success-of-visit2 success-of-visit-clk1'
                                                                : changeThirdPoint === 2 || changeThirdPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeThirdPoint === 4 || changeThirdPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={thirdSuccessVisit20}>
                                                        <span>20%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeThirdPoint === 2 || changeThirdPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeThirdPoint === 4 || changeThirdPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={thirdSuccessVisit40}>
                                                        <span>40%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeThirdPoint === 3
                                                                ? 'success-of-visit3 success-of-visit-clk2'
                                                                : changeThirdPoint === 4 || changeThirdPoint === 5
                                                                ? 'success-of-visit3 success-of-visit-clk3'
                                                                : 'success-of-visit3'
                                                        }
                                                        onClick={thirdSuccessVisit60}>
                                                        <span>60%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeThirdPoint === 4 || changeThirdPoint === 5
                                                                ? 'success-of-visit4 success-of-visit-clk3'
                                                                : 'success-of-visit4'
                                                        }
                                                        onClick={thirdSuccessVisit80}>
                                                        <span>80%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeThirdPoint === 5
                                                                ? 'success-of-visit5 success-of-visit-clk3'
                                                                : 'success-of-visit5'
                                                        }
                                                        onClick={thirdSuccessVisit100}>
                                                        <span>100%</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {nonePromoProduct[0] ? (
                                        <>
                                            <Row className="px-3 pt-2">
                                                <Col>
                                                    <h5 className="success-of-visit-title">{nonePromoProduct[0]}</h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3 pb-1">
                                                <Col className="success-of-visit-cont">
                                                    <div
                                                        className={
                                                            changeFourthPoint === 0 || changeFourthPoint === 1
                                                                ? 'success-of-visit1 success-of-visit-clk1'
                                                                : changeFourthPoint === 2 || changeFourthPoint === 3
                                                                ? 'success-of-visit1 success-of-visit-clk2'
                                                                : changeFourthPoint === 4 || changeFourthPoint === 5
                                                                ? 'success-of-visit1 success-of-visit-clk3'
                                                                : 'success-of-visit1'
                                                        }
                                                        onClick={fourthSuccessVisit0}>
                                                        <span>0%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFourthPoint === 1
                                                                ? 'success-of-visit2 success-of-visit-clk1'
                                                                : changeFourthPoint === 2 || changeFourthPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeFourthPoint === 4 || changeFourthPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={fourthSuccessVisit20}>
                                                        <span>20%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFourthPoint === 2 || changeFourthPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeFourthPoint === 4 || changeFourthPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={fourthSuccessVisit40}>
                                                        <span>40%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFourthPoint === 3
                                                                ? 'success-of-visit3 success-of-visit-clk2'
                                                                : changeFourthPoint === 4 || changeFourthPoint === 5
                                                                ? 'success-of-visit3 success-of-visit-clk3'
                                                                : 'success-of-visit3'
                                                        }
                                                        onClick={fourthSuccessVisit60}>
                                                        <span>60%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFourthPoint === 4 || changeFourthPoint === 5
                                                                ? 'success-of-visit4 success-of-visit-clk3'
                                                                : 'success-of-visit4'
                                                        }
                                                        onClick={fourthSuccessVisit80}>
                                                        <span>80%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFourthPoint === 5
                                                                ? 'success-of-visit5 success-of-visit-clk3'
                                                                : 'success-of-visit5'
                                                        }
                                                        onClick={fourthSuccessVisit100}>
                                                        <span>100%</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {nonePromoProduct[1] ? (
                                        <>
                                            <Row className="px-3 pt-2">
                                                <Col>
                                                    <h5 className="success-of-visit-title">{nonePromoProduct[1]}</h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3 pb-1">
                                                <Col className="success-of-visit-cont">
                                                    <div
                                                        className={
                                                            changeFiftyPoint === 0 || changeFiftyPoint === 1
                                                                ? 'success-of-visit1 success-of-visit-clk1'
                                                                : changeFiftyPoint === 2 || changeFiftyPoint === 3
                                                                ? 'success-of-visit1 success-of-visit-clk2'
                                                                : changeFiftyPoint === 4 || changeFiftyPoint === 5
                                                                ? 'success-of-visit1 success-of-visit-clk3'
                                                                : 'success-of-visit1'
                                                        }
                                                        onClick={FiftySuccessVisit0}>
                                                        <span>0%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFiftyPoint === 1
                                                                ? 'success-of-visit2 success-of-visit-clk1'
                                                                : changeFiftyPoint === 2 || changeFiftyPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeFiftyPoint === 4 || changeFiftyPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={FiftySuccessVisit20}>
                                                        <span>20%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFiftyPoint === 2 || changeFiftyPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeFiftyPoint === 4 || changeFiftyPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={FiftySuccessVisit40}>
                                                        <span>40%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFiftyPoint === 3
                                                                ? 'success-of-visit3 success-of-visit-clk2'
                                                                : changeFiftyPoint === 4 || changeFiftyPoint === 5
                                                                ? 'success-of-visit3 success-of-visit-clk3'
                                                                : 'success-of-visit3'
                                                        }
                                                        onClick={FiftySuccessVisit60}>
                                                        <span>60%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFiftyPoint === 4 || changeFiftyPoint === 5
                                                                ? 'success-of-visit4 success-of-visit-clk3'
                                                                : 'success-of-visit4'
                                                        }
                                                        onClick={FiftySuccessVisit80}>
                                                        <span>80%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeFiftyPoint === 5
                                                                ? 'success-of-visit5 success-of-visit-clk3'
                                                                : 'success-of-visit5'
                                                        }
                                                        onClick={FiftySuccessVisit100}>
                                                        <span>100%</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {nonePromoProduct[2] ? (
                                        <>
                                            <Row className="px-3 pt-2">
                                                <Col>
                                                    <h5 className="success-of-visit-title">{nonePromoProduct[2]}</h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3 pb-1">
                                                <Col className="success-of-visit-cont">
                                                    <div
                                                        className={
                                                            changeSixtyPoint === 0 || changeSixtyPoint === 1
                                                                ? 'success-of-visit1 success-of-visit-clk1'
                                                                : changeSixtyPoint === 2 || changeSixtyPoint === 3
                                                                ? 'success-of-visit1 success-of-visit-clk2'
                                                                : changeSixtyPoint === 4 || changeSixtyPoint === 5
                                                                ? 'success-of-visit1 success-of-visit-clk3'
                                                                : 'success-of-visit1'
                                                        }
                                                        onClick={SixtySuccessVisit0}>
                                                        <span>0%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSixtyPoint === 1
                                                                ? 'success-of-visit2 success-of-visit-clk1'
                                                                : changeSixtyPoint === 2 || changeSixtyPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeSixtyPoint === 4 || changeSixtyPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={SixtySuccessVisit20}>
                                                        <span>20%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSixtyPoint === 2 || changeSixtyPoint === 3
                                                                ? 'success-of-visit2 success-of-visit-clk2'
                                                                : changeSixtyPoint === 4 || changeSixtyPoint === 5
                                                                ? 'success-of-visit2 success-of-visit-clk3'
                                                                : 'success-of-visit2'
                                                        }
                                                        onClick={SixtySuccessVisit40}>
                                                        <span>40%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSixtyPoint === 3
                                                                ? 'success-of-visit3 success-of-visit-clk2'
                                                                : changeSixtyPoint === 4 || changeSixtyPoint === 5
                                                                ? 'success-of-visit3 success-of-visit-clk3'
                                                                : 'success-of-visit3'
                                                        }
                                                        onClick={SixtySuccessVisit60}>
                                                        <span>60%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSixtyPoint === 4 || changeSixtyPoint === 5
                                                                ? 'success-of-visit4 success-of-visit-clk3'
                                                                : 'success-of-visit4'
                                                        }
                                                        onClick={SixtySuccessVisit80}>
                                                        <span>80%</span>
                                                    </div>
                                                    <div
                                                        className={
                                                            changeSixtyPoint === 5
                                                                ? 'success-of-visit5 success-of-visit-clk3'
                                                                : 'success-of-visit5'
                                                        }
                                                        onClick={SixtySuccessVisit100}>
                                                        <span>100%</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                </>
                            ) : null}
                            {changePage === 4 && activityTypeName === 'Clinic Visit' ? (
                                <>
                                    <Row className="px-3">
                                        <Col>
                                            <h5 className="success-of-visit-title">{selectPromoName[0].label}</h5>
                                        </Col>
                                    </Row>
                                    <Row className="px-4 pb-2">
                                        <Col lg={6} className="checkbox-cont1">
                                            <Form.Check
                                                className="py-2"
                                                type="checkbox"
                                                id="default-checkbox1"
                                                checked={firstCheckbox}
                                                onChange={firstChangeChecked1}
                                                disabled={appStatus === 4 ? true : false}
                                            />
                                            <span>Yes</span>
                                        </Col>
                                        <Col lg={6} className="checkbox-cont2">
                                            <Form.Check
                                                className="py-2"
                                                type="checkbox"
                                                id="default-checkbox2"
                                                checked={!firstCheckbox}
                                                onChange={firstChangeChecked2}
                                                disabled={appStatus === 4 ? true : false}
                                            />
                                            <span>No</span>
                                        </Col>
                                    </Row>
                                    {selectPromoName[1] ? (
                                        <>
                                            <Row className="px-3">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectPromoName[1].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-4 pb-2">
                                                <Col lg={6} className="checkbox-cont1">
                                                    <Form.Check
                                                        className="py-2"
                                                        type="checkbox"
                                                        id="default-checkbox3"
                                                        checked={secondCheckbox}
                                                        onChange={secondChangeChecked1}
                                                        disabled={appStatus === 4 ? true : false}
                                                    />
                                                    <span>Yes</span>
                                                </Col>
                                                <Col lg={6} className="checkbox-cont2">
                                                    <Form.Check
                                                        className="py-2"
                                                        type="checkbox"
                                                        id="default-checkbox4"
                                                        checked={!secondCheckbox}
                                                        onChange={secondChangeChecked2}
                                                        disabled={appStatus === 4 ? true : false}
                                                    />
                                                    <span>No</span>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {selectPromoName[2] ? (
                                        <>
                                            <Row className="px-3">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectPromoName[2].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-4 pb-2">
                                                <Col lg={6} className="checkbox-cont1">
                                                    <Form.Check
                                                        className="py-2"
                                                        type="checkbox"
                                                        id="default-checkbox5"
                                                        checked={thirdCheckbox}
                                                        onChange={thirdChangeChecked1}
                                                        disabled={appStatus === 4 ? true : false}
                                                    />
                                                    <span>Yes</span>
                                                </Col>
                                                <Col lg={6} className="checkbox-cont2">
                                                    <Form.Check
                                                        className="py-2"
                                                        type="checkbox"
                                                        id="default-checkbox6"
                                                        checked={!thirdCheckbox}
                                                        onChange={thirdChangeChecked2}
                                                        disabled={appStatus === 4 ? true : false}
                                                    />
                                                    <span>No</span>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {selectNonPromoName[0] ? (
                                        <>
                                            <Row className="px-3">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectNonPromoName[0].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-4 pb-1">
                                                <Col lg={6} className="checkbox-cont1">
                                                    <Form.Check
                                                        className="py-2"
                                                        type="checkbox"
                                                        id="default-checkbox7"
                                                        checked={fourthCheckbox}
                                                        onChange={fourthChangeChecked1}
                                                        disabled={appStatus === 4 ? true : false}
                                                    />
                                                    <span>Yes</span>
                                                </Col>
                                                <Col lg={6} className="checkbox-cont2">
                                                    <Form.Check
                                                        className="py-2"
                                                        type="checkbox"
                                                        id="default-checkbox8"
                                                        checked={!fourthCheckbox}
                                                        onChange={fourthChangeChecked2}
                                                        disabled={appStatus === 4 ? true : false}
                                                    />
                                                    <span>No</span>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {selectNonPromoName[1] ? (
                                        <>
                                            <Row className="px-3">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectNonPromoName[1].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-4 pb-1">
                                                <Col lg={6} className="checkbox-cont1">
                                                    <Form.Check
                                                        className="py-2"
                                                        type="checkbox"
                                                        id="default-checkbox7"
                                                        checked={fifthCheckbox}
                                                        onChange={fifthChangeChecked1}
                                                        disabled={appStatus === 4 ? true : false}
                                                    />
                                                    <span>Yes</span>
                                                </Col>
                                                <Col lg={6} className="checkbox-cont2">
                                                    <Form.Check
                                                        className="py-2"
                                                        type="checkbox"
                                                        id="default-checkbox8"
                                                        checked={!fifthCheckbox}
                                                        onChange={fifthChangeChecked2}
                                                        disabled={appStatus === 4 ? true : false}
                                                    />
                                                    <span>No</span>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {selectNonPromoName[2] ? (
                                        <>
                                            <Row className="px-3">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectNonPromoName[2].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-4 pb-1">
                                                <Col lg={6} className="checkbox-cont1">
                                                    <Form.Check
                                                        className="py-2"
                                                        type="checkbox"
                                                        id="default-checkbox7"
                                                        checked={sixthCheckbox}
                                                        onChange={sixthChangeChecked1}
                                                    />
                                                    <span>Yes</span>
                                                </Col>
                                                <Col lg={6} className="checkbox-cont2">
                                                    <Form.Check
                                                        className="py-2"
                                                        type="checkbox"
                                                        id="default-checkbox8"
                                                        checked={!sixthCheckbox}
                                                        onChange={sixthChangeChecked2}
                                                    />
                                                    <span>No</span>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                </>
                            ) : changePage === 4 && activityTypeName === 'Pharmacy Vis' ? (
                                <>
                                    {/* <Row className="px-3">
                        <Col>
                            <h5 className="success-of-visit-title">{promoProduct[0]}</h5>
                        </Col>
                    </Row>
                    <Row className="px-3">
                        <Col>
                            <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                isMulti={true}
                                options={materialsDatas1}
                                onChange={changeMaterials1}
                                value={material1}
                            />
                        </Col>
                    </Row>
                    {promoProduct[1] != null ? (
                        <>
                            <Row className="px-3 pt-1">
                                <Col>
                                    <h5 className="success-of-visit-title">{promoProduct[1]}</h5>
                                </Col>
                            </Row>
                            <Row className="px-3">
                                <Col>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        isMulti={true}
                                        options={materialsDatas2}
                                        onChange={changeMaterials2}
                                        value={material2}
                                    />
                                </Col>
                            </Row>
                        </>
                    ) : null}
                    {promoProduct[2] != null ? (
                        <>
                            <Row className="px-3 pt-1">
                                <Col>
                                    <h5 className="success-of-visit-title">{promoProduct[2]}</h5>
                                </Col>
                            </Row>
                            <Row className="px-3">
                                <Col>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        isMulti={true}
                                        options={materialsDatas3}
                                        onChange={changeMaterials3}
                                        value={material3}
                                    />
                                </Col>
                            </Row>
                        </>
                    ) : null}
                    {nonePromoProduct[0] != null ? (
                        <>
                            <Row className="px-3 pt-1">
                                <Col>
                                    <h5 className="success-of-visit-title">{nonePromoProduct[0]}</h5>
                                </Col>
                            </Row>
                            <Row className="px-3">
                                <Col>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        isMulti={true}
                                        options={materialsDatas4}
                                        onChange={changeMaterials4}
                                        value={material4}
                                    />
                                </Col>
                            </Row>
                        </>
                    ) : null}
                    {nonePromoProduct[1] != null ? (
                        <>
                            <Row className="px-3 pt-1">
                                <Col>
                                    <h5 className="success-of-visit-title">{nonePromoProduct[1]}</h5>
                                </Col>
                            </Row>
                            <Row className="px-3">
                                <Col>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        isMulti={true}
                                        options={materialsDatas5}
                                        onChange={changeMaterials5}
                                        value={material5}
                                    />
                                </Col>
                            </Row>
                        </>
                    ) : null}
                    {nonePromoProduct[2] != null ? (
                        <>
                            <Row className="px-3 pt-1">
                                <Col>
                                    <h5 className="success-of-visit-title">{nonePromoProduct[2]}</h5>
                                </Col>
                            </Row>
                            <Row className="px-3">
                                <Col>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        isMulti={true}
                                        options={materialsDatas6}
                                        onChange={changeMaterials6}
                                        value={material6}
                                    />
                                </Col>
                            </Row>
                        </>
                    ) : null} */}
                                </>
                            ) : null}
                            {changePage === 5 && activityTypeName === 'Clinic Visit' ? (
                                <>
                                    <PromoMaterial />
                                    <PromoMaterial />
                                    <PromoMaterial />
                                </>
                            ) : changePage === 5 && activityTypeName === 'Pharmacy Vis' ? (
                                <>
                                    <div className="competitor-cont-scrollbar">
                                        <Row className="px-3">
                                            <Col lg={9}>
                                                <h5>{promoProduct[0]}</h5>
                                                <FormInput
                                                    name="select3"
                                                    type="select"
                                                    containerClass="mb-1"
                                                    className="form-select"
                                                    onChange={changeCompetitor1}
                                                    selected={competitor1}>
                                                    <option disabled={firstCheck1}>select competitor</option>
                                                    {competitors1.map((index) => (
                                                        <option value={index.CompetitorId} key={index.CompetitorId}>
                                                            {index.CompetitorName}
                                                        </option>
                                                    ))}
                                                </FormInput>
                                                {invisible > 0 ? (
                                                    <FormInput
                                                        name="select4"
                                                        type="select"
                                                        containerClass="mb-1"
                                                        className="form-select"
                                                        onChange={changeCompetitor2}
                                                        selected={competitor2}>
                                                        <option disabled={firstCheck2}>select competitor</option>
                                                        {competitors1
                                                            .filter((obj) => !competitor1.includes(obj.CompetitorName))
                                                            .map((index) =>
                                                                index.ProductId === promoProductName[0] ? (
                                                                    <option
                                                                        value={index.CompetitorId}
                                                                        key={index.CompetitorId}>
                                                                        {index.CompetitorName}
                                                                    </option>
                                                                ) : null
                                                            )}

                                                        {/* {competitors1.map((index) => (
                                            <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option>
                                         ))} */}
                                                    </FormInput>
                                                ) : null}
                                                {invisible > 1 ? (
                                                    <FormInput
                                                        name="select5"
                                                        type="select"
                                                        containerClass="mb-1"
                                                        className="form-select"
                                                        onChange={changeCompetitor3}
                                                        selected={competitor3}>
                                                        <option disabled={firstCheck3}>select competitor</option>
                                                        {competitors1
                                                            .filter(
                                                                (obj) => !firstCompetitor1.includes(obj.CompetitorName)
                                                            )
                                                            .map((index) =>
                                                                index.ProductId === promoProductName[0] ? (
                                                                    <option
                                                                        value={index.CompetitorId}
                                                                        key={index.CompetitorId}>
                                                                        {index.CompetitorName}
                                                                    </option>
                                                                ) : null
                                                            )}
                                                        {/* {competitors1.map((index) => (
                                            <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option>
                                         ))} */}
                                                    </FormInput>
                                                ) : null}
                                                {invisible > 2 ? (
                                                    <FormInput
                                                        name="select6"
                                                        type="select"
                                                        containerClass="mb-1"
                                                        className="form-select"
                                                        onChange={changeCompetitor4}
                                                        selected={competitor4}>
                                                        <option disabled={firstCheck4}>select competitor</option>
                                                        {competitors1
                                                            .filter(
                                                                (obj) => !firstCompetitor2.includes(obj.CompetitorName)
                                                            )
                                                            .map((index) =>
                                                                index.ProductId === promoProductName[0] ? (
                                                                    <option
                                                                        value={index.CompetitorId}
                                                                        key={index.CompetitorId}>
                                                                        {index.CompetitorName}
                                                                    </option>
                                                                ) : null
                                                            )}
                                                        {/* {competitors1.map((index) => (
                                            <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option>
                                         ))} */}
                                                    </FormInput>
                                                ) : null}
                                            </Col>
                                            <Col lg={3}>
                                                <h5
                                                    className={
                                                        100 - sum1 < 0
                                                            ? 'text-center text-danger'
                                                            : 100 - sum1 === 0
                                                            ? 'text-center text-success'
                                                            : 'text-center'
                                                    }>
                                                    {100 - sum1 + ' %'}
                                                </h5>
                                                <FormInput
                                                    className="compatitor-input"
                                                    min={0}
                                                    max={100}
                                                    type="number"
                                                    name="number"
                                                    containerClass={'mb-1'}
                                                    disabled={!firstCheck1}
                                                    placeholder={firstInput1}
                                                    onChange={firstInputChange1}
                                                />
                                                {invisible > 0 ? (
                                                    <FormInput
                                                        min={0}
                                                        max={100}
                                                        type="number"
                                                        name="number1"
                                                        containerClass={'mb-1'}
                                                        disabled={!firstCheck2}
                                                        placeholder={firstInput2}
                                                        onChange={firstInputChange2}
                                                    />
                                                ) : null}
                                                {invisible > 1 ? (
                                                    <FormInput
                                                        min={0}
                                                        max={100}
                                                        type="number"
                                                        name="number2"
                                                        containerClass={'mb-1'}
                                                        disabled={!firstCheck3}
                                                        placeholder={firstInput3}
                                                        onChange={firstInputChange3}
                                                    />
                                                ) : null}
                                                {invisible > 2 ? (
                                                    <FormInput
                                                        min={0}
                                                        max={100}
                                                        type="number"
                                                        name="number3"
                                                        containerClass={'mb-1'}
                                                        disabled={!firstCheck4}
                                                        placeholder={firstInput4}
                                                        onChange={firstInputChange4}
                                                    />
                                                ) : null}
                                            </Col>
                                        </Row>
                                        {promoProduct[1] != null ? (
                                            <Row className="px-3 pt-2">
                                                <Col lg={9}>
                                                    <h5>{promoProduct[1]}</h5>
                                                    <FormInput
                                                        name="select7"
                                                        type="select"
                                                        containerClass="mb-1"
                                                        className="form-select"
                                                        onChange={changeSecondCompetitor1}
                                                        selected={secondCompetitor1}>
                                                        <option disabled={secondCheck1}>select competitor</option>
                                                        {/* {competitors1.map((index) => (
                                            index.ProductId === promoProductName[1] ? (
                                                <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option>
                                            ): null */}
                                                        {competitors2.map((index) => (
                                                            <option value={index.CompetitorId} key={index.CompetitorId}>
                                                                {index.CompetitorName}
                                                            </option>
                                                        ))}
                                                        ))}
                                                    </FormInput>
                                                    {invisible2 > 0 ? (
                                                        <FormInput
                                                            name="select8"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeSecondCompetitor2}
                                                            selected={secondCompetitor2}>
                                                            <option disabled={secondCheck2}>select competitor</option>
                                                            {competitors2
                                                                .filter(
                                                                    (obj) =>
                                                                        !secondCompetitor1.includes(obj.CompetitorName)
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[1] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                            <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible2 > 1 ? (
                                                        <FormInput
                                                            name="select9"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeSecondCompetitor3}
                                                            selected={secondCompetitor3}>
                                                            <option disabled={secondCheck3}>select competitor</option>
                                                            {competitors2
                                                                .filter(
                                                                    (obj) =>
                                                                        !sumSecondCompetitor1.includes(
                                                                            obj.CompetitorName
                                                                        )
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[1] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                            <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible2 > 2 ? (
                                                        <FormInput
                                                            name="select10"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeSecondCompetitor4}
                                                            selected={secondCompetitor4}>
                                                            <option disabled={secondCheck4}>select competitor</option>
                                                            {competitors2
                                                                .filter(
                                                                    (obj) =>
                                                                        !sumSecondCompetitor2.includes(
                                                                            obj.CompetitorName
                                                                        )
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[1] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                            <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                </Col>
                                                <Col lg={3}>
                                                    <h5
                                                        className={
                                                            100 - sum2 < 0
                                                                ? 'text-center text-danger'
                                                                : 100 - sum2 === 0
                                                                ? 'text-center text-success'
                                                                : 'text-center'
                                                        }>
                                                        {100 - sum2 + ' %'}
                                                    </h5>
                                                    <FormInput
                                                        type="number"
                                                        name="number4"
                                                        containerClass={'mb-1'}
                                                        disabled={!secondCheck1}
                                                        placeholder={secondInput1}
                                                        onChange={secondInputChange1}
                                                    />
                                                    {invisible2 > 0 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number5"
                                                            containerClass={'mb-1'}
                                                            disabled={!secondCheck2}
                                                            placeholder={secondInput2}
                                                            onChange={secondInputChange2}
                                                        />
                                                    ) : null}
                                                    {invisible2 > 1 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number6"
                                                            containerClass={'mb-1'}
                                                            disabled={!secondCheck3}
                                                            placeholder={secondInput3}
                                                            onChange={secondInputChange3}
                                                        />
                                                    ) : null}
                                                    {invisible2 > 2 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number7"
                                                            containerClass={'mb-1'}
                                                            disabled={!secondCheck4}
                                                            placeholder={secondInput4}
                                                            onChange={secondInputChange4}
                                                        />
                                                    ) : null}
                                                </Col>
                                            </Row>
                                        ) : null}
                                        {promoProduct[2] != null ? (
                                            <Row className="px-3 pt-2">
                                                <Col lg={9}>
                                                    <h5>{promoProduct[2]}</h5>
                                                    <FormInput
                                                        name="select11"
                                                        type="select"
                                                        containerClass="mb-1"
                                                        className="form-select"
                                                        onChange={changeThirdCompetitor1}
                                                        selected={thirdCompetitor1}>
                                                        <option disabled={thirdCheck1}>select competitor</option>
                                                        {/* {competitors1.map((index) => (
                                            index.ProductId === promoProductName[2] ? (
                                                <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option>
                                            ): null
                                        ))} */}
                                                        {competitors3.map((index) => (
                                                            <option value={index.CompetitorId} key={index.CompetitorId}>
                                                                {index.CompetitorName}
                                                            </option>
                                                        ))}
                                                    </FormInput>
                                                    {invisible3 > 0 ? (
                                                        <FormInput
                                                            name="select12"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeThirdCompetitor2}
                                                            selected={thirdCompetitor2}>
                                                            <option disabled={thirdCheck2}>select competitor</option>
                                                            {competitors3
                                                                .filter(
                                                                    (obj) =>
                                                                        !thirdCompetitor1.includes(obj.CompetitorName)
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[2] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                            <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible3 > 1 ? (
                                                        <FormInput
                                                            name="select13"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeThirdCompetitor3}
                                                            selected={thirdCompetitor3}>
                                                            <option disabled={thirdCheck3}>select competitor</option>
                                                            {competitors3
                                                                .filter(
                                                                    (obj) =>
                                                                        !sumThirdCompetitor1.includes(
                                                                            obj.CompetitorName
                                                                        )
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[2] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                            <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible3 > 2 ? (
                                                        <FormInput
                                                            name="select14"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeThirdCompetitor4}
                                                            selected={thirdCompetitor4}>
                                                            <option disabled={thirdCheck4}>select competitor</option>
                                                            {competitors3
                                                                .filter(
                                                                    (obj) =>
                                                                        !sumThirdCompetitor2.includes(
                                                                            obj.CompetitorName
                                                                        )
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[2] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                            <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                </Col>
                                                <Col lg={3}>
                                                    <h5
                                                        className={
                                                            100 - sum3 < 0
                                                                ? 'text-center text-danger'
                                                                : 100 - sum3 === 0
                                                                ? 'text-center text-success'
                                                                : 'text-center'
                                                        }>
                                                        {100 - sum3 + ' %'}
                                                    </h5>
                                                    <FormInput
                                                        type="number"
                                                        name="number6"
                                                        containerClass={'mb-1'}
                                                        disabled={!thirdCheck1}
                                                        placeholder={thirdInput1}
                                                        onChange={thirdInputChange1}
                                                    />
                                                    {invisible3 > 0 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number9"
                                                            containerClass={'mb-1'}
                                                            disabled={!thirdCheck2}
                                                            placeholder={thirdInput2}
                                                            onChange={thirdInputChange2}
                                                        />
                                                    ) : null}
                                                    {invisible3 > 1 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number10"
                                                            containerClass={'mb-1'}
                                                            disabled={!thirdCheck3}
                                                            placeholder={thirdInput3}
                                                            onChange={thirdInputChange3}
                                                        />
                                                    ) : null}
                                                    {invisible3 > 2 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number11"
                                                            containerClass={'mb-1'}
                                                            disabled={!thirdCheck4}
                                                            placeholder={thirdInput4}
                                                            onChange={thirdInputChange4}
                                                        />
                                                    ) : null}
                                                </Col>
                                            </Row>
                                        ) : null}
                                        {nonePromoProduct[0] != null ? (
                                            <Row className="px-3 pt-2">
                                                <Col lg={9}>
                                                    <h5>{nonePromoProduct.map((index) => index + ' ')}</h5>
                                                    <FormInput
                                                        name="select15"
                                                        type="select"
                                                        containerClass="mb-1"
                                                        className="form-select"
                                                        onChange={changeFourthCompetitor1}
                                                        selected={fourthCompetitor1}>
                                                        <option disabled={fourthCheck1}>select competitor</option>
                                                        {competitors4.map((index) =>
                                                            index.ProductId === nonePromoProductName[0] ||
                                                            index.ProductId === nonePromoProductName[1] ||
                                                            index.ProductId === nonePromoProductName[2] ? (
                                                                <option
                                                                    value={index.CompetitorId}
                                                                    key={index.CompetitorId}>
                                                                    {index.CompetitorName}
                                                                </option>
                                                            ) : null
                                                        )}
                                                    </FormInput>
                                                    {invisible4 > 0 ? (
                                                        <FormInput
                                                            name="select16"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeFourthCompetitor2}
                                                            selected={fourthCompetitor2}>
                                                            <option disabled={fourthCheck2}>select competitor</option>
                                                            {competitors4
                                                                .filter(
                                                                    (obj) =>
                                                                        !fourthCompetitor1.includes(obj.CompetitorName)
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === nonePromoProductName[2] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible4 > 1 ? (
                                                        <FormInput
                                                            name="select17"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeFourthCompetitor3}
                                                            selected={fourthCompetitor3}>
                                                            <option disabled={fourthCheck3}>select competitor</option>
                                                            <option id={1}>select1</option>
                                                            <option id={2}>select2</option>
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible4 > 2 ? (
                                                        <FormInput
                                                            name="select18"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeFourthCompetitor4}
                                                            selected={fourthCompetitor4}>
                                                            <option disabled={fourthCheck4}>select competitor</option>
                                                            <option id={1}>select1</option>
                                                            <option id={2}>select2</option>
                                                        </FormInput>
                                                    ) : null}
                                                </Col>
                                                <Col lg={3}>
                                                    <h5
                                                        className={
                                                            100 - sum4 < 0
                                                                ? 'text-center text-danger'
                                                                : 100 - sum4 === 0
                                                                ? 'text-center text-success'
                                                                : 'text-center'
                                                        }>
                                                        {100 - sum4 + ' %'}
                                                    </h5>
                                                    <FormInput
                                                        type="number"
                                                        name="number6"
                                                        containerClass={'mb-1'}
                                                        disabled={!fourthCheck1}
                                                        placeholder={fourthInput1}
                                                        onChange={fourthInputChange1}
                                                    />
                                                    {invisible4 > 0 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number9"
                                                            containerClass={'mb-1'}
                                                            disabled={!fourthCheck2}
                                                            placeholder={fourthInput2}
                                                            onChange={fourthInputChange2}
                                                        />
                                                    ) : null}
                                                    {invisible4 > 1 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number10"
                                                            containerClass={'mb-1'}
                                                            disabled={!fourthCheck3}
                                                            placeholder={fourthInput3}
                                                            onChange={fourthInputChange3}
                                                        />
                                                    ) : null}
                                                    {invisible4 > 2 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number11"
                                                            containerClass={'mb-1'}
                                                            disabled={!fourthCheck4}
                                                            placeholder={fourthInput4}
                                                            onChange={fourthInputChange4}
                                                        />
                                                    ) : null}
                                                </Col>
                                            </Row>
                                        ) : null}
                                    </div>
                                </>
                            ) : null}
                            {changePage === 6 && activityTypeName === 'Clinic Visit' ? (
                                <>
                                    <Row className="px-3">
                                        <Col>
                                            <h5 className="success-of-visit-title">{selectPromoName[0].label}</h5>
                                        </Col>
                                    </Row>
                                    <Row className="px-3">
                                        <Col className={appStatus === 4 ? 'pb-2-star' : 'pb-2'}>
                                            {[...Array(10)].map((star, i) => {
                                                const ratingValue = (i + 1) * 10;
                                                const key = i + 11;
                                                return (
                                                    <label key={key}>
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            className="starInput"
                                                            value={ratingValue}
                                                            onClick={() => setFirstRating(ratingValue)}
                                                        />
                                                        <FaStar
                                                            className="rating-cont"
                                                            //#ffc107
                                                            color={
                                                                ratingValue <= (firstHover || firstRating)
                                                                    ? '#ffc107'
                                                                    : '#e4e5e9'
                                                            }
                                                            onMouseEnter={() => setFirstHover(ratingValue)}
                                                            onMouseLeave={() => setFirstHover(null)}
                                                        />
                                                    </label>
                                                );
                                            })}
                                            <span className="rt-number">
                                                {firstHover === null ? firstRating : firstHover}%
                                            </span>
                                        </Col>
                                    </Row>
                                    {selectPromoName[1] ? (
                                        <>
                                            <Row className="px-3 rating-main-cont">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectPromoName[1].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3">
                                                <Col className={appStatus === 4 ? 'pb-2-star' : 'pb-2'}>
                                                    {[...Array(10)].map((star, i) => {
                                                        const ratingValue = (i + 1) * 10;
                                                        const key = i + 11;
                                                        return (
                                                            <label key={key}>
                                                                <input
                                                                    type="radio"
                                                                    name="rating2"
                                                                    className="starInput"
                                                                    value={ratingValue}
                                                                    onClick={() => setSecondRating(ratingValue)}
                                                                />
                                                                <FaStar
                                                                    className="rating-cont"
                                                                    key={key}
                                                                    color={
                                                                        ratingValue <= (secondHover || secondRating)
                                                                            ? '#ffc107'
                                                                            : '#e4e5e9'
                                                                    }
                                                                    onMouseEnter={() => setSecondHover(ratingValue)}
                                                                    onMouseLeave={() => setSecondHover(null)}
                                                                />
                                                            </label>
                                                        );
                                                    })}
                                                    <span className="rt-number">
                                                        {secondHover === null ? secondRating : secondHover}%
                                                    </span>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {selectPromoName[2] ? (
                                        <>
                                            <Row className="px-3 rating-main-cont">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectPromoName[2].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3">
                                                <Col className={appStatus === 4 ? 'pb-2-star' : 'pb-2'}>
                                                    {[...Array(10)].map((star, i) => {
                                                        const ratingValue = (i + 1) * 10;
                                                        const key = i + 11;
                                                        return (
                                                            <label key={key}>
                                                                <input
                                                                    type="radio"
                                                                    name="rating3"
                                                                    className="starInput"
                                                                    value={ratingValue}
                                                                    onClick={() => setThirdRating(ratingValue)}
                                                                />
                                                                <FaStar
                                                                    className="rating-cont"
                                                                    color={
                                                                        ratingValue <= (thirdHover || thirdRating)
                                                                            ? '#ffc107'
                                                                            : '#e4e5e9'
                                                                    }
                                                                    onMouseEnter={() => setThirdHover(ratingValue)}
                                                                    onMouseLeave={() => setThirdHover(null)}
                                                                />
                                                            </label>
                                                        );
                                                    })}
                                                    <span className="rt-number">
                                                        {thirdHover === null ? thirdRating : thirdHover}%
                                                    </span>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {selectNonPromoName[0] ? (
                                        <>
                                            <Row className="px-3 rating-main-cont">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectNonPromoName[0].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3">
                                                {/* px-3 start */}
                                                <Col className={appStatus === 4 ? 'pb-2-star' : 'pb-2'}>
                                                    {[...Array(10)].map((star, i) => {
                                                        const ratingValue = (i + 1) * 10;
                                                        const key = i + 11;
                                                        return (
                                                            <label key={key}>
                                                                <input
                                                                    type="radio"
                                                                    name="rating4"
                                                                    className="starInput"
                                                                    value={ratingValue}
                                                                    key={ratingValue}
                                                                    onClick={() => setFourthRating(ratingValue)}
                                                                />
                                                                <FaStar
                                                                    className="rating-cont"
                                                                    value={fourthRating}
                                                                    key={key}
                                                                    color={
                                                                        ratingValue <= (fourthHover || fourthRating)
                                                                            ? '#ffc107'
                                                                            : '#e4e5e9'
                                                                    }
                                                                    onMouseEnter={() => setFourthHover(ratingValue)}
                                                                    onMouseLeave={() => setFourthHover(null)}
                                                                />
                                                            </label>
                                                        );
                                                    })}
                                                    <span className="rt-number">
                                                        {fourthHover === null ? fourthRating : fourthHover}%
                                                    </span>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {selectNonPromoName[1] ? (
                                        <>
                                            <Row className="px-3 rating-main-cont">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectNonPromoName[1].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3">
                                                <Col className={appStatus === 4 ? 'pb-2-star' : 'pb-2'}>
                                                    {[...Array(10)].map((star, i) => {
                                                        const ratingValue = (i + 1) * 10;
                                                        const key = i + 11;
                                                        return (
                                                            <label key={key}>
                                                                <input
                                                                    type="radio"
                                                                    name="rating2"
                                                                    className="starInput"
                                                                    value={ratingValue}
                                                                    onClick={() => setFifthRating(ratingValue)}
                                                                />
                                                                <FaStar
                                                                    className="rating-cont"
                                                                    key={key}
                                                                    color={
                                                                        ratingValue <= (fifthHover || fifthRating)
                                                                            ? '#ffc107'
                                                                            : '#e4e5e9'
                                                                    }
                                                                    onMouseEnter={() => setFifthHover(ratingValue)}
                                                                    onMouseLeave={() => setFifthHover(null)}
                                                                />
                                                            </label>
                                                        );
                                                    })}
                                                    <span className="rt-number">
                                                        {fifthHover === null ? fifthRating : fifthHover}%
                                                    </span>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                    {selectNonPromoName[2] ? (
                                        <>
                                            <Row className="px-3 rating-main-cont">
                                                <Col>
                                                    <h5 className="success-of-visit-title">
                                                        {selectNonPromoName[2].label}
                                                    </h5>
                                                </Col>
                                            </Row>
                                            <Row className="px-3">
                                                <Col className={appStatus === 4 ? 'pb-2-star' : 'pb-2'}>
                                                    {[...Array(10)].map((star, i) => {
                                                        const ratingValue = (i + 1) * 10;
                                                        const key = i + 11;
                                                        return (
                                                            <label key={key}>
                                                                <input
                                                                    type="radio"
                                                                    name="rating2"
                                                                    className="starInput"
                                                                    value={ratingValue}
                                                                    onClick={() => setSixthRating(ratingValue)}
                                                                />
                                                                <FaStar
                                                                    className="rating-cont"
                                                                    key={key}
                                                                    color={
                                                                        ratingValue <= (sixthHover || sixthRating)
                                                                            ? '#ffc107'
                                                                            : '#e4e5e9'
                                                                    }
                                                                    onMouseEnter={() => setSixthHover(ratingValue)}
                                                                    onMouseLeave={() => setSixthHover(null)}
                                                                />
                                                            </label>
                                                        );
                                                    })}
                                                    <span className="rt-number">
                                                        {sixthHover === null ? sixthRating : sixthHover}%
                                                    </span>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                </>
                            ) : null}
                            {changePage === 7 ? (
                                <>
                                    <div className="competitor-cont-scrollbar">
                                        <Row className="px-3">
                                            <Col lg={9}>
                                                <h5>{selectPromoName[0].label}</h5>
                                                {appStatus === 4 ? (
                                                    <FormInput
                                                        name="select3"
                                                        type="select"
                                                        containerClass="mb-1"
                                                        className="form-select">
                                                        {newCompetitors.length === 0 ? (
                                                            <option>select competitor</option>
                                                        ) : (
                                                            <option>{newCompetitors[0]}</option>
                                                        )}
                                                    </FormInput>
                                                ) : (
                                                    <FormInput
                                                        name="select3"
                                                        type="select"
                                                        containerClass="mb-1"
                                                        className="form-select"
                                                        onChange={changeCompetitor1}
                                                        selected={competitor1}>
                                                        <option disabled={firstCheck1}>select competitor</option>

                                                        {competitors1.map((index) => (
                                                            <option value={index.CompetitorId} key={index.CompetitorId}>
                                                                {index.CompetitorName}
                                                            </option>
                                                        ))}
                                                    </FormInput>
                                                )}
                                                {invisible > 0 ? (
                                                    appStatus === 4 ? (
                                                        <FormInput
                                                            name="select3"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select">
                                                            <option>{newCompetitors[1]}</option>
                                                        </FormInput>
                                                    ) : (
                                                        <FormInput
                                                            name="select4"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeCompetitor2}
                                                            selected={competitor2}>
                                                            <option disabled={firstCheck2}>select competitor</option>
                                                            {competitors1
                                                                .filter(
                                                                    (obj) => !competitor1.includes(obj.CompetitorName)
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[0] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}

                                                            {/* {competitors1.map((index) => (
                                                    <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option>
                                                 ))} */}
                                                        </FormInput>
                                                    )
                                                ) : null}
                                                {invisible > 1 ? (
                                                    appStatus === 4 ? (
                                                        <FormInput
                                                            name="select3"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select">
                                                            <option>{newCompetitors[2]}</option>
                                                        </FormInput>
                                                    ) : (
                                                        <FormInput
                                                            name="select5"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeCompetitor3}
                                                            selected={competitor3}>
                                                            <option disabled={firstCheck3}>select competitor</option>
                                                            {competitors1
                                                                .filter(
                                                                    (obj) =>
                                                                        !firstCompetitor1.includes(obj.CompetitorName)
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[0] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                    <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option>
                                                 ))} */}
                                                        </FormInput>
                                                    )
                                                ) : null}
                                                {invisible > 2 ? (
                                                    appStatus === 4 ? (
                                                        <FormInput
                                                            name="select3"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select">
                                                            <option>{newCompetitors[3]}</option>
                                                        </FormInput>
                                                    ) : (
                                                        <FormInput
                                                            name="select6"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeCompetitor4}
                                                            selected={competitor4}>
                                                            <option disabled={firstCheck4}>select competitor</option>
                                                            {competitors1
                                                                .filter(
                                                                    (obj) =>
                                                                        !firstCompetitor2.includes(obj.CompetitorName)
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[0] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                    <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option>
                                                 ))} */}
                                                        </FormInput>
                                                    )
                                                ) : null}
                                            </Col>
                                            <Col lg={3}>
                                                <h5
                                                    className={
                                                        100 - sum1 < 0
                                                            ? 'text-center text-danger'
                                                            : 100 - sum1 === 0
                                                            ? 'text-center text-success'
                                                            : 'text-center'
                                                    }>
                                                    {100 - sum1 + ' %'}
                                                </h5>
                                                {appStatus === 4 ? (
                                                    <FormInput
                                                        className="compatitor-input"
                                                        min={0}
                                                        max={100}
                                                        type="number"
                                                        name="number"
                                                        containerClass={'mb-1'}
                                                        disabled={newCompetitors.length === 0 ? !firstCheck1 : false}
                                                        value={
                                                            newCompetitors.length === 0
                                                                ? firstInput1
                                                                : newCompetitorsPercent[0]
                                                        }
                                                    />
                                                ) : (
                                                    <FormInput
                                                        className="compatitor-input"
                                                        min={0}
                                                        max={100}
                                                        type="number"
                                                        name="number"
                                                        containerClass={'mb-1'}
                                                        disabled={!firstCheck1}
                                                        placeholder={firstInput1}
                                                        onChange={firstInputChange1}
                                                    />
                                                )}
                                                {invisible > 0 ? (
                                                    appStatus === 4 ? (
                                                        <FormInput
                                                            className="compatitor-input"
                                                            min={0}
                                                            max={100}
                                                            type="number"
                                                            name="number"
                                                            containerClass={'mb-1'}
                                                            value={newCompetitorsPercent[1]}
                                                        />
                                                    ) : (
                                                        <FormInput
                                                            min={0}
                                                            max={100}
                                                            type="number"
                                                            name="number1"
                                                            containerClass={'mb-1'}
                                                            disabled={!firstCheck2}
                                                            placeholder={firstInput2}
                                                            onChange={firstInputChange2}
                                                        />
                                                    )
                                                ) : null}
                                                {invisible > 1 ? (
                                                    appStatus === 4 ? (
                                                        <FormInput
                                                            className="compatitor-input"
                                                            min={0}
                                                            max={100}
                                                            type="number"
                                                            name="number"
                                                            containerClass={'mb-1'}
                                                            value={newCompetitorsPercent[2]}
                                                        />
                                                    ) : (
                                                        <FormInput
                                                            min={0}
                                                            max={100}
                                                            type="number"
                                                            name="number2"
                                                            containerClass={'mb-1'}
                                                            disabled={!firstCheck3}
                                                            placeholder={firstInput3}
                                                            onChange={firstInputChange3}
                                                        />
                                                    )
                                                ) : null}
                                                {invisible > 2 ? (
                                                    appStatus === 4 ? (
                                                        <FormInput
                                                            className="compatitor-input"
                                                            min={0}
                                                            max={100}
                                                            type="number"
                                                            name="number"
                                                            containerClass={'mb-1'}
                                                            value={newCompetitorsPercent[3]}
                                                        />
                                                    ) : (
                                                        <FormInput
                                                            min={0}
                                                            max={100}
                                                            type="number"
                                                            name="number3"
                                                            containerClass={'mb-1'}
                                                            disabled={!firstCheck4}
                                                            placeholder={firstInput4}
                                                            onChange={firstInputChange4}
                                                        />
                                                    )
                                                ) : null}
                                            </Col>
                                        </Row>
                                        {selectPromoName[1] ? (
                                            <Row className="px-3 pt-2">
                                                <Col lg={9}>
                                                    <h5>{selectPromoName[1].label}</h5>
                                                    <FormInput
                                                        name="select7"
                                                        type="select"
                                                        containerClass="mb-1"
                                                        className="form-select"
                                                        onChange={changeSecondCompetitor1}
                                                        selected={secondCompetitor1}>
                                                        <option disabled={secondCheck1}>select competitor</option>
                                                        {/* {competitors1.map((index) => (
                                                    index.ProductId === promoProductName[1] ? (
                                                        <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option>
                                                    ): null */}
                                                        {competitors2.map((index) => (
                                                            <option value={index.CompetitorId} key={index.CompetitorId}>
                                                                {index.CompetitorName}
                                                            </option>
                                                        ))}
                                                        ))}
                                                    </FormInput>
                                                    {invisible2 > 0 ? (
                                                        <FormInput
                                                            name="select8"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeSecondCompetitor2}
                                                            selected={secondCompetitor2}>
                                                            <option disabled={secondCheck2}>select competitor</option>
                                                            {competitors2
                                                                .filter(
                                                                    (obj) =>
                                                                        !secondCompetitor1.includes(obj.CompetitorName)
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[1] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                    <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible2 > 1 ? (
                                                        <FormInput
                                                            name="select9"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeSecondCompetitor3}
                                                            selected={secondCompetitor3}>
                                                            <option disabled={secondCheck3}>select competitor</option>
                                                            {competitors2
                                                                .filter(
                                                                    (obj) =>
                                                                        !sumSecondCompetitor1.includes(
                                                                            obj.CompetitorName
                                                                        )
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[1] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                    <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible2 > 2 ? (
                                                        <FormInput
                                                            name="select10"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeSecondCompetitor4}
                                                            selected={secondCompetitor4}>
                                                            <option disabled={secondCheck4}>select competitor</option>
                                                            {competitors2
                                                                .filter(
                                                                    (obj) =>
                                                                        !sumSecondCompetitor2.includes(
                                                                            obj.CompetitorName
                                                                        )
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[1] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                    <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                </Col>
                                                <Col lg={3}>
                                                    <h5
                                                        className={
                                                            100 - sum2 < 0
                                                                ? 'text-center text-danger'
                                                                : 100 - sum2 === 0
                                                                ? 'text-center text-success'
                                                                : 'text-center'
                                                        }>
                                                        {100 - sum2 + ' %'}
                                                    </h5>
                                                    <FormInput
                                                        type="number"
                                                        name="number4"
                                                        containerClass={'mb-1'}
                                                        disabled={!secondCheck1}
                                                        placeholder={secondInput1}
                                                        onChange={secondInputChange1}
                                                    />
                                                    {invisible2 > 0 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number5"
                                                            containerClass={'mb-1'}
                                                            disabled={!secondCheck2}
                                                            placeholder={secondInput2}
                                                            onChange={secondInputChange2}
                                                        />
                                                    ) : null}
                                                    {invisible2 > 1 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number6"
                                                            containerClass={'mb-1'}
                                                            disabled={!secondCheck3}
                                                            placeholder={secondInput3}
                                                            onChange={secondInputChange3}
                                                        />
                                                    ) : null}
                                                    {invisible2 > 2 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number7"
                                                            containerClass={'mb-1'}
                                                            disabled={!secondCheck4}
                                                            placeholder={secondInput4}
                                                            onChange={secondInputChange4}
                                                        />
                                                    ) : null}
                                                </Col>
                                            </Row>
                                        ) : null}
                                        {selectPromoName[2] ? (
                                            <Row className="px-3 pt-2">
                                                <Col lg={9}>
                                                    <h5>{selectPromoName[2].label}</h5>
                                                    <FormInput
                                                        name="select11"
                                                        type="select"
                                                        containerClass="mb-1"
                                                        className="form-select"
                                                        onChange={changeThirdCompetitor1}
                                                        selected={thirdCompetitor1}>
                                                        <option disabled={thirdCheck1}>select competitor</option>
                                                        {/* {competitors1.map((index) => (
                                                    index.ProductId === promoProductName[2] ? (
                                                        <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option>
                                                    ): null
                                                ))} */}
                                                        {competitors3.map((index) => (
                                                            <option value={index.CompetitorId} key={index.CompetitorId}>
                                                                {index.CompetitorName}
                                                            </option>
                                                        ))}
                                                    </FormInput>
                                                    {invisible3 > 0 ? (
                                                        <FormInput
                                                            name="select12"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeThirdCompetitor2}
                                                            selected={thirdCompetitor2}>
                                                            <option disabled={thirdCheck2}>select competitor</option>
                                                            {competitors3
                                                                .filter(
                                                                    (obj) =>
                                                                        !thirdCompetitor1.includes(obj.CompetitorName)
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[2] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                    <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible3 > 1 ? (
                                                        <FormInput
                                                            name="select13"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeThirdCompetitor3}
                                                            selected={thirdCompetitor3}>
                                                            <option disabled={thirdCheck3}>select competitor</option>
                                                            {competitors3
                                                                .filter(
                                                                    (obj) =>
                                                                        !sumThirdCompetitor1.includes(
                                                                            obj.CompetitorName
                                                                        )
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[2] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                    <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible3 > 2 ? (
                                                        <FormInput
                                                            name="select14"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeThirdCompetitor4}
                                                            selected={thirdCompetitor4}>
                                                            <option disabled={thirdCheck4}>select competitor</option>
                                                            {competitors3
                                                                .filter(
                                                                    (obj) =>
                                                                        !sumThirdCompetitor2.includes(
                                                                            obj.CompetitorName
                                                                        )
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === promoProductName[2] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                    <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                </Col>
                                                <Col lg={3}>
                                                    <h5
                                                        className={
                                                            100 - sum3 < 0
                                                                ? 'text-center text-danger'
                                                                : 100 - sum3 === 0
                                                                ? 'text-center text-success'
                                                                : 'text-center'
                                                        }>
                                                        {100 - sum3 + ' %'}
                                                    </h5>
                                                    <FormInput
                                                        type="number"
                                                        name="number6"
                                                        containerClass={'mb-1'}
                                                        disabled={!thirdCheck1}
                                                        placeholder={thirdInput1}
                                                        onChange={thirdInputChange1}
                                                    />
                                                    {invisible3 > 0 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number9"
                                                            containerClass={'mb-1'}
                                                            disabled={!thirdCheck2}
                                                            placeholder={thirdInput2}
                                                            onChange={thirdInputChange2}
                                                        />
                                                    ) : null}
                                                    {invisible3 > 1 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number10"
                                                            containerClass={'mb-1'}
                                                            disabled={!thirdCheck3}
                                                            placeholder={thirdInput3}
                                                            onChange={thirdInputChange3}
                                                        />
                                                    ) : null}
                                                    {invisible3 > 2 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number11"
                                                            containerClass={'mb-1'}
                                                            disabled={!thirdCheck4}
                                                            placeholder={thirdInput4}
                                                            onChange={thirdInputChange4}
                                                        />
                                                    ) : null}
                                                </Col>
                                            </Row>
                                        ) : null}
                                        {selectNonPromoName[0] ? (
                                            <Row className="px-3 pt-2">
                                                <Col lg={9}>
                                                    <h5>{selectNonPromoName[0].label}</h5>
                                                    <FormInput
                                                        name="select11"
                                                        type="select"
                                                        containerClass="mb-1"
                                                        className="form-select"
                                                        onChange={changeFourthCompetitor1}
                                                        selected={fourthCompetitor1}>
                                                        <option disabled={fourthCheck1}>select competitor</option>
                                                        {/* {competitors1.map((index) => (
                                                    index.ProductId === promoProductName[2] ? (
                                                        <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option>
                                                    ): null
                                                ))} */}
                                                        {competitors4.map((index) => (
                                                            <option value={index.CompetitorId} key={index.CompetitorId}>
                                                                {index.CompetitorName}
                                                            </option>
                                                        ))}
                                                    </FormInput>
                                                    {invisible3 > 0 ? (
                                                        <FormInput
                                                            name="select12"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeFourthCompetitor2}
                                                            selected={fourthCompetitor2}>
                                                            <option disabled={fourthCheck2}>select competitor</option>
                                                            {competitors4
                                                                .filter(
                                                                    (obj) =>
                                                                        !fourthCompetitor1.includes(obj.CompetitorName)
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === nonePromoProductName[0] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                    <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible3 > 1 ? (
                                                        <FormInput
                                                            name="select13"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeFourthCompetitor3}
                                                            selected={fourthCompetitor3}>
                                                            <option disabled={fourthCheck3}>select competitor</option>
                                                            {competitors4
                                                                .filter(
                                                                    (obj) =>
                                                                        !sumFourCompetitor1.includes(obj.CompetitorName)
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === nonePromoProductName[0] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                    <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible3 > 2 ? (
                                                        <FormInput
                                                            name="select14"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeFourthCompetitor4}
                                                            selected={fourthCompetitor4}>
                                                            <option disabled={fourthCheck4}>select competitor</option>
                                                            {competitors4
                                                                .filter(
                                                                    (obj) =>
                                                                        !sumFourCompetitor2.includes(obj.CompetitorName)
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === nonePromoProductName[0] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                    <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                </Col>
                                                <Col lg={3}>
                                                    <h5
                                                        className={
                                                            100 - sum4 < 0
                                                                ? 'text-center text-danger'
                                                                : 100 - sum4 === 0
                                                                ? 'text-center text-success'
                                                                : 'text-center'
                                                        }>
                                                        {100 - sum4 + ' %'}
                                                    </h5>
                                                    <FormInput
                                                        type="number"
                                                        name="number6"
                                                        containerClass={'mb-1'}
                                                        disabled={!fourthCheck1}
                                                        placeholder={fourthInput1}
                                                        onChange={fourthInputChange1}
                                                    />
                                                    {invisible3 > 0 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number9"
                                                            containerClass={'mb-1'}
                                                            disabled={!fourthCheck2}
                                                            placeholder={fourthInput2}
                                                            onChange={fourthInputChange2}
                                                        />
                                                    ) : null}
                                                    {invisible3 > 1 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number10"
                                                            containerClass={'mb-1'}
                                                            disabled={!fourthCheck3}
                                                            placeholder={fourthInput3}
                                                            onChange={fourthInputChange3}
                                                        />
                                                    ) : null}
                                                    {invisible3 > 2 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number11"
                                                            containerClass={'mb-1'}
                                                            disabled={!fourthCheck4}
                                                            placeholder={fourthInput4}
                                                            onChange={fourthInputChange4}
                                                        />
                                                    ) : null}
                                                </Col>
                                            </Row>
                                        ) : null}
                                        {selectNonPromoName[1] ? (
                                            <Row className="px-3 pt-2">
                                                <Col lg={9}>
                                                    <h5>{selectNonPromoName[1].label}</h5>
                                                    <FormInput
                                                        name="select11"
                                                        type="select"
                                                        containerClass="mb-1"
                                                        className="form-select"
                                                        onChange={changeFifthCompetitor1}
                                                        selected={fifthCompetitor1}>
                                                        <option disabled={fifthCheck1}>select competitor</option>
                                                        {/* {competitors1.map((index) => (
                                                        index.ProductId === promoProductName[2] ? (
                                                            <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option>
                                                        ): null
                                                    ))} */}
                                                        {competitors5.map((index) => (
                                                            <option value={index.CompetitorId} key={index.CompetitorId}>
                                                                {index.CompetitorName}
                                                            </option>
                                                        ))}
                                                    </FormInput>
                                                    {invisible3 > 0 ? (
                                                        <FormInput
                                                            name="select12"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeFifthCompetitor2}
                                                            selected={fifthCompetitor2}>
                                                            <option disabled={fifthCheck2}>select competitor</option>
                                                            {competitors5
                                                                .filter(
                                                                    (obj) =>
                                                                        !fifthCompetitor1.includes(obj.CompetitorName)
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === nonePromoProductName[1] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                        <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible3 > 1 ? (
                                                        <FormInput
                                                            name="select13"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeFifthCompetitor3}
                                                            selected={fifthCompetitor3}>
                                                            <option disabled={fifthCheck3}>select competitor</option>
                                                            {competitors5
                                                                .filter(
                                                                    (obj) =>
                                                                        !sumFifthCompetitor1.includes(
                                                                            obj.CompetitorName
                                                                        )
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === nonePromoProductName[1] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                        <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible3 > 2 ? (
                                                        <FormInput
                                                            name="select14"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeFifthCompetitor4}
                                                            selected={fifthCompetitor4}>
                                                            <option disabled={fifthCheck4}>select competitor</option>
                                                            {competitors5
                                                                .filter(
                                                                    (obj) =>
                                                                        !sumFifthCompetitor2.includes(
                                                                            obj.CompetitorName
                                                                        )
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === nonePromoProductName[1] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                        <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                </Col>
                                                <Col lg={3}>
                                                    <h5
                                                        className={
                                                            100 - sum5 < 0
                                                                ? 'text-center text-danger'
                                                                : 100 - sum5 === 0
                                                                ? 'text-center text-success'
                                                                : 'text-center'
                                                        }>
                                                        {100 - sum5 + ' %'}
                                                    </h5>
                                                    <FormInput
                                                        type="number"
                                                        name="number6"
                                                        containerClass={'mb-1'}
                                                        disabled={!fifthCheck1}
                                                        placeholder={fifthInput1}
                                                        onChange={fifthInputChange1}
                                                    />
                                                    {invisible3 > 0 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number9"
                                                            containerClass={'mb-1'}
                                                            disabled={!fifthCheck2}
                                                            placeholder={fifthInput2}
                                                            onChange={fifthInputChange2}
                                                        />
                                                    ) : null}
                                                    {invisible3 > 1 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number10"
                                                            containerClass={'mb-1'}
                                                            disabled={!fifthCheck3}
                                                            placeholder={fifthInput3}
                                                            onChange={fifthInputChange3}
                                                        />
                                                    ) : null}
                                                    {invisible3 > 2 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number11"
                                                            containerClass={'mb-1'}
                                                            disabled={!fifthCheck4}
                                                            placeholder={fifthInput4}
                                                            onChange={fifthInputChange4}
                                                        />
                                                    ) : null}
                                                </Col>
                                            </Row>
                                        ) : null}
                                        {selectNonPromoName[2] ? (
                                            <Row className="px-3 pt-2">
                                                <Col lg={9}>
                                                    <h5>{selectNonPromoName[2].label}</h5>
                                                    <FormInput
                                                        name="select11"
                                                        type="select"
                                                        containerClass="mb-1"
                                                        className="form-select"
                                                        onChange={changeSixthCompetitor1}
                                                        selected={sixthCompetitor1}>
                                                        <option disabled={sixthCheck1}>select competitor</option>
                                                        {/* {competitors1.map((index) => (
                                                index.ProductId === promoProductName[2] ? (
                                                    <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option>
                                                ): null
                                            ))} */}
                                                        {competitors6.map((index) => (
                                                            <option value={index.CompetitorId} key={index.CompetitorId}>
                                                                {index.CompetitorName}
                                                            </option>
                                                        ))}
                                                    </FormInput>
                                                    {invisible3 > 0 ? (
                                                        <FormInput
                                                            name="select12"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeSixthCompetitor2}
                                                            selected={sixthCompetitor2}>
                                                            <option disabled={sixthCheck2}>select competitor</option>
                                                            {competitors6
                                                                .filter(
                                                                    (obj) =>
                                                                        !sixthCompetitor1.includes(obj.CompetitorName)
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === nonePromoProductName[2] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible3 > 1 ? (
                                                        <FormInput
                                                            name="select13"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeSixthCompetitor3}
                                                            selected={sixthCompetitor3}>
                                                            <option disabled={sixthCheck3}>select competitor</option>
                                                            {competitors6
                                                                .filter(
                                                                    (obj) =>
                                                                        !sumSixthCompetitor1.includes(
                                                                            obj.CompetitorName
                                                                        )
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === nonePromoProductName[2] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                    {invisible3 > 2 ? (
                                                        <FormInput
                                                            name="select14"
                                                            type="select"
                                                            containerClass="mb-1"
                                                            className="form-select"
                                                            onChange={changeSixthCompetitor4}
                                                            selected={sixthCompetitor4}>
                                                            <option disabled={sixthCheck4}>select competitor</option>
                                                            {competitors6
                                                                .filter(
                                                                    (obj) =>
                                                                        !sumSixthCompetitor2.includes(
                                                                            obj.CompetitorName
                                                                        )
                                                                )
                                                                .map((index) =>
                                                                    index.ProductId === nonePromoProductName[2] ? (
                                                                        <option
                                                                            value={index.CompetitorId}
                                                                            key={index.CompetitorId}>
                                                                            {index.CompetitorName}
                                                                        </option>
                                                                    ) : null
                                                                )}
                                                            {/* {competitors1.map((index) => (
                                                <option value={index.CompetitorId} key={index.CompetitorId}>{index.CompetitorName}</option> */}
                                                            ))}
                                                        </FormInput>
                                                    ) : null}
                                                </Col>
                                                <Col lg={3}>
                                                    <h5
                                                        className={
                                                            100 - sum6 < 0
                                                                ? 'text-center text-danger'
                                                                : 100 - sum6 === 0
                                                                ? 'text-center text-success'
                                                                : 'text-center'
                                                        }>
                                                        {100 - sum6 + ' %'}
                                                    </h5>
                                                    <FormInput
                                                        type="number"
                                                        name="number6"
                                                        containerClass={'mb-1'}
                                                        disabled={!sixthCheck1}
                                                        placeholder={sixthInput1}
                                                        onChange={sixthInputChange1}
                                                    />
                                                    {invisible3 > 0 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number9"
                                                            containerClass={'mb-1'}
                                                            disabled={!sixthCheck2}
                                                            placeholder={sixthInput2}
                                                            onChange={sixthInputChange2}
                                                        />
                                                    ) : null}
                                                    {invisible3 > 1 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number10"
                                                            containerClass={'mb-1'}
                                                            disabled={!sixthCheck3}
                                                            placeholder={sixthInput3}
                                                            onChange={sixthInputChange3}
                                                        />
                                                    ) : null}
                                                    {invisible3 > 2 ? (
                                                        <FormInput
                                                            type="number"
                                                            name="number11"
                                                            containerClass={'mb-1'}
                                                            disabled={!sixthCheck4}
                                                            placeholder={sixthInput4}
                                                            onChange={sixthInputChange4}
                                                        />
                                                    ) : null}
                                                </Col>
                                            </Row>
                                        ) : null}
                                    </div>
                                </>
                            ) : null}
                            {changePage === 8 ? (
                                <>
                                    <div className="competitor-cont-scrollbar">
                                        <Row className="px-3">
                                            <Col>
                                                <h5 className="success-of-visit-title">{selectPromoName[0].label}</h5>
                                            </Col>
                                        </Row>
                                        <Row className="px-4 pt-1">
                                            <Col lg={6} className="objection-cont1">
                                                <Form.Check
                                                    className="py-2"
                                                    type="checkbox"
                                                    id={objections1[0].id}
                                                    label={objections1[0].objectionName}
                                                    onChange={firstChangeSelectObjId1}
                                                    checked={objections1[0].selected}
                                                    disabled={appStatus === 4 ? true : false}
                                                />
                                            </Col>
                                            <Col lg={6} className="objection-cont2">
                                                <Form.Check
                                                    className="py-2"
                                                    type="checkbox"
                                                    id={objections1[1].id}
                                                    label={objections1[1].objectionName}
                                                    onChange={firstChangeSelectObjId2}
                                                    checked={objections1[1].selected}
                                                    disabled={appStatus === 4 ? true : false}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="px-4">
                                            <Col lg={6} className="objection-cont3">
                                                <Form.Check
                                                    className="py-2"
                                                    type="checkbox"
                                                    id={objections1[2].id}
                                                    label={objections1[2].objectionName}
                                                    onChange={firstChangeSelectObjId3}
                                                    checked={objections1[2].selected}
                                                    disabled={appStatus === 4 ? true : false}
                                                />
                                            </Col>
                                            <Col lg={6} className="objection-cont4">
                                                <Form.Check
                                                    className="py-2"
                                                    type="checkbox"
                                                    id={objections1[3].id}
                                                    label={objections1[3].objectionName}
                                                    onChange={firstChangeSelectObjId4}
                                                    checked={objections1[3].selected}
                                                    disabled={appStatus === 4 ? true : false}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="px-4">
                                            <Col lg={6} className="objection-cont5">
                                                <Form.Check
                                                    className="py-2"
                                                    type="checkbox"
                                                    id={objections1[4].id}
                                                    label={objections1[4].objectionName}
                                                    onChange={firstChangeSelectObjId5}
                                                    checked={objections1[4].selected}
                                                    disabled={appStatus === 4 ? true : false}
                                                />
                                            </Col>
                                            <Col lg={6} className="objection-cont6">
                                                <Form.Check
                                                    className="py-2"
                                                    type="checkbox"
                                                    id={objections1[5].id}
                                                    label={objections1[5].objectionName}
                                                    onChange={firstChangeSelectObjId6}
                                                    checked={objections1[5].selected}
                                                    disabled={appStatus === 4 ? true : false}
                                                />
                                            </Col>
                                        </Row>
                                        {selectPromoName[1] ? (
                                            <>
                                                <Row className="px-3 pt-2">
                                                    <Col>
                                                        <h5 className="success-of-visit-title">
                                                            {selectPromoName[1].label}
                                                        </h5>
                                                    </Col>
                                                </Row>
                                                <Row className="px-4 pt-1">
                                                    <Col lg={6} className="objection-cont1">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections2[0].id + 10}
                                                            label={objections2[0].objectionName}
                                                            onChange={secondChangeSelectObjId1}
                                                            checked={objections2[0].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont2">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections2[1].id + 10}
                                                            label={objections2[1].objectionName}
                                                            onChange={secondChangeSelectObjId2}
                                                            checked={objections2[1].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="px-4">
                                                    <Col lg={6} className="objection-cont3">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections2[2].id + 10}
                                                            label={objections2[2].objectionName}
                                                            onChange={secondChangeSelectObjId3}
                                                            checked={objections2[2].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont4">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections2[3].id + 10}
                                                            label={objections2[3].objectionName}
                                                            onChange={secondChangeSelectObjId4}
                                                            checked={objections2[3].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="px-4">
                                                    <Col lg={6} className="objection-cont5">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections2[4].id + 10}
                                                            label={objections2[4].objectionName}
                                                            onChange={secondChangeSelectObjId5}
                                                            checked={objections2[4].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont6">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections2[5].id + 10}
                                                            label={objections2[5].objectionName}
                                                            onChange={secondChangeSelectObjId6}
                                                            checked={objections2[5].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : null}
                                        {selectPromoName[2] ? (
                                            <>
                                                <Row className="px-3 pt-2">
                                                    <Col>
                                                        <h5 className="success-of-visit-title">
                                                            {selectPromoName[2].label}
                                                        </h5>
                                                    </Col>
                                                </Row>
                                                <Row className="px-4 pt-1">
                                                    <Col lg={6} className="objection-cont1">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections3[0].id + 20}
                                                            label={objections3[0].objectionName}
                                                            onChange={thirdChangeSelectObjId1}
                                                            checked={objections3[0].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont2">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections3[1].id + 20}
                                                            label={objections3[1].objectionName}
                                                            onChange={thirdChangeSelectObjId2}
                                                            checked={objections3[1].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="px-4">
                                                    <Col lg={6} className="objection-cont3">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections3[2].id + 20}
                                                            label={objections3[2].objectionName}
                                                            onChange={thirdChangeSelectObjId3}
                                                            checked={objections3[2].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont4">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections3[3].id + 20}
                                                            label={objections3[3].objectionName}
                                                            onChange={thirdChangeSelectObjId4}
                                                            checked={objections3[3].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="px-4">
                                                    <Col lg={6} className="objection-cont5">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections3[4].id + 20}
                                                            label={objections3[4].objectionName}
                                                            onChange={thirdChangeSelectObjId5}
                                                            checked={objections3[4].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont6">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections3[5].id + 20}
                                                            label={objections3[5].objectionName}
                                                            onChange={thirdChangeSelectObjId6}
                                                            checked={objections3[5].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : null}
                                        {selectNonPromoName[0] ? (
                                            <>
                                                <Row className="px-3 pt-2">
                                                    <Col>
                                                        <h5 className="success-of-visit-title">
                                                            {selectNonPromoName[0].label}
                                                        </h5>
                                                    </Col>
                                                </Row>
                                                <Row className="px-4 pt-1">
                                                    <Col lg={6} className="objection-cont1">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections4[0].id + 30}
                                                            label={objections4[0].objectionName}
                                                            onChange={fourthChangeSelectObjId1}
                                                            checked={objections4[0].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont2">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections4[1].id + 30}
                                                            label={objections4[1].objectionName}
                                                            onChange={fourthChangeSelectObjId2}
                                                            checked={objections4[1].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="px-4">
                                                    <Col lg={6} className="objection-cont3">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections4[2].id + 30}
                                                            label={objections4[2].objectionName}
                                                            onChange={fourthChangeSelectObjId3}
                                                            checked={objections4[2].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont4">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections4[3].id + 30}
                                                            label={objections4[3].objectionName}
                                                            onChange={fourthChangeSelectObjId4}
                                                            checked={objections4[3].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="px-4">
                                                    <Col lg={6} className="objection-cont5">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections4[4].id + 30}
                                                            label={objections4[4].objectionName}
                                                            onChange={fourthChangeSelectObjId5}
                                                            checked={objections4[4].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont6">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections4[5].id + 30}
                                                            label={objections4[5].objectionName}
                                                            onChange={fourthChangeSelectObjId6}
                                                            checked={objections4[5].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : null}
                                        {selectNonPromoName[1] ? (
                                            <>
                                                <Row className="px-3 pt-2">
                                                    <Col>
                                                        <h5 className="success-of-visit-title">
                                                            {selectNonPromoName[1].label}
                                                        </h5>
                                                    </Col>
                                                </Row>
                                                <Row className="px-4 pt-1">
                                                    <Col lg={6} className="objection-cont1">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections5[0].id + 40}
                                                            label={objections5[0].objectionName}
                                                            onChange={fifthChangeSelectObjId1}
                                                            checked={objections5[0].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont2">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections5[1].id + 40}
                                                            label={objections5[1].objectionName}
                                                            onChange={fifthChangeSelectObjId2}
                                                            checked={objections5[1].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="px-4">
                                                    <Col lg={6} className="objection-cont3">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections5[2].id + 40}
                                                            label={objections5[2].objectionName}
                                                            onChange={fifthChangeSelectObjId3}
                                                            checked={objections5[2].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont4">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections5[3].id + 40}
                                                            label={objections5[3].objectionName}
                                                            onChange={fifthChangeSelectObjId4}
                                                            checked={objections5[3].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="px-4">
                                                    <Col lg={6} className="objection-cont5">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections5[4].id + 40}
                                                            label={objections5[4].objectionName}
                                                            onChange={fifthChangeSelectObjId5}
                                                            checked={objections5[4].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont6">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections5[5].id + 40}
                                                            label={objections5[5].objectionName}
                                                            onChange={fifthChangeSelectObjId6}
                                                            checked={objections5[5].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : null}
                                        {selectNonPromoName[2] ? (
                                            <>
                                                <Row className="px-3 pt-2">
                                                    <Col>
                                                        <h5 className="success-of-visit-title">
                                                            {selectNonPromoName[2].label}
                                                        </h5>
                                                    </Col>
                                                </Row>
                                                <Row className="px-4 pt-1">
                                                    <Col lg={6} className="objection-cont1">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections6[0].id + 50}
                                                            label={objections6[0].objectionName}
                                                            onChange={sixthChangeSelectObjId1}
                                                            checked={objections6[0].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont2">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections6[1].id + 50}
                                                            label={objections6[1].objectionName}
                                                            onChange={sixthChangeSelectObjId2}
                                                            checked={objections6[1].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="px-4">
                                                    <Col lg={6} className="objection-cont3">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections6[2].id + 50}
                                                            label={objections6[2].objectionName}
                                                            onChange={sixthChangeSelectObjId3}
                                                            checked={objections6[2].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont4">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections6[3].id + 50}
                                                            label={objections6[3].objectionName}
                                                            onChange={sixthChangeSelectObjId4}
                                                            checked={objections6[3].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="px-4">
                                                    <Col lg={6} className="objection-cont5">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections6[4].id + 50}
                                                            label={objections6[4].objectionName}
                                                            onChange={sixthChangeSelectObjId5}
                                                            checked={objections6[4].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                    <Col lg={6} className="objection-cont6">
                                                        <Form.Check
                                                            className="py-2"
                                                            type="checkbox"
                                                            id={objections6[5].id + 50}
                                                            label={objections6[5].objectionName}
                                                            onChange={sixthChangeSelectObjId6}
                                                            checked={objections6[5].selected}
                                                            disabled={appStatus === 4 ? true : false}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        ) : null}
                                    </div>
                                </>
                            ) : null}
                            {changePage === 9 ? (
                                <>
                                    <Row className="px-3">
                                        <Col>
                                            <h5 className="success-of-visit-title">Patient Number Daily</h5>
                                        </Col>
                                    </Row>
                                    <Row className="px-3">
                                        <Col>
                                            <FormInput
                                                className={rprErr === true ? 'patient-border' : null}
                                                placeholder="enter value"
                                                type="number"
                                                name="patientNumber"
                                                containerClass={'mb-1'}
                                                onChange={changePatient}
                                                value={patientValue}
                                                min={0}
                                                max={400}
                                                disabled={appStatus === 4 ? true : false}
                                            />
                                        </Col>
                                    </Row>
                                </>
                            ) : null}
                            {changePage === 10 ? (
                                <>
                                    <Row className="px-3">
                                        <Col>
                                            <h5 className="success-of-visit-title">Physcho Type</h5>
                                        </Col>
                                    </Row>
                                    <Row className="px-4 pb-1 pt-1">
                                        <Col className="physcho-cont1">
                                            <Form.Check
                                                className="py-2"
                                                type="checkbox"
                                                name={allPhyschoTypeName[4]}
                                                label={allPhyschoTypeName[4]}
                                                onClick={checkClick5}
                                                onChange={() => changePhyType(allPhysschoTypeId[4])}
                                                checked={clicked === 5 ? true : false}
                                                disabled={appStatus === 4 ? true : false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="px-4">
                                        <Col className="physcho-cont2">
                                            <Form.Check
                                                className="py-2"
                                                type="checkbox"
                                                name={allPhyschoTypeName[5]}
                                                label={allPhyschoTypeName[5]}
                                                onClick={checkClick6}
                                                onChange={() => changePhyType(allPhysschoTypeId[5])}
                                                checked={clicked === 6 ? true : false}
                                                disabled={appStatus === 4 ? true : false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="px-4 pt-1">
                                        <Col className="physcho-cont2">
                                            {/* <Form.Check
                                        className="py-2"
                                        type="checkbox"
                                        name="MainClient"
                                        label="Main Client"
                                        onClick={checkClickOpen}
                                    /> */}
                                            {isClickedMC ? (
                                                <div className="mt-2 mb-2">
                                                    <i className="dripicons-chevron-right" onClick={clickMainClient}>
                                                        <span className="phy-main-client">Main Client</span>
                                                    </i>
                                                </div>
                                            ) : (
                                                <div className="mt-2 mb-2">
                                                    <i className="dripicons-chevron-down" onClick={clickMainClient}>
                                                        <span className="phy-main-client">Main Client</span>
                                                    </i>
                                                </div>
                                            )}
                                        </Col>
                                    </Row>
                                    {!isClickedMC ? (
                                        <>
                                            <Row className="px-4 pt-1">
                                                <Col lg={6} className="physcho-cont3">
                                                    <Form.Check
                                                        className="py-2"
                                                        type="checkbox"
                                                        name={allPhyschoTypeName[0]}
                                                        label={allPhyschoTypeName[0]}
                                                        onClick={checkClick1}
                                                        onChange={() => changePhyType(allPhysschoTypeId[0])}
                                                        checked={clicked === 1 ? true : false}
                                                        disabled={appStatus === 4 ? true : false}
                                                    />
                                                </Col>
                                                <Col lg={6} className="physcho-cont4">
                                                    <Form.Check
                                                        className="py-2"
                                                        type="checkbox"
                                                        name={allPhyschoTypeName[1]}
                                                        label={allPhyschoTypeName[1]}
                                                        onClick={checkClick2}
                                                        onChange={() => changePhyType(allPhysschoTypeId[1])}
                                                        checked={clicked === 2 ? true : false}
                                                        disabled={appStatus === 4 ? true : false}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="px-4 pb-1">
                                                <Col lg={6} className="physcho-cont5">
                                                    <Form.Check
                                                        className="py-2"
                                                        type="checkbox"
                                                        name={allPhyschoTypeName[2]}
                                                        label={allPhyschoTypeName[2]}
                                                        onClick={checkClick3}
                                                        onChange={() => changePhyType(allPhysschoTypeId[2])}
                                                        checked={clicked === 3 ? true : false}
                                                        disabled={appStatus === 4 ? true : false}
                                                    />
                                                </Col>
                                                <Col lg={6} className="physcho-cont6">
                                                    <Form.Check
                                                        className="py-2"
                                                        type="checkbox"
                                                        name={allPhyschoTypeName[3]}
                                                        label={allPhyschoTypeName[3]}
                                                        onClick={checkClick4}
                                                        onChange={() => changePhyType(allPhysschoTypeId[3])}
                                                        checked={clicked === 4 ? true : false}
                                                        disabled={appStatus === 4 ? true : false}
                                                    />
                                                </Col>
                                            </Row>
                                        </>
                                    ) : null}
                                </>
                            ) : null}
                            {changePage === 11 ? (
                                <>
                                    <Row className="px-3">
                                        <Col>
                                            <h5 className="success-of-visit-title">Wants</h5>
                                        </Col>
                                    </Row>
                                    <Row className="px-4 pt-1">
                                        <Col className="wants-cont1">
                                            <Form.Check
                                                className="py-2"
                                                type="checkbox"
                                                id={allWantsId[0]}
                                                label={allWantsName[0]}
                                                name={allWantsName[0]}
                                                onChange={clickWants1}
                                                checked={wantsClicked1}
                                                disabled={appStatus === 4 ? true : false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="px-4">
                                        <Col className="wants-cont2">
                                            <Form.Check
                                                className="py-2"
                                                type="checkbox"
                                                id={allWantsId[1]}
                                                label={allWantsName[1]}
                                                name={allWantsName[1]}
                                                onChange={clickWants2}
                                                checked={wantsClicked2}
                                                disabled={appStatus === 4 ? true : false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="px-4">
                                        <Col className="wants-cont2">
                                            <Form.Check
                                                className="py-2"
                                                type="checkbox"
                                                id={allWantsId[2]}
                                                label={allWantsName[2]}
                                                name={allWantsName[2]}
                                                onChange={clickWants3}
                                                checked={wantsClicked3}
                                                disabled={appStatus === 4 ? true : false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="px-4">
                                        <Col className="wants-cont2">
                                            <Form.Check
                                                className="py-2"
                                                type="checkbox"
                                                id={allWantsId[3]}
                                                label={allWantsName[3]}
                                                name={allWantsName[3]}
                                                onChange={clickWants4}
                                                checked={wantsClicked4}
                                                disabled={appStatus === 4 ? true : false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="px-4">
                                        <Col className="wants-cont2">
                                            <Form.Check
                                                className="py-2"
                                                type="checkbox"
                                                id={allWantsId[4]}
                                                label={allWantsName[4]}
                                                name={allWantsName[4]}
                                                onChange={clickWants5}
                                                checked={wantsClicked5}
                                                disabled={appStatus === 4 ? true : false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="px-4">
                                        <Col className="wants-cont2">
                                            <Form.Check
                                                className="py-2"
                                                type="checkbox"
                                                id={allWantsId[5]}
                                                label={allWantsName[5]}
                                                name={allWantsName[5]}
                                                onChange={clickWants6}
                                                checked={wantsClicked6}
                                                disabled={appStatus === 4 ? true : false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="px-4 pb-1">
                                        <Col className="wants-cont3">
                                            <Form.Check
                                                className="py-2"
                                                type="checkbox"
                                                id={allWantsId[6]}
                                                label={allWantsName[6]}
                                                name={allWantsName[6]}
                                                onChange={clickWants7}
                                                checked={wantsClicked7}
                                                disabled={appStatus === 4 ? true : false}
                                            />
                                        </Col>
                                    </Row>
                                </>
                            ) : null}
                            {changePage === 12 ? (
                                <div>
                                    <AddPharmacy changePage={changePage} />
                                </div>
                            ) : // <Row className="px-3 pb-1">
                            //     <Col lg={9}>
                            //         <h5 className="success-of-visit-title">Connectes Pharmacy</h5>
                            //         <FormInput
                            //             type="select"
                            //             containerClass="mb-1"
                            //             className="form-select"
                            //             // onChange={changePromoProduct}
                            //             // selected={promoProduct}
                            //             >
                            //             {pharmacy.length === 0 ? (
                            //                 <option>select pharmacy</option>
                            //             ) :
                            //                 <option>select pharmacy</option>
                            //             }
                            //         </FormInput>
                            //         <FormInput
                            //             type="select"
                            //             containerClass="mb-1"
                            //             className="form-select"
                            //             >
                            //             <option>select pharmacy</option>
                            //         </FormInput>
                            //         <FormInput
                            //             type="select"
                            //             containerClass="mb-1"
                            //             className="form-select"
                            //             >
                            //             <option>select pharmacy</option>
                            //         </FormInput>
                            //         <FormInput
                            //             type="select"
                            //             className="form-select"
                            //             >
                            //             <option>select pharmacy</option>
                            //         </FormInput>
                            //     </Col>
                            //     <Col lg={3}>
                            //         <h5
                            //             className={(100-pharmacySum) < 0 ? "text-center text-danger" :
                            //                         (100-pharmacySum) === 0 ? "text-center text-success" : "text-center"}
                            //         >
                            //             {(100-pharmacySum)+" %"}
                            //         </h5>
                            //         <FormInput
                            //             min={0}
                            //             max={100}
                            //             type="number"
                            //             containerClass={'mb-1'}
                            //             placeholder={pharmacyInput1}
                            //             onChange={pharmacyInputChange1}
                            //             disabled={pharmacyInputCheck1}
                            //         />
                            //         <FormInput
                            //             min={0}
                            //             max={100}
                            //             type="number"
                            //             containerClass={'mb-1'}
                            //             placeholder={pharmacyInput2}
                            //             onChange={pharmacyInputChange2}
                            //             disabled={pharmacyInputCheck2}
                            //         />
                            //         <FormInput
                            //             min={0}
                            //             max={100}
                            //             type="number"
                            //             containerClass={'mb-1'}
                            //             placeholder={pharmacyInput3}
                            //             onChange={pharmacyInputChange3}
                            //             disabled={pharmacyInputCheck3}
                            //         />
                            //         <FormInput
                            //             min={0}
                            //             max={100}
                            //             type="number"
                            //             placeholder={pharmacyInput4}
                            //             onChange={pharmacyInputChange4}
                            //             disabled={pharmacyInputCheck4}
                            //         />
                            //     </Col>
                            // </Row>
                            null}
                            {changePage === 13 ? (
                                <>
                                    <Row className="px-3 pb-2">
                                        <Col>
                                            <h5>Who would you like to send this report to?</h5>
                                            <Select
                                                isMulti={false}
                                                options={contactInfo}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="Related contacts"
                                                onChange={changeContacts}
                                                value={selectMailName}
                                                isDisabled={appStatus === 4 ? true : false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="px-3">
                                        <Col>
                                            <h5 className="success-of-visit-title">
                                                Your opinions about the products and general visit.
                                            </h5>
                                        </Col>
                                    </Row>
                                    <Row className="px-3">
                                        <FormInput
                                            name="overview5"
                                            type="textarea"
                                            rows="5"
                                            containerClass={'mb-1'}
                                            key="overview"
                                            onChange={changeOpinionsAbout}
                                            value={opinionsAbout}
                                            disabled={appStatus === 4 ? true : false}
                                        />
                                    </Row>
                                </>
                            ) : null}
                        </form>
                    </Modal.Body>
                    {changePage > -1 ? <hr></hr> : null}
                    {changePage === 91 ? (
                        <>
                            <Row>
                                <Col>
                                    <Button className="btn btn btn-light split-cancel-btn">Cancel</Button>
                                </Col>
                                <Col>
                                    <Button className="btn btn btn-primary split-pharmacy-btn" onClick={prevSplitPage}>
                                        Pharmacy Connection
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    ) : null}
                    {changePage === 14 ? (
                        <Row className="px-4 pb-2 report-rds">
                            <Col xs={1} className="px-3 gap-btn">
                                {/* VİSİT */}
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="btn btn-primary"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="VİSİT">
                                    <i class="fas fa-street-view"></i>
                                </Button>
                            </Col>
                            <Col xs={1} className="px-3 gap-btn">
                                {eventBgColor !== 'bg-danger' ? (
                                    // REPORT
                                    <Button
                                        variant="success"
                                        className="btn me-1"
                                        onClick={reportClick}
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="REPORT">
                                        <i class="fas fa-list"></i>
                                    </Button>
                                ) : null}
                            </Col>
                            <Col xs={1} className="px-3 gap-btn">
                                {/* SPLİT */}
                                <Button
                                    type="submit"
                                    className="btn btn-purple"
                                    onClick={showSplit}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="SPLİT">
                                    <i class="fas fa-divide"></i>
                                </Button>
                            </Col>
                            <Col xs={1} className="px-3 gap-btn">
                                {/* PHYSCO TYPE */}
                                <Button
                                    type="submit"
                                    variant="dark"
                                    className="btn btn-primary"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="PHYSCO TYPE">
                                    <i class="fas fa-head-side-virus"></i>
                                </Button>
                            </Col>
                            <Col xs={1} className="px-3 gap-btn">
                                {/* OBJECTİON */}
                                <Button
                                    type="submit"
                                    className="btn btn-objection"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="OBJECTİON">
                                    <i class="fas fa-hand-paper"></i>
                                </Button>
                            </Col>
                            <Col xs={1} className="px-3 gap-btn">
                                {
                                    // UPDATE
                                    userDay < eventDay || userDay === eventDay ? (
                                        <Button
                                            variant="warning"
                                            type="submit"
                                            className="btn btn-success"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="UPDATE">
                                            <i class="fas fa-edit"></i>
                                        </Button>
                                    ) : (
                                        /* COMPETİTOR */
                                        <Button
                                            className="btn competitor-btn"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="COMPETİTOR">
                                            <i class="fas fa-handshake-alt"></i>
                                        </Button>
                                    )
                                }
                            </Col>
                            {/* FAİLED */}
                            <Col xs={1} className="px-3 gap-btn">
                                {eventDay > userDay ? (
                                    <Button
                                        variant="danger"
                                        className="btn btn-danger"
                                        onClick={onRemoveEvent}
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="REMOVE">
                                        <i class="fas fa-trash-alt"></i>
                                    </Button>
                                ) : (
                                    <Button
                                        variant="danger"
                                        type="submit"
                                        className="btn btn-success"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="FAİLED">
                                        <i class="fas fa-exclamation-circle"></i>
                                    </Button>
                                )}
                            </Col>
                            {
                                // REMOVE
                                userDay > eventDay || eventDay > userDay ? null : (
                                    <Button
                                        variant="danger"
                                        className="delete-btn"
                                        style={{ padding: 0 }}
                                        onClick={onRemoveEvent}
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="REMOVE">
                                        <i class="fas fa-trash-alt"></i>
                                    </Button>
                                )
                            }
                            {userDay === eventDay ? (
                                <Button
                                    variant="danger"
                                    className="delete-btn"
                                    style={{ padding: 0 }}
                                    onClick={onRemoveEvent}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="REMOVE">
                                    <i class="fas fa-trash-alt"></i>
                                </Button>
                            ) : null}
                        </Row>
                    ) : null}
                    {changePage === 1 ? (
                        <Row className="pb-2 first-button-cont">
                            <Col className="rm-counter rm-count-cont2">
                                {changePage < 14 ? (
                                    <h6>{appStatus === 4 ? `${changePage - 1}/12` : `${changePage}/13`}</h6>
                                ) : null}
                            </Col>
                            <Col className="text-end px-4">
                                <Button className="btn btn-light me-1" onClick={closeEdit}>
                                    No
                                </Button>
                                <Button type="submit" className="btn btn-primary py-1" onClick={nextPage}>
                                    Yes
                                </Button>
                            </Col>
                        </Row>
                    ) : null}
                    {changePage > 1 && changePage < 13 ? (
                        <Row className="pb-2 px-3 mb-1">
                            <Col className="rm-counter2 rm-count-cont2">
                                {changePage < 14 ? (
                                    <h6>{appStatus === 4 ? `${changePage - 1}/12` : `${changePage}/13`}</h6>
                                ) : null}
                            </Col>
                            <Col className="text-end px-3 btn-prev-next1">
                                {changePage === 2 && appStatus === 4 ? null : (
                                    <Button className="btn btn-light me-1" onClick={previousPage}>
                                        Previously
                                    </Button>
                                )}
                                <Button type="submit" className="btn btn-primary py-1" onClick={nextPage}>
                                    Next
                                </Button>
                            </Col>
                        </Row>
                    ) : null}
                    {changePage === 13 ? (
                        <Row className="pb-2 btn-prev-next2-cont">
                            <Col lg={2} className="rm-counter3 rm-count-cont1">
                                {changePage < 14 ? (
                                    <h6>{appStatus === 4 ? `${changePage - 1}/12` : `${changePage}/13`}</h6>
                                ) : null}
                            </Col>
                            <Col lg={10} className="text-end px-4 btn-prev-next2">
                                <Button className="btn btn-light me-1" onClick={previousPage}>
                                    Previously
                                </Button>
                                {appStatus === 4 ? null : (
                                    <Button type="submit" className="btn btn-success py-1" onClick={saveReportPage}>
                                        Save and Send
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    ) : null}
                    {changePage === 0 ? (
                        <Row className="pt-0 pb-2 mb-1">
                            <Col className="rm-counter3 rm-count-cont3">
                                {changePage < 14 ? (
                                    <h6>{appStatus === 4 ? `${changePage - 1}/12` : `${changePage}/13`}</h6>
                                ) : null}
                            </Col>
                            <Col className="text-end px-4 btn-save-cancel1">
                                <Button className="btn btn-light me-1" onClick={cancelEditPage}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="btn btn-success py-1" onClick={saveCancel}>
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    ) : null}
                </Modal>
            ) : (
                <CanceledModal />
            )}
        </>
    );
};

export default ReportModal;
