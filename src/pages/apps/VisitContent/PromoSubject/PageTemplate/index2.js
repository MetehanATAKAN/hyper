import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FetchApiGet } from '../../../../../utils/http.helper';
import {
  mdiPlus,
  mdiLinkVariantOff,
} from '@mdi/js';
import Icon from '@mdi/react';
import { Divider } from 'antd';
import 'antd/dist/antd.css';

const PageTemplate = () => {
  const { id } = useParams('id');

  const [profilePages, setProfilePages] = useState([]);
  const [needPages, setNeedPages] = useState([]);
  const [benefitPages, setBenefitPages] = useState([]);
  const [whatCanBeInterestingPages, setWhatCanBeInterestingPages] = useState([]);
  const [situationPages, setSituationPages] = useState([]);
  const [problemIdentificationPages, setProblemIdentificationPages] = useState([]);
  const [identificationEvaluationPages, setIdentificationEvaluationPages] = useState([]);
  const [nonPromoPages, setNonPromoPages] = useState([]);

  useEffect(() => {
    FetchApiGet(`services/Pages/PromoSubject/GetPromoSubjectById?id=${id}`, 'GET')
      .then(res => {
        if(res.status === 200){
          res.json().then(({ data }) => {
            setProfilePages({ name: data.profile.profileName, profilePages: data.profile.productPages })
            setNeedPages({ name: data.need.needName, needPages: data.need.productPages })
            setBenefitPages({ name: data.benefits[0].benefitName, benefitPages: data.benefits[0].productPages })
            setWhatCanBeInterestingPages({ })
          })
        }
      })
      // fetch('http://178.18.200.171:5000/services/Pages/PromoSubject/GetPromoSubjectById?id=21')
  }, [])

  return (
    <div className='promo-subject-templates'>
      <Divider type='horizontal' />
      <div className='promo-subject-template-cards'>
        <div className='promo-subject-template-cards__container'>
          {
            profilePages?.profilePages && profilePages?.profilePages.map(item => (
              <div className='promo-subject-template-cards__item'>
                <label className='promo-subject-template-cards__item-name' style={{color: '#6C757D'}}>{profilePages.name}</label>
                <div className='promo-subject-template-cards__item-icons'>

                  <Link to={`/apps/templates/promoSubject/productName=Profile/productId=${id}/pageId=${item.profileId}`}>
                    <Icon path={mdiPlus} size={1.9} color="#6C757D" />
                  </Link>
                  
                  <Icon path={mdiLinkVariantOff} size={1.5} color="#6C757D" />
                </div>
              </div>
            ))
          }

          {
            needPages?.needPages && needPages?.needPages.map(item => (
              <div className='promo-subject-template-cards__item'>
                <label className='promo-subject-template-cards__item-name' style={{color: '#6C757D'}}>{needPages.name}</label>
                <div className='promo-subject-template-cards__item-icons'>
                <Link to={`/apps/templates/promoSubject/productName=Need/productId=${id}/pageId=${item.id}`}>
                    <Icon path={mdiPlus} size={1.9} color="#6C757D" />
                  </Link>
                  <Icon path={mdiLinkVariantOff} size={1.5} color="#6C757D" />
                </div>
              </div>
            ))
          }

          {
            benefitPages?.benefitPages && benefitPages?.benefitPages.map(item => (
              <div className='promo-subject-template-cards__item'>
                <label className='promo-subject-template-cards__item-name' style={{color: '#6C757D'}}>{benefitPages.name}</label>
                <div className='promo-subject-template-cards__item-icons'>
                  <Link to={`/apps/templates/promoSubject/productName=Benefit/productId=${id}/pageId=${item.id}`}>
                    <Icon path={mdiPlus} size={1.9} color="#6C757D" />
                  </Link>
                  <Icon path={mdiLinkVariantOff} size={1.5} color="#6C757D" />
                </div>
              </div>
            ))
          }
        </div>

        <Divider type='vertical' style={{ maxHeight: "100vh"}} />

        <div className='promo-subject-template-cards__container'>
        {
          profilePages?.profilePages && profilePages?.profilePages.map(item => (
            <div className='promo-subject-template-cards__item'>
              <label className='promo-subject-template-cards__item-name' style={{color: '#6C757D'}}>{profilePages.name}</label>
              <div className='promo-subject-template-cards__item-icons'>
                <Icon path={mdiPlus} size={1.9} color="#6C757D" onClick={() => console.log("jbdsfjkfsjknfds")} />
                <Icon path={mdiLinkVariantOff} size={1.5} color="#6c757d80" />
              </div>
            </div>
          ))
        }

        {
          needPages?.needPages && needPages?.needPages.map(item => (
            <div className='promo-subject-template-cards__item'>
              <label className='promo-subject-template-cards__item-name' style={{color: '#6C757D'}}>{needPages.name}</label>
              <div className='promo-subject-template-cards__item-icons'>
                <Icon path={mdiPlus} size={1.9} color="#6C757D" onClick={() => console.log("jbdsfjkfsjknfds")} />
                <Icon path={mdiLinkVariantOff} size={1.5} color="#6c757d80" />
              </div>
            </div>
          ))
        }

        {
          benefitPages?.benefitPages && benefitPages?.benefitPages.map(item => (
            <div className='promo-subject-template-cards__item'>
              <label className='promo-subject-template-cards__item-name' style={{color: '#6C757D'}}>{benefitPages.name}</label>
              <div className='promo-subject-template-cards__item-icons'>
                <Icon path={mdiPlus} size={1.9} color="#6C757D" onClick={() => console.log("jbdsfjkfsjknfds")} />
                <Icon path={mdiLinkVariantOff} size={1.5} color="#6c757d80" />
              </div>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default PageTemplate