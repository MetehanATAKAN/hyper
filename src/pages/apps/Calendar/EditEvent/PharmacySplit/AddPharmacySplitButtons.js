import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { changePageNext, changeSplitPage } from '../../../../../redux/actions'
import { useTranslation } from 'react-i18next';

type pharmacyButtonsProps = {
  savePharmacy: ?() => void,

}
const AddPharmacyButtons = ({ savePharmacy,
  prevSplitPage,
  onClick,
  inputPercent,
}: pharmacyButtonsProps): React$Element<any> => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  return (
    <>
      <Col>
        <Row>
          <Col className='pharmacy_buttons_left'>
            <button className='pharmacy_buttons_save' onClick={() => savePharmacy()} disabled={inputPercent === 100 ? false : true}><i class="fa-solid fa-floppy-disk"></i></button>
            <button className='pharmacy_buttons_back'><i class="fa-solid fa-divide"></i></button>
            <button className='pharmacy_buttons_reset'><i class="fa-solid fa-rotate-right"></i></button>
          </Col>
          <Col>
            <Button className="btn btn-light me-1" onClick={() => dispatch(changeSplitPage(1))}>
              {t('back')}
            </Button>
            <Button type="submit" className="btn btn-primary py-1" disabled={inputPercent === 100 && false} onClick={() => dispatch(changePageNext())}>
              {t('next')}
            </Button>
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default React.memo(AddPharmacyButtons) 