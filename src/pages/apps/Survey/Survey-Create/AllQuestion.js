import React, { useEffect } from 'react'
import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { mdiCheckCircleOutline, mdiCheckboxOutline, mdiDragVertical, mdiText  } from '@mdi/js';
import Icon from '@mdi/react';
import { FetchApiGet } from '../../../../utils/http.helper';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { questionId, saveOrUpdate } from '../../../../redux/survey/actions';

const AllQuestion = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const surveyId = new URLSearchParams(window.location.search).get('surveyId');
    console.log('surveyId',surveyId);

    const [allQuestion, setAllQuestion] = useState([
        // {
        //     id:1,
        //     icon:(
        //         <Icon path={mdiCheckCircleOutline}
        //     size={0.8}
        //     color='#3ad7aa'
        // />
        //     ),
        //     questionNumber:1,
        //     question:'Bu ne zaman biter1?',

        // },
        // {
        //     id:2,
        //     icon:(
        //         <Icon path={mdiCheckCircleOutline}
        //     size={0.8}
        //     color='#3ad7aa'
        // />
        //     ),
        //     questionNumber:2,
        //     question:'Bu ne zaman biter2?',

        // },
        // {
        //     id:3,
        //     icon:(
        //         <Icon path={mdiCheckCircleOutline}
        //     size={0.8}
        //     color='#3ad7aa'
        // />
        //     ),
        //     questionNumber:3,
        //     question:'Bu ne zaman biter3?',

        // },
    ]);

    console.log(allQuestion);
    const handleOnDragEnd= (result) => {
        if (!result.destination) return;
    
        const items = Array.from(allQuestion);
        const [reorderedItem] = items.splice(result.source.index, 1); 
        console.log(reorderedItem);
        items.splice(result.destination.index, 0, reorderedItem);
        items.map((data,index) => (
          data.questionNumber = index+1
        ))
        setAllQuestion(items);
      }

      const selectQuestionId = (id) => {
        dispatch(questionId(id));
        dispatch(saveOrUpdate('update'));
      }

      useEffect(() => {
        FetchApiGet(`services/SurveySystem/Survey/GetQuestionsBySurveyId?id=${surveyId}`,'GET')
        .then((res) =>
                      (async () => {
                          try {
                              if (res.status === 200) {
                                res.json().then((item) => {
                                  setAllQuestion(item?.data?.map((data,index) => (
                                    {
                                      id: data.id,
                                      icon: (
                                        data.questionType === 0
                                          ? <Icon path={mdiCheckCircleOutline}
                                            size={0.8}
                                            color='#3ad7aa' />
                                          : data.questionType === 1
                                            ? <Icon path={mdiCheckCircleOutline}
                                              size={0.8}
                                              color='#3ad7aa' />
                                            : data.questionType === 2
                                              ? <Icon path={mdiCheckboxOutline}
                                                size={0.8}
                                                color='#99a1f6'
                                              />
                                              : data.questionType === 3
                                                ? <Icon path={mdiText}
                                                  size={0.8}
                                                  color='#fb86b0'
                                                />
                                                : null

                                      ),
                                      questionNumber: index+1,
                                      question: data.question,
                                      questionType:data.questionType
                                    }
                                  )))
                              })
                                 
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
      }, [])
      

  return (
    <div className='drag-drop-questions'>

<DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {allQuestion.map(({id,icon,question,questionNumber,questionType}, index) => {
                  return (
                    <Draggable key={String(id)} draggableId={String(id)} index={index}>
                      {(provided) => (
                        <Link
                        to={{
                          pathname: (
                            questionType === 1
                            ?'/apps/survey-single-answer'
                            :questionType === 2
                            ?'/apps/survey-multi-answer'
                            :questionType === 3
                            ?'/apps/survey-text-answer'
                            :null
                          ),
                          search: `?id=${id}&&surveyId=${surveyId}&&number=${questionNumber}`,
                          hash: "#the-hash",
                        }}
                      >
                        <li onClick={()=>selectQuestionId(id)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  <span className='drag-icon'>
                                      <Icon path={mdiDragVertical}
                                          size={0.8}
                                      />
                                  </span>

                                  <span className='question-type-icon'>
                                    {icon}
                                  </span>

                                  <span className='question-number'>
                                    {
                                        `Q${questionNumber}`
                                    }
                                  </span>

                                  <span>
                                    {question}
                                  </span>
                        </li>
                         </Link>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
    </div>
  )
}

export default AllQuestion