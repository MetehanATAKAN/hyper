import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

const BusinessProcessFilter = ({ processType, activityTypes, setFilteredDatas }) => {
    const { t } = useTranslation();
    const [processTypeOptions, setProcessTypeOptions] = useState([]);
    const [selectedProcessType, setSelectedProcessType] = useState(null)

    useEffect(() => {
        let processOptions = [];
        processType.map(item => processOptions.push(
            {processTypeId: item.id,
            processTypeName: item.title,
            processTypeColor: item.color }
        ))
        setProcessTypeOptions(processOptions);
    }, [processType])

    // const handleFilterActivityTypes = async (e) => {
    //     setSelectedProcessType(e)
    //     setFilteredActivity(activityTypes.filter(item => item.processTypeId === e.id))
    // }

  return (
    <div>
        <Select
            isMulti={true}
            className="react-select col-3"
            classNamePrefix="react-select"
            placeholder={t('select')}
            value={selectedProcessType}
            options={processTypeOptions?.map((option) => ({
                id: option?.processTypeId,
                value: option?.processTypeName,
                label: <div className='activity-types-select-with-color'>
                <div style={{backgroundColor: option?.processTypeColor, opacity: .8}} className='activity-types-select-with-color__box'></div>
                <div className='activity-types-select-with-color__text'>{option?.processTypeName}</div>
            </div>,
            }))}
            // onChange={(e) => handleFilterActivityTypes(e)}
        />
    </div>
  )
}

export default BusinessProcessFilter