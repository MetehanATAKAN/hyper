import { Dropdown, Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Dropdowns = ({ option, onClick, item, width = '155px',obj,disabled }) => {
    const { t } = useTranslation();
    // get item id  => onClick === e.domEvent.target.parentElement.id || e.domEvent.target.parentElement.parentElement.id
    const lng = localStorage.getItem('i18nextLng');
    const menu = (
        <Menu>
            {option?.map((el, i) => (
                <Menu.Item
                    style={{ paddingTop: 0, paddingBottom: 0, marginBottom: '5px' }}
                    onClick={(e) => onClick(e,obj,el)}
                    id={`${el.id} ${item}`}
                    key={i}
                    disabled={
                        el.disabled === true
                        ?   disabled
                        :   false
                    }
                    >
                    <span id={`${el.id} ${item}`} style={{ color: el.color, whiteSpace: 'nowrap' }}>
                        {el.icon}
                        {t(el.key)}
                    </span>
                </Menu.Item>
            ))}
        </Menu>
    );
    return (
        <Dropdown overlayStyle={{ minWidth: width }} trigger={'click'} overlay={menu} placement="bottom">
            <i style={{ cursor: 'pointer' }} className="fas fa-ellipsis-v"></i>
        </Dropdown>
    );
};

export default Dropdowns;
