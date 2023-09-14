import React from 'react';
import { Card, Divider } from 'antd';
import '../../../../assets/scss/custom/survey/myBoard.scss';
const Statistics = ({ data }) => {
    const bodyStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 12px 20px 12px',
    };
    const dividerStyle = {
        height: '65px',
        borderColor: '#DEE2E6',
    };
    return (
        <div className="survey-container">
            {data.map((el, i) => (
                <Card key={i} className="box" bodyStyle={bodyStyle}>
                    <div className="statistic-box">
                        <span className="number">{el.num1}</span>
                        <span className="title">{el.name1}</span>
                    </div>
                    <Divider type="vertical" style={dividerStyle} />
                    <div className="statistic-box">
                        <span className="number">{el.num2}</span>
                        <span className="title">{el.name2}</span>
                    </div>
                    <Divider type="vertical" style={dividerStyle} />
                    <div className="statistic-box">
                        <span className="number">{el.num3}</span>
                        <span className="title">{el.name3}</span>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default Statistics;
