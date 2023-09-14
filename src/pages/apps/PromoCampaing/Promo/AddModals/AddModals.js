import React, { useEffect, useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import FailModal from '../../../../../components/FailModal';
import CyclePeriod from './CyclePeriod';
import WorkPlace from './WorkPlace';
import MarketResearch from './MarketResearch';
import '../../../../../assets/scss/custom/campaing/promoCampaing.scss';
import { Step, StepConnector, StepLabel, Stepper, stepConnectorClasses, styled } from '@mui/material';
import Client from './Client';
import Spec from './Spec';
import Category from './Category';
import SettingsIcon from '@mui/icons-material/Settings';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import AddchartIcon from '@mui/icons-material/Addchart';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import Check from '@mui/icons-material/Check';
import { Button } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { statusControl } from '../../../../../components/Function/StatusCheck';
import { useDispatch } from 'react-redux';
import { setCycleData } from '../../../../../redux/promoCampaing/actions';
const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 23,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#00a0df',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#00a0df',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundColor: '#00a0df',
        // boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundColor: '#00a0df',
    }),
}));
function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <SettingsIcon />,
        2: <MapIcon />,
        3: <PersonIcon />,
        4: <AddchartIcon />,
        5: <CategoryIcon />,
        6: <StoreIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {completed ? <Check /> : icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}
