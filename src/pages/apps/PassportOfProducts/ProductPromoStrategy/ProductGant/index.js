import React, { useEffect, useState } from 'react';
import TableGant from '../../../../../components/Tables/TableGant';
import { columns } from './TableColumns';
import { IconButton, TextField, Tooltip } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Filter from './Filter';
import AddModal from './AddModal';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import EditProfile from './EditProfile';
const createDateObject = (data) => {
    return {
        place: data.place,
        placeType: data.placeType,
        spec: data.spec,
        category: data.category,
        pn: data.pn,
        needQuantity: data.needQuantity,
        visitQuantity: data.visitQuantity,
        productLoyalty: data.productLoyalty,
        1: data.janWeek1,
        2: data.janWeek2,
        3: data.janWeek3,
        4: data.janWeek4,
        5: data.janWeek5,
        6: data.febWeek1,
        7: data.febWeek3,
        8: data.febWeek2,
        9: data.febWeek4,
        10: data.marWeek1,
        11: data.marWeek3,
        12: data.marWeek2,
        13: data.marWeek4,
        14: data.marWeek5,
        15: data.aprWeek1,
        16: data.aprWeek3,
        17: data.aprWeek2,
        18: data.aprWeek4,
        19: data.aprWeek5,
        20: data.mayWeek1,
        21: data.mayWeek3,
        22: data.mayWeek2,
        23: data.mayWeek4,
        24: data.mayWeek5,
        25: data.junWeek1,
        26: data.junWeek3,
        27: data.junWeek2,
        28: data.junWeek4,
        29: data.junWeek5,
        30: data.julWeek1,
        31: data.julWeek3,
        32: data.julWeek2,
        33: data.julWeek4,
        34: data.julWeek5,
        35: data.augWeek1,
        36: data.augWeek3,
        37: data.augWeek2,
        38: data.augWeek4,
        39: data.augWeek5,
        40: data.sepWeek1,
        41: data.sepWeek3,
        42: data.sepWeek2,
        43: data.sepWeek4,
        44: data.sepWeek5,
        45: data.octWeek1,
        46: data.octWeek3,
        47: data.octWeek2,
        48: data.octWeek4,
    };
};
const ProductGant = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const empId = localStorage.getItem('userEmpId');
    const [data, setData] = useState([]);
    const exceptThisSymbols = ['e', 'E', '+', '-', '.', ',', '*', '/', ' '];
    const [tableType, setTableType] = useState('all');
    // const [tableDataByAll, setTableDataByAll] = useState([]);
    // const [tableDataByProfile, setTableDataByProfile] = useState([]);
    // const [tableDataByNeed, setTableDataByNeed] = useState([]);
    // const [tableDataByPromo, setTableDataByPromo] = useState([]);
    const [isAccordion, setIsAccordion] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [editProfileData, setEditProfileData] = useState(null);
    const [editPostData, setEditPostData] = useState([]);
    // FILTER STATES
    const [selectYear, setSelectYear] = useState();
    const [selectCompany, setSelectCompany] = useState();
    const [selectBusUnit, setSelectBusUnit] = useState();
    const [selectSpec, setSelectSpec] = useState([]);
    const [selectCategory, setSelectCategory] = useState([
        { value: 1, label: 'A' },
        { value: 2, label: 'B' },
        { value: 3, label: 'C' },
    ]);
    const [selectGlobalBrand, setSelectGlobalBrand] = useState([]);
    const [selectWorkPlace, setSelectWorkPlace] = useState();
    const [selectClient, setSelectClient] = useState();
    const [selectPlace, setSelectPlace] = useState([]);
    const [selectPlaceType, setSelectPlaceType] = useState([]);
    const [selectTypeOfPriority, setSelectTypeOfPriority] = useState([]);
    const [selectClientType, setSelectClientType] = useState();

    // const handleProfileOnChange = (e, dataId, profileId) => {
    //     if (tableType === 'all') {
    //         const newData = tableDataByAll.map((el, i) => {
    //             if (Number(el.id) === Number(dataId)) {
    //                 const newSubRows = el.subRows.map((item, ix) => {
    //                     if (item.profileId === profileId) {
    //                         return { ...item, indicationNum: Number(e.target.value) };
    //                     }
    //                     return item;
    //                 });
    //                 return {
    //                     ...el,
    //                     subRows: newSubRows.sort((r1, r2) =>
    //                         r1.indicationNum > r2.indicationNum ? 1 : r1.indicationNum < r2.indicationNum ? -1 : 0
    //                     ),
    //                 };
    //             }
    //             return el;
    //         });
    //         setTableDataByAll(newData);
    //     }
    //     if (tableType === 'profile') {
    //         const newData = tableDataByProfile.map((el, i) => {
    //             if (Number(el.profileId) === Number(profileId)) {
    //                 return { ...el, indicationNum: Number(e.target.value) };
    //             }
    //             return el;
    //         });
    //         setTableDataByProfile(
    //             newData.sort((r1, r2) =>
    //                 r1.indicationNum > r2.indicationNum ? 1 : r1.indicationNum < r2.indicationNum ? -1 : 0
    //             )
    //         );
    //     }
    // };

    // const handleNeedOnChange = (e, dataId, needId) => {
    //     if (tableType === 'all') {
    //         const dataById = tableDataByAll.find((x) => Number(x.id) === Number(dataId));
    //         const newData = dataById.subRows.map((el, i) => {
    //             if (Number(dataById.id) === Number(dataId)) {
    //                 const newSubRows = el.subRows.map((item, ix) => {
    //                     if (item.needId === needId) {
    //                         return { ...item, indicationNum: Number(e.target.value) };
    //                     }
    //                     return item;
    //                 });
    //                 return {
    //                     ...el,
    //                     subRows: newSubRows.sort((r1, r2) =>
    //                         r1.indicationNum > r2.indicationNum ? 1 : r1.indicationNum < r2.indicationNum ? -1 : 0
    //                     ),
    //                 };
    //             }
    //             return el;
    //         });
    //         const newArr = { ...dataById, subRows: newData };
    //         setTableDataByAll(
    //             tableDataByAll.map((x) => {
    //                 if (Number(x.id) === Number(dataId)) {
    //                     return newArr;
    //                 }
    //                 return x;
    //             })
    //         );
    //     }
    //     if (tableType === 'need') {
    //         const newData = tableDataByNeed.map((el, i) => {
    //             if (Number(el.needId) === Number(needId)) {
    //                 return { ...el, indicationNum: Number(e.target.value) };
    //             }
    //             return el;
    //         });
    //         setTableDataByNeed(
    //             newData.sort((r1, r2) =>
    //                 r1.indicationNum > r2.indicationNum ? 1 : r1.indicationNum < r2.indicationNum ? -1 : 0
    //             )
    //         );
    //     }
    // };

    // const handlePromoOnChange = (e, indicationId, profileId, needId, promoId) => {
    //     if (tableType === 'all') {
    //         const dataById = tableDataByAll.find((x) => Number(x.id) === Number(indicationId));
    //         const newData = dataById.subRows.map((profile, i) => {
    //             if (profile.profileId === profileId) {
    //                 const newProfile = profile.subRows?.map((need) => {
    //                     if (need.needId === needId) {
    //                         const newNeed = need.subRows?.map((promo) => {
    //                             if (promo.promoId === promoId) {
    //                                 const newPromo = { ...promo, indicationNum: Number(e.target.value) };
    //                                 return newPromo;
    //                             }
    //                             return promo;
    //                         });
    //                         return {
    //                             ...need,
    //                             subRows: newNeed.sort((r1, r2) =>
    //                                 r1.indicationNum > r2.indicationNum
    //                                     ? 1
    //                                     : r1.indicationNum < r2.indicationNum
    //                                     ? -1
    //                                     : 0
    //                             ),
    //                         };
    //                     }
    //                     return need;
    //                 });
    //                 return {
    //                     ...profile,
    //                     subRows: newProfile,
    //                 };
    //             }
    //             return profile;
    //         });
    //         const newArr = { ...dataById, subRows: newData };
    //         setTableDataByAll(
    //             tableDataByAll.map((x) => {
    //                 if (x.id === indicationId) {
    //                     return newArr;
    //                 }
    //                 return x;
    //             })
    //         );
    //     }
    //     if (tableType === 'p.subject') {
    //         const newData = tableDataByPromo.map((el, i) => {
    //             if (Number(el.promoId) === Number(promoId)) {
    //                 return { ...el, indicationNum: Number(e.target.value) };
    //             }
    //             return el;
    //         });
    //         setTableDataByPromo(
    //             newData.sort((r1, r2) =>
    //                 r1.indicationNum > r2.indicationNum ? 1 : r1.indicationNum < r2.indicationNum ? -1 : 0
    //             )
    //         );
    //     }
    // };

    const handleDeleteNeedBtn = () => {
        console.log('delete');
    };

    useEffect(() => {
        switch (tableType) {
            case 'all':
                setIsAccordion(true);
                break;
            case 'profile':
                setIsAccordion(false);
                break;
            case 'need':
                setIsAccordion(false);
                break;
            case 'p.subject':
                setIsAccordion(false);
                break;
            default:
                setIsAccordion(true);
                break;
        }
    }, [tableType]);
    const handleEditProfile = (datas) => {
        setEditPostData({
            yearId: datas.yearId,
            profileId: datas.profileId,
            companyId: datas.companyId,
            businessUnitId: datas.businessUnitId,
            placeId: datas.placeIds[0],
            placeTypeId: datas.placeTypeIds[0],
            TypeOfPriorityId: datas.typeOfPriortiyIds[0],
            clientTypeId: datas.clientTypeId,
            specId: datas.specIds[0],
            brandId: datas.brandIds[0],
        });
        FetchApiPost('services/Pages/PromoStrategy/GetPromoStrategyDataEdit', 'POST', datas)
            .then((res) => {
                if (res.status === 200 || 201) {
                    res.json().then(({ data }) => {
                        setEditProfileData(data);
                        setShowEditProfileModal(true);
                    });
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            })
            .catch((err) => console.log(err));
    };
    const tableDataAll = data?.map((firstLevel, i) => {
        return {
            place: firstLevel.placeName,
            placeType: firstLevel.placeTypeName,
            spec: firstLevel.specName,
            subRows: firstLevel.getPromoStrategyBrandResponses?.map((brand) => ({
                brand: brand.brandName,
                subRows: brand.getPromoStrategyProfileResponses?.map((profile) => ({
                    profile: profile.profileName,
                    profileId: profile.profileId,
                    indication: profile.indicationName,
                    indicationId: profile.indicationId,
                    action: (
                        <Tooltip title={t('edit profile')} arrow>
                            <IconButton
                                onClick={() => {
                                    handleEditProfile({
                                        yearId: firstLevel.yearId,
                                        profileId: profile.profileId,
                                        companyId: firstLevel.companyId,
                                        businessUnitId: firstLevel.businessUnitId,
                                        placeIds: [firstLevel.placeId],
                                        placeTypeIds: [firstLevel.placeTypeId],
                                        typeOfPriortiyIds: [firstLevel.typeOfPriorityId],
                                        clientTypeId: firstLevel.clientTypeId,
                                        specIds: [firstLevel.specId],
                                        brandIds: [brand.brandId],
                                    });
                                }}
                                size="small">
                                <EditIcon sx={{ width: 18, height: 18 }} />
                            </IconButton>
                        </Tooltip>
                    ),
                    subRows: profile.getPromoStrategyNeedFilterResponses?.map((need) => ({
                        indication: need.needName,
                        subRows: need.getPromoStrategyPromoSubjectFilterResponses?.map((promo) => ({
                            pSubject: `${promo.promoSubjectName} (${promo.promoSubjectType})`,
                            pSubjectId: promo.promoSubjectId,
                        })),
                    })),
                })),
            })),
        };
    });
    // const tableDataProfile = tableDataByProfile
    //     ?.sort((a, b) => {
    //         return a.indicationNum - b.indicationNum;
    //     })
    //     ?.map((profile, i) => {
    //         const prof = createDateObject(profile);
    //         return {
    //             indication: (
    //                 <div className="d-flex justify-content-between align-items-center">
    //                     {profile.indication}
    //                     <TextField
    //                         size="small"
    //                         sx={{
    //                             width: 30,
    //                             padding: 0,
    //                         }}
    //                         id="standard-basic"
    //                         variant="standard"
    //                         value={profile.indicationNum}
    //                         type={'number'}
    //                         onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
    //                         onChange={(e) => handleProfileOnChange(e, 1, profile.profileId)} //indication Id => 1
    //                     />
    //                 </div>
    //             ),
    //             ...prof,
    //         };
    //     });

    // const tableDataNeed = tableDataByNeed
    //     ?.sort((a, b) => {
    //         return a.indicationNum - b.indicationNum;
    //     })
    //     ?.map((need, i) => {
    //         const ned = createDateObject(need);
    //         return {
    //             indication: (
    //                 <div className="d-flex justify-content-between align-items-center">
    //                     {need.indication}
    //                     <div>
    //                         <IconButton
    //                             onClick={handleDeleteNeedBtn}
    //                             sx={{ color: '#FA5C7E' }}
    //                             aria-label="delete"
    //                             size="small">
    //                             <DeleteOutlinedIcon fontSize="small" />
    //                         </IconButton>
    //                         {/* <TextField
    //                             size="small"
    //                             sx={{
    //                                 width: 30,
    //                                 padding: 0,
    //                             }}
    //                             value={need.indicationNum}
    //                             id="standard-basic"
    //                             variant="standard"
    //                             onChange={(e) => handleNeedOnChange(e, 1, need.needId)} //indication Id => 1
    //                         /> */}
    //                     </div>
    //                 </div>
    //             ),
    //             ...ned,
    //         };
    //     });

    // const tableDataPromo = tableDataByPromo
    //     .sort((a, b) => {
    //         return a.indicationNum - b.indicationNum;
    //     })
    //     ?.map((promo, index) => {
    //         const pro = createDateObject(promo);
    //         return {
    //             indication: (
    //                 <div className="d-flex justify-content-between align-items-center">
    //                     {promo.indication} {index === 0 ? '(P.)' : '(C.)'}
    //                     <div>
    //                         <IconButton
    //                             onClick={handleDeleteNeedBtn}
    //                             sx={{ color: '#FA5C7E' }}
    //                             aria-label="delete"
    //                             size="small">
    //                             <DeleteOutlinedIcon fontSize="small" />
    //                         </IconButton>
    //                         {/* <TextField
    //                             size="small"
    //                             sx={{
    //                                 width: 30,
    //                                 padding: 0,
    //                             }}
    //                             value={promo.indicationNum}
    //                             id="standard-basic"
    //                             variant="standard"
    //                             onChange={(e) =>
    //                                 handlePromoOnChange(
    //                                     e,
    //                                     1, // Indication Id
    //                                     3, // Profile ıd
    //                                     4, // need ıd
    //                                     Number(promo.promoId)
    //                                 )
    //                             }
    //                         /> */}
    //                     </div>
    //                 </div>
    //             ),
    //             ...pro,
    //         };
    //     });
    const [filterShow, setFilterShow] = useState(true);
    const handlApplyBtn = () => {
        setIsLoading(true);
        const data = {
            yearId: selectYear.value,
            empId: Number(empId),
            companyId: selectCompany.value,
            businessUnitId: selectBusUnit.value,
            placeIds: selectPlace?.map((x) => x.value),
            placeTypeIds: selectPlaceType?.map((x) => x.value),
            typeOfPriortiyIds: selectTypeOfPriority?.map((x) => x.value),
            clientTypeId: selectClientType ? selectClientType.value : 0,
            specIds: selectSpec.length <= 0 ? [] : selectSpec?.map((data) => data.value),
            clientId: selectClient ? selectClient.value : 0,
            workPlaceId: selectWorkPlace ? selectWorkPlace.value : 0,
            brandIds: selectGlobalBrand?.map((x) => x.value),
            categories: selectCategory.map((x) => x.label),
            viewStatus: 1,
        };
        FetchApiPost('services/Pages/PromoStrategy/GetPromoStrategy', 'POST', data)
            .then((res) => {
                if (res.status === 200 || 201) {
                    res.json().then(({ data }) => {
                        setData(data);
                        setIsLoading(false);
                    });
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <TableGant
                data={
                    // tableType === 'all'
                    //     ? tableDataAll
                    //     : tableType === 'profile'
                    //     ? tableDataProfile
                    //     : tableType === 'need'
                    //     ? tableDataNeed
                    //     : tableType === 'p.subject'
                    //     ? tableDataPromo
                    //     : []
                    tableDataAll
                }
                columnPinning={{ left: [], right: ['action'] }}
                handlApplyBtn={handlApplyBtn}
                isAccordion={isAccordion}
                columns={columns}
                filterShow={filterShow}
                setFilterShow={setFilterShow}
                isLoading={isLoading}
                handleNewButton={() => setShowAddModal(true)}
                filter={
                    <Filter
                        setTableType={setTableType}
                        selectYear={selectYear}
                        setSelectYear={setSelectYear}
                        selectCompany={selectCompany}
                        setSelectCompany={setSelectCompany}
                        selectBusUnit={selectBusUnit}
                        setSelectBusUnit={setSelectBusUnit}
                        selectSpec={selectSpec}
                        setSelectSpec={setSelectSpec}
                        selectCategory={selectCategory}
                        setSelectCategory={setSelectCategory}
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
                        setIsLoading={setIsLoading}
                    />
                }
            />
            {showAddModal && <AddModal showModal={showAddModal} setShowModal={setShowAddModal} />}
            {showEditProfileModal && (
                <EditProfile
                    showModal={showEditProfileModal}
                    setShowModal={setShowEditProfileModal}
                    editProfileData={editProfileData}
                    editPostData={editPostData}
                />
            )}
        </>
    );
};

export default ProductGant;
