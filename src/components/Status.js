import React, { useState } from 'react'
import '../assets/scss/custom/GlobalNew/status.scss';
import Icon from '@mdi/react';
import { mdiSendCheck, mdiExclamationThick, mdiTranslate, mdiFileQuestionOutline, mdiChatAlertOutline, mdiBadgeAccountAlertOutline, mdiCircleEditOutline } from '@mdi/js';
import { useTranslation } from 'react-i18next';

const Status = ({ approveStatus }) => {
    const { t } = useTranslation();

    const [status, setStatus] = useState([
        { id: 0, name: 'missing', color: '#6C757D', background: '#DFC7C1', icon: <Icon path={mdiFileQuestionOutline} /> },
        { id: 1, name: 'redact', color: '#fff', background: '#ADB5BD', icon: <i className="fas fa-pen"></i> },
        { id: 2, name: 'send to approval', color: '#fff', background: '#FFBC00', icon: <Icon path={mdiSendCheck} /> },
        { id: 3, name: 'approved', color: '#fff', background: '#0ACF97', icon: <i className="fas fa-check"></i> },
        { id: 4, name: 'reject', color: '#fff', background: '#FA5C7C', icon: <Icon path={mdiExclamationThick} /> },
        { id: 5, name: 'translate awaited', color: '#6C757D', background: '#FFE087', icon: <Icon path={mdiTranslate} /> },
        { id: 6, name: 'warning', color: '#fff', background: '#FF679B', icon: <Icon path={mdiChatAlertOutline} /> },
        { id: 7, name: 'request', color: '#fff', background: '#5A959A', icon: <Icon path={mdiBadgeAccountAlertOutline} /> },
        { id: 8, name: 'force edit', color: '#fff', background: '#C84A63', icon: <Icon path={mdiCircleEditOutline} />},
        { id: 9, name: 'approval awaited', color: '#fff', background: '#FFBC00', icon: <i className="fas fa-check"></i> },
    ])
  return (
    <div className='global-status'>
        {
            status.map((item, index) => {
                if(item.id === approveStatus) {
                    return (
                        <div key={index} className='global-status__item' style={{ background: item.background, color: item.color }}>
                            <span className='global-status__item-icon'>{item.icon}</span>
                            <span className='global-status__item-text'>{item.name}</span>
                        </div>
                    )
                }
            })
        }
    </div>
  )
}

export default Status