import React, { useEffect, useState } from 'react'
import LeftBar from '../../../../../components/FormElements/LeftBar'
import { Icon } from '@mui/material'
import { mdiFileDocumentCheckOutline, mdiFileTreeOutline, mdiMagnify } from '@mdi/js'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { leftBarKey } from '../../../../../redux/subProcess/actions'


const LeftBarMenu = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();

  const leftBar = [
    {
      icon: <Icon path={mdiFileTreeOutline} size={0.75} />,
      label: t('General'),
      key: 0,
      checked: true

    },
    {
      icon: <Icon path={mdiMagnify} size={0.75} />,
      label: t('SOP'),
      key: 1,
      checked: false
    },
    {
      icon: <Icon path={mdiFileDocumentCheckOutline} size={0.75} />,
      label: t('Settings'),
      key: 2,
      checked: false
    },
    {
      icon: <Icon path={mdiFileDocumentCheckOutline} size={0.75} />,
      label: t('Action List'),
      key: 3,
      checked: false
    }
  ]
    const [selectedBar, setSelectedBar] = useState({ key: 0, label: 'General'});

    useEffect(() => {
     dispatch(leftBarKey(selectedBar.key));
    }, [dispatch, selectedBar])
    
  return (
    <>
      <LeftBar
        options={leftBar}
        setValue={setSelectedBar}
      />
    </>
  )
}

export default LeftBarMenu