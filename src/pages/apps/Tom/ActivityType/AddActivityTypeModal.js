import React, { useState } from 'react'
import { Modal } from '../../../../components/FormElements/Modal'
import { useTranslation } from 'react-i18next'
import { InputSelectColor, TextArea } from '../../../../components/FormElements/Input'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Button } from '../../../../components/FormElements/Button'
import { FetchApiPost } from '../../../../utils/http.helper'
import CheckBox from '../../../../components/FormElements/CheckBox'

const AddActivityTypeModal = ({
    show,
    setShow,
    setisApiCall
}) => {

    const { t } = useTranslation();

    const history = useHistory();

    const createdBy = localStorage.getItem('userName');

    /**activity type */
    const [activityType, setActivityType] = useState('');
    /**color */
    const [color, setColor] = useState('');

    /**description */
    const [description, setDescription] = useState('');

    const saveActivityType = () => {
        const data = {
            title: activityType,
            description: description,
            createdBy: createdBy,
            color: color
        }
        FetchApiPost('services/TaskManagement/ActivityType/CreateActivityType', 'POST',data)
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
              header='New Activity Type'
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
                    {t('add')}
                </Button>
            }
          />
    </>
  )
}

export default AddActivityTypeModal