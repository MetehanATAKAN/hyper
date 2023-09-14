import React from 'react';
import { Input } from 'antd';

const TextQuestion = ({ question, data, setData }) => {
    const onChange = (e) => {
        const newData = data.map((item) => {
            if (item.id === question.id) {
                return { ...item, answer: [e.target.value] };
            }
            return item;
        });
        setData(newData);
    };
    return (
        <div className="question-top-container">
            <span className="question-title">{question.question}</span>
            <div>
                <Input.TextArea
                    value={question.answer[0]}
                    onChange={onChange}
                    id={question.id}
                    style={{ width: '500px' }}
                />
            </div>
        </div>
    );
};

export default TextQuestion;
