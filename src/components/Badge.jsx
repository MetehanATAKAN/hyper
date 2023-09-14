import React, { useEffect, useState } from 'react';
type Props = {
    type:
        | 'grey'
        | 'blue'
        | 'green'
        | 'red'
        | 'orange'
        | 'raspberry'
        | 'magenta'
        | 'purple'
        | 'grape'
        | 'violet'
        | 'cyan'
        | 'teal'
        | 'aquamarine'
        | 'emerald'
        | 'default',
    label: string,
};
const CustomBadge = ({ type = 'default', label = 'Badge' }: Props) => {
    return <div className={`custom-badge custom-badge_${type}`}>{label}</div>;
};

export default CustomBadge;
