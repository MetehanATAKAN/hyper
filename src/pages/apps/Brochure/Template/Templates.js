import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import { RibbonContainer, LeftCornerRibbon } from 'react-ribbons';
import { Link, useHistory } from 'react-router-dom';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';

import { MultiSelectLabels } from '../../../forms/Basic';
import { mdiStar, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useSelector } from 'react-redux';

const Templates = () => {
    const history = useHistory();

    const activeTemplateId = useSelector((state) => state.ActivityLimit.pageDesignTemplateId);
    const [newTemplateName, setNewTemplateName] = useState('');
    const [stars] = useState([1, 1, 1, 1, 1]);

    // New Template Modal
    const [modal, setModal] = useState(false);
    const [productsOptions, setProductsOptions] = useState([]);

    const [selectProductOptions, setSelectProductOptions] = useState([]);

    const toggle = () => {
        setModal(!modal);
    };

    const [templates, setTemplates] = useState([
        // {
        //     id: 1,
        //     cornerText: 'New',
        //     cornerColor: '#f44336',
        //     title: 'Brochure',
        //     src: 'https://cdn.templates.unlayer.com/previews/google-review/1623104795757.png'
        // },
        // {
        //     id: 2,
        //     cornerText: null,
        //     cornerColor: null,
        //     title: 'Brochure',
        //     src: 'https://cdn.templates.unlayer.com/previews/fathers-day-gift-card/1664367176979.png'
        // },
        // {
        //     id: 3,
        //     cornerText: null,
        //     cornerColor: null,
        //     title: 'Brochure',
        //     src: 'https://cdn.templates.unlayer.com/previews/holiday-gift-card/1663737698228.png'
        // },
        // {
        //     id: 4,
        //     cornerText: 'Premium',
        //     cornerColor: '#0088ff',
        //     title: 'Brochure',
        //     src: 'https://cdn.templates.unlayer.com/previews/fathers-day-gift-card/1664367176979.png'
        // },
        // {
        //     id: 5,
        //     cornerText: null,
        //     cornerColor: null,
        //     title: 'Brochure',
        //     src: 'https://cdn.templates.unlayer.com/previews/biggest-mistake/1664369095362.png'
        // }
        // ,
        // {
        //     id: 6,
        //     cornerText: null,
        //     cornerColor: null,
        //     title: 'Brochure',
        //     src: 'https://cdn.templates.unlayer.com/previews/childrens-book/1617448650069.png'
        // }
    ]);

    const newTemlateModal = () => {
        FetchApiGet('services/Pages/Page/GetGlobalBrandList', 'GET')
            .then((response) => response.json())
            .then((response) =>
                setProductsOptions(
                    response.data.map((data) => ({
                        value: data.globalBrandId,
                        label: data.globalBrandName,
                        abb: data.globalBrandAbb,
                    }))
                )
            )
            .catch((error) => console.log(error));
        setModal(true);
    };

    const saveNewTemplate = () => {
        const body = {
            Name: newTemplateName,
            Products: selectProductOptions.map((data) => {
                return {
                    ProductId: data.value,
                    ProductName: data.label,
                };
            }),
            CreatedBy: localStorage.getItem('userName'),
        };
        FetchApiPost('services/Pages/Page/SaveDesignPageLabel', 'POST', body).then((res) =>
            (async () => {
                try {
                    if (res.status === 201) {
                        res.json().then((data) => {
                            return history.push({
                                pathname: '/apps/brochure/template/design',
                                search: `?id=${data.data.id}&name=templates`,
                                // hash: "#react",
                                // state: { fromPopup: true }
                            });
                        });
                    } else {
                        console.log('hata');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    };

    useEffect(() => {
        FetchApiGet(
            activeTemplateId === 1
                ? 'services/Pages/Page/GetAllDesignPage'
                : 'services/Pages/Page/GetAllArchiveDesignPage',
            'GET'
        )
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then((item) => {
                                return setTemplates(
                                    item.data.map((data) => ({
                                        id: data.id,
                                        isApproved: data.isApproved,
                                        name: data.name,
                                        cornerText:
                                            data.isApproved === 1
                                                ? 'editing'
                                                : data.isApproved === 2
                                                ? 'send to approval'
                                                : data.isApproved === 3
                                                ? 'approved'
                                                : data.isApproved === 4
                                                ? 'reject'
                                                : data.isApproved === 5
                                                ? 'archive'
                                                : null,
                                        cornerColor:
                                            data.isApproved === 1
                                                ? '#e5e5e5'
                                                : data.isApproved === 2
                                                ? 'rgb(255, 255, 136)'
                                                : data.isApproved === 3
                                                ? 'green'
                                                : data.isApproved === 4
                                                ? 'red'
                                                : data.isApproved === 5
                                                ? 'rgb(77, 28, 28)'
                                                : null,
                                        title: 'Brochure',
                                        src: data.imageFile,
                                    }))
                                );
                            });
                        } else if (res.status === 500) {
                            history.push('/error-500');
                        } else {
                            console.log('hata');
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
            .catch((error) => console.log(error));
    }, [activeTemplateId, history]);

    return (
        <div className="brochure-templates">
            <Masonry className="gallery" elementType={'ul'}>
                <>
                    {activeTemplateId === 1 ? (
                        <li className="new-template-box imgContainer">
                            <div className="new-template-box__container">
                                <Icon path={mdiPlus} title="Plus" size={1} color="#7A7A7A" />
                                <Button onClick={newTemlateModal}>
                                    <span>new template</span>
                                </Button>
                            </div>
                        </li>
                    ) : null}
                    {templates.map((img, i) => (
                        <>
                            <RibbonContainer
                                className={`imgContainer
                                     ${
                                         img.isApproved === 1
                                             ? 'editing'
                                             : img.isApproved === 2
                                             ? 'send-to-approval'
                                             : img.isApproved === 3
                                             ? 'approved'
                                             : img.isApproved === 4
                                             ? 'reject'
                                             : img.isApproved === 5
                                             ? 'archive'
                                             : null
                                     }`}
                                style={{ maxHeight: '300px' }}>
                                <LeftCornerRibbon
                                    backgroundColor={img.cornerColor}
                                    color="rgb(255, 255, 228)"
                                    fontFamily="Arial"
                                    zIndex="9999">
                                    {img.cornerText}
                                </LeftCornerRibbon>
                                <Link to={`/apps/brochure/template/design/${img.id}`}>
                                    <img src={img.src} alt={img.title} />
                                </Link>
                                <div className="template-card-hover">
                                    <div className="template-card-hover-item-main">
                                        <div className="items">
                                            <div className="stars">
                                                {stars.map((star) => (
                                                    <Icon path={mdiStar} title="Start" size={1} color="#969696" />
                                                ))}
                                            </div>
                                            <span className="template-name"> {img.name} </span>

                                            <Link
                                                to={{
                                                    pathname: `/apps/brochure/template/details`,
                                                    search: `?id=${img.id}&name=templates`,
                                                    hash: '#the-hash',
                                                    state: { Details: true },
                                                }}>
                                                <Button className="btn-primary">see details</Button>
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
                    ))}
                </>
            </Masonry>

            <Modal show={modal} onHide={toggle} size={'md'}>
                <Modal.Header onHide={toggle} closeButton style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                    <h4
                        className="modal-title"
                        style={{
                            color: '#7A7A7A',
                            font: '18px',
                        }}>
                        New Template
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <label> name </label>
                    <input
                        className="mb-2"
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
                    <div className="mb-3">
                        <MultiSelectLabels
                            options={productsOptions}
                            change={(e) => setSelectProductOptions(e)}
                            headerName={'recommended products'}
                            value={selectProductOptions}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#F2F2F2' }}>
                    <Button
                        className="btn-light"
                        style={{ backgroundColor: '#EBEBEB' }}
                        onClick={() => setModal(false)}>
                        cancel
                    </Button>
                    <Button
                        className="btn-primary"
                        onClick={saveNewTemplate}
                        disabled={newTemplateName !== '' ? false : true}>
                        add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Templates;
