import React, { useState } from 'react';
import MultipleQuestion from './Questions/Multiple';
import SingleQuestion from './Questions/Single';
import TextQuestion from './Questions/Text';

const Questions = ({ data, setData, currentQuestions }) => {
    const [value, setValue] = useState(null);

    return (
        <>
            {data[currentQuestions].questionType === 1 && (
                <SingleQuestion
                    data={data}
                    setData={setData}
                    question={data[currentQuestions]}
                    value={value}
                    setValue={setValue}
                />
            )}
            {data[currentQuestions].questionType === 2 && (
                <MultipleQuestion question={data[currentQuestions]} data={data} setData={setData} />
            )}
            {data[currentQuestions].questionType === 3 && (
                <TextQuestion question={data[currentQuestions]} data={data} setData={setData} />
            )}
        </>
    );
};

export default React.memo(Questions);
