import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import MarketingModule from './MarketingModule';
import PermissionsEdit from './PermissionsEdit';
import PermissionsActionsButtons from './PermissionsActionsButtons';

const Permissions = ({ roleId }) => {
    const [tableItems, setTableItems] = useState([]);

    return (
        <div className="permissions-main">
            <PermissionsActionsButtons tableItems={tableItems} roleId={roleId} />
            <div className="permissions">
                <Row>
                    <Col xs={2} style={{ borderRight: '2px solid #eeeff2' }}>
                        <MarketingModule />
                    </Col>
                    <Col xs={10}>
                        <PermissionsEdit roleId={roleId} tableItems={tableItems} setTableItems={setTableItems} />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Permissions;
