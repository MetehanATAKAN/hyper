import React, { useState } from 'react'
import { Modal } from '../../../../components/FormElements/Modal';
import { useTranslation } from 'react-i18next'
import {  InputSelectColor, TextArea } from '../../../../components/FormElements/Input'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Button } from '../../../../components/FormElements/Button';
import { FetchApiPost } from '../../../../utils/http.helper';

const ActivityTypeUpdateModal = ({
    show,
    setShow,
    setisApiCall,
    data
}) => {

  
    const { t } = useTranslation();

    const history = useHistory();

    const createdBy = localStorage.getItem('userName');

    /**activity type */
    const [activityType, setActivityType] = useState(data ? data.activityType : '');
    /**color */
    const [color, setColor] = useState(data ? data.color : '');

    /**description */
    const [description, setDescription] = useState(data ?data.description :'');

    const saveActivityType = () => {
        const body = {
            id: data.id,
            modifiedBy: createdBy,
            title: activityType,
            description: description,
            color: color
        }
        FetchApiPost('services/TaskManagement/ActivityType/UpdateActivityType', 'POST',body)
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 201) {
                            setShow(false);
                            setisApiCall(true);
                        }
                        else if(res.status === 409) {
                            res.json().then(data =>{
                               
                            })
                        }
                        else if (res.status === 500 || res.status === 499) {

                            history.push('/error-500');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )
    }

  return (
    <>
          <Modal
              showModal={show}
              setShowModal={setShow}
              toggle={() => setShow(false)}
              header='Update Activity Type'
              body={
                <>
                  <InputSelectColor
                      label='activity type'
                      value={activityType}
                      setValue={setActivityType}
                      color={color}
                      setColor={setColor}
                      isRequired={true}
                  />
                  <TextArea
                    label='description'
                    value={description}
                    setValue={setDescription}
                  />
                  </>
              }
              footer={
                <Button
                type="primary" 
                onClick={saveActivityType} 
                disabled={
                    activityType !== '' && description !== '' && color !== '' ? false : true
                }
                >
                    {t('update')}
                </Button>
            }
          />
    </>
  )
}

export default ActivityTypeUpdateModal