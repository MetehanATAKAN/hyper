import React, { useState,useEffect } from 'react'
import { Col, Row,Button,Modal } from 'react-bootstrap'
import ImageUploading from 'react-images-uploading';
import Webcam from  './Webcam';
import { useTranslation } from 'react-i18next';

const DoctorInfo = (props) => {
  const { t } = useTranslation();
  const [specName, setSpecName] = useState('UROLOGY,A');
  const [category, setCategory] = useState('A');
  const [customerName, setCustomerName] = useState('UĞUR ALTUNBAŞ');
  const [clinicAdress, setClinicAdress] = useState('İstinye Üniversitesi Medical Park');

  const [doctorImage, setDoctorImage] = useState(false);


  const [show, setShow] = useState(false);
  const [showWeb, setShowWeb] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseWeb = () => setShowWeb(false);
  const handleShowWeb = () => setShowWeb(true);

  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  useEffect(() => {
   setSpecName(props.value.Spec);
   setCategory(props.value.Category);
   setCustomerName(props.value.CustomerName);
   setClinicAdress(`${props.value.ClinicName},${props.value.ClinicAdress}`)
  }, [props])
  
const handleDoctorImage =()=>{
  setDoctorImage(!doctorImage);
  handleShow();
}
  return (
    <>
      <Row>
       
      <Col xs='3' onClick={()=>handleDoctorImage()} >
          <div className='doctor_image' placeholder='metehan'>
        <i className="fa-solid fa-user-doctor"></i>
        </div>

    </Col>
    <Modal show={show} onHide={handleClose} size='lg' className='text-center' >
        <Modal.Header className="pb-0 pt-0 px-4 border-bottom-0 rm-title text-white width-3" closeButton>
          <Modal.Title>{t('Image Upload')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="App">
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {imageList?.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="400" />
              </div>
            ))}
            <div className='mt-2'>
            <Button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              {t('Image Upload')}
            </Button>
            &nbsp;
            <Button onClick={onImageRemoveAll}>{t("Remove image")}</Button>
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {t('Save Image')}
          </Button>
        </Modal.Footer>
      </Modal> 

       {/* ------ */}

      <Modal show={showWeb} onHide={handleCloseWeb} size='lg' className='text-center' >
        <Modal.Header className="pb-0 pt-0 px-4 border-bottom-0 rm-title text-white width-3" closeButton>
          <Modal.Title>Image Reload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Webcam image={props.image} setImage={props.setImage}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseWeb}>
            {t('Save Image')}
          </Button>
        </Modal.Footer>
      </Modal>
       
        
        <Col xs='9'>
          <div>{specName},<span className={category==='N/A' ?'category_null':null}>{category}</span></div>
          <div>{customerName}</div>
          <div>{clinicAdress}</div>
        </Col>
      </Row>
    </>
  )
}

export default DoctorInfo;