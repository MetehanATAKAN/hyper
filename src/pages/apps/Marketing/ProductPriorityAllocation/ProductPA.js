import React, { useState } from 'react';
import { Col, Button, Table, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useEffect } from 'react';
import { FetchApiPost } from '../../../../utils/http.helper';
import SuccessModal from '../../../../components/Modals/SuccessModal';
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import Loading from '../../../../components/Loading';
import FilterHeader from './FilterHeader';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../../../components/BreadCrumb';

const ProductPA = () => {
    const { t } = useTranslation();

    const history = useHistory();
    const { selectQuarter, selectAllFilters, selectFilterName } = useSelector((state) => state.ProductPA);

    const [isApplyFilter, setisApplyFilter] = useState(false);
    const [applyData, setApplyData] = useState([]);

    const [isApply, setIsApply] = useState(false);
    const [isTable, setisTable] = useState(false);

    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Marketing' },
        { label: 'Product Priority & Allocation' },
    ];

    //quarter1
    const jan = {
        items: [],
        promo: [
            { id: '1', name: [] },
            { id: '2', name: [] },
            { id: '3', name: [] },
            { id: '4', name: [] },
            { id: '5', name: [] },
            { id: '6', name: [] },
            { id: '7', name: [] },
            { id: '8', name: [] },
            { id: '9', name: [] },
            { id: '10', name: [] },
        ],
    };

    const fab = {
        items: [],
        promo: [
            { id: '1', name: [] },
            { id: '2', name: [] },
            { id: '3', name: [] },
            { id: '4', name: [] },
            { id: '5', name: [] },
            { id: '6', name: [] },
            { id: '7', name: [] },
            { id: '8', name: [] },
            { id: '9', name: [] },
            { id: '10', name: [] },
        ],
    };

    const mar = {
        items: [],
        promo: [
            { id: '1', name: [] },
            { id: '2', name: [] },
            { id: '3', name: [] },
            { id: '4', name: [] },
            { id: '5', name: [] },
            { id: '6', name: [] },
            { id: '7', name: [] },
            { id: '8', name: [] },
            { id: '9', name: [] },
            { id: '10', name: [] },
        ],
    };
    //quarter2
    const apr = {
        items: [],
        promo: [
            { id: '1', name: [] },
            { id: '2', name: [] },
            { id: '3', name: [] },
            { id: '4', name: [] },
            { id: '5', name: [] },
            { id: '6', name: [] },
            { id: '7', name: [] },
            { id: '8', name: [] },
            { id: '9', name: [] },
            { id: '10', name: [] },
        ],
    };
    const may = {
        items: [],
        promo: [
            { id: '1', name: [] },
            { id: '2', name: [] },
            { id: '3', name: [] },
            { id: '4', name: [] },
            { id: '5', name: [] },
            { id: '6', name: [] },
            { id: '7', name: [] },
            { id: '8', name: [] },
            { id: '9', name: [] },
            { id: '10', name: [] },
        ],
    };
    const jun = {
        items: [],
        promo: [
            { id: '1', name: [] },
            { id: '2', name: [] },
            { id: '3', name: [] },
            { id: '4', name: [] },
            { id: '5', name: [] },
            { id: '6', name: [] },
            { id: '7', name: [] },
            { id: '8', name: [] },
            { id: '9', name: [] },
            { id: '10', name: [] },
        ],
    };
    //quarter3
    const jul = {
        items: [],
        promo: [
            { id: '1', name: [] },
            { id: '2', name: [] },
            { id: '3', name: [] },
            { id: '4', name: [] },
            { id: '5', name: [] },
            { id: '6', name: [] },
            { id: '7', name: [] },
            { id: '8', name: [] },
            { id: '9', name: [] },
            { id: '10', name: [] },
        ],
    };
    const aug = {
        items: [],
        promo: [
            { id: '1', name: [] },
            { id: '2', name: [] },
            { id: '3', name: [] },
            { id: '4', name: [] },
            { id: '5', name: [] },
            { id: '6', name: [] },
            { id: '7', name: [] },
            { id: '8', name: [] },
            { id: '9', name: [] },
            { id: '10', name: [] },
        ],
    };
    const sep = {
        items: [],
        promo: [
            { id: '1', name: [] },
            { id: '2', name: [] },
            { id: '3', name: [] },
            { id: '4', name: [] },
            { id: '5', name: [] },
            { id: '6', name: [] },
            { id: '7', name: [] },
            { id: '8', name: [] },
            { id: '9', name: [] },
            { id: '10', name: [] },
        ],
    };
    //quarter4
    const oct = {
        items: [],
        promo: [
            { id: '1', name: [] },
            { id: '2', name: [] },
            { id: '3', name: [] },
            { id: '4', name: [] },
            { id: '5', name: [] },
            { id: '6', name: [] },
            { id: '7', name: [] },
            { id: '8', name: [] },
            { id: '9', name: [] },
            { id: '10', name: [] },
        ],
    };
    const nov = {
        items: [],
        promo: [
            { id: '1', name: [] },
            { id: '2', name: [] },
            { id: '3', name: [] },
            { id: '4', name: [] },
            { id: '5', name: [] },
            { id: '6', name: [] },
            { id: '7', name: [] },
            { id: '8', name: [] },
            { id: '9', name: [] },
            { id: '10', name: [] },
        ],
    };
    const dec = {
        items: [],
        promo: [
            { id: '1', name: [] },
            { id: '2', name: [] },
            { id: '3', name: [] },
            { id: '4', name: [] },
            { id: '5', name: [] },
            { id: '6', name: [] },
            { id: '7', name: [] },
            { id: '8', name: [] },
            { id: '9', name: [] },
            { id: '10', name: [] },
        ],
    };

    const [columns, setColumns] = useState(jan);
    const [fabruary, setFabruary] = useState(fab);
    const [march, setMarch] = useState(mar);
    const [april, setApril] = useState(apr);
    const [mayy, setMayy] = useState(may);
    const [june, setJune] = useState(jun);
    const [july, setJuly] = useState(jul);
    const [august, setAugust] = useState(aug);
    const [september, setSeptember] = useState(sep);
    const [octember, setOctember] = useState(oct);
    const [november, setNovember] = useState(nov);
    const [december, setDecember] = useState(dec);

    const [ısSave, setIsSave] = useState(false);
    const [ısSave2, setIsSave2] = useState(false);
    const [ısSave3, setIsSave3] = useState(false);
    const [ısSave4, setIsSave4] = useState(false);
    const [show, setShow] = useState(false);

    const [isSaveFrequency, setIsSaveFrequency] = useState();
    const [saveFrequencyError, setSaveFrequencyError] = useState();
    const [isSaveClick, setisSaveClick] = useState(false);

    //is there a subpromo
    const [isGetSubPromo, setIsGetSubPromo] = useState(true);
    //loading process
    const [brandLoading, setBrandLoading] = useState(false);

    const [subPromoLoading, setSubPromoLoading] = useState(false);

    const [countryLoading, setCountryLoading] = useState(false);

    //january
    let [ısPromo, setIsPromo] = useState(0);
    let [ısNonPromo, setIsNonPromo] = useState(0); // arada boşluk olup olmaması için yapılmış kontrol
    const [totalArrayResult, setTotalArrayResult] = useState(0);
    const [promoArrayResult, setPromoArrayResult] = useState(0);

    //fabruary
    let [ısFabPromo, setIsFabPromo] = useState(0);
    let [ısNonFabPromo, setIsNonFabPromo] = useState(0);
    const [totalFabArrayResult, setTotalFabArrayResult] = useState(0);
    const [promoFabArrayResult, setPromoFabArrayResult] = useState(0);

    //march
    let [ısMarPromo, setIsMarPromo] = useState(0);
    let [ısNonMarPromo, setIsNonMarPromo] = useState(0);
    const [totalMarArrayResult, setTotalMarArrayResult] = useState(0);
    const [promoMarArrayResult, setPromoMarArrayResult] = useState(0);

    //april
    let [ısAprPromo, setIsAprPromo] = useState(0);
    let [ısNonAprPromo, setIsNonAprPromo] = useState(0);
    const [totalAprArrayResult, setTotalAprArrayResult] = useState(0);
    const [promoAprArrayResult, setPromoAprArrayResult] = useState(0);

    //may
    let [ısMayPromo, setIsMayPromo] = useState(0);
    let [ısNonMayPromo, setIsNonMayPromo] = useState(0);
    const [totalMayArrayResult, setTotalMayArrayResult] = useState(0);
    const [promoMayArrayResult, setPromoMayArrayResult] = useState(0);

    //june
    let [ısJunPromo, setIsJunPromo] = useState(0);
    let [ısNonJunPromo, setIsNonJunPromo] = useState(0);
    const [totalJunArrayResult, setTotalJunArrayResult] = useState(0);
    const [promoJunArrayResult, setPromoJunArrayResult] = useState(0);

    //july
    let [ısJulPromo, setIsJulPromo] = useState(0);
    let [ısNonJulPromo, setIsNonJulPromo] = useState(0);
    const [totalJulArrayResult, setTotalJulArrayResult] = useState(0);
    const [promoJulArrayResult, setPromoJulArrayResult] = useState(0);

    //august
    let [ısAugPromo, setIsAugPromo] = useState(0);
    let [ısNonAugPromo, setIsNonAugPromo] = useState(0);
    const [totalAugArrayResult, setTotalAugArrayResult] = useState(0);
    const [promoAugArrayResult, setPromoAugArrayResult] = useState(0);

    //september
    let [ısSepPromo, setIsSepPromo] = useState(0);
    let [ısNonSepPromo, setIsNonSepPromo] = useState(0);
    const [totalSepArrayResult, setTotalSepArrayResult] = useState(0);
    const [promoSepArrayResult, setPromoSepArrayResult] = useState(0);

    //octember
    let [ısOctPromo, setIsOctPromo] = useState(0);
    let [ısNonOctPromo, setIsNonOctPromo] = useState(0);
    const [totalOctArrayResult, setTotalOctArrayResult] = useState(0);
    const [promoOctArrayResult, setPromoOctArrayResult] = useState(0);

    //november
    let [ısNovPromo, setIsNovPromo] = useState(0);
    let [ısNonNovPromo, setIsNonNovPromo] = useState(0);
    const [totalNovArrayResult, setTotalNovArrayResult] = useState(0);
    const [promoNovArrayResult, setPromoNovArrayResult] = useState(0);

    //december
    let [ısDecPromo, setIsDecPromo] = useState(0);
    let [ısNonDecPromo, setIsNonDecPromo] = useState(0);
    const [totalDecArrayResult, setTotalDecArrayResult] = useState(0);
    const [promoDecArrayResult, setPromoDecArrayResult] = useState(0);

    const ondragend = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            //productları subpromo kısmına sürükleme
            if (destination.droppableId === '11') {
                let arr2 = columns;
                const result = arr2.promo.find((data) => data.id === source.droppableId);
                arr2.items.push(result.name);
                setColumns({ ...arr2, items: [...arr2.items] });

                arr2.promo.map((data) => (data.id === source.droppableId ? (data.name = []) : null));
                setColumns({ ...arr2, promo: [...arr2.promo] });
            }
            //productları kendi aralarında değiştirme
            else if (source.droppableId !== '11') {
                let arr3 = columns;
                const result = arr3.promo.find((data) => data.id === source.droppableId);
                const result2 = arr3.promo.find((data) => data.id === destination.droppableId);
                const resultName = result.name;
                const result2Name = result2.name;

                arr3.promo.map((data) =>
                    data.id === destination.droppableId
                        ? (data.name = resultName)
                        : data.id === source.droppableId
                        ? (data.name = result2Name)
                        : null
                );
                setColumns({ ...arr3 });
            }
            //subpromoları product kısmına atma
            else if (source.droppableId === '11') {
                let productArr = columns;
                const x = productArr.promo.find((data) => data.id === destination.droppableId);
                if (x.name.length === 0) {
                    let [removed] = columns.items.splice(source.index, 1); //silinen item removedde tutuldu
                    const result = productArr.promo.find((data) => data.id === destination.droppableId);
                    result.name = removed;
                    setColumns({ ...productArr });
                }
            }
        }
    };

    //table fab
    const ondragendJan = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            if (destination.droppableId === '11') {
                let arrFab = fabruary;
                const result = arrFab.promo.find((data) => data.id === source.droppableId);

                arrFab.items.push(result.name);
                setFabruary({ ...arrFab, items: [...arrFab.items] });

                arrFab.promo.map((data) => (data.id === source.droppableId ? (data.name = []) : null));
                setFabruary({ ...arrFab, promo: [...arrFab.promo] });
            } else if (source.droppableId !== '11') {
                let arr3 = fabruary;
                const result = arr3.promo.find((data) => data.id === source.droppableId);
                const result2 = arr3.promo.find((data) => data.id === destination.droppableId);
                const resultName = result.name;
                const result2Name = result2.name;

                arr3.promo.map((data) =>
                    data.id === destination.droppableId
                        ? (data.name = resultName)
                        : data.id === source.droppableId
                        ? (data.name = result2Name)
                        : null
                );
                setFabruary({ ...arr3 });
            } else if (source.droppableId === '11') {
                let productArr = fabruary;
                const x = productArr.promo.find((data) => data.id === destination.droppableId);

                if (x.name.length === 0) {
                    let [removed] = fabruary.items.splice(source.index, 1); //silinen item removedde tutuldu
                    const result = productArr.promo.find((data) => data.id === destination.droppableId);
                    result.name = removed;
                    setFabruary({ ...productArr });
                }
            }
        }
    };

    //table march
    const ondragendMar = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            if (destination.droppableId === '11') {
                let arr2 = march;
                const result = arr2.promo.find((data) => data.id === source.droppableId);
                arr2.items.push(result.name);
                setMarch({ ...arr2, items: [...arr2.items] });

                arr2.promo.map((data) => (data.id === source.droppableId ? (data.name = []) : null));
                setMarch({ ...arr2, promo: [...arr2.promo] });
            } else if (source.droppableId !== '11') {
                let arr3 = march;
                const result = arr3.promo.find((data) => data.id === source.droppableId);
                const result2 = arr3.promo.find((data) => data.id === destination.droppableId);
                const resultName = result.name;
                const result2Name = result2.name;

                arr3.promo.map((data) =>
                    data.id === destination.droppableId
                        ? (data.name = resultName)
                        : data.id === source.droppableId
                        ? (data.name = result2Name)
                        : null
                );
                setMarch({ ...arr3 });
            } else if (source.droppableId === '11') {
                let productArr = march;
                const x = productArr.promo.find((data) => data.id === destination.droppableId);
                if (x.name.length === 0) {
                    let [removed] = march.items.splice(source.index, 1); //silinen item removedde tutuldu
                    const result = productArr.promo.find((data) => data.id === destination.droppableId);
                    result.name = removed;
                    setMarch({ ...productArr });
                }
            }
        }
    };
    //table april
    const ondragendApr = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        let newArr = april;

        if (source.droppableId !== destination.droppableId) {
            if (destination.droppableId === '11') {
                let arr2 = april;
                const result = arr2.promo.find((data) => data.id === source.droppableId);
                arr2.items.push(result.name);
                setApril({ ...arr2, items: [...arr2.items] });

                arr2.promo.map((data) => (data.id === source.droppableId ? (data.name = []) : null));
                setApril({ ...arr2, promo: [...arr2.promo] });
            } else if (source.droppableId !== '11') {
                let arr3 = april;
                const result = arr3.promo.find((data) => data.id === source.droppableId);
                const result2 = arr3.promo.find((data) => data.id === destination.droppableId);
                const resultName = result.name;
                const result2Name = result2.name;

                arr3.promo.map((data) =>
                    data.id === destination.droppableId
                        ? (data.name = resultName)
                        : data.id === source.droppableId
                        ? (data.name = result2Name)
                        : null
                );
                setApril({ ...arr3 });
            } else if (source.droppableId === '11') {
                let productArr = april;
                const x = productArr.promo.find((data) => data.id === destination.droppableId);

                if (x.name.length === 0) {
                    let [removed] = april.items.splice(source.index, 1); //silinen item removedde tutuldu
                    const result = productArr.promo.find((data) => data.id === destination.droppableId);
                    result.name = removed;
                    setApril({ ...productArr });
                }
            }
        }
    };
    //table may
    const ondragendMay = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            if (destination.droppableId === '11') {
                let arr2 = mayy;
                const result = arr2.promo.find((data) => data.id === source.droppableId);
                arr2.items.push(result.name);
                setMayy({ ...arr2, items: [...arr2.items] });

                arr2.promo.map((data) => (data.id === source.droppableId ? (data.name = []) : null));
                setMayy({ ...arr2, promo: [...arr2.promo] });
            } else if (source.droppableId !== '11') {
                let arr3 = mayy;
                const result = arr3.promo.find((data) => data.id === source.droppableId);
                const result2 = arr3.promo.find((data) => data.id === destination.droppableId);
                const resultName = result.name;
                const result2Name = result2.name;

                arr3.promo.map((data) =>
                    data.id === destination.droppableId
                        ? (data.name = resultName)
                        : data.id === source.droppableId
                        ? (data.name = result2Name)
                        : null
                );
                setMayy({ ...arr3 });
            } else if (source.droppableId === '11') {
                let productArr = mayy;
                const x = productArr.promo.find((data) => data.id === destination.droppableId);
                if (x.name.length === 0) {
                    let [removed] = mayy.items.splice(source.index, 1); //silinen item removedde tutuldu
                    const result = productArr.promo.find((data) => data.id === destination.droppableId);
                    result.name = removed;
                    setMayy({ ...productArr });
                }
            }
        }
    };
    //table june
    const ondragendJun = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            if (destination.droppableId === '11') {
                let arr2 = june;
                const result = arr2.promo.find((data) => data.id === source.droppableId);
                arr2.items.push(result.name);
                setJune({ ...arr2, items: [...arr2.items] });

                arr2.promo.map((data) => (data.id === source.droppableId ? (data.name = []) : null));
                setJune({ ...arr2, promo: [...arr2.promo] });
            } else if (source.droppableId !== '11') {
                let arr3 = june;
                const result = arr3.promo.find((data) => data.id === source.droppableId);
                const result2 = arr3.promo.find((data) => data.id === destination.droppableId);
                const resultName = result.name;
                const result2Name = result2.name;

                arr3.promo.map((data) =>
                    data.id === destination.droppableId
                        ? (data.name = resultName)
                        : data.id === source.droppableId
                        ? (data.name = result2Name)
                        : null
                );
                setJune({ ...arr3 });
            } else if (source.droppableId === '11') {
                let productArr = june;
                const x = productArr.promo.find((data) => data.id === destination.droppableId);
                if (x.name.length === 0) {
                    let [removed] = june.items.splice(source.index, 1); //silinen item removedde tutuldu
                    const result = productArr.promo.find((data) => data.id === destination.droppableId);
                    result.name = removed;
                    setJune({ ...productArr });
                }
            }
        }
    };
    //table july
    const ondragendJul = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            if (destination.droppableId === '11') {
                let arr2 = july;
                const result = arr2.promo.find((data) => data.id === source.droppableId);
                arr2.items.push(result.name);
                setJuly({ ...arr2, items: [...arr2.items] });

                arr2.promo.map((data) => (data.id === source.droppableId ? (data.name = []) : null));
                setJuly({ ...arr2, promo: [...arr2.promo] });
            } else if (source.droppableId !== '11') {
                let arr3 = july;
                const result = arr3.promo.find((data) => data.id === source.droppableId);
                const result2 = arr3.promo.find((data) => data.id === destination.droppableId);
                const resultName = result.name;
                const result2Name = result2.name;

                arr3.promo.map((data) =>
                    data.id === destination.droppableId
                        ? (data.name = resultName)
                        : data.id === source.droppableId
                        ? (data.name = result2Name)
                        : null
                );
                setJuly({ ...arr3 });
            } else if (source.droppableId === '11') {
                let productArr = july;
                const x = productArr.promo.find((data) => data.id === destination.droppableId);
                if (x.name.length === 0) {
                    let [removed] = july.items.splice(source.index, 1); //silinen item removedde tutuldu
                    const result = productArr.promo.find((data) => data.id === destination.droppableId);
                    result.name = removed;
                    setJuly({ ...productArr });
                }
            }
        }
    };
    //table august
    const ondragendAug = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            if (destination.droppableId === '11') {
                let arr2 = august;
                const result = arr2.promo.find((data) => data.id === source.droppableId);
                arr2.items.push(result.name);
                setAugust({ ...arr2, items: [...arr2.items] });

                arr2.promo.map((data) => (data.id === source.droppableId ? (data.name = []) : null));
                setAugust({ ...arr2, promo: [...arr2.promo] });
            } else if (source.droppableId !== '11') {
                let arr3 = august;
                const result = arr3.promo.find((data) => data.id === source.droppableId);
                const result2 = arr3.promo.find((data) => data.id === destination.droppableId);
                const resultName = result.name;
                const result2Name = result2.name;

                arr3.promo.map((data) =>
                    data.id === destination.droppableId
                        ? (data.name = resultName)
                        : data.id === source.droppableId
                        ? (data.name = result2Name)
                        : null
                );
                setAugust({ ...arr3 });
            } else if (source.droppableId === '11') {
                let productArr = august;
                const x = productArr.promo.find((data) => data.id === destination.droppableId);
                if (x.name.length === 0) {
                    let [removed] = august.items.splice(source.index, 1); //silinen item removedde tutuldu
                    const result = productArr.promo.find((data) => data.id === destination.droppableId);
                    result.name = removed;
                    setAugust({ ...productArr });
                }
            }
        }
    };
    //table september
    const ondragendSep = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            if (destination.droppableId === '11') {
                let arr2 = september;
                const result = arr2.promo.find((data) => data.id === source.droppableId);
                arr2.items.push(result.name);
                setSeptember({ ...arr2, items: [...arr2.items] });

                arr2.promo.map((data) => (data.id === source.droppableId ? (data.name = []) : null));
                setSeptember({ ...arr2, promo: [...arr2.promo] });
            } else if (source.droppableId !== '11') {
                let arr3 = september;
                const result = arr3.promo.find((data) => data.id === source.droppableId);
                const result2 = arr3.promo.find((data) => data.id === destination.droppableId);
                const resultName = result.name;
                const result2Name = result2.name;

                arr3.promo.map((data) =>
                    data.id === destination.droppableId
                        ? (data.name = resultName)
                        : data.id === source.droppableId
                        ? (data.name = result2Name)
                        : null
                );
                setSeptember({ ...arr3 });
            } else if (source.droppableId === '11') {
                let productArr = september;
                const x = productArr.promo.find((data) => data.id === destination.droppableId);
                if (x.name.length === 0) {
                    let [removed] = september.items.splice(source.index, 1); //silinen item removedde tutuldu
                    const result = productArr.promo.find((data) => data.id === destination.droppableId);
                    result.name = removed;
                    setSeptember({ ...productArr });
                }
            }
        }
    };
    //table octember
    const ondragendOct = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            if (destination.droppableId === '11') {
                let arr2 = octember;
                const result = arr2.promo.find((data) => data.id === source.droppableId);
                arr2.items.push(result.name);
                setOctember({ ...arr2, items: [...arr2.items] });

                arr2.promo.map((data) => (data.id === source.droppableId ? (data.name = []) : null));
                setOctember({ ...arr2, promo: [...arr2.promo] });
            } else if (source.droppableId !== '11') {
                let arr3 = octember;
                const result = arr3.promo.find((data) => data.id === source.droppableId);
                const result2 = arr3.promo.find((data) => data.id === destination.droppableId);
                const resultName = result.name;
                const result2Name = result2.name;

                arr3.promo.map((data) =>
                    data.id === destination.droppableId
                        ? (data.name = resultName)
                        : data.id === source.droppableId
                        ? (data.name = result2Name)
                        : null
                );
                setOctember({ ...arr3 });
            } else if (source.droppableId === '11') {
                let productArr = octember;
                const x = productArr.promo.find((data) => data.id === destination.droppableId);
                if (x.name.length === 0) {
                    let [removed] = octember.items.splice(source.index, 1); //silinen item removedde tutuldu
                    const result = productArr.promo.find((data) => data.id === destination.droppableId);
                    result.name = removed;
                    setOctember({ ...productArr });
                }
            }
        }
    };
    //table november
    const ondragendNov = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            if (destination.droppableId === '11') {
                let arr2 = november;
                const result = arr2.promo.find((data) => data.id === source.droppableId);
                arr2.items.push(result.name);
                setNovember({ ...arr2, items: [...arr2.items] });

                arr2.promo.map((data) => (data.id === source.droppableId ? (data.name = []) : null));
                setNovember({ ...arr2, promo: [...arr2.promo] });
            } else if (source.droppableId !== '11') {
                let arr3 = november;
                const result = arr3.promo.find((data) => data.id === source.droppableId);
                const result2 = arr3.promo.find((data) => data.id === destination.droppableId);
                const resultName = result.name;
                const result2Name = result2.name;

                arr3.promo.map((data) =>
                    data.id === destination.droppableId
                        ? (data.name = resultName)
                        : data.id === source.droppableId
                        ? (data.name = result2Name)
                        : null
                );
                setNovember({ ...arr3 });
            } else if (source.droppableId === '11') {
                let productArr = november;
                const x = productArr.promo.find((data) => data.id === destination.droppableId);
                if (x.name.length === 0) {
                    let [removed] = november.items.splice(source.index, 1); //silinen item removedde tutuldu
                    const result = productArr.promo.find((data) => data.id === destination.droppableId);
                    result.name = removed;
                    setNovember({ ...productArr });
                }
            }
        }
    };
    //table december
    const ondragendDec = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            if (destination.droppableId === '11') {
                let arr2 = december;
                const result = arr2.promo.find((data) => data.id === source.droppableId);
                arr2.items.push(result.name);
                setDecember({ ...arr2, items: [...arr2.items] });
                arr2.promo.map((data) => (data.id === source.droppableId ? (data.name = []) : null));
                setDecember({ ...arr2, promo: [...arr2.promo] });
            } else if (source.droppableId !== '11') {
                let arr3 = december;
                const result = arr3.promo.find((data) => data.id === source.droppableId);
                const result2 = arr3.promo.find((data) => data.id === destination.droppableId);
                const resultName = result.name;
                const result2Name = result2.name;

                arr3.promo.map((data) =>
                    data.id === destination.droppableId
                        ? (data.name = resultName)
                        : data.id === source.droppableId
                        ? (data.name = result2Name)
                        : null
                );
                setDecember({ ...arr3 });
            } else if (source.droppableId === '11') {
                let productArr = december;
                const x = productArr.promo.find((data) => data.id === destination.droppableId);
                if (x.name.length === 0) {
                    let [removed] = december.items.splice(source.index, 1); //silinen item removedde tutuldu
                    const result = productArr.promo.find((data) => data.id === destination.droppableId);
                    result.name = removed;
                    setDecember({ ...productArr });
                }
            }
        }
    };

    useEffect(() => {
        if (selectQuarter !== null) {
            if (selectQuarter.value === 1) {
                setIsSave(true);
                setShow(true);

                const promoArray = [];
                const nonPromoArray = [];

                const promo = columns.promo.filter((data) => data.id < 7);
                const nonpromo = columns.promo.filter((data) => data.id >= 7);
                promo.map((data) => (data.name.length !== 0 ? promoArray.push(1) : promoArray.push(0)));
                let newData = promoArray[0];
                let oldData = promoArray[0];

                let ıspromovalue = 0;
                promoArray.map((data) => {
                    return (
                        (oldData = newData), (newData = data), oldData === 0 && newData === 1 ? ıspromovalue++ : null
                    );
                });
                setIsPromo(ıspromovalue);

                nonpromo.map((data) => (data.name.length !== 0 ? nonPromoArray.push(1) : nonPromoArray.push(0)));

                let newNonPromoData = nonPromoArray[0];
                let oldNonPromoData = nonPromoArray[0];

                let ısnonpromovalue = 0;
                nonPromoArray.map((data) => {
                    return (
                        (oldNonPromoData = newNonPromoData),
                        (newNonPromoData = data),
                        oldNonPromoData === 0 && newNonPromoData === 1 ? ısnonpromovalue++ : null
                    );
                });

                setIsNonPromo(ısnonpromovalue);
                //iki diziyi birleştirdim promoarray ve nonpromoarray
                let ıstotalArray = 0;
                let totalArray = promoArray.concat(nonPromoArray);

                totalArray.map((data) => (data !== 0 ? ıstotalArray++ : null));

                ıstotalArray === 0 ? setTotalArrayResult(0) : setTotalArrayResult(1);

                //promoarrayresult state'ini değiştiriyorum
                let ısPromoArrayResult = 0;

                promoArray.map((data) => (data === 0 ? ısPromoArrayResult++ : null));

                ısPromoArrayResult === 6 ? setPromoArrayResult(1) : setPromoArrayResult(0);

                //fabruary
                const promoFabArray = [];
                const nonPromoFabArray = [];

                const fabpromo = fabruary.promo.filter((data) => data.id < 7);
                const nonFabpromo = fabruary.promo.filter((data) => data.id >= 7);

                fabpromo.map((data) => (data.name.length !== 0 ? promoFabArray.push(1) : promoFabArray.push(0)));

                let newFabData = promoFabArray[0];
                let oldFabData = promoFabArray[0];
                let ısfabpromovalue = 0;
                promoFabArray.map((data) => {
                    return (
                        (oldFabData = newFabData),
                        (newFabData = data),
                        oldFabData === 0 && newFabData === 1 ? ısfabpromovalue++ : null
                    );
                });
                setIsFabPromo(ısfabpromovalue);

                nonFabpromo.map((data) =>
                    data.name.length !== 0 ? nonPromoFabArray.push(1) : nonPromoFabArray.push(0)
                );

                let newNonFabPromoData = nonPromoFabArray[0];
                let oldNonFabPromoData = nonPromoFabArray[0];

                let ısnonfabpromovalue = 0;
                nonPromoFabArray.map((data) => {
                    return (
                        (oldNonFabPromoData = newNonFabPromoData),
                        (newNonFabPromoData = data),
                        oldNonFabPromoData === 0 && newNonFabPromoData === 1 ? ısnonfabpromovalue++ : null
                    );
                });

                setIsNonFabPromo(ısnonfabpromovalue);
                //iki diziyi birleştirdim promoarray ve nonpromoarray
                let ıstotalFabArray = 0;
                let totalFabArray = promoFabArray.concat(nonPromoFabArray);

                totalFabArray.map((data) => (data !== 0 ? ıstotalFabArray++ : null));

                ıstotalFabArray === 0 ? setTotalFabArrayResult(0) : setTotalFabArrayResult(1);

                //promoarrayresult state'ini değiştiriyorum
                let ısPromoFabArrayResult = 0;

                promoFabArray.map((data) => (data === 0 ? ısPromoFabArrayResult++ : null));

                ısPromoFabArrayResult === 6 ? setPromoFabArrayResult(1) : setPromoFabArrayResult(0);

                //march
                const promoMarArray = [];
                const nonPromoMarArray = [];

                const marpromo = march.promo.filter((data) => data.id < 7);
                const nonMarpromo = march.promo.filter((data) => data.id >= 7);

                marpromo.map((data) => (data.name.length !== 0 ? promoMarArray.push(1) : promoMarArray.push(0)));

                let newMarData = promoMarArray[0];
                let oldMarData = promoMarArray[0];
                let ısmarpromovalue = 0;
                promoMarArray.map((data) => {
                    return (
                        (oldMarData = newMarData),
                        (newMarData = data),
                        oldMarData === 0 && newMarData === 1 ? ısmarpromovalue++ : null
                    );
                });
                setIsMarPromo(ısmarpromovalue);

                nonMarpromo.map((data) =>
                    data.name.length !== 0 ? nonPromoMarArray.push(1) : nonPromoMarArray.push(0)
                );

                let newNonMarPromoData = nonPromoMarArray[0];
                let oldNonMarPromoData = nonPromoMarArray[0];

                let ısnonmarpromovalue = 0;
                nonPromoMarArray.map((data) => {
                    return (
                        (oldNonMarPromoData = newNonMarPromoData),
                        (newNonMarPromoData = data),
                        oldNonMarPromoData === 0 && newNonMarPromoData === 1 ? ısnonmarpromovalue++ : null
                    );
                });

                setIsNonMarPromo(ısnonmarpromovalue);
                //iki diziyi birleştirdim promoarray ve nonpromoarray
                let ıstotalMarArray = 0;
                let totalMarArray = promoMarArray.concat(nonPromoMarArray);

                totalMarArray.map((data) => (data !== 0 ? ıstotalMarArray++ : null));

                ıstotalMarArray === 0 ? setTotalMarArrayResult(0) : setTotalMarArrayResult(1);

                //promoarrayresult state'ini değiştiriyorum
                let ısPromoMarArrayResult = 0;

                promoMarArray.map((data) => (data === 0 ? ısPromoMarArrayResult++ : null));

                ısPromoMarArrayResult === 6 ? setPromoMarArrayResult(1) : setPromoMarArrayResult(0);
            } else if (selectQuarter.value === 2) {
                setIsSave2(true);
                setShow(true);
                //april
                const promoArray = [];
                const nonPromoArray = [];

                const promo = april.promo.filter((data) => data.id < 7);
                const nonpromo = april.promo.filter((data) => data.id >= 7);

                promo.map((data) => (data.name.length !== 0 ? promoArray.push(1) : promoArray.push(0)));

                let newData = promoArray[0];
                let oldData = promoArray[0];
                let ıspromovalue = 0;
                promoArray.map((data) => {
                    return (
                        (oldData = newData), (newData = data), oldData === 0 && newData === 1 ? ıspromovalue++ : null
                    );
                });
                setIsAprPromo(ıspromovalue);

                nonpromo.map((data) => (data.name.length !== 0 ? nonPromoArray.push(1) : nonPromoArray.push(0)));

                let newNonPromoData = nonPromoArray[0];
                let oldNonPromoData = nonPromoArray[0];

                let ısnonpromovalue = 0;
                nonPromoArray.map((data) => {
                    return (
                        (oldNonPromoData = newNonPromoData),
                        (newNonPromoData = data),
                        oldNonPromoData === 0 && newNonPromoData === 1 ? ısnonpromovalue++ : null
                    );
                });

                setIsNonAprPromo(ısnonpromovalue);
                //iki diziyi birleştirdim promoarray ve nonpromoarray
                let ıstotalArray = 0;
                let totalArray = promoArray.concat(nonPromoArray);

                totalArray.map((data) => (data !== 0 ? ıstotalArray++ : null));

                ıstotalArray === 0 ? setTotalAprArrayResult(0) : setTotalAprArrayResult(1);

                //promoarrayresult state'ini değiştiriyorum
                let ısPromoArrayResult = 0;

                promoArray.map((data) => (data === 0 ? ısPromoArrayResult++ : null));

                ısPromoArrayResult === 6 ? setPromoAprArrayResult(1) : setPromoAprArrayResult(0);

                //may
                const promoFabArray = [];
                const nonPromoFabArray = [];

                const fabpromo = mayy.promo.filter((data) => data.id < 7);
                const nonFabpromo = mayy.promo.filter((data) => data.id >= 7);

                fabpromo.map((data) => (data.name.length !== 0 ? promoFabArray.push(1) : promoFabArray.push(0)));

                let newFabData = promoFabArray[0];
                let oldFabData = promoFabArray[0];
                let ısfabpromovalue = 0;
                promoFabArray.map((data) => {
                    return (
                        (oldFabData = newFabData),
                        (newFabData = data),
                        oldFabData === 0 && newFabData === 1 ? ısfabpromovalue++ : null
                    );
                });
                setIsMayPromo(ısfabpromovalue);

                nonFabpromo.map((data) =>
                    data.name.length !== 0 ? nonPromoFabArray.push(1) : nonPromoFabArray.push(0)
                );

                let newNonFabPromoData = nonPromoFabArray[0];
                let oldNonFabPromoData = nonPromoFabArray[0];

                let ısnonfabpromovalue = 0;
                nonPromoFabArray.map((data) => {
                    return (
                        (oldNonFabPromoData = newNonFabPromoData),
                        (newNonFabPromoData = data),
                        oldNonFabPromoData === 0 && newNonFabPromoData === 1 ? ısnonfabpromovalue++ : null
                    );
                });

                setIsNonMayPromo(ısnonfabpromovalue);
                //iki diziyi birleştirdim promoarray ve nonpromoarray
                let ıstotalFabArray = 0;
                let totalFabArray = promoFabArray.concat(nonPromoFabArray);

                totalFabArray.map((data) => (data !== 0 ? ıstotalFabArray++ : null));

                ıstotalFabArray === 0 ? setTotalMayArrayResult(0) : setTotalMayArrayResult(1);

                //promoarrayresult state'ini değiştiriyorum
                let ısPromoFabArrayResult = 0;

                promoFabArray.map((data) => (data === 0 ? ısPromoFabArrayResult++ : null));

                ısPromoFabArrayResult === 6 ? setPromoMayArrayResult(1) : setPromoMayArrayResult(0);

                //june
                const promoMarArray = [];
                const nonPromoMarArray = [];

                const marpromo = june.promo.filter((data) => data.id < 7);
                const nonMarpromo = june.promo.filter((data) => data.id >= 7);

                marpromo.map((data) => (data.name.length !== 0 ? promoMarArray.push(1) : promoMarArray.push(0)));

                let newMarData = promoMarArray[0];
                let oldMarData = promoMarArray[0];
                let ısmarpromovalue = 0;
                promoMarArray.map((data) => {
                    return (
                        (oldMarData = newMarData),
                        (newMarData = data),
                        oldMarData === 0 && newMarData === 1 ? ısmarpromovalue++ : null
                    );
                });
                setIsJunPromo(ısmarpromovalue);

                nonMarpromo.map((data) =>
                    data.name.length !== 0 ? nonPromoMarArray.push(1) : nonPromoMarArray.push(0)
                );

                let newNonMarPromoData = nonPromoMarArray[0];
                let oldNonMarPromoData = nonPromoMarArray[0];

                let ısnonmarpromovalue = 0;
                nonPromoMarArray.map((data) => {
                    return (
                        (oldNonMarPromoData = newNonMarPromoData),
                        (newNonMarPromoData = data),
                        oldNonMarPromoData === 0 && newNonMarPromoData === 1 ? ısnonmarpromovalue++ : null
                    );
                });

                setIsNonJunPromo(ısnonmarpromovalue);
                //iki diziyi birleştirdim promoarray ve nonpromoarray
                let ıstotalMarArray = 0;
                let totalMarArray = promoMarArray.concat(nonPromoMarArray);

                totalMarArray.map((data) => (data !== 0 ? ıstotalMarArray++ : null));

                ıstotalMarArray === 0 ? setTotalJunArrayResult(0) : setTotalJunArrayResult(1);

                //promoarrayresult state'ini değiştiriyorum
                let ısPromoMarArrayResult = 0;

                promoMarArray.map((data) => (data === 0 ? ısPromoMarArrayResult++ : null));

                ısPromoMarArrayResult === 6 ? setPromoJunArrayResult(1) : setPromoJunArrayResult(0);
            } else if (selectQuarter.value === 3) {
                setIsSave3(true);
                setShow(true);

                //july
                const promoArray = [];
                const nonPromoArray = [];

                const promo = july.promo.filter((data) => data.id < 7);
                const nonpromo = july.promo.filter((data) => data.id >= 7);

                promo.map((data) => (data.name.length !== 0 ? promoArray.push(1) : promoArray.push(0)));

                let newData = promoArray[0];
                let oldData = promoArray[0];
                let ıspromovalue = 0;
                promoArray.map((data) => {
                    return (
                        (oldData = newData), (newData = data), oldData === 0 && newData === 1 ? ıspromovalue++ : null
                    );
                });
                setIsJulPromo(ıspromovalue);

                nonpromo.map((data) => (data.name.length !== 0 ? nonPromoArray.push(1) : nonPromoArray.push(0)));

                let newNonPromoData = nonPromoArray[0];
                let oldNonPromoData = nonPromoArray[0];

                let ısnonpromovalue = 0;
                nonPromoArray.map((data) => {
                    return (
                        (oldNonPromoData = newNonPromoData),
                        (newNonPromoData = data),
                        oldNonPromoData === 0 && newNonPromoData === 1 ? ısnonpromovalue++ : null
                    );
                });

                setIsNonJulPromo(ısnonpromovalue);
                //iki diziyi birleştirdim promoarray ve nonpromoarray
                let ıstotalArray = 0;
                let totalArray = promoArray.concat(nonPromoArray);

                totalArray.map((data) => (data !== 0 ? ıstotalArray++ : null));

                ıstotalArray === 0 ? setTotalJulArrayResult(0) : setTotalJulArrayResult(1);

                //promoarrayresult state'ini değiştiriyorum
                let ısPromoArrayResult = 0;

                promoArray.map((data) => (data === 0 ? ısPromoArrayResult++ : null));

                ısPromoArrayResult === 6 ? setPromoJulArrayResult(1) : setPromoJulArrayResult(0);

                //aug
                const promoFabArray = [];
                const nonPromoFabArray = [];

                const fabpromo = august.promo.filter((data) => data.id < 7);
                const nonFabpromo = august.promo.filter((data) => data.id >= 7);

                fabpromo.map((data) => (data.name.length !== 0 ? promoFabArray.push(1) : promoFabArray.push(0)));

                let newFabData = promoFabArray[0];
                let oldFabData = promoFabArray[0];
                let ısfabpromovalue = 0;
                promoFabArray.map((data) => {
                    return (
                        (oldFabData = newFabData),
                        (newFabData = data),
                        oldFabData === 0 && newFabData === 1 ? ısfabpromovalue++ : null
                    );
                });
                setIsAugPromo(ısfabpromovalue);

                nonFabpromo.map((data) =>
                    data.name.length !== 0 ? nonPromoFabArray.push(1) : nonPromoFabArray.push(0)
                );

                let newNonFabPromoData = nonPromoFabArray[0];
                let oldNonFabPromoData = nonPromoFabArray[0];

                let ısnonfabpromovalue = 0;
                nonPromoFabArray.map((data) => {
                    return (
                        (oldNonFabPromoData = newNonFabPromoData),
                        (newNonFabPromoData = data),
                        oldNonFabPromoData === 0 && newNonFabPromoData === 1 ? ısnonfabpromovalue++ : null
                    );
                });

                setIsNonAugPromo(ısnonfabpromovalue);
                //iki diziyi birleştirdim promoarray ve nonpromoarray
                let ıstotalFabArray = 0;
                let totalFabArray = promoFabArray.concat(nonPromoFabArray);

                totalFabArray.map((data) => (data !== 0 ? ıstotalFabArray++ : null));

                ıstotalFabArray === 0 ? setTotalAugArrayResult(0) : setTotalAugArrayResult(1);

                //promoarrayresult state'ini değiştiriyorum
                let ısPromoFabArrayResult = 0;

                promoFabArray.map((data) => (data === 0 ? ısPromoFabArrayResult++ : null));

                ısPromoFabArrayResult === 6 ? setPromoAugArrayResult(1) : setPromoAugArrayResult(0);

                //sep
                const promoMarArray = [];
                const nonPromoMarArray = [];

                const marpromo = september.promo.filter((data) => data.id < 7);
                const nonMarpromo = september.promo.filter((data) => data.id >= 7);

                marpromo.map((data) => (data.name.length !== 0 ? promoMarArray.push(1) : promoMarArray.push(0)));

                let newMarData = promoMarArray[0];
                let oldMarData = promoMarArray[0];
                let ısmarpromovalue = 0;
                promoMarArray.map((data) => {
                    return (
                        (oldMarData = newMarData),
                        (newMarData = data),
                        oldMarData === 0 && newMarData === 1 ? ısmarpromovalue++ : null
                    );
                });
                setIsSepPromo(ısmarpromovalue);

                nonMarpromo.map((data) =>
                    data.name.length !== 0 ? nonPromoMarArray.push(1) : nonPromoMarArray.push(0)
                );

                let newNonMarPromoData = nonPromoMarArray[0];
                let oldNonMarPromoData = nonPromoMarArray[0];

                let ısnonmarpromovalue = 0;
                nonPromoMarArray.map((data) => {
                    return (
                        (oldNonMarPromoData = newNonMarPromoData),
                        (newNonMarPromoData = data),
                        oldNonMarPromoData === 0 && newNonMarPromoData === 1 ? ısnonmarpromovalue++ : null
                    );
                });

                setIsNonSepPromo(ısnonmarpromovalue);
                //iki diziyi birleştirdim promoarray ve nonpromoarray
                let ıstotalMarArray = 0;
                let totalMarArray = promoMarArray.concat(nonPromoMarArray);

                totalMarArray.map((data) => (data !== 0 ? ıstotalMarArray++ : null));

                ıstotalMarArray === 0 ? setTotalSepArrayResult(0) : setTotalSepArrayResult(1);

                //promoarrayresult state'ini değiştiriyorum
                let ısPromoMarArrayResult = 0;

                promoMarArray.map((data) => (data === 0 ? ısPromoMarArrayResult++ : null));

                ısPromoMarArrayResult === 6 ? setPromoSepArrayResult(1) : setPromoSepArrayResult(0);
            } else if (selectQuarter.value === 4) {
                setIsSave4(true);
                setShow(true);

                //oct
                const promoArray = [];
                const nonPromoArray = [];

                const promo = octember.promo.filter((data) => data.id < 7);
                const nonpromo = octember.promo.filter((data) => data.id >= 7);

                promo.map((data) => (data.name.length !== 0 ? promoArray.push(1) : promoArray.push(0)));

                let newData = promoArray[0];
                let oldData = promoArray[0];
                let ıspromovalue = 0;
                promoArray.map((data) => {
                    return (
                        (oldData = newData), (newData = data), oldData === 0 && newData === 1 ? ıspromovalue++ : null
                    );
                });
                setIsOctPromo(ıspromovalue);

                nonpromo.map((data) => (data.name.length !== 0 ? nonPromoArray.push(1) : nonPromoArray.push(0)));

                let newNonPromoData = nonPromoArray[0];
                let oldNonPromoData = nonPromoArray[0];

                let ısnonpromovalue = 0;
                nonPromoArray.map((data) => {
                    return (
                        (oldNonPromoData = newNonPromoData),
                        (newNonPromoData = data),
                        oldNonPromoData === 0 && newNonPromoData === 1 ? ısnonpromovalue++ : null
                    );
                });

                setIsNonOctPromo(ısnonpromovalue);
                //iki diziyi birleştirdim promoarray ve nonpromoarray
                let ıstotalArray = 0;
                let totalArray = promoArray.concat(nonPromoArray);

                totalArray.map((data) => (data !== 0 ? ıstotalArray++ : null));

                ıstotalArray === 0 ? setTotalOctArrayResult(0) : setTotalOctArrayResult(1);

                //promoarrayresult state'ini değiştiriyorum
                let ısPromoArrayResult = 0;

                promoArray.map((data) => (data === 0 ? ısPromoArrayResult++ : null));

                ısPromoArrayResult === 6 ? setPromoOctArrayResult(1) : setPromoOctArrayResult(0);

                //nov
                const promoFabArray = [];
                const nonPromoFabArray = [];

                const fabpromo = november.promo.filter((data) => data.id < 7);
                const nonFabpromo = november.promo.filter((data) => data.id >= 7);

                fabpromo.map((data) => (data.name.length !== 0 ? promoFabArray.push(1) : promoFabArray.push(0)));

                let newFabData = promoFabArray[0];
                let oldFabData = promoFabArray[0];
                let ısfabpromovalue = 0;
                promoFabArray.map((data) => {
                    return (
                        (oldFabData = newFabData),
                        (newFabData = data),
                        oldFabData === 0 && newFabData === 1 ? ısfabpromovalue++ : null
                    );
                });
                setIsNovPromo(ısfabpromovalue);

                nonFabpromo.map((data) =>
                    data.name.length !== 0 ? nonPromoFabArray.push(1) : nonPromoFabArray.push(0)
                );

                let newNonFabPromoData = nonPromoFabArray[0];
                let oldNonFabPromoData = nonPromoFabArray[0];

                let ısnonfabpromovalue = 0;
                nonPromoFabArray.map((data) => {
                    return (
                        (oldNonFabPromoData = newNonFabPromoData),
                        (newNonFabPromoData = data),
                        oldNonFabPromoData === 0 && newNonFabPromoData === 1 ? ısnonfabpromovalue++ : null
                    );
                });

                setIsNonNovPromo(ısnonfabpromovalue);
                //iki diziyi birleştirdim promoarray ve nonpromoarray
                let ıstotalFabArray = 0;
                let totalFabArray = promoFabArray.concat(nonPromoFabArray);

                totalFabArray.map((data) => (data !== 0 ? ıstotalFabArray++ : null));

                ıstotalFabArray === 0 ? setTotalNovArrayResult(0) : setTotalNovArrayResult(1);

                //promoarrayresult state'ini değiştiriyorum
                let ısPromoFabArrayResult = 0;

                promoFabArray.map((data) => (data === 0 ? ısPromoFabArrayResult++ : null));

                ısPromoFabArrayResult === 6 ? setPromoNovArrayResult(1) : setPromoNovArrayResult(0);

                //dec
                const promoMarArray = [];
                const nonPromoMarArray = [];

                const marpromo = december.promo.filter((data) => data.id < 7);
                const nonMarpromo = december.promo.filter((data) => data.id >= 7);

                marpromo.map((data) => (data.name.length !== 0 ? promoMarArray.push(1) : promoMarArray.push(0)));

                let newMarData = promoMarArray[0];
                let oldMarData = promoMarArray[0];
                let ısmarpromovalue = 0;
                promoMarArray.map((data) => {
                    return (
                        (oldMarData = newMarData),
                        (newMarData = data),
                        oldMarData === 0 && newMarData === 1 ? ısmarpromovalue++ : null
                    );
                });
                setIsDecPromo(ısmarpromovalue);

                nonMarpromo.map((data) =>
                    data.name.length !== 0 ? nonPromoMarArray.push(1) : nonPromoMarArray.push(0)
                );

                let newNonMarPromoData = nonPromoMarArray[0];
                let oldNonMarPromoData = nonPromoMarArray[0];

                let ısnonmarpromovalue = 0;
                nonPromoMarArray.map((data) => {
                    return (
                        (oldNonMarPromoData = newNonMarPromoData),
                        (newNonMarPromoData = data),
                        oldNonMarPromoData === 0 && newNonMarPromoData === 1 ? ısnonmarpromovalue++ : null
                    );
                });

                setIsNonDecPromo(ısnonmarpromovalue);
                //iki diziyi birleştirdim promoarray ve nonpromoarray
                let ıstotalMarArray = 0;
                let totalMarArray = promoMarArray.concat(nonPromoMarArray);

                totalMarArray.map((data) => (data !== 0 ? ıstotalMarArray++ : null));

                ıstotalMarArray === 0 ? setTotalDecArrayResult(0) : setTotalDecArrayResult(1);

                //promoarrayresult state'ini değiştiriyorum
                let ısPromoMarArrayResult = 0;

                promoMarArray.map((data) => (data === 0 ? ısPromoMarArrayResult++ : null));

                ısPromoMarArrayResult === 6 ? setPromoDecArrayResult(1) : setPromoDecArrayResult(0);
            }
        }
    }, [
        selectQuarter,
        april,
        august,
        columns,
        december,
        fabruary,
        july,
        june,
        march,
        mayy,
        november,
        octember,
        september,
    ]);

    //  filters
    const [isOpen, setIsOpen] = useState(true);

    const openCollapse = () => {
        setIsOpen(!isOpen);
        // setIsApply(false);
        // setisTable(true);
    };

    // const saveFilter = () => {

    //     setIsOpen(false);
    //     const productPA = {
    //         CountryId: selectCompanies.value,
    //         BusinessUnitId: selectBusinessUnite.value,
    //         Year: selectYears[0].value,
    //         Quarter: selectQuarterId,
    //         SpecId: selectSpecializationId[0],
    //         Category: selectCategory.map((index) => index).toString(),
    //         OrganizationTypeId: selectOrganizationsId[0],
    //     }
    //     FetchApiPost('services/VisitMix/GetProductPriorityAllocation', 'POST', productPA)
    //         .then(response => response.json())
    //         .then(response => {
    //             setAllProductDatas(response)
    //             if (selectQuarterId === 1) {
    //                 let firstMounth = response.data.filter((obj) => obj.month === 1).map((index, x) =>
    //                 ({
    //                     brandId: index.brandId,
    //                     businessUnitName: index.businessUnitName,
    //                     businessUnitId: index.businessUnitId,
    //                     categoryName: index.categoryName,
    //                     countryId: index.countryId,
    //                     month: index.month,
    //                     organizationTypeId: index.organizationTypeId,
    //                     specId: index.specId,
    //                     specName: index.specName,
    //                     year: index.year,
    //                     id: x,
    //                     Priority1: index.priority,
    //                     Allocation1: index.allocation,
    //                     Product1: index.brandName,
    //                     Promo1: index.promoType
    //                 })
    //                 )
    //                 let secondMounth = response.data.filter((obj) => obj.month === 2).map((index, x) =>
    //                 ({
    //                     brandId: index.brandId,
    //                     businessUnitName: index.businessUnitName,
    //                     businessUnitId: index.businessUnitId,
    //                     categoryName: index.categoryName,
    //                     countryId: index.countryId,
    //                     month: index.month,
    //                     organizationTypeId: index.organizationTypeId,
    //                     specId: index.specId,
    //                     specName: index.specName,
    //                     year: index.year,
    //                     id: x,
    //                     Priority1: index.priority,
    //                     Allocation1: index.allocation,
    //                     Product1: index.brandName,
    //                     Promo1: index.promoType
    //                 })
    //                 )
    //                 let thirdMounth = response.data.filter((obj) => obj.month === 3).map((index, x) =>
    //                 ({
    //                     brandId: index.brandId,
    //                     businessUnitName: index.businessUnitName,
    //                     businessUnitId: index.businessUnitId,
    //                     categoryName: index.categoryName,
    //                     countryId: index.countryId,
    //                     month: index.month,
    //                     organizationTypeId: index.organizationTypeId,
    //                     specId: index.specId,
    //                     specName: index.specName,
    //                     year: index.year,
    //                     id: x,
    //                     Priority1: index.priority,
    //                     Allocation1: index.allocation,
    //                     Product1: index.brandName,
    //                     Promo1: index.promoType
    //                 })
    //                 )
    //                 setFirstMounthDatas(firstMounth);
    //                 setSecondMounthDatas(secondMounth);
    //                 setThirdMounthDatas(thirdMounth);
    //             }
    //             setEnableSelectPN(true);
    //             setAnimateTables(true);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    //     setIsOpenEdit(false);
    // }

    // FILTER

    //Years
    //let date=new Date();

    let years = new Date().getFullYear();
    const [selectYearValue, setSelectYearValue] = useState(years);

    //Brand
    const [brandDatas, setBrandDatas] = useState([]);
    const [selectBrand, setSelectBrand] = useState([]);

    //--------------------

    const savePPA = (api, body) => {
        return FetchApiPost(api, 'POST', body).then((res) =>
            (async () => {
                try {
                    if (res.status === 201) {
                        setIsSaveFrequency(true);
                    } else if (res.status === 409) {
                        res.json().then((data) => setSaveFrequencyError(data.errors[0]));
                        setIsSaveFrequency(false);
                    } else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    };

    const saveRequest = (SaveProductPriorityAllocation, name) => {
        if (name === 'spec') {
            savePPA('services/VisitMix/SaveProductPriorityAllocation', SaveProductPriorityAllocation);
        } else if (name === 'cust') {
            savePPA('services/VisitMix/SaveProductPriorityAllocationForCustomer', SaveProductPriorityAllocation);
        } else {
            savePPA('services/VisitMix/SaveProductPriorityAllocationForPharmacy', SaveProductPriorityAllocation);
        }
    };

    const clientId = () => {
        if (selectAllFilters?.selectClientType?.value === 246) {
            if (selectAllFilters?.selectClinic === undefined && selectAllFilters?.selectClient === undefined) {
                return 0;
            } else {
                return selectAllFilters?.selectClient.value;
            }
        } else {
            return 0;
        }
    };
    const save = () => {
        setisSaveClick(true);

        const genelToplamQ1 = [];
        const genelToplamQ2 = [];
        const genelToplamQ3 = [];
        const genelToplamQ4 = [];

        if (selectQuarter.value === 1) {
            let toplam = [];

            columns.promo.map((data) => (data.name.length !== 0 ? toplam.push(data) : null));
            fabruary.promo.map((data) => (data.name.length !== 0 ? toplam.push(data) : null));
            march.promo.map((data) => (data.name.length !== 0 ? toplam.push(data) : null));
            toplam.map((data) =>
                genelToplamQ1.push({
                    brandId: data.name.brandId,
                    brandName: data.name.brandName,
                    priority:
                        data.id === '7'
                            ? 1
                            : data.id === '8'
                            ? 2
                            : data.id === '9'
                            ? 3
                            : data.id === '10'
                            ? 4
                            : Number(data.id),
                        //:data.id // değilse burası 6 dan büyük değilse
                    allocation: data.name.allocation,
                    year: selectAllFilters?.selectYear?.value,
                    month: data.name.month,
                    countryId: selectAllFilters?.selectCountry?.value,
                    specId: selectAllFilters?.selectSpecialization?.value,
                    specName: selectAllFilters?.selectSpecialization?.label,
                    businessUnitId: selectAllFilters?.selectBusUnit?.value,
                    businessUnitName: selectAllFilters?.selectBusUnit?.label,
                    categoryName: selectAllFilters?.selectCategory?.label,
                    placeId: selectAllFilters?.selectPlace?.value,
                    placeTypeId: selectAllFilters?.selectPlaceType?.value,
                    typeOfPriorityId: selectAllFilters?.selectTypeOfPriority?.value,
                    clientTypeId: selectAllFilters?.selectClientType?.value,
                    clientId:
                        selectAllFilters?.selectClientType?.value === 246 ? selectAllFilters?.selectClient?.value : 0,
                    PromoType: Number(data.id) < 7 ? 1 : Number(data.id) >= 7 ? 3 : null,
                })
            );
        } else if (selectQuarter.value === 2) {
            if (selectQuarter.value === 2) {
                let toplam = [];
                april.promo.map((data) => (data.name.length !== 0 ? toplam.push(data) : null));
                mayy.promo.map((data) => (data.name.length !== 0 ? toplam.push(data) : null));
                june.promo.map((data) => (data.name.length !== 0 ? toplam.push(data) : null));

                toplam.map((data) =>
                    genelToplamQ2.push({
                        brandId: data.name.brandId,
                        brandName: data.name.brandName,
                        priority:
                            data.id === '7'
                                ? 1
                                : data.id === '8'
                                ? 2
                                : data.id === '9'
                                ? 3
                                : data.id === '10'
                                ? 4
                                : Number(data.id),
                            //:data.id // değilse burası 6 dan büyük değilse
                        allocation: data.name.allocation,
                        year: selectAllFilters?.selectYear?.value,
                        month: data.name.month,
                        countryId: selectAllFilters?.selectCountry?.value,
                        specId: selectAllFilters?.selectSpecialization?.value,
                        specName: selectAllFilters?.selectSpecialization?.label,
                        businessUnitId: selectAllFilters?.selectBusUnit?.value,
                        businessUnitName: selectAllFilters?.selectBusUnit?.label,
                        categoryName: selectAllFilters?.selectCategory?.label,
                        placeId: selectAllFilters?.selectPlace?.value,
                        placeTypeId: selectAllFilters?.selectPlaceType?.value,
                        typeOfPriorityId: selectAllFilters?.selectTypeOfPriority?.value,
                        clientTypeId: selectAllFilters?.selectClientType?.value,
                        clientId: clientId(),
                        PromoType: Number(data.id) < 7 ? 1 : Number(data.id) >= 7 ? 3 : null,
                    })
                );
            }
        } else if (selectQuarter.value === 3) {
            if (selectQuarter.value === 3) {
                let toplam = [];
                july.promo.map((data) => (data.name.length !== 0 ? toplam.push(data) : null));
                august.promo.map((data) => (data.name.length !== 0 ? toplam.push(data) : null));
                september.promo.map((data) => (data.name.length !== 0 ? toplam.push(data) : null));

                toplam.map((data) =>
                    genelToplamQ3.push({
                        brandId: data.name.brandId,
                        brandName: data.name.brandName,
                        priority:
                            data.id === '7'
                                ? 1
                                : data.id === '8'
                                ? 2
                                : data.id === '9'
                                ? 3
                                : data.id === '10'
                                ? 4
                                : Number(data.id),
                            //:data.id // değilse burası 6 dan büyük değilse
                        allocation: data.name.allocation,
                        year: selectAllFilters?.selectYear?.value,
                        month: data.name.month,
                        countryId: selectAllFilters?.selectCountry?.value,
                        specId: selectAllFilters?.selectSpecialization?.value,
                        specName: selectAllFilters?.selectSpecialization?.label,
                        businessUnitId: selectAllFilters?.selectBusUnit?.value,
                        businessUnitName: selectAllFilters?.selectBusUnit?.label,
                        categoryName: selectAllFilters?.selectCategory?.label,
                        placeId: selectAllFilters?.selectPlace?.value,
                        placeTypeId: selectAllFilters?.selectPlaceType?.value,
                        typeOfPriorityId: selectAllFilters?.selectTypeOfPriority?.value,
                        clientTypeId: selectAllFilters?.selectClientType?.value,
                        clientId:
                            selectAllFilters?.selectClientType?.value === 246
                                ? selectAllFilters?.selectClient?.value
                                : 0,
                        PromoType: Number(data.id) < 7 ? 1 : Number(data.id) >= 7 ? 3 : null,
                    })
                );
            }
        } else if (selectQuarter.value === 4) {
            if (selectQuarter.value === 4) {
                let toplam = [];
                octember.promo.map((data) => (data.name.length !== 0 ? toplam.push(data) : null));
                november.promo.map((data) => (data.name.length !== 0 ? toplam.push(data) : null));
                december.promo.map((data) => (data.name.length !== 0 ? toplam.push(data) : null));
                toplam.map((data) =>
                    genelToplamQ4.push({
                        brandId: data.name.brandId,
                        brandName: data.name.brandName,
                        priority:
                            data.id === '7'
                                ? 1
                                : data.id === '8'
                                ? 2
                                : data.id === '9'
                                ? 3
                                : data.id === '10'
                                ? 4
                                : Number(data.id),
                            //:data.id // değilse burası 6 dan büyük değilse
                        allocation: data.name.allocation,
                        year: selectAllFilters?.selectYear?.value,
                        month: data.name.month,
                        countryId: selectAllFilters?.selectCountry?.value,
                        specId: selectAllFilters?.selectSpecialization?.value,
                        specName: selectAllFilters?.selectSpecialization?.label,
                        businessUnitId: selectAllFilters?.selectBusUnit?.value,
                        businessUnitName: selectAllFilters?.selectBusUnit?.label,
                        categoryName: selectAllFilters?.selectCategory?.label,
                        placeId: selectAllFilters?.selectPlace?.value,
                        placeTypeId: selectAllFilters?.selectPlaceType?.value,
                        typeOfPriorityId: selectAllFilters?.selectTypeOfPriority?.value,
                        clientTypeId: selectAllFilters?.selectClientType?.value,
                        clientId:
                            selectAllFilters?.selectClientType?.value === 246
                                ? selectAllFilters?.selectClient?.value
                                : 0,
                        PromoType: Number(data.id) < 7 ? 1 : Number(data.id) >= 7 ? 3 : null,
                    })
                );
            }
        }
        const SaveProductPriorityAllocation = {
            CountryId: selectAllFilters?.selectCountry?.value,
            BusinessUnitId: selectAllFilters?.selectBusUnit?.value,
            BusinessUnitName: selectAllFilters?.selectBusUnit?.label,
            Year: selectAllFilters?.selectYear?.value,
            Quarter: selectQuarter?.value,
            SpecName: selectAllFilters?.selectSpecialization?.label,
            SpecId: selectAllFilters?.selectSpecialization?.value,
            Category: selectAllFilters?.selectCategory?.value,
            OrganizationTypeId: selectAllFilters?.selectOrgType?.value,
            OrganizationTypeName: selectAllFilters?.selectOrgType?.label,
            productPriorityAllocations:
                selectQuarter.value === 1
                    ? genelToplamQ1
                    : selectQuarter.value === 2
                    ? genelToplamQ2
                    : selectQuarter.value === 3
                    ? genelToplamQ3
                    : selectQuarter.value === 4
                    ? genelToplamQ4
                    : null,
        };

        const SaveProductPriorityAllocationSpec = {
            CountryId: selectAllFilters?.selectCountry?.value,
            BusinessUnitId: selectAllFilters?.selectBusUnit?.value,
            BusinessUnitName: selectAllFilters?.selectBusUnit?.label,
            Year: selectAllFilters?.selectYear?.value,
            Quarter: selectQuarter?.value,
            SpecName: selectAllFilters?.selectSpecialization?.label,
            SpecId: selectAllFilters?.selectSpecialization?.value,
            Category: selectAllFilters?.selectCategory?.label,
            placeId: selectAllFilters?.selectPlace?.value,
            placeTypeId: selectAllFilters?.selectPlaceType?.value,
            typeOfPriorityId: selectAllFilters?.selectTypeOfPriority?.value,
            productPriorityAllocations:
                selectQuarter.value === 1
                    ? genelToplamQ1
                    : selectQuarter.value === 2
                    ? genelToplamQ2
                    : selectQuarter.value === 3
                    ? genelToplamQ3
                    : selectQuarter.value === 4
                    ? genelToplamQ4
                    : null,
        };

        const SaveProductPriorityAllocationPharmacy = {
            CountryId: selectAllFilters?.selectCountry?.value,
            BusinessUnitId: selectAllFilters?.selectBusUnit?.value,
            BusinessUnitName: selectAllFilters?.selectBusUnit?.label,
            Year: selectAllFilters?.selectYear?.value,
            Quarter: selectQuarter?.value,
            SpecName: selectAllFilters?.selectSpecialization?.label,
            SpecId: selectAllFilters?.selectSpecialization?.value,
            Category: selectAllFilters?.selectCategory?.label,
            placeId: selectAllFilters?.selectPlace?.value,
            placeTypeId: selectAllFilters?.selectPlaceType?.value,
            typeOfPriorityId: selectAllFilters?.selectTypeOfPriority?.value,
            clientTypeId: selectAllFilters?.selectClientType?.value,
            productPriorityAllocations:
                selectQuarter.value === 1
                    ? genelToplamQ1
                    : selectQuarter.value === 2
                    ? genelToplamQ2
                    : selectQuarter.value === 3
                    ? genelToplamQ3
                    : selectQuarter.value === 4
                    ? genelToplamQ4
                    : null,
        };

        const SaveProductPriorityAllocationCustomer = {
            CountryId: selectAllFilters?.selectCountry?.value,
            BusinessUnitId: selectAllFilters?.selectBusUnit?.value,
            BusinessUnitName: selectAllFilters?.selectBusUnit?.label,
            Year: selectAllFilters?.selectYear?.value,
            Quarter: selectQuarter?.value,
            SpecName: selectAllFilters?.selectSpecialization?.label,
            SpecId: selectAllFilters?.selectSpecialization?.value,
            Category: selectAllFilters?.selectCategory?.label,
            placeId: selectAllFilters?.selectPlace?.value,
            placeTypeId: selectAllFilters?.selectPlaceType?.value,
            typeOfPriorityId: selectAllFilters?.selectTypeOfPriority?.value,
            clientTypeId: selectAllFilters?.selectClientType?.value,
            clientId: selectAllFilters?.selectClient?.value,
            productPriorityAllocations:
                selectQuarter.value === 1
                    ? genelToplamQ1
                    : selectQuarter.value === 2
                    ? genelToplamQ2
                    : selectQuarter.value === 3
                    ? genelToplamQ3
                    : selectQuarter.value === 4
                    ? genelToplamQ4
                    : null,
        };

        if (selectFilterName === 'customer') {
            SaveProductPriorityAllocation.customerId = selectAllFilters?.selectCustomer?.value;
        }
        if (selectFilterName === 'pharmacy') {
            SaveProductPriorityAllocation.PharmacyId = selectAllFilters?.selectPharmacyNameAdress?.value;
        }
        if (selectQuarter.value === 1) {
            if (1 >= new Date().getMonth() + 1) {
                if (
                    ısPromo === 0 &&
                    ısNonPromo === 0 &&
                    ısFabPromo === 0 &&
                    ısNonFabPromo === 0 &&
                    ısMarPromo === 0 &&
                    ısNonMarPromo === 0 &&
                    promoArrayResult === 0 &&
                    promoFabArrayResult === 0 &&
                    promoMarArrayResult === 0 &&
                    ısSave === true
                ) {
                    if (selectAllFilters?.selectClientType?.value === 92) {
                        if (
                            selectAllFilters?.selectClinic === undefined &&
                            selectAllFilters?.selectClient === undefined
                        ) {
                            saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                        } else {
                            saveRequest(SaveProductPriorityAllocationCustomer, 'cust');
                        }
                    } else if (selectAllFilters?.selectClientType?.value === 99) {
                        saveRequest(SaveProductPriorityAllocationPharmacy, 'phar');
                    } else {
                        saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                    }
                }
            } else if (2 >= new Date().getMonth() + 1) {
                if (
                    ısFabPromo === 0 &&
                    ısNonFabPromo === 0 &&
                    ısMarPromo === 0 &&
                    ısNonMarPromo === 0 &&
                    promoFabArrayResult === 0 &&
                    promoMarArrayResult === 0 &&
                    ısSave === true
                ) {
                    if (selectAllFilters?.selectClientType?.value === 92) {
                        if (
                            selectAllFilters?.selectClinic === undefined &&
                            selectAllFilters?.selectClient === undefined
                        ) {
                            saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                        } else {
                            saveRequest(SaveProductPriorityAllocationCustomer, 'cust');
                        }
                    } else if (selectAllFilters?.selectClientType?.value === 99) {
                        saveRequest(SaveProductPriorityAllocationPharmacy, 'phar');
                    } else {
                        saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                    }
                }
            } else if (3 >= new Date().getMonth() + 1) {
                if (ısMarPromo === 0 && ısNonMarPromo === 0 && promoMarArrayResult === 0 && ısSave === true) {
                    if (selectAllFilters?.selectClientType?.value === 92) {
                        if (
                            selectAllFilters?.selectClinic === undefined &&
                            selectAllFilters?.selectClient === undefined
                        ) {
                            saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                        } else {
                            saveRequest(SaveProductPriorityAllocationCustomer, 'cust');
                        }
                    } else if (selectAllFilters?.selectClientType?.value === 99) {
                        saveRequest(SaveProductPriorityAllocationPharmacy, 'phar');
                    } else {
                        saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                    }
                }
            }
        } else if (selectQuarter.value === 2) {
            if (4 >= new Date().getMonth() + 1) {
                if (
                    ısAprPromo === 0 &&
                    ısNonAprPromo === 0 &&
                    ısMayPromo === 0 &&
                    ısNonMayPromo === 0 &&
                    ısJunPromo === 0 &&
                    ısNonJunPromo === 0 &&
                    promoAprArrayResult === 0 &&
                    promoMayArrayResult === 0 &&
                    promoJunArrayResult === 0 &&
                    ısSave2 === true
                ) {
                    if (selectAllFilters?.selectClientType?.value === 92) {
                        if (
                            selectAllFilters?.selectClinic === undefined &&
                            selectAllFilters?.selectClient === undefined
                        ) {
                            saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                        } else {
                            saveRequest(SaveProductPriorityAllocationCustomer, 'cust');
                        }
                    } else if (selectAllFilters?.selectClientType?.value === 99) {
                        saveRequest(SaveProductPriorityAllocationPharmacy, 'phar');
                    } else {
                        saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                    }
                }
            } else if (5 >= new Date().getMonth() + 1) {
                if (
                    ısMayPromo === 0 &&
                    ısNonMayPromo === 0 &&
                    ısJunPromo === 0 &&
                    ısNonJunPromo === 0 &&
                    promoMayArrayResult === 0 &&
                    promoJunArrayResult === 0 &&
                    ısSave2 === true
                ) {
                    if (selectAllFilters?.selectClientType?.value === 92) {
                        if (
                            selectAllFilters?.selectClinic === undefined &&
                            selectAllFilters?.selectClient === undefined
                        ) {
                            saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                        } else {
                            saveRequest(SaveProductPriorityAllocationCustomer, 'cust');
                        }
                    } else if (selectAllFilters?.selectClientType?.value === 99) {
                        saveRequest(SaveProductPriorityAllocationPharmacy, 'phar');
                    } else {
                        saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                    }
                }
            } else if (6 >= new Date().getMonth() + 1) {
                if (ısJunPromo === 0 && ısNonJunPromo === 0 && promoJunArrayResult === 0 && ısSave2 === true) {
                    if (selectAllFilters?.selectClientType?.value === 92) {
                        if (
                            selectAllFilters?.selectClinic === undefined &&
                            selectAllFilters?.selectClient === undefined
                        ) {
                            saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                        } else {
                            saveRequest(SaveProductPriorityAllocationCustomer, 'cust');
                        }
                    } else if (selectAllFilters?.selectClientType?.value === 99) {
                        saveRequest(SaveProductPriorityAllocationPharmacy, 'phar');
                    } else {
                        saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                    }
                }
            }
        } else if (selectQuarter.value === 3) {
            if (7 >= new Date().getMonth() + 1) {
                if (
                    ısJulPromo === 0 &&
                    ısNonJulPromo === 0 &&
                    ısAugPromo === 0 &&
                    ısNonAugPromo === 0 &&
                    ısSepPromo === 0 &&
                    ısNonSepPromo === 0 &&
                    promoJulArrayResult === 0 &&
                    promoAugArrayResult === 0 &&
                    promoSepArrayResult === 0 &&
                    ısSave3 === true
                ) {
                    if (selectAllFilters?.selectClientType?.value === 92) {
                        if (
                            selectAllFilters?.selectClinic === undefined &&
                            selectAllFilters?.selectClient === undefined
                        ) {
                            saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                        } else {
                            saveRequest(SaveProductPriorityAllocationCustomer, 'cust');
                        }
                    } else if (selectAllFilters?.selectClientType?.value === 99) {
                        saveRequest(SaveProductPriorityAllocationPharmacy, 'phar');
                    } else {
                        saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                    }
                }
            } else if (8 >= new Date().getMonth() + 1) {
                if (
                    ısAugPromo === 0 &&
                    ısNonAugPromo === 0 &&
                    ısSepPromo === 0 &&
                    ısNonSepPromo === 0 &&
                    promoAugArrayResult === 0 &&
                    promoSepArrayResult === 0 &&
                    ısSave3 === true
                ) {
                    if (selectAllFilters?.selectClientType?.value === 92) {
                        if (
                            selectAllFilters?.selectClinic === undefined &&
                            selectAllFilters?.selectClient === undefined
                        ) {
                            saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                        } else {
                            saveRequest(SaveProductPriorityAllocationCustomer, 'cust');
                        }
                    } else if (selectAllFilters?.selectClientType?.value === 99) {
                        saveRequest(SaveProductPriorityAllocationPharmacy, 'phar');
                    } else {
                        saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                    }
                }
            } else if (9 >= new Date().getMonth() + 1) {
                if (ısSepPromo === 0 && ısNonSepPromo === 0 && promoSepArrayResult === 0 && ısSave3 === true) {
                    if (selectAllFilters?.selectClientType?.value === 92) {
                        if (
                            selectAllFilters?.selectClinic === undefined &&
                            selectAllFilters?.selectClient === undefined
                        ) {
                            saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                        } else {
                            saveRequest(SaveProductPriorityAllocationCustomer, 'cust');
                        }
                    } else if (selectAllFilters?.selectClientType?.value === 99) {
                        saveRequest(SaveProductPriorityAllocationPharmacy, 'phar');
                    } else {
                        saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                    }
                }
            }
        } else if (selectQuarter.value === 4) {
            if (10 >= new Date().getMonth() + 1) {
                if (
                    ısOctPromo === 0 &&
                    ısNonOctPromo === 0 &&
                    ısNovPromo === 0 &&
                    ısNonNovPromo === 0 &&
                    ısDecPromo === 0 &&
                    ısNonDecPromo === 0 &&
                    promoOctArrayResult === 0 &&
                    promoNovArrayResult === 0 &&
                    promoDecArrayResult === 0 &&
                    ısSave4 === true
                ) {
                    if (selectAllFilters?.selectClientType?.value === 92) {
                        if (
                            selectAllFilters?.selectClinic === undefined &&
                            selectAllFilters?.selectClient === undefined
                        ) {
                            saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                        } else {
                            saveRequest(SaveProductPriorityAllocationCustomer, 'cust');
                        }
                    } else if (selectAllFilters?.selectClientType?.value === 99) {
                        saveRequest(SaveProductPriorityAllocationPharmacy, 'phar');
                    } else {
                        saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                    }
                }
            } else if (11 >= new Date().getMonth() + 1) {
                if (
                    ısNovPromo === 0 &&
                    ısNonNovPromo === 0 &&
                    ısDecPromo === 0 &&
                    ısNonDecPromo === 0 &&
                    promoNovArrayResult === 0 &&
                    promoDecArrayResult === 0 &&
                    ısSave4 === true
                ) {
                    if (selectAllFilters?.selectClientType?.value === 92) {
                        if (
                            selectAllFilters?.selectClinic === undefined &&
                            selectAllFilters?.selectClient === undefined
                        ) {
                            saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                        } else {
                            saveRequest(SaveProductPriorityAllocationCustomer, 'cust');
                        }
                    } else if (selectAllFilters?.selectClientType?.value === 99) {
                        saveRequest(SaveProductPriorityAllocationPharmacy, 'phar');
                    } else {
                        saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                    }
                }
            } else if (12 >= new Date().getMonth() + 1) {
                if (ısDecPromo === 0 && ısNonDecPromo === 0 && promoDecArrayResult === 0 && ısSave4 === true) {
                    if (selectAllFilters?.selectClientType?.value === 92) {
                        if (
                            selectAllFilters?.selectClinic === undefined &&
                            selectAllFilters?.selectClient === undefined
                        ) {
                            saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                        } else {
                            saveRequest(SaveProductPriorityAllocationCustomer, 'cust');
                        }
                    } else if (selectAllFilters?.selectClientType?.value === 99) {
                        saveRequest(SaveProductPriorityAllocationPharmacy, 'phar');
                    } else {
                        saveRequest(SaveProductPriorityAllocationSpec, 'spec');
                    }
                }
            }
        }
    };

    // DRAG and DROP
    //------------------
    const [activeSave, setActiveSave] = useState(false);

    const monthResult = (data, promoType) => {
        if (promoType === 1) {
            const brandName = data.brandName.split('');
            let brandNameSplice = null;
            let brandNameLengthResult = null;
            if (brandName.length > 9) {
                brandNameSplice = brandName.splice(0, 8);
                brandNameLengthResult = brandNameSplice.join('');
            }

            return {
                id: data.brandName.toString(),
                name: data.brandName.length <= 9 ? data.brandName.toString() : `${brandNameLengthResult}...`,
                allocation: data.allocation,
                brandId: data.brandId,
                brandName: data.brandName,
                businessUnitId: data.businessUnitId,
                businessUnitName: data.businessUnitName,
                categoryName: data.categoryName,
                countryId: data.countryId,
                month: data.month,
                organizationTypeId: data.organizationTypeId,
                priority: data.priority,
                promoType: data.promoType,
                specId: data.specId,
                specName: data.specName,
                year: data.year,
                score: data.score,
            };
        } else {
            const brandName = data.brandName.split('');
            let brandNameSplice = null;
            let brandNameLengthResult = null;
            if (brandName.length > 9) {
                brandNameSplice = brandName.splice(0, 8);
                brandNameLengthResult = brandNameSplice.join('');
            }
            return {
                id: data.brandName.length <= 9 ? data.brandName : `${brandNameLengthResult}...`,
                name: data.brandName.length <= 9 ? data.brandName : `${brandNameLengthResult}...`,
                allocation: data.allocation,
                brandId: data.brandId,
                brandName: data.brandName,
                businessUnitId: data.businessUnitId,
                businessUnitName: data.businessUnitName,
                categoryName: data.categoryName,
                countryId: data.countryId,
                month: data.month,
                organizationTypeId: data.organizationTypeId,
                priority: data.priority,
                promoType: data.promoType,
                specId: data.specId,
                specName: data.specName,
                year: data.year,
            };
        }
    };

    const monthProductAı = (data, productMonth) => {
        return {
            month: data.month,
            brandName: data.brandName,
            brandId: data.brandId,
            score: data.score,
        };
    };
    //click apply button and getSubPromo api
    const apply = (applyDatas) => {
        setisApplyFilter(false);

        setIsApply(true);
        setIsOpen(false);

        let jan = [];
        let fab = [];
        let mar = [];
        let apr = [];
        let may = [];
        let jun = [];
        let jul = [];
        let aug = [];
        let sep = [];
        let oct = [];
        let nov = [];
        let dec = [];

        let productAıJan = [];
        let productAıFab = [];
        let productAıMar = [];
        let productAıApr = [];
        let productAıMay = [];
        let productAıJun = [];
        let productAıJul = [];
        let productAıAug = [];
        let productAıSep = [];
        let productAıOct = [];
        let productAıNov = [];
        let productAıDec = [];

        let productJan = [
            { id: '1', name: [], productAı: [] },
            { id: '2', name: [], productAı: [] },
            { id: '3', name: [], productAı: [] },
            { id: '4', name: [], productAı: [] },
            { id: '5', name: [], productAı: [] },
            { id: '6', name: [], productAı: [] },
            { id: '7', name: [], productAı: [] },
            { id: '8', name: [], productAı: [] },
            { id: '9', name: [], productAı: [] },
            { id: '10', name: [], productAı: [] },
        ];

        let productFab = [
            { id: '1', name: [], productAı: [] },
            { id: '2', name: [], productAı: [] },
            { id: '3', name: [], productAı: [] },
            { id: '4', name: [], productAı: [] },
            { id: '5', name: [], productAı: [] },
            { id: '6', name: [], productAı: [] },
            { id: '7', name: [], productAı: [] },
            { id: '8', name: [], productAı: [] },
            { id: '9', name: [], productAı: [] },
            { id: '10', name: [], productAı: [] },
        ];
        let productMar = [
            { id: '1', name: [], productAı: [] },
            { id: '2', name: [], productAı: [] },
            { id: '3', name: [], productAı: [] },
            { id: '4', name: [], productAı: [] },
            { id: '5', name: [], productAı: [] },
            { id: '6', name: [], productAı: [] },
            { id: '7', name: [], productAı: [] },
            { id: '8', name: [], productAı: [] },
            { id: '9', name: [], productAı: [] },
            { id: '10', name: [], productAı: [] },
        ];
        let productApr = [
            { id: '1', name: [], productAı: [] },
            { id: '2', name: [], productAı: [] },
            { id: '3', name: [], productAı: [] },
            { id: '4', name: [], productAı: [] },
            { id: '5', name: [], productAı: [] },
            { id: '6', name: [], productAı: [] },
            { id: '7', name: [], productAı: [] },
            { id: '8', name: [], productAı: [] },
            { id: '9', name: [], productAı: [] },
            { id: '10', name: [], productAı: [] },
        ];
        let productMay = [
            { id: '1', name: [], productAı: [] },
            { id: '2', name: [], productAı: [] },
            { id: '3', name: [], productAı: [] },
            { id: '4', name: [], productAı: [] },
            { id: '5', name: [], productAı: [] },
            { id: '6', name: [], productAı: [] },
            { id: '7', name: [], productAı: [] },
            { id: '8', name: [], productAı: [] },
            { id: '9', name: [], productAı: [] },
            { id: '10', name: [], productAı: [] },
        ];
        let productJun = [
            { id: '1', name: [], productAı: [] },
            { id: '2', name: [], productAı: [] },
            { id: '3', name: [], productAı: [] },
            { id: '4', name: [], productAı: [] },
            { id: '5', name: [], productAı: [] },
            { id: '6', name: [], productAı: [] },
            { id: '7', name: [], productAı: [] },
            { id: '8', name: [], productAı: [] },
            { id: '9', name: [], productAı: [] },
            { id: '10', name: [], productAı: [] },
        ];
        let productJul = [
            { id: '1', name: [], productAı: [] },
            { id: '2', name: [], productAı: [] },
            { id: '3', name: [], productAı: [] },
            { id: '4', name: [], productAı: [] },
            { id: '5', name: [], productAı: [] },
            { id: '6', name: [], productAı: [] },
            { id: '7', name: [], productAı: [] },
            { id: '8', name: [], productAı: [] },
            { id: '9', name: [], productAı: [] },
            { id: '10', name: [], productAı: [] },
        ];
        let productAug = [
            { id: '1', name: [], productAı: [] },
            { id: '2', name: [], productAı: [] },
            { id: '3', name: [], productAı: [] },
            { id: '4', name: [], productAı: [] },
            { id: '5', name: [], productAı: [] },
            { id: '6', name: [], productAı: [] },
            { id: '7', name: [], productAı: [] },
            { id: '8', name: [], productAı: [] },
            { id: '9', name: [], productAı: [] },
            { id: '10', name: [], productAı: [] },
        ];
        let productSep = [
            { id: '1', name: [], productAı: [] },
            { id: '2', name: [], productAı: [] },
            { id: '3', name: [], productAı: [] },
            { id: '4', name: [], productAı: [] },
            { id: '5', name: [], productAı: [] },
            { id: '6', name: [], productAı: [] },
            { id: '7', name: [], productAı: [] },
            { id: '8', name: [], productAı: [] },
            { id: '9', name: [], productAı: [] },
            { id: '10', name: [], productAı: [] },
        ];
        let productOct = [
            { id: '1', name: [], productAı: [] },
            { id: '2', name: [], productAı: [] },
            { id: '3', name: [], productAı: [] },
            { id: '4', name: [], productAı: [] },
            { id: '5', name: [], productAı: [] },
            { id: '6', name: [], productAı: [] },
            { id: '7', name: [], productAı: [] },
            { id: '8', name: [], productAı: [] },
            { id: '9', name: [], productAı: [] },
            { id: '10', name: [], productAı: [] },
        ];
        let productNov = [
            { id: '1', name: [], productAı: [] },
            { id: '2', name: [], productAı: [] },
            { id: '3', name: [], productAı: [] },
            { id: '4', name: [], productAı: [] },
            { id: '5', name: [], productAı: [] },
            { id: '6', name: [], productAı: [] },
            { id: '7', name: [], productAı: [] },
            { id: '8', name: [], productAı: [] },
            { id: '9', name: [], productAı: [] },
            { id: '10', name: [], productAı: [] },
        ];
        let productDec = [
            { id: '1', name: [], productAı: [] },
            { id: '2', name: [], productAı: [] },
            { id: '3', name: [], productAı: [] },
            { id: '4', name: [], productAı: [] },
            { id: '5', name: [], productAı: [] },
            { id: '6', name: [], productAı: [] },
            { id: '7', name: [], productAı: [] },
            { id: '8', name: [], productAı: [] },
            { id: '9', name: [], productAı: [] },
            { id: '10', name: [], productAı: [] },
        ];

        if (applyDatas === null) {
            setIsGetSubPromo(false);
        } else if (applyDatas !== null) {
            applyDatas?.forEach((data) => {
                let brandName = [];
                let brandNameSplice = [];
                let brandNameLengthResult;
                const product = selectBrand.find((brand) => brand.ProductId === data.brandId);

                if (data?.promoType === 2) {
                    if (data.month === 1) {
                        brandName = data.brandName.split('');
                        let item = productJan.find((item) => item.id === data.priority.toString());
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        jan.push(monthResult(data, 1));
                        productAıJan.push(monthProductAı(data));
                        productJan.map((el) => el.productAı.push(monthProductAı(data, productJan)));
                    } else if (data.month === 2) {
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        fab.push(monthResult(data, 1));
                        productAıFab.push(monthProductAı(data));
                        productFab.map((el) => el.productAı.push(monthProductAı(data)));
                    } else if (data.month === 3) {
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        mar.push(monthResult(data, 1));
                        productAıMar.push(monthProductAı(data));
                        productMar.map((el) => el.productAı.push(monthProductAı(data)));
                    } else if (data.month === 4) {
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        apr.push(monthResult(data, 1));
                        productAıApr.push(monthProductAı(data));
                        productApr.map((el) => el.productAı.push(monthProductAı(data)));
                    } else if (data.month === 5) {
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        may.push(monthResult(data, 1));
                        productAıMay.push(monthProductAı(data));
                        productMay.map((el) => el.productAı.push(monthProductAı(data)));
                    } else if (data.month === 6) {
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        jun.push(monthResult(data, 1));
                        productAıJun.push(monthProductAı(data));
                        productJun.map((el) => el.productAı.push(monthProductAı(data)));
                    } else if (data.month === 7) {
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        jul.push(monthResult(data, 1));
                        productAıJul.push(monthProductAı(data));
                        productJul.map((el) => el.productAı.push(monthProductAı(data)));
                    } else if (data.month === 8) {
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        aug.push(monthResult(data, 1));
                        productAıAug.push(monthProductAı(data));
                        productAug.map((el) => el.productAı.push(monthProductAı(data)));
                    } else if (data.month === 9) {
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        sep.push(monthResult(data, 1));
                        productAıSep.push(monthProductAı(data));
                        productSep.map((el) => el.productAı.push(monthProductAı(data)));
                    } else if (data.month === 10) {
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        oct.push(monthResult(data, 1));
                        productAıOct.push(monthProductAı(data));
                        productOct.map((el) => el.productAı.push(monthProductAı(data)));
                    } else if (data.month === 11) {
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        nov.push(monthResult(data, 1));
                        productAıNov.push(monthProductAı(data));
                        productNov.map((el) => el.productAı.push(monthProductAı(data)));
                    } else if (data.month === 12) {
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        dec.push(monthResult(data, 1));
                        productAıDec.push(monthProductAı(data));
                        productDec.map((el) => el.productAı.push(monthProductAı(data)));
                    }
                }
                //**-------------- */
                else if (data.promoType === 1 || data.promoType === 3) {
                    if (data.month === 1 && data.promoType === 1) {
                        let promoData = data;
                        let itemId = productJan.find((item) => item.id === data.priority.toString());
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        itemId.name = monthResult(promoData, data.promoType);
                        productJan.map((el) => el.productAı.push(monthProductAı(promoData)));
                        productAıJan.push(monthProductAı(promoData));
                    } else if (data.month === 1 && data.promoType === 3) {
                        let promoData = data;
                        let itemId = data.priority;

                        if (itemId === 1) {
                            let item = productJan.find((item) => item.id === '7');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productJan.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıJan.push(monthProductAı(promoData));
                        } else if (itemId === 2) {
                            let item = productJan.find((item) => item.id === '8');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productJan.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıJan.push(monthProductAı(promoData));
                        } else if (itemId === 3) {
                            let item = productJan.find((item) => item.id === '9');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productJan.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıJan.push(monthProductAı(promoData));
                        } else if (itemId === 4) {
                            let item = productJan.find((item) => item.id === '10');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productJan.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıJan.push(monthProductAı(promoData));
                        }
                    }
                    //feb
                    if (data.month === 2 && data.promoType === 1) {
                        let promoData = data;
                        let itemId = productFab.find((item) => item.id === data.priority.toString());

                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        itemId.name = monthResult(promoData, data.promoType);
                        productFab.map((el) => el.productAı.push(monthProductAı(promoData)));
                        productAıFab.push(monthProductAı(promoData));
                    } else if (data.month === 2 && data.promoType === 3) {
                        let promoData = data;
                        let itemId = data.priority;

                        if (itemId === 1) {
                            let item = productFab.find((item) => item.id === '7');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productFab.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıFab.push(monthProductAı(promoData));
                        } else if (itemId === 2) {
                            let item = productFab.find((item) => item.id === '8');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productFab.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıFab.push(monthProductAı(promoData));
                        } else if (itemId === 3) {
                            let item = productFab.find((item) => item.id === '9');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productFab.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıFab.push(monthProductAı(promoData));
                        } else if (itemId === 4) {
                            let item = productFab.find((item) => item.id === '10');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productFab.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıFab.push(monthProductAı(promoData));
                        }
                    }
                    //mar
                    if (data.month === 3 && data.promoType === 1) {
                        let promoData = data;
                        let itemId = productMar.find((item) => item.id === data.priority.toString());

                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        itemId.name = monthResult(promoData, data.promoType);
                        productMar.map((el) => el.productAı.push(monthProductAı(promoData)));
                        productAıMar.push(monthProductAı(promoData));
                    } else if (data.month === 3 && data.promoType === 3) {
                        let promoData = data;
                        let itemId = data.priority;

                        if (itemId === 1) {
                            let item = productMar.find((item) => item.id === '7');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productMar.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıMar.push(monthProductAı(promoData));
                        } else if (itemId === 2) {
                            let item = productMar.find((item) => item.id === '8');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productMar.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıMar.push(monthProductAı(promoData));
                        } else if (itemId === 3) {
                            let item = productMar.find((item) => item.id === '9');

                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productMar.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıMar.push(monthProductAı(promoData));
                        } else if (itemId === 4) {
                            let item = productMar.find((item) => item.id === '10');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productMar.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıMar.push(monthProductAı(promoData));
                        }
                    }
                    //apr
                    if (data.month === 4 && data.promoType === 1) {
                        let promoData = data;
                        let itemId = productApr.find((item) => item.id === data.priority.toString());
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        itemId.name = monthResult(promoData, data.promoType);
                        productApr.map((el) => el.productAı.push(monthProductAı(promoData)));
                        productAıApr.push(monthProductAı(promoData));
                    } else if (data.month === 4 && data.promoType === 3) {
                        let promoData = data;
                        let itemId = data.priority;

                        if (itemId === 1) {
                            let item = productApr.find((item) => item.id === '7');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productApr.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıApr.push(monthProductAı(promoData));
                        } else if (itemId === 2) {
                            let item = productApr.find((item) => item.id === '8');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productApr.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıApr.push(monthProductAı(promoData));
                        } else if (itemId === 3) {
                            let item = productApr.find((item) => item.id === '9');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productApr.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıApr.push(monthProductAı(promoData));
                        } else if (itemId === 4) {
                            let item = productApr.find((item) => item.id === '10');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productApr.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıApr.push(monthProductAı(promoData));
                        }
                    }
                    //may
                    if (data.month === 5 && data.promoType === 1) {
                        let promoData = data;
                        let itemId = productMay.find((item) => item.id === data.priority.toString());

                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        itemId.name = monthResult(promoData, data.promoType);
                        productMay.map((el) => el.productAı.push(monthProductAı(promoData)));
                        productAıMay.push(monthProductAı(promoData));
                    } else if (data.month === 5 && data.promoType === 3) {
                        let promoData = data;
                        let itemId = data.priority;

                        if (itemId === 1) {
                            let item = productMay.find((item) => item.id === '7');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productMay.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıMay.push(monthProductAı(promoData));
                        } else if (itemId === 2) {
                            let item = productMay.find((item) => item.id === '8');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productMay.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıMay.push(monthProductAı(promoData));
                        } else if (itemId === 3) {
                            let item = productMay.find((item) => item.id === '9');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productMay.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıMay.push(monthProductAı(promoData));
                        } else if (itemId === 4) {
                            let item = productMay.find((item) => item.id === '10');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productMay.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıMay.push(monthProductAı(promoData));
                        }
                    }
                    //Jun
                    if (data.month === 6 && data.promoType === 1) {
                        let promoData = data;
                        let itemId = productJun.find((item) => item.id === data.priority.toString());
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        itemId.name = monthResult(promoData, data.promoType);
                        productJun.map((el) => el.productAı.push(monthProductAı(promoData)));
                        productAıJun.push(monthProductAı(promoData));
                    } else if (data.month === 6 && data.promoType === 3) {
                        let promoData = data;
                        let itemId = data.priority;

                        if (itemId === 1) {
                            let item = productJun.find((item) => item.id === '7');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productJun.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıJun.push(monthProductAı(promoData));
                        } else if (itemId === 2) {
                            let item = productJun.find((item) => item.id === '8');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productJun.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıJun.push(monthProductAı(promoData));
                        } else if (itemId === 3) {
                            let item = productJun.find((item) => item.id === '9');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productJun.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıJun.push(monthProductAı(promoData));
                        } else if (itemId === 4) {
                            let item = productJun.find((item) => item.id === '10');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productJun.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıJun.push(monthProductAı(promoData));
                        }
                    }
                    //Jul
                    if (data.month === 7 && data.promoType === 1) {
                        let promoData = data;
                        let itemId = productJul.find((item) => item.id === data.priority.toString());
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        itemId.name = monthResult(promoData, data.promoType);
                        productJul.map((el) => el.productAı.push(monthProductAı(promoData)));
                        productAıJul.push(monthProductAı(promoData));
                    } else if (data.month === 7 && data.promoType === 3) {
                        let promoData = data;
                        let itemId = data.priority;

                        if (itemId === 1) {
                            let item = productJul.find((item) => item.id === '7');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productJul.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıJul.push(monthProductAı(promoData));
                        } else if (itemId === 2) {
                            let item = productJul.find((item) => item.id === '8');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productJul.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıJul.push(monthProductAı(promoData));
                        } else if (itemId === 3) {
                            let item = productJul.find((item) => item.id === '9');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productJul.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıJul.push(monthProductAı(promoData));
                        } else if (itemId === 4) {
                            let item = productJul.find((item) => item.id === '10');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productJul.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıJul.push(monthProductAı(promoData));
                        }
                    }
                    //Aug
                    if (data.month === 8 && data.promoType === 1) {
                        let promoData = data;
                        let itemId = productAug.find((item) => item.id === data.priority.toString());
                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        itemId.name = monthResult(promoData, data.promoType);
                        productAug.map((el) => el.productAı.push(monthProductAı(promoData)));
                        productAıAug.push(monthProductAı(promoData));
                    } else if (data.month === 8 && data.promoType === 3) {
                        let promoData = data;
                        let itemId = data.priority;

                        if (itemId === 1) {
                            let item = productAug.find((item) => item.id === '7');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productAug.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıAug.push(monthProductAı(promoData));
                        } else if (itemId === 2) {
                            let item = productAug.find((item) => item.id === '8');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productAug.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıAug.push(monthProductAı(promoData));
                        } else if (itemId === 3) {
                            let item = productAug.find((item) => item.id === '9');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productAug.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıAug.push(monthProductAı(promoData));
                        } else if (itemId === 4) {
                            let item = productAug.find((item) => item.id === '10');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productAug.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıAug.push(monthProductAı(promoData));
                        }
                    }
                    //sep
                    if (data.month === 9 && data.promoType === 1) {
                        let promoData = data;
                        let itemId = productSep.find((item) => item.id === data.priority.toString());

                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        itemId.name = monthResult(promoData, data.promoType);
                        productSep.map((el) => el.productAı.push(monthProductAı(promoData)));
                        productAıSep.push(monthProductAı(promoData));
                    } else if (data.month === 9 && data.promoType === 3) {
                        let promoData = data;
                        let itemId = data.priority;

                        if (itemId === 1) {
                            let item = productSep.find((item) => item.id === '7');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productSep.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıSep.push(monthProductAı(promoData));
                        } else if (itemId === 2) {
                            let item = productSep.find((item) => item.id === '8');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productSep.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıSep.push(monthProductAı(promoData));
                        } else if (itemId === 3) {
                            let item = productSep.find((item) => item.id === '9');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productSep.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıSep.push(monthProductAı(promoData));
                        } else if (itemId === 4) {
                            let item = productSep.find((item) => item.id === '10');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productSep.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıSep.push(monthProductAı(promoData));
                        }
                    }
                    //oct
                    if (data.month === 10 && data.promoType === 1) {
                        let promoData = data;
                        let itemId = productOct.find((item) => item.id === data.priority.toString());

                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        itemId.name = monthResult(promoData, data.promoType);
                        productOct.map((el) => el.productAı.push(monthProductAı(promoData)));
                        productAıOct.push(monthProductAı(promoData));
                    } else if (data.month === 10 && data.promoType === 3) {
                        let promoData = data;
                        let itemId = data.priority;

                        if (itemId === 1) {
                            let item = productOct.find((item) => item.id === '7');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productOct.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıOct.push(monthProductAı(promoData));
                        } else if (itemId === 2) {
                            let item = productOct.find((item) => item.id === '8');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productOct.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıOct.push(monthProductAı(promoData));
                        } else if (itemId === 3) {
                            let item = productOct.find((item) => item.id === '9');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productOct.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıOct.push(monthProductAı(promoData));
                        } else if (itemId === 4) {
                            let item = productOct.find((item) => item.id === '10');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productOct.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıOct.push(monthProductAı(promoData));
                        }
                    }
                    //nov
                    if (data.month === 11 && data.promoType === 1) {
                        let promoData = data;
                        let itemId = productNov.find((item) => item.id === data.priority.toString());

                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        itemId.name = monthResult(promoData, data.promoType);
                        productNov.map((el) => el.productAı.push(monthProductAı(promoData)));
                        productAıNov.push(monthProductAı(promoData));
                    } else if (data.month === 11 && data.promoType === 3) {
                        let promoData = data;
                        let itemId = data.priority;

                        if (itemId === 1) {
                            let item = productNov.find((item) => item.id === '7');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productNov.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıNov.push(monthProductAı(promoData));
                        } else if (itemId === 2) {
                            let item = productNov.find((item) => item.id === '8');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productNov.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıNov.push(monthProductAı(promoData));
                        } else if (itemId === 3) {
                            let item = productNov.find((item) => item.id === '9');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productNov.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıNov.push(monthProductAı(promoData));
                        } else if (itemId === 4) {
                            let item = productNov.find((item) => item.id === '10');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productNov.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıNov.push(monthProductAı(promoData));
                        }
                    }
                    //dec
                    if (data.month === 12 && data.promoType === 1) {
                        let promoData = data;
                        let itemId = productDec.find((item) => item.id === data.priority.toString());

                        brandName = data.brandName.split('');
                        if (brandName.length > 9) {
                            brandNameSplice = brandName.splice(0, 8);
                            brandNameLengthResult = brandNameSplice.join('');
                        }
                        itemId.name = monthResult(promoData, data.promoType);
                        productDec.map((el) => el.productAı.push(monthProductAı(promoData)));
                        productAıDec.push(monthProductAı(promoData));
                    } else if (data.month === 12 && data.promoType === 3) {
                        let promoData = data;
                        let itemId = data.priority;

                        if (itemId === 1) {
                            let item = productDec.find((item) => item.id === '7');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productDec.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıDec.push(monthProductAı(promoData));
                        } else if (itemId === 2) {
                            let item = productDec.find((item) => item.id === '8');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productDec.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıDec.push(monthProductAı(promoData));
                        } else if (itemId === 3) {
                            let item = productDec.find((item) => item.id === '9');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productDec.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıDec.push(monthProductAı(promoData));
                        } else if (itemId === 4) {
                            let item = productDec.find((item) => item.id === '10');
                            brandName = data.brandName.split('');
                            if (brandName.length > 9) {
                                brandNameSplice = brandName.splice(0, 8);
                                brandNameLengthResult = brandNameSplice.join('');
                            }
                            item.name = monthResult(promoData, data.promoType);
                            productDec.map((el) => el.productAı.push(monthProductAı(promoData)));
                            productAıDec.push(monthProductAı(promoData));
                        }
                    }
                }
            });
        }

        setColumns({ ...columns, items: [...jan], promo: [...sortProductAı(productJan)] });
        setFabruary({ ...fabruary, items: [...fab], promo: [...sortProductAı(productFab)] });
        setMarch({ ...march, items: [...mar], promo: [...sortProductAı(productMar)] });
        setApril({ ...april, items: [...apr], promo: [...sortProductAı(productApr)] });
        setMayy({ ...mayy, items: [...may], promo: [...sortProductAı(productMay)] });
        setJune({ ...june, items: [...jun], promo: [...sortProductAı(productJun)] });
        setJuly({ ...july, items: [...jul], promo: [...sortProductAı(productJul)] });
        setAugust({ ...august, items: [...aug], promo: [...sortProductAı(productAug)] });
        setSeptember({ ...september, items: [...sep], promo: [...sortProductAı(productSep)] });
        setOctember({ ...octember, items: [...oct], promo: [...sortProductAı(productOct)] });
        setNovember({ ...november, items: [...nov], promo: [...sortProductAı(productNov)] });
        setDecember({ ...december, items: [...dec], promo: [...sortProductAı(productDec)] });
    };

    const sortProductAı = (productMont) => {
        if (productMont !== undefined) {
            const newProductAı = productMont[0]?.productAı?.sort((a, b) =>
                a.score < b.score ? 1 : a.score > b.score ? -1 : 0
            );

            const newProductMonth = productMont?.map((data) => {
                data.productAı = newProductAı;
                return data;
            });

            return newProductMonth;
        }
    };

    const isDragDisabled = (month) => {
        return selectYearValue < new Date().getFullYear()
            ? true
            : selectYearValue === new Date().getFullYear()
            ? month < new Date().getMonth() + 1
                ? true
                : false
            : false;
    };

    // const clearSelect = () => {
    //     setSelectYears([])
    //     setSelectQuarter([])
    //     setSelectSpecialization([])
    //     setSelectBrand([])
    //     setSelectGlobalSku([])
    //     setSelectOrganizations([])
    //     setSelectCategory([])
    //     setSelectPrioAlloType([])
    // }

    // warning messages
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{t('UNSUCCESSFUL')}</Popover.Header>
            <Popover.Body>
                {t('Registration failed. Please fill in at least one of the products found within three months.')}
            </Popover.Body>
        </Popover>
    );
    const popover2 = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{t('UNSUCCESSFUL')}</Popover.Header>
            <Popover.Body>
                {t('Registration failed. Please fill in at least one of each product found within three months.')}
            </Popover.Body>
        </Popover>
    );
    const popover3 = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{t('REGISTRATION FAILED')}</Popover.Header>
            <Popover.Body>
                {t('Please do not leave blank the products in the month. Fill in at least one cell.')}
            </Popover.Body>
        </Popover>
    );
    const popover5 = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{t('CELL JUMPED!')}</Popover.Header>
            <Popover.Body>
                {t('Please fill in the products under the month without skipping the cell while registering.')}
            </Popover.Body>
        </Popover>
    );

    const handleClose = () => {
        setShow(false);
        setisSaveClick(false);
        setIsGetSubPromo(true);
        setIsSaveFrequency(null);
        allocationRequest();
        setisTable(false);
        // apply();
    };

    const allocationRequest = () => {
        setSubPromoLoading(true);
        setisTable(false);

        setApplyData([]);

        if (selectAllFilters?.selectClientType?.value === 92) {
            if (selectAllFilters?.selectClinic === undefined && selectAllFilters?.selectClient === undefined) {
                if (
                    selectAllFilters?.selectYear &&
                    selectAllFilters?.selectQuarter &&
                    selectAllFilters?.selectCountry &&
                    selectAllFilters?.selectBusUnit &&
                    selectAllFilters?.selectPlace &&
                    selectAllFilters?.selectPlaceType &&
                    selectAllFilters?.selectTypeOfPriority &&
                    selectAllFilters?.selectClientType &&
                    selectAllFilters?.selectBrand.length !== 0 &&
                    selectAllFilters?.selectCategory &&
                    selectAllFilters?.selectprioAlloType
                ) {
                    const getProduct = {
                        CountryId: selectAllFilters?.selectCountry?.value,
                        BusinessUnitId: selectAllFilters?.selectBusUnit?.value,
                        Year: selectAllFilters?.selectYear?.value,
                        Quarter: selectAllFilters?.selectQuarter?.value,
                        placeId: selectAllFilters?.selectPlace?.value,
                        placeTypeId: selectAllFilters?.selectPlaceType?.value,
                        typeOfPriorityId: selectAllFilters?.selectTypeOfPriority?.value,
                        SpecId: selectAllFilters?.selectSpecialization
                            ? selectAllFilters?.selectSpecialization?.value
                            : [],
                        Category: selectAllFilters?.selectCategory?.label,
                        productIds: selectAllFilters?.selectBrand.map((data) => data?.value),
                        clientTypeId: selectAllFilters?.selectClientType?.value,
                    };

                    setSubPromoLoading(true);
                    FetchApiPost('services/VisitMix/GetProductPriorityAllocation', 'POST', getProduct).then((res) =>
                        (async () => {
                            try {
                                if (res.status === 200) {
                                    setSubPromoLoading(false);
                                    setisTable(true);
                                    res.json().then((data) => {
                                        console.log(data.data);
                                        setApplyData(data.data);
                                    });
                                } else if (res.status === 500 || res.status === 499) {
                                    setSubPromoLoading(false);
                                    history.push('/error-500');
                                } else {
                                    setSubPromoLoading(false);
                                }
                            } catch (error) {
                                console.log('error', error);
                            }
                        })()
                    );
                }
            } else {
                setSubPromoLoading(true);
                const body = {
                    CountryId: selectAllFilters?.selectCountry?.value,
                    BusinessUnitId: selectAllFilters?.selectBusUnit?.value,
                    Year: selectAllFilters?.selectYear?.value,
                    Quarter: selectAllFilters?.selectQuarter?.value,
                    SpecId: selectAllFilters?.selectSpecialization?.value,
                    Category: selectAllFilters?.selectCategory?.label,
                    placeId: selectAllFilters?.selectPlace?.value,
                    placeTypeId: selectAllFilters?.selectPlaceType?.value,
                    typeOfPriorityId: selectAllFilters?.selectTypeOfPriority?.value,
                    clientTypeId: selectAllFilters?.selectClientType?.value,
                    clientId: selectAllFilters?.selectClient?.value,
                    productIds: selectAllFilters?.selectBrand?.map((data) => data?.value),
                };

                if (
                    selectAllFilters?.selectYear &&
                    selectAllFilters?.selectQuarter &&
                    selectAllFilters?.selectCountry &&
                    selectAllFilters?.selectBusUnit &&
                    selectAllFilters?.selectPlace &&
                    selectAllFilters?.selectPlaceType &&
                    selectAllFilters?.selectTypeOfPriority &&
                    selectAllFilters?.selectClientType &&
                    selectAllFilters?.selectClinic &&
                    selectAllFilters?.selectSpecialization &&
                    selectAllFilters?.selectClient &&
                    selectAllFilters?.selectBrand.length !== 0 &&
                    selectAllFilters?.selectCategory &&
                    selectAllFilters?.selectprioAlloType
                ) {
                    FetchApiPost('services/VisitMix/GetProductPriorityAllocationForCustomer', 'POST', body).then(
                        (res) =>
                            (async () => {
                                try {
                                    if (res.status === 200) {
                                        res.json().then((data) => setApplyData(data.data));
                                        setSubPromoLoading(false);
                                        setisTable(true);
                                    } else if (res.status === 500 || res.status === 499) {
                                        history.push('/error-500');
                                    }
                                } catch (error) {
                                    console.log('error', error);
                                }
                            })()
                    );
                }
            }
        } else if (selectAllFilters?.selectClientType?.value === 99) {
            // const condition = [
            //     selectYear === undefined,
            //     selectQuarter === undefined,
            //     selectCountry === undefined,
            //     selectBusUnit === undefined,
            //     selectZone.length === 0,
            //     selectCity.length === 0,
            //     selectOrgType === undefined,
            //     selectClinic.length === 0,
            //     selectSpecialization === undefined,
            //     selectCustomer === undefined,
            //     selectBrand.length === 0,
            //     selectCategory === undefined,
            //     selectprioAlloType.length === 0
            // ]

            // statusControl(condition,selectStatusCustomer,setSelectStatusCustomer);
            //     if (condition.some((x) => x === true)) return;

            const getProduct = {
                CountryId: selectAllFilters?.selectCountry?.value,
                BusinessUnitId: selectAllFilters?.selectBusUnit?.value,
                Year: selectAllFilters?.selectYear?.value,
                Quarter: selectAllFilters?.selectQuarter?.value,
                placeId: selectAllFilters?.selectPlace?.value,
                placeTypeId: selectAllFilters?.selectPlaceType?.value,
                typeOfPriorityId: selectAllFilters?.selectTypeOfPriority?.value,
                clientTypeId: selectAllFilters?.selectClientType?.value,
                Category: selectAllFilters?.selectCategory?.label,
                productIds: selectAllFilters?.selectBrand.map((data) => data?.value),
            };

            if (
                selectAllFilters?.selectYear &&
                selectAllFilters?.selectQuarter &&
                selectAllFilters?.selectCountry &&
                selectAllFilters?.selectBusUnit &&
                selectAllFilters?.selectPlace &&
                selectAllFilters?.selectPlaceType &&
                selectAllFilters?.selectTypeOfPriority &&
                selectAllFilters?.selectClientType &&
                selectAllFilters?.selectSpecialization &&
                selectAllFilters?.selectBrand.length !== 0 &&
                selectAllFilters?.selectCategory &&
                selectAllFilters?.selectprioAlloType
            ) {
                setSubPromoLoading(true);
                FetchApiPost('services/VisitMix/GetProductPriorityAllocationForPharmacy', 'POST', getProduct).then(
                    (res) =>
                        (async () => {
                            try {
                                if (res.status === 200) {
                                    res.json().then((data) => setApplyData(data.data));
                                    setSubPromoLoading(false);
                                    setisTable(true);
                                } else if (res.status === 500 || res.status === 499) {
                                    history.push('/error-500');
                                    setSubPromoLoading(false);
                                } else {
                                    setSubPromoLoading(false);
                                }
                            } catch (error) {
                                console.log('error', error);
                            }
                        })()
                );
            }
            // const saveBodyValue = {
            //     CountryId: selectCountry.value,
            //     BusinessUnitId: selectBusUnit.value,
            //     BusinessUnitName: selectBusUnit.label,
            //     Year: selectYear.value,
            //     Quarter: selectQuarter.value,
            //     SpecName: selectSpecialization.label,
            //     SpecId: selectSpecialization.value,
            //     Category: selectCategory.value,
            //     OrganizationTypeId: selectOrgType.value,
            //     OrganizationTypeName: selectOrgType.label,
            // }

            // setProductBodyValue(saveBodyValue);
        } else if (selectAllFilters?.selectClientType === undefined) {
            const getProduct = {
                CountryId: selectAllFilters?.selectCountry?.value,
                BusinessUnitId: selectAllFilters?.selectBusUnit?.value,
                Year: selectAllFilters?.selectYear?.value,
                Quarter: selectAllFilters?.selectQuarter?.value,
                placeId: selectAllFilters?.selectPlace?.value,
                placeTypeId: selectAllFilters?.selectPlaceType?.value,
                typeOfPriorityId: selectAllFilters?.selectTypeOfPriority?.value,
                SpecId: selectAllFilters?.selectSpecialization ? selectAllFilters?.selectSpecialization?.value : 0,
                Category: selectAllFilters?.selectCategory?.label,
                productIds: selectAllFilters?.selectBrand.map((data) => data?.value),
                clientTypeId: 0,
            };

            if (
                selectAllFilters?.selectYear &&
                selectAllFilters?.selectQuarter &&
                selectAllFilters?.selectCountry &&
                selectAllFilters?.selectBusUnit &&
                selectAllFilters?.selectPlace &&
                selectAllFilters?.selectPlaceType &&
                selectAllFilters?.selectTypeOfPriority &&
                selectAllFilters?.selectBrand.length !== 0 &&
                selectAllFilters?.selectCategory &&
                selectAllFilters?.selectprioAlloType
            ) {
                setSubPromoLoading(true);
                FetchApiPost('services/VisitMix/GetProductPriorityAllocation', 'POST', getProduct).then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then((data) => setApplyData(data.data));
                                setSubPromoLoading(false);
                                setisTable(true);
                            } else if (res.status === 500 || res.status === 499) {
                                setSubPromoLoading(false);
                                history.push('/error-500');
                            } else {
                                setSubPromoLoading(false);
                            }
                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                );
            }
        }
    };

    const handleModalClose = () => {
        setShow(false);
        setisSaveClick(false);
        setIsGetSubPromo(true);
        setIsSaveFrequency(null);
        setisApplyFilter(true);
    };
    const handleShow = () => setShow(true);
    // save and handle show
    const two = async () => {
        await handleShow();
        await save();
    };

    const isActiveSaveButton = () => {
        // if (isOpen === true ) {
        //     return (
        //         <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover}>
        //             <span>
        //                 <Button disabled variant="warning">{t('save')}</Button>
        //             </span>
        //         </OverlayTrigger>
        //     )
        // }
        if (selectQuarter.value === 1) {
            if (1 >= new Date().getMonth() + 1) {
                if (ısSave === false) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (totalArrayResult === 0 && totalFabArrayResult === 0 && totalMarArrayResult === 0) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover2}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    (promoArrayResult === 1 && promoFabArrayResult === 1 && promoMarArrayResult === 1) ||
                    (promoArrayResult === 1 && promoFabArrayResult === 1 && promoMarArrayResult === 0) ||
                    (promoArrayResult === 1 && promoFabArrayResult === 0 && promoMarArrayResult === 1) ||
                    (promoArrayResult === 1 && promoFabArrayResult === 0 && promoMarArrayResult === 0) ||
                    (promoArrayResult === 0 && promoFabArrayResult === 1 && promoMarArrayResult === 1) ||
                    (promoArrayResult === 0 && promoFabArrayResult === 1 && promoMarArrayResult === 0) ||
                    (promoArrayResult === 0 && promoFabArrayResult === 0 && promoMarArrayResult === 1)
                ) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover3}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    ısPromo === 0 &&
                    ısNonPromo === 0 &&
                    ısFabPromo === 0 &&
                    ısNonFabPromo === 0 &&
                    ısMarPromo === 0 &&
                    ısNonMarPromo === 0 &&
                    promoArrayResult === 0 &&
                    promoFabArrayResult === 0 &&
                    promoMarArrayResult === 0
                ) {
                    return (
                        <span>
                            <Button variant="success" onClick={two}>
                                {t('save')}
                            </Button>
                        </span>
                    );
                } else {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover5}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                }
            } else if (2 >= new Date().getMonth() + 1) {
                if (totalFabArrayResult === 0 && totalMarArrayResult === 0) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover2}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    (promoFabArrayResult === 1 && promoMarArrayResult === 1) ||
                    (promoFabArrayResult === 1 && promoMarArrayResult === 0) ||
                    (promoFabArrayResult === 0 && promoMarArrayResult === 1)
                ) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover3}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    ısFabPromo === 0 &&
                    ısNonFabPromo === 0 &&
                    ısMarPromo === 0 &&
                    ısNonMarPromo === 0 &&
                    promoFabArrayResult === 0 &&
                    promoMarArrayResult === 0
                ) {
                    return (
                        <span>
                            <Button variant="success" onClick={two}>
                                {t('save')}
                            </Button>
                        </span>
                    );
                } else {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover5}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                }
            } else if (3 >= new Date().getMonth() + 1) {
                if (totalMarArrayResult === 0) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover2}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (promoMarArrayResult === 1) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover3}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (ısMarPromo === 0 && ısNonMarPromo === 0 && promoMarArrayResult === 0) {
                    return (
                        <span>
                            <Button variant="success" onClick={two}>
                                {t('save')}
                            </Button>
                        </span>
                    );
                } else {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover5}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                }
            }
        } else if (selectQuarter.value === 2) {
            if (4 >= new Date().getMonth() + 1) {
                if (ısSave2 === false) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (totalAprArrayResult === 0 && totalMayArrayResult === 0 && totalJunArrayResult === 0) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover2}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    (promoAprArrayResult === 1 && promoMayArrayResult === 1 && promoJunArrayResult === 1) ||
                    (promoAprArrayResult === 1 && promoMayArrayResult === 1 && promoJunArrayResult === 0) ||
                    (promoAprArrayResult === 1 && promoMayArrayResult === 0 && promoJunArrayResult === 1) ||
                    (promoAprArrayResult === 1 && promoMayArrayResult === 0 && promoJunArrayResult === 0) ||
                    (promoAprArrayResult === 0 && promoMayArrayResult === 1 && promoJunArrayResult === 1) ||
                    (promoAprArrayResult === 0 && promoMayArrayResult === 1 && promoJunArrayResult === 0) ||
                    (promoAprArrayResult === 0 && promoMayArrayResult === 0 && promoJunArrayResult === 1)
                ) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover3}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    ısAprPromo === 0 &&
                    ısNonAprPromo === 0 &&
                    ısMayPromo === 0 &&
                    ısNonMayPromo === 0 &&
                    ısJunPromo === 0 &&
                    ısNonJunPromo === 0 &&
                    promoAprArrayResult === 0 &&
                    promoMayArrayResult === 0 &&
                    promoJunArrayResult === 0
                ) {
                    if (isTable === true) {
                        return (
                            <span>
                                <Button variant="success" onClick={two}>
                                    {t('save')}
                                </Button>
                            </span>
                        );
                    }
                } else {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover5}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                }
            } else if (5 >= new Date().getMonth() + 1) {
                if (totalMayArrayResult === 0 && totalJunArrayResult === 0) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover2}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    (promoMayArrayResult === 1 && promoJunArrayResult === 1) ||
                    (promoMayArrayResult === 1 && promoJunArrayResult === 0) ||
                    (promoMayArrayResult === 0 && promoJunArrayResult === 1)
                ) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover3}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    ısMayPromo === 0 &&
                    ısNonMayPromo === 0 &&
                    ısJunPromo === 0 &&
                    ısNonJunPromo === 0 &&
                    promoMayArrayResult === 0 &&
                    promoJunArrayResult === 0
                ) {
                    if (isTable === true) {
                        return (
                            <span>
                                <Button variant="success" onClick={two}>
                                    {t('save')}
                                </Button>
                            </span>
                        );
                    }
                } else {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover5}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                }
            } else if (6 >= new Date().getMonth() + 1) {
                if (totalJunArrayResult === 0) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover2}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (promoJunArrayResult === 1) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover3}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (ısJunPromo === 0 && ısNonJunPromo === 0 && promoJunArrayResult === 0) {
                    if (isTable === true) {
                        return (
                            <span>
                                <Button variant="success" onClick={two}>
                                    {t('save')}
                                </Button>
                            </span>
                        );
                    }
                } else {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover5}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                }
            }
        } else if (selectQuarter.value === 3) {
            if (7 >= new Date().getMonth() + 1) {
                if (ısSave3 === false) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (totalJulArrayResult === 0 && totalAugArrayResult === 0 && totalSepArrayResult === 0) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover2}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    (promoJulArrayResult === 1 && promoAugArrayResult === 1 && promoSepArrayResult === 1) ||
                    (promoJulArrayResult === 1 && promoAugArrayResult === 1 && promoSepArrayResult === 0) ||
                    (promoJulArrayResult === 1 && promoAugArrayResult === 0 && promoSepArrayResult === 1) ||
                    (promoJulArrayResult === 1 && promoAugArrayResult === 0 && promoSepArrayResult === 0) ||
                    (promoJulArrayResult === 0 && promoAugArrayResult === 1 && promoSepArrayResult === 1) ||
                    (promoJulArrayResult === 0 && promoAugArrayResult === 1 && promoSepArrayResult === 0) ||
                    (promoJulArrayResult === 0 && promoAugArrayResult === 0 && promoSepArrayResult === 1)
                ) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover3}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    ısJulPromo === 0 &&
                    ısNonJulPromo === 0 &&
                    ısAugPromo === 0 &&
                    ısNonAugPromo === 0 &&
                    ısSepPromo === 0 &&
                    ısNonSepPromo === 0 &&
                    promoJulArrayResult === 0 &&
                    promoAugArrayResult === 0 &&
                    promoSepArrayResult === 0
                ) {
                    return (
                        <span>
                            <Button variant="success" onClick={two}>
                                {t('save')}
                            </Button>
                        </span>
                    );
                } else {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover5}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                }
            } else if (8 >= new Date().getMonth() + 1) {
                if (totalAugArrayResult === 0 && totalSepArrayResult === 0) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover2}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    (promoAugArrayResult === 1 && promoSepArrayResult === 1) ||
                    (promoAugArrayResult === 1 && promoSepArrayResult === 0) ||
                    (promoAugArrayResult === 0 && promoSepArrayResult === 1)
                ) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover3}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    ısAugPromo === 0 &&
                    ısNonAugPromo === 0 &&
                    ısSepPromo === 0 &&
                    ısNonSepPromo === 0 &&
                    promoAugArrayResult === 0 &&
                    promoSepArrayResult === 0
                ) {
                    return (
                        <span>
                            <Button variant="success" onClick={two}>
                                {t('save')}
                            </Button>
                        </span>
                    );
                } else {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover5}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                }
            } else if (9 >= new Date().getMonth() + 1) {
                if (totalSepArrayResult === 0) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover2}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (promoSepArrayResult === 1) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover3}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (ısSepPromo === 0 && ısNonSepPromo === 0 && promoSepArrayResult === 0) {
                    return (
                        <span>
                            <Button variant="success" onClick={two}>
                                {t('save')}
                            </Button>
                        </span>
                    );
                } else {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover5}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                }
            }
        } else if (selectQuarter.value === 4) {
            if (10 >= new Date().getMonth() + 1) {
                if (ısSave4 === false) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (totalOctArrayResult === 0 && totalNovArrayResult === 0 && totalDecArrayResult === 0) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover2}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    (promoOctArrayResult === 1 && promoNovArrayResult === 1 && promoDecArrayResult === 1) ||
                    (promoOctArrayResult === 1 && promoNovArrayResult === 1 && promoDecArrayResult === 0) ||
                    (promoOctArrayResult === 1 && promoNovArrayResult === 0 && promoDecArrayResult === 1) ||
                    (promoOctArrayResult === 1 && promoNovArrayResult === 0 && promoDecArrayResult === 0) ||
                    (promoOctArrayResult === 0 && promoNovArrayResult === 1 && promoDecArrayResult === 1) ||
                    (promoOctArrayResult === 0 && promoNovArrayResult === 1 && promoDecArrayResult === 0) ||
                    (promoOctArrayResult === 0 && promoNovArrayResult === 0 && promoDecArrayResult === 1)
                ) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover3}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    ısOctPromo === 0 &&
                    ısNonOctPromo === 0 &&
                    ısNovPromo === 0 &&
                    ısNonNovPromo === 0 &&
                    ısDecPromo === 0 &&
                    ısNonDecPromo === 0 &&
                    promoOctArrayResult === 0 &&
                    promoNovArrayResult === 0 &&
                    promoDecArrayResult === 0
                ) {
                    return (
                        <span>
                            <Button variant="success" onClick={two}>
                                {t('save')}
                            </Button>
                        </span>
                    );
                } else {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover5}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                }
            } else if (11 >= new Date().getMonth() + 1) {
                if (totalNovArrayResult === 0 && totalDecArrayResult === 0) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover2}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    (promoNovArrayResult === 1 && promoDecArrayResult === 1) ||
                    (promoNovArrayResult === 1 && promoDecArrayResult === 0) ||
                    (promoNovArrayResult === 0 && promoDecArrayResult === 1)
                ) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover3}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (
                    ısNovPromo === 0 &&
                    ısNonNovPromo === 0 &&
                    ısDecPromo === 0 &&
                    ısNonDecPromo === 0 &&
                    promoNovArrayResult === 0 &&
                    promoDecArrayResult === 0
                ) {
                    return (
                        <span>
                            <Button variant="success" onClick={two}>
                                {t('save')}
                            </Button>
                        </span>
                    );
                } else {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover5}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                }
            } else if (12 >= new Date().getMonth() + 1) {
                if (totalDecArrayResult === 0) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover2}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (promoDecArrayResult === 1) {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover3}>
                            <span>
                                <Button disabled variant="warning">
                                    {t('save')}
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                } else if (ısDecPromo === 0 && ısNonDecPromo === 0 && promoDecArrayResult === 0) {
                    return (
                        <span>
                            <Button variant="success" onClick={two}>
                                {t('save')}
                            </Button>
                        </span>
                    );
                } else {
                    return (
                        <OverlayTrigger rootClose="true" trigger="click" placement="left" overlay={popover5}>
                            <span>
                                <Button disabled variant="warning">
                                    s{t('save')}ave
                                </Button>
                            </span>
                        </OverlayTrigger>
                    );
                }
            }
        }
    };

    const tableHeaderName = () => {
        return (
            <>
                <th>{t('Priority')}</th>
                <th>{t('Product')}</th>
                <th>{t('AI Product')}</th>
                <th>
                    <span>{t('Allocation')} (%)</span>
                </th>
                <th>{t('Promo Type')}</th>
            </>
        );
    };

    useEffect(() => {
        if (isApplyFilter === true && applyData.length !== 0) {
            apply(applyData);
        }
    }, [applyData, isApplyFilter]);

    return (
        <>
            <BreadCrumb breadCrumbProps={breadCrumbProps} />
            <>
                <div className="pa-table-top-cont">
                    <Col className="pa-table-btn-cont">
                        <div className="pa-columns-cont"></div>
                        <div className="pa-card-main-cont mx-1">
                            <div className="pa-card-right">
                                {isTable && <div>{isActiveSaveButton()}</div>}

                                <div>
                                    <Button
                                        variant="secondary"
                                        className="btn btn-secondary pa-table-btn3 d-flex justify-content-center"
                                        onClick={openCollapse}>
                                        <span>{t('filter')}</span>
                                        <i className="uil-sort pa-filter-icon" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </div>
                <>
                    <div className="pa-collapse-main-cont">
                        <div className="mb-2 mt-2">
                            <div className="pa-collapse-select-cont">
                                <div>
                                    <div className="pa-card-left">
                                        <FilterHeader
                                            setisApplyFilter={setisApplyFilter}
                                            setApplyData={setApplyData}
                                            setIsApply={setIsApply}
                                            isOpenFilter={isOpen}
                                            setIsOpenFilter={setIsOpen}
                                            setSubPromoLoading={setSubPromoLoading}
                                            setisTable={setisTable}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isTable === true ? (
                        <div className="pa-response-scroollbar">
                            <div className="pa-title-cont">
                                {selectQuarter.value === 1 && isApply === true ? (
                                    <div className="pa-title-one-cont">
                                        <div className="pa-title-one">
                                            <span>Q1</span>
                                            <span>JAN</span>
                                            <span>
                                                <i
                                                    className={
                                                        selectYearValue < new Date().getFullYear()
                                                            ? 'fas fa-lock close-lock'
                                                            : selectYearValue === new Date().getFullYear()
                                                            ? 1 < new Date().getMonth() + 1
                                                                ? 'fas fa-lock close-lock'
                                                                : 'fas fa-lock-open open-lock'
                                                            : 'fas fa-lock-open open-lock'
                                                    }></i>
                                            </span>
                                        </div>
                                        <div className="pa-title-two">
                                            <span>Q1</span>
                                            <span>FEB</span>
                                            <span>
                                                <i
                                                    className={
                                                        selectYearValue < new Date().getFullYear()
                                                            ? 'fas fa-lock close-lock'
                                                            : selectYearValue === new Date().getFullYear()
                                                            ? 2 < new Date().getMonth() + 1
                                                                ? 'fas fa-lock close-lock'
                                                                : 'fas fa-lock-open open-lock'
                                                            : 'fas fa-lock-open open-lock'
                                                    }></i>
                                            </span>
                                        </div>
                                        <div className="pa-title-three">
                                            <span>Q1</span>
                                            <span>MAR</span>
                                            <span>
                                                <i
                                                    className={
                                                        selectYearValue < new Date().getFullYear()
                                                            ? 'fas fa-lock close-lock'
                                                            : selectYearValue === new Date().getFullYear()
                                                            ? 3 < new Date().getMonth() + 1
                                                                ? 'fas fa-lock close-lock'
                                                                : 'fas fa-lock-open open-lock'
                                                            : 'fas fa-lock-open open-lock'
                                                    }></i>
                                            </span>
                                        </div>
                                    </div>
                                ) : null}
                                {selectQuarter.value === 2 && isApply === true ? (
                                    <div className="pa-title-one-cont">
                                        <div className="pa-title-one">
                                            <span>Q2</span>
                                            <span>APR</span>
                                            <span>
                                                <i
                                                    className={
                                                        selectYearValue < new Date().getFullYear()
                                                            ? 'fas fa-lock close-lock'
                                                            : selectYearValue === new Date().getFullYear()
                                                            ? 4 < new Date().getMonth() + 1
                                                                ? 'fas fa-lock close-lock'
                                                                : 'fas fa-lock-open open-lock'
                                                            : 'fas fa-lock-open open-lock'
                                                    }></i>
                                            </span>
                                        </div>
                                        <div className="pa-title-two">
                                            <span>Q2</span>
                                            <span>MAY</span>
                                            <span>
                                                <i
                                                    className={
                                                        selectYearValue < new Date().getFullYear()
                                                            ? 'fas fa-lock close-lock'
                                                            : selectYearValue === new Date().getFullYear()
                                                            ? 5 < new Date().getMonth() + 1
                                                                ? 'fas fa-lock close-lock'
                                                                : 'fas fa-lock-open open-lock'
                                                            : 'fas fa-lock-open open-lock'
                                                    }></i>
                                            </span>
                                        </div>
                                        <div className="pa-title-three">
                                            <span>Q2</span>
                                            <span>JUN</span>
                                            <span>
                                                <i
                                                    className={
                                                        selectYearValue < new Date().getFullYear()
                                                            ? 'fas fa-lock close-lock'
                                                            : selectYearValue === new Date().getFullYear()
                                                            ? 6 < new Date().getMonth() + 1
                                                                ? 'fas fa-lock close-lock'
                                                                : 'fas fa-lock-open open-lock'
                                                            : 'fas fa-lock-open open-lock'
                                                    }></i>
                                            </span>
                                        </div>
                                    </div>
                                ) : null}
                                {selectQuarter.value === 3 && isApply === true ? (
                                    <div className="pa-title-one-cont">
                                        <div className="pa-title-one">
                                            <span>Q3</span>
                                            <span>JUL</span>
                                            <span>
                                                <i
                                                    className={
                                                        selectYearValue < new Date().getFullYear()
                                                            ? 'fas fa-lock close-lock'
                                                            : selectYearValue === new Date().getFullYear()
                                                            ? 7 < new Date().getMonth() + 1
                                                                ? 'fas fa-lock close-lock'
                                                                : 'fas fa-lock-open open-lock'
                                                            : 'fas fa-lock-open open-lock'
                                                    }></i>
                                            </span>
                                        </div>
                                        <div className="pa-title-two">
                                            <span>Q3</span>
                                            <span>AUG</span>
                                            <span>
                                                <i
                                                    className={
                                                        selectYearValue < new Date().getFullYear()
                                                            ? 'fas fa-lock close-lock'
                                                            : selectYearValue === new Date().getFullYear()
                                                            ? 8 < new Date().getMonth() + 1
                                                                ? 'fas fa-lock close-lock'
                                                                : 'fas fa-lock-open open-lock'
                                                            : 'fas fa-lock-open open-lock'
                                                    }></i>
                                            </span>
                                        </div>
                                        <div className="pa-title-three">
                                            <span>Q3</span>
                                            <span>SEP</span>
                                            <span>
                                                <i
                                                    className={
                                                        selectYearValue < new Date().getFullYear()
                                                            ? 'fas fa-lock close-lock'
                                                            : selectYearValue === new Date().getFullYear()
                                                            ? 9 < new Date().getMonth() + 1
                                                                ? 'fas fa-lock close-lock'
                                                                : 'fas fa-lock-open open-lock'
                                                            : 'fas fa-lock-open open-lock'
                                                    }></i>
                                            </span>
                                        </div>
                                    </div>
                                ) : null}
                                {selectQuarter.value === 4 && isApply === true ? (
                                    <div className="pa-title-one-cont">
                                        <div className="pa-title-one">
                                            <span>Q4</span>
                                            <span>OCT</span>
                                            <span>
                                                <i
                                                    className={
                                                        selectYearValue < new Date().getFullYear()
                                                            ? 'fas fa-lock close-lock'
                                                            : selectYearValue === new Date().getFullYear()
                                                            ? 10 < new Date().getMonth() + 1
                                                                ? 'fas fa-lock close-lock'
                                                                : 'fas fa-lock-open open-lock'
                                                            : 'fas fa-lock-open open-lock'
                                                    }></i>
                                            </span>
                                        </div>
                                        <div className="pa-title-two">
                                            <span>Q4</span>
                                            <span>NOV</span>
                                            <span>
                                                <i
                                                    className={
                                                        selectYearValue < new Date().getFullYear()
                                                            ? 'fas fa-lock close-lock'
                                                            : selectYearValue === new Date().getFullYear()
                                                            ? 11 < new Date().getMonth() + 1
                                                                ? 'fas fa-lock close-lock'
                                                                : 'fas fa-lock-open open-lock'
                                                            : 'fas fa-lock-open open-lock'
                                                    }></i>
                                            </span>
                                        </div>
                                        <div className="pa-title-three">
                                            <span>Q4</span>
                                            <span>DEC</span>
                                            <span>
                                                <i
                                                    className={
                                                        selectYearValue < new Date().getFullYear()
                                                            ? 'fas fa-lock close-lock'
                                                            : selectYearValue === new Date().getFullYear()
                                                            ? 12 < new Date().getMonth() + 1
                                                                ? 'fas fa-lock close-lock'
                                                                : 'fas fa-lock-open open-lock'
                                                            : 'fas fa-lock-open open-lock'
                                                    }></i>
                                            </span>
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            {/* FIRST TABLE */}
                            {selectQuarter.value === 1 && isApply === true ? (
                                <div className="pa-main-table-cont">
                                    <div className="pa-months-main-div">
                                        <DragDropContext onDragEnd={ondragend}>
                                            <Droppable droppableId="11">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="pa-jan-table">
                                                        {columns.items.map((data, index) => (
                                                            <Draggable
                                                                isDragDisabled={isDragDisabled(1)}
                                                                key={data.id}
                                                                draggableId={data.id}
                                                                index={index}>
                                                                {(provided) => (
                                                                    <OverlayTrigger
                                                                        key={index}
                                                                        placement={'right'}
                                                                        overlay={
                                                                            <Tooltip>
                                                                                <span>{data.brandName}</span>
                                                                            </Tooltip>
                                                                        }>
                                                                        <div
                                                                            className="promodiv"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}>
                                                                            {data.name}
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>

                                            <div className="pa-jan-table-product">
                                                <Table>
                                                    <thead>
                                                        <tr>{tableHeaderName()}</tr>
                                                    </thead>
                                                    <tbody>
                                                        {columns.promo.map((data, index) => (
                                                            <tr>
                                                                {index < 6 ? (
                                                                    <td>{index + 1}</td>
                                                                ) : (
                                                                    <td>{index - 5}</td>
                                                                )}

                                                                <Droppable key={index} droppableId={data.id}>
                                                                    {(provided) => (
                                                                        <div
                                                                            className={
                                                                                Number(data.id) < 7
                                                                                    ? 'itemsdiv'
                                                                                    : 'itemsdiv3'
                                                                            }
                                                                            {...provided.droppableProps}
                                                                            ref={provided.innerRef}>
                                                                            <Draggable
                                                                                isDragDisabled={isDragDisabled(1)}
                                                                                key={data.id}
                                                                                draggableId={data.id}
                                                                                index={index}>
                                                                                {(provided) => (
                                                                                    <OverlayTrigger
                                                                                        key={index}
                                                                                        placement={'right'}
                                                                                        overlay={
                                                                                            <Tooltip>
                                                                                                <span>
                                                                                                    {
                                                                                                        data.name
                                                                                                            .brandName
                                                                                                    }
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <div
                                                                                            className="itemsdiv2"
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}>
                                                                                            <span>
                                                                                                {data.name.name}
                                                                                            </span>
                                                                                        </div>
                                                                                    </OverlayTrigger>
                                                                                )}
                                                                            </Draggable>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                                {index < data.productAı.length ? (
                                                                    <td className="aı-product">
                                                                        <OverlayTrigger
                                                                            key={index}
                                                                            placement={'right'}
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    <span>
                                                                                        {
                                                                                            data.productAı[index]
                                                                                                .brandName
                                                                                        }
                                                                                    </span>
                                                                                </Tooltip>
                                                                            }>
                                                                            <span>
                                                                                {data.productAı[index].brandName
                                                                                    .length > 9
                                                                                    ? `${data.productAı[
                                                                                          index
                                                                                      ].brandName.slice(0, 8)}...`
                                                                                    : data.productAı[index].brandName}
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    </td>
                                                                ) : (
                                                                    <td> </td>
                                                                )}

                                                                <td>{data.name.allocation}</td>
                                                                {index < 6 ? <td>PROMO</td> : <td>NON</td>}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </DragDropContext>
                                    </div>

                                    <div className="pa-months-main-div">
                                        <DragDropContext onDragEnd={ondragendJan}>
                                            <Droppable droppableId="11">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="pa-jan-table">
                                                        {fabruary.items.map((data, index) => (
                                                            <Draggable
                                                                isDragDisabled={isDragDisabled(2)}
                                                                key={data.id}
                                                                draggableId={data.id}
                                                                index={index}>
                                                                {(provided) => (
                                                                    <OverlayTrigger
                                                                        key={index}
                                                                        placement={'right'}
                                                                        overlay={
                                                                            <Tooltip>
                                                                                <span>{data.brandName}</span>
                                                                            </Tooltip>
                                                                        }>
                                                                        <div
                                                                            className="promodiv"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}>
                                                                            {data.name}
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>

                                            <div className="pa-jan-table-product">
                                                <Table>
                                                    <thead>
                                                        <tr>{tableHeaderName()}</tr>
                                                    </thead>
                                                    <tbody>
                                                        {fabruary.promo.map((data, index) => (
                                                            <tr>
                                                                {index < 6 ? (
                                                                    <td>{index + 1}</td>
                                                                ) : (
                                                                    <td>{index - 5}</td>
                                                                )}
                                                                <Droppable key={index} droppableId={data.id}>
                                                                    {(provided) => (
                                                                        <div
                                                                            className={
                                                                                data.id < 7 ? 'itemsdiv' : 'itemsdiv3'
                                                                            }
                                                                            {...provided.droppableProps}
                                                                            ref={provided.innerRef}>
                                                                            <Draggable
                                                                                isDragDisabled={isDragDisabled(2)}
                                                                                key={data.id}
                                                                                draggableId={data.id}
                                                                                index={index}>
                                                                                {(provided) => (
                                                                                    <OverlayTrigger
                                                                                        key={index}
                                                                                        placement={'right'}
                                                                                        overlay={
                                                                                            <Tooltip>
                                                                                                <span>
                                                                                                    {
                                                                                                        data.name
                                                                                                            .brandName
                                                                                                    }
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <div
                                                                                            className="itemsdiv2"
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}>
                                                                                            <span>
                                                                                                {data.name.name}
                                                                                            </span>
                                                                                        </div>
                                                                                    </OverlayTrigger>
                                                                                )}
                                                                            </Draggable>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                                {index < data.productAı.length ? (
                                                                    <td className="aı-product">
                                                                        <OverlayTrigger
                                                                            key={index}
                                                                            placement={'right'}
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    <span>
                                                                                        {
                                                                                            data.productAı[index]
                                                                                                .brandName
                                                                                        }
                                                                                    </span>
                                                                                </Tooltip>
                                                                            }>
                                                                            <span>
                                                                                {data.productAı[index].brandName
                                                                                    .length > 9
                                                                                    ? `${data.productAı[
                                                                                          index
                                                                                      ].brandName.slice(0, 8)}...`
                                                                                    : data.productAı[index].brandName}
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    </td>
                                                                ) : (
                                                                    <td> </td>
                                                                )}
                                                                <td>{data.name.allocation}</td>
                                                                {index < 6 ? <td>PROMO</td> : <td>NON</td>}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </DragDropContext>
                                    </div>

                                    <div id="pa-months3-main-div" className="pa-months-main-div">
                                        <DragDropContext onDragEnd={ondragendMar}>
                                            <Droppable droppableId="11">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="pa-jan-table">
                                                        {march.items.map((data, index) => (
                                                            <Draggable
                                                                key={data.id}
                                                                draggableId={data.id}
                                                                index={index}
                                                                isDragDisabled={isDragDisabled(3)}>
                                                                {(provided) => (
                                                                    <OverlayTrigger
                                                                        key={index}
                                                                        placement={'right'}
                                                                        overlay={
                                                                            <Tooltip>
                                                                                <span>{data.brandName}</span>
                                                                            </Tooltip>
                                                                        }>
                                                                        <div
                                                                            className="promodiv"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}>
                                                                            {data.name}
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>

                                            <div className="pa-jan-table-product">
                                                <Table>
                                                    <thead>
                                                        <tr>{tableHeaderName()}</tr>
                                                    </thead>
                                                    <tbody>
                                                        {march.promo.map((data, index) => (
                                                            <tr>
                                                                {index < 6 ? (
                                                                    <td>{index + 1}</td>
                                                                ) : (
                                                                    <td>{index - 5}</td>
                                                                )}
                                                                <Droppable key={index} droppableId={data.id}>
                                                                    {(provided) => (
                                                                        <div
                                                                            className={
                                                                                data.id < 7 ? 'itemsdiv' : 'itemsdiv3'
                                                                            }
                                                                            {...provided.droppableProps}
                                                                            ref={provided.innerRef}>
                                                                            <Draggable
                                                                                key={data.id}
                                                                                draggableId={data.id}
                                                                                index={index}
                                                                                isDragDisabled={isDragDisabled(3)}>
                                                                                {(provided) => (
                                                                                    <OverlayTrigger
                                                                                        key={index}
                                                                                        placement={'right'}
                                                                                        overlay={
                                                                                            <Tooltip>
                                                                                                <span>
                                                                                                    {
                                                                                                        data.name
                                                                                                            .brandName
                                                                                                    }
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <div
                                                                                            className="itemsdiv2"
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}>
                                                                                            <span>
                                                                                                {data.name.name}
                                                                                            </span>
                                                                                        </div>
                                                                                    </OverlayTrigger>
                                                                                )}
                                                                            </Draggable>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                                {index < data.productAı.length ? (
                                                                    <td className="aı-product">
                                                                        <OverlayTrigger
                                                                            key={index}
                                                                            placement={'right'}
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    <span>
                                                                                        {
                                                                                            data.productAı[index]
                                                                                                .brandName
                                                                                        }
                                                                                    </span>
                                                                                </Tooltip>
                                                                            }>
                                                                            <span>
                                                                                {data.productAı[index].brandName
                                                                                    .length > 9
                                                                                    ? `${data.productAı[
                                                                                          index
                                                                                      ].brandName.slice(0, 8)}...`
                                                                                    : data.productAı[index].brandName}
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    </td>
                                                                ) : (
                                                                    <td> </td>
                                                                )}
                                                                <td>{data.name.allocation}</td>
                                                                {index < 6 ? <td>PROMO</td> : <td>NON</td>}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </DragDropContext>
                                    </div>
                                </div>
                            ) : selectQuarter.value === 2 && isApply === true ? (
                                <div className="pa-main-table-cont">
                                    <div className="pa-months-main-div">
                                        <DragDropContext onDragEnd={ondragendApr}>
                                            <Droppable droppableId="11">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="pa-jan-table">
                                                        {april.items.map((data, index) => (
                                                            <Draggable
                                                                key={data.id}
                                                                draggableId={data.id}
                                                                index={index}
                                                                isDragDisabled={isDragDisabled(4)}>
                                                                {(provided) => (
                                                                    <OverlayTrigger
                                                                        key={index}
                                                                        placement={'right'}
                                                                        overlay={
                                                                            <Tooltip>
                                                                                <span>{data.brandName}</span>
                                                                            </Tooltip>
                                                                        }>
                                                                        <div
                                                                            className="promodiv"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}>
                                                                            {data.name}
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>

                                            <div className="pa-jan-table-product">
                                                <Table>
                                                    <thead>
                                                        <tr>{tableHeaderName()}</tr>
                                                    </thead>
                                                    <tbody>
                                                        {april.promo.map((data, index) => (
                                                            <tr>
                                                                {index < 6 ? (
                                                                    <td>{index + 1}</td>
                                                                ) : (
                                                                    <td>{index - 5}</td>
                                                                )}
                                                                <Droppable key={index} droppableId={data.id}>
                                                                    {(provided) => (
                                                                        <div
                                                                            className={
                                                                                data.id < 7 ? 'itemsdiv' : 'itemsdiv3'
                                                                            }
                                                                            {...provided.droppableProps}
                                                                            ref={provided.innerRef}>
                                                                            <Draggable
                                                                                key={data.id}
                                                                                draggableId={data.id}
                                                                                index={index}
                                                                                isDragDisabled={true}>
                                                                                {(provided) => (
                                                                                    <OverlayTrigger
                                                                                        key={index}
                                                                                        placement={'right'}
                                                                                        overlay={
                                                                                            <Tooltip>
                                                                                                <span>
                                                                                                    {
                                                                                                        data.name
                                                                                                            .brandName
                                                                                                    }
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <div
                                                                                            className="itemsdiv2"
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}>
                                                                                            <span>
                                                                                                {data.name.name}
                                                                                            </span>
                                                                                        </div>
                                                                                    </OverlayTrigger>
                                                                                )}
                                                                            </Draggable>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                                {index < data.productAı.length ? (
                                                                    <td className="aı-product">
                                                                        <OverlayTrigger
                                                                            key={index}
                                                                            placement={'right'}
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    <span>
                                                                                        {
                                                                                            data.productAı[index]
                                                                                                .brandName
                                                                                        }
                                                                                    </span>
                                                                                </Tooltip>
                                                                            }>
                                                                            <span>
                                                                                {data.productAı[index].brandName
                                                                                    .length > 9
                                                                                    ? `${data.productAı[
                                                                                          index
                                                                                      ].brandName.slice(0, 8)}...`
                                                                                    : data.productAı[index].brandName}
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    </td>
                                                                ) : (
                                                                    <td> </td>
                                                                )}
                                                                <td>{data.name.allocation}</td>
                                                                {index < 6 ? <td>PROMO</td> : <td>NON</td>}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </DragDropContext>
                                    </div>

                                    <div className="pa-months-main-div">
                                        <DragDropContext onDragEnd={ondragendMay}>
                                            <Droppable droppableId="11">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="pa-jan-table">
                                                        {mayy.items.map((data, index) => (
                                                            <Draggable
                                                                key={data.id}
                                                                draggableId={data.id}
                                                                index={index}
                                                                isDragDisabled={isDragDisabled(5)}>
                                                                {(provided) => (
                                                                    <OverlayTrigger
                                                                        key={index}
                                                                        placement={'right'}
                                                                        overlay={
                                                                            <Tooltip>
                                                                                <span>{data.brandName}</span>
                                                                            </Tooltip>
                                                                        }>
                                                                        <div
                                                                            className="promodiv"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}>
                                                                            {data.name}
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                            <div className="pa-jan-table-product">
                                                <Table>
                                                    <thead>
                                                        <tr>{tableHeaderName()}</tr>
                                                    </thead>
                                                    <tbody>
                                                        {mayy.promo.map((data, index) => (
                                                            <tr>
                                                                {index < 6 ? (
                                                                    <td>{index + 1}</td>
                                                                ) : (
                                                                    <td>{index - 5}</td>
                                                                )}
                                                                <Droppable key={index} droppableId={data.id}>
                                                                    {(provided) => (
                                                                        <div
                                                                            className={
                                                                                data.id < 7 ? 'itemsdiv' : 'itemsdiv3'
                                                                            }
                                                                            {...provided.droppableProps}
                                                                            ref={provided.innerRef}>
                                                                            <Draggable
                                                                                key={data.id}
                                                                                draggableId={data.id}
                                                                                index={index}
                                                                                isDragDisabled={isDragDisabled(5)}>
                                                                                {(provided) => (
                                                                                    <OverlayTrigger
                                                                                        key={index}
                                                                                        placement={'right'}
                                                                                        overlay={
                                                                                            <Tooltip>
                                                                                                <span>
                                                                                                    {
                                                                                                        data.name
                                                                                                            .brandName
                                                                                                    }
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <div
                                                                                            className="itemsdiv2"
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}>
                                                                                            <span>
                                                                                                {data.name.name}
                                                                                            </span>
                                                                                        </div>
                                                                                    </OverlayTrigger>
                                                                                )}
                                                                            </Draggable>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                                {index < data.productAı.length ? (
                                                                    <td className="aı-product">
                                                                        <OverlayTrigger
                                                                            key={index}
                                                                            placement={'right'}
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    <span>
                                                                                        {
                                                                                            data.productAı[index]
                                                                                                .brandName
                                                                                        }
                                                                                    </span>
                                                                                </Tooltip>
                                                                            }>
                                                                            <span>
                                                                                {data.productAı[index].brandName
                                                                                    .length > 9
                                                                                    ? `${data.productAı[
                                                                                          index
                                                                                      ].brandName.slice(0, 8)}...`
                                                                                    : data.productAı[index].brandName}
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    </td>
                                                                ) : (
                                                                    <td> </td>
                                                                )}
                                                                <td>{data.name.allocation}</td>
                                                                {index < 6 ? <td>PROMO</td> : <td>NON</td>}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </DragDropContext>
                                    </div>

                                    <div className="pa-months-main-div">
                                        <DragDropContext onDragEnd={ondragendJun}>
                                            <Droppable droppableId="11">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="pa-jan-table">
                                                        {june.items.map((data, index) => (
                                                            <Draggable
                                                                key={data.id}
                                                                draggableId={data.id}
                                                                index={index}
                                                                isDragDisabled={isDragDisabled(6)}>
                                                                {(provided) => (
                                                                    <OverlayTrigger
                                                                        key={index}
                                                                        placement={'right'}
                                                                        overlay={
                                                                            <Tooltip>
                                                                                <span>{data.brandName}</span>
                                                                            </Tooltip>
                                                                        }>
                                                                        <div
                                                                            className="promodiv"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}>
                                                                            {data.name}
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                            <div className="pa-jan-table-product">
                                                <Table>
                                                    <thead>
                                                        <tr>{tableHeaderName()}</tr>
                                                    </thead>
                                                    <tbody>
                                                        {june.promo.map((data, index) => (
                                                            <tr>
                                                                {index < 6 ? (
                                                                    <td>{index + 1}</td>
                                                                ) : (
                                                                    <td>{index - 5}</td>
                                                                )}
                                                                <Droppable key={index} droppableId={data.id}>
                                                                    {(provided) => (
                                                                        <div
                                                                            className={
                                                                                data.id < 7 ? 'itemsdiv' : 'itemsdiv3'
                                                                            }
                                                                            {...provided.droppableProps}
                                                                            ref={provided.innerRef}>
                                                                            <Draggable
                                                                                key={data.id}
                                                                                draggableId={data.id}
                                                                                index={index}
                                                                                isDragDisabled={isDragDisabled(6)}>
                                                                                {(provided) => (
                                                                                    <OverlayTrigger
                                                                                        key={index}
                                                                                        placement={'right'}
                                                                                        overlay={
                                                                                            <Tooltip>
                                                                                                <span>
                                                                                                    {
                                                                                                        data.name
                                                                                                            .brandName
                                                                                                    }
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <div
                                                                                            className="itemsdiv2"
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}>
                                                                                            <span>
                                                                                                {data.name.name}
                                                                                            </span>
                                                                                        </div>
                                                                                    </OverlayTrigger>
                                                                                )}
                                                                            </Draggable>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                                {index < data.productAı.length ? (
                                                                    <td className="aı-product">
                                                                        <OverlayTrigger
                                                                            key={index}
                                                                            placement={'right'}
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    <span>
                                                                                        {
                                                                                            data.productAı[index]
                                                                                                .brandName
                                                                                        }
                                                                                    </span>
                                                                                </Tooltip>
                                                                            }>
                                                                            <span>
                                                                                {data.productAı[index].brandName
                                                                                    .length > 9
                                                                                    ? `${data.productAı[
                                                                                          index
                                                                                      ].brandName.slice(0, 8)}...`
                                                                                    : data.productAı[index].brandName}
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    </td>
                                                                ) : (
                                                                    <td> </td>
                                                                )}
                                                                <td>{data.name.allocation}</td>
                                                                {index < 6 ? <td>PROMO</td> : <td>NON</td>}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </DragDropContext>
                                    </div>
                                </div>
                            ) : selectQuarter.value === 3 && isApply === true ? (
                                <div className="pa-main-table-cont">
                                    <div className="pa-months-main-div">
                                        <DragDropContext onDragEnd={ondragendJul}>
                                            <Droppable droppableId="11">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="pa-jan-table">
                                                        {july.items.map((data, index) => (
                                                            <Draggable
                                                                key={data.id}
                                                                draggableId={data.id}
                                                                index={index}
                                                                isDragDisabled={isDragDisabled(7)}>
                                                                {(provided) => (
                                                                    <OverlayTrigger
                                                                        key={index}
                                                                        placement={'right'}
                                                                        overlay={
                                                                            <Tooltip>
                                                                                <span>{data.brandName}</span>
                                                                            </Tooltip>
                                                                        }>
                                                                        <div
                                                                            className="promodiv"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}>
                                                                            {data.name}
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>

                                            <div className="pa-jan-table-product">
                                                <Table>
                                                    <thead>
                                                        <tr>{tableHeaderName()}</tr>
                                                    </thead>
                                                    <tbody>
                                                        {july.promo.map((data, index) => (
                                                            <tr>
                                                                {index < 6 ? (
                                                                    <td>{index + 1}</td>
                                                                ) : (
                                                                    <td>{index - 5}</td>
                                                                )}
                                                                <Droppable key={index} droppableId={data.id}>
                                                                    {(provided) => (
                                                                        <div
                                                                            className={
                                                                                data.id < 7 ? 'itemsdiv' : 'itemsdiv3'
                                                                            }
                                                                            {...provided.droppableProps}
                                                                            ref={provided.innerRef}>
                                                                            <Draggable
                                                                                key={data.id}
                                                                                draggableId={data.id}
                                                                                index={index}
                                                                                isDragDisabled={isDragDisabled(7)}>
                                                                                {(provided) => (
                                                                                    <OverlayTrigger
                                                                                        key={index}
                                                                                        placement={'right'}
                                                                                        overlay={
                                                                                            <Tooltip>
                                                                                                <span>
                                                                                                    {
                                                                                                        data.name
                                                                                                            .brandName
                                                                                                    }
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <div
                                                                                            className="itemsdiv2"
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}>
                                                                                            <span>
                                                                                                {data.name.name}
                                                                                            </span>
                                                                                        </div>
                                                                                    </OverlayTrigger>
                                                                                )}
                                                                            </Draggable>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                                {index < data.productAı.length ? (
                                                                    <td className="aı-product">
                                                                        <OverlayTrigger
                                                                            key={index}
                                                                            placement={'right'}
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    <span>
                                                                                        {
                                                                                            data.productAı[index]
                                                                                                .brandName
                                                                                        }
                                                                                    </span>
                                                                                </Tooltip>
                                                                            }>
                                                                            <span>
                                                                                {data.productAı[index].brandName
                                                                                    .length > 9
                                                                                    ? `${data.productAı[
                                                                                          index
                                                                                      ].brandName.slice(0, 8)}...`
                                                                                    : data.productAı[index].brandName}
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    </td>
                                                                ) : (
                                                                    <td> </td>
                                                                )}
                                                                <td>{data.name.allocation}</td>
                                                                {index < 6 ? <td>PROMO</td> : <td>NON</td>}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </DragDropContext>
                                    </div>

                                    <div className="pa-months-main-div">
                                        <DragDropContext onDragEnd={ondragendAug}>
                                            <Droppable droppableId="11">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="pa-jan-table">
                                                        {august.items.map((data, index) => (
                                                            <Draggable
                                                                key={data.id}
                                                                draggableId={data.id}
                                                                index={index}
                                                                isDragDisabled={isDragDisabled(8)}>
                                                                {(provided) => (
                                                                    <OverlayTrigger
                                                                        key={index}
                                                                        placement={'right'}
                                                                        overlay={
                                                                            <Tooltip>
                                                                                <span>{data.brandName}</span>
                                                                            </Tooltip>
                                                                        }>
                                                                        <div
                                                                            className="promodiv"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}>
                                                                            {data.name}
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                            <div className="pa-jan-table-product">
                                                <Table>
                                                    <thead>
                                                        <tr>{tableHeaderName()}</tr>
                                                    </thead>
                                                    <tbody>
                                                        {august.promo.map((data, index) => (
                                                            <tr>
                                                                {index < 6 ? (
                                                                    <td>{index + 1}</td>
                                                                ) : (
                                                                    <td>{index - 5}</td>
                                                                )}
                                                                <Droppable key={index} droppableId={data.id}>
                                                                    {(provided) => (
                                                                        <div
                                                                            className={
                                                                                data.id < 7 ? 'itemsdiv' : 'itemsdiv3'
                                                                            }
                                                                            {...provided.droppableProps}
                                                                            ref={provided.innerRef}>
                                                                            <Draggable
                                                                                key={data.id}
                                                                                draggableId={data.id}
                                                                                index={index}
                                                                                isDragDisabled={isDragDisabled(8)}>
                                                                                {(provided) => (
                                                                                    <OverlayTrigger
                                                                                        key={index}
                                                                                        placement={'right'}
                                                                                        overlay={
                                                                                            <Tooltip>
                                                                                                <span>
                                                                                                    {
                                                                                                        data.name
                                                                                                            .brandName
                                                                                                    }
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <div
                                                                                            className="itemsdiv2"
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}>
                                                                                            <span>
                                                                                                {data.name.name}
                                                                                            </span>
                                                                                        </div>
                                                                                    </OverlayTrigger>
                                                                                )}
                                                                            </Draggable>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                                {index < data.productAı.length ? (
                                                                    <td className="aı-product">
                                                                        <OverlayTrigger
                                                                            key={index}
                                                                            placement={'right'}
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    <span>
                                                                                        {
                                                                                            data.productAı[index]
                                                                                                .brandName
                                                                                        }
                                                                                    </span>
                                                                                </Tooltip>
                                                                            }>
                                                                            <span>
                                                                                {data.productAı[index].brandName
                                                                                    .length > 9
                                                                                    ? `${data.productAı[
                                                                                          index
                                                                                      ].brandName.slice(0, 8)}...`
                                                                                    : data.productAı[index].brandName}
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    </td>
                                                                ) : (
                                                                    <td> </td>
                                                                )}
                                                                <td>{data.name.allocation}</td>
                                                                {index < 6 ? <td>PROMO</td> : <td>NON</td>}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </DragDropContext>
                                    </div>

                                    <div className="pa-months-main-div">
                                        <DragDropContext onDragEnd={ondragendSep}>
                                            <Droppable droppableId="11">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="pa-jan-table">
                                                        {september.items.map((data, index) => (
                                                            <Draggable
                                                                key={data.id}
                                                                draggableId={data.id}
                                                                index={index}
                                                                isDragDisabled={isDragDisabled(9)}>
                                                                {(provided) => (
                                                                    <OverlayTrigger
                                                                        key={index}
                                                                        placement={'right'}
                                                                        overlay={
                                                                            <Tooltip>
                                                                                <span>{data.brandName}</span>
                                                                            </Tooltip>
                                                                        }>
                                                                        <div
                                                                            className="promodiv"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}>
                                                                            {data.name}
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                            <div className="pa-jan-table-product">
                                                <Table>
                                                    <thead>
                                                        <tr>{tableHeaderName()}</tr>
                                                    </thead>
                                                    <tbody>
                                                        {september.promo.map((data, index) => (
                                                            <tr>
                                                                {index < 6 ? (
                                                                    <td>{index + 1}</td>
                                                                ) : (
                                                                    <td>{index - 5}</td>
                                                                )}
                                                                <Droppable key={index} droppableId={data.id}>
                                                                    {(provided) => (
                                                                        <div
                                                                            className={
                                                                                data.id < 7 ? 'itemsdiv' : 'itemsdiv3'
                                                                            }
                                                                            {...provided.droppableProps}
                                                                            ref={provided.innerRef}>
                                                                            <Draggable
                                                                                key={data.id}
                                                                                draggableId={data.id}
                                                                                index={index}
                                                                                isDragDisabled={isDragDisabled(9)}>
                                                                                {(provided) => (
                                                                                    <OverlayTrigger
                                                                                        key={index}
                                                                                        placement={'right'}
                                                                                        overlay={
                                                                                            <Tooltip>
                                                                                                <span>
                                                                                                    {
                                                                                                        data.name
                                                                                                            .brandName
                                                                                                    }
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <div
                                                                                            className="itemsdiv2"
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}>
                                                                                            <span>
                                                                                                {data.name.name}
                                                                                            </span>
                                                                                        </div>
                                                                                    </OverlayTrigger>
                                                                                )}
                                                                            </Draggable>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                                {index < data.productAı.length ? (
                                                                    <td className="aı-product">
                                                                        <OverlayTrigger
                                                                            key={index}
                                                                            placement={'right'}
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    <span>
                                                                                        {
                                                                                            data.productAı[index]
                                                                                                .brandName
                                                                                        }
                                                                                    </span>
                                                                                </Tooltip>
                                                                            }>
                                                                            <span>
                                                                                {data.productAı[index].brandName
                                                                                    .length > 9
                                                                                    ? `${data.productAı[
                                                                                          index
                                                                                      ].brandName.slice(0, 8)}...`
                                                                                    : data.productAı[index].brandName}
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    </td>
                                                                ) : (
                                                                    <td> </td>
                                                                )}
                                                                <td>{data.name.allocation}</td>
                                                                {index < 6 ? <td>PROMO</td> : <td>NON</td>}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </DragDropContext>
                                    </div>
                                </div>
                            ) : selectQuarter.value === 4 && isApply === true ? (
                                <div className="pa-main-table-cont">
                                    <div className="pa-months-main-div">
                                        <DragDropContext onDragEnd={ondragendOct}>
                                            <Droppable droppableId="11">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="pa-jan-table">
                                                        {octember.items.map((data, index) => (
                                                            <Draggable
                                                                key={data.id}
                                                                draggableId={data.id}
                                                                index={index}
                                                                isDragDisabled={isDragDisabled(10)}>
                                                                {(provided) => (
                                                                    <OverlayTrigger
                                                                        key={index}
                                                                        placement={'right'}
                                                                        overlay={
                                                                            <Tooltip>
                                                                                <span>{data.brandName}</span>
                                                                            </Tooltip>
                                                                        }>
                                                                        <div
                                                                            className="promodiv"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}>
                                                                            {data.name}
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                            <div className="pa-jan-table-product">
                                                <Table>
                                                    <thead>
                                                        <tr>{tableHeaderName()}</tr>
                                                    </thead>
                                                    <tbody>
                                                        {octember.promo.map((data, index) => (
                                                            <tr>
                                                                {index < 6 ? (
                                                                    <td>{index + 1}</td>
                                                                ) : (
                                                                    <td>{index - 5}</td>
                                                                )}

                                                                <Droppable key={index} droppableId={data.id}>
                                                                    {(provided) => (
                                                                        <div
                                                                            className={
                                                                                data.id < 7 ? 'itemsdiv' : 'itemsdiv3'
                                                                            }
                                                                            {...provided.droppableProps}
                                                                            ref={provided.innerRef}>
                                                                            <Draggable
                                                                                key={data.id}
                                                                                draggableId={data.id}
                                                                                index={index}
                                                                                isDragDisabled={isDragDisabled(10)}>
                                                                                {(provided) => (
                                                                                    <OverlayTrigger
                                                                                        key={index}
                                                                                        placement={'right'}
                                                                                        overlay={
                                                                                            <Tooltip>
                                                                                                <span>
                                                                                                    {
                                                                                                        data.name
                                                                                                            .brandName
                                                                                                    }
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <div
                                                                                            className="itemsdiv2"
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}>
                                                                                            <span>
                                                                                                {data.name.name}
                                                                                            </span>
                                                                                        </div>
                                                                                    </OverlayTrigger>
                                                                                )}
                                                                            </Draggable>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                                {index < data.productAı.length ? (
                                                                    <td className="aı-product">
                                                                        <OverlayTrigger
                                                                            key={index}
                                                                            placement={'right'}
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    <span>
                                                                                        {
                                                                                            data.productAı[index]
                                                                                                .brandName
                                                                                        }
                                                                                    </span>
                                                                                </Tooltip>
                                                                            }>
                                                                            <span>
                                                                                {data.productAı[index].brandName
                                                                                    .length > 9
                                                                                    ? `${data.productAı[
                                                                                          index
                                                                                      ].brandName.slice(0, 8)}...`
                                                                                    : data.productAı[index].brandName}
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    </td>
                                                                ) : (
                                                                    <td> </td>
                                                                )}
                                                                <td>{data.name.allocation}</td>
                                                                {index < 6 ? <td>PROMO</td> : <td>NON</td>}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </DragDropContext>
                                    </div>
                                    <div className="pa-months-main-div">
                                        <DragDropContext onDragEnd={ondragendNov}>
                                            <Droppable droppableId="11">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="pa-jan-table">
                                                        {november.items.map((data, index) => (
                                                            <Draggable
                                                                key={data.id}
                                                                draggableId={data.id}
                                                                index={index}
                                                                isDragDisabled={isDragDisabled(11)}>
                                                                {(provided) => (
                                                                    <OverlayTrigger
                                                                        key={index}
                                                                        placement={'right'}
                                                                        overlay={
                                                                            <Tooltip>
                                                                                <span>{data.brandName}</span>
                                                                            </Tooltip>
                                                                        }>
                                                                        <div
                                                                            className="promodiv"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}>
                                                                            {data.name}
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                            <div className="pa-jan-table-product">
                                                <Table>
                                                    <thead>
                                                        <tr>{tableHeaderName()}</tr>
                                                    </thead>
                                                    <tbody>
                                                        {november.promo.map((data, index) => (
                                                            <tr>
                                                                {index < 6 ? (
                                                                    <td>{index + 1}</td>
                                                                ) : (
                                                                    <td>{index - 5}</td>
                                                                )}
                                                                <Droppable key={index} droppableId={data.id}>
                                                                    {(provided) => (
                                                                        <div
                                                                            className={
                                                                                data.id < 7 ? 'itemsdiv' : 'itemsdiv3'
                                                                            }
                                                                            {...provided.droppableProps}
                                                                            ref={provided.innerRef}>
                                                                            <Draggable
                                                                                key={data.id}
                                                                                draggableId={data.id}
                                                                                index={index}
                                                                                isDragDisabled={isDragDisabled(11)}>
                                                                                {(provided) => (
                                                                                    <OverlayTrigger
                                                                                        key={index}
                                                                                        placement={'right'}
                                                                                        overlay={
                                                                                            <Tooltip>
                                                                                                <span>
                                                                                                    {
                                                                                                        data.name
                                                                                                            .brandName
                                                                                                    }
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <div
                                                                                            className="itemsdiv2"
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}>
                                                                                            <span>
                                                                                                {data.name.name}
                                                                                            </span>
                                                                                        </div>
                                                                                    </OverlayTrigger>
                                                                                )}
                                                                            </Draggable>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                                {index < data.productAı.length ? (
                                                                    <td className="aı-product">
                                                                        <OverlayTrigger
                                                                            key={index}
                                                                            placement={'right'}
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    <span>
                                                                                        {
                                                                                            data.productAı[index]
                                                                                                .brandName
                                                                                        }
                                                                                    </span>
                                                                                </Tooltip>
                                                                            }>
                                                                            <span>
                                                                                {data.productAı[index].brandName
                                                                                    .length > 9
                                                                                    ? `${data.productAı[
                                                                                          index
                                                                                      ].brandName.slice(0, 8)}...`
                                                                                    : data.productAı[index].brandName}
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    </td>
                                                                ) : (
                                                                    <td> </td>
                                                                )}
                                                                <td>{data.name.allocation}</td>
                                                                {index < 6 ? <td>PROMO</td> : <td>NON</td>}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </DragDropContext>
                                    </div>

                                    <div className="pa-months-main-div">
                                        <DragDropContext onDragEnd={ondragendDec}>
                                            <Droppable droppableId="11">
                                                {(provided) => (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        className="pa-jan-table">
                                                        {december.items.map((data, index) => (
                                                            <Draggable
                                                                key={data.id}
                                                                draggableId={data.id}
                                                                index={index}
                                                                isDragDisabled={isDragDisabled(12)}>
                                                                {(provided) => (
                                                                    <OverlayTrigger
                                                                        key={index}
                                                                        placement={'right'}
                                                                        overlay={
                                                                            <Tooltip>
                                                                                <span>{data.brandName}</span>
                                                                            </Tooltip>
                                                                        }>
                                                                        <div
                                                                            className="promodiv"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}>
                                                                            {data.name}
                                                                        </div>
                                                                    </OverlayTrigger>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>

                                            <div className="pa-jan-table-product">
                                                <Table>
                                                    <thead>
                                                        <tr>{tableHeaderName()}</tr>
                                                    </thead>
                                                    <tbody>
                                                        {december.promo.map((data, index) => (
                                                            <tr>
                                                                {index < 6 ? (
                                                                    <td>{index + 1}</td>
                                                                ) : (
                                                                    <td>{index - 5}</td>
                                                                )}
                                                                <Droppable key={index} droppableId={data.id}>
                                                                    {(provided) => (
                                                                        <div
                                                                            className={
                                                                                data.id < 7 ? 'itemsdiv' : 'itemsdiv3'
                                                                            }
                                                                            {...provided.droppableProps}
                                                                            ref={provided.innerRef}>
                                                                            <Draggable
                                                                                key={data.id}
                                                                                draggableId={data.id}
                                                                                index={index}
                                                                                isDragDisabled={isDragDisabled(12)}>
                                                                                {(provided) => (
                                                                                    <OverlayTrigger
                                                                                        key={index}
                                                                                        placement={'right'}
                                                                                        overlay={
                                                                                            <Tooltip>
                                                                                                <span>
                                                                                                    {
                                                                                                        data.name
                                                                                                            .brandName
                                                                                                    }
                                                                                                </span>
                                                                                            </Tooltip>
                                                                                        }>
                                                                                        <div
                                                                                            className="itemsdiv2"
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}>
                                                                                            <span>
                                                                                                {data.name.name}
                                                                                            </span>
                                                                                        </div>
                                                                                    </OverlayTrigger>
                                                                                )}
                                                                            </Draggable>
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                                {index < data.productAı.length ? (
                                                                    <td className="aı-product">
                                                                        <OverlayTrigger
                                                                            key={index}
                                                                            placement={'right'}
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    <span>
                                                                                        {
                                                                                            data.productAı[index]
                                                                                                .brandName
                                                                                        }
                                                                                    </span>
                                                                                </Tooltip>
                                                                            }>
                                                                            <span>
                                                                                {data.productAı[index].brandName
                                                                                    .length > 9
                                                                                    ? `${data.productAı[
                                                                                          index
                                                                                      ].brandName.slice(0, 8)}...`
                                                                                    : data.productAı[index].brandName}
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    </td>
                                                                ) : (
                                                                    <td> </td>
                                                                )}
                                                                <td>{data.name.allocation}</td>
                                                                {index < 6 ? <td>PROMO</td> : <td>NON</td>}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </DragDropContext>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </>
                {isSaveFrequency === false && isSaveClick === true ? (
                    <PharmacySplitPercentProblem
                        messages={saveFrequencyError}
                        show={show}
                        setShow={setShow}
                        handleClose={handleModalClose}
                    />
                ) : isSaveFrequency === true ? (
                    <SuccessModal messages={'Save succesfuly'} modalShow={true} handleClose={handleClose} show={show} />
                ) : null}
                {isGetSubPromo === false ? (
                    <PharmacySplitPercentProblem
                        messages={'No product entered.'}
                        show={show}
                        setShow={setShow}
                        handleClose={handleModalClose}
                    />
                ) : null}
            </>
            <Loading loading={brandLoading} />
            <Loading loading={countryLoading} />
            <Loading loading={subPromoLoading} />
            {/* <Loading loading={businessUniteDatasLoading} /> */}
        </>
    );
};

export default ProductPA;
