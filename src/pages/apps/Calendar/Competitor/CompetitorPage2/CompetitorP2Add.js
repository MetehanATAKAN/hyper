import React, { useEffect, useState } from 'react';
import { Button, Col, Modal } from 'react-bootstrap';
import { FetchApiPost } from '../../../../../utils/http.helper';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { competitorRoute } from '../../../../../config';

const CompetitorP2Add = (props) => {
    const { show, setShow, competitorProduct, setCompetitorProduct, competitorAddList, brandId, setCompetitorAddList } =
        props;
    const { t } = useTranslation();
    const [externalPage, setExternalPage] = useState(false);
    const [addCompetitorId, setAddCompetitorId] = useState(null);
    const [addCompetitorName, setAddCompetitorName] = useState(null);
    const [addbuttonShow, setAddButtonShow] = useState(true);
    const [selectCompetitor, setSelectCompetitor] = useState({
        id: 0,
        value: 'competitor',
        label: t('Select Competitor'),
    });
    const handleChange = (event) => {
        if (event.id !== 0) {
            setAddCompetitorId(event.id);
            setAddCompetitorName(event.value);
            setSelectCompetitor(event);
        }
        setAddButtonShow(false);
    };
    const handleClose = () => setShow(false);
    const addButton = () => {
        setShow(false);
        const checkCompetitor = competitorProduct.find((data) => data.CompetitorName === addCompetitorName)
            ? true
            : false;
        if (checkCompetitor === false && addCompetitorName !== null) {
            setCompetitorProduct((state) => [
                ...state,
                {
                    competitorBrandId: addCompetitorId,
                    competitorBrandName: addCompetitorName,
                    competitorBrandPercent: 1,
                    brandId: Number(brandId),
                },
            ]);
            const competitorAddData = {
                details: [
                    {
                        competitorBrandId: Number(addCompetitorId),
                        competitorBrandName: addCompetitorName,
                        competitorBrandPercent: 1,
                        brandId: Number(brandId),
                    },
                ],
            };
            setTimeout(() => {
                FetchApiPost('services/Daywork/EventReport/SaveCompetitorBrand', 'POST', competitorAddData);
                setAddButtonShow(true);
            }, 250);
            setTimeout(() => {
                setSelectCompetitor({
                    id: 0,
                    value: 'competitor',
                    label: t('Select Competitor'),
                });
            }, 300);
        }
    };

    useEffect(() => {
        const filteredList = competitorAddList.filter(
            (item) =>
                !competitorProduct.some(
                    (itemToBeRemoved) => itemToBeRemoved.competitorBrandId === item.competitorBrandId
                )
        );
        setCompetitorAddList(filteredList);
    }, [competitorProduct]);
   
    return (
        <>
            <Modal dialogClassName="competitor-modal" show={show} backdrop="static" onHide={handleClose} size="sm">
                <Modal.Body style={{ display: 'grid', placeItems: 'center' }}>
                    {externalPage === false && (
                        <Col xs={12} style={{ marginBottom: 10 }}>
                            <Select
                                isMulti={false}
                                className="react-select"
                                classNamePrefix="react-select"
                                options={competitorAddList.map((data) => ({
                                    id: data.competitorBrandId,
                                    value: data.competitorBrandName,
                                    label: data.competitorBrandName,
                                }))}
                                onChange={handleChange}
                                value={selectCompetitor}
                            />
                        </Col>
                    )}
                    {externalPage === true && <label>{t('Refresh the page to see the competitor you added')}</label>}
                </Modal.Body>
                <Modal.Footer>
                    {externalPage === true && (
                        <>
                            <Button variant="light" onClick={() => setExternalPage(false)}>
                                {t('Close')}
                            </Button>
                            <Button
                                variant="warning"
                                onClick={() => {
                                    setExternalPage(true);
                                    window.location.reload();
                                }}>
                                {t('Refresh')}
                            </Button>
                        </>
                    )}
                    {externalPage === false && (
                        <>
                            <Button variant="light" onClick={handleClose}>
                                {t('Close')}
                            </Button>
                            <Button variant="success" onClick={addButton} disabled={addbuttonShow}>
                                {t('Add Competitor')}
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default React.memo(CompetitorP2Add);
