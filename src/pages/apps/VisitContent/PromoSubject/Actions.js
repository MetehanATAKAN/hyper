import SendIcon from '../../../../components/Icons/SendIcon';
import TranslateIcon from '../../../../components/Icons/TranslateIcon';

export const statusOptions = [
    {
        id: 1,
        key: 'Redact',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
        color: '#6C757D',
    },
    { id: 2, key: 'Send to approval', icon: <SendIcon />, color: '#FFBC00' },
    {
        id: 3,
        key: 'Approved',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-check"></i>,
        color: '#0ACF97',
    },
    {
        id: 5,
        key: 'Translate',
        icon: <TranslateIcon />,
        color: '#6C757D',
    },
    {
        id: 6,
        key: 'Duplicate',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-copy"></i>,
        color: '#6C757D',
    },
    {
        id: 9,
        key: 'Edit',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-pen"></i>,
        color: '#6C757D',
    },
    {
        id: 0,
        key: 'Delete',
        icon: <i style={{ marginRight: '8px' }} className="fas fa-trash"></i>,
        color: '#FA5C7C',
    },
]