const AddModals = ({ showModal, setShowModal, getData }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const steps = [t('Cycle Period'), t('Work Place'), t('Client'), t('Spec'), t('Category'), t('Market Research')];
    const [activeStep, setActiveStep] = useState(0);
    const user = localStorage.getItem('userName');
    const countryId = localStorage.getItem('countryId');
    const companyId = localStorage.getItem('companyId');
    const [checkNewCyclePeriod, setCheckNewCyclePeriod] = useState(false);
    // CYCLE PERİOD
    const [name, setName] = useState('');
    const [selectCompany, setSelectCompany] = useState();
    const [color, setColor] = useState('');
    const [selectBusUnit, setSelectBusUnit] = useState();
    const [selectDate, setSelectDate] = useState([]);
    const [optionsCompany, setOptionsCompany] = useState();
    const [optionsBusUnit, setOptionsBusUnit] = useState();
    const [cycleStatus, setCycleStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
    ]);
    // WORK PLACE
    const [selectCycle, setSelectCycle] = useState([]);
    const [selectType, setSelectType] = useState();
    const [selectType2, setSelectType2] = useState();
    const [selectType3, setSelectType3] = useState();
    const [selectCategoryWork, setSelectCategoryWork] = useState([]);
    const [optionsCycle, setOptionsCycle] = useState([]);
    const [optionsType, setOptionsType] = useState([]);
    const [optionsCategory, setOptionsCategory] = useState([
        { value: 0, label: 'A' },
        { value: 1, label: 'B' },
        { value: 2, label: 'C' },
    ]);
    const [dropdownsWork, setDropdownsWork] = useState([]);
    const [workStatus, setWorkStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
        { id: 4, status: 'default' },
    ]);

    // Client
    const [selectClient, setSelectClient] = useState();
    const [optionsClient, setOptionsClient] = useState([]);
    const [dropdownsClient, setDropdownsClient] = useState([]);
    useEffect(() => {
        const body = {
            headerIds: [0],
            countryId: countryId,
            companyId: companyId,
        };
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForWorkPlace`, 'POST', body).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => setDropdownsWork(data));
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
        FetchApiPost(`services/AdminPanel/Header/GetHeadersForClient`, 'POST', body).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => setDropdownsClient(data));
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [countryId, history, companyId]);
    // SPEC
    const [selectSpec, setSelectSpec] = useState([]);
    const [specStatus, setSpecStatus] = useState('default');
    // Category
    const [selectCategory, setSelectCategory] = useState([]);
    const [categoryStatus, setCategoryStatus] = useState([]);

    // MARKTE RESEARCH
    const [checkResearchMarket, setCheckResearchMarket] = useState(false);

    const saveCyclePeriodBtn = () => {
        const condition = [
            name.trim() === '' ? true : false,
            !selectCompany ? true : false,
            !selectBusUnit ? true : false,
            selectDate.length === 0 ? true : false,
        ];
        statusControl(condition, cycleStatus, setCycleStatus);
        if (condition.some((x) => x === true)) return;
        const saveData = {
            companyId: selectCompany.value,
            companyName: selectCompany.label,
            busId: selectBusUnit.value,
            busName: selectBusUnit.label,
            createdBy: user,
            cycleName: name,
            color: color === '' ? '' : color,
            startDate: selectDate[0],
            endDate: selectDate[1],
        };
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/SaveCyclePeriod',
            'POST',
            saveData
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                const cycle = {
                    companyId: selectCompany.value,
                    companyName: selectCompany.label,
                    busId: selectBusUnit.value,
                    busName: selectBusUnit.label,
                };
                dispatch(setCycleData(cycle));
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
            if (res.status === 400 || res.status === 404 || res.status === 409) {
                res.json().then(({ errors }) => {
                    setErrorModal(true);
                    setError(errors);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };

    const saveAddModalBtn = () => {
        const data = {
            cycleId: selectCycle.map((el) => el.value),
            companyId: selectCompany.value,
            companyName: selectCompany.label,
            busId: selectBusUnit.value,
            busName: selectBusUnit.label,
            placeId: selectType.value,
            placeName: selectType.label,
            placeTypeId: selectType2.value,
            placeTypeName: selectType2.label,
            typeOfPriorityId: selectType3.value,
            typeOfPriorityName: selectType3.label,
            clientTypeId: selectClient && selectClient.value,
            clientTypeName: selectClient && selectClient.label,
            specLists:
                selectSpec.length !== 0
                    ? selectSpec?.map((el) => ({
                          specId: el.value,
                          specName: el.label,
                          category: el.category,
                      }))
                    : [],
            workPlaceCategory: selectCategoryWork?.map((el) => el.label),
            marketReserachStatus: checkResearchMarket,
            createdBy: user,
        };
        FetchApiPost(
            'services/Organization/Organization/BusinessUnitCampaignCalendar/SaveBusinessunitCampaignCalendar',
            'POST',
            data
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                setShowModal(false);
                getData();
            }
            if (res.status === 400 || res.status === 404 || res.status === 409) {
                res.json().then(({ errors }) => {
                    setErrorModal(true);
                    setError(errors);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    const handleNext = () => {
        switch (activeStep) {
            case 0:
                if (checkNewCyclePeriod === false) {
                    const condition = [false, !selectCompany ? true : false, !selectBusUnit ? true : false, false];
                    statusControl(condition, cycleStatus, setCycleStatus);
                    if (condition.some((x) => x === true)) return;
                    const cycle = {
                        companyId: selectCompany.value,
                        companyName: selectCompany.label,
                        busId: selectBusUnit.value,
                        busName: selectBusUnit.label,
                    };
                    dispatch(setCycleData(cycle));
                    return setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
                saveCyclePeriodBtn();
                break;
            case 1:
                const condition = [
                    selectCycle.length === 0 ? true : false,
                    !selectType ? true : false,
                    !selectType2 ? true : false,
                    !selectType3 ? true : false,
                    selectCategoryWork.length === 0 ? true : false,
                ];
                statusControl(condition, workStatus, setWorkStatus);
                if (condition.some((x) => x === true)) return;
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                break;
            case 3:
                if (selectClient) {
                    if (selectSpec.length > 0) {
                        setSpecStatus('default');
                        return setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }
                    return setSpecStatus('error');
                } else {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
                break;
            case 4:
                if (selectClient) {
                    const condition = [];
                    selectSpec?.map((el) => (el.category.length === 0 ? condition.push(false) : condition.push(true)));
                    if (condition.some((x) => x === false)) {
                        setCategoryStatus(condition.map((x, i) => ({ index: i, status: x })));
                        return;
                    }
                    return setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } else {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
                break;
            case 5:
                saveAddModalBtn();
                break;
            case 6:
                setShowModal(false);
                break;
            default:
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                break;
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    return (
        <>
            <GlobalModal
                header={t('New')}
                showModal={showModal}
                setShowModal={setShowModal}
                toggle={() => setShowModal(!showModal)}
                body={
                    <div>
                        <Stepper
                            activeStep={activeStep}
                            alternativeLabel
                            connector={<QontoConnector />}
                            style={{ margin: '5px' }}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>
                                            {label}
                                        </StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === 0 && (
                            <CyclePeriod
                                name={name}
                                setName={setName}
                                selectCompany={selectCompany}
                                setSelectCompany={setSelectCompany}
                                setColor={setColor}
                                selectBusUnit={selectBusUnit}
                                setSelectBusUnit={setSelectBusUnit}
                                setSelectDate={setSelectDate}
                                optionsCompany={optionsCompany}
                                setOptionsCompany={setOptionsCompany}
                                optionsBusUnit={optionsBusUnit}
                                setOptionsBusUnit={setOptionsBusUnit}
                                cycleStatus={cycleStatus}
                                checkNewCyclePeriod={checkNewCyclePeriod}
                                setCheckNewCyclePeriod={setCheckNewCyclePeriod}
                            />
                        )}
                        {activeStep === 1 && (
                            <WorkPlace
                                selectCycle={selectCycle}
                                setSelectCycle={setSelectCycle}
                                selectType={selectType}
                                setSelectType={setSelectType}
                                selectType2={selectType2}
                                setSelectType2={setSelectType2}
                                selectType3={selectType3}
                                setSelectType3={setSelectType3}
                                selectCategory={selectCategoryWork}
                                setSelectCategory={setSelectCategoryWork}
                                optionsCycle={optionsCycle}
                                setOptionsCycle={setOptionsCycle}
                                optionsType={optionsType}
                                setOptionsType={setOptionsType}
                                optionsCategory={optionsCategory}
                                setOptionsCategory={setOptionsCategory}
                                dropdowns={dropdownsWork}
                                workStatus={workStatus}
                            />
                        )}
                        {activeStep === 2 && (
                            <Client
                                dropdownsClient={dropdownsClient}
                                selectClient={selectClient}
                                setSelectClient={setSelectClient}
                                optionsClient={optionsClient}
                                setOptionsClient={setOptionsClient}
                            />
                        )}
                        {activeStep === 3 && (
                            <Spec
                                selectSpec={selectSpec}
                                setSelectSpec={setSelectSpec}
                                selectedBusUnit={selectBusUnit}
                                selectedDate={selectDate[0]}
                                selectedClient={selectClient}
                                status={specStatus}
                            />
                        )}
                        {activeStep === 4 && (
                            <Category
                                selectSpec={selectSpec}
                                setSelectSpec={setSelectSpec}
                                selectCategory={selectCategory}
                                setSelectCategory={setSelectCategory}
                                selectedClient={selectClient}
                                status={categoryStatus}
                            />
                        )}
                        {activeStep === 5 && <MarketResearch setCheckResearchMarket={setCheckResearchMarket} />}
                    </div>
                }
                footer={
                    <>
                        {activeStep === steps.length ? (
                            <Button onClick={() => setShowModal(false)}>{t('Close')}</Button>
                        ) : (
                            <>
                                {activeStep === 0 || activeStep === 1 ? null : (
                                    <Button color="inherit" onClick={handleBack}>
                                        {t('Back')}
                                    </Button>
                                )}
                                {activeStep === 1 && checkNewCyclePeriod === false ? (
                                    <Button color="inherit" onClick={handleBack}>
                                        {t('Back')}
                                    </Button>
                                ) : null}
                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? t('Finish') : t('Next')}
                                </Button>
                            </>
                        )}
                    </>
                }
            />
            {errorModal && <FailModal modalShow={errorModal} setModalShow={setErrorModal} error={error} />}
        </>
    );
};

export default React.memo(AddModals);
