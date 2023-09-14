import React from 'react';
import "antd/dist/antd.css";
import { Modal as BaseModal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
type IModal = ModalProps;

export const Modal: React.FC<IModal> = ({ showModal, setShowModal, header, footer, body, width = 520, toggle, ...rest }) => {
    return (

<BaseModal 
            {...rest}
            open={showModal}
            onCancel={toggle}
            title={header}
            footer={footer}
            width={width}
            centered
            className='deneme'
            wrapClassName="wrapperdeneme"
        >
            {body}
        </BaseModal>

        
    )
}