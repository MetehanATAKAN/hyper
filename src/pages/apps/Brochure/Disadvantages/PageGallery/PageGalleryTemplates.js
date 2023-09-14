import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Masonry from "react-masonry-component";
import { RibbonContainer, LeftCornerRibbon } from "react-ribbons";
import { Link, useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';

import { MultiSelectLabels } from '../../../../forms/Basic';
import { mdiStar, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const PageGalleryTemplates = ({ templates, setTemplates }) => {
    const history = useHistory();
    const { t } = useTranslation();
    const activeTemplateId = useSelector(state => state.ActivityLimit.pageDesignTemplateId);
    
    const [newTemplateName, setNewTemplateName] = useState('');
    const [stars] = useState([1, 1, 1, 1, 1]);

    // New Template Modal
    const [modal, setModal] = useState(false);
    const [productsOptions, setProductsOptions] = useState([]);

    const [selectProductOptions, setSelectProductOptions] = useState([]);


    const toggle = () => {
        setModal(!modal);
    }

    const saveNewTemplate = () => {}

  return (
    <div className='brochure-templates'>
            <Masonry className="gallery" elementType={"ul"}  >
                <>
                    {/* {
                        activeTemplateId === 1 
                        ?<li className='new-template-box imgContainer'>
                        <div className='new-template-box__container'>
                            <Icon path={mdiPlus}
                                title="Plus"
                                size={1}
                                color="#7A7A7A"
                            />
                            <Button
                                onClick={newTemlateModal}
                            >
                                <span>new template</span>
                            </Button>

                        </div>
                    </li>
                    :null
                    } */}
                    {
                        templates.map((img, index) => (
                            <>
                                <RibbonContainer 
                                key={index}
                                className= {
                                    `imgContainer 
                                     ${
                                        img.isApprovedContent === 0 
                                        ? 'editing'
                                        :img.isApprovedContent === 1 
                                        ? 'send-to-approval'
                                        :img.isApprovedContent === 2 
                                        ? 'approved'
                                        :img.isApprovedContent === 3 
                                        ? 'reject'
                                        :img.isApprovedContent === 4 
                                        ? 'archive'
                                        :null
                                    }`
                                }
                                style={{ maxHeight: "300px" }}
                                >
                                    <LeftCornerRibbon backgroundColor={img.isApprovedContent === 0
                                            ?  '#e5e5e5'
                                            :img.isApprovedContent === 1
                                            ?   'rgb(255, 255, 136)'
                                            :img.isApprovedContent === 2
                                            ?   'green'
                                            :img.isApprovedContent === 3
                                            ?   'red'
                                            :img.isApprovedContent === 4
                                            ?   'rgb(77, 28, 28)'
                                            :null} color="rgb(255, 255, 228)" fontFamily="Arial" zIndex='9999' >
                                        {img.isApprovedContent === 0
                                            ?  t('editing')
                                            :img.isApprovedContent === 1
                                            ?   t('approval')
                                            :img.isApprovedContent === 2
                                            ?   t('approved')
                                            :img.isApprovedContent === 3
                                            ?   t('reject')
                                            :img.isApprovedContent === 4
                                            ?   t('archive')
                                            :null}
                                    </LeftCornerRibbon>
                                    <Link to={`/apps/brochure/template/design/${img.id}`}>
                                        <img src={img.imageFile} alt={img.passportOfProductName} />
                                    </Link>
                                    <div  className='template-card-hover' >
                                        <div className='template-card-hover-item-main'>
                                            <div className='items'>
                                                <div className='stars'>
                                                    {
                                                        stars.map((star,index) => (
                                                            <Icon path={mdiStar}
                                                                size={1}
                                                                color="#969696"
                                                                key={index}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                <span className='template-name' > {img.passportOfProductName} </span>


                                                <Link
                                                    to={`template/detailsgallery=${img.contentId}&country=${img.countryId}`}
                                                >
                                                    <Button className='btn-primary'  >{t('see details')}</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </RibbonContainer>
                                
                                {/* <li
                                    key={i}
                                    className= {'imgContainer'}
                                    style={{ maxHeight: "390px" }}
                                >
                                    <img src={img.src} alt={img.title} width={200} height={200} />
                                    <div className='template-card-hover' >
                                        <div className='template-card-hover-item-main'>
                                            <div className='items'>
                                                <div className='stars'>
                                                    {
                                                        stars.map(star => (
                                                            <Icon path={mdiStar}
                                                                title="Start"
                                                                size={1}
                                                                color="#969696"
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                <span className='template-name' > {img.name} </span>


                                                <Link
                                                    to={{
                                                        pathname: `/apps/brochure/template/details`,
                                                        search: `?id=${img.id}`,
                                                        hash: "#the-hash",
                                                        state: { Details: true }
                                                    }}
                                                >
                                                    <Button className='btn-primary'  >see details</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </li> */}
                                </>
                        ))
                    }
                </>
            </Masonry>

            <Modal show={modal} onHide={toggle} size={'md'} >
                <Modal.Header onHide={toggle} closeButton style={{ backgroundColor: '#FFFFFF', color: '#000000' }} >
                    <h4
                        className="modal-title"
                        style={{
                            color: '#7A7A7A',
                            font: '18px',
                        }}
                    >
                        New Template
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <label> name </label>
                    <input
                        className='mb-2'
                        style={{
                            width: '100%',
                            height: '38px',
                            border: '1px solid #EBEBEB',
                            borderRadius: '2px',
                            outline: 'none',
                            background: '#F5F5F5',

                        }}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                        placeholder={'add name'}
                    />
                    <div className='mb-3' >
                        <MultiSelectLabels
                            options={productsOptions}
                            change={(e) => setSelectProductOptions(e)}
                            headerName={'recommended products'}
                            value={selectProductOptions}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#F2F2F2' }} >
                    <Button
                        className='btn-light'
                        style={{ backgroundColor: '#EBEBEB' }}
                        onClick={() => setModal(false)}
                    >
                        cancel
                    </Button>
                    <Button
                        className='btn-primary'
                        onClick={saveNewTemplate}
                        disabled={(newTemplateName !== '') ? false : true}
                    >
                        add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
  )
}

export default PageGalleryTemplates