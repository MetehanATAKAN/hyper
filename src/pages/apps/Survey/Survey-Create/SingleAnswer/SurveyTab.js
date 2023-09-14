import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { mdiCheckCircleOutline, mdiCheckboxBlankCircleOutline, mdiMinusCircleOutline,mdiPlus } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import {  FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import Warning from '../Warning';
import { useSelector } from 'react-redux';

const SurveyTab = () => {

    const { t } = useTranslation();
    const history = useHistory();

    const surveyId = new URLSearchParams(window.location.search).get('surveyId');
    console.log('surveyId',surveyId);

    const questionNumber = new URLSearchParams(window.location.search).get('number');
    const [modalShow, setModalShow] = useState(false);
    const questionId = useSelector(state => state.Survey.surveyQuestionId);
    const isSaveOrUpdate = useSelector(state => state.Survey.saveOrUpdate);


    const [question, setQuestion] = useState('');
    // const [questionNumber, setQuestionNumber] = useState(1);

    const createdBy = localStorage.getItem('userName');

    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isWarning, setIsWarning] = useState(false);

    const [warningMessages, setWarningMessages] = useState('');
    
    console.log(isSaveDisabled);
    console.log(isWarning);
    const [answers, setAnswers] = useState([
        {
            id: 0,
            value: '',
            active: true,
            isCheck: false,
            delete: false,
        },
        {
            id: 1,
            value: '',
            active: true,
            isCheck: false,
            delete: false,
        },
        {
            id: 2,
            value: '',
            active: true,
            isCheck: false,
            delete: false,
        },
        {
            id: 3,
            value: '',
            active: true,
            isCheck: false,
            delete: false,
        },
        {
            id: 4,
            value: '',
            active: true,
            isCheck: false,
            delete: true,
        },
        {
            id: 5,
            value: '',
            active: true,
            isCheck: false,
            delete: true,
        }
    ])

    const changeInputValue = (id, e) => {

        const newState = answers.map(obj => {
            if (obj.id === id) {
                return { ...obj, value: e.target.value };
            }

            return obj;
        });

        setAnswers(newState);
    }

    const selectTrueAnswer = (id) => {
        setIsSaveDisabled(false);
        const newState = answers.map(obj => {
            if (obj.id === id && obj.value !== '') {
                 return {
                    ...obj,isCheck:true
                 }
            }

            else {
                return {...obj, isCheck:false}
            }

           
        });
        setAnswers(newState);
    }

    console.log(answers);
    const deleteAnswer = (id) => {
        console.log(id);
        let answerLength = answers.filter( data => data.delete === false) ;
    
        if(answerLength.length>2){
            const newState = answers.map(obj => {
                if (obj.id === id) {
                    return { ...obj, delete:true };
                }
    
                return obj;
            });
    
            setAnswers(newState);
        }
        else {
            console.log('2 den küçük uyarı ver');
        }
       
    }

    const addAnswer = () => {

        const answer = answers.find(data => data.delete === true);
        const newState = answers.map(obj => {
            if (obj.id === answer?.id) {
                return { ...obj, delete:false };
            }

            return obj;
        });

        setAnswers(newState);
    }

    const save = () => {


        let isNullAnswer = [];
        answers.forEach(data => {
            if(data.delete === false) {
                if(data.value === '') {
                    isNullAnswer.push(data)
                }
            }
        })

        console.log(isNullAnswer);
        if(isSaveDisabled === false && question !== '' && isNullAnswer.length === 0) {
            setIsWarning(false);
            setModalShow(false);
            const body = {
                question: question,
                questionType: 1,
                createdBy: createdBy,
                surveyId:Number(surveyId),
                answer: answers.map(data => (
                    {
                        answer: data.value,
                        answerRate: 0,
                        isCorrect: data.isCheck,
                        isDeleted:data.delete
                    }
                ))
            }

            const updateBody = {
                id : questionId,
                question: question,
                questionType: 1,
                modifiedBy: createdBy,
                answer: answers.map(data => (
                    {
                        answer: data.value,
                        answerRate: 0,
                        isCorrect: data.isCheck,
                        isDeleted:data.delete
                    }
                ))
            }
            if(isSaveOrUpdate === 'update') {
                FetchApiPost('services/SurveySystem/DesignSurvey/UpdateDesignSurvey','POST',updateBody)
                .then((res) =>
                              (async () => {
                                  try {
                                      if (res.status === 201) {
                                       setTimeout(() => {
                                        history.push(`/apps/survey-add-question?surveyId=${surveyId}`)
                                       }, 1500);
                                      }
                                      else if (res.status === 409) {
                                          history.push('/error-500');
                                      }
                                      else if (res.status === 500 || res.status === 499) {
                                          history.push('/error-500');
                                      }
                                      else {
                                          console.log('hata');
                                      }
              
                                  } catch (error) {
                                      console.log('error', error);
                                  }
                              })()
                          )
            }
            else {
                FetchApiPost('services/SurveySystem/DesignSurvey/CreateDesignSurvey','POST',body)
                .then((res) =>
                              (async () => {
                                  try {
                                      if (res.status === 201) {
                                        setTimeout(() => {
                                            history.push(`/apps/survey-add-question?surveyId=${surveyId}`)
                                           }, 1500);
                                      }
                                      else if (res.status === 409) {
                                          history.push('/error-500');
                                      }
                                      else if (res.status === 500 || res.status === 499) {
                                          history.push('/error-500');
                                      }
                                      else {
                                          console.log('hata');
                                      }
              
                                  } catch (error) {
                                      console.log('error', error);
                                  }
                              })()
                          )
            }
    
        }
        else {
            setIsWarning(true);
            if(question === '') {
                setWarningMessages('Plase enter question.');
            }
            else if(isSaveDisabled === true) {
                setWarningMessages('You did not mark the correct answer.')
            }
            else if(isNullAnswer.length !== 0) {
                setWarningMessages('Please fill in the answer fields.')
            }
            setModalShow(true);
        }

      
    }

    useEffect(() => {
        if(questionId !== null) {
            FetchApiGet(`services/SurveySystem/DesignSurvey/GetDesignSurveyById?id=${questionId}`,'GET')
            .then((res) =>
            (async () => {
                try {
                    if (res.status === 201) {
                       res.json().then( item => {
                          setAnswers(item?.data?.answer.map((data,index) => (
                              {
                                  id: index,
                                  value: data.answer,
                                  active: true,
                                  isCheck: data.isCorrect,
                                  delete: data.isDeleted,
                                  point:data.answerRate
                              }
                          )))
                          setQuestion(item.data.question)
                       }
                       )
                    }
                    else if (res.status === 409) {
                        history.push('/error-500');
                    }
                    else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    }
                    else {
                        console.log('hata');
                    }
      
                } catch (error) {
                    console.log('error', error);
                }
            })()
        )
        }
       
      }, [history, questionId])
  

    return (
        <div className='survey-create'>
        <div className='single-answer'>
        <div className='survey-tab'>

            <Row>

                <Col sm={5} className='selection question-selection' >
                    <div className='question-selection-main'>

                        <div className='question'>
                            <span className='question-answer-header'> {`Q${questionNumber} question`} </span>
                            <div className='icon-input'>
                                <span className='check'>
                                    <Icon path={mdiCheckCircleOutline}
                                        size={0.8}
                                        color='#3ad7aa'
                                    />
                                </span>
                                <input className='input-text question-input' defaultValue={question} type={'text'} onChange={(e) => setQuestion(e.target.value)} />
                            </div>

                        </div>


                        <div className='answer-choices'>
                            <span className='question-answer-header'>
                                {t('answer choices')}
                            </span>
                            {
                                answers.map((data,index) => (
                                    data.delete === false &&
                                    <div key={index} className='icon-input'>
                                        <span className='check' onClick={() => selectTrueAnswer(data.id)}>
                                            {
                                                data.isCheck === true
                                                    ? <Icon path={mdiCheckCircleOutline}
                                                        size={0.8}
                                                        color='#3ad7aa'
                                                    />
                                                    : <Icon path={mdiCheckboxBlankCircleOutline}
                                                        size={0.8}
                                                        color='#eaedf3'
                                                    />
                                            }

                                        </span>
                                        <input className='input-text' type={'text'} defaultValue={data.value} onChange={(e) => changeInputValue(data.id, e)} />

                                        <span className='minus-icon'>
                                        <Icon path={mdiMinusCircleOutline}
                                                        size={0.8}
                                                        color='#eaedf3'
                                                        onClick={ () => deleteAnswer(data.id)}
                                                    />
                                        </span>
                                    </div>
                                ))
                            }

                            <div className='add-answer'>
                                <span className='add-answer-icon'>
                                    <Icon path={mdiPlus}
                                        size={0.8}
                                        color='#6C757D'
                                    />
                                </span>
                                <span className='add-answer-text' onClick={addAnswer}> {t('add an answer choice')} </span>
                            </div>
                        </div>

                        <div className='rate-question'>

                        </div>

                    </div>

                    <div className='save-button'>
                    <button  onClick={save} >{t('save')}</button>
                    </div>
                </Col>

                <Col sm={7} className='selection preview-section' >

                    

                    <div className='preview-question-answer'>
                        <div className='preview-main'>
                    <div className='preview-question'>
                                        <div>
                                            {question}
                                        </div>
                    </div>
                    {
                                answers.map((data,index) => (
                                    data.delete === false &&
                                    <div className='preview-answer'>
                                        <div>
                                        <span className='check'>
                                            {
                                                data.isCheck === true
                                                    ? <Icon path={mdiCheckCircleOutline}
                                                        size={0.8}
                                                        color='#3ad7aa'
                                                    />
                                                    : <Icon path={mdiCheckboxBlankCircleOutline}
                                                        size={0.8}
                                                        color='#eaedf3'
                                                    />
                                            }

                                        </span>

                                        <span className='answer'>
                                        <input  disabled type={'text'} defaultValue={data.value}  />
                                        </span>
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                    </div>

                </Col>
            </Row>

            {
                isWarning &&
                <Warning modalShow={modalShow} setModalShow={setModalShow} alert={warningMessages} />
            }
        </div>
        </div>
        </div>
    )
}

export default SurveyTab