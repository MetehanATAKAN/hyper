import React, { useState } from 'react'

const LeftBar = ({ options, setValue, direction="vertical" }) => {

    const [leftBarOptions, setLeftBarOptions] = useState([...options]);

    const handleChange = (item) => {
        let newOptions = options.map(i => {
            if(item.key === i.key){
                return {
                    ...i,
                    checked: true
                }
            }else{
                return {
                    ...i,
                    checked: false
                }
            }
        })
        setLeftBarOptions(newOptions);
        setValue({ key: item.key, label: item.label })
    }

  return (
    <div className={`custom-page-left-bar custom-page-left-bar-${direction}`}>
        {
            leftBarOptions?.map(i => (
                <button onClick={() => handleChange(i)} className={`custom-page-left-bar-${i?.checked}`}>
                    <span>{i?.icon}</span>
                    <span>{i?.label}</span>
                </button>
            ))
        }
    </div>
  )
}

export default LeftBar

// const leftBar = [
//     {
//       icon: <Icon path={mdiFileTreeOutline} size={0.75} />,
//       label: t('General'),
//       key: 0,
//       checked: true

//     },
//     {
//       icon: <Icon path={mdiMagnify} size={0.75} />,
//       label: t('SOP'),
//       key: 1,
//       checked: false
//     },
//     {
//       icon: <Icon path={mdiFileDocumentCheckOutline} size={0.75} />,
//       label: t('Sub Processes'),
//       key: 2,
//       checked: false
//     }
// ]
// const [selectedBar, setSelectedBar] = useState({ key: 0, label: 'General'});