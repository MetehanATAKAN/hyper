import { useEffect, useLayoutEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BsCheckLg } from 'react-icons/bs'
import {
  resetCompetitorPage,
  showCompetitorModal,
} from '../../redux/actions';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const CompetitorFinishAnimation = ({ finishModal, setFinishModal,noButton,yesButton }) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useLayoutEffect(() => {
    
      setTimeout(() => {
        try {
        document.querySelector('.water-yamuk-line').style.animation = 'deleteLine 2s forwards'
        document.querySelector('.water-animation-line').style.animation = 'deleteLine 2s forwards'
        document.querySelector('.animation-bottle').style.animation = 'removeRotateBottle 2s forwards'
        document.querySelectorAll('.change-color')[0].style.animation = 'removeColor 2s forwards'
        document.querySelectorAll('.change-color')[1].style.animation = 'removeColor 2s forwards'
        document.querySelectorAll('.change-color')[2].style.animation = 'removeColor 2s forwards'
        document.querySelectorAll('.change-color')[3].style.animation = 'removeColor 2s forwards'
      } catch (error) {
        console.log("Competitor Finish Animation",error);
      }
      }, 8600);
    
  }, [])

  const handleClose = () => {
    dispatch(showCompetitorModal(false))
    dispatch(resetCompetitorPage())
    setFinishModal(false)
  }

  return (
    <div>
      <Modal show={true}  centered className='split-success-modal'>
        <Modal.Body className='text-center competitor-animation-body'>
          <div className='animation-content'>
            <img src="https://img.icons8.com/fluency-systems-filled/96/undefined/circled-notch.png" className='animation-circle'/>
            <BsCheckLg className='animation-check' />
            </div>
            <div className='wave-deneme'>
              <div className='shape'>
                <div className='wave'></div>
              </div>
            </div>
            <div className='water-animation-line'></div>
            <div className='water-yamuk-line-container'>
              <div className='water-yamuk-line'></div>
            </div>
            
            <svg xmlns="http://www.w3.org/2000/svg" width="96.763" height="49.448" viewBox="0 0 96.763 49.448" className='animation-bottle'>
            <g id="Group_1386" data-name="Group 1386" transform="translate(9871.023 2927.67)">
              <rect id="Rectangle_172" data-name="Rectangle 172" width="6.425" height="20.69" transform="translate(-9863.222 -2914.237)" fill="#fff"/>
              <rect id="Rectangle_173" data-name="Rectangle 173" width="3.617" height="20.69" transform="translate(-9871.023 -2914.237)" fill="#fff"/>
              <rect id="Rectangle_174" data-name="Rectangle 174" width="1.785" height="24.165" transform="translate(-9866.206 -2915.974)" fill="#fff"/>
              <path id="Path_68" data-name="Path 68" d="M91.982,0H47.489C33.655,0,22.44,9.253,22.44,20.668V28.78c0,11.414,11.215,20.668,25.049,20.668H91.982c6.25,0,11.316-4.18,11.316-9.337V9.337C103.3,4.18,98.232,0,91.982,0" transform="translate(-9877.559 -2927.67)" fill="#fff"/>
              <path id="Path_69" data-name="Path 69" d="M70.79,25.1V0H83.27V29.959Z" transform="translate(-9880.641 -2927.67)" fill="#3278fa"/>
              <path className='change-color' id="Path_70" data-name="Path 70" d="M65.733,50.77C44.2,53.449,38.65,38.254,28.626,34.313a12.215,12.215,0,0,0-6.185-.665v4.719c0,11.418,11.218,20.667,25.048,20.667h44.5c6.253,0,11.313-4.175,11.313-9.334V36.312C94.9,39.579,83.5,48.559,65.733,50.77" transform="translate(-9877.56 -2937.259)" fill="#00a0df"/>
              <path className='change-color' id="Path_71" data-name="Path 71" d="M11.011,32.452v10h6.421v-10c-3.035-.259-4.252.519-6.421.589" transform="translate(-9874.23 -2936.003)" fill="#00a0df"/>
              <path className='change-color' id="Path_72" data-name="Path 72" d="M6.8,43.428H8.586V32.554c-.6.024-1.2.846-1.786.882Z" transform="translate(-9873.004 -2935.24)" fill="#00a0df"/>
              <path className='change-color' id="Path_73" data-name="Path 73" d="M0,41.18H3.616V33.3C2.339,33.392,1.121,34.394,0,34.5Z" transform="translate(-9871.023 -2934.729)" fill="#00a0df"/>
              <path id="Path_74" data-name="Path 74" d="M90.917,0V23.341l3,.946V0Z" transform="translate(-9888.288 -2927.67)" fill="#1eafeb"/>
            </g>
            </svg>
            
            <div className='animation-modal-content'>
              <div> {t('Are you sure you want to complete?')} </div>
              {/* <h3>{t('THANK YOU')}.</h3>
              <div>{t('Thank you for the information you provided')}.</div>
              <div>{t('To be re-evaluated soon')}...</div> */}
            </div>
        </Modal.Body>
        <Modal.Footer className='border-top-0 split-error-modal__footer'>
          <div className='split-error-modal__button-container m-auto'>
            <Button variant='light' onClick={noButton} >
              {t('No')}
            </Button>
            <Button variant='primary' onClick={yesButton}>
              {t('Yes')}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CompetitorFinishAnimation