import React, { useState } from 'react'
import { Col, Dropdown, DropdownButton, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import question from '../../../../assets/images/layouts/question.png'
import Icon from '@mdi/react'
import { mdiCheckCircleOutline, mdiCheckboxOutline, mdiText } from '@mdi/js'
import AllQuestion from './AllQuestion'
import { useDispatch } from 'react-redux'
import { saveOrUpdate } from '../../../../redux/actions'

const AddQuestion = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    
    const surveyId = new URLSearchParams(window.location.search).get('surveyId');
    console.log('surveyId',surveyId);

    const changePage = () => {
        dispatch(saveOrUpdate('save'));
    }
    return (
        <div className='add-questions'>
            <Row>
                <Col sm={5} className='question-section'>
                    <AllQuestion />
                    <DropdownButton id="dropdown-basic-button" title="add question">
                        <Dropdown.Item href={`/apps/survey-single-answer?surveyId=${surveyId}`} onClick={changePage} >
                            <span>
                                <Icon path={mdiCheckCircleOutline}
                                    size={1}
                                    color='#3ad7aa'
                                />
                            </span>
                            {t('Single answer selection')}
                        </Dropdown.Item>
                        <Dropdown.Item href={`/apps/survey-multi-answer?surveyId=${surveyId}`} onClick={changePage} >
                            <span>
                                <Icon path={mdiCheckboxOutline}
                                    size={1}
                                    color='#8189f5'
                                />
                            </span>
                            {t('Multiple answer selection')}
                        </Dropdown.Item>
                        <Dropdown.Item href={`/apps/survey-text-answer?surveyId=${surveyId}`} onClick={changePage}>
                            <span>
                                <Icon path={mdiText}
                                    size={1}
                                    color='#ff8fb5'
                                />
                            </span>
                            {t('Text answer')}
                        </Dropdown.Item>
                    </DropdownButton>

                </Col>

                <Col sm={7} className='image-section'>
                    <div className='text-center'>
                        <img src={question} alt='question' />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default AddQuestion