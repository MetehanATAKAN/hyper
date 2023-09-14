import React, { useState } from 'react';
import { Card, Divider, Spin } from 'antd';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import Survey from './Survey';
import { FetchApiGet } from '../../../../utils/http.helper';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiOpenInNew } from '@mdi/js';
import { Button } from 'react-bootstrap';
const DetailCard = ({ handle, item, type, openSurvey, color }) => {
    const bodyStyle = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: 0,
    };
    return (
        <Card className="survey-cards" bodyStyle={bodyStyle}>
            <div className="card-left-container">
                <div className="survey-status" style={{ backgroundColor: color }}>
                    {type}
                </div>
                <div className="survey-name"> {item.survey.surveyName} </div>
                <div className="survey-category-name">{item.survey.category.categoryName}</div>
                <div className="survey-date">
                    <span>start date: {moment(item.startDate).format('DD MMM YYYY')}</span>
                    <Divider className="survey-divider" type="vertical" />
                    <span>
                        end: <span style={{ color: '#FA5C7C' }}>{moment(item.endDate).format('DD MMM YYYY')}</span>{' '}
                    </span>
                </div>
            </div>
            <div className="card-right-container">
                {type === 'open' && (
                    <div className="statistic-box">
                        <span className="number">
                            <Button
                                variant="light"
                                style={{ padding: '5px', marginLeft: '5px' }}
                                id={item.survey.id}
                                onClick={(e) => openSurvey(Number(e.target.id), item.estimatedMunite)}>
                                <i id={item.survey.id} className="fas fa-external-link-alt"></i>
                            </Button>
                        </span>
                        <span className="title">open survey</span>
                    </div>
                )}
                <Divider style={{ height: '65px', marginLeft: '25px', marginRight: '25px' }} type="vertical" />
                <div className="statistic-box">
                    <span className="number">{item.survey.questionIds.length}</span>
                    <span className="title">question</span>
                </div>
                <Divider style={{ height: '65px', marginLeft: '25px', marginRight: '25px' }} type="vertical" />
                <div className="statistic-box">
                    <span className="number">{item.trueAnswer}</span>
                    <span className="title">answer</span>
                </div>
                <Divider style={{ height: '65px', marginLeft: '25px', marginRight: '25px' }} type="vertical" />
                <div className="statistic-box">
                    <span className="number">{item.estimatedMunite}m</span>
                    <span className="title">estimated time</span>
                </div>
                <Divider style={{ height: '65px', marginLeft: '25px', marginRight: '25px' }} type="vertical" />
                <div className="statistic-box">
                    <span className="number">{item.spendingTime}m</span>
                    <span className="title">spending time</span>
                </div>
                <Divider style={{ height: '65px', marginLeft: '25px', marginRight: '25px' }} type="vertical" />
                <div className="statistic-box">
                    <span className="number">{item.point}</span>
                    <span className="title">point</span>
                </div>
            </div>
        </Card>
    );
};
const SurveysCard = ({ data, getAllBoard }) => {
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [estimated, setEstimated] = useState(0);
    const [surveyId, setSurveyId] = useState(0);
    const handle = useFullScreenHandle();
    const openSurvey = (id, estimatedMunite) => {
        setEstimated(estimatedMunite);
        setSurveyId(id);
        handle.enter();
        setLoader(true);
        FetchApiGet(`services/SurveySystem/Survey/GetQuestionsBySurveyId?id=${id}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setLoader(false);
                    setQuestions(data);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    return (
        <>
            <div style={{ overflowY: 'auto' }}>
                {data.waiting?.map((obj, i) => (
                    <DetailCard
                        key={i}
                        handle={handle}
                        item={obj}
                        type="waiting"
                        openSurvey={() => {}}
                        color="#FF679B"
                    />
                ))}
                {data.open?.map((obj, i) => (
                    <DetailCard
                        key={i}
                        handle={handle}
                        item={obj}
                        type="open"
                        openSurvey={openSurvey}
                        color="#FFBC00"
                    />
                ))}
                {data.completed?.map((obj, i) => (
                    <DetailCard
                        key={i}
                        handle={handle}
                        item={obj}
                        type="completed"
                        openSurvey={() => {}}
                        color="#0ACF97"
                    />
                ))}
            </div>

            <FullScreen className="fullscreen-survey" handle={handle}>
                {handle.active && (
                    <Spin size="large" spinning={loader}>
                        <Survey
                            getAllBoard={getAllBoard}
                            data={questions}
                            handle={handle}
                            estimated={estimated}
                            surveyId={surveyId}
                        />
                    </Spin>
                )}
            </FullScreen>
        </>
    );
};

export default SurveysCard;
