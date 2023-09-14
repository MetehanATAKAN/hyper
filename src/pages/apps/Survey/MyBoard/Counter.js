import React, { useEffect, useRef, useState } from 'react';

const CounterTime = ({ initialMinutes, setOutro, currentQuestions, totalQuestion, setSpendingTime }) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(0);
    const [finish, setFinish] = useState(false);
    const intervalId = useRef(null);
    useEffect(() => {
        intervalId.current = setInterval(() => {
            if (seconds !== 0) {
                setSeconds(seconds - 1);
            } else {
                if (minutes !== 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                    setSpendingTime(minutes - 1);
                } else {
                    setFinish(true);
                    clearInterval(intervalId.current);
                }
            }
        }, 1000);
        return () => clearInterval(intervalId.current);
    }, [minutes, seconds]);
    useEffect(() => {
        if (finish === true) {
            setOutro(true);
        }
    }, [finish]);

    return (
        <div className="counter-survey">
            <div>
                {currentQuestions + 1} / {totalQuestion}
            </div>
            <div style={{ marginLeft: 'auto' }}>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
        </div>
    );
};

export default CounterTime;
