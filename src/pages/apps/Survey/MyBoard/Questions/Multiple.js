import React from 'react';
import { Checkbox, Space } from 'antd';

const MultipleQuestion = ({ question, data, setData }) => {
    const onChange = (checkedValues) => {
        const id = checkedValues.target.id;
        const newAnswer = question.answer.map((el) => {
            if (el.id === id) {
                return { ...el, isCheck: checkedValues.target.checked };
            }
            return el;
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
            <div>
                <>
                    <Space direction="vertical">
                        {question.answer.map((el, i) => (
                            <div className="question-container">
                                <Checkbox key={i} checked={el.isCheck} id={el.id} onChange={onChange}>
                                    {el.answer}
                                </Checkbox>
                            </div>
                        ))}
                    </Space>
                </>
            </div>
        </div>
    );
};

export default MultipleQuestion;
