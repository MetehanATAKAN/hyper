import React, { useEffect } from 'react';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import MainTable from '../../../../../components/MainTable';
import '../../../../../assets/scss/custom/components/pageList.scss';
import SendIcon from '../../../../../components/Icons/SendIcon';
import CircleEdit from '../../../../../components/Icons/CircleEdit';
import Reject from './Reject';
import Delete from './Delete';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import NewButton from './NewButton';
import { useDispatch, useSelector } from 'react-redux';
import { benefitTab, pageListPlus } from '../../../../../redux/actions';
import Filter from './Filter';
import Update from './Update';
import Icon from '@mdi/react';
import { mdiEyeOutline, mdiSendCheck } from '@mdi/js';
import ActionModal from './ActionModal';

const PageListIndex = ({ setSelectedTab }) => {
    const { t } = useTranslation();
    const contentId = useSelector((state) => state.Brochure.contentId);

    const benefitTabData = useSelector( state => state.Need.benefitPageButtonDatas);

    console.log(benefitTabData);
    const [columns] = useState([
        { name: 'benefitName', title: t('Benefit Name') },
        { name: 'needId', title: t('Need ID') },
        { name: 'page', title: t('Page') },
        { name: 'country', title: t('Country') },
        { name: 'product', title: t('Product') },
        { name: 'specialization', title: t('Specialization') },
        { name: 'creator', title: t('Creator') },
        { name: 'createDate', title: t('Create Date') },
        { name: 'status', title: t('Status') },
        { name: 'action', title: '-' },
    ]);
    const [columnWidths, setColumnWidths] = useState([
        { columnName: 'benefitName', width: '20%' },
        { columnName: 'needId', width: '14%' },
        { columnName: 'page', width: '7%' },
        { columnName: 'country', width: '10%' },
        { columnName: 'product', width: '10%' },
        { columnName: 'specialization', width: '10%' },
        { columnName: 'creator', width: '10%' },
        { columnName: 'createDate', width: '9%' },
        { columnName: 'status', width: '10%' },
        { columnName: 'action', width: '25px' },
    ]);
    const [tableColumnExtensions] = useState([
        { columnName: 'benefitName', width: 200 },
        { columnName: 'needId', width: 150 },
        { columnName: 'page', width: 150 },
        { columnName: 'country', width: 150 },
        { columnName: 'product', width: 150 },
        { columnName: 'specialization', width: 150 },
        { columnName: 'creator', width: 150 },
        { columnName: 'createDate', width: 150 },
        { columnName: 'status', width: 150 },
        { columnName: 'action', width: 50 },
    ]);
    const itemsFromBackend = [
        { id: '1', isFreeze: false, content: 'Benefit Name', columnName: 'benefitName', width: 200 },
        { id: '2', isFreeze: false, content: 'Need ID', columnName: 'needId', width: 150 },
        { id: '3', isFreeze: false, content: 'Page', columnName: 'page', width: 150 },
        { id: '4', isFreeze: false, content: 'Country', columnName: 'country', width: 150 },
        { id: '5', isFreeze: false, content: 'Product', columnName: 'product', width: 150 },
        { id: '6', isFreeze: false, content: 'Specialization', columnName: 'specialization', width: 150 },
        { id: '7', isFreeze: false, content: 'Creator', columnName: 'creator', width: 150 },
        { id: '8', isFreeze: false, content: 'Create Date', columnName: 'createDate', width: 150 },
        { id: '9', isFreeze: false, content: 'Status', columnName: 'status', width: 150 },
    ];
    const [groupByItems, setGroupByItems] = useState([
        { id: '0', isShow: true, columnName: 'benefitName', content: t('Benefit Name') },
        { id: '1', isShow: true, columnName: 'needId', content: t('Need ID') },
        { id: '2', isShow: true, columnName: 'page', content: t('Page') },
        { id: '3', isShow: true, columnName: 'country', content: t('Country') },
        { id: '4', isShow: true, columnName: 'product', content: t('Product') },
        { id: '5', isShow: true, columnName: 'specialization', content: t('Specialization') },
        { id: '6', isShow: true, columnName: 'creator', content: t('Creator') },
        { id: '7', isShow: true, columnName: 'createDate', content: t('Create Date') },
        { id: '8', isShow: true, columnName: 'status', content: t('Status') },
    ]);
    const [showorHideColumnsItems, setShoworHideColumnsItems] = useState([
        { isShow: true, name: 'benefitName', title: t('Benefit Name') },
        { isShow: true, name: 'needId', title: t('Need ID') },
        { isShow: true, name: 'page', title: t('Page') },
        { isShow: true, name: 'country', title: t('Country') },
        { isShow: true, name: 'product', title: t('Product') },
        { isShow: true, name: 'specialization', title: t('Specialization') },
        { isShow: true, name: 'creator', title: t('Creator') },
        { isShow: true, name: 'createDate', title: t('Create Date') },
        { isShow: true, name: 'status', title: t('Status') },
    ]);

    const [totalSummaryItems, setTotalSummaryItems] = useState([
        { type: 'count', columnName: 'benefitName', width: 200 },
        { type: 'count', columnName: 'needId', width: 150 },
        { type: 'count', columnName: 'page', width: 150 },
        { type: 'count', columnName: 'country', width: 150 },
        { type: 'count', columnName: 'product', width: 150 },
        { type: 'count', columnName: 'specialization', width: 150 },
        { type: 'count', columnName: 'creator', width: 150 },
        { type: 'count', columnName: 'createDate', width: 150 },
        { type: 'count', columnName: 'status', width: 150 },
        { type: 'count', columnName: 'action', width: 50 },
    ]);

    const [groupSummaryItems, setGroupSummaryItems] = useState([
        { type: 'count', columnName: 'benefitName', width: 200 },
        { type: 'count', columnName: 'needId', width: 150 },
        { type: 'count', columnName: 'page', width: 100 },
        { type: 'count', columnName: 'country', width: 150 },
        { type: 'count', columnName: 'product', width: 150 },
        { type: 'count', columnName: 'specialization', width: 150 },
        { type: 'count', columnName: 'creator', width: 150 },
        { type: 'count', columnName: 'createDate', width: 150 },
        { type: 'count', columnName: 'status', width: 150 },
        { type: 'count', columnName: 'action', width: 50 },
    ]);
    const [columnOrders, setColumnOrders] = useState([
        'benefitName',
        'needId',
        'page',
        'country',
        'product',
        'specialization',
        'creator',
        'createDate',
        'status',
        'action',
    ]);
    const history = useHistory();
    const dispatch = useDispatch();
    const createdBy = localStorage.getItem('userName');
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectCountries, setSelectCountries] = useState([]);
    const [selectProduct, setSelectProduct] = useState([]);
    const [selectIndication, setSelectIndication] = useState([]);
    const [selectProfile, setSelectProfile] = useState([]);
    const [selectSpecialization, setSelectSpecialization] = useState([]);
    const [selectCreator, setSelectCreator] = useState([]);

    const [optionsCountries, setOptionsCountries] = useState([]);
    const [optionsProduct, setOptionsProduct] = useState([]);
    const [optionsIndication, setOptionsIndication] = useState([]);
    const [optionsProfile, setOptionsProfile] = useState([]);
    const [optionsSpecialization, setOptionsSpecialization] = useState([]);
    const [optionsCreator, setOptionsCreator] = useState([]);

    const [startDate, setStartDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
    const [brochuries, setBrochuries] = useState([]);
    const [needId, setNeedId] = useState(0);

    const [rejectData, setRejectData] = useState(null);
    const [updateBenefitData, setUpdateBenefitData] = useState(null);


    const [isShowArchive, setIsShowArchive] = useState(false);
    const [archiveData, setArchiveData] = useState(null);

    const [showActionModal, setShowActionModal] = useState(false);
    const [actionModalData, setActionModalData] = useState(null);

    const [showActionModalPageList, setShowActionModalPageList] = useState(false);
    const [showActionModalPageListData, setShowActionModalPageListDara] = useState(null);

    // Need
    const [need, setNeed] = useState([]);
    const [selectNeed, setSelectNeed] = useState([]);

    //Status
    const [status, setStatus] = useState([]);
    const [selectStatus, setSelectStatus] = useState([]);

    const optionsStatus = [
        { id: 1, title: 'Editable' },
        { id: 2, title: 'Approval' },
        { id: 3, title: 'Approved' },
    ];
    // const [selectStatus, setSelectStatus] = useState(
    //     optionsStatus.map((el) => ({ id: el.id, value: el.title, label: el.title }))
    // );

    const statusOptions = [
        {
            id: 1,
            value: 'Editable',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        { id: 2, value: 'Approval', icon: <Icon 
            path={mdiSendCheck}
            title="Approval"
            size={1}
            horizontal
            vertical
            color="#fff"/>, backgroundColor: '#FFBC00', color: '#FFFFFF' },
        {
            id: 0,
            value: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
        {
            id: 3,
            value: 'Approved',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-check"></i>,
            backgroundColor: '#0ACF97',
            color: '#FFFFFF',
        },
        {
            id: 4,
            value: 'Reject',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-exclamation"></i>,
            color: '#FA5C7C',
        },
        { id: 5, value: 'Force Edit', icon: <Icon 
            path={mdiSendCheck}
            title="Approval"
            size={1}
            horizontal
            vertical
            color="#fff"/> },
        { id: 6, value: 'Duplicate', icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i> },
        { id: 7, value: 'Archive', icon: <i style={{ marginRight: '8px' }} className="fas fa-archive"></i> },
        { id: 8, value: 'Edit', icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i> },
    ];
   
    // const statusOptions = [
    //     {
    //         id: 1,
    //         value: 'Edit',
    //         icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
    //         backgroundColor: '#6C757D',
    //         color: '#FFFFFF',
    //     },
    //     { id: 2, value: 'Approval', icon: <SendIcon />, backgroundColor: '#FFBC00', color: '#FFFFFF' },
    //     {
    //         id: 0,
    //         value: 'Delete',
    //         icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
    //         color: '#FA5C7C',
    //     },
    //     {
    //         id: 3,
    //         value: 'Approved',
    //         icon: <i style={{ marginRight: '8px' }} className="fas fa-check"></i>,
    //         backgroundColor: '#0ACF97',
    //         color: '#FFFFFF',
    //     },
    //     {
    //         id: 4,
    //         value: 'Reject',
    //         icon: <i style={{ marginRight: '8px' }} className="fas fa-exclamation"></i>,
    //         color: '#FA5C7C',
    //     },
    //     { id: 5, value: 'Force Edit', icon: <CircleEdit /> },
    //     { id: 6, value: 'Duplicate', icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i> },
    //     { id: 7, value: 'Archive', icon: <i style={{ marginRight: '8px' }} className="fas fa-archive"></i> },
    // ];
    const statusEditableOptions = [
        {
            id: 8,
            value: 'Edit',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        { id: 2, value: 'Approval', icon: <SendIcon />, backgroundColor: '#FFBC00', color: '#FFFFFF' },
        {
            id: 0,
            value: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
    ];
    const statusApprovalOptions = [
        {
            id: 1,
            value: 'Editable',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        {
            id: 3,
            value: 'Approved',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-check"></i>,
            backgroundColor: '#0ACF97',
            color: '#0ACF97',
        },
        {
            id: 0,
            value: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
    ];
    const statusApprovedOptions = [
        {
            id: 1,
            value: 'Editable',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
            backgroundColor: '#6C757D',
            color: '#FFFFFF',
        },
        {
            id: 4,
            value: 'Reject',
            icon: <i style={{ marginRight: '18px' }} className="fas fa-exclamation"></i>,
            color: '#FA5C7C',
        },
        { id: 5, value: 'Force Edit', icon: <CircleEdit /> },
        { id: 6, value: 'Duplicate', icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i> },
        { id: 7, value: 'Archive', icon: <i style={{ marginRight: '8px' }} className="fas fa-archive"></i> },
    ];
    // Countries
    useEffect(() => {
        FetchApiGet('services/Pages/ProductPage/GetAllCountriesForPageListFilter','GET')
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                          setOptionsCountries(data.data.map(data => (
                                              {
                                                  value: data.countryId,
                                                  label: data.countryName,
                                              }
                                          ))),
  
                                          setSelectCountries(data.data.map(data => (
                                              {
                                                  value: data.countryId,
                                                  label: data.countryName,
                                              }
                                          )))
                                      )
                                  })
  
                              }
                              else if (res.status === 500) {
                                  history.push('/error-500');
                              }
  
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )
      }, [history])

      // Product
    useEffect(() => {
        // FetchApiGet('services/Pages/Benefit/GetProductsForBenefitFilter','GET')
        // .then((res) =>
        //               (async () => {
        //                   try {
        //                       if (res.status === 200) {
        //                           res.json().then(data => {
        //                               return (
        //                                   setOptionsProduct(data.data.map(data => (
        //                                       {
        //                                           value: data.productId,
        //                                           label: data.productName,
        //                                       }
        //                                   ))),
                                          
        //                                   benefitTabData.product.value === null
        //                                   ?setSelectProduct(data.data.map(data => (
        //                                     {
        //                                         value: data.productId,
        //                                         label: data.productName,
        //                                     }
        //                                 )))
        //                                   :setSelectProduct([benefitTabData.product])
                                          
        //                               )
        //                           })
  
        //                       }
        //                       else if (res.status === 500) {
        //                           history.push('/error-500');
        //                       }
  
        //                   } catch (error) {
        //                       console.log('error', error);
        //                   }
        //               })()
        //           )
      }, [benefitTabData.product, history])
    
      // Indication
      useEffect(() => {
        if(selectProduct.length !== 0) {
            const indicationBody = {
                ProductIds  :   selectProduct.map(data => data.value)
            }
            FetchApiPost('services/Pages/Benefit/GetIndicationsForBenefitFilter','POST',indicationBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                        benefitTabData.indication.value === null &&
                                          setOptionsIndication(data.data.map(data => (
                                              {
                                                  value: data.indicationId,
                                                  label: data.indicationName,
                                              }
                                          ))),

                                          benefitTabData.indication.value === null
                                          ?setSelectIndication(data.data.map(data => (
                                            {
                                                value: data.indicationId,
                                                label: data.indicationName,
                                            }
                                        )))
                                          :setSelectIndication([benefitTabData.indication])
                                      )
                                  })
                              }
                              else if (res.status === 500) {
                                  history.push('/error-500');
                              }
  
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )
        }
      }, [benefitTabData, history, selectProduct])

      // Profile
      useEffect(() => {
        if(selectProduct.length !== 0 && selectIndication.length !== 0) {
            const profileBody = {
                ProductIds      :   selectProduct.map(data => data.value),
                IndicationIds   :   selectIndication.map(data => data.value)
            }
            FetchApiPost('services/Pages/Benefit/GetProfilesForBenefitFilter','POST',profileBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                        benefitTabData.profile.value === null &&
                                          setOptionsProfile(data.data.map(item => (
                                              {
                                                  value: item.profileId,
                                                  label: item.profileName,
                                              }
                                          ))),
                                          benefitTabData.profile.value === null
                                          ?setSelectProfile(data.data.map(item => (
                                            {
                                                value: item.profileId,
                                                label: item.profileName,
                                            }
                                        )))
                                          :setSelectProfile([benefitTabData.profile])
                                      )
                                  })
  
                              }
                              else if (res.status === 500) {
                                  history.push('/error-500');
                              }
  
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )
        }
      }, [benefitTabData, history, selectIndication, selectProduct])


    // Need
    useEffect(() => {
        if(selectProduct.length !== 0 && selectIndication.length !== 0 && selectProfile.length !== 0) {
            const needBody = {
                ProductIds      :   selectProduct.map(data => data.value),
                IndicationIds   :   selectIndication.map(data => data.value),
                ProfileIds      :   selectProfile.map(data => data.value)
            }
            FetchApiPost('services/Pages/Benefit/GetNeedsForBenefitFilter','POST',needBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                        benefitTabData.need.value === null &&
                                          setNeed(data.data.map(data => (
                                              {
                                                  value: data.needId,
                                                  label: data.needName,
                                              }
                                          ))),
                                          benefitTabData.need.value === null
                                          ?setSelectNeed(data.data.map(data => (
                                            {
                                                value: data.needId,
                                                label: data.needName,
                                            }
                                        )))
                                          :setSelectNeed([benefitTabData.need])
                                      )
                                  })
                              }
                              else if (res.status === 500) {
                                  history.push('/error-500');
                              }
  
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )
        }
      }, [benefitTabData, history, selectIndication, selectProduct, selectProfile])


      // Specialization
      useEffect(() => {
        if(selectProduct.length !== 0 && selectIndication.length !== 0 && selectProfile.length !== 0 && selectNeed.length !== 0) {
            const specBody = {
                ProductIds      :   selectProduct.map(data => data.value),
                IndicationIds   :   selectIndication.map(data => data.value),
                ProfileIds      :   selectProfile.map(data => data.value),
                NeedIds         :   selectNeed.map(data => data.value)
            }
            FetchApiPost('services/Pages/Benefit/GetSpecsForBenefitFilter ','POST',specBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                        benefitTabData.specialization.length === 0 &&
                                          setOptionsSpecialization(data.data.map(data => (
                                              {
                                                value       :   data.specId,
                                                label       :   data.specName,
                                                specAbb     :   data.specAbb
                                              }
                                          ))),
                                          benefitTabData.specialization.length === 0
                                          ?setSelectSpecialization(data.data.map(data => (
                                            {
                                                value       :   data.specId,
                                                label       :   data.specName,
                                                specAbb     :   data.specAbb
                                            }
                                        )))
                                          :setSelectSpecialization(benefitTabData.specialization[0])
                                          
                                      )
                                  })
  
                              }
                              else if (res.status === 500) {
                                  history.push('/error-500');
                              }
  
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )
        }
      }, [benefitTabData, history, selectIndication, selectNeed, selectProduct, selectProfile])

      // Creator
      useEffect(() => {
        if(selectProduct.length !== 0 && selectIndication.length !== 0 && selectProfile.length !== 0 && selectNeed.length !== 0 && selectSpecialization.length !== 0) {
            const creatorBody = {
                ProductIds      :   selectProduct.map(data => data.value),
                IndicationIds   :   selectIndication.map(data => data.value),
                ProfileIds      :   selectProfile.map(data => data.value),
                NeedIds         :   selectNeed.map(data => data.value),
                SpecIds         :   selectSpecialization.map(data => data.value)
            }
            FetchApiPost('services/Pages/Benefit/GetCreatorForBenefitFilter','POST',creatorBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                          setOptionsCreator(data.data.map(data => (
                                              {
                                                value       :   data.creatorId,
                                                label       :   data.creatorName,
                                              }
                                          ))),
                                          setSelectCreator(data.data.map(data => (
                                            {
                                                value       :   data.creatorId,
                                                label       :   data.creatorName,
                                            }
                                        )))
                                      )
                                  })
  
                              }
                              else if (res.status === 500) {
                                  history.push('/error-500');
                              }
  
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )
        }
      }, [history, selectIndication, selectNeed, selectProduct, selectProfile, selectSpecialization])

      // Status
      useEffect(() => {
        if(selectProduct.length !== 0 && 
            selectIndication.length !== 0 && 
            selectProfile.length !== 0 && 
            selectNeed.length !== 0 &&
            selectSpecialization.length !== 0
            ) {
            const statusBody = {
                ProductIds      :   selectProduct.map(data => data.value),
                IndicationIds   :   selectIndication.map(data => data.value),
                ProfileIds      :   selectProfile.map(data => data.value),
                NeedIds         :   selectNeed.map(data => data.value),
                SpecIds         :   selectSpecialization.map(data => data.value)
            }
            FetchApiPost('services/Pages/Benefit/GetStatusForBenefitFilter','POST',statusBody)
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                  res.json().then(data => {
                                      return (
                                          setStatus(data.data.map(data => (
                                              {
                                                  value: data.isApprovedContent,
                                                  label: data.approvedContent,
                                              }
                                          ))),
                                          setSelectStatus(data.data.map(data => (
                                            {
                                                value: data.isApprovedContent,
                                                label: data.approvedContent,
                                            }
                                        )))
                                      )
                                  })
  
                              }
                              else if (res.status === 500) {
                                  history.push('/error-500');
                              }
  
                          } catch (error) {
                              console.log('error', error);
                          }
                      })()
                  )
        }
      }, [history, selectIndication, selectNeed, selectProduct, selectProfile, selectSpecialization])

      const changeSelect = (name, e) => {
        switch (name) {
            case 'Countries':
                return (
                    setSelectCountries(e),

                    setSelectProduct([]),
        
                    setSelectIndication([]),
                    setOptionsIndication([]),

                    setSelectProfile([]),
                    setOptionsProfile([]),

                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setOptionsSpecialization([]),

                    setSelectCreator([]),
                    setOptionsCreator([]),

                    setSelectStatus([]),
                    setStatus([])

                )
            case 'Product':
                return (
                    setSelectProduct(e),

                    setSelectIndication([]),
                    setOptionsIndication([]),

                    setSelectProfile([]),
                    setOptionsProfile([]),

                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setOptionsSpecialization([]),

                    setSelectCreator([]),
                    setOptionsCreator([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Indication':
                return (
                    setSelectIndication(e),

                    setSelectProfile([]),
                    setOptionsProfile([]),

                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setOptionsSpecialization([]),

                    setSelectCreator([]),
                    setOptionsCreator([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Profile':
                return (
                    setSelectProfile(e),

                    setSelectNeed([]),
                    setNeed([]),

                    setSelectSpecialization([]),
                    setOptionsSpecialization([]),

                    setSelectCreator([]),
                    setOptionsCreator([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Need':
                return (
                    setSelectNeed(e),

                    setSelectSpecialization([]),
                    setOptionsSpecialization([]),

                    setSelectCreator([]),
                    setOptionsCreator([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Specialization':
                return (
                    setSelectSpecialization(e),

                    setSelectCreator([]),
                    setOptionsCreator([]),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Creator':
                return (
                    setSelectCreator(e),

                    setSelectStatus([]),
                    setStatus([])
                )
            case 'Status':
                return (
                    setSelectStatus(e)
                )
            default:
                break;
        }
    }

      const filters = [
        {
            options: optionsCountries,
            value: selectCountries,
            change: changeSelect,
            placeHolder: 'Countries'
        },
        {
            options: optionsProduct,
            value: selectProduct,
            change: changeSelect,
            placeHolder: 'Product'
        },
        {
            options: optionsIndication,
            value: selectIndication,
            change: changeSelect,
            placeHolder: 'Indication'
        },
        {
            options: optionsProfile,
            value: selectProfile,
            change: changeSelect,
            placeHolder: 'Profile'
        },
        {
            options: need,
            value: selectNeed,
            change: changeSelect,
            placeHolder: 'Need'
        },
        {
            options: optionsSpecialization,
            value: selectSpecialization,
            change: changeSelect,
            placeHolder: 'Specialization'
        },
        { 

            options: optionsCreator,
            value: selectCreator,
            change: changeSelect,
            placeHolder: 'Creator'
        },
        { 

            options: [],
            value: [],
            change: [],
            placeHolder: 'Create Date'
        },
        {
            options: status,
            value: selectStatus,
            change: changeSelect,
            placeHolder: 'Status'
        },
    ]
    
    const filterComponentsData = [
        { label: 'Countries', options: optionsCountries, state: selectCountries, setState: setSelectCountries },
        { label: 'Product', options: optionsProduct, state: selectProduct, setState: setSelectProduct },
        { label: 'Indication', options: optionsIndication, state: selectIndication, setState: setSelectIndication },
        { label: 'Profile', options: optionsProfile, state: selectProfile, setState: setSelectProfile },
        { label: 'Need', options: need, state: selectNeed, setState: setSelectNeed },
        {
            label: 'Specialization',
            options: optionsSpecialization,
            state: selectSpecialization,
            setState: setSelectSpecialization,
        },
        { label: 'Creator', options: optionsCreator, state: selectCreator, setState: setSelectCreator },
        { label: 'Create Date', options: [], state: [], setState: [] },
        { label: 'Status', options: status, state: selectStatus, setState: setSelectStatus },
    ];

    const dropDownItemClick = (e) => {
        const ids = e.target.id.split(' ');
        const selectedStatus = statusOptions.find((el) => el.id === Number(ids[1]));
        const item = brochuries.find((el) => Number(el.contentId) === Number(ids[0]));

        setNeedId(Number(item.contentId));
       
        if (selectedStatus.value === 'Reject') {
            const item = brochuries.find((el) => Number(el.contentId) === Number(ids[0]));
            setRejectData(item);
            setShowRejectModal(true);
        }
        if (selectedStatus.value === 'Edit') {
            const item = brochuries.find((el) => Number(el.contentId) === Number(ids[0]));
            setUpdateBenefitData(item);
            setShowUpdateModal(true);
        }
        if (selectedStatus.value === 'Delete') {
            const item = brochuries.find((el) => Number(el.contentId) === Number(ids[0]));
            setNeedId(Number(item.contentId));
            setShowDeleteModal(true);
        }
        if (selectedStatus.value === 'Archive') {
            const item = brochuries.find((el) => Number(el.contentId) === Number(ids[0]));
            setArchiveData(item);
            setIsShowArchive(true);
        }
        if (
            selectedStatus.value === 'Editable' ||
            selectedStatus.value === 'Approval' ||
            selectedStatus.value === 'Approved'
        ) {
            setShowActionModal(true);
            setActionModalData({
                itemId: Number(ids[0]),
                selectedStatus: selectedStatus,
            })
            // let changedData = {};
            // const arr = brochuries.map((el, i) => {
            //     console.log(el);
            //     console.log(Number(ids[1]),el.id);
            //     if (Number(el.contentId) === Number(ids[0])) { 
            //         console.log('mete ifin içinde');
            //         changedData = {
            //             benefitId: el.id,
            //             approveStatus: selectedStatus.value === "Editable" ? 1 : selectedStatus.value === "Approval" ? 2 : selectedStatus.value === "Approved" ? 3 : 4,
            //             approverName: selectedStatus.value === "Editable" ? null : selectedStatus.value === "Approval" ? null : selectedStatus.value === "Approved" ? localStorage.getItem('userName') : 4,
            //             rejectReason: null,  
            //         };
            //         return { ...el, isApprovedContent: selectedStatus.id };
            //     }
            //     return el;
            // });
            // // FetchApiPost('services/Pages/Benefit/ApproveBenefit', 'POST', changedData);
            // setBrochuries(arr);
        }
    };
    // const insert = (arr, index, newItem) => [
    //     // part of the array before the specified index
    //     ...arr.slice(0, index),
    //     // inserted item
    //     newItem,
    //     // part of the array after the specified index
    //     ...arr.slice(index),
    // ];

    // const acordionControl = (e) => {
    //     const btn = document.getElementsByClassName('table-acordion-icon').namedItem(e.target.id);
    //     const classes = [...btn.classList];
    //     if (!classes.includes('rotate180')) {
    //         btn.classList.add('rotate180');
    //         const item = {
    //             id: 7,
    //             needName: 'dasdasdasdas',
    //             needId: 'PRF.02.ND.CRP',
    //             page: '+',
    //             country: 'Corparate',
    //             product: 'PARI-FLO',
    //             specialization: 'GNP, N',
    //             creator: '-',
    //             createDate: '18.10.2022',
    //             status: 'Approved',
    //         };
    //         const index = data.findIndex((el) => el.id === Number(e.target.id));
    //         const result = insert(data, index + 1, item);
    //         setData(result);
    //     }
    //     if (classes.includes('rotate180')) {
    //         btn.classList.remove('rotate180');
    //         const arr = data.filter((el) => el.id !== 7);
    //         setData(arr);
    //     }
    // };
    const goToTemplateTab = (e) => {
        dispatch(benefitTab('Templates'));
        dispatch(pageListPlus(true))
        // dispatch(setContentId(Number(e.target.id)));
        localStorage.setItem('ctId',Number(e.target.id));
        // setSelectedTab('Templates');
    };

    const goToDetailsPage = () => {

    }
    const action = brochuries.map((el, i) => ({
        id: el.contentId,
        content: (
            <span className="table-dropdown">
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <i style={{ fontSize: '20px' }} className="fas fa-ellipsis-v"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-container">
                        {el.isApprovedContent === 1 && //'Editable'
                            statusEditableOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.contentId} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 0 || item.id === 3 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                        {el.isApprovedContent === 2 && // Approval
                            statusApprovalOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.contentId} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 0 || item.id === 3 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                        {el.isApprovedContent === 3 && // Approved
                            statusApprovedOptions.map((item, i) => (
                                <Dropdown.Item
                                    as="button"
                                    eventKey={item.id}
                                    id={`${el.contentId} ${item.id}`}
                                    onClick={dropDownItemClick}
                                    style={item.id === 4 ? { color: `${item.color}` } : {}}>
                                    {item.icon} {t(item.value)}
                                </Dropdown.Item>
                            ))}
                    </Dropdown.Menu>
                </Dropdown>
            </span>
        ),
    }));

    const pageListTableData = brochuries?.map((el, i) => ({
        id: el.contentId,
        benefitName: (
            <span>
                {/* {el.id !== 7 && (
                    <i onClick={acordionControl} id={el.contentId} className="fas fa-angle-up table-acordion-icon"></i>
                )} */}
                {el.passportOfProductName}
            </span>
        ),
        needId: el.abb,
        page:
            el.pageId === 0 ? (
                <span className="page-area" id={el.contentId} onClick={goToTemplateTab}>
                    +
                </span>
            ) : (
                <Link
                    to={{
                        pathname: `/apps/brochure/template/details`,
                        search: `?id=${el.pageId}&name=templates`,
                        hash: "#the-hash",
                        state: { Details: true }
                    }}
                >
                    <span className="page-area" id={el.contentId}>
                        <Icon path={mdiEyeOutline} size={1} horizontal vertical color="#6c757d" />
                    </span>
                </Link>
            ),
        country: el.countryName,
        product: el.productName,
        specialization: el.getSpec?.map((item) => <span title={item.specName}>{item.specAbb}, </span>),
        creator: el.createdBy,
        createDate: new Date(el.createdDate).toLocaleDateString(),
        status: (
            <span
                style={
                    el.isApprovedContent === 1 //Editable
                        ? {
                              backgroundColor: '#6C757D',
                              color: '#fff',
                          }
                        : el.isApprovedContent === 2 //'Approval'
                        ? {
                              backgroundColor: '#FFBC00',
                              color: '#fff',
                          }
                        : el.isApprovedContent === 3 //'Approved'
                        ? {
                              backgroundColor: '#0ACF97',
                              color: '#fff',
                          }
                        : el.isApprovedContent === 4
                        ? {
                              backgroundColor: '#FA5C7C',
                              color: '#fff',
                          }
                        : {}
                }
                className="status-title">
                {el.isApprovedContent === 1 && <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>}
                {el.isApprovedContent === 2 && <SendIcon />}
                {el.isApprovedContent === 3 && <i style={{ marginRight: '8px' }} className="fas fa-check"></i>}
                {el.isApprovedContent === 4 && <i style={{ marginRight: '8px' }} className="fas fa-exclamation"></i>}
                {el.isApprovedContent === 1 && t('Editable')}
                {el.isApprovedContent === 2 && t('Approval')}
                {el.isApprovedContent === 3 && t('Approved')}
                {el.isApprovedContent === 4 && t('Reject')}
            </span>
        ),
        action: action[i].content,
    }));
    const newButton = () => {
        setShowModal(true);
    };
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
    const clearFilters = () => {
        setSelectCountries([]);
        setSelectProduct([]);

        setSelectIndication([]);
        setOptionsIndication([]);

        setSelectProfile([]);
        setOptionsProfile([]);

        setSelectNeed([]);
        setNeed([]);

        setSelectSpecialization([]);
        setOptionsSpecialization([]);

        setSelectCreator([]);
        setOptionsCreator([]);

        setSelectStatus([]);
        setStatus([]);
    };
    const applyFilter = () => {
        const body = {
            products: selectProduct.map(data => data.value),
            indications: selectIndication.map(data => data.value),
            profiles: selectProfile.map(data => data.value),
            needs: selectNeed.map(data => data.value),
            specs: selectSpecialization.map(data => data.value),
            creatorNames:selectCreator.map(data => data.label),
            startDate: startDate.length === 0 ? '1999-01-01T00:00:00.000Z' : startDate,
            endDate: endDate.length === 0 ? '1999-01-01T00:00:00.000Z' : endDate,
            status: selectStatus.map(data => data.value),
        }
        const applyCondition = [
            selectProduct.length === 0,
            selectIndication.length === 0,
            selectProfile.length === 0,
            selectNeed.length === 0 ,
            selectSpecialization.length === 0,
            selectStatus.length === 0,
        ];
        if (applyCondition.every((v) => v === false)) {
            
            FetchApiPost('services/Pages/Benefit/ApplyForBenefitPageListFilter', 'POST', body)
                .then((res) => {
                    if (res.status === 200) {
                        res.json().then((json) => setBrochuries(json.data));
                    } else if (res.status === 500 || res.status === 502) {
                        history.push('/error-500');
                    } else {
                        setBrochuries([]);
                    }
                })
                .catch((error) => console.log('Error', error));
        }
    };

    // useEffect(() => {
    //   FetchApiGet('services/Pages/Benefit/GetAllBenefitPageList','GET')
    //   .then((res) =>
    //                 (async () => {
    //                     try {
    //                         if (res.status === 200) {
    //                             res.json().then(data => {
    //                                 setBrochuries(data.data)
    //                             })

    //                         }
    //                         else if (res.status === 500) {
    //                             history.push('/error-500');
    //                         }

    //                     } catch (error) {
    //                         console.log('error', error);
    //                     }
    //                 })()
    //             )
    // }, [history])
    
    return (
        <div>
            <div id="page-list-table">
                <MainTable
                    tableData={pageListTableData}
                    columns={columns}
                    columnWidths={columnWidths}
                    setColumnWidths={setColumnWidths}
                    tableColumnExtensions={tableColumnExtensions}
                    itemsFromBackend={itemsFromBackend}
                    columnOrders={columnOrders}
                    setColumnOrders={setColumnOrders}
                    disableFreeze={true}
                    groupByItems={groupByItems}
                    setGroupByItems={setGroupByItems}
                    showorHideColumnsItems={showorHideColumnsItems}
                    totalSummaryItems={totalSummaryItems}
                    groupSummaryItems={groupSummaryItems}
                    isAddButton={true}
                    addButtonFunction={newButton}
                    filters={
                        <Filter
                            filterComponentsData={filters}
                            onChangeDate={onChangeDate}
                            applyFilter={applyFilter}
                            clearFilters={clearFilters}
                        />
                    }
                    isFilters={true}
                />
            </div>
            <Reject modalShow={showRejectModal} setModalShow={setShowRejectModal} />
            <Delete
                modalShow={showDeleteModal}
                setModalShow={setShowDeleteModal}
                brochuries={brochuries}
                setBrochuries={setBrochuries}
                contentId={needId}
            />
            {showModal && (
                <NewButton
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setBrochuries={setBrochuries}
                    brochuries={brochuries}
                />
            )}

            {
                showActionModal && 
                <ActionModal
                modalShow={showActionModal}
                setModalShow={setShowActionModal}
                tableData={brochuries}
                setTableData={setBrochuries}
                item={actionModalData}
                />
            }
            {showUpdateModal && (
                <Update
                    showModal={showUpdateModal}
                    setShowModal={setShowUpdateModal}
                    setBrochuries={setBrochuries}
                    brochuries={brochuries}
                    contentId={needId}
                    data={updateBenefitData}
                />
            )}
        </div>
    );
};

export default React.memo(PageListIndex);
