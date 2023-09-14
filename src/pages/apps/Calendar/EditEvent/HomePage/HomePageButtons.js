import React, { useState} from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    changePageNext,
    changeSplitPage,
    showSplitModal,
    showCompetitorModal,
    showObjectionModal,
} from '../../../../../redux/calendar/actions';
import { FetchApiPost } from '../../../../../utils/http.helper';
import CompetitorIcon from '../../../../../components/Icons/CompetitorIcon';
import PhyscoTypeIcon from '../../../../../components/Icons/PhyscoTypeIcon';

import GlobalFailModal from '../../../../../components/GlobalFailModal';


const HomePageButtons = (props) => {
    const { t } = useTranslation();
    const { setHandleButton, setShow, toggle, homePageUpdateButtonDisabled, setOnSubmitUpdateForm } = props; // props get homepage.js
    const eventData = useSelector((state) => state.Calendar.eventData);
    const eventBgColor = useSelector((state) => state.Calendar.eventBgColor);
    const calendarDate = useSelector((state) => state.Calendar);
    const appStatus = useSelector((state) => state.Calendar.appStatus);
    const dispatch = useDispatch();
    const eventDataId = eventData.id;
    // compare user and event date
    const userDate = new Date().toDateString();
    const userDate2 = new Date(userDate);
    const eventDate = String(calendarDate.eventData.start);
    const eventDay = eventDate.slice(0, 15);
    const eventDay2 = new Date(eventDay);

    const [onCliclFail, setOnClickFail] = useState(false);

    // REPORT
    const reportClick = (event) => {
        dispatch(changePageNext());
        const openedReportBody = { EventId: eventDataId };
        FetchApiPost('services/Daywork/EventReport/OpenedReport', 'PATCH', openedReportBody).catch((err) =>
            console.log(err)
        );
        setHandleButton(true);
    };
    const openSplit = () => {
        setShow(false);
        dispatch(showSplitModal(true));
        dispatch(changeSplitPage(1));
    };
    const openCompetitor = () => {
        setShow(false);
        dispatch(showCompetitorModal(true));
    };
    const openObjection = () => {
        setShow(false);
        dispatch(showObjectionModal(true));
    };
    const onRemoveEvent = () => {
        toggle();
    };
    return (
        <>
            {eventDay2.getTime() < userDate2.getTime() && (
                <Row className="px-2 pb-2 report-rds" style={{ marginRight: '48px', justifyContent: 'flex-end' }}>
                    {appStatus === 1 ? (
                        <>
                            {/* UPDATE */}
                            <Col xs={1} className="px-3 gap-btn">
                                <Button
                                    disabled={
                                        (appStatus === 1 && eventDay2.getTime() < userDate2.getTime()) ||
                                        userDate2.getTime() < eventDay2.getTime()
                                            ? homePageUpdateButtonDisabled
                                            : true
                                    }
                                    onClick={() => setOnSubmitUpdateForm(true)}
                                    variant="warning"
                                    type="submit"
                                    className="btn btn-success"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={t('UPDATE')}>
                                    <i className="fas fa-edit"></i>
                                </Button>
                            </Col>
                        </>
                    ) : (
                        <>
                            {/* // REPORT */}
                            <Col xs={1} className="px-3 gap-btn">
                                <Button
                                    variant="success"
                                    className="btn me-1"
                                    onClick={reportClick}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={t('REPORT')}>
                                    <i className="fas fa-list"></i>
                                </Button>
                            </Col>
                        </>
                    )}
                    {/* // SPLİT */}
                    <Col xs={1} className="px-3 gap-btn">
                        <Button
                            type="submit"
                            className="btn btn-purple"
                            onClick={openSplit}
                            data-toggle="tooltip"
                            data-placement="top"
                            title={t('SPLIT')}>
                            <i className="fas fa-divide"></i>
                        </Button>
                    </Col>
                    {/* PHYSCO TYPE */}
                    <Col xs={1} className="px-3 gap-btn">
                        <Button
                            type="submit"
                            variant="dark"
                            className="btn btn-primary"
                            data-toggle="tooltip"
                            data-placement="top"
                            title={t('PHYSCO TYPE')}
                            style={{ width: '45px', paddingLeft: '12px' }}>
                            <PhyscoTypeIcon />
                        </Button>
                    </Col>
                    {/* COMPETİTOR */}
                    <Col xs={1} className="px-3 gap-btn">
                        <Button
                            className="btn competitor-btn"
                            onClick={openCompetitor}
                            data-toggle="tooltip"
                            data-placement="top"
                            title={t('COMPETITOR')}
                            style={{ width: '45px', paddingLeft: '12px' }}>
                            <CompetitorIcon />
                        </Button>
                    </Col>
                    {/* OBJECTİON */}
                    <Col xs={1} className="px-3 gap-btn">
                        <Button
                            onClick={openObjection}
                            type="submit"
                            className="btn btn-objection"
                            data-toggle="tooltip"
                            data-placement="top"
                            title={t('OBJECTION')}>
                            <i className="fas fa-hand-paper"></i>
                        </Button>
                    </Col>
                </Row>
            )}
            {eventDay2.getTime() === userDate2.getTime() && (
                <Row className="px-2 pb-2 report-rds" style={{ marginRight: '48px', justifyContent: 'flex-end' }}>
                    {/* // REPORT */}
                    <Col xs={1} className="px-3 gap-btn">
                        <Button
                            variant="success"
                            className="btn me-1"
                            onClick={reportClick}
                            data-toggle="tooltip"
                            data-placement="top"
                            title={t('REPORT')}>
                            <i className="fas fa-list"></i>
                        </Button>
                    </Col>
                    {/* // SPLİT */}
                    <Col xs={1} className="px-3 gap-btn">
                        <Button
                            type="submit"
                            className="btn btn-purple"
                            onClick={openSplit}
                            data-toggle="tooltip"
                            data-placement="top"
                            title={t('SPLIT')}>
                            <i className="fas fa-divide"></i>
                        </Button>
                    </Col>
                    {appStatus === 4 ? (
                        <>
                            {/* PHYSCO TYPE */}
                            <Col xs={1} className="px-3 gap-btn">
                                <Button
                                    type="submit"
                                    variant="dark"
                                    className="btn btn-primary"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={t('PHYSCO TYPE')}
                                    style={{ width: '45px', paddingLeft: '12px' }}>
                                    <PhyscoTypeIcon />
                                </Button>
                            </Col>
                            {/* COMPETİTOR */}
                            <Col xs={1} className="px-3 gap-btn">
                                <Button
                                    className="btn competitor-btn"
                                    onClick={openCompetitor}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={t('COMPETITOR')}
                                    style={{ width: '45px', paddingLeft: '12px' }}>
                                    <CompetitorIcon />
                                </Button>
                            </Col>
                            {/* OBJECTİON */}
                            <Col xs={1} className="px-3 gap-btn">
                                <Button
                                    onClick={openObjection}
                                    type="submit"
                                    className="btn btn-objection"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={t('OBJECTION')}>
                                    <i className="fas fa-hand-paper"></i>
                                </Button>
                            </Col>
                        </>
                    ) : (
                        <>
                            {/* VİSİT */}
                            <Col xs={1} className="px-3 gap-btn">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="btn btn-primary"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={t('VISIT')}>
                                    <i className="fas fa-street-view"></i>
                                </Button>
                            </Col>
                            {/* FAİLED */}
                            <Col xs={1} className="px-3 gap-btn">
                                <Button
                                    variant="danger"
                                    type="submit"
                                    className="btn btn-success"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={t('FAILED')}
                                    onClick={() => setOnClickFail(true)}
                                    >
                                    <i className="fas fa-exclamation-circle"></i>
                                </Button>
                            </Col>
                        </>
                    )}
                </Row>
            )}
            {userDate2.getTime() < eventDay2.getTime() && (
                <Row className="px-2 pb-2 report-rds" style={{ marginRight: '48px', justifyContent: 'flex-end' }}>
                    {/* UPDATE */}
                    <Col xs={1} className="px-3 gap-btn">
                        <Button
                            disabled={
                                (appStatus === 1 && eventDay2.getTime() < userDate2.getTime()) ||
                                userDate2.getTime() < eventDay2.getTime()
                                    ? homePageUpdateButtonDisabled
                                    : true
                            }
                            variant="warning"
                            onClick={() => setOnSubmitUpdateForm(true)}
                            type="submit"
                            className="btn btn-success"
                            data-toggle="tooltip"
                            data-placement="top"
                            title={t('UPDATE')}>
                            <i className="fas fa-edit"></i>
                        </Button>
                    </Col>
                    {/* REMOVE */}
                    <Col xs={1} className="px-3 gap-btn">
                        <Button
                            variant="danger"
                            className="delete-btn"
                            onClick={onRemoveEvent}
                            data-toggle="tooltip"
                            data-placement="top"
                            title={t('REMOVE')}>
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </Col>
                </Row>
            )}
            {
                onCliclFail && (
                    <GlobalFailModal 
                        modalShow={onCliclFail}
                        setModalShow={setOnClickFail}
                    />
                )
            }
        </>
    );
};

export default React.memo(HomePageButtons);
