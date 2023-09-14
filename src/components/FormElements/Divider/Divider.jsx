import React from 'react';
import "antd/dist/antd.css";
import { Divider as CustomDivider } from 'antd';
import { DividerProps } from 'antd/lib/divider';
type IDivider = DividerProps;

export const Divider: React.FC<IDivider> = ({ dashed = false, orientation = "center", plain = false, title, orientationMargin, ...rest }) => {
    return (

        <CustomDivider
            {...rest}
            dashed={dashed}
            orientation={orientation}
            orientationMargin={orientationMargin && orientationMargin}
            plain={plain}
            title={title ? title : null}
            className="ant-custom-divider"
        >
            {title && title}
        </CustomDivider>
    )
}