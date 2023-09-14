import React from 'react'
import { Alert } from 'antd';

const CustomAlert = ({ message, type='default', banner=false, closable=false, showIcon=false }) => {
    return (
    <div className={`custom-alert custom-alert-${type}`}>
        <Alert message={message} type={type} banner={banner} closable={closable} showIcon={showIcon} />
    </div>
    )
    
}

export default CustomAlert