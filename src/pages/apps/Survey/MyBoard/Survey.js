import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { Button } from 'react-bootstrap';
import Questions from './Questions';
import CounterTime from './Counter';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router';
const Intro = ({ header, btnContent, handleBtn }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <h3 style={{ color: '#6C757D' }}> {header} </h3>
            <Button variant="success" onClick={handleBtn}>
                {btnContent}
            </Button>
        </div>
    );
};
const Survey = ({ data, handle, estimated, surveyId, getAllBoard }) => {
    const history = useHistory();
    const [currentQuestions, setCurrentQuestions] = useState(0);
    const [intro, setIntro] = useState(true);
    const [outro, setOutro] = useState(false);
    const [questionData, setQuestionData] = useState([]);
    const empId = localStorage.getItem('userEmpId');
    const handleNextQuestion = () => {
        if (currentQuestions === data.length - 1) return;
        const nextQuestions = currentQuestions + 1;
        setCurrentQuestions(nextQuestions);
    };
    const handlePrevQuestion = () => {
        if (currentQuestions === 0) return;
        const nextQuestions = currentQuestions - 1;
        setCurrentQuestions(nextQuestions);
    };
    const handleIntro = () => {
        setIntro(!intro);
    };
    const handleOutro = () => {
        setOutro(!outro);
    };
    useEffect(() => {
        const newArr = data?.map((obj, i) => ({
            ...obj,
            answer: obj.answer.map((el) => ({ ...el, isCheck: false })),
        }));
        setQuestionData(newArr);
    }, [data, surveyId]);
    const [spendingTime, setSpendingTime] = useState(0);
    useEffect(() => {
        if (outro === false) return;
        const data = {
            userId: Number(empId),
            surveyId: surveyId,
            questions: questionData?.map((el) => ({
                questionId: el.id,
                answers:
                    el.questionType === 3
                        ? [{ answerId: 0, answer: el.answer[0] }]
                        : el.answer
                              ?.filter((obj) => obj.isCheck === true)
                              .map((x) => ({
                                  answerId: x.id,
                              })),
            })),
            spendingTime: estimated - spendingTime <= 0 ? spendingTime : estimated - spendingTime,
        };
        FetchApiPost('services/SurveySystem/Survey/SaveUserAnswers', 'POST', data)
            .then((res) => {
                if (res.status === 201) {
                    getAllBoard();
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            })
            .catch((err) => console.log(err));
    }, [outro]);
    return (
        <>
            {intro === false && outro === false && (
                <CounterTime
                    initialMinutes={estimated}
                    setOutro={setOutro}
                    currentQuestions={currentQuestions}
                    totalQuestion={data.length}
                    setSpendingTime={setSpendingTime}
                />
            )}
            <div className="survey-full-container">
                {intro === true && outro === false && (
                    <div style={{ position: 'relative', top: '35%' }}>
                        <Intro
                            handleBtn={handleIntro}
                            header="Welcome Grand Medical Group Survey"
                            btnContent="start survey"
                        />
                        <div style={{ marginTop: '16px' }}>
                            If you close the survey before it is finished, your answers will not be saved!!!
                        </div>
                    </div>
                )}
                {intro === false && outro === false && (
                    <>
                        <Questions data={questionData} setData={setQuestionData} currentQuestions={currentQuestions} />
                        <div className="survey-buttons">
                            <Icon
                                onClick={handlePrevQuestion}
                                path={mdiChevronLeft}
                                style={{ cursor: 'pointer' }}
                                title="previous"
                                size={1.25}
                            />
                            {currentQuestions === data.length - 1 ? (
                                <Button className="finish-survey" onClick={handleOutro} variant="success">
                                    Finish
                                </Button>
                            ) : (
                                <>
                                    <Icon
                                        onClick={handleNextQuestion}
                                        path={mdiChevronRight}
                                        style={{ cursor: 'pointer' }}
                                        title="next"
                                        size={1.25}
                                    />
                                </>
                            )}
                        </div>
                    </>
                )}
                {outro && (
                    <Intro
                        header="Thank you for completed the survey"
                        btnContent="close survey"
                        handleBtn={handle.exit}
                    />
                )}
            </div>
        </>
    );
};

export default Survey;
