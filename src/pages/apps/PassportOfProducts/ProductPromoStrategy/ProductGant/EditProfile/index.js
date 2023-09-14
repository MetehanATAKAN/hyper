import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import GlobalModal from '../../../../../../components/GlobalNew/Modal';
import ModalPage2 from './Page2/ModalPage2';
import ModalPage3 from './Page3/ModalPage3';
import ModalPage4 from './Page4/ModalPage4';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FetchApiPost } from '../../../../../../utils/http.helper';
const EditProfile = ({ showModal, setShowModal, editProfileData, editPostData }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const userName = localStorage.getItem('userName');
    const [page, setPage] = useState(1);
    const [modalTitle, setModalTitle] = useState('Select Profiles');
    const [profileData, setProfileData] = useState(editProfileData);
    // PAGE 3
    const [page3tableData, setPage3TableData] = useState([]);
    const [weekData, setWeekData] = useState([]);
    // PAGE 4
    const [page4tableData, setPage4TableData] = useState([]);
    const handleNextBtn = () => {
        if (page === 3) {
            const postData = {
                ...editPostData,
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
        setPage(page - 1);
    };
    useEffect(() => {
        switch (page) {
            case 1:
                setModalTitle('Layout of profiles');
                break;
            case 2:
                setModalTitle('Order Profiles');
                break;
            case 3:
                setModalTitle('Select Promo Subject');
                break;
            default:
                setModalTitle('Layout of profiles');
                break;
        }
    }, [page]);

    // PAGE 3
    useEffect(() => {
        const color = ['107, 94, 174', '126, 59, 138', '255, 21, 138', '255, 90, 196'];
        const arr = profileData.map((profile, index) => {
            return {
                id: `${profile.profileId}`,
                name: profile.profileName,
                profiles: profile.orderDetail?.map((detail, i) => {
                    const name = detail.promoSubjectDetail
                        .filter((x) => x.isDisable === false)
                        ?.map((a) => a.typeAbb)
                        .join(',');
                    return {
                        isUsed: detail.isUsed,
                        id: `${profile.profileId}${i}`,
                        orderId: detail.orderId,
                        name: name,
                        color: color[index],
                        detail: detail.promoSubjectDetail.filter((x) => x.isDisable === false),
                    };
                }),
            };
        });
        const filteredData = arr
            .map((item) => ({
                ...item,
                profiles: item.profiles.filter((profile) => profile.name.trim() !== ''),
            }))
            .filter((x) => x.profiles.length !== 0);
        setPage3TableData(filteredData);
    }, [profileData]);
    useEffect(() => {
        const arr = page3tableData.map((profile, i) => {
            const data = profile.profiles.map((x, j) => {
                if (x.orderId !== null) {
                    return {
                        isUsed: x.isUsed,
                        profileId: profile.id,
                        profileName: profile.name,
                        id: x.orderId,
                        name: `order-${x.orderId}`,
                        box: {
                            id: `${profile.id}${j}`,
                            name: x.name,
                            orderId: x.orderId,
                            color: x?.color,
                            detail: x.detail,
                        },
                    };
                }
                return {
                    id: `${j}`,
                    name: `order-${j}`,
                    box: null,
                };
            });
            return data;
        });
        setWeekData(arr.flat().sort((a, b) => a.id - b.id));
    }, [page3tableData]);
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
                const detail = data.box.detail;
                const result = [
                    {
                        no: (count + 1).toString().padStart(2, '0'),
                        profile: data.profileName,
                        profileId: data.profileId,
                        orderId: data.id,
                        type: 'Parent',
                        typeId: 1,
                        promoSubject: detail[0].promoSubjectName,
                        promoSubjectId: detail[0].promoSubjectId,
                        need: detail[0].needName,
                        needId: detail[0].needId,
                        benefit: detail[0].benefitNames,
                        benefitId: detail[0].benefitIds,
                        pageDetail: detail[0].pageDetails,
                    },
                    ...boxNames.map((boxName, index) => ({
                        no: (count + index + 2).toString().padStart(2, '0'),
                        profile: data.profileName,
                        profileId: data.profileId,
                        orderId: data.id,
                        type: 'Child',
                        typeId: 0,
                        promoSubject: detail[index + 1].promoSubjectName,
                        promoSubjectId: detail[index + 1].promoSubjectId,
                        need: detail[index + 1].needName,
                        needId: detail[index + 1].needId,
                        benefit: detail[index + 1].benefitNames,
                        benefitId: detail[index + 1].benefitIds,
                        pageDetail: detail[index + 1].pageDetails,
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
                    {page === 1 && <ModalPage2 setProfileData={setProfileData} profileData={profileData} />}
                    {page === 2 && (
                        <ModalPage3
                            profileData={profileData}
                            weekData={weekData}
                            setWeekData={setWeekData}
                            page3tableData={page3tableData}
                            setPage3TableData={setPage3TableData}
                        />
                    )}
                    {page === 3 && <ModalPage4 page4tableData={page4tableData} setPage4TableData={setPage4TableData} />}
                </>
            }
            footer={
                <>
                    <Button variant="secondary" onClick={handleBackBtn}>
                        {page === 1 ? t('Close') : t('Back')}
                    </Button>
                    <Button onClick={handleNextBtn} variant="primary">
                        {page === 3 ? t('Finish') : t('Next')}
                    </Button>
                </>
            }
        />
    );
};

export default EditProfile;
