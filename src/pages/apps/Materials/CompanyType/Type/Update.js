import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FetchApiPost } from '../../../../../utils/http.helper';

const Update = ({ handleUpdate, selectedValue, isShow, setIsShow }) => {
    const [type, setType] = useState(selectedValue.name);
    const [description, setDescription] = useState(selectedValue.description);
    
    const { t } = useTranslation();

const toggle = () => {
    setIsShow(false)
}

  return (
    <Modal show={isShow} onHide={toggle} size={'md'} >
                <Modal.Header onHide={toggle} closeButton style={{ backgroundColor: '#FFFFFF', color: '#000000' }} >
                    <h4
                        className="modal-title"
                        style={{
                            color: '#7A7A7A',
                            font: '18px',
                        }}
                    >
                        {t('Update Type')}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <div className='mb-3' style={{padding: '16px'}} >
                    <Row>
                        <Col style={{fontWeight: 600, color: '#6c757d'}} className='p-0'>{t('type')}</Col>
                        <Col style={{fontSize: "1.2rem", color: 'red'}} className='p-0 text-end font-weight-bold'>*</Col>
                    </Row>
                    <Row>
                        <Form.Control type="text" placeholder={t('type')} value={type} onChange={(e) => setType(e.target.value)} />
                    </Row>
                    <Row className='mt-3'>
                        <Col style={{fontWeight: 600, color: '#6c757d'}} className='p-0'>{t('description')}</Col>
                        <Col style={{fontSize: "1.2rem", color: 'red'}} className='p-0 text-end font-weight-bold'>*</Col>
                    </Row>
                    <Row>
                        <Form.Control as="textarea" rows={3} placeholder="...." value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#FAFBFE ' }} >
                    <Button
                        className='btn-light'
                        style={{ backgroundColor: '#EBEBEB' }}
                        onClick={toggle}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        className='btn-warning'
                        onClick={() => handleUpdate(type, description)}
                        disabled={
                            type.trim().length === 0 || 
                            description.trim().length === 0
                        }
                    >
                        {t('update')}
                    </Button>
                </Modal.Footer>
            </Modal>
  )
}

export default Update


