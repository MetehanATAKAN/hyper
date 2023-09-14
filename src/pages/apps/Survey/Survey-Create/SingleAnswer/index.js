import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Tab from '../../../../../components/Tab';
import SurveyTab from './SurveyTab';
import { Col, Row } from 'react-bootstrap';
import { mdiDotsHorizontal, mdiClose  } from '@mdi/js';
import Icon from '@mdi/react'
import Dropdowns from '../../../../../components/Dropdowns';
import { Dropdown, Menu } from 'antd';
import Delete from '../Delete';
import { useSelector } from 'react-redux';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router';

const SingleAnswerIndex = () => {

    const { t } = useTranslation();
    const history = useHistory();

    const questionId = useSelector(state => state.Survey.surveyQuestionId);
    const surveyId = new URLSearchParams(window.location.search).get('surveyId');
    console.log(questionId);
    const [isDelete, setIsDelete] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const createdBy = localStorage.getItem('userName');

    const statusOptions = [
       
        {
            id: 6,
            key: 'Duplicate',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i>,
            color: '#6C757D',
        },
        {
            id: 0,
            key: 'Delete',
            icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
            color: '#FA5C7C',
        },
    ];

    const [selectTab, setSelectTab] = useState(
        {
            key: 0,
            label: 'Survey',
        },
    );

    const tabProps = [
        {
            key: 0,
            label: t('Survey'),
            disabled:false
        },
        {
            key: 1,
            label: t('Option'),
           disabled:true
        },
        {
            key: 2,
            label: t('Logic'),
            disabled:true
        },
    ];

    const menu = (
        <Menu>
            {statusOptions?.map((el, i) => (
                <Menu.Item
                    style={{ paddingTop: 0, paddingBottom: 0, marginBottom: '5px' }}
                    onClick={() => changeStatus(el)}
                    key={i}
                    >
                    <span  style={{ color: el.color }}>
                        {el.icon}
                        {t(el.key)}
                    </span>
                </Menu.Item>
            ))}
        </Menu>
    );

    const changeStatus = (item) => {
        if(item.key === 'Delete') {
            setIsDelete(true);
            setModalShow(true);
        }

        else {
            const body = {
                id:questionId,
                createdBy:createdBy,
                surveyId:surveyId
            }
            FetchApiPost('services/SurveySystem/DesignSurvey/DuplicateDesignSurvey','POST',body)
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

  return (
    <div className='single-answer'>
        <Row>
            <Col sm={4}>
            <Tab selectTab={selectTab} setSelectTab={setSelectTab} tabProps={tabProps} />
            </Col>

            <Col sm={1} className='tabs-right' >
                  <div className='actions'>
                      {/* <span className='icon'>
                      <Icon path={mdiDotsHorizontal}
                          size={0.8}
                          color='#6d767e'
                      />
                      </span> */}
                      <Dropdown overlayStyle={{ minWidth: '155px' }} trigger={'click'} overlay={menu} placement="bottom">
            <i style={{ cursor: 'pointer' }} className="fas fa-ellipsis-v"></i>
        </Dropdown>
                      {/* <Dropdowns
                        option={statusOptions}
                        onClick={(e) =>changeStatus(e)}
                      /> */}

                      <span className='icon close-icon'>
                      <Icon path={mdiClose}
                          size={0.8}
                          color='#6d767e'
                      />
                      </span>
                  </div>
            </Col>
        </Row>
        
        {
            selectTab.key === 0 && <SurveyTab/>
        }

          {
              isDelete &&
              <Delete
                  modalShow={modalShow}
                  setModalShow={setModalShow}
                  id={questionId}
              />
          }
    </div>
  )
}

export default React.memo(SingleAnswerIndex)