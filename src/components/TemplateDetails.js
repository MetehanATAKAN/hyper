import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Rating } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import '../assets/scss/custom/components/templateDetails.scss';
import { FetchApiPost } from '../utils/http.helper';

const TemplateDetails = () => {
    const { t } = useTranslation();
    const [rating, setRating] = useState(5);
    const history = useHistory();
    const [modalShow, setModalShow] = useState(false);
    const [selectStatus, setSelectStatus] = useState({ id: 8, value: 'Select', label: 'Select' });
    const [page, setPage] = useState([]);
    const options = ['Editing', 'Send Approve', 'Approved', 'Reject', 'Archive'];
    const { id, token } = useParams('id');
    const customStyles = {
        control: (base) => ({
            ...base,
            height: 35,
            minHeight: 30,
            width: 8 * selectStatus.label.length + 45,
        }),
        menu: (base) => ({
            ...base,
            width: 'max-content',
            minWidth: '100%',
        }),
    };
    useEffect(() => {
        const data = {
            ContentId: Number(id),
            CountryId: Number(token),
        };
        FetchApiPost('services/Pages/ProductPage/GetContentPageById', 'POST', data)
            .then((res) => {
                if (res.status === 200) {
                    res.json().then((json) => setPage(json.data));
                } else if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                } else {
                    setPage([]);
                }
            })
            .catch((err) => console.log(err));
    }, [id, token]);
    const deleteNeed = () => {
        const deletedData = {
            contentId: page.contentId,
            countryId: page.countryId,
            modifiedBy: page.createdBy,
        };
        FetchApiPost('services/Pages/ProductPage/DeleteTemplateInContent', 'POST', deletedData).then((res) => {
            if (res.status === 200) {
                history.push('/apps/brochure/need');
                setModalShow(false);
            }
        });
    };
    console.log(page);
    return (
        <div className="template-container">
            {/* <div id="wrap">
                <iframe id="template-iframe" src={page.imageFile} title="html"></iframe>
            </div> */}
            <div>
                <img className="template-img" src={page.imageFile} alt="name" />
            </div>
            <div className="template-container__details">
                <h3 className="template-container__details__title">{page?.passportOfProductName}</h3>
                <div className="template-container__details__status">
                    <label>{t('Status')}: </label>
                    <span style={{ marginLeft: 10 }}>
                        {page?.isApprovedContent === 1
                            ? 'Editable'
                            : page?.isApprovedContent === 2
                            ? 'Approval'
                            : page?.isApprovedContent === 3
                            ? 'Approved'
                            : page?.isApprovedContent === 4
                            ? 'Reject'
                            : ''}
                    </span>
                    {/* <Select
                        isMulti={false}
                        isSearchable={false}
                        className="react-select select-status"
                        placeholder="select"
                        classNamePrefix="react-select"
                        onChange={(e) => setSelectStatus(e)}
                        value={selectStatus}
                        styles={customStyles}
                        options={options?.map((option, i) => ({
                            id: i,
                            value: option,
                            label: option,
                        }))}
                    /> */}
                </div>
                <div className="template-container__details__rating">
                    <label>{t('Rating')}:</label>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        className="rating"
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                </div>
                <div className="template-container__details__product">
                    <label style={{ marginRight: 10 }}>{t('Recommended products')}: </label>
                    <span className="product">{page?.productName}</span>
                </div>
                <div className="template-container__details__date">
                    <label>{t('Create date')}:</label>
                    <span style={{ marginLeft: 10 }}>{new Date(page?.createdDate).toLocaleDateString()}</span>
                </div>
                <div className="template-container__details__creator">
                    <label>{'Creator'}:</label>
                    <span style={{ marginLeft: 10 }}>{page?.createdBy}</span>
                </div>
                <div className="template-container__details__buttons">
                    <Button
                        className="action-btn"
                        disabled={page?.isApprovedContent !== 1 && true}
                        variant="outline-dark">
                        <Link
                            to={{
                                pathname: `/apps/brochure/template/design`,
                                search: `?id=${page.pageId}`,
                                hash: '#the-hash',
                                state: { DesignTemplate: true },
                            }}>
                            <i className="far fa-edit"></i>
                        </Link>
                    </Button>
                    <Button
                        disabled={page?.isApprovedContent !== 1 && true}
                        className="action-btn"
                        variant="outline-danger"
                        onClick={() => setModalShow(true)}>
                        <i className="fas fa-trash"></i>
                    </Button>
                </div>
            </div>
            <div className="alert-modal">
                <Modal
                    size="md"
                    centered
                    show={modalShow}
                    onHide={() => {
                        setModalShow(true);
                    }}
                    className="alert-modal">
                    <Modal.Body>
                        <div className="alert-modal-items">
                            <div className="alert-modal-icon" style={{ marginTop: '5px' }}>
                                <Icon path={mdiAlertCircleOutline} size={3} color="#FA5C7C" />
                            </div>
                            <div className="alert-modal-title" style={{ marginTop: '14px' }}>
                                <span style={{ color: '#6C757D' }}>{t('Are you sure ?')}</span>
                            </div>
                            <div className="alert-modal-question" style={{ marginTop: '25px' }}>
                                {t(
                                    `You CAN NOT view this ${page?.passportOfProductName} page in your list anymore if you delete.`
                                )}
                            </div>
                            <div className="alert-modal-buttons" style={{ marginTop: '50px' }}>
                                <button
                                    style={{
                                        color: '#fff',
                                        fontWeight: '600',
                                        width: '125px',
                                    }}
                                    className="delete"
                                    onClick={deleteNeed}>
                                    {t('Yes, delete it!')}
                                </button>
                                <button
                                    style={{
                                        backgroundColor: '#EEF2F7',
                                        color: '#6C757C',
                                        fontWeight: '600',
                                        width: '75px',
                                    }}
                                    className="cancel"
                                    onClick={() => setModalShow(false)}>
                                    {t('cancel')}
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default TemplateDetails;
