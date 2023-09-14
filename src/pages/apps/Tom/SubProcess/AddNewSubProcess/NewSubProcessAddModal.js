import React, { useEffect, useState } from 'react'
import { Modal } from '../../../../../components/FormElements/Modal'
import { Button } from '../../../../../components/FormElements/Button'
import { useTranslation } from 'react-i18next'
import { SingleSelects } from '../../../../../components/GlobalNew/Selects'
import { FetchApiGet } from '../../../../../utils/http.helper'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { ErrorModal } from '../../../../../components/FormElements/InformationModal'

const NewSubProcessAddModal = ({
    show,
    setShow,
    modalHeder,
    data,
    setData,
    header
}) => {

    const { t } = useTranslation();
    const history = useHistory();

    /**error modal */
    const [errorModal, setErrorModal] = useState(false);

    /**compant type */
    const [companyType, setCompanyType] = useState([]);
    const [selectCompanyType, setSelectCompanyType] = useState();

    /**department */
    const [department, setDepartment] = useState([]);
    const [selectDepartment, setSelectDepartment] = useState();

    /**position */
    const [position, setPosition] = useState([]);
    const [selectPosition, setSelectPosition] = useState();

    const selects = [
        {
            label:'company type',
            option:companyType,
            isStar:true,
            selectedItems:selectCompanyType,
            setSelectedItems:setSelectCompanyType,
            disabled:false
        },
        {
            label:'department',
            option:department,
            isStar:true,
            selectedItems:selectDepartment,
            setSelectedItems:setSelectDepartment,
            disabled:false
        },
        {
            label:'position',
            option:position,
            isStar:true,
            selectedItems:selectPosition,
            setSelectedItems:setSelectPosition,
            disabled:false
        },
    ]

    const generateUniqueId = () => {
        return new Date().getTime().toString()+Math.random().toString(36).substring(7); // Zaman damgasını kullanarak benzersiz bir ID oluşturur
      }
    const save = () => {
        const id = (selectCompanyType.value+selectDepartment.value+selectPosition.value).toString();
        if(data.length === 0) {
            setData(el => [
                ...el,
                {
                    id:(selectCompanyType.value+selectDepartment.value+selectPosition.value).toString(),
                    companyType:selectCompanyType?.label,
                    companyId:selectCompanyType?.value,
                    department:selectDepartment?.label,
                    departmentId:selectDepartment?.value,
                    position:selectPosition?.label,
                    positionId:selectPosition?.value,
                    name:header
                }
            ])
            setShow(false);
        }
        else {
            const result = data.find(el => el.id === id);
            if(result) {
                setErrorModal(true);
            }
            else {
                setData(el => [
                    ...el,
                    {
                        id:(selectCompanyType.value+selectDepartment.value+selectPosition.value).toString(),
                        companyType:selectCompanyType?.label,
                        companyId:selectCompanyType?.value,
                        department:selectDepartment?.label,
                        departmentId:selectDepartment?.value,
                        position:selectPosition?.label,
                        positionId:selectPosition?.value,
                        name:header
                    }
                ])
                setShow(false);
            }
        }
    }

    useEffect(() => {
       
        /**company type */
        FetchApiGet('api/OldSystem/GetAllCompanyType','GET')
        .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                      
                        res.json().then(el => {
                            setCompanyType(el?.map((data,index) => (
                                {
                                    value:index,
                                    label:data
                                }
                               )))
                               if(el?.length >0 ) {
                                setSelectCompanyType(
                                    {
                                        value:el[0],
                                        label:el[0]
                                    }
                                )
                               }
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

        /**depatment */
        FetchApiGet('api/OldSystem/GetDepartmant','GET')
        .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                      
                        res.json().then(el => {
                           setDepartment(el?.map(data => (
                            {
                                value:data.DepartmantId,
                                label:data.DepartmantName
                            }
                           )))
                           if(el?.length >0 ) {
                            setSelectDepartment(
                                {
                                    value:el[0].DepartmantId,
                                    label:el[0].DepartmantName
                                }
                            )
                           }
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

        /**position */
        FetchApiGet('api/OldSystem/GetAllPositions','GET')
        .then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                      
                        res.json().then(el => {
                           setPosition(el?.map(data => (
                            {
                                value:data.Id,
                                label:data.Name
                            }
                           )))
                           if(el?.length >0 ) {
                            setSelectPosition(
                                {
                                    value:el[0].Id,
                                    label:el[0].Name
                                }
                            )
                           }
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

    }, [history])

    
    
  return (
    <>
    <Modal
              showModal={show}
              setShowModal={setShow}
              toggle={() => setShow(false)}
              header={`Add ${modalHeder}`}
              body={
                  <>
                    {
                        selects?.map(data => (
                            <SingleSelects
                                options={data.option}
                                label={data.label}
                                isStar={data.isStar}
                                selectedItems={data.selectedItems}
                                setSelectedItems={data.setSelectedItems}
                                width='100%'
                            />
                        ))
                    }
                  </>
              }
              footer={
                <Button 
                type="primary" 
                onClick={save}
                disabled={
                    selectCompanyType && selectDepartment && selectPosition ? false : true
                }
                >
                    {t('save')}
                </Button>
            }
          />
          {
              errorModal && (
                  <ErrorModal
                      setShowModal={setErrorModal}
                      message="This data is in the table. You cannot add this."
                      title="Cannot be Deleted"
                  />
              )}
    </>
  )
}

export default NewSubProcessAddModal