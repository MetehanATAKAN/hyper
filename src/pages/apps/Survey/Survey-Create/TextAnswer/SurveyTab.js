import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react'
import {Col, Form, Row } from 'react-bootstrap'
import { mdiText} from '@mdi/js';
import { useTranslation } from 'react-i18next';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import Warning from '../Warning';


const SurveyTab = () => {

    const { t } = useTranslation();

    const history = useHistory();

    const [question, setQuestion] = useState('');
    const questionNumber = new URLSearchParams(window.location.search).get('number');

    const [modalShow, setModalShow] = useState(false);

    const [isWarning, setIsWarning] = useState(false);

    const [warningMessages, setWarningMessages] = useState('');

    const surveyId = new URLSearchParams(window.location.search).get('surveyId');
    const createdBy = localStorage.getItem('userName');

    const questionId = useSelector(state => state.Survey.surveyQuestionId);

    const isSaveOrUpdate = useSelector(state => state.Survey.saveOrUpdate);


    const [isRateQuestion, setIsRateQuestion] = useState(false);
    const [isAddComment, setIsAddComment] = useState(false);
    const [addCommentValue, setAddCommentValue] = useState('');

    const [answers, setAnswers] = useState([
        {
            id: 0,
            value: '',
            active: true,
            isCheck: false,
            delete: false,
            point:0
        },
        {
            id: 1,
            value: '',
            active: true,
            isCheck: false,
            delete: false,
            point:0
        },
        {
            id: 2,
            value: '',
            active: true,
            isCheck: false,
            delete: false,
            point:0
        },
        {
            id: 3,
            value: '',
            active: true,
            isCheck: false,
            delete: false,
            point:0
        },
        {
            id: 4,
            value: '',
            active: true,
            isCheck: false,
            delete: true,
            point:0
        },
        {
            id: 5,
            value: '',
            active: true,
            isCheck: false,
            delete: true,
            point:0
        }
    ])
    console.log(answers);
    const checkControl = (id) => {
            console.log('check control');
            const newState = answers.map(obj => {
                if (obj.id === id) {
                     console.log('ikinci if');
                     console.log(obj.point);
                    return {
                        ...obj,point:obj.point+1
                    }
                }
    
                return obj;
            });

            return newState
    }

    const increaseAnswerPoint = async (id) => {
      
        const newState = answers.map( data => {
            if(data.id === id) {
                console.log('idler eşit');
                console.log(data.point);
                if(data.point<10 && data.point >=0) {
                    console.log('il if te');
                    data.point=data.point +1;
                    console.log(data.point);
                    if(data.point>0 && data.point<=10) {
                        console.log('ikinci if te');
                        data.isCheck =true
                    }
                }
            }
            return data
        })
        console.log(newState);
        setAnswers(newState)
    }

    const decreaseAnswerPoint = (id) => {
        const newState = answers.map( data => {
            if(data.id === id) {
                console.log('idler eşit');
                console.log(data.point);
                if(data.point<10 && data.point >=0) {
                    console.log('il if te');
                    data.point=data.point -1;
                    console.log(data.point);
                    if(data.point>0 && data.point<=10) {
                        console.log('ikinci if te');
                        data.isCheck = true;
                    }
                    else {
                        data.isCheck = false;
                    }
                }
            }
            return data
        })
        console.log(newState);
        setAnswers(newState)
    }

    const rateThisQuestion = () => {
        setIsRateQuestion(prev => !prev);
        
        setAnswers( prev => prev.map(data =>{
            return{
                ...data,isCheck:false
            }
        }))
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
        const body = {
            question: question,
            questionType: 3,
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
            id: questionId,
            question: question,
            questionType: 3,
            modifiedBy: createdBy,
            answer: answers.map(data => (
                {
                    answer: data.value,
                    answerRate: 0,
                    isCorrect: data.isCheck,
                    isDeleted: data.delete
                }
            ))
        }

        if(question !== '') {
            if(isSaveOrUpdate === 'update') {
                setModalShow(false);
                setIsWarning(false);
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
                setModalShow(false);
                setIsWarning(false);
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
            setModalShow(true);

            setIsWarning(true);
            setWarningMessages('Plase enter question.')
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
                                    <Icon path={mdiText}
                                        size={0.8}
                                        color='#fb86b0'
                                    />
                                </span>
                                <input className='input-text question-input' defaultValue={question} type={'text'} onChange={(e) => setQuestion(e.target.value)} />
                            </div>

                        </div>
                    </div>

                    <div className='save-button'>
                    <button onClick={save}>{t('save')}</button>
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
                        </div>

                        <div className='add-comment-field preview-main'>
                            {/* <Form.Label>{t('answer required')}</Form.Label> */}
                            <Form.Control disabled onChange={(e) => setAddCommentValue(e.target.value)} as="textarea" rows={3} />

                            <div className='text-center submit-button'>
                                <button disabled>
                                    {t('submit')}
                                </button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        </div>
        {
                isWarning &&
                <Warning modalShow={modalShow} setModalShow={setModalShow} alert={warningMessages} />
            }
        </div>
    )
}

export default SurveyTab