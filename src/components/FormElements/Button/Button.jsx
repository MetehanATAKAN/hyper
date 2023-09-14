import React from 'react';
import { Button as BaseButton } from 'antd';
import { ButtonProps } from 'antd/lib/button';
type IButton = ButtonProps;
export const Button: React.FC<IButton> = ({ className, success = false, ...rest }) => {
    return (
        <BaseButton
            className={`${success ? 'custom-button-success' : 'custom-button'} ${className ? className : ''}`}
            {...rest}
        />
    );
};
