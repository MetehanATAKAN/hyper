import React, { useState } from 'react';
import { Radio, Space } from 'antd';

const SingleQuestion = ({ question, data, setData, value, setValue }) => {
    const onChanges = (e) => {
        setValue(e.target.value);
        const id = e.target.id;
        const newAnswer = question.answer.map((el) => {
            if (el.id === id) {
                return { ...el, isCheck: true };
            }
            return { ...el, isCheck: false };
        });

        const newData = data.map((item) => {
            if (item.id === question.id) {
                return { ...item, answer: newAnswer };
            }
            return item;
        });
        setData(newData);
    };
    return (
        <div className="question-top-container">
            <span className="question-title">{question.question}</span>
            <div className="questions-survey">
                {/* <Radio.Group onChange={onChanges} value={value}> */}
                <Space direction="vertical">
                    {question.answer.map((el, i) => (
                        <div className="question-container">
                            <Radio key={i} onChange={onChanges} checked={el.isCheck} id={el.id}>
                                {el.answer}
                            </Radio>
                        </div>
                    ))}
                </Space>
                {/* </Radio.Group> */}
            </div>
        </div>
    );
};

export default SingleQuestion;
