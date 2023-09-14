import React from 'react';
import { Card } from 'react-bootstrap';

const EmptyCard = ({ className, cardBody }) => {
    return (
        <Card body className={`text-center ${className}`}>
            {cardBody}
        </Card>
    );
};

export default React.memo(EmptyCard);
