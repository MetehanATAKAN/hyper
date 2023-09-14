import React, { useState } from 'react'
import PageGalleryFilter from './PageGalleryFilter'
import { mdiFilterMenuOutline, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react'
import { useTranslation } from 'react-i18next';

const PageGalleryIndex = () => {

  const { t } = useTranslation();
  const [isFilter, setIsFilter] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [templates, setTemplates] = useState([]);


  const newButton = () => {
    setShowModal(true);
}

  return (
    <div className='page-gallery'>
      <div className='table-topbar justify-content-end'>
        <div className='table-topbar-right'>
          <div className="item" onClick={()=>setIsFilter(!isFilter)}>
            <Icon path={mdiFilterMenuOutline}
              title="Filter"
            />
            <label> {t('filter')} </label>
          </div>

          <div
            className='item new-button'
            onClick={newButton}
          >
            <div className='items'>
              <Icon path={mdiPlus}
                title="Group By"
              />
              <label>{t('new')}</label>
            </div>
          </div>
        </div>
      </div>
      <PageGalleryFilter
        showModal={showModal}
        setShowModal={setShowModal}
        isFilter={isFilter}
        setIsFilter={setIsFilter}
        templates={templates}
        setTemplates={setTemplates}
      />
    </div>
  )
}

export default PageGalleryIndex