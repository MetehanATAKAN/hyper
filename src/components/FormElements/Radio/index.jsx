import React from 'react'
import { Radio } from 'antd';

const RadioButton = ({ setValue, options = [], optionType = 'default', value, direction="horizontal" }) => {
    return (
        <div>

        
            <Radio.Group
                options={options}
                optionType={optionType}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`custom-ant-radio-button custom-ant-radio-button-${direction}`}
                direction={direction}
            />


        </div>
    )
}

export default RadioButton

// const [value2, setValue2] = useState('Pear'); default sellect
// const plainOptions = ['Apple', 'Pear', 'Orange'];
// const optionsWithDisabled = [
//     {
//       label: 'Apple',
//       value: 'Apple',
//     },
//     {
//       label: 'Pear',
//       value: 'Pear',
//     },
//     {
//       label: 'Orange',
//       value: 'Orange',
//       disabled: true,
//     },
//   ];