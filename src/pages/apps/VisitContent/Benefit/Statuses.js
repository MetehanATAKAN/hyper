import { mdiTranslate } from '@mdi/js';
import Icon from '@mdi/react';
import SendIcon from '../../../../components/Icons/SendIcon';
import TranslateIcon from '../../../../components/Icons/TranslateIcon';
export const statusRedactOptions = [
    {
        id: 9,
        key: 'Edit',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
        color: '#6C757D',
    },
    {
        id: 6,
        key: 'Duplicate',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i>,
        color: '#6C757D',
    },
    {
        id: 0,
        key: 'Delete',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
        color: '#FA5C7C',
    },
];

export  const statusRedactWithoutContentAndNeedOptions = [
    {
        id: 9,
        key: 'Edit',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
        color: '#6C757D',
    },
    {
        id: 6,
        key: 'Duplicate',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i>,
        color: '#6C757D',
    },
    {
        id: 0,
        key: 'Delete',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
        color: '#FA5C7C',
    },
];

export const statusApprovalOptions = [
    {
        id: 9,
        key: 'Edit',
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
        id: 6,
        key: 'Duplicate',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i>,
        color: '#6C757D',
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
        id: 1,
        key: 'Redact',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
        color: '#6C757D',
    },
    {
        id: 6,
        key: 'Duplicate',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i>,
        color: '#6C757D',
    },
    {
        id: 5,
        key: 'Translate',
        icon: <TranslateIcon />,
        color: '#6C757D',
    }
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
export const statusTranslateOptions = [
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
    // {
    //     id: 10,
    //     key: 'Translate',
    //     icon: <TranslateIcon />,
    //     color: '#727CF5',
    // }
];

// translate edilmiş sand to aproval
export const statusTranslatedApprovalOptions = [
    {
        id: 9,
        key: 'Edit',
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

// translate i onaylanmış approved lanmış içerik

export const statusTranslatedApprovedOptions = [
    {
        id: 10,
        key: 'Translate',
        icon: <TranslateIcon />,
        color: '#6C757D',
    }
]