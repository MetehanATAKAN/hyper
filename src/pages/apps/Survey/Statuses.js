import SendIcon from '../../../components/Icons/SendIcon';

export const statusRedactOptions = [
    {
        id: 9,
        key: 'Edit',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
        color: '#6C757D',
    },
    { id: 2, key: 'Send to approval', icon: <SendIcon />, color: '#FFBC00' },
    {
        id: 0,
        key: 'Delete',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
        color: '#FA5C7C',
    },
];
export const statusApprovalOptions = [
    {
        id: 1,
        key: 'Redact',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
        color: '#6C757D',
    },
    {
        id: 3,
        key: 'Approved',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-check"></i>,
        color: '#0ACF97',
    },
    {
        id: 4,
        key: 'Reject',
        icon: <i style={{ marginRight: '18px' }} className="fas fa-exclamation"></i>,
        color: '#FA5C7C',
    },
    {
        id: 0,
        key: 'Delete',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
        color: '#FA5C7C',
    },
];
export const statusApprovedOptions = [
    {
        id: 4,
        key: 'Reject',
        icon: <i style={{ marginRight: '18px' }} className="fas fa-exclamation"></i>,
        color: '#FA5C7C',
    },
];
export const statusRejectOptions = [
    {
        id: 9,
        key: 'Edit',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
        color: '#6C757D',
    },
    { id: 2, key: 'Send to approval', icon: <SendIcon />, color: '#FFBC00' },
    {
        id: 0,
        key: 'Delete',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
        color: '#FA5C7C',
    },
];
