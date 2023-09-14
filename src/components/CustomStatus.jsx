import { mdiCircleEditOutline, mdiSendCheck, mdiTranslate } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react';
type Props = {
    type: 'redact' | 'send_to_approval' | 'approval_awaited' | 'approved' | 'translate_awaited' | 'refactor',
};
const CustomStatus = ({ type = 'redact' }: Props) => {
    const statuses = {
        redact: {
            icon: <i className="fas fa-pen fa-sm"></i>,
            label: 'redact',
        },
        send_to_approval: {
            icon: <Icon path={mdiSendCheck} size={0.8} />,
            label: 'send to approval',
        },
        approval_awaited: {
            icon: <i className="fas fa-check"></i>,
            label: 'approval awaited',
        },
        approved: {
            icon: <i className="fas fa-check"></i>,
            label: 'approved',
        },
        translate_awaited: {
            icon: <Icon path={mdiTranslate} size={0.8} />,
            label: 'translate awaited',
        },
        refactor: {
            icon: <Icon path={mdiCircleEditOutline} size={0.8} />,
            label: 'refactor',
        },
    };
    const [currentStatus, setCurrentStatus] = useState(statuses.refactor);
    useEffect(() => {
        setCurrentStatus(statuses[type]);
    }, [type]);

    return (
        <div className={`custom-status custom-status__${type}`}>
            {currentStatus.icon}
            {currentStatus.label}
        </div>
    );
};

export default CustomStatus;
