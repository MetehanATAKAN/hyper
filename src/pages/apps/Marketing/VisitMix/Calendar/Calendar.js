import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';
import Month from './Month';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { calendarProduct } from '../../../../../redux/actions';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Calendar = () => {
    const { t } = useTranslation();
    const dispatch=useDispatch();

    const history = useHistory();
    //product select
    const [product, setProduct] = useState([]);
    const [selectProduct, setSelectProduct] = useState([]);
    
    //indication select
    const [indication, setIndication] = useState([]);
    const [selectIndication, setSelectIndication] = useState([]);
    
    //profile select
   const [profile, setProfile] = useState([]);
   const [selectProfile, setSelectProfile] = useState([]);

    const calendarDatas = useSelector((state) => state.VisitMix.visitMixCalendarData);
    const [calendarBody] = useState(JSON.parse(localStorage.getItem('calendarDataBody')));
   
    //product api
    useEffect(() => {
        FetchApiPost('services/VisitMix/GetCalendarProductFilter', 'POST', calendarBody)
        .then((res) =>
        (async () => {
          try {
            if (res.status === 200) {
              res.json().then(data => {
                    setProduct(res?.data?.map((data) => (
                    { value: data.brandId, label: data.brandName }
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
    }, [calendarBody, history])

    //indication api
    useEffect(() => {
        if (selectProduct?.length !== 0) {
            const indicationBody = {
                SpecId: calendarBody.SpecId,
                Brands: selectProduct.map((data) => (
                    data.value
                ))
            }
            FetchApiPost('api/OldSystem/GetIndications', 'POST', indicationBody)
                .then((res) => res.json())
                .then((res) => {
                    setIndication(res.map((data) => (
                        { value: data.IndicationId, label: data.Indication }
                    )))
                })
                .catch((err) => (
                    console.log(err)
                ))
        }
        else {
            setIndication([]);
            setSelectIndication([]);
        }
    }, [calendarBody, selectProduct])
    //profiles
    useEffect(() => {
        if(selectProduct?.length!==0 && selectIndication?.length!==0){
            const profilesBody={
                Brands:selectProduct.map((data)=>(
                    data.value
                    )),
                SpecId:calendarBody.SpecId,
                IndicationIds:selectIndication.map((data)=>(
                    data.value
                ))
            }
            FetchApiPost('api/OldSystem/GetProfiles', 'POST', profilesBody)
                .then((res) => res.json())
                .then((res) => {
                    setProfile(res.map((data) => (
                        { value: data.ProfileId, label: data.Profile }
                    )))
                })
                .catch((err)=>console.log(err))
        }
        else {
            setProfile([])
            setSelectProfile([])
        }
    }, [calendarBody, selectIndication, selectProduct])

    useEffect(() => {
     dispatch(calendarProduct(selectProduct))
    }, [dispatch, selectProduct])
    
    
    
    const popover = (index) => (
        <Popover className="vm-calendar-popover-cont">
            <Popover.Body className="vm-calendar-title-popover">{index ? index : null}</Popover.Body>
        </Popover>
    );

    const [isOpen, setIsOpen] = useState(false);
    
    // BUTTONS
    const [firstActiveDraggable1, setFirstActiveDraggable1] = useState(true);
    const [firstActiveDraggable2, setFirstActiveDraggable2] = useState(true);
    const [firstActiveDraggable3, setFirstActiveDraggable3] = useState(true);
    const [firstActiveDraggable4, setFirstActiveDraggable4] = useState(true);
    const [firstActiveDraggable5, setFirstActiveDraggable5] = useState(true);
    const [firstActiveDraggable6, setFirstActiveDraggable6] = useState(true);

    const [firstRow, setFirstRow] = useState(false);
    const [firstRow1, setFirstRow1] = useState(false);
    const [firstRow2, setFirstRow2] = useState(false);
    const [firstRow3, setFirstRow3] = useState(false);
    const [firstRow4, setFirstRow4] = useState(false);
    const [firstRow5, setFirstRow5] = useState(false);
    const [firstRow6, setFirstRow6] = useState(false);
    const firstClickRow = () => {
        setFirstRow(!firstRow);
        setFirstRow1(!firstRow);
        setFirstRow2(!firstRow);
        setFirstRow3(!firstRow);
        setFirstRow4(!firstRow);
        setFirstRow5(!firstRow);
        setFirstRow6(!firstRow);
        setFirstActiveDraggable1(firstRow);
        setFirstActiveDraggable2(firstRow);
        setFirstActiveDraggable3(firstRow);
        setFirstActiveDraggable4(firstRow);
        setFirstActiveDraggable5(firstRow);
        setFirstActiveDraggable6(firstRow);
    }
    const firstClickRow1 = () => {
        setFirstRow1(!firstRow1);
        setFirstActiveDraggable1(!firstActiveDraggable1);
    }
    const firstClickRow2 = () => {
        setFirstRow2(!firstRow2);
        setFirstActiveDraggable2(!firstActiveDraggable2);
    }
    const firstClickRow3 = () => {
        setFirstRow3(!firstRow3);
        setFirstActiveDraggable3(!firstActiveDraggable3);
    }
    const firstClickRow4 = () => {
        setFirstRow4(!firstRow4);
        setFirstActiveDraggable4(!firstActiveDraggable4);
    }
    const firstClickRow5 = () => {
        setFirstRow5(!firstRow5);
        setFirstActiveDraggable5(!firstActiveDraggable5);
    }
    const firstClickRow6 = () => {
        setFirstRow6(!firstRow6);
        setFirstActiveDraggable6(!firstActiveDraggable6);
    }
    //2
    const [secondActiveDraggable1, setSecondActiveDraggable1] = useState(true);
    const [secondActiveDraggable2, setSecondActiveDraggable2] = useState(true);
    const [secondActiveDraggable3, setSecondActiveDraggable3] = useState(true);
    const [secondActiveDraggable4, setSecondActiveDraggable4] = useState(true);
    const [secondActiveDraggable5, setSecondActiveDraggable5] = useState(true);
    const [secondActiveDraggable6, setSecondActiveDraggable6] = useState(true);

    const [secondRow, setSecondRow] = useState(false);
    const [secondRow1, setSecondRow1] = useState(false);
    const [secondRow2, setSecondRow2] = useState(false);
    const [secondRow3, setSecondRow3] = useState(false);
    const [secondRow4, setSecondRow4] = useState(false);
    const [secondRow5, setSecondRow5] = useState(false);
    const [secondRow6, setSecondRow6] = useState(false);
    const secondClickRow = () => {
        setSecondRow(!secondRow);
        setSecondRow1(!secondRow);
        setSecondRow2(!secondRow);
        setSecondRow3(!secondRow);
        setSecondRow4(!secondRow);
        setSecondRow5(!secondRow);
        setSecondRow6(!secondRow);
        setSecondActiveDraggable1(secondRow);
        setSecondActiveDraggable2(secondRow);
        setSecondActiveDraggable3(secondRow);
        setSecondActiveDraggable4(secondRow);
        setSecondActiveDraggable5(secondRow);
        setSecondActiveDraggable6(secondRow);
    }
    const secondClickRow1 = () => {
        setSecondRow1(!secondRow1);
        setSecondActiveDraggable1(!secondActiveDraggable1);
    }
    const secondClickRow2 = () => {
        setSecondRow2(!secondRow2);
        setSecondActiveDraggable2(!secondActiveDraggable2);
    }
    const secondClickRow3 = () => {
        setSecondRow3(!secondRow3);
        setSecondActiveDraggable3(!secondActiveDraggable3);
    }
    const secondClickRow4 = () => {
        setSecondRow4(!secondRow4);
        setSecondActiveDraggable4(!secondActiveDraggable4);
    }
    const secondClickRow5 = () => {
        setSecondRow5(!secondRow5);
        setSecondActiveDraggable5(!secondActiveDraggable5);
    }
    const secondClickRow6 = () => {
        setSecondRow6(!secondRow6);
        setSecondActiveDraggable6(!secondActiveDraggable6);
    }
    //3
    const [thirdActiveDraggable1, setThirdActiveDraggable1] = useState(true);
    const [thirdActiveDraggable2, setThirdActiveDraggable2] = useState(true);
    const [thirdActiveDraggable3, setThirdActiveDraggable3] = useState(true);
    const [thirdActiveDraggable4, setThirdActiveDraggable4] = useState(true);
    const [thirdActiveDraggable5, setThirdActiveDraggable5] = useState(true);
    const [thirdActiveDraggable6, setThirdActiveDraggable6] = useState(true);

    const [thirdRow, setThirdRow] = useState(false);
    const [thirdRow1, setThirdRow1] = useState(false);
    const [thirdRow2, setThirdRow2] = useState(false);
    const [thirdRow3, setThirdRow3] = useState(false);
    const [thirdRow4, setThirdRow4] = useState(false);
    const [thirdRow5, setThirdRow5] = useState(false);
    const [thirdRow6, setThirdRow6] = useState(false);
    const thirdClickRow = () => {
        setThirdRow(!thirdRow);
        setThirdRow1(!thirdRow);
        setThirdRow2(!thirdRow);
        setThirdRow3(!thirdRow);
        setThirdRow4(!thirdRow);
        setThirdRow5(!thirdRow);
        setThirdRow6(!thirdRow);
        setThirdActiveDraggable1(thirdRow);
        setThirdActiveDraggable2(thirdRow);
        setThirdActiveDraggable3(thirdRow);
        setThirdActiveDraggable4(thirdRow);
        setThirdActiveDraggable5(thirdRow);
        setThirdActiveDraggable6(thirdRow);
    }
    const thirdClickRow1 = () => {
        setThirdRow1(!thirdRow1);
        setThirdActiveDraggable1(!thirdActiveDraggable1);
    }
    const thirdClickRow2 = () => {
        setThirdRow2(!thirdRow2);
        setThirdActiveDraggable2(!thirdActiveDraggable2);
    }
    const thirdClickRow3 = () => {
        setThirdRow3(!thirdRow3);
        setThirdActiveDraggable3(!thirdActiveDraggable3);
    }
    const thirdClickRow4 = () => {
        setThirdRow4(!thirdRow4);
        setThirdActiveDraggable4(!thirdActiveDraggable4);
    }
    const thirdClickRow5 = () => {
        setThirdRow5(!thirdRow5);
        setThirdActiveDraggable5(!thirdActiveDraggable5);
    }
    const thirdClickRow6 = () => {
        setThirdRow6(!thirdRow6);
        setThirdActiveDraggable6(!thirdActiveDraggable6);
    }
    //4
    const [fourthActiveDraggable1, setFourthActiveDraggable1] = useState(true);
    const [fourthActiveDraggable2, setFourthActiveDraggable2] = useState(true);
    const [fourthActiveDraggable3, setFourthActiveDraggable3] = useState(true);
    const [fourthActiveDraggable4, setFourthActiveDraggable4] = useState(true);
    const [fourthActiveDraggable5, setFourthActiveDraggable5] = useState(true);
    const [fourthActiveDraggable6, setFourthActiveDraggable6] = useState(true);
    
    const [fourthRow, setFourthRow] = useState(false);
    const [fourthRow1, setFourthRow1] = useState(false);
    const [fourthRow2, setFourthRow2] = useState(false);
    const [fourthRow3, setFourthRow3] = useState(false);
    const [fourthRow4, setFourthRow4] = useState(false);
    const [fourthRow5, setFourthRow5] = useState(false);
    const [fourthRow6, setFourthRow6] = useState(false);
    const fourthClickRow = () => {
        setFourthRow(!fourthRow);
        setFourthRow1(!fourthRow);
        setFourthRow2(!fourthRow);
        setFourthRow3(!fourthRow);
        setFourthRow4(!fourthRow);
        setFourthRow5(!fourthRow);
        setFourthRow6(!fourthRow);
        setFourthActiveDraggable1(fourthRow);
        setFourthActiveDraggable2(fourthRow);
        setFourthActiveDraggable3(fourthRow);
        setFourthActiveDraggable4(fourthRow);
        setFourthActiveDraggable5(fourthRow);
        setFourthActiveDraggable6(fourthRow);
    }
    const fourthClickRow1 = () => {
        setFourthRow1(!fourthRow1);
        setFourthActiveDraggable1(!fourthActiveDraggable1);
    }
    const fourthClickRow2 = () => {
        setFourthRow2(!fourthRow2);
        setFourthActiveDraggable2(!fourthActiveDraggable2);
    }
    const fourthClickRow3 = () => {
        setFourthRow3(!fourthRow3);
        setFourthActiveDraggable3(!fourthActiveDraggable3);
    }
    const fourthClickRow4 = () => {
        setFourthRow4(!fourthRow4);
        setFourthActiveDraggable4(!fourthActiveDraggable4);
    }
    const fourthClickRow5 = () => {
        setFourthRow5(!fourthRow5);
        setFourthActiveDraggable5(!fourthActiveDraggable5);
    }
    const fourthClickRow6 = () => {
        setFourthRow6(!fourthRow6);
        setFourthActiveDraggable6(!fourthActiveDraggable6);
    }

    const [activeButton, setActiveButton] = useState(true);

    const isEnableDD = () => {
        setActiveButton(!activeButton);
        if(firstRow === false){
            setFirstActiveDraggable1(!activeButton);
            setFirstActiveDraggable2(!activeButton);
            setFirstActiveDraggable3(!activeButton);
            setFirstActiveDraggable4(!activeButton);
            setFirstActiveDraggable5(!activeButton);
            setFirstActiveDraggable6(!activeButton);
        }
        if(secondRow === false){
            setSecondActiveDraggable1(!activeButton);
            setSecondActiveDraggable2(!activeButton);
            setSecondActiveDraggable3(!activeButton);
            setSecondActiveDraggable4(!activeButton);
            setSecondActiveDraggable5(!activeButton);
            setSecondActiveDraggable6(!activeButton);
        }
        if(thirdRow === false){
            setThirdActiveDraggable1(!activeButton);
            setThirdActiveDraggable2(!activeButton);
            setThirdActiveDraggable3(!activeButton);
            setThirdActiveDraggable4(!activeButton);
            setThirdActiveDraggable5(!activeButton);
            setThirdActiveDraggable6(!activeButton);
        }
        if(fourthRow === false){
            setFourthActiveDraggable1(!activeButton);
            setFourthActiveDraggable2(!activeButton);
            setFourthActiveDraggable3(!activeButton);
            setFourthActiveDraggable4(!activeButton);
            setFourthActiveDraggable5(!activeButton);
            setFourthActiveDraggable6(!activeButton);
        }
    }

    return (
        <>
            <div className="new-table-header-cont">
                <div className="mt-2 mb-2">
                    <div className="new-table-title1">
                        <span>{t('Calendar')}</span>
                    </div>
                    <div className="new-table-title2">
                        <span>{t("Marketing")} / {t('Visit Mix')} / {t('Calendar')}</span>
                    </div>
                </div>
                <Col className="text-end table-header-btn-cont">
                    <Button variant="white" type="submit" className="btn btn-white table-header-btn">
                        <i className="dripicons-broadcast" />
                    </Button>
                </Col>
            </div>
            <Card>
                <div className="vm-calendar-main-cont mx-1">
                    <div className="vm-calendar-card-right">
                    <div>
                            <Button
                                variant="white"
                                type="submit"
                                className="btn btn-white vm-calendar-table-btn5"
                                as={Link}
                                to="/apps/marketing/visitmix">
                               <i class="fa-solid fa-left-long"></i>
                            </Button>
                        </div>
                        <div>
                            <Button variant="white" type="submit" className="btn btn-white vm-calendar-table-btn6">
                                <span>{t('send to approval')}</span>
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="white"
                                type="submit"
                                className="btn btn-white vm-calendar-table-btn5"
                                as={Link}
                                to="/apps/marketing/visitmix/pre-plan">
                                <span>{t('pre-plan')}</span>
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick={isEnableDD}
                                variant="secondary"
                                type="submit"
                                className={
                                    activeButton
                                        ? 'btn vm-calendar-table-btn4 active-vm-calendar-btn1'
                                        : 'btn vm-calendar-table-btn4'
                                }>
                                <i className="dripicons-expand vm-calendar-filter-icon4" />
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="secondary"
                                type="submit"
                                className="btn btn-secondary vm-calendar-table-btn3">
                                <i className="dripicons-export vm-calendar-filter-icon3" />
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="secondary"
                                type="submit"
                                className="btn btn-secondary vm-calendar-table-btn2">
                                <i className="uil-gift vm-calendar-filter-icon2" />
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="secondary"
                                type="submit"
                                className="btn btn-secondary vm-calendar-table-btn1"
                                onClick={()=>setIsOpen(!isOpen)}
                                >
                                {t('filter')} <i className="uil-sort vm-calendar-filter-icon1" />
                            </Button>
                        </div>
                    </div>
                </div>
                <Card.Body>
                    {isOpen  && (
                        <div className="vm-calendar-collapse-main-cont">
                            <div className="mt-2">
                                <div className="px-3 vm-calendar-collapse-select-cont">
                                    <div className="vm-calendar-first-collapse">
                                       
                                        <div className="vm-calendar-collapse-item1">
                                            <h5>{t('product')}</h5>
                                            <MultiSelect
                                                options={product}
                                                value={selectProduct}
                                                onChange={setSelectProduct}
                                                labelledBy="Select"
                                            />
                                        </div>
                                        <div className="vm-calendar-collapse-item2">
                                            <h5>{t('indication')}</h5>
                                            <MultiSelect
                                                options={indication}
                                                value={selectIndication}
                                                onChange={setSelectIndication}
                                                labelledBy="Select"
                                            />
                                        </div>
                                        <div className="vm-calendar-collapse-item3">
                                            <h5>{t('profile')}</h5>
                                            <MultiSelect
                                                options={profile}
                                                value={selectProfile}
                                                onChange={setSelectProfile}
                                                labelledBy="Select"
                                            />
                                        </div>
                                        <div className="vm-calendar-collapse-item4">
                                            <h5>{t('promo subject')}</h5>
                                            <Select
                                                isMulti={false}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="select"
                                            />
                                        </div>
                                        <div className="vm-calendar-collapse-item6">
                                            <h5>{t('promo material')}</h5>
                                            <Select
                                                isMulti={true}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="select"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="vm-calendar-collapse-buttons-cont">
                                <Row className="px-3">
                                    <Col className="text-end mt-2 mb-2">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="btn btn-primary me-1 vm-calendar-collapse-btn1">
                                            {t('apply')}
                                        </Button>
                                        <Button
                                            variant="gray"
                                            type="submit"
                                            className="btn btn-gray me-1 vm-calendar-collapse-btn2">
                                            {t('cancel')}
                                        </Button>
                                        <Button
                                            variant="danger"
                                            type="submit"
                                            className="btn btn-danger vm-calendar-collapse-btn3">
                                            <i className="dripicons-brush" />
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    ) }
                    <div className="vm-calendar-content-container">
                        <div className="vm-left-content">
                            <Month
                                clickRow1={firstRow1}
                                clickRow2={firstRow2}
                                clickRow3={firstRow3}
                                clickRow4={firstRow4}
                                clickRow5={firstRow5}
                                clickRow6={firstRow6}
                                quarter={'Q1'}
                                month={t('JAN')}
                                activeDraggable1={firstActiveDraggable1}
                                activeDraggable2={firstActiveDraggable2}
                                activeDraggable3={firstActiveDraggable3}
                                activeDraggable4={firstActiveDraggable4}
                                activeDraggable5={firstActiveDraggable5}
                                activeDraggable6={firstActiveDraggable6}
                                calendarDatas={calendarDatas}
                            />
                            <Month
                                clickRow1={secondRow1}
                                clickRow2={secondRow2}
                                clickRow3={secondRow3}
                                clickRow4={secondRow4}
                                clickRow5={secondRow5}
                                clickRow6={secondRow6}
                                quarter={'Q2'}
                                month={t('APR')}
                                activeDraggable1={secondActiveDraggable1}
                                activeDraggable2={secondActiveDraggable2}
                                activeDraggable3={secondActiveDraggable3}
                                activeDraggable4={secondActiveDraggable4}
                                activeDraggable5={secondActiveDraggable5}
                                activeDraggable6={secondActiveDraggable6}
                                calendarDatas={calendarDatas}
                            />
                            <Month
                                clickRow1={thirdRow1}
                                clickRow2={thirdRow2}
                                clickRow3={thirdRow3}
                                clickRow4={thirdRow4}
                                clickRow5={thirdRow5}
                                clickRow6={thirdRow6}
                                quarter={'Q3'}
                                month={t('JUL')}
                                activeDraggable1={thirdActiveDraggable1}
                                activeDraggable2={thirdActiveDraggable2}
                                activeDraggable3={thirdActiveDraggable3}
                                activeDraggable4={thirdActiveDraggable4}
                                activeDraggable5={thirdActiveDraggable5}
                                activeDraggable6={thirdActiveDraggable6}
                                calendarDatas={calendarDatas}
                            />
                            <Month
                                clickRow1={fourthRow1}
                                clickRow2={fourthRow2}
                                clickRow3={fourthRow3}
                                clickRow4={fourthRow4}
                                clickRow5={fourthRow5}
                                clickRow6={fourthRow6}
                                quarter={'Q4'}
                                month={t('OCT')}
                                activeDraggable1={fourthActiveDraggable1}
                                activeDraggable2={fourthActiveDraggable2}
                                activeDraggable3={fourthActiveDraggable3}
                                activeDraggable4={fourthActiveDraggable4}
                                activeDraggable5={fourthActiveDraggable5}
                                activeDraggable6={fourthActiveDraggable6}
                                calendarDatas={calendarDatas}
                            />
                        </div>
                        <div className="vm-mid-content">
                            <Month
                                clickRow1={firstRow1}
                                clickRow2={firstRow2}
                                clickRow3={firstRow3}
                                clickRow4={firstRow4}
                                clickRow5={firstRow5}
                                clickRow6={firstRow6}
                                quarter={'Q1'}
                                month={t('FEB')}
                                activeDraggable1={firstActiveDraggable1}
                                activeDraggable2={firstActiveDraggable2}
                                activeDraggable3={firstActiveDraggable3}
                                activeDraggable4={firstActiveDraggable4}
                                activeDraggable5={firstActiveDraggable5}
                                activeDraggable6={firstActiveDraggable6}
                                calendarDatas={calendarDatas}
                            />
                            <Month
                                clickRow1={secondRow1}
                                clickRow2={secondRow2}
                                clickRow3={secondRow3}
                                clickRow4={secondRow4}
                                clickRow5={secondRow5}
                                clickRow6={secondRow6}
                                quarter={'Q2'}
                                month={t('MAY')}
                                activeDraggable1={secondActiveDraggable1}
                                activeDraggable2={secondActiveDraggable2}
                                activeDraggable3={secondActiveDraggable3}
                                activeDraggable4={secondActiveDraggable4}
                                activeDraggable5={secondActiveDraggable5}
                                activeDraggable6={secondActiveDraggable6}
                                calendarDatas={calendarDatas}
                            />
                            <Month
                                clickRow1={thirdRow1}
                                clickRow2={thirdRow2}
                                clickRow3={thirdRow3}
                                clickRow4={thirdRow4}
                                clickRow5={thirdRow5}
                                clickRow6={thirdRow6}
                                quarter={'Q3'}
                                month={t('AUG')}
                                activeDraggable1={thirdActiveDraggable1}
                                activeDraggable2={thirdActiveDraggable2}
                                activeDraggable3={thirdActiveDraggable3}
                                activeDraggable4={thirdActiveDraggable4}
                                activeDraggable5={thirdActiveDraggable5}
                                activeDraggable6={thirdActiveDraggable6}
                                calendarDatas={calendarDatas}
                            />
                            <Month
                                clickRow1={fourthRow1}
                                clickRow2={fourthRow2}
                                clickRow3={fourthRow3}
                                clickRow4={fourthRow4}
                                clickRow5={fourthRow5}
                                clickRow6={fourthRow6}
                                quarter={'Q4'}
                                month={t('NOV')}
                                activeDraggable1={fourthActiveDraggable1}
                                activeDraggable2={fourthActiveDraggable2}
                                activeDraggable3={fourthActiveDraggable3}
                                activeDraggable4={fourthActiveDraggable4}
                                activeDraggable5={fourthActiveDraggable5}
                                activeDraggable6={fourthActiveDraggable6}
                                calendarDatas={calendarDatas}
                            />
                        </div>
                        <div className="vm-right-content">
                            <Month
                                clickRow1={firstRow1}
                                clickRow2={firstRow2}
                                clickRow3={firstRow3}
                                clickRow4={firstRow4}
                                clickRow5={firstRow5}
                                clickRow6={firstRow6}
                                quarter={'Q1'}
                                month={t('MAR')}
                                activeDraggable1={firstActiveDraggable1}
                                activeDraggable2={firstActiveDraggable2}
                                activeDraggable3={firstActiveDraggable3}
                                activeDraggable4={firstActiveDraggable4}
                                activeDraggable5={firstActiveDraggable5}
                                activeDraggable6={firstActiveDraggable6}
                                calendarDatas={calendarDatas}
                            />
                            <Month
                                clickRow1={secondRow1}
                                clickRow2={secondRow2}
                                clickRow3={secondRow3}
                                clickRow4={secondRow4}
                                clickRow5={secondRow5}
                                clickRow6={secondRow6}
                                quarter={'Q2'}
                                month={t('JUN')}
                                activeDraggable1={secondActiveDraggable1}
                                activeDraggable2={secondActiveDraggable2}
                                activeDraggable3={secondActiveDraggable3}
                                activeDraggable4={secondActiveDraggable4}
                                activeDraggable5={secondActiveDraggable5}
                                activeDraggable6={secondActiveDraggable6}
                                calendarDatas={calendarDatas}
                            />
                            <Month
                                clickRow1={thirdRow1}
                                clickRow2={thirdRow2}
                                clickRow3={thirdRow3}
                                clickRow4={thirdRow4}
                                clickRow5={thirdRow5}
                                clickRow6={thirdRow6}
                                quarter={'Q3'}
                                month={t('SEP')}
                                activeDraggable1={thirdActiveDraggable1}
                                activeDraggable2={thirdActiveDraggable2}
                                activeDraggable3={thirdActiveDraggable3}
                                activeDraggable4={thirdActiveDraggable4}
                                activeDraggable5={thirdActiveDraggable5}
                                activeDraggable6={thirdActiveDraggable6}
                                calendarDatas={calendarDatas}
                            />
                            <Month
                                clickRow1={fourthRow1}
                                clickRow2={fourthRow2}
                                clickRow3={fourthRow3}
                                clickRow4={fourthRow4}
                                clickRow5={fourthRow5}
                                clickRow6={fourthRow6}
                                quarter={'Q4'}
                                month={t('DEC')}
                                activeDraggable1={fourthActiveDraggable1}
                                activeDraggable2={fourthActiveDraggable2}
                                activeDraggable3={fourthActiveDraggable3}
                                activeDraggable4={fourthActiveDraggable4}
                                activeDraggable5={fourthActiveDraggable5}
                                activeDraggable6={fourthActiveDraggable6}
                                calendarDatas={calendarDatas}
                            />
                        </div>
                        <div className="vm-buttons-container">
                            <div className="vm-buttons1">
                                <OverlayTrigger placement="left" overlay={popover(firstRow ? 'Unlock Q1' : 'Lock Q1')}>
                                    <button onClick={firstClickRow}>
                                        <i
                                            className={
                                                firstRow ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'
                                            }
                                        />
                                    </button>
                                </OverlayTrigger>
                                <button onClick={firstClickRow1}>
                                    <i
                                        className={firstRow1 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={firstClickRow2}>
                                    <i
                                        className={firstRow2 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={firstClickRow3}>
                                    <i
                                        className={firstRow3 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={firstClickRow4}>
                                    <i
                                        className={firstRow4 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={firstClickRow5}>
                                    <i
                                        className={firstRow5 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={firstClickRow6}>
                                    <i
                                        className={firstRow6 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                            </div>
                            <div className="vm-buttons2">
                                <OverlayTrigger placement="left" overlay={popover(secondRow ? 'Unlock Q2' : 'Lock Q2')}>
                                    <button onClick={secondClickRow}>
                                        <i
                                            className={
                                                secondRow ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'
                                            }
                                        />
                                    </button>
                                </OverlayTrigger>
                                <button onClick={secondClickRow1}>
                                    <i
                                        className={secondRow1 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={secondClickRow2}>
                                    <i
                                        className={secondRow2 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={secondClickRow3}>
                                    <i
                                        className={secondRow3 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={secondClickRow4}>
                                    <i
                                        className={secondRow4 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={secondClickRow5}>
                                    <i
                                        className={secondRow5 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={secondClickRow6}>
                                    <i
                                        className={secondRow6 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                            </div>
                            <div className="vm-buttons3">
                                <OverlayTrigger placement="left" overlay={popover(thirdRow ? 'Unlock Q3' : 'Lock Q3')}>
                                    <button onClick={thirdClickRow}>
                                        <i
                                            className={
                                                thirdRow ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'
                                            }
                                        />
                                    </button>
                                </OverlayTrigger>
                                <button onClick={thirdClickRow1}>
                                    <i
                                        className={thirdRow1 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={thirdClickRow2}>
                                    <i
                                        className={thirdRow2 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={thirdClickRow3}>
                                    <i
                                        className={thirdRow3 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={thirdClickRow4}>
                                    <i
                                        className={thirdRow4 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={thirdClickRow5}>
                                    <i
                                        className={thirdRow5 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={thirdClickRow6}>
                                    <i
                                        className={thirdRow6 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                            </div>
                            <div className="vm-buttons4">
                                <OverlayTrigger placement="left" overlay={popover(fourthRow ? 'Unlock Q4' : 'Lock Q4')}>
                                    <button onClick={fourthClickRow}>
                                        <i
                                            className={
                                                fourthRow ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'
                                            }
                                        />
                                    </button>
                                </OverlayTrigger>
                                <button onClick={fourthClickRow1}>
                                    <i
                                        className={fourthRow1 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={fourthClickRow2}>
                                    <i
                                        className={fourthRow2 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={fourthClickRow3}>
                                    <i
                                        className={fourthRow3 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={fourthClickRow4}>
                                    <i
                                        className={fourthRow4 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={fourthClickRow5}>
                                    <i
                                        className={fourthRow5 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                                <button onClick={fourthClickRow6}>
                                    <i
                                        className={fourthRow6 ? 'fas fa-lock close-lock' : 'fas fa-lock-open open-lock'}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default Calendar;
