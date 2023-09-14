import React from 'react'
import { Checkbox } from 'antd';

const CheckBox = ({
    disabled = false,
    onChange,
    checked = false,
    setChecked,
    label
}) => {
  return (
      <>
          <Checkbox
              onChange={(e)=>setChecked(e.target.checked)}
              checked={checked}
              disabled={disabled}
              className='custom-checkbox'
          >
              {
                label && <span>{label}</span>
              }
          </Checkbox>
      </>
  )
}

export default CheckBox