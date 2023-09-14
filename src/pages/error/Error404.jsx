import { Result } from 'antd';
import React from 'react';
import { Button } from '../../components/FormElements/Button';

const Error404 = () => {
    return (
        <Result
            style={{
                backgroundColor: 'white',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button href="/" type="primary" style={{ width: '200px' }}>
                    Back Home
                </Button>
            }
        />
    );
};

export default Error404;
