import { Dropdown, Input, Tooltip, InputNumber } from "antd";
import DangerousIcon from '@mui/icons-material/Dangerous';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from "react";
import MicNoneIcon from '@mui/icons-material/MicNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTranslation } from "react-i18next";


export const InputDefault = ({
    placeholder = 'Input',
    disabled = false,
    size='middle',
    onChange,
    value,
    setValue,
    width = '100%',
    isUpperCase = false,
    status='default', // error , warning , success
    label,
    isRequired=true,
    isHelpIcon=false,
    tooltipComment = '',
    tooltipPlacement = 'bottom',
    type='text'
}) => {

    const [isFocus, setIsFocus] = useState(false);

    const suffixIcon = (status) => {
        if(status === 'error') return <DangerousIcon/>;
        else if(status === 'warning') return <ErrorIcon/>;
        else if(status === 'success') return <CheckCircleIcon/>;
        
    }

    const inputFocus = () => {
        if(status === 'error') return <DangerousIcon/>;
        else if(status === 'warning') return <ErrorIcon/>;
        else if(status === 'success') return <CheckCircleIcon/>;
    }
    return (
        <div className="custom-input-elements">
        {
            label && <div className="label">
                {
                    isRequired && <span className="label-required">*</span>
                }
                <label className="label-name"> {label} </label>
                {
                    isHelpIcon && <span className="label-help"> 
                    <Tooltip placement={tooltipPlacement} title ={tooltipComment} >
                    <HelpOutlineIcon/>
                    </Tooltip>
                    </span>
                }
            </div>
        }
        <Input 
        style={{width:width}}
        placeholder={placeholder} 
        disabled={disabled} 
        size={size} 
        onChange={(e)=>setValue( isUpperCase ? e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase(): e.target.value)}
        value={value}
        status={status}
        suffix={suffixIcon(status)}
        className={`custom-input ${disabled && `custom-input-disabled-${disabled}`} ${status &&  `custom-input-${status}`} ${isFocus && disabled=== false && `custom-input-${status}-${`focus-${isFocus}`}`}`}
        onFocus={()=>setIsFocus(true)}
        onBlur={()=>setIsFocus(false)}
        type={type}
        />
        </div>
    )
}

export const InputNumberDefault = ({
    disabled = false,
    size='middle', // large , small or medium
    onChange,
    value,
    width = '100%',
    setValue,
    label,
    isRequired=true,
    isHelpIcon=false,
    tooltipComment = '',
    tooltipPlacement = 'bottom'
}) => {

    const [isFocus, setIsFocus] = useState(false);

    return (
        <div className="custom-input-elements">
        {
            label && <div className="label">
                {
                    isRequired && <span className="label-required">*</span>
                }
                <label className="label-name"> {label} </label>
                {
                    isHelpIcon && <span className="label-help"> 
                    <Tooltip placement={tooltipPlacement} title ={tooltipComment} >
                    <HelpOutlineIcon/>
                    </Tooltip>
                    </span>
                }
            </div>
        }
            <InputNumber
                onChange={(e)=>setValue(e)}
                disabled={disabled}
                size={size}
                value={value}
                width={width}
                onFocus={()=>setIsFocus(true)}
                onBlur={()=>setIsFocus(false)}
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }}
                className={`custom-input custom-input-default custom-input-number ${disabled && `custom-input-disabled-${disabled}`} ${isFocus && disabled=== false && `custom-input-default-${`focus-${isFocus}`}`}`}
            />
        </div>
    )
}

export const TextArea = ({
    placeholder = 'Textarea',
    disabled = false,
    rows=4,
    width='100%',
    onChange,
    value,
    setValue,
    isUpperCase = false,
    label,
    isRequired=true,
    isHelpIcon=false,
    tooltipComment = '',
    tooltipPlacement = 'bottom'
}) => {

    const { TextArea } = Input;
    const [isFocus, setIsFocus] = useState(false);

    return (
        <div className="custom-input-elements">
             {
            label && <div className="label">
                {
                    isRequired && <span className="label-required">*</span>
                }
                <label className="label-name"> {label} </label>
                {
                    isHelpIcon && <span className="label-help"> 
                    <Tooltip placement={tooltipPlacement} title ={tooltipComment} >
                    <HelpOutlineIcon/>
                    </Tooltip>
                    </span>
                }
            </div>
        }
           <TextArea 
           style={{width:width}}
        rows={rows}
        placeholder={placeholder} 
        disabled={disabled} 
        onChange={(e)=>setValue( isUpperCase ? e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase(): e.target.value)}
        value={value}
        className={`custom-textarea ${isFocus && disabled === false && `custom-textarea-focus-${isFocus}`} ${disabled && `custom-textarea-disabled`}`}
        onFocus={()=>setIsFocus(true)}
        onBlur={()=>setIsFocus(false)}
         />
        </div>
    )
}

