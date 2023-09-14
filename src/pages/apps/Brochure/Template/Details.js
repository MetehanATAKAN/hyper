import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { mdiStar, mdiContentSave, mdiDelete, mdiContentCopy, mdiSquareEditOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { Link, useHistory } from 'react-router-dom';
import Select from 'react-select';
import { MultiSelectLabels } from '../../../forms/Basic';
import DeleteModal from './DeleteModal';
import CopyModal from './CopyModal';
import { useTranslation } from 'react-i18next';

const Details = () => {
    const history = useHistory();

    const { t } = useTranslation();

    // New Template Modal
    const [modal, setModal] = useState(false);
    const [productsOptions, setProductsOptions] = useState([]);

    const [selectProductOptions, setSelectProductOptions] = useState([]);
    const [newTemplateName, setNewTemplateName] = useState('');

    const toggle = () => {
        setModal(!modal);
    };

    const [stars] = useState([1, 2, 3, 4, 5]);

    //Copy Modal
    const [copyModalShow, setCopyModalShow] = useState(false);

    //Delete Modal
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [deleteModalErrorShow, setDeleteModalErrorShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [detailsInfo, setDetailsInfo] = useState();

    const [status] = useState([
        {
            value: 1,
            label: 'editing',
        },
        {
            value: 2,
            label: 'send to approval',
        },
        {
            value: 3,
            label: 'approved',
        },
        {
            value: 4,
            label: 'reject',
        },
        {
            value: 5,
            label: 'archive',
        },
    ]);

    const [selectStatus, setSelectStatus] = useState('');
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

    // Update Template
    const updateNewTemplate = () => {
        let id = Number(new URLSearchParams(window.location.search).get('id'));

        const updateBody = {
            Id: id,
            Name: newTemplateName,
            Products: selectProductOptions.map((data) => {
                return {
                    ProductId: data.value,
                    ProductName: data.label,
                };
            }),
        };
        FetchApiPost('services/Pages/Page/UpdateDesignPageLabel', 'POST', updateBody).then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            return (
                                setModal(false),
                                setTimeout(() => {
                                    history.push('/apps/brochure/template');
                                }, 1000)
                            );
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

    // Save Details
    const handleSaveDetails = () => {
        let id = Number(new URLSearchParams(window.location.search).get('id'));
        const saveBody = {
            Id: id,
            IsApproved: selectStatus.value,
        };

        FetchApiPost('services/Pages/Page/UpdateDesignPageDetailsChangesLabel ', 'POST', saveBody);
    };

    // Delete Template
    const handleDelete = () => {
        const deleteBody = {
            Id: Number(new URLSearchParams(window.location.search).get('id')),
        };

        FetchApiPost('services/Pages/Page/DeleteDesignPageAndLabel', 'POST', deleteBody).then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            return setDeleteModalShow(false), history.push('/apps/brochure/template');
                        });
                    } 
                    else if( res.status === 409) {
                      res.json().then(data => {
                        setErrorMessage(data.errors[0]);
                        setDeleteModalShow(false);
                        setDeleteModalErrorShow(true);
                      })
                    }
                    else {
                        console.log('hata');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    };

    //Copy Template

    const handleCopy = () => {
        FetchApiGet(
            `services/Pages/Page/CopyDesignPageAndDetailsById?id=${Number(
                new URLSearchParams(window.location.search).get('id')
            )}`,
            'GET'
        ).then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            return setCopyModalShow(false), history.push('/apps/brochure/template');
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
        let urlParams = new URLSearchParams(window.location.search);
        let id = urlParams.get('id');

        FetchApiGet(`services/Pages/Page/GetDesignPageDetailsById?id=${id}`, 'GET').then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then((item) => {
                            return (
                                setDetailsInfo(item.data),
                                setSelectProductOptions(
                                    item.data.products.map((data) => ({
                                        value: data.productId,
                                        label: data.productName,
                                    }))
                                ),
                                setSelectStatus({
                                    value: item.data.isApproved,
                                    label: item.data.status,
                                })
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
        );
    }, [history]);

    return (
        <div className="template-details">
            <div className="text-end p-2 header">
                <Link to={'/apps/brochure/template'}>
                    <Button className="btn-primary back-template">{t('back to template')}</Button>
                </Link>
            </div>
            <Row style={{ margin: '24px 1px 24px 1px' }}>
                <Col lg={5} style={{ border: '1px solid #CDCDCD' }}>
                    <img src={detailsInfo?.imagePath} alt="template-img" width={'100%'} />
                </Col>
                <Col lg={7}>
                    <div style={{ marginLeft: '36px' }}>
                        <h1 style={{ backgroundColor: 'transparent', color: '#7A7A7A', padding: '0 20px 0 0' }}>
                            {detailsInfo?.name}
                        </h1>

                        <Button
                            className="btn-light goto-editing-page"
                            disabled={selectStatus?.value !== 1 ? true : false}>
                            <Link
                                to={{
                                    pathname: `/apps/brochure/template/design`,
                                    search: `?id=${new URLSearchParams(window.location.search).get(
                                        'id'
                                    )}&name=${new URLSearchParams(window.location.search).get('name')}`,
                                    hash: '#the-hash',
                                    state: { DesignTemplate: true },
                                }}>
                                <span>{t('go to editing page')}</span>
                            </Link>
                        </Button>

                        <div className="info-block-div">
                            <div className="info-block">
                                <h4 className="info-title">{t('Status')}:</h4>
                                <div className="info-body select-status">
                                    <Select
                                        isMulti={false}
                                        options={status}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        placeholder="Select..."
                                        onChange={(e) => setSelectStatus(e)}
                                        value={selectStatus}
                                    />
                                </div>
                            </div>

                            <div className="info-block">
                                <h4 className="info-title">{t('Rating')}:</h4>
                                <div className="info-body">
                                    {stars.map((star) => (
                                        <Icon path={mdiStar} size={1} color="#7A7A7A" key={star} />
                                    ))}
                                </div>
                            </div>

                            <div className="info-block">
                                <h4 className="info-title">{t('Recommended products')}:</h4>
                                <div className="info-body">
                                    {detailsInfo?.products?.map((data) => (
                                        <span key={data.productId} className="recommended">
                                            {data.productName}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="info-block">
                                <h4 className="info-title">{t('Create date')}:</h4>
                                <div className="info-body">
                                    <span>{detailsInfo?.createdDate?.slice(0, 10)}</span>
                                </div>
                            </div>

                            <div className="info-block">
                                <h4 className="info-title">{t('Creator')}:</h4>
                                <div className="info-body">
                                    <span>{detailsInfo?.createdBy}</span>
                                </div>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <Button
                                className="edit"
                                onClick={newTemlateModal}
                                disabled={selectStatus.value !== 1 ? true : false}>
                                <Icon path={mdiSquareEditOutline} size={1} color="#7A7A7A" />
                            </Button>

                            <Button className="save" onClick={handleSaveDetails}>
                                <Icon path={mdiContentSave} size={1} color="#00A0DF" />
                            </Button>

                            <Button
                                className="copy"
                                onClick={() => setCopyModalShow(true)}
                                disabled={selectStatus.value === 4 || selectStatus.value === 5 ? true : false}>
                                <Icon path={mdiContentCopy} size={1} color="#FFBC00" />
                            </Button>

                            <Button
                                className="delete"
                                onClick={() => setDeleteModalShow(true)}
                                disabled={selectStatus.value === 2 || selectStatus.value === 3 ? true : false}>
                                <Icon path={mdiDelete} size={1} color="#FA5C7C" />
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>

            <Modal show={modal} onHide={toggle} size={'md'}>
                <Modal.Header onHide={toggle} closeButton style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                    <h4
                        className="modal-title"
                        style={{
                            color: '#7A7A7A',
                            font: '18px',
                        }}>
                        {t('Edit Template')}
                    </h4>
                </Modal.Header>
                <Modal.Body>
                    <label> {t('name')} </label>
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
                        defaultValue={detailsInfo?.name}
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
                        {t('cancel')}
                    </Button>
                    <Button
                        className="btn-primary"
                        onClick={updateNewTemplate}
                        disabled={newTemplateName !== '' ? false : true}>
                        {t('edit')}
                    </Button>
                </Modal.Footer>
            </Modal>

        {deleteModalShow === true ? (
          <DeleteModal
            modalShow={deleteModalShow}
            setModalShow={setDeleteModalShow}
            handleDelete={handleDelete}
            messages={'Are you sure you want to delete this template?'}
          />
        ) : null}

        {deleteModalErrorShow === true ? (
          <DeleteModal
            modalShow={deleteModalErrorShow}
            setModalShow={setDeleteModalErrorShow}
            isButton={false}
            messages={errorMessage}
          />
        ) : null}

        {copyModalShow === true ? (
          <CopyModal modalShow={copyModalShow} setModalShow={setCopyModalShow} handleCopy={handleCopy} />
        ) : null}
        </div>
    );
};

export default Details;
