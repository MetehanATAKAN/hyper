import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../../../components/BreadCrumb';
import Statistics from './Statistics';
import SurveysCard from './SurveysCard';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';
const MyBoard = () => {
    const breadCrumbProps = [
        { label: 'Home', url: '/apps/calendar' },
        { label: 'Survey', url: '/apps/survey' },
        { label: 'My Board' },
    ];
    const history = useHistory();
    const userEmpId = localStorage.getItem('userEmpId');
    const [statisticData, setStatisticData] = useState([]);
    const [boardData, setBoardData] = useState([]);
    const [loader, setLoader] = useState(false);
    const { t } = useTranslation();
    const getAllBoard = () => {
        setLoader(true);
        FetchApiGet(`services/SurveySystem/Survey/GetSharedSurveysByUserId?id=${userEmpId}`, 'GET').then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setStatisticData([
                        {
                            name1: 'open',
                            num1: data.openSurveys,
                            name2: 'waiting',
                            num2: data.waitingSurveys,
                            name3: 'completed',
                            num3: data.completedSurveys,
                        },
                        {
                            name1: 'correct answer',
                            num1: data.correctAnswer,
                            name2: 'false answer',
                            num2: data.falseAnswer,
                            name3: 'non-evaluation',
                            num3: data.nonEvaluation,
                        },
                        {
                            name1: 'total rate',
                            num1: Number(data.totalRate).toFixed(2),
                            name2: 'avarage time',
                            num2: Number(data.avarageTime).toFixed(2) + 'm',
                            name3: 'total time',
                            num3: data.totalTime + 'm',
                        },
                    ]);
                    setBoardData({ waiting: data.waiting, open: data.open, completed: data.completed });
                });
                setLoader(false);
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };

    useEffect(() => {
        getAllBoard();
    }, [history, userEmpId]);
    return (
        <>
            <Spin size="large" spinning={loader}>
                <BreadCrumb breadCrumbProps={breadCrumbProps} />
                <Statistics data={statisticData} />
                {boardData.length === 0 ? (
                    <div style={{ position: 'relative', left: '45%', fontSize: '24px' }}>{t('No Survey')}</div>
                ) : (
                    <SurveysCard data={boardData} getAllBoard={getAllBoard} />
                )}
            </Spin>
        </>
    );
};

export default MyBoard;