export const InputPassword = ({
    placeholder = 'Password',
    disabled = false,
    size='middle', // middle, large , small
    onChange,
    value,
    setValue,
    label,
    isRequired=true,
    isHelpIcon=false,
    tooltipComment = '',
    tooltipPlacement = 'bottom'
}) => {
    
    const [isFocus, setIsFocus] = useState(false);

    return (
        <div className="custom-input-elements">
            {
                label && <div className="label">
                    {
                        isRequired && <span className="label-required">*</span>
                    }
                    <label className="label-name"> {label} </label>
                    {
                        isHelpIcon && <span className="label-help">
                            <Tooltip placement={tooltipPlacement} title={tooltipComment} >
                                <HelpOutlineIcon />
                            </Tooltip>
                        </span>
                    }
                </div>
            }
            <Input.Password
                placeholder={placeholder}
                className={`custom-password ${isFocus && `custom-password-focus`} ${disabled && `custom-password-disabled`} `}
                size={size}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            />
        </div>
    )
}

export const InputSearch = ({
    placeholder = 'Search',
    disabled = false,
    size='large', // middle, large , small
    onSearch,
    enterButton,// search button => enterButton = 'search'
    addonBefore= true
}) => {

    const { Search } = Input;
    const [isFocus, setIsFocus] = useState(false);

    return (
        <Search
      addonBefore={addonBefore === true ? "https://" : ''}
      placeholder={placeholder}
      size={size}
      allowClear
      onSearch={onSearch}
      className={`custom-search`}
      suffix={<MicNoneIcon/>}
      enterButton={enterButton}
    />
    )
}

export const InputPrePost = ({
    placeholder = 'Search',
    disabled = false,
    size='middle', // middle, large , small
    addonBefore= "http://" ,
    addonAfter=".com",
    isAddonAfter=false,
    value,
    setValue
}) => {

    return (
        <Input 
        placeholder={placeholder}
        size={size}
        addonBefore={addonBefore}
        addonAfter={isAddonAfter && addonAfter}
        value={value}
        setValue={(e)=>setValue(e.target.value)}
        disabled={disabled}
        />
    )
}

export const InputSelectColor = ({
    placeholder = 'Input',
    disabled = false,
    onChange,
    value,
    setValue,
    color,
    width='100%',
    setColor,
    isUpperCase = false,
    label,
    isRequired=true,
    isHelpIcon=false,
    tooltipComment = '',
    tooltipPlacement = 'bottom'
}) => {

    const [isFocus, setIsFocus] = useState(false);

    const [show, setShow] = useState(false);
    
    const Colors = ({ label, color }) => {
        const { t } = useTranslation();
        return (
            <div style={{  display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                <div
                    style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: color,
                        borderRadius: '3px',
                        marginRight: '8px',
                    }}></div>{' '}
                {t(label)}
            </div>
        );
    };

    const items = [
        { label: <Colors color='#6692F440' label={'Blue'} />, key: '#6692F440' }, // remember to pass the key prop
        { label: <Colors color='#4AA57840' label={'Green'} />, key: '#4AA57840' },
        { label: <Colors color='#F2646440' label={'Red'} />, key: '#F2646440' },
        { label: <Colors color='#F6A35140' label={'Orange'} />, key: '#F6A35140' },
        { label: <Colors color='#E4628D40' label={'Rasbperry'} />, key: '#E4628D40' },
        { label: <Colors color='#DE5EB340' label={'Magenta'} />, key: '#DE5EB340' },
        { label: <Colors color='#C466DB40' label={'Purple'} />, key: '#C466DB40' },
        { label: <Colors color='#AD71EA40' label={'Grape'} />, key: '#AD71EA40' },
        { label: <Colors color='#917EF140' label={'Violet'} />, key: '#917EF140' },
        { label: <Colors color='#5699DC40' label={'Cyan'} />, key: '#5699DC40' },
        { label: <Colors color='#4F9EBA40' label={'Teal'} />, key: '#4F9EBA40' },
        { label: <Colors color='#3DA49740' label={'Aquamarine'} />, key: '#3DA49740' },
        { label: <Colors color='#55A55540' label={'Emerald'} />, key: '#55A55540' },
    ];

    const handleMenuClick = (e) => {
        const color = e.key;
        setColor(color);
        setShow(false);
    }

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return (
        <div className="custom-input-elements">
             {
            label && <div className="label">
                {
                    isRequired && <span className="label-required">*</span>
                }
                <label className="label-name"> {label} </label>
                {
                    isHelpIcon && <span className="label-help"> 
                    <Tooltip placement={tooltipPlacement} title ={tooltipComment} >
                    <HelpOutlineIcon/>
                    </Tooltip>
                    </span>
                }
            </div>
        }
            <Input.Group style={{ display: 'flex',width:width }}>
                <Input 
                value={value}
                onChange={(e)=>setValue( isUpperCase ? e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase(): e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
                className={`custom-input custom-input-default custom-input-color ${disabled && `custom-input-disabled-${disabled}`} ${isFocus && disabled=== false && `custom-input-default-${`focus-${isFocus}`}`}`}
                onFocus={()=>setIsFocus(true)}
                onBlur={()=>setIsFocus(false)}
                />
                <Tooltip title={'btnTooltip'} >
                    <Dropdown.Button
                        trigger="click"
                        menu={menuProps}
                        placement="bottom"
                        style={{ maxWidth: '35px' }}
                        overlayStyle={{ zIndex: '9999999999' }}
                        icon={<i className="fas fa-ellipsis-h"></i>}
                        disabled={disabled}
                        className="custom-input-color-button"
                    />
                </Tooltip>
            </Input.Group>
        </div>
    )
}