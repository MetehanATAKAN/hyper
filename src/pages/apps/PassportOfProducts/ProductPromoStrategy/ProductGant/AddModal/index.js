import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import GlobalModal from '../../../../../../components/GlobalNew/Modal';
import ModalPage1 from './Page1/ModalPage1';
import ModalPage2 from './Page2/ModalPage2';
import ModalPage3 from './Page3/ModalPage3';
import ModalPage4 from './Page4/ModalPage4';
import { FetchApiPost } from '../../../../../../utils/http.helper';
import QuestionModal from '../QuestionModal';
const AddModal = ({ showModal, setShowModal }) => {
    const { t } = useTranslation();
    const userName = localStorage.getItem('userName');
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [page, setPage] = useState(1);
    const [modalTitle, setModalTitle] = useState('Select Profiles');
    const [data, setData] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [weekData, setWeekData] = useState([]);

    // PAGE 1 FILTER STATES
    const [selectYear, setSelectYear] = useState();
    const [selectCompany, setSelectCompany] = useState();
    const [selectBusUnit, setSelectBusUnit] = useState();
    const [selectSpec, setSelectSpec] = useState();
    const [selectGlobalBrand, setSelectGlobalBrand] = useState();
    const [selectWorkPlace, setSelectWorkPlace] = useState();
    const [selectClient, setSelectClient] = useState();
    const [selectPlace, setSelectPlace] = useState();
    const [selectPlaceType, setSelectPlaceType] = useState();
    const [selectTypeOfPriority, setSelectTypeOfPriority] = useState();
    const [selectClientType, setSelectClientType] = useState();

    // PAGE 3
    const [page3tableData, setPage3TableData] = useState([]);

    // PAGE 4
    const [page4tableData, setPage4TableData] = useState([]);

    const handleNextBtn = () => {
        if (page === 4) {
            const postData = {
                yearId: selectYear.value,
                companyId: selectCompany.value,
                businessUnitId: selectBusUnit.value,
                placeId: selectPlace.value,
                placeTypeId: selectPlaceType.value,
                typeOfPriorityId: selectTypeOfPriority.value,
                clientTypeId: selectClientType.value,
                specId: selectSpec.value,
                brandId: selectGlobalBrand.value,
                createdBy: userName,
                detail: page4tableData
                    .filter((x) => x.promoSubjectId !== null)
                    .map((x) => ({
                        profileId: Number(x.profileId),
                        orderId: Number(x.orderId),
                        typeId: x.typeId,
                        promoSubjectId: x.promoSubjectId,
                        promoSubjectOrderId: Number(x.no),
                    })),
            };
            FetchApiPost('services/Pages/PromoStrategy/CreatePromoStrategy', 'POST', postData).then((res) => {
                if (res.status === 201 || res.status === 200) {
                    setShowModal(false);
                }
            });
            return;
        }
        setPage(page + 1);
    };
    const handleBackBtn = () => {
        if (page === 1) return setShowModal(false);
        if (page === 3) {
            if (weekData.some((x) => x.box !== null)) {
                return setShowQuestionModal(true);
            }
        }
        setPage(page - 1);
    };
    useEffect(() => {
        switch (page) {
            case 1:
                setModalTitle('Select Profiles');
                break;
            case 2:
                setModalTitle('Layout of profiles');
                break;
            case 3:
                setModalTitle('Order Profiles');
                break;
            case 4:
                setModalTitle('Select Promo Subject');
                break;
            default:
                setModalTitle('Select Profiles');
                break;
        }
    }, [page]);

    // PAGE 3
    const [parentCount, setParentCount] = useState(0);
    useEffect(() => {
        let count = 0;
        const arr = profileData
            .map((x) =>
                x.profileDetails.map((y) => {
                    return {
                        id: `${y.profileId}`,
                        name: y.profileName,
                        profiles: Object.entries(y.selectChain).map(([key, value], i) => {
                            if (value.length !== 0) {
                                count++;
                            }
                            return {
                                id: `${y.profileId}${i}`,
                                name: [value].join('+'),
                            };
                        }),
                    };
                })
            )
            .flat();
        const filteredData = arr
            .filter((x) => x.profiles.length !== 0)
            .map((item) => ({
                ...item,
                profiles: item.profiles.filter((profile) => profile.name.trim() !== ''),
            }));
        setPage3TableData(filteredData);
        const weeks = Array.from({ length: count }).map((x, i) => ({
            id: `${i + 1}`,
            name: `order-${i + 1}`,
            box: null,
        }));
        setWeekData(weeks);
        // setParentCount(count);
    }, [profileData]);

    // useEffect(() => {
    //     const weeks = Array.from({ length: parentCount }).map((x, i) => ({
    //         id: `${i + 1}`,
    //         name: `order-${i + 1}`,
    //         box: null,
    //     }));
    //     setWeekData(weeks);
    // }, [parentCount]);
    // PAGE 4
    useEffect(() => {
        const filteredWeek = weekData.filter((x) => x.box !== null);
        let count = 0; // Başlangıç değeri
        const istenen_data = filteredWeek
            .sort((a, b) => parseInt(a.id) - parseInt(b.id))
            .flatMap((data) => {
                const boxNames = data.box.name.split(',');
                const parentIndex = boxNames.indexOf('p');
                const parent = boxNames.splice(parentIndex, 1);
                const result = [
                    {
                        no: (count + 1).toString().padStart(2, '0'),
                        profile: data.profileName,
                        profileId: data.profileId,
                        orderId: data.id,
                        type: 'Parent',
                        typeId: 1,
                        promoSubject: null,
                        promoSubjectId: null,
                        need: '-',
                        needId: null,
                        benefit: '-',
                        benefitId: null,
                        pageDetail: [],
                    },
                    ...boxNames.map((boxName, index) => ({
                        no: (count + index + 2).toString().padStart(2, '0'),
                        profile: data.profileName,
                        profileId: data.profileId,
                        orderId: data.id,
                        type: 'Child',
                        typeId: 0,
                        promoSubject: null,
                        promoSubjectId: null,
                        need: '-',
                        needId: null,
                        benefit: '-',
                        benefitId: null,
                        pageDetail: [],
                    })),
                ];
                count += boxNames.length + 1; // Count değerini güncelle
                return result;
            });

        setPage4TableData(istenen_data);
    }, [weekData]);
    return (
        <GlobalModal
            size="xl"
            header={t(modalTitle)}
            showModal={showModal}
            setShowModal={setShowModal}
            toggle={() => setShowModal(!showModal)}
            body={
                <>
                    {page === 1 && (
                        <ModalPage1
                            data={data}
                            setData={setData}
                            rowSelection={rowSelection}
                            setRowSelection={setRowSelection}
                            setProfileData={setProfileData}
                            selectYear={selectYear}
                            setSelectYear={setSelectYear}
                            selectCompany={selectCompany}
                            setSelectCompany={setSelectCompany}
                            selectBusUnit={selectBusUnit}
                            setSelectBusUnit={setSelectBusUnit}
                            selectSpec={selectSpec}
                            setSelectSpec={setSelectSpec}
                            selectGlobalBrand={selectGlobalBrand}
                            setSelectGlobalBrand={setSelectGlobalBrand}
                            selectWorkPlace={selectWorkPlace}
                            setSelectWorkPlace={setSelectWorkPlace}
                            selectClient={selectClient}
                            setSelectClient={setSelectClient}
                            selectPlace={selectPlace}
                            setSelectPlace={setSelectPlace}
                            selectPlaceType={selectPlaceType}
                            setSelectPlaceType={setSelectPlaceType}
                            selectTypeOfPriority={selectTypeOfPriority}
                            setSelectTypeOfPriority={setSelectTypeOfPriority}
                            selectClientType={selectClientType}
                            setSelectClientType={setSelectClientType}
                        />
                    )}
                    {page === 2 && <ModalPage2 setProfileData={setProfileData} profileData={profileData} />}
                    {page === 3 && (
                        <ModalPage3
                            profileData={profileData}
                            weekData={weekData}
                            setWeekData={setWeekData}
                            page3tableData={page3tableData}
                            setPage3TableData={setPage3TableData}
                        />
                    )}
                    {page === 4 && <ModalPage4 page4tableData={page4tableData} setPage4TableData={setPage4TableData} />}
                    {showQuestionModal && (
                        <QuestionModal
                            modalShow={showQuestionModal}
                            setModalShow={setShowQuestionModal}
                            setPage={setPage}
                        />
                    )}
                </>
            }
            footer={
                <>
                    <Button variant="secondary" onClick={handleBackBtn}>
                        {page === 1 ? t('Close') : t('Back')}
                    </Button>
                    <Button disabled={data.length === 0} onClick={handleNextBtn} variant="primary">
                        {page === 4 ? t('Finish') : t('Next')}
                    </Button>
                </>
            }
        />
    );
};

export default AddModal;
