import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Form, Row } from 'react-bootstrap'
import { mdiCheckCircleOutline, mdiCheckboxBlankCircleOutline, mdiMinusCircleOutline,mdiPlus, mdiCheckboxOutline,mdiCheckboxBlankOutline   } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import Warning from '../Warning';
import { useSelector } from 'react-redux';

const SurveyTab = () => {

    const { t } = useTranslation();
    const history = useHistory();
    const createdBy = localStorage.getItem('userName');

    const surveyId = new URLSearchParams(window.location.search).get('surveyId');
    
    const questionNumber = new URLSearchParams(window.location.search).get('number');

    const questionId = useSelector(state => state.Survey.surveyQuestionId);
    
    const isSaveOrUpdate = useSelector(state => state.Survey.saveOrUpdate);

    const [modalShow, setModalShow] = useState(false);
    const [isWarning, setIsWarning] = useState(false);

    const [warningMessages, setWarningMessages] = useState('');

    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const [question, setQuestion] = useState('');

    const [isRateQuestion, setIsRateQuestion] = useState(true);
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
        // const newState = answers.map(obj => {
        //     if (obj.id === id) {
        //         if(obj.point <10 && obj.point>=0) {
        //             setAnswers(checkControl(id))
        //             if(obj.point+1>0 && obj.point+1<=10) {
        //                 console.log('içeri deee');
        //                 return{
        //                     ...obj,isCheck:true
        //                 }
        //             }
        //             // return { ...obj, point:obj.point+1 };
                    
        //         }
        //         else console.log('kural dışında');
        //     }

        //     return obj;
        // });

        // setAnswers(newState);

        const newState = answers.map( data => {
            if(data.id === id) {
                if(data.point<10 && data.point >=0) {
                    data.point=data.point +1;
                    if(data.point>0 && data.point<=10) {
                        data.isCheck =true
                        setIsSaveDisabled(false);
                    }
                }
            }
            return data
        })
        setAnswers(newState)
    }

    const decreaseAnswerPoint = (id) => {
        const newState = answers.map( data => {
            if(data.id === id) {

                if(data.point<10 && data.point >=0) {
                    data.point=data.point -1;

                    if(data.point>0 && data.point<=10) {
                        data.isCheck = true;
                        setIsSaveDisabled(false);
                    }
                    else {
                        data.isCheck = false;
                        setIsSaveDisabled(true);
                    }
                }
            }
            return data
        })
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
        if(isRateQuestion === false) {
            const newState = answers.map(obj => {
                if (obj.id === id) {
                     return {
                        ...obj,isCheck:!obj.isCheck
                     }
                }
    
                return obj;
            });
            setAnswers(newState);
        }
    }

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
                questionType: 2,
                createdBy: createdBy,
                surveyId:Number(surveyId),
                answer: answers.map(data => (
                    {
                        answer: data.value,
                        answerRate: data.point,
                        isCorrect: data.isCheck,
                        isDeleted:data.delete
                    }
                ))
            }

            const updateBody = {
                id : questionId,
                question: question,
                questionType: 2,
                modifiedBy: createdBy,
                answer: answers.map(data => (
                    {
                        answer: data.value,
                        answerRate: data.point,
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
                                    <Icon path={mdiCheckboxOutline}
                                        size={0.8}
                                        color='#99a1f6'
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
                                        <span className='check'>
                                            {
                                                data.isCheck === true
                                                    ? <Icon path={mdiCheckboxOutline}
                                                        size={0.8}
                                                        color='#99a1f6'
                                                    />
                                                    : <Icon path={mdiCheckboxBlankOutline}
                                                        size={0.8}
                                                        color='#eaedf3'
                                                    />
                                            }

                                        </span>
                                        <input className='input-text' type={'text'} defaultValue={data.value} onChange={(e) => changeInputValue(data.id, e)} />

                                    
                                           {
                                            isRateQuestion &&
                                            <>
                                             <ButtonGroup size='sm'>
                                                <Button className='decrease counter-button' onClick={()=>decreaseAnswerPoint(data.id)}>-</Button>
                                                <Button disabled className='counter'>{data.point}</Button>
                                                <Button className='increase counter-button' onClick={()=>increaseAnswerPoint(data.id)}>+</Button>
                                            </ButtonGroup>
                                            </>
                                           }

                                            <span className='minus-icon'>
                                                <Icon path={mdiMinusCircleOutline}
                                                    size={0.8}
                                                    color='#eaedf3'
                                                    onClick={() => deleteAnswer(data.id)}
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

                        <div className='rate'>
                            <div className='rate-question'>
                                <span className='rate-icon' onClick={() => setIsRateQuestion(prev => !prev)}>
                                {
                                        isRateQuestion === true
                                            ? <Icon path={mdiCheckboxOutline}
                                                size={0.8}
                                                color='#99a1f6'
                                            />
                                            : <Icon path={mdiCheckboxBlankOutline}
                                                size={0.8}
                                                color='#6C757D'
                                            />
                                    }
                                </span>
                                <span className='rate-text' onClick={rateThisQuestion}> {t('rate this question')} </span>
                            </div>
                        </div>

                        <div className='rate'>
                            <div className='rate-question'>
                                <span className='rate-icon' onClick={() => setIsAddComment(prev => !prev)}>
                                    {
                                        isAddComment === true
                                            ? <Icon path={mdiCheckboxOutline}
                                                size={0.8}
                                                color='#99a1f6'
                                            />
                                            : <Icon path={mdiCheckboxBlankOutline}
                                                size={0.8}
                                                color='#6C757D'
                                            />
                                    }
                                </span>
                                <span className='rate-text' onClick={() => setIsAddComment(prev => !prev)}> {t('add comment field')} </span>
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
                    {
                                answers.map((data,index) => (
                                    data.delete === false &&
                                    <div className='preview-answer' key={index}>
                                        <div>
                                        <span className='check'>
                                            {
                                                data.isCheck === true
                                                ? <Icon path={mdiCheckboxOutline}
                                                size={0.8}
                                                color='#99a1f6'
                                            />
                                            : <Icon path={mdiCheckboxBlankOutline}
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
                           {
                            isAddComment &&
                            <div className='add-comment-field preview-main'>
                            <Form.Label>{t('comment field')}</Form.Label>
                            <Form.Control onChange={(e)=>setAddCommentValue(e.target.value)} as="textarea" rows={3} />
                            </div>
                           }
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