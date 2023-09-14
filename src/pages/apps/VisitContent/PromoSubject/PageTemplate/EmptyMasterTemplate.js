import React from 'react';
import { Card } from 'react-bootstrap';

const EmptyMasterTemplate = ({ className, cardBody }) => {
    return (
        <Card body className={className}>
            {cardBody}
        </Card>
    );
};

export default React.memo(EmptyMasterTemplate);