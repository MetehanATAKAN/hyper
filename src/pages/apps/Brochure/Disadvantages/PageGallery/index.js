import React, { useState } from 'react'
import PageGalleryFilter from './PageGalleryFilter'
import { mdiFilterMenuOutline, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react'
import { useTranslation } from 'react-i18next';
import PageGalleryTemplates from './PageGalleryTemplates';

const PageGallery = () => {

    const { t } = useTranslation();
  const [isFilter, setIsFilter] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [templates, setTemplates] = useState([]);


  const newButton = () => {
    setShowModal(true);
}

  return (
    <div className='page-gallery'>
      <div className='table-topbar'>
        <div className='table-topbar-right' style={{marginRight: "0", marginLeft: "auto"}}>
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
      <PageGalleryFilter showModal={showModal} setShowModal={setShowModal} isFilter={isFilter} setIsFilter={setIsFilter} setTemplates={setTemplates} templates={templates} />
      <PageGalleryTemplates templates={templates} setTemplates={setTemplates} /> 
    </div>
  )
}

export default PageGallery