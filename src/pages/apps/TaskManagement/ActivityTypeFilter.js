import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

const ActivityTypeFilter = ({ activityTypes, setFilteredDatas, processType }) => {
    const [selectedProcessType, setSelectedProcessType] = useState(null)
    const [processTypeOptions, setProcessTypeOptions] = useState([]);
    const [filteredActivity, setFilteredActivity] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        let processOptions = [];
        processType.map(item => processOptions.push(
            {processTypeId: item.id,
            processTypeName: item.title,
            processTypeColor: item.color }
        ))
        setProcessTypeOptions(processOptions);
    }, [processType])

    const handleFilterActivityTypes = async (e) => {
        setSelectedProcessType(e)
        setFilteredActivity(activityTypes.filter(item => item.processTypeId === e.id))
    }

    const handleFilter = () => {
        setSelectedProcessType(null)
        setFilteredDatas(filteredActivity)
    }

    const handleCancel = () => {
        setSelectedProcessType(null);
        setFilteredDatas(activityTypes)
    }

  return (
    <div className='activity-type-filter row mt-2'>
        <Select
            isMulti={false}
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
            onChange={(e) => handleFilterActivityTypes(e)}
        />

        <div className='activity-type-filter__buttons col-3'>
            <button className='btn btn-info' disabled={selectedProcessType===null} onClick={() => handleFilter()}>{t('apply')}</button>
            <button className='btn btn-warning ms-2' onClick={() => handleCancel()} >{t('cancel')}</button>
        </div>
    </div>
  )
}

export default ActivityTypeFilter